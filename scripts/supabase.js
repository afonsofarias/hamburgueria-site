// scripts/supabase.js

// Definir a URL e a chave pública do Supabase
const SUPABASE_URL = 'https://kiedafitbtuednyftkuv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Substitua pela sua chave

// Criar cliente Supabase usando o objeto global
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
