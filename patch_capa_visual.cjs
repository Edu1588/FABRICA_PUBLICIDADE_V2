const fs = require('fs');

function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(
    /className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous"\s*\/>\s*\)\}\s*<\/div>/,
    `className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous"
                                 />
                              )}
                              
                              {/* Capa Text Overlay */}
                              {(activeSlide.modelo || activeSlide.descricao) && (
                                <div className="absolute top-1/2 right-[25px] -translate-y-1/2 flex flex-col items-end text-right z-20 pointer-events-none w-[90%]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                  {activeSlide.modelo && (
                                    <div className="text-white font-bold leading-none uppercase drop-shadow-md" style={{ fontSize: '40px' }}>
                                      {activeSlide.modelo}
                                    </div>
                                  )}
                                  {activeSlide.descricao && (
                                    <div className="text-white font-light italic leading-tight uppercase mt-2 drop-shadow-md" style={{ fontSize: '24px' }}>
                                      {activeSlide.descricao}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>`
  );
  fs.writeFileSync(file, code);
}

patch('src/pages/Admin.tsx');
patch('src/pages/Outgrid.tsx');
