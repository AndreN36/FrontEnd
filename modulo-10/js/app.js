// Importação da classe Cliente e da função utilitária para validação
import { Cliente } from './classes.js';
import { emailJaCadastrado } from './utils.js';

// URL da API do CrudCrud (substitua SEU_ENDPOINT pela sua chave real)
const apiURL = 'https://crudcrud.com/api/2c614b1166c64e71ae70d3317c633513/clientes';

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cliente');
  const listaClientes = document.getElementById('lista-clientes');

  // Evento de envio do formulário para cadastrar cliente
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validação simples de campos obrigatórios
    if (!nome || !email) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      // Obtém a lista de clientes atuais
      const response = await fetch(apiURL);
      const clientes = await response.json();

      // Verifica se o e-mail já foi cadastrado
      if (emailJaCadastrado(clientes, email)) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      // Cria e envia o novo cliente
      const novoCliente = new Cliente(nome, email);
      await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente)
      });

      // Limpa o formulário e atualiza a lista
      form.reset();
      carregarClientes();
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente');
    }
  });

  // Função para buscar e exibir os clientes da API
  async function carregarClientes() {
    try {
      const response = await fetch(apiURL);
      const clientes = await response.json();

      // Limpa a lista atual
      listaClientes.innerHTML = '';

      // Adiciona cada cliente à lista usando map (programação funcional)
      clientes.map(cliente => {
        const li = document.createElement('li');
        li.className = 'cliente';
        li.innerHTML = `
          <span><strong>${cliente.nome}</strong> - ${cliente.email}</span>
          <button data-id='${cliente._id}'>Excluir</button>
        `;
        listaClientes.appendChild(li);
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar clientes');
    }
  }

  // Evento delegado para lidar com exclusões de clientes
  listaClientes.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.getAttribute('data-id');
      try {
        await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        carregarClientes(); // Atualiza a lista após a exclusão
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir cliente');
      }
    }
  });

  // Inicializa a aplicação carregando os clientes já cadastrados
  carregarClientes();
});
