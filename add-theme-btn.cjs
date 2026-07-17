const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const logoutBtnRegex = /<button\s*onClick=\{handleLogout\}[\s\S]*?Sair Painel\s*<\/button>/;
const match = code.match(logoutBtnRegex);
if (match) {
  const toggleBtn = `
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 bg-[#111116] hover:bg-[#161620] text-white/60 hover:text-white text-[10px] uppercase font-mono tracking-widest py-2.5 rounded-lg cursor-pointer transition-all border border-white/5 mb-3"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
              </button>
`;
  code = code.replace(match[0], toggleBtn + match[0]);
  fs.writeFileSync('src/pages/Admin.tsx', code);
  console.log("Button added successfully");
} else {
  console.log("Logout button not found");
}
