import React, { useState, useEffect, useRef } from "react";
import {
  Palette,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Sparkles,
  Link as LinkIcon,
  RefreshCw,
  FolderHeart,
  Grid,
  Layers,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { AppClient } from "../types";
import { supabase } from "../lib/supabase";

interface MoodboardItem {
  id: string;
  url: string;
  title?: string;
  tag?: string;
}

interface MoodboardViewProps {
  client: AppClient;
  onBack?: () => void;
  onSaveClient?: (data: Partial<AppClient>) => void;
}

export const MoodboardView: React.FC<MoodboardViewProps> = ({ client, onBack, onSaveClient }) => {
  const [pinterestUrl, setPinterestUrl] = useState<string>(() => {
    try {
      if (client.detalhes) {
        const d = typeof client.detalhes === "string" ? JSON.parse(client.detalhes) : client.detalhes;
        if (d.pinterestUrl) return d.pinterestUrl;
      }
    } catch {}
    if (client.name?.toLowerCase().includes("azul")) {
      return "https://br.pinterest.com/pin/337770040827289945/";
    }
    return "https://br.pinterest.com/";
  });

  const [pinterestInput, setPinterestInput] = useState(pinterestUrl);
  const [activePinterestBoard, setActivePinterestBoard] = useState(pinterestUrl);
  const [containerWidth, setContainerWidth] = useState<number>(1150);
  const [items, setItems] = useState<MoodboardItem[]>(() => {
    try {
      if (client.detalhes) {
        const d = typeof client.detalhes === "string" ? JSON.parse(client.detalhes) : client.detalhes;
        if (Array.isArray(d.moodboardItems)) return d.moodboardItems;
      }
    } catch {}
    return [
      { id: "1", url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop", title: "Conceito Automotivo Premium", tag: "Tipografia & Cores" },
      { id: "2", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", title: "Design de Interiores & Lifestyle", tag: "Fotografia" },
      { id: "3", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop", title: "Luzes e Linhas de Carroceria", tag: "Iluminação" }
    ];
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageTag, setNewImageTag] = useState("Referência Visual");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"pinterest" | "galeria">("pinterest");
  const pinterestContainerRef = useRef<HTMLDivElement>(null);

  // Medir largura real do container para o Pinterest renderizar todas as colunas
  useEffect(() => {
    const updateWidth = () => {
      if (pinterestContainerRef.current) {
        const w = pinterestContainerRef.current.offsetWidth;
        if (w > 300) {
          setContainerWidth(w);
        }
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [activeSubTab]);

  // Carregar script oficial do Pinterest (pinit.js) e recriar widgets
  const reloadPinterestWidget = () => {
    if (typeof window !== "undefined") {
      const existingScript = document.getElementById("pinterest-pinit-script");
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = "pinterest-pinit-script";
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.onload = () => {
        if ((window as any).PinUtils) {
          (window as any).PinUtils.build();
        }
      };
      document.body.appendChild(script);

      setTimeout(() => {
        if ((window as any).PinUtils) {
          (window as any).PinUtils.build();
        }
      }, 500);
    }
  };

  useEffect(() => {
    reloadPinterestWidget();
  }, [activePinterestBoard, activeSubTab, containerWidth]);

  const handleApplyPinterestUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinterestInput.trim()) return;
    let url = pinterestInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    setPinterestUrl(url);
    setActivePinterestBoard(url);
    saveMoodboardData(url, items);
    setTimeout(reloadPinterestWidget, 300);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    const newItem: MoodboardItem = {
      id: crypto.randomUUID(),
      url: newImageUrl.trim(),
      title: newImageTitle.trim() || "Nova Referência Visual",
      tag: newImageTag.trim() || "Geral"
    };
    const updated = [newItem, ...items];
    setItems(updated);
    setNewImageUrl("");
    setNewImageTitle("");
    setShowAddModal(false);
    saveMoodboardData(pinterestUrl, updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    saveMoodboardData(pinterestUrl, updated);
  };

  const saveMoodboardData = async (pUrl: string, mItems: MoodboardItem[]) => {
    setIsSaved(false);
    try {
      let currentDetalhes: any = {};
      try {
        if (client.detalhes) {
          currentDetalhes = typeof client.detalhes === "string" ? JSON.parse(client.detalhes) : client.detalhes;
        }
      } catch {}

      const updatedDetalhes = {
        ...currentDetalhes,
        pinterestUrl: pUrl,
        moodboardItems: mItems
      };

      const payload = {
        detalhes: JSON.stringify(updatedDetalhes)
      };

      if (onSaveClient) {
        onSaveClient(payload);
      }

      const descPayload = JSON.stringify({
        text: client.description || "",
        detalhes: JSON.stringify(updatedDetalhes),
        anexos: client.anexos || "",
        corCliente: client.corCliente || "#FF7A00"
      });

      await supabase.from("clients").upsert({
        id: client.id,
        name: client.name,
        description: descPayload,
        logourl: client.logoUrl,
        active: client.active
      });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) {
      console.error("Erro ao salvar moodboard:", err);
    }
  };

  const isPinUrl = /pinterest\.[a-z.]+\/pin\//i.test(activePinterestBoard);
  const isBoardUrl = /pinterest\.[a-z.]+\/[^/]+\/[^/]+/i.test(activePinterestBoard) && !isPinUrl;

  return (
    <div className="space-y-6 animate-fade-in font-sans text-white w-full">
      <style>{`
        .pinterest-embed-box span[data-pin-do="embedBoard"],
        .pinterest-embed-box span[data-pin-do="embedPin"],
        .pinterest-embed-box > span,
        .pinterest-embed-box iframe {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
      `}</style>

      {/* Botão de Voltar */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para opções do cliente
        </button>
      )}

      {/* Cabeçalho do Moodboard */}
      <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white border shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: `${client.corCliente || "#E60023"}20`,
                borderColor: `${client.corCliente || "#E60023"}40`
              }}
            >
              <FolderHeart className="w-7 h-7 text-[#E60023]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-light tracking-wide uppercase text-white font-outfit">
                  Moodboard & Referências Visuais
                </h2>
                {isSaved && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Salvo
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">
                Cliente: <span className="text-[#C46A1A] font-bold">{client.name}</span> | Painel Pinterest & Inspirações
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activePinterestBoard}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#E60023]/10 hover:bg-[#E60023] text-[#E60023] hover:text-white border border-[#E60023]/30 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir no Pinterest
            </a>
          </div>
        </div>

        {/* Barra de URL da Pasta do Pinterest */}
        <div className="bg-[#111116] border border-white/5 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[#E60023] flex items-center gap-2 font-bold">
              <LinkIcon className="w-3.5 h-3.5" />
              Link da Pasta / Painel do Pinterest
            </label>
            <span className="text-[10px] font-mono text-white/40">
              Cole o link da pasta para preencher 100% da largura do box
            </span>
          </div>

          <form onSubmit={handleApplyPinterestUrl} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="https://br.pinterest.com/usuario/nome-da-pasta/..."
              value={pinterestInput}
              onChange={(e) => setPinterestInput(e.target.value)}
              className="flex-1 bg-[#08080c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E60023] transition-colors font-mono"
            />
            <button
              type="submit"
              className="bg-[#E60023] hover:bg-[#c0001d] text-white px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Carregar Pasta
            </button>
          </form>
        </div>

        {/* Abas de Visualização: Pinterest Widget / Galeria Manual */}
        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveSubTab("pinterest")}
              className={`px-4 py-2 rounded-lg border uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === "pinterest"
                  ? "bg-[#E60023] text-white font-bold border-[#E60023]"
                  : "bg-transparent text-white/60 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5" />
              Pasta Pinterest (100% Largura)
            </button>
            <button
              onClick={() => setActiveSubTab("galeria")}
              className={`px-4 py-2 rounded-lg border uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === "galeria"
                  ? "bg-[#C46A1A] text-black font-bold border-[#C46A1A]"
                  : "bg-transparent text-white/60 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Galeria Customizada ({items.length})
            </button>
          </div>

          {activeSubTab === "galeria" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C46A1A]" />
              Adicionar Imagem
            </button>
          )}
        </div>

        {/* CONTEÚDO 1: EMBED DO PINTEREST OCUPANDO 100% DO BOX */}
        {activeSubTab === "pinterest" && (
          <div className="space-y-4 w-full">
            <div className="bg-[#07070a] border border-white/10 rounded-2xl p-2 sm:p-4 flex flex-col items-center justify-center min-h-[550px] overflow-hidden relative w-full">
              <div 
                ref={pinterestContainerRef} 
                className="w-full flex justify-center items-center py-2 pinterest-embed-box overflow-hidden"
              >
                {/* Tag de Embed Oficial do Pinterest com largura dinâmica de 100% */}
                {isBoardUrl ? (
                  <a
                    data-pin-do="embedBoard"
                    data-pin-board-width={containerWidth ? String(containerWidth) : "1200"}
                    data-pin-scale-height="650"
                    data-pin-scale-width="180"
                    href={activePinterestBoard}
                    className="w-full"
                  >
                    Carregando pasta do Pinterest...
                  </a>
                ) : (
                  <a
                    data-pin-do="embedPin"
                    data-pin-width="large"
                    href={activePinterestBoard}
                  >
                    Carregando pin do Pinterest...
                  </a>
                )}
              </div>

              {/* Barra de Status */}
              <div className="w-full pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 font-mono px-2">
                <span>Pasta vinculada: {activePinterestBoard}</span>
                <button
                  onClick={reloadPinterestWidget}
                  className="text-[#E60023] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <RefreshCw className="w-3 h-3" />
                  Atualizar Visualização do Pinterest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTEÚDO 2: GALERIA CUSTOMIZADA DE IMAGENS */}
        {activeSubTab === "galeria" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#111116] border border-white/5 hover:border-[#C46A1A]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
                >
                  <div className="h-48 w-full overflow-hidden bg-black/50 relative">
                    <img
                      src={item.url}
                      alt={item.title || "Moodboard Item"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="w-8 h-8 rounded-lg bg-black/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.tag && (
                      <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase bg-black/80 backdrop-blur-sm text-white/80 px-2 py-0.5 rounded border border-white/10">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal para Adicionar Imagem Manual */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#C46A1A]" />
                Adicionar Referência Visual
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">URL da Imagem / Foto</label>
                <input
                  type="text"
                  placeholder="https://exemplo.com/imagem.jpg..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-[#08080c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C46A1A]"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">Título / Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Paleta Noturna, Detalhe Farol..."
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  className="w-full bg-[#08080c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C46A1A]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1">Categoria / Tag</label>
                <input
                  type="text"
                  placeholder="Ex: Tipografia, Cores, Fotografia..."
                  value={newImageTag}
                  onChange={(e) => setNewImageTag(e.target.value)}
                  className="w-full bg-[#08080c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C46A1A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono uppercase text-white/60 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newImageUrl.trim()}
                  className="bg-[#C46A1A] hover:bg-[#a85914] text-white px-5 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all disabled:opacity-50"
                >
                  Salvar Referência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
