const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/  app.post\("\/api\/track"/, '  const fs = require("fs");\n  app.post("/api/track"');

fs.writeFileSync('server.ts', code);
