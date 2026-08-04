import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

new_sections = '''
      {/* ================= SECTION: PROJETOS EM DESTAQUE ================= */}
      <section id="projetos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            Projetos & <span className="text-cyan-400">Cases de Sucesso</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Campanhas reais desenvolvidas para impulsionar as vendas e o posicionamento da Azul Veículos.
          </p>
        </div>

        <div className="space-y-24">
          {/* Projeto 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group">
              <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                alt="Feirão de Aniversário" 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Campanha Promocional
              </div>
              <h3 className="text-3xl font-extrabold text-white font-display uppercase">
                Feirão de Aniversário Azul
              </h3>
              <p className="text-slate-300 font-sans leading-relaxed">
                Desenvolvimento completo do Key Visual para a principal data comercial do ano. A campanha englobou desde o enxoval completo de PDV (faixas, balões, adesivos) até a forte presença digital com tráfego pago focado em conversão e LPs dedicadas.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black text-white mb-1">+45%</div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Aumento em Vendas</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black text-white mb-1">120</div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Leads Qualificados/Dia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projeto 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 group">
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                alt="Seminovos Premium" 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-block bg-amber-900/30 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Posicionamento de Marca
              </div>
              <h3 className="text-3xl font-extrabold text-white font-display uppercase">
                Linha Seminovos Premium
              </h3>
              <p className="text-slate-300 font-sans leading-relaxed">
                Estratégia focada no catálogo de veículos de alto padrão. Adotamos uma direção de arte minimalista, evidenciando o design e a exclusividade dos carros. Segmentação de mídia hiper-direcionada para o público sênior no Facebook Ads e Rede de Pesquisa Google.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black text-white mb-1">+200%</div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Crescimento de ROI</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-3xl font-black text-white mb-1">3x</div>
                  <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Aumento no Ticket Médio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: EMPRESA (QUEM SOMOS NÓS) ================= */}
      <section id="empresa" className="relative w-full min-h-[600px] flex items-center justify-center my-12 bg-[#060a11]">
        {/* Dark Forest Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000" 
            alt="Forest Atmosphere" 
            className="w-full h-full object-cover opacity-30 grayscale sepia-[.2] hue-rotate-[190deg]"
          />
        </div>

        {/* Vertical Text Indicator */}
        <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="text-white/40 tracking-[0.3em] text-xs uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Cormorant Garamond', serif" }}>
            Company
          </div>
        </div>

        {/* Content Box */}
        <div className="relative z-20 w-full max-w-3xl mx-auto px-6 text-center py-24">
          <div className="mb-12 flex justify-center">
             {/* Simple elegant abstract mark */}
             <div className="flex flex-col items-center opacity-80">
                <div className="w-10 h-[2px] bg-white mb-1.5"></div>
                <div className="w-6 h-[2px] bg-white mb-1.5"></div>
                <div className="w-10 h-[2px] bg-white mb-4"></div>
                <div className="text-[10px] tracking-[0.2em] font-medium uppercase text-white/80" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Fábrica Publicidade
                </div>
             </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-12 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Quem nós somos
          </h2>
          
          <div className="space-y-8 text-white/70 text-lg md:text-xl leading-loose" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <p>
              Não importa como o mercado automotivo mude, o que verdadeiramente impulsiona os resultados permanece o mesmo. Na Fábrica Publicidade, nutrimos o crescimento das marcas através da estratégia, moldamos a percepção diária por meio do design e guiamos a conversão através da inteligência de dados.
            </p>
            <p>
              Através de campanhas físicas e plataformas digitais, carregamos um jeito de ser — enraizado na excelência técnica e silenciosamente eficaz — onde o verdadeiro potencial de vendas da Azul Veículos encontra o espaço perfeito para se desdobrar.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION: SÍNTESE & METRICAS (SLIDES 18, 19 & 20) ================= */}
'''

text = text.replace('{/* ================= SECTION: SÍNTESE & METRICAS (SLIDES 18, 19 & 20) ================= */}', new_sections)

with open(path, 'w') as f:
    f.write(text)

