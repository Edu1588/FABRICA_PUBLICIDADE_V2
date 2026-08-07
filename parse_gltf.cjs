const fs = require('fs');
const buffer = fs.readFileSync('public/models/HEFESTO_FABRICA.glb');
const str = buffer.toString('utf8');
const matches = str.match(/"name":"([^"]+)"/g);
console.log([...new Set(matches)]);
