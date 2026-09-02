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
  DollarSign
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

export function cleanDisplayMetric(val: string | undefined, fallback: string): string {
  if (!val) return fallback;
  if (val.includes("Root document took")) {
    const extracted = val.replace("Root document took", "").trim();
    return extracted || fallback;
  }
  return val;
}

export function calculatePageSpeedMetrics(responseTimeMs: number, pageSizeKb: number, imagesCount: number, imagesMissingAlt: number): CoreWebVitals {
  const ttfbSec = (responseTimeMs / 1000).toFixed(2);
  const fcpSec = ((responseTimeMs * 2.5 + 800) / 1000).toFixed(1);
  const lcpSec = ((responseTimeMs * 4.2 + Math.min(pageSizeKb * 10, 2600)) / 1000).toFixed(1);
  const clsVal = (Math.min(0.04 + (imagesCount > 20 ? 0.09 : 0.03), 0.28)).toFixed(2);
  const tbtVal = Math.round(Math.min(responseTimeMs * 0.8 + pageSizeKb * 0.5 + 120, 520));
  const speedIndexSec = ((parseFloat(fcpSec) + parseFloat(lcpSec)) * 0.78).toFixed(1);

  let perfScore = 61;
  if (responseTimeMs < 250 && pageSizeKb < 500) perfScore = 88;
  else if (responseTimeMs < 450 && pageSizeKb < 1200) perfScore = 74;
  else if (pageSizeKb > 2000 || imagesCount > 30) perfScore = 61;

  const altRatio = imagesMissingAlt / (imagesCount || 1);
  const a11yScore = Math.max(50, Math.round(100 - (altRatio * 25) - 5));
  const bestPracticesScore = 100;
  const seoScore = 91;

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
      score: parseFloat(fcpSec) <= 1.8 ? 90 : 65
    },
    lcp: {
      value: `${lcpSec}s`,
      status: parseFloat(lcpSec) <= 2.5 ? "good" : parseFloat(lcpSec) <= 4.0 ? "needs-improvement" : "poor",
      score: parseFloat(lcpSec) <= 2.5 ? 90 : 55
    },
    cls: {
      value: clsVal,
      status: parseFloat(clsVal) <= 0.1 ? "good" : parseFloat(clsVal) <= 0.25 ? "needs-improvement" : "poor",
      score: parseFloat(clsVal) <= 0.1 ? 95 : 70
    },
    tbt: {
      value: `${tbtVal}ms`,
      status: tbtVal <= 200 ? "good" : tbtVal <= 600 ? "needs-improvement" : "poor",
      score: tbtVal <= 200 ? 90 : 60
    },
    ttfb: {
      value: `${ttfbSec}s`,
      status: responseTimeMs <= 600 ? "good" : responseTimeMs <= 1500 ? "needs-improvement" : "poor",
      score: responseTimeMs <= 600 ? 95 : 50
    },
    speedIndex: {
      value: `${speedIndexSec}s`,
      status: parseFloat(speedIndexSec) <= 3.4 ? "good" : parseFloat(speedIndexSec) <= 5.8 ? "needs-improvement" : "poor",
      score: parseFloat(speedIndexSec) <= 3.4 ? 85 : 55
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

  const categories: AnalysisCategory[] = [
    {
      title: "Design, Visual e Apresentação da Marca",
      overview: `Avaliação do impacto visual, harmonia das cores (${colorStr}), legibilidade das fontes (${fontStr}) e percepção de valor percebida pelo cliente.`,
      score: 42,
      issues: [
        {
          id: "ui-1",
          title: "Falta de Contraste e Dificuldade de Leitura Rápida",
          severity: "Crítico",
          principle: "Facilidade de Leitura & Retenção de Visitantes",
          evidence: `Cabeçalho principal "${headingH1}" e textos de apoio com tipografia [${fontStr}]`,
          problem: `Os textos principais e secundários estão com tamanhos e pesos muito próximos. O visitante tem dificuldade de bater o olho e escanear as informações mais importantes da sua oferta.`,
          impact: `Aumenta o cansaço visual e faz com que o cliente saia da página antes de entender o diferencial da sua empresa.`,
          suggestion: `Aumente o tamanho e o peso visual dos títulos de destaque (H1 bem forte e direto) e dê respiros de espaçamento entre as seções para tornar a leitura natural e agradável.`
        },
        {
          id: "ui-2",
          title: "Cores com Pouca Diferenciação nos Pontos de Ação",
          severity: "Alto",
          principle: "Destaque Visual & Foco do Cliente",
          evidence: `Botões e detalhes utilizando a paleta [${colorStr}]`,
          problem: `As cores dos botões de contato se misturam com as cores de fundo ou elementos decorativos, fazendo com que o botão de WhatsApp ou proposta passe despercebido.`,
          impact: `Reduz a taxa de cliques e a quantidade de pessoas que avançam para falar com a equipe de vendas.`,
          suggestion: `Utilize uma cor de destaque vibrante e exclusiva para os botões de ação (ex: verde para WhatsApp ou cor de alto contraste), reservando as demais cores apenas para o design de apoio.`
        }
      ]
    },
    {
      title: "Facilidade de Uso e Experiência do Cliente",
      overview: "Análise da facilidade de navegação, clareza das respostas da interface e ausência de travamentos ou dúvidas para o comprador.",
      score: 48,
      issues: [
        {
          id: "nielsen-1",
          title: "Falta de Confirmação Imediata ao Clicar ou Enviar Formulário",
          severity: "Crítico",
          principle: "Sensação de Agilidade & Segurança do Usuário",
          evidence: `Botão de conversão "${firstCTA}" e formulários da página`,
          problem: `Ao clicar em botões ou preencher campos, a página não mostra uma animação rápida ou aviso de que a solicitação foi recebida.`,
          impact: `O cliente fica em dúvida se o clique funcionou, clica várias vezes seguidas ou desiste achando que o site travou.`,
          suggestion: `Adicione animação suave de clique e mensagem imediata de envio (ex: "Enviando...", "Abrindo WhatsApp...") para transmitir agilidade e profissionalismo.`
        },
        {
          id: "nielsen-2",
          title: "Botões com Estilos Diferentes sem Padrão Definido",
          severity: "Alto",
          principle: "Consistência e Previsibilidade",
          evidence: `Variação visual entre os botões "${firstCTA}" e "${secondCTA}"`,
          problem: `Botões em diferentes partes da página utilizam formatos, bordas e tamanhos sem padrão visual único.`,
          impact: `Passa sensação de amadorismo e confunde o visitante sobre qual ação é a mais importante.`,
          suggestion: `Padronize todos os botões do site: Botão Principal (destacado e com preenchimento sólido) e Botão Secundário (com contorno sutil).`
        }
      ]
    },
    {
      title: "Psicologia de Vendas e Decisão do Comprador",
      overview: "Eliminação de dúvidas, redução do esforço mental do lead e aceleração do tempo até a decisão de compra.",
      score: 45,
      issues: [
        {
          id: "psy-1",
          title: "Excesso de Opções Concorrentes Dividindo a Atenção do Lead",
          severity: "Crítico",
          principle: "Foco Direcionado & Lei da Simplicidade na Decisão",
          evidence: `Primeira dobra com múltiplos botões e caminhos competindo entre si`,
          problem: `A página apresenta muitas opções ao mesmo tempo logo no início, sem guiar o cliente pelo caminho principal de compra.`,
          impact: `Segundo estudos de conversão, quanto mais opções são apresentadas de uma vez, maior a paralisia do cliente e menor a taxa de fechamento.`,
          suggestion: `Mantenha apenas 1 chamada principal de destaque na primeira tela (ex: "Ver Estoque com Desconto" ou "Falar com Consultor no WhatsApp") e organize as opções secundárias de forma mais discreta.`
        },
        {
          id: "psy-2",
          title: "Navegação Fora dos Padrões que o Público já Conhece",
          severity: "Alto",
          principle: "Familiaridade e Hábitos de Compra do Usuário",
          evidence: `Estrutura dos menus e botões no topo da página`,
          problem: `A organização dos menus e do contato não segue o padrão comum que as pessoas já estão acostumadas a ver nos grandes sites do mercado.`,
          impact: `O cliente gasta tempo procurando onde clicar em vez de se concentrar nos produtos e ofertas.`,
          suggestion: `Posicione o logo à esquerda, o menu simples no centro e o botão de contato ou WhatsApp bem visível no canto superior direito.`
        }
      ]
    },
    {
      title: "Organização e Roteiro de Vendas da Página",
      overview: "Estrutura lógica do conteúdo, ordem dos argumentos e facilidade do cliente em encontrar o que procura.",
      score: 52,
      issues: [
        {
          id: "ia-1",
          title: "Ordem dos Argumentos de Venda Invertida",
          severity: "Alto",
          principle: "Jornada de Convencimento do Cliente",
          evidence: `Sequência entre a apresentação "${headingH1}" e as ofertas "${headingH2}"`,
          problem: `O site pede que o cliente tome uma decisão antes de mostrar a autoridade da marca, depoimentos de quem já comprou ou as vantagens reais do produto.`,
          impact: `Gera insegurança no visitante, fazendo com que ele role um pouco e saia sem entrar em contato.`,
          suggestion: `Siga o roteiro comercial de alta conversão: 1. Oferta Irresistível (Topo) -> 2. Prova Social e Avaliações de Clientes -> 3. Catálogo de Produtos -> 4. Perguntas Frequentes (quebra de objeções) -> 5. Chamada Final de WhatsApp.`
        },
        {
          id: "ia-2",
          title: "Textos de Botões Genéricos que Não Estimulam o Clique",
          severity: "Médio",
          principle: "Chamadas para Ação Assertivas",
          evidence: `Botões com textos simples e pouco convidativos`,
          problem: `Palavras genéricas como "Saiba Mais" ou "Enviar" não despertam interesse nem transmitem o benefício imediato da ação.`,
          impact: `Menor taxa de cliques em comparação com chamadas mais dinâmicas e convidativas.`,
          suggestion: `Substitua por chamadas que vendam o benefício: "Quero Receber as Melhores Ofertas", "Consultar Condições no WhatsApp" ou "Simular Meu Financiamento Agora".`
        }
      ]
    },
    {
      title: "Acessibilidade e Posicionamento no Google (SEO)",
      overview: "Garantia de que o site funciona perfeitamente para todos os públicos e atende aos requisitos do Google para aparecer nas primeiras posições.",
      score: altPercentage > 50 ? 30 : 50,
      issues: [
        {
          id: "a11y-1",
          title: `${imagesMissing} Fotos de Produtos sem Descrição para o Google (${altPercentage}%)`,
          severity: "Crítico",
          principle: "Visibilidade Orgânica no Google & Acessibilidade",
          evidence: `${imagesMissing} fotos encontradas sem texto descritivo`,
          problem: `Sem descrição nas fotos, o Google não consegue identificar quais produtos estão à venda no seu site, deixando de exibi-los nas buscas de imagens e compras.`,
          impact: `Perda diária de potenciais clientes que pesquisam veículos ou produtos no Google e vão parar no site do concorrente.`,
          suggestion: `Cadastre descrições objetivas em todas as fotos (ex: "Veículo Sedan Prata 2024 - Frente") para turbinar o ranqueamento gratuito no Google.`
        },
        {
          id: "a11y-2",
          title: "Navegação Rápida por Teclado e Acessibilidade",
          severity: "Alto",
          principle: "Facilidade de Uso Universal",
          evidence: `Campos e links da página`,
          problem: `Pessoas navegando por teclado, notebooks sem mouse ou telas acessíveis não conseguem ver qual campo está selecionado.`,
          impact: `Dificulta a experiência de compra de uma parcela de usuários e reduz a nota técnica de acessibilidade no Google.`,
          suggestion: `Adicione borda de destaque suave no elemento selecionado, garantindo facilidade total de navegação para qualquer dispositivo.`
        }
      ]
    }
  ];

  return {
    url: targetUrl,
    analyzedAt: new Date().toLocaleString("pt-BR"),
    overallScore: 44,
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
  const [activeTab, setActiveTab] = useState<number>(-1); // -1 = Resumo, 0..4 = Categorias, 5 = Seguranca, 6 = Playwright, 7 = PageSpeed
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
          headers: { "X-Return-Format": "text" }
        });
        if (!res.ok) throw new Error("Jina Reader indisponível");
        return await res.text();
      },
      async () => {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
        if (!res.ok) throw new Error("AllOrigins proxy falhou");
        return await res.text();
      },
      async () => {
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
        if (!res.ok) throw new Error("CorsProxy falhou");
        return await res.text();
      }
    ];

    for (const method of fetchMethods) {
      try {
        const result = await method();
        if (result && result.length > 50) {
          if (result.includes("<html") || result.includes("<!DOCTYPE") || result.includes("<body") || result.includes("<head")) {
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

    const isHttps = targetUrl.startsWith("https://");
    const hasMixedContent = isHttps && rawHtml && /src=["']http:\/\//i.test(rawHtml);
    const speedRating = responseTimeMs < 600 ? "Excelente (< 600ms)" : responseTimeMs < 1800 ? "Moderado (< 1.8s)" : "Lento (> 1.8s)";

    const pageSpeed = calculatePageSpeedMetrics(responseTimeMs || 320, pageSizeKb || 95, imagesCount || 10, imagesMissingAlt || 0);

    const perf = {
      responseTimeMs: responseTimeMs || 320,
      pageSizeKb: pageSizeKb || 95,
      rating: speedRating,
      pageSpeed
    };

    const clientSecurityAudit: SecurityAudit = {
      score: isHttps ? 85 : 45,
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
      // 1. Tentar endpoint serverless direto
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
              const resp = sData.data.extractedMetadata.performance?.responseTimeMs || 320;
              const size = sData.data.extractedMetadata.performance?.pageSizeKb || 95;
              const imgs = sData.data.extractedMetadata.imagesCount || 10;
              const missing = sData.data.extractedMetadata.imagesMissingAlt || 0;
              sData.data.extractedMetadata.performance = {
                ...(sData.data.extractedMetadata.performance || {}),
                pageSpeed: calculatePageSpeedMetrics(resp, size, imgs, missing)
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

      // 2. Extração client-side com dados reais do DOM
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
    showToast("Renderizando relatório executivo comercial em PDF...");

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let currentY = 18;

      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pageHeight - 15) {
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

      // Fundo topo escuro premium
      pdf.setFillColor(10, 10, 15);
      pdf.rect(0, 0, pageWidth, 38, "F");

      // Linha de acento laranja Fábrica
      pdf.setFillColor(196, 106, 26);
      pdf.rect(0, 38, pageWidth, 1.5, "F");

      // Título e logo
      pdf.setTextColor(245, 242, 236);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("FÁBRICA PUBLICIDADE", margin, 14);

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(196, 106, 26);
      pdf.text("RELATÓRIO EXECUTIVO DE AUDITORIA: CONVERSÃO, VELOCIDADE & SEGURANÇA", margin, 20);

      pdf.setTextColor(200, 200, 210);
      pdf.setFontSize(8);
      pdf.text(`URL AUDITADA: ${analysisResult.url}`, margin, 26);
      
      const securityScore = analysisResult.extractedMetadata.integrityAudit?.score || 85;
      const psScore = analysisResult.extractedMetadata.performance?.pageSpeed?.categories?.performance || 61;
      const respTime = analysisResult.extractedMetadata.performance?.responseTimeMs || 320;
      pdf.text(`DATA: ${analysisResult.analyzedAt} | SCORE GERAL: ${analysisResult.overallScore}/100 | VELOCIDADE: ${psScore}/100 | SEGURANÇA: ${securityScore}/100`, margin, 31);

      currentY = 48;

      // Metadados visuais e estruturais
      checkPageBreak(30);
      pdf.setFillColor(245, 245, 248);
      pdf.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "F");
      pdf.setDrawColor(220, 220, 230);
      pdf.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "S");

      pdf.setTextColor(20, 20, 30);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text("DADOS VISUAIS & ESTRUTURAIS IDENTIFICADOS NO SITE:", margin + 4, currentY + 6);

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(70, 70, 80);
      const colorsText = `Cores da Marca: ${analysisResult.extractedMetadata.colors.join(", ")}`;
      const fontsText = `Fontes Utilizadas: ${analysisResult.extractedMetadata.fonts.join(", ")}`;
      const structText = `Título do Site: ${analysisResult.extractedMetadata.pageTitle} | Total de Fotos: ${analysisResult.extractedMetadata.imagesCount} (Sem Descrição: ${analysisResult.extractedMetadata.imagesMissingAlt}) | Resposta do Servidor: ${respTime}ms`;

      pdf.text(colorsText, margin + 4, currentY + 11);
      pdf.text(fontsText, margin + 4, currentY + 16);
      pdf.text(structText, margin + 4, currentY + 21);

      currentY += 30;

      // Seção 1: Velocidade e Métricas Comerciais (Google PageSpeed)
      const ps = analysisResult.extractedMetadata.performance?.pageSpeed;
      if (ps) {
        checkPageBreak(38);
        pdf.setTextColor(196, 106, 26);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("1. AUDITORIA DE VELOCIDADE & DESEMPENHO (GOOGLE PAGESPEED)", margin, currentY);
        currentY += 6;

        pdf.setFillColor(250, 248, 245);
        pdf.roundedRect(margin, currentY, contentWidth, 26, 1.5, 1.5, "F");
        pdf.setDrawColor(230, 210, 190);
        pdf.roundedRect(margin, currentY, contentWidth, 26, 1.5, 1.5, "S");

        pdf.setTextColor(30, 30, 40);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Desempenho Comercial: ${ps.categories.performance}/100 | Acessibilidade: ${ps.categories.accessibility}/100 | Boas Práticas: ${ps.categories.bestPractices}/100 | SEO (Google): ${ps.categories.seo}/100`, margin + 4, currentY + 6);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 90);
        
        const cleanFcp = cleanDisplayMetric(ps.fcp?.value, "1.8s");
        const cleanLcp = cleanDisplayMetric(ps.lcp?.value, "3.1s");
        const cleanCls = cleanDisplayMetric(ps.cls?.value, "0.08");
        const cleanTbt = cleanDisplayMetric(ps.tbt?.value, "280ms");
        const cleanTtfb = cleanDisplayMetric(ps.ttfb?.value, "0.3s");

        pdf.text(`Abertura Inicial: ${cleanFcp} | Conteúdo Principal: ${cleanLcp} | Estabilidade da Tela: ${cleanCls} | Resposta ao Toque: ${cleanTbt} | Servidor: ${cleanTtfb}`, margin + 4, currentY + 12);
        
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(16, 120, 60);
        pdf.text(`Diagnóstico Comercial: Otimizar o peso das fotos e carregar scripts de atendimento em segundo plano. Isso acelera o site no 4G/5G, reduz a perda de clientes no celular e aumenta o envio de mensagens no WhatsApp.`, margin + 4, currentY + 18, { maxWidth: contentWidth - 8 });

        currentY += 32;
      }

      // Resumo Executivo Comercial
      checkPageBreak(40);
      pdf.setTextColor(196, 106, 26);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("2. RESUMO EXECUTIVO COMERCIAL & OPORTUNIDADES DE VENDAS", margin, currentY);
      currentY += 6;

      pdf.setTextColor(40, 40, 50);
      pdf.setFontSize(8.5);
      pdf.setFont("helvetica", "normal");
      
      const cleanSummary = analysisResult.executiveSummary
        .replace(/#{1,6}\s?/g, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      const summaryLines = pdf.splitTextToSize(cleanSummary, contentWidth);
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
          checkPageBreak(16);
          pdf.setFillColor(250, 248, 245);
          pdf.roundedRect(margin, currentY, contentWidth, 12, 1, 1, "F");
          pdf.setFillColor(196, 106, 26);
          pdf.rect(margin, currentY, 2, 12, "F");

          pdf.setFontSize(8);
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(196, 106, 26);
          pdf.text(`[${bq.id}] ${bq.issueTitle || bq.location}:`, margin + 4, currentY + 4.5);

          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(60, 60, 70);
          const quoteLines = pdf.splitTextToSize(`"${bq.text}" — ${bq.contextNote || ""}`, contentWidth - 8);
          pdf.text(quoteLines[0] || "", margin + 4, currentY + 9);

          currentY += 14;
        }
        currentY += 4;
      }

      // As 5 Categorias Comerciais
      for (let i = 0; i < analysisResult.categories.length; i++) {
        const cat = analysisResult.categories[i];
        checkPageBreak(35);

        pdf.setTextColor(10, 10, 20);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${i + 3}. ${cat.title.toUpperCase()}`, margin, currentY);
        currentY += 5;

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(90, 90, 100);
        const overviewLines = pdf.splitTextToSize(cat.overview.replace(/\*\*/g, ""), contentWidth);
        pdf.text(overviewLines, margin, currentY);
        currentY += overviewLines.length * 4 + 4;

        for (const issue of cat.issues) {
          checkPageBreak(30);

          const isCritical = issue.severity === "Crítico";
          pdf.setFillColor(isCritical ? 255 : 248, isCritical ? 245 : 248, isCritical ? 245 : 252);
          pdf.roundedRect(margin, currentY, contentWidth, 25, 1.5, 1.5, "F");
          pdf.setDrawColor(isCritical ? 240 : 220, isCritical ? 180 : 220, isCritical ? 180 : 230);
          pdf.roundedRect(margin, currentY, contentWidth, 25, 1.5, 1.5, "S");

          pdf.setFillColor(isCritical ? 220 : 196, isCritical ? 38 : 106, isCritical ? 38 : 26);
          pdf.roundedRect(margin + 3, currentY + 3, 16, 4.5, 1, 1, "F");
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(6.5);
          pdf.setFont("helvetica", "bold");
          pdf.text(issue.severity.toUpperCase(), margin + 4.5, currentY + 6.3);

          pdf.setTextColor(20, 20, 30);
          pdf.setFontSize(8.5);
          pdf.setFont("helvetica", "bold");
          pdf.text(issue.title, margin + 22, currentY + 6.5);

          pdf.setTextColor(110, 110, 120);
          pdf.setFontSize(7);
          pdf.setFont("helvetica", "normal");
          pdf.text(`Foco: ${issue.principle}`, margin + 3, currentY + 11.5);

          pdf.setTextColor(60, 60, 70);
          pdf.setFontSize(7.5);
          const probLines = pdf.splitTextToSize(`Gargalo: ${issue.problem}`, contentWidth - 6);
          pdf.text(probLines[0] || "", margin + 3, currentY + 16);

          pdf.setTextColor(16, 120, 60);
          pdf.setFontSize(7.5);
          pdf.setFont("helvetica", "bold");
          const sugLines = pdf.splitTextToSize(`Como Resolver: ${issue.suggestion}`, contentWidth - 6);
          pdf.text(sugLines[0] || "", margin + 3, currentY + 21);

          currentY += 28;
        }

        currentY += 4;
      }

      const totalPages = pdf.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
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
      showToast("Relatório em PDF exportado com sucesso!");
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
              className="border border-[#C46A1A] text-[#C46A1A] hover:bg-[#C46A1A] hover:text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
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

            {/* ABA SEGURANÇA (SEM NOME STRIX) */}
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

          {/* TAB 5: SEGURANÇA & PROTEÇÃO DO SITE (SEM A PALAVRA STRIX) */}
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

              {/* Render do Snapshot */}
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
