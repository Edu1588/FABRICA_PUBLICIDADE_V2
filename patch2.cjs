const fs = require('fs');
let code = fs.readFileSync('src/components/V2/ThreeCanvas.tsx', 'utf8');

const target2 = `        let p = scroll / vh;
        targetScale = 3.5 + p * 4.0; // zoom in up to 7.5
        targetY = -0.8 - p * 1.5; 
        targetRotX = 0.25 + p * 0.65; // Tilt forward from 0.25 to 0.9 (top of head)
        targetRotY = -0.8 - p * 0.5;`;
const replacement2 = `        let p = scroll / vh;
        targetScale = 3.5 + p * 4.0; // zoom in up to 7.5
        targetY = -0.8 - p * 1.5; 
        targetRotX = 0.1 + p * 0.35; // Tilt forward to see top of head, but not too much
        targetRotY = -0.8 - p * 0.3;`;

const target3 = `        targetRotX = 0.9 - p * 1.5; // Tilt back from 0.9 to -0.6`;
const replacement3 = `        targetRotX = 0.45 - p * 1.0; // Tilt back to show chin`;

const target4 = `      // Hover effect: sparse scattered pixels around the mouse
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
const replacement4 = `      // Hover effect: tight cluster of twinkling pixels
      float hoverRadius = 0.08; 
      float dist = distance(basePixelUv * aspect, uMouse * aspect);
      vec2 cell = floor(uv / d);
      
      if (dist < hoverRadius) {
        float spatialNoise = rand(cell * 20.0);
        float temporalNoise = sin(uTime * 8.0 + spatialNoise * 100.0);
        float prob = mix(0.7, 0.98, dist / hoverRadius);
        
        if (spatialNoise > prob && temporalNoise > 0.0) { 
          baseCol = vec3(1.0, 0.35, 0.08); // pure orange
        }
      }`;

code = code.replace(target2, replacement2);
code = code.replace(target3, replacement3);
code = code.replace(target4, replacement4);

fs.writeFileSync('src/components/V2/ThreeCanvas.tsx', code);
