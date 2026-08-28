import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Layout,
  Star,
  AlertTriangle,
  CheckCircle,
  BarChart,
  MessageCircle,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Monitor,
  FileText,
  Map,
  Bell,
  Users,
  DollarSign,
  Eye,
  Heart,
  Clock,
  ThumbsUp,
  Newspaper,
  Search,
  Palette,
  Play,
  Rocket,
  Award,
  Wrench,
  Film,
  ClipboardList,
  Cpu,
  Code,
  MapPin,
  Handshake,
  PiggyBank,
  Upload,
  Layers,
  ArrowRight,
  Check,
  Smartphone,
  Globe
} from 'lucide-react';
import { BrotasSlideData } from '../data/brotasSlidesData';
import { generateSeoAltText } from '../lib/imageOptimizer';
import SplitText from './SplitText';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
  Calendar,
  Layout,
  Star,
  AlertTriangle,
  CheckCircle,
  BarChart,
  MessageCircle,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Monitor,
  FileText,
  Map,
  Bell,
  Users,
  DollarSign,
  Eye,
  Heart,
  Clock,
  ThumbsUp,
  Newspaper,
  Search,
  Palette,
  Play,
  Rocket,
  Award,
  Wrench,
  Film,
  ClipboardList,
  Cpu,
  Code,
  MapPin,
  Handshake,
  PiggyBank,
  Layers,
  Smartphone,
  Globe
};

