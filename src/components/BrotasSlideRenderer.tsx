import React, { useRef } from 'react';
import { motion } from 'motion/react';
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
  Check,
  Smartphone,
  Globe
} from 'lucide-react';
import { BrotasSlideData } from '../data/brotasSlidesData';
import { generateSeoAltText } from '../lib/imageOptimizer';
import SplitText from './SplitText';
import RadialOrbitalTimeline, { TimelineItem } from './ui/radial-orbital-timeline';

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

// Official Brotas Logo Component
function BrotasLogoBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-2 flex items-center justify-center border border-black/5 ${className}`}>
      <img 
        src="https://res.cloudinary.com/ifuatk2z/image/upload/v1788459496/APRESENTACAO_BROTAS.png" 
        alt="Brotas 360°" 
        className="h-10 md:h-12 w-auto object-contain"
      />
    </div>
  );
}

// 360° Circular Sweeping Arrow SVG
function CircularArrow360() {
  return (
    <svg viewBox="0 0 340 90" className="w-full max-w-[340px] md:max-w-[400px] h-14 md:h-16 mx-auto -mt-6 md:-mt-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 50 25 C 20 58, 80 82, 170 82 C 260 82, 320 58, 290 25"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 155 74 L 180 82 L 155 90 Z" fill="white" />
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
            className={`w-full h-full border border-dashed flex flex-col items-center justify-center p-6 text-center transition-all ${
              isEditing ? 'cursor-pointer hover:bg-[#00A859]/10 hover:border-[#00A859]' : ''
            } ${
              slide.isDark
                ? 'bg-[#062a1d]/60 border-white/20 text-white/40'
                : 'bg-[#F2F4F2] border-gray-300 text-gray-400'
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
      // 1. EXACT COVER SLIDE
      case 'hero_cover':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 bg-black overflow-hidden select-none">
            <div className="absolute inset-0 z-0">
              <ImageSlot
                slotId={slide.imageSlots?.[0]?.id || 'cover-bg'}
                defaultUrl={slide.imageSlots?.[0]?.defaultUrl || '/images/brotas/brotas_cover.jpg'}
                label="Foto Territorial Brotas"
                className="w-full h-full brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/75 pointer-events-none"></div>
            </div>

            <div className="relative z-20 flex items-start justify-between w-full">
              <motion.div {...getAnim(0)}>
                <BrotasLogoBadge />
              </motion.div>

              <motion.div
                {...getAnim(1)}
                className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-lg mx-auto"
              >
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Diagnóstico</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Estratégia</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Produção</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Canais</span>
                <span className="hover:text-[#FFC20E] transition-colors cursor-pointer">Resultados</span>
              </motion.div>

              <div className="w-24 hidden md:block"></div>
            </div>

            <div className="relative z-20 my-auto text-center flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
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

              <motion.div {...getAnim(2)} className="relative flex flex-col items-center justify-center -mt-2 md:-mt-4">
                <span
                  className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  {slide.subtitle || '360°'}
                </span>
                <CircularArrow360 />
              </motion.div>

              <motion.div {...getAnim(3)} className="flex items-center justify-center gap-2 my-2">
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#0074BC] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#FFC20E] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#00A651] shadow-sm"></div>
                <div className="w-8 md:w-10 h-1.5 rounded-full bg-[#ED1C24] shadow-sm"></div>
              </motion.div>

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

            <div className="relative z-20 flex flex-col items-center justify-end w-full">
              <motion.div {...getAnim(4)} className="flex items-center justify-center gap-6 text-white text-xs font-bold opacity-80 mb-2">
                <span>Prefeitura Municipal de Brotas</span>
                <span>·</span>
                <span>Fábrica Publicidade & Digital</span>
              </motion.div>
            </div>
          </div>
        );

      // 2. SPLIT LAYOUT / NUMBERED CARDS (IMAGE 2 REFERENCE)
      case 'split_text_photo':
      case 'dark_centered': {
        const hasManyTexts = slide.texts && slide.texts.length >= 3;
        const hasPhoto = slide.imageSlots && slide.imageSlots.length > 0 && uploadedImages[slide.imageSlots[0]?.id];

        // Se tem 3 ou mais textos e não há foto customizada carregada -> NUMBERED STEP CARDS (IMAGE 2 REFERENCE)
        if (hasManyTexts && !hasPhoto) {
          return (
            <div className="relative w-full h-full bg-[#FBFBFA] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden select-none">
              <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 my-auto z-10">
                {/* Left Column: Big Editorial Serif Statement with Bold and Italic contrasts */}
                <div className="w-full md:w-[48%] flex flex-col justify-center space-y-5">
                  <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                    {slide.categoryLabel || 'Diagnóstico'}
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#062a1d] leading-[1.12] tracking-tight"
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

                  {slide.subtitle && (
                    <p className="text-lg md:text-xl font-serif italic text-gray-700 leading-snug">
                      {slide.subtitle}
                    </p>
                  )}

                  <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-md">
                    Para que a população valorize cada entrega, a comunicação pública municipal precisa de estratégia, presença constante e narrativa de impacto.
                  </p>

                  <div className="text-xs font-serif italic text-[#062a1d]/40 pt-2">
                    Brotas 360° · Comunicação Pública & Governança
                  </div>
                </div>

                {/* Right Column: Numbered Step Cards (Card 02 highlighted in deep forest green!) */}
                <div className="w-full md:w-[52%] flex flex-col gap-3.5 my-auto">
                  {slide.texts?.slice(0, 4).map((text, idx) => {
                    const isFeatured = idx === 1; // Card 02 highlighted in deep green from user reference!
                    const stepNum = String(idx + 1).padStart(2, '0');

                    return (
                      <motion.div
                        key={idx}
                        {...getAnim(idx)}
                        className={`p-5 md:p-6 rounded-2xl transition-all duration-300 flex items-start gap-4 md:gap-6 shadow-sm ${
                          isFeatured
                            ? 'bg-[#062a1d] text-white shadow-xl shadow-[#062a1d]/25 scale-[1.02]'
                            : 'bg-white text-gray-800 border border-gray-200/80 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className={`text-3xl md:text-4xl font-serif font-bold leading-none shrink-0 ${
                            isFeatured ? 'text-[#FFC20E]' : 'text-[#062a1d]'
                          }`}
                          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                        >
                          {stepNum}
                        </span>

                        <div className="space-y-1 flex-1">
                          <p className={`text-sm md:text-base leading-relaxed ${isFeatured ? 'text-white font-medium' : 'text-gray-700 font-normal'}`}>
                            {text}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-3 left-8 right-8 flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
                <span className="font-serif italic text-gray-500">{slide.categoryLabel} · Brotas 360°</span>
                <span>{slide.slideNumber}</span>
              </div>
            </div>
          );
        }

        // Caso tenha foto ou texto explicativo: Clean Editorial Split (Text Left, Framed Photo Right)
        return (
          <div className="relative w-full h-full bg-[#FBFBFA] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden select-none">
            <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 my-auto z-10">
              {/* Left Column: Heading + Amber Label + Body */}
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                  {slide.categoryLabel || 'Brotas 360°'}
                </span>

                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#062a1d] leading-[1.15] tracking-tight"
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

                {slide.subtitle && (
                  <p className="text-xl md:text-2xl font-serif italic text-[#062a1d]/85 font-normal leading-snug">
                    {slide.subtitle}
                  </p>
                )}

                <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed pt-2">
                  {slide.texts?.map((item, idx) => (
                    <motion.p key={idx} {...getAnim(2 + idx)}>
                      {item}
                    </motion.p>
                  ))}
                </div>

                <div className="text-xs font-serif italic text-[#062a1d]/40 pt-4">
                  Brotas 360° · Cidade Inteligente & Conectada
                </div>
              </div>

              {/* Right Column: Clean Framed Photograph */}
              <div className="w-full md:w-1/2 h-[340px] md:h-[460px] relative flex items-center justify-center">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                  <ImageSlot
                    slotId={slide.imageSlots?.[0]?.id || `img-${slide.id}`}
                    defaultUrl={slide.imageSlots?.[0]?.defaultUrl}
                    label={slide.imageSlots?.[0]?.label || 'Fotografia Territorial'}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-3 left-8 right-8 flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">{slide.categoryLabel} · Brotas 360°</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 3. BEFORE AFTER
      case 'before_after':
        return (
          <div className="relative w-full h-full bg-[#FBFBFA] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden select-none">
            <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 my-auto z-10">
              <div className="w-full md:w-1/2 h-[340px] md:h-[460px] relative flex items-center justify-center">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                  <ImageSlot
                    slotId={slide.imageSlots?.[0]?.id || `img-${slide.id}`}
                    defaultUrl={slide.imageSlots?.[0]?.defaultUrl}
                    label={slide.imageSlots?.[0]?.label || 'Foto'}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                  {slide.categoryLabel || 'Visão'}
                </span>

                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#062a1d] leading-[1.15] tracking-tight"
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

                <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                  {slide.texts?.map((item, idx) => (
                    <motion.p key={idx} {...getAnim(2 + idx)}>
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-8 right-8 flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Transformação Visual Brotas 360°</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 4. FUNNEL DIAGRAM 3D WITH TREE & HORIZONTAL BARS (EXACT MATCH TO USER ATTACHMENT)
      case 'funnel_vertical': {
        const isSolutionFunnel = slide.id === 11 || slide.category === 'metodologia';

        const funnelRows = isSolutionFunnel ? [
          {
            pct: '100%',
            barText: 'Pesquisa & Diagnóstico',
            title: 'Pesquisa Quantitativa & Qualitativa',
            desc: 'Levantamento de dados, mapa de calor dos bairros e percepção popular.',
          },
          {
            pct: '75%',
            barText: 'Planejamento Estratégico',
            title: 'Linha Editorial & Tom de Voz',
            desc: 'Definição de narrativas-chave, matriz de canais e calendário oficial.',
          },
          {
            pct: '50%',
            barText: 'Produção de Conteúdo',
            title: 'Criação Visual & Audiovisual',
            desc: 'Vídeos em campo, enxoval gráfico, redes sociais e assessoria de imprensa.',
          },
          {
            pct: '25%',
            barText: 'Distribuição & Impacto',
            title: 'Entrega na Ponta & Retenção',
            desc: 'Informação que chega e transforma entregas em aprovação da gestão.',
          }
        ] : [
          {
            pct: '100%',
            barText: 'Ações Realizadas',
            title: 'Ações Realizadas',
            desc: 'Todas as obras, serviços e melhorias executadas pela gestão municipal.',
          },
          {
            pct: '40%',
            barText: 'Divulgadas Oficialmente',
            title: 'Divulgadas Oficialmente',
            desc: 'Parcela que chega a ser publicada nos canais sem um fluxo integrado.',
          },
          {
            pct: '15%',
            barText: 'Compreendidas na Ponta',
            title: 'Compreendidas na Ponta',
            desc: 'Mensagens que a população realmente assimila e entende o impacto.',
          },
          {
            pct: '5%',
            barText: 'Lembradas pelo Cidadão',
            title: 'Lembradas pelo Cidadão',
            desc: 'O que de fato vira aprovação da gestão e capital político duradouro.',
          }
        ];

        return (
          <div className="relative w-full h-full bg-[#FAF9F6] p-6 md:p-10 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Right Header Section (Exact Match to Attachment) */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 z-10 pt-1 pb-3 border-b border-black/5">
              <div>
                <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                  {slide.categoryLabel || (isSolutionFunnel ? 'Metodologia' : 'Diagnóstico & Percepção')}
                </span>
                <span className="text-xs font-serif italic text-[#062a1d]/70">
                  Brotas 360° · Sistema Integrado de Comunicação
                </span>
              </div>
              
              <div className="text-left md:text-right max-w-lg">
                <h2
                  className="text-2xl md:text-4xl font-serif font-black text-[#062a1d] tracking-tight"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  <SplitText
                    text={slide.title}
                    splitType="words"
                    delay={30}
                    duration={0.6}
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </h2>
                <p className="text-xs md:text-sm text-gray-500 font-light mt-1 leading-relaxed">
                  {isSolutionFunnel
                    ? 'Do diagnóstico profundo até a distribuição multicanal de alto impacto.'
                    : 'Onde a comunicação municipal perde alcance e como estruturar a retenção de imagem.'}
                </p>
              </div>
            </div>

            {/* Central Funnel Diagram Stage matching Attachment */}
            <div className="w-full max-w-6xl mx-auto my-auto flex items-center justify-center z-10 py-2">
              <svg
                viewBox="0 0 1020 460"
                className="w-full h-auto max-h-[460px] drop-shadow-sm select-none"
                style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
              >
                <defs>
                  {/* Tree Foliage Gradients */}
                  <radialGradient id="foliageGrad1" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#0f4534" />
                    <stop offset="100%" stopColor="#06261c" />
                  </radialGradient>
                  <radialGradient id="foliageGrad2" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#145943" />
                    <stop offset="100%" stopColor="#093526" />
                  </radialGradient>
                  <radialGradient id="foliageGrad3" cx="45%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#1a6e54" />
                    <stop offset="100%" stopColor="#0b3e2d" />
                  </radialGradient>

                  {/* Cutaway Dirt Wall Texture */}
                  <linearGradient id="cutawayDirt" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6e4632" />
                    <stop offset="60%" stopColor="#87573e" />
                    <stop offset="100%" stopColor="#553625" />
                  </linearGradient>

                  {/* Soil Surface Gradient */}
                  <linearGradient id="soilTop" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3d2417" />
                    <stop offset="100%" stopColor="#5a3826" />
                  </linearGradient>
                </defs>

                {/* ================= 1. TREE ON TOP ================= */}
                <g id="funnel-tree">
                  {/* Tree Trunk */}
                  <path
                    d="M 128 95 Q 128 128 123 148 L 143 148 Q 138 128 138 95 Z"
                    fill="#543525"
                  />
                  {/* Trunk Roots */}
                  <path d="M 123 144 Q 115 148 108 149" stroke="#543525" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 143 144 Q 151 148 158 149" stroke="#543525" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* Bushy Foliage Clusters */}
                  <circle cx="133" cy="50" r="32" fill="url(#foliageGrad1)" />
                  <circle cx="104" cy="65" r="28" fill="url(#foliageGrad2)" />
                  <circle cx="162" cy="65" r="28" fill="url(#foliageGrad2)" />
                  <circle cx="120" cy="85" r="26" fill="url(#foliageGrad3)" />
                  <circle cx="146" cy="85" r="26" fill="url(#foliageGrad3)" />
                  <circle cx="133" cy="70" r="24" fill="#07291e" />
                </g>

                {/* ================= 2. SOIL ELLIPSE ON CONE TOP ================= */}
                <ellipse cx="133" cy="150" rx="82" ry="11" fill="url(#soilTop)" />
                <ellipse cx="133" cy="150" rx="76" ry="8" fill="#442a1c" opacity="0.7" />

                {/* ================= 3. 3D CUTAWAY DIRT WEDGE (RIGHT SIDE) ================= */}
                {/* Shows the inner soil cross-section in 3D perspective */}
                <path
                  d="M 133 150 L 153 152 L 150 420 L 133 420 Z"
                  fill="url(#cutawayDirt)"
                />
                <line x1="133" y1="150" x2="133" y2="420" stroke="#3b2317" strokeWidth="1.5" />
                <line x1="153" y1="152" x2="150" y2="420" stroke="#3b2317" strokeWidth="1.5" />

                {/* ================= 4. SLICED CONE TIERS (LEFT HALF) ================= */}
                {/* TIER 1 (TOP) - Dark Forest Green */}
                <path
                  d="M 51 150 L 133 150 L 133 218 L 72 218 Z"
                  fill="#0b4535"
                />
                {/* Line Separator between tiers */}
                <line x1="72" y1="218" x2="133" y2="218" stroke="#FAF9F6" strokeWidth="1.5" />
                
                {/* Icon Tier 1: 3-Circle Symbol */}
                <g transform="translate(100, 184) scale(0.9)">
                  <circle cx="0" cy="-7" r="4" fill="none" stroke="white" strokeWidth="1.8" />
                  <circle cx="-6" cy="5" r="4" fill="none" stroke="white" strokeWidth="1.8" />
                  <circle cx="6" cy="5" r="4" fill="none" stroke="white" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="1.5" fill="white" />
                </g>

                {/* TIER 2 - Emerald Green */}
                <path
                  d="M 72 218 L 133 218 L 133 286 L 92 286 Z"
                  fill="#0f5a45"
                />
                <line x1="92" y1="286" x2="133" y2="286" stroke="#FAF9F6" strokeWidth="1.5" />
                
                {/* Icon Tier 2: Honeycomb / Hexagons */}
                <g transform="translate(112, 252) scale(0.9)">
                  <polygon points="0,-7 6,-3 6,4 0,8 -6,4 -6,-3" fill="none" stroke="white" strokeWidth="1.6" />
                  <polygon points="7,4 13,8 13,15 7,19 1,15 1,8" fill="none" stroke="white" strokeWidth="1.6" />
                  <polygon points="-7,4 -1,8 -1,15 -7,19 -13,15 -13,8" fill="none" stroke="white" strokeWidth="1.6" />
                </g>

                {/* TIER 3 - Ocean Teal */}
                <path
                  d="M 92 286 L 133 286 L 133 354 L 113 354 Z"
                  fill="#126e55"
                />
                <line x1="113" y1="354" x2="133" y2="354" stroke="#FAF9F6" strokeWidth="1.5" />
                
                {/* Icon Tier 3: Sprout / Leaf */}
                <g transform="translate(122, 320) scale(0.9)">
                  <path d="M 0 -8 C 6 -8 9 -2 9 4 C 5 4 0 1 0 -8 Z" fill="none" stroke="white" strokeWidth="1.6" />
                  <path d="M 0 -8 C -6 -8 -9 -2 -9 4 C -5 4 0 1 0 -8 Z" fill="none" stroke="white" strokeWidth="1.6" />
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                </g>

                {/* TIER 4 (TIP) - Mint Teal */}
                <path
                  d="M 113 354 L 133 354 L 133 420 Z"
                  fill="#168567"
                />
                
                {/* Icon Tier 4: Hand with Seedling */}
                <g transform="translate(125, 382) scale(0.85)">
                  <path d="M 0 -6 Q 0 -1 4 -1 Q 4 -6 0 -6 Z" fill="none" stroke="white" strokeWidth="1.4" />
                  <path d="M 0 -6 Q 0 -1 -4 -1 Q -4 -6 0 -6 Z" fill="none" stroke="white" strokeWidth="1.4" />
                  <path d="M -7 4 C -4 1 0 2 3 3 L 7 5 C 9 6 11 4 9 2 L 5 0" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </g>

                {/* ================= 5. HORIZONTAL DARK GREEN BARS ================= */}
                {/* Connected seamlessly to the cutaway edge at x=153 */}

                {/* Bar 1 */}
                <rect x="153" y="168" width="310" height="42" fill="#06261c" />
                <text x="175" y="194" fill="#ffffff" fontSize="13" fontWeight="500" letterSpacing="0.03em">
                  {funnelRows[0].barText}
                </text>

                {/* Bar 2 */}
                <rect x="152" y="236" width="280" height="42" fill="#06261c" />
                <text x="174" y="262" fill="#ffffff" fontSize="13" fontWeight="500" letterSpacing="0.03em">
                  {funnelRows[1].barText}
                </text>

                {/* Bar 3 */}
                <rect x="151" y="304" width="250" height="42" fill="#06261c" />
                <text x="173" y="330" fill="#ffffff" fontSize="13" fontWeight="500" letterSpacing="0.03em">
                  {funnelRows[2].barText}
                </text>

                {/* Bar 4 */}
                <rect x="150" y="372" width="220" height="42" fill="#06261c" />
                <text x="172" y="398" fill="#ffffff" fontSize="13" fontWeight="500" letterSpacing="0.03em">
                  {funnelRows[3].barText}
                </text>

                {/* ================= 6. PERCENTAGE & DESCRIPTIONS (RIGHT SIDE) ================= */}
                {/* Row 1 Metrics */}
                <g transform="translate(485, 170)">
                  <text
                    x="0"
                    y="31"
                    fill="#06261c"
                    fontSize="36"
                    fontFamily="Playfair Display, Georgia, serif"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    {funnelRows[0].pct}
                  </text>
                  <text x="110" y="18" fill="#06261c" fontSize="13.5" fontWeight="700">
                    {funnelRows[0].title}
                  </text>
                  <text x="110" y="34" fill="#6b7280" fontSize="11" fontWeight="300">
                    {funnelRows[0].desc}
                  </text>
                </g>

                {/* Row 2 Metrics */}
                <g transform="translate(455, 238)">
                  <text
                    x="0"
                    y="31"
                    fill="#06261c"
                    fontSize="36"
                    fontFamily="Playfair Display, Georgia, serif"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    {funnelRows[1].pct}
                  </text>
                  <text x="110" y="18" fill="#06261c" fontSize="13.5" fontWeight="700">
                    {funnelRows[1].title}
                  </text>
                  <text x="110" y="34" fill="#6b7280" fontSize="11" fontWeight="300">
                    {funnelRows[1].desc}
                  </text>
                </g>

                {/* Row 3 Metrics */}
                <g transform="translate(425, 306)">
                  <text
                    x="0"
                    y="31"
                    fill="#06261c"
                    fontSize="36"
                    fontFamily="Playfair Display, Georgia, serif"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    {funnelRows[2].pct}
                  </text>
                  <text x="110" y="18" fill="#06261c" fontSize="13.5" fontWeight="700">
                    {funnelRows[2].title}
                  </text>
                  <text x="110" y="34" fill="#6b7280" fontSize="11" fontWeight="300">
                    {funnelRows[2].desc}
                  </text>
                </g>

                {/* Row 4 Metrics */}
                <g transform="translate(395, 374)">
                  <text
                    x="0"
                    y="31"
                    fill="#06261c"
                    fontSize="36"
                    fontFamily="Playfair Display, Georgia, serif"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    {funnelRows[3].pct}
                  </text>
                  <text x="110" y="18" fill="#06261c" fontSize="13.5" fontWeight="700">
                    {funnelRows[3].title}
                  </text>
                  <text x="110" y="34" fill="#6b7280" fontSize="11" fontWeight="300">
                    {funnelRows[3].desc}
                  </text>
                </g>
              </svg>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono w-full pt-3 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">
                Brotas 360° · {isSolutionFunnel ? 'Funil de Ação Estratégica' : 'Funil de Percepção'}
              </span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 5. FLOW HORIZONTAL
      case 'flow_horizontal': {
        const flowSteps = slide.diagramData?.flowItems || slide.diagramData?.steps || [];
        const iconsList = [Calendar, Search, Palette, Play, Rocket, Award, Zap, CheckCircle, Target, TrendingUp];
        const timelineData: TimelineItem[] = flowSteps.map((step: string, idx: number) => {
          const stepLines = step.split('\n');
          const stepName = stepLines[0].replace(/^\d+\.\s*/, '');
          const stepDesc = stepLines.length > 1 ? stepLines.slice(1).join(' ') : (slide.texts?.[idx] || `Fase estratégica de execução da comunicação.`);
          return {
            id: idx + 1,
            title: stepName,
            date: `Etapa ${String(idx + 1).padStart(2, '0')}`,
            content: stepDesc,
            category: slide.categoryLabel || 'Metodologia',
            icon: iconsList[idx % iconsList.length],
            relatedIds: idx < flowSteps.length - 1 ? [idx + 2] : [1],
            status: (idx === 0 ? 'completed' : idx === 1 ? 'in-progress' : 'pending') as TimelineItem['status'],
            energy: Math.max(25, 100 - idx * 12)
          };
        });

        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-6 md:p-10 flex flex-col justify-between overflow-hidden select-none">
            <div className="max-w-5xl mx-auto w-full z-10 text-center flex flex-col items-center">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold mb-1 block">
                {slide.categoryLabel || 'Metodologia'}
              </span>

              <h2
                className="text-2xl md:text-4xl font-serif font-black text-[#062a1d] mb-1"
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

            <div className="flex-1 w-full max-w-6xl mx-auto relative flex items-center justify-center my-auto min-h-[480px] md:min-h-[520px] z-10">
              <RadialOrbitalTimeline
                timelineData={timelineData}
                centerTitle="FLUXO 360°"
                theme="light"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">{slide.texts?.join(' · ') || 'Fluxo Integrado Brotas 360°'}</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 6. PHOTO GRID / ASYMMETRICAL 4-PHOTO MASONRY (IMAGE 1 REFERENCE)
      case 'photo_grid': {
        const slots = slide.imageSlots || [
          { id: 'grid-1', label: 'Foto Brotas 1' },
          { id: 'grid-2', label: 'Foto Brotas 2' },
          { id: 'grid-3', label: 'Foto Brotas 3' },
          { id: 'grid-4', label: 'Foto Brotas 4' }
        ];

        return (
          <div className="relative w-full h-full bg-[#FBFBFA] flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden select-none">
            <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-14 my-auto z-10">
              {/* Left Column: Asymmetrical 4-Photo Masonry Grid (Image 1 reference) */}
              <div className="w-full md:w-1/2 h-[380px] md:h-[480px] grid grid-cols-2 gap-3 md:gap-4 my-auto">
                {/* Left Sub-Column */}
                <div className="flex flex-col gap-3 md:gap-4 h-full">
                  <div className="h-[44%] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-black/5">
                    <ImageSlot slotId={slots[0]?.id || 'grid-1'} defaultUrl={slots[0]?.defaultUrl} label={slots[0]?.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[56%] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-black/5">
                    <ImageSlot slotId={slots[1]?.id || 'grid-2'} defaultUrl={slots[1]?.defaultUrl} label={slots[1]?.label} className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Right Sub-Column */}
                <div className="flex flex-col gap-3 md:gap-4 h-full">
                  <div className="h-[56%] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-black/5">
                    <ImageSlot slotId={slots[2]?.id || 'grid-3'} defaultUrl={slots[2]?.defaultUrl} label={slots[2]?.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-[44%] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-black/5">
                    <ImageSlot slotId={slots[3]?.id || 'grid-4'} defaultUrl={slots[3]?.defaultUrl} label={slots[3]?.label} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Serif Typography (Image 1 match) */}
              <div className="w-full md:w-1/2 flex flex-col justify-between h-[380px] md:h-[480px] py-2 max-w-lg">
                <div className="space-y-4">
                  <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                    {slide.categoryLabel || 'Território & Presença'}
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#062a1d] leading-[1.12] tracking-tight"
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

                  <p className="text-xl md:text-2xl font-serif italic text-[#062a1d]/85 font-normal leading-snug">
                    Presença territorial forte, estratégica e multiplataforma para Brotas
                  </p>
                </div>

                {slide.texts && (
                  <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                    {slide.texts.map((t, idx) => (
                      <p key={idx}>{t}</p>
                    ))}
                  </div>
                )}

                <div className="text-xs font-serif italic text-[#062a1d]/40 pt-2">
                  Brotas 360° · Presença Territorial e Audiovisual
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-3 left-8 right-8 flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Brotas 360° · Território</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 7. HUB SPOKE
      case 'hub_spoke': {
        const spokes = slide.hubSpokes || [
          'Diagnóstico',
          'Planejamento',
          'Criação',
          'Conteúdo',
          'Redes Sociais',
          'Imprensa',
          'Crise',
          'Dados',
          'Comunidade'
        ];
        const numSpokes = spokes.length;
        const radiusX = 38;
        const radiusY = 36;

        const nodePositions = spokes.map((_, i) => {
          const angle = (2 * Math.PI * i) / numSpokes - Math.PI / 2;
          return {
            x: 50 + radiusX * Math.cos(angle),
            y: 50 + radiusY * Math.sin(angle)
          };
        });

        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-12 flex flex-col justify-between overflow-hidden select-none">
            <div className="z-10 text-center">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold mb-1 inline-block">
                {slide.categoryLabel || 'Ecossistema'}
              </span>
              <h2
                className="text-3xl md:text-5xl font-serif font-black text-[#062a1d] tracking-tight"
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

            <div className="relative w-full max-w-6xl mx-auto h-[460px] md:h-[530px] my-auto flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                {nodePositions.map((pos, idx) => (
                  <line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="#DDE2DC"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>

              {/* Central Core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-32 md:w-40 h-32 md:h-40 rounded-full bg-[#062a1d] text-white shadow-2xl flex flex-col items-center justify-center text-center p-3 border-4 border-white z-10 cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#FFC20E]">
                    NÚCLEO INTEGRADO
                  </span>
                  <span
                    className="text-base md:text-lg font-serif font-black leading-tight text-white mt-1"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {slide.hubCenter || 'BROTAS 360°'}
                  </span>
                </motion.div>
              </div>

              {/* Orbiting Cards */}
              {nodePositions.map((pos, idx) => {
                const spoke = spokes[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.06 }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-md hover:shadow-xl hover:border-[#00A859] flex items-center gap-2.5 transition-all group-hover:scale-105">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00A859] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                        {spoke}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Brotas 360° · Ecossistema Integrado</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 8. CYCLE DIAGRAM
      case 'cycle_diagram': {
        const cycleItems = slide.cycleItems || [
          '1. Diagnóstico',
          '2. Planejamento',
          '3. Criação',
          '4. Produção',
          '5. Distribuição',
          '6. Monitoramento',
          '7. Análise',
          '8. Otimização',
          '9. Relatório'
        ];
        const iconsList = [Search, Calendar, Palette, Film, Globe, TrendingUp, BarChart, Rocket, FileText];
        const timelineData: TimelineItem[] = cycleItems.map((item: string, idx: number) => {
          const cleanTitle = item.replace(/^\d+\.\s*/, '');
          return {
            id: idx + 1,
            title: cleanTitle,
            date: `Fase 0${idx + 1}`,
            content: `Ciclo contínuo de ${cleanTitle} integrado à comunicação e inteligência de Brotas.`,
            category: slide.categoryLabel || 'Ciclo Contínuo',
            icon: iconsList[idx % iconsList.length],
            relatedIds: idx < cycleItems.length - 1 ? [idx + 2] : [1],
            status: (idx < 3 ? 'completed' : idx === 3 ? 'in-progress' : 'pending') as TimelineItem['status'],
            energy: Math.max(30, 100 - idx * 8)
          };
        });

        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-6 md:p-10 flex flex-col justify-between overflow-hidden select-none">
            <div className="z-10 text-center flex flex-col items-center">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold mb-1">
                {slide.categoryLabel || 'Processo Contínuo'}
              </span>
              <h2
                className="text-2xl md:text-4xl font-serif font-black text-[#062a1d] mb-1 text-center"
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

            <div className="flex-1 w-full max-w-6xl mx-auto relative flex items-center justify-center my-auto min-h-[480px] md:min-h-[520px] z-10">
              <RadialOrbitalTimeline
                timelineData={timelineData}
                centerTitle="CICLO 360°"
                theme="light"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Metodologia Cíclica Interativa de 9 Etapas</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 9. GRID CARDS / DONUT COMPARISON (IMAGE 6 REFERENCE)
      case 'grid_cards': {
        // Se houver 3 cards, renderizamos no estilo Donut Chart Cards (Image 6 reference)
        if (slide.gridCards && slide.gridCards.length === 3) {
          const donutPercentages = [50, 70, 20];
          return (
            <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-14 flex flex-col justify-between overflow-hidden select-none">
              <div className="text-center max-w-2xl mx-auto z-10 space-y-1">
                <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                  {slide.categoryLabel || 'Entregas'}
                </span>
                <h2
                  className="text-3xl md:text-5xl font-serif font-black text-[#062a1d] mb-2"
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
                {slide.subtitle && <p className="text-gray-500 text-sm">{slide.subtitle}</p>}
              </div>

              {/* 3 Dark Green Cards with Donut Charts (Image 6 Match) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto max-w-5xl mx-auto w-full z-10">
                {slide.gridCards.map((card, idx) => {
                  const pct = donutPercentages[idx % 3];
                  return (
                    <motion.div
                      key={idx}
                      {...getAnim(idx)}
                      className="bg-[#062a1d] text-white p-7 rounded-2xl shadow-xl flex flex-col items-center text-center space-y-5"
                    >
                      <span className="text-xl font-serif font-bold text-white/90">{pct}%</span>

                      {/* Donut Chart SVG */}
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-white/10"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#FFC20E]"
                            strokeDasharray={`${pct}, 100`}
                            strokeWidth="4"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-base font-serif font-bold text-white">
                          {pct}%
                        </span>
                      </div>

                      <div className="space-y-1.5 w-full pt-2 border-t border-white/10">
                        <h4 className="text-base font-serif font-bold text-[#FFC20E]">{card.title}</h4>
                        <p className="text-xs text-white/70 leading-relaxed">{card.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
                <span className="font-serif italic text-gray-500">Brotas 360° · Metodologia Estruturada</span>
                <span>{slide.slideNumber}</span>
              </div>
            </div>
          );
        }

        // Layout tradicional limpo com 6 cards
        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-14 flex flex-col justify-between overflow-hidden select-none">
            <div className="z-10">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold mb-1 block">
                {slide.categoryLabel || 'Entregas'}
              </span>
              <h2
                className="text-3xl md:text-4xl font-serif font-black text-[#062a1d] mb-1"
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
              {slide.subtitle && <p className="text-gray-500 text-sm mb-4">{slide.subtitle}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-auto max-w-5xl mx-auto w-full z-10">
              {slide.gridCards?.map((card, idx) => {
                const IconComponent = (card.icon && ICON_MAP[card.icon]) || Star;
                return (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="bg-white border border-gray-200/80 hover:border-[#00A859] p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: card.color ? `${card.color}15` : '#00A85915', color: card.color || '#062a1d' }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{card.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Brotas 360° · Metodologia Estruturada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 10. LEVELS BAR / 4-COLUMN PRICING & TIERS (IMAGE 4 REFERENCE)
      case 'levels_bar':
      case 'comparative_table': {
        const tiers = [
          {
            name: 'Informativo',
            headerBg: 'bg-[#0a3828]',
            summary: 'O que foi feito — obras, editais, horários e serviços à comunidade.',
            features: [
              'Boletins diários de obras',
              'Avisos de saúde e educação',
              'Canais oficiais atualizados',
              'Transparência com a população'
            ],
            badge: '1° Nível'
          },
          {
            name: 'Educativo',
            headerBg: 'bg-[#062a1d]',
            summary: 'Por que importa — benefícios coletivos, economia pública e sustentabilidade.',
            features: [
              'Explicação didática dos projetos',
              'Vídeos explicativos curtos',
              'Campanhas de conscientização',
              'Participação ativa do cidadão'
            ],
            badge: '2° Nível'
          },
          {
            name: 'Emocional',
            headerBg: 'bg-[#0e4d3c]',
            summary: 'Como impacta a vida — histórias reais de moradores e orgulho de viver em Brotas.',
            features: [
              'Documentários de pessoas reais',
              'Orgulho cívico e valorização',
              'Narrativas de transformação',
              'Sentimento de pertencimento'
            ],
            badge: '3° Nível'
          },
          {
            name: 'Estratégico',
            headerBg: 'bg-[#062a1d]',
            summary: 'Visão 360° — inteligência de dados, resposta rápida e aprovação de gestão.',
            features: [
              'Pesquisas de percepção',
              'Monitoramento de sentimento',
              'Gestão de crises em 2h',
              'Fortalecimento de reputação'
            ],
            badge: 'Total 360°'
          }
        ];

        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-14 flex flex-col justify-between overflow-hidden select-none">
            {/* Top Centered Header */}
            <div className="text-center max-w-3xl mx-auto space-y-2 z-10">
              <h2
                className="text-3xl md:text-5xl font-serif font-black text-[#062a1d] tracking-tight"
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

              <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                {slide.texts?.join(' ') || 'Estrutura estratégica em níveis de comunicação para que cada mensagem cumpra seu papel na mente do cidadão.'}
              </p>
            </div>

            {/* 4 Vertical Columns with Downward Triangle Header (Image 4 Match) */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 p-6 max-w-6xl mx-auto w-full my-auto z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {tiers.map((t, idx) => (
                  <motion.div
                    key={idx}
                    {...getAnim(idx)}
                    className="flex flex-col justify-between px-4 py-2 space-y-5"
                  >
                    {/* Header Banner with Downward Triangle */}
                    <div className="relative">
                      <div className={`${t.headerBg} text-white text-center py-3 px-4 rounded-t-xl font-serif font-bold text-base md:text-lg tracking-wide shadow-md`}>
                        {t.name}
                      </div>
                      {/* Downward triangle pointer */}
                      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#062a1d] mx-auto -mt-0.5"></div>
                    </div>

                    <p className="text-xs text-gray-600 text-center leading-relaxed min-h-[44px]">
                      {t.summary}
                    </p>

                    {/* Checklist */}
                    <div className="space-y-2.5 pt-2">
                      {t.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-[#00A859] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Badge */}
                    <div className="pt-4 text-center border-t border-gray-100">
                      <span className="text-2xl font-serif font-black text-[#062a1d]">
                        {t.badge}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Brotas 360° · Estrutura em Níveis</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );
      }

      // 11. FAN OUT
      case 'fan_out':
        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-14 flex flex-col justify-between overflow-hidden select-none">
            <div className="max-w-5xl mx-auto w-full z-10 text-center space-y-2">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                {slide.categoryLabel || 'Canais'}
              </span>
              <h2
                className="text-3xl md:text-5xl font-serif font-black text-[#062a1d]"
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto max-w-5xl mx-auto w-full z-10">
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
                    className="p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-3 hover:shadow-xl transition-all bg-white"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: channel.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{channel.name}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Distribuição Multiplataforma Brotas 360°</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 12. MOCKUP TRIPLE / LAPTOP HIGH-TECH MOCKUP (IMAGE 3 REFERENCE)
      case 'mockup_triple':
      case 'mockup_system':
      case 'dashboard':
        return (
          <div className="relative w-full h-full bg-[#062a1d] text-white flex flex-col justify-center items-center p-6 md:p-12 overflow-hidden select-none">
            <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-14 my-auto z-10">
              {/* Left Side: Realistic MacBook Laptop Mockup (Image 3 Match) */}
              <div className="w-full md:w-3/5 h-[340px] md:h-[460px] flex items-center justify-center">
                <div className="w-full max-w-lg flex flex-col items-center">
                  {/* Laptop Screen Bezel */}
                  <div className="w-full bg-[#111] rounded-t-2xl p-2.5 pb-0 border-2 border-gray-700 shadow-2xl relative">
                    <div className="w-20 h-3 bg-black rounded-b-md mx-auto flex items-center justify-center mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400/80"></div>
                    </div>
                    <div className="w-full h-60 md:h-68 bg-black rounded-t-lg overflow-hidden relative">
                      <ImageSlot
                        slotId={slide.imageSlots?.[0]?.id || `laptop-${slide.id}`}
                        defaultUrl={slide.imageSlots?.[0]?.defaultUrl}
                        label={slide.imageSlots?.[0]?.label || 'Dashboard / Sistema'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="w-[108%] h-3.5 bg-gradient-to-b from-gray-300 to-gray-500 rounded-b-xl shadow-2xl relative flex items-center justify-center">
                    <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Right Side: High Technology Headline + Stat (Image 3 Match) */}
              <div className="w-full md:w-2/5 flex flex-col justify-center space-y-5 max-w-md">
                <div className="space-y-2">
                  <span className="text-[#FFC20E] uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                    {slide.categoryLabel || 'Tecnologia'}
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight"
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
                  <p className="text-xl md:text-2xl font-serif italic text-white/80 font-normal">
                    gestão inteligente & alta tecnologia
                  </p>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  {slide.texts?.join(' ') || 'Plataforma integrada de dados, monitoramento e inteligência artificial para aproximar a prefeitura dos cidadãos de Brotas em tempo real.'}
                </p>

                {/* Big Metric Display */}
                <div className="pt-3 border-t border-white/15 flex items-baseline gap-4">
                  <span className="text-5xl md:text-6xl font-serif font-black text-[#FFC20E]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    360°
                  </span>
                  <div>
                    <span className="text-sm font-bold text-white uppercase tracking-wide block">
                      Visão Completa
                    </span>
                    <span className="text-xs text-gray-300 font-light block">
                      Monitoramento e resposta ágil
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-3 left-8 right-8 flex items-center justify-between text-xs text-white/40 font-mono pt-2 border-t border-white/10 z-10">
              <span className="font-serif italic text-white/50">Brotas 360° · Sistema de Inteligência</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 13. ORGANOGRAM
      case 'organogram':
        return (
          <div className="relative w-full h-full bg-[#FBFBFA] p-8 md:p-14 flex flex-col justify-between overflow-hidden select-none">
            <div className="z-10 text-center max-w-3xl mx-auto space-y-1">
              <span className="text-[#062a1d]/60 uppercase tracking-[0.25em] text-xs font-mono font-bold block">
                {slide.categoryLabel || 'Equipe'}
              </span>
              <h2
                className="text-3xl md:text-4xl font-serif font-black text-[#062a1d]"
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

            <div className="space-y-6 my-auto max-w-5xl mx-auto w-full z-10">
              {slide.orgLevels?.map((level, idx) => (
                <motion.div key={idx} {...getAnim(idx)} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono uppercase bg-[#062a1d] text-white px-3 py-1 rounded-full">
                      {level.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {level.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="bg-white border border-gray-200 p-3.5 rounded-xl text-center text-xs font-bold text-gray-800 shadow-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-2 border-t border-gray-200/60 z-10">
              <span className="font-serif italic text-gray-500">Equipe Multidisciplinar Dedicada</span>
              <span>{slide.slideNumber}</span>
            </div>
          </div>
        );

      // 14. BIG NUMBER
      case 'big_number':
        return (
          <div
            className={`relative w-full h-full flex flex-col items-center justify-center p-12 md:p-24 text-center overflow-hidden select-none ${
              slide.isDark ? 'bg-[#062a1d] text-white' : 'bg-[#FBFBFA] text-gray-900'
            }`}
          >
            {slide.categoryLabel && (
              <motion.span
                {...getAnim(0)}
                className={`uppercase tracking-[0.25em] text-xs font-mono font-bold mb-4 block z-10 ${
                  slide.isDark ? 'text-[#FFC20E]' : 'text-[#062a1d]/60'
                }`}
              >
                {slide.categoryLabel}
              </motion.span>
            )}

            <h3
              className={`text-2xl md:text-3xl font-serif font-light mb-6 z-10 ${
                slide.isDark ? 'text-gray-200' : 'text-gray-700'
              }`}
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
              className={`text-7xl md:text-9xl font-serif font-black mb-4 tracking-tighter z-10 ${
                slide.isDark ? 'text-[#FFC20E]' : 'text-[#062a1d]'
              }`}
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {slide.bigNumber || slide.title}
            </motion.h1>

            {slide.bigNumberLabel && (
              <motion.p
                {...getAnim(3)}
                className={`text-lg md:text-xl font-serif italic uppercase tracking-wider mb-6 z-10 ${
                  slide.isDark ? 'text-white/80' : 'text-[#062a1d]/80'
                }`}
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
                    className={`text-sm md:text-base font-light ${
                      slide.isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
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
          <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-[#FBFBFA]">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">{slide.title}</h2>
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
