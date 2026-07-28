import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../types';
import { 
  Play, 
  FileDown, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Compass, 
  Palette, 
  Cpu, 
  TrendingUp, 
  Headphones,
  CheckCircle2,
  Layers,
  ArrowUp,
  Globe,
  Mail,
  Search,
  Activity,
  Briefcase,
  Calendar,
  PenTool,
  MessageSquare,
  Wrench,
  Video,
  Monitor,
  Megaphone,
  BarChart3,
  ExternalLink,
  Users,
  Clock,
  Radio,
  FileText,
  Share2,
  PhoneCall,
  Flame,
  Award,
  Layers3,
  Building2,
  MousePointerClick,
  ChevronRight,
  Eye,
  Zap,
  DollarSign
} from 'lucide-react';

const FABRICA_WHITE_LOGO = "https://res.cloudinary.com/ifuatk2z/image/upload/v1785252180/1196_300-8_bd1oqo.png";
const AZUL_LOGO = "https://res.cloudinary.com/ifuatk2z/image/upload/v1785183130/logo_Azul_spqf9c.svg";
const CRUZE_IMAGE = "https://res.cloudinary.com/ifuatk2z/image/upload/v1785183140/CRUZE_AZUL_hl4hny.png";
const LOJA_IMAGE = "https://azulveiculos.com.br/img/azul-loja-1.png";

interface LandingPageProps {
  slides: SlideData[];
  onOpenPresentation: (slideIndex?: number) => void;
  onDownloadPDF: () => void;
}

