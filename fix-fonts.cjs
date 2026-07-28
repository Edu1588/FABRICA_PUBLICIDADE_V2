const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace("family=Inter:wght@300;400;500;600", "family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800;900");
css = css.replace('--font-admin-heading: "Barlow Condensed"', '--font-outfit: "Outfit", ui-sans-serif, system-ui, sans-serif;\n  --font-admin-heading: "Barlow Condensed"');
fs.writeFileSync('src/index.css', css);
console.log("Updated index.css");
