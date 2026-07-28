import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Fix Canais backgrounds and borders
content = re.sub(r'bg-gradient-to-br from-\[\#[a-zA-Z0-9]{6}\] via-\[\#[a-zA-Z0-9]{6}\] to-\[\#[a-zA-Z0-9]{6}\]', 'bg-white/5', content)
content = re.sub(r'border-[a-z]+-[0-9]{3}/[0-9]{2}', 'border-white/10', content)
content = re.sub(r'border-[a-z]+-900/[0-9]{2}', 'border-white/10', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
