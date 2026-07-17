const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const regexFinal = /src=\{activeSlide\.imageUrl \|\| \(selectedClientData\?\.name\?\.toLowerCase\(\)\.includes\('meta'\) \? "[^"]+" : "[^"]+"\)\}/;
const replaceFinal = `src={selectedClientData?.name?.toLowerCase().includes('meta') ? "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png" : (activeSlide.imageUrl || "https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png")}`;

code = code.replace(regexFinal, replaceFinal);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Admin.tsx updated for final layout");
