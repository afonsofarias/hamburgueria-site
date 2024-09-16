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
        carregarProdutos();  // Atualiza a lista de produtos após login
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

    const productList = document
