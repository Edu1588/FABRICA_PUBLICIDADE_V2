import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

pattern = r'''<div className="lg:col-span-6">\s*<div className="bg-\[\#0f172a\]/50 backdrop-blur-sm border-none p-0 rounded-3xl shadow-2xl relative overflow-hidden">.*?</div>\s*</div>\s*</div>\s*</div>'''
# Actually it's easier to just match from `<div className="lg:col-span-6">` to the end of the section grid, which is before `</section>`
