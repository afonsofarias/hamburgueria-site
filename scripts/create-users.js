import { supabase } from './supabase.js';

// Variável de controle para evitar múltiplas requisições
let isProcessing = false;

// Função para cadastrar o administrador, atendente e cliente
async function criarUsuarios() {
    if (isProcessing) {
        alert("Por favor, aguarde. Já estamos processando.");
        return;
    }
    
    isProcessing = true;  // Bloqueia múltiplas requisições
    try {
        // Criar um usuário administrador
        const { data: adminUser, error: adminError } = await supabase.auth.signUp({
            email: 'admin@example.com',
            password: 'admin123'
        });
        if (adminError) throw adminError;

        // Criar um usuário atendente
        const { data: atendenteUser, error: atendenteError } = await supabase.auth.signUp({
            email: 'atendente@example.com',
            password: 'atendente123'
        });
        if (atendenteError) throw atendenteError;

        // Criar um cliente de teste
        const { data: clienteUser, error: clienteError } = await supabase.auth.signUp({
            email: 'cliente@example.com',
            password: 'cliente123'
        });
        if (clienteError) throw clienteError;

        // Inserir os usuários na tabela `usuarios` com seus tipos
        await supabase.from('usuarios').insert([
            { user_id: adminUser.user.id, nome: 'Administrador', email: 'admin@example.com', tipo_usuario: 'admin' },
            { user_id: atendenteUser.user.id, nome: 'Atendente', email: 'atendente@example.com', tipo_usuario: 'atendente' },
            { user_id: clienteUser.user.id, nome: 'Cliente Teste', email: 'cliente@example.com', tipo_usuario: 'cliente' }
        ]);

        alert("Usuários criados com sucesso!");
    } catch (error) {
        console.error("Erro ao criar usuários:", error);
        alert("Erro ao criar usuários: " + error.message);
    } finally {
        isProcessing = false;  // Libera o bloqueio após o processamento
    }
}

// Associar o botão ao evento de criar usuários
document.getElementById('criar-usuarios-btn').addEventListener('click', criarUsuarios);
