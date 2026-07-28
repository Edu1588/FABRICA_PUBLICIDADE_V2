const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const target = `      const newSlides = filteredSlides.map(s => {
        if (s.type === 'veiculo') {
          return {
            ...s,
            fabricante: '',
            modelo: '',
            descricao: '',
            title: 'NOVO VEÍCULO',
            condicao1Label: '', condicao1Val: '',
            condicao2Label: '', condicao2Val: '',
            condicao3Label: '', condicao3Val: '',
            condicao4Label: '', condicao4Val: '',
            imageUrl: '',
            zoom: 1,
            posX: 0,
            posY: 0
          };
        }
        return s;
      });`;

const replace = `      const newSlides = filteredSlides.map(s => {
        if (s.type === 'veiculo') {
          return {
            ...s,
            fabricante: '',
            modelo: '',
            descricao: '',
            title: 'NOVO VEÍCULO',
            condicao1Label: '', condicao1Val: '',
            condicao2Label: '', condicao2Val: '',
            condicao3Label: '', condicao3Val: '',
            condicao4Label: '', condicao4Val: '',
            imageUrl: '',
            zoom: 1,
            posX: 0,
            posY: 0
          };
        }
        if (s.type === 'capa') {
          return {
            ...s,
            imageUrl: selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png',
            zoom: 1,
            posX: 0,
            posY: 0
          }
        }
        return s;
      });`;

code = code.replace(target, replace);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Fixed clear data");
