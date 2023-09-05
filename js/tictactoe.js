// GAMEBOARD CONTROLS
const gameBoard = (function () {
  const layout = [
    { letter: "x", player: "robert", field: "field1" },
    { letter: "o", player: "computer", field: "field2" },
    { letter: "x", player: "robert", field: "field5" },
    { letter: "o", player: "computer", field: "field3" },
    { letter: "x", player: "robert", field: "field9" },
    { letter: "o", player: "computer", field: "field8" },
  ];

  const populateFields = () => {
    const fields = document.querySelectorAll(".field");
    let layout = gameBoard.getLayout();

    for (let field of fields) {
      for (let layoutObj of layout) {
        if (
          field.classList.contains(layoutObj.field) &&
          layoutObj.letter === "x"
        ) {
          field.textContent = "x";
        } else if (
          field.classList.contains(layoutObj.field) &&
          layoutObj.letter === "o"
        ) {
          field.textContent = "o";
        } else {
          continue;
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

  return { getLayout, setLayout, clearLayout, populateFields };
})();

const createLayoutObject = function (letter, player, field) {
  return { letter, player, field };
};

// PLAYER INTERACTION
const displayController = (function () {
  const fields = document.querySelectorAll(".field");

  const getPlayerChoice = () => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => {
      field.addEventListener("click", displayController.makeMark);
    });
  };

  const makeMark = (e) => {
    gameBoard.setLayout(
      createLayoutObject("x", "robert", e.target.getAttribute("data-field-id"))
    );

    gameBoard.populateFields();
  };

  return { getPlayerChoice, makeMark };
})();

gameBoard.populateFields();
displayController.getPlayerChoice();