export const FabricaAzulLandingPage: React.FC<LandingPageProps> = ({
  slides,
  onOpenPresentation,
  onDownloadPDF
}) => {
  const [isIframePaused, setIsIframePaused] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      {/* ================= TOP HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-[#060e26]/95 backdrop-blur-md border-b border-blue-800/40 shadow-2xl no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left Brand Logos */}
          <div className="flex items-center gap-3 sm:gap-5">
            <img 
              src={FABRICA_WHITE_LOGO} 
              alt="Fábrica Publicidade" 
              className="h-8 sm:h-10 object-contain drop-shadow" 
            />
            <div className="h-6 w-px bg-blue-800/60 hidden sm:block"></div>
            <div className="flex items-center bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 backdrop-blur-md shadow-md transition-all">
              <img 
                src={AZUL_LOGO} 
                alt="Azul Veículos" 
                className="h-6 sm:h-8 object-contain drop-shadow" 
              />
            </div>
          </div>

          {/* Top Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onOpenPresentation(0)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-cyan-400/40"
              title="Iniciar Modo Apresentação em Tela Cheia (Slide 1 ao 20)"
            >
              <Play className="w-4 h-4 fill-current text-cyan-200" />
              <span>Modo Slides (20)</span>
            </button>

            <button
              onClick={onDownloadPDF || handlePrint}
              className="flex items-center gap-2 bg-[#0a1c6a] text-cyan-300 hover:text-white hover:bg-blue-900 border border-cyan-500/40 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              title="Baixar ou Imprimir em PDF Vertical"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#060e26] via-[#081538] to-[#030712]">
        {/* Hero Background Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text content, badges, metrics, CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-flex items-center gap-2.5 bg-blue-950/90 border border-cyan-400/40 px-4 py-1.5 rounded-full shadow-2xl mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                  RELATÓRIO TÉCNICO-OPERACIONAL • FÁBRICA & AZUL VEÍCULOS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] font-display mb-6">
                OPERAÇÃO INTEGRADA DE<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-amber-300">
                  MARKETING, VENDAS & TECNOLOGIA
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
                Apresentação executiva consolidando todas as frentes de inteligência comercial, criação de mídia, produção audiovisual, tráfego pago, desenvolvimento web e suporte operacional prestados pela <strong className="text-white">Fábrica Publicidade</strong> para a <strong className="text-white">Azul Veículos</strong>.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => onOpenPresentation(0)}
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-cyan-300/50"
                >
                  <Play className="w-5 h-5 fill-current text-cyan-200" />
                  <span>Abrir Apresentação (20 Slides)</span>
                </button>

                <button
                  onClick={onDownloadPDF || handlePrint}
                  className="flex items-center gap-2.5 bg-[#0a1c6a]/90 text-cyan-300 hover:text-white hover:bg-blue-900 border border-cyan-500/40 font-extrabold text-sm px-5 py-3.5 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <FileDown className="w-5 h-5 text-cyan-400" />
                  <span>Baixar PDF</span>
                </button>
              </div>

              {/* Metric Cards - 4 Columns in Left Column */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gradient-to-br from-[#0a1c6a]/90 to-[#0d3b85]/80 border border-cyan-500/30 p-3.5 rounded-xl backdrop-blur-md shadow-lg">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase">Peças/Mês</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">+2.000</div>
                  <div className="text-[10px] text-amber-300 font-extrabold uppercase mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Publicidade
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0a1c6a]/90 to-[#0d3b85]/80 border border-cyan-500/30 p-3.5 rounded-xl backdrop-blur-md shadow-lg">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase">Audiovisual</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">+160</div>
                  <div className="text-[10px] text-amber-300 font-extrabold uppercase mt-0.5 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> Reels / Mês
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0a1c6a]/90 to-[#0d3b85]/80 border border-cyan-500/30 p-3.5 rounded-xl backdrop-blur-md shadow-lg">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase">Alcance</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">+1,2M</div>
                  <div className="text-[10px] text-amber-300 font-extrabold uppercase mt-0.5 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" /> Pessoas
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#0a1c6a]/90 to-[#0d3b85]/80 border border-cyan-500/30 p-3.5 rounded-xl backdrop-blur-md shadow-lg">
                  <div className="text-[10px] font-mono font-bold text-cyan-300 uppercase">SLA Suporte</div>
                  <div className="text-2xl font-black text-white font-mono mt-0.5">24h</div>
                  <div className="text-[10px] text-amber-300 font-extrabold uppercase mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Atendimento
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Ultra-sharp photo showcase card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-cyan-400/50 shadow-2xl bg-gradient-to-b from-[#0a1c6a] via-[#0d3b85] to-[#030712] p-3 group">
                {/* Top badge */}
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase shadow flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    ACERVO AUDIOVISUAL & MÍDIA
                  </span>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                    FÁBRICA PRODUÇÕES
                  </span>
                </div>

                {/* Sharp High-Def Image Container */}
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-blue-400/30 bg-black/50 flex items-center justify-center">
                  <img 
                    src={CRUZE_IMAGE} 
                    alt="Chevrolet Cruze Azul Veículos" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-105 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060e26] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#060e26]/90 border border-cyan-400/40 p-3.5 rounded-xl backdrop-blur-md shadow-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-white uppercase flex items-center gap-2 font-display">
                        <Building2 className="w-4 h-4 text-cyan-400" /> Chevrolet Cruze • Azul Veículos
                      </div>
                      <div className="text-[11px] text-cyan-300 mt-0.5 font-sans">
                        Produção com fotos HD, vídeos Reels e enxoval promocional
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Bottom detail row */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#060e26]/80 p-2.5 rounded-xl border border-blue-800/60 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-[11px] text-slate-200 font-semibold">Produção Audiovisual HD</span>
                  </div>
                  <div className="bg-[#060e26]/80 p-2.5 rounded-xl border border-blue-800/60 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-[11px] text-slate-200 font-semibold">Tráfego Pago Meta & Google</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: APRESENTAÇÃO GERAL (SLIDE 02) ================= */}
      <section id="apresentacao" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              SLIDE 02/20 • APRESENTAÇÃO GERAL DA CONTA
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display mb-6">
              ESTRUTURA OPERACIONAL E PROPÓSITO DA PARCERIA
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
              <p>
                Este relatório apresenta a estrutura operacional de marketing atualmente desenvolvida pela <strong className="text-white">Fábrica Publicidade</strong> para a <strong className="text-white">Azul Veículos</strong>.
              </p>
              <p>
                Mais do que documentar peças produzidas ou campanhas executadas, este material demonstra a abrangência da operação conduzida pela agência, evidenciando sua atuação estratégica, criativa, tecnológica e operacional.
              </p>
              <p>
                Os volumes de entregas apresentados representam a média operacional da agência, podendo variar conforme o calendário comercial, campanhas promocionais, sazonalidade do mercado e as necessidades estratégicas da Azul Veículos.
              </p>
              <div className="p-4 bg-[#0a1c6a]/80 border border-cyan-500/40 rounded-xl text-amber-300 font-semibold text-xs leading-relaxed flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>Documenta não apenas os entregáveis produzidos, mas todas as atividades de planejamento, atendimento, desenvolvimento, suporte e acompanhamento diário nas lojas da rede.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-2xl group">
              <img 
                src={LOJA_IMAGE} 
                alt="Loja Azul Veículos" 
                className="w-full h-88 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e26] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a1c6a]/95 border border-blue-500/50 p-4 rounded-xl backdrop-blur-md shadow-lg">
                <div className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" /> Sede & Lojas da Azul Veículos
                </div>
                <div className="text-[11px] text-cyan-300 mt-1">Atendimento, presença em loja e suporte contínuo para os consultores de vendas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: 4 PILARES COM CARDS BONITOS & ÍCONES (SLIDE 03) ================= */}
      <section id="pilares" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            SLIDE 03/20 • NATUREZA DA OPERAÇÃO
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            ESTRUTURA CONTÍNUA, ESCALÁVEL E INTEGRADA 360°
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Quatro pilares interconectados que garantem presença de marca, tráfego e vendas no varejo automotivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Atuação Estratégica",
              sub: "Planejamento & Diretrizes",
              desc: "Alinhamento constante com a diretoria, planejamento comercial, calendário de campanhas, naming e posicionamento de mercado.",
              img: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=500&auto=format&fit=crop&q=60",
              badge: "Estratégia",
              icon: Target,
              bullets: ["Planejamento de Campanhas", "Calendário Comercial", "Naming & Posição de Marca"]
            },
            {
              title: "Atuação Criativa",
              sub: "Design & Audiovisual",
              desc: "Criação de identidades visuais, Key Visuals, redação, peças gráficas para redes, jornalzinhos e produção audiovisual.",
              img: "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=500&auto=format&fit=crop&q=60",
              badge: "Criação",
              icon: Palette,
              bullets: ["Key Visuals de Feirões", "Enxoval On & Offline", "Reels & Vídeos em Loja"]
            },
            {
              title: "Atuação Tecnológica",
              sub: "Digital & Plataformas",
              desc: "Desenvolvimento e manutenção do portal azulveiculos.com.br, landing pages de feirões, SEO e automação no RD Station.",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
              badge: "Tecnologia",
              icon: Cpu,
              bullets: ["Site azulveiculos.com.br", "Landing Pages de Lojas", "Integrador RD Station"]
            },
            {
              title: "Atuação Operacional",
              sub: "Atendimento & Workflow",
              desc: "Suporte diário às unidades, gestão de demandas urgentes, alterações rápidas de condições comerciais e fluxo contínuo de aprovações.",
              img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
              badge: "Operação",
              icon: Headphones,
              bullets: ["SLA de Alterações 24h", "Atendimento às Lojas", "Suporte em Fim de Semana"]
            }
          ].map((pillar, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-b from-[#0a1c6a] to-[#081538] border border-blue-500/40 rounded-2xl overflow-hidden shadow-2xl hover:border-cyan-400 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={pillar.img} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c6a] via-transparent to-black/40"></div>
                
                <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
                  {pillar.badge}
                </span>

                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-blue-950/90 border border-cyan-400/50 text-cyan-300 flex items-center justify-center shadow-lg">
                  <pillar.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-bold text-cyan-300 uppercase mb-1">{pillar.sub}</div>
                  <h3 className="text-lg font-extrabold text-amber-400 uppercase mb-2 font-display">{pillar.title}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans mb-4">{pillar.desc}</p>
                </div>

                <div className="pt-3 border-t border-blue-800/60 space-y-1.5">
                  {pillar.bullets.map((b, bi) => (
                    <div key={bi} className="text-[11px] text-cyan-200 flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SECTION: CRIAÇÃO & REELS (SLIDES 10, 11 & 12) ================= */}
      <section id="criacao" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            SLIDES 10, 11 & 12/20 • CRIAÇÃO & AUDIOVISUAL
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            PADRONIZAÇÃO VISUAL, KEY VISUALS & PRODUÇÃO DE VÍDEO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Desenvolvimento do enxoval de comunicação completo com fotos, artes e vídeos gravados em loja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            {[
              { title: "Key Visuals de Feirões", icon: Palette, desc: "Conceituação de artes para Feirão de Aniversário, Balão Premiado, Tabela FIPE 100% e Taxas Reduzidas." },
              { title: "Enxoval Digital para Social", icon: Share2, desc: "Adaptados para Feed, Stories com enquetes, Carrosséis e Banners para transmissão em WhatsApp." },
              { title: "Gravação de Vídeos em Loja", icon: Video, desc: "Filmmakers e Mobile Makers dedicados gravando o estoque real, ofertas do dia e apresentações." },
              { title: "Edição Acelerada com Motion", icon: Layers3, desc: "Transições dinâmicas, vinhetas com logo da Azul Veículos e legendas em formato Reels/TikTok." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-r from-[#0a1c6a] to-[#081738] border border-blue-800/60 p-4 rounded-2xl flex items-start gap-4 shadow-lg hover:border-cyan-400/60 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-amber-400 uppercase font-display">{item.title}</h4>
                  <p className="text-xs text-slate-200 font-sans mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#081533] border border-cyan-500/50 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Key Visual em Ação — Campanha Aniversário</span>
                <span className="bg-amber-400 text-black px-2.5 py-0.5 rounded text-[10px] font-black">Layout Oficial</span>
              </div>

              <div 
                className="relative w-full h-80 rounded-2xl overflow-hidden p-6 flex flex-col justify-end shadow-2xl mb-4 border border-blue-500/40" 
                style={{ 
                  backgroundImage: `linear-gradient(to right, rgba(10,28,106,0.95), rgba(13,59,133,0.7)), url('${CRUZE_IMAGE}')`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center' 
                }}
              >
                <div className="relative z-10">
                  <span className="inline-block bg-amber-400 text-black font-black text-[10px] px-3 py-1 rounded uppercase mb-2 shadow">
                    Balão Premiado!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase leading-none font-display drop-shadow-md">
                    MÊS DE ANIVERSÁRIO AZUL VEÍCULOS
                  </h3>
                  <p className="text-xs text-cyan-300 mt-2 font-mono font-bold">
                    PAGAMOS ATÉ 100% TABELA FIPE • TAXAS A PARTIR DE 1.19% A.M.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#0a1c6a] p-3 rounded-xl border border-blue-800/50">
                  <div className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5 text-cyan-400" /> Digital
                  </div>
                  <div className="text-slate-300 text-[11px] font-sans mt-1">Feed, Stories, LPs, WhatsApp</div>
                </div>
                <div className="bg-[#0a1c6a] p-3 rounded-xl border border-blue-800/50">
                  <div className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1">
                    <Megaphone className="w-3.5 h-3.5 text-cyan-400" /> Offline / PDV
                  </div>
                  <div className="text-slate-300 text-[11px] font-sans mt-1">Faixas, Banners, Jornalzinhos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: CANAIS DO ECOSSISTEMA DIGITAL COM LOGOS E ÍCONES (SLIDES 13 & 14) ================= */}
      <section id="digital" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30 bg-[#060e26]/80 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            SLIDES 13 & 14/20 • CANAIS & PERFORMANCE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            CANAIS DO ECOSSISTEMA DIGITAL & TRÁFEGO PAGO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Estratégia multicanal conectando redes sociais, busca patrocinada no Google, anúncios na Meta e automação de leads.
          </p>
        </div>

        {/* 5 Channels Rich Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Instagram */}
          <div className="bg-gradient-to-br from-[#1a0c2e] via-[#0d1642] to-[#081538] border border-pink-500/40 p-5 rounded-2xl shadow-xl hover:border-pink-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                  IG
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">INSTAGRAM</h3>
                  <div className="text-[10px] font-mono text-pink-300">Conteúdo Diário & Reels</div>
                </div>
              </div>
              <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Relacionamento
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Canal principal de engajamento, apresentação de veículos do estoque, enquetes interativas em Stories e Reels de alto impacto.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-pink-900/40 pt-2 flex items-center justify-between">
              <span>Frequência: Diária</span>
              <span className="text-amber-400 font-mono font-bold">+160 Posts / Mês</span>
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-gradient-to-br from-[#0c183a] via-[#0d2252] to-[#081538] border border-blue-500/40 p-5 rounded-2xl shadow-xl hover:border-blue-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                  fb
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">FACEBOOK</h3>
                  <div className="text-[10px] font-mono text-blue-300">Audiência Sênior & Família</div>
                </div>
              </div>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Alcance Família
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Comunicação voltada a perfis de compradores de veículos seminovos de maior valor agregado e ofertas de financiamento bancário.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-blue-900/40 pt-2 flex items-center justify-between">
              <span>Atração Local</span>
              <span className="text-amber-400 font-mono font-bold">100% Sincronizado</span>
            </div>
          </div>

          {/* Google Ads */}
          <div className="bg-gradient-to-br from-[#122416] via-[#0d2138] to-[#081538] border border-emerald-500/40 p-5 rounded-2xl shadow-xl hover:border-emerald-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                  G
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">GOOGLE ADS</h3>
                  <div className="text-[10px] font-mono text-emerald-300">Rede de Pesquisa & Busca</div>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Intenção de Compra
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Anúncios de busca ativados exatamente quando o cliente procura por "comprar carro seminovo", palavras-chave de modelos e termos regionais.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-emerald-900/40 pt-2 flex items-center justify-between">
              <span>Conversão Direta</span>
              <span className="text-amber-400 font-mono font-bold">Alta Qualidade</span>
            </div>
          </div>

          {/* Meta Ads */}
          <div className="bg-gradient-to-br from-[#0c1f3d] via-[#0f2d5e] to-[#081538] border border-cyan-500/40 p-5 rounded-2xl shadow-xl hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md">
                  ∞
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">META ADS</h3>
                  <div className="text-[10px] font-mono text-cyan-300">Tráfego Pago & Leads</div>
                </div>
              </div>
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Leads no ZAP
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Gestão de orçamentos patrocinados com direcionamento dos cliques direto para o WhatsApp das equipes de vendas de cada loja.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-cyan-900/40 pt-2 flex items-center justify-between">
              <span>Segmentação Local</span>
              <span className="text-amber-400 font-mono font-bold">Otimização Diária</span>
            </div>
          </div>

          {/* RD Station */}
          <div className="bg-gradient-to-br from-[#241708] via-[#2d1e0d] to-[#081538] border border-amber-500/40 p-5 rounded-2xl shadow-xl hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black text-lg shadow-md">
                  RD
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">RD STATION</h3>
                  <div className="text-[10px] font-mono text-amber-300">Inbound & CRM Sync</div>
                </div>
              </div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Inbound CRM
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Captura de cadastros provenientes das Landing Pages de feirões, automação de emails e nutrição da base de contatos.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-amber-900/40 pt-2 flex items-center justify-between">
              <span>Nutrição Automática</span>
              <span className="text-amber-400 font-mono font-bold">CRM Integrado</span>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <div className="bg-gradient-to-br from-[#0c2e17] via-[#0d381c] to-[#081538] border border-emerald-500/40 p-5 rounded-2xl shadow-xl hover:border-emerald-400 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black text-lg shadow-md">
                  WA
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white uppercase">WHATSAPP VENDAS</h3>
                  <div className="text-[10px] font-mono text-emerald-300">Conversão de Atendimento</div>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Atendimento Rápido
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              Envio imediato do lead capturado no tráfego para os consultores de plantão da Azul Veículos, reduzindo o tempo de resposta.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold border-t border-emerald-900/40 pt-2 flex items-center justify-between">
              <span>Canal Oficial</span>
              <span className="text-amber-400 font-mono font-bold">100% Direto</span>
            </div>
          </div>
        </div>

        {/* Financial Partner Banks */}
        <div className="bg-[#081533] border border-blue-800/60 p-6 rounded-2xl">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">SLIDE 08/20 • PARCEIROS FINANCEIROS</div>
          <h3 className="text-lg font-extrabold text-white uppercase mb-4 font-display">
            SINALIZAÇÃO DE BANCOS E FINANCEIRAS INTEGRADA
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { bank: "SANTANDER", rate: "Taxa Promocional 1.19%" },
              { bank: "BV FINANCEIRA", rate: "Aprovação Facilitada" },
              { bank: "ITAÚ REINVENTA", rate: "Primeira Parcela 90 dias" },
              { bank: "BRADESCO AUTO", rate: "Tabela FIPE 100%" }
            ].map((partner, pi) => (
              <div key={pi} className="bg-[#0a1c6a] border border-blue-500/30 p-3.5 rounded-xl text-center">
                <div className="text-xs font-black text-amber-400 uppercase">{partner.bank}</div>
                <div className="text-[11px] text-slate-200 mt-0.5 font-sans">{partner.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: TECNOLOGIA & WEBSITE AZUL VEÍCULOS AO VIVO COM AUTOSCROLL (SLIDE 15) ================= */}
      <section id="tecnologia" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            SLIDE 15/20 • TECNOLOGIA & PLATAFORMA WEB
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            WEBSITE OFICIAL DA AZUL VEÍCULOS AO VIVO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Simulador de navegação ao vivo do portal <strong className="text-white">azulveiculos.com.br</strong> com rolagem automática contínua para apresentação executiva.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Embedded Real Website with Slow Autoscroll */}
          <div className="lg:col-span-8 bg-[#081229] border border-blue-800/60 rounded-3xl p-3 sm:p-5 shadow-2xl">
            {/* Top Browser Header */}
            <div className="bg-[#0b1b3d] h-10 w-full rounded-t-2xl flex items-center justify-between px-4 border-b border-blue-900/50 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>

              <div className="bg-[#040a17] rounded-lg px-4 py-1 w-full max-w-sm sm:max-w-md flex items-center justify-center text-slate-300 text-xs font-mono gap-2 border border-white/10 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">https://www.azulveiculos.com.br/</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsIframePaused(!isIframePaused)}
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 shadow ${
                    isIframePaused 
                      ? 'bg-amber-400 text-black hover:bg-amber-300' 
                      : 'bg-blue-800 text-cyan-300 hover:bg-blue-700'
                  }`}
                  title={isIframePaused ? "Retomar Rolagem Automática" : "Pausar Rolagem Automática"}
                >
                  {isIframePaused ? (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline">Pausado</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                      <span className="hidden sm:inline">Rolando Ao Vivo</span>
                    </>
                  )}
                </button>
                <a
                  href="https://www.azulveiculos.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white p-1 rounded hover:bg-white/10"
                  title="Abrir Site em Nova Aba"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Iframe Viewport Wrapper */}
            <div className="relative w-full h-[520px] sm:h-[620px] overflow-hidden rounded-b-2xl bg-slate-900 border border-blue-900/40">
              <div 
                className={`w-full h-[2200px] transition-transform ${
                  isIframePaused ? '' : 'animate-slow-vertical-scroll'
                }`}
              >
                <iframe
                  src="https://www.azulveiculos.com.br/"
                  title="Site Oficial Azul Veículos"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column Technical Spec Table */}
          <div className="lg:col-span-4 bg-[#081533] border border-blue-800/60 p-5 rounded-3xl shadow-xl">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
              DESENVOLVIMENTO & MANUTENÇÃO
            </div>
            <h3 className="text-base font-extrabold text-white uppercase mb-4 font-display">
              Escopo Tecnológico do Website
            </h3>

            <div className="space-y-3 divide-y divide-blue-800/40 font-sans">
              {[
                { title: "Website Institucional", desc: "Página oficial com catálogo completo de seminovos e botão de WhatsApp direto para os vendedores." },
                { title: "Landing Pages de Feirões", desc: "Páginas dedicadas para eventos de alta conversão com formulários Inbound capturados no RD Station." },
                { title: "Integração com ERP de Lojas", desc: "Sincronização do catálogo de veículos disponíveis em tempo real nas unidades." },
                { title: "Atualização de Ofertas", desc: "Publicação imediata de banners de topo e promoções vigentes do mês." },
                { title: "SEO Automotivo Regional", desc: "Otimização contínua para buscas no Google nas cidades da área de cobertura." },
                { title: "Suporte Técnico 24/7", desc: "Monitoramento de disponibilidade e ajustes acelerados na plataforma." }
              ].map((row, idx) => (
                <div key={idx} className="pt-3 first:pt-0">
                  <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{row.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 pl-5">{row.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: SÍNTESE & METRICAS (SLIDES 18, 19 & 20) ================= */}
      <section id="indicadores" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-blue-900/30">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">
            SLIDES 18, 19 & 20/20 • RESUMO EXECUTIVO
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            SÍNTESE & INDICADORES DE CONSOLIDAÇÃO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Volume médio mensal de entregas da Fábrica Publicidade para a operação da Azul Veículos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "+2.000", label: "Peças Publicitárias / Mês", cat: "Volume Criativo", icon: Palette },
            { value: "+160", label: "Stories & Reels Gravados", cat: "Audiovisual", icon: Video },
            { value: "+1,2M", label: "Pessoas Alcançadas / Mês", cat: "Alcance Digital", icon: Globe },
            { value: "100%", label: "Atendimento às Lojas", cat: "Cobertura Unidades", icon: Building2 },
            { value: "+30", label: "Landing Pages de Feirões", cat: "Inbound & Tech", icon: Cpu },
            { value: "+50.000", label: "Leads Gerados / Ano", cat: "Inbound Vendas", icon: Zap },
            { value: "24h", label: "SLA de Alterações Ágeis", cat: "Atendimento", icon: Clock },
            { value: "360°", label: "Integração On e Offline", cat: "Estratégia Total", icon: Layers }
          ].map((metric, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-b from-[#0a1c6a] to-[#081538] p-6 rounded-2xl border border-blue-500/40 shadow-2xl text-center flex flex-col justify-between group hover:border-cyan-400 transition-all"
            >
              <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                <metric.icon className="w-3.5 h-3.5 text-amber-400" />
                <span>{metric.cat}</span>
              </div>
              
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-300 font-mono my-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                {metric.value}
              </div>

              <div className="text-xs sm:text-sm font-bold text-amber-300 uppercase leading-tight font-sans">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CALL TO ACTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-blue-900/30 no-print">
        <div className="bg-gradient-to-r from-[#0a1c6a] via-[#0f2d9e] to-[#0a1c6a] border border-cyan-400/50 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4 font-display">
            DESEJA REVISAR SLIDE A SLIDE EM MODO APRESENTAÇÃO?
          </h2>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto mb-8 font-sans">
            Acesse a versão interativa em tela cheia com navegação por teclado (setas / barra de espaço), suporte a PDF e edição de conteúdo em tempo real.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenPresentation(0)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-cyan-300"
            >
              <Play className="w-5 h-5 fill-current text-cyan-200" />
              <span>Abrir Apresentação (20 Slides)</span>
            </button>

            <button
              onClick={onDownloadPDF || handlePrint}
              className="flex items-center gap-2 bg-[#040914] text-cyan-300 hover:text-white border border-cyan-500/50 font-bold text-sm px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              <FileDown className="w-5 h-5" />
              <span>Baixar PDF Completo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-[#02050e] border-t border-blue-950 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Footer Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={FABRICA_WHITE_LOGO} 
              alt="Fábrica Publicidade" 
              className="h-8 object-contain filter brightness-0 invert" 
            />
            <span className="text-slate-700">|</span>
            <span className="font-mono text-[11px] text-slate-400 uppercase">
              Documento Técnico-Operacional • Azul Veículos
            </span>
          </div>

          {/* Copyright and Confidential Note */}
          <div className="text-center sm:text-right font-sans">
            <p className="text-slate-400 font-medium">
              Documento técnico confidencial e exclusivo • Julho de 2026
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Fábrica Publicidade & Digital © Todos os direitos reservados.
            </p>
          </div>

          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-[#0a1c6a] border border-blue-800 text-cyan-300 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors shadow-md no-print"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
