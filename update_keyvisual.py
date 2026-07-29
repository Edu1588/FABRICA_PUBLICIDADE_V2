import re

# --- 1. FabricaAzulLandingPage.tsx ---
path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

pattern1 = r'''<div className="w-full bg-white shadow-xl p-5 rounded-xl border border-white/10 mb-4">
\s*<div className="text-\[10px\] font-bold text-\[\#0a1c6a\] mb-3 uppercase tracking-wider">
\s*Exemplo de Estrutura — Key Visual
\s*</div>
\s*<div className="w-full h-48 bg-gray-100 relative mb-4 rounded-sm overflow-hidden flex items-center justify-center shadow-inner">
\s*<img\s*src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg"\s*alt="Key Visual"\s*className="w-full h-full object-cover"\s*referrerPolicy="no-referrer"\s*/>
\s*</div>\s*</div>'''

new_content1 = '''<div className="w-full h-64 relative mb-4 rounded-xl overflow-hidden flex items-center justify-center shadow-xl border border-white/10">
                <img 
                  src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                  alt="Key Visual" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>'''

text = re.sub(pattern1, new_content1, text)
with open(path, 'w') as f:
    f.write(text)

# --- 2. SlideRenderer.tsx ---
path2 = 'src/components/SlideRenderer.tsx'
with open(path2, 'r') as f:
    text2 = f.read()

pattern2 = r'''<div className="w-full max-w-sm bg-white shadow-xl p-5 rounded-sm border border-gray-100">
\s*<div className="text-\[10px\] font-bold text-\[\#0a1c6a\] mb-3 uppercase tracking-wider">
\s*Exemplo de Estrutura — Key Visual
\s*</div>
\s*<div className="w-full h-48 bg-gray-100 relative mb-4 rounded-sm overflow-hidden flex items-center justify-center shadow-inner">
\s*<img\s*src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg"\s*alt="Key Visual"\s*className="w-full h-full object-cover"\s*referrerPolicy="no-referrer"\s*/>
\s*</div>\s*</div>'''

new_content2 = '''<div className="w-full max-w-sm relative rounded-lg overflow-hidden shadow-2xl border border-gray-200">
                    <img 
                      src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                      alt="Key Visual" 
                      className="w-full h-auto object-cover block"
                      referrerPolicy="no-referrer"
                    />
                  </div>'''

text2 = re.sub(pattern2, new_content2, text2)
with open(path2, 'w') as f:
    f.write(text2)

