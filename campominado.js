const ROWS = 9;
const COLS = 9;
const boardElement = document.getElementById("board");
console.log("Colunas: " + COLS + "\n Linhas: " + ROWS);
console.log("Total de quadrados: " + (COLS * ROWS));
function createBoard() {
  boardElement.style.gridTemplateColumns = `repeat(${COLS}, 32px)`;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", () => {
        console.log(`Clicked row ${row}, col ${col}`);
      });

      boardElement.appendChild(cell);
    }
  }
}

createBoard();