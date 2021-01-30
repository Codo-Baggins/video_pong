// import Player from "./Player";
import React, { Component, useState, useRef, useEffect } from "react";
// import GamePiece from "./GamePiece";
// import { create } from "istanbul-reports";

const Game = (props) => {
  let [player1, setPlayer1] = useState(null);
  let [player2, setPlayer2] = useState(null);
  let [player1Paddle, setPlayer1Paddle] = useState(null);
  let [player2Paddle, setPlayer2Paddle] = useState(null);
  let [pongBall, setPongBall] = useState(null);
  let [round, setRound] = useState(1);
  let [gameCode, setGameCode] = useState(null);
  let [context, setContext] = useState(null);
  let gameBoard = useRef(null);

  // const pongBall = new GamePiece(250, 250, "ball");
  // const player1Paddle = new GamePiece(233, 480, "paddle");
  // const player2Paddle = new GamePiece(233, 20, "paddle");

  const createPlayer = (username, id, x, y) => {
    const player = {
      username: username,
      id: id,
      score: 0,
    };
    if (player1) {
      setPlayer2(player);
      setPlayer2Paddle([x, y]);
    } else {
      setPlayer1(player);
      setPlayer1Paddle([x, y]);
    }
  };

  const createGameSettings = (x, y) => {
    const pongBall = [x, y];
    setPongBall(pongBall);
    // setGameCode(gameCode);
  };

  const createGame = () => {
    createGameSettings(250, 250);
    createPlayer("Jon", 1, 233, 20);
    // createPlayer("Joe", 2, 250, 480);

    props.setGame({
      player1: player1,
      player2: player2,
      pongBall: pongBall,
      round: round,
      gameCode: gameCode,
    });
  };

  useEffect(() => {
    setGameCode(props.gameCode);
    if (gameBoard.current) {
      const context = gameBoard.current.getContext("2d");
      context.fillStyle = "skyblue";
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      setContext(context);
    }
  }, []);

  useEffect(() => {
    createPlayer("Joe", 2, 233, 480);
  }, [player1]);

  const startGame = () => {
    createGame();
    if (pongBall) {
      drawBall(pongBall);
      drawPaddle(player1Paddle);
      drawPaddle(player2Paddle);
      animateScene();
    }
  };

  const drawBall = (prevX, prevY, dx, dy) => {
    context.beginPath();
    context.arc(prevX + dx, prevY + dy, 10, 180, 360);
    context.stroke();
    context.closePath();
  };

  const drawPaddle = (playerPaddle) => {
    context.beginPath();
    context.rect(playerPaddle[0], playerPaddle[1], 35, 10);
    context.closePath();
    context.stroke();
  };

  const drawGameState = () => {
    eraseCanvas();
    drawBall(250, 250, 1, 1);
    drawPaddle(player1Paddle);
    drawPaddle(player2Paddle);
  };

  const eraseCanvas = () => {
    context.clearRect(0, 0, 500, 500);
  };

  const animateScene = () => {
    drawGameState();
    requestAnimationFrame(() => animateScene());
  };

  const handleKeydown = (event) => {
    console.log(event.key);
    const key = event.code;
    if (key === "ArrowLeft") {
      player1Paddle[0] += -10;
      setPlayer1Paddle(player1Paddle);
    } else if (key === "ArrowRight") {
      player1Paddle[0] += 10;
      setPlayer1Paddle(player1Paddle);
    } else if (key === "z") {
      player2Paddle[0] += -10;
      setPlayer2Paddle(player2Paddle);
    } else if (key === "x") {
      player2Paddle[0] += 10;
      setPlayer2Paddle(player2Paddle);
    }
  };

  return (
    <div tabIndex='0' onKeyDown={(event) => handleKeydown(event)}>
      <button id='draw-button' onClick={() => startGame()}>
        Click me twice to start animation?
      </button>
      <canvas id='canvas' width='500' height='500' ref={gameBoard}></canvas>
    </div>
  );
};

export default Game;
