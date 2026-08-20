const fs = require('fs');

function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /\{activeSlide\.type === 'capa' \? \(\s*\/\/\s*COVER SLIDE EDITABLES\s*<div className="space-y-4 pt-2 border-t border-white\/5 text-center text-white\/50 text-xs font-outfit">\s*A Capa utiliza apenas configuração de imagem.\s*<\/div>\s*\) : activeSlide\.type === 'veiculo' \? \(/,
    `{activeSlide.type === 'capa' ? (
                          // COVER SLIDE EDITABLES
                          <div className="space-y-4 pt-2 border-t border-white/5">
                            <span className="text-[10px] text-[#C46A1A] uppercase tracking-wider block mt-4">Campos da Capa (Preenchidos pela placa)</span>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Modelo (ex: Fastback)</label>
                                <input
                                  type="text"
                                  value={activeSlide.modelo || ''}
                                  onChange={e => updateActiveSlideField('modelo', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Detalhes (ex: 1.3 TURBO)</label>
                                <input
                                  type="text"
                                  value={activeSlide.descricao || ''}
                                  onChange={e => updateActiveSlideField('descricao', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        ) : activeSlide.type === 'veiculo' ? (`
  );
  fs.writeFileSync(file, code);
}

patch('src/pages/Admin.tsx');
patch('src/pages/Outgrid.tsx');
