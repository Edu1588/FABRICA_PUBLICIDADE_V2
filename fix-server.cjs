const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `
      // 1. Search for the vehicle
      const { search, client } = req.body;
      const normalizedSearch = search.toUpperCase().replace(/[^A-Z0-9]/g, '');
      
      if (client === 'meta') {
        try {
          const metaRes = await fetch('https://metaveiculos.com.br/vehicles.json');
          const metaVehicles = await metaRes.json();
          const vehicle = metaVehicles.find(v => v.plate === normalizedSearch || v.model.toLowerCase().includes(search.toLowerCase()) || v.version.toLowerCase().includes(search.toLowerCase()));
          
          if (vehicle) {
            return res.json({
              success: true,
              data: {
                montadora: vehicle.brand,
                modelo: vehicle.model,
                descricao: vehicle.version
              }
            });
          } else {
            return res.status(404).json({ error: "Veículo não encontrado no site da Meta Veículos." });
          }
        } catch (err) {
          console.error("Meta search error", err);
          return res.status(500).json({ error: "Erro ao buscar no site da Meta Veículos." });
        }
      }
`;

code = code.replace(/const { search } = req\.body;[\s\S]*?\/\/ 1\. Search for the vehicle/, replacement);

fs.writeFileSync('server.ts', code);
console.log("server.ts updated");
