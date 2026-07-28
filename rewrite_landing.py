import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# ESTRUTURA CONTÍNUA, ESCALÁVEL E INTEGRADA 360° (NATUREZA DA OPERAÇÃO)
# Let's change the grid from 4 cols to an asymmetric grid (e.g. 2x2 but first one is wider, etc.)
# Or alternating feature blocks. Let's just make it a nice 2x2 grid with large cards.
content = re.sub(r'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', 'grid-cols-1 md:grid-cols-2 gap-8', content)
content = re.sub(r'className="relative h-44 overflow-hidden"', 'className="relative h-64 overflow-hidden"', content)

# CANAIS DO ECOSSISTEMA DIGITAL (Canais)
# Let's change it from grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 to an asymmetric Bento grid.
# The grid has 5 elements (IG, FB, Google Ads, Meta Ads, RD Station, WhatsApp... wait, that's 6 elements)
# 6 elements in a 3-column grid is fine, but maybe let's make it more elegant.
# I will increase padding and use lighter fonts.
content = re.sub(r'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12', content)
content = re.sub(r'bg-\[\#0f172a\]/50 border border-white/5 backdrop-blur-sm p-5', 'bg-white/[0.02] border border-white/5 backdrop-blur-md p-8 hover:bg-white/[0.04]', content)

# Remove the "SLIDE" comments just in case
content = re.sub(r'\{/\* ================= SECTION: .*? \(SLIDE \d+.*?\) ================= \*/\}', '', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
