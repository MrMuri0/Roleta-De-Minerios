// Definição dos itens, probabilidades e valores de conversão
const items = [
  { name: "🌳 Terra", chance: 17 },
  { name: "🪓 Madeira", chance: 12 },
  { name: "🌑 Pedra", chance: 9 },
  { name: "⬛ Obsidiana", chance: 8 },
  { name: "🔶 Cobre", chance: 6.5 },
  { name: "🔩 Ferro", chance: 7 },
  { name: "⬜ Quartzo", chance: 5.2 },
  { name: "🟣 Ametista", chance: 4 },
  { name: "🟨 Ouro", chance: 2.5 },
  { name: "💎 Diamante", chance: 1.5 },
  { name: "🟢 Esmeralda", chance: 1.2 },
  { name: "🔴 Rubi", chance: 0.7 },
  { name: "🌞 Pedra do Sol", chance: 0.5 },
  { name: "🔷 Cristal da Lua", chance: 0.02 },
  { name: "☄ Meteorito", chance: 0.007 },
  { name: "🎁 Baú", chance: 1.5 } // Novo item "Baú"
];

// Valores de conversão para moedas
const conversionRates = {
  "🌳 Terra": 0.5,
  "🪓 Madeira": 1,
  "🌑 Pedra": 2,
  "⬛ Obsidiana": 5,
  "🔶 Cobre": 6.5,
  "🔩 Ferro": 7.5,
  "⬜ Quartzo": 8,
  "🟣 Ametista": 10,
  "🟨 Ouro": 15,
  "💎 Diamante": 20,
  "🟢 Esmeralda": 30,
  "🔴 Rubi": 50,
  "🌞 Pedra do Sol": 100,
  "🔷 Cristal da Lua": 500,
  "☄ Meteorito": 1500
};

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
      if (item.name === "🎁 Baú") {
        // Caso especial para o Baú
        handleChest();
      } else {
        addItemToInventory(item.name);
        resultElement.textContent = `Você ganhou: ${item.name}`;
        resultElement.style.display = "block"; // Mostra a mensagem

        // Esconde a mensagem após 2 segundos
        setTimeout(() => {
          resultElement.style.display = "none";
        }, 2000); // Mensagem desaparece em 2 segundos
      }

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

  // Exibe os itens do inventário na ordem da lista de chances
  items.forEach((item) => {
    if (inventory[item.name] && inventory[item.name] > 0) {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${inventory[item.name]}`;
      inventoryList.appendChild(li);
      totalItems += inventory[item.name]; // Soma o total
    }
  });

  // Adiciona a moeda abaixo de todos os outros itens
  if (inventory["💰 Moeda"] && inventory["💰 Moeda"] > 0) {
    const coinLi = document.createElement("li");
    coinLi.textContent = `💰 Moeda: ${inventory["💰 Moeda"]}`;
    inventoryList.appendChild(coinLi);
    totalItems += inventory["💰 Moeda"];
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

// Função para exibir os valores de conversão
function showValues() {
  const valuesList = document.getElementById("values");
  valuesList.innerHTML = ""; // Limpa a lista anterior

  for (let itemName in conversionRates) {
    const li = document.createElement("li");
    li.textContent = `${itemName}: ${conversionRates[itemName]} moedas`;
    valuesList.appendChild(li);
  }

  toggleVisibility("valuesList");
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

// Função para abrir o modal de conversão
function openConvertModal() {
  const convertModal = document.getElementById("convertModal");
  const itemSelect = document.getElementById("itemSelect");

  // Preenche o select com os itens disponíveis no inventário, exceto "Moeda"
  itemSelect.innerHTML = "";
  for (let itemName in inventory) {
    if (itemName !== "💰 Moeda") { // Ignora "Moeda"
      const option = document.createElement("option");
      option.value = itemName;
      option.textContent = itemName;
      itemSelect.appendChild(option);
    }
  }

  toggleVisibility("convertModal");
}

// Função para confirmar a conversão
function confirmConversion() {
  const itemSelect = document.getElementById("itemSelect");
  const quantityInput = document.getElementById("quantityInput");
  const errorMessage = document.getElementById("errorMessage");

  const selectedItem = itemSelect.value;
  const selectedQuantity = parseInt(quantityInput.value);

  // Verifica se o jogador tem o suficiente do item selecionado
  if (!inventory[selectedItem] || inventory[selectedItem] < selectedQuantity) {
    errorMessage.classList.remove("hidden");
    return;
  }

  // Remove o item do inventário
  inventory[selectedItem] -= selectedQuantity;

  // Se o item ficar com quantidade zero, remove-o completamente do inventário
  if (inventory[selectedItem] <= 0) {
    delete inventory[selectedItem];
  }

  // Calcula o total de moedas ganhas
  const coinValue = conversionRates[selectedItem];
  const totalCoins = coinValue * selectedQuantity;

  // Adiciona moedas ao inventário
  const coinName = "💰 Moeda";
  if (inventory[coinName]) {
    inventory[coinName] += totalCoins;
  } else {
    inventory[coinName] = totalCoins;
  }

  saveInventory();
  errorMessage.classList.add("hidden");
  toggleVisibility("convertModal");
  showInventory(); // Atualiza o inventário na tela
}

// Função para lidar com o Baú
function handleChest() {
  const resultElement = document.getElementById("result");
  const chestMessage = document.createElement("div");
  chestMessage.innerHTML = `
    <p>Você encontrou um <strong>🎁 Baú</strong>!</p>
    <button id="openChestButton">Abrir baú por 500 moedas</button>
    <button id="ignoreChestButton">Ignorar</button>
  `;
  resultElement.appendChild(chestMessage);

  // Eventos dos botões
  document.getElementById("openChestButton").addEventListener("click", openChest);
  document.getElementById("ignoreChestButton").addEventListener("click", ignoreChest);
}

// Função para abrir o baú
function openChest() {
  const coinName = "💰 Moeda";
  if (inventory[coinName] >= 500) {
    // Remove 500 moedas do inventário
    inventory[coinName] -= 500;

    // Sorteia um item valioso (acima de "Ametista")
    const valuableItems = items.filter(item => conversionRates[item.name] > conversionRates["🟣 Ametista"]);
    const randomIndex = Math.floor(Math.random() * valuableItems.length);
    const valuableItem = valuableItems[randomIndex].name;

    // Adiciona o item ao inventário
    addItemToInventory(valuableItem);

    // Atualiza a mensagem
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Você abriu o baú e ganhou: ${valuableItem}`;

    // Limpa os botões antigos
    const buttons = document.querySelectorAll("#result button");
    buttons.forEach(button => button.remove());
  } else {
    alert("Você não tem suficientes moedas para abrir o baú!");
  }
}

// Função para ignorar o baú
function ignoreChest() {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
}

// Eventos dos botões
document.getElementById("spinButton").addEventListener("click", spin);
document.getElementById("inventoryButton").addEventListener("click", showInventory);
document.getElementById("chancesButton").addEventListener("click", showChances);
document.getElementById("valuesButton").addEventListener("click", showValues);
document.getElementById("convertButton").addEventListener("click", openConvertModal);
document.getElementById("confirmConvert").addEventListener("click", confirmConversion);
document.getElementById("resetButton").addEventListener("click", resetProgress);

// Carregar o inventário ao iniciar o script
loadInventory();
