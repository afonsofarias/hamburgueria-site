import { supabase } from './supabase.js';

// Função para login
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
        document.getElementById('status').innerText = "Erro no login.";
    } else {
        document.getElementById('status').innerText = "Login realizado com sucesso!";
        window.location.href = 'dashboard.html';  // Redirecionar após o login
    }
}

document.getElementById('login-form').addEventListener('submit', login);
