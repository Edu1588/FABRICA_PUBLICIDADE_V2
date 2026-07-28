import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../types';
import { 
  ChevronRight, 
  Lightbulb, 
  Palette, 
  Image as ImageIcon, 
  Stamp, 
  Layers, 
  Type,
  Compass,
  Cpu,
  TrendingUp,
  Headphones,
  Infinity as InfinityIcon,
  Search,
  Globe,
  Mail,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Target,
  Workflow,
  Briefcase,
  Calendar,
  PenTool,
  MessageSquare,
  Wrench,
  Sparkles,
  Activity
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
  direction: number; // 1 for next, -1 for prev
  isFullscreen?: boolean;
}

// Official Brand Icon Components
const InstagramLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
    <radialGradient id="igGrad" cx="30%" cy="107%" r="130%">
      <stop offset="0%" stopColor="#fdf497" />
      <stop offset="5%" stopColor="#fdf497" />
      <stop offset="45%" stopColor="#fd5949" />
      <stop offset="60%" stopColor="#d6249f" />
      <stop offset="90%" stopColor="#285AEB" />
    </radialGradient>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGrad)" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="white" strokeWidth="1.8" fill="none" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FacebookLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
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
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#0081FB">
    <path d="M12 7.002c-2.316 0-4.408 1.12-5.748 2.817C4.912 11.517 4 14 4 15.5c0 2.21 1.79 3.5 3.5 3.5 1.5 0 2.87-.82 4.5-2.76 1.63 1.94 3 2.76 4.5 2.76 1.71 0 3.5-1.29 3.5-3.5 0-1.5-.912-3.983-2.252-5.681C16.408 8.122 14.316 7.002 12 7.002zm-3.5 9.998c-.83 0-1.5-.67-1.5-1.5 0-.96.67-2.6 1.75-3.96 1.01-1.27 2.22-2.04 3.25-2.04.5 0 .93.18 1.25.5-1.42 1.67-3.25 4.35-4.75 7z"/>
  </svg>
);

const GoogleAdsLogo = () => (
  <svg className="w-9 h-9 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M3.5 18.5L10.5 3.5H16.5L9.5 18.5H3.5Z" fill="#FFBC00"/>
    <path d="M20.5 18.5C22.1569 18.5 23.5 17.1569 23.5 15.5C23.5 13.8431 22.1569 12.5 20.5 12.5C18.8431 12.5 17.5 13.8431 17.5 15.5C17.5 17.1569 18.8431 18.5 20.5 18.5Z" fill="#4285F4"/>
    <path d="M12.5 18.5L19.5 3.5H13.5L6.5 18.5H12.5Z" fill="#34A853"/>
  </svg>
);

const RDStationLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#00D2B6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

