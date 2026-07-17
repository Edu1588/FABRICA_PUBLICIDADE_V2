const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const regexBg = /\{activeSlide\.imageUrl && \(/;
const replacementBg = `{(activeSlide.imageUrl && !activeSlide.imageUrl.includes('v1784237078/hnxtcxhrqr4ejekmfkea.png') && !activeSlide.imageUrl.includes('v1783524054/ze7bf5yd9ozh3tsccopb.png') && !activeSlide.imageUrl.includes('v1784237078/kokdbgwrmrj2h3pki9li.png') && !activeSlide.imageUrl.includes('v1783274796/rhd5ngpu9rhntpkqeh7v.png')) && (`;

// Only apply the replacement inside the Capa logic
// Actually, let's just make it precise.
code = code.replace(/\{activeSlide\.imageUrl && \(\s*<img\s*src=\{activeSlide\.imageUrl\}\s*alt="Carro Capa"/, `{(activeSlide.imageUrl && !activeSlide.imageUrl.includes('hnxtcxhrqr4ejekmfkea') && !activeSlide.imageUrl.includes('ze7bf5yd9ozh3tsccopb')) && (
                                    <img
                                      src={activeSlide.imageUrl}
                                      alt="Carro Capa"`);

// Reduce font size of fabricante
code = code.replace(/fontSize: selectedClientData\?\.name\?\.toLowerCase\(\)\.includes\('meta'\) \? '16px' : '24px'/g, `fontSize: selectedClientData?.name?.toLowerCase().includes('meta') ? '13px' : '24px'`);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Admin.tsx updated for capa bg and font size");
