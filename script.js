// Definição dos itens e suas probabilidades
const items = [
  { name: "🌳 Terra", chance: 15 },
  { name: "🪓 Madeira", chance: 10 },
  { name: "🌑 Pedra", chance: 7 },
  { name: "🔩 Ferro", chance: 5 },
  { name: "🟨 Ouro", chance: 3 },
  { name: "💎 Diamante", chance: 2 },
  { name: "🟢 Esmeralda", chance: 1.4 },
  { name: "🔴 Rubi", chance: 0.9 }
];

// Variáveis globais
let inventory = {};
let totalChances = items.reduce((sum, item) => sum + item.chance, 0);

// Carregar o inventário salvo
function loadInventory() {
  const savedInventory = localStorage.getItem("inventory");
  if (savedInventory) {
    inventory = JSON.parse(savedInventory); // Converte a string JSON de volta para objeto
  }
}

// Salvar o inventário
function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory)); // Converte o objeto para string JSON
}

// Função para sortear um item
function spin() {
  const spinButton = document.getElementById("spinButton");
  const resultElement = document.getElementById("result");

  // Desativa o botão e altera o texto
  spinButton.disabled = true;
  spinButton.textContent = "Aguarde...";

  // Gera um número aleatório para sortear o item
  let random = Math.random() * totalChances;
  let cumulativeChance = 0;

  for (let item of items) {
    cumulativeChance += item.chance;
    if (random < cumulativeChance) {
      addItemToInventory(item.name);
      resultElement.textContent = `Você ganhou: ${item.name}`;
      resultElement.style.display = "block"; // Mostra a mensagem

      // Esconde a mensagem após 2 segundos
      setTimeout(() => {
        resultElement.style.display = "none";
      }, 2000); // Mensagem desaparece em 2 segundos

      break;
    }
  }

  // Reativa o botão após 3 segundos
  setTimeout(() => {
    spinButton.disabled = false; // Reativa o botão
    spinButton.textContent = "Roletar"; // Restaura o texto original
  }, 3000); // Botão reativado em 3 segundos
}

// Função para adicionar um item ao inventário
function addItemToInventory(itemName) {
  if (inventory[itemName]) {
    inventory[itemName]++;
  } else {
    inventory[itemName] = 1;
  }
  saveInventory(); // Salva automaticamente o inventário
}

// Função para exibir o inventário
function showInventory() {
  const inventoryList = document.getElementById("inventoryList");
  inventoryList.innerHTML = ""; // Limpa a lista anterior

  let totalItems = 0; // Variável para contar o total de itens
  for (let itemName in inventory) {
    const li = document.createElement("li");
    li.textContent = `${itemName}: ${inventory[itemName]}`;
    inventoryList.appendChild(li);
    totalItems += inventory[itemName]; // Soma o total
  }

  // Exibe o total de itens
  const totalElement = document.createElement("p");
  totalElement.textContent = `Total de itens: ${totalItems}`;
  inventoryList.appendChild(totalElement);

  toggleVisibility("inventory");
}

// Função para exibir a lista de chances
function showChances() {
  const chancesList = document.getElementById("chances");
  chancesList.innerHTML = ""; // Limpa a lista anterior

  for (let item of items) {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.chance}%`;
    chancesList.appendChild(li);
  }

  toggleVisibility("chancesList");
}

// Função para alternar a visibilidade de um elemento
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.classList.toggle("hidden");
}

// Função para resetar o progresso
function resetProgress() {
  // Limpa o inventário
  inventory = {};
  saveInventory(); // Salva o inventário vazio no localStorage

  // Limpa a exibição do inventário na tela
  const inventoryList = document.getElementById("inventoryList");
  inventoryList.innerHTML = "";

  // Limpa a mensagem de resultado, se estiver visível
  const resultElement = document.getElementById("result");
  resultElement.style.display = "none";
  resultElement.textContent = "";

  // Mostra uma mensagem de confirmação
  alert("Progresso resetado com sucesso!");
}

// Eventos dos botões
document.getElementById("spinButton").addEventListener("click", spin);
document.getElementById("inventoryButton").addEventListener("click", showInventory);
document.getElementById("chancesButton").addEventListener("click", showChances);
document.getElementById("resetButton").addEventListener("click", resetProgress);

// Carregar o inventário ao iniciar o script
loadInventory();