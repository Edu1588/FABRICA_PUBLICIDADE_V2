const fs = require('fs');
let code = fs.readFileSync('src/components/DesignBrandbook.tsx', 'utf8');

const regex = /\{\/\* Moodboard \*\/\}.*<\/div>\s*<\/div>\s*\);\s*\};\s*$/s;
const replacement = `{/* Moodboard */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono uppercase tracking-widest text-white/70">Moodboard / Referências</h4>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E60023]/10 flex items-center justify-center text-[#E60023] mb-2">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-white font-medium mb-1">Moodboard no Pinterest</h5>
            <p className="text-xs text-white/50 mb-4 max-w-sm mx-auto">
              As referências visuais e o moodboard desta marca estão organizados em um painel do Pinterest.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full max-w-md">
            <input 
              type="text" 
              placeholder="Cole o link do Pinterest aqui..." 
              value={moodboard[0] || ""}
              onChange={(e) => setMoodboard([e.target.value])}
              className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF7A00]/50 transition-colors"
            />
            <a 
              href={moodboard[0] || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#E60023] hover:bg-[#E60023]/80 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Acessar Painel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

code = code.replace(regex, replacement);

const stateRegex = /const \[moodboard, setMoodboard\] = useState<string\[\]>\(\[\s*'https[^\]]+\]\);/s;
code = code.replace(stateRegex, `const [moodboard, setMoodboard] = useState<string[]>(['https://pinterest.com/']);`);

fs.writeFileSync('src/components/DesignBrandbook.tsx', code);
console.log("Moodboard replaced");
