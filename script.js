// Selectors
const cells = document.querySelectorAll(".game-square");
const trackTurns = document.getElementById("turn");
const playAgainButton = document.getElementById("button-play-again");
const resetScoreButton = document.getElementById("button-reset-score")
const scoreboardX = document.getElementById("scoreboard-x");
const scoreboardO = document.getElementById("scoreboard-o");

// Varibles
let XTurn = true;
let boardState = Array(9).fill(null);
let scoreX = sessionStorage.getItem('scoreX') ? parseInt(sessionStorage.getItem('scoreX')) : 0;
let scoreO = sessionStorage.getItem('scoreO') ? parseInt(sessionStorage.getItem('scoreO')) : 0

// Set Scores
scoreboardX.textContent = scoreX;
scoreboardO.textContent = scoreO;

const checkWinner = () => {
    const winPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]; //This is a list of all 8 patterns a player can win with
}

function resetScore() { //defines the resetScore function
    sessionStorage.clear() //clears stored data
}

function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    XTurn = true;
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

playAgainButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScore);