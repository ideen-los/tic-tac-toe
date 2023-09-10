/* GAMEBOARD LAYOUT
======================================== */
const gameBoard = (function () {
  // the layout of the Tic Tac Toe grid
  const layout = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // function to read board layout & add "X" or "O" to the elements of the Tic Tac Toe grid
  const populateGameGrid = () => {
    const gameGrid = document.querySelectorAll(".field");
    let layout = gameBoard.getLayout();

    // loop through elements of the Tic Tac Toe grid & board layout array
    for (let elem of gameGrid) {
      for (let layoutObj of layout) {
        // if any elements data-field-id equals the element property of a board layout object
        if (elem.getAttribute("data-field-id") === layoutObj.element) {
          switch (layoutObj.letter) {
            case "x":
              // add "X" or
              elem.textContent = "x";
              break;
            case "o":
              // "O" to the elements textContent
              elem.textContent = "o";
              break;
            default:
              continue;
          }
        }
      }
    }
  };

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

  // export functions
  return { getLayout, setLayout, clearLayout, populateGameGrid };
})();

/* PLAYER CREATION
======================================== */
const playerCreation = (function () {
  const player1Name = null;
  const player2Name = null;

  const PlayerNameForms = document.querySelectorAll("form");

  const getPlayerName = () => {
    for (let form of PlayerNameForms) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let playerName = form.elements["player-name"].value;
        let playerIndex;
        if (e.target.classList.contains("player1")) {
          playerIndex = 0;
          if (playerName === "") {
            playerName = "Player X";
          }
        } else {
          playerIndex = 1;
          if (playerName === "") {
            playerName = "Player O";
          }
        }

        playerCreation.createNewPlayer(playerIndex, playerName);
        playerCreation.displayPlayer(e.target);
      });
    }
  };

  const players = [
    { mark: "X", name: "Player X", wins: 0 },
    { mark: "O", name: "Player O", wins: 0 },
  ];

  // Create new Player function
  const createNewPlayer = (index, name) => {
    players[index].name = name;
  };

  const getPlayers = () => {
    return players;
  };
  const clearPlayers = () => {
    players.splice(0);
    players.push(
      { mark: "X", name: "Player X", wins: 0 },
      { mark: "O", name: "Player O", wins: 0 }
    );
  };

  const displayPlayer = (target) => {
    const playerForm = document.querySelectorAll("form");
    const playerDisplay = document.querySelectorAll(".player-display");
    const playerName = document.querySelectorAll(".name");
    const playerWins = document.querySelectorAll(".wins");
    console.log(playerName);

    const players = playerCreation.getPlayers();

    if (target.classList.contains("player1")) {
      playerForm[0].style.display = "none";
      playerName[0].textContent = players[0].name;
      playerWins[0].textContent = players[0].wins;
      playerDisplay[0].style.display = "block";
    } else if (target.classList.contains("player2")) {
      playerForm[1].style.display = "none";
      playerName[1].textContent = players[1].name;
      playerWins[1].textContent = players[1].wins;
      playerDisplay[1].style.display = "block";
    }
  };

  return {
    getPlayerName,
    createNewPlayer,
    getPlayers,
    clearPlayers,
    displayPlayer,
  };
})();

/* PLAYER INTERACTION 
======================================== */
const displayController = (function () {
  // add event listeners to squares
  const getPlayerChoice = () => {
    const gameGrid = document.querySelectorAll(".field");
    gameGrid.forEach((elem) => {
      elem.addEventListener("click", displayController.makeMark);
    });
  };
  const removePlayerChoice = () => {
    const gameGrid = document.querySelectorAll(".field");
    gameGrid.forEach((elem) => {
      elem.removeEventListener("click", displayController.makeMark);
      elem.classList.add("end");
    });
  };

  let iteration = 0;

  // function to get the players choice & add X or O to the target DOM element
  const makeMark = (e) => {
    // get current layout
    currentLayout = gameBoard.getLayout();

    // get players choice
    let playerChoice = e.target.getAttribute("data-field-id");
    let index1 = +playerChoice[0];
    let index2 = +playerChoice[1];

    console.log({ playerChoice }, { index1 }, { index2 });

    if (currentLayout[index1][index2] !== 0) {
      return;
    } else {
      if (iteration % 2 === 0) {
        currentLayout[index1].splice(index2, 1, 1);
        e.target.textContent = "x";
        e.target.classList.add("taken");
      } else {
        currentLayout[index1].splice(index2, 1, -1);
        e.target.textContent = "o";
        e.target.classList.add("taken");
      }
    }

    console.log(currentLayout);
    iteration += 1;

    calcEndresult.calcPoints();

    // stop game after 6 rounds
    if (iteration === 9) {
      displayController.removePlayerChoice();
    }
  };

  // export functions
  return { getPlayerChoice, removePlayerChoice, makeMark };
})();

/* CALCULATE ENDRESULT
======================================== */
const calcEndresult = (function () {
  let winner = null;
  let iteration = 0;

  const calcPoints = () => {
    // array to save the endresult points
    let endLayout = gameBoard.getLayout();

    let row1 = endLayout[0][0] + endLayout[0][1] + endLayout[0][2];
    let row2 = endLayout[1][0] + endLayout[1][1] + endLayout[1][2];
    let row3 = endLayout[2][0] + endLayout[2][1] + endLayout[2][2];
    let col1 = endLayout[0][0] + endLayout[1][0] + endLayout[2][0];
    let col2 = endLayout[0][1] + endLayout[1][1] + endLayout[2][1];
    let col3 = endLayout[0][2] + endLayout[1][2] + endLayout[2][2];
    let minDiag = endLayout[0][2] + endLayout[1][1] + endLayout[2][0];
    let maxDiag = endLayout[0][0] + endLayout[1][1] + endLayout[2][2];

    let lineSum = [
      { row1 },
      { row2 },
      { row3 },
      { col1 },
      { col2 },
      { col3 },
      { minDiag },
      { maxDiag },
    ];

    const resultDisplay = document.querySelector(".result");

    for (let winnerLine of lineSum) {
      for (let key in winnerLine) {
        if (winnerLine[key] === 3) {
          resultDisplay.textContent = "Player X wins!";
          winner = key;
          displayController.removePlayerChoice();
          showEndresult.highlightWinner();
          return;
        } else if (winnerLine[key] === -3) {
          resultDisplay.textContent = "Player O wins!";
          winner = key;
          displayController.removePlayerChoice();
          showEndresult.highlightWinner();
          return;
        }
      }
    }

    iteration += 1;

    if (iteration === 9 && !winner) {
      resultDisplay.textContent = "Draw!";
    }
  };

  const getWinner = () => {
    return winner;
  };

  // export functions
  return { calcPoints, getWinner };
})();

/* DISPLAY ENDRESULT
======================================== */
const showEndresult = (function () {
  const highlightWinner = () => {
    const gameGrid = document.querySelectorAll(".field");
    const winningSquares = calcEndresult.getWinner();

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

  return { highlightWinner };
})();

displayController.getPlayerChoice();
playerCreation.getPlayerName();
