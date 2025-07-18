document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-cadastro');
  const campos = ['nome', 'email', 'cep', 'rua', 'bairro', 'cidade', 'estado'];

  // Restaurar os dados do Local Storage
  campos.forEach(campo => {
    const valor = localStorage.getItem(campo);
    if (valor) document.getElementById(campo).value = valor;
  });

  // Buscar dados no ViaCEP ao digitar o CEP
  document.getElementById('cep').addEventListener('blur', () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) throw new Error("CEP não encontrado");

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;

        // Atualizar localStorage com os dados recebidos
        localStorage.setItem('rua', data.logradouro);
        localStorage.setItem('bairro', data.bairro);
        localStorage.setItem('cidade', data.localidade);
        localStorage.setItem('estado', data.uf);
      })
      .catch(err => {
        console.error(err);
        alert('CEP inválido ou não encontrado');
      });
  });

  // Salvar os dados no Local Storage ao submeter o formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    campos.forEach(campo => {
      const valor = document.getElementById(campo).value;
      localStorage.setItem(campo, valor);
    });
    alert('Dados salvos com sucesso!');
  });
});
