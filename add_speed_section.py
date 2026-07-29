import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

new_section = r'''
      {/* ================= SECTION: PERFORMANCE DO SITE ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display mb-4">
            A Importância da <span className="text-cyan-400">Velocidade</span> do Site
          </h2>
          <p className="text-base text-slate-300 font-sans">
            Um site rápido converte mais. Compare a experiência de um site lento com a performance de um site otimizado (Nota A no PageSpeed).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Site Lento */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-8 border border-red-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Site Lento</h3>
              </div>
              <div className="text-3xl font-black text-red-500 tracking-tighter">45<span className="text-sm font-normal text-red-400">/100</span></div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tempo de Carregamento</span>
                <span className="text-red-400 font-bold">8.5s</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Taxa de Rejeição</span>
                <span className="text-red-400 font-bold">68%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
              <h4 className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Impacto Negativo
              </h4>
              <ul className="text-slate-300 text-xs space-y-2 font-sans">
                <li>• Perda de posições no Google (SEO)</li>
                <li>• Alto custo por clique em campanhas</li>
                <li>• Frustração do usuário e abandono</li>
              </ul>
            </div>
          </div>

          {/* Site Rápido (Nota A) */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white">Site Nota A</h3>
              </div>
              <div className="text-3xl font-black text-emerald-400 tracking-tighter">98<span className="text-sm font-normal text-emerald-500/70">/100</span></div>
            </div>
            
            <div className="space-y-4 mb-8 relative">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tempo de Carregamento</span>
                <span className="text-emerald-400 font-bold">1.2s</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '12%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Taxa de Rejeição</span>
                <span className="text-emerald-400 font-bold">15%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 relative">
              <h4 className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Impacto Positivo
              </h4>
              <ul className="text-slate-300 text-xs space-y-2 font-sans">
                <li>• Melhor ranqueamento orgânico (SEO)</li>
                <li>• Maior conversão de leads e vendas</li>
                <li>• Experiência fluida e profissional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
'''

text = text.replace(
    '      {/* ================= SECTION: CANAIS DO ECOSSISTEMA DIGITAL COM LOGOS E ÍCONES (SLIDES 13 & 14) ================= */}',
    new_section + '\n      {/* ================= SECTION: CANAIS DO ECOSSISTEMA DIGITAL COM LOGOS E ÍCONES (SLIDES 13 & 14) ================= */}'
)

with open(path, 'w') as f:
    f.write(text)
