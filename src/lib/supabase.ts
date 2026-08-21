import { createClient, SupabaseClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.warn('Variáveis de ambiente do Supabase não encontradas ou inválidas. Funcionalidades de banco desabilitadas.');
}

export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
