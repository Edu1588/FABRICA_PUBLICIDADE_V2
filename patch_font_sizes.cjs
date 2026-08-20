const fs = require('fs');
function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/fontSize: '28px'/g, "fontSize: '20px'");
  code = code.replace(/fontSize: '14px'/g, "fontSize: '8px'");
  fs.writeFileSync(file, code);
}
patch('src/pages/Admin.tsx');
patch('src/pages/Outgrid.tsx');
