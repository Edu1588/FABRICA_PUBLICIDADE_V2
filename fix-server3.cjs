const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/const normalizedSearch = search\.toUpperCase\(\)\.replace\(\/\[\^A-Z0-9\]\/g, ''\);\s*if \(normalizedSearch === 'GAP4D01'\) \{/g, `if (normalizedSearch === 'GAP4D01') {`);

fs.writeFileSync('server.ts', code);
console.log("server.ts fixed again");
