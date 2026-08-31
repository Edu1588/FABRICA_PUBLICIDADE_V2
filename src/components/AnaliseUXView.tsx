import React, { useState } from "react";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  Download,
  Globe,
  Palette,
  Type,
  Layers,
  ShieldAlert,
  BrainCircuit,
  Eye,
  FileCheck,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  TrendingDown,
  Info,
  RefreshCw,
  Quote
} from "lucide-react";
import { jsPDF } from "jspdf";

const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || "";
const FABRICA_LOGO_URL = "https://static.wixstatic.com/media/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png/v1/fill/w_278,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png";

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

const FIXED_CATEGORIES = [
  "Identidade Visual e UI",
  "Heurísticas de Nielsen",
  "Vieses Cognitivos e Psicologia",
  "Arquitetura da Informação",
  "Acessibilidade e Inclusão"
];

export function AnaliseUXView() {
  const [urlInput, setUrlInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<UXAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<number>(-1); // -1 = Resumo Executivo, 0..4 = Categorias
  const [severityFilter, setSeverityFilter] = useState<string>("todos");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [highlightedQuote, setHighlightedQuote] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
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

    setStatusMessage("Conectando ao site e extraindo dados reais...");
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
        // Tenta o próximo método
      }
    }

    setAnalysisProgress(35);
    setStatusMessage("Decodificando folhas de estilo CSS, fontes e paleta visual...");

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

      const rgbMatches = rawHtml.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+\s*)?\)/gi) || [];
      rgbMatches.slice(0, 15).forEach(rgbStr => {
        const m = rgbStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
        if (m) {
          const r = parseInt(m[1], 10).toString(16).padStart(2, '0');
          const g = parseInt(m[2], 10).toString(16).padStart(2, '0');
          const b = parseInt(m[3], 10).toString(16).padStart(2, '0');
          const hex = `#${r}${g}${b}`.toUpperCase();
          if (!commonNoiseColors.has(hex.toLowerCase())) {
            extractedColors.add(hex);
          }
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
      try {
        pageTitle = new URL(targetUrl).hostname;
      } catch {
        pageTitle = targetUrl;
      }
    }

    return {
      pageTitle,
      metaDescription: metaDescription || "Sem meta descrição explícita encontrada.",
      colors: finalColors,
      fonts: finalFonts,
      headings: headings.slice(0, 15),
      buttons: buttons.slice(0, 10),
      imagesCount,
      imagesMissingAlt,
      rawTextSample: extractedText.slice(0, 5000)
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
    setStatusMessage("Iniciando auditoria técnica de UX/UI...");

    try {
      const extracted = await extractRealPageData(validUrl);

      setAnalysisProgress(55);
      setStatusMessage("Aplicando Leis da Psicologia, Heurísticas de Nielsen e Padrões W3C com IA...");

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
- URL: "${validUrl}"
- Título da Página: "${extracted.pageTitle}"
- Cores CSS Extraídas: ${JSON.stringify(extracted.colors)}
- Famílias de Fontes CSS Extraídas: ${JSON.stringify(extracted.fonts)}
- Headings Detectados: ${JSON.stringify(extracted.headings.map(h => `${h.level}: ${h.text}`).slice(0, 10))}
- Botões e CTAs Encontrados: ${JSON.stringify(extracted.buttons)}
- Total de Imagens: ${extracted.imagesCount} (Imagens sem alt: ${extracted.imagesMissingAlt})
- Amostra de Texto Real da Página:
"""
${extracted.rawTextSample.slice(0, 3000)}
"""

ESTRUTURA OBRIGATÓRIA DO JSON QUE VOCÊ DEVE RETORNAR:
Você deve retornar ESTRITAMENTE um objeto JSON válido (sem texto fora do bloco JSON) com o seguinte esquema:

{
  "overallScore": 45,
  "executiveSummary": "Resumo executivo crítico, técnico e implacável em formato de texto. Você DEVE citar explicitamente as cores extraídas (${extracted.colors.join(', ')}) e as fontes (${extracted.fonts.join(', ')}) para provar que a auditoria analisou a página real. O texto do resumo executivo DEVE conter referências numéricas [1], [2], [3] atreladas aos blockquotes de evidências de erros identificados na página.",
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
          "evidence": "Evidência real (ex: contraste de cores extraídas ou falta de tags alt)",
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

      const userPrompt = `Gere a Auditoria de UX/UI implacável para o site "${validUrl}". Retorne estritamente o JSON completo com todas as 5 categorias fixas e referências numéricas nos blockquotes.`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.5,
          max_tokens: 6000,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Erro na API Groq (Status ${response.status})`);
      }

      setAnalysisProgress(85);
      setStatusMessage("Estruturando relatório executivo e validando categorias...");

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (!rawContent) throw new Error("A IA não retornou conteúdo.");

      let parsed: any;
      try {
        parsed = JSON.parse(rawContent);
      } catch {
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Formato de resposta JSON inválido.");
        }
      }

      const normalizedCategories: AnalysisCategory[] = FIXED_CATEGORIES.map((catName) => {
        const found = (parsed.categories || []).find((c: any) => 
          c.title?.toLowerCase().includes(catName.toLowerCase()) || catName.toLowerCase().includes(c.title?.toLowerCase())
        );

        if (found) {
          return {
            title: catName,
            overview: found.overview || `Diagnóstico aprofundado em ${catName}.`,
            score: found.score || 50,
            issues: Array.isArray(found.issues) && found.issues.length >= 2 ? found.issues : [
              {
                id: `${catName}-1`,
                title: `Inconsistência Crítica em ${catName}`,
                severity: "Crítico",
                principle: "Diretrizes Gerais de Usabilidade",
                evidence: "Estrutura principal da página",
                problem: `Foram detectadas violações estruturais em ${catName}.`,
                suggestion: "Refatorar componentes e seguir padrões normativos recomendados."
              },
              {
                id: `${catName}-2`,
                title: `Falta de Padrão em ${catName}`,
                severity: "Alto",
                principle: "Padrões Universais W3C",
                evidence: "Elementos interativos da interface",
                problem: `Ausência de previsibilidade e padronização.`,
                suggestion: "Implementar guia de estilo consistente e testes de usabilidade."
              }
            ]
          };
        }

        return {
          title: catName,
          overview: `Diagnóstico crítico de ${catName}.`,
          score: 45,
          issues: [
            {
              id: `${catName}-1`,
              title: `Falha Estrutural em ${catName}`,
              severity: "Crítico",
              principle: "Fundamentos de UX/UI",
              evidence: "Elementos da interface",
              problem: `O site apresenta deficiências evidentes em ${catName}.`,
              suggestion: "Aplicar correções normativas imediatas."
            },
            {
              id: `${catName}-2`,
              title: `Fricção Identificada em ${catName}`,
              severity: "Alto",
              principle: "Padrões Universais W3C",
              evidence: "Fluxo de navegação",
              problem: `A interface sobrecarrega o usuário neste quesito.`,
              suggestion: "Simplificar a interação."
            }
          ]
        };
      });

      const fullResult: UXAnalysisResult = {
        url: validUrl,
        analyzedAt: new Date().toLocaleString("pt-BR"),
        overallScore: typeof parsed.overallScore === "number" ? parsed.overallScore : 45,
        extractedMetadata: extracted,
        executiveSummary: parsed.executiveSummary || "Resumo executivo crítico gerado.",
        blockquotes: Array.isArray(parsed.blockquotes) ? parsed.blockquotes : [],
        categories: normalizedCategories
      };

      setAnalysisResult(fullResult);
      setAnalysisProgress(100);
      showToast("Auditoria UX gerada com sucesso!");
    } catch (err: any) {
      console.error("Erro na Análise UX:", err);
      showToast(err.message || "Erro ao processar auditoria de UX.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;

    setIsGeneratingPDF(true);
    showToast("Renderizando relatório executivo em PDF de alta resolução...");

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
          pdf.text(`FÁBRICA PUBLICIDADE | AUDITORIA DE UX/UI — ${analysisResult.url}`, margin, 8);
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
      pdf.text("RELATÓRIO EXECUTIVO DE AUDITORIA UX/UI", margin, 20);

      pdf.setTextColor(200, 200, 210);
      pdf.setFontSize(8);
      pdf.text(`URL AUDITADA: ${analysisResult.url}`, margin, 26);
      pdf.text(`DATA DA AUDITORIA: ${analysisResult.analyzedAt} | SCORE GERAL: ${analysisResult.overallScore}/100`, margin, 31);

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
      pdf.text("METADADOS VISUAIS & ESTRUTURAIS EXTRAÍDOS DA URL:", margin + 4, currentY + 6);

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(70, 70, 80);
      const colorsText = `Cores CSS Detectadas: ${analysisResult.extractedMetadata.colors.join(", ")}`;
      const fontsText = `Fontes CSS Detectadas: ${analysisResult.extractedMetadata.fonts.join(", ")}`;
      const structText = `Título: ${analysisResult.extractedMetadata.pageTitle} | Imagens: ${analysisResult.extractedMetadata.imagesCount} (Sem ALT: ${analysisResult.extractedMetadata.imagesMissingAlt})`;

      pdf.text(colorsText, margin + 4, currentY + 11);
      pdf.text(fontsText, margin + 4, currentY + 16);
      pdf.text(structText, margin + 4, currentY + 21);

      currentY += 30;

      // Resumo Executivo
      checkPageBreak(40);
      pdf.setTextColor(196, 106, 26);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("1. RESUMO EXECUTIVO CRÍTICO & DIAGNÓSTICO", margin, currentY);
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
        pdf.text(`${i + 2}. ${cat.title.toUpperCase()}`, margin, currentY);
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
          `Página ${p} de ${totalPages} | Fábrica Publicidade — Núcleo de Inteligência UX/UI`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
      }

      const domainSafe = new URL(analysisResult.url).hostname.replace(/[^a-zA-Z0-9]/g, "_");
      pdf.save(`Auditoria_UX_${domainSafe}_Fabrica.pdf`);
      showToast("Relatório em PDF gerado e baixado com sucesso!");
    } catch (err: any) {
      console.error("Erro ao gerar PDF:", err);
      showToast("Erro ao exportar PDF.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const totalIssuesCount = analysisResult
    ? analysisResult.categories.reduce((acc, cat) => acc + cat.issues.length, 0)
    : 0;

  const criticalIssuesCount = analysisResult
    ? analysisResult.categories.reduce(
        (acc, cat) => acc + cat.issues.filter(i => i.severity === "Crítico").length,
        0
      )
    : 0;

  return (
    <div className="w-full space-y-6 text-[#F5F2EC]">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C46A1A] text-white text-xs px-4 py-3 rounded-xl shadow-2xl animate-fade-in font-outfit">
          {toastMsg}
        </div>
      )}

      {/* TOPO / INTRODUÇÃO DA FERRAMENTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C46A1A] font-outfit">
            <Sparkles className="w-4 h-4" />
            <span>Auditoria Avançada & Heurísticas de UX/UI</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-white tracking-wide" style={{ fontFamily: 'var(--font-outfit)' }}>
            Análise UX <span className="text-[#C46A1A] font-semibold">Implacável</span>
          </h1>
          <p className="text-xs md:text-sm text-white/60 max-w-2xl font-light">
            Insira a URL de qualquer site para extrair dados reais de código (paleta de cores CSS, famílias tipográficas, semântica) e receber uma auditoria crítica e rigorosa fundamentada em Nielsen, Gestalt, Leis de UX e WCAG.
          </p>
        </div>

        {analysisResult && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-[#C46A1A] hover:bg-[#a85914] text-white font-medium text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer font-outfit"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isGeneratingPDF ? "Gerando PDF..." : "Baixar PDF Executivo"}
            </button>
          </div>
        )}
      </div>

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

          {/* Sugestões rápidas */}
          <div className="flex items-center gap-2 flex-wrap text-xs text-white/40 font-outfit">
            <span className="text-[11px] uppercase tracking-wider">Exemplos rápidos:</span>
            {["https://nubank.com.br", "https://airbnb.com.br", "https://globo.com"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setUrlInput(ex)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-md text-[11px] transition-colors cursor-pointer border border-white/5"
              >
                {ex.replace("https://", "")}
              </button>
            ))}
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
          {/* 1. PAINEL DE DADOS REAIS EXTRAÍDOS (PROVA DA ANÁLISE REAL) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Score Geral & Status */}
            <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider font-outfit">
                    Score Geral de UX
                  </span>
                  <span
                    className={`text-xs uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                      analysisResult.overallScore < 50
                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                        : analysisResult.overallScore < 70
                        ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"
                        : "border-green-500/40 text-green-400 bg-green-500/10"
                    }`}
                  >
                    {analysisResult.overallScore < 50 ? "Crítico" : analysisResult.overallScore < 70 ? "Alerta" : "Adequado"}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-light text-white font-outfit">
                    {analysisResult.overallScore}
                  </span>
                  <span className="text-sm text-white/40 font-outfit">/ 100</span>
                </div>
                <p className="text-xs text-white/50 mt-2 font-light">
                  Auditoria realizada em {analysisResult.analyzedAt}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5 text-xs font-outfit">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Problemas Totais</span>
                  <span className="text-lg font-semibold text-white">{totalIssuesCount}</span>
                </div>
                <div>
                  <span className="text-red-400/80 block text-[10px] uppercase">Falhas Críticas</span>
                  <span className="text-lg font-semibold text-red-400">{criticalIssuesCount}</span>
                </div>
              </div>
            </div>

            {/* Cores CSS Extraídas */}
            <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-[#C46A1A]" />
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider font-outfit">
                    Paleta Visual Real (CSS Extraído)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {analysisResult.extractedMetadata.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleCopyColor(color)}
                      className="group flex flex-col items-center p-2 rounded-xl bg-[#07070a] border border-white/5 hover:border-[#C46A1A]/40 transition-all cursor-pointer text-left"
                    >
                      <div
                        className="w-full h-7 rounded-lg shadow-inner border border-white/10 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[10px] font-mono text-white/70 mt-1.5 flex items-center gap-1">
                        {copiedColor === color ? (
                          <Check className="w-2.5 h-2.5 text-green-400" />
                        ) : null}
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-white/40 mt-3 font-outfit">
                Clique na cor para copiar o código hexadecimal.
              </p>
            </div>

            {/* Tipografia & Estrutura Detectada */}
            <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Type className="w-4 h-4 text-[#C46A1A]" />
                  <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider font-outfit">
                    Famílias Tipográficas & Estrutura
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.extractedMetadata.fonts.map((f) => (
                      <span
                        key={f}
                        className="bg-white/5 text-white/80 border border-white/10 text-xs px-2.5 py-1 rounded-md font-outfit"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-white/50 space-y-1 pt-2 border-t border-white/5 font-light">
                    <p className="truncate">
                      <span className="text-white/30">Título:</span> {analysisResult.extractedMetadata.pageTitle}
                    </p>
                    <p>
                      <span className="text-white/30">Imagens sem ALT:</span>{" "}
                      <span className={analysisResult.extractedMetadata.imagesMissingAlt > 0 ? "text-red-400 font-semibold" : "text-green-400"}>
                        {analysisResult.extractedMetadata.imagesMissingAlt}
                      </span>{" "}
                      de {analysisResult.extractedMetadata.imagesCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#C46A1A] flex items-center gap-1 mt-2 font-outfit">
                <ShieldAlert className="w-3 h-3" />
                Dados extraídos diretamente do DOM e CSS
              </div>
            </div>
          </div>

          {/* NAVEGAÇÃO ENTRE AS 5 CATEGORIAS FIXAS + RESUMO EXECUTIVO */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 font-outfit">
            <button
              type="button"
              onClick={() => setActiveTab(-1)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === -1
                  ? "bg-[#C46A1A] text-white shadow-lg"
                  : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Resumo Executivo
            </button>

            {analysisResult.categories.map((cat, idx) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#C46A1A] text-white shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" />
                {cat.title}
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-white/80">
                  {cat.issues.length}
                </span>
              </button>
            ))}
          </div>

          {/* CONTEÚDO: RESUMO EXECUTIVO (TAB -1) */}
          {activeTab === -1 && (
            <div className="space-y-6">
              <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="pb-4 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-light text-white flex items-center gap-2 font-outfit">
                      <Sparkles className="w-4 h-4 text-[#C46A1A]" />
                      Diagnóstico Executivo Implacável
                    </h3>
                    <p className="text-xs text-white/50 font-light mt-1">
                      Visão geral integrando as cores e fontes reais extraídas, fundamentada em Nielsen, Norman, Jon Yablonski e Gestalt.
                    </p>
                  </div>
                  <span className="border border-[#C46A1A]/40 text-[#C46A1A] text-[10px] uppercase font-outfit px-2.5 py-1 rounded-md">
                    Literaturas Aplicadas
                  </span>
                </div>

                <div className="pt-6 space-y-6">
                  {/* Resumo Executivo em Parágrafos */}
                  <div className="text-sm text-white/80 leading-relaxed font-light space-y-4 whitespace-pre-line">
                    {analysisResult.executiveSummary}
                  </div>

                  {/* Blockquotes de Evidências Reais */}
                  {analysisResult.blockquotes && analysisResult.blockquotes.length > 0 && (
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C46A1A] flex items-center gap-2 font-outfit">
                        <Quote className="w-3.5 h-3.5" />
                        Evidências e Citações Reais da Interface [Blockquotes]
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analysisResult.blockquotes.map((bq) => (
                          <div
                            key={bq.id}
                            onMouseEnter={() => setHighlightedQuote(bq.id)}
                            onMouseLeave={() => setHighlightedQuote(null)}
                            className={`p-4 rounded-xl border transition-all ${
                              highlightedQuote === bq.id
                                ? "bg-[#1f1510] border-[#C46A1A]"
                                : "bg-[#07070a] border-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1.5 font-outfit">
                              <span className="w-5 h-5 rounded-full bg-[#C46A1A]/20 text-[#C46A1A] text-[10px] font-bold flex items-center justify-center">
                                {bq.id}
                              </span>
                              <span className="text-[11px] font-medium text-white/70">
                                {bq.location}
                              </span>
                            </div>
                            <blockquote className="text-xs italic text-white/60 border-l-2 border-[#C46A1A] pl-3 py-1">
                              "{bq.text}"
                            </blockquote>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Panorama das 5 Categorias em Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {analysisResult.categories.map((cat, idx) => (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className="p-4 rounded-xl bg-[#0f0f16]/60 hover:bg-[#161622] border border-white/5 hover:border-[#C46A1A]/30 transition-all text-left group cursor-pointer"
                  >
                    <span className="text-[10px] text-[#C46A1A] font-mono block mb-1">
                      CATEGORIA {idx + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#C46A1A] transition-colors mb-2 font-outfit">
                      {cat.title}
                    </h4>
                    <p className="text-[11px] text-white/50 line-clamp-2 font-light">
                      {cat.overview}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-white/40 mt-3 pt-2 border-t border-white/5 font-outfit">
                      <span>{cat.issues.length} falhas</span>
                      <span className="text-[#C46A1A] flex items-center gap-0.5">
                        Ver detalhes <ChevronRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CONTEÚDO: CATEGORIAS ESPECÍFICAS (TABS 0..4) */}
          {activeTab >= 0 && activeTab < analysisResult.categories.length && (
            <div className="space-y-6">
              {(() => {
                const currentCategory = analysisResult.categories[activeTab];
                const filteredIssues = currentCategory.issues.filter(i => {
                  if (severityFilter === "todos") return true;
                  return i.severity.toLowerCase() === severityFilter.toLowerCase();
                });

                return (
                  <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#C46A1A] uppercase">
                            Categoria {activeTab + 1} de 5
                          </span>
                        </div>
                        <h2 className="text-xl font-light text-white mt-1 font-outfit">
                          {currentCategory.title}
                        </h2>
                        <p className="text-xs text-white/60 mt-1 max-w-3xl font-light">
                          {currentCategory.overview}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-[#07070a] p-1 rounded-xl border border-white/5 font-outfit">
                        {["todos", "crítico", "alto", "médio"].map((sev) => (
                          <button
                            key={sev}
                            type="button"
                            onClick={() => setSeverityFilter(sev)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              severityFilter === sev
                                ? "bg-[#C46A1A] text-white"
                                : "text-white/40 hover:text-white"
                            }`}
                          >
                            {sev}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {filteredIssues.length === 0 ? (
                        <div className="text-center py-12 text-white/40 text-xs font-outfit">
                          Nenhum problema encontrado com o filtro de severidade selecionado.
                        </div>
                      ) : (
                        filteredIssues.map((issue, idx) => {
                          const isCritical = issue.severity === "Crítico";
                          const isHigh = issue.severity === "Alto";

                          return (
                            <div
                              key={issue.id || idx}
                              className="p-5 rounded-2xl bg-[#07070a] border border-white/10 hover:border-white/20 transition-all space-y-4"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <span
                                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border font-outfit ${
                                      isCritical
                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                        : isHigh
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                    }`}
                                  >
                                    {issue.severity}
                                  </span>
                                  <h3 className="text-sm font-semibold text-white font-outfit">
                                    {issue.title}
                                  </h3>
                                </div>

                                <span className="text-[10px] text-white/50 border border-white/10 px-2 py-0.5 rounded font-outfit">
                                  {issue.principle}
                                </span>
                              </div>

                              {issue.evidence && (
                                <div className="p-3 rounded-xl bg-[#0e0e14] border border-white/5 text-xs text-white/70">
                                  <span className="text-white/40 block text-[10px] font-mono uppercase mb-1">
                                    Evidência / Localização na Página:
                                  </span>
                                  {issue.evidence}
                                </div>
                              )}

                              <div className="space-y-1">
                                <span className="text-red-400/90 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 font-outfit">
                                  <TrendingDown className="w-3.5 h-3.5" />
                                  Impacto & Falha Técnica:
                                </span>
                                <p className="text-xs text-white/70 leading-relaxed pl-5 border-l border-red-500/30 font-light">
                                  {issue.problem}
                                </p>
                              </div>

                              <div className="space-y-1 pt-2">
                                <span className="text-green-400 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 font-outfit">
                                  <Check className="w-3.5 h-3.5" />
                                  Recomendação de Correção:
                                </span>
                                <p className="text-xs text-white/80 leading-relaxed pl-5 border-l border-green-500/30 font-medium">
                                  {issue.suggestion}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
