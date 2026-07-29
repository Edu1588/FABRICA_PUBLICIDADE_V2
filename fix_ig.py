import re

path = 'src/components/FabricaAzulLandingPage.tsx'
with open(path, 'r') as f:
    text = f.read()

ig_old = r'''const InstagramLogo = \(\) => \(
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
    <radialGradient id="igGrad" cx="30%" cy="107%" r="130%">
      <stop offset="0%" stopColor="#fdf497" />
      <stop offset="5%" stopColor="#fdf497" />
      <stop offset="45%" stopColor="#fd5949" />
      <stop offset="60%" stopColor="#d6249f" />
      <stop offset="90%" stopColor="#285AEB" />
    </radialGradient>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url\(#igGrad\)" />
    <path d="M16 11\.37A4 4 0 1112\.63 8 4 4 0 0116 11\.37z" stroke="white" strokeWidth="1\.8" fill="none" />
    <line x1="17\.5" y1="6\.5" x2="17\.51" y2="6\.5" stroke="white" strokeWidth="2\.5" strokeLinecap="round" />
  </svg>
\);'''

ig_new = '''const InstagramLogo = () => (
  <img src="https://images.icon-icons.com/2992/PNG/512/instagram_logo_icon_187313.png" alt="Instagram" className="w-8 h-8 shrink-0 object-contain" />
);'''
text = re.sub(ig_old, ig_new, text)

with open(path, 'w') as f:
    f.write(text)

