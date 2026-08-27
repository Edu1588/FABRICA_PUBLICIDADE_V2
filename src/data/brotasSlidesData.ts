export type BrotasLayoutType =
  | 'hero_cover'
  | 'dark_centered'
  | 'split_text_photo'
  | 'funnel_vertical'
  | 'flow_horizontal'
  | 'photo_grid'
  | 'hub_spoke'
  | 'cycle_diagram'
  | 'grid_cards'
  | 'levels_bar'
  | 'fan_out'
  | 'before_after'
  | 'mockup_triple'
  | 'comparative_table'
  | 'mockup_system'
  | 'dashboard'
  | 'organogram'
  | 'big_number';

export interface BrotasSlideData {
  id: number;
  slideNumber: string; // e.g. '01 / 39'
  category: string; // e.g. 'institucional', 'problema', 'solucao', etc.
  categoryLabel: string; // Display label e.g. 'Institucional'
  title: string;
  subtitle?: string;
  layoutType: BrotasLayoutType;
  isDark?: boolean; // true for dark background slides
  texts?: string[]; // body text paragraphs
  bullets?: string[]; // bullet point items
  imageSlots?: { id: string; label: string; defaultUrl?: string }[]; // photo upload slots
  diagramData?: any; // specific diagram data
  gridCards?: { icon?: string; title: string; description: string; color?: string }[];
  tableRows?: { col1: string; col2: string; col3?: string; col4?: string }[];
  tableHeaders?: string[];
  bigNumber?: string;
  bigNumberLabel?: string;
  timelineItems?: { label: string; description: string }[];
  orgLevels?: { level: string; items: string[] }[];
  hubCenter?: string;
  hubSpokes?: string[];
  funnelItems?: { label: string; width: string; color: string }[];
  cycleItems?: string[];
  animationType?: 'fade' | 'slide' | 'zoom' | 'stagger';
}

