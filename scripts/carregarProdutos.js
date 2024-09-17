// Função para carregar produtos do Supabase
async function carregarProdutos() {
    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*');

    if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
    }

    const productList = document.getElementById('product-list');
    productList.innerHTML = '';  // Limpar a lista antes de carregar os produtos

    // Iterar pelos produtos e adicionar ao HTML
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
        productList.appendChild(li);
    });
}

// Carregar produtos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);
