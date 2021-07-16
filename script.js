let textoVilaFranca =
  "Chegou ao ilhéu da Vila Franca! " +
  "A primeira coisa com que se depara é um cofre de cor [INSERT] e ao seu lado um" +
  " pescador. Este afirma saber identificar a cor de uma chave de acordo com a sua forma. " +
  " Porém, o pescador afirma que para a identificar, terá de realizar uma tarefa para o mesmo." +
  " Pode tentar abrir o cofre com uma chave à sua escolha, mas se errar perderá uma vida e não" +
  " receberá o pedaço de mapa necessário para a sua vitória.";

let textoGraciosa =
  "Chegou à Furna do Enxofre! " +
  "A primeira coisa com que se depara é um cofre de cor [INSERT] e ao seu lado um" +
  " ancião. Este afirma saber identificar a cor de uma chave de acordo com a sua forma. " +
  " Porém, o ancião afirma que para a identificar, terá de realizar uma tarefa para o mesmo." +
  " Pode tentar abrir o cofre com uma chave à sua escolha, mas se errar perderá uma vida e não" +
  " receberá o pedaço de mapa necessário para a sua vitória.";

let textoPico =
  "Chegou ao topo do Pico! " +
  "A primeira coisa com que se depara é um cofre de cor [INSERT] e ao seu lado um" +
  " guia. Este afirma saber identificar a cor de uma chave de acordo com a sua forma. " +
  " Porém, o guia afirma que para a identificar, terá de realizar uma tarefa para o mesmo." +
  " Pode tentar abrir o cofre com uma chave à sua escolha, mas se errar perderá uma vida e não" +
  " receberá o pedaço de mapa necessário para a sua vitória.";

let keys = [];
let cofres = [];
let dictPerguntasNivel1 = prepararPerguntas(perguntasNivel1);
let dictPerguntasNivel2 = prepararPerguntas(perguntasNivel2);
let dictPerguntasNivel3 = prepararPerguntas(perguntasNivel3);
let palavrasForca = prepararPalavrasForca();
let palavraAtual = null;
let palavraNormalizada = null; 
let palavraConvertida = null; 
let tentativasForca = 0;
let usouAjudaForca = false;
let cofreAtual = null;
let fezPuzzle = false;
let ganhou = false;

const coresChave = [
  "amarelo",
  "azul",
  "vermelha",
  "rosa",
  "laranja",
  "verde",
  "preta",
  "branca",
  "violeta",
];
const nomesChave = ["Chave 1", "Chave 2", "Chave 3"];
let coresUsadas = [];

function restart() {
  resetCasas();
  board = new Board();
  coresUsadas = [];
  esconderGameOver();
  esconderLevelSelector();
  esconderInput();
  resetInventory();
  refresh();
  return board;
}

