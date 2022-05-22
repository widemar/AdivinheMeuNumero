"use strict";

// Gera Números aleatorios de 1 a 20
const geraNumAleatorios = function () {
  return Math.floor(Math.random() * 20 + 1);
};

// Mostra mensagens no html
const mostrarMessagem = function (message) {
  document.querySelector(".message").textContent = message;
}

// Muda cor do background da página
const mudarCorBody = function (cor) {
  document.querySelector("body").style.backgroundColor = cor;
}

// Habilita ou desabilita botão verificar
const disableBotao = function (boleano) {
  document.querySelector(".check").disabled = boleano;
}

// Redimensiona input ao acertar número secreto e quando a partida é reiniciada.
const redimensionarInput = function (medida) {
  document.querySelector(".number").style.width = medida;
}

// Atualiza Pontuação
const atualizaPontuacao = function (pontuacao) {
  document.querySelector(".score").textContent = pontuacao;
}

let numAleatorio = geraNumAleatorios();
let pontuacao = 20;
let pontuacaoMaxima = 0;

const verificarPalpite = function () {
  //Converte palpite de string para number
  const palpite = Number(document.querySelector(".guess").value);
  // Verifica se o palpite é válido
  if (palpite < 1 || palpite > 20) {
    mostrarMessagem("Numero  Inválido 🛑");
  } else {
    // Verifica se o usuário acertou o número secreto
    if (palpite === numAleatorio) {
      document.querySelector(".number").textContent = numAleatorio;
      mostrarMessagem("Você Acertou Parabéns 🎉");
      disableBotao(true);
      mudarCorBody("green");
      redimensionarInput("30rem");
      // Verifica se a pontuação maxima é menor que a pontuação atual
      if (pontuacaoMaxima < pontuacao) {
        pontuacaoMaxima = pontuacao;
        document.querySelector(".highscore").textContent = pontuacaoMaxima;
      }
      // Verifica se o palpite é maior ou menor que o número secreto
    } else if (palpite !== numAleatorio) {
      mostrarMessagem(palpite > numAleatorio ? "📈 Palpite muito alto" : "📉 Palpite muito baixo");
      mudarCorBody(palpite > numAleatorio ? "purple" : "blue");
      pontuacao--;
      atualizaPontuacao(pontuacao);
    }
    if (pontuacao === 0) {
      mostrarMessagem("Fim de Jogo 😔");
      mudarCorBody("red");
      disableBotao(true);
    }
  }
};

const reiniciar = function () {
  // Gera novo número aleatório
  numAleatorio = geraNumAleatorios();
  // Reseta campo de texto do número aleatório
  document.querySelector(".number").textContent = "?";
  // Habilita botão verificar
  disableBotao(false);
  // Reseta campo de input
  document.querySelector(".guess").value = "";
  // Reseta campo de dicas
  mostrarMessagem("Comece a Adivinhar...");
  // Reseta a cor de fundo
  mudarCorBody("#222");
  // Reseta campo do número secreto
  redimensionarInput("15rem");
  // Reseta campo de pontuação para 20 novamente
  pontuacao = 20;
  atualizaPontuacao(pontuacao);
};

// Espera o botão verificar ser clicado para chamar a função de verificação de palpites.
document.querySelector(".check").addEventListener("click", verificarPalpite);
// Espera o botão de reiniciar ser clicado para chamar a função de reiniciar o jogo.
document.querySelector(".again").addEventListener("click", reiniciar);
