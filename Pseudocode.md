/*----- constants -----*/
const player1 = {
  color: red,

};

const player2 = {
  color: yellow,
};

boardarray = [
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7]
 ];

/*----- app's state (variables) -----*/

scoreplayer1 = 0;
scoreplayer2 = 0;
timer = 60;

/*----- cached element references -----*/

const playSound = new Audio("PlacementAudio.mp3");
const bkacgroundSound = new Audio("background.mp3");
const board = document.querySelectorAll(boardarry);
const player1obj = document.getElementById("player1");
const player2objt = document.getElementById("player2");
const obj1 = new image("assets/Player1.png")
/*----- event listeners -----*/

eventlistner.muteButton;
eventlistner.resetButton;
eventlistner.exitButton;
eventlistner.board;

/*----- functions -----*/
function that init(){
set the board empty;
reset the timer;

}


function that place a playerobj(event){

if it turn of  player1 then {
  place  player object 1;
  set the inner html to player 1
}else if it  turn of player2 then{
  set the inner html to player2
  place player object 2;
}
}




function that detects if (theres four){

  check if object is close the identical objects
  if placed object player 1 next to player1 {
    then add +1 to player1
    pass turn to next player
  }else if (object player 2 is next to player 2){
    then add +1 to player1
    pass turn to next player
  }else if (player1 !=player1 || player2 != player2){
    pass turn to next player
  }

}


function render () {

    redner player1
    render player2
    render the board
    render the time
    render the PlayerTurn

}
