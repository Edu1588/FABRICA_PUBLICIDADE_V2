import React from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  FileText, 
  Grid, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Printer,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { PresentationSettings } from '../types';

interface HeaderNavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  slideCategory: string;
  slideTitle: string;
  onNext: () => void;
  onPrev: () => void;
  onOpenDrawer: () => void;
  onToggleNotes: () => void;
  onTogglePrint: () => void;
  onToggleFullscreen: () => void;
  settings: PresentationSettings;
  onUpdateSettings: (newSettings: Partial<PresentationSettings>) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isPrintMode: boolean;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentSlideIndex,
  totalSlides,
  slideCategory,
  slideTitle,
  onNext,
  onPrev,
  onOpenDrawer,
  onToggleNotes,
  onTogglePrint,
  onToggleFullscreen,
  settings,
  onUpdateSettings,
  searchQuery,
  onSearchChange,
  isPrintMode
}) => {
  return (
    <header className="no-print bg-[#0D1017]/90 backdrop-blur-md border-b border-slate-800/80 text-white px-4 py-2.5 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Brand & Slide Progress Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-black text-white text-xs shadow-inner tracking-tighter">
            F
          </div>
          <div>
            <span className="font-heading font-extrabold text-sm tracking-tight text-white block leading-none">
              AZUL <span className="text-blue-500 font-normal">VEÍCULOS</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block mt-0.5">
              FÁBRICA PUBLICIDADE
            </span>
          </div>
        </div>

        {/* Current Slide Tag */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/50 text-[11px] font-semibold uppercase tracking-wider">
            {slideCategory}
          </span>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[200px] lg:max-w-[320px]">
            {slideTitle}
          </span>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar nos slides..."
            className="pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-36 lg:w-48 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
          <button
            onClick={onPrev}
            disabled={currentSlideIndex === 0}
            className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 rounded-md transition-colors"
            title="Slide Anterior (Seta Esquerda)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenDrawer}
            className="px-2.5 py-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-bold hover:bg-slate-800/80 rounded transition-colors flex items-center gap-1.5"
            title="Ver grade de slides"
          >
            <span>{String(currentSlideIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{String(totalSlides).padStart(2, '0')}</span>
            <Grid className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          <button
            onClick={onNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 rounded-md transition-colors"
            title="Próximo Slide (Seta Direita / Espaço)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Auto Play Toggle */}
        <button
          onClick={() => onUpdateSettings({ autoPlay: !settings.autoPlay })}
          className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
            settings.autoPlay 
              ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40' 
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
          title={settings.autoPlay ? 'Pausar Reprodução Automática' : 'Iniciar Apresentação Automática'}
        >
          {settings.autoPlay ? (
            <>
              <Pause className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden lg:inline">Apresentando</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Auto-play</span>
            </>
          )}
        </button>

        {/* Auto Play Interval Selector */}
        {settings.autoPlay && (
          <select
            value={settings.autoPlayInterval}
            onChange={(e) => onUpdateSettings({ autoPlayInterval: Number(e.target.value) })}
            className="bg-slate-900 border border-slate-800 text-xs text-blue-400 rounded-lg px-2 py-1.5 focus:outline-none"
          >
            <option value={4}>4s</option>
            <option value={6}>6s</option>
            <option value={8}>8s</option>
            <option value={12}>12s</option>
          </select>
        )}

        {/* Sound Toggle */}
        <button
          onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
          className={`p-2 rounded-lg border transition-colors ${
            settings.soundEnabled 
              ? 'bg-slate-800 text-blue-400 border-slate-700' 
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
          title={settings.soundEnabled ? 'Sons Ativados' : 'Sons Desativados'}
        >
          {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Presenter Notes Button */}
        <button
          onClick={onToggleNotes}
          className={`p-2 rounded-lg border transition-colors ${
            settings.showNotes 
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
          title="Notas do Apresentador (Atalho: N)"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen Mode */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 bg-slate-900 text-slate-400 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          title="Tela Cheia"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Print / Export Mode */}
        <button
          onClick={onTogglePrint}
          className={`p-2 rounded-lg border transition-colors ${
            isPrintMode 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
          }`}
          title="Modo Impressão / Exportar PDF"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
