// Selectors
const cells = document.querySelectorAll(".gamesquare");
const trackTurns = document.getElementById("turn");
const playAgain = document.getElementById("button-playagain");
const resetScore = document.getElementById("buttonresetscore")
const scoreboardX = document.getElementById("scoreboardx");
const scoreboardO = document.getElementById("scoreboardo");

const checkWinner = () => {
    const winPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]; //This is a list of all 8 patterns a player can win with
}

playAgain.addEventListener("click");
resetScore.addEventListener("click");