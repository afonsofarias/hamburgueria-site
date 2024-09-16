
import { supabase } from './supabase.js';

// Função para verificar se o usuário está logado e redirecionar para login se não estiver
async function verificarLogin() {
    const user = supabase.auth.user();
    if (!user) {
        window.location.href = 'login.html'; // Redirecionar se não estiver logado
        return;
    }
}

// Função para carregar os dados do cliente
async function carregarDadosCliente() {
    verificarLogin(); // Verificar login antes de carregar

    const user = supabase.auth.user();
    const { data: cliente, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (error || !cliente) {
        console.error("Erro ao carregar dados do cliente:", error);
        return;
    }

    // Exibir os dados do cliente na interface
    document.getElementById('cliente-nome').textContent = cliente.nome;
    document.getElementById('cliente-endereco').textContent = cliente.endereco;
    document.getElementById('cliente-email').textContent = user.email;
    carregarCartaoFidelidade();
    carregarHistoricoPedidos();
}

// Função para carregar o cartão fidelidade
async function carregarCartaoFidelidade() {
    const user = supabase.auth.user();
    const { data: fidelidade, error } = await supabase
        .from('fidelidade')
        .select('*')
        .eq('cliente_id', user.id)
        .single();

    if (error || !fidelidade) {
        console.error("Erro ao carregar fidelidade:", error);
        return;
    }

    document.getElementById('cartao-fidelidade').textContent = fidelidade.selos;
    if (fidelidade.selos >= 10) {
        document.getElementById('solicitar-premio').style.display = 'block';
    }
}

// Função para carregar o histórico de pedidos
async function carregarHistoricoPedidos() {
    const user = supabase.auth.user();
    const { data: pedidos, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('cliente_id', user.id);

    if (error) {
        console.error("Erro ao carregar histórico de pedidos:", error);
        return;
    }

    const pedidoList = document.getElementById('pedido-list');
    pedidoList.innerHTML = '';
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${pedido.id} - Status: ${pedido.status}`;
        pedidoList.appendChild(li);
    });
}

// Inicializar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarDadosCliente);
