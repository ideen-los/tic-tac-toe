/* GAMEBOARD LAYOUT
======================================== */
const gameBoard = (function () {
  // the layout of the Tic Tac Toe grid
  const layout = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getLayout = () => {
    return layout;
  };
  const setLayout = (layoutObj) => {
    layout.push(layoutObj);
  };
  const clearLayout = () => {
    layout.splice[0](0, 3, 0, 0, 0);
    layout.splice[1](0, 3, 0, 0, 0);
    layout.splice[2](0, 3, 0, 0, 0);
  };

  // Export functions
  return { getLayout, setLayout, clearLayout };
})();

/* PLAYER CREATION
======================================== */
const playerCreation = (function () {
  // Create default Players
  const players = [
    { mark: "X", name: "Player X", wins: 0 },
    { mark: "O", name: "Player O", wins: 0 },
  ];

  const getPlayers = () => {
    return players;
  };

  const setDefaultPlayers = () => {
    players.splice(0);
    players.push(
      { mark: "X", name: "Player X", wins: 0 },
      { mark: "O", name: "Player O", wins: 0 }
    );
  };

  // Function to get the names of both players
  const getPlayerName = () => {
    // Get the forms that handle the player name input
    const PlayerNameInput = document.querySelectorAll("form");

    let player1ButtonPressed = false;
    let player2ButtonPressed = false;

    // Add submit event listener to the forms
    for (let form of PlayerNameInput) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the value of the name input
        let playerName = form.elements["player-name"].value;
        // Sets the index of the player object in the players array to retrieve
        let playerIndex = 0;

        if (e.target.classList.contains("player1")) {
          player1ButtonPressed = true;
          // If no value has been given use default name
          if (playerName === "") {
            playerName = "Player X";
          }
        } else {
          player2ButtonPressed = true;
          playerIndex = 1;
          // If no value has been given use default name
          if (playerName === "") {
            playerName = "Player O";
          }
        }

        setPlayerName(playerIndex, playerName);
        showPlayerDetails.updatePlayerDisplay(e.target);

        // If players have confirmed their names (either default or custom) activate the gameboard
        if (player1ButtonPressed === true && player2ButtonPressed === true) {
          playerInteraction.activateGameBoard();
        }
      });
    }
  };

  // Set the players name
  const setPlayerName = (index, name) => {
    players[index].name = name;
  };

  // Export functions
  return {
    getPlayers,
    setDefaultPlayers,
    getPlayerName,
    setPlayerName,
  };
})();

/* PLAYER STATS DISPLAY
======================================== */
const showPlayerDetails = (function () {
  // Display the player names above the gameboard
  // receives submit event from function getPlayerName()
  const updatePlayerDisplay = (target) => {
    // Get the DOM elements
    const playerForm = document.querySelectorAll("form");
    const playerDisplay = document.querySelectorAll(".player-display");
    const playerName = document.querySelectorAll(".name");
    const playerWins = document.querySelectorAll(".wins");

    // Get the Player objects
    const players = playerCreation.getPlayers();

    // Player1 name form submitted?
    if (target.classList.contains("player1")) {
      playerForm[0].style.display = "none";
      playerName[0].textContent = players[0].name;
      playerWins[0].textContent = players[0].wins;
      playerDisplay[0].style.display = "block";
      // Player2 name form submitted?
    } else if (target.classList.contains("player2")) {
      playerForm[1].style.display = "none";
      playerName[1].textContent = players[1].name;
      playerWins[1].textContent = players[1].wins;
      playerDisplay[1].style.display = "block";
    }
  };

  return { updatePlayerDisplay };
})();

/* PLAYER INTERACTION 
======================================== */
const playerInteraction = (function () {
  // Function to add click event listeners to the squares
  const activateGameBoard = () => {
    const gameboard = document.querySelector(".gameboard");
    const result = document.querySelector(".result");
    const gameGrid = document.querySelectorAll(".field");

    /* result.textContent = `Round ${round}`; */
    gameboard.style.pointerEvents = "all";

    // Assign event listeners to the squares
    gameGrid.forEach((elem) => {
      elem.addEventListener("click", executePlayerChoice);
    });
  };

  // Function to remove event listeners from the squares
  const deactivateGameBoard = () => {
    const gameGrid = document.querySelectorAll(".field");
    gameGrid.forEach((elem) => {
      elem.removeEventListener("click", executePlayerChoice);
      elem.classList.add("end");
    });
  };

  // Function to get the square the player clicked on
  // receives click event from activateGameBoard()
  const getPlayerChoice = (e) => {
    let target = e.target;

    // Get the players choice
    let playerChoice = target.getAttribute("data-field-id"); // position of square in 2d space (e.g. "00", "01", "02", "10", ...)

    // Split data-field-id into coordinates for the layout array
    let index1 = +playerChoice[0];
    let index2 = +playerChoice[1];

    return { index1, index2, target };
  };

  // Function to add "X" or "O" to the squares
  // receives click event from activateGameBoard()
  let takenSquares = 0;

  const executePlayerChoice = (e) => {
    // Get current gameboard layout
    currentLayout = gameBoard.getLayout();

    // Get players choice
    let { index1, index2, target } = getPlayerChoice(e);

    // Has the square already been taken?
    if (currentLayout[index1][index2] !== 0) {
      return;
    } else {
      // If not add value 1 or -1 to the layout array and...
      if (takenSquares % 2 === 0) {
        currentLayout[index1].splice(index2, 1, 1);
        // set content of the clicked square to "X"...
        target.textContent = "x";
        target.classList.add("taken");
      } else {
        currentLayout[index1].splice(index2, 1, -1);
        // or "O"
        target.textContent = "o";
        target.classList.add("taken");
      }
    }

    takenSquares += 1;

    // Check if there is already a winner...
    calculateResult.calcPoints();

    // or stop the game when all squares are taken
    if (takenSquares === 9) {
      deactivateGameBoard();
    }
  };

  // Export functions
  return {
    activateGameBoard,
    deactivateGameBoard,
    getPlayerChoice,
    executePlayerChoice,
  };
})();

