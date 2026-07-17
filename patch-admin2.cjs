const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// Update setShowCarrosseis(false) in navigation - wait, I already tried that. Let's see if they have setShowDesign(false).
if (!code.includes('setShowDesign(false)')) {
  code = code.replace(/setShowCarrosseis\(false\);/g, "setShowCarrosseis(false);\n                    setShowDesign(false);");
}

const carrosselOptionStr = `                      {/* Option: Card Carrosseis */}`;
const newOptionStr = `                      {/* Option: Design */}
                      <div 
                        onClick={() => setShowDesign(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-admin-heading)' }}>
                          Design & Brandbook
                        </h4>
                        <p className="text-xs text-white/50 font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      
                      {/* Option: Card Carrosseis */}`;

if (!code.includes('Acessar Design')) {
  code = code.replace(carrosselOptionStr, newOptionStr);
}

const step3Str = `            {/* STEP 3.1: Carrosseis Menu Options */}`;
const step3NewStr = `            {/* STEP 3.2: Design */}
            {activeTab === 'clientes' && selectedClientId && showDesign && (
              <div className="space-y-6">
                <button 
                  onClick={() => setShowDesign(false)}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para opções de {selectedClientData?.name || 'Cliente'}
                </button>
                <DesignBrandbook client={selectedClientData!} />
              </div>
            )}

            {/* STEP 3.1: Carrosseis Menu Options */}`;

if (!code.includes('STEP 3.2: Design')) {
  code = code.replace(step3Str, step3NewStr);
}

fs.writeFileSync('src/pages/Admin.tsx', code);
