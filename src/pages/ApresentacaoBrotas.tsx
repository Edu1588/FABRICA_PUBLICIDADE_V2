import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BROTAS_SLIDES, BrotasSlideData } from '../data/brotasSlidesData';
import BrotasSlideRenderer from '../components/BrotasSlideRenderer';
import BrotasEditSlideModal from '../components/BrotasEditSlideModal';
import { optimizeAndCompressImage } from '../lib/imageOptimizer';
import { fetchPresentationSlides, syncPresentationSlides } from '../lib/presentationService';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Home,
  Grid,
  Upload,
  Edit3,
  Sparkles,
  RotateCcw,
  CloudCheck,
  CheckCircle2
} from 'lucide-react';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const fadeVariants = {
  enter: { opacity: 0, scale: 0.95 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

export default function ApresentacaoBrotas() {
  const [slides, setSlides] = useState<BrotasSlideData[]>(() => {
    try {
      const saved = localStorage.getItem('pres_slides_brotas-360') || localStorage.getItem('brotas360_custom_slides_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('localStorage error', e);
    }
    return BROTAS_SLIDES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('pres_images_brotas-360') || localStorage.getItem('brotas360_images');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex] || BROTAS_SLIDES[0];

  // Load from Supabase Database on mount
  useEffect(() => {
    fetchPresentationSlides('brotas-360', BROTAS_SLIDES).then(({ slides: loadedSlides, images: loadedImages }) => {
      if (loadedSlides && loadedSlides.length > 0) {
        setSlides(loadedSlides);
      }
      if (loadedImages && Object.keys(loadedImages).length > 0) {
        setUploadedImages(loadedImages);
      }
    });
  }, []);

  // Check URL query param ?edit=true to open editor immediately
  useEffect(() => {
    if (window.location.search.includes('edit=true')) {
      setIsEditModalOpen(true);
    }
  }, []);

  // Save changes from Edit Slide Modal (persisting to Supabase & localStorage)
  const handleSaveSlideData = (updatedSlide: BrotasSlideData) => {
    setSlides(prev => {
      const updated = prev.map(s => s.id === updatedSlide.id ? updatedSlide : s);
      syncPresentationSlides('brotas-360', updated, uploadedImages);
      return updated;
    });
  };

  // Reset current slide to initial default
  const handleResetCurrentSlide = () => {
    const original = BROTAS_SLIDES.find(s => s.id === currentSlide.id);
    if (original) {
      handleSaveSlideData(original);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditModalOpen) return; // don't navigate while typing in modal

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        if (showThumbnails) setShowThumbnails(false);
        else if (isFullscreen) toggleFullscreen();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'g' || e.key === 'G') {
        setShowThumbnails(prev => !prev);
      } else if (e.key === 'e' || e.key === 'E') {
        setIsEditModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen, showThumbnails, isEditModalOpen]);

  // Track fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setShowThumbnails(false);
  }, [currentIndex]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  // Image Upload with SEO optimization, < 1MB compression & Supabase sync
  const handleImageUpload = useCallback(async (slotId: string, file: File) => {
    try {
      const optimized = await optimizeAndCompressImage(file, {
        categoryLabel: currentSlide.categoryLabel,
        slideTitle: currentSlide.title,
        clientName: 'brotas-360',
        maxSizeBytes: 1024 * 1024 // Strictly under 1MB
      });

      const finalUrl = optimized.publicUrl || optimized.dataUrl;

      setUploadedImages(prev => {
        const updatedImages = { ...prev, [slotId]: finalUrl };
        setSlides(prevSlides => {
          const updatedSlides = prevSlides.map(s => {
            if (s.id === currentSlide.id && s.imageSlots) {
              return {
                ...s,
                imageSlots: s.imageSlots.map(slot =>
                  slot.id === slotId ? { ...slot, defaultUrl: finalUrl } : slot
                )
              };
            }
            return s;
          });
          // Persist both images map and slides array to Supabase & localStorage
          syncPresentationSlides('brotas-360', updatedSlides, updatedImages);
          return updatedSlides;
        });
        return updatedImages;
      });
    } catch (err) {
      console.error('Erro ao otimizar e comprimir imagem:', err);
    }
  }, [currentSlide]);

  const useSlideAnimation = currentSlide.animationType === 'zoom' || currentSlide.animationType === 'fade';
  const variants = useSlideAnimation ? fadeVariants : slideVariants;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden select-none"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top-Right Next Slide Tab Button (Exact Reference Match) */}
      <button
        onClick={goNext}
        disabled={currentIndex === totalSlides - 1}
        className="absolute top-0 right-6 md:right-14 z-50 bg-[#062a1d] hover:bg-[#0a3a27] text-white w-14 sm:w-16 md:w-20 h-11 sm:h-12 md:h-14 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
        title="Próximo slide (→ ou Espaço)"
        aria-label="Próximo slide"
      >
        <svg viewBox="0 0 38 16" className="w-8 sm:w-9 md:w-10 h-3.5 sm:h-4 fill-none stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform duration-200 group-hover:translate-x-1.5">
          <line x1="2" y1="8" x2="34" y2="8" />
          <polyline points="26,2 34,8 26,14" />
        </svg>
      </button>

      {/* Slides Container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-0 top-0 bottom-14 overflow-hidden"
        >
          <BrotasSlideRenderer
            slide={currentSlide}
            isEditing={isEditing}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        {/* Progress bar */}
        <div className="w-full h-1 bg-black/20">
          <motion.div
            className="h-full bg-[#00A859]"
            initial={false}
            animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-black/75 backdrop-blur-md border-t border-white/10">
          {/* Left: Slide counter & Category */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-mono font-bold">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-[#FFC20E] text-xs font-bold uppercase tracking-wider hidden sm:inline">
              {currentSlide.categoryLabel || 'Brotas 360°'}
            </span>
          </div>

          {/* Center: Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Slide anterior"
              title="Slide anterior (←)"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === totalSlides - 1}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
              aria-label="Próximo slide"
              title="Próximo slide (→)"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Right: Actions (Edit Slide, Grid, Upload, Fullscreen, Admin) */}
          <div className="flex items-center gap-2">
            {/* EDIT SLIDE BUTTON */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A859] hover:bg-[#008f4c] text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
              title="Editar textos, cores e elementos deste slide (E)"
            >
              <Edit3 size={15} />
              <span className="hidden md:inline">Editar Slide</span>
            </button>

            {/* Grid Thumbnails */}
            <button
              onClick={() => setShowThumbnails(prev => !prev)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Ver todos os slides"
              title="Grid de slides (G)"
            >
              <Grid size={18} />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
              title="Tela cheia (F)"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            {/* Back to Admin */}
            <a
              href="/admin"
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Voltar ao admin"
              title="Voltar ao Painel Admin"
            >
              <Home size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Slide Edit Modal */}
      <BrotasEditSlideModal
        slide={currentSlide}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSlideData}
        onReset={handleResetCurrentSlide}
        onImageUpload={handleImageUpload}
        uploadedImages={uploadedImages}
      />

      {/* Thumbnail grid overlay */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-[60] bg-black/90 backdrop-blur-md overflow-y-auto p-6"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Brotas 360° — Índice de Lâminas
                  </h2>
                  <p className="text-xs text-white/50 font-mono">39 Slides Estruturados</p>
                </div>
                <button
                  onClick={() => setShowThumbnails(false)}
                  className="text-white/80 hover:text-white text-xs font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Fechar (Esc)
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all group ${
                      index === currentIndex
                        ? 'border-[#00A859] ring-2 ring-[#00A859]/50 shadow-lg'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center p-2.5 ${
                      slide.isDark ? 'bg-[#0A0F1A]' : 'bg-white'
                    }`}>
                      <span className={`text-[9px] sm:text-[11px] text-center leading-tight font-bold ${
                        slide.isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {slide.title}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 text-[9px] text-white/70 flex items-center justify-between font-mono">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-[#FFC20E] font-bold">{slide.categoryLabel}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side click areas for navigation (desktop) */}
      <div
        className="absolute left-0 top-0 w-1/6 h-[calc(100%-60px)] z-40 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
        onClick={goPrev}
      >
        <div className="h-full flex items-center justify-start pl-4">
          {currentIndex > 0 && (
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white/80">
              <ChevronLeft size={32} />
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute right-0 top-0 w-1/6 h-[calc(100%-60px)] z-40 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
        onClick={goNext}
      >
        <div className="h-full flex items-center justify-end pr-4">
          {currentIndex < totalSlides - 1 && (
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm text-white/80">
              <ChevronRight size={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