// Animated Counter Hook for Slide 19 and Indicators
const AnimatedCounter: React.FC<{ target: number; prefix?: string }> = ({ target, prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400; // ms
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{count}</span>;
};

// Animated string value component to animate numbers inside strings like "+160 / mês"
const AnimatedStringValue: React.FC<{ value: string }> = ({ value }) => {
  const parts = value.split(/(\d+)/);
  return (
    <span>
      {parts.map((part, index) => {
        if (/^\d+$/.test(part)) {
          return <AnimatedCounter key={index} target={parseInt(part, 10)} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, direction }) => {

  const slideVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.98
    }),
    animate: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        scale: { duration: 0.35, ease: 'easeOut' },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '30%' : '-30%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: direction >= 0 ? 25 : -25 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-0 bg-[#060d20] presentation-slide">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants as any}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full overflow-hidden flex flex-col justify-between relative"
        >

          {/* ==================== SLIDE 1: CAPA ==================== */}
          {slide.id === 1 && (
            <div className="w-full h-full bg-[#080808] text-white relative overflow-hidden flex flex-col justify-between p-8 md:p-16 pb-20">
              {/* Right Corporate Blue Bar with JULHO header and white squares on the seam border */}
              <div className="absolute right-0 top-0 w-[25%] lg:w-[22%] h-full bg-[#0a1c6a] z-10 shadow-2xl flex flex-col items-center">
                {/* JULHO - 2026 on top of blue column */}
                <div className="mt-10 md:mt-12 text-center z-20 px-2">
                  <span className="text-white text-[11px] md:text-xs font-black tracking-widest uppercase drop-shadow-md">
                    JULHO - 2026
                  </span>
                </div>

                {/* White Squares Stack on the seam border */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
                  <div className="w-14 h-14 bg-white shadow-2xl border border-white/80"></div>
                  <div className="w-9 h-9 bg-white shadow-xl border border-white/80"></div>
                  <div className="w-6 h-6 bg-white shadow-lg border border-white/80"></div>
                </div>
              </div>

              {/* Background Car Overlay - Clear, bright, full cover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785183140/CRUZE_AZUL_hl4hny.png" 
                  alt="Cruze Azul" 
                  className="w-full h-full object-cover object-center scale-100 opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Top Left Header Info - Flush Left Aligned */}
              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="relative z-20 flex flex-col items-start gap-2 max-w-md">
                <motion.span variants={itemVariants} className="text-white text-[11px] font-bold tracking-widest uppercase opacity-90">
                  Relatório Técnico
                </motion.span>
                <motion.div variants={itemVariants} className="w-16 h-3 opacity-90 dot-matrix-blue"></motion.div>
                <motion.img 
                  variants={itemVariants}
                  src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785183130/logo_Azul_spqf9c.svg" 
                  alt="Azul Veículos" 
                  onError={(e) => { 
                    (e.currentTarget as HTMLElement).style.display = 'none'; 
                    const fb = document.getElementById('slide1-logo-fallback');
                    if (fb) fb.style.display = 'flex';
                  }}
                  className="h-16 md:h-20 object-contain filter brightness-0 invert drop-shadow-xl self-start"
                />
                <div id="slide1-logo-fallback" className="hidden items-center gap-2 px-3 py-1 bg-white/10 border border-white/30 rounded-lg backdrop-blur-sm">
                  <span className="text-white font-extrabold text-xl tracking-tighter italic">AZUL</span>
                  <span className="text-cyan-400 text-xs uppercase font-mono tracking-widest font-bold">VEÍCULOS</span>
                </div>
              </motion.div>

              {/* Main Title Area */}
              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="relative z-20 my-auto max-w-3xl">
                <motion.h1 variants={itemVariants} className="title-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] text-white leading-[1.05] tracking-tight">
                  OPERAÇÃO INTEGRADA<br />DE MARKETING
                </motion.h1>
              </motion.div>

              {/* Footer text */}
              <div className="relative z-20 text-white/50 text-[10px] md:text-[11px] uppercase tracking-wider font-medium">
                Documento técnico-operacional - Julho de 2026 - Uso interno e confidencial - Fábrica Publicidade & Digital
              </div>
            </div>
          )}


          {/* ==================== SLIDE 2: INTRODUÇÃO / APRESENTAÇÃO ==================== */}
          {slide.id === 2 && (
            <div className="w-full h-full bg-white text-slate-800 flex flex-col justify-between relative pb-16">
              <div className="flex h-full w-full flex-1">
                {/* Left Content Area - Full Text Paragraphs */}
                <motion.div variants={containerVariants} initial="hidden" animate="animate" className="w-full lg:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center relative bg-white">
                  <motion.div variants={itemVariants} className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
                    02 / Introdução
                  </motion.div>

                  <div className="max-w-2xl">
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                      <span className="brand-bullet"></span>
                      <h1 className="title-display text-3xl md:text-4xl text-[#0a1c6a]">APRESENTAÇÃO</h1>
                    </motion.div>

                    <div className="space-y-4 text-gray-700 text-xs md:text-sm font-medium leading-relaxed">
                      <motion.p variants={itemVariants}>
                        Este relatório apresenta a estrutura operacional de marketing atualmente desenvolvida pela Fábrica Publicidade para a Azul Veículos.
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        Mais do que documentar peças produzidas ou campanhas executadas, este material demonstra a abrangência da operação conduzida pela agência, evidenciando sua atuação estratégica, criativa, tecnológica e operacional.
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        Os volumes de entregas apresentados representam a média operacional da agência, podendo variar conforme o calendário comercial, campanhas promocionais, sazonalidade do mercado e as necessidades estratégicas da Azul Veículos, refletindo uma operação dinâmica, em constante evolução e acompanhando o crescimento contínuo das demandas da empresa.
                      </motion.p>
                      <motion.p variants={itemVariants}>
                        Este documento contempla não apenas os entregáveis produzidos, mas também todas as atividades de planejamento, atendimento, desenvolvimento, suporte e acompanhamento que fazem parte da rotina operacional.
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side: High Impact Azul Veículos Showroom Imagery */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden lg:flex w-5/12 relative bg-[#060d20] overflow-hidden items-center justify-center border-l border-gray-200"
                >
                  <img 
                    src={slide.bgImageUrl || "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1000&auto=format&fit=crop"} 
                    alt="Azul Veículos Showroom" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d20] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent"></div>

                  {/* Floating Brand Badge */}
                  <div className="absolute bottom-10 left-8 right-8 bg-[#0a1c6a]/90 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-300 font-mono">
                        FÁBRICA & AZUL VEÍCULOS
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white">
                      Operação de Marketing de Alta Performance
                    </h3>
                    <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                      Estrutura técnica dedicada, alinhando estratégia, criação e tecnologia.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="slide-footer-bar">02/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 3: NATUREZA DA OPERAÇÃO (STANDALONE SLIDE WITH IMAGES) ==================== */}
          {(slide.id === 3 || slide.layoutType === 'natureza_operacao') && (
            <div className="w-full h-full bg-[#060d20] text-white flex flex-col justify-between relative p-6 md:p-12 pb-20 overflow-hidden">
              {/* Subtle Background Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between relative z-10 mb-2">
                <div className="text-[10px] font-bold tracking-widest uppercase text-cyan-400/80 font-mono">
                  03 / NATUREZA DA OPERAÇÃO
                </div>

                {/* Infinity Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-[#0a1c6a]/80 border border-blue-400/30 px-3.5 py-1.5 rounded-full shadow-lg"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="text-cyan-300"
                  >
                    <InfinityIcon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-[11px] font-bold tracking-wider text-cyan-200 uppercase">
                    Ciclo Contínuo & Escalável
                  </span>
                </motion.div>
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="relative z-10 my-auto w-full space-y-5">
                <div>
                  <motion.h1 variants={itemVariants} className="title-display text-2xl md:text-4xl text-white mb-2 tracking-tight">
                    NATUREZA DA OPERAÇÃO
                  </motion.h1>
                  <motion.p variants={itemVariants} className="text-xs md:text-sm text-blue-200/90 font-sans max-w-3xl leading-relaxed">
                    Estrutura contínua e escalável, dimensionada para acompanhar o crescimento das demandas comerciais e institucionais da Azul Veículos.
                  </motion.p>
                </div>

                {/* 4 Pillar Image Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {slide.pillars?.map((pillar, idx) => {
                    const iconMap: Record<string, any> = {
                      Target: Target,
                      Palette: Palette,
                      Cpu: Cpu,
                      Workflow: Workflow,
                    };
                    const IconComp = iconMap[pillar.iconName] || Target;

                    return (
                      <motion.div
                        key={pillar.id || idx}
                        variants={itemVariants}
                        whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                        className="group relative bg-[#0b1739] border border-blue-900/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between h-[300px] md:h-[330px]"
                      >
                        {/* Background Photo Image */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={pillar.imageUrl}
                            alt={pillar.title}
                            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500 group-hover:scale-105 transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060d20] via-[#060d20]/45 to-transparent"></div>
                        </div>

                        {/* Card Header Content */}
                        <div className="relative z-10 p-5 flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-[#0a1c6a]/90 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg group-hover:bg-cyan-400 group-hover:text-[#0a1c6a] transition-colors duration-300">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                            {pillar.badge}
                          </span>
                        </div>

                        {/* Card Bottom Content */}
                        <div className="relative z-10 p-5 pt-0 mt-auto">
                          <div className="text-[10px] font-bold text-cyan-300/80 uppercase tracking-widest mb-1 font-mono">
                            {pillar.category}
                          </div>
                          <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                            {pillar.title}
                          </h3>
                          <p className="text-[11px] text-gray-300 font-sans leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                            {pillar.description}
                          </p>
                        </div>

                        {/* Subtle Bottom Accent Glow Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="slide-footer-bar">03/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 4: MODELO OPERACIONAL (VISÃO GERAL) ==================== */}
          {(slide.id === 4 || (slide.layoutType === 'connected_flow' && slide.id !== 3)) && (
            <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-between relative p-8 md:p-14 pb-20 overflow-hidden">
              {/* Background Car */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={slide.bgImageUrl} 
                  alt="Modelo Operacional" 
                  className="w-full h-full object-cover opacity-20 object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/90 to-gray-900/80"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between border-b border-blue-900/60 pb-3">
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 font-mono mb-1">
                    04 / Modelo Operacional
                  </div>
                  <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-white uppercase tracking-tight">
                    VISÃO GERAL
                  </motion.h1>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 bg-blue-950/80 border border-cyan-500/40 px-3.5 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-[11px] font-bold text-cyan-300 uppercase font-mono">FLUXO OPERACIONAL 360°</span>
                </div>
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="relative z-10 my-auto w-full space-y-6">
                {/* 5 Pillars Grid with Resumo Executivo Card Styling (Blue cards, Neon Blue numbers, Yellow text) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {slide.stepItems?.map((step, idx) => {
                    const icons = [Compass, Palette, Cpu, TrendingUp, Headphones];
                    const IconComponent = icons[idx] || Compass;

                    return (
                      <motion.div 
                        key={idx} 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="bg-[#0a1c6a] p-5 border border-blue-500/30 shadow-xl rounded-xl flex flex-col justify-between transform transition duration-300 hover:shadow-cyan-500/20 hover:border-cyan-400/60 hover:-translate-y-1 group relative overflow-hidden"
                      >
                        <div>
                          {/* Animated Pillar Icon Container */}
                          <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mb-3 group-hover:bg-cyan-400 group-hover:text-[#0a1c6a] transition-colors duration-300 shadow-md">
                            <motion.div 
                              animate={{ scale: [1, 1.1, 1] }} 
                              transition={{ repeat: Infinity, duration: 3, delay: idx * 0.4 }}
                            >
                              <IconComponent className="w-5 h-5" />
                            </motion.div>
                          </div>

                          {/* Bold Neon Blue Number */}
                          <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-1 font-mono tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] group-hover:scale-105 transition-transform">
                            {step.number}
                          </div>

                          {/* Yellow Card Title */}
                          <h3 className="font-bold text-amber-400 uppercase text-xs md:text-sm mb-2 tracking-wide font-sans">
                            {step.title}
                          </h3>

                          {/* Yellow Card Text */}
                          <p className="text-[11px] md:text-xs font-semibold text-amber-300/90 leading-relaxed font-sans">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Subtitle Banner Below */}
                <motion.div variants={itemVariants} className="pt-1">
                  <p className="text-amber-300 text-xs md:text-sm font-semibold tracking-wide bg-[#0a1c6a]/90 border border-blue-500/40 p-4 rounded-xl text-center max-w-3xl mx-auto shadow-lg backdrop-blur-md">
                    O modelo conecta cinco frentes complementares em um fluxo contínuo — da estratégia à execução e ao suporte permanente.
                  </p>
                </motion.div>
              </motion.div>

              <div className="slide-footer-bar bg-slate-950 text-slate-400">04/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 5: ORGANOGRAMA / ESTRUTURA DA OPERAÇÃO (NEON TREE ORGANOGRAM) ==================== */}
          {(slide.id === 5 || slide.layoutType === 'organogram') && (
            <div className="w-full h-full bg-[#060d20] text-white flex flex-col justify-between relative p-4 md:px-8 md:py-6 pb-12 overflow-hidden select-none">
              {/* Background ambient glowing lights */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none"></div>
              <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none"></div>

              {/* Top Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-blue-900/50 pb-2 mb-1">
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 font-mono mb-0.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]"></span>
                    05 / Estrutura da Operação
                  </div>
                  <motion.h1 variants={itemVariants} className="title-display text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight">
                    ESTRUTURA DA OPERAÇÃO
                  </motion.h1>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-[#0a1c6a]/80 border border-cyan-500/40 px-3 py-1 rounded-full shadow-lg">
                  <Activity className="w-3 h-3 text-cyan-300 animate-pulse" />
                  <span className="text-[10px] font-bold text-cyan-200 uppercase font-mono">
                    Matriz Dedicada & Integrada 360°
                  </span>
                </div>
              </div>

              {/* Organogram Tree Container */}
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="animate" 
                className="my-auto w-full max-w-6xl mx-auto flex flex-col items-center relative z-10 py-1"
              >
                {/* Central Top Root Badge */}
                <motion.div variants={itemVariants} className="relative group z-20">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-amber-500 rounded-xl blur opacity-50 group-hover:opacity-90 transition duration-500"></div>
                  <div className="relative bg-[#0c1838] border border-cyan-400/60 px-6 py-2 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Coordenação Central</div>
                      <div className="text-xs md:text-sm font-extrabold text-white uppercase tracking-wide">FÁBRICA PUBLICIDADE & DIGITAL</div>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Stem Line from Root */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_8px_#06b6d4] z-10"></div>

                {/* Horizontal Connector Bar across 6 columns */}
                <div className="w-[88%] h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] relative z-10"></div>

                {/* 6 Columns Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3 w-full mt-0 pt-0 relative z-10">
                  {slide.organogram?.map((dept, idx) => {
                    const iconMap: Record<string, any> = {
                      Briefcase: Briefcase,
                      Calendar: Calendar,
                      PenTool: PenTool,
                      Cpu: Cpu,
                      MessageSquare: MessageSquare,
                      Wrench: Wrench
                    };
                    const IconComp = iconMap[dept.icon] || Briefcase;

                    return (
                      <motion.div key={idx} variants={itemVariants} className="flex flex-col items-center relative pt-3 group">
                        {/* Vertical Stem Line down to column header */}
                        <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-500 to-cyan-400 -translate-x-1/2 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Column Header Card */}
                        <div className="bg-[#0c183b]/90 border border-blue-700/50 group-hover:border-cyan-400/80 w-full text-center py-2 px-2 font-bold text-white text-[10px] md:text-[11px] uppercase rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.4)] mb-2 min-h-[48px] flex flex-col items-center justify-center gap-0.5 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
                          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="flex items-center gap-1 text-cyan-300">
                            <IconComp className="w-3 h-3" />
                            <span className="font-mono text-[8px] text-cyan-400/80 font-bold">0{idx + 1}</span>
                          </div>
                          <span className="leading-tight text-slate-100 group-hover:text-cyan-200 transition-colors">
                            {dept.title}
                          </span>
                        </div>

                        {/* List of sub-items */}
                        <div className="w-full bg-[#081229]/60 border border-blue-900/30 group-hover:border-cyan-500/30 rounded-xl p-2 transition-colors">
                          <ul className="text-left w-full text-[9px] md:text-[10px] text-slate-300 space-y-1.5 font-medium">
                            {dept.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0 shadow-[0_0_6px_#06b6d4]"></span>
                                <span className="leading-tight text-slate-200">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="slide-footer-bar bg-slate-950 text-slate-400 relative z-10">05/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 6: PLANEJAMENTO ESTRATÉGICO ==================== */}
          {(slide.id === 6 || (slide.category === 'estrategia' && slide.layoutType === 'dual_matrix')) && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                06 / Estratégia
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                    PLANEJAMENTO ESTRATÉGICO
                  </motion.h1>
                  <motion.span variants={itemVariants} className="text-xs font-bold text-[#0a1c6a] bg-[#eef4f9] px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
                    DIRETRIZES E METODOLOGIA
                  </motion.span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                  {/* Left Column Table */}
                  <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-[#0a1c6a] text-white p-4 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                        <span>Diretrizes de Planejamento</span>
                        <span className="text-cyan-300 text-[10px] font-mono">01 - 05</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {slide.tableData?.map((row, idx) => (
                          <div 
                            key={idx} 
                            className="p-3.5 hover:bg-blue-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <span className="font-bold text-xs md:text-sm text-[#0a1c6a] shrink-0 sm:w-5/12">{row.item}</span>
                            <span className="text-xs text-gray-600 font-sans leading-snug sm:w-7/12">{row.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column Table */}
                  <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-[#0a1c6a] text-white p-4 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                        <span>Gestão & Alinhamento</span>
                        <span className="text-cyan-300 text-[10px] font-mono">06 - 10</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {slide.tableData2?.map((row, idx) => (
                          <div 
                            key={idx} 
                            className="p-3.5 hover:bg-blue-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <span className="font-bold text-xs md:text-sm text-[#0a1c6a] shrink-0 sm:w-5/12">{row.item}</span>
                            <span className="text-xs text-gray-600 font-sans leading-snug sm:w-7/12">{row.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="slide-footer-bar">06/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 7: ROTINA OPERACIONAL (PROCESS STEPS) ==================== */}
          {slide.id === 7 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                07 / Rotina Operacional
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase mb-8">
                  ATENDIMENTO E GESTÃO
                </motion.h1>

                {/* 4 Journey Steps equal width and height */}
                <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-4">
                  {slide.stepItems?.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <motion.div variants={itemVariants} className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex-1 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        <div className="w-12 h-12 bg-[#0a1c6a] rounded-full text-white font-bold flex items-center justify-center text-xl mb-4 shadow-sm shrink-0">
                          {step.number}
                        </div>
                        <h3 className="font-bold text-[#0a1c6a] text-base mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>

                      {idx < (slide.stepItems?.length || 0) - 1 && (
                        <div className="hidden md:flex items-center justify-center px-1 shrink-0">
                          <ChevronRight className="w-8 h-8 text-[#cdd7e5]" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>

              <div className="slide-footer-bar">07/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 8: INTERFACE COM ==================== */}
          {slide.id === 8 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                08 / Interface e Fluxo
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-6">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                  INTERFACE COM
                </motion.h1>

                {/* 3 Corporate Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {slide.stakeholders?.map((sh, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="bg-[#0a1c6a] text-white p-6 rounded-sm shadow-md">
                      <h3 className="font-bold text-base md:text-lg mb-2">{sh.title}</h3>
                      <p className="text-xs text-white/80 leading-relaxed font-sans">{sh.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Fluxo Table */}
                <motion.div variants={itemVariants} className="bg-white shadow-sm border border-gray-200 w-full rounded-sm overflow-hidden mt-4">
                  <div className="grid grid-cols-12 bg-[#0a1c6a] text-white p-3.5 font-bold text-[11px] uppercase tracking-wider">
                    <div className="col-span-4 pl-2">Fluxo</div>
                    <div className="col-span-8">Critério</div>
                  </div>
                  {slide.tableData?.map((row, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-12 p-3.5 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                    >
                      <div className="col-span-4 font-bold text-xs md:text-sm text-[#111111] pl-2">{row.item}</div>
                      <div className="col-span-8 text-xs md:text-sm text-gray-600 font-sans">{row.description}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="slide-footer-bar">08/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 10: DESIGN ESTRATÉGICO (KEY VISUAL) ==================== */}
          {(slide.id === 10 || slide.layoutType === 'design_keyvisual') && (
            <div className="w-full h-full bg-white text-slate-900 flex flex-col justify-between relative pb-16">
              <div className="flex h-full w-full flex-1">
                {/* Left Column (7/12) */}
                <motion.div variants={containerVariants} initial="hidden" animate="animate" className="w-full lg:w-7/12 p-8 md:p-14 flex flex-col justify-center">
                  <motion.div variants={itemVariants} className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">
                    10 / Criação
                  </motion.div>

                  <motion.h1 variants={itemVariants} className="title-display text-2xl md:text-3xl text-[#111111] mb-6 flex items-center gap-3">
                    <span className="brand-bullet"></span>
                    DESIGN ESTRATÉGICO
                  </motion.h1>

                  <div className="space-y-3.5">
                    {slide.stepItems?.map((item, idx) => (
                      <motion.div key={idx} variants={itemVariants} className="flex items-start gap-3.5 group cursor-pointer">
                        <div className="w-9 h-9 rounded-full bg-[#eef4f9] text-[#0a1c6a] flex items-center justify-center shrink-0 group-hover:bg-[#0a1c6a] group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-sm">
                          {idx === 0 && <Lightbulb className="w-4 h-4" />}
                          {idx === 1 && <Palette className="w-4 h-4" />}
                          {idx === 2 && <ImageIcon className="w-4 h-4" />}
                          {idx === 3 && <Stamp className="w-4 h-4" />}
                          {idx === 4 && <Layers className="w-4 h-4" />}
                          {idx === 5 && <Type className="w-4 h-4" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#111111] text-xs md:text-sm mb-0.5">{item.title}</h3>
                          <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed font-sans">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column (5/12) Mockup */}
                <div className="hidden lg:flex w-5/12 bg-gray-50 p-10 items-center justify-center border-l border-gray-100">
                  <div className="w-full max-w-sm bg-white shadow-xl p-5 rounded-sm border border-gray-100">
                    <div className="text-[10px] font-bold text-[#0a1c6a] mb-3 uppercase tracking-wider">
                      Exemplo de Estrutura — Key Visual
                    </div>
                    <div className="w-full h-48 bg-[#0a1c6a] relative mb-4 rounded-sm overflow-hidden flex flex-col justify-end p-4 shadow-inner">
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-400/80 blur-sm"></div>
                      <div className="w-3/4 h-4 bg-white rounded-xs mb-2"></div>
                      <div className="w-1/2 h-2.5 bg-white/40 rounded-xs"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="h-8 bg-[#060d20] rounded-xs" title="#060d20"></div>
                      <div className="h-8 bg-[#0a1c6a] rounded-xs" title="#0a1c6a"></div>
                      <div className="h-8 bg-[#3b82f6] rounded-xs" title="#3b82f6"></div>
                      <div className="h-8 bg-gray-400 rounded-xs" title="Neutral"></div>
                    </div>
                    <div className="text-[10px] text-gray-400 text-center font-medium font-sans">
                      Paleta e composição padronizadas por campanha
                    </div>
                  </div>
                </div>
              </div>

              <div className="slide-footer-bar">10/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 13: MARKETING DIGITAL ==================== */}
          {slide.id === 13 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                13 / Marketing Digital
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-5">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                  MARKETING DIGITAL
                </motion.h1>

                {/* Grid of Digital Channels with Official Logos */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <InstagramLogo />
                      <span className="text-[10px] font-bold bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full uppercase">Rede Social</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Instagram</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Feed, Stories, Reels e direcionamento de direct para WhatsApp das lojas.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <FacebookLogo />
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">Rede Social</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Facebook</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Publicação integrada de ofertas, eventos de loja e fortalecimento institucional.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <LinkedInLogo />
                      <span className="text-[10px] font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded-full uppercase">Corporativo</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">LinkedIn</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Comunicação B2B, posicionamento de marca empregadora e novidades da rede.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <RDStationLogo />
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Inbound</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">RD Station</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Automação de e-mail marketing, nutrição de leads e gestão de bases qualificadas.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <Globe className="w-8 h-8 text-[#0a1c6a]" />
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full uppercase">Landing Pages</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Landing Pages</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Páginas de conversão para feirões, ofertas exclusivas e captação de contatos.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <Mail className="w-8 h-8 text-amber-500" />
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full uppercase">E-mail Marketing</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">E-mail Marketing</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Disparos periódicos de oportunidades de estoque e ofertas promocionais.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <GoogleLogo />
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full uppercase">SEO / Meu Negócio</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Google Meu Negócio</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Otimização de fichas locais das lojas Azul Veículos para buscas regionais.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <MetaLogo />
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full uppercase">Meta Ads</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Meta Ads Social</h3>
                    <p className="text-xs text-gray-600 font-sans leading-snug">Segmentação hiperlocalizada por loja e raio de atendimento dos consultores.</p>
                  </div>
                </motion.div>
              </motion.div>

              <div className="slide-footer-bar">13/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 14: GESTÃO DE TRÁFEGO ==================== */}
          {slide.id === 14 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                14 / Performance
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-5">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                  GESTÃO DE TRÁFEGO
                </motion.h1>

                {/* Google Ads / Meta Ads Banners with Official Vector Icons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 bg-[#15284b] rounded-lg p-5 flex items-center gap-4 text-white shadow-md border border-blue-900/50">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <GoogleAdsLogo />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
                        Google Ads
                        <span className="text-[9px] bg-amber-400 text-black px-2 py-0.5 rounded-sm font-bold uppercase">Oficial</span>
                      </h3>
                      <p className="text-xs text-blue-200 mt-0.5">Rede de Pesquisa, Performance Max, Display & YouTube</p>
                    </div>
                  </div>

                  <div className="flex-1 bg-[#15284b] rounded-lg p-5 flex items-center gap-4 text-white shadow-md border border-blue-900/50">
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MetaLogo />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-wide flex items-center gap-2">
                        Meta Ads
                        <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-sm font-bold uppercase">Oficial</span>
                      </h3>
                      <p className="text-xs text-blue-200 mt-0.5">Campanhas de Conversão, Tráfego & Leads (Instagram e Facebook)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Technical Table */}
                <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-[#15284b] text-white p-3.5 font-bold text-[11px] uppercase tracking-wider">
                    <div className="col-span-4 pl-3">Item de Gestão</div>
                    <div className="col-span-8">Descrição Técnica Operacional</div>
                  </div>
                  {slide.tableData?.map((row, idx) => (
                    <div 
                      key={idx} 
                      className={`grid grid-cols-12 p-3.5 border-b border-gray-100 items-center hover:bg-blue-50/30 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                    >
                      <div className="col-span-4 font-bold text-xs md:text-sm text-[#111111] pl-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0a1c6a]"></span>
                        {row.item}
                      </div>
                      <div className="col-span-8 text-xs md:text-sm text-gray-600 font-sans leading-relaxed">{row.description}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <div className="slide-footer-bar">14/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 15: TECNOLOGIA ==================== */}
          {slide.id === 15 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                15 / Tecnologia
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-5">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                  TECNOLOGIA
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
                  {/* Realistic Website Simulation Mockup */}
                  <motion.div variants={itemVariants} className="w-full lg:w-6/12 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 flex flex-col">
                    {/* Browser Address Bar */}
                    <div className="bg-[#0b1b3d] h-9 w-full flex items-center px-3 gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                      <div className="mx-auto bg-[#060f24] rounded px-3 py-0.5 w-3/5 flex items-center justify-center text-gray-300 text-[10px] font-mono gap-1.5 border border-white/10">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>azulveiculos.com.br</span>
                      </div>
                    </div>

                    {/* Website Canvas Area */}
                    <div className="flex-1 bg-slate-100 flex flex-col justify-between overflow-hidden text-[11px]">
                      {/* Header / Navbar */}
                      <div className="bg-[#0d3b85] text-white px-4 py-2 flex items-center justify-between shadow-md">
                        <img 
                          src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785183130/logo_Azul_spqf9c.svg" 
                          alt="Azul Veículos" 
                          className="h-6 object-contain filter brightness-0 invert"
                        />
                        <div className="hidden sm:flex items-center gap-3 text-[9px] font-bold tracking-wider uppercase opacity-90">
                          <span className="text-amber-300">HOME</span>
                          <span>ESTOQUE</span>
                          <span>VENDA SEU CARRO</span>
                          <span>BLOG</span>
                          <span>CONTATO</span>
                        </div>
                        <Search className="w-3.5 h-3.5 text-white/80" />
                      </div>

                      {/* Hero Banner Section */}
                      <div className="bg-gradient-to-r from-[#0d3b85] via-[#1048a3] to-[#0d3b85] text-white p-4 relative overflow-hidden">
                        <div className="absolute right-2 -bottom-2 opacity-20">
                          <span className="text-6xl font-black italic">AZUL</span>
                        </div>
                        <div className="inline-block bg-amber-400 text-black text-[8px] font-extrabold px-2 py-0.5 rounded uppercase mb-1">
                          BALÃO PREMIADO!
                        </div>
                        <h4 className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-tight">
                          MÊS DE ANIVERSÁRIO AZUL VEÍCULOS
                        </h4>
                        <p className="text-[9px] text-blue-100 mt-1 font-sans leading-tight">
                          PAGAMOS ATÉ 100% TABELA FIPE | TROCA COM TROCO | TAXAS A PARTIR DE 1.19% A.M.
                        </p>
                      </div>

                      {/* Vehicle Search Box */}
                      <div className="p-3 bg-white border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <button className="bg-[#0d3b85] text-white text-[9px] font-bold px-2.5 py-1 rounded">Compre seu carro</button>
                          <button className="bg-gray-100 text-gray-700 text-[9px] font-bold px-2.5 py-1 rounded">Venda seu carro</button>
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            readOnly 
                            value="Digite a marca ou modelo do veículo..." 
                            className="bg-gray-50 border border-gray-200 rounded text-[9px] px-2.5 py-1 w-full text-gray-400 font-sans" 
                          />
                          <button className="bg-amber-400 text-black font-bold text-[9px] px-3 py-1 rounded shrink-0">Buscar</button>
                        </div>
                      </div>

                      {/* Mini Inventory Grid */}
                      <div className="p-3 bg-slate-50 flex-1">
                        <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Carros em Destaque</span>
                          <span className="text-[9px] text-blue-700 underline cursor-pointer">Ver todos (120+)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white border border-gray-200 rounded p-2 shadow-xs">
                            <div className="w-full h-12 bg-slate-200 rounded mb-1 flex items-center justify-center text-slate-400 font-bold text-[9px]">
                              AUDI A1 1.4 TFSI
                            </div>
                            <div className="font-bold text-slate-900 text-[10px]">R$ 74.900</div>
                            <button className="w-full mt-1 bg-[#0d3b85] text-white text-[8px] font-bold py-0.5 rounded">VER PARCELAS</button>
                          </div>
                          <div className="bg-white border border-gray-200 rounded p-2 shadow-xs">
                            <div className="w-full h-12 bg-slate-200 rounded mb-1 flex items-center justify-center text-slate-400 font-bold text-[9px]">
                              CHEVROLET CRUZE
                            </div>
                            <div className="font-bold text-slate-900 text-[10px]">R$ 124.900</div>
                            <button className="w-full mt-1 bg-[#0d3b85] text-white text-[8px] font-bold py-0.5 rounded">VER PARCELAS</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 border-t border-gray-200 text-[10px] text-slate-600 bg-gray-50 font-sans flex items-center justify-between">
                      <span>Website Oficial — azulveiculos.com.br</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Online & Sincronizado
                      </span>
                    </div>
                  </motion.div>

                  {/* Right Column Technical Table */}
                  <motion.div variants={itemVariants} className="w-full lg:w-6/12 bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden flex flex-col justify-between">
                    <div className="grid grid-cols-12 bg-[#15284b] text-white p-3.5 font-bold text-[11px] uppercase tracking-wider">
                      <div className="col-span-4 pl-3">Frente de Atuação</div>
                      <div className="col-span-8">Descrição Técnica</div>
                    </div>
                    <div className="divide-y divide-gray-100 flex-1">
                      {slide.tableData?.map((row, idx) => (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-12 p-3.5 items-center hover:bg-blue-50/30 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                        >
                          <div className="col-span-4 font-bold text-xs text-[#111111] pl-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0a1c6a]"></span>
                            {row.item}
                          </div>
                          <div className="col-span-8 text-xs text-gray-600 font-sans leading-relaxed">{row.description}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="slide-footer-bar">15/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== OTHER SLIDES (STANDARD & INDICATORS TABLES) ==================== */}
          {slide.layoutType === 'indicators_table' && slide.id !== 5 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-6 md:p-10 pb-16">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                {slide.categoryLabel}
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-4">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-2xl md:text-3xl text-[#111111] uppercase">
                  {slide.title}
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-start">
                  {/* Table Column 1: Produção Redes Sociais */}
                  {slide.tableData && slide.tableData.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                      <div className="bg-[#182d5a] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-blue-900">
                        <span>{slide.tableHeader1 || "PRODUÇÃO PARA REDES SOCIAIS"}</span>
                        <span className="text-[9px] text-amber-300 font-mono uppercase">ENTREGAS</span>
                      </div>
                      
                      <div className="grid grid-cols-12 bg-slate-100 text-slate-700 p-2 font-bold text-[10px] uppercase tracking-wider border-b border-gray-200">
                        <div className="col-span-8 pl-2">Entregável / Item</div>
                        <div className="col-span-4 text-right pr-2">Média</div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {slide.tableData.map((row, idx) => (
                          <div 
                            key={idx} 
                            className={`grid grid-cols-12 p-2 items-center hover:bg-blue-50/40 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                          >
                            <div className="col-span-8 font-bold text-xs text-slate-900 pl-2 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#182d5a] shrink-0"></span>
                              <span className="truncate">{row.item}</span>
                            </div>
                            <div className="col-span-4 text-right pr-2 font-extrabold text-xs text-[#0a1c6a] font-sans">
                              <AnimatedStringValue value={row.description} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Table Column 2: Produção Criativa */}
                  {slide.tableData2 && slide.tableData2.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                      <div className="bg-[#182d5a] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-blue-900">
                        <span>{slide.tableHeader2 || "PRODUÇÃO CRIATIVA"}</span>
                        <span className="text-[9px] text-amber-300 font-mono uppercase">ENTREGAS</span>
                      </div>
                      
                      <div className="grid grid-cols-12 bg-slate-100 text-slate-700 p-2 font-bold text-[10px] uppercase tracking-wider border-b border-gray-200">
                        <div className="col-span-8 pl-2">Entregável / Item</div>
                        <div className="col-span-4 text-right pr-2">Média</div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {slide.tableData2.map((row, idx) => (
                          <div 
                            key={idx} 
                            className={`grid grid-cols-12 p-2 items-center hover:bg-blue-50/40 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                          >
                            <div className="col-span-8 font-bold text-xs text-slate-900 pl-2 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#182d5a] shrink-0"></span>
                              <span className="truncate">{row.item}</span>
                            </div>
                            <div className="col-span-4 text-right pr-2 font-extrabold text-xs text-[#0a1c6a] font-sans">
                              <AnimatedStringValue value={row.description} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Table Column 3: Audiovisual, Tráfego & Tech */}
                  {slide.tableData3 && slide.tableData3.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                      <div className="bg-[#182d5a] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b border-blue-900">
                        <span>{slide.tableHeader3 || "AUDIOVISUAL, TRÁFEGO & TECH"}</span>
                        <span className="text-[9px] text-amber-300 font-mono uppercase">SUPORTE</span>
                      </div>
                      
                      <div className="grid grid-cols-12 bg-slate-100 text-slate-700 p-2 font-bold text-[10px] uppercase tracking-wider border-b border-gray-200">
                        <div className="col-span-8 pl-2">Entregável / Item</div>
                        <div className="col-span-4 text-right pr-2">Média</div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {slide.tableData3.map((row, idx) => (
                          <div 
                            key={idx} 
                            className={`grid grid-cols-12 p-2 items-center hover:bg-blue-50/40 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                          >
                            <div className="col-span-8 font-bold text-xs text-slate-900 pl-2 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#182d5a] shrink-0"></span>
                              <span className="truncate">{row.item}</span>
                            </div>
                            <div className="col-span-4 text-right pr-2 font-extrabold text-xs text-[#0a1c6a] font-sans">
                              <AnimatedStringValue value={row.description} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <div className="slide-footer-bar">
                {slide.slideNumber} - Fábrica Publicidade
              </div>
            </div>
          )}

          {/* ==================== SLIDE 16: COMUNICAÇÃO OFFLINE ==================== */}
          {(slide.id === 16 || slide.title === "COMUNICAÇÃO OFFLINE") && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-6 md:p-10 pb-16">
              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-4">
                {/* Top Banner with Offline Media Image */}
                <motion.div 
                  variants={itemVariants}
                  className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-800 text-white min-h-[110px] md:min-h-[135px] flex items-center p-5 md:p-7"
                >
                  {/* Background Image: Showroom & offline media signage */}
                  <img 
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop"
                    alt="Comunicação Offline e PDV"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Dark Gradient Overlay for high text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/50" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        {slide.categoryLabel || "16 / PRODUÇÃO FÍSICA & PDV"}
                      </div>
                      <h1 className="font-display font-black italic text-2xl md:text-3xl text-white uppercase tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
                        {slide.subtitle || "SINALIZAÇÃO, FACHADAS E MATERIAL IMPRESSO DE PDV"}
                      </p>
                    </div>

                    {/* Offline Media Category Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-bold text-white shadow-sm">
                        Material Impresso
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-bold text-white shadow-sm">
                        Sinalização de PDV
                      </span>
                      <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-md border border-amber-400/40 rounded-full text-[11px] font-bold text-amber-300 shadow-sm">
                        Mídia Exterior
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Tables Side by Side (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {/* Left Table */}
                  <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden h-fit">
                    <div className="grid grid-cols-12 bg-[#0a1c6a] text-white p-3 font-bold text-[11px] uppercase tracking-wider">
                      <div className="col-span-5 pl-2">Item</div>
                      <div className="col-span-7">Descrição Técnica</div>
                    </div>
                    {slide.tableData?.map((row, idx) => (
                      <div 
                        key={idx} 
                        className={`grid grid-cols-12 p-2.5 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                      >
                        <div className="col-span-5 font-bold text-xs text-[#111111] pl-2">{row.item}</div>
                        <div className="col-span-7 text-xs font-sans text-gray-600">
                          {row.description}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Right Table */}
                  {slide.tableData2 && slide.tableData2.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden h-fit">
                      <div className="grid grid-cols-12 bg-[#0a1c6a] text-white p-3 font-bold text-[11px] uppercase tracking-wider">
                        <div className="col-span-5 pl-2">Item</div>
                        <div className="col-span-7">Descrição Técnica</div>
                      </div>
                      {slide.tableData2.map((row, idx) => (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-12 p-2.5 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                        >
                          <div className="col-span-5 font-bold text-xs text-[#111111] pl-2">{row.item}</div>
                          <div className="col-span-7 text-xs font-sans text-gray-600">
                            {row.description}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <div className="slide-footer-bar">
                {slide.slideNumber} - Fábrica Publicidade
              </div>
            </div>
          )}

          {/* ==================== OTHER DUAL MATRIX SLIDES ==================== */}
          {slide.layoutType === 'dual_matrix' && slide.id !== 5 && slide.id !== 6 && slide.id !== 13 && slide.id !== 16 && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-6 md:p-12 pb-16">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                {slide.categoryLabel}
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full space-y-6">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-[#111111] uppercase">
                  {slide.title}
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {/* Left Column Table */}
                  <motion.div variants={itemVariants} className="flex-1 bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden h-fit">
                    <div className="grid grid-cols-12 bg-[#0a1c6a] text-white p-3.5 font-bold text-[11px] uppercase tracking-wider">
                      <div className="col-span-4 pl-2">Item</div>
                      <div className="col-span-8">Descrição Técnica</div>
                    </div>
                    {slide.tableData?.map((row, idx) => (
                      <div 
                        key={idx} 
                        className={`grid grid-cols-12 p-3 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                      >
                        <div className="col-span-4 font-bold text-xs md:text-sm text-[#111111] pl-2 flex items-center justify-between pr-2">
                          <span>{row.item}</span>
                        </div>
                        <div className="col-span-8 text-xs md:text-sm font-sans text-gray-600">
                          {row.description}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Right Column Table (if exists) */}
                  {slide.tableData2 && slide.tableData2.length > 0 && (
                    <motion.div variants={itemVariants} className="flex-1 bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden h-fit">
                      <div className="grid grid-cols-12 bg-[#0a1c6a] text-white p-3.5 font-bold text-[11px] uppercase tracking-wider">
                        <div className="col-span-4 pl-2">Item</div>
                        <div className="col-span-8">Descrição Técnica</div>
                      </div>
                      {slide.tableData2.map((row, idx) => (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-12 p-3 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors ${idx % 2 === 1 ? 'bg-[#fafafa]' : 'bg-white'}`}
                        >
                          <div className="col-span-4 font-bold text-xs md:text-sm text-[#111111] pl-2">{row.item}</div>
                          <div className="col-span-8 text-xs md:text-sm font-sans text-gray-600">
                            {row.description}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <div className="slide-footer-bar">
                {slide.slideNumber} - Fábrica Publicidade
              </div>
            </div>
          )}


          {/* ==================== SLIDE 19: RESUMO EXECUTIVO (METRICS) ==================== */}
          {slide.id === 19 && (
            <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 font-mono">
                19 / Síntese
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full">
                <div className="flex items-center justify-between mb-8 border-b border-blue-900/60 pb-4">
                  <div>
                    <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-white uppercase tracking-tight">
                      RESUMO EXECUTIVO
                    </motion.h1>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-1">
                      INDICADORES MENSAIS DA CONTA
                    </p>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-2 bg-blue-950/80 border border-cyan-500/40 px-3.5 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-cyan-300 uppercase font-mono">MÉDIAS CONSOLIDADAS</span>
                  </div>
                </div>

                {/* 8 Counter Metric Tiles - Blue cards, Neon Blue numbers, Yellow text */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {slide.metrics?.map((metric, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants}
                      className="bg-[#0a1c6a] p-5 md:p-6 border border-blue-500/30 shadow-xl rounded-xl text-center flex flex-col justify-between transform transition duration-300 hover:shadow-cyan-500/20 hover:border-cyan-400/60 hover:-translate-y-1 group"
                    >
                      {metric.category && (
                        <div className="text-[9px] font-extrabold text-amber-400/90 uppercase tracking-widest mb-1">
                          {metric.category}
                        </div>
                      )}
                      <div className="text-3xl md:text-4xl lg:text-5xl font-black text-cyan-400 my-2 font-mono tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] group-hover:scale-105 transition-transform">
                        {metric.numericValue ? (
                          <AnimatedCounter 
                            target={metric.numericValue} 
                            prefix={metric.value.startsWith('+') ? '+' : ''} 
                          />
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-xs md:text-sm font-bold text-amber-300 uppercase tracking-wider font-sans leading-tight mt-1">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.p variants={itemVariants} className="mt-8 text-[10px] md:text-[11px] text-slate-400 uppercase tracking-wider font-semibold text-center w-full font-sans">
                  Os indicadores refletem a média operacional mensal e não contemplam a totalidade das atividades de planejamento e suporte.
                </motion.p>
              </motion.div>

              <div className="slide-footer-bar bg-slate-950 text-slate-400">19/20 - Fábrica Publicidade</div>
            </div>
          )}


          {/* ==================== SLIDE 20: CONCLUSÃO ==================== */}
          {slide.id === 20 && (
            <div className="w-full h-full bg-[#0c1a35] text-white flex flex-col justify-between relative p-8 md:p-16 pb-20 overflow-hidden">
              {/* Decorative Animated Pulsating Target Circles (Círculos de Alvo Animados Pulsantes) */}
              <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] pointer-events-none flex items-center justify-center">
                {/* Outer Ring 1 */}
                <motion.div 
                  animate={{ scale: [1, 1.06, 1], opacity: [0.08, 0.22, 0.08] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                />
                {/* Ring 2 */}
                <motion.div 
                  animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.32, 0.12] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
                  className="absolute w-[520px] h-[520px] rounded-full border-2 border-amber-400/30"
                />
                {/* Ring 3 */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.45, 0.18] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.2 }}
                  className="absolute w-[360px] h-[360px] rounded-full border-2 border-blue-400/40"
                />
                {/* Inner Ring 4 */}
                <motion.div 
                  animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.6, 0.25] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.8 }}
                  className="absolute w-[200px] h-[200px] rounded-full border-2 border-white/50"
                />
                {/* Target Center Dot with Pulse Wave */}
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="absolute w-12 h-12 rounded-full bg-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg"></div>
                </motion.div>
              </div>

              <div className="relative z-10 text-[10px] font-bold tracking-widest uppercase text-white/40 flex items-center gap-2">
                <span>20 / CONCLUSÃO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="relative z-10 my-auto max-w-4xl space-y-6">
                <motion.h1 variants={itemVariants} className="font-display font-black italic text-3xl md:text-4xl text-white uppercase tracking-tight flex items-center gap-3">
                  CONCLUSÃO OPERACIONAL
                </motion.h1>

                <div className="space-y-4">
                  {Array.isArray(slide.descriptionText) && slide.descriptionText.map((p, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants} 
                      className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10 hover:border-amber-400/40 transition-all flex items-start gap-4 group"
                    >
                      {/* Pulsating Target Circle Icon */}
                      <div className="relative shrink-0 mt-0.5">
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: idx * 0.4 }}
                          className="absolute -inset-1 rounded-full bg-amber-400/30 blur-xs"
                        />
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs relative z-10 shadow-md">
                          <Target className="w-3.5 h-3.5 text-black" />
                        </div>
                      </div>

                      <p className="text-white/95 text-sm md:text-base leading-relaxed font-light tracking-wide font-sans">
                        {p}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="slide-footer-bar bg-black/90">20/20 - Fábrica Publicidade</div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};
