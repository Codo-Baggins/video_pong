// import GamePiece from "./GamePiece.js";
import React, { useState } from "react";
import Game from "./Game";
import GamePiece from "./GamePiece";
import Player from "./Player";

const App = () => {};

const gameBoard = document.getElementById("canvas");
const drawButton = document.getElementById("draw-button");
const context = gameBoard.getContext("2d");

drawButton.addEventListener("click", startGame);
document.addEventListener("keydown", handleKeydown);

context.save();

const pongBall = new GamePiece(250, 250, "ball");
const player1Paddle = new GamePiece(233, 480, "paddle");
const player2Paddle = new GamePiece(233, 20, "paddle");

function createGame(gameCode) {
  const player1 = new Player("Jon", 1, player1Paddle);
  const player2 = new Player("Joe", 2, player2Paddle);
  const newGame = new Game(player1, player2, pongBall, gameCode);
  return newGame;
}

function startGame() {
  const gameData = createGame(Math.random);
  console.log(gameData);
  drawGamePiece(gameData.pongBall);
  drawGamePiece(gameData.player1.paddle);
  drawGamePiece(gameData.player2.paddle);
  animateBall();
}

// context.moveTo(250, 250);
// context.arc(250, 250, 10, 180, 360);
// context.stroke();

function drawNextBall(prevX, prevY, dx, dy) {
  context.beginPath();
  context.arc(prevX + dx, prevY + dy, 10, 180, 360);
  context.stroke();
}

function eraseCanvas() {
  // context.beginPath();
  // context.restore();
  context.clearRect(0, 0, 500, 500);
}

function animateBall() {
  for (let i = 250; i < 480; i++) {
    setInterval(() => requestAnimationFrame(() => eraseCanvas()), i * 20);

    setInterval(
      () => requestAnimationFrame(() => drawNextBall(i, i, 1, 1)),
      i * 20
    );
  }
}

function drawGamePiece(gamePiece) {
  context.moveTo(gamePiece.x, gamePiece.y);
  if (gamePiece.type === "ball") {
    context.arc(gamePiece.x, gamePiece.y, 10, 180, 360);
  } else if (gamePiece.type === "paddle") {
    context.rect(gamePiece.x, gamePiece.y, 35, 10);
  }
  context.stroke();
}

function movePaddle(dx, playerPaddle) {
  context.beginPath();
  eraseCanvas();
  player1Paddle.x += dx;
  drawGamePiece(playerPaddle);
}

function handleKeydown(event) {
  const key = event.code;
  if (key === "ArrowLeft") {
    movePaddle(-1, player1Paddle);
  } else if (key === "ArrowRight") {
    movePaddle(1, player1Paddle);
  } else if (key === "z") {
    movePaddle(-1, player2Paddle);
  } else if (key === "x") {
    movePaddle(1, player2Paddle);
  }
}

export default App;
