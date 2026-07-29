import re

path = 'src/data/slidesData.ts'
with open(path, 'r') as f:
    text = f.read()

# Fix Slide 8 layout type
text = re.sub(
    r'(id: 8,[\s\S]*?title: "DESIGN ESTRATÉGICO",[\s\S]*?subtitle: "CONCEITOS E KEY VISUAL",\s*)layoutType: "process_stakeholders",',
    r'\1layoutType: "design_keyvisual",',
    text
)

# Fix Slide 11 layout type
text = re.sub(
    r'(id: 11,[\s\S]*?title: "MARKETING DIGITAL E SOCIAL MEDIA",[\s\S]*?subtitle: "ESTRUTURA DE ATRAÇÃO E CONVERSÃO",\s*)layoutType: "process_stakeholders",',
    r'\1layoutType: "marketing_digital",',
    text
)

with open(path, 'w') as f:
    f.write(text)
