// scripts/supabase.js

// Usando variáveis de ambiente no front-end
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

// Conectar ao Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
