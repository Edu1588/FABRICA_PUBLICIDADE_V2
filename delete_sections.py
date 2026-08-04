import re

path_fab = 'src/components/FabricaAzulLandingPage.tsx'
with open(path_fab, 'r') as f:
    text_fab = f.read()

pattern = r'\s*\{\/\* ================= SECTION: PROJETOS EM DESTAQUE ================= \*\/\}.*?(?=\{\/\* ================= SECTION: SÍNTESE & METRICAS \(SLIDES 18, 19 & 20\) ================= \*\/})'
text_fab = re.sub(pattern, '\n      ', text_fab, flags=re.DOTALL)

with open(path_fab, 'w') as f:
    f.write(text_fab)
