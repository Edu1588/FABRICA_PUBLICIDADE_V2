const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(/className="w-16 h-16 rounded-lg bg-white border border-white\/10 flex items-center justify-center overflow-hidden shadow-sm"/g, 'className="w-24 h-24 rounded-lg bg-white border border-white/10 flex items-center justify-center overflow-hidden shadow-sm"');
code = code.replace(/<img src={selectedClientData.logoUrl} alt="Logo Cliente" className="w-12 h-12 rounded-xl object-contain bg-white\/5 p-1" \/>/g, '<img src={selectedClientData.logoUrl} alt="Logo Cliente" className="w-20 h-20 rounded-xl object-contain bg-white p-2" />');
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed thumb");
