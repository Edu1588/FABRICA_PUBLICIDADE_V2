import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Section6V2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (textRefs.current.length > 0) {
      gsap.fromTo(textRefs.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    const fadeElements = gsap.utils.toArray('.fade-up-text-s6');
    fadeElements.forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0 },
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
    <section id="company" ref={sectionRef} className="relative min-h-[90vh] bg-[#0c0c0c] flex items-center justify-center overflow-hidden py-24">
      {/* Dark Forest Background matching screenshot */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#030404]/90 via-[#0a0f0d]/70 to-[#030404]/90 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030404] via-transparent to-[#030404] z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000" 
          alt="Forest Atmosphere" 
          className="w-full h-full object-cover opacity-20 grayscale sepia-[.2] hue-rotate-[190deg]"
        />
      </div>

      {/* Left Vertical Text */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div 
          className="text-[#F5F2EC]/40 tracking-[0.3em] text-xs uppercase" 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'var(--font-heading)' }}
        >
          {t('Company', 'Company')}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
        
        {/* Logo/Icon on Top */}
        <div className="mb-16 flex flex-col items-center justify-center opacity-80 fade-up-text-s6">
          <div className="w-12 h-[2px] bg-[#F5F2EC] mb-1.5"></div>
          <div className="w-8 h-[2px] bg-[#F5F2EC] mb-1.5"></div>
          <div className="w-12 h-[2px] bg-[#F5F2EC] mb-4"></div>
          <div className="text-[10px] tracking-[0.3em] font-medium uppercase text-[#F5F2EC]/80" style={{ fontFamily: 'var(--font-heading)' }}>
            Fábrica Publicidade
          </div>
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-12">
          <h2 ref={el => { textRefs.current[0] = el; }} className="text-4xl md:text-5xl lg:text-7xl font-light text-[#F5F2EC] leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('Quem nós somos', 'Who we are')}
          </h2>
        </div>
        
        {/* Paragraphs */}
        <div className="space-y-8 text-[#F5F2EC]/70 text-base md:text-lg lg:text-xl font-light leading-[2] md:leading-[2.2] max-w-3xl mx-auto fade-up-text-s6" style={{ fontFamily: 'var(--font-heading)' }}>
          <p>
            {t('Não importa como o mercado automotivo mude, o que verdadeiramente impulsiona os resultados permanece o mesmo. Na Fábrica Publicidade, nutrimos o crescimento das marcas através da estratégia, moldamos a percepção diária por meio do design e guiamos a conversão através da inteligência de dados.', 'No matter how the automotive market changes, what truly drives results remains the same. At Fábrica Publicidade, we nurture brand growth through strategy, shape daily perception through design, and guide conversion through data intelligence.')}
          </p>
          <p>
            {t('Através de campanhas físicas e plataformas digitais, carregamos um jeito de ser — enraizado na excelência técnica e silenciosamente eficaz — onde o verdadeiro potencial de vendas da Azul Veículos encontra o espaço perfeito para se desdobrar.', 'Through physical campaigns and digital platforms, we carry a way of being — rooted in technical excellence and quietly effective — where Azul Veículos\' true sales potential finds the perfect space to unfold.')}
          </p>
        </div>

      </div>
    </section>
  );
}
