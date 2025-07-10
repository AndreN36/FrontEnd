// Gera o número secreto
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Número máximo de tentativas
const maxTentativas = 10;

// Inicializa o contador de tentativas
let tentativas = 0;

// Referências HTML
const inputPalpite = document.getElementById('palpite');
const botaoChutar = document.getElementById('botaoChutar');
const botaoReiniciar = document.getElementById('botaoReiniciar');
const mensagem = document.getElementById('mensagem');
const tentativasRestantes = document.getElementById('tentativasRestantes');

// Número de tentativas
tentativasRestantes.textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;

// Botão "Chutar"
botaoChutar.addEventListener('click', () => {
  // Conversão de valor em número inteiro
  const palpite = parseInt(inputPalpite.value);

  // Validação de número inserido
  if (isNaN(palpite) || palpite < 1 || palpite > 100) {
    mensagem.textContent = '⚠️ Insira um número válido entre 1 e 100.';
    return;
  }

  // Loop de tentativas (executado uma vez por clique)
  while (tentativas < maxTentativas) {
    // Incrementa o número de tentativas
    tentativas++;

    // Acerto
    if (palpite === numeroSecreto) {
      mensagem.textContent = `🎉 Você acertou! O número era ${numeroSecreto}.`;
      encerrarJogo();
      break;
    }

    // Palpite menor
    if (palpite < numeroSecreto) {
      mensagem.textContent = '🔼 O número secreto é maior!';
    }
    // Palpite maior
    else {
      mensagem.textContent = '🔽 O número secreto é menor!';
    }

    // Atualiza tentativas
    tentativasRestantes.textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;

    // Quando acabar as tentativas
    if (tentativas >= maxTentativas) {
      mensagem.textContent = `❌ Você perdeu! O número secreto era ${numeroSecreto}.`;
      encerrarJogo();
    }

    break;
  }

  // Limpeza de campo
  inputPalpite.value = '';
  inputPalpite.focus();
});

// Finaliza jogo
function encerrarJogo() {
  botaoChutar.disabled = true;
  inputPalpite.disabled = true;
  botaoReiniciar.style.display = 'inline-block';
}

// Botão de reinício
botaoReiniciar.addEventListener('click', () => {
  // Novo número
  numeroSecreto = Math.floor(Math.random() * 100) + 1;

  // Zera tentativas
  tentativas = 0;

  // Recomeça o jogo
  inputPalpite.value = '';
  inputPalpite.disabled = false;
  botaoChutar.disabled = false;
  mensagem.textContent = '';
  tentativasRestantes.textContent = `Tentativas restantes: ${maxTentativas}`;
  botaoReiniciar.style.display = 'none';
  inputPalpite.focus();
});
