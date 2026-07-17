const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(/marginTop: selectedClientData\?\.name\?\.toLowerCase\(\)\.includes\('meta'\) \? '10px' : '-8px',/, `marginTop: selectedClientData?.name?.toLowerCase().includes('meta') ? '4px' : '-8px',`);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed margin");
