import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Section6V2() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 border-t border-white/10 z-10 bg-black backdrop-blur-md">
      <div className="max-w-7xl mx-auto w-full">
        {/* Dragonfly Header Badge */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[#ff4f00] font-mono text-sm font-bold tracking-widest bg-[#ff4f00]/10 border border-[#ff4f00]/30 px-3 py-1 rounded-full">
            05 CONTACT
          </span>
          <span className="text-white/30 font-mono text-xs tracking-widest uppercase">
            [ VAMOS TRANSFORMAR SUA MARCA ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mono text-white leading-tight tracking-tight mb-8">
              {t('PRONTO PARA LEVAR SUA CONCESSIONÁRIA AO PRÓXIMO NÍVEL?', 'READY TO ELEVATE YOUR AUTOMOTIVE BRAND TO THE NEXT LEVEL?')}
            </h2>
            <p className="text-base sm:text-lg font-mono text-white/60 max-w-2xl leading-relaxed">
              {t('Entre em contato com nossa equipe de especialistas. Vamos analisar seu posicionamento e construir um ecossistema de vendas sob medida.', 'Get in touch with our team of specialists. We will analyze your positioning and build a custom sales ecosystem.')}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 font-mono">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#ff4f00] hover:bg-[#ff4f00]/90 text-black font-bold py-5 px-8 rounded-2xl flex items-center justify-between text-base transition-all duration-300 shadow-lg shadow-[#ff4f00]/20"
            >
              <span>{t('FALAR NO WHATSAPP', 'TALK ON WHATSAPP')}</span>
              <span className="text-xl">→</span>
            </a>

            <a 
              href="mailto:contato@fabricapublicidade.com.br"
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-5 px-8 rounded-2xl flex items-center justify-between text-base transition-all duration-300"
            >
              <span>{t('ENVIAR E-MAIL', 'SEND EMAIL')}</span>
              <span className="text-xl">✉</span>
            </a>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} FÁBRICA PUBLICIDADE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span>SÃO PAULO</span>
            <span>•</span>
            <span>RIO DE JANEIRO</span>
            <span>•</span>
            <span>BRASÍLIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

