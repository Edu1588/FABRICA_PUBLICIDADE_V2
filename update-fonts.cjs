const fs = require('fs');

function updateFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/font-mono/g, 'font-outfit');
  code = code.replace(/font-serif/g, 'font-outfit');
  code = code.replace(/font-sans/g, 'font-outfit');
  code = code.replace(/var\(--font-admin-heading\)/g, 'var(--font-outfit)');
  fs.writeFileSync(file, code);
  console.log("Updated " + file);
}

updateFile('src/pages/Admin.tsx');
updateFile('src/pages/Outgrid.tsx');
