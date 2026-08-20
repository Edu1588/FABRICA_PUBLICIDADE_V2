const fs = require('fs');

function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Update handleAddSlide to properly assign imageUrl
  code = code.replace(
    /imageUrl: '',\s+zoom: 1,/,
    `imageUrl: type === 'capa' ? (baseSlide?.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787242854/capaAZUL.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png')) : type === 'final' ? (baseSlide?.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787244531/finalAzul.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png')) : '',\n      zoom: 1,`
  );
  
  // Add useEffect to override default URLs when selectedClientData changes
  const useEffectCode = `
  // Automatically update default images when changing clients
  useEffect(() => {
    if (!selectedClientData) return;
    
    const defaultCapaUrls = [
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787242854/capaAZUL.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png'
    ];
    
    const defaultFinalUrls = [
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787244531/finalAzul.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png'
    ];
    
    const targetCapaUrl = selectedClientData?.name?.toLowerCase().includes('meta') ? defaultCapaUrls[1] : selectedClientData?.name?.toLowerCase().includes('azul') ? defaultCapaUrls[0] : defaultCapaUrls[2];
    const targetFinalUrl = selectedClientData?.name?.toLowerCase().includes('meta') ? defaultFinalUrls[1] : selectedClientData?.name?.toLowerCase().includes('azul') ? defaultFinalUrls[0] : defaultFinalUrls[2];
    const targetWebsite = selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'AZULVEICULOS.COM.BR' : 'unimaisveiculos.com.br';

    let hasChanges = false;
    const newSlides = slides.map(s => {
      if (s.type === 'capa') {
        if (!s.imageUrl || defaultCapaUrls.includes(s.imageUrl) || s.imageUrl !== targetCapaUrl) {
           hasChanges = true;
           return { ...s, imageUrl: targetCapaUrl, website: targetWebsite };
        }
      }
      if (s.type === 'final') {
        if (!s.imageUrl || defaultFinalUrls.includes(s.imageUrl) || s.imageUrl !== targetFinalUrl) {
           hasChanges = true;
           return { ...s, imageUrl: targetFinalUrl, website: targetWebsite };
        }
      }
      return s;
    });
    
    if (hasChanges) {
      setSlides(newSlides);
    }
  }, [selectedClientId, selectedClientData]);
  `;
  
  if (!code.includes('defaultCapaUrls')) {
    code = code.replace(
      /const \[dragStart, setDragStart\] = useState\(\{ x: 0, y: 0 \}\);/,
      `const [dragStart, setDragStart] = useState({ x: 0, y: 0 });\n${useEffectCode}`
    );
  }
  
  fs.writeFileSync(file, code);
}

patch('src/pages/Admin.tsx');
