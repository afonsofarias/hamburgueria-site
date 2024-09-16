
import { supabase } from './supabase.js';

// Função para carregar os pedidos pendentes para o atendente
async function carregarPedidos() {
    const { data: pedidos, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('status', 'Pendente');

    if (error) {
        console.error("Erro ao carregar pedidos:", error);
        return;
    }

    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    pedidos.forEach(pedido => {
        const li = document.createElement('li');
        li.innerHTML = `
            Pedido #${pedido.id} - ${pedido.itens.length} itens
            <button onclick="aceitarPedido(${pedido.id})">Aceitar Pedido</button>
        `;
        orderList.appendChild(li);
    });
}

// Função para aceitar um pedido
async function aceitarPedido(pedidoId) {
    const { error } = await supabase
        .from('pedidos')
        .update({ status: 'Aceito' })
        .eq('id', pedidoId);

    if (error) {
        console.error("Erro ao aceitar o pedido:", error);
        return;
    }

    alert("Pedido aceito!");
    carregarPedidos(); // Recarregar pedidos pendentes
}

// Inicializar a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPedidos);