// Official Brotas Pinwheel Logo Component
function BrotasLogoBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl px-5 py-3 flex flex-col items-center justify-center border border-black/5 ${className}`}>
      <svg viewBox="0 0 100 70" className="w-14 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top-Left: Blue */}
        <path d="M42 22C35 14 24 16 28 8C32 0 46 10 42 22Z" fill="#0074BC" />
        <circle cx="27" cy="10" r="3.5" fill="#0074BC" />
        {/* Top-Right: Red */}
        <path d="M58 22C65 14 76 16 72 8C68 0 54 10 58 22Z" fill="#ED1C24" />
        <circle cx="73" cy="10" r="3.5" fill="#ED1C24" />
        {/* Bottom-Left: Green */}
        <path d="M42 36C35 44 24 42 28 50C32 58 46 48 42 36Z" fill="#00A651" />
        <circle cx="27" cy="48" r="3.5" fill="#00A651" />
        {/* Bottom-Right: Yellow */}
        <path d="M58 36C65 44 76 42 72 50C68 58 54 48 58 36Z" fill="#FFC20E" />
        <circle cx="73" cy="48" r="3.5" fill="#FFC20E" />
        {/* Center core */}
        <circle cx="50" cy="29" r="3" fill="#0074BC" />
      </svg>
      <span className="text-[#0074BC] font-black text-sm tracking-tight -mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
        Brotas
      </span>
    </div>
  );
}

// 360° Circular Sweeping Arrow SVG
function CircularArrow360() {
  return (
    <svg viewBox="0 0 340 90" className="w-full max-w-[340px] md:max-w-[400px] h-14 md:h-16 mx-auto -mt-6 md:-mt-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer sweeping curved path */}
      <path
        d="M 50 25 C 20 58, 80 82, 170 82 C 260 82, 320 58, 290 25"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead pointing right */}
      <path
        d="M 155 74 L 180 82 L 155 90 Z"
        fill="white"
      />
    </svg>
  );
}

interface BrotasSlideRendererProps {
  slide: BrotasSlideData;
  isEditing?: boolean;
  onImageUpload?: (slotId: string, file: File) => void;
  uploadedImages?: Record<string, string>;
}

export default function BrotasSlideRenderer({
  slide,
  isEditing = false,
  onImageUpload,
  uploadedImages = {}
}: BrotasSlideRendererProps) {
  const handleImageChange = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(slotId, e.target.files[0]);
    }
  };

  const ImageSlot = ({
    slotId,
    defaultUrl,
    className = '',
    label,
    alt
  }: {
    slotId: string;
    defaultUrl?: string;
    className?: string;
    label?: string;
    alt?: string;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageUrl = uploadedImages[slotId] || defaultUrl;
    const seoAlt = alt || generateSeoAltText(slide.categoryLabel, slide.title, 'Brotas 360 - Prefeitura de Brotas');

    return (
      <div className={`relative group overflow-hidden ${className}`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={seoAlt}
            title={seoAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            onClick={() => isEditing && fileInputRef.current?.click()}
            className={`w-full h-full border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
              isEditing ? 'cursor-pointer hover:bg-[#00A859]/10 hover:border-[#00A859]' : ''
            } ${
              slide.isDark
                ? 'bg-[#111827]/70 border-white/20 text-white/40'
                : 'bg-gray-50/90 border-gray-300 text-gray-400'
            }`}
          >
            <Upload className="w-8 h-8 mb-2 opacity-40" />
            <span className="text-xs font-mono font-medium tracking-wide">
              {label || 'Espaço para Fotografia'}
            </span>
            {isEditing && (
              <span className="text-[10px] text-[#00A859] font-bold mt-1">
                + Clique para carregar
              </span>
            )}
          </div>
        )}

        {isEditing && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-30">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#00A859] hover:bg-[#008f4c] text-white px-3.5 py-2 rounded-xl shadow-xl text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105"
              title="Trocar Imagem"
            >
              <Upload className="w-4 h-4" />
              {imageUrl ? 'Trocar Imagem' : 'Carregar Imagem'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageChange(slotId, e)}
            />
          </div>
        )}
      </div>
    );
  };

  const getAnim = (index: number = 0) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.08, duration: 0.45 }
  });

  const renderLayout = () => {
    switch (slide.layoutType) {
      // 1. EXACT COVER SLIDE MATCHING USER REFERENCE
      case 'hero_cover':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 bg-black overflow-hidden select-none">
            {/* Background Photography with Warm Sunset Lighting */}
            <div className="absolute inset-0 z-0">
              <ImageSlot
                slotId={slide.imageSlots?.[0]?.id || 'cover-bg'}
                defaultUrl={slide.imageSlots?.[0]?.defaultUrl || '/images/brotas/brotas_cover.jpg'}
                label="Foto Territorial Brotas"
                className="w-full h-full brightness-[0.95]"
              />
              {/* Subtle dark bottom vignette for crisp text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70 pointer-events-none"></div>
            </div>

            {/* Top Bar: Floating Brotas Logo on Left + Glass Nav Capsule in Center */}
            <div className="relative z-20 flex items-start justify-between w-full">
              {/* Top Left Brotas Logo Badge */}
              <motion.div {...getAnim(0)}>
                <BrotasLogoBadge />
              </motion.div>

              {/* Top Center Frosted Glass Navigation Pill */}
              <motion.div
                {...getAnim(1)}
                className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-lg mx-auto"
              >
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Home</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">About Us</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Team</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Service</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Portfolio</span>
              </motion.div>

              {/* Top Right Spacer for symmetry */}
              <div className="w-24 hidden md:block"></div>
            </div>

            {/* Center Area: BROTAS 360° Wordmark + Circular Arrow + 4 Colors + Yellow Text */}
            <div className="relative z-20 my-auto text-center flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
              {/* BROTAS serif wordmark with SplitText */}
              <h1
                className="text-7xl sm:text-8xl md:text-9xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <SplitText
                  text={slide.title || 'BROTAS'}
                  splitType="chars"
                  delay={45}
                  duration={0.8}
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h1>

              {/* 360° text with sweeping circular arrow */}
              <motion.div {...getAnim(2)} className="relative flex flex-col items-center justify-center -mt-2 md:-mt-4">
                <span
                  className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {slide.subtitle || '360°'}
                </span>
                {/* Sweeping 360 arrow icon */}
                <CircularArrow360 />
              </motion.div>

              {/* 4-Color Segment Bar (Google/Brotas palette) */}
              <motion.div {...getAnim(3)} className="flex items-center justify-center gap-2 my-2">
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#0074BC] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#FFC20E] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#00A651] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#ED1C24] shadow-sm"></div>
              </motion.div>

              {/* Yellow / Golden Slogan with Leading Dots and SplitText */}
              <div
                className="text-[#FFD000] text-sm sm:text-base md:text-lg font-bold tracking-wide text-center space-y-1 drop-shadow-md mt-1"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <p>
                  <SplitText
                    text=".Conectar a gestão. Organizar a informação"
                    splitType="words"
                    delay={40}
                    duration={0.65}
                  />
                </p>
                <p>
                  <SplitText
                    text=".Comunicar as entregas. Aproximar a população"
                    splitType="words"
                    delay={40}
                    duration={0.65}
                  />
                </p>
              </div>
            </div>

            {/* Bottom Area: Social Icons + Green Corner Protruding Tabs */}
            <div className="relative z-20 flex flex-col items-center justify-end w-full">
              {/* Social links f, in, X */}
              <motion.div {...getAnim(4)} className="flex items-center justify-center gap-6 text-white text-xs font-bold opacity-80 mb-2">
                <span className="cursor-pointer hover:text-[#FFC20E] transition-colors">f</span>
                <span className="cursor-pointer hover:text-[#FFC20E] transition-colors">in</span>
                <span className="cursor-pointer hover:text-[#FFC20E] transition-colors">𝕏</span>
              </motion.div>

              {/* Bottom-Left Protruding Green Pill Tab */}
              <div className="absolute -bottom-8 md:-bottom-12 left-0 w-40 md:w-56 h-10 md:h-14 bg-[#00A859] rounded-t-3xl pointer-events-none"></div>

              {/* Bottom-Right Protruding Green Pill Tab */}
              <div className="absolute -bottom-8 md:-bottom-12 right-0 w-40 md:w-56 h-10 md:h-14 bg-[#00A859] rounded-t-3xl pointer-events-none"></div>
            </div>
          </div>
        );

      // 2. SPLIT LAYOUT (TEXT LEFT, PHOTO RIGHT) MATCHING REFERENCE
      case 'split_text_photo':
      case 'dark_centered':
        return (
          <div className="relative w-full h-full bg-white flex flex-col md:flex-row p-10 md:p-16 gap-8 md:gap-14 items-center justify-between overflow-hidden select-none">
            {/* Far-Left Dark Vertical Accent Border */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#1A1A24] z-10 pointer-events-none"></div>

            {/* Bottom-Left Deep Forest Green Corner Curve (#0B4D3C) */}
            <div className="absolute bottom-0 left-0 w-44 md:w-56 h-44 md:h-56 bg-[#0B4D3C] rounded-tr-full z-0 pointer-events-none"></div>

            {/* Top-Right Bright Vibrant Green Corner Curve (#00A859) */}
            <div className="absolute top-0 right-0 w-52 md:w-72 h-52 md:h-72 bg-[#00A859] rounded-bl-full z-0 pointer-events-none"></div>

            {/* Left Column: Heading + Amber Label + Body */}
            <div className="w-full md:w-1/2 z-10 flex flex-col justify-center max-w-xl pl-4">
              {/* Big Bold Headline in Playfair Serif with SplitText */}
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>

              {/* Amber / Yellow Category Label */}
              <motion.div
                {...getAnim(1)}
                className="text-[#FFB800] text-sm md:text-base font-bold tracking-wide mb-5"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {slide.categoryLabel || 'Problema'}
              </motion.div>

              {/* Body Texts / Paragraphs */}
              <div className="space-y-4 text-gray-600 text-sm md:text-base font-normal leading-relaxed">
                {slide.texts?.map((item, idx) => (
                  <motion.p key={idx} {...getAnim(2 + idx)}>
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Right Column: Square / Rectangular Photo Frame with Green Background Shape */}
            <div className="w-full md:w-1/2 h-[340px] md:h-[480px] z-10 relative flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                <ImageSlot
                  slotId={slide.imageSlots?.[0]?.id || `img-${slide.id}`}
                  defaultUrl={slide.imageSlots?.[0]?.defaultUrl}
                  label={slide.imageSlots?.[0]?.label || 'Fotografia'}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        );

      // 3. SPLIT PHOTO LEFT, TEXT RIGHT (WITH BLUE & RED ACCENTS AS IN REFERENCE)
      case 'before_after':
        return (
          <div className="relative w-full h-full bg-white flex flex-col md:flex-row p-10 md:p-16 gap-8 md:gap-14 items-center justify-between overflow-hidden select-none">
            {/* Left Green Curve behind Photo */}
            <div className="absolute top-12 left-0 w-44 md:w-56 h-80 bg-[#00A859] rounded-r-3xl z-0 pointer-events-none"></div>

            {/* Top-Right Blue Accent Shape */}
            <div className="absolute top-0 right-0 w-40 md:w-52 h-14 bg-[#1E88E5] rounded-bl-3xl z-0 pointer-events-none"></div>

            {/* Bottom-Right Red Accent Shape */}
            <div className="absolute bottom-0 right-0 w-48 md:w-64 h-14 bg-[#D32F2F] rounded-tl-3xl z-0 pointer-events-none"></div>

            {/* Left Column: Photo Frame */}
            <div className="w-full md:w-1/2 h-[340px] md:h-[480px] z-10 relative flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                <ImageSlot
                  slotId={slide.imageSlots?.[0]?.id || `img-${slide.id}`}
                  defaultUrl={slide.imageSlots?.[0]?.defaultUrl}
                  label={slide.imageSlots?.[0]?.label || 'Foto'}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Column: Heading + Yellow Label + Text */}
            <div className="w-full md:w-1/2 z-10 flex flex-col justify-center max-w-xl">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>

              <motion.div
                {...getAnim(1)}
                className="text-[#FFB800] text-sm md:text-base font-bold tracking-wide mb-4"
              >
                {slide.categoryLabel || 'Visão'}
              </motion.div>

              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                {slide.texts?.map((item, idx) => (
                  <motion.p key={idx} {...getAnim(2 + idx)}>
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        );

      // 4. FUNNEL LAYOUT
      case 'funnel_vertical':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col items-center justify-center overflow-hidden">
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0B4D3C] rounded-tr-full pointer-events-none"></div>

            <motion.span {...getAnim(0)} className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-2">
              {slide.categoryLabel || 'Diagnóstico'}
            </motion.span>

            <h2
              className="text-3xl md:text-5xl font-black text-gray-950 text-center mb-10"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              <SplitText
                text={slide.title}
                splitType="words"
                delay={35}
                duration={0.7}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </h2>

            <div className="w-full max-w-3xl flex flex-col items-center gap-4 z-10">
              {slide.funnelItems?.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...getAnim(2 + idx)}
                  style={{ width: item.width, backgroundColor: item.color }}
                  className="py-4 px-6 rounded-2xl text-white font-semibold text-center shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="text-sm md:text-base tracking-wide font-bold">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {slide.texts && slide.texts.length > 0 && (
              <div className="mt-8 text-center text-gray-600 text-sm max-w-xl z-10">
                {slide.texts.join(' ')}
              </div>
            )}
          </div>
        );

      // 5. FLOW & HORIZONTAL STEPS
      case 'flow_horizontal':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#00A859] rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0B4D3C] rounded-tr-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full z-10">
              <motion.span {...getAnim(0)} className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-2 block">
                {slide.categoryLabel || 'Metodologia'}
              </motion.span>

              <h2
                className="text-3xl md:text-5xl font-black text-gray-950 mb-8"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-8">
                {(slide.diagramData?.flowItems || slide.diagramData?.steps || []).map((step: string, idx: number) => (
                  <motion.div
                    key={idx}
                    {...getAnim(2 + idx)}
                    className="bg-white border-t-4 border-[#00A859] p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center group hover:shadow-xl transition-all"
                  >
                    <span className="text-[10px] font-mono text-[#00A859] font-bold mb-1">
                      ETAPA {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs md:text-sm font-bold text-gray-800 whitespace-pre-line">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {slide.texts && (
                <div className="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 text-sm leading-relaxed">
                  {slide.texts.join(' ')}
                </div>
              )}
            </div>
          </div>
        );

      // 6. PHOTO GRID (TERRITORIAL)
      case 'photo_grid':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Território'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
              {slide.texts && (
                <p className="text-gray-600 text-sm max-w-3xl">{slide.texts.join(' ')}</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-auto h-[320px] z-10">
              {(slide.imageSlots || [
                { id: 'grid-1', label: 'Brotas 1' },
                { id: 'grid-2', label: 'Brotas 2' },
                { id: 'grid-3', label: 'Brotas 3' },
                { id: 'grid-4', label: 'Brotas 4' },
                { id: 'grid-5', label: 'Brotas 5' }
              ]).map((slot) => (
                <div key={slot.id} className="rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                  <ImageSlot slotId={slot.id} label={slot.label} className="w-full h-full" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Brotas 360° · Presença Territorial</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 7. HUB & SPOKE (REDE RADIAL INTERCONECTADA COM FLUXO ANIMADO)
      case 'hub_spoke': {
        const spokes = slide.hubSpokes || [
          'CMS de Conteúdo',
          'Analytics Dashboard',
          'Chatbot de Atendimento',
          'App Mobile',
          'Integração WhatsApp',
          'Mapa Interativo'
        ];
        const numSpokes = spokes.length;
        const radiusX = 38; // percentage radius on X
        const radiusY = 36; // percentage radius on Y

        // Calculate positions on an ellipse
        const nodePositions = spokes.map((_, i) => {
          const angle = (2 * Math.PI * i) / numSpokes - Math.PI / 2;
          return {
            x: 50 + radiusX * Math.cos(angle),
            y: 50 + radiusY * Math.sin(angle)
          };
        });

        return (
          <div className="relative w-full h-full bg-white p-8 md:p-12 flex flex-col justify-between overflow-hidden select-none">
            {/* Background Corner Decors */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859]/10 rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0B4D3C]/10 rounded-tr-full pointer-events-none"></div>

            {/* Top Title & Category */}
            <div className="z-10 text-center">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 inline-block">
                {slide.categoryLabel || 'Tecnologia'}
              </span>
              <h2
                className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight"
                style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
              >
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
            </div>

            {/* Central Radial Network Stage */}
            <div className="relative w-full max-w-5xl mx-auto h-[420px] md:h-[480px] my-auto flex items-center justify-center">
              {/* CSS Animation Keyframes for Energy Beam Flow */}
              <style>{`
                @keyframes energyFlow {
                  from { stroke-dashoffset: 32; }
                  to { stroke-dashoffset: 0; }
                }
                @keyframes glowPulse {
                  0%, 100% { transform: scale(1); opacity: 0.8; }
                  50% { transform: scale(1.15); opacity: 0.3; }
                }
                .conduit-flow {
                  animation: energyFlow 1.2s linear infinite;
                }
                .hub-glow-ring {
                  animation: glowPulse 2.5s ease-in-out infinite;
                }
              `}</style>

              {/* SVG Canvas for Connecting Conduits & Flow Particles */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {nodePositions.map((pos, idx) => (
                  <g key={idx}>
                    {/* Base Conduit Line */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke="#00A859"
                      strokeWidth="2"
                      strokeOpacity="0.25"
                    />
                    {/* Animated Energy Flow Beam */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke="#00A859"
                      strokeWidth="2.5"
                      strokeDasharray="6 10"
                      className="conduit-flow"
                    />
                    {/* Secondary Accent Beam (Yellow/Gold) */}
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke="#FFC20E"
                      strokeWidth="1.5"
                      strokeDasharray="4 16"
                      className="conduit-flow"
                      style={{ animationDuration: '1.8s', animationDirection: 'reverse' }}
                    />
                  </g>
                ))}
              </svg>

              {/* Central Glowing Hub Orb */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                {/* Outer Glow Wave Rings */}
                <div className="absolute w-44 md:w-52 h-44 md:h-52 rounded-full bg-[#00A859]/20 hub-glow-ring pointer-events-none"></div>
                <div className="absolute w-36 md:w-44 h-36 md:h-44 rounded-full border-2 border-[#00A859]/40 animate-pulse pointer-events-none"></div>

                {/* Central Core */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-32 md:w-40 h-32 md:h-40 rounded-full bg-gradient-to-br from-[#00C853] via-[#00A859] to-[#0B4D3C] text-white shadow-2xl flex flex-col items-center justify-center text-center p-3 border-4 border-white z-10 cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest text-[#FFD000] drop-shadow">
                    SISTEMA CENTRAL
                  </span>
                  <span
                    className="text-base md:text-xl font-black leading-tight text-white mt-1 drop-shadow-md"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {slide.hubCenter || 'Portal Brotas'}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#FFD000] mt-1.5 animate-ping"></div>
                </motion.div>
              </div>

              {/* Orbiting Surrounding Cards with Floating Animation */}
              {nodePositions.map((pos, idx) => {
                const spoke = spokes[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -6, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.4, delay: idx * 0.08 },
                      scale: { duration: 0.4, delay: idx * 0.08 },
                      y: {
                        duration: 3.5 + (idx % 3) * 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }
                    }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div className="bg-white/95 backdrop-blur-md border-2 border-gray-100 hover:border-[#00A859] px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-3 transition-all duration-300 group-hover:scale-110">
                      {/* Active Connection Indicator */}
                      <div className="w-3 h-3 rounded-full bg-[#00A859] flex items-center justify-center shrink-0 shadow-sm shadow-[#00A859]">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
                      </div>

                      {/* Card Title */}
                      <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap group-hover:text-[#00A859] transition-colors">
                        {spoke}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Tag */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Brotas 360° · Ecossistema Integrado em Tempo Real</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 8. CYCLE DIAGRAM
      case 'cycle_diagram':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-14 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 z-10">
              {slide.categoryLabel || 'Processo'}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-8 text-center z-10" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              <SplitText
                text={slide.title}
                splitType="words"
                delay={35}
                duration={0.7}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </h2>

            <div className="grid grid-cols-3 gap-4 max-w-3xl w-full z-10">
              {slide.cycleItems?.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...getAnim(idx)}
                  className="bg-white border-l-4 border-[#00A859] p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00A859] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-gray-800">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // 9. GRID CARDS
      case 'grid_cards':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Entregas'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-1" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
              {slide.subtitle && <p className="text-gray-600 text-sm mb-4">{slide.subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-auto max-w-5xl mx-auto w-full z-10">
              {slide.gridCards?.map((card, idx) => {
                const IconComponent = (card.icon && ICON_MAP[card.icon]) || Star;
                return (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-white border border-gray-100 hover:border-[#00A859]/50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: card.color ? `${card.color}15` : '#00A85915', color: card.color || '#00A859' }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{card.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Brotas 360° · Metodologia Estruturada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 10. LEVELS BAR
      case 'levels_bar':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto w-full z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Estrutura'}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-10" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>

              <div className="space-y-6">
                {[
                  { level: 'Nível 1 · Informativo', desc: 'O que foi feito — obras, serviços, editais, horários', color: '#00A859' },
                  { level: 'Nível 2 · Educativo', desc: 'Por que importa — benefícios coletivos, economia, sustentabilidade', color: '#FFB800' },
                  { level: 'Nível 3 · Emocional', desc: 'Como impacta a vida — histórias de moradores, transformação e orgulho de Brotas', color: '#ED1C24' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="p-6 rounded-2xl shadow-lg text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-lg font-bold tracking-wide">{item.level}</span>
                    <span className="text-sm text-white/95 font-semibold">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      // 11. FAN OUT
      case 'fan_out':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto w-full z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Canais'}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-8" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Instagram', icon: 'Film', color: '#E1306C' },
                  { name: 'Facebook', icon: 'Users', color: '#1877F2' },
                  { name: 'TikTok', icon: 'Play', color: '#000000' },
                  { name: 'YouTube', icon: 'Film', color: '#FF0000' },
                  { name: 'Site Prefeitura', icon: 'Globe', color: '#00A859' },
                  { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
                  { name: 'Rádio Local', icon: 'Zap', color: '#FF7A00' },
                  { name: 'Imprensa & Clipping', icon: 'Newspaper', color: '#0074BC' }
                ].map((channel, idx) => {
                  const Icon = ICON_MAP[channel.icon] || Globe;
                  return (
                    <motion.div
                      key={idx}
                      {...getAnim(idx)}
                      className="p-5 rounded-2xl border border-gray-100 shadow-md flex items-center gap-3 hover:shadow-xl transition-all bg-white"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: channel.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-gray-800">{channel.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      // 12. MOCKUP TRIPLE / SYSTEM
      case 'mockup_triple':
      case 'mockup_system':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Tecnologia'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
              {slide.texts && <p className="text-gray-600 text-sm">{slide.texts.join(' · ')}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-auto max-w-5xl mx-auto w-full h-[320px] z-10">
              {(slide.imageSlots || [
                { id: 'mockup-1', label: 'Dashboard' },
                { id: 'mockup-2', label: 'App Mobile' },
                { id: 'mockup-3', label: 'Portal Web' }
              ]).map((slot, idx) => (
                <motion.div
                  key={slot.id}
                  {...getAnim(idx)}
                  className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900 relative flex flex-col"
                >
                  <div className="h-6 bg-gray-800 flex items-center px-3 gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlot slotId={slot.id} label={slot.label} className="w-full h-full" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Plataforma Integrada de Gestão</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 13. COMPARATIVE TABLE
      case 'comparative_table':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Comparativo'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
            </div>

            <div className="overflow-x-auto my-auto max-w-5xl mx-auto w-full shadow-xl rounded-2xl border border-gray-200 z-10">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#00A859] text-white font-bold">
                    {slide.tableHeaders?.map((header, idx) => (
                      <th key={idx} className="p-3.5 md:p-4 uppercase tracking-wider font-mono text-xs">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {slide.tableRows?.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 md:p-3.5 font-bold text-gray-900">{row.col1}</td>
                      <td className="p-3 md:p-3.5 text-gray-600">{row.col2}</td>
                      {row.col3 && <td className="p-3 md:p-3.5 text-gray-800 font-semibold">{row.col3}</td>}
                      {row.col4 && <td className="p-3 md:p-3.5 text-[#00A859] font-black">{row.col4}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Brotas 360° · Solução Completa</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 14. DASHBOARD
      case 'dashboard':
        return (
          <div className="relative w-full h-full bg-[#0A0F1A] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859]/20 rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Inteligência & Métricas'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 my-auto max-w-5xl mx-auto w-full z-10">
              {slide.gridCards?.map((card, idx) => {
                const IconComponent = (card.icon && ICON_MAP[card.icon]) || TrendingUp;
                return (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between group hover:border-[#00A859] transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400 font-medium">{card.title}</span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: card.color ? `${card.color}20` : '#00A85920', color: card.color || '#00A859' }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <span
                      className="text-2xl md:text-3xl font-black tracking-tight mb-1"
                      style={{ color: card.color || '#00A859' }}
                    >
                      {card.description}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-2 border-t border-white/10 z-10">
              <span>Resultados Estimados · 1° Ano</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 15. ORGANOGRAM
      case 'organogram':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859] rounded-bl-full pointer-events-none"></div>

            <div className="z-10">
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Equipe'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                <SplitText
                  text={slide.title}
                  splitType="words"
                  delay={35}
                  duration={0.7}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
            </div>

            <div className="space-y-6 my-auto max-w-5xl mx-auto w-full z-10">
              {slide.orgLevels?.map((level, idx) => (
                <motion.div key={idx} {...getAnim(idx)} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono uppercase bg-[#00A859] text-white px-3 py-1 rounded-full">
                      {level.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {level.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-center text-xs font-bold text-gray-800 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100 z-10">
              <span>Equipe Multidisciplinar Dedicada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 16. BIG NUMBER
      case 'big_number':
        return (
          <div
            className={`relative w-full h-full flex flex-col items-center justify-center p-12 md:p-24 text-center overflow-hidden ${
              slide.isDark ? 'bg-[#0A0F1A]' : 'bg-white'
            }`}
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-[#00A859] rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0B4D3C] rounded-tr-full pointer-events-none"></div>

            {slide.categoryLabel && (
              <motion.span
                {...getAnim(0)}
                className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-4 block z-10"
              >
                {slide.categoryLabel}
              </motion.span>
            )}

            <h3
              className={`text-2xl md:text-3xl font-light mb-6 z-10 ${slide.isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              <SplitText
                text={slide.title}
                splitType="words"
                delay={35}
                duration={0.7}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </h3>

            <motion.h1
              {...getAnim(2)}
              className="text-7xl md:text-9xl font-black text-[#00A859] mb-4 tracking-tighter z-10"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {slide.bigNumber || slide.title}
            </motion.h1>

            {slide.bigNumberLabel && (
              <motion.p
                {...getAnim(3)}
                className="text-[#FFB800] text-xl md:text-2xl font-bold uppercase tracking-wider mb-6 z-10"
              >
                {slide.bigNumberLabel}
              </motion.p>
            )}

            {slide.texts && (
              <div className="space-y-1 max-w-xl z-10">
                {slide.texts.map((t, idx) => (
                  <motion.p
                    key={idx}
                    {...getAnim(4 + idx)}
                    className={`text-sm md:text-base font-light ${slide.isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {t}
                  </motion.p>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-white">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
            {slide.texts && <p className="text-gray-600 max-w-lg text-center">{slide.texts.join(' ')}</p>}
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {renderLayout()}
    </div>
  );
}