function escolha(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function gerarCofresChaves() {
  for (let i = 0; i <= 2; i++) {
    new Cofre(new Chave(nomesChave[i]).cor);
  }
  shuffle(cofres);
}

function clickedOpenChestButton(num) {
  switch (num) {
    case 0:
      if (board.jogador.inventory.includes(board.chaves[0].designacao)) {
        if (board.abrirCofre(cofreAtual, board.chaves[0])) {
          alert("Abriu o cofre! Recebeu um pedaço de mapa!");
          board.jogador.addPiece();
        } else {
          alert("Utilizou a chave errada! Perdeu uma vida!");
          board.jogador.loseLife();
        }
      } else {
        alert("Não possui esta chave!");
      }
      break;

    case 1:
      if (board.jogador.inventory.includes(board.chaves[1].designacao)) {
        if (board.abrirCofre(cofreAtual, board.chaves[1])) {
          alert("Abriu o cofre! Recebeu um pedaço de mapa!");
          board.jogador.addPiece();
        } else {
          alert("Utilizou a chave errada! Perdeu uma vida!");
          board.jogador.loseLife();
        }
      } else {
        alert("Não possui esta chave!");
      }
      break;

    case 2:
      if (board.jogador.inventory.includes(board.chaves[2].designacao)) {
        if (board.abrirCofre(cofreAtual, board.chaves[2])) {
          alert("Abriu o cofre! Recebeu um pedaço de mapa!");
          board.jogador.addPiece();
        } else {
          alert("Utilizou a chave errada! Perdeu uma vida!");
          board.jogador.loseLife();
        }
      } else {
        alert("Não possui esta chave!");
      }
      break;
  }
}

function resetCasas() {
  for (let i = 1; i < 41; i++) {
    let stringCasa = "casa" + i;
    let element = document.getElementById(stringCasa);
    element.style.backgroundColor = "aqua";
  }
}

function prepararChegada(num) {
  fezPuzzle = false;
  let tituloElement = document.getElementById("tituloChegadaCofre");
  let textoElement = document.getElementById("textChegadaCofre");
  switch (num) {
    case 0:
      cofreAtual = board.cofres[0];
      tituloElement.innerHTML = "Chegou ao Ilhéu da Vila Franca!";
      let textoVilaFrancaFinal = textoVilaFranca.replace(
        "[INSERT]",
        board.cofres[0]._cor
      );
      textoElement.innerHTML = textoVilaFrancaFinal;
      break;

    case 1:
      cofreAtual = board.cofres[1];
      tituloElement.innerHTML = "Chegou à Graciosa!";
      let textoGraciosaFinal = textoGraciosa.replace(
        "[INSERT]",
        board.cofres[1]._cor
      );
      textoElement.innerHTML = textoGraciosaFinal;
      break;

    case 2:
      cofreAtual = board.cofres[2];
      tituloElement.innerHTML = "Chegou ao Pico!";
      let textoPicoFinal = textoPico.replace("[INSERT]", board.cofres[2]._cor);
      textoElement.innerHTML = textoPicoFinal;
      break;
  }
  mostrarChegadaCofre();
}

function resetInventory() {
  let invDiv = document.getElementById("inventoryText");
  invDiv.innerHTML = "Inventário";
}

function refresh() {
  let dadoElement = document.getElementById("lastroll");
  let vidaElement = document.getElementById("vidas");
  let moedaElement = document.getElementById("moedas");
  dadoElement.innerHTML = "Dado: 0";
  vidaElement.innerHTML = "Vidas: " + board.jogador.vidas;
  moedaElement.innerHTML = "Dinheiro: " + board.jogador.moedas;
}

function esconderMain() {
  let divElement = document.getElementById("mainContainer");
  divElement.style.visibility = "hidden";
}

function mostrarMain() {
  let divElement = document.getElementById("mainContainer");
  divElement.style.visibility = "visible";
  window.scrollTo(0, 0);
}

function esconderLoja() {
  let divElement = document.getElementById("lojaContainer");
  divElement.style.visibility = "hidden";
}

function mostrarLoja() {
  let divElement = document.getElementById("lojaContainer");
  divElement.style.visibility = "visible";
}

function shopTransition() {
  esconderMain();
  mostrarLoja();
  document.getElementById("moedasLoja").innerHTML =
    "Moedas disponíveis: " + board.jogador.moedas;
}

function mainTransition() {
  esconderLoja();
  mostrarMain();
}

function esconderForca() {
  let divElement = document.getElementById("forcaContainer");
  divElement.style.visibility = "hidden";
}

function prepararForca() {
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ç",
  ];
  for (let i = 0; i < alphabet.length; i++) {
    let letra = alphabet[i];
    document.getElementById(letra).addEventListener("click", function () {
      clickForca(letra);
    });
  }
}

function normalizarPalavra() {
  let r = palavraAtual.toUpperCase();
  r = r.replace(new RegExp("[ÀÁÂÃ]", "g"), "A");
  r = r.replace(new RegExp("[ÉÊ]", "g"), "E");
  r = r.replace(new RegExp("[Í]", "g"), "I");
  r = r.replace(new RegExp("[ÒÓÔ]", "g"), "O");
  return r;
}