export const BROTAS_SLIDES: BrotasSlideData[] = [
  {
    id: 1,
    slideNumber: '01 / 39',
    category: 'institucional',
    categoryLabel: 'Institucional',
    title: 'BROTAS',
    subtitle: '360°',
    layoutType: 'hero_cover',
    isDark: true,
    texts: [
      '.Conectar a gestão. Organizar a informação',
      '.Comunicar as entregas. Aproximar a população',
      'Prefeitura Municipal de Brotas · Fábrica Publicidade & Digital'
    ],
    imageSlots: [{ id: 'capa-bg', label: 'Foto Territorial Brotas', defaultUrl: '/images/brotas/brotas_cover.jpg' }],
    animationType: 'fade'
  },
  {
    id: 2,
    slideNumber: '02 / 39',
    category: 'problema',
    categoryLabel: 'Problema',
    title: 'Quanto do que a Prefeitura faz a população conhece?',
    layoutType: 'split_text_photo',
    isDark: false,
    texts: [
      'Entregas acontecem todos os dias — mas sem comunicação estruturada, a percepção pública não acompanha a realidade da gestão.',
      'Obras, melhorias na saúde, valorização da educação e eventos muitas vezes passam despercebidos pela maioria dos cidadãos.'
    ],
    imageSlots: [{ id: 'img-slide2', label: 'Brotas Lagoa / Paisagem', defaultUrl: '/images/brotas/brotas_cover.jpg' }],
    animationType: 'slide'
  },
  {
    id: 3,
    slideNumber: '03 / 39',
    category: 'problema',
    categoryLabel: 'Problema',
    title: 'A comunicação pública hoje',
    layoutType: 'split_text_photo',
    texts: [
      'Sem diagnóstico contínuo de imagem e percepção pública',
      'Publicações esporádicas e sem planejamento editorial integrado',
      'Redes sociais sem gestão profissional e métricas de desempenho',
      'Ausência de identidade visual e tom de voz unificados para o município',
      'Equipe interna sobrecarregada e sem ferramentas tecnológicas modernas'
    ],
    imageSlots: [{ id: 'img-problema', label: 'Comunicação Pública', defaultUrl: '/images/brotas/brotas_cover.jpg' }],
    animationType: 'slide'
  },
  {
    id: 4,
    slideNumber: '04 / 39',
    category: 'problema',
    categoryLabel: 'Problema',
    title: 'O que isso custa?',
    layoutType: 'split_text_photo',
    texts: ['População desinformada sobre obras e serviços entregues', 'Crises mal gerenciadas que geram dano à imagem', 'Perda de capital político por falta de visibilidade', 'Decisões sem dados — comunicação por intuição', 'Oportunidades de captação de recursos desperdiçadas'],
    imageSlots: [{ id: 'img-custo', label: 'Photo illustrating consequences' }],
    animationType: 'slide'
  },
  {
    id: 5,
    slideNumber: '05 / 39',
    category: 'problema',
    categoryLabel: 'Problema',
    title: 'Funil de Percepção — Onde as entregas se perdem',
    layoutType: 'funnel_vertical',
    funnelItems: [
      { label: '100 ações realizadas', width: '100%', color: '#1B9C4F' },
      { label: '40 divulgadas', width: '70%', color: '#22C55E' },
      { label: '15 compreendidas', width: '50%', color: '#FFB800' },
      { label: '5 lembradas pelo eleitor', width: '30%', color: '#E53E3E' }
    ],
    animationType: 'stagger'
  },
  {
    id: 6,
    slideNumber: '06 / 39',
    category: 'solucao',
    categoryLabel: 'Solução',
    title: 'Brotas 360° — A resposta',
    layoutType: 'flow_horizontal',
    texts: ['Um sistema integrado que cobre diagnóstico de imagem, planejamento editorial, produção de conteúdo, gestão de crise, inteligência de dados e relacionamento com a comunidade.'],
    diagramData: { flowItems: ['Diagnóstico', 'Planejamento', 'Produção', 'Distribuição', 'Mensuração', 'Otimização'] },
    animationType: 'stagger'
  },
  {
    id: 7,
    slideNumber: '07 / 39',
    category: 'solucao',
    categoryLabel: 'Solução',
    title: 'O que é o Brotas 360°?',
    layoutType: 'photo_grid',
    texts: ['Não é apenas um contrato de publicidade — é uma plataforma de comunicação estratégica, territorial e baseada em dados.'],
    imageSlots: [
      { id: 'grid-1', label: 'Photo of Brotas 1' },
      { id: 'grid-2', label: 'Photo of Brotas 2' },
      { id: 'grid-3', label: 'Photo of Brotas 3' },
      { id: 'grid-4', label: 'Photo of Brotas 4' },
      { id: 'grid-5', label: 'Photo of Brotas 5' }
    ],
    animationType: 'stagger'
  },
  {
    id: 8,
    slideNumber: '08 / 39',
    category: 'solucao',
    categoryLabel: 'Solução',
    title: 'Os Pilares da Solução',
    layoutType: 'hub_spoke',
    hubCenter: 'BROTAS 360°',
    hubSpokes: ['Diagnóstico & Pesquisa', 'Planejamento Estratégico', 'Identidade Visual & Tom de Voz', 'Produção de Conteúdo', 'Gestão de Redes Sociais', 'Assessoria de Imprensa', 'Gestão de Crise', 'Inteligência de Dados', 'Relacionamento Comunitário'],
    animationType: 'zoom'
  },
  {
    id: 9,
    slideNumber: '09 / 39',
    category: 'solucao',
    categoryLabel: 'Solução',
    title: 'Ecossistema Brotas 360°',
    layoutType: 'hub_spoke',
    hubCenter: 'BROTAS 360°',
    hubSpokes: ['Diagnóstico', 'Planejamento', 'Criação', 'Conteúdo', 'Redes Sociais', 'Imprensa', 'Crise', 'Dados', 'Comunidade'],
    animationType: 'zoom'
  },
  {
    id: 10,
    slideNumber: '10 / 39',
    category: 'metodologia',
    categoryLabel: 'Metodologia',
    title: 'Ciclo de Trabalho Contínuo',
    layoutType: 'cycle_diagram',
    cycleItems: ['1. Diagnóstico', '2. Planejamento', '3. Criação', '4. Produção', '5. Distribuição', '6. Monitoramento', '7. Análise', '8. Otimização', '9. Relatório'],
    animationType: 'stagger'
  },
  {
    id: 11,
    slideNumber: '11 / 39',
    category: 'metodologia',
    categoryLabel: 'Metodologia',
    title: 'Da Pesquisa à Ação — Funil Estratégico',
    layoutType: 'funnel_vertical',
    funnelItems: [
      { label: 'Pesquisa & Diagnóstico', width: '30%', color: '#1B9C4F' },
      { label: 'Planejamento & Estratégia', width: '50%', color: '#22C55E' },
      { label: 'Produção & Conteúdo', width: '70%', color: '#FFB800' },
      { label: 'Distribuição & Impacto', width: '100%', color: '#2563EB' }
    ],
    animationType: 'stagger'
  },
  {
    id: 12,
    slideNumber: '12 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Diagnóstico de Imagem & Pesquisa',
    layoutType: 'split_text_photo',
    texts: ['Pesquisa quantitativa e qualitativa com a população', 'Análise de percepção por bairro, faixa etária e tema', 'Relatório de diagnóstico com mapa de oportunidades', 'Benchmark: o que outras prefeituras do porte fazem bem'],
    imageSlots: [{ id: 'img-diag', label: 'Research/data photo' }],
    animationType: 'slide'
  },
  {
    id: 13,
    slideNumber: '13 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Planejamento Editorial & Calendário',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Calendário Mensal', description: 'Pautas organizadas por secretaria', icon: 'Calendar' },
      { title: 'Editorias Fixas', description: 'Saúde, Educação, Obras, Cultura, Esporte', icon: 'Layout' },
      { title: 'Datas Comemorativas', description: 'Integradas ao calendário nacional e local', icon: 'Star' },
      { title: 'Pautas Emergenciais', description: 'Protocolo para conteúdos urgentes', icon: 'AlertTriangle' },
      { title: 'Aprovação Digital', description: 'Fluxo de aprovação com gabinete', icon: 'CheckCircle' },
      { title: 'Relatório Mensal', description: 'Desempenho x planejado', icon: 'BarChart' }
    ],
    animationType: 'stagger'
  },
  {
    id: 14,
    slideNumber: '14 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Conteúdo em 3 Níveis',
    layoutType: 'levels_bar',
    diagramData: {
      levels: [
        { label: 'Level 1 Informativo: O quê foi feito', color: '#1B9C4F' },
        { label: 'Level 2 Educativo: Por quê importa', color: '#FFB800' },
        { label: 'Level 3 Emocional: Como impacta a vida', color: '#E53E3E' }
      ]
    },
    animationType: 'stagger'
  },
  {
    id: 15,
    slideNumber: '15 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Identidade Visual & Tom de Voz',
    layoutType: 'split_text_photo',
    texts: ['Manual de marca da Prefeitura — logotipo, paleta, tipografia', 'Tom de voz: próximo, respeitoso, claro', 'Templates padronizados para redes sociais', 'Sinalização visual para obras e eventos'],
    imageSlots: [{ id: 'img-id', label: 'Branding materials photo' }],
    animationType: 'slide'
  },
  {
    id: 16,
    slideNumber: '16 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Produção de Conteúdo Multiplataforma',
    layoutType: 'split_text_photo',
    texts: ['Posts para Instagram, Facebook, TikTok', 'Vídeos curtos (Reels, Shorts) — até X por mês', 'Vídeos institucionais e documentários curtos', 'Fotografia profissional de eventos e obras', 'Textos para site e releases de imprensa'],
    imageSlots: [{ id: 'img-prod', label: 'Content production photo' }],
    animationType: 'slide'
  },
  {
    id: 17,
    slideNumber: '17 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Onde o conteúdo chega',
    layoutType: 'fan_out',
    diagramData: { fanItems: ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'Site da Prefeitura', 'WhatsApp Comunidades', 'Rádio Local', 'Jornal / Assessoria'] },
    animationType: 'stagger'
  },
  {
    id: 18,
    slideNumber: '18 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Gestão Profissional de Redes Sociais',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Calendário de Posts', description: 'Agendamento e organização semanal', icon: 'Calendar' },
      { title: 'Comunidade', description: 'Resposta a comentários e mensagens', icon: 'MessageCircle' },
      { title: 'Análise de Dados', description: 'Relatórios mensais de desempenho', icon: 'TrendingUp' },
      { title: 'Impulsionamento', description: 'Mídia paga segmentada por região', icon: 'Zap' },
      { title: 'Reputação', description: 'Monitoramento de menções e sentimento', icon: 'Shield' },
      { title: 'Benchmarking', description: 'Comparação com municípios similares', icon: 'Target' }
    ],
    animationType: 'stagger'
  },
  {
    id: 19,
    slideNumber: '19 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Assessoria de Imprensa & Relações Públicas',
    layoutType: 'split_text_photo',
    texts: ['Produção de releases e notas oficiais', 'Relacionamento com veículos regionais e estaduais', 'Media training para prefeito e secretários', 'Cobertura de eventos institucionais', 'Clipping e relatório de exposição na mídia'],
    imageSlots: [{ id: 'img-pr', label: 'Press/media photo' }],
    animationType: 'slide'
  },
  {
    id: 20,
    slideNumber: '20 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Gestão de Crise & Comunicação Sensível',
    layoutType: 'mockup_triple',
    texts: ['Protocolo de resposta em até 2 horas', 'Matriz de risco por secretaria', 'Monitoramento de redes 24/7', 'Preparação de Q&A para temas sensíveis'],
    imageSlots: [
      { id: 'mock-1', label: 'Mockup screen 1' },
      { id: 'mock-2', label: 'Mockup screen 2' },
      { id: 'mock-3', label: 'Mockup screen 3' }
    ],
    animationType: 'slide'
  },
  {
    id: 21,
    slideNumber: '21 / 39',
    category: 'produto',
    categoryLabel: 'Produto',
    title: 'Relacionamento com a Comunidade',
    layoutType: 'split_text_photo',
    texts: ['Ouvidoria digital integrada às redes sociais', 'Programa Prefeitura nos Bairros — cobertura presencial', 'Pesquisas de satisfação trimestrais', 'Canal direto com lideranças comunitárias'],
    imageSlots: [{ id: 'img-com', label: 'Community engagement photo' }],
    animationType: 'slide'
  },
  {
    id: 22,
    slideNumber: '22 / 39',
    category: 'inteligencia',
    categoryLabel: 'Inteligência',
    title: 'Inteligência de Dados & Métricas',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Dashboard em Tempo Real', description: 'Métricas de alcance e engajamento', icon: 'Monitor' },
      { title: 'Relatório Mensal', description: 'KPIs comparativos mês a mês', icon: 'FileText' },
      { title: 'Mapa de Sentimento', description: 'Análise de percepção por tema', icon: 'Map' },
      { title: 'Alertas Automáticos', description: 'Notificações de crises em formação', icon: 'Bell' },
      { title: 'Análise de Concorrentes', description: 'Benchmarking político regional', icon: 'Users' },
      { title: 'Relatório de ROI', description: 'Retorno sobre investimento em comunicação', icon: 'DollarSign' }
    ],
    animationType: 'stagger'
  },
  {
    id: 23,
    slideNumber: '23 / 39',
    category: 'inteligencia',
    categoryLabel: 'Inteligência',
    title: 'Antes vs. Depois do Brotas 360°',
    layoutType: 'comparative_table',
    tableHeaders: ['Indicador', 'Situação Atual', 'Com Brotas 360°'],
    tableRows: [
      { col1: 'Alcance em redes sociais', col2: 'Orgânico limitado', col3: '5x maior com estratégia' },
      { col1: 'Tempo de resposta a crises', col2: 'Dias ou sem resposta', col3: 'Protocolo de até 2h' },
      { col1: 'Pesquisa de percepção', col2: 'Inexistente', col3: 'Trimestral com relatório' },
      { col1: 'Identidade visual', col2: 'Fragmentada', col3: 'Manual único aplicado' },
      { col1: 'Planejamento editorial', col2: 'Inexistente', col3: 'Calendário mensal aprovado' },
      { col1: 'Cobertura de imprensa', col2: 'Pontual', col3: 'Proativa e monitorada' }
    ],
    animationType: 'stagger'
  },
  {
    id: 24,
    slideNumber: '24 / 39',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    title: 'Plataforma Digital de Gestão',
    layoutType: 'mockup_system',
    texts: ['Portal do cidadão', 'Painel administrativo', 'App mobile de notícias'],
    imageSlots: [{ id: 'mock-sys', label: 'system mockup screenshots' }],
    animationType: 'slide'
  },
  {
    id: 25,
    slideNumber: '25 / 39',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    title: 'Ecossistema Tecnológico',
    layoutType: 'hub_spoke',
    hubCenter: 'Portal Brotas',
    hubSpokes: ['CMS de Conteúdo', 'Analytics Dashboard', 'Chatbot de Atendimento', 'App Mobile', 'Integração WhatsApp', 'Mapa Interativo'],
    animationType: 'zoom'
  },
  {
    id: 26,
    slideNumber: '26 / 39',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    title: 'Dashboard de Resultados',
    layoutType: 'dashboard',
    gridCards: [
      { title: 'Alcance Total', description: '250K+ pessoas/mês', icon: 'Eye', color: '#1B9C4F' },
      { title: 'Engajamento', description: '15% taxa média', icon: 'Heart', color: '#E53E3E' },
      { title: 'Tempo de Resposta', description: '<2h para crises', icon: 'Clock', color: '#FFB800' },
      { title: 'Satisfação', description: '85% aprovação', icon: 'ThumbsUp', color: '#2563EB' },
      { title: 'Matérias na Mídia', description: '30+ por mês', icon: 'Newspaper', color: '#8B5CF6' },
      { title: 'Economia Estimada', description: 'R$ 200K/mês em mídia espontânea', icon: 'PiggyBank', color: '#EC4899' }
    ],
    animationType: 'stagger'
  },
  {
    id: 27,
    slideNumber: '27 / 39',
    category: 'produtos',
    categoryLabel: 'Produtos',
    title: 'Pacote de Entregas Mensais',
    layoutType: 'comparative_table',
    tableHeaders: ['Entrega', 'Quantidade', 'Detalhamento'],
    tableRows: [
      { col1: 'Posts para redes sociais', col2: '40-60/mês', col3: 'Feed + Stories + Reels' },
      { col1: 'Vídeos curtos', col2: '8-12/mês', col3: 'Reels e Shorts (até 60s)' },
      { col1: 'Vídeos institucionais', col2: '1-2/mês', col3: 'Documentários curtos (3-5min)' },
      { col1: 'Cobertura fotográfica', col2: '4-6 eventos/mês', col3: 'Ensaio profissional editado' },
      { col1: 'Releases de imprensa', col2: '8-10/mês', col3: 'Distribuição regional e estadual' },
      { col1: 'Relatório de métricas', col2: '1/mês', col3: 'Dashboard + apresentação executiva' },
      { col1: 'Pesquisa de percepção', col2: '1/trimestre', col3: 'Quantitativa + qualitativa' }
    ],
    animationType: 'stagger'
  },
  {
    id: 28,
    slideNumber: '28 / 39',
    category: 'operacao',
    categoryLabel: 'Operação',
    title: 'Fluxo de Trabalho & Aprovação',
    layoutType: 'flow_horizontal',
    texts: ['Cada peça passa por revisão técnica e aprovação do gabinete antes da publicação.'],
    diagramData: { flowItems: ['Pauta', 'Criação', 'Revisão', 'Aprovação', 'Publicação', 'Análise'] },
    animationType: 'stagger'
  },
  {
    id: 29,
    slideNumber: '29 / 39',
    category: 'impacto',
    categoryLabel: 'Impacto',
    title: 'Impacto Projetado no 1° Ano',
    layoutType: 'big_number',
    bigNumber: '360°',
    bigNumberLabel: 'de cobertura da comunicação municipal',
    texts: ['Todos os bairros. Todas as secretarias. Todas as plataformas.'],
    animationType: 'zoom'
  },
  {
    id: 30,
    slideNumber: '30 / 39',
    category: 'equipe',
    categoryLabel: 'Equipe',
    title: 'Estrutura da Equipe',
    layoutType: 'organogram',
    orgLevels: [
      { level: 'Direção', items: ['Diretor de Conta', 'Diretor Criativo'] },
      { level: 'Coordenação', items: ['Social Media', 'Assessoria de Imprensa', 'Produção Audiovisual', 'Tecnologia'] },
      { level: 'Operação', items: ['Designers', 'Redatores', 'Fotógrafos', 'Videomakers', 'Analistas de Dados', 'Desenvolvedores'] }
    ],
    animationType: 'stagger'
  },
  {
    id: 31,
    slideNumber: '31 / 39',
    category: 'cronograma',
    categoryLabel: 'Cronograma',
    title: 'Cronograma de Implantação',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Mês 1-2', description: 'Diagnóstico, pesquisa e planejamento estratégico', icon: 'Search', color: '#1B9C4F' },
      { title: 'Mês 2-3', description: 'Identidade visual, manual de marca e templates', icon: 'Palette', color: '#FFB800' },
      { title: 'Mês 3-4', description: 'Início da produção de conteúdo e gestão de redes', icon: 'Play', color: '#2563EB' },
      { title: 'Mês 4-6', description: 'Operação plena + 1ª pesquisa de percepção', icon: 'Rocket', color: '#E53E3E' },
      { title: 'Mês 6-9', description: 'Otimização baseada em dados + expansão de canais', icon: 'TrendingUp', color: '#8B5CF6' },
      { title: 'Mês 9-12', description: 'Consolidação + relatório anual de impacto', icon: 'Award', color: '#EC4899' }
    ],
    animationType: 'stagger'
  },
  {
    id: 32,
    slideNumber: '32 / 39',
    category: 'cronograma',
    categoryLabel: 'Cronograma',
    title: 'Linha do Tempo — Primeiros 90 Dias',
    layoutType: 'flow_horizontal',
    diagramData: { flowItems: ['Semana 1-2\nKickoff & Briefing', 'Semana 3-4\nDiagnóstico', 'Semana 5-6\nEstratégia', 'Semana 7-8\nIdentidade Visual', 'Semana 9-10\nConteúdo Piloto', 'Semana 11-12\nOperação Plena'] },
    animationType: 'stagger'
  },
  {
    id: 33,
    slideNumber: '33 / 39',
    category: 'cronograma',
    categoryLabel: 'Cronograma',
    title: 'Calendário de Entregas — Mês a Mês',
    layoutType: 'flow_horizontal',
    diagramData: { flowItems: ['Janeiro\nDiagnóstico', 'Fevereiro\nPlanejamento', 'Março\nIdentidade', 'Abril\nConteúdo', 'Maio\nOtimização', 'Junho\nRelatório'] },
    animationType: 'stagger'
  },
  {
    id: 34,
    slideNumber: '34 / 39',
    category: 'investimento',
    categoryLabel: 'Investimento',
    title: 'Investimento Mensal',
    layoutType: 'big_number',
    bigNumber: 'R$ XX.XXX',
    bigNumberLabel: 'por mês · contrato de 12 meses',
    texts: ['Inclui equipe dedicada, ferramentas, produção audiovisual e mídia de performance.'],
    animationType: 'zoom'
  },
  {
    id: 35,
    slideNumber: '35 / 39',
    category: 'investimento',
    categoryLabel: 'Investimento',
    title: 'O que está incluso',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Equipe Dedicada', description: '8+ profissionais alocados', icon: 'Users' },
      { title: 'Ferramentas Premium', description: 'Design, analytics, agendamento', icon: 'Wrench' },
      { title: 'Produção Completa', description: 'Foto, vídeo, design, redação', icon: 'Film' },
      { title: 'Mídia de Performance', description: 'Budget mensal para impulsionamento', icon: 'Zap' },
      { title: 'Pesquisas', description: 'Trimestrais de percepção pública', icon: 'ClipboardList' },
      { title: 'Tecnologia', description: 'Portal, dashboard, chatbot', icon: 'Cpu' }
    ],
    animationType: 'stagger'
  },
  {
    id: 36,
    slideNumber: '36 / 39',
    category: 'diferenciais',
    categoryLabel: 'Diferenciais',
    title: 'Por que a Fábrica?',
    layoutType: 'grid_cards',
    gridCards: [
      { title: 'Experiência Municipal', description: '10+ anos em comunicação pública', icon: 'Award' },
      { title: 'Equipe Multidisciplinar', description: 'Criativos, analistas e estrategistas', icon: 'Users' },
      { title: 'Tecnologia Proprietária', description: 'Dashboards e automações próprias', icon: 'Code' },
      { title: 'Proximidade', description: 'Equipe presencial em Brotas', icon: 'MapPin' },
      { title: 'Resultados Mensuráveis', description: 'KPIs claros e relatórios transparentes', icon: 'Target' },
      { title: 'Compromisso', description: 'Contrato com metas e entregas definidas', icon: 'Handshake' }
    ],
    animationType: 'stagger'
  },
  {
    id: 37,
    slideNumber: '37 / 39',
    category: 'diferenciais',
    categoryLabel: 'Diferenciais',
    title: 'Comparativo de Soluções',
    layoutType: 'comparative_table',
    tableHeaders: ['Critério', 'Equipe Interna', 'Freelancers', 'Brotas 360°'],
    tableRows: [
      { col1: 'Estratégia integrada', col2: '❌ Fragmentada', col3: '❌ Pontual', col4: '✅ 360° completa' },
      { col1: 'Equipe dedicada', col2: '⚠️ Limitada', col3: '❌ Rotativa', col4: '✅ 8+ profissionais' },
      { col1: 'Inteligência de dados', col2: '❌ Manual', col3: '❌ Inexistente', col4: '✅ Dashboard em tempo real' },
      { col1: 'Gestão de crise', col2: '⚠️ Improvisada', col3: '❌ Sem suporte', col4: '✅ Protocolo 24/7' },
      { col1: 'Custo-benefício', col2: '⚠️ Alto custo fixo', col3: '⚠️ Imprevisível', col4: '✅ Previsível e escalável' }
    ],
    animationType: 'stagger'
  },
  {
    id: 38,
    slideNumber: '38 / 39',
    category: 'citacao',
    categoryLabel: '',
    title: 'Comunicação não é gasto. É o investimento mais visível que um governo pode fazer.',
    subtitle: '— Fábrica Publicidade & Digital',
    layoutType: 'dark_centered',
    isDark: true,
    animationType: 'fade'
  },
  {
    id: 39,
    slideNumber: '39 / 39',
    category: 'obrigado',
    categoryLabel: '',
    title: 'Obrigado.',
    subtitle: 'Vamos construir juntos a comunicação que Brotas merece.',
    layoutType: 'hero_cover',
    isDark: true,
    texts: ['contato@fabricapublicidade.com.br', 'fabricapublicidade.com.br', '+55 14 XXXX-XXXX'],
    imageSlots: [{ id: 'bg-closing', label: 'Brotas landscape closing photo' }],
    animationType: 'fade'
  }
];
