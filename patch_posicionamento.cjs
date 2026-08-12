const fs = require('fs');
let code = fs.readFileSync('src/pages/HomeV2.tsx', 'utf8');

const target = `<div className="pb-28 text-center select-none space-y-2">
            <BlurSplitText 
              text="POSICIONE-SE"
              as="h2"
              animateBy="letters"
              stagger={0.035}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light"
            />
            <BlurSplitText 
              text="CONECTE-SE"
              as="h2"
              animateBy="letters"
              stagger={0.035}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light"
            />
            <BlurSplitText 
              text="E VENDA"
              as="h2"
              animateBy="letters"
              stagger={0.035}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light"
            />
          </div>`;

const replacement = `<div className="pb-28 text-center select-none flex flex-col gap-2">
            <BlurText 
              text="POSICIONE-SE"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light cursor-default"
            />
            <BlurText 
              text="CONECTE-SE"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light cursor-default"
            />
            <BlurText 
              text="E VENDA"
              as="h2"
              animateBy="letters"
              delay={40}
              stepDuration={1.2}
              style={{ justifyContent: 'center' }}
              hoverBlur={true}
              className="text-[14vw] leading-[0.85] md:text-[10rem] uppercase tracking-tight text-white font-light cursor-default"
            />
          </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/HomeV2.tsx', code);
console.log('Replaced BlurSplitText with BlurText');
