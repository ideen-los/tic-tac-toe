/* GAMEBOARD LAYOUT
======================================== */
const gameBoard = (function () {
  let round = 0;

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
    layout[0].splice(0, 3, 0, 0, 0);
    layout[1].splice(0, 3, 0, 0, 0);
    layout[2].splice(0, 3, 0, 0, 0);
  };

  setRound = () => {
    round += 1;
  };

  getRound = () => {
    return round;
  };

  resetRound = () => {
    round = 1;
  };

  const gameboard = document.querySelector(".gameboard");
  const controls = document.querySelector(".controls");

  // Function to add click event listeners to the squares
  const activateGameBoard = () => {
    const result = document.querySelector(".result");
    const gameGrid = document.querySelectorAll(".field");
    setRound();
    let round = getRound();

    result.textContent = `Round ${round} - Fight!`;
    gameboard.style.pointerEvents = "all";
    controls.style.opacity = "0";
    controls.style.pointerEvents = "none";

    // Remove classes from the squares
    gameGrid.forEach((elem) => {
      ["winner", "taken", "end"].forEach((cls) => {
        if (elem.classList.contains(cls)) {
          elem.classList.remove(cls);
        }
      });
      elem.textContent = "";
      elem.addEventListener("click", playerInteraction.executePlayerChoice);
    });
  };

  // Function to remove event listeners from the squares
  const deactivateGameBoard = () => {
    const gameGrid = document.querySelectorAll(".field");

    gameboard.style.pointerEvents = "none";

    // Remove event listeners from the squares
    gameGrid.forEach((elem) => {
      elem.removeEventListener("click", playerInteraction.executePlayerChoice);
      elem.classList.add("end");
    });

    playerManagement.setCurrentPlayer();
  };

  // Export functions
  return {
    getLayout,
    setLayout,
    clearLayout,
    activateGameBoard,
    deactivateGameBoard,
  };
})();

