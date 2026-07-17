const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/require\("path"\).join/g, 'path.join');
// Remove any duplicate if I did it wrong before

fs.writeFileSync('server.ts', code);
