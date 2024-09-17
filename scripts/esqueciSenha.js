// Função para solicitar a redefinição de senha
async function esqueciSenha(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://hamburgueria-site-ten.vercel.app/pages/resetar-senha.html'  // Link correto para redirecionamento
    });    

    if (error) {
        document.getElementById('message').textContent = "Erro ao enviar email de redefinição: " + error.message;
    } else {
        document.getElementById('message').textContent = "Email de redefinição enviado! Verifique sua caixa de entrada.";
    }
}

document.getElementById('reset-form').addEventListener('submit', esqueciSenha);
