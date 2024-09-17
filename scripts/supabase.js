import { createClient } from '@supabase/supabase-js';

// Dados de acesso ao Supabase
const SUPABASE_URL = 'https://kiedafitbtuednyftkuv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZWRhZml0YnR1ZWRueWZ0a3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTY4MDIsImV4cCI6MjA0MjA3MjgwMn0.qdSfW6CfRJ3XVv7UZ_MVW9lWJQrk4TA8pgWRi0BqKKc';

// Inicializar o cliente do Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
