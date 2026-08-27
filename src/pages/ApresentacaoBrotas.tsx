import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BROTAS_SLIDES, BrotasSlideData } from '../data/brotasSlidesData';
import BrotasSlideRenderer from '../components/BrotasSlideRenderer';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Home,
  Grid,
  Upload
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
  const [slides] = useState<BrotasSlideData[]>(BROTAS_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('brotas360_images');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

  // Save uploaded images to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brotas360_images', JSON.stringify(uploadedImages));
    } catch (e) {
      console.warn('localStorage not accessible');
    }
  }, [uploadedImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen, showThumbnails]);

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

  const handleImageUpload = useCallback((slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImages(prev => ({ ...prev, [slotId]: result }));
    };
    reader.readAsDataURL(file);
  }, []);

  const useSlideAnimation = currentSlide.animationType === 'zoom' || currentSlide.animationType === 'fade';
  const variants = useSlideAnimation ? fadeVariants : slideVariants;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden select-none"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <BrotasSlideRenderer
            slide={currentSlide}
            isEditing={isEditing}
            onImageUpload={handleImageUpload}
            uploadedImages={uploadedImages}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        {/* Progress bar */}
        <div className="w-full h-1 bg-black/20">
          <motion.div
            className="h-full bg-[#1B9C4F]"
            initial={false}
            animate={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-sm">
          {/* Left: slide counter */}
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm font-mono">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">
              {currentSlide.categoryLabel}
            </span>
          </div>

          {/* Center: nav arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === totalSlides - 1}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowThumbnails(prev => !prev)}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Ver todos os slides"
              title="Grid de slides (G)"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setIsEditing(prev => !prev)}
              className={`p-2 rounded-full transition-colors ${
                isEditing
                  ? 'text-[#1B9C4F] bg-[#1B9C4F]/20'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Modo edição"
              title="Editar imagens"
            >
              <Upload size={18} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
              title="Tela cheia (F)"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <a
              href="/admin"
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Voltar ao admin"
              title="Voltar"
            >
              <Home size={18} />
            </a>
          </div>
        </div>
      </div>

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
                <h2 className="text-white text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Brotas 360° — Slides
                </h2>
                <button
                  onClick={() => setShowThumbnails(false)}
                  className="text-white/70 hover:text-white text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Fechar (Esc)
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all group ${
                      index === currentIndex
                        ? 'border-[#1B9C4F] ring-2 ring-[#1B9C4F]/50'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className={`absolute inset-0 flex items-center justify-center p-2 ${
                      slide.isDark ? 'bg-[#0A0F1A]' : 'bg-white'
                    }`}>
                      <span className={`text-[8px] sm:text-[10px] text-center leading-tight font-medium ${
                        slide.isDark ? 'text-white/70' : 'text-gray-700'
                      }`}>
                        {slide.title}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-0.5 text-[9px] text-white/60 flex items-center justify-between">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-[#FFB800]">{slide.categoryLabel}</span>
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
            <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/70">
              <ChevronLeft size={28} />
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
            <div className="p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/70">
              <ChevronRight size={28} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