/* PLAYER MANAGEMENT
======================================== */
const playerManagement = (function () {
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

  let currentPlayer = true;

  const currentPlayerIsX = () => {
    return currentPlayer;
  };

  const setCurrentPlayer = () => {
    currentPlayer = !currentPlayer;
  };

  // Function to set the wins property of Player "X" or "O"
  const setPlayerWins = (playerMark) => {
    if (playerMark === "x") {
      players[0].wins += 1;
    } else if (playerMark === "o") {
      players[1].wins += 1;
    }
  };

  // Function to start the game with default player names
  const startGamewithDefaultNames = () => {
    const startGameButton = document.querySelector(".btn-start-game");

    startGameButton.addEventListener("click", () => {
      showPlayerDetails.updatePlayerDisplay(startGameButton);
      gameBoard.activateGameBoard();
    });
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
        if (player1ButtonPressed && player2ButtonPressed) {
          gameBoard.activateGameBoard();
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
    currentPlayerIsX,
    setCurrentPlayer,
    setPlayerWins,
    startGamewithDefaultNames,
    getPlayerName,
    setPlayerName,
  };
})();

/* PLAYER STATS DISPLAY
======================================== */
const showPlayerDetails = (function () {
  // Get the Player objects
  const players = playerManagement.getPlayers();
  const playerWins = document.querySelectorAll(".wins");

  // Display the player names above the gameboard
  // receives submit event from function getPlayerName()
  const updatePlayerDisplay = (target) => {
    // Get the DOM elements
    const playerForm = document.querySelectorAll("form");
    const playerDisplay = document.querySelectorAll(".player-display");
    const playerName = document.querySelectorAll(".name");

    // Player1 name form submitted?
    if (target.classList.contains("player1")) {
      playerForm[0].style.display = "none";
      playerName[0].textContent = players[0].name;
      playerWins[0].textContent = players[0].wins;
      playerDisplay[0].style.display = "flex";
      // Player2 name form submitted?
    } else if (target.classList.contains("player2")) {
      playerForm[1].style.display = "none";
      playerName[1].textContent = players[1].name;
      playerWins[1].textContent = players[1].wins;
      playerDisplay[1].style.display = "flex";
    } else {
      playerForm[0].style.display = "none";
      playerName[0].textContent = players[0].name;
      playerWins[0].textContent = players[0].wins;
      playerDisplay[0].style.display = "flex";
      playerForm[1].style.display = "none";
      playerName[1].textContent = players[1].name;
      playerWins[1].textContent = players[1].wins;
      playerDisplay[1].style.display = "flex";
    }
  };

  const updatePlayerStats = () => {
    playerWins[0].textContent = players[0].wins;
    playerWins[1].textContent = players[1].wins;
  };

  return { updatePlayerDisplay, updatePlayerStats };
})();

/* PLAYER INTERACTION 
======================================== */
const playerInteraction = (function () {
  // Function to display a button that starts the next round
  const activateNextRound = () => {
    const controls = document.querySelector(".controls");
    const nextRoundButton = document.createElement("div");
    nextRoundButton.classList.add("btn");
    nextRoundButton.classList.add("btn-next-round");
    nextRoundButton.textContent = "Next Round";
    nextRoundButton.addEventListener("click", gameBoard.activateGameBoard);
    controls.style.opacity = "1";
    controls.style.pointerEvents = "all";
    controls.innerHTML = "";
    controls.appendChild(nextRoundButton);
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
  const executePlayerChoice = (e) => {
    const gameGrid = document.querySelectorAll(".field");
    currentLayout = gameBoard.getLayout(); // get current gameboard layout
    let { index1, index2, target } = getPlayerChoice(e); // Get players choice
    // Has the square already been taken?
    if (currentLayout[index1][index2] !== 0) {
      return;
    } else {
      // If not ...
      if (playerManagement.currentPlayerIsX() === true) {
        playerManagement.setCurrentPlayer();
        // add player "X" points to the layout array...
        currentLayout[index1].splice(index2, 1, 1);
        // and set content of the clicked square to "X"
        target.textContent = "x";
        target.classList.add("taken");
        // OR
      } else {
        playerManagement.setCurrentPlayer();
        // add player "O" points to the layout array...
        currentLayout[index1].splice(index2, 1, -1);
        // and set content of the clicked square to "O"
        target.textContent = "o";
        target.classList.add("taken");
      }
    }

    // Check if there is already a winner...
    calculateResult.calcPoints();

    // or stop the game when all squares are taken
    let allSquaresTaken = true;

    for (elem of gameGrid) {
      if (!elem.classList.contains("taken") === true) {
        allSquaresTaken = false;
        break;
      }
    }

    if (allSquaresTaken) {
      calculateResult.calcPoints(allSquaresTaken);
    }
  };

  // Export functions
  return {
    activateNextRound,
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

  const calcPoints = (allSquaresTaken) => {
    let lineSum = getLineSum();
    let result = "";

    for (let winnerLine in lineSum) {
      if (lineSum[winnerLine] === 3) {
        winner = winnerLine;
        result = "X";
        playerManagement.setPlayerWins("x");
        showEndresult.updateResultDisplay(result);
      } else if (lineSum[winnerLine] === -3) {
        winner = winnerLine;
        result = "O";
        playerManagement.setPlayerWins("o");
        showEndresult.updateResultDisplay(result);
      }
    }

    if (allSquaresTaken && !winner) {
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
    let players = playerManagement.getPlayers();

    // Who won? "X", "O" or was it a Draw?
    if (result === "X") {
      showPlayerDetails.updatePlayerStats();
      resultDisplay.textContent =
        "Congratulations: " + players[0].name + " wins!";
      resultDisplay.style.display = "flex";
      gameBoard.deactivateGameBoard();
      showEndresult.highlightWinningLine();
      setTimeout(playerInteraction.activateNextRound, 1200);
      gameBoard.clearLayout();
    } else if (result === "O") {
      showPlayerDetails.updatePlayerStats();
      gameBoard.deactivateGameBoard();
      showEndresult.highlightWinningLine();
      setTimeout(playerInteraction.activateNextRound, 1200);
      gameBoard.clearLayout();
      resultDisplay.textContent =
        "Congratulations: " + players[1].name + " wins!";
      resultDisplay.style.display = "flex";
    } else if (result === "Draw") {
      resultDisplay.textContent = "Draw!";
      setTimeout(playerInteraction.activateNextRound, 1200);
      gameBoard.deactivateGameBoard();
      showEndresult.highlightWinningLine();
      playerInteraction.activateNextRound();
      gameBoard.clearLayout();
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

playerManagement.getPlayerName();
playerManagement.startGamewithDefaultNames();
