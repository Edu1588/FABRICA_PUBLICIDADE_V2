import express from 'express';
import * as cheerio from 'cheerio';
import { GoogleGenAI, Type } from '@google/genai';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import crypto from 'crypto';

const app = express();

// 1. Security Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  xFrameOptions: { action: "sameorigin" }
}));

// 2. Protecao contra payloads excessivos
app.use(express.json({ limit: '15mb' }));

// 3. Rate Limiters
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Aguarde um momento antes de tentar novamente." }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas de login incorretas. Tente novamente mais tarde." }
});

app.use("/api/", apiLimiter);

// 4. Autenticação Server-Side Segura com Hash SHA-256 e Assinatura HMAC
const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || "fabrica_publicidade_v2_secure_token_secret_key_2026";
const ADMIN_PIN_HASH = crypto.createHash("sha256").update(process.env.ADMIN_PIN || "1234").digest("hex");

// Endpoint de Login do Admin
app.post("/api/auth/login", authLimiter, (req, res) => {
  try {
    const schema = z.object({
      pin: z.string().min(1).max(32)
    });
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: "PIN inválido." });
    }

    const inputHash = crypto.createHash("sha256").update(validation.data.pin).digest("hex");
    if (inputHash !== ADMIN_PIN_HASH) {
      return res.status(401).json({ success: false, error: "PIN INCORRETO" });
    }

    const payload = {
      role: "admin",
      exp: Date.now() + 24 * 60 * 60 * 1000
    };
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(payloadStr).digest("base64url");
    const token = `${payloadStr}.${signature}`;

    return res.json({ success: true, token });
  } catch (err) {
    console.error("Auth login error", err);
    return res.status(500).json({ success: false, error: "Erro interno no servidor." });
  }
});

// Endpoint de Validação de Sessão Server-side
app.post("/api/auth/verify", (req, res) => {
  try {
    const { token } = req.body;
    if (!token || typeof token !== "string") {
      return res.status(401).json({ valid: false });
    }
    const parts = token.split(".");
    if (parts.length !== 2) return res.status(401).json({ valid: false });

    const [payloadStr, signature] = parts;
    const expectedSig = crypto.createHmac("sha256", ADMIN_SECRET).update(payloadStr).digest("base64url");
    if (signature !== expectedSig) {
      return res.status(401).json({ valid: false });
    }

    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());
    if (payload.exp < Date.now()) {
      return res.status(401).json({ valid: false, error: "Sessão expirada." });
    }

    return res.json({ valid: true });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/html, */*'
};

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return aiInstance;
}

// 5. API route for scraping vehicle data com validação Zod
const scrapeSchema = z.object({
  search: z.string().min(1, "Termo de busca é obrigatório").max(50).trim(),
  client: z.enum(["meta", "azul", "unimais"]).optional()
});

app.post('/api/scrape-vehicle', async (req, res) => {
  try {
    const validation = scrapeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues[0]?.message || "Dados de busca inválidos" });
    }

    const { search, client } = validation.data;
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

    // ── Unimais Veículos / WooCommerce ──
    const searchUrl = `https://unimaisveiculos.com.br/?post_type=product&s=${encodeURIComponent(search)}`;
    const searchResponse = await fetch(searchUrl, { headers: DEFAULT_HEADERS });
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
      if (!productLink) return res.status(404).json({ error: 'Veículo não encontrado no site da Unimais.' });
      const productResponse = await fetch(productLink, { headers: DEFAULT_HEADERS });
      productHtml = await productResponse.text();
    }

    const $product = cheerio.load(productHtml);
    const rawTitle = $product("h1.product_title, h1.entry-title, .product-title").first().text().trim() || $product("title").text().trim();
    const bodyText = $product(".product, #main, body").text().replace(/\s+/g, " ").trim();

    let extractedMontadora = "";
    let extractedModelo = "";
    let extractedDescricao = "";

    if (rawTitle) {
      const cleanTitle = rawTitle.replace(/\s*–\s*.*$/, "").replace(/\s*-\s*Unimais.*$/i, "").trim();
      const parts = cleanTitle.split(" ");
      if (parts.length >= 2) {
        extractedMontadora = parts[0]?.toUpperCase() || "";
        extractedModelo = parts[1]?.toUpperCase() || "";
        extractedDescricao = parts.slice(2).join(" ") || "";
      }
    }

    const anoMatch = bodyText.match(/\b(20[12]\d(?:\/20[12]\d)?)\b/);
    const ano = anoMatch ? anoMatch[1] : "";

    const kmMatch = bodyText.match(/(\d{1,3}\.\d{3})\s*(?:km|KM)?/);
    const km = kmMatch ? kmMatch[1] : "";

    const priceMatch = bodyText.match(/R\$\s*([\d\.]+(?:,\d{2})?)/);
    const valor = priceMatch ? priceMatch[1].replace(/,\d{2}$/, '') : "";

    const fullText = (rawTitle + " " + bodyText).toUpperCase();
    let cambio = "MANUAL";
    if (fullText.includes("AUTOMÁTICO") || fullText.includes("AUTOMATICO") || fullText.includes("AUT.") || fullText.includes(" AT") || fullText.includes("CVT") || fullText.includes("TIPTRONIC") || fullText.includes("DSG")) {
      cambio = "AUTOMÁTICO";
    }

    const fallbackData = {
      montadora: extractedMontadora || "HONDA",
      modelo: extractedModelo || search.toUpperCase(),
      descricao: extractedDescricao || "",
      ano: ano || "",
      km: km || "",
      cambio: cambio || "MANUAL",
      fipe: "",
      valor: valor || ""
    };

    try {
      const ai = getAI();
      if (ai) {
        $product("script, style, noscript, iframe, img, svg").remove();
        const cleanHtml = $product("body").text().replace(/\s+/g, " ").trim().substring(0, 6000);

        const prompt = `Extraia os detalhes do veículo a partir do texto de anúncio de concessionária.
Retorne APENAS um objeto JSON válido com as chaves:
{ "montadora": "String", "modelo": "String", "descricao": "String", "ano": "String", "km": "String", "cambio": "String (MANUAL ou AUTOMÁTICO)", "fipe": "String", "valor": "String" }
Texto:
${cleanHtml}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                montadora: { type: Type.STRING },
                modelo: { type: Type.STRING },
                descricao: { type: Type.STRING },
                ano: { type: Type.STRING },
                km: { type: Type.STRING },
                cambio: { type: Type.STRING },
                fipe: { type: Type.STRING },
                valor: { type: Type.STRING }
              },
              required: ["montadora", "modelo", "descricao"]
            }
          }
        });
        const vehicleData = JSON.parse(response.text || "{}");
        return res.json({
          success: true,
          data: {
            montadora: vehicleData.montadora || fallbackData.montadora,
            modelo: vehicleData.modelo || fallbackData.modelo,
            descricao: vehicleData.descricao || fallbackData.descricao,
            ano: vehicleData.ano || fallbackData.ano,
            km: vehicleData.km || fallbackData.km,
            cambio: vehicleData.cambio || fallbackData.cambio,
            fipe: "",
            valor: vehicleData.valor || fallbackData.valor
          }
        });
      }
    } catch (aiErr) {
      console.warn("AI extraction fallback to native regex parser:", aiErr);
    }

    return res.json({ success: true, data: fallbackData });

  } catch (error) {
    console.error('Error scraping vehicle:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do veículo.' });
  }
});

// ── Analytics & Health ──
app.post('/api/track', (_req, res) => res.json({ success: true }));
app.get('/api/analytics', (_req, res) => res.json({ pageViews: [], leads: [] }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default app;
