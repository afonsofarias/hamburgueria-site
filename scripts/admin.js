
import { supabase } from './supabase.js';

// Função para verificar se o usuário é administrador
async function verificarPermissoesAdmin() {
    const user = supabase.auth.user();
    if (!user) {
        window.location.href = 'login.html'; // Redirecionar se não estiver logado
        return;
    }

    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('email', user.email)
        .single();

    if (error || !usuario || usuario.tipo_usuario !== 'admin') {
        alert('Acesso restrito. Somente administradores podem acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Carregar usuários e produtos se o usuário for administrador
    listarUsuarios();
    listarProdutos();
}

// Função para listar todos os usuários e permitir a promoção
async function listarUsuarios() {
    const { data: usuarios, error } = await supabase.from('usuarios').select('*');
    if (error) {
        console.error("Erro ao carregar usuários:", error);
        return;
    }

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${usuario.email} - ${usuario.tipo_usuario}
            <button onclick="promoverUsuario('${usuario.email}', 'atendente')">Promover a Atendente</button>
            <button onclick="promoverUsuario('${usuario.email}', 'admin')">Promover a Admin</button>
        `;
        userList.appendChild(li);
    });
}

// Função para promover um usuário
async function promoverUsuario(email, novoTipo) {
    const { data, error } = await supabase
        .from('usuarios')
        .update({ tipo_usuario: novoTipo })
        .eq('email', email);

    if (error) {
        alert('Erro ao promover usuário: ' + error.message);
    } else {
        alert('Usuário promovido para ' + novoTipo + ' com sucesso!');
    }
}

// Função para listar produtos
async function listarProdutos() {
    const { data: produtos, error } = await supabase.from('produtos').select('*');
    if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
    }

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.innerHTML = `${produto.nome} - R$${produto.preco}`;
        productList.appendChild(li);
    });
}

// Inicializar a função ao carregar a página
document.addEventListener('DOMContentLoaded', verificarPermissoesAdmin);
