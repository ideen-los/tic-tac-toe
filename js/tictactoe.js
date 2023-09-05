/* GAMEBOARD DATA & CONTROLS
======================================== */
const gameBoard = (function () {
  // the board layout
  const layout = [
    { letter: "x", player: "robert", field: "field1" },
    { letter: "o", player: "computer", field: "field2" },
    { letter: "x", player: "robert", field: "field5" },
    { letter: "o", player: "computer", field: "field3" },
    { letter: "x", player: "robert", field: "field9" },
    { letter: "o", player: "computer", field: "field8" },
  ];

  // read board layout array and populate the DOM elemnts with the data
  const populateFields = () => {
    const fields = document.querySelectorAll(".field");
    let layout = gameBoard.getLayout();

    // loop through DOM elements & layout objects
    for (let field of fields) {
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
  return { getLayout, setLayout, clearLayout, populateFields };
})();

/* CREATE A NEW LAYOUT OBJECT
======================================== */
const createLayoutObject = function (letter, player, field) {
  return { letter, player, field };
};

/* PLAYER INTERACTION 
======================================== */
const displayController = (function () {
  // get the DOM elements
  const fields = document.querySelectorAll(".field");

  const getPlayerChoice = () => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => {
      field.addEventListener("click", displayController.makeMark);
    });
  };

  const makeMark = (e) => {
    // save players choice
    let playerChoice = e.target.getAttribute("data-field-id");

    // create new layout object with players choice and push it to board layout array
    gameBoard.setLayout(createLayoutObject("x", "robert", playerChoice));

    // read board layout array and populate the DOM elemnts with the data
    gameBoard.populateFields();
  };

  return { getPlayerChoice, makeMark };
})();

gameBoard.populateFields();
displayController.getPlayerChoice();
