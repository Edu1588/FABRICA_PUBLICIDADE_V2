const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(
  /<\/div>\s*<\/>\s*\)\}\s*\{\/\* Slide Type Switcher \*\/\}/g,
  '</div>\n                          </>\n                        {/* Slide Type Switcher */}'
);

fs.writeFileSync('src/pages/Admin.tsx', code);
fs.writeFileSync('src/pages/Outgrid.tsx', code);
