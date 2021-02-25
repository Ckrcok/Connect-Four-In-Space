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
  // reset the board to starting state
  boardarray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  // give every td an id based on its index

  for (let i = 0; i < td.length; i++) {
    let col = i % 7;
    let row = Math.floor(i / 7);
    td[i].id = row + "" + col;
    td[i].innerHTML = "";
  }
}

// click function
function click(e) {
  // filer out the elemnts but only returns tag of TD
  let savedElement = e.composedPath().filter((target) => {
    console.log(typeof target);
    return target.tagName === "TD";
  });

  // send it to function pushDown to push down the chips
  pushDown(savedElement);
  //checking that we are only clicking on the td and not other places
  if (
    e.target.tagName === "TABLE" ||
    e.target.tagName === "TBODY" ||
    e.target.tagName === "TR"
  ) {
    return;
  }

  //save the id indexs
  let x = e.target.id[0];
  let y = e.target.id[1];

  // player 1 places else player 2
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

//exit button
function exit(e) {
  window.location.href = "index.html";
}

//mute button
function mute(e) {
  console.log("Mute");
  backgroundMusic.volume = 0;
}

// give every td an id based on its index
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

// if there is a winner if there is go to the winner page
function isWinner(winner) {
  if (winner == 1) {
    window.location.href = "Player1Won.html";
  } else if (winner == 2) {
    window.location.href = "Player2Won.html";
  } else {
    return;
  }
}

// pushing down the chips
function pushDown(savedElement) {
  let y = savedElement[0].id.split("")[1];

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

//render the board
function render(event) {
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

//start the board and render
init();
render();
