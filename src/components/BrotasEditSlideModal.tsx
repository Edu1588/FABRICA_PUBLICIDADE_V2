import React, { useState, useEffect } from 'react';
import { BrotasSlideData } from '../data/brotasSlidesData';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Palette,
  Type,
  LayoutGrid,
  Layers,
  Sparkles
} from 'lucide-react';

interface BrotasEditSlideModalProps {
  slide: BrotasSlideData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSlide: BrotasSlideData) => void;
  onReset?: () => void;
  onImageUpload?: (slotId: string, file: File) => void;
  uploadedImages?: Record<string, string>;
}

export default function BrotasEditSlideModal({
  slide,
  isOpen,
  onClose,
  onSave,
  onReset,
  onImageUpload,
  uploadedImages = {}
}: BrotasEditSlideModalProps) {
  const [formData, setFormData] = useState<BrotasSlideData>(slide);
  const [activeTab, setActiveTab] = useState<'textos' | 'elementos' | 'imagens' | 'estilo'>('textos');
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    setFormData(slide);
  }, [slide, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleTextChange = (index: number, val: string) => {
    const updated = [...(formData.texts || [])];
    updated[index] = val;
    setFormData({ ...formData, texts: updated });
  };

  const handleAddText = () => {
    setFormData({
      ...formData,
      texts: [...(formData.texts || []), 'Novo parágrafo de texto...']
    });
  };

  const handleRemoveText = (index: number) => {
    const updated = [...(formData.texts || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, texts: updated });
  };

  const handleSpokeChange = (index: number, val: string) => {
    const updated = [...(formData.hubSpokes || [])];
    updated[index] = val;
    setFormData({ ...formData, hubSpokes: updated });
  };

  const handleAddSpoke = () => {
    setFormData({
      ...formData,
      hubSpokes: [...(formData.hubSpokes || []), 'Novo Módulo Conectado']
    });
  };

  const handleRemoveSpoke = (index: number) => {
    const updated = [...(formData.hubSpokes || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, hubSpokes: updated });
  };

  const handleCardChange = (index: number, field: 'title' | 'description' | 'color', val: string) => {
    const cards = [...(formData.gridCards || [])];
    cards[index] = { ...cards[index], [field]: val };
    setFormData({ ...formData, gridCards: cards });
  };

  const handleAddCard = () => {
    setFormData({
      ...formData,
      gridCards: [
        ...(formData.gridCards || []),
        { title: 'Novo Card', description: 'Descrição detalhada do item...', color: '#00A859' }
      ]
    });
  };

  const handleRemoveCard = (index: number) => {
    const cards = [...(formData.gridCards || [])];
    cards.splice(index, 1);
    setFormData({ ...formData, gridCards: cards });
  };

  const handleFileInput = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(slotId, e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 select-none animate-fade-in">
      <div className="bg-[#0e121b] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white font-sans">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00A859]/20 border border-[#00A859]/40 flex items-center justify-center text-[#00A859]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-[#00A859] text-white px-2 py-0.5 rounded-full font-bold">
                  Slide {formData.slideNumber}
                </span>
                <span className="text-xs text-white/50 font-mono">
                  Layout: {formData.layoutType}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5 truncate max-w-md">
                Editar Lâmina: {formData.title || 'Sem título'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-black/20 px-6 gap-2">
          {[
            { id: 'textos', label: 'Textos & Títulos', icon: Type },
            { id: 'elementos', label: 'Cards & Módulos', icon: LayoutGrid },
            { id: 'imagens', label: 'Fotos & Mídias', icon: ImageIcon },
            { id: 'estilo', label: 'Cores & Fundo', icon: Palette }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#00A859] text-[#00A859] bg-[#00A859]/5'
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: TEXTOS */}
          {activeTab === 'textos' && (
            <div className="space-y-5">
              {/* Category Label */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#FFC20E] block mb-1.5 font-bold">
                  Tag de Categoria
                </label>
                <input
                  type="text"
                  value={formData.categoryLabel || ''}
                  onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                  placeholder="Ex: Problema, Diagnóstico, Tecnologia..."
                  className="w-full bg-[#161c28] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00A859]"
                />
              </div>

              {/* Main Title */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1.5">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título do slide..."
                  className="w-full bg-[#161c28] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-semibold focus:outline-none focus:border-[#00A859]"
                />
              </div>

              {/* Subtitle / Big Number Label */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1.5">
                  Subtítulo / Destaque Secundário
                </label>
                <input
                  type="text"
                  value={formData.subtitle || formData.bigNumberLabel || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subtitle: e.target.value,
                      bigNumberLabel: e.target.value
                    })
                  }
                  placeholder="Subtítulo ou slogan..."
                  className="w-full bg-[#161c28] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00A859]"
                />
              </div>

              {/* Paragraphs / Bullets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                    Parágrafos / Tópicos de Texto ({formData.texts?.length || 0})
                  </label>
                  <button
                    onClick={handleAddText}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#00A859] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Parágrafo
                  </button>
                </div>

                {formData.texts?.map((txt, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-white/50 shrink-0 mt-2">
                      {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      value={txt}
                      onChange={(e) => handleTextChange(idx, e.target.value)}
                      className="flex-1 bg-[#161c28] border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#00A859] resize-none"
                    />
                    <button
                      onClick={() => handleRemoveText(idx)}
                      className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1.5"
                      title="Excluir parágrafo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ELEMENTOS (HUB / CARDS / TABELAS) */}
          {activeTab === 'elementos' && (
            <div className="space-y-6">
              {/* Hub & Spoke Modules */}
              {(formData.layoutType === 'hub_spoke' || formData.hubSpokes) && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#161c28] border border-white/10 rounded-2xl">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#00A859] block mb-1 font-bold">
                      Nome do Sistema Central (Hub)
                    </label>
                    <input
                      type="text"
                      value={formData.hubCenter || 'Portal Brotas'}
                      onChange={(e) => setFormData({ ...formData, hubCenter: e.target.value })}
                      className="w-full bg-[#0e121b] border border-white/10 rounded-xl px-4 py-2 text-white font-bold text-sm focus:outline-none focus:border-[#00A859]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                        Módulos Conectados ao Hub ({formData.hubSpokes?.length || 0})
                      </label>
                      <button
                        onClick={handleAddSpoke}
                        className="flex items-center gap-1 text-[11px] font-bold text-[#00A859] hover:underline"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar Módulo
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formData.hubSpokes?.map((spoke, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#161c28] p-2.5 rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-[#00A859] font-bold px-1.5">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={spoke}
                            onChange={(e) => handleSpokeChange(idx, e.target.value)}
                            className="flex-1 bg-transparent border-0 text-white text-xs font-semibold focus:outline-none"
                          />
                          <button
                            onClick={() => handleRemoveSpoke(idx)}
                            className="text-red-400/60 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Cards Editor */}
              {formData.gridCards && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                      Cards da Grade ({formData.gridCards.length})
                    </label>
                    <button
                      onClick={handleAddCard}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#00A859] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.gridCards.map((card, idx) => (
                      <div key={idx} className="bg-[#161c28] border border-white/10 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                            placeholder="Título do card"
                            className="flex-1 bg-[#0e121b] border border-white/10 rounded-lg px-3 py-1.5 text-white font-bold text-xs"
                          />
                          <input
                            type="color"
                            value={card.color || '#00A859'}
                            onChange={(e) => handleCardChange(idx, 'color', e.target.value)}
                            className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                            title="Cor de destaque"
                          />
                          <button
                            onClick={() => handleRemoveCard(idx)}
                            className="text-red-400/60 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                          placeholder="Descrição..."
                          className="w-full bg-[#0e121b] border border-white/10 rounded-lg p-2 text-white/80 text-xs resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: IMAGENS & FOTOS */}
          {activeTab === 'imagens' && (
            <div className="space-y-6">
              <p className="text-xs text-white/60">
                Substitua ou adicione fotos personalizadas para esta lâmina. As fotos são salvas instantaneamente no navegador.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.imageSlots && formData.imageSlots.length > 0
                  ? formData.imageSlots
                  : [{ id: `img-${formData.id}`, label: 'Foto Principal' }]
                ).map((slot) => {
                  const currentImg = uploadedImages[slot.id] || slot.defaultUrl || '/images/brotas/brotas_cover.jpg';
                  return (
                    <div key={slot.id} className="bg-[#161c28] border border-white/10 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{slot.label || 'Slot de Imagem'}</span>
                        <span className="text-[10px] font-mono text-white/40">{slot.id}</span>
                      </div>

                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group">
                        <img src={currentImg} alt="" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 cursor-pointer text-white">
                          <Upload className="w-6 h-6 text-[#00A859]" />
                          <span className="text-xs font-semibold">Carregar Nova Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileInput(slot.id, e)}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ESTILO & CORES */}
          {activeTab === 'estilo' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-[#161c28] border border-white/10 rounded-2xl">
                <div>
                  <h4 className="text-sm font-bold text-white">Tema Escuro / Fundo</h4>
                  <p className="text-xs text-white/50">Alternar entre fundo escuro (#0A0F1A) e fundo branco</p>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, isDark: !formData.isDark })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    formData.isDark ? 'bg-[#00A859] text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {formData.isDark ? 'Modo Escuro ATIVO' : 'Modo Claro ATIVO'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/40">
          <button
            onClick={() => {
              if (onReset && confirm('Restaurar os dados originais deste slide?')) {
                onReset();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restaurar Padrão
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white text-xs font-bold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#00A859] hover:bg-[#008f4c] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSavedToast && (
        <div className="fixed bottom-8 right-8 z-[120] bg-[#00A859] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          Lâmina salva com sucesso!
        </div>
      )}
    </div>
  );
}
