// Definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 10;
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));

  background(corFundo);

  mostrarInformacoes();

  temperatura += 0.1;

  jardineiro.atualizar();
  jardineiro.mostrar();

  // Verifica se o jogo acabou
  verificarFimDeJogo();

  // Usando map() para aplicar o comportamento de árvores plantadas
  plantas.map((arvore) => arvore.mostrar());
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(16);
  fill(0);
  text("Temperatura: " + temperatura.toFixed(1), 10, 30);
  text("Árvores plantadas: " + totalArvores, 10, 50);
}

// Função que verifica se o jogo acabou (exemplo)
function verificarFimDeJogo() {
  if (totalArvores >= 50) {
    textSize(32);
    fill(0, 255, 0);
    text("Você ganhou! Todas as árvores foram plantadas.", width / 2 - 250, height / 2);
    noLoop(); // Para o jogo
  } else if (temperatura > 88) {
    textSize(32);
    fill(255, 0, 0);
    text("O jogo acabou! A temperatura ficou muito alta.", width / 2 - 250, height / 2);
    noLoop(); // Para o jogo
  }
}

// Classe para o jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = 30;
  }

  // Atualiza a posição do jardineiro
  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }

  // Desenha o jardineiro na tela
  mostrar() {
    fill(0);
    ellipse(this.x, this.y, this.tamanho, this.tamanho);
  }

  // Função para o jardineiro plantar árvores
  plantarArvore() {
    if (mouseIsPressed) {
      let arvore = new Arvore(mouseX, mouseY);
      plantas.push(arvore);
      totalArvores++;
    }
  }
}

// Classe para as árvores
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 10;
  }

  // Atualiza o crescimento da árvore
  atualizar() {
    if (temperatura > 15) {
      this.altura += 0.1;  // As árvores crescem conforme a temperatura
    }
  }

  // Desenha a árvore na tela
  mostrar() {
    fill(34, 139, 34); // Cor das folhas
    ellipse(this.x, this.y - this.altura / 2, 30, 30); // Folhas
    fill(139, 69, 19); // Cor do tronco
    rect(this.x - 5, this.y - this.altura, 10, this.altura); // Tronco
    this.atualizar();
  }
}

function mousePressed() {
  jardineiro.plantarArvore();
}