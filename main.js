// elementos da calculadora
const display = document.querySelector(".display-calculadora");
const numeros = document.querySelectorAll(".btn-num");
const operadores = document.querySelectorAll(".btn-operator");
const clear = document.querySelector("#clear");
const negate = document.querySelector("#negate");
const percent = document.querySelector("#percent");
const equals = document.querySelector("#equals");

// variáveis da calculadora
let primeiroNumero = "";
let segundoNumero = "";
let operador = "";
let resultado = null; // Adicione esta linha para definir a variável resultado

// Função para calcular o resultado de uma expressão
function calculate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "×":
      return num1 * num2;
    case "÷":
      return num1 / num2;
    default:
      return null;
  }
}

// evento de clique para cada botão de número
numeros.forEach((numero) => {
  numero.addEventListener("click", () => {
    // se um resultado anterior estiver disponível, limpe-o
    if (resultado !== null) {
      resultado = null;
      display.textContent = "";
    }

    // Adicione o número à expressão atual
    if (operador === "") {
      primeiroNumero += numero.value;
      display.textContent = primeiroNumero;
    } else {
      segundoNumero += numero.value;
      display.textContent = segundoNumero;
    }
  });
});

// evento de clique para cada botão de operador
operadores.forEach((op) => {
  op.addEventListener("click", () => {
    // Se já houver um resultado anterior, atualize o primeiro número e limpe o resultado
    if (resultado !== null) {
      primeiroNumero = resultado.toString();
      resultado = null;
    }

    // Se um operador anterior estiver em uso, calcule a expressão
    if (operador !== "" && primeiroNumero !== "") {
      segundoNumero = parseFloat(segundoNumero); // Converta para número
      resultado = calculate(
        parseFloat(primeiroNumero),
        segundoNumero,
        operador
      );
      display.textContent = resultado;
      primeiroNumero = resultado.toString();
    }

    operador = op.value;
    segundoNumero = "";
  });
});

// evento de clique para o botão de porcentagem
percent.addEventListener("click", () => {
  // se o segundo número estiver presente, calcule a porcentagem dele
  if (segundoNumero !== "") {
    segundoNumero = parseFloat(segundoNumero) / 100;
    display.textContent = segundoNumero;
  } else if (primeiroNumero !== "") {
    // se não, calcule a porcentagem do primeiro número
    primeiroNumero = parseFloat(primeiroNumero) / 100;
    display.textContent = primeiroNumero;
  }
});

// evento de clique para o botão de igual
equals.addEventListener("click", () => {
  // se o primeiro e o segundo número foram inseridos e um operador foi selecionado, execute a operação correspondente
  if (primeiroNumero !== "" && segundoNumero !== "" && operador !== "") {
    segundoNumero = parseFloat(segundoNumero); // Converta para número

    switch (operador) {
      case "+":
        resultado = parseFloat(primeiroNumero) + segundoNumero;
        break;
      case "-":
        resultado = parseFloat(primeiroNumero) - segundoNumero;
        break;
      case "×":
        resultado = parseFloat(primeiroNumero) * segundoNumero;
        break;
      case "÷":
        resultado = parseFloat(primeiroNumero) / segundoNumero;
        break;
    }

    // exibe o resultado
    display.textContent = resultado;

    // atualiza o primeiro número para ser usado na próxima operação
    primeiroNumero = resultado.toString();

    // limpa as variáveis da calculadora
    segundoNumero = "";
    operador = "";
  }
});

// evento de clique para o botão de limpar
clear.addEventListener("click", () => {
  // limpe as variáveis da calculadora e exiba "0" na tela
  primeiroNumero = "";
  segundoNumero = "";
  operador = "";
  display.textContent = "0";
});

// evento de clique para o botão de negativo
negate.addEventListener("click", () => {
  // se um operador não foi selecionado, torne o primeiro número negativo
  if (operador === "") {
    primeiroNumero = -parseFloat(primeiroNumero);
    display.textContent = primeiroNumero;
    // caso contrário, torne o segundo número negativo
  } else {
    segundoNumero = -parseFloat(segundoNumero);
    display.textContent = segundoNumero;
  }
});

let activeButton = null;

const yellowButtons = document.querySelectorAll(".btn-yellow");
const allButtons = document.querySelectorAll(".btn");

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("btn-yellow")) {
      // remove a classe de todos os botões amarelos
      yellowButtons.forEach((yellowButton) => {
        yellowButton.classList.remove("btn-yellow-active");
      });
      // adiciona a classe apenas no botão amarelo clicado
      button.classList.add("btn-yellow-active");
    } else {
      // remove a classe de todos os botões amarelos
      yellowButtons.forEach((yellowButton) => {
        yellowButton.classList.remove("btn-yellow-active");
      });
    }
  });
});
