document.getElementById("imc").addEventListener("submit", function (event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const imcValor = document.getElementById("valorImc");
  const imcClassificacao = document.getElementById("classificacaoImc");

  // Validação
  if (!peso || !altura || peso <= 0 || altura <= 0) {
    imcValor.textContent = "Por favor, insira valores válidos.";
    imcClassificacao.textContent = "";
    return;
  }

  // Calculo IMC
  const imc = peso / (altura * altura);
  imcValor.textContent = `Seu IMC é: ${imc.toFixed(2)}`;

  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc <= 24.9) {
    classificacao = "Peso normal";
  } else if (imc <= 29.9) {
    classificacao = "Sobrepeso";
  } else if (imc >= 34.9) {
    classificacao = "Acima do peso";
  } 

  imcClassificacao.textContent = `Classificação: ${classificacao}`;
});