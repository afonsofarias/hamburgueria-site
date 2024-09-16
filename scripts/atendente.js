import { supabase } from './supabase.js';

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
        carregarPedidos();  // Atualiza a lista de pedidos após login
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

// Carregar pedidos
async function carregarPedidos() {
    const { data: pedidos, error } = await supabase.from('pedidos').select('*');
    if (error) {
        console.error("Erro ao carregar pedidos:", error);
        return;
    }

    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
   
