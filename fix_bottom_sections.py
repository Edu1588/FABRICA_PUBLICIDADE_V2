import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'bg-\[\#081229\]', 'bg-[#0f172a]/50 backdrop-blur-sm', content)
content = re.sub(r'bg-\[\#081533\]', 'bg-[#0f172a]/50 backdrop-blur-sm', content)
content = re.sub(r'bg-gradient-to-r from-white/5 via-white/5 to-transparent border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden', 'bg-[#0f172a]/30 border border-white/5 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
