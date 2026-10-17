const ROWS = 9;
const COLS = 9;
const MINES = 9;
let totalFlagged = 0;

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
        }else{continue;}
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
<<<<<<< Updated upstream
=======
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

  // Flood fill: an empty cell opens all its neighbors
  if (cell.adjacent === 0) {
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow === 0 && dCol === 0) continue;

        const nRow = row + dRow;
        const nCol = col + dCol;

        if (nRow < 0 || nRow >= ROWS || nCol < 0 || nCol >= COLS) continue;

        revealCell(nRow, nCol); // the function calls itself
      }
    }
  }
}
function revealAllMines() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col].mine) {
             board[row][col].revealed = true;
        }
        }
    }
}
>>>>>>> Stashed changes
// Function to render the board in the HTML
function renderBoard() {
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateColumns = `repeat(${COLS}, 32px)`;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
    // TEMPORARY DEBUG: show mines and numbers
      if (board[row][col].mine) {
        cell.textContent = "bomba";
        cell.style.fontSize = "1ch";
<<<<<<< Updated upstream
      } else if (board[row][col].adjacent > 0) {
        cell.textContent = board[row][col].adjacent;
        switch (board[row][col].adjacent) {
          case 1:
            cell.style.color = "blue";
            break;
          case 2:
            cell.style.color = "green";
            break;
          case 3:
            cell.style.color = "darkred";
            break;
          case 4:
            cell.style.color = "purple";
            break;
          case 5:
            cell.style.color = "maroon";
            break;
        }
      }
      cell.addEventListener("click", () => {
=======
        cell.style.color = "#ff0000";
      } else if (data.adjacent > 0){
        cell.textContent = data.adjacent;
        cell.classList.add(`n${data.adjacent}`);
      }
    }else if (data.flagged) {
        cell.style.fontSize = "1ch";
        cell.textContent = "flag";
        cell.style.color = "#00ff00";
      }
      cell.addEventListener("click", () =>{
>>>>>>> Stashed changes
        console.log(`Clicked row ${row}, col ${col}`);
      });
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        console.log(`Right clicked row ${row}, col ${col}`);
        if (data.revealed) return; // Don't allow flagging revealed cells
        data.flagged = !data.flagged;
        totalFlagged += data.flagged ? 1 : -1;
        console.log(`Total flagged: ${totalFlagged}`);
        renderBoard();
    });
        
      boardElement.appendChild(cell);
        }
    }
    document.getElementById("minasCounter").textContent = "Minas: " + MINES;
    document.getElementById("bandeirasCounter").textContent = "Bandeiras: " + totalFlagged;
  }

createBoardData();
  placeMines();
  countAdjacentMines();
  renderBoard();