function converterPalavra(palavra) {
  let stringConvertido = "";
  for (let i = 0; i < palavra.length; i++) {
    if (palavra[i] === " ") {
      stringConvertido += " ";
    } else {
      stringConvertido += "?";
    }
  }
  return stringConvertido;
}

function cancelarAbrirCofre() {
  esconderAberturaCofre();
  mostrarChegadaCofre();
}

function esconderChegadaCofre() {
  let divElement = document.getElementById("chegadaCofre");
  divElement.style.visibility = "hidden";
}

function mostrarChegadaCofre() {
  let divElement = document.getElementById("chegadaCofre");
  divElement.style.visibility = "visible";
}

function esconderAberturaCofre() {
  let divElement = document.getElementById("aberturaCofre");
  divElement.style.visibility = "hidden";
}

function mostrarAberturaCofre() {
  let divElement = document.getElementById("aberturaCofre");
  divElement.style.visibility = "visible";
}

function jogarForca() {
  if (!fezPuzzle) {
    alert("Vai agora realizar a tarefa! Terá 6 tentativas! Boa sorte!");
    esconderChegadaCofre();
    board.gerarPalavraForca();
    updateForcaDisplay();
    mostrarForcaContainer();
  } else {
    alert("Já realizou o puzzle!");
  }
}

function clickedOpenChest() {
  esconderChegadaCofre();
  mostrarAberturaCofre();
}

function irEmbora() {
  alert("Decidiu ir embora sem tentar abrir o cofre! Perdeu 1 vida!");
  board.jogador.loseLife();
  setVidaDisplay(board.jogador.vidas);
  esconderChegadaCofre();
}

function updateForcaDisplay() {
  let divElement = document.getElementById("palavraForca");
  divElement.innerHTML = palavraConvertida;
  let tentativasElement = document.getElementById("tentativasText");
  tentativasElement.innerHTML = "Tentativas: " + tentativasForca;
}

function clickForca(letra) {
  console.log(letra);
  let acertou = false;
  for (let i = 0; i < palavraNormalizada.length; i++) {
    if (letra === palavraNormalizada[i]) {
      palavraConvertida =
        palavraConvertida.substring(0, i) +
        palavraAtual[i] +
        palavraConvertida.substring(i + 1);
      acertou = true;
    }
  }
  if (!acertou) {
    tentativasForca -= 1;
  }
  if (tentativasForca === 0) {
    alert("Usou o total das suas tentativas! Perdeu o jogo!");
    esconderForca();
    mostrarChegadaCofre();
    fezPuzzle = true;
    usouAjudaForca = false;
  }
  checkForcaWin();
  updateForcaDisplay();
}

function substituirLetraForca(letra) {
  for (let i = 0; i < palavraNormalizada.length; i++) {
    if (letra === palavraNormalizada[i]) {
      palavraConvertida =
        palavraConvertida.substring(0, i) +
        palavraAtual[i] +
        palavraConvertida.substring(i + 1);
    }
  }
}

function ajuda() {
  if (board.jogador.moedas > 2) {
    if (!usouAjudaForca) {
      usouAjudaForca = true;
      let letra = escolha(palavraNormalizada);
      alert("Pediu ajuda! Gastou 2 moedas!");
      substituirLetraForca(letra);
      updateForcaDisplay();
      board.jogador.removeMoedas(2);
    } else {
      alert("Já usou a sua ajuda!");
    }
  } else {
    alert("Não tem dinheiro suficiente!");
  }
}

function checkForcaWin() {
  if (palavraConvertida === palavraAtual) {
    usouAjudaForca = false;
    let chave = findKey();
    let corChave = chave.cor;
    let formaChave = chave.designacao;
    alert(
      "Ganhou o jogo! A chave que abre este cofre tem cor " +
        corChave +
        " e chama-se " +
        formaChave +
        "."
    );
    esconderForca();
    mostrarChegadaCofre();
    fezPuzzle = true;
    return true;
  } else {
    return false;
  }
}

function mostrarForcaContainer() {
  let divElement = document.getElementById("forcaContainer");
  divElement.style.visibility = "visible";
}

function esconderInput() {
  let divElement = document.getElementById("inputContainer");
  divElement.style.visibility = "hidden";
}

