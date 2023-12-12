
function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // creates the inital 2d array, 3x3 grid
  for (let i = 0; i < rows; i++) 
  {
    board[i] = [];
    for (let j = 0; j < columns; j++) 
    {
        board[i].push(`-`);
    }
  };

  const getBoard = () => board;
  return { getBoard};
};

function GameController(playerOne = "Player One",playerTwo = "player Two") {
  const board = GameBoard();

  const players = [
    {
      name: playerOne,
      token: "X"
    },
    {
      name: playerTwo,
      token: "O"
    }
  ]

  let activePlayer = players[0];
  const activeToken = players[0].token;

  const getActivePlayer = () => activePlayer;

  const getActiveToken = () => activePlayer.token;

  const changeTurns = () =>
  {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () =>
  {
    console.log(`${activePlayer.name} please click where you want to place your ${activeToken}`);
  }

  const updateBoard = (row,column) =>
  {
    const boardArray = board.getBoard();
    boardArray[row][column] = activePlayer.token;
  }

  

  const checkWinCondition = () =>
  {
    const boardArray = board.getBoard();
    let playerOneWinner;
    let rowWin;
    let columnWin;
    let leftDiagWin;
    let rightDiagWin;

    console.log(boardArray);

    // check rows for win
    for (let i = 0; i < boardArray.length; i++)
    {
      if(boardArray[i][0] == "X" && boardArray[i][1] == "X" && boardArray[i][2] == "X")
      {
        playerOneWinner = true;
        rowWin = i;
        console.log("Player One Wins!");
      }
    }

    // check columns for winner

    for (let i = 0; i < boardArray.length; i++)
    {
      if(boardArray[0][i] == "X" && boardArray[1][i] == "X" && boardArray[2][i] == "X")
      {
        playerOneWinner = true;
        columnWin = i;
        console.log("Player One Wins!");
      }
    }

    // check left diagonal for win \

    if(boardArray[0][0] == "X" && boardArray[1][1] == "X" && boardArray[2][2] == "X")
    {
      playerOneWinner = true;
      leftDiagWin = true;
      console.log("Player One Wins!");
    } 
    // check right diagonal wins
    else if(boardArray[0][2] == "X" && boardArray[1][1] == "X" && boardArray[2][0] == "X")
    {
      playerOneWinner = true;
      rightDiagWin = true;
      console.log("Player One Wins!");
    }
  }

  const playRound = (row,column) =>
  {
    updateBoard(row,column);
    checkWinCondition();
    changeTurns();
    printNewRound();
    
  };

  return {playRound, getActivePlayer,getActiveToken, getBoard: board.getBoard};
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => 
  {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn!`;

    board.forEach((row,rowindex) => {
    row.forEach((cell,columnindex) => {
      let cellButton = document.createElement("button");
      cellButton.classList.add("cell");
      cellButton.dataset.row = rowindex;
      cellButton.dataset.column = columnindex;
      cellButton.textContent = board[rowindex][columnindex];
      if (cellButton.textContent != "-") {
        cellButton.removeEventListener("click", clickHandlerBoard);
      }
      else{
        cellButton.addEventListener("click", clickHandlerBoard);
      }
      boardDiv.appendChild(cellButton);
      })
    });
  }
    

  function clickHandlerBoard(e) {
    const selectedCellRow = e.target.dataset.row;
    const selectedCellColumn = e.target.dataset.column;
    if (!selectedCellRow) return;
    
    game.playRound(selectedCellRow,selectedCellColumn);

    updateScreen();
  }

  updateScreen();
};
ScreenController();
