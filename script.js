// Definição dos itens e suas probabilidades
const items = [
  { name: "🌳 Terra", chance: 17 },
  { name: "🪓 Madeira", chance: 12 },
  { name: "🌑 Pedra", chance: 9 },
  { name: "⬛ Obsidiana", chance: 8 },
  { name: "🔩 Ferro", chance: 7 },
  { name: "⬜ Quartzo", chance: 5.2 },
  { name: "🟣 Ametista", chance: 4 },
  { name: "🟨 Ouro", chance: 2.5 },
  { name: "💎 Diamante", chance: 1.5 },
  { name: "🟢 Esmeralda", chance: 1.2 },
  { name: "🔴 Rubi", chance: 0.7 },
  { name: "🌞 Pedra do Sol", chance: 0.5 },
  { name: "🔷 Cristal da Lua", chance: 0.02 },
  { name: "☄ Meteorito", chance: 0.007 }
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

// Função para exibir o inventário (ATUALIZADO)
function showInventory() {
  const inventoryList = document.getElementById("inventoryList");
  inventoryList.innerHTML = ""; // Limpa a lista anterior

  let totalItems = 0; // Variável para contar o total de itens

  // Ordena o inventário com base na ordem da lista de itens
  items.forEach((item) => {
    if (inventory[item.name]) {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${inventory[item.name]}`;
      inventoryList.appendChild(li);
      totalItems += inventory[item.name]; // Soma o total
    }
  });

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
