import { supabase } from './supabase.js';

// Função para redefinir a senha
async function redefinirSenha(event) {
    event.preventDefault();

    const novaSenha = document.getElementById('nova-senha').value;

    const { error } = await supabase.auth.updateUser({
        password: novaSenha
    });

    if (error) {
        document.getElementById('message').textContent = "Erro ao redefinir senha: " + error.message;
    } else {
        document.getElementById('message').textContent = "Senha redefinida com sucesso! Você pode fazer login com sua nova senha.";
        window.location.href = 'login.html'; // Redirecionar para a página de login
    }
}

document.getElementById('reset-password-form').addEventListener('submit', redefinirSenha);
