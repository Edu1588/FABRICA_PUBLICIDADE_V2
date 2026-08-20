const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const target = code.match(/\{slide\.type === 'veiculo' \? `\$\{slide\.fabricante\} \$\{slide\.modelo\}` : slide\.type === 'final' \? 'Layout Final' : slide\.descricao\}\s*<\/p>\s*<\/div>\s*<\/div>\s*\)\)}\s*<\/div>\s*<\/div>/g);

if (target && target.length > 0) {
  code = code.replace(target[0], target[0].replace('))}', `);
                          if (isFinal) {
                            return (
                              <React.Fragment key={slide.id}>
                                <div
                                  onClick={() => handleAddSlide('veiculo')}
                                  className="bg-[#111116] border border-dashed border-[#C46A1A]/30 hover:border-[#C46A1A] rounded-xl p-4 cursor-pointer transition-all hover:bg-[#C46A1A]/5 flex flex-col items-center justify-center min-h-[120px] group w-[140px] shrink-0"
                                >
                                  <div className="w-8 h-8 rounded-full bg-[#18120e] flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform mb-2">
                                    <Plus className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-outfit uppercase tracking-widest text-[#FF7A00] font-bold">
                                    + Veículo
                                  </span>
                                </div>
                                {cardNode}
                              </React.Fragment>
                            );
                          }
                          return cardNode;
                        }`));
  fs.writeFileSync('src/pages/Admin.tsx', code);
  console.log("Patched successfully");
} else {
  console.log("Target not found");
}
