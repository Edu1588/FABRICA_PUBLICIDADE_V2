import React, { useState, useEffect, useMemo, useRef } from 'react';
import ThreeCanvas from '../components/V2/ThreeCanvas';
import ControlSlider from '../components/V2/ControlSlider';
import PixelArtCanvas from '../components/V2/PixelArtCanvas';
import PaperBurnCard from '../components/V2/PaperBurnCard';
import BlurText from '../components/V2/BlurText';
import SplashCursor from '../components/V2/SplashCursor';
import { EmBreveGate } from '../components/EmBreveGate';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import SplitType from 'split-type';

const NAV = ["Jornada", "Forjamos", "Clientes", "Contato", "Projeto"];

const WRITING = [
  {
    type: 'vortex' as const,
    tag: "OPINIÃO",
    title: "NÃO PRODUZIMOS CLICHÊS",
    meta: "Estratégia & Branding",
    description: "Criamos posicionamentos estratégicos e identidades de alto impacto que transformam marcas brutas em ferramentas afiadas de conversão e diferenciação no mercado.",
  },
  {
    type: 'structure' as const,
    tag: "INOVAÇÃO",
    title: "TECNOLOGIA E DADOS",
    meta: "Engenharia Digital",
    description: "Desenvolvemos aplicações escaláveis, inteligência artificial aplicada e ecossistemas digitais focados na máxima retenção e retorno sobre investimento.",
  },
];

const CONTENT: [string, string, string][] = [
  ["01 — 05", "Branding — essência e pilares da identidade visual", "Posicionamento"],
  ["02 — 05", "Comunicação — discurso e canais consistentes", "Relacionamento"],
  ["03 — 05", "Design — tipografia e diagramação obsessivas", "Criação"],
  ["04 — 05", "Digital — presença criativa com engajamento e métrica", "Performance"],
  ["05 — 05", "Tech House — aplicações escaláveis, IA e gamificação", "Tecnologia"],
  ["Faixa", "Design assinado, estruturas robustas, código resistente", "Fábrica"],
];

const TEAM = [
  {
    name: "LUCAS CORRÊA",
    role: "SÓCIO FUNDADOR",
    img: "https://res.cloudinary.com/ifuatk2z/image/upload/v1786045987/Lucas.png",
    quote: "Temos cenários diferentes para clientes diferentes, a personalização da estratégia é a chave para alcançar cada objetivo",
    bio: "Pós-graduado em MBA em Marketing e Vendas, especializado em Metodologia e Gestão para Educação a Distância, e graduado em Administração de Empresas com ênfase em Comércio Exterior. Professor universitário por mais de 10 anos e atualmente diretor estratégico na área digital com certificações em Google Ads, Meta Ads, Google Analytics, Google Search Console e Google Business."
  },
  {
    name: "MURIEL DUARTE",
    role: "SÓCIO FUNDADOR",
    img: "https://res.cloudinary.com/ifuatk2z/image/upload/v1786045995/MurielDuarte2.png",
    quote: "Levamos nossos cliente a se comunicar de forma genuína, e assim conquistamos os corações do público antes de suas mentes!",
    bio: "Formado em Publicidade e Propaganda pela Pontifícia Universidade Católica de Campinas e pós-graduado em Inovação em Marketing, tem seu olhar focado em Branding e na aplicação estratégica da identidade visual. Iniciou a carreira na área de design, agregando experiências profissionais em gerenciamento e direção de marketing."
  },
];

const PEOPLE: [string, string][] = [
  ["Marcos G. Correia", "Gorre"],
  ["Isabela Alencar", "Estoque & Office"],
  ["Roberto Campos", "Unimais Veículos"],
  ["Renan Brasil", "Brasil Visa"],
  ["Empresas atendidas", "50+"],
  ["Pessoas impactadas", "10 M+"],
  ["Em tráfego pago / ano", "R$ 15 M+"],
  ["Artes & layouts", "25 K+"],
  ["O Padrão Comum", "Pilar 22"],
  ["Teto Comercial", "Pilar 68"],
  ["Inércia Criativa", "Pilar 37"],
  ["Falta de Agilidade", "Pilar 53"],
];

