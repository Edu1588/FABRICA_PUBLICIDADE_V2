import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md">\n                  ∞\n                </div>',
    '<div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md">\n                  ∞\n                </div>'
)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
