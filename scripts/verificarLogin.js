import { supabase } from './supabase.js';

async function verificarLogin() {
    const user = supabase.auth.user();
    if (!user) {
        window.location.href = 'login.html'; // Redirecionar para login se não estiver logado
    }
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);
