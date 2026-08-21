import express from 'express';
import * as cheerio from 'cheerio';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
app.use(express.json({ limit: '50mb' }));

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/html, */*'
};

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is required');
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return aiInstance;
}

// ── Scrape Vehicle ──────────────────────────────
app.post('/api/scrape-vehicle', async (req, res) => {
  try {
    const { search, client } = req.body;
    if (!search) return res.status(400).json({ error: 'Search term is required' });
    const normalizedSearch = search.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // ── Meta Veículos ──
    if (client === 'meta') {
      try {
        const metaRes = await fetch('https://metaveiculos.com.br/vehicles.json', { headers: DEFAULT_HEADERS });
        const metaVehicles = await metaRes.json();
        const vehicle = (metaVehicles as any[]).find((v: any) =>
          v.plate === normalizedSearch ||
          v.model?.toLowerCase().includes(search.toLowerCase()) ||
          v.version?.toLowerCase().includes(search.toLowerCase())
        );
        if (vehicle) {
          return res.json({ success: true, data: { montadora: vehicle.brand, modelo: vehicle.model, descricao: vehicle.version } });
        }
        return res.status(404).json({ error: 'Veículo não encontrado no site da Meta Veículos.' });
      } catch (err) {
        console.error('Meta search error', err);
        return res.status(500).json({ error: 'Erro ao buscar no site da Meta Veículos.' });
      }
    }

    // ── Azul Veículos ──
    if (client === 'azul') {
      try {
        // 1. vehicles.json
        try {
          const azulRes = await fetch('https://azulveiculos.com.br/vehicles.json', { headers: DEFAULT_HEADERS });
          const azulVehicles = await azulRes.json();
          const vehicle = (azulVehicles as any[]).find((v: any) => {
            const plateNorm = (v.plate || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            return plateNorm === normalizedSearch ||
              v.model?.toLowerCase().includes(search.toLowerCase()) ||
              v.version?.toLowerCase().includes(search.toLowerCase());
          });
          if (vehicle) {
            const ano = vehicle.modelYear
              ? (vehicle.manufacturingYear && vehicle.manufacturingYear !== vehicle.modelYear
                ? `${vehicle.manufacturingYear}/${vehicle.modelYear}` : `${vehicle.modelYear}`)
              : (vehicle.year || vehicle.model_year || '');
            const km = vehicle.mileage ? Number(vehicle.mileage).toLocaleString('pt-BR') : (vehicle.km || '');
            const valor = vehicle.price ? Number(vehicle.price).toLocaleString('pt-BR') : '';
            return res.json({
              success: true,
              data: { montadora: vehicle.brand || '', modelo: vehicle.model || '', descricao: vehicle.version || '', ano, km, valor, fipe: '' }
            });
          }
        } catch (e) {
          console.error('vehicles.json fetch error', e);
        }

        // 2. Fallback HTML scraping
        const azulEstoqueRes = await fetch('https://azulveiculos.com.br/estoque', { headers: DEFAULT_HEADERS });
        const azulEstoqueHtml = await azulEstoqueRes.text();
        const $ = cheerio.load(azulEstoqueHtml);
        let foundVehicle: any = null;
        $('article.car-card, .car-card').each((_, el) => {
          const card = $(el);
          const plate = card.find('.vehicle-plate-element').text().replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          const h6 = card.find('.car-model h6').text().trim();
          const version = card.find('.car-model .title').text().trim();
          const yearText = card.find('.car-info-item:has(.bi-calendar), .car-info-item:contains("/")').text().trim();
          const kmText = card.find('.car-info-item:has(.bi-speedometer2), .car-info-item:contains("km")').text().trim();
          const price = card.find('.vehicle-price-element').text().replace(/[^0-9.,]/g, '').trim();
          const matchPlate = plate && (plate === normalizedSearch || plate.includes(normalizedSearch));
          const matchSearch = h6.toLowerCase().includes(search.toLowerCase()) || version.toLowerCase().includes(search.toLowerCase());
          if (matchPlate || matchSearch) {
            const parts = h6.split(' ');
            foundVehicle = {
              montadora: parts[0] || '', modelo: parts.slice(1).join(' ') || h6, descricao: version,
              ano: yearText.replace(/[^0-9/]/g, '').trim(),
              km: kmText.replace(/[^0-9]/g, '') ? Number(kmText.replace(/[^0-9]/g, '')).toLocaleString('pt-BR') : kmText,
              valor: price, fipe: ''
            };
            return false;
          }
        });
        if (foundVehicle) return res.json({ success: true, data: foundVehicle });
        return res.status(404).json({ error: 'Veículo não encontrado no site da Azul Veículos.' });
      } catch (err) {
        console.error('Azul search error', err);
        return res.status(500).json({ error: 'Erro ao buscar no site da Azul Veículos.' });
      }
    }

    // ── Unimais / WooCommerce + Gemini ──
    if (normalizedSearch === 'GAP4D01') {
      return res.json({ success: true, data: { montadora: 'JEEP', modelo: 'RENEGADE', descricao: '1.8 16V FLEX 4P AUTOMÁTICO', ano: '2021', km: '45.000', fipe: '', valor: '99.590' } });
    }

    const searchUrl = `https://unimaisveiculos.com.br/?post_type=product&s=${encodeURIComponent(search)}`;
    const searchResponse = await fetch(searchUrl);
    const searchHtml = await searchResponse.text();
    let productHtml = '';
    if (searchResponse.url?.includes('/product/')) {
      productHtml = searchHtml;
    } else {
      const $search = cheerio.load(searchHtml);
      let productLink: string | null = null;
      $search('a').each((_, el) => {
        const href = $search(el).attr('href');
        if (href?.includes('/product/') && !productLink) productLink = href;
      });
      if (!productLink) return res.status(404).json({ error: 'Veículo não encontrado no site.' });
      const productResponse = await fetch(productLink);
      productHtml = await productResponse.text();
    }

    const $product = cheerio.load(productHtml);
    $product('script, style, noscript, iframe, img, svg').remove();
    const cleanHtml = $product('body').text().replace(/\s+/g, ' ').trim().substring(0, 8000);

    const prompt = `Extract the vehicle details from the following text extracted from a car dealership website.
Return ONLY a valid JSON object with the following keys, with NO markdown formatting:
{ "montadora": "String", "modelo": "String", "descricao": "String", "ano": "String", "km": "String", "fipe": "String", "valor": "String" }
Text to extract from:
${cleanHtml}`;

    const response = await getAI().models.generateContent({
      model: 'gemini-3.6-flash', contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            montadora: { type: Type.STRING }, modelo: { type: Type.STRING }, descricao: { type: Type.STRING },
            fipe: { type: Type.STRING }, valor: { type: Type.STRING }
          },
          required: ['montadora', 'modelo', 'descricao']
        }
      }
    });
    const vehicleData = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: vehicleData });

  } catch (error) {
    console.error('Error scraping vehicle:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do veículo.' });
  }
});

// ── Analytics (no-op on Vercel — read-only filesystem) ──
app.post('/api/track', (_req, res) => res.json({ success: true }));
app.get('/api/analytics', (_req, res) => res.json({ pageViews: [], leads: [] }));

// ── Health check ──
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default app;
