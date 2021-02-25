/*----- app's state (variables) -----*/
let playerTurn, winner;
score2 = 0;
score1 = 0;
timer = 60;

playerTurn = 1;

/*----- constants -----*/

const player1 = 1;
const player2 = 2;

let boardarray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

/*----- cached element references -----*/
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.009;

const board = document.getElementById("insideBoard");

const buttonReset = document.getElementById("buttonReset");
const buttonMute = document.getElementById("buttonMute");

let tr = document.querySelectorAll("tr");
let td = document.querySelectorAll("td");

let PlayerTurn = document.getElementById("player-turn");

/*----- event listeners -----*/

board.addEventListener("click", click);
buttonReset.addEventListener("click", init);
buttonMute.addEventListener("click", mute);
buttonExit.addEventListener("click", exit);

/*----- functions -----*/
function init() {
  boardarray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  for (let i = 0; i < td.length; i++) {
    let col = i % 7;
    let row = Math.floor(i / 7);
    td[i].id = row + "" + col;
    td[i].innerHTML = "";
  }
}

function click(e) {
  let savedElement = e.composedPath().filter((target) => {
    console.log(typeof target);
    return target.tagName === "TD";
  });
  console.log(savedElement);

  pushDown(savedElement);

  if (
    e.target.tagName === "TABLE" ||
    e.target.tagName === "TBODY" ||
    e.target.tagName === "TR"
  ) {
    return;
  }

  console.log("Player " + playerTurn + " Clicked the " + e.target.id);
  let x = e.target.id[0];
  let y = e.target.id[1];

  if (playerTurn == 1) {
    render(e);
    PlayerTurn.innerHTML = "<img class='img' src='./style/assets/Player2.png'>";

    isWinner(isFour(boardarray));
    playerTurn = 2;
  } else if (playerTurn == 2) {
    render(e);
    PlayerTurn.innerHTML = "<img class='img' src='./style/assets/Player1.png'>";

    isWinner(isFour(boardarray));
    playerTurn = 1;
  }
}

function exit(e) {
  window.location.href = "Index.html";
}

function mute(e) {
  console.log("Mute");
  backgroundMusic.volume = 0;
}

for (let i = 0; i < td.length; i++) {
  let col = i % 7;
  let row = Math.floor(i / 7);
  td[i].id = row + "" + col;
  td[i].innerHTML = row + "" + col;
}

// Check if four element of the same player is next to eachother then a win condition will pop
function chkLine(a, b, c, d) {
  // Check first cell non-zero and all cells match
  return a != 0 && a == b && a == c && a == d;
}

// check is there four
function isFour(boardarray) {
  //check down
  for (r = 0; r < 3; r++) {
    for (c = 0; c < 7; c++) {
      if (
        chkLine(
          boardarray[r][c],
          boardarray[r + 1][c],
          boardarray[r + 2][c],
          boardarray[r + 3][c]
        )
      )
        return boardarray[r][c];
    }
  }

  // Check right
  for (r = 0; r < 6; r++) {
    for (c = 0; c < 3; c++) {
      if (
        chkLine(
          boardarray[r][c],
          boardarray[r][c + 1],
          boardarray[r][c + 2],
          boardarray[r][c + 3]
        )
      )
        return boardarray[r][c];
    }
  }
  // Check down-right
  for (r = 0; r < 3; r++) {
    for (c = 0; c < 4; c++) {
      if (
        chkLine(
          boardarray[r][c],
          boardarray[r + 1][c + 1],
          boardarray[r + 2][c + 2],
          boardarray[r + 3][c + 3]
        )
      )
        return boardarray[r][c];
    }
  }
  // Check down-left
  for (r = 3; r < 6; r++) {
    for (c = 0; c < 4; c++) {
      if (
        chkLine(
          boardarray[r][c],
          boardarray[r - 1][c + 1],
          boardarray[r - 2][c + 2],
          boardarray[r - 3][c + 3]
        )
      )
        return boardarray[r][c];
    }
  }

  return 0;
}

function isWinner(winner) {
  if (winner == 1) {
    window.location.href = "Player1Won.html";
  } else if (winner == 2) {
    window.location.href = "Player2Won.html";
  } else {
    return;
  }
}

function pushDown(savedElement) {
  // let x = event.target.id[0];
  let y = savedElement[0].id.split("")[1];

  console.log(y);

  for (i = 0; i < boardarray.length; i++) {
    if (boardarray[i][y] !== 0) {
      if (i === 0) {
        break;
      } else {
        boardarray[i - 1][y] = playerTurn;
        isWinner(isFour(boardarray));
        break;
      }
    } else if (i === boardarray.length - 1) {
      boardarray[i][y] = playerTurn;
      isWinner(isFour(boardarray));
      break;
    }
  }
}

function render(event) {
  // setTimeout(render, 1000);
  for (r = 0; r < 6; r++) {
    for (c = 0; c < 7; c++) {
      if (event.target.tagName === "table") return;
      if (playerTurn == 1 && boardarray[r][c] == 1) {
        document.getElementById(`${r}${c}`).innerHTML =
          "<img class='img' src='./style/assets/Player1.png'>";
      } else if (playerTurn == 2 && boardarray[r][c] == 2) {
        document.getElementById(`${r}${c}`).innerHTML =
          "<img class='img' src='./style/assets/Player2.png'>";
      }
    }
  }
}

init();
render();

////////////////////////////////////////////////////////////////////////////////////////////////
// Aidan Way for the board
// let board = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 3, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 1, 0],
// ];
// let DOMboard = document.getElementById("board");
// board.forEach((r, index1) => {
//   let row = document.createElement("div");
//   row.className = "row";
//   row.id = `r${x}`;
//   r.forEach((c, index2) => {
//     let cell = document.createElement("div");
//     cell.className = "cell";
//     cell.innerText = `c${x}${y}`;
//     cell.id = `c${x}${y}`;
//     console.log(cell);
//     row.appendChild(cell);
//   });
//   DOMboard.appendChild(row);
// });
// function init() {}
