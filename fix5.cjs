const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/const dataPath = path\.join\(process\.cwd\(\), "data", "analytics\.json"\);/g, 'const dataPath = process.cwd() + "/data/analytics.json";');

fs.writeFileSync('server.ts', code);
