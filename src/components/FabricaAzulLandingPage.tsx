
const InstagramLogo = () => (
  <img src="https://images.icon-icons.com/2992/PNG/512/instagram_logo_icon_187313.png" alt="Instagram" className="w-8 h-8 shrink-0 object-contain" />
);
const FacebookLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const GoogleLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);
const MetaLogo = () => (
  <img src="https://pngimg.com/uploads/meta/meta_PNG5.png" alt="Meta Ads" className="w-8 h-8 shrink-0 object-contain" />
);
const GoogleAdsLogo = () => (
  <img src="https://images.icon-icons.com/2699/PNG/512/google_ads_logo_icon_171064.png" alt="Google Ads" className="w-9 h-9 shrink-0 object-contain" />
);
const InboundMarketingLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#00D2B6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);
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
const CRUZE_IMAGE = "https://res.cloudinary.com/ifuatk2z/image/upload/v1785266948/CRUZE_AZUL_2_rn1jkx.png";
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
      <header className="absolute top-0 inset-x-0 z-50 bg-transparent no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
          {/* Left Brand Logos */}
          <div className="flex items-center gap-6">
            <img 
              src={FABRICA_WHITE_LOGO} 
              alt="Fábrica Publicidade" 
              className="h-9 sm:h-11 object-contain drop-shadow-lg filter brightness-0 invert" 
            />
            <div className="h-8 w-[2px] bg-white/20 hidden sm:block rounded-full"></div>
            <img 
              src={AZUL_LOGO} 
              alt="Azul Veículos" 
              className="h-12 sm:h-14 lg:h-16 object-contain filter brightness-0 invert drop-shadow-lg" 
            />
          </div>

          {/* Top Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPresentation(0)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm px-6 py-3 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Ver Case Completo</span>
            </button>
            <button
              onClick={onDownloadPDF || handlePrint}
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-sm px-6 py-3 rounded-full shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <FileDown className="w-4 h-4" />
              <span>Baixar PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[95vh] flex items-center overflow-hidden bg-[#050B14]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={CRUZE_IMAGE} 
            alt="Background" 
            className="w-full h-full object-cover object-center" 
          />
          
          <div className="absolute inset-y-0 right-0 w-3/4 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full flex justify-end text-right">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-end"
            >
              <div className="inline-flex items-center gap-3 bg-[#0f172a]/50 border border-white/5 backdrop-blur-md px-4 py-2 rounded-full mb-8 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-[0.2em]">
                  RELATÓRIO TÉCNICO
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-6 drop-shadow-2xl text-right">
                OPERAÇÃO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-blue-400">
                  INTEGRADA DE MARKETING
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-bold uppercase tracking-widest leading-relaxed mb-10 max-w-xl drop-shadow-md text-right">
                DOCUMENTO TÉCNICO-OPERACIONAL - JULHO DE 2026 <br/>
                USO INTERNO E CONFIDENCIAL - FÁBRICA PUBLICIDADE & DIGITAL
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap justify-end items-center gap-4 mb-16">
                <button
                  onClick={() => onOpenPresentation(0)}
                  className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-base px-8 py-4 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Explorar Case Completo</span>
                </button>
              </div>

              {/* Floating Glass Boxes Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-2xl">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-[#0f172a]/80 border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-xl text-right flex flex-col items-end"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-0.5 tracking-tight">+1M</div>
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Alcance</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-[#0f172a]/80 border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-xl text-right flex flex-col items-end"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-0.5 tracking-tight">+2M</div>
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Impressões</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-[#0f172a]/80 border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-xl text-right flex flex-col items-end"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-0.5 tracking-tight">+70</div>
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Peças p/ Feed</div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-[#0f172a]/80 border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-xl text-right flex flex-col items-end"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-0.5 tracking-tight">+160</div>
                  <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Stories / Mês</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section id="apresentacao" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            
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
              <div className="p-4 bg-[#0f172a]/50 border border-white/5 backdrop-blur-sm rounded-xl text-slate-200 font-semibold text-xs leading-relaxed flex items-start gap-3">
                <Award className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <span>Documenta não apenas os entregáveis produzidos, mas todas as atividades de planejamento, atendimento, desenvolvimento, suporte e acompanhamento diário nas lojas da rede.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src={LOJA_IMAGE} 
                alt="Loja Azul Veículos" 
                className="w-full h-88 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>

            </div>
          </div>
        </div>
      </section>

      
      <section id="pilares" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            ESTRUTURA CONTÍNUA, ESCALÁVEL E INTEGRADA 360°
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Quatro pilares interconectados que garantem presença de marca, tráfego e vendas no varejo automotivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              desc: "Criação de identidades visuais, Key Visuals, redação, peças gráficas para redes, material offline e produção audiovisual e produção audiovisual.",
              img: "https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png",
              badge: "Criação",
              icon: Palette,
              bullets: ["Key Visuals de Feirões", "Enxoval On & Offline", "Reels & Vídeos em Loja"]
            },
            {
              title: "Atuação Tecnológica",
              sub: "Digital & Plataformas",
              desc: "Desenvolvimento e manutenção do portal azulveiculos.com.br, landing pages de feirões, SEO e automação no Ferramenta de Inbound Marketing.",
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
              badge: "Tecnologia",
              icon: Cpu,
              bullets: ["Site azulveiculos.com.br", "Landing Pages de Lojas", "Integrador Ferramenta de Inbound Marketing"]
            },
            {
              title: "Atuação Operacional",
              sub: "Atendimento & Workflow",
              desc: "Suporte diário às unidades, gestão de demandas urgentes, alterações rápidas de condições comerciais e fluxo contínuo de aprovações.",
              img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcHJlc2F8ZW58MHx8MHx8fDI%3D",
              badge: "Operação",
              icon: Headphones,
              bullets: ["SLA de Alterações 24h", "Atendimento às Lojas", "Atendimento Exclusivo"]
            }
          ].map((pillar, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-[#0f172a]/50 border border-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:border-cyan-400 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={pillar.img} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent"></div>
                
                <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
                  {pillar.badge}
                </span>

                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-[#0f172a]/50 border border-white/5 backdrop-blur-sm text-cyan-300 flex items-center justify-center shadow-lg">
                  <pillar.icon className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono font-bold text-cyan-300 uppercase mb-1">{pillar.sub}</div>
                  <h3 className="text-lg font-extrabold text-slate-200 uppercase mb-2 font-display">{pillar.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">{pillar.desc}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
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
      <section id="criacao" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="text-center max-w-3xl mx-auto mb-12">
          
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
              { title: "Enxoval Digital para Social", icon: Share2, desc: "Adaptados para Feed, Stories com email marketing, Carrosséis e Banners para transmissão em WhatsApp." },
              { title: "Gravação de Vídeos em Loja", icon: Video, desc: "Filmmakers e Mobile Makers dedicados gravando o estoque real, ofertas do dia e apresentações." },
              { title: "Edição Acelerada com Motion", icon: Layers3, desc: "Transições dinâmicas, vinhetas com logo da Azul Veículos e legendas em formato Reels/." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-r from-white/5 to-[#081738] border border-white/10 p-4 rounded-2xl flex items-start gap-4 shadow-lg hover:border-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-white/10 text-cyan-300 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-400 uppercase font-display">{item.title}</h4>
                  <p className="text-xs text-slate-200 font-sans mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                alt="Key Visual" 
                className="w-full h-auto object-cover block"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION: PERFORMANCE DO SITE ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display mb-4">
            A Importância da <span className="text-cyan-400">Velocidade</span> do Site
          </h2>
          <p className="text-base text-slate-300 font-sans">
            Um site rápido converte mais. Compare a experiência de um site lento com a performance de um site otimizado (Nota A no PageSpeed).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Site Lento */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-8 border border-red-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Site Lento</h3>
              </div>
              <div className="text-3xl font-black text-red-500 tracking-tighter">45<span className="text-sm font-normal text-red-400">/100</span></div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tempo de Carregamento</span>
                <span className="text-red-400 font-bold">8.5s</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Taxa de Rejeição</span>
                <span className="text-red-400 font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
              <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Impacto Negativo
              </h4>
              <ul className="text-slate-300 text-xs space-y-2 font-sans">
                <li>• Perda de posições no Google (SEO)</li>
                <li>• Alto custo por clique em campanhas</li>
                <li>• Frustração do usuário e abandono</li>
              </ul>
            </div>
          </div>

          {/* Site Rápido (Nota A) */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Site Nota A</h3>
              </div>
              <div className="text-3xl font-black text-emerald-400 tracking-tighter">98<span className="text-sm font-normal text-emerald-500/70">/100</span></div>
            </div>
            
            <div className="space-y-4 mb-8 relative">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tempo de Carregamento</span>
                <span className="text-emerald-400 font-bold">1.2s</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '12%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Taxa de Rejeição</span>
                <span className="text-emerald-400 font-bold">15%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 relative">
              <h4 className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Impacto Positivo
              </h4>
              <ul className="text-slate-300 text-xs space-y-2 font-sans">
                <li>• Melhor ranqueamento orgânico (SEO)</li>
                <li>• Maior conversão de leads e vendas</li>
                <li>• Experiência fluida e profissional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: CANAIS DO ECOSSISTEMA DIGITAL COM LOGOS E ÍCONES (SLIDES 13 & 14) ================= */}
      <section id="digital" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#0f172a]/30 rounded-3xl my-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            CANAIS DO ECOSSISTEMA DIGITAL & TRÁFEGO PAGO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Estratégia multicanal conectando redes sociais, busca patrocinada no Google, anúncios na Meta e automação de leads.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Instagram */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <InstagramLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">INSTAGRAM</h3>
                    <div className="text-[11px] font-mono text-pink-600 font-semibold">Conteúdo Diário & Reels</div>
                  </div>
                </div>
                <span className="bg-pink-100 text-pink-700 border border-pink-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Relacionamento
                </span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
                Canal principal de engajamento, apresentação de veículos do estoque, email marketing interativas em Stories e Reels de alto impacto.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-3 flex items-center justify-between border-t border-slate-100">
              <span>Frequência: Diária</span>
              <span className="text-slate-900 font-mono font-bold">+160 Posts / Mês</span>
            </div>
          </div>

          {/* Facebook */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FacebookLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">FACEBOOK</h3>
                    <div className="text-[11px] font-mono text-blue-600 font-semibold">Audiência Sênior & Família</div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Alcance Família
                </span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
                Comunicação voltada a perfis de compradores de veículos seminovos de maior valor agregado e ofertas de financiamento bancário.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-3 flex items-center justify-between border-t border-slate-100">
              <span>Atração Local</span>
              <span className="text-slate-900 font-mono font-bold">100% Sincronizado</span>
            </div>
          </div>

          {/* Google Ads */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <GoogleAdsLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">GOOGLE ADS</h3>
                    <div className="text-[11px] font-mono text-emerald-600 font-semibold">Rede de Pesquisa & Busca</div>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Intenção de Compra
                </span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
                Anúncios de busca ativados exatamente quando o cliente procura por "comprar carro seminovo", palavras-chave de modelos e termos regionais.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-3 flex items-center justify-between border-t border-slate-100">
              <span>Conversão Direta</span>
              <span className="text-slate-900 font-mono font-bold">Alta Qualidade</span>
            </div>
          </div>

          {/* Meta Ads */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MetaLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">META ADS</h3>
                    <div className="text-[11px] font-mono text-blue-600 font-semibold">Tráfego Pago & Leads</div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Leads no ZAP
                </span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
                Gestão de orçamentos patrocinados com direcionamento dos cliques direto para o WhatsApp das equipes de vendas de cada loja.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-3 flex items-center justify-between border-t border-slate-100">
              <span>Segmentação Local</span>
              <span className="text-slate-900 font-mono font-bold">Otimização Diária</span>
            </div>
          </div>

          {/* Ferramenta de Inbound Marketing */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <InboundMarketingLogo />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 uppercase">Ferramenta de Inbound Marketing</h3>
                    <div className="text-[11px] font-mono text-amber-600 font-semibold">Inbound & CRM Sync</div>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Inbound CRM
                </span>
              </div>
              <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
                Captura de cadastros provenientes das , automação de emails e nutrição da base de contatos.
              </p>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold pt-3 flex items-center justify-between border-t border-slate-100">
              <span>Nutrição Automática</span>
              <span className="text-slate-900 font-mono font-bold">CRM Integrado</span>
            </div>
          </div>
        </div>
      </section>

      
      <section id="tecnologia" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            WEBSITE OFICIAL DA AZUL VEÍCULOS AO VIVO
          </h2>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Embedded Real Website with Slow Autoscroll */}
          <div className="lg:col-span-8 bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-3 sm:p-5 shadow-2xl">
            {/* Top Browser Header */}
            <div className="bg-[#0b1b3d] h-10 w-full rounded-t-2xl flex items-center justify-between px-4 border-b border-white/10 mb-3">
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
            <div className="relative w-full h-[520px] sm:h-[620px] overflow-hidden rounded-b-2xl bg-slate-900 border border-white/10">
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
          <div className="lg:col-span-4 bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 p-5 rounded-3xl shadow-xl">
            
            <h3 className="text-base font-extrabold text-white uppercase mb-4 font-display">
              Escopo Tecnológico do Website
            </h3>

            <div className="space-y-3 divide-y divide-blue-800/40 font-sans">
              {[
                { title: "Website Institucional", desc: "Página oficial com catálogo completo de veículos seminovos e botão de WhatsApp direto para os vendedores." },
                { title: "", desc: "Páginas dedicadas para eventos de alta conversão com formulários Inbound capturados no Ferramenta de Inbound Marketing." },
                { title: "Integração com ERP", desc: "Sincronização do catálogo de veículos disponíveis em tempo real nas unidades." },
                { title: "Atualização de Ofertas", desc: "Publicação imediata de banners de topo e promoções vigentes do mês." },
                { title: "SEO Automotivo Regional", desc: "Otimização contínua para buscas no Google nas cidades da área de cobertura." },
                { title: "Suporte Técnico 24/7", desc: "Monitoramento de disponibilidade e ajustes acelerados na plataforma." }
              ].map((row, idx) => (
                <div key={idx} className="pt-3 first:pt-0">
                  <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
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

      <section id="indicadores" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="text-center max-w-3xl mx-auto mb-14">
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            SÍNTESE & INDICADORES DE CONSOLIDAÇÃO
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Volume médio mensal de entregas da Fábrica Publicidade para a operação da Azul Veículos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "+160", label: "Stories mensais", cat: "Redes Sociais", icon: Video },
            { value: "+70", label: "Peças para Feed", cat: "Redes Sociais", icon: Palette },
            { value: "+16", label: "Reels e Vídeos", cat: "Audiovisual", icon: Video },
            { value: "30", label: "material offline e produção audiovisual / Mês", cat: "Criativa", icon: Megaphone },
            { value: "+60", label: "Anúncios Gerenciados", cat: "Mídia & Tech", icon: Cpu },
            { value: "6", label: "Banners Website", cat: "Mídia & Tech", icon: Globe },
            { value: "16", label: "Materiais Institucionais", cat: "Criativa", icon: Layers },
            { value: "12", label: "Conteúdos por Loja", cat: "Redes Sociais", icon: Building2 }
          ].map((metric, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl text-center flex flex-col justify-between group hover:border-cyan-400 transition-all"
            >
              <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                <metric.icon className="w-3.5 h-3.5 text-slate-400" />
                <span>{metric.cat}</span>
              </div>
              
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan-300 font-mono my-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                {metric.value}
              </div>

              <div className="text-xs sm:text-sm font-bold text-slate-200 uppercase leading-tight font-sans">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CALL TO ACTION ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center  no-print">
        <div className="bg-[#0f172a]/30 border border-white/5 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4 font-display">
            DESEJA VER TODOS OS DETALHES DESTE CASE?
          </h2>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto mb-8 font-sans">
            Acesse o detalhamento completo e interativo com todos os dados da operação, exemplos práticos de criação, tráfego e indicadores de performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenPresentation(0)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Explorar Case Completo</span>
            </button>

            <button
              onClick={onDownloadPDF || handlePrint}
              className="flex items-center gap-2 bg-[#040914] text-white hover:bg-white/10 border border-white/20 font-bold text-sm px-6 py-3.5 rounded-full hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-md"
            >
              <FileDown className="w-5 h-5" />
              <span>Baixar Resumo em PDF</span>
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
            className="w-9 h-9 rounded-full bg-white/5 border border-blue-800 text-cyan-300 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors shadow-md no-print"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
