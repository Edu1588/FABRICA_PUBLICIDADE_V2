const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const match = code.match(/\{selectedClientData\?.name\?.toLowerCase\(\)\.includes\('unimais'\) \? \(\s*<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">\s*\{\/\* Option: Design \*\/\}[\s\S]*?\{\/\* Option: Card Carrosseis \*\/\}[\s\S]*?<\/div>\s*\)\s*:\s*\(\s*<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">\s*\{\/\* Option: Design \*\/\}[\s\S]*?<\/div>\s*\)/);

if (match) {
  const replacement = `{selectedClientData?.name?.toLowerCase().includes('unimais') ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Option: Card Carrosseis */}
                      <div 
                        onClick={() => setShowCarrosseis(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-admin-heading)' }}>
                          Card Carrosseis
                        </h4>
                        
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Selecione entre o Carrossel Destaque e o Carrossel Ofertas para realizar as edições.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Carrosseis</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option: Design */}
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
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Option: Design */}
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
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  )}`;
  code = code.replace(match[0], replacement);
  fs.writeFileSync('src/pages/Admin.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Match not found");
}
