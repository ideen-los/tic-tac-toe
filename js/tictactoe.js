/* GAMEBOARD DATA
======================================== */
const gameBoard = (function () {
  // the board layout
  const layout = [];

  // function to read board layout & add X or O to the DOM elements
  const populateGameFields = () => {
    const gameFields = document.querySelectorAll(".field");
    let layout = gameBoard.getLayout();

    // loop through DOM elements & layout objects
    for (let field of gameFields) {
      for (let layoutObj of layout) {
        // if any fields data-field-id equals the field property of a board layout object
        if (field.getAttribute("data-field-id") === layoutObj.field) {
          switch (layoutObj.letter) {
            case "x":
              // add X to the fields textContent
              field.textContent = "x";
              break;
            case "o":
              // add O to the fields textContent
              field.textContent = "o";
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
  return { getLayout, setLayout, clearLayout, populateGameFields };
})();

/* CREATE NEW LAYOUT OBJECT
======================================== */
const createLayoutObject = function (letter, player, field, value) {
  return { letter, player, field, value };
};

/* PLAYER INTERACTION 
======================================== */
const displayController = (function () {
  const getPlayerChoice = () => {
    const gameFields = document.querySelectorAll(".field");
    gameFields.forEach((field) => {
      field.addEventListener("click", displayController.makeMark);
    });
  };

  const removePlayerChoice = () => {
    const gameFields = document.querySelectorAll(".field");
    gameFields.forEach((field) => {
      field.removeEventListener("click", displayController.makeMark);
    });
  };

  // function to get the players choice & add X or O to the target DOM element
  const makeMark = (e) => {
    // get current layout
    currentLayout = gameBoard.getLayout();

    // get players choice
    let playerChoice = e.target.getAttribute("data-field-id");

    for (let layoutObj of currentLayout) {
      if (layoutObj.field === playerChoice) {
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

    // read board layout array and populate the DOM elements with either X or O
    gameBoard.populateGameFields();

    // stop game after 6 rounds
    if (currentLayout.length === 6) {
      displayController.removePlayerChoice();
      evaluateEndresult.addPoints();
    }
  };

  return { getPlayerChoice, removePlayerChoice, makeMark };
})();

/* EVALUATE ENDRESULT
======================================== */
const evaluateEndresult = (function () {
  const gameFields = document.querySelectorAll(".field");
  const endLayout = gameBoard.getLayout();
  let fieldFound = false;

  const addPoints = () => {
    for (let field of gameFields) {
      fieldFound = false;
      for (let layoutObj of endLayout) {
        if (layoutObj.field === field.getAttribute("data-field-id")) {
          fieldFound = true;
          break;
        }
      }
      if (fieldFound === false) {
        gameBoard.setLayout(
          createLayoutObject(null, null, field.getAttribute("data-field-id"), 0)
        );
      }
    }
  };

  return { addPoints };
})();

gameBoard.populateGameFields();
displayController.getPlayerChoice();
