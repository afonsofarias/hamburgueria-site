
import { supabase } from './supabase.js';

// Função para login
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
        document.getElementById('status').innerText = "Erro no login.";
    } else {
        // Após o login, buscar o tipo de usuário no banco de dados
        const { data: usuario, error: usuarioError } = await supabase
            .from('usuarios')
            .select('tipo_usuario')
            .eq('email', email)
            .single();

        if (usuarioError || !usuario) {
            document.getElementById('status').innerText = "Erro ao verificar o tipo de usuário.";
        } else {
            const tipoUsuario = usuario.tipo_usuario;
            document.getElementById('status').innerText = "Login realizado com sucesso!";
            
            // Redirecionar com base no tipo de usuário
            if (tipoUsuario === 'admin') {
                window.location.href = 'admin.html';
            } else if (tipoUsuario === 'atendente') {
                window.location.href = 'atendente.html';
            } else {
                window.location.href = 'cliente.html';
            }
        }
    }
}

document.getElementById('login-form').addEventListener('submit', login);
