import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeroV2() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  
  const text = "FABRICA";
  const chars = text.split("");
  
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

    if (tagRef.current) {
      gsap.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1.0, ease: 'power2.out' }
      );
    }
  }, [language, text]);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Corner crosshairs like Dragonfly */}
      <div className="absolute top-8 left-8 text-white/30 text-xs font-mono">+</div>
      <div className="absolute top-8 right-8 text-white/30 text-xs font-mono">+</div>
      <div className="absolute bottom-8 left-8 text-white/30 text-xs font-mono">+</div>
      <div className="absolute bottom-8 right-8 text-white/30 text-xs font-mono">+</div>

      <div className="relative z-20 px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <h1 
          ref={textRef}
          className="text-6xl sm:text-8xl md:text-[11rem] lg:text-[15rem] font-bold tracking-tighter text-[#ff4f00] leading-none select-none uppercase mix-blend-difference"
          style={{ fontFamily: 'var(--font-heading)', textShadow: '0 0 80px rgba(255,79,0,0.25)', mixBlendMode: 'difference' }}
        >
          {chars.map((char, index) => (
            <span key={index} className="inline-block opacity-0 mix-blend-difference" style={{ mixBlendMode: 'difference' }}>
              {char}
            </span>
          ))}
        </h1>

        <div ref={tagRef} className="mt-8 flex flex-col items-center gap-2 opacity-0">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/70 bg-black/60 border border-white/10 px-4 py-1.5 backdrop-blur-md rounded-full">
            {t('Estratégia, Design & Inteligência de Dados', 'Strategy, Design & Data Intelligence')}
          </div>
          <p className="text-xs text-white/40 font-mono tracking-widest mt-1">
            [ ECOSSISTEMA PUBLICITÁRIO AUTOMOTIVO ]
          </p>
        </div>
      </div>
    </section>
  );
}