const SPOTLIGHT: [string, string][] = [
  ["Paioça do Caboclo", "Alimentação"],
  ["Azul Veículos", "Automotivo"],
  ["Telic Technologies", "Tecnologia"],
  ["Autosim", "Automotivo"],
  ["Union Network", "Telecom"],
  ["Fogão Mineiro", "Alimentação"],
  ["Procivil Construtora", "Construção"],
  ["Sr. Brasero", "Churrasco"],
  ["Unimais Veículos", "Automotivo"],
];

const INDEX = [
  "Branding",
  "Identidade Visual",
  "Naming",
  "Manual de Marca",
  "Site Institucional",
  "Embalagens",
  "Papelaria",
  "Comunicação Visual",
  "Gestão de Redes",
  "Produção de Conteúdo",
  "E-mail Marketing",
  "Campanhas Sazonais",
  "Materiais para PDV",
  "Meta Ads",
  "Google Ads",
  "Landing Pages",
  "Copywriting",
  "CRM & Automações",
  "CRO & Otimização",
  "Tech House",
  "Inteligência Artificial",
  "Gamificação",
  "Gorre",
  "Netconfig",
  "Brasil Visa",
  "Hidrocamp",
  "TGlobal Networks",
  "Colégio Pitágoras",
  "Estoque & Office",
  "Renata Freitas Studio",
  "Design",
  "Digital",
  "Performance",
  "Estratégia",
  "Marketing",
  "Visual Identity",
  "Tecnologia",
  "Serviços",
  "Indústria",
  "Varejo",
  "E-commerce",
  "Infoprodutos",
  "Educação",
  "Alta Precisão",
  "Resistência",
  "Têmpera",
  "Bigorna",
  "Martelo",
  "Aquecimento",
  "Forja",
  "Campinas / SP",
  "Santo Antônio / SP",
];

const JOBS: [string, string, string][] = [
  ["WhatsApp Oficial", "(19) 9 8264-6492", "Contato direto"],
  ["Instagram Oficial", "@fabricapublicidadedigital", "Portfólio"],
  ["E-mail Corporativo", "lucas@fabricapublicidade.com.br", "Briefing"],
];

function BlurSplitText({
  text,
  className = "",
  style = {},
  as: Component = "p",
  delay = 0,
  stagger = 0.012,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: any;
  delay?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || animated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.disconnect();

            const split = new SplitType(el, { types: 'words,chars' });
            
            gsap.fromTo(
              split.chars,
              {
                opacity: 0,
                filter: 'blur(16px)',
                y: 18,
              },
              {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 1.3,
                delay: delay,
                stagger: stagger,
                ease: 'power3.out',
              }
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, delay, stagger]);

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        ...style,
      }}
    >
      {text}
    </Component>
  );
}

function BlurLineReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.disconnect();

            const split = new SplitType(el, { types: 'lines,words' });
            
            if (split.words) {
              gsap.fromTo(
                split.words,
                {
                  opacity: 0,
                  filter: 'blur(8px)',
                  y: 15,
                },
                {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  duration: 0.8,
                  delay: delay,
                  stagger: 0.02,
                  ease: 'power2.out',
                }
              );
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [animated, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <div className="flex flex-col items-center gap-2 pt-12 pb-6 select-none w-[70%] mx-auto border-t-[3px] border-dotted border-white/20">
      <span className="text-4xl sm:text-6xl md:text-7xl text-[#ff4d16] font-mono font-extralight tracking-widest">{n}</span>
      <h2 
        className="text-2xl sm:text-4xl md:text-5xl text-white tracking-widest uppercase font-sans font-light text-center"
      >
        {children}
      </h2>
    </div>
  );
}

const HeroText = React.memo(() => {
  return (
    <BlurText
      text="FÁBRICA"
      as="h1"
      style={{ fontFamily: "'Outfit', sans-serif", justifyContent: 'center' }}
      className="relative z-10 text-center text-[16vw] leading-[0.85] font-light tracking-tight text-[#ff4d16] md:text-[13vw] select-none uppercase drop-shadow-[0_0_25px_rgba(255,77,22,0.4)] cursor-default"
      animateBy="letters"
      direction="bottom"
      delay={80}
      stepDuration={1.8}
      hoverBlur={true}
    />
  );
});

