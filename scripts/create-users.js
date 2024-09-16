import { supabase } from './supabase.js';

// Variável de controle para evitar múltiplas requisições
let isProcessing = false;

// Função para cadastrar o administrador
async function criarUsuarioAdministrador() {
    if (isProcessing) {
        alert("Por favor, aguarde. Já estamos processando.");
        return;
    }
    
    isProcessing = true;  // Bloqueia múltiplas requisições
    try {
        const { data: adminUser, error: adminError } = await supabase.auth.signUp({
            email: 'admin@example.com',
            password: 'admin123'
        });
        if (adminError) throw adminError;

        await supabase.from('usuarios').insert([
            { user_id: adminUser.user.id, nome: 'Administrador', email: 'admin@example.com', tipo_usuario: 'admin' }
        ]);

        alert("Usuário administrador criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar administrador:", error);
        alert("Erro ao criar administrador: " + error.message);
    } finally {
        isProcessing = false;  // Libera o bloqueio após o processamento
    }
}

// Associar o botão ao evento de criar usuário
document.getElementById('criar-usuarios-btn').addEventListener('click', criarUsuarioAdministrador);
