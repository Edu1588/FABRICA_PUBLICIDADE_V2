const fs = require('fs');
function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  // Lower the text
  code = code.replace(/absolute top-1\/2 right-\[25px\] -translate-y-1\/2/, "absolute top-[58%] right-[25px] -translate-y-1/2");
  // Change font size
  code = code.replace(/fontSize: '20px'/g, "fontSize: '18px'");
  fs.writeFileSync(file, code);
}
patch('src/pages/Admin.tsx');
patch('src/pages/Outgrid.tsx');
