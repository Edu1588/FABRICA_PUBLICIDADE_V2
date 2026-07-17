const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(
  /fontSize: '24px', color: selectedClientData\?\.name\?\.toLowerCase\(\)\.includes\('meta'\) \? '#ffffff' : '#0377f9'/g,
  `fontSize: selectedClientData?.name?.toLowerCase().includes('meta') ? '16px' : '24px', color: selectedClientData?.name?.toLowerCase().includes('meta') ? '#ffffff' : '#0377f9'`
);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Admin.tsx updated font size");
