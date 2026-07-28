import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'bg-gradient-to-b from-\[\#0a1c6a\] to-\[\#081538\]', 'bg-white/5', content)
content = re.sub(r'bg-gradient-to-t from-\[\#0a1c6a\] via-transparent to-black/40', 'bg-gradient-to-t from-[#050B14] via-transparent to-transparent', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
