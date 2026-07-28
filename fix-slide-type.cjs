const fs = require('fs');

function updateFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/prevSlides\[activeSlideIndex\]\.type/g, 'prevSlides[activeSlideIndex]?.type');
  fs.writeFileSync(file, code);
  console.log("Updated " + file);
}

updateFile('src/pages/Admin.tsx');
updateFile('src/pages/Outgrid.tsx');
