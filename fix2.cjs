const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/return res.status\(500\).json\(\{ error: "Failed to track" \}\);/g, 'return res.status(500).json({ error: "Failed to track", details: err.message, stack: err.stack });');

fs.writeFileSync('server.ts', code);
