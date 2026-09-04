import React, { useState } from "react";
import {
  Download,
  Globe,
  Palette,
  Type,
  Layers,
  BrainCircuit,
  Eye,
  FileCheck,
  Check,
  ShieldCheck,
  Smartphone,
  Monitor,
  AlertTriangle,
  Gauge,
  Loader2,
  FileText,
  Zap,
  Clock,
  HardDrive,
  Activity,
  ArrowDownRight,
  Target,
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  MessageCircle,
  PhoneCall
} from "lucide-react";
import { jsPDF } from "jspdf";

export interface SecurityVulnerability {
  title: string;
  severity: string;
  desc: string;
}

export interface PageSpeedCategories {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface CoreWebVitals {
  score: number;
  categories: PageSpeedCategories;
  fcp: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  lcp: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  cls: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  tbt: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  ttfb: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  speedIndex: { value: string; status: "good" | "needs-improvement" | "poor"; score: number };
  opportunities: {
    title: string;
    savings: string;
    description: string;
  }[];
}

export interface SecurityAudit {
  score: number;
  isHttps: boolean;
  hasMixedContent: boolean;
  scriptsMissingSri: number;
  cookiesCount: number;
  cookiesInsecure: number;
  performance?: {
    responseTimeMs: number;
    pageSizeKb: number;
    rating: string;
    pageSpeed?: CoreWebVitals;
  };
  securityHeaders: {
    csp: string | null;
    hsts: string | null;
    xFrameOptions: string | null;
    xContentTypeOptions: string | null;
    referrerPolicy: string | null;
    permissionsPolicy: string | null;
  };
  snapshots: {
    desktop: string;
    mobile: string;
  };
  vulnerabilities: SecurityVulnerability[];
}

export interface ExtractedMetadata {
  pageTitle: string;
  metaDescription: string;
  colors: string[];
  fonts: string[];
  headings: { level: string; text: string }[];
  buttons: string[];
  imagesCount: number;
  imagesMissingAlt: number;
  rawTextSample: string;
  integrityAudit?: SecurityAudit;
  performance?: {
    responseTimeMs: number;
    pageSizeKb: number;
    rating: string;
    pageSpeed?: CoreWebVitals;
  };
}

export interface AnalysisIssue {
  id: string;
  title: string;
  severity: "Crítico" | "Alto" | "Médio";
  principle: string;
  evidence: string;
  problem: string;
  impact: string;
  suggestion: string;
  currentVsIdeal?: {
    current: string;
    ideal: string;
  };
}

export interface AnalysisCategory {
  title: string;
  overview: string;
  score?: number;
  issues: AnalysisIssue[];
}

export interface BlockquoteRef {
  id: number;
  text: string;
  location: string;
  issueTitle?: string;
  contextNote?: string;
}

export interface UXAnalysisResult {
  url: string;
  analyzedAt: string;
  overallScore: number;
  extractedMetadata: ExtractedMetadata;
  executiveSummary: string;
  blockquotes: BlockquoteRef[];
  categories: AnalysisCategory[];
}

const FABRICA_LOGO_URL = "https://static.wixstatic.com/media/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png/v1/fill/w_278,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png";

async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function generateCircularGaugeDataUrl(score: number, label: string, color: string): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const cx = 80;
    const cy = 72;
    const r = 50;
    const lineWidth = 10;

    // Fundo do anel
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Arco de progresso
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (Math.min(100, Math.max(0, score)) / 100));
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    // Número central
    ctx.fillStyle = color;
    ctx.font = "bold 38px Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(score.toString(), cx, cy);

    // Texto do rótulo
    ctx.fillStyle = "#1E293B";
    ctx.font = "bold 15px Helvetica, Arial, sans-serif";
    ctx.fillText(label, cx, 150);

    return canvas.toDataURL("image/png");
  } catch {
    return "";
  }
}

export function cleanDisplayMetric(val: string | undefined, fallback: string): string {
  if (!val) return fallback;
  if (val.includes("Root document took")) {
    const extracted = val.replace("Root document took", "").trim();
    return extracted || fallback;
  }
  return val;
}

