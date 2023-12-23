/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y=0; y< HEIGHT; y++){
    board.push(Array.from({length:WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");//Selecting tables from html file
  // TODO: add comment for this code
  let top = document.createElement("tr");//creating a row of cell in the table in html
  top.setAttribute("id", "column-top"); //adding an attribute named "id" with the column-top value
  top.addEventListener("click", handleClick); //when clicking on "top" element it will run handleClick function

  for (let x = 0; x < WIDTH; x++) { //this will loop 7 times as the value of width to create the cells on top of the board
    const headCell = document.createElement("td"); //this is creating a cell in the table throught the loop
    headCell.setAttribute("id", x); //adding an attribute name "id" with the value of x
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //this will loop 6 times, creating a row everytime
    const row = document.createElement("tr"); //it creates the rows for the board
    for (let x = 0; x < WIDTH; x++) { //this will loop 7 times, creating a cell/column everytime
      const cell = document.createElement("td"); //it creating the new element of cell
      cell.setAttribute("id", `${y}-${x}`); //it gives the value of x and y looping to the cell
      row.append(cell); //adding cell to the row
    }
    board.append(row); //adding the row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) { //column x value given
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT -1; y>= 0; y--){ //Starting at the bottom of the board height, it will loop to the top
    if(!board[y][x]){ //if y value in the loop is not the current position of y and x 
      return y; //return y
    }
  }
  return null; //If y and x is the same then return null as the cell is used
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) { //both x and y locations are given
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); //creating piece to be placed in the board
  piece.classList.add("piece");//adding attribute of class to "piece"
  piece.classList.add(`p${currPlayer}`);//adding the player number using that piece
  piece.style.top = - 50 * (y + 2); //change value to check?????????????
  const spot = document.getElementById(`${y}-${x}`);//getting location of column and rom into spot to place piece
  spot.append(piece); //adding a the piece in the spot location
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg); //when game is over it will display a message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
if (board.every(row=>row.every(cell=>cell))){
  return endGame("Tie");
}

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1 // if current player is 1 switch to player 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(//funtion for every cell location x and y
      ([y, x]) =>
        y >= 0 && 
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { //looping the rows
    for (let x = 0; x < WIDTH; x++) { //looping the cells/columns in the rows

      //the code below will check that there are 4 cells connected in any direction
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      //this code checks if any of the const above are met and confirm if the game has been won
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
