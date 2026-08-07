import React, { useState, useEffect } from 'react';
import { SlideData } from '../types';
import { X, Save, RotateCcw, Edit3, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface EditSlideModalProps {
  slide: SlideData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSlide: SlideData) => void;
  onResetSlide?: () => void;
}

export const EditSlideModal: React.FC<EditSlideModalProps> = ({
  slide,
  isOpen,
  onClose,
  onSave,
  onResetSlide,
}) => {
  const [editedSlide, setEditedSlide] = useState<SlideData>(slide);
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    setEditedSlide(slide);
  }, [slide, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setEditedSlide((prev) => ({ ...prev, title: val }));
  };

  const handleSubtitleChange = (val: string) => {
    setEditedSlide((prev) => ({ ...prev, subtitle: val }));
  };

  const handleCategoryLabelChange = (val: string) => {
    setEditedSlide((prev) => ({ ...prev, categoryLabel: val }));
  };

  const handleDescriptionChange = (index: number, val: string) => {
    setEditedSlide((prev) => {
      if (Array.isArray(prev.descriptionText)) {
        const updated = [...prev.descriptionText];
        updated[index] = val;
        return { ...prev, descriptionText: updated };
      } else {
        return { ...prev, descriptionText: val };
      }
    });
  };

  const handleSingleDescChange = (val: string) => {
    setEditedSlide((prev) => ({ ...prev, descriptionText: val }));
  };

  const handleTableDataChange = (
    listKey: 'tableData' | 'tableData2' | 'tableData3',
    index: number,
    field: 'item' | 'description' | 'tag',
    val: string
  ) => {
    setEditedSlide((prev) => {
      const list = prev[listKey] || [];
      const updated = [...list];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, [listKey]: updated };
    });
  };

  const handlePillarChange = (
    index: number,
    field: 'title' | 'category' | 'description' | 'imageUrl' | 'badge',
    val: string
  ) => {
    setEditedSlide((prev) => {
      const pillars = prev.pillars || [];
      const updated = [...pillars];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, pillars: updated };
    });
  };

  const handleStepItemChange = (
    index: number,
    field: 'title' | 'description' | 'number',
    val: string
  ) => {
    setEditedSlide((prev) => {
      const steps = prev.stepItems || [];
      const updated = [...steps];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, stepItems: updated };
    });
  };

  const handleMetricChange = (
    index: number,
    field: 'value' | 'label' | 'category',
    val: string
  ) => {
    setEditedSlide((prev) => {
      const metrics = prev.metrics || [];
      const updated = [...metrics];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, metrics: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSlide);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b1739] text-white w-full max-w-3xl max-h-[85vh] rounded-2xl border border-blue-500/30 shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#060f26] border-b border-blue-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                Editar Slide {slide.slideNumber}
                <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                  {slide.categoryLabel}
                </span>
              </h2>
              <p className="text-xs text-gray-400">Altere títulos, textos e informações do slide atual</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form id="edit-slide-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Section: Common Information */}
          <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
              Informações Gerais do Slide
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Título do Slide</label>
                <input
                  type="text"
                  value={editedSlide.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-[#060d20] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Subtítulo / Categoria Label</label>
                <input
                  type="text"
                  value={editedSlide.subtitle || ''}
                  onChange={(e) => handleSubtitleChange(e.target.value)}
                  className="w-full bg-[#060d20] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Rótulo do Slide (Category Label)</label>
              <input
                type="text"
                value={editedSlide.categoryLabel || ''}
                onChange={(e) => handleCategoryLabelChange(e.target.value)}
                className="w-full bg-[#060d20] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Description Text */}
            {editedSlide.descriptionText !== undefined && (
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Texto Descritivo / Parágrafos
                </label>
                {Array.isArray(editedSlide.descriptionText) ? (
                  <div className="space-y-2">
                    {editedSlide.descriptionText.map((paragraph, pIdx) => (
                      <textarea
                        key={pIdx}
                        rows={2}
                        value={paragraph}
                        onChange={(e) => handleDescriptionChange(pIdx, e.target.value)}
                        className="w-full bg-[#060d20] border border-blue-900/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                        placeholder={`Parágrafo ${pIdx + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <textarea
                    rows={3}
                    value={editedSlide.descriptionText || ''}
                    onChange={(e) => handleSingleDescChange(e.target.value)}
                    className="w-full bg-[#060d20] border border-blue-900/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                )}
              </div>
            )}
          </div>

          {/* Section: Pillars (Slide 3 Natureza da Operação) */}
          {editedSlide.pillars && editedSlide.pillars.length > 0 && (
            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
                Pilares da Operação (4 Cards)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editedSlide.pillars.map((pillar, pIdx) => (
                  <div key={pIdx} className="bg-[#060d20] p-3 rounded-lg border border-blue-900/60 space-y-2 text-xs">
                    <div className="font-bold text-cyan-400">Pilar #{pIdx + 1}: {pillar.badge}</div>
                    <div>
                      <label className="text-[10px] text-gray-400">Título</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => handlePillarChange(pIdx, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Descrição</label>
                      <textarea
                        rows={2}
                        value={pillar.description}
                        onChange={(e) => handlePillarChange(pIdx, 'description', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">URL da Imagem</label>
                      <input
                        type="text"
                        value={pillar.imageUrl}
                        onChange={(e) => handlePillarChange(pIdx, 'imageUrl', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] text-gray-300 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Step Items (Modelo Operacional / Rotina / Design) */}
          {editedSlide.stepItems && editedSlide.stepItems.length > 0 && (
            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
                Etapas / Pilares ({editedSlide.stepItems.length} itens)
              </h3>
              <div className="space-y-3">
                {editedSlide.stepItems.map((step, sIdx) => (
                  <div key={sIdx} className="bg-[#060d20] p-3 rounded-lg border border-blue-900/60 flex flex-col md:flex-row gap-3 items-start text-xs">
                    <div className="w-12 font-mono font-bold text-cyan-400 shrink-0">#{step.number}</div>
                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepItemChange(sIdx, 'title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 font-bold text-white"
                        placeholder="Título da Etapa"
                      />
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => handleStepItemChange(sIdx, 'description', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs text-gray-300"
                        placeholder="Descrição"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Table Data (Dual Matrix / Indicadores) */}
          {editedSlide.tableData && editedSlide.tableData.length > 0 && (
            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
                Tabela de Entregas / Diretrizes ({editedSlide.tableData.length} linhas)
              </h3>
              <div className="space-y-2">
                {editedSlide.tableData.map((row, rIdx) => (
                  <div key={rIdx} className="bg-[#060d20] p-2.5 rounded-lg border border-blue-900/60 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs items-center">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) => handleTableDataChange('tableData', rIdx, 'item', e.target.value)}
                      className="md:col-span-4 bg-white/5 border border-white/10 rounded px-2 py-1 font-bold text-cyan-200"
                    />
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleTableDataChange('tableData', rIdx, 'description', e.target.value)}
                      className="md:col-span-8 bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Table Data 2 (if present) */}
          {editedSlide.tableData2 && editedSlide.tableData2.length > 0 && (
            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
                Tabela Complementar ({editedSlide.tableData2.length} linhas)
              </h3>
              <div className="space-y-2">
                {editedSlide.tableData2.map((row, rIdx) => (
                  <div key={rIdx} className="bg-[#060d20] p-2.5 rounded-lg border border-blue-900/60 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs items-center">
                    <input
                      type="text"
                      value={row.item}
                      onChange={(e) => handleTableDataChange('tableData2', rIdx, 'item', e.target.value)}
                      className="md:col-span-4 bg-white/5 border border-white/10 rounded px-2 py-1 font-bold text-cyan-200"
                    />
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleTableDataChange('tableData2', rIdx, 'description', e.target.value)}
                      className="md:col-span-8 bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Metrics (Resumo Executivo) */}
          {editedSlide.metrics && editedSlide.metrics.length > 0 && (
            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
                Métricas e Indicadores
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {editedSlide.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="bg-[#060d20] p-2.5 rounded-lg border border-blue-900/60 space-y-1 text-xs">
                    <div>
                      <label className="text-[10px] text-gray-400">Valor</label>
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => handleMetricChange(mIdx, 'value', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 font-bold text-amber-300"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Rótulo</label>
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => handleMetricChange(mIdx, 'label', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-gray-200 text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#060f26] border-t border-blue-900/50 flex items-center justify-between">
          <div>
            {onResetSlide && (
              <button
                type="button"
                onClick={onResetSlide}
                className="text-xs font-semibold text-gray-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                title="Restaurar dados originais deste slide"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restaurar Original
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="edit-slide-form"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* Success Toast Overlay */}
        {showSavedToast && (
          <div className="absolute inset-x-0 top-4 mx-auto w-max bg-emerald-500 text-black font-bold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            Slide atualizado com sucesso!
          </div>
        )}

      </div>
    </div>
  );
};
