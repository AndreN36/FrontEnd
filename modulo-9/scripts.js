const apiURL = 'https://crudcrud.com/api/82e1bff9cad04e5bbee14c018d08d42e/clientes';

// Função para carregar a lista de clientes do servidor
async function carregarClientes() {
  const listaClientes = document.getElementById('lista-clientes');

  try {
    const response = await fetch(apiURL);
    const clientes = await response.json();

    listaClientes.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    clientes.forEach(cliente => {
      const li = document.createElement('li');
      li.classList.add('cliente');

      // Cria o HTML para cada cliente
      li.innerHTML = `
        <span><strong>${cliente.nome}</strong> - ${cliente.email}</span>
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;

      listaClientes.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar clientes');
  }
}

// Evento para carregar os clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cliente');

  // Adiciona o listener para o formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nome || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const cliente = { nome, email };

    try {
      // Verifica se o e-mail já existe
      const response = await fetch(apiURL);
      const clientes = await response.json();

      const emailExiste = clientes.some(c => c.email.toLowerCase() === email.toLowerCase());

      if (emailExiste) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      // Envia os dados do cliente para o servidor
      const postResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      });

      if (!postResponse.ok) throw new Error('Erro ao cadastrar cliente');

      form.reset(); // Limpa o formulário após o envio
      carregarClientes(); // Recarrega a lista de clientes
      alert('Cliente cadastrado com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar cliente');
    }
  });

  // Carrega os clientes ao iniciar a página
  carregarClientes();
});

// Função para excluir um cliente
async function excluirCliente(id) {
  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erro ao excluir cliente');

    alert('Cliente excluído com sucesso');
    carregarClientes();
  } catch (error) {
    console.error(error);
    alert('Erro ao excluir cliente');
  }
}
