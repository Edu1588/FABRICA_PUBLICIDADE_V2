const fs = require('fs');

function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /if \(s\.type === 'capa'\) \{\s*return \{\s*\.\.\.s,\s*imageUrl:/,
    `if (s.type === 'capa') {\n              return {\n                ...s,\n                modelo: data.data.modelo || '',\n                descricao: data.data.descricao || '',\n                imageUrl:`
  );
  fs.writeFileSync(file, code);
}

patch('src/pages/Admin.tsx');
patch('src/pages/Outgrid.tsx');
