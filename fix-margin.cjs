const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// The original line: marginTop: '-8px',
// Let's replace it with conditional marginTop
code = code.replace(/marginTop: '-8px',/, `marginTop: selectedClientData?.name?.toLowerCase().includes('meta') ? '10px' : '-8px',`);

// Let's also check if "Importar Dados" has any other hiding logic.
// Earlier I did: {activeSlide.type === 'veiculo' && (
// Let's verify it is there.
const check = code.includes("{activeSlide.type === 'veiculo' && (");
if (!check) {
    console.log("Missing veiculo condition for Importar Dados");
}

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed margin");
