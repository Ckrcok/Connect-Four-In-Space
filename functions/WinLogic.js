/*----- app's state (variables) -----*/
let change;
/*----- constants -----*/

/*----- cached element references -----*/
let Music = document.getElementById("music");
let Nice = document.getElementById("nice");
let Button = document.getElementById("button");
let Dual = document.getElementById("dual");
/*----- event listeners -----*/

Button.addEventListener("click", dual);
/*----- functions -----*/

Music.volume = 0.07;
Nice.volume = 0.17;

function dual(e) {
  Dual.volume = 0.06;
  Dual.play();
  Music.pause();
  Nice.pause();
  setTimeout(function (e) {
    chagePage();
  }, 5000);
}

function chagePage() {
  window.location.href = "Game.html";
}