function InteractiveImage({ src, alt }: { src: string, alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imgRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const rotateX = y * 25;
    const rotateY = -x * 25;
    
    imgRef.current.style.transition = 'none';
    imgRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    imgRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center cursor-default bg-[#050505]"
      style={{ perspective: '1000px' }}
    >
      <img loading="lazy" ref={imgRef}
        src={src} 
        alt={alt}
        className="w-[85%] h-[85%] md:w-[95%] md:h-[95%] object-contain pointer-events-none opacity-90"
        style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.9))', transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
      />
    </div>
  );
}

export default function HomeV2() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('aforja_home_unlocked') === 'true';
  });

  const [pixelFactor, setPixelFactor] = useState(5.0);
  const [brightness, setBrightness] = useState(1.0);
  const [smearIntensity, setSmearIntensity] = useState(0.3);
  const [roughness, setRoughness] = useState(0.25);
  const [metalness, setMetalness] = useState(0.85);
  const [cameraZ, setCameraZ] = useState(7);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof TEAM[0] | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) {
        setScrollProgress(window.scrollY / max);
      }
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        user_agent: navigator.userAgent
      })
    }).catch(console.error);
  }, []);

  const threeProps = useMemo(
    () => ({
      pixelFactor,
      cameraZ,
      cameraFOV: 45,
      bgColor: "#050505",
      autoRotate,
      brightness,
      smearIntensity,
      roughness,
      metalness,
      scrollProgress,
      scrollY
    }),
    [pixelFactor, cameraZ, autoRotate, brightness, smearIntensity, roughness, metalness, scrollProgress, scrollY]
  );

  if (!isUnlocked) {
    return <EmBreveGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f7] font-mono selection:bg-[#ff4d16] selection:text-white">
      {/* 3D Canvas Background */}
      <ThreeCanvas {...threeProps} />

      {/* Fixed Top-Right Action Button (No Rounded Corners) */}
      <a
        href="#projeto"
        className="fixed top-6 right-6 z-50 text-black bg-[#ff4d16] hover:bg-white transition-colors uppercase font-bold font-mono text-xs tracking-widest px-6 py-3.5 rounded-none shadow-2xl pointer-events-auto"
      >
        Iniciar Projeto
      </a>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-transparent transition-all duration-500 flex items-center justify-center border border-transparent
          ${scrollY > 400 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-8 h-8 text-stone-500 stroke-[1] transition-colors hover:text-[#ff4d16]" />
      </button>

      {/* Navigation Header Bar (Matching Reference) */}
      <div ref={menuRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <nav className="bg-[#111111]/90 backdrop-blur-xl border border-white/15 px-6 py-3 flex items-center justify-between gap-8 shadow-2xl pointer-events-auto min-w-[280px] sm:min-w-[340px]">
          {/* Left Icon */}
          <span className="font-mono text-base font-bold text-white tracking-widest select-none">
            &gt;|&lt;
          </span>

          {/* Center Indicator */}
          <div className="flex items-center gap-1 text-[#ff4d16] font-mono text-xs font-bold select-none">
            <span>▪</span><span>▪</span><span>▪</span><span>▪</span><span>▪</span>
          </div>

          {/* Right Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="font-mono text-xs uppercase tracking-widest text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>MENU</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </nav>

        {/* Dropdown Menu */}
        <div className={`absolute top-full mt-2 overflow-hidden transition-all duration-300 origin-top bg-[#050505]/90 backdrop-blur-xl border border-white/15 w-56 shadow-2xl pointer-events-auto ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
          <ul className="flex flex-col py-2 font-mono">
            {NAV.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 text-xs text-stone-300 hover:text-[#ff4d16] hover:bg-white/5 transition-colors tracking-widest text-left uppercase"
                >
                  {item}
                </a>
              </li>
            ))}
            
          </ul>
        </div>
      </div>

      {/* Control Panel (Floating) */}
      {showControls && (
        <div 
          className="fixed bottom-6 left-6 z-[60] w-72 bg-[#050505]/90 backdrop-blur border border-white/10 p-5 rounded-lg shadow-2xl"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="label-xs text-white">Shader Controls</h3>
            <div className="w-2 h-2 rounded-full bg-[#ff4d16] shadow-[0_0_8px_rgba(255,77,22,0.5)]" />
          </div>

          <ControlSlider label="Pixel Factor" value={pixelFactor} min={2} max={15} step={1} onChange={setPixelFactor} formatValue={(v) => `${v}x`} />
          <ControlSlider label="Smear Intensity" value={smearIntensity} min={0} max={1} step={0.05} onChange={setSmearIntensity} formatValue={(v) => v.toFixed(2)} />
          <ControlSlider label="Brightness" value={brightness} min={0.3} max={2.0} step={0.1} onChange={setBrightness} formatValue={(v) => v.toFixed(1)} />
          <ControlSlider label="Roughness" value={roughness} min={0} max={1} step={0.05} onChange={setRoughness} formatValue={(v) => v.toFixed(2)} />
          <ControlSlider label="Metalness" value={metalness} min={0} max={1} step={0.05} onChange={setMetalness} formatValue={(v) => v.toFixed(2)} />
          <ControlSlider label="Camera Distance" value={cameraZ} min={3} max={15} step={0.5} onChange={setCameraZ} formatValue={(v) => `${v}u`} />

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
            <span className="label-xs text-stone-400">Auto-Rotate</span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="relative w-8 h-4 rounded-full transition-colors"
              style={{ background: autoRotate ? "rgba(255, 77, 22, 0.3)" : "rgba(255,255,255,0.1)" }}
            >
              <div 
                className="absolute top-[2px] w-3 h-3 rounded-full transition-all"
                style={{ 
                  left: autoRotate ? "18px" : "2px", 
                  background: autoRotate ? "#ff4d16" : "#8B8578" 
                }}
              />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 relative z-10 pointer-events-none">
        {/* Hero Section */}
        <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
          <div className="pointer-events-auto flex flex-col items-center">
            <HeroText />
          </div>
        </section>

        {/* Section 01: Nosso propósito */}
        <section id="jornada" className="mx-auto max-w-[1400px] px-6 pointer-events-auto">
          <SectionLabel n="01">Nosso propósito</SectionLabel>

          <div className="mx-auto max-w-7xl space-y-8 md:space-y-10 pb-28">
            {/* Paragraph 1: Aligned to the left - Large scale */}
            <div className="relative w-full md:w-[75%] lg:w-[60%] mr-auto">
              <span className="absolute -top-7 left-0 text-[10px] text-stone-500 font-mono tracking-widest uppercase">
                SEC—01
              </span>
              <BlurSplitText 
                text="Forjamos estratégias criativas e resultados sólidos para destacar sua marca, unindo posicionamento de impacto e desempenho digital sob medida. O seu negócio modelado com força e consistência de ferro."
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.4] text-stone-300 font-serif font-light tracking-wide text-left"
              />
            </div>

            {/* Paragraph 2: Offset to the right - Large scale */}
            <div className="relative w-full md:w-[75%] lg:w-[60%] md:ml-auto flex flex-col md:flex-row gap-3 md:gap-8 items-start md:items-start justify-end text-left md:text-right">
              <BlurSplitText 
                text="Fortalecer marcas, potencializar resultados e ser parceiro estratégico em cada etapa da jornada. Somos a Fábrica: retiramos as marcas do estado bruto e as lapidamos até se tornarem ferramentas afiadas de conversão."
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.4] text-stone-300 font-serif font-light tracking-wide md:text-right"
              />
              <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase shrink-0 pt-3 text-right">
                ETHOS
              </span>
            </div>
          </div>

          <div className="pb-28 text-center select-none flex flex-col gap-2">
            <BlurText 
              text="POSICIONE-SE"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-serif font-light cursor-default"
            />
            <BlurText 
              text="CONECTE-SE"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-serif font-light cursor-default"
            />
            <BlurText 
              text="E VENDA"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-serif font-light cursor-default"
            />
          </div>
        </section>

        {/* Section 02: Quem somos */}
        <section id="forjamos" className="mx-auto max-w-[1400px] px-6 pointer-events-auto">
          <SectionLabel n="02">Quem somos</SectionLabel>

          <div className="grid gap-12 md:gap-16 pb-28 md:grid-cols-2">
            {WRITING.map((w) => (
              <article key={w.title} className="group relative border-none bg-transparent p-0 flex flex-col justify-between">
                <div>
                  {/* Tag label header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-white/10 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 text-stone-300">
                      {w.tag}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">
                      {w.meta}
                    </span>
                  </div>

                  {/* Pixelated ASCII / Dot-Matrix Graphic Canvas */}
                  <div className="relative aspect-[16/10] bg-[#050505] overflow-hidden mb-5 border border-white/5 group-hover:border-white/20 transition-colors">
                    <PixelArtCanvas type={w.type} />
                  </div>

                  {/* Title & Description */}
                  <h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-white tracking-wider uppercase group-hover:text-[#ff4d16] transition-colors"
                  >
                    {w.title}
                  </h3>
                  
                  <p 
                    className="text-sm sm:text-base text-stone-400 font-serif leading-relaxed mt-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {w.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="bg-[#050505] relative z-20 pointer-events-auto w-full">
        {/* Section 03: O que forjamos */}
        <section className="mx-auto max-w-[1400px] px-6">
          <SectionLabel n="03">O que forjamos</SectionLabel>

          <ul className="pb-24 border-t border-white/10">
            {CONTENT.map(([tag, title, date]) => (
              <li key={title}>
                <a
                  href="#forjamos"
                  className="group flex items-center gap-6 border-b border-white/10 py-5 px-3 transition-all hover:bg-[#ff4d16] hover:border-[#ff4d16]"
                >
                  <span className="label-xs w-24 shrink-0 text-[#ff4d16] font-bold group-hover:text-black">{tag}</span>
                  <span className="flex-1 text-sm text-stone-200 font-mono transition-colors group-hover:text-black">
                    {title}
                  </span>
                  <span className="label-xs shrink-0 text-stone-400 group-hover:text-black/70">{date}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 04: Por que Forja */}
        <section id="porque-forja" className="mx-auto max-w-[1400px] px-6 relative py-12">
          {/* Section 04 Header (Standard scrolling header, non-sticky) */}
          <SectionLabel n="04">Por que Forja</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-28 pt-8">
            {/* Column 1: Text Content with Sticky Title and scrolling blur-reveal text */}
            <div className="space-y-10 text-stone-200 font-sans relative">
              {/* Sticky Column 1 Header fixed at top of column while text scrolls */}
              <div className="lg:sticky lg:top-0 z-30 bg-[#050505] pb-6 pt-6 border-b border-white/10">
                <span className="text-[10px] text-[#ff4d16] font-mono tracking-widest uppercase bg-white/5 px-3 py-1 border border-white/10">
                  CONCEITO & ORIGEM
                </span>
                <BlurText
                  as="h3"
                  text="FORJA VEM DE FÁBRICA"
                  className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide uppercase mt-4 font-sans"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </div>
              
              {/* Top fade out overlay (line by line fade/blur) */}
              <div 
                className="hidden lg:block lg:sticky z-20 w-full pointer-events-none"
                style={{ 
                  top: '106px', 
                  height: '140px',
                  background: 'linear-gradient(to bottom, rgba(5,5,5,1) 0%, rgba(5,5,5,0) 100%)',
                }}
              />

              {/* Scrolling paragraphs with blur-reveal effect */}
              <div className="space-y-12 text-base sm:text-lg leading-relaxed text-stone-300 font-sans pt-4 pb-12 lg:-mt-[140px]">
                <BlurLineReveal delay={0.1}>
                  <p className="border-l-2 border-[#ff4d16] pl-6 text-stone-300 text-base sm:text-lg">
                    A palavra <strong className="text-white font-semibold">Forja</strong> nasce da própria essência da <strong className="text-white font-semibold">Fábrica</strong>. Forjar é o ato milenar de submeter a matéria-prima bruta às mais altas temperaturas e ao impacto contínuo do martelo sobre a bigorna, até transformar o metal amorfo em uma ferramenta de precisão inquebrável.
                  </p>
                </BlurLineReveal>

                <BlurLineReveal delay={0.2}>
                  <p className="pl-6 text-stone-300 text-base sm:text-lg">
                    No mercado atual, marcas genéricas e comunicação sem intenção se desgastam rapidamente. Nós não apenas criamos layouts; nós <strong className="text-white">forjamos identidades de alto impacto</strong>, lapidando o posicionamento e a presença digital até que ganhem têmpera, peso e relevância inquestionável.
                  </p>
                </BlurLineReveal>

                <BlurLineReveal delay={0.3}>
                  <p className="pl-6 text-stone-300 text-base sm:text-lg">
                    O fogo é a nossa paixão aliada aos dados; a bigorna é a estratégia consistente. Na Forja, moldamos o posicionamento, a engenharia de software e a estética do seu negócio para resistir ao tempo e superar qualquer concorrência.
                  </p>
                </BlurLineReveal>

                <BlurLineReveal delay={0.4}>
                  <div className="pt-8 border-t border-white/10 space-y-4 font-sans">
                    <span className="text-xs text-white font-mono uppercase tracking-widest block font-bold">O PROCESSO DE MOLDAGEM</span>
                    <div className="text-xs sm:text-sm text-stone-300 space-y-4 leading-relaxed font-sans">
                      <p><span className="text-[#ff4d16] font-mono font-extralight text-base sm:text-lg mr-2">01.</span> <strong className="text-white font-semibold">ESTADO BRUTO:</strong> Diagnóstico profundo e desconstrução dos clichês do mercado.</p>
                      <p><span className="text-[#ff4d16] font-mono font-extralight text-base sm:text-lg mr-2">02.</span> <strong className="text-white font-semibold">CALOR & PRESSÃO:</strong> Estratégia de diferenciação, branding assinado e arquitetura de marca.</p>
                      <p><span className="text-[#ff4d16] font-mono font-extralight text-base sm:text-lg mr-2">03.</span> <strong className="text-white font-semibold">FORJAMENTO:</strong> Design obsessivo, tecnologia escalável e performance de conversão.</p>
                      <p><span className="text-[#ff4d16] font-mono font-extralight text-base sm:text-lg mr-2">04.</span> <strong className="text-white font-semibold">TÊMPERA:</strong> Validação rigorosa e entrega de uma marca afiada e pronta para vencer.</p>
                    </div>
                  </div>
                </BlurLineReveal>
              </div>
            </div>

            {/* Column 2: Sticky 3D Articulated Hefesto Bust with Interactive Fluid behind */}
            <div className="lg:sticky lg:top-20 h-[620px] sm:h-[740px] lg:h-[860px] w-full relative bg-transparent overflow-hidden z-40">
              {/* Fluid Splash Effect behind the statue */}
              <SplashCursor
                isAbsolute={true}
                DENSITY_DISSIPATION={3.5}
                VELOCITY_DISSIPATION={2}
                PRESSURE={0.1}
                CURL={3}
                SPLAT_RADIUS={0.2}
                SPLAT_FORCE={6000}
                COLOR_UPDATE_SPEED={10}
                SHADING={true}
                RAINBOW_MODE={false}
                COLOR="#ff6800"
              />

              {/* 3D Statue with transparent background layered on top */}
              <div className="absolute inset-0 z-10 pointer-events-auto">
                <ThreeCanvas 
                  isEmbedded 
                  renderClean 
                  transparentBg
                  modelPath="/models/hefestoHD-v1.glb" 
                  fixedScale={4.0}
                  fixedY={-0.08}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Nosso Time */}
        <section id="clientes" className="mx-auto max-w-[1400px] px-6">
          <SectionLabel n="05">Nosso time</SectionLabel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM.map((m) => (
              <PaperBurnCard
                key={m.name}
                name={m.name}
                role={m.role}
                img={m.img}
                onClick={() => setSelectedMember(m)}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-1 py-14 md:grid-cols-4 border-t border-white/10 mt-12">
            {PEOPLE.map(([name, role]) => (
              <div
                key={name}
                className="flex items-baseline justify-between border-b border-white/10 py-3 font-mono"
              >
                <span className="text-xs text-stone-300">{name}</span>
                <span className="label-xs text-stone-400">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 06: Mercados em que forjamos */}
        <section id="projeto" className="mx-auto max-w-[1400px] px-6">
          <SectionLabel n="06">Mercados em que forjamos</SectionLabel>

          <p className="mx-auto max-w-2xl pb-12 text-center text-sm leading-relaxed text-stone-400 font-mono">
            Marcas que confiam na nossa bigorna. Design assinado, estruturas robustas de marketing
            e engenharia de código resistente a altas cargas de tráfego.
          </p>

          <div className="pb-6 text-center">
            <span className="label-xs text-[#ff4d16] border border-[#ff4d16]/30 px-3 py-1 rounded-full bg-[#ff4d16]/10">
              Spotlight
            </span>
          </div>

          <ul className="pb-24 border-t border-white/10">
            {SPOTLIGHT.map(([name, year]) => (
              <li key={name} className="group flex items-baseline justify-between gap-4 border-b border-white/10 py-4 px-2 hover:bg-[#ff4d16] hover:border-[#ff4d16] transition-all">
                <span 
                  className="font-display text-[7vw] leading-[1.05] font-light text-stone-300/80 transition-colors duration-300 group-hover:text-black md:text-[4.5rem] uppercase select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {name.toUpperCase()}
                </span>
                <span className="label-xs text-stone-400 border border-white/10 px-2 py-0.5 rounded">{year}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 07: Jornada da forja */}
        <section className="mx-auto max-w-[1400px] px-6">
          <SectionLabel n="07">Jornada da forja</SectionLabel>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 pb-24 sm:grid-cols-3 md:grid-cols-4 font-mono">
            {INDEX.map((c) => (
              <li
                key={c}
                className="border-b border-white/10 py-2.5 text-xs text-stone-400 transition-colors hover:text-[#ff4d16] hover:border-[#ff4d16]/30 flex items-center gap-2"
              >
                <span className="text-[#ff4d16]/60 text-[10px]">✦</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Small 3D Anvil before Contato */}
        <div className="mx-auto max-w-[1400px] px-6 flex justify-center pb-12 pt-8">
          <div className="w-64 h-64 sm:w-80 sm:h-80 relative opacity-90 pointer-events-auto">
            <ThreeCanvas 
              isEmbedded 
              modelPath="/models/003_anvil.glb" 
              pixelFactor={4.5} 
              autoRotate={true}
              autoRotateSpeed={0.45}
              cameraZ={10.5}
              cameraFOV={40}
              brightness={1.9}
              smearIntensity={0.2}
              roughness={0.2}
              metalness={0.8}
              fixedScale={0.008}
              fixedY={-0.3}
            />
          </div>
        </div>

        {/* Section 08: Contato */}
        <section id="contato" className="mx-auto max-w-[1400px] px-6">
          <SectionLabel n="08">Contato</SectionLabel>

          <p className="mx-auto max-w-2xl pb-14 text-center text-sm leading-relaxed text-stone-400 font-mono">
            A forja está acesa. Fale diretamente com os mestres da Fábrica — preferimos contato
            direto para alinhamentos rápidos ou orçamentos customizados com urgência comercial.
          </p>

          <div className="grid gap-4 md:grid-cols-3 pb-12">
            {JOBS.map(([title, loc, type]) => (
              <a
                key={title}
                href={
                  title.includes("WhatsApp")
                    ? "https://api.whatsapp.com/send?1=pt_BR&phone=5519982646492&text=Ol%C3%A1%20vim%20atrav%C3%A9s%20do%20site"
                    : title.includes("Instagram")
                    ? "https://instagram.com/fabricapublicidadedigital"
                    : "mailto:lucas@fabricapublicidade.com.br"
                }
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-44 flex-col justify-between rounded-none bg-white/[0.02] border border-white/10 p-6 transition-all hover:border-[#ff4d16] hover:bg-[#ff4d16]"
              >
                <span 
                  className="font-display text-2xl font-light text-white group-hover:text-black transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {title}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-mono text-stone-200">{loc}</span>
                  <span className="label-xs text-stone-400">{type} ↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 bg-[#0a0a0c]">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-xs leading-relaxed text-stone-400 font-mono border-l border-[#ff4d16] pl-4">
              Forjando marcas com estratégia, criatividade e performance desde o primeiro martelo.
              A sua marca moldada sob medida com fogo, consistência e força de ferro.
            </p>

            <div className="flex gap-8 font-mono">
              {["Jornada", "Forjamos", "Clientes", "Contato"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="label-xs text-stone-400 transition-colors hover:text-[#ff4d16]"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-[1400px] px-6 pb-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-6">
            <span className="label-xs text-stone-400">
              © 2026 Fábrica Publicidade & Digital — Campinas / SP
            </span>
            <span className="label-xs text-[#ff4d16]/80 mt-2 sm:mt-0">
              &gt;| FÁBRICA |&lt;
            </span>
          </div>
        </footer>
        </div>
      </main>

      {/* Team Member Detail Modal */}
      {selectedMember && (
        <div 
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/90 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#050505] border border-white/20 shadow-2xl text-white font-mono overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#050505]">
              <span className="text-xs text-stone-400 font-mono tracking-widest uppercase">DETAIL</span>
              
              {/* Center icon: 4 orange dots */}
              <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                <div className="bg-[#ff4d16] w-1 h-1" />
                <div className="bg-[#ff4d16] w-1 h-1" />
                <div className="bg-[#ff4d16] w-1 h-1" />
                <div className="bg-[#ff4d16] w-1 h-1" />
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-xs text-stone-400 hover:text-white font-mono tracking-widest uppercase transition-colors"
              >
                CLOSE
              </button>
            </div>

            {/* Modal Photo Area with Corner Crosshairs */}
            <div className="relative aspect-[4/3] sm:aspect-square bg-stone-950 flex items-center justify-center overflow-hidden border-b border-white/10">
              <span className="absolute top-3 left-3 text-stone-500 text-xs font-mono select-none">+</span>
              <span className="absolute top-3 right-3 text-stone-500 text-xs font-mono select-none">+</span>
              <span className="absolute bottom-3 left-3 text-stone-500 text-xs font-mono select-none">+</span>
              <span className="absolute bottom-3 right-3 text-stone-500 text-xs font-mono select-none">+</span>

              <img loading="lazy" src={selectedMember.img}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-90"
              />
            </div>

            {/* Modal Details Section */}
            <div className="p-6 space-y-4 bg-[#050505]">
              <div>
                <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block mb-1">NOME</span>
                <h3 className="text-xl font-bold tracking-wider text-white font-mono uppercase border-b border-white/10 pb-2">
                  {selectedMember.name}
                </h3>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block mb-1">CARGO / FUNÇÃO</span>
                <p className="text-sm text-[#ff4d16] font-mono tracking-widest uppercase border-b border-white/10 pb-2 font-bold">
                  {selectedMember.role}
                </p>
              </div>

              {selectedMember.quote && (
                <div>
                  <span className="text-[10px] text-[#ff4d16] font-mono tracking-widest uppercase block mb-1 font-bold">
                    FRASE ASSINATURA
                  </span>
                  <blockquote 
                    className="text-sm sm:text-base text-stone-100 font-serif italic border-l-2 border-[#ff4d16] pl-3.5 py-2 bg-white/[0.03] font-light leading-relaxed my-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    "{selectedMember.quote}"
                  </blockquote>
                </div>
              )}

              <div>
                <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block mb-1">TRAJETÓRIA & BIO</span>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-mono pt-1">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
