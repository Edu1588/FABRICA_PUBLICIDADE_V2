import os
import re

# 1. Update slidesData.ts
path = 'src/data/slidesData.ts'
with open(path, 'r') as f:
    text = f.read()

# Atuação Operacional
text = re.sub(
    r'(title: "Atuação Operacional",[\s\S]*?imageUrl: )"https://images.unsplash.com/photo-1503376780353-7e6692767b70\?q=80&w=800&auto=format&fit=crop"',
    r'\1"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcHJlc2F8ZW58MHx8MHx8fDI%3D"',
    text
)

# Atuação Criativa
text = re.sub(
    r'(title: "Atuação Criativa",[\s\S]*?imageUrl: )"https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae\?w=500&auto=format&fit=crop&q=60"',
    r'\1"https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png"',
    text
)

with open(path, 'w') as f:
    f.write(text)

# 2. Update SlideRenderer.tsx
path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

text = re.sub(
    r'"https://images.unsplash.com/photo-1542744094-24638ea0b3b5\?q=80&w=800&auto=format&fit=crop"',
    r'"https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg"',
    text
)

with open(path, 'w') as f:
    f.write(text)

# 3. Update FabricaAzulLandingPage.tsx
path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

# Atuação Operacional
text = re.sub(
    r'(title: "Atuação Operacional",[\s\S]*?img: )"https://images.unsplash.com/photo-1503376780353-7e6692767b70\?q=80&w=800&auto=format&fit=crop"',
    r'\1"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcHJlc2F8ZW58MHx8MHx8fDI%3D"',
    text
)

# Atuação Criativa
text = re.sub(
    r'(title: "Atuação Criativa",[\s\S]*?img: )"https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae\?w=500&auto=format&fit=crop&q=60"',
    r'\1"https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png"',
    text
)

# Key Visual Box
old_box = r'''<div className="w-full h-48 bg-\[#0a1c6a\] relative mb-4 rounded-sm overflow-hidden flex flex-col justify-end p-4 shadow-inner">
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-400/80 blur-sm"></div>
                  <div className="w-3/4 h-4 bg-white rounded-xs mb-2"></div>
                  <div className="w-1/2 h-2.5 bg-white/40 rounded-xs"></div>
                </div>'''

new_box = r'''<div className="w-full h-48 bg-gray-100 relative mb-4 rounded-sm overflow-hidden flex items-center justify-center shadow-inner">
                  <img 
                    src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                    alt="Key Visual" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>'''

text = text.replace(old_box, new_box)

with open(path, 'w') as f:
    f.write(text)

print("Done")
