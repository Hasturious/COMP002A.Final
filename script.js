// Selectors
const cells = document.querySelectorAll(".game-square");
const trackTurns = document.getElementById("turn");
const playAgainButton = document.getElementById("button-play-again");
const resetScoreButton = document.getElementById("button-reset-score");
const scoreboardX = document.getElementById("scoreboard-x");
const scoreboardO = document.getElementById("scoreboard-o");

// Variables
let isXTurn = true;
let boardState = Array(9).fill(null);
let scoreX = localStorage.getItem('scoreX') ? parseInt(localStorage.getItem('scoreX')) : 0;
let scoreO = localStorage.getItem('scoreO') ? parseInt(localStorage.getItem('scoreO')) : 0;

// Set initial scores in the UI
scoreboardX.textContent = scoreX;
scoreboardO.textContent = scoreO;

// Function to check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    for (const pattern of winPatterns) { //this checks every pattern for in winPatterns and puts them for winners. If no winner is found the game continues
        const [a, b, c] = pattern; //a, b, and c are the three numbers in pattern. If they make up a winning pattern a winner is chosen

        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) { //This checks if b and c are the same type of symbol of a and if its empty or not. If all 3 are true we have a winner
            return boardState[a]; // Return 'X' or 'O' as the winner. We know who the winner by checker whos turn it is when a win is declared
        }
    }
    return boardState.includes(null) ? null : 'Tie'; // Return 'Tie' if no winner and no empty cells
};

// Handle cell click events
const handleCellClick = (event) => {
    const cell = event.target;
    const index = parseInt(cell.id.split('-')[1]);

    // Ignore clicks on already filled cells
    if (boardState[index] !== null) return;

    // Update the board state and UI
    boardState[index] = isXTurn ? 'X' : 'O';
    cell.textContent = boardState[index];

    // Switch turns and update the turn tracker
    isXTurn = !isXTurn;
    trackTurns.textContent = isXTurn ? 'X\'s Turn' : 'O\'s Turn';

    // Check for a winner
    const winner = checkWinner();

    if (winner) {
        if (winner !== 'Tie') {
            // Update the score for the winner
            if (winner === 'X') {
                scoreX += 1;
                localStorage.setItem('scoreX', scoreX);
            } else {
                scoreO += 1;
                localStorage.setItem('scoreO', scoreO);
            }
            alert(`${winner} wins!`);
        } else {
            alert("It's a tie!");
        }

        // Update the displayed scores in the UI
        scoreboardX.textContent = scoreX;
        scoreboardO.textContent = scoreO;

        // Disable further clicks after the game ends
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }
};

// Reset game function
function resetGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isXTurn = true;
    trackTurns.textContent = 'X\'s Turn';
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

// Reset score function
function resetScore() {
    localStorage.clear(); // Clears local storage
    scoreX = 0;
    scoreO = 0;
    scoreboardX.textContent = scoreX;
    scoreboardO.textContent = scoreO;
}

// Event listeners
playAgainButton.addEventListener("click", resetGame);
resetScoreButton.addEventListener("click", resetScore);

// Add click event listeners to all cells at the start
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
