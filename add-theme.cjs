const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// Add Sun and Moon to imports
code = code.replace("  Palette\n} from 'lucide-react';", "  Palette,\n  Sun,\n  Moon\n} from 'lucide-react';");

// Add theme state
code = code.replace("const [isAuthenticated, setIsAuthenticated] = useState(false);", "const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [theme, setTheme] = useState<'dark' | 'light'>('dark');\n  \n  useEffect(() => {\n    const savedTheme = localStorage.getItem('admin_theme');\n    if (savedTheme) setTheme(savedTheme as 'dark' | 'light');\n  }, []);\n\n  const toggleTheme = () => {\n    const newTheme = theme === 'dark' ? 'light' : 'dark';\n    setTheme(newTheme);\n    localStorage.setItem('admin_theme', newTheme);\n  };");

// Add theme-light class wrapper.
// Let's find where the main div starts.
// Usually after "return (\n"
// It's likely <div className="min-h-screen bg-black text-white font-sans">
// Let's find it.
const minHScreenMatch = code.match(/<div className="min-h-screen[^"]*">/);
if (minHScreenMatch) {
  const replacement = minHScreenMatch[0].replace('className="', 'className={`${theme === \'light\' ? \'theme-light\' : \'\'} ');
  code = code.replace(minHScreenMatch[0], replacement);
  
  // Add toggle button to header
  // Let's find the header.
  const headerMatch = code.match(/<button\s+onClick=\{handleLogout\}[\s\S]*?Sair\s*<\/button>/);
  if (headerMatch) {
    const toggleBtn = `
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors mr-4"
            title="Alternar Tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Claro' : 'Escuro'}
          </button>
    `;
    code = code.replace(headerMatch[0], toggleBtn + headerMatch[0]);
  } else {
    console.log("Header button not found");
  }
} else {
  console.log("min-h-screen div not found");
}

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Added theme successfully");
