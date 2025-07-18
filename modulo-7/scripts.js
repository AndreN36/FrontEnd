
// Classe Parquimetro que simula o funcionamento de um parquímetro
class Parquimetro {
  // Método construtor define os valores e tempos permitidos
  constructor() {
    this.tabelaValores = [
      { valor: 1.00, tempo: 30 },
      { valor: 1.75, tempo: 60 },
      { valor: 3.00, tempo: 120 } // tempo máximo permitido
    ];
  }

  // Método responsável pelo cálculo do tempo e troco
  calcular() {
    const inputValor = document.getElementById("valor");
    const resultado = document.getElementById("resultado");
    const valorInserido = parseFloat(inputValor.value);

    // Verificação de valor válido
    if (isNaN(valorInserido) || valorInserido <= 0) {
      resultado.innerHTML = "<p>Por favor, insira um valor válido.</p>";
      return;
    }

    // Verificação se valor é menor que o mínimo permitido
    if (valorInserido < 1.00) {
      resultado.innerHTML = "<p>Valor insuficiente. Insira pelo menos R$1,00.</p>";
      return;
    }

    // Buscar na tabela o maior valor possível menor ou igual ao valor inserido
    let tempoEstacionamento = 0;
    let valorGasto = 0;

    for (let i = this.tabelaValores.length - 1; i >= 0; i--) {
      if (valorInserido >= this.tabelaValores[i].valor) {
        tempoEstacionamento = this.tabelaValores[i].tempo;
        valorGasto = this.tabelaValores[i].valor;
        break;
      }
    }

    const troco = valorInserido - valorGasto;

    // Exibição do resultado
    resultado.innerHTML = `
      <p><strong>Tempo de Estacionamento:</strong> ${tempoEstacionamento} minutos</p>
      <p><strong>Troco:</strong> R$${troco.toFixed(2)}</p>
    `;
  }
}

// Instancia da classe Parquimetro
const simulador = new Parquimetro();