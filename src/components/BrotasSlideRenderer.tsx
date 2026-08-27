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
    label
  }: {
    slotId: string;
    defaultUrl?: string;
    className?: string;
    label?: string;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageUrl = uploadedImages[slotId] || defaultUrl;

    return (
      <div className={`relative group overflow-hidden ${className}`}>
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#111827] border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-white/50 text-center">
            <Upload className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs font-mono">{label || 'Upload de Foto'}</span>
          </div>
        )}

        {isEditing && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#1B9C4F] hover:bg-[#15803D] text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Trocar Imagem"
            >
              <Upload className="w-4 h-4" />
              Trocar Imagem
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
      case 'hero_cover':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-12 md:p-20 bg-[#0A0F1A]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              {slide.imageSlots && slide.imageSlots.length > 0 && (
                <ImageSlot
                  slotId={slide.imageSlots[0].id}
                  defaultUrl={slide.imageSlots[0].defaultUrl}
                  label={slide.imageSlots[0].label}
                  className="w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/75 to-black/30"></div>
            </div>

            {/* Top Logo / Label */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1B9C4F]"></div>
                <span className="font-bold text-gray-900 tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Brotas
                </span>
              </div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono">
                  {slide.categoryLabel}
                </span>
              )}
            </div>

            {/* Main Center Title */}
            <div className="relative z-10 max-w-4xl my-auto">
              <motion.h1
                {...getAnim(1)}
                className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slide.title}
              </motion.h1>
              {slide.subtitle && (
                <motion.p
                  {...getAnim(2)}
                  className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
              )}
            </div>

            {/* Bottom Texts */}
            <div className="relative z-10 border-t border-white/15 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                {slide.texts?.map((t, idx) => (
                  <p key={idx} className="text-xs md:text-sm text-gray-400 font-light">
                    {t}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                <span>{slide.slideNumber}</span>
              </div>
            </div>
          </div>
        );

      case 'dark_centered':
        return (
          <div className="relative w-full h-full bg-[#0A0F1A] flex flex-col items-center justify-center p-12 md:p-24 text-center">
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-bl-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-tr-[100px] pointer-events-none"></div>

            {slide.categoryLabel && (
              <motion.span
                {...getAnim(0)}
                className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-8 block"
              >
                {slide.categoryLabel}
              </motion.span>
            )}

            <motion.h2
              {...getAnim(1)}
              className="text-4xl md:text-6xl lg:text-7xl font-bold italic text-white max-w-5xl leading-tight mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {slide.title}
            </motion.h2>

            {slide.subtitle && (
              <motion.p
                {...getAnim(2)}
                className="text-[#FFB800] text-xl md:text-2xl font-light max-w-3xl mb-6"
              >
                {slide.subtitle}
              </motion.p>
            )}

            {slide.texts && slide.texts.length > 0 && (
              <div className="space-y-2 max-w-2xl">
                {slide.texts.map((t, idx) => (
                  <motion.p
                    key={idx}
                    {...getAnim(3 + idx)}
                    className="text-gray-400 text-base md:text-lg font-light leading-relaxed"
                  >
                    {t}
                  </motion.p>
                ))}
              </div>
            )}
          </div>
        );

      case 'split_text_photo':
        return (
          <div className="relative w-full h-full bg-white flex flex-col md:flex-row p-10 md:p-16 gap-8 md:gap-12 items-center justify-between overflow-hidden">
            {/* Top-Right Decorative Shape */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#1B9C4F] rounded-bl-[140px] pointer-events-none z-0"></div>
            {/* Bottom-Left Decorative Shape */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0D6B3F] rounded-tr-[140px] pointer-events-none z-0"></div>

            {/* Left 50%: Text */}
            <div className="w-full md:w-1/2 z-10 flex flex-col justify-center max-w-xl">
              {slide.categoryLabel && (
                <motion.span
                  {...getAnim(0)}
                  className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-3 block"
                >
                  {slide.categoryLabel}
                </motion.span>
              )}

              <motion.h2
                {...getAnim(1)}
                className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slide.title}
              </motion.h2>

              {slide.subtitle && (
                <motion.p {...getAnim(2)} className="text-gray-600 font-medium mb-4 text-base">
                  {slide.subtitle}
                </motion.p>
              )}

              {/* Bullet / Text points */}
              <div className="space-y-3.5 mt-2">
                {slide.texts?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    {...getAnim(3 + idx)}
                    className="flex items-start gap-3 text-gray-700 leading-relaxed text-sm md:text-base"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1B9C4F] mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right 50%: Photo Container */}
            <div className="w-full md:w-1/2 h-[320px] md:h-[480px] z-10 relative">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                {slide.imageSlots && slide.imageSlots.length > 0 ? (
                  <ImageSlot
                    slotId={slide.imageSlots[0].id}
                    defaultUrl={slide.imageSlots[0].defaultUrl}
                    label={slide.imageSlots[0].label}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <span className="text-sm font-mono">Espaço para Imagem</span>
                  </div>
                )}
              </div>

              {/* Small color accents */}
              <div className="absolute -bottom-3 -right-3 w-16 h-4 bg-[#E53935] rounded-full"></div>
              <div className="absolute -top-3 -left-3 w-16 h-4 bg-[#1565C0] rounded-full"></div>
            </div>
          </div>
        );

      case 'funnel_vertical':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-bl-[100px]"></div>

            {slide.categoryLabel && (
              <motion.span
                {...getAnim(0)}
                className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-2"
              >
                {slide.categoryLabel}
              </motion.span>
            )}

            <motion.h2
              {...getAnim(1)}
              className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-10"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {slide.title}
            </motion.h2>

            <div className="w-full max-w-3xl flex flex-col items-center gap-4">
              {slide.funnelItems?.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...getAnim(2 + idx)}
                  style={{ width: item.width, backgroundColor: item.color }}
                  className="py-4 px-6 rounded-xl text-white font-medium text-center shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="text-sm md:text-base tracking-wide font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {slide.texts && slide.texts.length > 0 && (
              <div className="mt-8 text-center text-gray-500 text-sm max-w-xl">
                {slide.texts.join(' ')}
              </div>
            )}
          </div>
        );

      case 'flow_horizontal':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#1B9C4F] rounded-bl-[100px]"></div>

            <div className="max-w-5xl mx-auto w-full">
              {slide.categoryLabel && (
                <motion.span
                  {...getAnim(0)}
                  className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-2 block"
                >
                  {slide.categoryLabel}
                </motion.span>
              )}

              <motion.h2
                {...getAnim(1)}
                className="text-3xl md:text-5xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slide.title}
              </motion.h2>

              {/* Horizontal steps */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-8">
                {(slide.diagramData?.flowItems || slide.diagramData?.steps || []).map((step: string, idx: number) => (
                  <motion.div
                    key={idx}
                    {...getAnim(2 + idx)}
                    className="bg-white border-t-4 border-[#1B9C4F] p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center group hover:shadow-xl transition-all"
                  >
                    <span className="text-[10px] font-mono text-[#1B9C4F] font-bold mb-1">
                      ETAPA {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-gray-800 whitespace-pre-line">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>

              {slide.texts && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed">
                  {slide.texts.join(' ')}
                </div>
              )}
            </div>
          </div>
        );

      case 'photo_grid':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
              {slide.texts && (
                <p className="text-gray-600 text-sm max-w-3xl">{slide.texts.join(' ')}</p>
              )}
            </div>

            {/* 5 Photos Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-auto h-[320px]">
              {(slide.imageSlots || [
                { id: 'grid-1', label: 'Brotas 1' },
                { id: 'grid-2', label: 'Brotas 2' },
                { id: 'grid-3', label: 'Brotas 3' },
                { id: 'grid-4', label: 'Brotas 4' },
                { id: 'grid-5', label: 'Brotas 5' }
              ]).map((slot, idx) => (
                <div key={slot.id} className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <ImageSlot slotId={slot.id} label={slot.label} className="w-full h-full" />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>Brotas 360° · Presença Territorial</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'hub_spoke':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-14 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-bl-[100px]"></div>

            {slide.categoryLabel && (
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1">
                {slide.categoryLabel}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              {slide.title}
            </h2>

            {/* Hub Radial Diagram */}
            <div className="relative w-full max-w-4xl h-[380px] flex items-center justify-center">
              {/* Central Hub */}
              <div className="z-20 w-36 h-36 rounded-full bg-[#1B9C4F] text-white shadow-2xl flex flex-col items-center justify-center text-center p-4 border-4 border-white">
                <span className="text-xs font-bold uppercase tracking-wider">Centro</span>
                <span className="text-base font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {slide.hubCenter || 'BROTAS 360°'}
                </span>
              </div>

              {/* Spokes grid around hub */}
              <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-4 items-center justify-items-center">
                {slide.hubSpokes?.map((spoke, idx) => (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-gray-50 hover:bg-[#1B9C4F]/10 border border-gray-200 hover:border-[#1B9C4F] p-3 rounded-xl shadow-sm text-center text-xs font-semibold text-gray-800 transition-all max-w-[160px]"
                  >
                    {spoke}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cycle_diagram':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-14 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#1B9C4F] rounded-br-[100px]"></div>

            {slide.categoryLabel && (
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1">
                {slide.categoryLabel}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              {slide.title}
            </h2>

            {/* 9 Cycle Items Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-3xl w-full">
              {slide.cycleItems?.map((item, idx) => (
                <motion.div
                  key={idx}
                  {...getAnim(idx)}
                  className="bg-gray-50 border-l-4 border-[#1B9C4F] p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1B9C4F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-800">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'grid_cards':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-bl-[100px]"></div>

            <div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
              {slide.subtitle && <p className="text-gray-600 text-sm mb-4">{slide.subtitle}</p>}
            </div>

            {/* 2x3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-auto max-w-5xl mx-auto w-full">
              {slide.gridCards?.map((card, idx) => {
                const IconComponent = (card.icon && ICON_MAP[card.icon]) || Star;
                return (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-white border border-gray-100 hover:border-[#1B9C4F]/40 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: card.color ? `${card.color}15` : '#1B9C4F15', color: card.color || '#1B9C4F' }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{card.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>Brotas 360° · Metodologia Estruturada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'levels_bar':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F] rounded-bl-[100px]"></div>

            <div className="max-w-4xl mx-auto w-full">
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>

              <div className="space-y-6">
                {[
                  { level: 'Nível 1 · Informativo', desc: 'O que foi feito — obras, serviços, editais, horários', color: '#1B9C4F' },
                  { level: 'Nível 2 · Educativo', desc: 'Por que importa — benefícios coletivos, economia, sustentabilidade', color: '#FFB800' },
                  { level: 'Nível 3 · Emocional', desc: 'Como impacta a vida — histórias de moradores, transformação e orgulho de Brotas', color: '#E53E3E' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="p-6 rounded-2xl shadow-md text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="text-lg font-bold tracking-wide">{item.level}</span>
                    <span className="text-sm text-white/90 font-medium">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'fan_out':
        return (
          <div className="relative w-full h-full bg-white p-10 md:p-16 flex flex-col justify-center overflow-hidden">
            <div className="max-w-5xl mx-auto w-full">
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Instagram', icon: 'Film', color: '#E1306C' },
                  { name: 'Facebook', icon: 'Users', color: '#1877F2' },
                  { name: 'TikTok', icon: 'Play', color: '#000000' },
                  { name: 'YouTube', icon: 'Film', color: '#FF0000' },
                  { name: 'Site Prefeitura', icon: 'Globe', color: '#1B9C4F' },
                  { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
                  { name: 'Rádio Local', icon: 'Zap', color: '#FF7A00' },
                  { name: 'Imprensa & Clipping', icon: 'Newspaper', color: '#3388FF' }
                ].map((channel, idx) => {
                  const Icon = ICON_MAP[channel.icon] || Globe;
                  return (
                    <motion.div
                      key={idx}
                      {...getAnim(idx)}
                      className="p-5 rounded-2xl border border-gray-100 shadow-md flex items-center gap-3 hover:shadow-xl transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
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

      case 'mockup_triple':
      case 'mockup_system':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
              {slide.texts && <p className="text-gray-600 text-sm">{slide.texts.join(' · ')}</p>}
            </div>

            {/* 3 Mockup screens */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-auto max-w-5xl mx-auto w-full h-[320px]">
              {(slide.imageSlots || [
                { id: 'mockup-1', label: 'Tela 1 / Dashboard' },
                { id: 'mockup-2', label: 'Tela 2 / Mobile App' },
                { id: 'mockup-3', label: 'Tela 3 / Portal Web' }
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

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>Plataforma Integrada de Gestão</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'comparative_table':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto my-auto max-w-5xl mx-auto w-full shadow-lg rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#1B9C4F] text-white font-semibold">
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
                      <td className="p-3 md:p-3.5 font-medium text-gray-900">{row.col1}</td>
                      <td className="p-3 md:p-3.5 text-gray-600">{row.col2}</td>
                      {row.col3 && <td className="p-3 md:p-3.5 text-gray-800 font-semibold">{row.col3}</td>}
                      {row.col4 && <td className="p-3 md:p-3.5 text-[#1B9C4F] font-bold">{row.col4}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>Brotas 360° · Comparativo Estruturado</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="relative w-full h-full bg-[#0A0F1A] p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div>
              <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                {slide.categoryLabel || 'Inteligência & Métricas'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 my-auto max-w-5xl mx-auto w-full">
              {slide.gridCards?.map((card, idx) => {
                const IconComponent = (card.icon && ICON_MAP[card.icon]) || TrendingUp;
                return (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-[#111827] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between group hover:border-[#1B9C4F] transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400 font-medium">{card.title}</span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: card.color ? `${card.color}20` : '#1B9C4F20', color: card.color || '#1B9C4F' }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <span
                      className="text-2xl md:text-3xl font-bold tracking-tight mb-1"
                      style={{ color: card.color || '#1B9C4F' }}
                    >
                      {card.description}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 font-mono pt-2 border-t border-white/10">
              <span>Resultados Estimados · 1° Ano</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'organogram':
        return (
          <div className="relative w-full h-full bg-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
            <div>
              {slide.categoryLabel && (
                <span className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-1 block">
                  {slide.categoryLabel}
                </span>
              )}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {slide.title}
              </h2>
            </div>

            {/* 3 Organogram Levels */}
            <div className="space-y-6 my-auto max-w-5xl mx-auto w-full">
              {slide.orgLevels?.map((level, idx) => (
                <motion.div key={idx} {...getAnim(idx)} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono uppercase bg-[#1B9C4F] text-white px-2.5 py-0.5 rounded-full">
                      {level.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {level.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-center text-xs font-semibold text-gray-800 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>Equipe Multidisciplinar Dedicada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      case 'big_number':
        return (
          <div
            className={`relative w-full h-full flex flex-col items-center justify-center p-12 md:p-24 text-center overflow-hidden ${
              slide.isDark ? 'bg-[#0A0F1A]' : 'bg-white'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1B9C4F]/10 rounded-bl-[100px]"></div>

            {slide.categoryLabel && (
              <motion.span
                {...getAnim(0)}
                className="text-[#FFB800] uppercase tracking-widest text-xs font-bold font-mono mb-4 block"
              >
                {slide.categoryLabel}
              </motion.span>
            )}

            <motion.h3
              {...getAnim(1)}
              className={`text-2xl md:text-3xl font-light mb-6 ${slide.isDark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {slide.title}
            </motion.h3>

            <motion.h1
              {...getAnim(2)}
              className="text-7xl md:text-9xl font-extrabold text-[#1B9C4F] mb-4 tracking-tighter"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {slide.bigNumber || slide.title}
            </motion.h1>

            {slide.bigNumberLabel && (
              <motion.p
                {...getAnim(3)}
                className="text-[#FFB800] text-xl md:text-2xl font-semibold uppercase tracking-wider mb-6"
              >
                {slide.bigNumberLabel}
              </motion.p>
            )}

            {slide.texts && (
              <div className="space-y-1 max-w-xl">
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
