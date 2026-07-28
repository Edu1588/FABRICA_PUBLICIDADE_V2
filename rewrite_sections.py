import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Replace border-t border-white/10 to make it flow better
content = re.sub(r'border-t border-white/10', '', content)
content = re.sub(r'bg-white/5 border border-white/10', 'bg-[#0f172a]/50 border border-slate-800/50 backdrop-blur-sm', content)
content = re.sub(r'bg-black/40', 'bg-[#0f172a]/30', content)
content = re.sub(r'border-slate-800/50', 'border-white/5', content)

# Remove any remaining SLIDE texts
content = re.sub(r'<div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2">.*?</div>', '', content, flags=re.DOTALL)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
