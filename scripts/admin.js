import { supabase } from './supabase.js';

// Função para fazer o upload da imagem do produto
async function uploadProductImage(file) {
    const { data, error } = await supabase.storage
        .from('produtos-imagens')
        .upload(`produtos/${file.name}`, file);

    if (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        return null;
    }

    // Obter a URL pública da imagem
    const { publicURL } = supabase.storage
        .from('produtos-imagens')
        .getPublicUrl(`produtos/${file.name}`);

    return publicURL;  // Retorna a URL da imagem
}

// Função para adicionar um produto
async function addProduct(event) {
    event.preventDefault();

    // Coleta dos dados do formulário
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const imagem = document.getElementById('imagem').files[0];

    // Upload da imagem
    const imagem_url = await uploadProductImage(imagem);

    if (!imagem_url) {
        document.getElementById('status').innerText = "Erro ao enviar a imagem.";
        return;
    }

    // Adicionar o produto ao banco de dados
    const { data, error } = await supabase
        .from('produtos')
        .insert([
            { nome, descricao, preco, categoria_id: categoria, imagem_url }
        ]);

    if (error) {
        console.error("Erro ao adicionar produto:", error);
        document.getElementById('status').innerText = "Erro ao adicionar produto.";
    } else {
        document.getElementById('status').innerText = "Produto adicionado com sucesso!";
        document.getElementById('add-product-form').reset();
    }
}

// Adicionar listener ao formulário
document.getElementById('add-product-form').addEventListener('submit', addProduct);

// Função para carregar categorias
async function loadCategories() {
    const { data: categorias, error } = await supabase
        .from('categorias')
        .select('*');

    if (error) {
        console.error("Erro ao carregar categorias:", error);
        return;
    }

    const categoriaSelect = document.getElementById('categoria');
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nome;
        categoriaSelect.appendChild(option);
    });
}

// Carregar as categorias ao carregar a página
window.onload = loadCategories;
