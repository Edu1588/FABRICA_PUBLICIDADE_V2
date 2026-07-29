import re

path1 = 'src/components/FabricaAzulLandingPage.tsx'
with open(path1, 'r') as f:
    text1 = f.read()

text1 = text1.replace('border border-white/10 p-6 rounded-3xl', 'border-none p-0 rounded-3xl')
text1 = text1.replace('shadow-xl border border-white/10', 'shadow-xl border-none')

with open(path1, 'w') as f:
    f.write(text1)


path2 = 'src/components/SlideRenderer.tsx'
with open(path2, 'r') as f:
    text2 = f.read()

text2 = text2.replace('shadow-2xl border border-gray-200', 'shadow-2xl border-none')

with open(path2, 'w') as f:
    f.write(text2)

