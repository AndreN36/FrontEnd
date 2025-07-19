document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  const btnLimpar = document.getElementById('btn-limpar');
  const btnRestaurar = document.getElementById('btn-restaurar');
  const campos = ['nome', 'email', 'cep', 'rua', 'bairro', 'cidade', 'estado', 'numero'];

  // Restaurar os dados da sessionStorage ao carregar
  campos.forEach(campo => {
    const valorSession = sessionStorage.getItem(campo);
    if (valorSession) {
      document.getElementById(campo).value = valorSession;
    }
  });

  // Revalidar o CEP salvo na sessionStorage
  const cepArmazenado = sessionStorage.getItem('cep');
  if (cepArmazenado && cepArmazenado.length === 8) {
    buscarEndereco(cepArmazenado);
  }

  // Atualizar sessionStorage em tempo real ao digitar
  campos.forEach(campo => {
    const input = document.getElementById(campo);
    input.addEventListener('input', () => {
      sessionStorage.setItem(campo, input.value);
    });
  });

  // Buscar dados no ViaCEP ao digitar o CEP
  document.getElementById('cep').addEventListener('blur', () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    buscarEndereco(cep);
  });

  function buscarEndereco(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) throw new Error("CEP não encontrado");

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        // Atualizar sessionStorage com os dados recebidos
        sessionStorage.setItem('rua', data.logradouro);
        sessionStorage.setItem('bairro', data.bairro);
        sessionStorage.setItem('cidade', data.localidade);
        sessionStorage.setItem('estado', data.uf);
      })
      .catch(err => {
        console.error(err);
        alert('CEP inválido ou não encontrado');
      });
  }

  // Salvar os dados no Local Storage ao submeter o formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    campos.forEach(campo => {
      const valor = document.getElementById(campo).value;
      localStorage.setItem(campo, valor);
    });
    alert('Dados salvos no armazenamento permanente!');
  });

  // Botão para limpar os dados do formulário e do armazenamento
  btnLimpar.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar os dados?')) {
      campos.forEach(campo => {
        document.getElementById(campo).value = '';
        sessionStorage.removeItem(campo);
        localStorage.removeItem(campo);
      });
      alert('Dados limpos com sucesso!');
    }
  });

  // Botão para restaurar os dados salvos no localStorage
  btnRestaurar.addEventListener('click', () => {
    let encontrouDados = false;
    campos.forEach(campo => {
      const valorLocal = localStorage.getItem(campo);
      if (valorLocal) {
        document.getElementById(campo).value = valorLocal;
        sessionStorage.setItem(campo, valorLocal);
        encontrouDados = true;
      } else {
        document.getElementById(campo).value = '';
        sessionStorage.removeItem(campo);
      }
    });
    if (encontrouDados) {
      alert('Dados restaurados do armazenamento permanente.');
    } else {
      alert('Nenhum dado encontrado no armazenamento permanente.');
    }
  });
});
