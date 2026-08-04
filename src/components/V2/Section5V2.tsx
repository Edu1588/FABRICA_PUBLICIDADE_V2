import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidImage from './LiquidImage';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Section5V2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    if (displacementRef.current) {
      tl.to(displacementRef.current, {
        attr: { scale: 100 },
        duration: 0
      })
      .to(displacementRef.current, {
        attr: { scale: 0 },
        duration: 2.5,
        ease: 'power3.out'
      }, 0);
    }

    if (textRefs.current.length > 0) {
      tl.fromTo(textRefs.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' },
        0.5
      );
    }

    const fadeElements = gsap.utils.toArray('.fade-up-text-s5');
    fadeElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, [language]);

  return (
    <section id="project-2" ref={sectionRef} className="relative min-h-screen bg-[#020202] px-6 md:px-10 flex items-stretch z-10 overflow-hidden">
      <svg className="fixed pointer-events-none w-0 h-0">
        <defs>
          <filter id="section5-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" result="warp" />
            <feDisplacementMap 
              ref={displacementRef}
              xChannelSelector="R" 
              yChannelSelector="G" 
              scale="0" 
              in="SourceGraphic" 
              in2="warp" 
            />
          </filter>
        </defs>
      </svg>
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C46A1A]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Left Rotated Text - Sticky */}
      <div className="hidden lg:block w-24 relative shrink-0 z-20">
        <div className="sticky top-[50vh] -translate-y-1/2 flex items-center justify-center">
          <div 
            className="transform -rotate-90 origin-center text-[#F5F2EC]/30 tracking-[0.2em] text-sm uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('Projeto 02', 'Project 02')}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row relative z-10">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center py-32 mt-20 lg:mt-0 lg:pl-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 lg:gap-24 items-center">
            
            {/* Text Side */}
            <div>
              <div key={language} className="mb-12" style={{ fontFamily: 'var(--font-heading)', filter: 'url(#section5-liquid)' }}>
                <div className="overflow-hidden mb-2">
                  <h2 ref={el => { textRefs.current[0] = el; }} className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F2EC] leading-[1.1] transform-gpu">
                    {t('Seminovos Premium', 'Premium Pre-Owned')}
                  </h2>
                </div>
              </div>

              <div key={`${language}-text`} className="max-w-md text-sm md:text-base text-[#F5F2EC]/70 font-light leading-loose fade-up-text-s5">
                <p className="mb-6">
                  {t('Estratégia focada no catálogo de veículos de alto padrão. Adotamos uma direção de arte minimalista, evidenciando o design e a exclusividade dos carros. Segmentação de mídia hiper-direcionada para o público sênior.', 'Strategy focused on the high-end vehicle catalog. We adopted a minimalist art direction, highlighting the design and exclusivity of the cars. Hyper-targeted media segmentation for the senior audience.')}
                </p>
                <div className="mt-12 flex items-center gap-4 cursor-pointer group w-fit">
                   <div className="w-12 h-[1px] bg-white group-hover:w-16 transition-all duration-300"></div>
                   <span className="text-xs uppercase tracking-widest font-sans group-hover:opacity-70 transition-opacity">
                     {t('Ver Detalhes', 'View Details')}
                   </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Images Side */}
        <div className="lg:w-[50%] relative h-[500px] lg:h-auto min-h-[600px] flex items-center justify-center lg:justify-end">
          <div className="w-[90%] h-[80%] absolute z-10 shadow-2xl overflow-hidden group">
             <div className="w-full h-full transform transition-transform duration-1000 group-hover:scale-105">
               <LiquidImage src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