function mostrarInput() {
  let divElement = document.getElementById("inputContainer");
  divElement.style.visibility = "visible";
  prepararResposta();
}

function esconderLevelSelector() {
  let divElement = document.getElementById("levelSelector");
  divElement.style.visibility = "hidden";
}

function mostrarLevelSelector() {
  let divElement = document.getElementById("levelSelector");
  divElement.style.visibility = "visible";
  prepararNivel();
}

function esconderGameOver() {
  let divElement = document.getElementById("gameOver");
  divElement.style.visibility = "hidden";
}

function mostrarGameOver() {
  let divElement = document.getElementById("gameOver");
  divElement.style.visibility = "visible";
  prepararGameOver();
}

function prepararGameOver() {
  let buttonElement = document.getElementById("reiniciar");
  buttonElement.addEventListener("click", function () {
    restart();
  });
}

function prepararWinScreen() {
  let buttonElement = document.getElementById("reiniciar");
  buttonElement.addEventListener("click", function () {
    restart();
  });
  let textElement = document.getElementById("gameOverText");
  textElement.style.color = "black";
  textElement.innerHTML = "GANHOU O JOGO!";
  mostrarGameOver();
}

function checkWin() {
  if (board.jogador.numPieces === 3) {
    ganhou = true;
    prepararWinScreen();
  } else {
    ganhou = false;
  }
}

function createRollButton() {
  let buttonElement = document.getElementById("rollButton");
  buttonElement.addEventListener("click", function () {
    board.jogador.rolarDado();
  });
}

function resetDadoDisplay() {
  let dadoElement = document.getElementById("lastroll");
  dadoElement.innerHTML = "Dado: 0";
}

function setVidaDisplay(vidas) {
  let vidasElement = document.getElementById("vidas");
  vidasElement.innerHTML = "Vidas: " + vidas;
}

function setMoedasDisplay(moedas) {
  let moedasElement = document.getElementById("moedas");
  moedasElement.innerHTML = "Moedas: " + moedas;
}

function updateInventory(inventory) {
  let invElement = document.getElementById("inventoryText");
  let strComLinhas = "";
  for (let i = 0; i < inventory.length; i++) {
    strComLinhas += "<br>" + inventory[i];
  }
  invElement.innerHTML = "Inventário: " + strComLinhas;
}

function casasEspeciais(numCasa) {
  switch (numCasa) {
    case 5:
      board.move();
      santaMaria();
      break;
    case 9:
      board.move();
      vilaFranca();
      break;
    case 14:
      board.move();
      terceira();
      break;
    case 18:
      board.move();
      graciosa();
      break;
    case 21:
      board.move();
      saoJorge();
      break;
    case 27:
      board.move();
      pico();
      break;
    case 32:
      board.move();
      flores();
      break;
    case 34:
      board.move();
      corvo();
      break;
    default:
      mostrarLevelSelector();
      break;
  }
}

function vilaFranca() {
  if (board.jogador.inventory.includes("Ilhéu de V. Franca")) {
    prepararChegada(0);
    board.jogador.removeItem("Ilhéu de V. Franca");
    updateInventory(board.jogador.inventory);
  } else {
    alert("Não tem o bilhete necessário para a viagem ao Ilhéu de V. Franca!");
  }
}

function graciosa() {
  prepararChegada(1);
}

function pico() {
  if (board.jogador.inventory.includes("Subida ao Pico")) {
    prepararChegada(2);
    board.jogador.removeItem("Subida ao Pico");
    updateInventory(board.jogador.inventory);
  } else {
    alert("Não tem o  bilhete necessário para a subida ao Pico!");
  }
}

function santaMaria() {
  if (board.jogador.inventory.includes("Whale Watching")) {
    alert(
      "Foi numa viagem de Whale Watching! Não tem de responder a uma pergunta!"
    );
    board.jogador.removeItem("Whale Watching");
  } else {
    alert(
      "Não tem um bilhete para ver baleias, vai ter de fazer trabalho comunitário!"
    );
    board.jogador.trabalhoComunitario = true;
    mostrarLevelSelector();
  }
}

