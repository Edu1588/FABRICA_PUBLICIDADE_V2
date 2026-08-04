import re

# Fix FabricaAzulLandingPage.tsx
path_fab = 'src/components/FabricaAzulLandingPage.tsx'
with open(path_fab, 'r') as f:
    text_fab = f.read()

pattern = r'\{\/\* ================= SECTION: PROJETOS EM DESTAQUE ================= \*\/\}.*?(?=\{\/\* ================= SECTION: SÍNTESE & METRICAS \(SLIDES 18, 19 & 20\) ================= \*\/})'
text_fab = re.sub(pattern, '', text_fab, flags=re.DOTALL)
with open(path_fab, 'w') as f:
    f.write(text_fab)

# Fix HomeV2.tsx
path_home = 'src/pages/HomeV2.tsx'
with open(path_home, 'r') as f:
    text_home = f.read()

if "import Section4V2" not in text_home:
    text_home = text_home.replace(
        "import Section3V2 from '../components/V2/Section3V2';",
        "import Section3V2 from '../components/V2/Section3V2';\nimport Section4V2 from '../components/V2/Section4V2';\nimport Section5V2 from '../components/V2/Section5V2';\nimport Section6V2 from '../components/V2/Section6V2';"
    )

with open(path_home, 'w') as f:
    f.write(text_home)
