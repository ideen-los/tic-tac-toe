/* GAMEBOARD LAYOUT
======================================== */
const gameBoard = (function () {
  // the layout of the Tic Tac Toe grid
  const layout = [];

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
    layout.splice(0);
  };

  // export functions
  return { getLayout, setLayout, clearLayout, populateGameGrid };
})();

/* CREATE NEW BOARD LAYOUT OBJECT
======================================== */
const createLayoutObject = function (letter, player, element, value) {
  return { letter, player, element, value };
};

/* PLAYER INTERACTION 
======================================== */
const displayController = (function () {
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

  // function to get the players choice & add X or O to the target DOM element
  const makeMark = (e) => {
    // get current layout
    currentLayout = gameBoard.getLayout();

    // get players choice
    let playerChoice = e.target.getAttribute("data-field-id");

    for (let layoutObj of currentLayout) {
      if (layoutObj.element === playerChoice) {
        return;
      }
    }

    // create new layout object with players choice and push it to board layout array
    if (currentLayout.length % 2 === 0) {
      gameBoard.setLayout(createLayoutObject("x", "player a", playerChoice, 1));
    } else {
      gameBoard.setLayout(
        createLayoutObject("o", "player b", playerChoice, -1)
      );
    }

    // read board layout array and populate the square DOM elements with either X or O
    gameBoard.populateGameGrid();

    // stop game after 6 rounds
    if (currentLayout.length === 6) {
      displayController.removePlayerChoice();
      calcEndresult.getAllElements();
      calcEndresult.addPoints();
    }
  };

  // export functions
  return { getPlayerChoice, removePlayerChoice, makeMark };
})();

/* CALCULATE ENDRESULT
======================================== */
const calcEndresult = (function () {
  // function to get the current board layout and compare it with the Tic Tac Toe grid
  const getAllElements = () => {
    // get squares & current board layout
    const gameGrid = document.querySelectorAll(".field");
    const endLayout = gameBoard.getLayout();
    let elementFoundInLayout = false;

    // loop trough the cells of the Tic Tac Toe grid
    for (let elem of gameGrid) {
      elementFoundInLayout = false;
      // check if cell is part of the board layout array
      for (let layoutObj of endLayout) {
        if (layoutObj.element === elem.getAttribute("data-field-id")) {
          elementFoundInLayout = true;
          break;
        }
      }
      // if not, add the respective cell as object to layout array with a value of 0
      if (elementFoundInLayout === false) {
        gameBoard.setLayout(
          createLayoutObject(null, null, elem.getAttribute("data-field-id"), 0)
        );
      }
    }
  };

  // array to save the endresult points
  let points = [];

  // function to calculate the field values to check who won
  const addPoints = () => {
    // get board layout
    const endLayout = gameBoard.getLayout();

    // sum up rows
    let row1 = 0;
    let row2 = 0;
    let row3 = 0;

    for (let layoutObj of endLayout) {
      if (
        layoutObj.element === "field1" ||
        layoutObj.element === "field2" ||
        layoutObj.element === "field3"
      ) {
        row1 += layoutObj.value;
      } else if (
        layoutObj.element === "field4" ||
        layoutObj.element === "field5" ||
        layoutObj.element === "field6"
      ) {
        row2 += layoutObj.value;
      } else if (
        layoutObj.element === "field7" ||
        layoutObj.element === "field8" ||
        layoutObj.element === "field9"
      ) {
        row3 += layoutObj.value;
      }
    }

    points.push(row1, row2, row3);

    // sum up columns
    let col1 = 0;
    let col2 = 0;
    let col3 = 0;

    for (let layoutObj of endLayout) {
      if (
        layoutObj.element === "field1" ||
        layoutObj.element === "field4" ||
        layoutObj.element === "field7"
      ) {
        col1 += layoutObj.value;
      } else if (
        layoutObj.element === "field2" ||
        layoutObj.element === "field5" ||
        layoutObj.element === "field8"
      ) {
        col2 += layoutObj.value;
      } else if (
        layoutObj.element === "field3" ||
        layoutObj.element === "field6" ||
        layoutObj.element === "field9"
      ) {
        col3 += layoutObj.value;
      }
    }

    points.push(col1, col2, col3);

    // sum up top right to bottom left diagonal
    let minDiagonal = 0;

    for (let layoutObj of endLayout) {
      if (
        layoutObj.element === "field3" ||
        layoutObj.element === "field5" ||
        layoutObj.element === "field7"
      ) {
        minDiagonal += layoutObj.value;
      }
    }

    // sum up top left to bottom right diagonal
    let maxDiagonal = 0;

    for (let layoutObj of endLayout) {
      if (
        layoutObj.element === "field1" ||
        layoutObj.element === "field5" ||
        layoutObj.element === "field9"
      ) {
        maxDiagonal += layoutObj.value;
      }
    }

    points.push(minDiagonal, maxDiagonal);

    console.log(points);
  };

  const getPoints = () => {
    return points;
  };
  const clearPoints = () => {
    points.splice(0);
  };

  // export functions
  return { getAllElements, addPoints, getPoints, clearPoints };
})();

/* DISPLAY ENDRESULT
======================================== */
const showEndresult = function () {
  let points = calcEndresult.getPoints();
};

displayController.getPlayerChoice();
