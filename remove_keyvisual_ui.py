import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

pattern = r'''<div className="lg:col-span-6">\s*<div className="bg-\[\#0f172a\]/50 backdrop-blur-sm border-none p-0 rounded-3xl shadow-2xl relative overflow-hidden">[\s\S]*?<div className="w-full h-64 relative mb-4 rounded-xl overflow-hidden flex items-center justify-center shadow-xl border-none">\s*<img\s*src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg"\s*alt="Key Visual"\s*className="w-full h-full object-cover"\s*referrerPolicy="no-referrer"\s*/>\s*</div>[\s\S]*?</div>\s*</div>'''

new_html = '''<div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/ifuatk2z/image/upload/v1785278990/Carrossel_1_ayrdkg.jpg" 
                alt="Key Visual" 
                className="w-full h-auto object-cover block"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>'''

text = re.sub(pattern, new_html, text)
with open(path, 'w') as f:
    f.write(text)

