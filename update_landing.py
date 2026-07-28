import re

with open('src/components/FabricaAzulLandingPage.tsx', 'r') as f:
    content = f.read()

# Add official logo components if not present
logos_code = '''
const InstagramLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none">
    <radialGradient id="igGrad" cx="30%" cy="107%" r="130%">
      <stop offset="0%" stopColor="#fdf497" />
      <stop offset="5%" stopColor="#fdf497" />
      <stop offset="45%" stopColor="#fd5949" />
      <stop offset="60%" stopColor="#d6249f" />
      <stop offset="90%" stopColor="#285AEB" />
    </radialGradient>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#igGrad)" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="white" strokeWidth="1.8" fill="none" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const FacebookLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const GoogleLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);
const MetaLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#0081FB">
    <path d="M12 7.002c-2.316 0-4.408 1.12-5.748 2.817C4.912 11.517 4 14 4 15.5c0 2.21 1.79 3.5 3.5 3.5 1.5 0 2.87-.82 4.5-2.76 1.63 1.94 3 2.76 4.5 2.76 1.71 0 3.5-1.29 3.5-3.5 0-1.5-.912-3.983-2.252-5.681C16.408 8.122 14.316 7.002 12 7.002zm-3.5 9.998c-.83 0-1.5-.67-1.5-1.5 0-.96.67-2.6 1.75-3.96 1.01-1.27 2.22-2.04 3.25-2.04.5 0 .93.18 1.25.5-1.42 1.67-3.25 4.35-4.75 7 z"/>
  </svg>
);
const GoogleAdsLogo = () => (
  <svg className="w-9 h-9 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M3.5 18.5L10.5 3.5H16.5L9.5 18.5H3.5Z" fill="#FFBC00"/>
    <path d="M20.5 18.5C22.1569 18.5 23.5 17.1569 23.5 15.5C23.5 13.8431 22.1569 12.5 20.5 12.5C18.8431 12.5 17.5 13.8431 17.5 15.5C17.5 17.1569 18.8431 18.5 20.5 18.5Z" fill="#4285F4"/>
    <path d="M12.5 18.5L19.5 3.5H13.5L6.5 18.5H12.5Z" fill="#34A853"/>
  </svg>
);
const RDStationLogo = () => (
  <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="#00D2B6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);
'''

if "InstagramLogo" not in content:
    content = logos_code + content

with open('src/components/FabricaAzulLandingPage.tsx', 'w') as f:
    f.write(content)

print("Added logos successfully")
