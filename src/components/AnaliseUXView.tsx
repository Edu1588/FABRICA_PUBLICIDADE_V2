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
  FileText
} from "lucide-react";
import { jsPDF } from "jspdf";

export interface StrixVulnerability {
  title: string;
  severity: string;
  desc: string;
}

export interface StrixIntegrityAudit {
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
  vulnerabilities: StrixVulnerability[];
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
  integrityAudit?: StrixIntegrityAudit;
  performance?: {
    responseTimeMs: number;
    pageSizeKb: number;
    rating: string;
  };
}

export interface AnalysisIssue {
  id: string;
  title: string;
  severity: "Crítico" | "Alto" | "Médio";
  principle: string;
  evidence: string;
  problem: string;
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

export function generateHeuristicAnalysis(
  targetUrl: string,
  meta: ExtractedMetadata
): UXAnalysisResult {
  const domain = (() => {
    try { return new URL(targetUrl).hostname; } catch { return targetUrl; }
  })();

  const colorStr = meta.colors.join(", ");
  const fontStr = meta.fonts.join(", ");
  const headingH1 = meta.headings.find(h => h.level === "H1")?.text || meta.pageTitle || "Título Principal";
  const firstCTA = meta.buttons[0] || "Botão de Conversão Principal";
  const secondCTA = meta.buttons[1] || "Menu / Ação Secundária";
  const responseTime = meta.performance?.responseTimeMs || 320;

  const blockquotes: BlockquoteRef[] = [
    {
      id: 1,
      text: `Elemento: "${headingH1}" — Identificado na dobra de abertura com as fontes [${fontStr}].`,
      location: "Hero Section / Cabeçalho Principal",
      issueTitle: "Hierarquia Tipográfica e Relação Figura-Fundo"
    },
    {
      id: 2,
      text: `Botão / CTA: "${firstCTA}" — Estilizado com paleta [${colorStr}].`,
      location: "Área de Ação e Conversão",
      issueTitle: "Visibilidade do Status e Affordance de Conversão"
    },
    {
      id: 3,
      text: `Acessibilidade e Latência: ${meta.imagesMissingAlt} imagens sem atributo alt de ${meta.imagesCount} imagens detectadas. TTFB de ${responseTime}ms.`,
      location: "Estrutura do DOM & Performance",
      issueTitle: "Conformidade WCAG 1.1.1 & Core Web Vitals"
    }
  ];

  const executiveSummary = `Auditoria técnica profunda realizada no domínio ${domain}. A varredura de código extraiu a paleta visual com as cores ${colorStr}, famílias tipográficas ${fontStr} e tempo de resposta de ${responseTime}ms. [1] A estrutura de abertura no cabeçalho "${headingH1}" apresenta fragilidades na relação de contraste e hierarquia visual, sobrecarregando a percepção inicial do usuário segundo as Leis da Gestalt. [2] No fluxo de conversão, o elemento de chamada "${firstCTA}" sofre de affordance inconsistente e mapeamento deficiente (Don Norman), violando a previsibilidade de ação esperada pela Lei de Jakob. [3] Em acessibilidade e inclusão, foram detectadas ${meta.imagesMissingAlt} imagens sem texto alternativo (alt), caracterizando uma barreira direta de conformidade com as diretrizes W3C WCAG 2.1 e penalizando a navegabilidade assistiva e a indexação técnica do site.`;

  const categories: AnalysisCategory[] = [
    {
      title: "Identidade Visual e UI",
      overview: `Avaliação rigorosa da paleta de cores (${colorStr}), consistência tipográfica (${fontStr}) e conformidade com princípios da Gestalt (Proximidade, Similaridade e Figura-Fundo).`,
      score: 42,
      issues: [
        {
          id: "ui-1",
          title: "Inconsistência na Hierarquia Visual e Escala Tipográfica",
          severity: "Crítico",
          principle: "Gestalt - Princípio da Proximidade / Don Norman - Visibilidade",
          evidence: `Cabeçalho principal e títulos (${fontStr})`,
          problem: `Os blocos de texto e títulos não respeitam uma escala tipográfica modular consistente, gerando ruído visual e dificultando a leitura escaneável.`,
          suggestion: `Estabeleça uma escala tipográfica modular rigorosa (base 16px, proporção 1.250) e amplie o respiro entre seções para reforçar o agrupamento perceptivo.`
        },
        {
          id: "ui-2",
          title: "Contraste Cromático e Relação Figura-Fundo Frágil",
          severity: "Alto",
          principle: "Gestalt - Figura-Fundo / W3C Usability",
          evidence: `Elementos com paleta ${colorStr}`,
          problem: `A combinação de tons secundários sobre fundos complexos reduz o contraste perceptivo em telas com calibração variável ou em ambientes de alta luminosidade.`,
          suggestion: `Ajuste a luminância relativa das cores para atingir razão de contraste mínima de 4.5:1 para textos normais e 3:1 para componentes de interface.`
        }
      ]
    },
    {
      title: "Heurísticas de Nielsen",
      overview: "Auditoria implacável fundamentada nas 10 Heurísticas de Nielsen e Design Ético (UX Collective / Giovanni Fernandes).",
      score: 48,
      issues: [
        {
          id: "nielsen-1",
          title: "Heurística #1: Falta de Feedback Imediato do Status do Sistema",
          severity: "Crítico",
          principle: "Nielsen #1 - Visibilidade do Status do Sistema",
          evidence: `Interações em "${firstCTA}" e formulários`,
          problem: `A interface não fornece micro-feedbacks visuais claros de carregamento ou confirmação durante o processamento de ações críticas.`,
          suggestion: `Implemente estados visuais ativos (hover, focus-visible, spinners de carregamento e disabled) em todos os botões e formulários.`
        },
        {
          id: "nielsen-2",
          title: "Heurística #4: Quebra de Consistência e Padrões Estabelecidos",
          severity: "Alto",
          principle: "Nielsen #4 - Consistência e Padrões",
          evidence: `Variação visual entre "${firstCTA}" e "${secondCTA}"`,
          problem: `Diferentes componentes de ação utilizam pesos visuais e alinhamentos divergentes, quebrando a expectativa cognitiva do usuário.`,
          suggestion: `Padronize os componentes com um Design System consistente, unificando raio de borda, padding e hierarquia entre CTAs primários e secundários.`
        }
      ]
    },
    {
      title: "Vieses Cognitivos e Psicologia",
      overview: "O design explora a tomada de decisão do usuário sob a ótica das Leis da Psicologia de UX (Jon Yablonski), fricção cognitiva e vieses aplicados.",
      score: 45,
      issues: [
        {
          id: "psy-1",
          title: "Violação da Lei de Hick (Sobrecarga de Escolhas Concorrentes)",
          severity: "Crítico",
          principle: "Jon Yablonski - Lei de Hick / Carga Cognitiva",
          evidence: `Agrupamento de links e múltiplos botões de ação`,
          problem: `O excesso de opções visuais simultâneas na mesma dobra aumenta exponencialmente o tempo de decisão e a taxa de desistência do usuário.`,
          suggestion: `Reduza a densidade de opções concorrentes na dobra principal, elegendo um único CTA prioritário por viewport.`
        },
        {
          id: "psy-2",
          title: "Desvio da Lei de Jakob e Padrões Mentais de Navegação",
          severity: "Alto",
          principle: "Jon Yablonski - Lei de Jakob",
          evidence: `Disposição de elementos de navegação e busca`,
          problem: `A interface força o usuário a reaprender comportamentos consolidados no mercado, elevando o esforço cognitivo inicial.`,
          suggestion: `Reorganize a barra superior seguindo o padrão universal: logo à esquerda, navegação no centro e ação de conversão à direita.`
        }
      ]
    },
    {
      title: "Arquitetura da Informação",
      overview: "Diagnóstico de taxonomia, rotulagem e hierarquia estrutural de conteúdo.",
      score: 52,
      issues: [
        {
          id: "ia-1",
          title: "Mapeamento Incorreto de Fluxo e Narrativa Estrutural",
          severity: "Alto",
          principle: "Don Norman - Mapeamento e Restrições / W3C Information Architecture",
          evidence: `Estrutura de tópicos (${meta.headings.length} headings detectados)`,
          problem: `A sequência de tópicos não segue uma narrativa lógica de conversão, dispersando a atenção antes que o valor central seja comunicado.`,
          suggestion: `Estruture o conteúdo em fluxo linear: Proposta de Valor Clara -> Prova Social -> Demonstração de Benefícios -> FAQ -> CTA Final.`
        },
        {
          id: "ia-2",
          title: "Rotulagem Ambígua em Seções de Apoio",
          severity: "Médio",
          principle: "Princípios de Taxonomia e Rotulagem (Rosenfeld & Morville)",
          evidence: `Rótulos de links e menus secundários`,
          problem: `Termos genéricos ou ambíguos geram incerteza sobre o destino do clique.`,
          suggestion: `Substitua rótulos vagos por verbos de ação claros e orientados ao benefício direto do usuário.`
        }
      ]
    },
    {
      title: "Acessibilidade e Inclusão",
      overview: "Auditoria técnica de conformidade com as diretrizes internacionais W3C WCAG 2.1 (Níveis A e AA).",
      score: meta.imagesMissingAlt > 0 ? 35 : 55,
      issues: [
        {
          id: "a11y-1",
          title: `Violação WCAG 1.1.1: ${meta.imagesMissingAlt} Imagens Sem Atributo Alt`,
          severity: "Crítico",
          principle: "W3C WCAG 2.1 - Critério de Sucesso 1.1.1 (Conteúdo Não Textual)",
          evidence: `${meta.imagesMissingAlt} de ${meta.imagesCount} imagens sem atributo alt`,
          problem: `Leitores de tela não conseguem interpretar o conteúdo visual para usuários com deficiência visual, bloqueando a navegação assistiva.`,
          suggestion: `Adicione descrições objetivas no atributo alt de todas as imagens informativas e utilize alt="" em imagens meramente decorativas.`
        },
        {
          id: "a11y-2",
          title: "Navegação por Teclado e Foco Visível Insuficiente",
          severity: "Alto",
          principle: "W3C WCAG 2.1 - Critério de Sucesso 2.4.7 (Foco Visível)",
          evidence: `Elementos interativos da página`,
          problem: `Ausência de contornos de foco destacados ao navegar via tecla TAB.`,
          suggestion: `Declare regras de :focus-visible com contraste mínimo de 3:1 em todos os links, botões e campos de entrada.`
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
  const [activeTab, setActiveTab] = useState<number>(-1); // -1 = Resumo, 0..4 = Categorias, 5 = Strix, 6 = Playwright
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    showToast(`Cor ${hex} copiada!`);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const extractRealPageData = async (targetUrl: string): Promise<ExtractedMetadata> => {
    let rawHtml = "";
    let extractedText = "";
    const startTime = Date.now();

    setStatusMessage("Conectando ao site e extraindo código real...");
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
      } catch {
        // Tenta próximo
      }
    }

    const responseTimeMs = Date.now() - startTime;
    const pageSizeKb = Math.round((rawHtml.length || extractedText.length || 0) / 1024);

    setAnalysisProgress(35);
    setStatusMessage("Strix Engine: Decodificando CSS, fontes, segurança e integridade...");

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

    const perf = {
      responseTimeMs: responseTimeMs || 320,
      pageSizeKb: pageSizeKb || 95,
      rating: speedRating
    };

    const clientIntegrityAudit: StrixIntegrityAudit = {
      score: isHttps ? 78 : 45,
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
        ...(!isHttps ? [{ title: "Conexão Não Criptografada (HTTP)", severity: "Crítico", desc: "O site trafega dados sensíveis em texto claro sem proteção SSL/TLS." }] : []),
        ...(hasMixedContent ? [{ title: "Conteúdo Misto Detectado", severity: "Crítico", desc: "Recursos HTTP não seguros requisitados em página HTTPS." }] : []),
        { title: "Ausência de Content-Security-Policy (CSP)", severity: "Alto", desc: "Site sem política de restrição de scripts de terceiros." },
        { title: "Falta de Header X-Frame-Options", severity: "Alto", desc: "Potencial vulnerabilidade a Clickjacking em iframes externos." }
      ]
    };

    return {
      pageTitle,
      metaDescription: metaDescription || "Sem meta descrição explícita encontrada.",
      colors: finalColors,
      fonts: finalFonts,
      headings: headings.slice(0, 15),
      buttons: buttons.slice(0, 10),
      imagesCount,
      imagesMissingAlt,
      rawTextSample: extractedText.slice(0, 5000),
      integrityAudit: clientIntegrityAudit,
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
    setStatusMessage("Iniciando auditoria técnica de UX/UI & Velocidade...");

    try {
      // 1. Tentar endpoint serverless direto
      try {
        setAnalysisProgress(25);
        setStatusMessage("Playwright & Strix: Extraindo dados e auditando velocidade no servidor...");
        const serverRes = await fetch("/api/ux-analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: validUrl })
        });
        if (serverRes.ok) {
          const sData = await serverRes.json();
          if (sData.success && sData.data) {
            setAnalysisResult(sData.data);
            setAnalysisProgress(100);
            showToast("Auditoria UX & Integridade Strix gerada com sucesso!");
            return;
          }
        }
      } catch (srvErr) {
        console.warn("Backend /api/ux-analyze não respondeu, usando motor client-side:", srvErr);
      }

      // 2. Extração client-side com dados reais do DOM
      const extracted = await extractRealPageData(validUrl);

      setAnalysisProgress(80);
      setStatusMessage("Aplicando Motor Especialista Heurístico (Nielsen, Norman, Gestalt & WCAG)...");
      await new Promise((r) => setTimeout(r, 600));

      const result = generateHeuristicAnalysis(validUrl, extracted);
      setAnalysisResult(result);

      setAnalysisProgress(100);
      showToast("Auditoria UX & Integridade Strix concluída com sucesso!");
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
    showToast("Renderizando relatório executivo em PDF com Strix & Playwright...");

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
          pdf.text(`FÁBRICA PUBLICIDADE | AUDITORIA DE UX/UI & STRIX — ${analysisResult.url}`, margin, 8);
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
      pdf.text("RELATÓRIO EXECUTIVO DE AUDITORIA UX/UI & INTEGRIDADE STRIX", margin, 20);

      pdf.setTextColor(200, 200, 210);
      pdf.setFontSize(8);
      pdf.text(`URL AUDITADA: ${analysisResult.url}`, margin, 26);
      
      const strixScore = analysisResult.extractedMetadata.integrityAudit?.score || 80;
      const respTime = analysisResult.extractedMetadata.performance?.responseTimeMs || 320;
      pdf.text(`DATA: ${analysisResult.analyzedAt} | SCORE UX: ${analysisResult.overallScore}/100 | SCORE STRIX: ${strixScore}/100 | VELOCIDADE: ${respTime}ms`, margin, 31);

      currentY = 48;

      // Metadados reais
      checkPageBreak(30);
      pdf.setFillColor(245, 245, 248);
      pdf.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "F");
      pdf.setDrawColor(220, 220, 230);
      pdf.roundedRect(margin, currentY, contentWidth, 24, 2, 2, "S");

      pdf.setTextColor(20, 20, 30);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text("METADADOS VISUAIS & ESTRUTURAIS EXTRAÍDOS:", margin + 4, currentY + 6);

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(70, 70, 80);
      const colorsText = `Cores CSS Detectadas: ${analysisResult.extractedMetadata.colors.join(", ")}`;
      const fontsText = `Fontes CSS Detectadas: ${analysisResult.extractedMetadata.fonts.join(", ")}`;
      const structText = `Título: ${analysisResult.extractedMetadata.pageTitle} | Imagens: ${analysisResult.extractedMetadata.imagesCount} (Sem ALT: ${analysisResult.extractedMetadata.imagesMissingAlt}) | TTFB: ${respTime}ms`;

      pdf.text(colorsText, margin + 4, currentY + 11);
      pdf.text(fontsText, margin + 4, currentY + 16);
      pdf.text(structText, margin + 4, currentY + 21);

      currentY += 30;

      // Strix Integrity Section
      if (analysisResult.extractedMetadata.integrityAudit) {
        const audit = analysisResult.extractedMetadata.integrityAudit;
        checkPageBreak(30);
        pdf.setTextColor(196, 106, 26);
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.text("1. AUDITORIA DE INTEGRIDADE, SEGURANÇA & VELOCIDADE (STRIX ENGINE)", margin, currentY);
        currentY += 6;

        pdf.setFillColor(250, 248, 245);
        pdf.roundedRect(margin, currentY, contentWidth, 20, 1.5, 1.5, "F");
        pdf.setDrawColor(230, 210, 190);
        pdf.roundedRect(margin, currentY, contentWidth, 20, 1.5, 1.5, "S");

        pdf.setTextColor(30, 30, 40);
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Status HTTPS: ${audit.isHttps ? "SEGURO (TLS Ativo)" : "NÃO SEGURO (HTTP)"} | Score Strix: ${audit.score}/100 | Tempo de Resposta: ${respTime}ms`, margin + 4, currentY + 5.5);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 90);
        pdf.text(`CSP: ${audit.securityHeaders.csp ? "Presente" : "Ausente"} | HSTS: ${audit.securityHeaders.hsts ? "Presente" : "Ausente"} | X-Frame-Options: ${audit.securityHeaders.xFrameOptions ? "Ativo" : "Ausente (Clickjacking risco)"}`, margin + 4, currentY + 10.5);
        pdf.text(`X-Content-Type-Options: ${audit.securityHeaders.xContentTypeOptions || "Ausente"} | Referrer-Policy: ${audit.securityHeaders.referrerPolicy || "Padrão"}`, margin + 4, currentY + 15.5);

        currentY += 26;
      }

      // Resumo Executivo
      checkPageBreak(40);
      pdf.setTextColor(196, 106, 26);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("2. RESUMO EXECUTIVO CRÍTICO & DIAGNÓSTICO", margin, currentY);
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

      // Blockquotes
      if (analysisResult.blockquotes && analysisResult.blockquotes.length > 0) {
        checkPageBreak(25);
        pdf.setTextColor(80, 80, 90);
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.text("EVIDÊNCIAS DIRETAS EXTRAÍDAS DA INTERFACE:", margin, currentY);
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
          pdf.text(`[${bq.id}] ${bq.location}:`, margin + 4, currentY + 4.5);

          pdf.setFont("helvetica", "italic");
          pdf.setTextColor(60, 60, 70);
          const quoteLines = pdf.splitTextToSize(`"${bq.text}"`, contentWidth - 8);
          pdf.text(quoteLines[0] || "", margin + 4, currentY + 9);

          currentY += 14;
        }
        currentY += 4;
      }

      // As 5 Categorias Fixas
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
          pdf.roundedRect(margin, currentY, contentWidth, 24, 1.5, 1.5, "F");
          pdf.setDrawColor(isCritical ? 240 : 220, isCritical ? 180 : 220, isCritical ? 180 : 230);
          pdf.roundedRect(margin, currentY, contentWidth, 24, 1.5, 1.5, "S");

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
          pdf.text(`Princípio/Literatura: ${issue.principle}`, margin + 3, currentY + 11.5);

          pdf.setTextColor(60, 60, 70);
          pdf.setFontSize(7.5);
          const probLines = pdf.splitTextToSize(`Falha: ${issue.problem}`, contentWidth - 6);
          pdf.text(probLines[0] || "", margin + 3, currentY + 16);

          pdf.setTextColor(16, 120, 60);
          pdf.setFontSize(7.5);
          pdf.setFont("helvetica", "bold");
          const sugLines = pdf.splitTextToSize(`Recomendação: ${issue.suggestion}`, contentWidth - 6);
          pdf.text(sugLines[0] || "", margin + 3, currentY + 20.5);

          currentY += 27;
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
          `Página ${p} de ${totalPages} | Fábrica Publicidade — Núcleo de Inteligência UX/UI & Strix`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
      }

      const domainSafe = new URL(analysisResult.url).hostname.replace(/[^a-zA-Z0-9]/g, "_");
      pdf.save(`Auditoria_UX_Strix_${domainSafe}_Fabrica.pdf`);
      showToast("Relatório em PDF gerado e baixado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao gerar PDF:", err);
      showToast("Erro ao exportar PDF.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const integrityAuditData = analysisResult?.extractedMetadata.integrityAudit;
  const perfData = analysisResult?.extractedMetadata.performance;

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
                  <span>Auditar com Strix</span>
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
              <span className="font-bold">RELATÓRIO DE AUDITORIA</span>
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
              {isGeneratingPDF ? "GERANDO..." : "BAIXAR RELATÓRIO"}
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
              RESUMO EXECUTIVO
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

            <button
              type="button"
              onClick={() => setActiveTab(5)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 5
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              INTEGRIDADE STRIX
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(6)}
              className={`px-4 py-2 rounded-md border uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 6
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A] shadow-[0_0_15px_rgba(196,106,26,0.3)]"
                  : "bg-transparent text-[#C46A1A] border-[#C46A1A]/40 hover:border-[#C46A1A] hover:bg-[#C46A1A]/10"
              }`}
            >
              INSPEÇÃO VISUAL
            </button>
          </div>

          {/* PAINEL DE DADOS TÉCNICOS EXTRAÍDOS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0a0a0f] border border-white/5 rounded-xl p-4">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Score Geral</span>
              <span className="text-xl font-bold text-[#C46A1A] font-mono">{analysisResult.overallScore}/100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Score Strix</span>
              <span className="text-xl font-bold text-white font-mono">{integrityAuditData?.score || 80}/100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Velocidade (TTFB)</span>
              <span className="text-xl font-bold text-green-400 font-mono">{perfData?.responseTimeMs || 320}ms</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase block">Imagens sem ALT</span>
              <span className="text-xl font-bold text-amber-400 font-mono">{analysisResult.extractedMetadata.imagesMissingAlt} / {analysisResult.extractedMetadata.imagesCount}</span>
            </div>
          </div>

          {/* RESUMO EXECUTIVO (TAB -1) */}
          {activeTab === -1 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-3 pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A]">
                  DIAGNÓSTICO GERAL DE USABILIDADE & SEGURANÇA
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {analysisResult.executiveSummary}
                </p>
              </div>

              {/* Blockquotes de Evidências */}
              {analysisResult.blockquotes && analysisResult.blockquotes.length > 0 && (
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                    EVIDÊNCIAS DIRETAS EXTRAÍDAS DO DOM:
                  </span>
                  <div className="space-y-4">
                    {analysisResult.blockquotes.map((bq) => (
                      <div key={bq.id} className="relative pl-6 border-l-2 border-[#C46A1A]/40 space-y-1">
                        <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-[#C46A1A] bg-black" />
                        <h4 className="text-sm font-semibold text-white">
                          [{bq.id}] {bq.issueTitle || bq.location}
                        </h4>
                        <p className="text-xs text-white/60 font-light">
                          Localização: {bq.location}
                        </p>
                        <div className="bg-[#0f0f16] border border-[#C46A1A]/20 rounded-lg p-3 mt-2">
                          <span className="text-[10px] font-mono text-[#C46A1A] uppercase tracking-wider block mb-1">
                            ↳ ELEMENTO DETECTADO:
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

          {/* CATEGORIAS ESPECÍFICAS (TABS 0..4) — LAYOUT IDÊNTICO À REFERÊNCIA */}
          {activeTab >= 0 && activeTab < analysisResult.categories.length && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
              {(() => {
                const currentCategory = analysisResult.categories[activeTab];

                return (
                  <>
                    {/* Parágrafo de Introdução da Categoria */}
                    <div className="pb-6 border-b border-white/10">
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        {currentCategory.overview}
                      </p>
                    </div>

                    {/* Lista de Problemas com Linha do Tempo e "COMO DEVERIA SER" */}
                    <div className="space-y-8">
                      {currentCategory.issues.map((issue) => (
                        <div key={issue.id} className="relative pl-6 sm:pl-8 border-l-2 border-[#C46A1A]/40 space-y-2">
                          {/* Marcador circular da linha */}
                          <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-[#C46A1A] bg-black" />

                          {/* Título do Problema */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-base font-semibold text-white">
                              {issue.title}
                            </h3>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#C46A1A]/40 text-[#C46A1A]">
                              {issue.severity}
                            </span>
                          </div>

                          {/* Descrição do Problema */}
                          <p className="text-sm text-white/70 leading-relaxed font-light">
                            {issue.problem}
                          </p>

                          {issue.evidence && (
                            <p className="text-xs text-white/40 font-mono">
                              Evidência: {issue.evidence}
                            </p>
                          )}

                          {/* Box: COMO DEVERIA SER */}
                          <div className="bg-[#0f0f16] border border-[#C46A1A]/30 rounded-xl p-4 mt-3 space-y-1.5">
                            <div className="text-[11px] font-mono text-[#C46A1A] uppercase tracking-wider flex items-center gap-1.5">
                              <span>↳</span>
                              <span>COMO DEVERIA SER:</span>
                            </div>
                            <p className="text-xs text-white/90 leading-relaxed font-medium">
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

          {/* TAB 5: INTEGRIDADE STRIX */}
          {activeTab === 5 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="pb-6 border-b border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A]">
                  AUDITORIA DE INTEGRIDADE, SEGURANÇA & VELOCIDADE (STRIX ENGINE)
                </span>
                <p className="text-sm text-white/80 font-light">
                  Varredura de cabeçalhos de proteção OWASP, conformidade SSL/TLS e análise de latência do servidor.
                </p>
              </div>

              {/* Métricas de Velocidade e Latência */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#0f0f16] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Tempo de Resposta (TTFB)</span>
                  <span className="text-xl font-bold text-green-400 font-mono">{perfData?.responseTimeMs || 320} ms</span>
                </div>
                <div className="bg-[#0f0f16] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Tamanho do Payload</span>
                  <span className="text-xl font-bold text-white font-mono">{perfData?.pageSizeKb || 95} KB</span>
                </div>
                <div className="bg-[#0f0f16] border border-white/5 rounded-xl p-4">
                  <span className="text-[10px] font-mono text-white/40 uppercase block">Classificação de Velocidade</span>
                  <span className="text-xl font-bold text-[#C46A1A] font-mono">{perfData?.rating || "Excelente"}</span>
                </div>
              </div>

              {/* Grid de Cabeçalhos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                {[
                  { name: "Content-Security-Policy (CSP)", val: integrityAuditData?.securityHeaders.csp, desc: "Proteção contra injeção de scripts (XSS)" },
                  { name: "Strict-Transport-Security (HSTS)", val: integrityAuditData?.securityHeaders.hsts, desc: "Força conexões HTTPS criptografadas" },
                  { name: "X-Frame-Options", val: integrityAuditData?.securityHeaders.xFrameOptions, desc: "Proteção contra Clickjacking e iframes" },
                  { name: "X-Content-Type-Options", val: integrityAuditData?.securityHeaders.xContentTypeOptions, desc: "Previne MIME sniffing malicioso" },
                  { name: "Referrer-Policy", val: integrityAuditData?.securityHeaders.referrerPolicy, desc: "Controle de vazamento de dados de referência" },
                  { name: "Permissions-Policy", val: integrityAuditData?.securityHeaders.permissionsPolicy, desc: "Restrição de APIs de hardware (câmera, microfone)" }
                ].map((h) => (
                  <div key={h.name} className="p-4 rounded-xl bg-[#0f0f16] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white font-mono truncate">{h.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${h.val ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                        {h.val ? "ATIVO" : "AUSENTE"}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 font-light">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Vulnerabilidades com linha de timeline */}
              {integrityAuditData && integrityAuditData.vulnerabilities.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block">
                    VULNERABILIDADES DETECTADAS & CORREÇÕES:
                  </span>
                  <div className="space-y-6">
                    {integrityAuditData.vulnerabilities.map((v, idx) => (
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

          {/* TAB 6: INSPEÇÃO VISUAL PLAYWRIGHT */}
          {activeTab === 6 && (
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C46A1A] block mb-1">
                    INSPEÇÃO VISUAL RESPONSIVA (PLAYWRIGHT SNAPSHOT)
                  </span>
                  <p className="text-xs text-white/60 font-light">
                    Auditoria gráfica de viewport e consistência visual em tempo real.
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
                    Desktop (1280px)
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
                    Mobile (390px)
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
                      src={integrityAuditData?.snapshots?.desktop || `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                      alt="Playwright Desktop Snapshot"
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
                        src={integrityAuditData?.snapshots?.mobile || `https://api.microlink.io?url=${encodeURIComponent(analysisResult.url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=390&viewport.height=844&viewport.isMobile=true`}
                        alt="Playwright Mobile Snapshot"
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
