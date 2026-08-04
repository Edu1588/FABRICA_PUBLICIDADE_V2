import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Section5V2() {
  const { t } = useLanguage();

  const cases = [
    {
      num: '01',
      brand: 'AZUL VEÍCULOS',
      category: 'CAMPANHA INSTITUCIONAL & TRÁFEGO PAGO',
      year: '2026',
      link: '/apresentacao-azul',
      highlight: true
    },
    {
      num: '02',
      brand: 'AUTOAVALIAR',
      category: 'ECOSSISTEMA B2B & PLATAFORMAS',
      year: '2025',
      link: '#',
      highlight: false
    },
    {
      num: '03',
      brand: 'SEMINOVOS PREMIUM',
      category: 'BRANDING & MÍDIA DE ALTA CONVERSÃO',
      year: '2025',
      link: '#',
      highlight: false
    },
  ];

  return (
    <section id="cases" className="relative py-32 px-6 md:px-16 border-t border-white/10 z-10 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto w-full">
        {/* Dragonfly Header Badge */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#ff4f00] font-mono text-sm font-bold tracking-widest bg-[#ff4f00]/10 border border-[#ff4f00]/30 px-3 py-1 rounded-full">
            04 CASES
          </span>
          <span className="text-white/30 font-mono text-xs tracking-widest uppercase">
            [ PORTFÓLIO & PARCERIAS DE IMPACTO ]
          </span>
        </div>

        {/* List Rows */}
        <div className="flex flex-col border-b border-white/10">
          {cases.map((c, idx) => (
            <Link
              key={idx}
              to={c.link}
              className={`group py-8 md:py-12 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 ${
                c.highlight ? 'hover:bg-[#ff4f00]/10 px-4 -mx-4 rounded-xl' : 'hover:bg-white/5 px-4 -mx-4 rounded-xl'
              }`}
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-sm text-[#ff4f00] font-bold">
                  {c.num}
                </span>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono text-white group-hover:text-[#ff4f00] transition-colors tracking-tight">
                  {c.brand}
                </h3>
              </div>

              <div className="flex items-center gap-8 font-mono text-xs text-white/50 group-hover:text-white/90">
                <span className="hidden sm:inline-block tracking-widest uppercase">
                  {c.category}
                </span>
                <span className="text-[#ff4f00] font-bold">{c.year}</span>
                <span className="text-lg group-hover:translate-x-2 transition-transform text-[#ff4f00]">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

