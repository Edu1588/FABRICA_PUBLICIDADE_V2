const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/import express from "express";/g, 'import express from "express";\nimport * as fs from "fs";');

fs.writeFileSync('server.ts', code);
