import { supabase } from './supabase.js';

async function fetchProducts() {
    console.log("Função fetchProducts foi chamada");

    let { data: produtos, error } = await supabase
        .from('produtos')
        .select('*');

    if (error) {
        console.error("Erro ao buscar produtos:", error); // Exibe erro no console
        return;
    }

    console.log("Produtos recebidos do Supabase:", produtos); // Exibe os produtos recebidos

    const menuSection = document.getElementById('menu-list');
    menuSection.innerHTML = '';  // Limpa a lista antes de exibir

    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.innerHTML = `${produto.nome} - R$ ${produto.preco.toFixed(2)} <button onclick="addToCart('${produto.nome}', ${produto.preco})">Adicionar ao carrinho</button>`;
        menuSection.appendChild(li);
    });
}

// Chamar a função ao carregar a página
fetchProducts();
