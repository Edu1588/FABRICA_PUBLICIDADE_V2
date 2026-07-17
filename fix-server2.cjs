const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /const \{ search, client \} = req\.body;/g,
  `const { search, client } = req.body;\n      if (!search) return res.status(400).json({ error: "Search term is required" });`
);

fs.writeFileSync('server.ts', code);
console.log("server.ts fixed");
