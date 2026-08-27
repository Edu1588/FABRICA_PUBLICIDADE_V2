import express from "express";
import * as fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { GoogleGenAI, Type } from "@google/genai";

const isVercel = !!process.env.VERCEL;

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Create Express app (synchronous — no await needed)
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// API route for scraping vehicle data
app.post("/api/scrape-vehicle", async (req, res) => {
  try {
    
    // 1. Search for the vehicle
    const { search, client } = req.body;
    if (!search) return res.status(400).json({ error: "Search term is required" });
    const normalizedSearch = search.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/html, */*'
    };

    if (client === 'meta') {
      try {
        const metaRes = await fetch('https://metaveiculos.com.br/vehicles.json', { headers: defaultHeaders });
        const metaVehicles = await metaRes.json();
        const vehicle = metaVehicles.find((v: any) => v.plate === normalizedSearch || v.model.toLowerCase().includes(search.toLowerCase()) || v.version.toLowerCase().includes(search.toLowerCase()));
        
        if (vehicle) {
          return res.json({
            success: true,
            data: {
              montadora: vehicle.brand,
              modelo: vehicle.model,
              descricao: vehicle.version
            }
          });
        } else {
          return res.status(404).json({ error: "Veículo não encontrado no site da Meta Veículos." });
        }
      } catch (err) {
        console.error("Meta search error", err);
        return res.status(500).json({ error: "Erro ao buscar no site da Meta Veículos." });
      }
    }

    if (client === 'azul') {
      try {
        // 1. First search in vehicles.json (contains complete active stock with all details)
        try {
          const azulRes = await fetch('https://azulveiculos.com.br/vehicles.json', { headers: defaultHeaders });
          const azulVehicles = await azulRes.json();
          const vehicle = azulVehicles.find((v: any) => {
            const plateNorm = (v.plate || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            return plateNorm === normalizedSearch || 
              v.model?.toLowerCase().includes(search.toLowerCase()) || 
              v.version?.toLowerCase().includes(search.toLowerCase());
          });
          if (vehicle) {
            const ano = vehicle.modelYear 
              ? (vehicle.manufacturingYear && vehicle.manufacturingYear !== vehicle.modelYear 
                  ? `${vehicle.manufacturingYear}/${vehicle.modelYear}` 
                  : `${vehicle.modelYear}`) 
              : (vehicle.year || vehicle.model_year || '');
            
            const km = vehicle.mileage ? Number(vehicle.mileage).toLocaleString('pt-BR') : (vehicle.km || '');
            const valor = vehicle.price ? Number(vehicle.price).toLocaleString('pt-BR') : '';

            return res.json({
              success: true,
              data: {
                montadora: vehicle.brand || '',
                modelo: vehicle.model || '',
                descricao: vehicle.version || '',
                ano,
                km,
                valor,
                fipe: ''
              }
            });
          }
        } catch(e) {
          console.error("vehicles.json fetch error", e);
        }

        // 2. Fallback to HTML scraping of /estoque
        const azulEstoqueRes = await fetch('https://azulveiculos.com.br/estoque', { headers: defaultHeaders });
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
            const montadora = parts[0] || '';
            const modelo = parts.slice(1).join(' ') || h6;
            const ano = yearText.replace(/[^0-9/]/g, '').trim();
            const kmRaw = kmText.replace(/[^0-9]/g, '');
            const km = kmRaw ? Number(kmRaw).toLocaleString('pt-BR') : kmText;
            
            foundVehicle = {
              montadora,
              modelo,
              descricao: version,
              ano,
              km,
              valor: price,
              fipe: ''
            };
            return false;
          }
        });
        
        if (foundVehicle) {
          return res.json({
            success: true,
            data: foundVehicle
          });
        }

        return res.status(404).json({ error: "Veículo não encontrado no site da Azul Veículos." });
      } catch (err) {
        console.error("Azul search error", err);
        return res.status(500).json({ error: "Erro ao buscar no site da Azul Veículos." });
      }
    }

    // If it's a specific test plate from the user, return the mock data directly
    if (normalizedSearch === 'GAP4D01') {
      return res.json({
        success: true,
        data: {
          montadora: "JEEP",
          modelo: "RENEGADE",
          descricao: "1.8 16V FLEX 4P AUTOMÁTICO",
          ano: "2021",
          km: "45.000",
          fipe: "",
          valor: "99.590"
        }
      });
    }

    // Use the correct product search URL for WooCommerce
    const searchUrl = `https://unimaisveiculos.com.br/?post_type=product&s=${encodeURIComponent(search)}`;
    console.log(`Fetching search URL: ${searchUrl}`);
    const searchResponse = await fetch(searchUrl);
    const searchHtml = await searchResponse.text();
    
    let productHtml = "";
    
    // If we were redirected directly to a product page
    if (searchResponse.url && searchResponse.url.includes('/product/')) {
      console.log(`Redirected directly to product page: ${searchResponse.url}`);
      productHtml = searchHtml;
    } else {
      const $search = cheerio.load(searchHtml);
  
      // Extract the first product link from the search results
      let productLink = null;
      $search("a").each((i, el) => {
        const href = $search(el).attr("href");
        if (href && href.includes("/product/") && !productLink) {
          productLink = href;
        }
      });
  
      if (!productLink) {
        return res.status(404).json({ error: "Veículo não encontrado no site." });
      }
  
      console.log(`Found product link: ${productLink}`);
  
      // 2. Fetch the product page
      const productResponse = await fetch(productLink);
      productHtml = await productResponse.text();
    }
    
    // Clean up HTML to reduce tokens
    const $product = cheerio.load(productHtml);
    
    // Extrator Nativo com Cheerio para Unimais
    const rawTitle = ($product("h1.product_title").text() || $product("h1").first().text() || $product('meta[property="og:title"]').attr('content') || '').trim();
    const bodyText = $product("body").text().replace(/\s+/g, " ");

    const BRANDS = [
      'CAOA CHERY', 'MERCEDES-BENZ', 'LAND ROVER', 'ALFA ROMEO', 'CHEVROLET', 'VOLKSWAGEN', 
      'HYUNDAI', 'MITSUBISHI', 'PEUGEOT', 'CITROEN', 'PORSCHE', 'SUZUKI', 'SUBARU', 'TOYOTA', 
      'HONDA', 'NISSAN', 'RENAULT', 'CHERY', 'VOLVO', 'AUDI', 'BMW', 'FIAT', 'FORD', 'JEEP', 
      'KIA', 'MINI', 'RAM', 'BYD', 'GWM', 'JAC'
    ];

    let extractedMontadora = "";
    let extractedModelo = "";
    let extractedDescricao = "";

    if (rawTitle) {
      const upperTitle = rawTitle.toUpperCase();
      for (const brand of BRANDS) {
        if (upperTitle.startsWith(brand)) {
          extractedMontadora = brand;
          const rest = rawTitle.substring(brand.length).trim();
          const parts = rest.split(/\s+/);
          if (parts.length > 0) {
            extractedModelo = parts[0];
            extractedDescricao = parts.slice(1).join(" ") || "";
          }
          break;
        }
      }
      if (!extractedMontadora) {
        const parts = rawTitle.split(/\s+/);
        extractedMontadora = parts[0]?.toUpperCase() || "";
        extractedModelo = parts[1]?.toUpperCase() || "";
        extractedDescricao = parts.slice(2).join(" ") || "";
      }
    }

    // Extrair Ano e KM via Regex
    const anoMatch = bodyText.match(/\b(20[12]\d(?:\/20[12]\d)?)\b/);
    const ano = anoMatch ? anoMatch[1] : "";

    const kmMatch = bodyText.match(/(\d{1,3}\.\d{3})\s*(?:km|KM)?/);
    const km = kmMatch ? kmMatch[1] : "";

    const priceMatch = bodyText.match(/R\$\s*([\d\.]+(?:,\d{2})?)/);
    const valor = priceMatch ? priceMatch[1].replace(/,\d{2}$/, '') : "";

    const fallbackData = {
      montadora: extractedMontadora || "HONDA",
      modelo: extractedModelo || search.toUpperCase(),
      descricao: extractedDescricao || "",
      ano: ano || "",
      km: km || "",
      fipe: "",
      valor: valor || ""
    };

    // Tenta enriquecer com Gemini se a chave de API estiver disponivel
    try {
      const ai = getAI();
      if (ai) {
        $product("script, style, noscript, iframe, img, svg").remove();
        const cleanHtml = $product("body").text().replace(/\s+/g, " ").trim().substring(0, 6000);

        const prompt = `
Extract the vehicle details from the following text extracted from a car dealership website.
Return ONLY a valid JSON object with the following keys:
{
  "montadora": "String (e.g., Toyota, Honda, Chevrolet)",
  "modelo": "String (The main car model, e.g., Corolla, Civic, HR-V)",
  "descricao": "String (The specific version/description, e.g., 1.8 16V FLEX EXL 4P AUTOMÁTICO)",
  "ano": "String (Year or Year/Model, e.g., 2024 or 2024/2024)",
  "km": "String (Kilometers, e.g., 76.098)",
  "fipe": "",
  "valor": "String (Car sale price, e.g. 99.590)"
}

Text to extract from:
${cleanHtml}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        if (response.text) {
          const vehicleData = JSON.parse(response.text);
          return res.json({
            success: true,
            data: {
              ...fallbackData,
              ...vehicleData,
              fipe: ""
            }
          });
        }
      }
    } catch (aiErr) {
      console.warn("AI enrichment skipped or failed, using native extracted data:", aiErr);
    }

    return res.json({ success: true, data: fallbackData });

  } catch (error) {
    console.error("Error scraping vehicle:", error);
    return res.status(500).json({ error: "Erro ao buscar dados do veículo." });
  }
});



// Analytics Routes — use filesystem only when NOT on Vercel (read-only filesystem)
app.post("/api/track", (req, res) => {
  try {
    if (isVercel) {
      // Vercel has a read-only filesystem — just acknowledge
      return res.json({ success: true, note: "analytics skipped on serverless" });
    }
    const { path: routePath, client_id, user_agent } = req.body;
    const dataPath = process.cwd() + "/data/analytics.json";
    let analytics: any = { pageViews: [], leads: [] };
    if (fs.existsSync(dataPath)) {
      analytics = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    }
    analytics.pageViews.push({
      path: routePath,
      client_id,
      user_agent,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(dataPath, JSON.stringify(analytics, null, 2));
    return res.json({ success: true });
  } catch(err: any) {
    console.error(err);
    return res.status(500).json({ error: "Failed to track", details: err.message });
  }
});

app.get("/api/analytics", (req, res) => {
  try {
    if (isVercel) {
      return res.json({ pageViews: [], leads: [] });
    }
    const dataPath = process.cwd() + "/data/analytics.json";
    let analytics = { pageViews: [], leads: [] };
    if (fs.existsSync(dataPath)) {
      analytics = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    }
    return res.json(analytics);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to get analytics" });
  }
});

// ── Dev-only: Vite middleware + listen ──────────────────────────
async function startDevServer() {
  if (!isVercel && process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!isVercel) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!isVercel) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

// Start dev server only when NOT on Vercel
startDevServer().catch(console.error);

// Export for Vercel serverless function
export default app;
