
import { supabase } from './supabase.js';

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

// Função para cadastrar novos produtos
async function cadastrarProduto(nome, preco) {
    const { data, error } = await supabase
        .from('produtos')
        .insert([{ nome, preco }]);

    if (error) {
        console.error("Erro ao cadastrar produto:", error);
        return;
    }

    alert("Produto cadastrado com sucesso!");
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

// Inicializar funções ao carregar a página
document.addEventListener('DOMContentLoaded', listarUsuarios);
document.addEventListener('DOMContentLoaded', listarProdutos);
