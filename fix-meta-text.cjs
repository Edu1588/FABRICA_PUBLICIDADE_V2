const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const regexText = /\{\/\* Header Texts \(Transparent background\) \*\/\}.*?<div className="flex-1 z-20 pointer-events-none"><\/div>/s;
const replaceText = `{/* Header Texts (Transparent background) */}
                              <div className="absolute top-[25px] left-0 w-full px-[20px] z-20 pointer-events-none uppercase italic" style={{ fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? undefined : '"Saira Extra Condensed", sans-serif' }}>
                                <div className={\`leading-none tracking-widest italic \${selectedClientData?.name?.toLowerCase().includes('meta') ? 'text-white' : 'text-[#0377f9] font-light'}\`} style={{ fontSize: '24px', color: selectedClientData?.name?.toLowerCase().includes('meta') ? '#ffffff' : '#0377f9', marginBottom: '-4px', fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Oswald", sans-serif' : undefined }}>
                                  {activeSlide.fabricante || 'FABRICANTE'}
                                </div>
                                <div className={\`leading-none tracking-tighter italic \${selectedClientData?.name?.toLowerCase().includes('meta') ? '' : 'text-[#1b3265] font-black'}\`} style={{ 
                                  fontSize: selectedClientData?.name?.toLowerCase().includes('meta') ? '54px' : '48px', 
                                  marginBottom: '2px', 
                                  marginTop: '-8px',
                                  fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Anton", sans-serif' : undefined,
                                  color: selectedClientData?.name?.toLowerCase().includes('meta') ? undefined : '#1b3265',
                                  background: selectedClientData?.name?.toLowerCase().includes('meta') ? 'linear-gradient(180deg, #FF6B00 20%, #FF8C00 50%, #FF6B00 80%)' : undefined,
                                  WebkitBackgroundClip: selectedClientData?.name?.toLowerCase().includes('meta') ? 'text' : undefined,
                                  WebkitTextFillColor: selectedClientData?.name?.toLowerCase().includes('meta') ? 'transparent' : undefined,
                                  filter: selectedClientData?.name?.toLowerCase().includes('meta') ? 'drop-shadow(3px 3px 2px rgba(0,0,0,0.6))' : undefined,
                                }}>
                                  {activeSlide.modelo || 'MODELO'}
                                </div>
                                <div className={\`leading-none tracking-wide italic \${selectedClientData?.name?.toLowerCase().includes('meta') ? 'text-white font-light' : 'text-black font-bold'}\`} style={{ fontSize: '13px', color: selectedClientData?.name?.toLowerCase().includes('meta') ? '#ffffff' : '#000000', marginTop: selectedClientData?.name?.toLowerCase().includes('meta') ? '2px' : '-2px', fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Oswald", sans-serif' : undefined }}>
                                  {activeSlide.descricao || 'DESCRIÇÃO COMPLETA'}
                                </div>
                              </div>
                              <div className="flex-1 z-20 pointer-events-none"></div>`;

code = code.replace(regexText, replaceText);

const regexFooter = /\{activeSlide\.type === 'veiculo' && \(/s;
const replaceFooter = `{activeSlide.type === 'veiculo' && !selectedClientData?.name?.toLowerCase().includes('meta') && (`;

code = code.replace(regexFooter, replaceFooter);

fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Admin.tsx updated for Meta text and footer");
