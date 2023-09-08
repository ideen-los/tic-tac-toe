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

    if (currentLayout[index1][index2] === 0) {
      if (iteration % 2 === 0) {
        currentLayout[index1].splice(index2, 1, 1);
        e.target.textContent = "x";
      } else {
        currentLayout[index1].splice(index2, 1, -1);
        e.target.textContent = "o";
      }
    } else {
      return;
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

    let lineSum = [row1, row2, row3, col1, col2, col3, minDiag, maxDiag];
    let winner = null;

    console.log(lineSum);

    for (winnerLine of lineSum) {
      if (winnerLine === 3) {
        console.log("Player X wins!");
        winner = "Player X";
        displayController.removePlayerChoice();
        break;
      } else if (winnerLine === -3) {
        console.log("Player O wins!");
        winner = "Player O";
        displayController.removePlayerChoice();
        break;
      }
    }

    iteration += 1;

    if (iteration === 9 && !winner) {
      console.log("Draw!");
    }
  };

  // export functions
  return { calcPoints, getPoints, clearPoints };
})();

/* DISPLAY ENDRESULT
======================================== */
const showEndresult = function () {
  let points = calcEndresult.getPoints();
};

displayController.getPlayerChoice();
