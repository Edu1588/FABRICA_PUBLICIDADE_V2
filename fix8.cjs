const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/  const fs = require\("fs"\);\n/g, '');

fs.writeFileSync('server.ts', code);
