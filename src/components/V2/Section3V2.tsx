import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Section3V2() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', labelPt: 'TODOS', labelEn: 'ALL' },
    { id: 'TRAFFIC', labelPt: 'TRÁFEGO PAGO', labelEn: 'PAID TRAFFIC' },
    { id: 'CREATIVE', labelPt: 'AUDIOVISUAL', labelEn: 'CREATIVE' },
    { id: 'ECOSYSTEM', labelPt: 'ECOSSISTEMA', labelEn: 'ECOSYSTEM' },
  ];

  const services = [
    {
      category: 'TRAFFIC',
      badge: 'PERFORMANCE',
      num: '01',
      titlePt: 'GESTÃO DE TRÁFEGO DE ALTA CONVERSÃO',
      titleEn: 'HIGH-CONVERSION PAID TRAFFIC MANAGEMENT',
      descPt: 'Campanhas hiper-segmentadas para captação de leads qualificados em Meta Ads, Google Ads e TikTok Ads com foco em ROAS real.',
      descEn: 'Hyper-targeted campaigns for qualified lead acquisition across Meta, Google, and TikTok Ads focused on true ROAS.',
      visualType: 'vortex',
    },
    {
      category: 'CREATIVE',
      badge: 'AUDIOVISUAL',
      num: '02',
      titlePt: 'PRODUÇÃO AUDIOVISUAL CINEMATOGRÁFICA',
      titleEn: 'CINEMATIC AUDIOVISUAL PRODUCTION',
      descPt: 'Vídeos de alto impacto visual para Reels, lançamentos de veículos, cobertura 4K e filmes institucionais de alto padrão.',
      descEn: 'High visual impact videos for Reels, vehicle launches, 4K coverage, and premium brand films.',
      visualType: 'tower',
    },
    {
      category: 'ECOSYSTEM',
      badge: 'PLATAFAORMAS',
      num: '03',
      titlePt: 'PLATAFORMAS & LANDING PAGES DE ALTA PERFORMANCE',
      titleEn: 'HIGH PERFORMANCE LANDING PAGES & PLATFORMS',
      descPt: 'Desenvolvimento de ecossistemas de conversão integrados aos principais CRMs e sistemas do mercado automotivo.',
      descEn: 'Development of conversion ecosystems seamlessly integrated with automotive CRMs and inventory management systems.',
      visualType: 'matrix',
    },
    {
      category: 'CREATIVE',
      badge: 'ESTRATÉGIA',
      num: '04',
      titlePt: 'BRANDING & POSICIONAMENTO DE ALTO PADRÃO',
      titleEn: 'PREMIUM BRANDING & STRATEGIC POSITIONING',
      descPt: 'Posicionamento de marca, design para showroom/PDV e manuais de marca completos para redes de concessionárias.',
      descEn: 'Brand positioning, showroom/POS design, and comprehensive brand identity systems for dealership networks.',
      visualType: 'sphere',
    },
  ];

  const filteredServices =
    activeCategory === 'ALL'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="relative py-20 z-10 bg-black min-h-screen border-t border-white/15 w-full overflow-hidden"
    >
      {/* Header matching Dragonfly 02 Section */}
      <div className="flex flex-col items-center justify-center text-center mb-10 px-4">
        <span className="text-[#ff4f00] font-mono text-3xl md:text-4xl font-bold tracking-widest mb-1">
          02
        </span>
        <h2 className="text-white font-mono text-2xl md:text-4xl font-bold tracking-[0.25em] uppercase">
          SOLUÇÕES
        </h2>
      </div>

      {/* SEC-02 Bar & Category Filters - Full Width 100% */}
      <div className="w-full border-y border-white/15 py-3 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-white/40 tracking-widest">
        <span>SEC-02</span>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 transition-all uppercase tracking-wider text-[11px] ${
                activeCategory === cat.id
                  ? 'bg-white/20 text-white font-bold border border-white/40'
                  : 'bg-black/80 text-white/50 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {t(cat.labelPt, cat.labelEn)}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Edge-to-Edge Grid with 0 Gap and 1px Border Dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-white/15">
        {filteredServices.map((service, idx) => (
          <div
            key={idx}
            className={`group relative flex flex-col justify-between border-b md:border-b-0 border-white/15 ${
              idx % 2 === 0 ? 'md:border-r border-white/15' : ''
            } ${idx >= 2 ? 'md:border-t border-white/15' : ''} p-6 sm:p-10 hover:bg-white/[0.02] transition-colors`}
          >
            {/* Top-Left Category Badge */}
            <div className="absolute top-6 left-6 z-10 bg-black/90 border border-white/20 px-3 py-1 font-mono text-[10px] font-bold text-white tracking-widest uppercase">
              {service.badge}
            </div>

            {/* Visual Media Canvas (Dot Matrix / ASCII Artwork) */}
            <div className="relative w-full aspect-[16/10] bg-black overflow-hidden my-4 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="font-mono text-[10px] sm:text-[12px] text-white/40 leading-none select-none overflow-hidden text-center p-4 filter blur-[0.2px] group-hover:text-[#ff4f00]/80 transition-colors whitespace-pre">
                  {service.visualType === 'vortex' && `
    . : + * # % @ % # * + : .
  : + * # % @ @ @ @ @ % # * + :
+ * # % @ @ @ @ @ @ @ @ @ % # * +
* # % @ @ @ @ @ @ @ @ @ @ @ % # *
+ * # % @ @ @ @ @ @ @ @ @ % # * +
  : + * # % @ @ @ @ @ % # * + :
    . : + * # % @ % # * + : .
                  `}
                  {service.visualType === 'tower' && `
    [ 0 1 0 1 1 0 1 0 ]
  [ 1 1 1 1 1 1 1 1 1 1 ]
[ 0 0 0 0 1 1 1 1 0 0 0 0 ]
  [ 1 1 1 1 1 1 1 1 1 1 ]
    [ 0 1 0 1 1 0 1 0 ]
                  `}
                  {service.visualType === 'matrix' && `
:: :: :: :: :: :: :: :: :: :: ::
+. +. +. +. +. +. +. +. +. +. +.
*# *# *# *# *# *# *# *# *# *# *#
+. +. +. +. +. +. +. +. +. +. +.
:: :: :: :: :: :: :: :: :: :: ::
                  `}
                  {service.visualType === 'sphere' && `
      . - = + # + = - .
    - = + # % % % # + = -
  + # % % @ @ @ @ % % # +
    - = + # % % % # + = -
      . - = + # + = - .
                  `}
                </div>
              </div>
            </div>

            {/* Bottom Content with Hairline Separator */}
            <div className="pt-6 border-t border-white/10 mt-auto">
              {/* Title */}
              <h3 className="font-mono font-bold text-base sm:text-lg md:text-xl text-white tracking-wide uppercase mb-3 group-hover:text-[#ff4f00] transition-colors">
                {t(service.titlePt, service.titleEn)}
              </h3>

              {/* Description */}
              <p className="font-serif text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                {t(service.descPt, service.descEn)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


