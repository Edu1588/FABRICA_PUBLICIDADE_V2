import React from 'react';
import { X, FileText, Clock, Lightbulb, ChevronRight } from 'lucide-react';
import { SlideData } from '../types';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: SlideData;
  nextSlide?: SlideData;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  nextSlide
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 right-4 z-50 w-full max-w-md bg-[#0D1017] border border-amber-500/30 rounded-2xl shadow-2xl p-4 text-slate-200 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Notas do Apresentador
            </h3>
            <span className="text-[10px] text-amber-400 font-mono">
              Slide {currentSlide.slideNumber}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Note */}
      <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3 mb-3">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Ponto Focal da Apresentação</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {currentSlide.presenterNotes || "Focar nos dados de entregas e nos benefícios estratégicos para a operação da Azul Veículos."}
        </p>
      </div>

      {/* Next Slide Preview */}
      {nextSlide && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
              Próximo Slide ({nextSlide.slideNumber})
            </span>
            <span className="text-xs text-slate-200 font-bold block truncate">
              {nextSlide.title}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      )}
    </div>
  );
};
