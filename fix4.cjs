const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/path(?:2)?\.join\(process\.cwd\(\), \\"data\\", \\"analytics.json\\"\)/g, 'process.cwd() + "/data/analytics.json"');

fs.writeFileSync('server.ts', code);
