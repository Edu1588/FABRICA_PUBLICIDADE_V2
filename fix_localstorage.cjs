const fs = require('fs');
const path = './src/pages/ApresentacaoFabricaAzul.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  `    const saved = localStorage.getItem('azul_slides_data_v2');`,
  `    let saved = null;
    try {
      saved = localStorage.getItem('azul_slides_data_v2');
    } catch (err) {
      console.warn('localStorage is not accessible');
    }`
);
content = content.replace(
  `    localStorage.setItem('azul_slides_data_v2', JSON.stringify(slides));`,
  `    try {
      localStorage.setItem('azul_slides_data_v2', JSON.stringify(slides));
    } catch (err) {
      console.warn('localStorage is not accessible');
    }`
);
fs.writeFileSync(path, content, 'utf8');
