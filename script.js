const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let condition of winPatterns) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    showResult(`🎉 Player ${currentPlayer} Wins!`);
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    showResult("😐 It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.style.display = "flex";
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('disabled');
  });
}

function startNewGame() {
  resultScreen.style.display = "none";
  resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
