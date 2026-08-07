const fs = require('fs');
let code = fs.readFileSync('src/components/V2/ThreeCanvas.tsx', 'utf8');

const target1 = `    let targetRotX = 0.0;`;
const replacement1 = `    let targetRotX = 0.25;`;

const target2 = `        let p = scroll / vh;
        targetScale = 3.5 + p * 3.5; // up to 7.0
        targetY = -0.8 - p * 1.5; 
        targetRotX = p * 0.8; // Tilt forward to see top of head
        targetRotY = -0.8 - p * 0.5;`;
const replacement2 = `        let p = scroll / vh;
        targetScale = 3.5 + p * 4.0; // zoom in up to 7.5
        targetY = -0.8 - p * 1.5; 
        targetRotX = 0.25 + p * 0.65; // Tilt forward from 0.25 to 0.9 (top of head)
        targetRotY = -0.8 - p * 0.5;`;

const target3 = `        targetRotX = 0.8 - p * 2.3; // Tilt back`;
const replacement3 = `        targetRotX = 0.9 - p * 1.5; // Tilt back from 0.9 to -0.6`;

const target4 = `      // Hover effect: very tight, irregular cluster near the mouse
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
const replacement4 = `      // Hover effect: sparse scattered pixels around the mouse
      float hoverRadius = 0.18; // Larger radius
      float dist = distance(basePixelUv * aspect, uMouse * aspect);
      vec2 cell = floor(uv / d);
      
      if (dist < hoverRadius) {
        float noise = rand(cell * 15.0);
        // Probability of being orange drops off with distance
        float prob = mix(0.92, 0.995, dist / hoverRadius);
        if (noise > prob) { 
          baseCol = vec3(1.0, 0.35, 0.08); // pure orange
        }
      }`;

code = code.replace(target1, replacement1);
code = code.replace(target2, replacement2);
code = code.replace(target3, replacement3);
code = code.replace(target4, replacement4);

fs.writeFileSync('src/components/V2/ThreeCanvas.tsx', code);
