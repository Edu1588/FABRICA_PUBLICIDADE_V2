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
      </div>
    </section>
  );
}
