import re

def update_file(path):
    with open(path, 'r') as f:
        content = f.read()
    
    pattern1 = r'<div className="grid grid-cols-4 gap-2 mb-3">[\s\S]*?</div>\s*<div className="text-\[10px\][^>]*>\s*Paleta e composição padronizadas por campanha\s*</div>'
    
    new_content = re.sub(pattern1, '', content)
    
    with open(path, 'w') as f:
        f.write(new_content)

update_file('src/components/FabricaAzulLandingPage.tsx')
update_file('src/components/SlideRenderer.tsx')
