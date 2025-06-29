// Constantes
const DRAGAO_VOGAIS = 3; // "Dragão" tem 3 vogais (a, ã, o)
const SEQUENCIA_INICIAL = [1, 2];

// Elementos do DOM
const decipherBtn = document.getElementById('decipher');
const returnBtn = document.getElementById('return');
const positionInput = document.getElementById('position');
const resultDiv = document.getElementById('result');
const calculationDiv = document.getElementById('calculation');

// Função principal para calcular o código secreto do dragão
function dragonSecretCode(position) {
  // Verifica se a posição é 1 ou 2 (valores iniciais)
  if (position === 1) return SEQUENCIA_INICIAL[0];
  if (position === 2) return SEQUENCIA_INICIAL[1];

  // Inicializa a sequência
  let sequence = [...SEQUENCIA_INICIAL];

  // Calcula os próximos valores até chegar na posição desejada
  for (let i = 2; i < position; i++) {
    const nextValue = (sequence[i - 1] + sequence[i - 2]) * DRAGAO_VOGAIS;
    sequence.push(nextValue);
  }

  return sequence[position - 1];
}

// Função para formatar o cálculo para exibição
function formatCalculation(position, result) {
  if (position === 1) return `O primeiro valor da sequência é sempre ${result}.`;
  if (position === 2) return `O segundo valor da sequência é sempre ${result}.`;

  return `Cálculo: (${dragonSecretCode(position - 1)} + ${dragonSecretCode(
    position - 2
  )}) * ${DRAGAO_VOGAIS} = ${result}`;
}

// Função para validar o input
function validateInput() {
  const value = parseInt(positionInput.value);

  if (isNaN(value)) {
    alert('Por favor, insira um número válido.');
    return false;
  }

  if (value < 1) {
    alert('Por favor, insira um número positivo maior que zero.');
    return false;
  }

  return true;
}

// Evento de clique no botão DECIFRAR
decipherBtn.addEventListener('click', () => {
  if (!validateInput()) return;

  const position = parseInt(positionInput.value);
  const result = dragonSecretCode(position);
  const calculation = formatCalculation(position, result);

  resultDiv.textContent = `Posição ${position}: ${result}`;
  calculationDiv.textContent = calculation;
});

// Evento de clique no botão RETORNAR
returnBtn.addEventListener('click', () => {
  positionInput.value = '';
  resultDiv.textContent = '';
  calculationDiv.textContent = '';
  positionInput.focus();
});

// Evento para permitir apenas números no input
positionInput.addEventListener('input', e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
