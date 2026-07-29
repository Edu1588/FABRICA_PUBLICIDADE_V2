import re

path = 'src/data/slidesData.ts'
with open(path, 'r') as f:
    text = f.read()

# Replace / 15 with / 16
text = text.replace(' / 15', ' / 16')
text = text.replace('15/15', '16/16')
text = text.replace('14/15', '15/16')
text = text.replace('13/15', '14/16')
text = text.replace('12/15', '13/16')
text = text.replace('11/15', '12/16')
text = text.replace('10/15', '11/16')
text = text.replace('9/15', '10/16')
text = text.replace('8/15', '9/16')
text = text.replace('7/15', '8/16')

# But we need to shift slide numbers for 13, 14, 15 to 14, 15, 16.
# Let's do it safely
# 15 -> 16
text = text.replace('id: 15,', 'id: 16,')
text = text.replace('slideNumber: "15 / 16",', 'slideNumber: "16 / 16",')
text = text.replace('categoryLabel: "15 / Síntese",', 'categoryLabel: "16 / Síntese",')

# 14 -> 15
text = text.replace('id: 14,', 'id: 15,')
text = text.replace('slideNumber: "14 / 16",', 'slideNumber: "15 / 16",')
text = text.replace('categoryLabel: "14 / Continuidade",', 'categoryLabel: "15 / Continuidade",')

# 13 -> 14
text = text.replace('id: 13,', 'id: 14,')
text = text.replace('slideNumber: "13 / 16",', 'slideNumber: "14 / 16",')
text = text.replace('categoryLabel: "13 / Ativações Futuras",', 'categoryLabel: "14 / Ativações Futuras",')

# Now insert slide 13 after slide 12
slide_13_code = '''
  // SLIDE 13: Performance do Site (13/16)
  {
    id: 13,
    slideNumber: "13 / 16",
    category: "tecnologia",
    categoryLabel: "13 / Performance",
    title: "A IMPORTÂNCIA DA VELOCIDADE",
    subtitle: "SITE LENTO VS SITE NOTA A",
    layoutType: "site_performance",
    presenterNotes: "Um site rápido converte mais."
  },
'''

text = text.replace('// SLIDE 14:', slide_13_code + '// SLIDE 15:') # Wait, old 13 became 14, so it says // SLIDE 14?

with open(path, 'w') as f:
    f.write(text)

