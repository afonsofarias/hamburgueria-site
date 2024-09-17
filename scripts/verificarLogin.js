// Verificar login e ajustar o menu
async function verificarLogin() {
    const user = supabase.auth.user();

    if (user) {
        // Esconder a opção de login e exibir "Minha Conta"
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('minha-conta-link').style.display = 'inline';

        // Se precisar de logout, aqui adicionamos
        document.getElementById('logout-btn').style.display = 'inline';
        document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
        // Mostrar "Login" e esconder "Minha Conta"
        document.getElementById('login-link').style.display = 'inline';
        document.getElementById('minha-conta-link').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'none';
    }
}

// Função de logout
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html'; // Redirecionar para login após logout
}

// Executa a verificação ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);
