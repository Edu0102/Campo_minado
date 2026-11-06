const ROWS = 9;
const COLS = 9;
const MINES = 10;
let minesPlaced = 0;
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
function placeMines(firstRow, firstCol){
    let place = 0;
    while (place < MINES){
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        const nearFirstClick = Math.abs(row - firstRow) <= 1 && Math.abs(col - firstCol) <= 1;
        // Only place mines in cells that are empty and outside the first-click area.
        if (board[row][col].mine || nearFirstClick) continue;
        board[row][col].mine = true;
        place++;
    }
    countAdjacentMines();
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
          if (!board[nextRow][nextCol].mine) {
            revealCell(nextRow, nextCol);
          }
        }
      }
    }
  }
}
function revealAllMines() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
              if (board[row][col].mine) {
                setTimeout(() => {
                  board[row][col].revealed = true;
                  explosion.play();
                  renderBoard();
                }, Math.random() * 1000 + 2000);
              }
        }
     }
}
// Function to toggle a flag on a cell
function toggleFlag(row, col) {
  if (gameOver) return;

  const cell = board[row][col];
  if (cell.revealed) return;
  if (cell.flagged) {
    cell.flagged = false;
    totalFlags++;
  } else if (totalFlags > 0) {
    cell.flagged = true;
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
  if (revealedCount === ROWS * COLS - MINES){
    gameOver = true;
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
        if(!minesPlaced){
          placeMines(row, col);
          minesPlaced = true;
        }
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
function resetGame(){
  gameOver = false;
  minesPlaced = 0;
  totalFlags = MINES;
  createBoardData();
  renderBoard();
}

createBoardData();
  renderBoard();
