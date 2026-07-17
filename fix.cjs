const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/import express from \\"express\\";/, 'import express from "express";\nimport fs from "fs";');
code = code.replace(/require\(\\"path\\"\)\.join/g, 'path.join');

fs.writeFileSync('server.ts', code);
