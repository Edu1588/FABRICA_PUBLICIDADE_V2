const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const oldCode = `<span className="text-[9px] font-mono bg-white/10 text-white/70 px-2 py-0.5 rounded uppercase tracking-wider">
                        Ativo
                      </span>`;

const newCode = `<div className="flex justify-between items-start">
                        <span className="text-[9px] font-mono bg-white/10 text-white/70 px-2 py-0.5 rounded uppercase tracking-wider">
                          Ativo
                        </span>
                        {client.logoUrl && (
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                            <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain p-1.5" />
                          </div>
                        )}
                      </div>`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Card updated");
