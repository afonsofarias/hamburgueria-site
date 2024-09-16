import { supabase } from './supabase.js';

async function fetchProducts() {
    let { data: produtos, error } = await supabase
        .from('produtos')
        .select('*');
    
    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return;
    }

    const menuSection = document.querySelector('ul');
    menuSection.innerHTML = '';  // Limpa a lista antes de exibir

    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.innerHTML = `${produto.nome} - R$ ${produto.preco.toFixed(2)} <button onclick="addToCart('${produto.nome}', ${produto.preco})">Adicionar ao carrinho</button>`;
        menuSection.appendChild(li);
    });
}

// Chamar a função ao carregar a página
fetchProducts();
