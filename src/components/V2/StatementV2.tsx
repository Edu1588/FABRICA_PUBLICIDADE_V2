import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function StatementV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

    if (lines.length > 0) {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, [language]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 z-10 bg-transparent select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Huge Dragonfly-Style Serif Display Typography */}
        <div className="flex flex-col items-center justify-center space-y-[-0.15em] sm:space-y-[-0.2em]">
          <h2
            ref={line1Ref}
            className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-serif font-normal tracking-tight text-white leading-none uppercase mix-blend-difference drop-shadow-2xl"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {t('REFERÊNCIA', 'GLOBAL')}
          </h2>

          <h2
            ref={line2Ref}
            className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-serif font-normal tracking-tight text-white/90 leading-none uppercase mix-blend-difference drop-shadow-2xl"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {t('DESDE O', 'SINCE')}
          </h2>

          <h2
            ref={line3Ref}
            className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] font-serif font-normal tracking-tight text-white leading-none uppercase mix-blend-difference drop-shadow-2xl"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {t('DIA UM', 'DAY ONE')}
          </h2>
        </div>

        {/* Small Caption/Tagline */}
        <div className="mt-12 flex items-center gap-4 font-mono text-xs md:text-sm text-white/50 tracking-[0.3em] uppercase">
          <span className="w-8 h-[1px] bg-[#ff4f00]" />
          <span>{t('IMPACTO & ESCALA AUTOMOTIVA', 'AUTOMOTIVE EXCELLENCE & SCALE')}</span>
          <span className="w-8 h-[1px] bg-[#ff4f00]" />
        </div>

        {/* Industrial Seal / Badge Box */}
        <div className="mt-16 w-full max-w-2xl bg-black/80 backdrop-blur-md border border-white/15 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#ff4f00]/50 flex items-center justify-center text-[#ff4f00] text-xl font-bold bg-[#ff4f00]/10 shrink-0">
              ⚡
            </div>
            <div>
              <span className="text-[#ff4f00] text-[10px] font-bold tracking-[0.25em] uppercase block">
                FORJA INDUSTRIAL
              </span>
              <h4 className="text-white text-base font-bold tracking-wider uppercase">
                A BIGORNA DA CRIAÇÃO
              </h4>
              <p className="text-white/40 text-xs tracking-widest mt-0.5">
                FUNDADA EM SANTO ANTÔNIO / SP
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-white/70 border-t sm:border-t-0 sm:border-l border-white/15 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-[#ff4f00]">✓</span>
              <span><strong>Alta Precisão:</strong> Artesanal e cirúrgico</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#ff4f00]">✓</span>
              <span><strong>Resistência:</strong> Estratégia que dura</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
