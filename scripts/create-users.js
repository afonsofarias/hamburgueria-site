import { supabase } from './supabase.js';

let isProcessing = false;  // Variável para evitar múltiplas requisições

// Função para criar um usuário administrador
async function criarUsuarioAdministrador() {
    if (isProcessing) {
        alert("Por favor, aguarde. Já estamos processando.");
        return;
    }
    isProcessing = true;
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
        isProcessing = false;
    }
}

// Função para criar um usuário atendente
async function criarUsuarioAtendente() {
    if (isProcessing) {
        alert("Por favor, aguarde. Já estamos processando.");
        return;
    }
    isProcessing = true;
    try {
        const { data: atendenteUser, error: atendenteError } = await supabase.auth.signUp({
            email: 'atendente@example.com',
            password: 'atendente123'
        });
        if (atendenteError) throw atendenteError;

        await supabase.from('usuarios').insert([
            { user_id: atendenteUser.user.id, nome: 'Atendente', email: 'atendente@example.com', tipo_usuario: 'atendente' }
        ]);

        alert("Usuário atendente criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar atendente:", error);
        alert("Erro ao criar atendente: " + error.message);
    } finally {
        isProcessing = false;
    }
}

// Função para criar um usuário cliente
async function criarUsuarioCliente() {
    if (isProcessing) {
        alert("Por favor, aguarde. Já estamos processando.");
        return;
    }
    isProcessing = true;
    try {
        const { data: clienteUser, error: clienteError } = await supabase.auth.signUp({
            email: 'cliente@example.com',
            password: 'cliente123'
        });
        if (clienteError) throw clienteError;

        await supabase.from('usuarios').insert([
            { user_id: clienteUser.user.id, nome: 'Cliente Teste', email: 'cliente@example.com', tipo_usuario: 'cliente' }
        ]);

        alert("Usuário cliente criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        alert("Erro ao criar cliente: " + error.message);
    } finally {
        isProcessing = false;
    }
}

// Associar cada função ao seu respectivo botão
document.getElementById('criar-admin-btn').addEventListener('click', criarUsuarioAdministrador);
document.getElementById('criar-atendente-btn').addEventListener('click', criarUsuarioAtendente);
document.getElementById('criar-cliente-btn').addEventListener('click', criarUsuarioCliente);
