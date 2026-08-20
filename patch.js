const fs = require('fs');
let code = fs.readFileSync('src/pages/Admin.tsx', 'utf8');
code = code.replace(
  `}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>`,
  `}
                              </p>
                            </div>
                          </div>
                          );
                          if (isFinal) {
                            return (
                              <React.Fragment key={slide.id}>
                                <div
                                  onClick={() => handleAddSlide('veiculo')}
                                  className="bg-[#111116] border border-dashed border-[#C46A1A]/30 hover:border-[#C46A1A] rounded-xl p-4 cursor-pointer transition-all hover:bg-[#C46A1A]/5 flex flex-col items-center justify-center min-h-[120px] group w-[140px] shrink-0"
                                >
                                  <div className="w-8 h-8 rounded-full bg-[#18120e] flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform mb-2">
                                    <Plus className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-outfit uppercase tracking-widest text-[#FF7A00] font-bold">
                                    + Veículo
                                  </span>
                                </div>
                                {cardNode}
                              </React.Fragment>
                            );
                          }
                          return cardNode;
                        })}
                      </div>
                    </div>`
);
fs.writeFileSync('src/pages/Admin.tsx', code);
