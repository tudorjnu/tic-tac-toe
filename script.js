var ticTacToe = (function() {
  var gameboard = ['', '', '', '', '', '', '', '', ''];
  var currentPlayer = 'X';
  var isGameOver = false;

  const gameScore = {
    playerOneScore: 0,
    playerTwoScore: 0,
    ties: 0,
  }

  const domElements = {
    gameBoard: null,
    cells: null,
    gameStatus: null,
    currentTurn: null,
  };

  const cacheDom = () => {
    domElements.gameBoard = document.getElementById('gameBoard');
    domElements.cells = document.querySelectorAll('.cell');
    domElements.currentTurn = document.getElementById('currentTurn');
    domElements.resetButton = document.getElementById('resetButton');
    domElements.playerOneScore = document.getElementById('playerOneScore');
    domElements.playerTwoScore = document.getElementById('playerTwoScore');
    domElements.ties = document.getElementById('ties');
    domElements.gameResult = {
      modal: document.getElementById('gameResultModal'),
      modalClose: document.getElementById('gameResultModalClose'),
      modalResultText: document.getElementById('gameResultText'),
    }
  };

  const init = () => {
    cacheDom();
    bindEvents();
    render();
  };

  const render = () => {
    gameboard.forEach((cell, index) => {
      domElements.cells[index].textContent = cell;
    });
    domElements.currentTurn.textContent = currentPlayer;
    domElements.playerOneScore.textContent = gameScore.playerOneScore;
    domElements.playerTwoScore.textContent = gameScore.playerTwoScore;
    domElements.ties.textContent = gameScore.ties;
  };

  const bindEvents = () => {
    domElements.cells.forEach((cell, index) => {
      cell.addEventListener('click', function() {
        if (gameboard[index] == '' && !isGameOver) {
          gameboard[index] = `${currentPlayer}`;
          currentPlayer = currentPlayer == "X" ? "O" : "X";
          render();
          checkGameOver();
        }
      });
    });

    domElements.resetButton.addEventListener('click', function() {
      gameboard.forEach((cell, index) => {
        gameboard[index] = "";
      });
      currentPlayer = "X";
      render();
    })

    domElements.gameResult.modalClose.addEventListener('click', function() {
      domElements.gameResult.modal.style.display = "none";
      resetGame();
    })

    window.onclick = function(event) {
      if (event.target == domElements.gameResult.modal) {
        domElements.gameResult.modal.style.display = "none";
        resetGame();
      }
    }
  };

  const checkGameOver = () => {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]

    for (let combo of winCombinations) {
      if (gameboard[combo[0]] !== '' &&
        gameboard[combo[0]] === gameboard[combo[1]] &&
        gameboard[combo[1]] === gameboard[combo[2]]) {
        if (gameboard[combo[0]] === 'X') {
          gameScore.playerOneScore += 1;
          openModal('X');
        } else {
          gameScore.playerTwoScore += 1;
          openModal('O');
        }
        isGameOver = true;
      }
    }

    if (gameboard.every(cell => cell !== '')) {
      gameScore.ties += 1;
      openModal('');
      isGameOver = true;
    }
    isGameOver = false;
  };

  const openModal = (result) => {
    let resultText = '';
    switch (result) {
      case 'X':
        resultText = 'X Won!';
        break;
      case 'O':
        resultText = 'O Won!';
        break;
      default:
        resultText = 'Tie!';
    }
    domElements.gameResult.modalResultText.innerText = resultText;
    domElements.gameResult.modal.style.display = 'block';
  }

  const resetGame = () => {
    gameboard.forEach((cell, index) => {
      gameboard[index] = '';
    })
    currentPlayer = 'X';
    render();
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', ticTacToe.init);

