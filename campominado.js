const ROWS = 9;
const COLS = 9;
const MINES = 10;
document.getElementById("minasCounter").textContent = "Minas: "+ MINES;
let totalFlags = MINES;
const explosion = new Audio('assets/minecraft-tnt-explosion.mp3');

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
// Function to count adjacent mines for each cell
function countAdjacentMines() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col].mine) continue;

            let count = 0;
            // Look at the eight surrounding cells.
            for (let dRow = -1; dRow <= 1; dRow++) {
                for (let dCol = -1; dCol <= 1; dCol++) {
                    if (dRow === 0 && dCol === 0) continue;

                    const nRow = row + dRow;
                    const nCol = col + dCol;
                    const isOnBoard =
                        nRow >= 0 && nRow < ROWS &&
                        nCol >= 0 && nCol < COLS;

                    if (isOnBoard && board[nRow][nCol].mine) {
                        count++;
                    }
                }
            }

            board[row][col].adjacent = count;
        }
    }
}
// Variable to track if the game is over
let gameOver = false;
function revealCell(row, col) {
  if (gameOver) return;

  const cell = board[row][col];
  if (cell.revealed || cell.flagged) return;

  cell.revealed = true;
  if (cell.mine) {
    gameOver = true;
    revealAllMines();
    return;
  }

  if (cell.adjacent === 0) {
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow === 0 && dCol === 0) continue;

        const nextRow = row + dRow;
        const nextCol = col + dCol;
        if (nextRow >= 0 && nextRow < ROWS && nextCol >= 0 && nextCol < COLS) {
          revealCell(nextRow, nextCol);
        }
      }
    }
  }
}
function revealAllMines() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col].mine) {
              explosion.play();
             setTimeout(() => {
               board[row][col].revealed = true;
               explosion.play();
               renderBoard();
              }, Math.random() * (3000 - 2000) + 2000); // Random delay between 800 and 1000 milliseconds
        }
        }
    }
}
// Function to toggle a flag on a cell
function toggleFlag(row, col) {
  if (gameOver) return;

  const cell = board[row][col];
  if (cell.revealed) return;
  if (cell.flagged == true) {
    cell.flagged = false;
    totalFlags++;
  }else {cell.flagged = true;
    totalFlags--;
  }
  renderBoard();

}
//Function to verify wining conditions
function verifyWin(){
  if (gameOver) return;
  let revealedCount = 0;
  for (let row = 0; row < ROWS; row++){
    for (let col = 0; col < COLS; col++){
      if (board[row][col].revealed){
        revealedCount++;
      }
    }
  }
  if (revealedCount == ROWS * COLS - MINES && totalFlags == 0){
    alert("Tu é muito dez venceste, parabéns!");
  }
}

// Function to render the board in the HTML
function renderBoard() {
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateColumns = `repeat(${COLS}, 32px)`;
  document.getElementById("bandeirasCounter").textContent = "Bandeiras: "+ totalFlags;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const data = board[row][col];
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      if (data.revealed) {
        cell.classList.add("revealed");
        if (data.mine) {
          cell.classList.add("mine");
        } else if (data.adjacent > 0) {
          cell.textContent = data.adjacent;
          cell.classList.add(`n${data.adjacent}`);
        }
      }
      else if (data.flagged) {
        cell.textContent = "flag";
          cell.style.color = "#00FF00";
          cell.style.fontSize = "1ch";
      }

      cell.addEventListener("click", () =>{
        console.log(`Clicked row ${row}, col ${col}`);
        revealCell(row, col);
        renderBoard();
      });
      cell.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(row, col);
        renderBoard();
      });

      boardElement.appendChild(cell);
    }
  }
  verifyWin();
}

createBoardData();
  placeMines();
  countAdjacentMines();
  renderBoard();
