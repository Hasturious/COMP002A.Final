//Selectors
const cells = document.querySelectorAll(".game-square");
const trackTurns = document.getElementById("turn");
const playAgainButton = document.getElementById("button-play-again");
const resetScoreButton = document.getElementById("button-reset-score")
const scoreboardX = document.getElementById("scoreboard-x");
const scoreboardO = document.getElementById("scoreboard-o");

//Varibles
let XTurn = true;
let boardState = Array(9).fill(null);
let scoreX = sessionStorage.getItem('scoreX') ? parseInt(sessionStorage.getItem('scoreX')) : 0;
let scoreO = sessionStorage.getItem('scoreO') ? parseInt(sessionStorage.getItem('scoreO')) : 0

//Set Scores
scoreboardX.textContent = scoreX;
scoreboardO.textContent = scoreO;

/*
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8

a diagram that points to each position of the tictactoe board
*/
const checkWinner = () => {
    const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //row
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //column 
    [0, 4, 8], [2, 4, 6] ]; //diagonal
    //This is a list of all 8 patterns a player can win with
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
    
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c])
        {
            return boardState[a]; // Return 'X' or 'O' as the winner
        }
    }
    return boardState.includes(null) ? null : 'Tie'; //If no winner and no empty cells, return 'Tie'   
}



function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    XTurn = true;
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

playAgainButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScore);