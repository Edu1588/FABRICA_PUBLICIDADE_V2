import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  LogOut, 
  Plus, 
  Trash2,
  RotateCcw, 
  Users, 
  ArrowLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  Upload, 
  Download, 
  FolderOpen,
  Sliders,
  Settings,
  Grid,
  FileText,
  Loader2,
  LayoutDashboard,
  Palette,
  Sun,
  Moon,
  Newspaper,
  Sparkles
} from 'lucide-react';
import { AdminDashboard } from '../components/AdminDashboard';
import { DesignBrandbook } from '../components/DesignBrandbook';
import { JornalManager } from '../components/JornalManager';

import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { supabase } from '../lib/supabase';
import { AppClient, CarouselSlide } from '../types';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin_theme');
    if (savedTheme) setTheme(savedTheme as 'dark' | 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('admin_theme', newTheme);
  };
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('aforja_admin_authenticated', 'true');
      setErrorMsg('');
    } else {
      setErrorMsg('PIN INCOMPATÍVEL');
      setPassword('');
    }
  };

  const handleKeyPress = (num: string) => {
    if (password.length < 8) {
      setPassword(prev => prev + num);
      setErrorMsg('');
    }
  };

  const handleClear = () => {
    setPassword('');
    setErrorMsg('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aforja_admin_authenticated');
    setPassword('');
  };

  // Unified Workflow
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes' | 'config'>('clientes');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showCarrosseis, setShowCarrosseis] = useState(false);
  const [showDesign, setShowDesign] = useState(false);
  const [showJornal, setShowJornal] = useState(false);
  const [activeEditor, setActiveEditor] = useState<'destaque' | 'ofertas' | null>(null);
  const [showEditClient, setShowEditClient] = useState(false);
  
  // Clients List State
  const [clients, setClients] = useState<AppClient[]>([]);
  const [newClientName, setNewClientName] = useState('');

  const selectedClientData = clients.find(c => c.id === selectedClientId) || clients[0];

  const updateSelectedClient = (data: Partial<AppClient>) => {
    if (!selectedClientId) return;
    const updated = clients.map(c => c.id === selectedClientId ? { ...c, ...data } : c);
    setClients(updated);
    
    const clientToUpdate = updated.find(c => c.id === selectedClientId);
    if (clientToUpdate) {
      const descPayload = JSON.stringify({ text: clientToUpdate.description, detalhes: clientToUpdate.detalhes, anexos: clientToUpdate.anexos, corCliente: clientToUpdate.corCliente });
      supabase.from('clients').upsert({ id: clientToUpdate.id, name: clientToUpdate.name, description: descPayload, logourl: clientToUpdate.logoUrl, active: clientToUpdate.active })
        .then(({ error }) => {
          if (error) console.error('Error saving client:', error);
        });
    }
  };

  // Slides State
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Automatically update default images when changing clients
  useEffect(() => {
    if (!selectedClientData) return;
    
    const defaultCapaUrls = [
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787339431/NOVA_CAPA_AZUL3.png',
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787333196/NOVA_CAPA_AZUL.png',
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787262380/capaAZULBASE2.png',
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787242854/capaAZUL.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png'
    ];
    
    const defaultFinalUrls = [
      'https://res.cloudinary.com/ifuatk2z/image/upload/v1787248141/finalAzul2.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png',
      'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png'
    ];
    
    const targetFinalUrl = selectedClientData?.name?.toLowerCase().includes('meta') ? defaultFinalUrls[1] : selectedClientData?.name?.toLowerCase().includes('azul') ? defaultFinalUrls[0] : defaultFinalUrls[2];
    const targetWebsite = selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'AZULVEICULOS.COM.BR' : 'unimaisveiculos.com.br';

    let hasChanges = false;
    const newSlides = slides.map(s => {
      if (s.type === 'capa') {
        // Clear any old overlay frame images from the background image slot
        if (s.imageUrl && defaultCapaUrls.includes(s.imageUrl)) {
          hasChanges = true;
          return { ...s, imageUrl: '', website: targetWebsite };
        }
        if (s.website !== targetWebsite) {
          hasChanges = true;
          return { ...s, website: targetWebsite };
        }
      }
      if (s.type === 'final') {
        if (!s.imageUrl || defaultFinalUrls.includes(s.imageUrl)) {
           if (s.imageUrl !== targetFinalUrl || s.website !== targetWebsite) {
             hasChanges = true;
             return { ...s, imageUrl: targetFinalUrl, website: targetWebsite };
           }
        }
      }
      return s;
    });
    
    if (hasChanges) {
      setSlides(newSlides);
    }
  }, [selectedClientId, selectedClientData, slides.length]);
  

  const handleAddSlide = (type: 'veiculo' | 'capa' | 'final' | 'destaque') => {
    let baseSlide = null;
    if (type === 'veiculo' || type === 'destaque') {
      baseSlide = [...slides].reverse().find(s => s.type === 'veiculo' || s.type === 'destaque');
    }
    
    const newSlide: CarouselSlide = {
      id: crypto.randomUUID(),
      type,
      title: type === 'destaque' ? 'CARRO DESTAQUE' : type === 'veiculo' ? 'NOVO VEÍCULO' : type === 'capa' ? 'NOVA CAPA' : 'NOVO FINAL',
      fabricante: baseSlide ? baseSlide.fabricante : '',
      modelo: baseSlide ? baseSlide.modelo : '',
      descricao: baseSlide ? baseSlide.descricao : '',
      imageUrl: type === 'capa' ? '' : type === 'final' ? (baseSlide?.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787248141/finalAzul2.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png')) : '',
      zoom: 1,
      posX: 0,
      posY: 0,
      condicao1Label: 'ANO', condicao1Val: baseSlide ? baseSlide.condicao1Val : '',
      condicao2Label: 'KM', condicao2Val: baseSlide ? baseSlide.condicao2Val : '',
      condicao3Label: 'CÂMBIO', condicao3Val: baseSlide ? (baseSlide.cambio || baseSlide.condicao3Val || 'MANUAL') : 'MANUAL',
      condicao4Label: '', condicao4Val: '',
      valorFipe: '',
      valorIntegral: baseSlide ? baseSlide.valorIntegral : '',
      cambio: baseSlide ? (baseSlide.cambio || 'MANUAL') : 'MANUAL',
      lojasCapa: baseSlide ? baseSlide.lojasCapa : '',
      website: baseSlide ? baseSlide.website : ''
    };
    let updated = [...slides, newSlide];
    updated.sort((a, b) => {
        if (a.type === 'capa') return -1;
        if (b.type === 'capa') return 1;
        if (a.type === 'final') return 1;
        if (b.type === 'final') return -1;
        return 0;
    });
    setSlides(updated);
    setActiveSlideIndex(updated.indexOf(newSlide));
  };

  const handleDeleteSlide = (index: number) => {
    const slideToDelete = slides[index];
    if (slideToDelete.type === 'capa' || slideToDelete.type === 'final') {
      showToast('Capa e Final não podem ser removidos.', 'error');
      return;
    }
    const updated = slides.filter((_, idx) => idx !== index);
    setSlides(updated);
    if (activeSlideIndex >= updated.length) {
      setActiveSlideIndex(Math.max(0, updated.length - 1));
    }
  };
  
  const activeSlide = slides[activeSlideIndex];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !activeSlide) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    updateActiveSlideField('posX', (activeSlide.posX || 0) + dx);
    updateActiveSlideField('posY', (activeSlide.posY || 0) + dy);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatPriceMask = (value: string) => {
    if (!value) return '';
    const clean = value.replace(/\D/g, '');
    if (!clean) return '';
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const globalVehicleFields = ['fabricante', 'modelo', 'descricao', 'valorFipe', 'valorIntegral', 'condicao1Label', 'condicao1Val', 'condicao2Label', 'condicao2Val', 'condicao3Label', 'condicao3Val', 'condicao4Label', 'condicao4Val', 'title'];

  const updateActiveSlideField = (field: keyof CarouselSlide, value: any) => {
    setSlides(prevSlides => prevSlides.map((s, idx) => {
      if (idx === activeSlideIndex) return { ...s, [field]: value };
      if (['valorFipe', 'valorIntegral', 'modelo', 'descricao'].includes(field as string)) {
        return { ...s, [field]: value };
      }
      if (s.type === 'veiculo' && globalVehicleFields.includes(field as string) && prevSlides[activeSlideIndex]?.type === 'veiculo') {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  const updateMultipleActiveSlideFields = (updates: Partial<CarouselSlide>) => {
    setSlides(prevSlides => prevSlides.map((s, idx) => {
      if (idx === activeSlideIndex) return { ...s, ...updates };
      if (s.type === 'veiculo' && prevSlides[activeSlideIndex]?.type === 'veiculo') {
        const vehicleUpdates: any = {};
        for (const key of Object.keys(updates)) {
          if (globalVehicleFields.includes(key)) {
            vehicleUpdates[key] = (updates as any)[key];
          }
        }
        return { ...s, ...vehicleUpdates };
      }
      return s;
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          updateActiveSlideField('imageUrl', ev.target.result.toString());
          updateActiveSlideField('imageFileName', file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Scraping State
  const [scraping, setScraping] = useState(false);
  const [scrapeQuery, setScrapeQuery] = useState('');


  const handleScrape = async () => {
    if (!scrapeQuery) return;
    setScraping(true);
    try {
      const res = await fetch('/api/scrape-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: scrapeQuery, client: selectedClientData?.name?.toLowerCase().includes('meta') ? 'meta' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'azul' : 'unimais' })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSlides(prevSlides => {
          const firstCarIndex = prevSlides.findIndex(s => s.type === 'veiculo' || s.type === 'destaque');
          const filteredSlides = prevSlides.filter((s, idx) => (s.type !== 'veiculo' && s.type !== 'destaque') || idx === firstCarIndex);
          
          const resetSlides = filteredSlides.map(s => {
            if (s.type === 'veiculo' || s.type === 'destaque') {
              return {
                ...s,
                fabricante: data.data.montadora || '',
                modelo: data.data.modelo || '',
                descricao: data.data.descricao || '',
                valorFipe: '',
                valorIntegral: formatPriceMask(data.data.valor || ''),
                cambio: data.data.cambio || 'MANUAL',
                title: `${scrapeQuery.toUpperCase().replace(/[^A-Z0-9]/g, '')}_carrossel_${selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais'}`,
                condicao1Label: 'ANO', condicao1Val: data.data.ano || '',
                condicao2Label: 'KM', condicao2Val: data.data.km || '',
                condicao3Label: 'CÂMBIO', condicao3Val: data.data.cambio || 'MANUAL',
                condicao4Label: '', condicao4Val: '',
                imageUrl: '',
                zoom: 1,
                posX: 0,
                posY: 0
              };
            }
            if (s.type === 'capa') {
              return {
                ...s,
                modelo: data.data.modelo || '',
                descricao: data.data.descricao || '',
                valorFipe: '',
                valorIntegral: formatPriceMask(data.data.valor || ''),
                imageUrl: s.imageUrl && (s.imageUrl.includes('capaAZUL') || s.imageUrl.includes('hnxtcxhrqr4ejekmfkea') || s.imageUrl.includes('ze7bf5yd9ozh3tsccopb')) ? '' : (s.imageUrl || ''),
                zoom: 1,
                posX: 0,
                posY: 0
              };
            }
            return s;
          });
          
          const veiculoIdx = resetSlides.findIndex(s => s.type === 'veiculo');
          if (veiculoIdx !== -1) {
            setTimeout(() => setActiveSlideIndex(0), 0);
          } else {
            setTimeout(() => setActiveSlideIndex(0), 0);
          }
          
          return resetSlides;
        });
        setToast({ message: 'Dados importados e slides reiniciados com sucesso!', type: 'success' });
        setScrapeQuery('');
      } else {
        setToast({ message: data.error || 'Erro ao importar.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erro de comunicação.', type: 'error' });
    } finally {
      setScraping(false);
    }
  };

  const handleClearData = () => {
    setScrapeQuery('');
    
    setSlides(prevSlides => {
      const firstVeiculoIndex = prevSlides.findIndex(s => s.type === 'veiculo');
      const filteredSlides = prevSlides.filter((s, idx) => s.type !== 'veiculo' || idx === firstVeiculoIndex);
      
      const newSlides = filteredSlides.map(s => {
        if (s.type === 'veiculo') {
          return {
            ...s,
            fabricante: '',
            modelo: '',
            descricao: '',
            valorFipe: '',
            valorIntegral: '',
            title: 'NOVO VEÍCULO',
            condicao1Label: '', condicao1Val: '',
            condicao2Label: '', condicao2Val: '',
            condicao3Label: '', condicao3Val: '',
            condicao4Label: '', condicao4Val: '',
            imageUrl: '',
            imageFileName: '',
            zoom: 1,
            posX: 0,
            posY: 0
          };
        }
        if (s.type === 'capa') {
          return {
            ...s,
            modelo: '',
            descricao: '',
            valorFipe: '',
            valorIntegral: '',
            fabricante: '',
            imageUrl: selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? '' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png',
            imageFileName: '',
            zoom: 1,
            posX: 0,
            posY: 0
          };
        }
        return {
          ...s,
          valorFipe: '',
          valorIntegral: ''
        };
      });
      
      setTimeout(() => setActiveSlideIndex(0), 0);
      return newSlides;
    });
    
    setToast({ message: 'Todas as informações foram resetadas com sucesso.', type: 'success' });
  };

  // Image Input Ref for file upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Load configuration and authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('aforja_admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    
    const loadData = async () => {
      const defaultClients: AppClient[] = [
        {
          id: 'azul-veiculos',
          name: 'Azul Veículos',
          description: 'Concessionária e revenda de veículos multimarcas com forte presença regional.',
          logoUrl: 'https://res.cloudinary.com/ifuatk2z/image/upload/v1785183130/logo_Azul_spqf9c.svg',
          active: true,
          corCliente: '#0055FF'
        },
        {
          id: 'unimais',
          name: 'Unimais Veículos',
          description: 'Rede de concessionárias multimarcas.',
          logoUrl: 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png',
          active: true,
          corCliente: '#FF7A00'
        },
        {
          id: 'meta-veiculos',
          name: 'Meta Veículos',
          description: 'Revenda de veículos e tecnologia de vendas.',
          logoUrl: 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png',
          active: true,
          corCliente: '#C46A1A'
        }
      ];

      const { data: clientsData } = await supabase.from('clients').select('*');
      if (clientsData && clientsData.length > 0) {
        const loaded = clientsData.map(c => {
          let extra: any = {};
          try { if (c.description && c.description.startsWith('{')) extra = JSON.parse(c.description); } catch(e){}
          return {
            id: c.id,
            name: c.name,
            description: extra.text !== undefined ? extra.text : (c.description || ''),
            logoUrl: c.logourl || '',
            active: c.active,
            detalhes: extra.detalhes || '',
            anexos: extra.anexos || '',
            corCliente: extra.corCliente || ''
          };
        });
        const hasAzul = loaded.some(c => c.name?.toLowerCase().includes('azul'));
        if (!hasAzul) {
          loaded.unshift(defaultClients[0] as any);
        }
        setClients(loaded);
      } else {
        setClients(defaultClients);
      }

      const { data: slidesData } = await supabase.from('slides').select('*').order('order_index', { ascending: true });
      let loadedSlides: CarouselSlide[] = [];
      if (slidesData && slidesData.length > 0) {
        loadedSlides = slidesData.map(s => ({
          id: s.id,
          type: s.type as 'capa' | 'veiculo' | 'final',
          title: s.title,
          fabricante: s.fabricante || '',
          modelo: s.modelo || '',
          descricao: s.descricao || '',
          valorFipe: s.valorfipe || s.valor_fipe || '',
          valorIntegral: s.valorintegral || s.valor_integral || '',
          lojasCapa: s.lojascapa || '',
          imageUrl: s.imageurl || '',
          zoom: s.zoom || 1,
          posX: s.posx || 0,
          posY: s.posy || 0,
          condicao1Label: s.condicao1label || '',
          condicao1Val: s.condicao1val || '',
          condicao2Label: s.condicao2label || '',
          condicao2Val: s.condicao2val || '',
          condicao3Label: s.condicao3label || '',
          condicao3Val: s.condicao3val || '',
          condicao4Label: s.condicao4label || '',
          condicao4Val: s.condicao4val || '',
          website: s.website || '',
          imageFileName: s.imagefilename || ''
        }));
      }

      // Guarantee there is exactly one Capa slide at the start
      const hasCapa = loadedSlides.some(s => s.type === 'capa');
      if (!hasCapa) {
        loadedSlides.unshift({
          id: crypto.randomUUID(),
          type: 'capa',
          title: 'CAPA DO CARROSSEL',
          imageUrl: '',
          zoom: 1,
          posX: 0,
          posY: 0,
          website: selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'AZULVEICULOS.COM.BR' : 'unimaisveiculos.com.br'
        });
      } else {
        loadedSlides = loadedSlides.map(s => {
          if (s.type === 'capa' && s.imageUrl && (s.imageUrl.includes('capaAZUL') || s.imageUrl.includes('hnxtcxhrqr4ejekmfkea') || s.imageUrl.includes('ze7bf5yd9ozh3tsccopb'))) {
            return { ...s, imageUrl: '' };
          }
          return s;
        });
      }

      // Guarantee there is exactly one Final slide at the end
      const hasFinal = loadedSlides.some(s => s.type === 'final');
      if (!hasFinal) {
        loadedSlides.push({
          id: crypto.randomUUID(),
          type: 'final',
          title: 'FINAL DO CARROSSEL',
          imageUrl: selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787248141/finalAzul2.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png',
          zoom: 1,
          posX: 0,
          posY: 0,
          website: selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'AZULVEICULOS.COM.BR' : 'unimaisveiculos.com.br'
        });
      }

      // Sort to ensure Capa is first, Final is last, and vehicles are in between
      loadedSlides.sort((a, b) => {
        if (a.type === 'capa') return -1;
        if (b.type === 'capa') return 1;
        if (a.type === 'final') return 1;
        if (b.type === 'final') return -1;
        return 0; // Maintain order of vehicles
      });

      setSlides(loadedSlides);
      if (loadedSlides.length > 1) {
        setActiveSlideIndex(0);
      }
    };
    loadData();
  }, []);

  // Save slides state to Supabase database
  const handleSaveSlides = async () => {
    try {
      showToast('Salvando alterações do carrossel no banco de dados...');
      
      // 1. Clear existing slides in database first to prevent duplicates or orphaned records
      const { error: deleteError } = await supabase
        .from('slides')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows safely
      
      if (deleteError) throw deleteError;

      // 2. Map current slides list to Supabase schema payload
      const dbPayload = slides.map((s, idx) => ({
        id: s.id,
        type: s.type,
        title: s.title,
        fabricante: s.fabricante || null,
        modelo: s.modelo || null,
        descricao: s.descricao || null,
        valorfipe: s.valorFipe || null,
        valorintegral: s.valorIntegral || null,
        lojascapa: s.lojasCapa || null,
        imageurl: s.imageUrl || null,
        zoom: s.zoom || 1,
        posx: s.posX || 0,
        posy: s.posY || 0,
        condicao1label: s.condicao1Label || null,
        condicao1val: s.condicao1Val || null,
        condicao2label: s.condicao2Label || null,
        condicao2val: s.condicao2Val || null,
        condicao3label: s.condicao3Label || null,
        condicao3val: s.condicao3Val || null,
        condicao4label: s.condicao4Label || null,
        condicao4val: s.condicao4Val || null,
        website: s.website || null,
        imagefilename: s.imageFileName || null,
        order_index: idx
      }));

      // 3. Insert newly ordered and updated slides
      const { error: insertError } = await supabase.from('slides').insert(dbPayload);
      if (insertError) throw insertError;

      showToast('Carrossel salvo no banco de dados com sucesso!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Erro ao salvar o carrossel no banco de dados.', 'error');
    }
  };

  // Download slide as PNG
  const handleDownloadPNG = async () => {
    if (!previewRef.current || slides.length === 0) return;
    
    if (selectedClientData?.name?.toLowerCase().includes('azul')) {
      const hasFipe = slides.some(s => (s.type === 'veiculo' || s.type === 'capa') && s.valorFipe && s.valorFipe.trim().length > 0);
      if (!hasFipe) {
        showToast('Preenchimento obrigatório: informe o valor da Tabela FIPE antes de baixar!', 'error');
        return;
      }
    }
    
    showToast('Processando download do carrossel (PNG)... Isso pode levar alguns segundos.');
    try {
      const zip = new JSZip();
      const originalIndex = activeSlideIndex;
      
      for (let i = 0; i < slides.length; i++) {
        setActiveSlideIndex(i);
        // Wait for React to render the new slide
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (previewRef.current) {
            const images = Array.from(previewRef.current.querySelectorAll('img'));
            await Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                    setTimeout(resolve, 2000);
                });
            }));
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await toCanvas(previewRef.current, {
              pixelRatio: 3,
              backgroundColor: '#012d6a',
              cacheBust: false
            });
                        const imgData = canvas.toDataURL('image/png').split(',')[1];

            let placa = 'placa';
            let vehicleSlideRef = slides.find(s => s.type === 'veiculo');
            if (vehicleSlideRef && vehicleSlideRef.title) {
                placa = vehicleSlideRef.title.split('_')[0].toUpperCase();
            }
            const paddedIndex = String(i + 1).padStart(2, '0');
            const clientNameSafe = selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais';
            const filename = `${placa}_carrossel_${clientNameSafe}_${paddedIndex}.png`;
            zip.file(filename, imgData, {base64: true});
        }
      }

      setActiveSlideIndex(originalIndex);

      let vehicleSlide = slides.find(s => s.type === 'veiculo');
      let placa = 'placa';
      if (vehicleSlide && vehicleSlide.title) {
          placa = vehicleSlide.title.split('_')[0].toUpperCase();
      }
      const content = await zip.generateAsync({type: "blob"});
      saveAs(content, `${placa}_carrossel_${selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais'}.zip`);
      showToast('Carrossel exportado com sucesso (ZIP)!', 'success');
      
    } catch (err) {
      console.error(err);
      showToast('Erro ao exportar Carrossel (PNG).', 'error');
    }
  };

  // Download slide as PDF
  const handleDownloadPDF = async () => {
    if (!previewRef.current || slides.length === 0) return;
    
    if (selectedClientData?.name?.toLowerCase().includes('azul')) {
      const hasFipe = slides.some(s => (s.type === 'veiculo' || s.type === 'capa') && s.valorFipe && s.valorFipe.trim().length > 0);
      if (!hasFipe) {
        showToast('Preenchimento obrigatório: informe o valor da Tabela FIPE antes de baixar!', 'error');
        return;
      }
    }
    
    showToast('Gerando Carrossel em PDF... Isso pode levar alguns segundos.');
    try {
      const originalIndex = activeSlideIndex;
      let pdf: any = null;
      let width = 0;
      let height = 0;
      
      for (let i = 0; i < slides.length; i++) {
        setActiveSlideIndex(i);
        // Wait for React to render the new slide
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (previewRef.current) {
            const images = Array.from(previewRef.current.querySelectorAll('img'));
            await Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                    setTimeout(resolve, 2000);
                });
            }));
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await toCanvas(previewRef.current, {
              pixelRatio: 3,
              backgroundColor: '#012d6a',
              cacheBust: false
            });
            const imgData = canvas.toDataURL('image/png');
            width = canvas.width;
            height = canvas.height;
            
            if (!pdf) {
                pdf = new jsPDF({
                  orientation: 'portrait',
                  unit: 'px',
                  format: [width / 3, height / 3]
                });
            } else {
                pdf.addPage([width / 3, height / 3], 'portrait');
            }
            
            pdf.addImage(imgData, 'PNG', 0, 0, width / 3, height / 3);
        }
      }
      
      setActiveSlideIndex(originalIndex);
      
      if (pdf) {
        let vehicleSlide = slides.find(s => s.type === 'veiculo');
        let fileFriendlyTitle = 'completo';
        if (vehicleSlide) {
          fileFriendlyTitle = vehicleSlide.title.toUpperCase()
            .replace(new RegExp(`_carrossel_${selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais'}`, 'gi'), '')
            .replace(new RegExp(`${selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais'}_carrossel_`, 'gi'), '')
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
        }
        pdf.save(`${selectedClientData?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "") || 'unimais'}_carrossel_${fileFriendlyTitle}.pdf`);
        showToast('PDF do carrossel baixado com sucesso!', 'success');
      }
      
    } catch (err) {
      console.error(err);
      showToast('Erro ao exportar PDF do carrossel.', 'error');
    }
  };

  return (
    <div className={`${theme === 'light' ? 'theme-light' : ''} min-h-screen bg-[#07070a] text-[#F5F2EC] flex flex-col font-outfit selection:bg-[#C46A1A]/40`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[999] max-w-sm flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-[#0f1d14] border-[#1e5230] text-[#a4efb9]' 
            : 'bg-[#200e0e] border-[#5a1b1b] text-[#efa4a4]'
        }`}>
          <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
          <p className="text-xs font-outfit uppercase tracking-wider">{toast.message}</p>
        </div>
      )}

      {/* 1. LOCK SCREEN / ACCESS GATE */}
      {!isAuthenticated ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C46A1A]/5 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Navigation Back */}
          <div className="absolute top-8 left-8 z-20">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xs tracking-widest text-[#F5F2EC]/60 hover:text-white transition-colors uppercase font-outfit"
            >
              <ArrowLeft className="w-4 h-4" />
              Retornar ao Site
            </Link>
          </div>

          <div className="w-full max-w-md bg-[#0c0c0f] border border-white/5 rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md">
            
            {/* Lock Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="mb-6 flex justify-center">
                <img src="https://static.wixstatic.com/media/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png/v1/fill/w_278,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png" alt="Fábrica Logo" className="h-8 object-contain" />
              </div>
              <h1 className="text-xl tracking-[0.2em] uppercase font-light" style={{ fontFamily: 'var(--font-outfit)' }}>
                ADMIN
              </h1>
              <p className="text-[10px] tracking-widest font-outfit text-white/40 uppercase mt-2">
                Acesse o núcleo estratégico de controle
              </p>
            </div>

            {/* Password input */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="password"
                    maxLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite o PIN de acesso"
                    className="w-full bg-[#111116] border border-white/10 rounded-xl py-4 px-5 text-center text-2xl tracking-[0.5em] font-outfit focus:outline-none focus:border-[#C46A1A] transition-colors placeholder:text-sm placeholder:tracking-wider placeholder:text-white/20 text-[#F5F2EC]"
                    autoFocus
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs font-outfit text-red-400 text-center uppercase tracking-wide">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Virtual Keypad */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleKeyPress(num)}
                    className="bg-[#121218] hover:bg-[#1b1b24] active:bg-[#C46A1A]/20 border border-white/5 text-lg font-outfit rounded-xl py-4 transition-all duration-150 flex items-center justify-center cursor-pointer hover:border-white/15"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-[#161212] hover:bg-[#2c1a1a] text-xs font-outfit tracking-widest uppercase rounded-xl py-4 border border-red-950/20 text-red-400 cursor-pointer transition-colors"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => handleKeyPress('0')}
                  className="bg-[#121218] hover:bg-[#1b1b24] text-lg font-outfit rounded-xl py-4 border border-white/5 cursor-pointer transition-all"
                >
                  0
                </button>
                <button
                  type="submit"
                  className="bg-[#1a1410] hover:bg-[#C46A1A] text-[#F5F2EC] hover:text-black text-xs font-outfit tracking-widest uppercase rounded-xl py-4 border border-[#C46A1A]/30 cursor-pointer transition-all duration-300 flex items-center justify-center"
                >
                  Entrar
                </button>
              </div>
            </form>

          </div>
        </div>
      ) : (
        
        // 2. MAIN ADMIN DASHBOARD (Authenticated)
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* A. Sidebar Navigation - STRICTLY CLIENTS ONLY */}
          <aside className="w-full md:w-64 bg-[#0a0a0f] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between shrink-0">
            
            <div className="p-6">
              
              {/* Brand Title */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center">
                  <img src="https://static.wixstatic.com/media/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png/v1/fill/w_278,h_66,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fa9c68_1951c3f678894f529d14d736d43e70fe~mv2.png" alt="Fábrica Logo" className="h-6 object-contain" />
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-[#C46A1A] font-outfit uppercase">
                    Admin Panel
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2 font-outfit text-xs uppercase tracking-wider">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSelectedClientId(null);
                    setShowCarrosseis(false);
                    setShowDesign(false);
                    setShowJornal(false);
                    setActiveEditor(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'dashboard' 
                      ? 'bg-[#18120e] text-[#FF7A00] border-l-2 border-[#C46A1A]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveTab('clientes');
                    setSelectedClientId(null);
                    setShowCarrosseis(false);
                    setShowDesign(false);
                    setShowJornal(false);
                    setActiveEditor(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'clientes' 
                      ? 'bg-[#18120e] text-[#FF7A00] border-l-2 border-[#C46A1A]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Clientes
                </button>
                <button
                  onClick={() => {
                    setActiveTab('config');
                    setSelectedClientId(null);
                    setShowCarrosseis(false);
                    setShowDesign(false);
                    setShowJornal(false);
                    setActiveEditor(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === 'config' 
                      ? 'bg-[#18120e] text-[#FF7A00] border-l-2 border-[#C46A1A]' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>
              </nav>

            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-white/5 space-y-4">
              
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-2 bg-[#111116] hover:bg-[#161620] text-white/60 hover:text-white text-[10px] uppercase font-outfit tracking-widest py-2.5 rounded-lg cursor-pointer transition-all border border-white/5 mb-3"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
              </button>
<button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-[#200e0e] hover:bg-red-950 text-red-400 text-[10px] uppercase font-outfit tracking-widest py-2.5 rounded-lg cursor-pointer transition-all border border-red-950/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair Painel
              </button>
            </div>

          </aside>

          {/* B. Main Area */}
          <main className="flex-1 bg-[#07070a] p-6 md:p-8 overflow-y-auto max-h-screen">
            
            {/* Header Area */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] font-outfit uppercase tracking-widest text-[#C46A1A]">
                  Central de Ativos / Gestão de Carrosséis
                </span>
                <h1 className="text-2xl md:text-3xl font-light tracking-wide uppercase mt-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {activeTab === 'config' ? 'Configurações' : showCarrosseis ? (activeEditor === 'destaque' ? `Carrossel Destaque ${selectedClientData?.name || ''}` : activeEditor === 'ofertas' ? `Carrossel de Ofertas ${selectedClientData?.name || ''}` : `Gestão de Carrosséis - ${selectedClientData?.name || ''}`) : 'Gerenciamento de Clientes'}
                </h1>
              </div>
              
              <div className="flex items-center gap-3 bg-[#0a0a0f] border border-white/5 px-4 py-2 rounded-xl">
                <div className="w-2.5 h-2.5 bg-[#C46A1A] rounded-full animate-pulse"></div>
                <span className="text-[10px] font-outfit uppercase tracking-widest text-white/60">
                  Operador Autorizado
                </span>
              </div>
            </header>

            {/* Dashboard */}
            {activeTab === 'dashboard' && !selectedClientId && (
              <AdminDashboard clients={clients} />
            )}

            {/* STEP 1: Clientes List */}
            {activeTab === 'clientes' && !selectedClientId && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-8 max-w-4xl">
                  <h3 className="text-xs font-outfit uppercase tracking-widest text-[#C46A1A] mb-4">
                    Selecione o Cliente para Configurar
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {clients.filter(c => c.active).map(client => (
                    <div 
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={`bg-[#111116] hover:bg-[#161620] border border-white/5 rounded-xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden client-card-${client.id}`}
                    >
                      <style>{`
                        .client-card-${client.id}:hover {
                          border-color: ${client.corCliente ? `${client.corCliente}60` : '#C46A1A60'} !important;
                        }
                        .client-card-${client.id}:hover .client-name-${client.id} {
                          color: ${client.corCliente || '#FF7A00'} !important;
                        }
                        .client-card-${client.id}:hover .client-blur-${client.id} {
                          background-color: ${client.corCliente ? `${client.corCliente}15` : '#C46A1A15'} !important;
                        }
                      `}</style>
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transition-colors pointer-events-none client-blur-${client.id}`}></div>
                      
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-outfit bg-white/10 text-white/70 px-2 py-0.5 rounded uppercase tracking-wider">
                          Ativo
                        </span>
                        {client.logoUrl ? (
                          <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2 shadow-sm">
                            <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-outfit shadow-sm"
                            style={{ 
                              backgroundColor: `${client.corCliente || '#FF7A00'}15`, 
                              color: client.corCliente || '#FF7A00',
                              border: `1px solid ${client.corCliente || '#FF7A00'}30`
                            }}
                          >
                            {client.name ? client.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                        )}
                      </div>
                      
                      <h4 className={`text-2xl font-light tracking-wide uppercase mt-4 mb-2 text-[#F5F2EC] transition-colors client-name-${client.id}`} style={{ fontFamily: 'var(--font-outfit)' }}>
                        {client.name || 'Sem Nome'}
                      </h4>
                      
                      <p className="text-xs text-white/50 font-light leading-relaxed mb-6">
                        {client.description || 'Sem descrição cadastrada.'}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        <span>Acessar Cliente</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Selected Client -> Show Option: "Carrossel", "Design" or "Jornal" */}
            {activeTab === 'clientes' && selectedClientId && !showCarrosseis && !showDesign && !showJornal && !showEditClient && (
              <div className="space-y-6 animate-fade-in">
                
                <button 
                  onClick={() => setSelectedClientId(null)}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para lista de clientes
                </button>

                <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-8 max-w-5xl">
                  
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                    {selectedClientData?.logoUrl ? (
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                        <img src={selectedClientData.logoUrl} alt="Logo Cliente" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold font-outfit"
                        style={{ 
                          backgroundColor: `${selectedClientData?.corCliente || '#FF7A00'}15`, 
                          color: selectedClientData?.corCliente || '#FF7A00',
                          border: `1px solid ${selectedClientData?.corCliente || '#FF7A00'}30`
                        }}
                      >
                        {selectedClientData?.name ? selectedClientData.name.charAt(0).toUpperCase() : 'C'}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-light tracking-wide uppercase text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                        {selectedClientData?.name || 'Cliente'}
                      </h3>
                      <p className="text-xs font-outfit text-white/40 uppercase tracking-widest mt-1">
                        Selecione a opção do cliente
                      </p>
                    </div>
                  </div>

                  {selectedClientData?.name?.toLowerCase().includes('azul') ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Option: Card Carrosseis */}
                      <div 
                        onClick={() => setShowCarrosseis(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#0055FF]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#3388FF] mb-4 group-hover:bg-[#0055FF]/10 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#3388FF] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Card Carrosseis
                        </h4>
                        
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Selecione entre o Carrossel Destaque e o Carrossel Ofertas para realizar as edições.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#3388FF] transition-colors">
                          <span>Acessar Carrosseis</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option: Design */}
                      <div 
                        onClick={() => setShowDesign(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#0055FF]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#3388FF] mb-4 group-hover:bg-[#0055FF]/10 transition-colors">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#3388FF] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Design & Brandbook
                        </h4>
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#3388FF] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option: Card Jornal */}
                      <div 
                        onClick={() => setShowJornal(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#0055FF]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#0055FF]/10 border border-[#0055FF]/20 flex items-center justify-center text-[#3388FF] mb-4 group-hover:bg-[#0055FF]/20 transition-colors">
                          <Newspaper className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#3388FF] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Card Jornal
                        </h4>
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie as edições do jornal impresso, tablóides digitais, encartes e ofertas de veículos.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#3388FF] transition-colors">
                          <span>Acessar Jornal</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ) : selectedClientData?.name?.toLowerCase().includes('unimais') ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Option 1: Cards Instagram */}
                      <div 
                        onClick={() => setShowCarrosseis(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Cards Instagram
                        </h4>
                        
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Selecione entre o Carrossel Carros e o Carrossel Ofertas para realizar as edições.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Cards Instagram</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option 2: Carros Destaque (Menu Principal) */}
                      <div 
                        onClick={() => {
                          setSlides([
                            {
                              id: crypto.randomUUID(),
                              type: 'destaque',
                              title: 'DESTAQUE UNIMAIS',
                              fabricante: 'CHEVROLET',
                              modelo: 'ONIX',
                              descricao: '1.0 FLEX LT MANUAL',
                              imageUrl: '',
                              zoom: 1,
                              posX: 0,
                              posY: 0,
                              condicao1Label: 'ANO', condicao1Val: '2024',
                              condicao2Label: 'KM', condicao2Val: '44.802',
                              condicao3Label: 'CÂMBIO', condicao3Val: 'MANUAL',
                              cambio: 'MANUAL',
                              valorIntegral: '72.900',
                              website: 'UNIMAISVEICULOS.COM.BR'
                            }
                          ]);
                          setActiveSlideIndex(0);
                          setShowCarrosseis(true);
                          setActiveEditor('destaque');
                        }}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#FFD000]/60 rounded-xl p-6 cursor-pointer transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className="absolute top-3 right-3 bg-[#FFD000] text-black text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                          NOVO
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-[#FFD000] mb-4 group-hover:bg-[#FFD000]/20 transition-colors">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FFD000] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Carros Destaque
                        </h4>
                        
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Lâmina com moldura Destaque Unimais, especificações e preço promocional.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FFD000] transition-colors">
                          <span>Acessar Carros Destaque</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option 3: Design & Brandbook */}
                      <div 
                        onClick={() => setShowDesign(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Design & Brandbook
                        </h4>
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ) : selectedClientData?.name?.toLowerCase().includes('meta') || selectedClientData?.name?.toLowerCase().includes('azul') ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Option: Cards Instagram */}
                      <div 
                        onClick={() => setShowCarrosseis(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Cards Instagram
                        </h4>
                        
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Selecione entre o Carrossel Carros e o Carrossel Ofertas para realizar as edições.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Cards Instagram</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Option: Design */}
                      <div 
                        onClick={() => setShowDesign(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Design & Brandbook
                        </h4>
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Option: Design */}
                      <div 
                        onClick={() => setShowDesign(true)}
                        className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                          <Palette className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                          Design & Brandbook
                        </h4>
                        <p className="text-xs text-white font-light leading-relaxed mt-2 mb-6">
                          Gerencie a identidade visual, paleta de cores e moodboard do cliente.
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 font-outfit text-[10px] uppercase tracking-widest text-white group-hover:text-[#FF7A00] transition-colors">
                          <span>Acessar Design</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3.3: Jornal */}
            {activeTab === 'clientes' && selectedClientId && showJornal && (
              <div className="space-y-6">
                <button 
                  onClick={() => setShowJornal(false)}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para opções de {selectedClientData?.name || 'Cliente'}
                </button>
                <JornalManager client={selectedClientData!} />
              </div>
            )}

            {/* STEP 3.2: Design */}
            {activeTab === 'clientes' && selectedClientId && showDesign && (
              <div className="space-y-6">
                <button 
                  onClick={() => setShowDesign(false)}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para opções de {selectedClientData?.name || 'Cliente'}
                </button>
                <DesignBrandbook client={selectedClientData!} />
              </div>
            )}

            {/* STEP 3.1: Cards Instagram Menu Options */}
            {activeTab === 'clientes' && selectedClientId && showCarrosseis && !activeEditor && (
              <div className="space-y-6 animate-fade-in">
                <button 
                  onClick={() => setShowCarrosseis(false)}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para opções de {selectedClientData?.name || 'Cliente'}
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1: Carrossel Carros */}
                  <div 
                    onClick={() => setActiveEditor('destaque')}
                    className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Carrossel Carros
                    </h4>
                    <p className="text-xs text-white/50 font-light leading-relaxed mt-2 mb-6">
                      Carrossel principal com capa, lâminas de veículos e slide final.
                    </p>
                  </div>

                  {/* Card 2: Carrossel de Ofertas */}
                  <div 
                    onClick={() => setActiveEditor('ofertas')}
                    className="bg-[#111116] hover:bg-[#161620] border border-white/5 hover:border-[#C46A1A]/40 rounded-xl p-6 cursor-pointer transition-all duration-300 group opacity-50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#FF7A00] mb-4 group-hover:bg-[#C46A1A]/10 transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-light tracking-wide uppercase text-white group-hover:text-[#FF7A00] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Carrossel de Ofertas
                    </h4>
                    <p className="text-xs text-white/50 font-light leading-relaxed mt-2 mb-6">
                      (Em breve) Carrossel secundário focado em lista de ofertas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3.2: Unified Editor Split Layout */}
            {activeTab === 'clientes' && selectedClientId && showCarrosseis && activeEditor === 'destaque' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Back to Unimais menu */}
                <button 
                  onClick={() => setActiveEditor(null)}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para opções de {selectedClientData?.name}
                </button>

                {/* Grid Split: Left = Controls, Right = Live Preview & Slides list */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* LEFT COLUMN: Data Config (45%) */}
                  <div className="lg:col-span-5 bg-[#0c0c10] border border-white/5 rounded-2xl p-6 space-y-6">
                    
                    <div className="border-b border-white/5 pb-4">
                      <span className="text-[9px] font-outfit text-[#C46A1A] uppercase tracking-widest">
                        Painel de Controle
                      </span>
                      <h3 className="text-lg font-light uppercase text-white mt-0.5" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Dados do Slide Ativo
                      </h3>
                    </div>

                    {activeSlide ? (
                      <div className="space-y-5 text-xs font-outfit">
                        


                        <>
                          <style dangerouslySetInnerHTML={{__html: `
                            @keyframes slideRight {
                              0% { transform: translateX(-100%); }
                              100% { transform: translateX(200%); }
                            }
                          `}} />
                          <div className="flex flex-col mb-2 bg-[#C46A1A]/10 p-3 rounded-xl border border-[#C46A1A]/30 relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row items-end gap-3 relative z-10">
                            <div className="flex-1 w-full space-y-1.5">
                              <label className="text-[#C46A1A] text-[9px] font-outfit tracking-wider block">Importar Dados (Placa ou Modelo)</label>
                              <input
                                type="text"
                                value={scrapeQuery}
                                onChange={e => setScrapeQuery(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleScrape()}
                                placeholder="Ex: ESR7C02"
                                className="w-full bg-[#111116] border border-white/10 rounded-lg py-2 px-3 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                              />
                            </div>
                            <button
                                onClick={handleScrape}
                                disabled={scraping || !scrapeQuery}
                                className="bg-[#C46A1A] text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-white disabled:opacity-50 transition-colors w-full sm:w-auto h-8 flex items-center justify-center shrink-0 gap-2"
                              >
                                {scraping ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Buscando...</span>
                                  </>
                                ) : 'Importar'}
                              </button>
                              <button
                                onClick={handleClearData}
                                className="bg-transparent border border-[#C46A1A]/30 text-[#C46A1A] text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg hover:bg-[#C46A1A]/10 transition-colors w-full sm:w-auto h-8 flex items-center justify-center shrink-0 gap-2"
                                title="Zerar dados de veículos"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {scraping && (
                              <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden">
                                <div className="h-full w-1/2 bg-[#C46A1A]" style={{ animation: 'slideRight 1.5s infinite linear' }} />
                              </div>
                            )}
                          </div>
                          </>
                        {/* Slide Type Switcher */}
                        <div className="space-y-1.5">
                          <label className="text-white/60 uppercase text-[9px] tracking-wider block">Tipo de Slide</label>
                          <div className="grid grid-cols-3 gap-2 bg-[#121218] p-1 rounded-xl border border-white/5">
                            <button
                              type="button"
                              onClick={() => updateActiveSlideField('type', 'capa')}
                              className={`py-2 text-[10px] uppercase tracking-wider rounded-lg transition-colors ${
                                activeSlide.type === 'capa'
                                  ? 'bg-[#C46A1A] text-black font-bold'
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              Capa
                            </button>
                            <button
                              type="button"
                              onClick={() => updateActiveSlideField('type', 'veiculo')}
                              className={`py-2 text-[10px] uppercase tracking-wider rounded-lg transition-colors ${
                                activeSlide.type === 'veiculo'
                                  ? 'bg-[#C46A1A] text-black font-bold'
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              Veículo (Placa)
                            </button>
                            <button
                              type="button"
                              onClick={() => updateActiveSlideField('type', 'final')}
                              className={`py-2 text-[10px] uppercase tracking-wider rounded-lg transition-colors ${
                                activeSlide.type === 'final'
                                  ? 'bg-[#C46A1A] text-black font-bold'
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              Final
                            </button>
                          </div>
                        </div>

                                                {/* CONDITIONAL CONTROLS BASED ON TYPE */}
                        {activeSlide.type === 'capa' ? (
                          // COVER SLIDE EDITABLES
                          <div className="space-y-4 pt-2 border-t border-white/5">
                            <span className="text-[10px] text-[#C46A1A] uppercase tracking-wider block mt-4">Campos da Capa (Preenchidos pela placa)</span>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Modelo (ex: Fastback)</label>
                                <input
                                  type="text"
                                  value={activeSlide.modelo || ''}
                                  onChange={e => updateActiveSlideField('modelo', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Detalhes (ex: 1.3 TURBO)</label>
                                <input
                                  type="text"
                                  value={activeSlide.descricao || ''}
                                  onChange={e => updateActiveSlideField('descricao', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                            </div>

                            {/* PRECIFICAÇÃO NA CAPA (AZUL VEÍCULOS APENAS) */}
                            {selectedClientData?.name?.toLowerCase().includes('azul') && (
                              <div className="pt-3 border-t border-white/5 space-y-3">
                                <span className="text-[10px] text-[#FFD000] font-bold uppercase tracking-wider block">Precificação do Veículo</span>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="text-white/60 text-[9px] tracking-wider block uppercase font-bold">Valor Tabela FIPE (Riscado)</label>
                                    <input
                                      type="text"
                                      value={activeSlide.valorFipe || ''}
                                      onChange={e => updateActiveSlideField('valorFipe', formatPriceMask(e.target.value))}
                                      placeholder="Ex: 119.990"
                                      className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#FFD000] text-white text-xs font-medium"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-white/60 text-[9px] tracking-wider block uppercase font-bold">Valor Oferta (Amarelo)</label>
                                    <input
                                      type="text"
                                      value={activeSlide.valorIntegral || ''}
                                      onChange={e => updateActiveSlideField('valorIntegral', formatPriceMask(e.target.value))}
                                      placeholder="Ex: 99.590"
                                      className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#FFD000] text-white text-xs font-medium"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (activeSlide.type === 'veiculo' || activeSlide.type === 'destaque') ? (
                          // VEHICLE OR DESTAQUE SLIDE EDITABLES
                          <div className="space-y-4 pt-2 border-t border-white/5">
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-[10px] text-[#C46A1A] uppercase tracking-wider block font-bold">
                                {activeSlide.type === 'destaque' ? 'Campos do Carro Destaque' : 'Campos do Veículo'}
                              </span>
                              {activeSlide.type === 'destaque' && (
                                <span className="text-[9px] bg-[#FFD000]/10 text-[#FFD000] border border-[#FFD000]/30 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                                  ★ Destaque Unimais
                                </span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Fabricante (ex: CHEVROLET)</label>
                                <input
                                  type="text"
                                  value={activeSlide.fabricante || ''}
                                  onChange={e => updateActiveSlideField('fabricante', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white uppercase font-medium"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Modelo (ex: ONIX)</label>
                                <input
                                  type="text"
                                  value={activeSlide.modelo || ''}
                                  onChange={e => updateActiveSlideField('modelo', e.target.value)}
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white uppercase font-bold"
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-white/50 text-[9px] tracking-wider block">Descrição Detalhada / Versão</label>
                              <input
                                type="text"
                                value={activeSlide.descricao || ''}
                                onChange={e => updateActiveSlideField('descricao', e.target.value)}
                                placeholder="1.0 FLEX LT MANUAL"
                                className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-xs uppercase"
                              />
                            </div>

                            {/* PREÇO (DESTAQUE) */}
                            {activeSlide.type === 'destaque' && (
                              <div className="space-y-1.5 pt-1">
                                <label className="text-[#FFD000] text-[9px] tracking-wider block uppercase font-bold">Preço de Venda / Destaque (R$)</label>
                                <input
                                  type="text"
                                  value={activeSlide.valorIntegral || ''}
                                  onChange={e => updateActiveSlideField('valorIntegral', formatPriceMask(e.target.value))}
                                  placeholder="Ex: 72.900"
                                  className="w-full bg-[#111116] border border-[#FFD000]/40 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#FFD000] text-[#FFD000] text-sm font-bold"
                                />
                              </div>
                            )}

                            {/* ANO, KM E CÂMBIO */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Ano</label>
                                <input
                                  type="text"
                                  value={activeSlide.condicao1Val || ''}
                                  onChange={e => updateActiveSlideField('condicao1Val', e.target.value)}
                                  placeholder="Ex: 2024"
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">KM</label>
                                <input
                                  type="text"
                                  value={activeSlide.condicao2Val || ''}
                                  onChange={e => updateActiveSlideField('condicao2Val', formatPriceMask(e.target.value))}
                                  placeholder="Ex: 44.802"
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#C46A1A] text-white text-xs"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-white/50 text-[9px] tracking-wider block">Câmbio</label>
                                <input
                                  type="text"
                                  value={activeSlide.cambio || activeSlide.condicao3Val || ''}
                                  onChange={e => {
                                    updateActiveSlideField('cambio', e.target.value.toUpperCase());
                                    updateActiveSlideField('condicao3Val', e.target.value.toUpperCase());
                                  }}
                                  placeholder="MANUAL"
                                  className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#C46A1A] text-white text-xs uppercase font-medium"
                                />
                              </div>
                            </div>

                            {/* PREÇO E FIPE - Apenas para clientes que utilizam FIPE (Meta e Azul) */}
                            {activeSlide.type !== 'destaque' && !selectedClientData?.name?.toLowerCase().includes('unimais') && (
                              <div className="pt-3 border-t border-white/5 space-y-3">
                                <span className="text-[10px] text-[#FFD000] font-bold uppercase tracking-wider block">Precificação Tabela FIPE</span>
                                
                                <div className="space-y-1.5">
                                  <label className="text-white/60 text-[9px] tracking-wider block uppercase font-bold">Valor Tabela FIPE</label>
                                  <input
                                    type="text"
                                    value={activeSlide.valorFipe || ''}
                                    onChange={e => updateActiveSlideField('valorFipe', formatPriceMask(e.target.value))}
                                    placeholder="Ex: 119.990"
                                    className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-3 focus:outline-none focus:border-[#FFD000] text-white text-xs font-medium"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          // FINAL SLIDE EDITABLES (Static)
                          <div className="space-y-4 pt-2 border-t border-white/5 text-center text-white/50 text-xs font-outfit">
                            O Card Final utiliza apenas configuração de imagem.
                          </div>
                        )}

                        {/* IMAGE SETTINGS (SHARED) */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <span className="text-[10px] text-[#C46A1A] uppercase tracking-wider block">Upload & Posicionamento da Imagem</span>
                          
                          {/* File input and manual URL option */}
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              {/* Trigger file input */}
                              <div className="flex-1 flex flex-col gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full bg-[#1a1410] hover:bg-[#C46A1A]/20 text-[#FF7A00] border border-[#C46A1A]/30 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                                >
                                  <Upload className="w-4 h-4" />
                                  Upload de Imagem
                                </button>
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                              />
                            </div>

                            {activeSlide.imageFileName && (
                              <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <span className="text-green-400 font-outfit text-[8px] uppercase tracking-wider">SEO Otimizado:</span>
                                <span className="text-white text-[9px] truncate">{activeSlide.imageFileName}</span>
                              </div>
                            )}

                            {/* Manual URL link */}
                            <div className="space-y-1">
                              <label className="text-white/40 text-[8px] uppercase">Ou cole uma URL direta</label>
                              <input
                                type="text"
                                value={activeSlide.imageUrl}
                                onChange={e => updateActiveSlideField('imageUrl', e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-[#111116] border border-white/10 rounded-lg p-2 text-[10px] text-white/80"
                              />
                            </div>
                          </div>

                          {/* Zoom & Position controls */}
                          <div className="space-y-4 bg-[#111116] p-4 rounded-xl border border-white/5">
                            
                            {/* ZOOM slider */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white/60">Zoom da Imagem</span>
                                <span className="text-cyan-400 font-bold">{(activeSlide.zoom * 100).toFixed(0)}%</span>
                              </div>
                              <input
                                type="range"
                                min="0.5"
                                max="3.5"
                                step="0.05"
                                value={activeSlide.zoom}
                                onChange={e => updateActiveSlideField('zoom', parseFloat(e.target.value))}
                                className="w-full accent-[#C46A1A]"
                              />
                            </div>

                            {/* POSITION X slider */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white/60">Posição X (Horizontal)</span>
                                <span className="text-cyan-400 font-bold">{activeSlide.posX}px</span>
                              </div>
                              <input
                                type="range"
                                min="-300"
                                max="300"
                                step="1"
                                value={activeSlide.posX}
                                onChange={e => updateActiveSlideField('posX', parseInt(e.target.value))}
                                className="w-full accent-[#C46A1A]"
                              />
                            </div>

                            {/* POSITION Y slider */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-white/60">Posição Y (Vertical)</span>
                                <span className="text-cyan-400 font-bold">{activeSlide.posY}px</span>
                              </div>
                              <input
                                type="range"
                                min="-300"
                                max="300"
                                step="1"
                                value={activeSlide.posY}
                                onChange={e => updateActiveSlideField('posY', parseInt(e.target.value))}
                                className="w-full accent-[#C46A1A]"
                              />
                            </div>

                            {/* Reset Adjustments button */}
                            <button
                              type="button"
                              onClick={() => {
                                updateActiveSlideField('zoom', 1.0);
                                updateActiveSlideField('posX', 0);
                                updateActiveSlideField('posY', 0);
                                showToast('Ajustes redefinidos!');
                              }}
                              className="text-[9px] uppercase tracking-wider text-white/40 hover:text-white transition-colors flex items-center gap-1 mx-auto mt-1"
                            >
                              <Sliders className="w-3 h-3" />
                              Resetar Ajustes
                            </button>

                          </div>
                        </div>

                        {/* WEBSITE FOOTER URL */}
                        <div className="space-y-1.5 pt-4 border-t border-white/5">
                          <label className="text-white/50 text-[9px] tracking-wider block">Website no Rodapé</label>
                          <input
                            type="text"
                            value={activeSlide.website}
                            onChange={e => updateActiveSlideField('website', e.target.value)}
                            className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white"
                          />
                        </div>

                      </div>
                    ) : (
                      <div className="py-12 text-center text-white/30 text-xs">
                        Nenhum slide selecionado.
                      </div>
                    )}

                  </div>

                  {/* RIGHT COLUMN: Live View & Downloads & Carousel Slide Strip (55%) */}
                  <div className="lg:col-span-7 flex flex-col items-center gap-6">
                    
                    {/* SLIDES STRIP / SELECT PANEL */}
                    <div className="w-full bg-[#0c0c10] border border-white/5 rounded-2xl p-6 space-y-4">
                      
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <span className="text-xs font-outfit text-white/40 uppercase tracking-widest">
                          Slides do Carrossel ({slides.length})
                        </span>
                        
                      </div>

                      {/* Grid list of slides */}
                      <div className="flex flex-wrap gap-2.5">
                        {slides.map((slide, idx) => {
                          const isFinal = slide.type === 'final';
                          
                          const cardNode = (
                            <div
                              key={slide.id}
                              onClick={() => setActiveSlideIndex(idx)}
                              className={`p-2.5 rounded-xl border cursor-pointer transition-all shrink-0 w-[125px] flex flex-col justify-between h-[110px] ${
                                activeSlideIndex === idx
                                  ? 'bg-[#18120e] border-[#C46A1A] text-[#FF7A00]'
                                  : 'bg-[#111116] border-white/5 text-white/60 hover:border-white/20'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-[9px] font-outfit uppercase bg-[#050505]/40 px-1.5 py-0.5 rounded text-white/70">
                                  #{idx + 1}
                                </span>
                                
                                {slide.type !== 'capa' && slide.type !== 'final' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteSlide(idx);
                                    }}
                                    className="p-1 hover:text-red-400 transition-colors"
                                    title="Excluir slide"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              <div className="mt-1 text-left">
                                <p className="text-[8px] font-outfit text-white/30 uppercase tracking-wider leading-none">
                                  {slide.type === 'capa' ? 'Capa' : slide.type === 'final' ? 'Final' : 'Veículo'}
                                </p>
                                <h5 className="text-[11px] font-semibold tracking-wide text-white line-clamp-1 mt-0.5">
                                  {slide.title}
                                </h5>
                                <p className="text-[9px] text-white/40 line-clamp-1 mt-0.5 font-light leading-none">
                                  {slide.type === 'veiculo' ? `${slide.fabricante} ${slide.modelo}` : slide.type === 'final' ? 'Layout Final' : slide.descricao}
                                </p>
                              </div>
                            </div>
                          );
                          if (isFinal) {
                            return (
                              <React.Fragment key={slide.id}>
                                <div
                                  onClick={() => handleAddSlide('veiculo')}
                                  className="bg-[#111116] border border-dashed border-[#C46A1A]/30 hover:border-[#C46A1A] rounded-xl p-2.5 cursor-pointer transition-all hover:bg-[#C46A1A]/5 flex flex-col items-center justify-center h-[110px] w-[125px] shrink-0 group"
                                >
                                  <div className="w-7 h-7 rounded-full bg-[#18120e] flex items-center justify-center text-[#FF7A00] group-hover:scale-110 transition-transform mb-1.5">
                                    <Plus className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="text-[9px] font-outfit uppercase tracking-widest text-[#FF7A00] font-bold">
                                    + Card
                                  </span>
                                </div>
                                {cardNode}
                              </React.Fragment>
                            );
                          }
                          return cardNode;
                        })}
                      </div>

                    </div>

                    {/* DOWNLOAD ACTIONS PANEL */}
                    {activeSlide && (
                      <div className="w-full bg-[#0c0c10] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="text-center sm:text-left">
                          <span className="text-[9px] font-outfit uppercase text-white/40 tracking-wider">Exportar Ativo Final</span>
                          <h4 className="text-xs font-outfit font-bold text-white uppercase mt-0.5 max-w-[200px] truncate">{activeSlide.title}</h4>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                          <button
                            onClick={handleDownloadPNG}
                            className="flex-1 sm:flex-none bg-[#C46A1A] hover:bg-[#FF7A00] text-black font-outfit font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C46A1A]/10"
                          >
                            <Download className="w-4 h-4" />
                            Baixar PNG
                          </button>
                          <button
                            onClick={handleDownloadPDF}
                            className="flex-1 sm:flex-none bg-[#111116] hover:bg-white/5 text-white border border-white/10 font-outfit font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <FileText className="w-4 h-4" />
                            Baixar PDF
                          </button>



                        </div>
                      </div>
                    )}

                    {/* LIVE VIEW STAGE */}
                    {activeSlide && (
                      <div className="w-full flex justify-center items-center py-4 sm:py-8 bg-[#09090d] rounded-2xl border border-white/5 relative group overflow-hidden">
                        
                        {/* Wrapper for responsive scaling */}
                        <div className="origin-top scale-[0.75] sm:scale-100 transition-transform flex items-center justify-center h-[337px] sm:h-[450px]">
                          {/* Aspect Ratio bounding container to fit precisely 1080x1350 */}
                          <div 
                            id="slide-preview-container"
                            ref={previewRef}
                            className="w-[360px] h-[450px] relative overflow-hidden bg-[#050505] flex flex-col justify-between shadow-2xl select-none"
                            style={{ minWidth: '360px', minHeight: '450px' }}
                          >
                          
                          {/* CONDITIONAL RENDERING OF THE TEMPLATE BODY */}
                          {activeSlide.type === 'capa' ? (
                            
                            // A. COVER LAYOUT (FIXED IMAGE)
                            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#050505]">
                              {/* Background Photo for Capa (Uploaded by User) */}
                              {activeSlide.imageUrl && (
                                <img
                                  src={activeSlide.imageUrl}
                                  alt="Capa Fundo"
                                  className="absolute max-w-none origin-center z-0"
                                  style={{
                                    transform: `translate(${activeSlide.posX}px, ${activeSlide.posY}px) scale(${activeSlide.zoom})`,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    cursor: 'move',
                                    pointerEvents: 'auto'
                                  }}
                                  onMouseDown={handleMouseDown}
                                  onMouseMove={handleMouseMove}
                                  onMouseUp={handleMouseUp}
                                  onMouseLeave={handleMouseUp}
                                  crossOrigin="anonymous"
                                />
                              )}

                              {/* FIXED COVER OVERLAY */}
                              <img 
                                src={selectedClientData?.name?.toLowerCase().includes('azul') 
                                  ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787339431/NOVA_CAPA_AZUL3.png'
                                  : selectedClientData?.name?.toLowerCase().includes('meta') 
                                  ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/hnxtcxhrqr4ejekmfkea.png'
                                  : (activeSlide.imageUrl ? '' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783524054/ze7bf5yd9ozh3tsccopb.png')
                                } 
                                alt="Capa Overlay" 
                                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" crossOrigin="anonymous" 
                              />
                              
                              {/* Capa Text Overlay */}
                              {selectedClientData?.name?.toLowerCase().includes('azul') ? (
                                <>
                                  {/* Bloco Modelo & Descrição - Centralizado na coluna direita com margens de respiro seguras */}
                                  {(activeSlide.modelo || activeSlide.descricao) && (
                                    <div 
                                      className="absolute top-[52%] flex flex-col items-center text-center z-20 pointer-events-none w-[145px]" 
                                      style={{ 
                                        right: '88px', 
                                        transform: 'translate(50%, -50%)',
                                        fontFamily: '"Poppins", sans-serif' 
                                      }}
                                    >
                                      {activeSlide.modelo && (
                                        <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                                          {/* Seta Azul Pequena ▶ */}
                                          <svg 
                                            className="w-[10px] h-[11px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex-shrink-0" 
                                            viewBox="0 0 10 12" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M1.5 1.7C1.5 1.05 2.22 0.65 2.76 1.01L8.9 5.31C9.4 5.66 9.4 6.34 8.9 6.69L2.76 10.99C2.22 11.35 1.5 10.95 1.5 10.3V1.7Z" fill="#0088FF" />
                                          </svg>
                                          <div className="text-white font-bold leading-none uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight" style={{ fontSize: '19px' }}>
                                            {activeSlide.modelo}
                                          </div>
                                        </div>
                                      )}
                                      {activeSlide.descricao && (
                                        <div className="text-white font-light italic leading-tight uppercase mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide w-full text-center px-1 break-words" style={{ fontSize: '7.5px' }}>
                                          {activeSlide.descricao}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Bloco de Preço: DE FIPE riscado em vermelho (acima) + POR R$ (com sombra suave em blur) + Valor Amarelo */}
                                  <div className="absolute top-[72.2%] right-[22px] -translate-y-1/2 flex flex-col items-end z-20 pointer-events-none">
                                    {/* DE R$ ... com risco vermelho (só renderiza se valorFipe foi preenchido) */}
                                    {(activeSlide.valorFipe || slides.find(s => s.type === 'veiculo')?.valorFipe) ? (
                                      <div className="relative inline-block text-white tracking-normal leading-none mb-1 mr-2" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 300, fontSize: '11px', textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
                                        <span>DE {activeSlide.valorFipe ? (activeSlide.valorFipe.startsWith('R$') ? activeSlide.valorFipe : `R$ ${activeSlide.valorFipe}`) : (slides.find(s => s.type === 'veiculo')?.valorFipe?.startsWith('R$') ? slides.find(s => s.type === 'veiculo')?.valorFipe : `R$ ${slides.find(s => s.type === 'veiculo')?.valorFipe}`)}</span>
                                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#ff2222] shadow-[0_0_2px_rgba(255,0,0,0.9)] pointer-events-none" />
                                      </div>
                                    ) : null}

                                    {/* POR R$ + Valor Amarelo */}
                                    <div className="flex items-center gap-1.5">
                                      <div 
                                        className="flex flex-col text-white leading-[0.88] tracking-tight font-black font-sans text-left" 
                                        style={{ 
                                          fontSize: '10px',
                                          textShadow: '0 0 4px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.7)'
                                        }}
                                      >
                                        <span>POR</span>
                                        <span>R$</span>
                                      </div>
                                      <div 
                                        className="text-[#FFD000] font-black leading-none tracking-tight"
                                        style={{ 
                                          fontFamily: '"Antonio", "Anton", sans-serif', 
                                          fontSize: '32px',
                                          textShadow: '0 0 6px rgba(0,0,0,0.9), 0 2px 5px rgba(0,0,0,0.8)'
                                        }}
                                      >
                                        {(activeSlide.valorIntegral || slides.find(s => s.type === 'veiculo')?.valorIntegral || '00.000').replace(/^R\$\s*/i, '')}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : selectedClientData?.name?.toLowerCase().includes('unimais') ? (
                                /* Na Capa da Unimais NÃO aparece texto por cima - apenas imagem gráfica da capa */
                                null
                              ) : (
                                (activeSlide.modelo || activeSlide.descricao) && (
                                  <div className="absolute top-[58%] right-[25px] -translate-y-1/2 flex flex-col items-end text-right z-20 pointer-events-none w-[90%]" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                    {activeSlide.modelo && (
                                      <div className="text-white font-bold leading-none uppercase drop-shadow-md" style={{ fontSize: '18px' }}>
                                        {activeSlide.modelo}
                                      </div>
                                    )}
                                    {activeSlide.descricao && (
                                      <div className="text-white font-light italic leading-tight uppercase mt-2 drop-shadow-md" style={{ fontSize: '8px' }}>
                                        {activeSlide.descricao}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>

                          ) : activeSlide.type === 'veiculo' ? (
                            
                            // B. VEHICLE AD TEMPLATE (PNG OVERLAY STYLE)
                            <div className="flex-1 flex flex-col justify-between relative overflow-hidden bg-[#050505]">
                              
                              {/* Background Car Photo */}
                              {activeSlide.imageUrl && (
                                <img
                                  src={activeSlide.imageUrl}
                                  alt="Carro Oferta"
                                  className="absolute max-w-none origin-center z-0"
                                  style={{
                                    transform: `translate(${activeSlide.posX}px, ${activeSlide.posY}px) scale(${activeSlide.zoom})`,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    cursor: 'move'
                                  }}
                                  onMouseDown={handleMouseDown}
                                  onMouseMove={handleMouseMove}
                                  onMouseUp={handleMouseUp}
                                  onMouseLeave={handleMouseUp}
                                  crossOrigin="anonymous"
                                  referrerPolicy="no-referrer"
                                />
                              )}

                              {/* FIXED PNG OVERLAY */}
                              <img 
                                src={selectedClientData?.name?.toLowerCase().includes('meta') ? "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/fiowzjsmie0jn35bn49h.png" : selectedClientData?.name?.toLowerCase().includes('azul') ? "https://res.cloudinary.com/ifuatk2z/image/upload/v1787258892/baseAZUL.png" : "https://res.cloudinary.com/djw0tqmiw/image/upload/v1784051477/ox5x9ezq4stcwbocpbdg.png"} 
                                alt="Base Frame" 
                                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" crossOrigin="anonymous" 
                              />
                                
                              {/* Header Texts / Footer Texts */}
                              {selectedClientData?.name?.toLowerCase().includes('azul') ? (
                                <>
                                  {/* Preço FIPE Riscado em cima da tarja preta (só renderiza se valorFipe foi preenchido) */}
                                  {(activeSlide.valorFipe || slides.find(s => s.type === 'veiculo')?.valorFipe) ? (
                                    <div className="absolute top-[77.2%] right-[54px] -translate-y-1/2 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                                      <div className="relative inline-block text-white tracking-normal leading-none" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 300, fontSize: '10.5px' }}>
                                        <span>DE {activeSlide.valorFipe ? (activeSlide.valorFipe.startsWith('R$') ? activeSlide.valorFipe : `R$ ${activeSlide.valorFipe}`) : (slides.find(s => s.type === 'veiculo')?.valorFipe?.startsWith('R$') ? slides.find(s => s.type === 'veiculo')?.valorFipe : `R$ ${slides.find(s => s.type === 'veiculo')?.valorFipe}`)}</span>
                                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#ff2222] shadow-[0_0_2px_rgba(255,0,0,0.9)]" />
                                      </div>
                                    </div>
                                  ) : null}

                                  {/* Lado Esquerdo da Tarja Preta: MONTADORA MODELO / DESCRIÇÃO / ANO & KM */}
                                  <div className="absolute bottom-[43px] left-[20px] max-w-[155px] z-20 pointer-events-none text-left" style={{ fontFamily: '"Poppins", sans-serif' }}>
                                    <div className="text-white uppercase font-bold tracking-tight leading-none truncate" style={{ fontSize: '13px' }}>
                                      <strong className="font-extrabold">{activeSlide.fabricante || 'JEEP'}</strong> {activeSlide.modelo || 'RENEGADE'}
                                    </div>
                                    <div className="text-white font-light italic uppercase tracking-tight leading-tight truncate mt-0.5" style={{ fontSize: '7.5px' }}>
                                      {activeSlide.descricao || 'TURBO FLEX AT'}
                                    </div>
                                    <div className="text-white italic uppercase tracking-wider text-[8px] mt-0.5 flex items-center gap-3">
                                      <span>ANO <span className="text-[#FFD000] font-semibold italic">{activeSlide.condicao1Val || '0000'}</span></span>
                                      <span>KM <span className="text-[#FFD000] font-semibold italic">{activeSlide.condicao2Val || '000.000'}</span></span>
                                    </div>
                                  </div>

                                  {/* Lado Direito da Tarja Preta: POR R$ (Preço Amarelo - Ajustado mais para esquerda right-[38px]) */}
                                  <div className="absolute bottom-[48px] right-[38px] z-20 pointer-events-none flex items-center gap-1.5">
                                    <div 
                                      className="flex flex-col text-white leading-[0.88] tracking-tight font-black font-sans text-left" 
                                      style={{ 
                                        fontSize: '10px',
                                        textShadow: '0 0 4px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.7)'
                                      }}
                                    >
                                      <span>POR</span>
                                      <span>R$</span>
                                    </div>
                                    <div 
                                      className="text-[#FFD000] font-black leading-none tracking-tight"
                                      style={{ 
                                        fontFamily: '"Antonio", "Anton", sans-serif', 
                                        fontSize: '32px',
                                        textShadow: '0 0 6px rgba(0,0,0,0.9), 0 2px 5px rgba(0,0,0,0.8)'
                                      }}
                                    >
                                      {(activeSlide.valorIntegral || slides.find(s => s.type === 'veiculo')?.valorIntegral || '00.000').replace(/^R\$\s*/i, '')}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                // META E UNIMAIS LAYOUT PADRÃO
                                <div className="absolute top-[25px] left-0 w-full px-[20px] z-20 pointer-events-none uppercase italic" style={{ fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? undefined : '"Saira Extra Condensed", sans-serif' }}>
                                  <div className={`leading-none tracking-widest italic ${selectedClientData?.name?.toLowerCase().includes('meta') ? 'text-white' : 'text-[#0377f9] font-light'}`} style={{ fontSize: selectedClientData?.name?.toLowerCase().includes('meta') ? '13px' : '24px', color: selectedClientData?.name?.toLowerCase().includes('meta') ? '#ffffff' : '#0377f9', marginBottom: '-4px', fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Montserrat", sans-serif' : undefined }}>
                                    {activeSlide.fabricante || 'FABRICANTE'}
                                  </div>
                                  <div className={`leading-none tracking-tighter italic ${selectedClientData?.name?.toLowerCase().includes('meta') ? '' : 'text-[#1b3265] font-black'}`} style={{ 
                                    fontSize: selectedClientData?.name?.toLowerCase().includes('meta') ? '32px' : '48px', 
                                    marginBottom: '2px', 
                                    marginTop: selectedClientData?.name?.toLowerCase().includes('meta') ? '4px' : '-8px',
                                    color: selectedClientData?.name?.toLowerCase().includes('meta') ? undefined : '#1b3265',
                                    background: selectedClientData?.name?.toLowerCase().includes('meta') ? 'linear-gradient(180deg, #FF6B00 20%, #FF8C00 50%, #FF6B00 80%)' : undefined,
                                    WebkitBackgroundClip: selectedClientData?.name?.toLowerCase().includes('meta') ? 'text' : undefined,
                                    WebkitTextFillColor: selectedClientData?.name?.toLowerCase().includes('meta') ? 'transparent' : undefined,
                                    filter: selectedClientData?.name?.toLowerCase().includes('meta') ? 'drop-shadow(3px 3px 2px rgba(0,0,0,0.6))' : undefined,
                                    fontWeight: selectedClientData?.name?.toLowerCase().includes('meta') ? 400 : undefined,
                                    fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Anton", sans-serif' : undefined,
                                  }}>
                                    {activeSlide.modelo || 'MODELO'}
                                  </div>
                                  <div className={`leading-none tracking-wide italic ${selectedClientData?.name?.toLowerCase().includes('meta') ? 'text-white font-light' : 'text-black font-bold'}`} style={{ fontSize: '13px', color: selectedClientData?.name?.toLowerCase().includes('meta') ? '#ffffff' : '#000000', marginTop: selectedClientData?.name?.toLowerCase().includes('meta') ? '2px' : '-2px', fontFamily: selectedClientData?.name?.toLowerCase().includes('meta') ? '"Montserrat", sans-serif' : undefined }}>
                                    {activeSlide.descricao || 'DESCRIÇÃO COMPLETA'}
                                  </div>

                                  {/* TAG FIPE E VALOR DO CARRO - APENAS SE FOR META (UNIMAIS NÃO TEM FIPE NEM PREÇO AMARELO) */}
                                  {selectedClientData?.name?.toLowerCase().includes('meta') && (
                                    <div className="mt-3 flex flex-col items-start gap-1 not-italic">
                                      <div className="inline-flex items-center gap-1.5 bg-[#000000]/85 backdrop-blur-md border border-[#FFD000]/50 px-2 py-0.5 rounded shadow-lg">
                                        <span className="text-[8px] font-black tracking-widest text-white uppercase font-sans">
                                          FIPE
                                        </span>
                                        <span className="text-[9px] font-extrabold text-[#FFD000] tracking-tight font-sans">
                                          {activeSlide.valorFipe ? (activeSlide.valorFipe.startsWith('R$') ? activeSlide.valorFipe : `R$ ${activeSlide.valorFipe}`) : (activeSlide.valorIntegral ? (activeSlide.valorIntegral.startsWith('R$') ? activeSlide.valorIntegral : `R$ ${activeSlide.valorIntegral}`) : 'R$ 99.590')}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-1.5 mt-0.5 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                                        <div className="flex flex-col text-white leading-[0.9] tracking-tight font-black font-sans text-left" style={{ fontSize: '11px' }}>
                                          <span>POR</span>
                                          <span>R$</span>
                                        </div>
                                        <div 
                                          className="text-[#FFD000] font-black leading-none tracking-tight"
                                          style={{ 
                                            fontFamily: '"Antonio", "Anton", sans-serif', 
                                            fontSize: '28px',
                                            textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
                                          }}
                                        >
                                          {(activeSlide.valorIntegral || activeSlide.valorFipe || '99.590').replace(/^R\$\s*/i, '')}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex-1 z-20 pointer-events-none"></div>

                            </div>
                          ) : activeSlide.type === 'destaque' ? (
                            // D. CARROS DESTAQUES TEMPLATE (UNIMAIS DESTAQUE BASE)
                            <div className="flex-1 flex flex-col justify-between relative overflow-hidden bg-[#050505]">
                              {/* Background Car Photo */}
                              {activeSlide.imageUrl && (
                                <img
                                  src={activeSlide.imageUrl}
                                  alt="Carro Destaque"
                                  className="absolute max-w-none origin-center z-0"
                                  style={{
                                    transform: `translate(${activeSlide.posX}px, ${activeSlide.posY}px) scale(${activeSlide.zoom})`,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    cursor: 'move'
                                  }}
                                  onMouseDown={handleMouseDown}
                                  onMouseMove={handleMouseMove}
                                  onMouseUp={handleMouseUp}
                                  onMouseLeave={handleMouseUp}
                                  crossOrigin="anonymous"
                                  referrerPolicy="no-referrer"
                                />
                              )}

                              {/* OVERLAY BASE PNG DESTAQUES UNIMAIS */}
                              <img 
                                src="https://res.cloudinary.com/ifuatk2z/image/upload/v1787842885/BASE_Destaques_Unimais.png" 
                                alt="Base Destaques Unimais" 
                                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" 
                                crossOrigin="anonymous" 
                              />

                              {/* LADO INFERIOR ESQUERDO: FABRICANTE + MODELO + DESCRIÇÃO (Fonte Ruda / Descrição fina em itálico) */}
                              <div className="absolute bottom-[58px] left-[18px] z-20 pointer-events-none text-left flex flex-col items-start" style={{ maxWidth: '175px', fontFamily: '"Ruda", sans-serif' }}>
                                <div className="text-white text-[13px] font-bold tracking-wide uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate w-full">
                                  {activeSlide.fabricante || 'CHEVROLET'}
                                </div>
                                <div className="text-white text-[28px] font-black tracking-tight uppercase leading-none mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate w-full">
                                  {activeSlide.modelo || 'ONIX'}
                                </div>
                                <div className="text-white/95 text-[9.5px] font-normal italic tracking-wide uppercase leading-tight mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
                                  {activeSlide.descricao || '1.0 FLEX LT MANUAL'}
                                </div>
                              </div>

                              {/* LADO INFERIOR DIREITO: PREÇO + ESPECIFICAÇÕES (KM, ANO, CÂMBIO) */}
                              <div className="absolute bottom-[58px] right-[18px] z-20 pointer-events-none flex flex-col items-end text-right">
                                {/* Preço Amarelo */}
                                <div className="flex items-baseline gap-0.5 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
                                  <span className="text-[#FFD000] text-[13px] font-black tracking-tight mr-0.5">R$</span>
                                  <span 
                                    className="text-[#FFD000] font-black leading-none tracking-tight"
                                    style={{ 
                                      fontFamily: '"Antonio", "Anton", sans-serif', 
                                      fontSize: '44px',
                                      textShadow: '2px 2px 0px rgba(0,0,0,0.7)'
                                    }}
                                  >
                                    {(activeSlide.valorIntegral || '72.900').replace(/^R\$\s*/i, '').replace(/,\d{2}$/, '')}
                                  </span>
                                  <span className="text-[#FFD000] text-[11px] font-black tracking-tight self-start mt-1">,00</span>
                                </div>

                                {/* Especificações: Textos alinhados aos ícones originais da base PNG */}
                                <div className="flex items-center gap-3 text-white text-[8.5px] font-bold uppercase tracking-wider mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" style={{ fontFamily: '"Ruda", sans-serif' }}>
                                  <span>{(activeSlide.condicao2Val || '44.802').includes('KM') ? (activeSlide.condicao2Val || '44.802') : `${activeSlide.condicao2Val || '44.802'} KM`}</span>
                                  <span>{activeSlide.condicao1Val || '2024'}</span>
                                  <span>{activeSlide.cambio || activeSlide.condicao3Val || 'MANUAL'}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // C. FINAL TEMPLATE (FIXED IMAGE)
                            <div className="flex-1 w-full h-full relative">
                              <img 
                                src={activeSlide.imageUrl || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1784237078/kokdbgwrmrj2h3pki9li.png' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'https://res.cloudinary.com/ifuatk2z/image/upload/v1787248141/finalAzul2.png' : 'https://res.cloudinary.com/djw0tqmiw/image/upload/v1783274796/rhd5ngpu9rhntpkqeh7v.png')} 
                                alt="Final" 
                                className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" 
                              />
                            </div>
                          )}

                          {/* GLOBALLY SHARED WEB FOOTER BAR - Only show for Unimais (Meta and Azul use their own PNG bases) */}
                          {activeSlide.type === 'veiculo' && !selectedClientData?.name?.toLowerCase().includes('meta') && !selectedClientData?.name?.toLowerCase().includes('azul') && (
                            <div className="absolute bottom-0 left-0 right-0 bg-[#012d6a] text-white py-2 flex items-center justify-center gap-1 text-[8px] font-outfit tracking-widest uppercase border-t border-cyan-400/10 z-20">
                              <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                              </svg>
                              <span>{activeSlide.website || (selectedClientData?.name?.toLowerCase().includes('meta') ? 'METAVEICULOS.COM.BR' : selectedClientData?.name?.toLowerCase().includes('azul') ? 'AZULVEICULOS.COM.BR' : 'UNIMAISVEICULOS.COM.BR')}</span>
                            </div>
                          )}

                        </div>
                        </div>
                      </div>
                    )}



                  </div>

                </div>

              </div>
            )}

            {/* STEP 4: Client Edit Layout */}
            {activeTab === 'config' && selectedClientId && showEditClient && selectedClientData && (
              <div className="space-y-6 animate-fade-in">
                
                <button 
                  onClick={() => {
                    setShowEditClient(false);
                    setSelectedClientId(null);
                  }}
                  className="flex items-center gap-2 text-xs font-outfit uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar para Configurações
                </button>

                <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-8 max-w-2xl">
                  
                  <div className="border-b border-white/5 pb-4 mb-6">
                    <span className="text-[9px] font-outfit text-[#C46A1A] uppercase tracking-widest">
                      Configurações Globais
                    </span>
                    <h3 className="text-lg font-light uppercase text-white mt-0.5" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Editar Dados do Cliente
                    </h3>
                  </div>

                  <div className="space-y-5 text-xs font-outfit">
                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">Nome do Cliente</label>
                      <input
                        type="text"
                        value={selectedClientData.name}
                        onChange={(e) => updateSelectedClient({ name: e.target.value })}
                        className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white"
                        placeholder="Ex: Unimais Veículos"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">Descrição</label>
                      <textarea
                        value={selectedClientData.description}
                        onChange={(e) => updateSelectedClient({ description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white resize-none"
                        placeholder="Descrição curta sobre a loja"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">URL do Logotipo (Opcional)</label>
                      <input
                        type="text"
                        value={selectedClientData.logoUrl}
                        onChange={(e) => updateSelectedClient({ logoUrl: e.target.value })}
                        className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white"
                        placeholder="https://exemplo.com/logo.png"
                      />
                      <p className="text-[9px] text-white/30 uppercase mt-1 leading-relaxed">
                        Cole uma URL de imagem válida para substituir o logo padrão na plataforma.
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">Detalhes</label>
                      <textarea
                        value={selectedClientData.detalhes || ''}
                        onChange={(e) => updateSelectedClient({ detalhes: e.target.value })}
                        rows={3}
                        className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white resize-none"
                        placeholder="Detalhes adicionais sobre o cliente"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">Anexos</label>
                      <input
                        type="text"
                        value={selectedClientData.anexos || ''}
                        onChange={(e) => updateSelectedClient({ anexos: e.target.value })}
                        className="w-full bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white"
                        placeholder="URLs de anexos (separados por vírgula)"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-white/60 uppercase text-[9px] tracking-wider block">Cor do Cliente (Hex)</label>
                      <div className="flex gap-4 items-center">
                        <div className="relative w-[46px] h-[46px] shrink-0 rounded-xl overflow-hidden border border-white/10 focus-within:border-[#C46A1A] transition-colors">
                          <input
                            type="color"
                            value={selectedClientData.corCliente || '#FF7A00'}
                            onChange={(e) => updateSelectedClient({ corCliente: e.target.value })}
                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer bg-transparent border-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={selectedClientData.corCliente || ''}
                          onChange={(e) => updateSelectedClient({ corCliente: e.target.value })}
                          className="flex-1 bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white uppercase"
                          placeholder="Ex: #FF7A00"
                        />
                      </div>
                      
                      <div className="mt-4 p-4 bg-[#111116] border border-white/10 rounded-xl flex items-center justify-center group cursor-default">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest mr-4">Preview:</span>
                        <h4 
                          className="text-2xl font-light tracking-wide uppercase transition-colors duration-300" 
                          style={{ 
                            fontFamily: 'var(--font-outfit)',
                            color: '#F5F2EC'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = selectedClientData.corCliente || '#FF7A00'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#F5F2EC'}
                        >
                          {selectedClientData.name || 'Nome do Cliente'}
                        </h4>
                      </div>
                      
                      <p className="text-[9px] text-white/30 uppercase mt-1 leading-relaxed">
                        Esta cor será usada no efeito hover ao passar o mouse sobre o nome do cliente.
                      </p>
                    </div>
                    
                    {selectedClientData.logoUrl && (
                      <div className="mt-4 p-4 bg-[#111116] border border-white/10 rounded-xl flex flex-col items-center justify-center">
                        <span className="text-white/40 uppercase text-[9px] mb-3">Preview do Logo</span>
                        <img 
                          src={selectedClientData.logoUrl} 
                          alt="Logo Preview" 
                          className="max-w-[200px] max-h-[80px] object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '';
                            setToast({ message: 'URL de imagem inválida', type: 'error' });
                          }}
                        />
                      </div>
                    )}

                    <div className="pt-6 border-t border-white/5 mt-6">
                      <button
                        onClick={() => {
                          setToast({ message: 'Dados do cliente salvos!', type: 'success' });
                          setTimeout(() => setToast(null), 3000);
                          setShowEditClient(false);
                          setSelectedClientId(null);
                        }}
                        className="w-full bg-[#18120e] border border-[#C46A1A] hover:bg-[#C46A1A] text-[#FF7A00] hover:text-black font-outfit text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer font-bold"
                      >
                        Salvar Configurações
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIG VIEW */}
            {activeTab === 'config' && !showEditClient && (
              <div className="space-y-6 animate-fade-in max-w-4xl">
                
                {/* Configurar Clientes Card */}
                <div className="bg-[#0c0c10] border border-white/5 rounded-2xl p-8">
                  <div className="border-b border-white/5 pb-4 mb-8">
                    <span className="text-[9px] font-outfit text-[#C46A1A] uppercase tracking-widest">
                      Gerenciamento do Sistema
                    </span>
                    <h3 className="text-xl font-light uppercase text-white mt-0.5" style={{ fontFamily: 'var(--font-outfit)' }}>
                      Configurar Clientes
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {/* Cadastrar Cliente */}
                    <div>
                      <h4 className="text-[10px] font-outfit uppercase tracking-widest text-white/60 mb-4">Cadastrar Novo Cliente</h4>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="text"
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          className="flex-1 bg-[#111116] border border-white/10 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#C46A1A] text-white text-sm"
                          placeholder="Nome do cliente"
                        />
                        <button
                          onClick={() => {
                            if (!newClientName.trim()) return;
                            const newClient: AppClient = {
                              id: crypto.randomUUID(),
                              name: newClientName.trim(),
                              description: '',
                              logoUrl: '',
                              active: true
                            };
                            const updated = [...clients, newClient];
                            setClients(updated);
                            
                            const descPayload = JSON.stringify({ text: newClient.description, detalhes: '', anexos: '', corCliente: '' });
                            supabase.from('clients').upsert({ id: newClient.id, name: newClient.name, description: descPayload, logourl: newClient.logoUrl, active: newClient.active })
                              .then(({ error }) => {
                                if (error) console.error('Error saving client:', error);
                              });
                            
                            setNewClientName('');
                            setToast({ message: 'Cliente cadastrado!', type: 'success' });
                            setTimeout(() => setToast(null), 3000);
                          }}
                          className="bg-[#18120e] border border-[#C46A1A] hover:bg-[#C46A1A] text-[#FF7A00] hover:text-black font-outfit text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all cursor-pointer font-bold shrink-0"
                        >
                          Cadastrar
                        </button>
                      </div>
                    </div>

                    {/* Gerenciar Clientes */}
                    <div className="pt-8 border-t border-white/5">
                      <h4 className="text-[10px] font-outfit uppercase tracking-widest text-white/60 mb-4">Gerenciar Clientes</h4>
                      <div className="space-y-3">
                        {clients.map(client => (
                          <div key={client.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111116] border border-white/5 p-4 rounded-xl hover:border-[#C46A1A]/30 transition-colors">
                            <div>
                              <span className="text-sm text-white font-medium block">{client.name}</span>
                              <span className={`text-[9px] font-outfit uppercase tracking-widest mt-1 block ${client.active ? 'text-green-500/70' : 'text-red-500/70'}`}>
                                Status: {client.active ? 'Ativo' : 'Desativado'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedClientId(client.id);
                                  setShowEditClient(true);
                                }}
                                className="text-[10px] font-outfit uppercase tracking-widest px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => {
                                  const toggledClient = { ...client, active: !client.active };
                                  const updated = clients.map(c => c.id === client.id ? toggledClient : c);
                                  setClients(updated);
                                  
                                  const descPayload = JSON.stringify({ text: toggledClient.description, detalhes: toggledClient.detalhes, anexos: toggledClient.anexos, corCliente: toggledClient.corCliente });
                                  supabase.from('clients').upsert({ id: toggledClient.id, name: toggledClient.name, description: descPayload, logourl: toggledClient.logoUrl, active: toggledClient.active })
                                    .then(({ error }) => {
                                      if (error) console.error('Error saving client:', error);
                                    });
                                }}
                                className={`text-[10px] font-outfit uppercase tracking-widest px-4 py-2 rounded-lg border transition-all ${client.active ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-[#C46A1A]/50 text-[#C46A1A] hover:bg-[#C46A1A]/20'}`}
                              >
                                {client.active ? 'Desativar' : 'Ativar'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </main>

        </div>
      )}

    </div>
  );
}
