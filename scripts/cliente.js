
import { supabase } from './supabase.js';

// Função para verificar o tipo de usuário e controlar o acesso
async function verificarPermissao() {
    const user = supabase.auth.user();
    if (!user) {
        window.location.href = 'login.html'; // Redirecionar para login se não estiver logado
        return;
    }

    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('email', user.email)
        .single();

    if (error || !usuario) {
        alert('Erro ao verificar o tipo de usuário.');
        return;
    }

    const tipoUsuario = usuario.tipo_usuario;

    // Mostrar opções de acordo com o tipo de usuário
    if (tipoUsuario === 'admin') {
        document.getElementById('admin-link').style.display = 'inline';
    } else if (tipoUsuario === 'atendente') {
        document.getElementById('atendente-link').style.display = 'inline';
    } else {
        // O cliente não precisa de links adicionais
    }
}

// Função para carregar produtos e verificar permissões
async function carregarProdutos() {
    verificarPermissao(); // Verificar permissões antes de carregar

    const { data: produtos, error } = await supabase.from('produtos').select('*');
    if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
    }

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
