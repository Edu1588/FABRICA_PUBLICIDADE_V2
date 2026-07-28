import React, { useEffect } from 'react';
import { SlideData } from '../types';
import { ArrowLeft, Printer, FileDown } from 'lucide-react';

interface PrintViewProps {
  slides: SlideData[];
  onBack: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ slides, onBack }) => {
  useEffect(() => {
    // Automatically open print dialog after brief render delay
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 p-6">
      {/* Top action bar */}
      <div className="no-print max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar à Apresentação
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2">
            <FileDown className="w-4 h-4 text-cyan-400" />
            Exportação em PDF ({slides.length} Slides)
          </h1>
          <p className="text-[11px] text-slate-400">
            Dica: No menu que se abre, escolha Destination: <strong>Salvar como PDF</strong> (Save as PDF)
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-blue-900/40"
        >
          <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
        </button>
      </div>

      {/* Stacked Slides */}
      <div className="max-w-5xl mx-auto space-y-8">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="print-slide bg-[#0D1017] border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                  {idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                    {slide.categoryLabel}
                  </span>
                  <h2 className="font-heading font-extrabold text-lg text-white uppercase tracking-tight">
                    {slide.title}
                  </h2>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-500">
                {slide.slideNumber}
              </span>
            </div>

            {/* Subtitle / Descriptions */}
            {slide.subtitle && (
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
                {slide.subtitle}
              </h3>
            )}

            {slide.descriptionText && (
              <div className="text-xs text-slate-300 leading-relaxed mb-6 space-y-2">
                {Array.isArray(slide.descriptionText) ? (
                  slide.descriptionText.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <p>{slide.descriptionText}</p>
                )}
              </div>
            )}

            {/* Tables / Lists */}
            {slide.tableData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  {slide.tableData.map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="font-bold text-xs text-blue-300 mb-1">{item.item}</div>
                      <div className="text-[11px] text-slate-400">{item.description}</div>
                    </div>
                  ))}
                </div>
                {slide.tableData2 && (
                  <div className="space-y-2">
                    {slide.tableData2.map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                        <div className="font-bold text-xs text-blue-300 mb-1">{item.item}</div>
                        <div className="text-[11px] text-slate-400">{item.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Metrics */}
            {slide.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                    <div className="font-heading font-black text-2xl text-blue-400">{m.value}</div>
                    <div className="text-[11px] font-bold text-white mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
              <span>RELATÓRIO TÉCNICO · AZUL VEÍCULOS & FÁBRICA PUBLICIDADE</span>
              <span>Uso interno e confidencial · Julho de 2026</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
