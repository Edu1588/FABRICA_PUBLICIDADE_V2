-- Tabela de Clientes
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logoUrl TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Slides do Carrossel
CREATE TABLE public.slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('capa', 'veiculo', 'final')),
  title TEXT NOT NULL,
  fabricante TEXT,
  modelo TEXT,
  descricao TEXT,
  lojasCapa TEXT,
  imageUrl TEXT,
  zoom NUMERIC DEFAULT 1,
  posX NUMERIC DEFAULT 0,
  posY NUMERIC DEFAULT 0,
  condicao1Label TEXT,
  condicao1Val TEXT,
  condicao2Label TEXT,
  condicao2Val TEXT,
  condicao3Label TEXT,
  condicao3Val TEXT,
  condicao4Label TEXT,
  condicao4Val TEXT,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas de Segurança (Opcional para testes iniciais)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir acesso público de leitura e escrita (apenas para testes)" ON public.clients FOR ALL USING (true);
CREATE POLICY "Permitir acesso público de leitura e escrita (apenas para testes)" ON public.slides FOR ALL USING (true);

-- Tabela de Apresentações Institucionais
CREATE TABLE IF NOT EXISTS public.presentations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  slide_count INTEGER DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Lâminas e Imagens das Apresentações
CREATE TABLE IF NOT EXISTS public.presentation_slides (
  presentation_id TEXT PRIMARY KEY REFERENCES public.presentations(id) ON DELETE CASCADE,
  slides_payload JSONB NOT NULL,
  images_payload JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presentation_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso público leitura e escrita apresentações" ON public.presentations FOR ALL USING (true);
CREATE POLICY "Acesso público leitura e escrita lâminas apresentações" ON public.presentation_slides FOR ALL USING (true);

