/*----- app's state (variables) -----*/
let change;
/*----- constants -----*/

/*----- cached element references -----*/
let Music = document.getElementById("music");
let Button = document.getElementById("button");
let Go = document.getElementById("go");
/*----- event listeners -----*/

Button.addEventListener("click", go);
/*----- functions -----*/

Music.volume = 0.035;

function go(e) {
  Go.volume = 0.1;
  Go.play();

  setTimeout(function (e) {
    chagePage();
  }, 2000);
}

function chagePage() {
  window.location.href = "Game.html";
}
