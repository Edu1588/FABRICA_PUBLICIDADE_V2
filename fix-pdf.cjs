const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(/fileFriendlyTitle = vehicleSlide\.title\.toLowerCase\(\)/g, "fileFriendlyTitle = vehicleSlide.title.toUpperCase()");
code = code.replace(/\.replace\(\/\[\^a-z0-9\]\+\/g, '_'\)/g, ".replace(/[^a-zA-Z0-9]+/g, '_')");
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed pdf title");
