import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Remove the gradients that darken the image heavily
content = re.sub(r'<div className="absolute inset-0 bg-gradient-to-l from-\[\#030712\]/90 via-\[\#030712\]/40 to-transparent"></div>', '', content)
content = re.sub(r'<div className="absolute inset-0 bg-gradient-to-t from-\[\#030712\] via-transparent to-transparent opacity-80"></div>', '<div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent w-1/2 right-0"></div>', content)

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)
