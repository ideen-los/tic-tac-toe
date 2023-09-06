/* GAMEBOARD DATA & CONTROLS
======================================== */
const gameBoard = (function () {
  // the board layout
  const layout = [];

  // read board layout array and populate the DOM elemnts with the data
  const populateGameFields = () => {
    const gameFields = document.querySelectorAll(".field");
    let layout = gameBoard.getLayout();

    // loop through DOM elements & layout objects
    for (let field of gameFields) {
      for (let layoutObj of layout) {
        // if field class equals a layout objects field
        if (field.classList.contains(layoutObj.field)) {
          switch (layoutObj.letter) {
            case "x":
              field.textContent = "x";
              break;
            case "o":
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
  const setLayout = (obj) => {
    layout.push(obj);
  };
  const clearLayout = () => {
    layout.splice(0);
  };

  // export functions
  return { getLayout, setLayout, clearLayout, populateGameFields };
})();

/* CREATE A NEW LAYOUT OBJECT
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

  const makeMark = (e) => {
    // get current layout
    currentLayout = gameBoard.getLayout();

    // save players choice
    let playerChoice = e.target.getAttribute("data-field-id");

    for (let obj of currentLayout) {
      if (obj.field === playerChoice) {
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

    // read board layout array and populate the DOM elemnts with the data
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
      for (let obj of endLayout) {
        if (obj.field === field.getAttribute("data-field-id")) {
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
