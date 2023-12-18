var ticTacToe = (function() {
  var gameboard = ['A', '', '', '', '', '', '', '', ''];
  var currentPlayer = 'X';
  var isGameOver = false;

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
  };

  const bindEvents = () => {
    domElements.cells.forEach((cell, index) => {
      cell.addEventListener('click', function() {
        if (gameboard[index] == '' && !isGameOver) {
          gameboard[index] = `${currentPlayer}`;
          currentPlayer = currentPlayer == "X" ? "O" : "X";
          render();
          checkGameOver();
          console.log(isGameOver);
        }
      });
    });
  }

  const checkGameOver = () => {
    isGameOver = gameboard.every(cell => cell !== '');
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', ticTacToe.init);

