const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

const regexCapa = /\/\/ A\. COVER LAYOUT \(FIXED IMAGE\)[\s\S]*?<\/div>/;
const replacementCapa = `// A. COVER LAYOUT (FIXED IMAGE)
                            <div className="flex-1 w-full h-full relative overflow-hidden bg-black">
                              {/* If Meta, show the uploaded image as background and fixed frame on top. Otherwise, just show the uploaded image. */}
                              {selectedClientData?.name?.toLowerCase().includes('meta') ? (
                                <>
                                  {activeSlide.imageUrl && (
                                    <img
                                      src={activeSlide.imageUrl}
                                      alt="Carro Capa"
                                      className="absolute max-w-none origin-center z-0"
                                      style={{
                                        width: \`\${100 * activeSlide.zoom}%\`,
                                        height: \`\${100 * activeSlide.zoom}%\`,
                                        left: \`calc(50% + \${activeSlide.posX}px)\`,
                                        top: \`calc(50% + \${activeSlide.posY}px)\`,
                                        transform: 'translate(-50%, -50%)',
                                        objectFit: 'cover',
                                        cursor: 'move',
                                        pointerEvents: 'auto'
                                      }}
                                      onMouseDown={handleMouseDown}
                                      onMouseMove={handleMouseMove}
                                      onMouseUp={handleMouseUp}
                                      onMouseLeave={handleMouseUp}
                                      crossOrigin="anonymous"
                                    />
                                  )}
                                  <img 
                                    src="https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png" 
                                    alt="Capa Overlay" 
                                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" crossOrigin="anonymous" 
                                  />
                                </>
                              ) : (
                                <img 
                                  src={activeSlide.imageUrl || "https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png"} 
                                  alt="Capa" 
                                  className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" 
                                />
                              )}
                            </div>`;

code = code.replace(regexCapa, replacementCapa);
fs.writeFileSync('src/pages/Admin.tsx', code);
console.log("Admin.tsx updated for capa layout");
