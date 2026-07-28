import React from 'react';
import { X, Grid, Search, Check, Layers, ChevronRight } from 'lucide-react';
import { SlideData } from '../types';

interface SlideThumbnailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const SlideThumbnailsDrawer: React.FC<SlideThumbnailsDrawerProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectSlide,
  searchQuery,
  onSearchChange,
}) => {
  if (!isOpen) return null;

  const filteredSlides = slides.filter((slide) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      slide.title.toLowerCase().includes(q) ||
      slide.categoryLabel.toLowerCase().includes(q) ||
      slide.subtitle?.toLowerCase().includes(q) ||
      (Array.isArray(slide.descriptionText) 
        ? slide.descriptionText.some(t => t.toLowerCase().includes(q))
        : slide.descriptionText?.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#0D1017] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Grid className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-sm text-white tracking-wide uppercase">
                Índice de Slides ({slides.length})
              </h2>
              <p className="text-[11px] text-slate-400">
                Navegue pelas seções do Relatório Técnico
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-900/30">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filtrar por título, canal, entregável..."
              className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Grid List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredSlides.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Nenhum slide encontrado para "{searchQuery}"</p>
            </div>
          ) : (
            filteredSlides.map((slide) => {
              const originalIndex = slides.findIndex((s) => s.id === slide.id);
              const isActive = originalIndex === currentIndex;

              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    onSelectSlide(originalIndex);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group relative overflow-hidden ${
                    isActive
                      ? 'bg-blue-950/60 border-blue-500/80 shadow-lg shadow-blue-950/50'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  {/* Left Number Badge */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-black shrink-0 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-400 shadow'
                      : 'bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200'
                  }`}>
                    {String(originalIndex + 1).padStart(2, '0')}
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 border border-blue-800/50 text-blue-400 uppercase tracking-wider">
                        {slide.categoryLabel}
                      </span>
                      {isActive && (
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
                          <Check className="w-2.5 h-2.5" /> Atual
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-xs text-white group-hover:text-blue-300 transition-colors line-clamp-1 uppercase">
                      {slide.title}
                    </h3>

                    {slide.subtitle && (
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>

                  <ChevronRight className={`w-4 h-4 self-center shrink-0 transition-transform ${
                    isActive ? 'text-blue-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-300'
                  }`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-[11px] text-slate-400 text-center">
          Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200 font-mono text-[10px]">ESC</kbd> para fechar ou clique em um slide.
        </div>
      </div>
    </div>
  );
};
