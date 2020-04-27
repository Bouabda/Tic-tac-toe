/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game-status');
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
/*
We will use gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
We will store our current player here, so we know whos turn 
*/
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
*/
let winningMessage = () => `Player ${currentPlayer} has won!`;
let drawMessage = () => `Game ended with draw.`;
let playerTurn = () => `it's ${currentPlayer} turn.`
// we set a initial message to know which player's turn.
statusDisplay.innerHTML = playerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    //We update our internal game state to reflect the played move, as well as update the user interface to reflect the played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

function handlePlayerChange() {
    // change the current player and update the game status message.
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = playerTurn();
};
// set all the winning conditions inside a matrix and than check if the round is won or no.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false; 
    for (let i = 0; i < winningConditions.length; i++){ 
        const win = winningConditions[i]
        let a = gameState[win[0]]
        let b = gameState[win[1]]
        let c = gameState[win[2]]
        if (a === "" || b === "" || c === ""){ 
            continue;
        }
        if (a === b && b === c){ 
            roundWon = true; 
            break;
        }
    }
    if (roundWon){ 
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /* 
    We will check weather there are any values in our game state array 
    that are still not populated with a player sign
    */
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    /*
    If we get to here we know that the no one won the game yet, 
    and that there are still moves to be played, so we continue by changing the current player.
    */
    handlePlayerChange();
};

function handleCellClick(clickedCellEvent) { 
    //we save the click html element in a variable 
    const clickedCell = clickedCellEvent.target;
    // we will grab the data-cell-index of the clicked cell
    const clickedCellIndex = clickedCell.getAttribute('data-cell-index')
    // if we the cell was already played or the game is pause the click event should be ignored 
    if (gameState[clickedCellIndex]!== "" || !gameActive){ 
        return;
    }
    //if everything is in order we will proceed the game flow
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){ 
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = playerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
    
};
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);