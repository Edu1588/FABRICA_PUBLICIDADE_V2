import re

path = 'src/components/SlideRenderer.tsx'
with open(path, 'r') as f:
    text = f.read()

# Replace InstagramLogo
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

# Replace MetaLogo
meta_old = r'''const MetaLogo = \(\) => \(
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#0081FB">
    <path d="M12 7\.002c-2\.316 0-4\.408 1\.12-5\.748 2\.817C4\.912 11\.517 4 14 4 15\.5c0 2\.21 1\.79 3\.5 3\.5 3\.5 1\.5 0 2\.87-\.82 4\.5-2\.76 1\.63 1\.94 3 2\.76 4\.5 2\.76 1\.71 0 3\.5-1\.29 3\.5-3\.5 0-1\.5-\.912-3\.983-2\.252-5\.681C16\.408 8\.122 14\.316 7\.002 12 7\.002zm-3\.5 9\.998c-\.83 0-1\.5-\.67-1\.5-1\.5 0-\.96\.67-2\.6 1\.75-3\.96 1\.01-1\.27 2\.22-2\.04 3\.25-2\.04\.5 0 \.93\.18 1\.25\.5-1\.42 1\.67-3\.25 4\.35-4\.75 7 z"/>
  </svg>
\);'''

meta_new = '''const MetaLogo = () => (
  <img src="https://pngimg.com/uploads/meta/meta_PNG5.png" alt="Meta Ads" className="w-8 h-8 shrink-0 object-contain" />
);'''
text = re.sub(meta_old, meta_new, text)

# Replace GoogleAdsLogo
google_old = r'''const GoogleAdsLogo = \(\) => \(
  <svg className="w-9 h-9 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M3\.5 18\.5L10\.5 3\.5H16\.5L9\.5 18\.5H3\.5Z" fill="#FFBC00"/>
    <path d="M20\.5 18\.5C22\.1569 18\.5 23\.5 17\.1569 23\.5 15\.5C23\.5 13\.8431 22\.1569 12\.5 20\.5 12\.5C18\.8431 12\.5 17\.5 13\.8431 17\.5 15\.5C17\.5 17\.1569 18\.8431 18\.5 20\.5 18\.5Z" fill="#4285F4"/>
    <path d="M12\.5 18\.5L19\.5 3\.5H13\.5L6\.5 18\.5H12\.5Z" fill="#34A853"/>
  </svg>
\);'''

google_new = '''const GoogleAdsLogo = () => (
  <img src="https://images.icon-icons.com/2699/PNG/512/google_ads_logo_icon_171064.png" alt="Google Ads" className="w-9 h-9 shrink-0 object-contain" />
);'''
text = re.sub(google_old, google_new, text)

with open(path, 'w') as f:
    f.write(text)
