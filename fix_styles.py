import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Replace heavy borders
content = re.sub(r'border-cyan-[0-9]{3}/[0-9]{2}', 'border-white/10', content)
content = re.sub(r'border-blue-[0-9]{3}/[0-9]{2}', 'border-white/10', content)

# Replace heavy backgrounds
content = re.sub(r'bg-\[\#0a1c6a\]/[0-9]{2}', 'bg-white/5', content)
content = re.sub(r'bg-\[\#060e26\]/[0-9]{2}', 'bg-black/40', content)
content = re.sub(r'bg-gradient-to-t from-\[\#060e26\]', 'bg-gradient-to-t from-[#030712]', content)

# Replace text colors to be more subtle
content = re.sub(r'text-amber-300', 'text-slate-200', content)
content = re.sub(r'text-amber-400', 'text-slate-400', content)

# Remove background gradients that make it look like a dashboard
content = re.sub(r'bg-gradient-to-br from-\[\#0a1c6a\]/[0-9]{2} to-\[\#0d3b85\]/[0-9]{2}', 'bg-white/5', content)
content = re.sub(r'bg-gradient-to-b from-\[\#0a1c6a\] via-\[\#0d3b85\] to-\[\#030712\]', 'bg-black/40', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
