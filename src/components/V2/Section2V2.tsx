import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Section2V2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ethosRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    if (ethosRef.current) {
      gsap.fromTo(
        ethosRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ethosRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-36 px-6 md:px-16 z-10 bg-transparent min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Indicator matching Dragonfly 01 ABOUT */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <span className="text-[#ff4f00] font-mono text-3xl md:text-4xl font-bold tracking-widest mb-1">
            01
          </span>
          <h2 className="text-white font-mono text-2xl md:text-4xl font-bold tracking-[0.25em] uppercase">
            ABOUT
          </h2>
        </div>

        {/* Hairline Separator with SEC-01 label */}
        <div className="relative w-full border-t border-white/15 mb-16 pt-3 flex justify-between items-center font-mono text-xs text-white/40 tracking-widest">
          <span>SEC-01</span>
          <span>[ FÁBRICA PUBLICIDADE ]</span>
        </div>

        {/* Content Layout */}
        <div className="space-y-16">
          {/* Top Main Statement */}
          <div className="max-w-4xl">
            <h3
              ref={textRef}
              className="text-2xl sm:text-4xl md:text-5xl font-light text-white leading-[1.25] tracking-tight font-serif"
            >
              {t(
                'Mais de 8 anos no mercado automotivo, a Fábrica traz estratégia, alcance e inteligência para marcas de alto padrão encontrarem seu melhor desempenho.',
                'Over eight years in automotive marketing, Fábrica brings strategy, reach, and intelligence for premium brands to unlock their full potential.'
              )}
            </h3>
          </div>

          {/* Bottom Offset Paragraph (Ethos) */}
          <div className="flex justify-end w-full">
            <div
              ref={ethosRef}
              className="max-w-2xl md:ml-auto space-y-4 font-mono text-sm sm:text-base text-white/80 leading-relaxed bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-2 text-[#ff4f00] text-xs font-bold tracking-widest uppercase mb-2">
                <span>ETHOS</span>
                <span className="w-8 h-[1px] bg-[#ff4f00]"></span>
              </div>
              <p>
                {t(
                  'Somos uma equipe de estrategistas, criativos e especialistas em mídias de alta conversão. Lideramos a transformação de concessionárias e empresas automotivas de alto padrão através de ecossistemas digitais, inteligência de tráfego e criação audiovisual cinematográfica.',
                  'We are a team of deeply technical strategists, creatives, and performance experts. We elevate premium automotive brands and dealerships through integrated digital ecosystems, precision traffic intelligence, and cinematic visual creation.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


