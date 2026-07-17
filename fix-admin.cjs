const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const regex = /<div className=\{`\$\{theme === 'light' \? 'theme-light' : ''\} min-h-screen bg-\[#07070a\] text-\[#F5F2EC\] flex flex-col selection:bg-\[#C46A1A\]\/40">/;
const replacement = `<div className={\`\${theme === 'light' ? 'theme-light' : ''} min-h-screen bg-[#07070a] text-[#F5F2EC] flex flex-col selection:bg-[#C46A1A]/40\`}>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed syntax");
