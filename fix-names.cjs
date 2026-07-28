const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

code = code.replace(/toLowerCase\(\)\.replace\(\/\[\^a-z0-9\]\/g, ''\)/g, 'normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "")');
code = code.replace(/placa = vehicleSlideRef\.title\.split\('_'\)\[0\]\.toLowerCase\(\);/g, "placa = vehicleSlideRef.title.split('_')[0].toUpperCase();");
code = code.replace(/placa = vehicleSlide\.title\.split\('_'\)\[0\]\.toLowerCase\(\);/g, "placa = vehicleSlide.title.split('_')[0].toUpperCase();");

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed names");
