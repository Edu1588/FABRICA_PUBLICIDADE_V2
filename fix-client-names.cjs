const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const getClientNameSafe = "const clientNameSafe = selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais';";

// Replace title setting in handleScrape
code = code.replace(/title: \`\$\{scrapeQuery.toUpperCase\(\)\.replace\(\/\[\^A-Z0-9\]\/g, ''\)\}_carrossel_unimais\`/g, 
  `title: \`\${scrapeQuery.toUpperCase().replace(/[^A-Z0-9]/g, '')}_carrossel_\${selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais'}\``);

// Replace ZIP export filename
code = code.replace(/const filename = \`\$\{placa\}_carrossel_unimais_\$\{paddedIndex\}\.png\`;/g,
  `const clientNameSafe = selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais';\n            const filename = \`\${placa}_carrossel_\${clientNameSafe}_\${paddedIndex}.png\`;`);

code = code.replace(/saveAs\(content, \`\$\{placa\}_carrossel_unimais\.zip\`\);/g,
  `saveAs(content, \`\${placa}_carrossel_\${selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais'}.zip\`);`);

// Replace PDF export filename
code = code.replace(/\.replace\(\/_carrossel_unimais\/g, ''\)/g,
  `.replace(new RegExp(\`_carrossel_\${selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais'}\`, 'g'), '')`);

code = code.replace(/\.replace\(\/unimais_carrossel_\/g, ''\)/g,
  `.replace(new RegExp(\`\${selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais'}_carrossel_\`, 'g'), '')`);

code = code.replace(/pdf\.save\(\`unimais_carrossel_\$\{fileFriendlyTitle\}\.pdf\`\);/g,
  `pdf.save(\`\${selectedClientData?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'unimais'}_carrossel_\${fileFriendlyTitle}.pdf\`);`);

// Website fallback
code = code.replace(/<span>\{activeSlide\.website \|\| 'UNIMAISVEICULOS\.COM\.BR'\}<\/span>/g,
  `<span>{activeSlide.website || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : 'UNIMAISVEICULOS.COM.BR')}</span>`);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Client names made dynamic");
