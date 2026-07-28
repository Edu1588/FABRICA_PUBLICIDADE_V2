import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# 1. FIX HERO GRADIENT
content = content.replace(
    '<div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent w-1/2 right-0"></div>',
    '<div className="absolute inset-0 bg-gradient-to-l from-[#030712] via-[#030712]/70 to-[#030712]/30"></div>\n          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent"></div>'
)
# And replace the current ones if they are different:
content = re.sub(
    r'<div className="absolute inset-0 bg-gradient-to-l from-\[\#030712\]/90 via-\[\#030712\]/40 to-transparent"></div>\s*<div className="absolute inset-0 bg-gradient-to-t from-\[\#030712\] via-transparent to-transparent opacity-80"></div>',
    '<div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-[#030712]/30"></div>\n          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent"></div>',
    content
)

# 2. RESTORE CARDS BACKGROUNDS IN CANAIS
# Find the Instagram Card
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?INSTAGRAM.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#1a0c2e] via-[#0d1642] to-[#081538] border border-pink-500/40 p-5 rounded-2xl shadow-xl hover:border-pink-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# Facebook
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?FACEBOOK.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#0c183a] via-[#0d2252] to-[#081538] border border-blue-500/40 p-5 rounded-2xl shadow-xl hover:border-blue-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# Google Ads
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?GOOGLE ADS.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#0a201c] via-[#0b2b24] to-[#081538] border border-emerald-500/40 p-5 rounded-2xl shadow-xl hover:border-emerald-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# Meta Ads
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?META ADS.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#0c1c3a] via-[#0a2860] to-[#081538] border border-blue-500/40 p-5 rounded-2xl shadow-xl hover:border-blue-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# RD Station
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?RD STATION.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#2a1b0a] via-[#3a250a] to-[#081538] border border-amber-500/40 p-5 rounded-2xl shadow-xl hover:border-amber-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# WhatsApp
content = re.sub(
    r'<div className="bg-white/\[0\.02\] border border-white/5 backdrop-blur-md p-8 hover:bg-white/\[0\.04\]"(.*?WHATSAPP\s*VENDAS.*?)</div>\s*<p',
    r'<div className="bg-gradient-to-br from-[#0a2a15] via-[#0a3a1a] to-[#081538] border border-emerald-500/40 p-5 rounded-2xl shadow-xl hover:border-emerald-400 transition-all"\1</div>\n            <p',
    content,
    flags=re.DOTALL
)

# Fix Instagram Logo Gradient
content = re.sub(r'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600', 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600', content) # Ensure it's there
# Fix Facebook logo
content = re.sub(r'bg-blue-600 text-white', 'bg-blue-600 text-white', content) 
# Fix Google Ads Logo
content = re.sub(r'bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 text-white', 'bg-emerald-500 text-white', content) # Google is actually solid or colorful? Let\'s use solid to match screenshot if possible. Wait, screenshot has solid green G for Google.
content = content.replace('bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500', 'bg-emerald-500')
# Meta Ads Logo
content = content.replace('bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md">\n                  M\n                </div>', 'bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md">\n                  ∞\n                </div>')
# RD Logo
content = content.replace('bg-amber-500 text-black', 'bg-amber-500 text-black')
# WA Logo
content = content.replace('bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-md">\n                  W\n                </div>', 'bg-emerald-500 text-white flex items-center justify-center font-black text-lg shadow-md">\n                  WA\n                </div>')


# Ensure Pilares has the dark blue backgrounds
content = re.sub(
    r'<motion\.div \s*key=\{idx\}\s*whileHover=\{\{ y: -8 \}\}\s*className="bg-white/5 border border-white/10',
    r'<motion.div key={idx} whileHover={{ y: -8 }} className="bg-gradient-to-b from-[#0a1c6a] to-[#081538] border border-white/10',
    content
)

# And fix the Canais grid back to 3 columns
content = content.replace('grid-cols-1 md:grid-cols-2 gap-8 mb-12', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12')

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
