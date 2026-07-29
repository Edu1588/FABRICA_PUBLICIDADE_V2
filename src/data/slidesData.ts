import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  // SLIDE 1: Capa (1/15)
  {
    id: 1,
    slideNumber: "01 / 15",
    category: "capa",
    categoryLabel: "Relatório Técnico",
    title: "OPERAÇÃO INTEGRADA DE MARKETING",
    subtitle: "Julho - 2026",
    layoutType: "hero_title",
    descriptionText: "Documento técnico-operacional - Julho de 2026 - Uso interno e confidencial - Fábrica Publicidade & Digital",
    bgImageUrl: "https://res.cloudinary.com/ifuatk2z/image/upload/v1785183140/CRUZE_AZUL_hl4hny.png",
    presenterNotes: "Apresentação da Operação Integrada de Marketing da Azul Veículos conduzida pela agência Fábrica Publicidade & Digital."
  },

  // SLIDE 2: Introdução (2/15)
  {
    id: 2,
    slideNumber: "02 / 15",
    category: "introducao",
    categoryLabel: "02 / Introdução",
    title: "APRESENTAÇÃO",
    subtitle: "Apresentação Geral",
    layoutType: "split_text_image",
    descriptionText: [
      "Este relatório apresenta a estrutura operacional de marketing atualmente desenvolvida pela Fábrica Publicidade para a Azul Veículos.",
      "Mais do que documentar peças produzidas ou campanhas executadas, este material demonstra a abrangência da operação conduzida pela agência, evidenciando sua atuação estratégica, criativa, tecnológica e operacional.",
      "Os volumes de entregas apresentados representam a média operacional da agência, podendo variar conforme o calendário comercial, campanhas promocionais, sazonalidade do mercado e as necessidades estratégicas da Azul Veículos, refletindo uma operação dinâmica, em constante evolução e acompanhando o crescimento contínuo das demandas da empresa."
    ],
    bgImageUrl: "https://azulveiculos.com.br/img/azul-loja-1.png",
    presenterNotes: "Visão introdutória enfatizando o caráter vivo e contínuo da operação de marketing da Azul Veículos."
  },

  // SLIDE 3: Natureza da Operação (3/15)
  {
    id: 3,
    slideNumber: "03 / 15",
    category: "natureza",
    categoryLabel: "03 / Natureza da Operação",
    title: "NATUREZA DA OPERAÇÃO",
    subtitle: "ESTRUTURA CONTÍNUA, ESCALÁVEL E INTEGRADA 360°",
    layoutType: "natureza_operacao",
    descriptionText: "Estrutura contínua e escalável, dimensionada para acompanhar o crescimento das demandas comerciais e institucionais da Azul Veículos.",
    pillars: [
      {
        id: "estrategia",
        title: "Atuação Estratégica",
        category: "Planejamento & Diretrizes",
        description: "Alinhamento constante com a diretoria, planejamento comercial, calendário de campanhas e posicionamento de mercado.",
        imageUrl: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=500&auto=format&fit=crop&q=60",
        iconName: "Target",
        badge: "Estratégia"
      },
      {
        id: "criativa",
        title: "Atuação Criativa",
        category: "Design & Audiovisual",
        description: "Suporte diário à equipe Web e Marketing da Azul, gestão de demandas urgentes e fluxo contínuo de aprovações.",
        imageUrl: "https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png",
        iconName: "Palette",
        badge: "Criação"
      },
      {
        id: "tecnologia",
        title: "Atuação Tecnológica",
        category: "Digital & Plataformas",
        description: "Desenvolvimento e manutenção do portal azulveiculos.com.br, landing pages e integração com CRM e WhatsApp.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        iconName: "Cpu",
        badge: "Tecnologia"
      },
      {
        id: "operacional",
        title: "Atuação Operacional",
        category: "Atendimento & Workflow",
        description: "Suporte diário às unidades, gestão de demandas urgentes e alinhamento comercial permanente.",
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcHJlc2F8ZW58MHx8MHx8fDI%3D",
        iconName: "Workflow",
        badge: "Operação"
      }
    ],
    presenterNotes: "Detalhamento exclusivo dos 4 pilares da Natureza da Operação."
  },

  // SLIDE 4: Modelo Operacional (4/15)
  {
    id: 4,
    slideNumber: "04 / 15",
    category: "modelo",
    categoryLabel: "04 / Organização",
    title: "ESTRUTURA DA OPERAÇÃO",
    subtitle: "O modelo conecta frentes complementares em um fluxo contínuo.",
    layoutType: "connected_flow",
    stepItems: [
      { number: "01", title: "Estratégia", description: "Planejamento, calendário comercial e diretrizes." },
      { number: "02", title: "Criação", description: "Conceito, design, copy e material offline." },
      { number: "03", title: "Tecnologia", description: "Website, integrações e plataformas digitais." },
      { number: "04", title: "Operação", description: "Atendimento diário, suporte às lojas e gestão." }
    ],
    presenterNotes: "Fluxo integrado de entregas."
  },

  // SLIDE 5: Planejamento Estratégico (5/15)
  {
    id: 5,
    slideNumber: "05 / 15",
    category: "estrategia",
    categoryLabel: "05 / Estratégia",
    title: "PLANEJAMENTO ESTRATÉGICO",
    subtitle: "DIRETRIZES, GOVERNANÇA E METODOLOGIA 360°",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Planejamento de campanhas", description: "Definição rigorosa de objetivos, calendário tático e abordagem criativa." },
      { item: "Calendário comercial", description: "Mapeamento estratégico de datas comemorativas, feirões regionais e ações sazonais." },
      { item: "Naming e Assinaturas", description: "Criação de nomes, motes e assinaturas exclusivas para campanhas e promoções." },
      { item: "Conceitos criativos", description: "Desenvolvimento da ideia central e storytelling que orienta a comunicação multicanal." }
    ],
    tableData2: [
      { item: "Planejamento digital", description: "Arquitetura de canais, formatos dinâmicos e frequência otimizada para redes sociais." },
      { item: "Planejamento institucional", description: "Consolidação contínua da autoridade de marca e diferenciais competitivos." },
      { item: "Alocação inteligente de mídia", description: "Distribuição estratégica de verbas e formatos conforme o funil de conversão." },
      { item: "Cronograma e governança", description: "Gestão integrada de prazos de criação, validação executiva e publicação." }
    ],
    presenterNotes: "Atividades aprofundadas de planejamento estratégico."
  },

  // SLIDE 6: Rotina Operacional (6/15)
  {
    id: 6,
    slideNumber: "06 / 15",
    category: "rotina",
    categoryLabel: "06 / Rotina Operacional",
    title: "ATENDIMENTO E GESTÃO",
    subtitle: "WORKFLOW E ETAPAS DA JORNADA",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Atendimento diário", description: "Acompanhamento das demandas recebidas das lojas e diretoria." },
      { number: "2", title: "Gestão de demandas", description: "Organização, priorização e distribuição das solicitações." },
      { number: "3", title: "Aprovações", description: "Validação de peças e campanhas antes da publicação." },
      { number: "4", title: "Reuniões", description: "Alinhamentos periódicos de planejamento e resultados." }
    ],
    presenterNotes: "Workflow diário."
  },

  // SLIDE 7: Interface e Fluxo (7/15)
  {
    id: 7,
    slideNumber: "07 / 15",
    category: "rotina",
    categoryLabel: "07 / Interface e Fluxo",
    title: "INTERFACE COM A OPERAÇÃO",
    subtitle: "PONTOS DE CONTATO E ALINHAMENTO",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Diretoria", description: "Alinhamento de diretrizes, metas estratégicas e aprovação final." },
      { number: "2", title: "Equipe de Vendas", description: "Suporte direto às lojas e materiais focados em conversão." },
      { number: "3", title: "Parceiros e Bancos", description: "Adequação de taxas, campanhas financeiras e sinalização." },
      { number: "4", title: "Suporte Contínuo", description: "Disponibilidade permanente da equipe para a operação." }
    ],
    presenterNotes: "Interface com stakeholders."
  },

  // SLIDE 8: Design Estratégico (8/15) - Adaptado para o estilo de cartões do Slide 7
  {
    id: 8,
    slideNumber: "08 / 15",
    category: "criacao",
    categoryLabel: "08 / Criação",
    title: "DESIGN ESTRATÉGICO",
    subtitle: "CONCEITOS E KEY VISUAL",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Conceitos Criativos", description: "Construção da ideia visual que sustenta a campanha." },
      { number: "2", title: "Identidade Visual", description: "Definição de cores, tipografia e composição para cada ação." },
      { number: "3", title: "Key Visual", description: "Criação da peça-mestre orientadora de todos os desdobramentos." },
      { number: "4", title: "Padronização", description: "Consistência da marca Azul Veículos em todas as peças." }
    ],
    presenterNotes: "Design estratégico e key visual."
  },

  // SLIDE 9: Produção Criativa (9/15)
  {
    id: 9,
    slideNumber: "09 / 15",
    category: "criacao",
    categoryLabel: "09 / Criação",
    title: "PRODUÇÃO CRIATIVA",
    subtitle: "ENTREGÁVEIS GRÁFICOS E DIGITAIS",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Campanhas completas", description: "Conjunto de peças de uma mesma campanha, adaptado para todos os canais." },
      { item: "Posts", description: "Conteúdos estáticos de alta conversão para o feed das redes sociais." },
      { item: "Stories", description: "Peças dinâmicas e interativas para engajamento diário." },
      { item: "Carrosséis", description: "Sequências informativas para destaque de veículos e ofertas." }
    ],
    tableData2: [
      { item: "Material Offline", description: "Peças impressas, PDV e sinalização para as lojas físicas." },
      { item: "Banners para Portal", description: "Criação de banners rotativos e destaques para azulveiculos.com.br." },
      { item: "Anúncios para Mídia", description: "Formatos otimizados para campanhas de tráfego pago." },
      { item: "Adaptação de Ofertas", description: "Atualização rápida de preços, taxas e condições comerciais." }
    ],
    presenterNotes: "Produção criativa diária."
  },

  // SLIDE 10: Produção Audiovisual (10/15) - Adaptado para o estilo de cartões do Slide 7
  {
    id: 10,
    slideNumber: "10 / 15",
    category: "criacao",
    categoryLabel: "10 / Criação",
    title: "PRODUÇÃO AUDIOVISUAL",
    subtitle: "VÍDEOS, REELS E MOTION DESIGN",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Roteiro & Planejamento", description: "Estruturação de narrativa e objetivo de cada vídeo." },
      { number: "2", title: "Gravação em Loja", description: "Filmmakers dedicados capturando o estoque real." },
      { number: "3", title: "Edição Acelerada", description: "Corte dinâmico e legendas para redes sociais." },
      { number: "4", title: "Motion Design", description: "Animações e vinhetas para campanhas de destaque." }
    ],
    presenterNotes: "Produção audiovisual de alto impacto."
  },

  // SLIDE 11: Marketing Digital (11/15) - Adaptado para o estilo de cartões do Slide 7
  {
    id: 11,
    slideNumber: "11 / 15",
    category: "digital",
    categoryLabel: "11 / Digital",
    title: "MARKETING DIGITAL E SOCIAL MEDIA",
    subtitle: "ESTRUTURA DE ATRAÇÃO E CONVERSÃO",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Enxoval Digital", description: "Feed, Stories com email marketing, carrosséis e banners." },
      { number: "2", title: "Tráfego Patrocinado", description: "Gestão de anúncios direcionados para equipes de vendas." },
      { number: "3", title: "Inbound Marketing", description: "Automação de relacionamento e nutrição de leads." },
      { number: "4", title: "Campanhas Sazonais", description: "Ações promocionais integradas com as lojas." }
    ],
    presenterNotes: "Estratégia digital integrada."
  },

  // SLIDE 12: Tecnologia (12/15)
  {
    id: 12,
    slideNumber: "12 / 15",
    category: "tecnologia",
    categoryLabel: "12 / Tecnologia",
    title: "TECNOLOGIA E PLATAFORMA",
    subtitle: "AZULVEICULOS.COM.BR & AUTOAVALIAR",
    layoutType: "tech_web",
    tableData: [
      { item: "Website Institucional", description: "Catálogo completo de veículos seminovos com busca avançada." },
      { item: "Sincronização Automática", description: "Integração a cada 10 minutos com o AutoAvaliar." },
      { item: "Painel de Administração", description: "Controle de banners, blog e destaques pela equipe." },
      { item: "Roteamento de WhatsApp", description: "Direcionamento dos leads diretamente para cada loja." }
    ],
    presenterNotes: "Infraestrutura tecnológica de ponta."
  },

  // SLIDE 13: Recursos Prontos para Ativação (13/15) - Adaptado para o estilo de cartões do Slide 7 (Sintetizado do PDF p.8)
  {
    id: 13,
    slideNumber: "13 / 15",
    category: "fisica",
    categoryLabel: "13 / Ativações Futuras",
    title: "RECURSOS PRONTOS PARA ATIVAÇÃO",
    subtitle: "RECURSOS PRONTOS QUE DEPENDEM APENAS DE DECISÃO",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Selo Vistoriado", description: "Selo de laudo nos cards de veículo para reforçar segurança." },
      { number: "2", title: "Rolagem Infinita", description: "Navegação contínua no showroom em vez de paginação." },
      { number: "3", title: "Preço com Acréscimo", description: "Opção de valor diferenciado para vendedores logados." },
      { number: "4", title: "Feed de Catálogo", description: "Anúncios dinâmicos de estoque para Meta e Instagram." }
    ],
    presenterNotes: "Recursos prontos na plataforma."
  },

  // SLIDE 14: Flexibilidade Operacional (14/15)
  {
    id: 14,
    slideNumber: "14 / 15",
    category: "continuidade",
    categoryLabel: "14 / Continuidade",
    title: "FLEXIBILIDADE OPERACIONAL",
    subtitle: "COMO A OPERAÇÃO RESPONDE ÀS MUDANÇAS",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Alterações de campanhas", description: "Ajustes rápidos de peças já aprovadas conforme mudança comercial." },
      { item: "Mudanças comerciais", description: "Atualização imediata de condições, preços e taxas nas peças." },
      { item: "Demandas urgentes", description: "Atendimento ágil a solicitações fora do fluxo padrão." }
    ],
    tableData2: [
      { item: "Atendimento fora do horário", description: "Suporte em horários não convencionais quando a operação exige." },
      { item: "Suporte contínuo", description: "Disponibilidade permanente da equipe para a Azul Veículos." }
    ],
    presenterNotes: "Flexibilidade e agilidade."
  },

  // SLIDE 15: Resumo Executivo / Métricas em Destaque (15/15)
  {
    id: 15,
    slideNumber: "15 / 15",
    category: "indicadores",
    categoryLabel: "15 / Síntese",
    title: "RESUMO EXECUTIVO E MÉTRICAS",
    subtitle: "IMPACTO E VOLUMETRIA DA OPERAÇÃO",
    layoutType: "executive_summary",
    metrics: [
      { value: "+160", numericValue: 160, label: "Stories mensais", category: "Redes Sociais" },
      { value: "+70", numericValue: 70, label: "Peças para Feed", category: "Redes Sociais" },
      { value: "144", numericValue: 144, label: "Sincronizações / dia", category: "Tecnologia" },
      { value: "4", numericValue: 4, label: "Lojas integradas", category: "Operação" }
    ],
    presenterNotes: "Resumo executivo final."
  }
];
