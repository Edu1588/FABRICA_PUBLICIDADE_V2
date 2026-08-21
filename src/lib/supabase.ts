import { createClient } from '@supabase/supabase-js';

// No Supabase, a chave Anon Key é uma chave pública destinada ao frontend (cliente)
// protegida por Row-Level Security (RLS) no PostgreSQL.
const DEFAULT_URL = 'https://vjxuyxszcmlojvincvgp.supabase.co';
const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeHV5eHN6Y21sb2p2aW5jdmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNDYxNTQsImV4cCI6MjA5ODgyMjE1NH0.JkfMRJG7zx97500Gh0D_KLJALoAo1tQnY8L4B4qIbfE';

// @ts-ignore
const envUrl = import.meta.env?.VITE_SUPABASE_URL;
// @ts-ignore
const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = (envUrl && envUrl.startsWith('http')) ? envUrl : DEFAULT_URL;
const supabaseAnonKey = envKey || DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