function terceira() {
  alert(
    "Participou na festa do Espírito Santo da Terceira! Como gratidão," +
      " Irá fazer trabalho comunitário!"
  );
  board.jogador.trabalhoComunitario = true;
  mostrarLevelSelector();
}

function saoJorge() {
  if (board.jogador.inventory.includes("Fajã do S. Cristo")) {
    alert(
      "Foi fazer uma viagem à Fajã de Santo Cristo! Não tem de responder a uma pergunta!"
    );
    board.jogador.removeItem("Fajã do S. Cristo");
  } else {
    alert(
      "Não tem bilhete para ir à Fajã de Santo Cristo! Tem de fazer trabalho comunitário!"
    );
    board.jogador.trabalhoComunitario = true;
    mostrarLevelSelector();
  }
}

function flores() {
  if (board.jogador.inventory.includes("Rocha dos Bordões")) {
    alert(
      "Foi fazer uma viagem à Rocha dos Bordões!, Não tem de" +
        " responder a uma pergunta!"
    );
    board.jogador.removeItem("Rocha dos Bordões");
  } else {
    alert(
      "Não tem bilhete para ir à Rocha dos Bordões! Tem de fazer trabalho comunitário!"
    );
    board.jogador.trabalhoComunitario = true;
    mostrarLevelSelector();
  }
}

function corvo() {
  if (board.jogador.inventory.includes("Lagoa do Caldeirão")) {
    alert(
      "Foi fazer uma viagem à Lagoa do Caldeirão! Não tem de responder a uma pergunta!"
    );
    board.jogador.removeItem("Lagoa do Caldeirão");
  } else {
    alert(
      "Não tem bilhete para ir à Lagoa do Caldeirão! Vai ter de fazer trabalho comunitário!"
    );
    board.jogador.trabalhoComunitario = true;
    mostrarLevelSelector();
  }
}

function prepararPerguntas(perguntas) {
  let listaPerguntas = perguntas.split("\n");
  let dictPerguntas = {};
  for (let i = 0; i < listaPerguntas.length; i++) {
    let listaTemp = listaPerguntas[i].split("|");
    dictPerguntas[listaTemp[0]] = listaTemp[1].split("§");
  }
  return dictPerguntas;
}

function prepararPalavrasForca() {
  let listaPalavras = forca.split(",");
  return listaPalavras;
}

function findKey() {
  let corDesejada = cofreAtual.cor;
  console.log(corDesejada);
  for (let i = 0; i <= 2; i++) {
    let chave = keys[i];
    if (chave.cor === cofreAtual.cor) {
      console.log(chave);
      return chave;
    }
  }
}

function criarPergunta(nivel) {
  let dictPerguntas;
  switch (nivel) {
    case 1:
      dictPerguntas = dictPerguntasNivel1;
      break;
    case 2:
      dictPerguntas = dictPerguntasNivel2;
      break;
    case 3:
      dictPerguntas = dictPerguntasNivel3;
      break;
  }
  const keys = Object.keys(dictPerguntas);
  let textoPergunta = escolha(keys);
  let listaRespostas = dictPerguntas[textoPergunta];
  return [nivel, textoPergunta, listaRespostas];
}

function outputPergunta(pergunta) {
  esconderLevelSelector();
  let inputContainerElement = document.getElementById("pergunta");
  let elementRespA = document.getElementById("respostaA");
  let elementRespB = document.getElementById("respostaB");
  let elementRespC = document.getElementById("respostaC");
  let elementRespD = document.getElementById("respostaD");
  elementRespA.innerHTML = pergunta.listaRespostas[0];
  elementRespB.innerHTML = pergunta.listaRespostas[1];
  elementRespC.innerHTML = pergunta.listaRespostas[2];
  elementRespD.innerHTML = pergunta.listaRespostas[3];
  console.log(pergunta.respostaCerta);
  mostrarInput();
  inputContainerElement.innerHTML = pergunta.textoPergunta;
  prepararResposta();
}

