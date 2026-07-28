const fs = require('fs');
const path = './src/pages/ApresentacaoFabricaAzul.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  `        return JSON.parse(saved);`,
  `        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else {
          return SLIDES_DATA;
        }`
);
fs.writeFileSync(path, content, 'utf8');
