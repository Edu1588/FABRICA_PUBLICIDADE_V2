const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// Replace handleScrape hardcoded urls
code = code.replace(
  /imageUrl: 'https:\/\/res\.cloudinary\.com\/djw0tqmiw\/image\/upload\/v1783524054\/ze7bf5yd9ozh3tsccopb\.png',/g,
  `imageUrl: selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png',`
);

code = code.replace(
  /imageUrl: 'https:\/\/res\.cloudinary\.com\/djw0tqmiw\/image\/upload\/v1783274796\/rhd5ngpu9rhntpkqeh7v\.png',/g,
  `imageUrl: selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png',`
);

// Replace Capa Rendering
code = code.replace(
  /src=\{activeSlide\.imageUrl \|\| "https:\/\/res\.cloudinary\.com\/djw0tqmiw\/image\/upload\/v1783524054\/ze7bf5yd9ozh3tsccopb\.png"\}/g,
  `src={activeSlide.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png" : "https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png")}`
);

// Replace Final Rendering
code = code.replace(
  /src=\{activeSlide\.imageUrl \|\| "https:\/\/res\.cloudinary\.com\/djw0tqmiw\/image\/upload\/v1783274796\/rhd5ngpu9rhntpkqeh7v\.png"\}/g,
  `src={activeSlide.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png" : "https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png")}`
);

// Replace Veiculo PNG OVERLAY Rendering
code = code.replace(
  /src="https:\/\/res\.cloudinary\.com\/djw0tqmiw\/image\/upload\/v1784051477\/ox5x9ezq4stcwbocpbdg\.png"/g,
  `src={selectedClientData?.name?.toLowerCase().includes('meta') ? "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/fiowzjsmie0jn35bn49h.png" : "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784051477/ox5x9ezq4stcwbocpbdg.png"}`
);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("URLs made dynamic for Meta");
