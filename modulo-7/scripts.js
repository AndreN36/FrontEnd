// scripts.js

// Classe Parquimetro responsável pela lógica de cálculo
class Parquimetro {
  constructor(taxaMinima = 1.0, tempoPorReal = 30) {
    this.taxaMinima = taxaMinima; // Valor mínimo: R$1,00
    this.tempoPorReal = tempoPorReal; // Tempo concedido por real: 30 minutos
  }

  calcular() {
    const inputValor = document.getElementById("valor");
    const resultado = document.getElementById("resultado");
    const valorInserido = parseFloat(inputValor.value);

    // Verificação de valor válido
    if (isNaN(valorInserido) || valorInserido <= 0) {
      resultado.innerHTML = "<p>Por favor, insira um valor válido.</p>";
      return;
    }

    // Verifica se o valor é suficiente
    if (valorInserido < this.taxaMinima) {
      resultado.innerHTML = `<p>Valor insuficiente. Insira pelo menos R$${this.taxaMinima.toFixed(2)}</p>`;
      return;
    }

    // Cálculo do tempo de estacionamento e troco
    const tempoTotal = Math.floor(valorInserido / this.taxaMinima) * this.tempoPorReal;
    const valorGasto = Math.floor(valorInserido / this.taxaMinima) * this.taxaMinima;
    const troco = valorInserido - valorGasto;

    resultado.innerHTML = `
      <p><strong>Tempo de Estacionamento:</strong> ${tempoTotal} minutos</p>
      <p><strong>Troco:</strong> R$${troco.toFixed(2)}</p>
    `;
  }
}

// Instancia a classe Parquimetro para ser usada na interface
const simulador = new Parquimetro();
