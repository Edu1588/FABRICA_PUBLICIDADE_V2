import re

path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

# We need to insert the rendering block for slide 13 (site_performance)
speed_block = r'''
          {/* ==================== SLIDE 13: PERFORMANCE DO SITE ==================== */}
          {(slide.id === 13 || slide.layoutType === 'site_performance') && (
            <div className="w-full h-full bg-gray-50 text-slate-900 flex flex-col justify-between relative p-8 md:p-14 pb-20">
              <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                13 / Performance do Site
              </div>

              <motion.div variants={containerVariants} initial="hidden" animate="animate" className="my-auto w-full">
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <motion.h1 variants={itemVariants} className="text-2xl sm:text-4xl font-extrabold text-[#0a1c6a] uppercase tracking-tight font-display mb-4">
                    A Importância da <span className="text-cyan-600">Velocidade</span> do Site
                  </motion.h1>
                  <motion.p variants={itemVariants} className="text-sm md:text-base text-gray-600 font-sans">
                    Um site rápido converte mais. Compare a experiência de um site lento com a performance de um site otimizado (Nota A no PageSpeed).
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl mx-auto">
                  {/* Site Lento */}
                  <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-red-200 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Site Lento</h3>
                      </div>
                      <div className="text-3xl font-black text-red-500 tracking-tighter">45<span className="text-sm font-normal text-red-300">/100</span></div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Tempo de Carregamento</span>
                        <span className="text-red-500 font-bold">8.5s</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Taxa de Rejeição</span>
                        <span className="text-red-500 font-bold">68%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                      <h4 className="text-red-600 font-bold text-sm mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Impacto Negativo
                      </h4>
                      <ul className="text-gray-700 text-xs space-y-2 font-sans">
                        <li>• Perda de posições no Google (SEO)</li>
                        <li>• Alto custo por clique em campanhas</li>
                        <li>• Frustração do usuário e abandono</li>
                      </ul>
                    </div>
                  </motion.div>

                  {/* Site Rápido (Nota A) */}
                  <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
                    
                    <div className="flex items-center justify-between mb-6 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Site Nota A</h3>
                      </div>
                      <div className="text-3xl font-black text-emerald-500 tracking-tighter">98<span className="text-sm font-normal text-emerald-300">/100</span></div>
                    </div>
                    
                    <div className="space-y-4 mb-8 relative">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Tempo de Carregamento</span>
                        <span className="text-emerald-500 font-bold">1.2s</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '12%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Taxa de Rejeição</span>
                        <span className="text-emerald-500 font-bold">15%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: '15%' }}></div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 relative">
                      <h4 className="text-emerald-600 font-bold text-sm mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Impacto Positivo
                      </h4>
                      <ul className="text-gray-700 text-xs space-y-2 font-sans">
                        <li>• Melhor ranqueamento orgânico (SEO)</li>
                        <li>• Maior conversão de leads e vendas</li>
                        <li>• Experiência fluida e profissional</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="slide-footer-bar"><RenderSlideFooterContent text="13/16 - Fábrica Publicidade" /></div>
            </div>
          )}
'''

# Find a good place to insert it. E.g. right before SLIDE 13 / MARKETING DIGITAL, which is now slide 14, wait!
# In SlideRenderer, slide 13 was Marketing Digital, and slide 14 was Flexibilidade Operacional?
# Let's check where `slide.id === 13` was in SlideRenderer.
text = text.replace('{/* ==================== SLIDE 13: MARKETING DIGITAL ==================== */}', speed_block + '\n          {/* ==================== SLIDE 14: MARKETING DIGITAL ==================== */}')

# Now we need to fix the old hardcoded slide IDs!
# Old Slide 13 -> 14, 14 -> 15, 15 -> 16
# We need to be careful with string replacements.

text = text.replace('slide.id === 13 && (', 'slide.id === 14 && (')
text = text.replace('13 / Marketing Digital', '14 / Ativações Futuras') # Actually it's just digital marketing. But wait, in slidesData, slide 14 is "Recursos Prontos para Ativação"! But in SlideRenderer it was hardcoded as "MARKETING DIGITAL". This is getting messy. Let's just change the renderer ID to match what makes sense.

text = text.replace('slide.id === 14 && (', 'slide.id === 15 && (')
text = text.replace('14 / Flexibilidade Operacional', '15 / Flexibilidade Operacional')

text = text.replace('slide.id === 15 && (', 'slide.id === 16 && (')
text = text.replace('15 / Síntese', '16 / Síntese')

with open(path, 'w') as f:
    f.write(text)