function prepararResposta() {
  const button = document.querySelector("#buttonResposta");
  button.onclick = function () {
    const rbs = document.querySelectorAll('input[name="resposta"]');
    let selectedAnswer;
    for (const rb of rbs) {
      if (rb.checked) {
        selectedAnswer = rb.value;
        break;
      }
    }
    board.checkPerguntaCerta(selectedAnswer);
  };
}

function prepararNivel() {
  let casaElement = document.getElementById("casaAtual");
  let casaPergunta = board.currentCasa + board.jogador.lastRoll;
  casaElement.innerHTML = "Casa: " + casaPergunta;
  const button = document.querySelector("#submitNivel");
  button.onclick = function () {
    const rbs = document.querySelectorAll('input[name="nivel"]');
    let selectedAnswer;
    for (const rb of rbs) {
      if (rb.checked) {
        selectedAnswer = parseInt(rb.value);
        break;
      }
    }
    let pergunta = board.gerarPergunta(selectedAnswer);
    outputPergunta(pergunta);
  };
}

class Jogador {
  constructor() {
    this._moedas = 0;
    this._pontos = 0;
    this._vidas = 5;
    this._lastRoll = 0;
    this._trabalhoComunitario = false;
    this._numPieces = 0;
    this._inventory = [];
  }
  get moedas() {
    return this._moedas;
  }

  get pontos() {
    return this._pontos;
  }

  get numPieces() {
    return this._numPieces;
  }

  get vidas() {
    return this._vidas;
  }

  get lastRoll() {
    return this._lastRoll;
  }

  get inventory() {
    return this._inventory;
  }

  set lastRoll(lastRoll) {
    this._lastRoll = lastRoll;
  }

  set moedas(moedas) {
    this._moedas = moedas;
  }

  get trabalhoComunitario() {
    return this._trabalhoComunitario;
  }

  set trabalhoComunitario(trabalhoComunitario) {
    this._trabalhoComunitario = trabalhoComunitario;
  }

  addPiece() {
    this._numPieces += 1;
    checkWin();
  }

  rolarDado() {
    this.lastRoll = Math.floor(6 * Math.random() + 1);
    let rollElement = document.getElementById("lastroll");
    rollElement.innerHTML = "Dado: " + this.lastRoll;
    board.atualizarCasa();
    casasEspeciais(board.currentCasa + this.lastRoll);
  }

  loseLife() {
    this._vidas--;
    setVidaDisplay(this._vidas);
    if (this._vidas === 0) {
      board.gameOver();
    }
  }

  addMoedas(moedas) {
    this._moedas += moedas;
    setMoedasDisplay(this._moedas);
  }

  removeMoedas(moedas) {
    this._moedas -= moedas;
    setMoedasDisplay(this._moedas);
  }

  addItem(itemName) {
    this._inventory.push(itemName);
  }

  removeItem(itemName) {
    let index = this._inventory.indexOf(itemName);
    this._inventory.splice(index, 1);
  }
}

class Pergunta {
  constructor(nivel, textoPergunta, listaRespostas) {
    this._nivel = nivel;
    this._textoPergunta = textoPergunta;
    this._respostaCerta = listaRespostas[0];
    this._listaRespostas = shuffle(listaRespostas);
    this._listaRespostasOriginal = listaRespostas;
  }

  get nivel() {
    return this._nivel;
  }

  get textoPergunta() {
    return this._textoPergunta;
  }

  get listaRespostas() {
    return this._listaRespostas;
  }

  get respostaCerta() {
    return this._respostaCerta;
  }
}

class Casa {
  constructor(numero) {
    this._numero = numero;
    this._isEspecial = this.isCasaEspecial(this._numero);
    this._cofre = this.assignCofre();
  }
  get numero() {
    return this._numero;
  }
  isCasaEspecial() {
    let numero = this.numero;
    return numero === 9 || numero === 18 || numero === 27;
  }
  assignCofre() {
    switch (this.numero) {
      case 9:
        return cofres[0];
      case 18:
        return cofres[1];
      case 27:
        return cofres[2];
      default:
        return null;
    }
  }
}

