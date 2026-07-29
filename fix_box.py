import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

old_box = r'''<div className="w-full h-48 bg-\[\#0a1c6a\] relative mb-4 rounded-sm overflow-hidden flex flex-col justify-end p-4 shadow-inner">
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

text = re.sub(old_box, new_box, text)

with open(path, 'w') as f:
    f.write(text)

