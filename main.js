"use strict";

function createMat(num) {
  var length = Math.sqrt(num);
  var board = [];
  var num = 1;
  for (var i = 0; i < length; i++) {
    board[i] = [];
    for (var j = 0; j < length; j++) {
      board[i][j] = num;
      num++;
    }
  }
  return board;
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