function randomCor() {
  let cor = escolha(coresChave);
  while (coresUsadas.includes(cor)) {
    cor = escolha(coresChave);
  }
  coresUsadas.push(cor);
  return cor;
}

class Chave {
  constructor(designacao) {
    this._designacao = designacao;
    this._cor = randomCor();
    keys.push(this);
  }
  get cor() {
    return this._cor;
  }

  get designacao() {
    return this._designacao;
  }
}

class Cofre {
  constructor(cor) {
    this._cor = cor;
    cofres.push(this);
  }

  get cor() {
    return this._cor;
  }

  abrir(chave) {
    if (chave.cor === this.cor) {
      console.log("Great success!");
      return true;
    } else {
      console.log("Wrong Colour");
      return false;
    }
  }
}

class Board {
  constructor() {
    cofres = [];
    keys = [];
    gerarCofresChaves();
    this._perguntasNivel1 = dictPerguntasNivel1;
    this._perguntasNivel2 = dictPerguntasNivel2;
    this._perguntasNivel3 = dictPerguntasNivel3;
    this._palavrasForca = palavrasForca;
    this._casas = this.gerarCasas();
    this._currentCasa = 1;
    this._currentPergunta = null;
    this._chaves = keys;
    this._cofres = cofres;
    this._jogador = new Jogador();
    this.pintarCurrentCasa("lightgreen");
  }
  get jogador() {
    return this._jogador;
  }

  set currentPergunta(pergunta) {
    this._currentPergunta = pergunta;
  }

  get currentPergunta() {
    return this._currentPergunta;
  }

  get chaves() {
    return this._chaves;
  }

  get cofres() {
    return this._cofres;
  }

  get casas() {
    return this._casas;
  }

  get currentCasa() {
    return this._currentCasa;
  }

  gerarCasas() {
    let listaCasas = [];
    for (let i = 1; i < 41; i++) {
      listaCasas.push(new Casa(i));
    }
    return listaCasas;
  }

  atualizarCasa() {
    this.pintarCurrentCasa("aquablue");
    let casaToPaint = this.currentCasa + this.jogador.lastRoll;
    this.pintarCasa(casaToPaint, "lightgreen");
  }

  revertAtualizarCasa() {
    this.pintarCurrentCasa("lightgreen");
    let casaToPaint = this.currentCasa + this.jogador.lastRoll;
    this.pintarCasa(casaToPaint, "aquablue");
  }

  move() {
    this.pintarCurrentCasa("aliceblue");
    this._currentCasa += this.jogador.lastRoll;
    if (this._currentCasa % 40 === 0) {
      this._currentCasa = 40;
    } else {
      this._currentCasa = this._currentCasa % 40;
    }
    this.pintarCurrentCasa("aliceblue");
    this.updateBoard();
    this.jogador.lastRoll = 0;
    resetDadoDisplay();
  }

  pintarCurrentCasa(cor) {
    let currentCasaString = "casa" + this._currentCasa.toString();
    let curCasaElement = document.getElementById(currentCasaString);
    curCasaElement.style.backgroundColor = cor;
  }

  pintarCasa(numCasa, cor) {
    let currentCasaString = "casa" + numCasa.toString();
    let curCasaElement = document.getElementById(currentCasaString);
    curCasaElement.style.backgroundColor = cor;
  }

  abrirCofre(cofre, chave) {
    if (cofre.abrir(chave)) {
      console.log("Board great success");
      return true;
    } else {
      console.log("Board fail");
      return false;
    }
  }

  gerarPergunta(nivel) {
    let listaAtributos = criarPergunta(nivel);
    let textoPergunta = listaAtributos[1];
    let listaRespostas = listaAtributos[2];
    let pergunta = new Pergunta(nivel, textoPergunta, listaRespostas);
    this.removerPergunta(nivel, textoPergunta);
    this.currentPergunta = pergunta;
    return pergunta;
  }

