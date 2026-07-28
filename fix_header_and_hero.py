import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Increase logo size
content = re.sub(r'className="h-7 sm:h-9 object-contain filter brightness-0 invert drop-shadow-lg"', 'className="h-10 sm:h-12 lg:h-14 object-contain filter brightness-0 invert drop-shadow-lg"', content)

# Remove the slide texts that might still be around in a different format
content = re.sub(r'<div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">.*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">.*?</div>', '', content, flags=re.DOTALL)
content = re.sub(r'<div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">.*?</div>', '', content, flags=re.DOTALL)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
