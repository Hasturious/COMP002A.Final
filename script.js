// Selectors
const cells = document.querySelectorAll(".game-square"); //sets cells to the game squares
const trackTurns = document.getElementById("turn"); //sets trackTurns to turns
const playAgainButton = document.getElementById("button-play-again"); //the play again button is the button play again
const resetScoreButton = document.getElementById("button-reset-score");//the resest score button is the button reset score 
const scoreboardX = document.getElementById("scoreboard-x");//scoreboardX is scoreboard-x
const scoreboardO = document.getElementById("scoreboard-o");//scoreboardO is scoreboard-o

// Variables
let isXTurn = true; //X goes first
let boardState = Array(9).fill(null); //Start the board blank
let scoreX = localStorage.getItem("scoreX") ? parseInt(localStorage.getItem("scoreX")) : 0; //checks if theres already a score in local storage. If there isnt we set it to zero
let scoreO = localStorage.getItem("scoreO") ? parseInt(localStorage.getItem("scoreO")) : 0; //Same as above but for O

// Set score
scoreboardX.textContent = scoreX; //Sets the X score in scoreboard
scoreboardO.textContent = scoreO; //Sets the X score in scoreboard

const checkWinner = () => { //Function to check for a winner
    const winPatterns = [ //all possible winning patterns
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]            // diagonals
    ];

    for (const pattern of winPatterns) { //this checks every pattern for in winPatterns and puts them for winners. If no winner is found the game continues
        const [a, b, c] = pattern; //a, b, and c are the three numbers in pattern. If they make up a winning pattern a winner is chosen

        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) { //This checks if b and c are the same type of symbol of a and if its empty or not. If all 3 are true we have a winner
            return boardState[a]; // Return "X" or "O" as the winner. We know who the winner by checker whos turn it is when a win is declared
        }
    }
    return boardState.includes(null) ? null : "Tie"; // Return "Tie" if no winner and no empty cells
};


const handleCellClick = (event) => { //Handle cell click events
    const cell = event.target; //Select the targeted cell
    const index = parseInt(cell.id.split("-")[1]); //check the ID of the cell 
    if (boardState[index] !== null) return; //checks if the cell is filled. If so nothing happens
    boardState[index] = isXTurn ? "X" : "O"; //check if isXTurn is true of false and updates the display to show a newly taken cell for whichever player
    cell.textContent = boardState[index]; //updates display for the players pick

    isXTurn = !isXTurn; //because X is first and X has just done thier turn now it can be Os turn which is defined as not isXTurn
    trackTurns.textContent = isXTurn ? "X\'s Turn" : "O\'s Turn"; //displays whos turn it is

    
    const winner = checkWinner(); //Check for a winner

    if (winner) { //When we do get a winner 4 things happen
        if (winner !== "Tie") { //The game ends. no one score is changed
            if (winner === "X") { //X gains a point
                scoreX += 1; //+1 to the score
                localStorage.setItem("scoreX", scoreX); //the score is updated to storage
            } else { //If winner wasnt X
                scoreO += 1; //O gets a point
                localStorage.setItem("scoreO", scoreO); //Which is updated to storage
            }
            alert(`${winner} wins!`); //whoever wins gets an anouncement
        } else { //If nobody wins...
            alert("It's a tie!"); //Its anounced a tie
        }

        // Update the displayed scores in the UI
        scoreboardX.textContent = scoreX; //the scoreboard for X shows as scoreX
        scoreboardO.textContent = scoreO; //the scoreboard for O shows as scoreO

        cells.forEach(cell => cell.removeEventListener("click", handleCellClick)); //Prevents further clicking from click
    }
};

function resetGame() { //Reset game function
    boardState.fill(null); //empties out all the cells
    cells.forEach(cell => cell.textContent = ""); //displays the cells as blank
    isXTurn = true; //X goes first every time
    trackTurns.textContent = "X\'s Turn"; //Displays that it is X's turn
    cells.forEach(cell => cell.addEventListener("click", handleCellClick)); //if it was disabled then the eventlistener is enabled again
}

function resetScore() { //Reset game function
    localStorage.clear(); //clears local storage
    scoreX = 0; //X's score is set to 0
    scoreO = 0; //O's score is set to 0
    scoreboardX.textContent = scoreX; //set the display back to zero
    scoreboardO.textContent = scoreO; //set the display back to zero
}

// Event listeners
playAgainButton.addEventListener("click", resetGame);// new game with kept scores
resetScoreButton.addEventListener("click", resetScore);//reset score and delete local memory 
cells.forEach(cell => cell.addEventListener("click", handleCellClick)); //add click event listeners to all cells at the start