  removerPergunta(nivel, textoPergunta) {
    switch (nivel) {
      case 1:
        delete this._perguntasNivel1[textoPergunta];
        break;
      case 2:
        delete this._perguntasNivel2[textoPergunta];
        break;
      case 3:
        delete this._perguntasNivel3[textoPergunta];
        break;
    }
  }

  checkPerguntaCerta(radioOutput) {
    let respostaIndice = parseInt(radioOutput);
    let respostaDada = this.currentPergunta.listaRespostas[respostaIndice];
    let respostaCerta = this.currentPergunta.respostaCerta;
    if (respostaDada === respostaCerta) {
      if (board.jogador.trabalhoComunitario) {
        board.acertouTrabalhoComunitario();
      } else {
        board.acertouPergunta();
      }
    } else {
      board.falhouPergunta();
    }
  }

  acertouTrabalhoComunitario() {
    this.jogador.trabalhoComunitario = false;
    alert("Acertou na pergunta! Cumpriu o seu trabalho comunitário!");
    esconderInput();
    shopTransition();
  }

  acertouPergunta() {
    let moedas = this.currentPergunta.nivel;
    if (!board.jogador.trabalhoComunitario) {
      this.jogador.addMoedas(moedas);
      this.jogador.trabalhoComunitario = false;
    }
    this.move();
    alert("Acertou na pergunta! Ganhou " + this.currentPergunta.nivel + " moedas.");
    esconderInput();
    shopTransition();
  }

  falhouPergunta() {
    this.jogador.loseLife();
    this.revertAtualizarCasa();
    this.jogador.lastRoll = 0;
    resetDadoDisplay();
    alert(
      "Errou a pergunta! Resposta Certa: " + this.currentPergunta.respostaCerta
    );
    esconderInput();
    shopTransition();
  }

  updateBoard() {
    let casaAtual = "casa" + this._currentCasa.toString();
    let casaElement = document.getElementById(casaAtual);
    casaElement.style.backgroundColor = "lightgreen";
  }

  gerarPalavraForca() {
    let palavraSelected = escolha(this._palavrasForca);
    this._palavrasForca.splice(this._palavrasForca.indexOf(palavraSelected), 1);
    palavraAtual = palavraSelected;
    palavraConvertida = converterPalavra(palavraAtual);
    palavraNormalizada = normalizarPalavra(palavraAtual);
    tentativasForca = 6;
    return palavraSelected;
  }

  gameOver() {
    esconderLevelSelector();
    esconderInput();
    mainTransition();
    esconderLoja();
    mostrarMain();
    mostrarGameOver();
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let button;
  let i;
  document.getElementById("moedasLoja").innerHTML =
    "Dinheiro disponível: " + board.jogador.moedas;
  const removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (i = 0; i < removeCartItemButtons.length; i++) {
    button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (i = 0; i < addToCartButtons.length; i++) {
    button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  if (updateCartTotal() <= board.jogador.moedas) {
    alert("Obrigado pela sua compra!");
    const cartItems = document.getElementsByClassName("cart-items")[0];
    const cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    let itemNameList = getInnerTextFromArray(cartItemNames);
    let total = updateCartTotal();
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    for (let i = 0; i < itemNameList.length; i++) {
      board.jogador.addItem(itemNameList[i]);
    }
    board.jogador.removeMoedas(total);
    esconderLoja();
    updateInventory(board.jogador.inventory);
    mostrarMain();
  } else {
    alert("Não tem dinheiro suficientes");
  }
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("Este item já está adicionado ao carrinho.");
      return;
    }
  }
  cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100" alt="">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <!--   ctrl /     Numero maximo de cada item para compra max = 1 -->
            <input class="cart-quantity-input" type="number" max="1" value="1">
            <button class="btn btn-danger mdl-button mdl-js-button
            mdl-button--raised
            mdl-js-ripple-effect" type="button">REMOVER</button>
        </div>`;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + " moedas";
  return total;
}

function getInnerTextFromArray(array) {
  let innerTextReturn = [];
  for (let i = 0; i < array.length; i++) {
    innerTextReturn.push(array[i].innerText);
  }
  return innerTextReturn;
}
