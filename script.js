// Selectors
const cells = document.querySelectorAll(".gamesquare");
const trackTurns = document.getElementById("turn");
const playAgainButton = document.getElementById("button-playagain");
const resetScoreButton = document.getElementById("buttonresetscore")
const scoreboardX = document.getElementById("scoreboardx");
const scoreboardO = document.getElementById("scoreboardo");

let isXTurn = true;
let boardState = Array(9).fill(null);
let scoreX = sessionStorage.getItem('scoreX') ? parseInt(sessionStorage.getItem('scoreX')) : 0;
let scoreO = sessionStorage.getItem('scoreO') ? parseInt(sessionStorage.getItem('scoreO')) : 0

const checkWinner = () => {
    const winPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]; //This is a list of all 8 patterns a player can win with
}

playAgainButton.addEventListener("click");
resetScoreButton.addEventListener("click", resetScore);