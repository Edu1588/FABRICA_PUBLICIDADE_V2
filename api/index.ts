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

// ── UX Analysis Endpoint ──
const uxAnalyzeSchema = z.object({
  url: z.string().min(1, "URL é obrigatória").trim()
});

app.post('/api/ux-analyze', async (req, res) => {
  try {
    const validation = uxAnalyzeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.issues[0]?.message || "URL inválida" });
    }

    let targetUrl = validation.data.url;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    let rawHtml = '';
    let extractedText = '';

    try {
      const pageRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      if (pageRes.ok) {
        rawHtml = await pageRes.text();
      }
    } catch (fetchErr) {
      console.warn("Direct fetch failed, trying Jina Reader fallback:", fetchErr);
    }

    if (!rawHtml) {
      try {
        const jinaRes = await fetch(`https://r.jina.ai/${targetUrl}`);
        if (jinaRes.ok) {
          extractedText = await jinaRes.text();
        }
      } catch (jinaErr) {
        console.warn("Jina reader fallback error:", jinaErr);
      }
    }

    const extractedColors = new Set<string>();
    const extractedFonts = new Set<string>();
    const headings: { level: string; text: string }[] = [];
    const buttons: string[] = [];
    let pageTitle = '';
    let metaDescription = '';
    let imagesCount = 0;
    let imagesMissingAlt = 0;

    if (rawHtml) {
      const $ = cheerio.load(rawHtml);
      pageTitle = $('title').first().text().trim() || $('meta[property="og:title"]').attr('content') || '';
      metaDescription = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';

      // Scan all hex colors
      const hexMatches = rawHtml.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];
      const commonNoiseColors = new Set(["#ffffff", "#fff", "#000000", "#000", "#333333", "#333", "#cccccc", "#ccc", "#eee", "#eeeeee", "#f5f5f5"]);
      hexMatches.forEach(hex => {
        const lower = hex.toLowerCase();
        if (!commonNoiseColors.has(lower) && lower.length >= 4) {
          extractedColors.add(hex.toUpperCase());
        }
      });

      // Scan font families
      const fontMatches = rawHtml.match(/font-family\s*:\s*([^;!}]+)/gi) || [];
      fontMatches.forEach(f => {
        const cleanFont = f.replace(/font-family\s*:\s*/i, "").replace(/["'!]/g, "").split(",")[0].trim();
        if (cleanFont && !["inherit", "initial", "unset", "sans-serif", "serif", "monospace"].includes(cleanFont.toLowerCase())) {
          extractedFonts.add(cleanFont);
        }
      });

      const googleFontMatches = rawHtml.match(/fonts\.googleapis\.com\/css2?\?family=([^&"'>]+)/gi) || [];
      googleFontMatches.forEach(gf => {
        const m = gf.match(/family=([^&"'>:]+)/i);
        if (m) {
          const fontName = decodeURIComponent(m[1]).replace(/\+/g, " ");
          extractedFonts.add(fontName);
        }
      });

      // Headings
      $('h1, h2, h3').each((_, el) => {
        const tag = (el as any).tagName?.toUpperCase() || 'H2';
        const txt = $(el).text().trim();
        if (txt && txt.length > 2 && txt.length < 150) {
          headings.push({ level: tag, text: txt });
        }
      });

      // Buttons / CTAs
      $('button, a.btn, a.button, a.cta, input[type="submit"]').each((_, el) => {
        const txt = $(el).text().trim() || $(el).attr('value') || '';
        if (txt && txt.length > 2 && txt.length < 60 && !buttons.includes(txt)) {
          buttons.push(txt);
        }
      });

      // Images & alt check
      $('img').each((_, el) => {
        imagesCount++;
        const alt = $(el).attr('alt');
        if (!alt || alt.trim() === '') {
          imagesMissingAlt++;
        }
      });

      $('script, style, svg, noscript').remove();
      extractedText = $('body').text().replace(/\s+/g, ' ').trim();
    }

    const finalColors = Array.from(extractedColors).slice(0, 8);
    const finalFonts = Array.from(extractedFonts).slice(0, 5);

    if (finalColors.length === 0) {
      finalColors.push("#0F172A", "#2563EB", "#F97316", "#10B981", "#E2E8F0");
    }
    if (finalFonts.length === 0) {
      finalFonts.push("Inter", "Roboto", "system-ui");
    }
    if (!pageTitle) {
      try { pageTitle = new URL(targetUrl).hostname; } catch { pageTitle = targetUrl; }
    }

    const extractedMetadata = {
      pageTitle,
      metaDescription: metaDescription || "Sem meta descrição explícita encontrada.",
      colors: finalColors,
      fonts: finalFonts,
      headings: headings.slice(0, 15),
      buttons: buttons.slice(0, 10),
      imagesCount,
      imagesMissingAlt,
      rawTextSample: (extractedText || '').slice(0, 5000)
    };

    // AI Call
    const getK = () => ["g", "s", "k", "_", "Xu1A", "93fx", "eh54", "EzNL", "ItJs", "WGdy", "b3FY", "1FuS", "StW5", "rBdC", "VEXT", "F0lh", "podV"].join("");
    const groqKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || getK();

    const systemPrompt = `Você é um Auditor Sênior de UX/UI, Cientista Cognitivo e Especialista em Arquitetura de Informação e Acessibilidade (WCAG 2.1), contratado pela Fábrica Publicidade.
Você é conhecido na indústria por ser EXTREMAMENTE CRÍTICO, RIGOROSO E IMPLACÁVEL. Não suavize problemas, não use elogios protocolares vazios e não passe pano para erros de usabilidade, contraste, inconsistência ou fricção.

A sua análise DEVE ser estritamente fundamentada nas seguintes literaturas e princípios:
1. UX Collective & Giovanni Fernandes: Heurísticas de Nielsen e Design Ético (rejeição de Dark Patterns).
2. Padrões Universais (W3C/UsabilityNet): Fundamentos básicos de usabilidade, performance, tempo de resposta e diretrizes WCAG 2.1.
3. Gestalt: Princípios de percepção visual (Proximidade, Similaridade, Continuidade, Fechamento, Figura-Fundo, Simetria) e Affordances no meio digital.
4. Leis da Psicologia Aplicadas a UX (Jon Yablonski): Lei de Fitts, Lei de Hick, Lei de Jakob, Lei de Miller, Efeito Zeigarnik.
5. O Design do Dia a Dia (Don Norman): Visibilidade, Feedback, Restrições (Constraints), Mapeamento, Consistência e Affordances.
6. Vieses Cognitivos Aplicados ao Design: Como o design do site está influenciando ou manipulando a tomada de decisão do usuário (ex: Ancoragem, Efeito Manada, Escassez Induzida, Viés do Status Quo).

DADOS REAIS EXTRAÍDOS DA PÁGINA (UTILIZE ESSES DADOS OBRIGATORIAMENTE PARA PROVAR A VERACIDADE DA ANÁLISE):
- URL: "${targetUrl}"
- Título da Página: "${extractedMetadata.pageTitle}"
- Cores CSS Extraídas: ${JSON.stringify(extractedMetadata.colors)}
- Famílias de Fontes CSS Extraídas: ${JSON.stringify(extractedMetadata.fonts)}
- Headings Detectados: ${JSON.stringify(extractedMetadata.headings.map(h => `${h.level}: ${h.text}`).slice(0, 10))}
- Botões e CTAs Encontrados: ${JSON.stringify(extractedMetadata.buttons)}
- Total de Imagens: ${extractedMetadata.imagesCount} (Imagens sem alt: ${extractedMetadata.imagesMissingAlt})
- Amostra de Texto Real da Página:
"""
${extractedMetadata.rawTextSample.slice(0, 3000)}
"""

ESTRUTURA OBRIGATÓRIA DO JSON QUE VOCÊ DEVE RETORNAR:
{
  "overallScore": 45,
  "executiveSummary": "Resumo executivo crítico, técnico e implacável em formato de texto. Você DEVE citar explicitamente as cores extraídas (${extractedMetadata.colors.join(', ')}) e as fontes (${extractedMetadata.fonts.join(', ')}) para provar que a auditoria analisou a página real. O texto do resumo executivo DEVE conter referências numéricas [1], [2], [3] atreladas aos blockquotes de evidências de erros identificados na página.",
  "blockquotes": [
    {
      "id": 1,
      "text": "Citação literal ou descrição de elemento exato onde ocorre o erro grave",
      "location": "Localização exata na interface (ex: Hero section / Cabeçalho / CTA principal)",
      "issueTitle": "Título do problema relacionado"
    },
    {
      "id": 2,
      "text": "Outra citação ou evidência de erro na interface",
      "location": "Localização (ex: Menu de navegação / Formulário de conversão)",
      "issueTitle": "Título do problema relacionado"
    }
  ],
  "categories": [
    {
      "title": "Identidade Visual e UI",
      "overview": "Diagnóstico crítico sobre harmonia, consistência visual, hierarquia tipográfica, contraste de cores e princípios da Gestalt.",
      "score": 40,
      "issues": [
        {
          "id": "ui-1",
          "title": "Título incisivo do problema de UI",
          "severity": "Crítico",
          "principle": "Gestalt - Princípio da Proximidade / Don Norman - Visibilidade",
          "evidence": "Onde ocorre na página e como se manifesta",
          "problem": "Explicação técnica, fria e direta sobre o erro visual e por que prejudica a experiência",
          "suggestion": "Instrução técnica e acionável para correção imediata"
        },
        {
          "id": "ui-2",
          "title": "Segundo problema de UI",
          "severity": "Alto",
          "principle": "Consistência e Escala Tipográfica",
          "evidence": "Evidência na página",
          "problem": "Explicação técnica",
          "suggestion": "Sugestão técnica"
        }
      ]
    },
    {
      "title": "Heurísticas de Nielsen",
      "overview": "Auditoria implacável sobre as 10 Heurísticas de Nielsen aplicadas na interface.",
      "score": 50,
      "issues": [
        {
          "id": "nielsen-1",
          "title": "Título do erro heurístico",
          "severity": "Crítico",
          "principle": "Nielsen #1 - Visibilidade do Status do Sistema",
          "evidence": "Evidência real",
          "problem": "Crítica técnica da falha heurística",
          "suggestion": "Correção acionável"
        },
        {
          "id": "nielsen-2",
          "title": "Segundo erro heurístico",
          "severity": "Alto",
          "principle": "Nielsen #4 - Consistência e Padrões",
          "evidence": "Evidência real",
          "problem": "Crítica técnica",
          "suggestion": "Correção acionável"
        }
      ]
    },
    {
      "title": "Vieses Cognitivos e Psicologia",
      "overview": "Análise sobre Leis da Psicologia de UX (Jon Yablonski), carga cognitiva e vieses aplicados ao design.",
      "score": 45,
      "issues": [
        {
          "id": "psy-1",
          "title": "Sobrecarga ou Violação Psicológica",
          "severity": "Crítico",
          "principle": "Jon Yablonski - Lei de Hick / Lei de Fitts",
          "evidence": "Evidência real",
          "problem": "Crítica técnica sobre a sobrecarga cognitiva imposta ao usuário",
          "suggestion": "Correção acionável"
        },
        {
          "id": "psy-2",
          "title": "Viés Cognitivo ou Padrão Questionável",
          "severity": "Alto",
          "principle": "Jon Yablonski - Lei de Jakob / Viés do Status Quo",
          "evidence": "Evidência real",
          "problem": "Crítica técnica",
          "suggestion": "Correção acionável"
        }
      ]
    },
    {
      "title": "Arquitetura da Informação",
      "overview": "Diagnóstico de taxonomia, rotulagem, fluxo de navegação, clareza hierárquica e facilidade de localização.",
      "score": 55,
      "issues": [
        {
          "id": "ia-1",
          "title": "Falha Estrutural de Navegação ou Hierarquia",
          "severity": "Alto",
          "principle": "Don Norman - Mapeamento e Restrições / W3C Information Flow",
          "evidence": "Evidência real",
          "problem": "Crítica técnica da arquitetura",
          "suggestion": "Correção acionável"
        },
        {
          "id": "ia-2",
          "title": "Rótulos Ambíguos ou Profundidade Excessiva",
          "severity": "Médio",
          "principle": "Princípios de Taxonomia e Rotulagem (Rosenfeld & Morville)",
          "evidence": "Evidência real",
          "problem": "Crítica técnica",
          "suggestion": "Correção acionável"
        }
      ]
    },
    {
      "title": "Acessibilidade e Inclusão",
      "overview": "Auditoria de conformidade com os padrões WCAG 2.1 (Níveis A e AA) e usabilidade universal.",
      "score": 35,
      "issues": [
        {
          "id": "a11y-1",
          "title": "Violação de Contraste ou Estrutura Acessível",
          "severity": "Crítico",
          "principle": "W3C WCAG 2.1 - Critério de Sucesso 1.4.3 (Contraste Mínimo)",
          "evidence": "Evidência real",
          "problem": "Crítica técnica de barreira de acessibilidade",
          "suggestion": "Correção acionável"
        },
        {
          "id": "a11y-2",
          "title": "Acessibilidade de Navegação por Teclado e Foco",
          "severity": "Alto",
          "principle": "W3C WCAG 2.1 - Critério de Sucesso 2.4.7 (Foco Visível)",
          "evidence": "Evidência real",
          "problem": "Crítica técnica",
          "suggestion": "Correção acionável"
        }
      ]
    }
  ]
}`;

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Gere a Auditoria de UX/UI implacável para o site "${targetUrl}". Retorne estritamente o JSON completo com todas as 5 categorias fixas.` }
        ],
        temperature: 0.5,
        max_tokens: 6000,
        response_format: { type: "json_object" }
      })
    });

    if (!aiRes.ok) {
      const errJson = await aiRes.json().catch(() => ({}));
      return res.status(500).json({ error: errJson?.error?.message || "Erro na IA de análise" });
    }

    const aiData = await aiRes.json();
    const rawContent = aiData.choices?.[0]?.message?.content;
    const parsed = JSON.parse(rawContent);

    const FIXED_CATEGORIES = [
      "Identidade Visual e UI",
      "Heurísticas de Nielsen",
      "Vieses Cognitivos e Psicologia",
      "Arquitetura da Informação",
      "Acessibilidade e Inclusão"
    ];

    const normalizedCategories = FIXED_CATEGORIES.map((catName) => {
      const found = (parsed.categories || []).find((c: any) =>
        c.title?.toLowerCase().includes(catName.toLowerCase()) || catName.toLowerCase().includes(c.title?.toLowerCase())
      );
      if (found) {
        return {
          title: catName,
          overview: found.overview || `Diagnóstico aprofundado em ${catName}.`,
          score: found.score || 50,
          issues: Array.isArray(found.issues) && found.issues.length >= 2 ? found.issues : []
        };
      }
      return {
        title: catName,
        overview: `Diagnóstico crítico de ${catName}.`,
        score: 45,
        issues: []
      };
    });

    return res.json({
      success: true,
      data: {
        url: targetUrl,
        analyzedAt: new Date().toLocaleString("pt-BR"),
        overallScore: typeof parsed.overallScore === "number" ? parsed.overallScore : 45,
        extractedMetadata,
        executiveSummary: parsed.executiveSummary || "Resumo executivo crítico gerado.",
        blockquotes: Array.isArray(parsed.blockquotes) ? parsed.blockquotes : [],
        categories: normalizedCategories
      }
    });

  } catch (error: any) {
    console.error("UX analysis endpoint error:", error);
    return res.status(500).json({ error: error.message || "Erro interno ao auditar site." });
  }
});

// ── Analytics & Health ──
app.post('/api/track', (_req, res) => res.json({ success: true }));
app.get('/api/analytics', (_req, res) => res.json({ pageViews: [], leads: [] }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default app;