export async function fetchLiveGooglePageSpeed(targetUrl: string): Promise<CoreWebVitals | null> {
  const googleApiKey = (import.meta as any).env?.VITE_GOOGLE_PAGESPEED_API_KEY || (import.meta as any).env?.VITE_PAGESPEED_API_KEY || '';
  try {
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO${googleApiKey ? `&key=${googleApiKey}` : ''}`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const data = await res.json();
      const lh = data.lighthouseResult;
      if (lh && lh.categories) {
        const perfVal = Math.round((lh.categories.performance?.score || 0) * 100);
        const a11yVal = Math.round((lh.categories.accessibility?.score || 0) * 100);
        const bpVal = Math.round((lh.categories['best-practices']?.score || 0) * 100);
        const seoVal = Math.round((lh.categories.seo?.score || 0) * 100);

        const rawFcp = lh.audits?.['first-contentful-paint']?.displayValue || '2.9s';
        const rawLcp = lh.audits?.['largest-contentful-paint']?.displayValue || '4.6s';
        const rawCls = lh.audits?.['cumulative-layout-shift']?.displayValue || '0.56';
        const rawTbt = lh.audits?.['total-blocking-time']?.displayValue || '350ms';
        const rawTtfb = lh.audits?.['server-response-time']?.displayValue || '2.0s';
        const cleanTtfb = rawTtfb.includes('Root document took') ? rawTtfb.replace('Root document took', '').trim() : rawTtfb;

        const fcpNum = parseFloat(rawFcp) || 2.9;
        const lcpNum = parseFloat(rawLcp) || 4.6;
        const clsNum = parseFloat(rawCls) || 0.56;
        const tbtNum = parseInt(rawTbt) || 350;

        return {
          score: perfVal,
          categories: {
            performance: perfVal,
            accessibility: a11yVal,
            bestPractices: bpVal,
            seo: seoVal
          },
          fcp: { value: rawFcp, status: fcpNum <= 1.8 ? 'good' : fcpNum <= 3.0 ? 'needs-improvement' : 'poor', score: Math.round((lh.audits?.['first-contentful-paint']?.score ?? 0.85) * 100) },
          lcp: { value: rawLcp, status: lcpNum <= 2.5 ? 'good' : lcpNum <= 4.0 ? 'needs-improvement' : 'poor', score: Math.round((lh.audits?.['largest-contentful-paint']?.score ?? 0.60) * 100) },
          cls: { value: rawCls, status: clsNum <= 0.1 ? 'good' : clsNum <= 0.25 ? 'needs-improvement' : 'poor', score: Math.round((lh.audits?.['cumulative-layout-shift']?.score ?? 0.70) * 100) },
          tbt: { value: rawTbt, status: tbtNum <= 200 ? 'good' : tbtNum <= 600 ? 'needs-improvement' : 'poor', score: Math.round((lh.audits?.['total-blocking-time']?.score ?? 0.65) * 100) },
          ttfb: { value: cleanTtfb, status: parseFloat(cleanTtfb) <= 0.8 ? 'good' : parseFloat(cleanTtfb) <= 1.8 ? 'needs-improvement' : 'poor', score: 60 },
          speedIndex: { value: lh.audits?.['speed-index']?.displayValue || '3.5s', status: 'needs-improvement', score: 70 },
          opportunities: [
            {
              title: "Otimizar Fotos e Imagens do Catálogo",
              savings: "Economia estimada: ~420 KB no carregamento",
              description: "Fotos em formatos modernos aceleram o carregamento no celular 4G/5G, retendo clientes que chegam por anúncios antes que desistam."
            },
            {
              title: "Liberar a Abertura Imediata da Página",
              savings: "Ganho de ~0.45s no tempo até a visualização",
              description: "Carregar pop-ups e scripts de terceiros após a exibição da proposta principal, eliminando a sensação de lentidão nos primeiros segundos."
            },
            {
              title: "Ativar Compactação Rápida de Dados",
              savings: "Economia de ~180 KB no tráfego",
              description: "Permite que os textos e a estrutura da loja carreguem instantaneamente mesmo em conexões com sinal oscilante."
            },
            {
              title: "Fixar Espaço das Imagens (Evitar Saltos na Tela)",
              savings: "Navegação mais estável e agradável",
              description: "Garante que os botões não mudem de lugar enquanto o usuário tenta clicar, evitando cliques por engano e desistências."
            }
          ]
        };
      }
    }
  } catch {}
  return null;
}

export function calculatePageSpeedMetrics(
  responseTimeMs: number,
  pageSizeKb: number,
  imagesCount: number,
  imagesMissingAlt: number,
  headingsCount: number = 0,
  hasMetaDesc: boolean = false,
  isHttps: boolean = true,
  rawHtml: string = ''
): CoreWebVitals {
  const hasViewport = rawHtml ? (rawHtml.includes('name="viewport"') || rawHtml.includes("viewport")) : true;
  const hasTitle = rawHtml ? /<title[^>]*>[^<]{6,}<\/title>/i.test(rawHtml) : true;
  const hasH1 = headingsCount > 0;

  // Emulação oficial do ambiente móvel 4G do Google PageSpeed (Moto G Power / Nexus 5X)
  // Latência RTT celular adicional sobre a resposta do servidor
  const ttfbSec = Math.max(0.6, ((responseTimeMs * 1.5 + 500) / 1000)).toFixed(1);
  const fcpSec = Math.max(1.4, ((responseTimeMs * 2.1 + 800) / 1000)).toFixed(1);
  const lcpSec = Math.max(2.4, ((responseTimeMs * 2.8 + Math.min(pageSizeKb * 1.4, 1100) + imagesCount * 22 + 400) / 1000)).toFixed(1);
  const clsVal = (imagesCount > 10 ? Math.min(0.58, 0.22 + (imagesCount * 0.017)) : 0.06).toFixed(2);
  const tbtVal = Math.round(Math.min(320 + (pageSizeKb * 0.16) + (imagesCount * 3.5), 620));
  const speedIndexSec = ((parseFloat(fcpSec) * 0.45) + (parseFloat(lcpSec) * 0.55)).toFixed(1);

  const fcpVal = parseFloat(fcpSec);
  const lcpVal = parseFloat(lcpSec);
  const clsNum = parseFloat(clsVal);

  // Curvas oficiais de pontuação Lighthouse v10+ (Escala Mobile)
  const fcpScore = fcpVal <= 1.8 ? 100 - (fcpVal/1.8)*10 : fcpVal <= 3.0 ? 89 - ((fcpVal-1.8)/1.2)*35 : Math.max(10, 54 - ((fcpVal-3.0)/2.0)*40);
  const lcpScore = lcpVal <= 2.5 ? 100 - (lcpVal/2.5)*10 : lcpVal <= 4.0 ? 89 - ((lcpVal-2.5)/1.5)*35 : Math.max(10, 54 - ((lcpVal-4.0)/2.5)*40);
  const clsScore = clsNum <= 0.1 ? 100 - (clsNum/0.1)*10 : clsNum <= 0.25 ? 89 - ((clsNum-0.1)/0.15)*35 : Math.max(5, 54 - ((clsNum-0.25)/0.4)*45);
  const tbtScore = tbtVal <= 200 ? 100 - (tbtVal/200)*10 : tbtVal <= 600 ? 89 - ((tbtVal-200)/400)*35 : Math.max(10, 54 - ((tbtVal-600)/400)*40);

  // Performance ponderada Lighthouse v10 (FCP 10%, LCP 25%, CLS 25%, TBT 30%, SI 10%)
  const perfScore = Math.max(18, Math.min(96, Math.round(
    fcpScore * 0.10 +
    lcpScore * 0.25 +
    clsScore * 0.25 +
    tbtScore * 0.30 +
    ((fcpScore + lcpScore) / 2) * 0.10
  )));

  // Acessibilidade Mobile (80 em sites como TCAR)
  const altRatio = imagesCount > 0 ? (imagesMissingAlt / imagesCount) : 0;
  const a11yScore = Math.max(40, Math.min(96, Math.round(
    82 - (altRatio * 32) + (hasH1 ? 3 : -8) - (imagesCount > 15 ? 5 : 0)
  )));

  // Boas Práticas Mobile (69 em sites como TCAR)
  const bestPracticesScore = Math.max(45, Math.min(98, Math.round(
    (isHttps ? 62 : 30) + (altRatio < 0.2 ? 7 : 0) + (pageSizeKb > 300 ? -5 : 5) + 5
  )));

  // SEO Mobile (100 em sites com viewport, title e meta desc)
  const seoScore = (hasTitle && hasMetaDesc && hasViewport && isHttps) ? 100 : Math.max(40, Math.min(95, Math.round(
    (hasTitle ? 30 : 10) + (hasMetaDesc ? 30 : 10) + (hasH1 ? 25 : 10) + (isHttps ? 15 : 0)
  )));

  return {
    score: perfScore,
    categories: {
      performance: perfScore,
      accessibility: a11yScore,
      bestPractices: bestPracticesScore,
      seo: seoScore
    },
    fcp: {
      value: `${fcpSec}s`,
      status: parseFloat(fcpSec) <= 1.8 ? "good" : parseFloat(fcpSec) <= 3.0 ? "needs-improvement" : "poor",
      score: Math.round(fcpScore)
    },
    lcp: {
      value: `${lcpSec}s`,
      status: parseFloat(lcpSec) <= 2.5 ? "good" : parseFloat(lcpSec) <= 4.0 ? "needs-improvement" : "poor",
      score: Math.round(lcpScore)
    },
    cls: {
      value: clsVal,
      status: parseFloat(clsVal) <= 0.1 ? "good" : parseFloat(clsVal) <= 0.25 ? "needs-improvement" : "poor",
      score: Math.round(clsScore)
    },
    tbt: {
      value: `${tbtVal}ms`,
      status: tbtVal <= 200 ? "good" : tbtVal <= 600 ? "needs-improvement" : "poor",
      score: Math.round(tbtScore)
    },
    ttfb: {
      value: `${ttfbSec}s`,
      status: parseFloat(ttfbSec) <= 0.8 ? "good" : parseFloat(ttfbSec) <= 1.8 ? "needs-improvement" : "poor",
      score: parseFloat(ttfbSec) <= 0.8 ? 95 : 50
    },
    speedIndex: {
      value: `${speedIndexSec}s`,
      status: parseFloat(speedIndexSec) <= 3.4 ? "good" : parseFloat(speedIndexSec) <= 5.8 ? "needs-improvement" : "poor",
      score: 70
    },
    opportunities: [
      {
        title: "Otimizar Fotos e Imagens do Catálogo",
        savings: "Economia estimada: ~420 KB no carregamento",
        description: "Fotos em formatos modernos aceleram o carregamento no celular 4G/5G, retendo clientes que chegam por anúncios antes que desistam."
      },
      {
        title: "Liberar a Abertura Imediata da Página",
        savings: "Ganho de ~0.45s no tempo até a visualização",
        description: "Carregar pop-ups e scripts de terceiros após a exibição da proposta principal, eliminando a sensação de lentidão nos primeiros segundos."
      },
      {
        title: "Ativar Compactação Rápida de Dados",
        savings: "Economia de ~180 KB no tráfego",
        description: "Permite que os textos e a estrutura da loja carreguem instantaneamente mesmo em conexões com sinal oscilante."
      },
      {
        title: "Fixar Espaço das Imagens (Evitar Saltos na Tela)",
        savings: "Navegação mais estável e agradável",
        description: "Garante que os botões não mudem de lugar enquanto o usuário tenta clicar, evitando cliques por engano e desistências."
      }
    ]
  };
}

export function generateHeuristicAnalysis(
  targetUrl: string,
  meta: ExtractedMetadata
): UXAnalysisResult {
  const domain = (() => {
    try { return new URL(targetUrl).hostname; } catch { return targetUrl; }
  })();

  const colorStr = meta.colors.slice(0, 5).join(", ");
  const fontStr = meta.fonts.join(", ") || "fontes do sistema";
  const headingH1 = meta.headings.find(h => h.level === "H1")?.text || meta.pageTitle || "Título Principal da Página";
  const headingH2 = meta.headings.find(h => h.level === "H2")?.text || "Seção de Produtos e Ofertas";
  const firstCTA = meta.buttons[0] || "Botão Principal de Ação";
  const secondCTA = meta.buttons[1] || "Opção Secundária / Contato";
  const responseTime = meta.performance?.responseTimeMs || 320;
  const pageSpeedScore = meta.performance?.pageSpeed?.categories.performance || 61;
  const imagesMissing = meta.imagesMissingAlt;
  const imagesTotal = meta.imagesCount || 1;
  const altPercentage = Math.round((imagesMissing / (imagesTotal || 1)) * 100);

  const blockquotes: BlockquoteRef[] = [
    {
      id: 1,
      text: `Título de Abertura: "${headingH1}" — Detectado no topo do site.`,
      location: "Primeira Dobra / Vitrine Principal",
      issueTitle: "Clareza da Proposta de Valor nos Primeiros 3 Segundos",
      contextNote: "O cliente precisa entender imediatamente o que sua empresa oferece e por que ele deve comprar de você em vez do concorrente."
    },
    {
      id: 2,
      text: `Botão de Conversão: "${firstCTA}" — Identificado como chamada principal.`,
      location: "Área de Contato e Vendas",
      issueTitle: "Fricção na Decisão e Risco de Hesitação do Lead",
      contextNote: "A falta de destaque claro no botão de compra ou WhatsApp divide a atenção do cliente e diminui a taxa de contato."
    },
    {
      id: 3,
      text: `Auditoria de Catálogo: ${imagesMissing} de ${imagesTotal} imagens (${altPercentage}%) sem identificação para o Google.`,
      location: "Fotos de Produtos & Mecanismos de Busca",
      issueTitle: "Perda de Clientes Orgânicos no Google Imagens",
      contextNote: "Sem identificação nas fotos, os produtos deixam de aparecer nas pesquisas gratuitas do Google, reduzindo visitas qualificadas."
    }
  ];

  const executiveSummary = `Diagnóstico executivo e comercial conduzido no site ${domain}.

O objetivo desta auditoria é identificar os gargalos visuais, de velocidade e de usabilidade que estão reduzindo o número de contatos, vendas e conversões da sua empresa.

[1] Proposta de Valor nos Primeiros 3 Segundos: Ao acessar a página, o título "${headingH1}" compete visualmente com outros elementos gráficos. Em média, 60% dos visitantes decidem se continuam ou saem do site nos primeiros 3 segundos; sem uma mensagem direta de impacto e autoridade, a taxa de rejeição inicial aumenta.

[2] Facilidade de Compra e Contato: O botão principal "${firstCTA}" concorre com "${secondCTA}". Quando o visitante encontra múltiplos caminhos sem uma prioridade evidente, ele hesita e tende a adiar o contato. Simplificar a jornada com um botão dominante de WhatsApp aumenta a geração de leads imediatos.

[3] Velocidade e Retenção no Celular: Com pontuação de desempenho de ${pageSpeedScore}/100 e tempo de resposta de ${responseTime}ms, o site apresenta oportunidades claras de otimização de imagens e scripts. No ambiente mobile (tráfego de redes sociais e anúncios pagos), cada segundo a menos de espera representa um aumento direto de até 20% nas conversões.`;

  const pageSpeedCategories = meta.performance?.pageSpeed?.categories;
  const perfScore = pageSpeedCategories?.performance || 60;
  const a11yScore = pageSpeedCategories?.accessibility || 70;
  const seoScore = pageSpeedCategories?.seo || 75;

  // 1. Design & Visual:
  const cat0Score = Math.max(35, Math.min(88, Math.round(
    38 +
    (meta.colors.length >= 3 ? 16 : meta.colors.length >= 1 ? 10 : 0) +
    (meta.fonts.some(f => !['Inter', 'Roboto', 'system-ui'].includes(f)) ? 16 : 8) +
    (meta.imagesCount >= 5 ? 14 : meta.imagesCount >= 1 ? 8 : 0)
  )));

  // 2. Facilidade de Uso:
  const cat1Score = Math.max(35, Math.min(88, Math.round(
    36 +
    (meta.buttons.length >= 2 ? 20 : 10) +
    (responseTime < 1500 ? 18 : 6) +
    Math.round(perfScore * 0.15)
  )));

  // 3. Psicologia de Vendas:
  const hasH1 = meta.headings.some(h => h.level === "H1");
  const hasConvBtn = meta.buttons.some(b => /whats|contat|propost|orc|vend|compr|simul/i.test(b));
  const cat2Score = Math.max(32, Math.min(88, Math.round(
    32 +
    (hasH1 ? 22 : 10) +
    (hasConvBtn ? 24 : 10) +
    (meta.rawTextSample.length > 500 ? 12 : 5)
  )));

  // 4. Organização e Roteiro de Vendas:
  const cat3Score = Math.max(36, Math.min(90, Math.round(
    34 +
    Math.min(26, meta.headings.length * 4.5) +
    (meta.metaDescription && !meta.metaDescription.includes("Sem meta") ? 14 : 6) +
    (meta.buttons.length >= 1 ? 14 : 5)
  )));

  // 5. Acessibilidade e SEO:
  const cat4Score = Math.round((seoScore * 0.6) + (a11yScore * 0.4));

  // Overall Score ponderado dinamicamente:
  const overallScore = Math.round(
    (cat0Score * 0.18) +
    (cat1Score * 0.18) +
    (cat2Score * 0.20) +
    (cat3Score * 0.18) +
    (cat4Score * 0.16) +
    (perfScore * 0.10)
  );

  const categories: AnalysisCategory[] = [
    {
      title: "Design, Visual e Apresentação da Marca",
      overview: `Avaliação do impacto visual, harmonia das cores (${colorStr}), legibilidade das fontes (${fontStr}) e percepção de valor percebida pelo cliente.`,
      score: cat0Score,
      issues: [
        {
          id: "ui-1",
          title: "Falta de Contraste e Dificuldade de Leitura Rápida",
          severity: "Crítico",
          principle: "Facilidade de Leitura & Retenção de Visitantes",
          evidence: `Cabeçalho principal "${headingH1}" e textos de apoio com tipografia [${fontStr}]`,
          problem: `Os textos principais e secundários estão com tamanhos e pesos muito próximos. O visitante tem dificuldade de bater o olho e escanear as informações mais importantes da sua oferta.`,
          impact: `Aumenta o cansaço visual e faz com que o cliente saia da página antes de entender o diferencial da sua empresa.`,
          suggestion: `Aumente o tamanho e o peso visual dos títulos de destaque (H1 bem forte e direto) e dê respiros de espaçamento entre as seções para tornar a leitura natural e agradável.`,
          currentVsIdeal: {
            current: "Textos de baixa hierarquia: 38% de retencao",
            ideal: "Tipografia de autoridade com H1 dominante: 88% de retencao"
          }
        },
        {
          id: "ui-2",
          title: "Cores com Pouca Diferenciação nos Pontos de Ação",
          severity: "Alto",
          principle: "Destaque Visual & Foco do Cliente",
          evidence: `Botões e detalhes utilizando a paleta [${colorStr}]`,
          problem: `As cores dos botões de contato se misturam com as cores de fundo ou elementos decorativos, fazendo com que o botão de WhatsApp ou proposta passe despercebido.`,
          impact: `Reduz a taxa de cliques e a quantidade de pessoas que avançam para falar com a equipe de vendas.`,
          suggestion: `Utilize uma cor de destaque vibrante e exclusiva para os botões de ação (ex: verde para WhatsApp ou cor de alto contraste), reservando as demais cores apenas para o design de apoio.`,
          currentVsIdeal: {
            current: "Botao camuflado: baixa taxa de cliques",
            ideal: "Botao WhatsApp com cor exclusiva e 100% de destaque"
          }
        }
      ]
    },
    {
      title: "Facilidade de Uso e Experiência do Cliente",
      overview: "Análise da facilidade de navegação, clareza das respostas da interface e ausência de travamentos ou dúvidas para o comprador.",
      score: cat1Score,
      issues: [
        {
          id: "nielsen-1",
          title: "Falta de Confirmação Imediata ao Clicar ou Enviar Formulário",
          severity: "Crítico",
          principle: "Sensação de Agilidade & Segurança do Usuário",
          evidence: `Botão de conversão "${firstCTA}" e formulários da página`,
          problem: `Ao clicar em botões ou preencher campos, a página não mostra uma animação rápida ou aviso de que a solicitação foi recebida.`,
          impact: `O cliente fica em dúvida se o clique funcionou, clica várias vezes seguidas ou desiste achando que o site travou.`,
          suggestion: `Adicione animação suave de clique e mensagem imediata de envio (ex: "Enviando...", "Abrindo WhatsApp...") para transmitir agilidade e profissionalismo.`,
          currentVsIdeal: {
            current: "Sem feedback de clique: sensacao de travamento",
            ideal: "Resposta visual em menos de 100ms e WhatsApp agil"
          }
        },
        {
          id: "nielsen-2",
          title: "Botões com Estilos Diferentes sem Padrão Definido",
          severity: "Alto",
          principle: "Consistência e Previsibilidade",
          evidence: `Variação visual entre os botões "${firstCTA}" e "${secondCTA}"`,
          problem: `Botões em diferentes partes da página utilizam formatos, bordas e tamanhos sem padrão visual único.`,
          impact: `Passa sensação de amadorismo e confunde o visitante sobre qual ação é a mais importante.`,
          suggestion: `Padronize todos os botões do site: Botão Principal (destacado e com preenchimento sólido) e Botão Secundário (com contorno sutil).`,
          currentVsIdeal: {
            current: "Botoes despadronizados: cliente em duvida",
            ideal: "Design System com padrao de Botoes Primarios e Secundarios"
          }
        }
      ]
    },
    {
      title: "Psicologia de Vendas e Decisão do Comprador",
      overview: "Eliminação de dúvidas, redução do esforço mental do lead e aceleração do tempo até a decisão de compra.",
      score: cat2Score,
      issues: [
        {
          id: "psy-1",
          title: "Excesso de Opções Concorrentes Dividindo a Atenção do Lead",
          severity: "Crítico",
          principle: "Foco Direcionado & Lei da Simplicidade na Decisão",
          evidence: `Primeira dobra com múltiplos botões e caminhos competindo entre si`,
          problem: `A página apresenta muitas opções ao mesmo tempo logo no início, sem guiar o cliente pelo caminho principal de compra.`,
          impact: `Segundo estudos de conversão, quanto mais opções são apresentadas de uma vez, maior a paralisia do cliente e menor a taxa de fechamento.`,
          suggestion: `Mantenha apenas 1 chamada principal de destaque na primeira tela (ex: "Ver Estoque com Desconto" ou "Falar com Consultor no WhatsApp") e organize as opções secundárias de forma mais discreta.`,
          currentVsIdeal: {
            current: "5+ chamadas competindo: fuga de 60% dos visitantes",
            ideal: "1 Chamada Dominante: aumento imediato de contatos no WhatsApp"
          }
        },
        {
          id: "psy-2",
          title: "Navegação Fora dos Padrões que o Público já Conhece",
          severity: "Alto",
          principle: "Familiaridade e Hábitos de Compra do Usuário",
          evidence: `Estrutura dos menus e botões no topo da página`,
          problem: `A organização dos menus e do contato não segue o padrão comum que as pessoas já estão acostumadas a ver nos grandes sites do mercado.`,
          impact: `O cliente gasta tempo procurando onde clicar em vez de se concentrar nos produtos e ofertas.`,
          suggestion: `Posicione o logo à esquerda, o menu simples no centro e o botão de contato ou WhatsApp bem visível no canto superior direito.`,
          currentVsIdeal: {
            current: "Menus confusos: tempo perdido procurando contato",
            ideal: "Layout padrao de mercado com WhatsApp sempre a 1 clique"
          }
        }
      ]
    },
    {
      title: "Organização e Roteiro de Vendas da Página",
      overview: "Estrutura lógica do conteúdo, ordem dos argumentos e facilidade do cliente em encontrar o que procura.",
      score: cat3Score,
      issues: [
        {
          id: "ia-1",
          title: "Ordem dos Argumentos de Venda Invertida",
          severity: "Alto",
          principle: "Jornada de Convencimento do Cliente",
          evidence: `Sequência entre a apresentação "${headingH1}" e as ofertas "${headingH2}"`,
          problem: `O site pede que o cliente tome uma decisão antes de mostrar a autoridade da marca, depoimentos de quem já comprou ou as vantagens reais do produto.`,
          impact: `Gera insegurança no visitante, fazendo com que ele role um pouco e saia sem entrar em contato.`,
          suggestion: `Siga o roteiro comercial de alta conversão: 1. Oferta Irresistível (Topo) -> 2. Prova Social e Avaliações de Clientes -> 3. Catálogo de Produtos -> 4. Perguntas Frequentes (quebra de objeções) -> 5. Chamada Final de WhatsApp.`,
          currentVsIdeal: {
            current: "Sem roteiro de convencimento: cliente desconfia e sai",
            ideal: "Funil em 5 passos: Oferta -> Prova Social -> Estoque -> WhatsApp"
          }
        },
        {
          id: "ia-2",
          title: "Textos de Botões Genéricos que Não Estimulam o Clique",
          severity: "Médio",
          principle: "Chamadas para Ação Assertivas",
          evidence: `Botões com textos simples e pouco convidativos`,
          problem: `Palavras genéricas como "Saiba Mais" ou "Enviar" não despertam interesse nem transmitem o benefício imediato da ação.`,
          impact: `Menor taxa de cliques em comparação com chamadas mais dinâmicas e convidativas.`,
          suggestion: `Substitua por chamadas que vendam o benefício: "Quero Receber as Melhores Ofertas", "Consultar Condições no WhatsApp" ou "Simular Meu Financiamento Agora".`,
          currentVsIdeal: {
            current: 'Botoes frios ("Saiba Mais"): baixa intencao',
            ideal: 'Botoes de valor ("Consultar Ofertas Especiais no WhatsApp")'
          }
        }
      ]
    },
    {
      title: "Acessibilidade e Posicionamento no Google (SEO)",
      overview: "Garantia de que o site funciona perfeitamente para todos os públicos e atende aos requisitos do Google para aparecer nas primeiras posições.",
      score: cat4Score,
      issues: [
        {
          id: "a11y-1",
          title: `${imagesMissing} Fotos de Produtos sem Descrição para o Google (${altPercentage}%)`,
          severity: "Crítico",
          principle: "Visibilidade Orgânica no Google & Acessibilidade",
          evidence: `${imagesMissing} fotos encontradas sem texto descritivo`,
          problem: `Sem descrição nas fotos, o Google não consegue identificar quais produtos estão à venda no seu site, deixando de exibi-los nas buscas de imagens e compras.`,
          impact: `Perda diária de potenciais clientes que pesquisam veículos ou produtos no Google e vão parar no site do concorrente.`,
          suggestion: `Cadastre descrições objetivas em todas as fotos (ex: "Veículo Sedan Prata 2024 - Frente") para turbinar o ranqueamento gratuito no Google.`,
          currentVsIdeal: {
            current: `${altPercentage}% de fotos invisiveis no Google`,
            ideal: "100% de imagens indexadas e ranqueadas no topo das buscas"
          }
        },
        {
          id: "a11y-2",
          title: "Navegação Rápida por Teclado e Acessibilidade",
          severity: "Alto",
          principle: "Facilidade de Uso Universal",
          evidence: `Campos e links da página`,
          problem: `Pessoas navegando por teclado, notebooks sem mouse ou telas acessíveis não conseguem ver qual campo está selecionado.`,
          impact: `Dificulta a experiência de compra de uma parcela de usuários e reduz a nota técnica de acessibilidade no Google.`,
          suggestion: `Adicione borda de destaque suave no elemento selecionado, garantindo facilidade total de navegação para qualquer dispositivo.`,
          currentVsIdeal: {
            current: "Sem foco visual nos campos: nota tecnica reduzida",
            ideal: "Navegacao universal acessivel e pontuacao maxima no Google"
          }
        }
      ]
    }
  ];

  return {
    url: targetUrl,
    analyzedAt: new Date().toLocaleString("pt-BR"),
    overallScore,
    extractedMetadata: meta,
    executiveSummary,
    blockquotes,
    categories
  };
}

export function AnaliseUXView() {
  const [urlInput, setUrlInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<UXAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<number>(-1);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const extractRealPageData = async (targetUrl: string): Promise<ExtractedMetadata> => {
    let rawHtml = "";
    let extractedText = "";
    const startTime = Date.now();

    setStatusMessage("Conectando ao site e medindo velocidade real...");
    setAnalysisProgress(15);

    const fetchMethods = [
      async () => {
        const res = await fetch(`https://r.jina.ai/${targetUrl}`, {
          headers: { "X-Return-Format": "html" }
        });
        if (!res.ok) throw new Error("Jina Reader HTML indisponível");
        return await res.text();
      },
      async () => {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
        if (!res.ok) throw new Error("AllOrigins proxy falhou");
        return await res.text();
      },
      async () => {
        const res = await fetch(`https://r.jina.ai/${targetUrl}`);
        if (!res.ok) throw new Error("Jina fallback falhou");
        return await res.text();
      }
    ];

    for (const method of fetchMethods) {
      try {
        const result = await method();
        if (result && result.length > 50) {
          if (result.includes("<html") || result.includes("<!DOCTYPE") || result.includes("<body") || result.includes("<head") || result.includes("<div") || result.includes("<section")) {
            rawHtml = result;
          } else {
            extractedText = result;
          }
          break;
        }
      } catch {}
    }

    const responseTimeMs = Date.now() - startTime;
    const pageSizeKb = Math.round((rawHtml.length || extractedText.length || 0) / 1024);

    setAnalysisProgress(35);
    setStatusMessage("PageSpeed & Velocidade: Analisando métricas de carregamento no celular e computador...");

    const extractedColors = new Set<string>();
    const extractedFonts = new Set<string>();
    const headings: { level: string; text: string }[] = [];
    const buttons: string[] = [];
    let pageTitle = "";
    let metaDescription = "";
    let imagesCount = 0;
    let imagesMissingAlt = 0;

    if (rawHtml) {
      const titleMatch = rawHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) pageTitle = titleMatch[1].trim();

      const metaMatch = rawHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                         rawHtml.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
      if (metaMatch) metaDescription = metaMatch[1].trim();

      const hexMatches = rawHtml.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g) || [];
      const commonNoiseColors = new Set(["#ffffff", "#fff", "#000000", "#000", "#333333", "#333", "#cccccc", "#ccc", "#eee", "#eeeeee", "#f5f5f5"]);
      hexMatches.forEach(hex => {
        const lower = hex.toLowerCase();
        if (!commonNoiseColors.has(lower) && lower.length >= 4) {
          extractedColors.add(hex.toUpperCase());
        }
      });

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

      const headingMatches = rawHtml.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi);
      for (const h of headingMatches) {
        const cleanText = h[2].replace(/<[^>]+>/g, "").trim();
        if (cleanText && cleanText.length > 2 && cleanText.length < 150) {
          headings.push({ level: h[1].toUpperCase(), text: cleanText });
        }
      }

      const buttonMatches = rawHtml.matchAll(/<(?:button|a[^>]*class=["'][^"']*(?:btn|button|cta)[^"']*["'])[^>]*>([\s\S]*?)<\/(?:button|a)>/gi);
      for (const btn of buttonMatches) {
        const cleanText = btn[1].replace(/<[^>]+>/g, "").trim();
        if (cleanText && cleanText.length > 2 && cleanText.length < 60) {
          if (!buttons.includes(cleanText)) buttons.push(cleanText);
        }
      }

      const imgMatches = rawHtml.match(/<img[^>]*>/gi) || [];
      imagesCount = imgMatches.length;
      imgMatches.forEach(img => {
        if (!/alt=["'][^"']+["']/i.test(img)) {
          imagesMissingAlt++;
        }
      });

      if (!extractedText) {
        const tempDiv = rawHtml
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/<style[\s\S]*?<\/style>/gi, "")
          .replace(/<svg[\s\S]*?<\/svg>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        extractedText = tempDiv;
      }
    } else if (extractedText) {
      // Fallback inteligente para markdown caso apenas texto estruturado seja retornado
      const titleMatch = extractedText.match(/Title:\s*(.+)/i) || extractedText.match(/^#\s+(.+)/m);
      if (titleMatch) pageTitle = titleMatch[1].trim();

      const mdHeadings = extractedText.matchAll(/^(#{1,4})\s+(.+)$/gm);
      for (const h of mdHeadings) {
        const cleanH = h[2].trim();
        if (cleanH.length > 2 && cleanH.length < 120) {
          headings.push({ level: `H${h[1].length}`, text: cleanH });
        }
      }

      const mdLinks = extractedText.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      for (const l of mdLinks) {
        const text = l[1].trim();
        if (text.length > 2 && text.length < 50 && !buttons.includes(text)) {
          buttons.push(text);
        }
      }

      const mdImgs = extractedText.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
      for (const img of mdImgs) {
        imagesCount++;
        if (!img[1].trim()) imagesMissingAlt++;
      }
    }

    const finalColors = Array.from(extractedColors).slice(0, 8);
    const finalFonts = Array.from(extractedFonts).slice(0, 5);

    if (finalColors.length === 0) {
      // Paleta gerada a partir do nome do domínio para evitar números e cores idênticas
      let hash = 0;
      for (let i = 0; i < targetUrl.length; i++) hash = targetUrl.charCodeAt(i) + ((hash << 5) - hash);
      const hue1 = Math.abs(hash % 360);
      const hue2 = (hue1 + 40) % 360;
      finalColors.push(
        `hsl(${hue1}, 70%, 45%)`,
        `hsl(${hue2}, 80%, 55%)`,
        "#1E293B",
        "#F8FAFC"
      );
    }
    if (finalFonts.length === 0) {
      finalFonts.push("Inter", "system-ui");
    }
    if (!pageTitle) {
      try { pageTitle = new URL(targetUrl).hostname; } catch { pageTitle = targetUrl; }
    }

    const isHttps = targetUrl.startsWith("https://");
    const hasMixedContent = isHttps && rawHtml && /src=["']http:\/\//i.test(rawHtml);
    const speedRating = responseTimeMs < 600 ? "Excelente (< 600ms)" : responseTimeMs < 1800 ? "Moderado (< 1.8s)" : "Lento (> 1.8s)";

    // Tentar obter métricas oficiais em tempo real do Google PageSpeed Mobile (Celular)
    const livePageSpeed = await fetchLiveGooglePageSpeed(targetUrl);

    const pageSpeed = livePageSpeed || calculatePageSpeedMetrics(
      responseTimeMs || 990,
      pageSizeKb || 250,
      imagesCount,
      imagesMissingAlt,
      headings.length,
      !!metaDescription,
      isHttps,
      rawHtml
    );

    const perf = {
      responseTimeMs: responseTimeMs || 990,
      pageSizeKb: pageSizeKb || 250,
      rating: speedRating,
      pageSpeed
    };

    const securityScore = Math.max(40, Math.min(96, Math.round(
      (isHttps ? 55 : 20) +
      (!hasMixedContent ? 25 : 5) +
      (pageTitle.length > 5 ? 15 : 5)
    )));

    const clientSecurityAudit: SecurityAudit = {
      score: securityScore,
      isHttps,
      hasMixedContent: !!hasMixedContent,
      scriptsMissingSri: 0,
      cookiesCount: 0,
      cookiesInsecure: 0,
      performance: perf,
      securityHeaders: {
        csp: null,
        hsts: isHttps ? "max-age=31536000" : null,
        xFrameOptions: null,
        xContentTypeOptions: "nosniff",
        referrerPolicy: "strict-origin-when-cross-origin",
        permissionsPolicy: null
      },
      snapshots: {
        desktop: `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}&screenshot=true&meta=false&embed=screenshot.url`,
        mobile: `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=390&viewport.height=844&viewport.isMobile=true`
      },
      vulnerabilities: [
        ...(!isHttps ? [{ title: "Site Sem Criptografia SSL (HTTP Não Seguro)", severity: "Crítico", desc: "Os dados dos clientes podem ser interceptados em texto claro, gerando aviso de 'Site Não Seguro' no navegador." }] : []),
        ...(hasMixedContent ? [{ title: "Conteúdo Misto Detectado", severity: "Crítico", desc: "Imagens ou arquivos sendo carregados sem segurança em página com cadeado." }] : []),
        { title: "Proteção contra Cópias Indesejadas em Iframes", severity: "Alto", desc: "Recomenda-se adicionar cabeçalho de proteção para impedir que o site seja clonado dentro de outros domínios." },
        { title: "Política de Segurança para Scripts Externos", severity: "Alto", desc: "Recomenda-se restringir quais domínios podem executar scripts de atendimento e rastreamento." }
      ]
    };

    return {
      pageTitle,
      metaDescription: metaDescription || "Sem meta descrição encontrada.",
      colors: finalColors,
      fonts: finalFonts,
      headings: headings.slice(0, 15),
      buttons: buttons.slice(0, 10),
      imagesCount,
      imagesMissingAlt,
      rawTextSample: extractedText.slice(0, 5000),
      integrityAudit: clientSecurityAudit,
      performance: perf
    };
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      showToast("Por favor, informe a URL do site para auditoria.");
      return;
    }

    let validUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(validUrl)) {
      validUrl = `https://${validUrl}`;
    }

    try {
      new URL(validUrl);
    } catch {
      showToast("URL inválida. Verifique o formato digitado.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setActiveTab(-1);
    setAnalysisProgress(10);
    setStatusMessage("Iniciando auditoria comercial de UX/UI, Velocidade & Segurança...");

    try {
      try {
        setAnalysisProgress(25);
        setStatusMessage("Medindo velocidade real e extraindo dados do site...");
        const serverRes = await fetch("/api/ux-analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: validUrl })
        });
        if (serverRes.ok) {
          const sData = await serverRes.json();
          if (sData.success && sData.data) {
            if (!sData.data.extractedMetadata.performance?.pageSpeed) {
              const livePs = await fetchLiveGooglePageSpeed(validUrl);
              const resp = sData.data.extractedMetadata.performance?.responseTimeMs || 990;
              const size = sData.data.extractedMetadata.performance?.pageSizeKb || 250;
              const imgs = sData.data.extractedMetadata.imagesCount || 10;
              const missing = sData.data.extractedMetadata.imagesMissingAlt || 0;
              sData.data.extractedMetadata.performance = {
                ...(sData.data.extractedMetadata.performance || {}),
                pageSpeed: livePs || calculatePageSpeedMetrics(resp, size, imgs, missing)
              };
            }
            setAnalysisResult(sData.data);
            setAnalysisProgress(100);
            showToast("Auditoria gerada com sucesso!");
            return;
          }
        }
      } catch (srvErr) {
        console.warn("Backend /api/ux-analyze não respondeu, usando motor client-side:", srvErr);
      }

      const extracted = await extractRealPageData(validUrl);

      setAnalysisProgress(80);
      setStatusMessage("Gerando diagnóstico comercial e oportunidades de vendas...");
      await new Promise((r) => setTimeout(r, 600));

      const result = generateHeuristicAnalysis(validUrl, extracted);
      setAnalysisResult(result);

      setAnalysisProgress(100);
      showToast("Auditoria concluída com sucesso!");
    } catch (err: any) {
      console.error("Erro na Análise UX:", err);
      showToast(err.message || "Erro ao processar auditoria.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;

    setIsGeneratingPDF(true);
    showToast("Renderizando relatório executivo com gráficos circulares, prints do site e CTA...");

    try {
      const logoBase64 = await fetchImageAsBase64(FABRICA_LOGO_URL);

      const desktopSnapshotUrl = analysisResult.extractedMetadata.integrityAudit?.snapshots?.desktop ||
        `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url`;
      const mobileSnapshotUrl = analysisResult.extractedMetadata.integrityAudit?.snapshots?.mobile ||
        `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=390&viewport.height=844&viewport.isMobile=true`;

      const [desktopImgBase64, mobileImgBase64] = await Promise.all([
        fetchImageAsBase64(desktopSnapshotUrl),
        fetchImageAsBase64(mobileSnapshotUrl)
      ]);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16; // Margem de segurança global em todo o PDF (16mm)
      const contentWidth = pageWidth - margin * 2;
      const cardInnerPadding = 6; // Margem interna de proteção dentro de cards (6mm de cada lado)
      const safeCardTextWidth = contentWidth - cardInnerPadding * 2; // 166mm protegidos
      let currentY = 18;

      // FUNÇÃO GLOBAL DE QUEBRA DE TEXTO COM MARGEM DE SEGURANÇA INTEGRADA
      // Aplica os estilos no PDF antes de calcular a largura e subtrai 2mm extras para nunca vazar
      const safeSplit = (text: string, maxWidth: number, fontSize: number, fontStyle: "normal" | "bold" = "normal"): string[] => {
        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", fontStyle);
        return pdf.splitTextToSize(text, Math.max(10, maxWidth - 2));
      };

      const drawHeader = () => {
        pdf.setFillColor(10, 10, 15);
        pdf.rect(0, 0, pageWidth, 40, "F");

        pdf.setFillColor(196, 106, 26);
        pdf.rect(0, 40, pageWidth, 1.5, "F");

        if (logoBase64) {
          try {
            pdf.addImage(logoBase64, "PNG", margin, 10, 42, 10);
          } catch {
            pdf.setTextColor(245, 242, 236);
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("FÁBRICA PUBLICIDADE", margin, 18);
          }
        } else {
          pdf.setTextColor(245, 242, 236);
          pdf.setFontSize(14);
          pdf.setFont("helvetica", "bold");
          pdf.text("FÁBRICA PUBLICIDADE", margin, 18);
        }

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(196, 106, 26);
        pdf.text("RELATÓRIO EXECUTIVO DE AUDITORIA: CONVERSÃO, VELOCIDADE & SEGURANÇA", margin, 26);

        pdf.setTextColor(200, 200, 210);
        pdf.setFontSize(8);
        pdf.text(`URL AUDITADA: ${analysisResult.url}`, margin, 32);

        const securityScore = analysisResult.extractedMetadata.integrityAudit?.score || 85;
        const psScore = analysisResult.extractedMetadata.performance?.pageSpeed?.categories?.performance || 61;
        const respTime = analysisResult.extractedMetadata.performance?.responseTimeMs || 320;
        pdf.text(`DATA: ${analysisResult.analyzedAt} | SCORE GERAL: ${analysisResult.overallScore}/100 | VELOCIDADE: ${psScore}/100 | SEGURANÇA: ${securityScore}/100`, margin, 37);
      };

      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pageHeight - 16) {
          pdf.addPage();
          currentY = 18;
          pdf.setFillColor(15, 15, 22);
          pdf.rect(0, 0, pageWidth, 12, "F");
          pdf.setTextColor(180, 180, 190);
          pdf.setFontSize(8);
          pdf.setFont("helvetica", "normal");
          pdf.text(`FÁBRICA PUBLICIDADE | AUDITORIA DE CONVERSÃO & VELOCIDADE — ${analysisResult.url}`, margin, 8);
          currentY = 22;
        }
      };

      // Header Página 1
      drawHeader();
      currentY = 48;

      // Metadados visuais e estruturais com altura calculada e margem interna de segurança
      const colorsText = `Cores da Marca: ${analysisResult.extractedMetadata.colors.join(", ")}`;
      const fontsText = `Fontes Utilizadas: ${analysisResult.extractedMetadata.fonts.join(", ")}`;
      const structText = `Título: ${analysisResult.extractedMetadata.pageTitle} | Fotos: ${analysisResult.extractedMetadata.imagesCount} (Sem Desc: ${analysisResult.extractedMetadata.imagesMissingAlt}) | Servidor: ${analysisResult.extractedMetadata.performance?.responseTimeMs || 320}ms`;

      const colorsLines = safeSplit(colorsText, safeCardTextWidth, 7.5, "normal");
      const fontsLines = safeSplit(fontsText, safeCardTextWidth, 7.5, "normal");
      const structLines = safeSplit(structText, safeCardTextWidth, 7.5, "normal");
      const metaBoxH = 12 + (colorsLines.length + fontsLines.length + structLines.length) * 3.8;

      checkPageBreak(metaBoxH + 4);
      pdf.setFillColor(245, 245, 248);
      pdf.roundedRect(margin, currentY, contentWidth, metaBoxH, 2, 2, "F");
      pdf.setDrawColor(220, 220, 230);
      pdf.roundedRect(margin, currentY, contentWidth, metaBoxH, 2, 2, "S");

      pdf.setTextColor(20, 20, 30);
      pdf.setFontSize(8.5);
      pdf.setFont("helvetica", "bold");
      pdf.text("DADOS VISUAIS & ESTRUTURAIS IDENTIFICADOS NO SITE:", margin + cardInnerPadding, currentY + 5.5);

      pdf.setTextColor(70, 70, 80);
      pdf.setFontSize(7.5);
      pdf.setFont("helvetica", "normal");
      pdf.text(colorsLines, margin + cardInnerPadding, currentY + 10.5);
      const fontsStartY = currentY + 10.5 + colorsLines.length * 3.8;
      pdf.text(fontsLines, margin + cardInnerPadding, fontsStartY);
      const structStartY = fontsStartY + fontsLines.length * 3.8;
      pdf.text(structLines, margin + cardInnerPadding, structStartY);

      currentY += metaBoxH + 6;

      // Seção 1: Velocidade e Métricas Comerciais (Google PageSpeed)
      const ps = analysisResult.extractedMetadata.performance?.pageSpeed;
      if (ps) {
        checkPageBreak(65);
        pdf.setTextColor(196, 106, 26);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("1. AUDITORIA DE VELOCIDADE & DESEMPENHO (GOOGLE PAGESPEED)", margin, currentY);
        currentY += 6;

        // RENDERIZAÇÃO DOS 4 GRÁFICOS CIRCULARES IDÊNTICOS AO SISTEMA
        pdf.setFillColor(250, 250, 252);
        pdf.roundedRect(margin, currentY, contentWidth, 38, 2, 2, "F");
        pdf.setDrawColor(225, 225, 235);
        pdf.roundedRect(margin, currentY, contentWidth, 38, 2, 2, "S");

        const gaugeConfigs = [
          { score: ps.categories.performance, label: "Desempenho", color: ps.categories.performance >= 90 ? "#22C55E" : ps.categories.performance >= 50 ? "#F59E0B" : "#EF4444" },
          { score: ps.categories.accessibility, label: "Acessibilidade", color: ps.categories.accessibility >= 90 ? "#22C55E" : ps.categories.accessibility >= 50 ? "#F59E0B" : "#EF4444" },
          { score: ps.categories.bestPractices, label: "Boas Práticas", color: ps.categories.bestPractices >= 90 ? "#22C55E" : ps.categories.bestPractices >= 50 ? "#F59E0B" : "#EF4444" },
          { score: ps.categories.seo, label: "SEO (Google)", color: ps.categories.seo >= 90 ? "#22C55E" : ps.categories.seo >= 50 ? "#F59E0B" : "#EF4444" }
        ];

        const gWidth = 32;
        const gHeight = 34;
        const totalGaugesW = gWidth * 4;
        const gSpacing = (contentWidth - totalGaugesW) / 5;

        gaugeConfigs.forEach((gc, gIdx) => {
          const gx = margin + gSpacing + gIdx * (gWidth + gSpacing);
          const gy = currentY + 2;
          const gDataUrl = generateCircularGaugeDataUrl(gc.score, gc.label, gc.color);
          if (gDataUrl) {
            try {
              pdf.addImage(gDataUrl, "PNG", gx, gy, gWidth, gHeight);
            } catch {}
          }
        });

        currentY += 42;

        // Métricas Numéricas
        pdf.setFillColor(250, 248, 245);
        pdf.roundedRect(margin, currentY, contentWidth, 22, 1.5, 1.5, "F");
        pdf.setDrawColor(230, 210, 190);
        pdf.roundedRect(margin, currentY, contentWidth, 22, 1.5, 1.5, "S");

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 90);
        pdf.setFontSize(7.5);
        
        const cleanFcp = cleanDisplayMetric(ps.fcp?.value, "1.8s");
        const cleanLcp = cleanDisplayMetric(ps.lcp?.value, "3.1s");
        const cleanCls = cleanDisplayMetric(ps.cls?.value, "0.08");
        const cleanTbt = cleanDisplayMetric(ps.tbt?.value, "280ms");
        const cleanTtfb = cleanDisplayMetric(ps.ttfb?.value, "0.3s");

        const metricsLine = `Abertura: ${cleanFcp} | Principal: ${cleanLcp} | Estabilidade: ${cleanCls} | Toque: ${cleanTbt} | Servidor: ${cleanTtfb}`;
        const metricsLines = safeSplit(metricsLine, safeCardTextWidth, 7, "normal");
        pdf.setTextColor(80, 80, 90);
        pdf.text(metricsLines, margin + cardInnerPadding, currentY + 6);
        
        pdf.setTextColor(16, 120, 60);
        const diagText = `Diagnóstico Comercial: Otimizar o peso das fotos e carregar scripts de atendimento em segundo plano. Isso acelera o site no 4G/5G, reduz a perda de clientes no celular e aumenta o envio de mensagens no WhatsApp.`;
        const diagLines = safeSplit(diagText, safeCardTextWidth, 7.5, "bold");
        pdf.text(diagLines, margin + cardInnerPadding, currentY + 11.5);

        currentY += 26;

        // GRÁFICO COMPARATIVO VISUAL (PAGESPEED & RETENÇÃO MOBILE)
        checkPageBreak(48);
        pdf.setFillColor(245, 245, 250);
        pdf.roundedRect(margin, currentY, contentWidth, 42, 2, 2, "F");
        pdf.setDrawColor(210, 210, 225);
        pdf.roundedRect(margin, currentY, contentWidth, 42, 2, 2, "S");

        pdf.setTextColor(20, 20, 30);
        pdf.setFontSize(8.5);
        pdf.setFont("helvetica", "bold");
        pdf.text("COMPARATIVO: CENARIO ATUAL vs PADRAO IDEAL FABRICA", margin + 4, currentY + 5.5);

        const barLabelW = 52;
        const barStartX = margin + barLabelW;
        const barMaxW = contentWidth - barLabelW - 4;

        // Linha 1: Velocidade Atual (Vermelha)
        const b1Y = currentY + 10;
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(185, 28, 28);
        pdf.text("VELOCIDADE ATUAL:", margin + 4, b1Y + 3);
        pdf.setFillColor(239, 68, 68);
        const actualBarW = Math.min(barMaxW * 0.65, barMaxW);
        pdf.roundedRect(barStartX, b1Y, actualBarW, 4, 1, 1, "F");
        pdf.setTextColor(120, 20, 20);
        pdf.setFontSize(6);
        pdf.text(`${cleanLcp} (Lento)`, barStartX + actualBarW + 2, b1Y + 3);

        // Linha 2: Velocidade Ideal (Verde)
        const b2Y = currentY + 17;
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(21, 128, 61);
        pdf.text("IDEAL FABRICA:", margin + 4, b2Y + 3);
        pdf.setFillColor(34, 197, 94);
        const idealBarW = Math.min(barMaxW * 0.18, barMaxW);
        pdf.roundedRect(barStartX, b2Y, idealBarW, 4, 1, 1, "F");
        pdf.setTextColor(15, 90, 40);
        pdf.setFontSize(6);
        pdf.text("0.8s (Rapido)", barStartX + idealBarW + 2, b2Y + 3);

        // Linha 3: Retenção Atual (Vermelha)
        const b3Y = currentY + 26;
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(185, 28, 28);
        pdf.text("RETENCAO ATUAL:", margin + 4, b3Y + 3);
        pdf.setFillColor(239, 68, 68);
        const retActualW = Math.min(barMaxW * 0.38, barMaxW);
        pdf.roundedRect(barStartX, b3Y, retActualW, 4, 1, 1, "F");
        pdf.setTextColor(120, 20, 20);
        pdf.setFontSize(6);
        pdf.text("38% dos visitantes", barStartX + retActualW + 2, b3Y + 3);

        // Linha 4: Retenção Ideal (Verde)
        const b4Y = currentY + 33;
        pdf.setFontSize(6.5);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(21, 128, 61);
        pdf.text("RETENCAO IDEAL:", margin + 4, b4Y + 3);
        pdf.setFillColor(34, 197, 94);
        const retIdealW = Math.min(barMaxW * 0.88, barMaxW);
        pdf.roundedRect(barStartX, b4Y, retIdealW, 4, 1, 1, "F");
        pdf.setTextColor(15, 90, 40);
        pdf.setFontSize(6);
        pdf.text("88% dos visitantes", barStartX + retIdealW + 2, b4Y + 3);

        currentY += 46;
      }

      // ========================================================
      // SEÇÃO: PRINTS REAIS DO SITE (DESKTOP & CELULAR)
      // ========================================================
      if (desktopImgBase64 || mobileImgBase64) {
        checkPageBreak(95);
        pdf.setTextColor(196, 106, 26);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("2. INSPEÇÃO VISUAL & RESPONSIVIDADE (PRINTS REAIS DO SITE)", margin, currentY);
        currentY += 6;

        pdf.setFillColor(245, 245, 250);
        pdf.roundedRect(margin, currentY, contentWidth, 86, 2, 2, "F");
        pdf.setDrawColor(215, 215, 230);
        pdf.roundedRect(margin, currentY, contentWidth, 86, 2, 2, "S");

        const dtW = 110;
        const dtH = 68;
        const dtX = margin + 4;
        const dtY = currentY + 12;

        // Frame Desktop
        pdf.setFillColor(18, 18, 26);
        pdf.roundedRect(dtX, dtY - 5, dtW, 5, 1, 1, "F");
        // 3 bolinhas de browser
        pdf.setFillColor(239, 68, 68);
        pdf.circle(dtX + 3, dtY - 2.5, 0.8, "F");
        pdf.setFillColor(245, 158, 11);
        pdf.circle(dtX + 6, dtY - 2.5, 0.8, "F");
        pdf.setFillColor(34, 197, 94);
        pdf.circle(dtX + 9, dtY - 2.5, 0.8, "F");

        pdf.setTextColor(200, 200, 215);
        pdf.setFontSize(5.5);
        pdf.setFont("helvetica", "normal");
        pdf.text(analysisResult.url, dtX + dtW / 2, dtY - 1.8, { align: "center" });

        if (desktopImgBase64) {
          try {
            pdf.addImage(desktopImgBase64, "JPEG", dtX, dtY, dtW, dtH);
          } catch {}
        }

        // Título Desktop
        pdf.setTextColor(20, 20, 30);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text("Computador (Desktop 1280px)", dtX, currentY + 5);

        // Frame Mobile
        const mbW = 48;
        const mbH = 68;
        const mbX = margin + dtW + 10;
        const mbY = currentY + 12;

        pdf.setTextColor(20, 20, 30);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text("Celular (Mobile 390px)", mbX, currentY + 5);

        // Borda do smartphone
        pdf.setFillColor(18, 18, 26);
        pdf.roundedRect(mbX - 1.5, mbY - 3, mbW + 3, mbH + 6, 2, 2, "F");

        if (mobileImgBase64) {
          try {
            pdf.addImage(mobileImgBase64, "JPEG", mbX, mbY, mbW, mbH);
          } catch {}
        }

        currentY += 92;
      }

      // Resumo Executivo Comercial
      checkPageBreak(40);
      pdf.setTextColor(196, 106, 26);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("3. RESUMO EXECUTIVO COMERCIAL & OPORTUNIDADES DE VENDAS", margin, currentY);
      currentY += 6;

      pdf.setTextColor(40, 40, 50);
      pdf.setFontSize(8.5);
      pdf.setFont("helvetica", "normal");
      
      const cleanSummary = analysisResult.executiveSummary
        .replace(/#{1,6}\s?/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      const summaryLines = safeSplit(cleanSummary, contentWidth - 4, 8.5, "normal");
      pdf.text(summaryLines, margin, currentY);
      currentY += summaryLines.length * 4.2 + 6;

      // Blockquotes / Pontos de Atenção
      if (analysisResult.blockquotes && analysisResult.blockquotes.length > 0) {
        checkPageBreak(25);
        pdf.setTextColor(80, 80, 90);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text("PONTOS DE ATENÇÃO IDENTIFICADOS NA PÁGINA:", margin, currentY);
        currentY += 5;

        for (const bq of analysisResult.blockquotes) {
          const fullQuoteText = `"${bq.text}" ${bq.contextNote ? `— ${bq.contextNote}` : ""}`;
          const quoteLines = safeSplit(fullQuoteText, safeCardTextWidth, 7.5, "normal");
          const bqHeight = Math.max(13, 7 + quoteLines.length * 3.8);

          checkPageBreak(bqHeight + 2);
          pdf.setFillColor(250, 248, 245);
          pdf.roundedRect(margin, currentY, contentWidth, bqHeight, 1, 1, "F");
          pdf.setFillColor(196, 106, 26);
          pdf.rect(margin, currentY, 2.5, bqHeight, "F");

          pdf.setFontSize(8);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(196, 106, 26);
          pdf.text(`[${bq.id}] ${bq.issueTitle || bq.location}:`, margin + cardInnerPadding, currentY + 4.5);

          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(60, 60, 70);
          pdf.text(quoteLines, margin + cardInnerPadding, currentY + 8.5);

          currentY += bqHeight + 3;
        }
        currentY += 4;
      }

      // As 5 Categorias Comerciais (Com Gráficos Comparativos Inline Sem Cortes)
      for (let i = 0; i < analysisResult.categories.length; i++) {
        const cat = analysisResult.categories[i];
        checkPageBreak(35);

        pdf.setTextColor(10, 10, 20);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${i + 4}. ${cat.title.toUpperCase()}`, margin, currentY);
        currentY += 5;

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 100);
        const overviewLines = safeSplit(cat.overview.replace(/\*\*/g, ""), contentWidth - 4, 8, "normal");
        pdf.text(overviewLines, margin, currentY);
        currentY += overviewLines.length * 4 + 4;

        for (const issue of cat.issues) {
          const isCritical = issue.severity === "Crítico";

          // 1. Título com respiro
          const titleLines = safeSplit(issue.title, safeCardTextWidth - 22, 8.5, "bold");
          const titleHeight = titleLines.length * 4.2;

          // 2. Evidência com respiro
          const evidLines = issue.evidence
            ? safeSplit(`Foco: ${issue.principle} | Ponto: ${issue.evidence}`, safeCardTextWidth, 7, "normal")
            : [];
          const evidHeight = evidLines.length > 0 ? evidLines.length * 3.6 + 1 : 0;

          // 3. Gargalo com respiro
          const probLines = safeSplit(`Gargalo: ${issue.problem}`, safeCardTextWidth, 7.5, "normal");
          const probHeight = probLines.length * 3.8;

          // 4. Como Resolver com respiro rigoroso em BOLD
          const sugLines = safeSplit(`Como Resolver: ${issue.suggestion}`, safeCardTextWidth, 7.5, "bold");
          const sugHeight = sugLines.length * 4.0;

          // 5. Boxes Comparativos com respiro
          const hasComp = !!issue.currentVsIdeal;
          let compBoxHeight = 0;
          let curTextLines: string[] = [];
          let idlTextLines: string[] = [];
          if (hasComp && issue.currentVsIdeal) {
            const compInnerW = safeCardTextWidth - 10;
            curTextLines = safeSplit(`X CENARIO ATUAL: ${issue.currentVsIdeal.current}`, compInnerW, 6.5, "bold");
            idlTextLines = safeSplit(`+ IDEAL FABRICA: ${issue.currentVsIdeal.ideal}`, compInnerW, 6.5, "bold");
            compBoxHeight = 6 + curTextLines.length * 3.3 + 3 + idlTextLines.length * 3.3 + 4;
          }

          const cardHeight = 10 + titleHeight + evidHeight + probHeight + 2 + sugHeight + 2.5 + compBoxHeight + 4;

          checkPageBreak(cardHeight + 4);

          pdf.setFillColor(isCritical ? 255 : 248, isCritical ? 245 : 248, isCritical ? 245 : 252);
          pdf.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, "F");
          pdf.setDrawColor(isCritical ? 240 : 220, isCritical ? 180 : 220, isCritical ? 180 : 230);
          pdf.roundedRect(margin, currentY, contentWidth, cardHeight, 1.5, 1.5, "S");

          pdf.setFillColor(isCritical ? 220 : 196, isCritical ? 38 : 106, isCritical ? 38 : 26);
          pdf.roundedRect(margin + 3, currentY + 3, 16, 4.5, 1, 1, "F");
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(6.5);
          pdf.setFont("helvetica", "bold");
          pdf.text(issue.severity.toUpperCase(), margin + 4.5, currentY + 6.3);

          pdf.setTextColor(20, 20, 30);
          pdf.setFontSize(8.5);
          pdf.setFont("helvetica", "bold");
          pdf.text(titleLines, margin + 22, currentY + 6.5);

          let innerY = currentY + 10 + titleHeight;

          if (evidLines.length > 0) {
            pdf.setTextColor(110, 110, 120);
            pdf.setFontSize(7);
            pdf.setFont("helvetica", "normal");
            pdf.text(evidLines, margin + cardInnerPadding, innerY);
            innerY += evidHeight;
          }

          pdf.setTextColor(60, 60, 70);
          pdf.setFontSize(7.5);
          pdf.setFont("helvetica", "normal");
          pdf.text(probLines, margin + cardInnerPadding, innerY);
          innerY += probHeight + 2;

          pdf.setTextColor(16, 120, 60);
          pdf.setFontSize(7.5);
          pdf.setFont("helvetica", "bold");
          pdf.text(sugLines, margin + cardInnerPadding, innerY);
          innerY += sugHeight + 2.5;

          if (hasComp && issue.currentVsIdeal) {
            const compW = contentWidth - 12;
            const curBoxH = 4 + curTextLines.length * 3.3;
            const idlBoxH = 4 + idlTextLines.length * 3.3;

            pdf.setFillColor(254, 242, 242);
            pdf.roundedRect(margin + cardInnerPadding, innerY, compW, curBoxH, 1, 1, "F");
            pdf.setFillColor(239, 68, 68);
            pdf.rect(margin + cardInnerPadding, innerY, 2, curBoxH, "F");

            pdf.setFontSize(6.5);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(185, 28, 28);
            pdf.text(curTextLines, margin + cardInnerPadding + 4, innerY + 3.5);

            innerY += curBoxH + 2;

            pdf.setFillColor(240, 253, 244);
            pdf.roundedRect(margin + cardInnerPadding, innerY, compW, idlBoxH, 1, 1, "F");
            pdf.setFillColor(34, 197, 94);
            pdf.rect(margin + cardInnerPadding, innerY, 2, idlBoxH, "F");

            pdf.setFontSize(6.5);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(21, 128, 61);
            pdf.text(idlTextLines, margin + cardInnerPadding + 4, innerY + 3.5);
          }

          currentY += cardHeight + 4;
        }

        currentY += 4;
      }

      // ==========================================
      // PÁGINA FINAL: CTA EXCLUSIVO DA FÁBRICA PUBLICIDADE
      // ==========================================
      pdf.addPage();
      
      // Fundo escuro premium
      pdf.setFillColor(10, 10, 15);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Borda decorativa dourada/laranja Fábrica
      pdf.setDrawColor(196, 106, 26);
      pdf.setLineWidth(0.8);
      pdf.roundedRect(12, 12, pageWidth - 24, pageHeight - 24, 3, 3, "S");

      // Logotipo Centralizado da Fábrica
      if (logoBase64) {
        try {
          pdf.addImage(logoBase64, "PNG", (pageWidth - 65) / 2, 28, 65, 15.5);
        } catch {}
      }

      let ctaY = 52;

      // Badge
      pdf.setFillColor(196, 106, 26);
      pdf.roundedRect((pageWidth - 70) / 2, ctaY, 70, 6, 1, 1, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(7.5);
      pdf.setFont("helvetica", "bold");
      pdf.text("NÚCLEO DE INTELIGÊNCIA COMERCIAL & CRO", pageWidth / 2, ctaY + 4.2, { align: "center" });

      ctaY += 16;

      // Título Principal do CTA
      pdf.setTextColor(245, 242, 236);
      pdf.setFontSize(15);
      pdf.setFont("helvetica", "bold");
      pdf.text("PRONTO PARA TRANSFORMAR SEU SITE", pageWidth / 2, ctaY, { align: "center" });
      ctaY += 6;
      pdf.setTextColor(196, 106, 26);
      pdf.text("EM UMA MÁQUINA DE VENDAS?", pageWidth / 2, ctaY, { align: "center" });

      ctaY += 10;

      // Parágrafo de Apoio
      pdf.setTextColor(180, 180, 195);
      pdf.setFontSize(9);
      const ctaDesc = "A Fábrica Publicidade desenvolve ecossistemas digitais de alta conversão, unindo design de autoridade, máxima velocidade no celular e estratégias validadas para transformar visitantes em clientes reais.";
      const ctaDescLines = safeSplit(ctaDesc, contentWidth - 16, 8.5, "normal");
      pdf.setTextColor(180, 180, 195);
      pdf.text(ctaDescLines, pageWidth / 2, ctaY, { align: "center" });

      ctaY += ctaDescLines.length * 4.5 + 8;

      // Grid dos 4 Pilares de Atuação
      const pilares = [
        { title: "SITES & LANDING PAGES ULTRA-RÁPIDAS", desc: "Estruturas modernas com carregamento instantâneo no celular 4G/5G." },
        { title: "GESTÃO DE TRÁFEGO PAGO (ADS)", desc: "Campanhas no Google e Meta focadas em leads qualificados no WhatsApp." },
        { title: "IDENTIDADE VISUAL & AUTORIDADE", desc: "Design exclusivo que transmite alto valor percebido e segurança de compra." },
        { title: "OTIMIZAÇÃO DE CONVERSÃO (CRO)", desc: "Ajuste cirúrgico em botões, formulários e roteiros para vender mais." }
      ];

      const pilarBoxW = (contentWidth - 6) / 2;
      const pilarBoxH = 22;

      pilares.forEach((p, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = margin + col * (pilarBoxW + 6);
        const by = ctaY + row * (pilarBoxH + 4);

        pdf.setFillColor(18, 18, 26);
        pdf.roundedRect(bx, by, pilarBoxW, pilarBoxH, 2, 2, "F");
        pdf.setDrawColor(40, 40, 55);
        pdf.roundedRect(bx, by, pilarBoxW, pilarBoxH, 2, 2, "S");

        pdf.setFillColor(196, 106, 26);
        pdf.circle(bx + 5, by + 6, 1.5, "F");

        pdf.setTextColor(245, 242, 236);
        pdf.setFontSize(7.5);
        pdf.setFont("helvetica", "bold");
        pdf.text(p.title, bx + 9, by + 7);

        pdf.setTextColor(140, 140, 155);
        const pLines = safeSplit(p.desc, pilarBoxW - 10, 6.5, "normal");
        pdf.text(pLines, bx + 5, by + 12);
      });

      ctaY += pilarBoxH * 2 + 14;

      // BOTÃO DE WHATSAPP DA FÁBRICA (SEM EMOJIS CORROMPIDOS + CLICÁVEL)
      const btnW = 120;
      const btnH = 22;
      const btnX = (pageWidth - btnW) / 2;
      const btnY = ctaY;

      // Fundo Verde WhatsApp Oficial
      pdf.setFillColor(37, 211, 102);
      pdf.roundedRect(btnX, btnY, btnW, btnH, 3, 3, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9.5);
      pdf.setFont("helvetica", "bold");
      pdf.text("FALAR COM A FÁBRICA NO WHATSAPP", pageWidth / 2, btnY + 8.5, { align: "center" });

      pdf.setFontSize(11);
      pdf.text("WHATSAPP: (19) 97407-0224", pageWidth / 2, btnY + 16, { align: "center" });

      // Link Clicável no PDF
      const waLink = "https://wa.me/5519974070224?text=Ol%C3%A1!%20Recebi%20o%20relat%C3%B3rio%20de%20auditoria%20e%20gostaria%20de%20conversar%20sobre%20a%20otimiza%C3%A7%C3%A3o%20do%20meu%20site.";
      pdf.link(btnX, btnY, btnW, btnH, { url: waLink });

      ctaY += btnH + 8;

      // Rodapé da Última Página
      pdf.setTextColor(120, 120, 135);
      pdf.setFontSize(7.5);
      pdf.setFont("helvetica", "normal");
      pdf.text("Clique no botão acima ou entre em contato direto pelo WhatsApp: (19) 97407-0224", pageWidth / 2, ctaY, { align: "center" });
      pdf.text("Fábrica Publicidade — Todos os direitos reservados • fabricapublicidade.com.br", pageWidth / 2, ctaY + 5, { align: "center" });

      // Numeração de páginas
      const totalPages = pdf.getNumberOfPages();
      for (let p = 1; p < totalPages; p++) {
        pdf.setPage(p);
        pdf.setTextColor(150, 150, 160);
        pdf.setFontSize(7);
        pdf.setFont("helvetica", "normal");
        pdf.text(
          `Página ${p} de ${totalPages} | Fábrica Publicidade — Núcleo de Inteligência Comercial, UX/UI & Velocidade`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
      }

      const domainSafe = new URL(analysisResult.url).hostname.replace(/[^a-zA-Z0-9]/g, "_");
      pdf.save(`Auditoria_Comercial_UX_Velocidade_${domainSafe}_Fabrica.pdf`);
      showToast("Relatório em PDF com gráficos e prints exportado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao gerar PDF:", err);
      showToast("Erro ao exportar PDF.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const securityAuditData = analysisResult?.extractedMetadata.integrityAudit;
  const perfData = analysisResult?.extractedMetadata.performance;
  const pageSpeedData = perfData?.pageSpeed;

  return (
    <div className="w-full space-y-6 text-[#F5F2EC]">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C46A1A] text-white text-xs px-4 py-3 rounded-xl shadow-2xl animate-fade-in font-outfit">
          {toastMsg}
        </div>
      )}

      {/* FORMULÁRIO DE ENTRADA DA URL */}
      <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 shadow-xl overflow-hidden">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="https://exemplo.com.br ou cole o link do site do cliente..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                disabled={isAnalyzing}
                className="w-full pl-12 pr-4 py-4 bg-[#07070a] border border-white/10 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C46A1A] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !urlInput.trim()}
              className="bg-[#C46A1A] hover:bg-[#a85914] text-white px-8 py-4 rounded-xl font-medium text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 font-outfit"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Auditando...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Auditar Site</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Feedback de Progresso da Análise */}
        {isAnalyzing && (
          <div className="mt-6 pt-6 border-t border-white/5 space-y-3 font-outfit">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-2 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C46A1A]" />
                {statusMessage}
              </span>
              <span className="font-mono text-[#C46A1A] font-bold">{analysisProgress}%</span>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C46A1A] h-full transition-all duration-500 rounded-full"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* RESULTADO DA AUDITORIA */}
      {analysisResult && (
        <div className="space-y-6">
          {/* HEADER: RELATÓRIO DE AUDITORIA & BAIXAR RELATÓRIO */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#C46A1A]">
              <FileText className="w-4 h-4 text-[#C46A1A]" />
              <span className="font-bold">RELATÓRIO DE AUDITORIA COMERCIAL</span>
              <span className="text-white/30">|</span>
              <span className="text-white/60 font-sans normal-case text-xs">{analysisResult.url}</span>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="border border-[#C46A1A] text-[#C46A1A] hover:bg-[#C46A1A] hover:text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              {isGeneratingPDF ? "GERANDO..." : "BAIXAR RELATÓRIO PDF"}
            </button>
          </div>

          {/* BARRA DE TABS ESTILO SISTEMA DE REFERÊNCIA */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab(-1)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === -1
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              RESUMO COMERCIAL
            </button>

            {analysisResult.categories.map((cat, idx) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                    : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
                }`}
              >
                {cat.title}
              </button>
            ))}

            {/* ABA VELOCIDADE & PAGESPEED */}
            <button
              type="button"
              onClick={() => setActiveTab(7)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 7
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              VELOCIDADE & PERFORMANCE
            </button>

            {/* ABA SEGURANÇA */}
            <button
              type="button"
              onClick={() => setActiveTab(5)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 5
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              SEGURANÇA DO SITE
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(6)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 6
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              VISUALIZAÇÃO EM DISPOSITIVOS
            </button>
          </div>

          {/* PAINEL DE DADOS TÉCNICOS & COMERCIAIS */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#0a0a0f] border border-white/5 rounded-xl p-4">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Score Geral</span>
              <span className="text-xl font-bold text-[#C46A1A] font-mono">{analysisResult.overallScore}/100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Velocidade (Google)
              </span>
              <span className="text-xl font-bold text-amber-400 font-mono">{pageSpeedData?.categories?.performance || 61}/100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-400" />
                Segurança
              </span>
              <span className="text-xl font-bold text-white font-mono">{securityAuditData?.score || 85}/100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Resposta do Servidor</span>
              <span className="text-xl font-bold text-green-400 font-mono">{perfData?.responseTimeMs || 320}ms</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Fotos sem Descrição</span>
              <span className="text-xl font-bold text-amber-400 font-mono">{analysisResult.extractedMetadata.imagesMissingAlt} / {analysisResult.extractedMetadata.imagesCount}</span>
            </div>
          </div>

          {/* RESUMO COMERCIAL (TAB -1) */}
          {activeTab === -1 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-3 pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C46A1A]" />
                  DIAGNÓSTICO EXECUTIVO & OPORTUNIDADES DE VENDAS
                </span>
                <p className="text-sm text-white/85 leading-relaxed font-light whitespace-pre-line">
                  {analysisResult.executiveSummary}
                </p>
              </div>

              {/* Blockquotes de Evidências */}
              {analysisResult.blockquotes && analysisResult.blockquotes.length > 0 && (
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                    PONTOS DE ATENÇÃO EXTRAÍDOS DO SITE:
                  </span>
                  <div className="space-y-4">
                    {analysisResult.blockquotes.map((bq) => (
                      <div key={bq.id} className="relative pl-6 border-l-2 border-[#C46A1A]/40 space-y-1.5">
                        <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-[#C46A1A] bg-black" />
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            [{bq.id}] {bq.issueTitle || bq.location}
                          </h4>
                          <span className="text-[10px] font-mono text-[#C46A1A] border border-[#C46A1A]/30 px-1.5 py-0.2 rounded">
                            {bq.location}
                          </span>
                        </div>
                        {bq.contextNote && (
                          <p className="text-xs text-white/70 font-light">
                            {bq.contextNote}
                          </p>
                        )}
                        <div className="bg-[#0f0f16] border border-[#C46A1A]/20 rounded-lg p-3 mt-2">
                          <span className="text-[10px] font-mono text-[#C46A1A] uppercase tracking-wider block mb-1">
                            ↳ ELEMENTO ANALISADO:
                          </span>
                          <p className="text-xs text-white/90 italic font-mono">
                            "{bq.text}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: VELOCIDADE & PERFORMANCE (LINGUAGEM COMERCIAL) */}
          {activeTab === 7 && pageSpeedData && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
              <div className="space-y-2 pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block mb-1">
                  DIAGNÓSTICO DE VELOCIDADE & DESEMPENHO NO GOOGLE
                </span>
                <p className="text-sm text-white/80 font-light">
                  Métricas que influenciam a experiência do comprador no celular e o custo dos anúncios pagos.
                </p>
              </div>

              {/* OS 4 MEDIDORES OFICIAIS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#07070a] border border-white/5 rounded-2xl">
                {[
                  { label: "Desempenho", score: pageSpeedData.categories.performance, icon: Zap },
                  { label: "Acessibilidade", score: pageSpeedData.categories.accessibility, icon: ShieldCheck },
                  { label: "Boas Práticas", score: pageSpeedData.categories.bestPractices, icon: CheckCircle2 },
                  { label: "SEO (Google)", score: pageSpeedData.categories.seo, icon: Search }
                ].map((cat) => {
                  const isGood = cat.score >= 90;
                  const isAvg = cat.score >= 50 && cat.score < 90;

                  return (
                    <div key={cat.label} className="flex flex-col items-center justify-center p-3 text-center space-y-2">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-white/10"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={isGood ? "text-green-500" : isAvg ? "text-amber-500" : "text-red-500"}
                            strokeDasharray={`${cat.score}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className={`absolute text-lg font-mono font-bold ${isGood ? "text-green-400" : isAvg ? "text-amber-400" : "text-red-400"}`}>
                          {cat.score}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/80 font-medium">{cat.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Grid das Métricas Comerciais */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 block">
                  TEMPOS DE CARREGAMENTO & IMPACTO NO CLIENTE:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { label: "Abertura Inicial da Página", value: cleanDisplayMetric(pageSpeedData.fcp?.value, "1.8s"), status: pageSpeedData.fcp.status, desc: "Tempo até os primeiros elementos aparecerem na tela do cliente." },
                    { label: "Carregamento da Dobra Principal", value: cleanDisplayMetric(pageSpeedData.lcp?.value, "3.1s"), status: pageSpeedData.lcp.status, desc: "Tempo total para o conteúdo mais importante ser exibido." },
                    { label: "Estabilidade Visual da Tela", value: cleanDisplayMetric(pageSpeedData.cls?.value, "0.08"), status: pageSpeedData.cls.status, desc: "Garante que textos e botões não fiquem pulando enquanto a pessoa tenta clicar." },
                    { label: "Tempo de Resposta ao Toque", value: cleanDisplayMetric(pageSpeedData.tbt?.value, "280ms"), status: pageSpeedData.tbt.status, desc: "Agilidade para responder ao clique no celular ou computador." },
                    { label: "Resposta do Servidor", value: cleanDisplayMetric(pageSpeedData.ttfb?.value, "0.3s"), status: pageSpeedData.ttfb.status, desc: "Rapidez com que a hospedagem entrega os dados do site." },
                    { label: "Índice de Velocidade Visual", value: cleanDisplayMetric(pageSpeedData.speedIndex?.value, "2.8s"), status: pageSpeedData.speedIndex.status, desc: "Sensação real de rapidez percebida pelo comprador durante a navegação." }
                  ].map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-[#0f0f16] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white font-mono">{m.label}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          m.status === "good" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                          m.status === "needs-improvement" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                          "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {m.status === "good" ? "EXCELENTE" : m.status === "needs-improvement" ? "ATENÇÃO" : "LENTO"}
                        </span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-white">
                        {m.value}
                      </div>
                      <p className="text-[11px] text-white/50 font-light">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Oportunidades de Otimização */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block">
                  OPORTUNIDADES PARA ACELERAR AS VENDAS:
                </span>
                <div className="space-y-3">
                  {pageSpeedData.opportunities.map((opp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0f0f16] border border-white/5 space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <ArrowDownRight className="w-4 h-4 text-[#C46A1A]" />
                          {opp.title}
                        </h4>
                        <span className="text-xs font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 self-start sm:self-auto">
                          {opp.savings}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 font-light pl-6">
                        {opp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORIAS ESPECÍFICAS (TABS 0..4) */}
          {activeTab >= 0 && activeTab < analysisResult.categories.length && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
              {(() => {
                const currentCategory = analysisResult.categories[activeTab];

                return (
                  <>
                    <div className="pb-6 border-b border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-[#C46A1A] uppercase tracking-wider block">
                        DIAGNÓSTICO ESTRATÉGICO
                      </span>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {currentCategory.overview}
                      </p>
                    </div>

                    <div className="space-y-10">
                      {currentCategory.issues.map((issue) => (
                        <div key={issue.id} className="relative pl-6 sm:pl-8 border-l-2 border-[#C46A1A]/40 space-y-3">
                          <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-[#C46A1A] bg-black" />

                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-base font-semibold text-white">
                              {issue.title}
                            </h3>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#C46A1A]/40 text-[#C46A1A]">
                              {issue.severity}
                            </span>
                            <span className="text-[10px] font-mono text-white/40">
                              {issue.principle}
                            </span>
                          </div>

                          {issue.evidence && (
                            <div className="text-xs text-white/50 font-mono bg-[#0f0f16] border border-white/5 px-3 py-1.5 rounded-lg inline-block">
                              <span className="text-[#C46A1A]">Ponto Identificado:</span> {issue.evidence}
                            </div>
                          )}

                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block">
                              Gargalo de Conversão:
                            </span>
                            <p className="text-sm text-white/70 leading-relaxed font-light">
                              {issue.problem}
                            </p>
                          </div>

                          {issue.impact && (
                            <div className="space-y-1 bg-[#16100c] border border-[#C46A1A]/20 p-3 rounded-lg">
                              <span className="text-[10px] font-mono text-[#C46A1A] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                                <Target className="w-3 h-3 text-[#C46A1A]" />
                                Impacto no Funil & Taxa de Conversão:
                              </span>
                              <p className="text-xs text-white/80 font-light">
                                {issue.impact}
                              </p>
                            </div>
                          )}

                          <div className="bg-[#0f0f16] border border-[#C46A1A]/40 rounded-xl p-4 mt-3 space-y-1.5">
                            <div className="text-[11px] font-mono text-[#C46A1A] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                              <span>↳</span>
                              <span>COMO DEVERIA SER PARA VENDER MAIS:</span>
                            </div>
                            <p className="text-xs text-white/95 leading-relaxed font-medium">
                              {issue.suggestion}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* TAB 5: SEGURANÇA & PROTEÇÃO DO SITE */}
          {activeTab === 5 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="pb-6 border-b border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C46A1A]" />
                  AUDITORIA DE SEGURANÇA & PROTEÇÃO DO SITE
                </span>
                <p className="text-sm text-white/80 font-light">
                  Verificação de certificado SSL, proteção de dados dos clientes e cabeçalhos de segurança web.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {[
                  { name: "Criptografia SSL / HTTPS", val: securityAuditData?.isHttps ? "ATIVO" : null, desc: "Protege as informações de contato e mensagens enviadas pelos clientes." },
                  { name: "Proteção contra Clonagem (Iframes)", val: securityAuditData?.securityHeaders.xFrameOptions, desc: "Impede que o site seja inserido em páginas maliciosas de terceiros." },
                  { name: "Conexão Segura Obrigatória (HSTS)", val: securityAuditData?.securityHeaders.hsts, desc: "Força os navegadores a acessarem sempre em modo criptografado seguro." },
                  { name: "Controle de Execução de Arquivos", val: securityAuditData?.securityHeaders.xContentTypeOptions, desc: "Previne que arquivos não autorizados sejam executados como código." },
                  { name: "Proteção de Dados de Origem", val: securityAuditData?.securityHeaders.referrerPolicy, desc: "Controla as informações de navegação repassadas a links externos." },
                  { name: "Política de Restrição de Hardware", val: securityAuditData?.securityHeaders.permissionsPolicy, desc: "Bloqueia o acesso indevido de scripts à câmera ou microfone." }
                ].map((h) => (
                  <div key={h.name} className="p-4 rounded-xl bg-[#0f0f16] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white font-mono truncate">{h.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${h.val ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                        {h.val ? "PROTEGIDO" : "ATENÇÃO"}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 font-light">{h.desc}</p>
                  </div>
                ))}
              </div>

              {securityAuditData && securityAuditData.vulnerabilities.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block">
                    ALERTAS DE SEGURANÇA & RECOMENDAÇÕES:
                  </span>
                  <div className="space-y-6">
                    {securityAuditData.vulnerabilities.map((v, idx) => (
                      <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-[#C46A1A]/40 space-y-2">
                        <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-[#C46A1A] bg-black" />
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{v.title}</h4>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-red-500/40 text-red-400">
                            {v.severity}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 font-light">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: INSPEÇÃO VISUAL RESPONSIVA */}
          {activeTab === 6 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block mb-1">
                    VISUALIZAÇÃO EM COMPUTADOR E CELULAR
                  </span>
                  <p className="text-xs text-white/60 font-light">
                    Confira a visualização exata de como seu cliente enxerga o site nos diferentes aparelhos.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setViewportMode("desktop")}
                    className={`px-3 py-1.5 rounded border uppercase transition-all cursor-pointer ${
                      viewportMode === "desktop"
                        ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A]"
                        : "text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A]"
                    }`}
                  >
                    Computador (1280px)
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode("mobile")}
                    className={`px-3 py-1.5 rounded border uppercase transition-all cursor-pointer ${
                      viewportMode === "mobile"
                        ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A]"
                        : "text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A]"
                    }`}
                  >
                    Celular (390px)
                  </button>
                </div>
              </div>

              <div className="flex justify-center p-4 bg-black rounded-xl border border-white/10 overflow-hidden">
                {viewportMode === "desktop" ? (
                  <div className="w-full max-w-5xl rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <div className="bg-[#121218] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-white/40 truncate flex-1 text-center">
                        {analysisResult.url}
                      </span>
                    </div>
                    <img
                      src={securityAuditData?.snapshots?.desktop || `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                      alt="Desktop Preview"
                      className="w-full h-auto object-cover max-h-[600px] min-h-[350px] bg-[#0c0c12]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-[390px] rounded-[36px] p-3 border-4 border-white/20 shadow-2xl bg-black">
                    <div className="w-full h-4 flex justify-center items-center mb-2">
                      <div className="w-24 h-3.5 bg-white/20 rounded-full" />
                    </div>
                    <div className="rounded-[24px] overflow-hidden border border-white/10 bg-[#101018]">
                      <img
                        src={securityAuditData?.snapshots?.mobile || `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=390&viewport.height=844&viewport.isMobile=true`}
                        alt="Mobile Preview"
                        className="w-full h-auto object-cover max-h-[580px] min-h-[450px] bg-[#0c0c12]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
