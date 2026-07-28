export interface AppClient {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  active: boolean;
  detalhes?: string;
  anexos?: string;
  corCliente?: string;
}

export interface CarouselSlide {
  id: string;
  type: 'capa' | 'veiculo' | 'final';
  
  // Header / text fields
  title: string;          // slide display label in menu
  fabricante?: string;    // manufacturer (VEICULO)
  modelo?: string;        // model (VEICULO)
  descricao?: string;     // description / subtitle (VEICULO/CAPA)
  
  // Capa exclusive fields
  lojasCapa?: string;     // store locations for cover slide

  // Image controls
  imageUrl: string;
  imageFileName?: string;
  zoom: number;
  posX: number;
  posY: number;

  // Conditions
  condicao1Label?: string;
  condicao1Val?: string;
  condicao2Label?: string;
  condicao2Val?: string;
  condicao3Label?: string;
  condicao3Val?: string;
  condicao4Label?: string;
  condicao4Val?: string;

  // Footer
  website: string;
}

export type SlideCategory = 
  | 'capa'
  | 'introducao'
  | 'modelo'
  | 'organizacao'
  | 'estrategia'
  | 'rotina'
  | 'criacao'
  | 'digital'
  | 'performance'
  | 'tecnologia'
  | 'fisica'
  | 'continuidade'
  | 'indicadores'
  | 'conclusao';

export interface TableItem {
  item: string;
  description: string;
  tag?: string;
  value?: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface OrganogramDepartment {
  title: string;
  items: string[];
  icon?: string;
}

export interface MetricItem {
  value: string;
  numericValue?: number;
  label: string;
  category: 'Redes Sociais' | 'Criativa' | 'Mídia & Tech' | 'Audiovisual';
  subtext?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  iconName: string;
  badge: string;
}

export interface SlideData {
  id: number;
  slideNumber: string; // e.g. "01 / 20"
  category: SlideCategory | 'natureza';
  categoryLabel: string;
  title: string;
  subtitle?: string;
  layoutType: 
    | 'hero_title'
    | 'split_text_image'
    | 'nature_grid'
    | 'natureza_operacao'
    | 'connected_flow'
    | 'organogram'
    | 'dual_matrix'
    | 'process_stakeholders'
    | 'design_keyvisual'
    | 'traffic_split'
    | 'tech_web'
    | 'executive_summary'
    | 'indicators_table'
    | 'conclusion';

  descriptionText?: string | string[];

  // Specific payload types
  tableData?: TableItem[];
  tableData2?: TableItem[]; // Dual column matrices
  tableData3?: TableItem[];
  tableHeader1?: string;
  tableHeader2?: string;
  tableHeader3?: string;
  stepItems?: StepItem[];
  stakeholders?: { title: string; text: string }[];
  organogram?: OrganogramDepartment[];
  metrics?: MetricItem[];
  pillars?: PillarItem[];

  // Visual assets
  bgImageUrl?: string;
  cardImages?: string[];

  // Presenter Notes
  presenterNotes?: string;
}

export interface PresentationSettings {
  autoPlay: boolean;
  autoPlayInterval: number; // in seconds
  showNotes: boolean;
  soundEnabled: boolean;
  theme: 'dark_automotive' | 'light_contrast';
}

