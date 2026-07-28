const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(/, 'g'\), ''\)/g, ", 'gi'), '')");

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed pdf regexp");
