
import { supabase } from './supabase.js';

let cart = [];  // Array para armazenar os itens do carrinho

// Função para login
async function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert("Erro no login: " + error.message);
    } else {
        alert("Login realizado com sucesso!");
        carregarProdutos();
        carregarDadosCliente();  // Carregar os dados do cliente após login
        verificarUsuarioLogado();  // Atualizar a área do usuário
    }
}

// Função para verificar se o usuário está logado
function verificarUsuarioLogado() {
    const user = supabase.auth.user();

    if (user) {
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-area').style.display = 'flex';
        document.getElementById('login-panel').style.display = 'none';
    } else {
        document.getElementById('user-area').style.display = 'none';
        document.getElementById('login-panel').style.display = 'block';
    }
}

// Função de logout
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        alert('Logout realizado com sucesso!');
        verificarUsuarioLogado();
    }
}

// Função para cadastro
async function signup() {
    const email = prompt("Digite seu email:");
    const password = prompt("Digite sua senha:");

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
    } else {
        alert("Cadastro realizado com sucesso! Faça login agora.");
    }
}

// Carregar produtos
async function carregarProdutos() {
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

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    if (!supabase.auth.user()) {
        alert("Você precisa estar logado para adicionar itens ao carrinho.");
        return;
    }

    cart.push({ id, nome, preco });
    atualizarCarrinho();
}

// Atualizar exibição do carrinho
function atualizarCarrinho() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        cartList.appendChild(li);
    });
}

// Função para finalizar o pedido
async function finalizarPedido() {
    if (cart.length === 0) {
        alert("Carrinho vazio.");
        return;
    }

    const { error } = await supabase.from('pedidos').insert([{ itens: cart, status: 'Pendente', cliente_id: supabase.auth.user().id }]);
    if (error) {
        console.error("Erro ao finalizar pedido:", error);
    } else {
        alert("Pedido realizado com sucesso!");
        cart = [];  // Limpar carrinho
        atualizarCarrinho();
    }
}

// Carregar dados do cliente
async function carregarDadosCliente() {
    const user = supabase.auth.user();
    if (!user) return;

    const emailElement = document.getElementById('cliente-email');
    emailElement.textContent = user.email;

    const { data: cliente, error } = await supabase.from('clientes').select('*').eq('user_id', user.id).single();
    if (error || !cliente) {
        console.error("Erro ao carregar dados do cliente:", error);
        return;
    }

    document.getElementById('cliente-endereco').textContent = cliente.endereco;
    carregarHistoricoPedidos();
    carregarCartaoFidelidade();
}

// Carregar histórico de pedidos
async function carregarHistoricoPedidos() {
    const user = supabase.auth.user();
    if (!user) return;

    const { data: pedidos, error } = await supabase.from('pedidos').select('*').eq('cliente_id', user.id);
    if (error) {
        console.error("Erro ao carregar histórico de pedidos:", error);
        return;
    }

    const pedidoList = document.getElementById('pedido-list');
    pedidoList.innerHTML = '';
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.innerHTML = `Pedido #${pedido.id} - ${pedido.status}`;
        pedidoList.appendChild(li);
    });
}

// Carregar pontos do cartão fidelidade
async function carregarCartaoFidelidade() {
    const user = supabase.auth.user();
    if (!user) return;

    const { data: fidelidade, error } = await supabase.from('fidelidade').select('*').eq('cliente_id', user.id).single();
    if (error) {
        console.error("Erro ao carregar cartão fidelidade:", error);
        return;
    }

    document.getElementById('cartao-fidelidade').textContent = fidelidade ? fidelidade.pontos : 0;
}

// Associar os eventos de login, cadastro e finalizar pedido
document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('signup-btn').addEventListener('click', signup);
document.getElementById('finalizar-pedido-btn').addEventListener('click', finalizarPedido);
document.getElementById('logout-btn').addEventListener('click', logout);

// Chamar a função para verificar usuário logado ao carregar a página
verificarUsuarioLogado();
