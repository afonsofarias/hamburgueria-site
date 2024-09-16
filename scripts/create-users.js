import { supabase } from './supabase.js';

// Função para cadastrar usuários
async function criarUsuarios() {
    // Criar um usuário administrador
    const { data: adminUser, error: adminError } = await supabase.auth.signUp({
        email: 'admin@example.com',
        password: 'admin123'
    });
    if (adminError) console.error("Erro ao criar administrador:", adminError);
    else console.log("Administrador criado:", adminUser);

    // Criar um usuário atendente
    const { data: atendenteUser, error: atendenteError } = await supabase.auth.signUp({
        email: 'atendente@example.com',
        password: 'atendente123'
    });
    if (atendenteError) console.error("Erro ao criar atendente:", atendenteError);
    else console.log("Atendente criado:", atendenteUser);

    // Criar um cliente de teste
    const { data: clienteUser, error: clienteError } = await supabase.auth.signUp({
        email: 'cliente@example.com',
        password: 'cliente123'
    });
    if (clienteError) console.error("Erro ao criar cliente:", clienteError);
    else console.log("Cliente criado:", clienteUser);

    // Inserir os usuários na tabela `usuarios` com seus tipos
    await supabase.from('usuarios').insert([
        { user_id: adminUser.user.id, nome: 'Administrador', email: 'admin@example.com', tipo_usuario: 'admin' },
        { user_id: atendenteUser.user.id, nome: 'Atendente', email: 'atendente@example.com', tipo_usuario: 'atendente' },
        { user_id: clienteUser.user.id, nome: 'Cliente Teste', email: 'cliente@example.com', tipo_usuario: 'cliente' }
    ]);
}

// Chamar a função para criar os usuários
criarUsuarios();
