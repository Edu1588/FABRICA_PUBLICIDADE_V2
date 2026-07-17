const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const brokenStr = "{activeSlide.type === 'veiculo' {activeSlide.type === 'veiculo' && !selectedClientData?.name?.toLowerCase().includes('meta') && ({activeSlide.type === 'veiculo' && !selectedClientData?.name?.toLowerCase().includes('meta') && ( (";
const correctStr = "{activeSlide.type === 'veiculo' && !selectedClientData?.name?.toLowerCase().includes('meta') && (";

code = code.replace(brokenStr, correctStr);

// I'll also check if there are other broken parts just in case
const allMatches = code.match(/\{activeSlide\.type === 'veiculo' \{activeSlide\.type/g);
if (allMatches) {
    console.log("Found more broken strings!");
}

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed 1612");
