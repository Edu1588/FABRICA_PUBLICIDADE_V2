import re
with open('src/data/slidesData.ts', 'r') as f:
    text = f.read()
text = re.sub(r'\}\];,', '}];\n', text)
with open('src/data/slidesData.ts', 'w') as f:
    f.write(text)
