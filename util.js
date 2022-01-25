"use strict";
// global vars
var length = 4;
var nums = getNums(length ** 2);
var correctNum = 1;
var isGameOn = true;
var highscore = Infinity;
var seconds = 0;
var secFixed;
var startTime; //interval
//elements
var TimeEl = document.querySelector(".time");
var tableEl = document.querySelector(".game");
var highEl = document.querySelector(".highscore");
var divlevelEl = document.querySelector(".lev");
var btnsEl = document.querySelectorAll(".levels");

//Sound effects
var correctSound = new Audio("sound/correct.wav");
var newHighscore = new Audio("sound/highscore.wav");

function changeLevel(btnEl) {
  if (divlevelEl.classList.contains(btnEl.innerText)) return;
  var currClass = divlevelEl.classList[1];
  var prevBtn = document.querySelector(`.curr`);
  //update DOMs
  divlevelEl.classList.remove(currClass);
  divlevelEl.classList.add(btnEl.innerText);
  prevBtn.classList.remove(`curr`);
  btnEl.classList.add(`curr`);
  //update game
  if (btnEl.innerText === "easy") length = 4;
  if (btnEl.innerText === "medium") length = 5;
  if (btnEl.innerText === "hard") length = 6;
  newGame();
  createMat(length);
  highscore = Infinity;
  highEl.innerText = `HIGHSCORE: `;
}

function newGame() {
  tableEl.innerHTML = "";
  if (highscore < Infinity) {
    highEl.innerText = `HIGHSCORE: ${highscore}`;
  }
  seconds = 0;
  correctNum = 1;
  isGameOn = true;
  clearInterval(startTime);
  TimeEl.innerText = `GAME TIME: 0`;
  init();
}

function init() {
  createMat(length);
}

function incrementSeconds() {
  seconds += 0.1;
  secFixed = seconds.toFixed(1);
  TimeEl.innerText = `GAME TIME: ${secFixed}`;
}

function win() {
  isGameOn = false;

  clearInterval(startTime);
  console.log(secFixed);
  if (+highscore > +secFixed) {
    if (+highscore !== Infinity) newHighscore.play();
    highscore = secFixed;
    highEl.innerText = `HIGHSCORE: ${highscore}`;
  }
}

function cellClicked(cellEl, i, j) {
  var cellNum = +cellEl.innerText;
  if (!isGameOn) return;
  if (isNaN(+cellNum)) return;
  if (correctNum === 1) startTime = setInterval(incrementSeconds, 100);

  if (cellNum === correctNum) {
    cellEl.innerText = "🍓";
    cellEl.classList.add("correct");
    correctSound.play();
    correctNum++;
    if (correctNum > length ** 2) win();
  } else {
    seconds += 0.5;
  }
}

function mouseOn(cellEl) {
  if (isNaN(+cellEl.innerText)) return;
  cellEl.style.backgroundColor = "pink";
}

function mouseOff(cellEl) {
  if (isNaN(+cellEl.innerText)) return;
  cellEl.style.backgroundColor = "aqua";
}

function createMat(num) {
  var board = [];
  var str = ``;

  for (var i = 0; i < length; i++) {
    board[i] = [];
    str += `<tr>`;
    for (var j = 0; j < length; j++) {
      var num = drawNum(nums);
      board[i][j] = num;
      str += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})" onmouseover="mouseOn(this)" onmouseleave="mouseOff(this)">${num}</td>`;
    }
    str += `</tr>`;
  }
  nums = getNums(length ** 2);
  tableEl.innerHTML = str;
}

function createCopyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat[i].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}

function shuffleRows(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

function getNums(n) {
  var arr = [];
  var num = 1;
  for (var i = 0; i < n; i++) {
    arr.push(num);
    num++;
  }
  return arr;
}

function drawNum(nums) {
  var idx = getRandomInt(0, nums.length - 1);
  var num = nums[idx];
  nums.splice(idx, 1);
  return num;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
