// save.js - Sistema de salvamento para Roleta de Minérios

(function() {
  'use strict';

  // Verifica se o jogo está carregado
  if (typeof window.gameState === 'undefined') {
    console.warn('Jogo não carregado. Salvamento desativado.');
    return;
  }

  const SAVE_KEY = 'miningGameSave_v2';

  function saveGame() {
    try {
      const data = window.gameState.get();
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Erro ao salvar:', e);
    }
  }

  function loadGame() {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        window.gameState.set(data);

        // Atualiza UI
        window.gameState.updateCoinsDisplay();
        window.gameState.updateDisplaysLayout();
        window.gameState.renderInventory();

        // Mostra botão do minerador se desbloqueado
        if (data.autoMinerUnlocked) {
          window.gameState.autoMinerBtn.style.display = 'block';
        }
      }
    } catch (e) {
      console.error('Erro ao carregar save:', e);
    }
  }

  function setupAutoSave() {
    setInterval(saveGame, 3000);
    window.addEventListener('beforeunload', saveGame);
  }

  // Hooks para salvar em eventos importantes
  const originalUpdateCoins = window.gameState.updateCoinsDisplay;
  window.gameState.updateCoinsDisplay = function() {
    originalUpdateCoins();
    saveGame();
  };

  const originalAddToInventory = window.addToInventory;
  window.addToInventory = function(itemName) {
    originalAddToInventory(itemName);
    saveGame();
  };

  // Substitui funções de compra e venda para salvar
  const originalBuyAutoMiner = document.getElementById('buyAutoMiner').onclick;
  document.getElementById('buyAutoMiner').onclick = function() {
    originalBuyAutoMiner();
    saveGame();
  };

  const originalBuyDoubleMine = document.getElementById('buyDoubleMine').onclick;
  document.getElementById('buyDoubleMine').onclick = function() {
    originalBuyDoubleMine();
    saveGame();
  };

  const originalBuySpeed = document.getElementById('buySpeed').onclick;
  document.getElementById('buySpeed').onclick = function() {
    originalBuySpeed();
    saveGame();
  };

  const originalSellItem = window.sellItem;
  window.sellItem = function() {
    originalSellItem();
    saveGame();
  };

  const originalSellAll = window.sellAll;
  window.sellAll = function() {
    originalSellAll();
    saveGame();
  };

  const originalOpenChest = document.getElementById('openChest').onclick;
  document.getElementById('openChest').onclick = function() {
    originalOpenChest();
    saveGame();
  };

  // Carrega e inicia salvamento
  loadGame();
  setupAutoSave();

  // Expõe para debug (opcional)
  window.saveGame = saveGame;
  window.loadGame = loadGame;
})();

