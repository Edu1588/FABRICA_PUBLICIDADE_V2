import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeroV2() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  
  const text = "FABRICA";
  const chars = text.split("");

  const marqueeItems = [
    'BRANDING ★',
    'COMUNICAÇÃO ★',
    'DESIGN ★',
    'DIGITAL ★',
    'PERFORMANCE ★',
    'ESTRATÉGIA ★',
    'MARKETING ★',
    'VISUAL IDENTITY ★',
  ];
  
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current.children, 
        { 
          opacity: 0, 
          filter: "blur(20px)",
          scale: 1.15,
          y: 40
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.9, ease: 'power2.out' }
      );
    }
  }, [language]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden pt-24 pb-12">
      {/* Corner crosshairs like Dragonfly */}
      <div className="absolute top-8 left-8 text-white/30 text-xs font-mono z-20">+</div>
      <div className="absolute top-8 right-8 text-white/30 text-xs font-mono z-20">+</div>
      <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono z-20">+</div>
      <div className="absolute bottom-8 right-8 text-white/30 text-xs font-mono z-20">+</div>

      <div className="my-auto relative z-20 px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Tagline */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-[#ff4f00]/30 backdrop-blur-md">
          <span className="text-[#ff4f00] text-xs font-mono font-bold tracking-[0.25em] uppercase">
            ★ FÁBRICA — DO LATIM, FORJA
          </span>
        </div>

        {/* Giant Main Brand Heading */}
        <h1 
          ref={textRef}
          className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-bold tracking-tighter text-[#ff4f00] leading-none select-none uppercase mix-blend-difference"
          style={{ fontFamily: 'var(--font-heading)', textShadow: '0 0 80px rgba(255,79,0,0.25)', mixBlendMode: 'difference' }}
        >
          {chars.map((char, index) => (
            <span key={index} className="inline-block opacity-0 mix-blend-difference" style={{ mixBlendMode: 'difference' }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Sub-headlines & Description Box */}
        <div ref={contentRef} className="mt-6 flex flex-col items-center max-w-3xl opacity-0 space-y-6">
          {/* Tri-Headline */}
          <div className="font-mono text-xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white uppercase flex flex-wrap justify-center gap-3">
            <span className="text-white">POSICIONE-SE .</span>
            <span className="text-[#ff4f00]">CONECTE-SE</span>
            <span className="text-white">E VENDA .</span>
          </div>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl bg-black/50 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-white/10">
            {t(
              'Forjamos estratégias criativas e resultados sólidos para destacar sua marca, unindo posicionamento de impacto e desempenho digital sob medida. O seu negócio modelado com força e consistência de ferro.',
              'We forge creative strategies and solid results to elevate your brand, combining high-impact positioning and tailor-made digital performance.'
            )}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="bg-[#ff4f00] hover:bg-[#ff4f00]/90 text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 rounded-full transition-all shadow-xl shadow-[#ff4f00]/25 hover:scale-105"
            >
              {t('Forjar Minha Marca', 'Forge My Brand')}
            </a>
            <a
              href="#journey"
              className="bg-black/80 hover:bg-white/10 text-white font-mono font-semibold text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/20 transition-all hover:border-[#ff4f00]"
            >
              {t('Conhecer Jornada', 'Explore Journey')}
            </a>
          </div>

          {/* Call to Scroll Indicator */}
          <div className="pt-2 text-white/40 font-mono text-xs tracking-[0.25em] uppercase flex items-center gap-2">
            <span className="animate-bounce">↓</span>
            <span>{t('ROLE PARA FORJAR', 'SCROLL TO FORGE')}</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Marquee Ticker at bottom of Hero */}
      <div className="w-full border-y border-white/10 py-3 bg-black/80 backdrop-blur-md overflow-hidden relative z-20 mt-8">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 font-mono text-xs text-white/60 tracking-widest uppercase mx-4">
              {marqueeItems.map((item, idx) => (
                <span key={idx} className="hover:text-[#ff4f00] transition-colors">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


