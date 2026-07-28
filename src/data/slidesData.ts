import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  // SLIDE 1: 1: Capa (1/20)
  {
    id: 1,
    slideNumber: "01 / 19",
    category: "capa",
    categoryLabel: "Relatório Técnico",
    title: "OPERAÇÃO INTEGRADA DE MARKETING",
    subtitle: "Julho - 2026",
    layoutType: "hero_title",
    descriptionText: "Documento técnico-operacional - Julho de 2026 - Uso interno e confidencial - Fábrica Publicidade & Digital",
    bgImageUrl: "https://res.cloudinary.com/ifuatk2z/image/upload/v1785183140/CRUZE_AZUL_hl4hny.png",
    presenterNotes: "Apresentação da Operação Integrada de Marketing da Azul Veículos conduzida pela agência Fábrica Publicidade & Digital."
  },

  // SLIDE 2: 2: Introdução (2/20)
  {
    id: 2,
    slideNumber: "02 / 19",
    category: "introducao",
    categoryLabel: "02 / Introdução",
    title: "APRESENTAÇÃO",
    subtitle: "Apresentação Geral",
    layoutType: "split_text_image",
    descriptionText: [
      "Este relatório apresenta a estrutura operacional de marketing atualmente desenvolvida pela Fábrica Publicidade para a Azul Veículos.",
      "Mais do que documentar peças produzidas ou campanhas executadas, este material demonstra a abrangência da operação conduzida pela agência, evidenciando sua atuação estratégica, criativa, tecnológica e operacional.",
      "Os volumes de entregas apresentados representam a média operacional da agência, podendo variar conforme o calendário comercial, campanhas promocionais, sazonalidade do mercado e as necessidades estratégicas da Azul Veículos, refletindo uma operação dinâmica, em constante evolução e acompanhando o crescimento contínuo das demandas da empresa.",
      "Este documento contempla não apenas os entregáveis produzidos, mas também todas as atividades de planejamento, atendimento, desenvolvimento, suporte e acompanhamento que fazem parte da rotina operacional."
    ],
    bgImageUrl: "https://azulveiculos.com.br/img/azul-loja-1.png",
    presenterNotes: "Visão introdutória enfatizando o caráter vivo e contínuo da operação de marketing da Azul Veículos."
  },

  // SLIDE 3: 3: Natureza da Operação (3/20) - SLIDE EXCLUSIVO E DEDICADO COM IMAGENS
  {
    id: 3,
    slideNumber: "03 / 19",
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
        description: "Alinhamento constante com a diretoria, planejamento comercial, calendário de campanhas, naming e posicionamento de mercado.",
        imageUrl: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyYXRlZ3l8ZW58MHx8MHx8fDI%3D",
        iconName: "Target",
        badge: "Estratégia"
      },
      {
        id: "criativa",
        title: "Atuação Criativa",
        category: "Design & Audiovisual",
        description: "Suporte diário à equipe Web e Marketing da Azul, gestão de demandas urgentes, alterações rápidas de condições comerciais e fluxo contínuo de aprovações.",
        imageUrl: "https://res.cloudinary.com/ifuatk2z/image/upload/v1785278875/azulveic_jsromh.png",
        iconName: "Palette",
        badge: "Criação"
      },
      {
        id: "tecnologia",
        title: "Atuação Tecnológica",
        category: "Digital & Plataformas",
        description: "Desenvolvimento e manutenção do portal azulveiculos.com.br, landing pages de feirões, SEO e automação no Ferramenta de Inbound Marketing.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        iconName: "Cpu",
        badge: "Tecnologia"
      },
      {
        id: "operacional",
        title: "Atuação Operacional",
        category: "Atendimento & Workflow",
        description: "Suporte diário às unidades, gestão de demandas urgentes, alterações rápidas de condições comerciais e fluxo contínuo de aprovações.",
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtcHJlc2F8ZW58MHx8MHx8fDI%3D",
        iconName: "Workflow",
        badge: "Operação"
      }
    ],
    presenterNotes: "Detalhamento exclusivo dos 4 pilares da Natureza da Operação com suporte visual e fotográfico."
  },

  // SLIDE 4: 5: Organização (5/20)
  {
    id: 4,
    slideNumber: "04 / 19",
    category: "organizacao",
    categoryLabel: "04 / Organização",
    title: "ESTRUTURA DA OPERAÇÃO",
    subtitle: "Matriz organizacional dedicada à conta da Azul Veículos.",
    layoutType: "organogram",
    organogram: [
      {
        title: "Planejamento & Atendimento",
        items: ["Planejamento Estratégico", "Atendimento"],
        icon: "Briefcase"
      },
      {
        title: "Gestão de Projetos",
        items: ["Coordenação de entregas", "Cronograma e prazos"],
        icon: "Calendar"
      },
      {
        title: "Criação",
        items: ["Design", "Copywriting", "Social Media", "Material Offline", "Produção Audiovisual", "Motion Design", "Desenvolvimento Web"],
        icon: "PenTool"
      },
      {
        title: "Tecnologia & Mídia",
        items: ["Google Ads", "Meta Ads", "Ferramenta de Inbound Marketing"],
        icon: "Cpu"
      },
      {
        title: "Comunicação",
        items: ["Institucional", "Comercial"],
        icon: "MessageSquare"
      },
      {
        title: "Suporte Operacional",
        items: ["Continuidade", "Urgências", "Manutenção"],
        icon: "Wrench"
      }
    ],
    presenterNotes: "Detalhamento da equipe multidisciplinar dedicada."
  },

  // SLIDE 5: 6: Estratégia (6/20)
  {
    id: 5,
    slideNumber: "05 / 19",
    category: "estrategia",
    categoryLabel: "05 / Estratégia",
    title: "PLANEJAMENTO ESTRATÉGICO",
    subtitle: "DIRETRIZES, GOVERNANÇA E METODOLOGIA 360°",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Planejamento de campanhas", description: "Definição rigorosa de objetivos, calendário tático e abordagem criativa de cada campanha antes do início da produção." },
      { item: "Calendário comercial", description: "Mapeamento estratégico de datas comemorativas, feirões regionais e ações sazonais de alto impacto para o setor automotivo." },
      { item: "Naming e Assinaturas", description: "Criação de nomes, motes e assinaturas exclusivas para campanhas, salões e promoções especiais de cada unidade." },
      { item: "Conceitos criativos", description: "Desenvolvimento da ideia central e storytelling que orienta unificadamente a comunicação multicanal." },
      { item: "Estratégia comercial alinhada", description: "Sinergia permanente entre marketing e equipes de vendas para priorizar modelos, taxas e metas de cada período." },
      { item: "Matriz de Oportunidades", description: "Identificação antecipada de tendências de mercado e comportamento do consumidor automotivo." }
    ],
    tableData2: [
      { item: "Planejamento digital e multicanal", description: "Arquitetura de canais, formatos dinâmicos e frequência otimizada para redes sociais, portal e mídia paga." },
      { item: "Planejamento institucional", description: "Consolidação contínua da autoridade de marca, reputação de atendimento e diferenciais competitivos." },
      { item: "Alocação inteligente de mídia", description: "Distribuição estratégica de verbas e formatos conforme o funil de conversão e objetivos de lead." },
      { item: "Cronograma e governança de prazos", description: "Gestão integrada de prazos de criação, validação executiva e publicação em tempo real." },
      { item: "Sinergia entre unidades", description: "Padronização de diretrizes com flexibilidade para demandas específicas de cada praça da Azul Veículos." },
      { item: "Auditoria de Performance", description: "Revisão periódica de KPIs de alcance, conversão e retorno sobre campanhas executadas." }
    ],
    presenterNotes: "Atividades aprofundadas de planejamento estratégico que estruturam o ecossistema de marketing da Azul Veículos."
  },

  // SLIDE 6: 7: Rotina Operacional (7/20)
  {
    id: 6,
    slideNumber: "06 / 19",
    category: "rotina",
    categoryLabel: "06 / Rotina Operacional",
    title: "ATENDIMENTO E GESTÃO",
    subtitle: "WORKFLOW E ETAPAS DA JORNADA",
    layoutType: "process_stakeholders",
    stepItems: [
      { number: "1", title: "Atendimento diário", description: "Acompanhamento das demandas recebidas das lojas e da diretoria ao longo do dia." },
      { number: "2", title: "Gestão de demandas", description: "Organização, priorização e distribuição das solicitações entre as áreas responsáveis." },
      { number: "3", title: "Aprovações", description: "Validação de peças e campanhas antes da publicação ou produção final." },
      { number: "4", title: "Reuniões", description: "Alinhamentos periódicos de planejamento, resultados e próximos passos." }
    ],
    presenterNotes: "Fluxo passo-a-passo de como as solicitações caminham até a entrega final."
  },

  // SLIDE 7: 8: Interface com e Fluxo (8/20)
  {
    id: 7,
    slideNumber: "07 / 19",
    category: "rotina",
    categoryLabel: "07 / Interface e Fluxo",
    title: "INTERFACE COM",
    subtitle: "STAKEHOLDERS E CRITÉRIOS DE FLUXO",
    layoutType: "process_stakeholders",
    stakeholders: [
      { title: "Diretoria", text: "Alinhamento estratégico e reporte direto sobre campanhas e resultados." },
      { title: "Vendedores", text: "Suporte com materiais de apoio e informações comerciais atualizadas." },
      { title: "Bancos", text: "Adequação de peças e condições conforme parcerias financeiras vigentes." }
    ],
    tableData: [
      { item: "Organização de campanhas", description: "Estruturação da ordem e prioridade das campanhas ativas em cada período." },
      { item: "Priorização", description: "Definição de urgência entre demandas concorrentes do dia a dia." },
      { item: "Urgências", description: "Atendimento a solicitações com prazo reduzido, fora do fluxo padrão." }
    ],
    presenterNotes: "Como a agência faz interface com a diretoria, equipe de vendas e agentes bancários."
  },

  // SLIDE 8: 9: Gestão Comercial (9/20)
  {
    id: 8,
    slideNumber: "08 / 19",
    category: "rotina",
    categoryLabel: "08 / Comercial",
    title: "GESTÃO COMERCIAL",
    subtitle: "SUPORTE ÀS UNIDADES E VENDAS",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Suporte às campanhas", description: "Apoio na comunicação de campanhas em andamento, incluindo ajustes solicitados pelas lojas." },
      { item: "Campanhas promocionais", description: "Criação de peças e mensagens para ações de venda com prazo determinado." },
      { item: "Materiais para vendedores", description: "Produção de conteúdos de apoio para a abordagem comercial da equipe de vendas." },
      { item: "Apoio às unidades", description: "Atendimento direto às demandas específicas de cada loja da rede." },
      { item: "Apoio aos bancos", description: "Adequação de peças e condições comerciais conforme parcerias financeiras vigentes." },
      { item: "Eventos", description: "Planejamento e comunicação de feirões, lançamentos e ações presenciais." },
      { item: "Campanhas especiais", description: "Desenvolvimento de ações pontuais fora do calendário comercial regular." }
    ],
    presenterNotes: "Entregas ligadas ao suporte da força de vendas."
  },

  // SLIDE 9: 10: Design Estratégico (10/20)
  {
    id: 9,
    slideNumber: "09 / 19",
    category: "criacao",
    categoryLabel: "09 / Criação",
    title: "DESIGN ESTRATÉGICO",
    subtitle: "CONCEITOS E KEY VISUAL",
    layoutType: "design_keyvisual",
    stepItems: [
      { number: "01", title: "Desenvolvimento de conceitos criativos", description: "Construção da ideia visual que sustenta a campanha antes da produção das peças.", icon: "Target" },
      { number: "02", title: "Criação de identidade visual das campanhas", description: "Definição de cores, tipografia e composição específicas para cada ação.", icon: "Palette" },
      { number: "03", title: "Desenvolvimento de Key Visual", description: "Criação da peça-mestre que orienta todos os desdobramentos da campanha.", icon: "Layers" },
      { number: "04", title: "Criação de logotipos para campanhas", description: "Desenvolvimento de marcas gráficas para promoções e ações especiais.", icon: "Sparkles" },
      { number: "05", title: "Padronização visual", description: "Manutenção da consistência da marca Azul Veículos em todas as peças produzidas.", icon: "ShieldCheck" },
      { number: "06", title: "Linguagem visual", description: "Adequação do estilo gráfico ao público e ao canal de veiculação.", icon: "PenTool" }
    ],
    presenterNotes: "Padronização de Key Visuals e identidade de marca."
  },

  // SLIDE 10: 11: Produção Criativa (11/20)
  {
    id: 10,
    slideNumber: "10 / 19",
    category: "criacao",
    categoryLabel: "10 / Criação",
    title: "PRODUÇÃO CRIATIVA",
    subtitle: "ENTREGÁVEIS GRÁFICOS E DIGITAIS",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Campanhas completas", description: "Conjunto de peças de uma mesma campanha, adaptado para todos os canais de veiculação." },
      { item: "Posts", description: "Conteúdos estáticos para o feed das redes sociais." },
      { item: "Stories", description: "Conteúdos verticais de curta duração para Instagram e Facebook." },
      { item: "Carrosséis", description: "Sequências de imagens para aprofundar uma mensagem ou apresentar múltiplos veículos." },
      { item: "material offline e produção audiovisual", description: "Encartes promocionais com ofertas e condições vigentes." },
      { item: "Email Marketing", description: "Comunicações diretas para a base de contatos da Azul Veículos." }
    ],
    tableData2: [
      { item: "Landing Pages", description: "Páginas de destino para campanhas específicas e formulários de contato." },
      { item: "Materiais Institucionais", description: "Peças de comunicação da marca, sem foco promocional direto." },
      { item: "Materiais Impressos", description: "Produção gráfica para uso físico nas unidades." },
      { item: "Mockups", description: "Simulações visuais de aplicação das peças antes da produção final." },
      { item: "Banners", description: "Peças para uso digital ou físico em pontos de destaque." }
    ],
    presenterNotes: "Diversidade de formatos gráficos estáticos e digitais."
  },

  // SLIDE 11: 12: Produção Audiovisual (12/20)
  {
    id: 11,
    slideNumber: "11 / 19",
    category: "criacao",
    categoryLabel: "11 / Criação",
    title: "PRODUÇÃO AUDIOVISUAL",
    subtitle: "VÍDEOS, REELS E MOTION DESIGN",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Planejamento", description: "Definição de roteiro, formato e objetivo de cada peça audiovisual." },
      { item: "Roteiros", description: "Estruturação de texto e narrativa para vídeos institucionais e promocionais." },
      { item: "Gravações", description: "Captação de imagens em estúdio ou nas unidades da Azul Veículos." },
      { item: "Filmmaker", description: "Produção de vídeos com equipamento profissional para peças de maior impacto." },
      { item: "Mobile Makers", description: "Produção ágil de vídeos com equipamento móvel para conteúdo de rotina." }
    ],
    tableData2: [
      { item: "Motion Graphics", description: "Animação gráfica para dar dinamismo a peças estáticas." },
      { item: "Reels", description: "Vídeos curtos e dinâmicos para Instagram e Facebook." },
      { item: "Stories", description: "Conteúdos verticais de curta duração para redes sociais." },
      { item: "Vídeos Institucionais", description: "Peças que comunicam a marca Azul Veículos, sem foco promocional direto." },
      { item: "Vídeos Promocionais", description: "Peças com foco em condições comerciais e ofertas vigentes." }
    ],
    presenterNotes: "Captação presencial, gravação com equipamento profissional e mobile."
  },

  // SLIDE 12: 13: Marketing Digital (13/20)
  {
    id: 12,
    slideNumber: "12 / 19",
    category: "digital",
    categoryLabel: "12 / Digital",
    title: "MARKETING DIGITAL",
    subtitle: "CANAIS E ECOSSISTEMA ONLINE",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Instagram", description: "Canal principal de conteúdo orgânico e relacionamento com o público.", tag: "Orgânico & Relacionamento" },
      { item: "Facebook", description: "Complemento ao Instagram, com forte presença do público de faixa etária mais madura.", tag: "Público Sênior" },
      { item: "LinkedIn", description: "Comunicação institucional voltada a parceiros, bancos e fornecedores.", tag: "B2B & Institucional" },
      { item: "Google", description: "Captação de demanda ativa por meio de buscas relacionadas a veículos e ofertas.", tag: "Demanda Ativa" }
    ],
    tableData2: [
      { item: "Meta", description: "Gestão unificada de anúncios no Instagram e no Facebook.", tag: "Tráfego Pago" },
      { item: "Ferramenta de Inbound Marketing", description: "Automação de relacionamento e qualificação de leads.", tag: "Inbound & CRM" },
      { item: "Landing Pages", description: "Páginas de conversão vinculadas às campanhas ativas.", tag: "Conversão" },
      { item: "Email Marketing", description: "Comunicação direta com a base de contatos já captados.", tag: "Nutrição de Base" }
    ],
    presenterNotes: "Visão estratégica de como cada canal digital é aproveitado."
  },

  // SLIDE 13: 14: Gestão de Tráfego (14/20)
  {
    id: 13,
    slideNumber: "13 / 19",
    category: "performance",
    categoryLabel: "13 / Performance",
    title: "GESTÃO DE TRÁFEGO",
    subtitle: "GOOGLE ADS & META ADS",
    layoutType: "traffic_split",
    tableData: [
      { item: "Segmentação", description: "Definição de públicos por localização, interesse e comportamento de compra." },
      { item: "Remarketing", description: "Impacto recorrente em usuários que já interagiram com a marca." },
      { item: "Criação de públicos", description: "Estruturação de audiências personalizadas para cada campanha." },
      { item: "Otimização", description: "Ajustes contínuos de orçamento e criativos com base em performance." },
      { item: "Monitoramento", description: "Acompanhamento diário dos indicadores de campanha." },
      { item: "Relatórios", description: "Consolidação mensal dos resultados de mídia paga." }
    ],
    presenterNotes: "Investimento contínuo em anúncios de alta performance."
  },

  // SLIDE 14: 15: Tecnologia (15/20)
  {
    id: 14,
    slideNumber: "14 / 19",
    category: "tecnologia",
    categoryLabel: "14 / Tecnologia",
    title: "TECNOLOGIA",
    subtitle: "PLATAFORMA & INTEGRAÇÕES · AZULVEICULOS.COM.BR",
    layoutType: "tech_web",
    tableData: [
      { item: "Website", description: "Página institucional da Azul Veículos, com estoque, unidades e canais de contato." },
      { item: "Landing Pages", description: "Páginas específicas para campanhas e formulários de captação." },
      { item: "Integrações", description: "Conexão do site com CRM, WhatsApp e ferramentas de mídia." },
      { item: "Atualizações", description: "Manutenção de conteúdo, preços e condições exibidas no site." },
      { item: "Publicação de campanhas", description: "Inserção de banners e peças vinculadas às ações vigentes." },
      { item: "Correções", description: "Ajustes técnicos identificados na navegação ou exibição do site." },
      { item: "Evoluções", description: "Melhorias estruturais na plataforma conforme necessidade do negócio." },
      { item: "Suporte Técnico", description: "Atendimento a instabilidades e solicitações pontuais da equipe." }
    ],
    presenterNotes: "Manutenção técnica e evolução constante do portal web."
  },

  // SLIDE 15: 16: Comunicação Offline (16/20)
  {
    id: 15,
    slideNumber: "15 / 19",
    category: "fisica",
    categoryLabel: "15 / Produção Física",
    title: "COMUNICAÇÃO OFFLINE",
    subtitle: "SINALIZAÇÃO E MATERIAL IMPRESSO",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Faixas", description: "Comunicação de campanhas em vias de grande circulação próximas às unidades." },
      { item: "Lonas", description: "Sinalização de grande formato para fachadas e eventos." },
      { item: "Banners", description: "Peças de apoio para pontos de destaque dentro das lojas." },
      { item: "Camisetas", description: "Uniformes e materiais promocionais para equipe e eventos." }
    ],
    tableData2: [
      { item: "Eventos", description: "Comunicação visual de feirões e ações presenciais." },
      { item: "Comunicação Visual", description: "Sinalização interna e externa das unidades." },
      { item: "Materiais Promocionais", description: "Brindes e peças de apoio a ações comerciais." },
      { item: "Fornecedores", description: "Gestão da produção gráfica junto a parceiros externos." }
    ],
    presenterNotes: "Atuação presencial de PDV e fachadas das unidades."
  },

  // SLIDE 16: 17: Flexibilidade Operacional (17/20)
  {
    id: 16,
    slideNumber: "16 / 19",
    category: "continuidade",
    categoryLabel: "16 / Continuidade",
    title: "FLEXIBILIDADE OPERACIONAL",
    subtitle: "COMO A OPERAÇÃO RESPONDE",
    layoutType: "dual_matrix",
    tableData: [
      { item: "Alterações de campanhas", description: "Ajustes de peças já aprovadas conforme mudança de estratégia comercial." },
      { item: "Mudanças comerciais", description: "Atualização de condições, preços e ofertas em peças já em veiculação." },
      { item: "Troca de veículos", description: "Substituição do produto anunciado sem necessidade de reconstrução da campanha." },
      { item: "Atualizações de taxas", description: "Ajuste de valores financeiros conforme parcerias com bancos." }
    ],
    tableData2: [
      { item: "Urgências", description: "Atendimento a demandas com prazo reduzido, fora do fluxo padrão." },
      { item: "Atendimento fora do horário", description: "Suporte em horários não convencionais quando a operação exige." },
      
      { item: "Suporte contínuo", description: "Disponibilidade permanente da equipe para a operação da Azul Veículos." }
    ],
    presenterNotes: "A agência adapta suas entregas a mudanças rápidas do mercado automotivo."
  },

  // SLIDE 17: 18: Indicadores Operacionais (18/20)
  {
    id: 17,
    slideNumber: "17 / 19",
    category: "indicadores",
    categoryLabel: "17 / Indicadores Operacionais",
    title: "INDICADORES OPERACIONAIS",
    subtitle: "MÉDIAS MENSAIS DE ENTREGAS DA CONTA",
    layoutType: "indicators_table",
    tableHeader1: "PRODUÇÃO PARA REDES SOCIAIS",
    tableData: [
      { item: "Campanhas promocionais", description: "2 / mês" },
      { item: "Conteúdos individuais por loja", description: "12 / mês" },
      { item: "Posts Feed (estáticos & carrosséis)", description: "+30 / mês" },
      { item: "Stories (interativos e ofertas)", description: "+160 / mês" },
      { item: "Peças para Feed (KVs & artes)", description: "+70 / mês" },
      { item: "Conteúdos LinkedIn", description: "8 / mês" }
    ],
    tableHeader2: "PRODUÇÃO CRIATIVA",
    tableData2: [
      { item: "Conceitos criativos & KVs", description: "2 / mês" },
      { item: "Identidade visual de campanhas", description: "2 / mês" },
      { item: "Materiais institucionais", description: "16 / mês" },
      { item: "material offline e produção audiovisual promocionais", description: "30 / mês" },
      { item: "Banners para Website", description: "6 / mês" },
      { item: "Email Marketing (Ferramenta de Inbound Marketing)", description: "4 a 8 / mês" }
    ],
    tableHeader3: "AUDIOVISUAL, TRÁFEGO & TECH",
    tableData3: [
      { item: "Vídeos Mobile Makers", description: "6 a 8 / mês" },
      { item: "Vídeos com Filmmaker profissional", description: "4 / mês" },
      { item: "Google Ads + Meta Ads", description: "+60 anúncios" },
      { item: "Manutenção & Atualizações Web", description: "Contínua" }
    ],
    presenterNotes: "Indicadores operacionais consolidados da conta da Azul Veículos."
  },

  // SLIDE 18: 19: Resumo Executivo (19/20)
  {
    id: 18,
    slideNumber: "18 / 19",
    category: "indicadores",
    categoryLabel: "18 / Síntese",
    title: "RESUMO EXECUTIVO",
    subtitle: "PRINCIPAIS MÉTRICAS DA OPERAÇÃO",
    layoutType: "executive_summary",
    metrics: [
      { value: "+160", numericValue: 160, label: "Stories mensais", category: "Redes Sociais" },
      { value: "+70", numericValue: 70, label: "Peças para Feed", category: "Redes Sociais" },
      { value: "30", numericValue: 30, label: "material offline e produção audiovisual", category: "Criativa" },
      { value: "+60", numericValue: 60, label: "Anúncios gerenciados", category: "Mídia & Tech" },
      { value: "6", numericValue: 6, label: "Banners Website", category: "Mídia & Tech" },
      { value: "16", numericValue: 16, label: "Materiais institucionais", category: "Criativa" },
      { value: "12", numericValue: 12, label: "Conteúdos por loja", category: "Redes Sociais" }
    ],
    presenterNotes: "Visão quantitativa de alto impacto dos números mensais da conta."
  },

  // SLIDE 19: 20: Conclusão (20/20)
  {
    id: 19,
    slideNumber: "19 / 19",
    category: "conclusao",
    categoryLabel: "19 / CONCLUSÃO",
    title: "CONCLUSÃO OPERACIONAL",
    subtitle: "SUPORTE CONTÍNUO E INTEGRAÇÃO 360°",
    layoutType: "conclusion",
    descriptionText: [
      "A operação executada pela Fábrica Publicidade caracteriza-se como uma estrutura integrada de marketing, reunindo estratégia, criação, tecnologia, mídia, produção audiovisual e suporte operacional em um fluxo contínuo de trabalho.",
      "Os indicadores apresentados representam apenas parte da operação, uma vez que uma parcela significativa das atividades envolve planejamento, gestão, atendimento, desenvolvimento tecnológico e acompanhamento estratégico das ações da Azul Veículos.",
      "Essa integração permite maior agilidade, alinhamento entre as áreas e capacidade de adaptação às necessidades comerciais da empresa, garantindo continuidade operacional e suporte permanente às campanhas e iniciativas de marketing."
    ],
    presenterNotes: "Encerramento e consolidação do posicionamento estratégico da agência junto à Azul Veículos."
  }
];
