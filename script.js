let mark = "circle";
let info = document.querySelector(".info");
let table = document.querySelector("table");
let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
let counter = 0;
let p;
info.innerText = `${mark} turns`;
let allSquare = document.querySelectorAll(".square");
table.addEventListener("click", turnsChanged);

function turnsChanged(e) {
  if (e.target.textContent === "") counter++;

  if (e.target.closest("td")) {
    if (e.target.innerText === "" && mark === "circle") {
      e.target.innerText = "o";
      e.target.classList.add("circle");
      info.innerText = `cross turns`;
      winnerDecision("circle");
      mark = "cross";
    }

    if (e.target.innerText === "" && mark === "cross") {
      e.target.innerText = "x";
      e.target.classList.add("cross");
      info.innerText = `circle turns`;
      winnerDecision("cross");
      mark = "circle";
    }
  }
}

function winnerDecision(classs) {
  winningCombos.forEach(function (c, i) {
    p = c.every(function (e, i) {
      return allSquare[e].classList.contains(classs);
    });
    if (p) {
      info.innerText = `${mark} won`;
      table.removeEventListener("click", turnsChanged);
      info.classList.add("winner");
      resetBtn.style.display = "inline-block";
    } else if (counter === 9) {
      info.textContent = " drawn";
      info.classList.add("drawn");
      resetBtn.style.display = "inline-block";
    }
  });
}

let resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", reset);
function reset() {
  allSquare.forEach(function (cell) {
    cell.textContent = "";
    cell.classList.remove("circle");
    cell.classList.remove("cross");
    mark = "circle";
    info.textContent = "circle turn";
    table.addEventListener("click", turnsChanged);
    info.classList.remove("winner");
    counter = 0;
    resetBtn.style.display = "none";
  });
}
