import React, { useEffect } from 'react';
import { SlideData } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { ArrowLeft, Printer, FileDown, CheckCircle2 } from 'lucide-react';

interface PrintViewProps {
  slides: SlideData[];
  onBack: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ slides, onBack }) => {
  useEffect(() => {
    // Automatically trigger print dialog after 600ms to allow render
    const timer = setTimeout(() => {
      window.print();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 p-4 md:p-6 select-none print:p-0 print:m-0 print:bg-[#060d20] print:h-auto print:min-h-0 print:overflow-visible">
      {/* Top action bar - Hidden during print */}
      <div className="no-print max-w-6xl mx-auto mb-6 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar à Apresentação
          </button>

          <div className="text-center">
            <h1 className="font-extrabold text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2">
              <FileDown className="w-5 h-5 text-cyan-400 animate-pulse" />
              Exportação da Apresentação em PDF Horizontal ({slides.length} Slides)
            </h1>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/50"
          >
            <Printer className="w-4 h-4" /> Baixar / Salvar em PDF
          </button>
        </div>

        {/* Print instructions notice */}
        <div className="bg-blue-950/60 border border-cyan-500/30 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-cyan-200">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Configurações recomendadas na janela de impressão:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="bg-blue-900/80 px-2.5 py-1 rounded border border-cyan-400/40">
              Layout / Orientação: <strong>Horizontal (Landscape)</strong>
            </span>
            <span className="bg-blue-900/80 px-2.5 py-1 rounded border border-cyan-400/40">
              Gráficos de plano de fundo: <strong>Ativado (Checked)</strong>
            </span>
            <span className="bg-blue-900/80 px-2.5 py-1 rounded border border-cyan-400/40">
              Margens: <strong>Nenhuma (None)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Render real presentation slides in 16:9 widescreen format */}
      <div className="max-w-6xl mx-auto space-y-8 print:space-y-0 print:max-w-none print:m-0 print:p-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="print-page-wrapper aspect-video w-full bg-[#060d20] border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between print:w-[297mm] print:h-[210mm] print:rounded-none print:border-none print:shadow-none print:m-0 print:p-0"
          >
            {/* Real Slide Visual Component */}
            <div className="w-full h-full relative overflow-hidden">
              <SlideRenderer 
                slide={slide} 
                direction={0} 
                isFullscreen={true} 
                isExport={true}
              />
            </div>

            {/* Slide Index Badge in corner for print clarity */}
            <div className="no-print absolute top-3 right-3 bg-black/70 border border-slate-700 text-cyan-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full z-40 backdrop-blur-sm">
              Slide {idx + 1} de {slides.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

