const ROWS = 9;
const COLS = 9;
const MINES = 9;

const boardElement = document.getElementById("board");
console.log("Columns: " + COLS + "\n Rows: " + ROWS);
console.log("Total squares: " + (COLS * ROWS));
console.log("Total mines " + MINES);
let board = [];
// Função para criar os dados do jogo
function createBoardData() {
    board = [];
    for (let row = 0; row < ROWS; row++){
        const rowArray = [];
        for (let col = 0; col < COLS; col++){
            rowArray.push({
                mine: false,
                revealed: false,
                flagged: false,
                adjacent: 0
            });
        }
        board.push(rowArray);
    }
}
// Function to place mines randomly on the board
function placeMines(){
    let place = 0;
    while (place < MINES){
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        // Check if the cell already has a mine
        if (!board[row][col].mine){
            board[row][col].mine = true;
            place++;
        }
    }
}



function renderBoard() {
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateColumns = `repeat(${COLS}, 32px)`;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      // TEMPORARY DEBUG: show mines so we can check they're placed
      if (board[row][col].mine) {
        cell.textContent = "💣";
      }
      cell.addEventListener("click", () => {
        console.log(`Clicked row ${row}, col ${col}`);
      });

      boardElement.appendChild(cell);
    }
  }
}

createBoardData();
  placeMines();
  renderBoard();