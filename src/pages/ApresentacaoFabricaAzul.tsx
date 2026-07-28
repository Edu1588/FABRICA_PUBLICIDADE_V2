import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA } from '../data/slidesData';
import { SlideRenderer } from '../components/SlideRenderer';
import { EditSlideModal } from '../components/EditSlideModal';
import { PrintView } from '../components/PrintView';
import { FabricaAzulLandingPage } from '../components/FabricaAzulLandingPage';
import { SlideData } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Pencil,
  FileDown,
  Layout,
  Play
} from 'lucide-react';

export default function ApresentacaoFabricaAzul() {
  const [slides, setSlides] = useState<SlideData[]>(() => {
    let saved = null;
    try {
      saved = localStorage.getItem('azul_slides_data_v2');
    } catch (err) {
      console.warn('localStorage is not accessible');
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        } else {
          return SLIDES_DATA;
        }
      } catch (e) {
        console.error('Erro ao carregar slides salvos:', e);
      }
    }
    return SLIDES_DATA;
  });

  const [viewMode, setViewMode] = useState<'landing' | 'presentation'>('landing');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isFullscreenActive, setIsFullscreenActive] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPrintMode, setIsPrintMode] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('azul_slides_data_v2', JSON.stringify(slides));
    } catch (err) {
      console.warn('localStorage is not accessible');
    }
  }, [slides]);

  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const isDarkSlide = currentSlide.id === 1 || currentSlide.id === 3 || currentSlide.id === 20;

  const handleSaveSlideData = (updatedSlide: SlideData) => {
    setSlides(prevSlides => 
      prevSlides.map(slide => slide.id === updatedSlide.id ? updatedSlide : slide)
    );
  };

  const handleResetSlide = () => {
    const original = SLIDES_DATA.find(s => s.id === currentSlide.id);
    if (original) {
      handleSaveSlideData(original);
    }
  };

  // Track native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenActive(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  const handleSelectSlide = (index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && !isFullscreenActive) {
      setIsFullscreenActive(true);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreenActive(false);
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isFullscreenActive]);

  // Keyboard Shortcuts (Arrow keys, Space, F, P) when in presentation mode
  useEffect(() => {
    if (viewMode !== 'presentation') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p') {
        setIsPrintMode(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNext, handlePrev, toggleFullscreen]);

  if (isPrintMode) {
    return (
      <PrintView 
        slides={slides} 
        onBack={() => setIsPrintMode(false)} 
      />
    );
  }

  if (viewMode === 'landing') {
    return (
      <FabricaAzulLandingPage 
        slides={slides}
        onOpenPresentation={() => setViewMode('presentation')}
        onDownloadPDF={() => setIsPrintMode(true)}
      />
    );
  }

  return (
    <div className={`w-screen h-screen overflow-hidden bg-[#060d20] select-none relative flex flex-col justify-between ${isDarkSlide ? 'dark-ui' : ''}`}>
      {/* Top Slide Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/10 z-50 no-print">
        <div 
          className="h-full bg-gradient-to-r from-[#0a1c6a] via-blue-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Mode Switcher Top Bar in Presentation Mode */}
      {!isFullscreenActive && (
        <div className="fixed top-4 left-4 z-50 no-print flex items-center gap-2">
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2 bg-[#0a1c6a]/90 hover:bg-blue-950 text-white border border-cyan-400/50 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md transition-all duration-200"
            title="Voltar para a Landing Page"
          >
            <Layout className="w-4 h-4 text-cyan-400" />
            <span>Modo Landing Page</span>
          </button>
        </div>
      )}

      {/* Main Fullscreen Stage */}
      <main className="w-full h-full relative overflow-hidden flex items-center justify-center">
        <SlideRenderer slide={currentSlide} direction={direction} isFullscreen={isFullscreenActive} />
      </main>

      {/* Pagination Dots on Right Edge */}
      <div className="pagination-container no-print">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSlide(idx)}
            className={`pagination-dot ${idx === currentSlideIndex ? 'active' : ''}`}
            title={`Slide ${idx + 1}: ${s.title}`}
          />
        ))}
      </div>

      {/* Bottom Right Floating Nav Buttons */}
      <div className="nav-controls no-print">
        {!isFullscreenActive && (
          <>
            <button
              onClick={() => setIsPrintMode(true)}
              className="nav-btn !bg-blue-600 !text-white hover:!bg-blue-500 font-bold !border-blue-500 shadow-md"
              title="Baixar Apresentação em PDF (P)"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="nav-btn !bg-amber-400 !text-slate-950 hover:!bg-amber-300 font-bold !border-amber-300 shadow-md"
              title="Editar Conteúdo do Slide"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </>
        )}
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="nav-btn disabled:opacity-30 disabled:pointer-events-none"
          title="Slide Anterior (←)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className="nav-btn disabled:opacity-30 disabled:pointer-events-none"
          title="Próximo Slide (→)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="nav-btn"
          title={isFullscreenActive ? "Sair da Tela Cheia" : "Tela Cheia (F)"}
        >
          {isFullscreenActive ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Edit Slide Modal */}
      <EditSlideModal
        isOpen={isEditModalOpen}
        slide={currentSlide}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSlideData}
        onResetSlide={handleResetSlide}
      />
    </div>
  );
}
