// scripts/supabase.js

// Definindo a URL e a chave do Supabase
const SUPABASE_URL = 'https://kiedafitbtuednyftkuv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZWRhZml0YnR1ZWRueWZ0a3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTY4MDIsImV4cCI6MjA0MjA3MjgwMn0.qdSfW6CfRJ3XVv7UZ_MVW9lWJQrk4TA8pgWRi0BqKKc';

// Conectar ao Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
