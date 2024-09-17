// Função de login
async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Autenticar usuário
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Erro no login: " + error.message);
        return;
    }

    // Verificar o tipo de usuário e redirecionar
    const { data: usuario, error: userError } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('email', email)
        .single();

    if (userError || !usuario) {
        alert("Erro ao verificar o tipo de usuário.");
        return;
    }

    const tipoUsuario = usuario.tipo_usuario;

    if (tipoUsuario === 'admin') {
        window.location.href = 'admin.html'; // Redirecionar para página do admin
    } else if (tipoUsuario === 'atendente') {
        window.location.href = 'atendente.html'; // Redirecionar para página do atendente
    } else if (tipoUsuario === 'cliente') {
        window.location.href = 'cliente.html'; // Redirecionar para página do cliente
    } else {
        alert('Tipo de usuário desconhecido.');
    }
}

document.getElementById('login-form').addEventListener('submit', login);
