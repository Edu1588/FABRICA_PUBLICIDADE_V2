import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

# Replace the whole Projetos section with the new design + 3 projects.
projects_section_pattern = r'\{\/\* ================= SECTION: PROJETOS EM DESTAQUE ================= \*\/\}.*?\{\/\* ================= SECTION: EMPRESA \(QUEM SOMOS NÓS\) ================= \*\/\}'

new_projects_section = '''{/* ================= SECTION: PROJETOS EM DESTAQUE ================= */}
      <section id="projetos" className="py-32 relative bg-[#030303] overflow-hidden">
        
        {/* Header matching screenshot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex relative z-10 mb-24">
          
          {/* Vertical Text */}
          <div className="hidden md:flex w-24 shrink-0 items-start pt-8">
            <div className="text-white/90 tracking-[0.4em] text-sm uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Cormorant Garamond', serif" }}>
              Projetos
            </div>
          </div>

          {/* Title & Description */}
          <div className="flex-1 max-w-3xl pl-4 md:pl-0">
            <h2 className="text-5xl md:text-7xl text-white mb-10 leading-[1.1] font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              O Nosso Legado<br/>Em Construção
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Cada projeto é uma prova da nossa dedicação à excelência e à visão. Nós não apenas construímos; nós forjamos experiências digitais que ressoam com propósito e precisão.
            </p>
            
            <div className="flex items-center gap-6 group cursor-pointer w-max">
              <div className="w-16 h-[1px] bg-white group-hover:w-24 transition-all duration-300"></div>
              <span className="text-white/80 text-[10px] uppercase tracking-[0.2em] font-semibold">
                Explorar Tudo
              </span>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
          {/* Projeto 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-3/5 rounded-[2rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                alt="Feirão de Aniversário" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="text-white/40 text-sm uppercase tracking-widest font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                01 — Campanha Promocional
              </div>
              <h3 className="text-4xl text-white font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Feirão de Aniversário
              </h3>
              <p className="text-slate-400 font-sans leading-relaxed text-sm">
                Desenvolvimento completo do Key Visual para a principal data comercial do ano. A campanha englobou desde o enxoval completo de PDV até a forte presença digital com tráfego pago focado em conversão.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 mt-8">
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>+45%</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Vendas</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>120</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Leads/Dia</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projeto 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-3/5 rounded-[2rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                alt="Seminovos Premium" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="text-white/40 text-sm uppercase tracking-widest font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                02 — Posicionamento
              </div>
              <h3 className="text-4xl text-white font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Linha Seminovos Premium
              </h3>
              <p className="text-slate-400 font-sans leading-relaxed text-sm">
                Estratégia focada no catálogo de veículos de alto padrão. Adotamos uma direção de arte minimalista, evidenciando o design e a exclusividade dos carros para um público premium.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 mt-8">
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>+200%</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">ROI</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>3x</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Ticket Médio</div>
                </div>
              </div>
            </div>
          </div>

          {/* Projeto 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-3/5 rounded-[2rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1469285994282-454ceb49e63c?auto=format&fit=crop&q=80&w=1200" 
                alt="Ecosistema Digital" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="text-white/40 text-sm uppercase tracking-widest font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                03 — Integração Web
              </div>
              <h3 className="text-4xl text-white font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Ecossistema AutoAvaliar
              </h3>
              <p className="text-slate-400 font-sans leading-relaxed text-sm">
                Integração completa da plataforma de vendas com o sistema interno de avaliação, garantindo sincronização em tempo real do estoque e uma jornada de compra 100% digital e sem atritos.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 mt-8">
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>10m</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Sync Time</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Zero</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest">Downtime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: EMPRESA (QUEM SOMOS NÓS) ================= */}'''

text = re.sub(projects_section_pattern, new_projects_section, text, flags=re.DOTALL)
with open(path, 'w') as f:
    f.write(text)

