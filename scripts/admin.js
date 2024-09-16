
import { supabase } from './supabase.js';

// Função para promover um usuário a atendente ou admin
async function promoverUsuario(email, novoTipo) {
    const { data, error } = await supabase
        .from('usuarios')
        .update({ tipo_usuario: novoTipo })
        .eq('email', email);

    if (error) {
        alert('Erro ao promover usuário: ' + error.message);
    } else {
        alert('Usuário promovido para ' + novoTipo + ' com sucesso!');
    }
}

// Função para listar usuários e permitir a promoção
async function listarUsuarios() {
    const { data: usuarios, error } = await supabase.from('usuarios').select('*');
    if (error) {
        console.error("Erro ao carregar usuários:", error);
        return;
    }

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${usuario.email} - ${usuario.tipo_usuario}
            <button onclick="promoverUsuario('${usuario.email}', 'atendente')">Promover a Atendente</button>
            <button onclick="promoverUsuario('${usuario.email}', 'admin')">Promover a Admin</button>
        `;
        userList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', listarUsuarios);
