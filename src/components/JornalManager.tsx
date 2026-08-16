import React, { useState, useEffect, useRef } from 'react';
import { 
  Newspaper, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  Printer, 
  Share2, 
  Sparkles,
  Search,
  ChevronRight,
  Eye,
  RefreshCw,
  ExternalLink,
  Car,
  Layers
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { AppClient } from '../types';

export interface JornalOffer {
  id: string;
  fabricante: string;
  modelo: string;
  ano: string;
  precoOriginal?: string;
  precoOferta: string;
  condicaoParcela?: string;
  tagDestaque?: string;
  imageUrl: string;
  loja?: string;
  pagina: number;
}

export interface JornalEdition {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  vigencia: string;
  tiragem: string;
  formato: string;
  status: 'ativa' | 'diagramacao' | 'arquivada';
  dataPublicacao: string;
  ofertas: JornalOffer[];
}

const DEFAULT_OFFERS: JornalOffer[] = [
  {
    id: 'off-1',
    fabricante: 'CHEVROLET',
    modelo: 'CRUZE PREMIER 1.4 TURBO AT',
    ano: '2023 / 2024',
    precoOriginal: 'R$ 139.900',
    precoOferta: 'R$ 128.900',
    condicaoParcela: 'Entrada + 48x de R$ 1.690,00',
    tagDestaque: 'IPVA 2026 TOTAL GRÁTIS',
    imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785266948/CRUZE_AZUL_2_rn1jkx.png',
    loja: 'Unidade Matriz - Campinas',
    pagina: 1
  },
  {
    id: 'off-2',
    fabricante: 'JEEP',
    modelo: 'COMPASS LONGITUDE 1.3 TURBO T270',
    ano: '2023 / 2023',
    precoOriginal: 'R$ 154.900',
    precoOferta: 'R$ 146.900',
    condicaoParcela: 'Entrada facilitada + Taxa 0,99%',
    tagDestaque: 'ÚNICO DONO • 22.000 KM',
    imageUrl: 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png',
    loja: 'Unidade Valinhos',
    pagina: 2
  },
  {
    id: 'off-3',
    fabricante: 'TOYOTA',
    modelo: 'COROLLA XEi 2.0 FLEX AUTOMÁTICO',
    ano: '2022 / 2023',
    precoOriginal: 'R$ 132.000',
    precoOferta: 'R$ 124.900',
    condicaoParcela: 'Entrada + 36x fixas sem juros',
    tagDestaque: 'REVISÕES NA CONCESSIONÁRIA',
    imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png',
    loja: 'Unidade Matriz - Campinas',
    pagina: 2
  },
  {
    id: 'off-4',
    fabricante: 'VOLKSWAGEN',
    modelo: 'T-CROSS HIGHLINE 250 TSI',
    ano: '2023 / 2024',
    precoOriginal: 'R$ 142.900',
    precoOferta: 'R$ 134.500',
    condicaoParcela: 'Financiamento especial em até 60x',
    tagDestaque: 'GARANTIA DE FÁBRICA ATÉ 2027',
    imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785183140/CRUZE_AZUL_hl4hny.png',
    loja: 'Unidade Amparo',
    pagina: 3
  },
  {
    id: 'off-5',
    fabricante: 'HYUNDAI',
    modelo: 'CRETA ULTIMATE 2.0 SMARTSTREAM',
    ano: '2023 / 2023',
    precoOriginal: 'R$ 149.900',
    precoOferta: 'R$ 139.900',
    condicaoParcela: 'Troca com troco + Avaliação 100% FIPE',
    tagDestaque: 'TETO SOLAR PANORÂMICO',
    imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785266948/CRUZE_AZUL_2_rn1jkx.png',
    loja: 'Unidade Matriz - Campinas',
    pagina: 3
  },
  {
    id: 'off-6',
    fabricante: 'FIAT',
    modelo: 'TORO VOLCANO TURBO DIESEL 4X4',
    ano: '2022 / 2023',
    precoOriginal: 'R$ 158.900',
    precoOferta: 'R$ 148.900',
    condicaoParcela: 'Condição Especial para Produtor Rural e CNPJ',
    tagDestaque: 'TRAÇÃO 4X4 INTEGRAL',
    imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png',
    loja: 'Unidade Valinhos',
    pagina: 4
  }
];

const DEFAULT_EDITIONS: JornalEdition[] = [
  {
    id: 'ed-48',
    numero: 48,
    titulo: 'MEGA FEIRÃO DE SEMINOVOS SELECIONADOS',
    subtitulo: 'As melhores taxas do ano e estoque 100% revisado com garantia estendida',
    vigencia: '15 a 31 de Agosto de 2026',
    tiragem: '10.000 exemplares impressos + Encarte Digital Interativo',
    formato: 'Tablóide A3 Duplo (4 Páginas - Full Color)',
    status: 'ativa',
    dataPublicacao: '15/08/2026',
    ofertas: DEFAULT_OFFERS
  },
  {
    id: 'ed-47',
    numero: 47,
    titulo: 'FESTIVAL DO SUV & PICAPES AZUL',
    subtitulo: 'Condições especiais com avaliação justa do seu usado',
    vigencia: '01 a 14 de Agosto de 2026',
    tiragem: '8.000 exemplares',
    formato: 'Tablóide A3 (4 Páginas)',
    status: 'arquivada',
    dataPublicacao: '01/08/2026',
    ofertas: DEFAULT_OFFERS.slice(0, 4)
  }
];

export const JornalManager: React.FC<{ client: AppClient }> = ({ client }) => {
  const [editions, setEditions] = useState<JornalEdition[]>(() => {
    const saved = localStorage.getItem(`jornal_editions_${client.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_EDITIONS;
  });

  const [selectedEditionId, setSelectedEditionId] = useState<string>(editions[0]?.id || 'ed-48');
  const [activePageTab, setActivePageTab] = useState<number>(0); // 0 = Todas, 1 = Capa, 2 = Pag 2, etc.
  const [editingOffer, setEditingOffer] = useState<JornalOffer | null>(null);
  const [isAddingOffer, setIsAddingOffer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const activeEdition = editions.find(e => e.id === selectedEditionId) || editions[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveEditions = (newEditions: JornalEdition[]) => {
    setEditions(newEditions);
    localStorage.setItem(`jornal_editions_${client.id}`, JSON.stringify(newEditions));
  };

  const handleUpdateEditionInfo = (field: keyof JornalEdition, value: any) => {
    const updated = editions.map(ed => {
      if (ed.id === activeEdition.id) {
        return { ...ed, [field]: value };
      }
      return ed;
    });
    saveEditions(updated);
  };

  const handleSaveOffer = (offer: JornalOffer) => {
    const exists = activeEdition.ofertas.some(o => o.id === offer.id);
    let newOffers: JornalOffer[];
    if (exists) {
      newOffers = activeEdition.ofertas.map(o => o.id === offer.id ? offer : o);
    } else {
      newOffers = [...activeEdition.ofertas, offer];
    }
    const updated = editions.map(ed => ed.id === activeEdition.id ? { ...ed, ofertas: newOffers } : ed);
    saveEditions(updated);
    setEditingOffer(null);
    setIsAddingOffer(false);
    showToast('Oferta do jornal atualizada com sucesso!');
  };

  const handleDeleteOffer = (id: string) => {
    const newOffers = activeEdition.ofertas.filter(o => o.id !== id);
    const updated = editions.map(ed => ed.id === activeEdition.id ? { ...ed, ofertas: newOffers } : ed);
    saveEditions(updated);
    showToast('Veículo removido da edição do jornal.');
  };

  const handleAddEdition = () => {
    const nextNum = (editions[0]?.numero || 48) + 1;
    const newEd: JornalEdition = {
      id: `ed-${nextNum}`,
      numero: nextNum,
      titulo: `NOVA EDIÇÃO #${nextNum} - FEIRÃO DE OFERTAS`,
      subtitulo: 'Confira as melhores ofertas e condições exclusivas da Azul Veículos',
      vigencia: 'Próximo Período Comercial',
      tiragem: '10.000 exemplares',
      formato: 'Tablóide A3 (4 Páginas)',
      status: 'diagramacao',
      dataPublicacao: new Date().toLocaleDateString('pt-BR'),
      ofertas: [...DEFAULT_OFFERS]
    };
    const updated = [newEd, ...editions];
    saveEditions(updated);
    setSelectedEditionId(newEd.id);
    showToast(`Edição #${nextNum} criada com sucesso!`);
  };

  const handleExportPDF = () => {
    setIsExportingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background Header
      doc.setFillColor(10, 28, 106); // Dark Blue Azul
      doc.rect(0, 0, 210, 38, 'F');

      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('AZUL VEÍCULOS • JORNAL DE OFERTAS', 15, 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`EDIÇÃO #${activeEdition.numero} | VIGÊNCIA: ${activeEdition.vigencia.toUpperCase()}`, 15, 24);
      doc.text(`${activeEdition.titulo}`, 15, 31);

      // Section
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('TABELA DE OFERTAS DA EDIÇÃO', 15, 48);

      let yPos = 56;
      activeEdition.ofertas.forEach((offer, idx) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }

        // Card bg
        doc.setFillColor(245, 247, 250);
        doc.roundedRect(15, yPos, 180, 28, 2, 2, 'F');
        doc.setDrawColor(220, 225, 235);
        doc.roundedRect(15, yPos, 180, 28, 2, 2, 'S');

        // Text
        doc.setTextColor(10, 28, 106);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`${offer.fabricante} ${offer.modelo}`, 20, yPos + 8);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Ano: ${offer.ano} | Loja: ${offer.loja || 'Unidade Principal'} | Pág. ${offer.pagina}`, 20, yPos + 15);
        
        if (offer.tagDestaque) {
          doc.setTextColor(196, 106, 26);
          doc.setFont('helvetica', 'bold');
          doc.text(`★ ${offer.tagDestaque}`, 20, yPos + 22);
        }

        // Price
        doc.setTextColor(10, 28, 106);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(`${offer.precoOferta}`, 190, yPos + 12, { align: 'right' });

        if (offer.condicaoParcela) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(80, 80, 80);
          doc.text(`${offer.condicaoParcela}`, 190, yPos + 20, { align: 'right' });
        }

        yPos += 32;
      });

      // Footer
      doc.setFillColor(15, 20, 30);
      doc.rect(0, 282, 210, 15, 'F');
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(8);
      doc.text('Azul Veículos — azulveiculos.com.br • Produzido por Fábrica Publicidade', 105, 290, { align: 'center' });

      doc.save(`Jornal_Azul_Veiculos_Edicao_${activeEdition.numero}.pdf`);
      showToast('PDF do Jornal gerado e baixado com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao gerar PDF.');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const filteredOffers = activeEdition.ofertas.filter(offer => {
    const matchesSearch = 
      offer.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.fabricante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (offer.tagDestaque && offer.tagDestaque.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activePageTab === 0) return matchesSearch;
    return matchesSearch && offer.pagina === activePageTab;
  });

  return (
    <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-6xl space-y-8 animate-fade-in text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#161622] border border-[#0055FF]/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-pulse"></div>
          <span className="text-xs font-outfit uppercase tracking-widest">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0055FF]/20 to-[#0a1c6a]/40 border border-[#0055FF]/30 flex items-center justify-center text-[#3388FF] shadow-lg">
            <Newspaper className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-light tracking-wide uppercase text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                Jornal & Encarte de Ofertas
              </h3>
              <span className="text-[10px] font-outfit uppercase px-2.5 py-0.5 rounded-full bg-[#0055FF]/20 text-[#66A3FF] border border-[#0055FF]/30">
                {client.name}
              </span>
            </div>
            <p className="text-xs font-outfit text-white/50 uppercase tracking-widest mt-1">
              Gestão de edições impressas, tablóides digitais e ofertas de veículos
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAddEdition}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-outfit uppercase tracking-widest text-white/80 hover:text-white transition-all"
          >
            <Plus className="w-4 h-4 text-[#0055FF]" />
            Nova Edição
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExportingPdf}
            className="flex items-center gap-2 bg-[#0055FF] hover:bg-[#0044CC] text-white px-5 py-2.5 rounded-xl text-xs font-outfit uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isExportingPdf ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Edition Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111116] border border-white/5 p-4 rounded-xl">
        <div>
          <label className="text-[10px] font-outfit uppercase tracking-widest text-white/40 block mb-1.5">
            Edição Selecionada
          </label>
          <select
            value={selectedEditionId}
            onChange={(e) => setSelectedEditionId(e.target.value)}
            className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]/50"
          >
            {editions.map(ed => (
              <option key={ed.id} value={ed.id}>
                Edição #{ed.numero} — {ed.titulo} ({ed.status.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-outfit uppercase tracking-widest text-white/40 block mb-1.5">
            Período de Vigência
          </label>
          <input
            type="text"
            value={activeEdition.vigencia}
            onChange={(e) => handleUpdateEditionInfo('vigencia', e.target.value)}
            className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]/50"
          />
        </div>

        <div>
          <label className="text-[10px] font-outfit uppercase tracking-widest text-white/40 block mb-1.5">
            Status da Circulação
          </label>
          <select
            value={activeEdition.status}
            onChange={(e) => handleUpdateEditionInfo('status', e.target.value as any)}
            className="w-full bg-[#08080a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]/50"
          >
            <option value="ativa">🟢 Ativa / Em Circulação</option>
            <option value="diagramacao">🟡 Em Diagramação / Revisão</option>
            <option value="arquivada">⚪ Arquivada / Passada</option>
          </select>
        </div>
      </div>

      {/* Pages Navigator & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-outfit uppercase tracking-wider text-white/40 mr-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0055FF]" /> Páginas do Jornal:
          </span>
          {[
            { id: 0, label: 'Todas as Ofertas' },
            { id: 1, label: 'Pág. 1 (Capa)' },
            { id: 2, label: 'Pág. 2 (Seminovos)' },
            { id: 3, label: 'Pág. 3 (SUVs & Picapes)' },
            { id: 4, label: 'Pág. 4 (Contracapa)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePageTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-outfit uppercase tracking-widest transition-all ${
                activePageTab === tab.id
                  ? 'bg-[#0055FF] text-white shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar veículo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111116] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#0055FF]/50"
            />
          </div>

          <button
            onClick={() => {
              setEditingOffer({
                id: `off-${Date.now()}`,
                fabricante: '',
                modelo: '',
                ano: '2024 / 2024',
                precoOferta: 'R$ ',
                condicaoParcela: '',
                tagDestaque: 'OFERTA DO JORNAL',
                imageUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785266948/CRUZE_AZUL_2_rn1jkx.png',
                loja: 'Unidade Matriz - Campinas',
                pagina: activePageTab === 0 ? 1 : activePageTab
              });
              setIsAddingOffer(true);
            }}
            className="flex items-center gap-1.5 bg-[#0055FF]/10 hover:bg-[#0055FF]/20 border border-[#0055FF]/40 text-[#66A3FF] hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-outfit uppercase tracking-widest transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Oferta
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map(offer => (
          <div
            key={offer.id}
            className="bg-[#111116] hover:bg-[#14141c] border border-white/5 hover:border-[#0055FF]/40 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="relative">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[9px] font-outfit uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/70">
                  Pág. {offer.pagina}
                </span>
                {offer.tagDestaque && (
                  <span className="text-[9px] font-outfit uppercase tracking-wider px-2 py-0.5 rounded bg-[#0055FF]/20 text-[#66A3FF] border border-[#0055FF]/30 truncate max-w-[180px]">
                    {offer.tagDestaque}
                  </span>
                )}
              </div>

              {/* Vehicle Photo Container */}
              <div className="w-full h-36 bg-[#08080a] border border-white/5 rounded-lg overflow-hidden flex items-center justify-center p-2 mb-4 relative">
                {offer.imageUrl ? (
                  <img
                    src={offer.imageUrl}
                    alt={offer.modelo}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <Car className="w-12 h-12 text-white/20" />
                )}
              </div>

              {/* Vehicle Info */}
              <div className="text-[10px] font-outfit uppercase tracking-widest text-[#66A3FF] mb-1">
                {offer.fabricante || 'MONTADORA'} • {offer.ano}
              </div>
              <h4 className="text-base font-light text-white uppercase tracking-wide line-clamp-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                {offer.modelo || 'Nome do Veículo'}
              </h4>

              {/* Pricing Box */}
              <div className="mt-3 pt-3 border-t border-white/5">
                {offer.precoOriginal && (
                  <div className="text-[11px] line-through text-white/40 font-mono">
                    De: {offer.precoOriginal}
                  </div>
                )}
                <div className="text-xl font-bold text-white font-mono tracking-tight flex items-baseline gap-1">
                  <span className="text-xs font-normal text-[#3388FF]">Por</span>
                  {offer.precoOferta}
                </div>
                {offer.condicaoParcela && (
                  <div className="text-[10px] text-white/60 mt-1 font-mono leading-tight">
                    {offer.condicaoParcela}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
              <span className="text-[10px] font-outfit text-white/40 truncate max-w-[140px]">
                {offer.loja || 'Unidade Principal'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingOffer({ ...offer });
                    setIsAddingOffer(false);
                  }}
                  className="p-1.5 text-white/60 hover:text-[#3388FF] hover:bg-white/5 rounded-lg transition-colors"
                  title="Editar Oferta"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="p-1.5 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remover Oferta"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="bg-[#111116] border border-white/5 rounded-xl p-12 text-center">
          <Newspaper className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h4 className="text-lg font-light uppercase text-white">Nenhuma oferta encontrada</h4>
          <p className="text-xs text-white/40 mt-1">Clique em "Adicionar Oferta" para cadastrar veículos nesta página do jornal.</p>
        </div>
      )}

      {/* Edit / Add Modal */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f14] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-5 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="text-lg font-light uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                {isAddingOffer ? 'Adicionar Veículo ao Jornal' : 'Editar Oferta do Jornal'}
              </h4>
              <button
                onClick={() => setEditingOffer(null)}
                className="text-white/40 hover:text-white text-xs font-outfit uppercase tracking-widest"
              >
                Fechar
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Montadora</label>
                <input
                  type="text"
                  value={editingOffer.fabricante}
                  onChange={(e) => setEditingOffer({ ...editingOffer, fabricante: e.target.value })}
                  placeholder="Ex: CHEVROLET"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Ano / Modelo</label>
                <input
                  type="text"
                  value={editingOffer.ano}
                  onChange={(e) => setEditingOffer({ ...editingOffer, ano: e.target.value })}
                  placeholder="Ex: 2023 / 2024"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Modelo & Versão</label>
                <input
                  type="text"
                  value={editingOffer.modelo}
                  onChange={(e) => setEditingOffer({ ...editingOffer, modelo: e.target.value })}
                  placeholder="Ex: CRUZE PREMIER 1.4 TURBO AT"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Preço Original (De:)</label>
                <input
                  type="text"
                  value={editingOffer.precoOriginal || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, precoOriginal: e.target.value })}
                  placeholder="Ex: R$ 139.900"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Preço Jornal (Por:)</label>
                <input
                  type="text"
                  value={editingOffer.precoOferta}
                  onChange={(e) => setEditingOffer({ ...editingOffer, precoOferta: e.target.value })}
                  placeholder="Ex: R$ 128.900"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Condições de Parcela / Financiamento</label>
                <input
                  type="text"
                  value={editingOffer.condicaoParcela || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, condicaoParcela: e.target.value })}
                  placeholder="Ex: Entrada + 48x de R$ 1.690,00 ou Taxa 0%"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Selo / Tag de Destaque</label>
                <input
                  type="text"
                  value={editingOffer.tagDestaque || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, tagDestaque: e.target.value })}
                  placeholder="Ex: IPVA 2026 GRÁTIS • ÚNICO DONO"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">URL da Imagem do Veículo</label>
                <input
                  type="text"
                  value={editingOffer.imageUrl}
                  onChange={(e) => setEditingOffer({ ...editingOffer, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Página do Jornal</label>
                <select
                  value={editingOffer.pagina}
                  onChange={(e) => setEditingOffer({ ...editingOffer, pagina: Number(e.target.value) })}
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                >
                  <option value={1}>Página 1 (Capa Principal)</option>
                  <option value={2}>Página 2 (Seminovos)</option>
                  <option value={3}>Página 3 (SUVs & Picapes)</option>
                  <option value={4}>Página 4 (Contracapa)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-outfit uppercase tracking-widest text-white/50 block mb-1">Loja / Unidade</label>
                <input
                  type="text"
                  value={editingOffer.loja || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, loja: e.target.value })}
                  placeholder="Ex: Unidade Matriz - Campinas"
                  className="w-full bg-[#050508] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0055FF]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2 rounded-lg text-xs font-outfit uppercase tracking-widest text-white/60 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleSaveOffer(editingOffer)}
                className="bg-[#0055FF] hover:bg-[#0044CC] text-white px-6 py-2 rounded-lg text-xs font-outfit uppercase tracking-widest transition-all"
              >
                Salvar Oferta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
