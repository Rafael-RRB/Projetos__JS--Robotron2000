// Cores possíveis
// Azul, Roxo, Rosa, Vermelho, Amarelo, Verde, Verde Claro, Azul Claro
const roboCores = [0, 45, 90, 135, 180, 220, 265, 310];
const roboCoresHex = ["#556ea0", "#7e60a1", "#a25d87", "#a8635d", "#876d3d", "#657e3d", "#3e8254", "#387e7d"];
let roboCorAtual = 0;
// Valores das peças do robô
const pecas = {
    "bracos": {
        "forca": 40,
        "poder": 30,
        "energia": 10,
        "velocidade": 0
    },

    "blindagem": {
        "forca": 30,
        "poder": 40,
        "energia": 0,
        "velocidade": 10
    },
    "nucleos":{
        "forca": 0,
        "poder": 20,
        "energia": 40,
        "velocidade": 20
    },
    "pernas":{
        "forca": 20,
        "poder": 0,
        "energia": 20,
        "velocidade": 40
    },
    "foguetes":{
        "forca": 10,
        "poder": 10,
        "energia": 30,
        "velocidade": 30
    }
}
// Todos os botões esquerdos e direitos
const imgRobo = document.querySelector("[data-imagem=robo]");
const botoesEsq = document.querySelectorAll("[data-controle=botaoEsq]");
const inputs = document.querySelectorAll("[data-controle=inputPontoAtributo]");
const botoesDir = document.querySelectorAll("[data-controle=botaoDir]");
const estatisticas = document.querySelectorAll("[data-estatistica]");
// Index Atual
let valoresArr = [];
// Pontos
let pontosTotais = 5;
const inputPontos = document.querySelector("[data-controle=inputPontosTotal]");

function playSound(repeats) {
    // Teste de audio, debug apenas
    let audio = new Audio("se/635915__earth-cord__button-push.wav");
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function tocaSom(id) {
    let somBotao = new Audio("se/635915__earth-cord__button-push(EDIT).wav");
    let somErro = new Audio("se/145288__kuru23__seriouserror01e.mp3");
    let somAlvo = "";
    switch(true) {
        case id === 1:
            somAlvo = somBotao;
            somAlvo.pause();
            somAlvo.currentTime = 0;
            somAlvo.play();
            break;
        case id === 2:
            somAlvo = somErro;
            somAlvo.pause();
            somAlvo.currentTime = 0;
            somAlvo.play();
            break;
        default:
            alert("ID inválido, ou outro erro.");
    }
}

function corFonte(alvo, index) {
    alvo.style.color = roboCoresHex[index];
}

function atualizaEstatistica(peca, mult) {
    estatisticas[0].innerText = parseInt(estatisticas[0].innerText) + (mult * pecas[peca].forca);
    estatisticas[1].innerText = parseInt(estatisticas[1].innerText) + (mult * pecas[peca].poder);
    estatisticas[2].innerText = parseInt(estatisticas[2].innerText) + (mult * pecas[peca].energia);
    estatisticas[3].innerText = parseInt(estatisticas[3].innerText) + (mult * pecas[peca].velocidade);
}

function atualizaTudo() {
    let arrPontos = (() => {
        let tempVar = [];
        for(let i = 0; i < inputs.length - 1; i++) {
            tempVar[i] = inputs[i].value;
        }
        return tempVar
    })();
    // Futuramente: achar um jeito melhor do que repetir 5 for loop
    for(let i = 0; i < arrPontos[0]; i++) {
        atualizaEstatistica("bracos", 1);
    }
    for(let i = 0; i < arrPontos[1]; i++) {
        atualizaEstatistica("blindagem", 1);
    }
    for(let i = 0; i < arrPontos[2]; i++) {
        atualizaEstatistica("nucleos", 1);
    }
    for(let i = 0; i < arrPontos[3]; i++) {
        atualizaEstatistica("pernas", 1);
    }
    for(let i = 0; i < arrPontos[4]; i++) {
        atualizaEstatistica("foguetes", 1);
    }
}

function atualizaPontos(qde) {
    tocaSom(1);
    pontosTotais += qde;
    inputPontos.value = pontosTotais;
}

for(let i = 0; i < botoesEsq.length; i++) {
    valoresArr[i] = 0;
    // Cliques nos botões esquerdos
    botoesEsq[i].addEventListener("click", event => {
        event.preventDefault();
        // Se index for entre 0 e 4 faça X, caso contrario Y
        if((i >= 0 && i <= 4)) {
            // Se meu valor for acima de 0, posso subtrair
            if(inputs[i].value > 0) {
                // Aumenta os pontos em 1
                atualizaPontos(1);
                atualizaEstatistica(event.target.dataset.peca, -1);
                inputs[i].value = parseInt(inputs[i].value) - 1;
            } else {
                tocaSom(2);
            }
        } else if (i === 5) {
            switch(true) {
                // Se o index for igual a 0, recomeça do último index (no caso 7)
                case roboCorAtual === roboCores[0]:
                    tocaSom(1);
                    corFonte(inputs[5], 7);
                    roboCorAtual = roboCores[7];
                    imgRobo.style.filter = `hue-rotate(${roboCorAtual}deg) saturate(1.25)`;
                    break;
                default:
                    // Troca a cor para o index atual - 1
                    for(let i2 = 0; i2 < roboCores.length; i2++) {
                        if(roboCorAtual === roboCores[i2]) {
                            tocaSom(1);
                            corFonte(inputs[5], i2 - 1);
                            roboCorAtual = roboCores[i2 - 1];
                            imgRobo.style.filter = `hue-rotate(${roboCorAtual}deg) saturate(1.25)`;
                            break;
                        }
                    }
            }
        }
    });
    // Cliques nos botões direitos
    botoesDir[i].addEventListener("click", event => {
        event.preventDefault();
        // Se index for entre 0 e 4 faça X, caso contrario Y
        if((i >= 0 && i <= 4)) {
            // Se meu valor for abaixo de 0, posso adicionar
            if(inputs[i].value < 10 && pontosTotais > 0) {
                atualizaEstatistica(event.target.dataset.peca, 1);
                inputs[i].value = parseInt(inputs[i].value) + 1;
                // Diminui os pontos em 1
                atualizaPontos(-1);
            } else {
                tocaSom(2);
            }
        } else if (i === 5) {
            switch(true) {
                // Se o index for igual a 7, recomeça do primeiro index (no caso 0)
                case roboCorAtual === roboCores[7]:
                    tocaSom(1);
                    corFonte(inputs[5], 0);
                    roboCorAtual = roboCores[0];
                    imgRobo.style.filter = `hue-rotate(${roboCorAtual}deg) saturate(1.25)`;
                    break;
                default:
                    // Troca a cor para o index atual - 1
                    for(let i2 = 0; i2 < roboCores.length; i2++) {
                        if(roboCorAtual === roboCores[i2]) {
                            tocaSom(1);
                            corFonte(inputs[5], i2 + 1);
                            roboCorAtual = roboCores[i2 + 1];
                            imgRobo.style.filter = `hue-rotate(${roboCorAtual}deg) saturate(1.25)`;
                            break;
                        }
                    }
            }
        }
    });
}
atualizaTudo();