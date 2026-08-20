const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const toMove = ['esbuild', 'tsx', 'typescript', 'tailwindcss', '@types/node', '@types/express'];

for (const dep of toMove) {
  if (pkg.devDependencies && pkg.devDependencies[dep]) {
    pkg.dependencies[dep] = pkg.devDependencies[dep];
    delete pkg.devDependencies[dep];
  }
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
