import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Section4V2() {
  const { t } = useLanguage();

  const metrics = [
    { value: '+160', labelPt: 'Stories Produzidos / Mês', labelEn: 'Monthly Stories Created' },
    { value: '+70', labelPt: 'Peças de Feed & Design', labelEn: 'Feed & Design Assets' },
    { value: '+16', labelPt: 'Produções de Reels 4K', labelEn: '4K Reels Productions' },
    { value: '+60', labelPt: 'Anúncios Ativos & Tráfego', labelEn: 'Active Ads & Traffic' },
    { value: '3.4x', labelPt: 'Aumento de Retorno (ROAS)', labelEn: 'ROAS Conversion Lift' },
    { value: '8+', labelPt: 'Anos Forjando Soluções', labelEn: 'Years Forging Value' },
  ];

  return (
    <section id="metrics" className="relative py-32 px-6 md:px-16 border-t border-white/10 z-10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto w-full">
        {/* Dragonfly Header Badge */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#ff4f00] font-mono text-sm font-bold tracking-widest bg-[#ff4f00]/10 border border-[#ff4f00]/30 px-3 py-1 rounded-full">
            03 METRICS
          </span>
          <span className="text-white/30 font-mono text-xs tracking-widest uppercase">
            [ SÍNTESE DE RESULTADOS ]
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((m, idx) => (
            <div 
              key={idx}
              className="bg-[#0a0a0a] border border-white/10 hover:border-[#ff4f00] p-6 md:p-8 rounded-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mono text-white group-hover:text-[#ff4f00] transition-colors mb-4">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-mono text-white/60 group-hover:text-white uppercase tracking-wider">
                {t(m.labelPt, m.labelEn)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

