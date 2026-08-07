const fs = require('fs');
let code = fs.readFileSync('src/components/V2/ThreeCanvas.tsx', 'utf8');

const target = `      // Hover effect: sparse pixels around the mouse
      float hoverRadius = 0.12;
      float dist = distance(basePixelUv * aspect, uMouse * aspect);
      if (dist < hoverRadius) {
        // Use integer cell coordinate for stable random
        vec2 cell = floor(uv / d);
        float scatter = rand(cell * 10.0);
        if (scatter > 0.95) { // Only 5% of dots near mouse
          baseCol = vec3(1.0, 0.35, 0.08); // pure orange
        }
      }`;

const replacement = `      // Hover effect: very tight, irregular cluster near the mouse
      float hoverRadius = 0.035; // Very small radius
      float dist = distance(basePixelUv * aspect, uMouse * aspect);
      vec2 cell = floor(uv / d);
      
      // Make it slightly non-circular by perturbing the distance
      float noise = rand(cell * 5.0);
      
      if (dist < hoverRadius + noise * 0.02) {
        if (noise > 0.3) { // Dense but not 100% solid, avoids perfect shapes
          baseCol = vec3(1.0, 0.35, 0.08); // pure orange
        }
      }`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/V2/ThreeCanvas.tsx', code);