/* CALCULATE THE RESULT OF A PLAYER MOVE
======================================== */
const calculateResult = (function () {
  // Function to sum up rows, columns and diagonals
  const getLineSum = () => {
    let currentLayout = gameBoard.getLayout();

    // Calculate and assign line sums
    let lineSum = {
      row1: currentLayout[0][0] + currentLayout[0][1] + currentLayout[0][2],
      row2: currentLayout[1][0] + currentLayout[1][1] + currentLayout[1][2],
      row3: currentLayout[2][0] + currentLayout[2][1] + currentLayout[2][2],
      col1: currentLayout[0][0] + currentLayout[1][0] + currentLayout[2][0],
      col2: currentLayout[0][1] + currentLayout[1][1] + currentLayout[2][1],
      col3: currentLayout[0][2] + currentLayout[1][2] + currentLayout[2][2],
      minDiag: currentLayout[0][2] + currentLayout[1][1] + currentLayout[2][0],
      maxDiag: currentLayout[0][0] + currentLayout[1][1] + currentLayout[2][2],
    };

    return lineSum;
  };

  // Function to calculate a winner (3 in a line) or a draw
  let winner = null;
  let iteration = 0;

  const calcPoints = () => {
    let lineSum = getLineSum();
    let result = "";

    for (let winnerLine in lineSum) {
      if (lineSum[winnerLine] === 3) {
        winner = winnerLine;
        result = "X";
        showEndresult.updateResultDisplay(result);
      } else if (lineSum[winnerLine] === -3) {
        winner = winnerLine;
        result = "O";
        showEndresult.updateResultDisplay(result);
      }
    }

    iteration += 1;

    if (iteration === 9 && !winner) {
      result = "Draw";
      showEndresult.updateResultDisplay(result);
    }
  };

  const getWinner = () => {
    return winner;
  };

  // Export functions
  return { getLineSum, calcPoints, getWinner };
})();

/* SHOW ENDRESULT
======================================== */
const showEndresult = (function () {
  const updateResultDisplay = (result) => {
    const resultDisplay = document.querySelector(".result");

    // Who won? "X", "O" or was it a Draw?
    if (result === "X") {
      resultDisplay.textContent = "Player X wins!";
      resultDisplay.style.display = "flex";
      playerInteraction.deactivateGameBoard();
      showEndresult.highlightWinningLine();
    } else if (result === "O") {
      playerInteraction.deactivateGameBoard();
      showEndresult.highlightWinningLine();
      resultDisplay.textContent = "Player O wins!";
      resultDisplay.style.display = "flex";
    } else if (result === "Draw") {
      resultDisplay.textContent = "Draw!";
    }
  };

  const highlightWinningLine = () => {
    const gameGrid = document.querySelectorAll(".field");
    const winningSquares = calculateResult.getWinner();

    // Loop through the squares and highlight the ones that contributed to the players win
    for (let elem of gameGrid) {
      if (winningSquares === "row1") {
        if (
          elem.getAttribute("data-field-id") === "00" ||
          elem.getAttribute("data-field-id") === "01" ||
          elem.getAttribute("data-field-id") === "02"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "row2") {
        if (
          elem.getAttribute("data-field-id") === "10" ||
          elem.getAttribute("data-field-id") === "11" ||
          elem.getAttribute("data-field-id") === "12"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "row3") {
        if (
          elem.getAttribute("data-field-id") === "20" ||
          elem.getAttribute("data-field-id") === "21" ||
          elem.getAttribute("data-field-id") === "22"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "col1") {
        if (
          elem.getAttribute("data-field-id") === "00" ||
          elem.getAttribute("data-field-id") === "10" ||
          elem.getAttribute("data-field-id") === "20"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "col2") {
        if (
          elem.getAttribute("data-field-id") === "01" ||
          elem.getAttribute("data-field-id") === "11" ||
          elem.getAttribute("data-field-id") === "21"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "col3") {
        if (
          elem.getAttribute("data-field-id") === "02" ||
          elem.getAttribute("data-field-id") === "12" ||
          elem.getAttribute("data-field-id") === "22"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "minDiag") {
        if (
          elem.getAttribute("data-field-id") === "02" ||
          elem.getAttribute("data-field-id") === "11" ||
          elem.getAttribute("data-field-id") === "20"
        ) {
          elem.classList.add("winner");
        }
      } else if (winningSquares === "maxDiag") {
        if (
          elem.getAttribute("data-field-id") === "00" ||
          elem.getAttribute("data-field-id") === "11" ||
          elem.getAttribute("data-field-id") === "22"
        ) {
          elem.classList.add("winner");
        }
      }
    }
  };

  return { updateResultDisplay, highlightWinningLine };
})();

playerCreation.getPlayerName();
