import React, { Component } from "react";
import Canvas from "./Canvas";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: { name: null, id: null, paddle: [233, 480] },
      player2: { name: null, id: null, paddle: [233, 10] },
      pongBall: [250, 250],
      ballDirection: [-1, -1],
      round: 0,
      gameCode: null,
    };
  }

  updateAnimationState = () => {
    // this.setState((prevState) => ({
    //   pongBall: [prevState.pongBall[0] + 1, prevState.pongBall[1] + 1],
    // }));
    this.animateScene();
    requestAnimationFrame(this.updateAnimationState);
  };

  createPlayer = (username, id, x, y) => {
    const player = {
      username: username,
      id: id,
      score: 0,
      paddle: [x, y],
    };
    if (this.state.player1) {
      this.setState(() => ({
        player2: player,
      }));
    } else {
      this.setState(() => ({
        player1: player,
      }));
    }
  };

  createGameSettings = (x, y) => {
    const pongBall = [x, y];
    this.setState({ pongBall: pongBall });

    // setGameCode(gameCode);
  };

  createGame = () => {
    this.createGameSettings(250, 100);
    // this.createPlayer("Jon", 1, 20, 480);
    // this.createPlayer("Joe", 2, 250, 10);
  };

  startGame = () => {
    this.createGame();
    requestAnimationFrame(this.updateAnimationState);
  };

  animateScene = () => {
    this.detectCollision();
    this.incrementBallPosition();
  };

  incrementBallPosition = () => {
    this.setState((prevState) => ({
      pongBall: [
        prevState.pongBall[0] + prevState.ballDirection[0],
        prevState.pongBall[1] + prevState.ballDirection[1],
      ],
    }));
  };

  handleKeydown = (event) => {
    event.preventDefault();
    const key = event.key;
    if (key === "ArrowLeft") {
      this.setState((prevState) => ({
        player1: {
          ...prevState.player1,
          paddle: [
            prevState.player1.paddle[0] - 15,
            prevState.player1.paddle[1],
          ],
        },
      }));
    } else if (key === "ArrowRight") {
      this.setState((prevState) => ({
        player1: {
          ...prevState.player1,
          paddle: [
            prevState.player1.paddle[0] + 15,
            prevState.player1.paddle[1],
          ],
        },
      }));
    } else if (key === "z") {
      this.setState((prevState) => ({
        player2: {
          ...prevState.player2,
          paddle: [
            prevState.player2.paddle[0] - 15,
            prevState.player2.paddle[1],
          ],
        },
      }));
    } else if (key === "x") {
      this.setState((prevState) => ({
        player2: {
          ...prevState.player2,
          paddle: [
            prevState.player2.paddle[0] + 15,
            prevState.player2.paddle[1],
          ],
        },
      }));
    }
  };

  detectCollision = (prevPos, newPos) => {
    let [player1PaddleX, player1PaddleY] = this.state.player1.paddle;
    let [player2PaddleX, player2PaddleY] = this.state.player2.paddle;

    let [ballX, ballY] = this.state.pongBall;

    let player1RightEdge = player1PaddleX + 35;
    let player1LeftEdge = player1PaddleX;
    let player1PaddleSurface = player1PaddleY;
    let player1PaddleBottom = player1PaddleY + 10;

    let player2RightEdge = player2PaddleX + 35;
    let player2LeftEdge = player2PaddleX;
    let player2PaddleSurface = player2PaddleY + 20;
    let player2PaddleBottom = player2PaddleY;

    let surface;

    if (
      (ballX < player1RightEdge &&
        ballX > player1LeftEdge &&
        player1PaddleSurface === ballY) ||
      ballY === 490
    ) {
      surface = "bottom";
    } else if (
      (ballX < player2RightEdge &&
        ballX > player2LeftEdge &&
        player2PaddleSurface === ballY) ||
      ballY === 10
    ) {
      surface = "top";
    } else if (
      ballX === 10 ||
      (ballX - 10 === player1RightEdge &&
        ballY > player1PaddleSurface &&
        ballY < player1PaddleBottom) ||
      (ballX - 10 === player2RightEdge &&
        ballY < player2PaddleSurface &&
        ballY > player2PaddleBottom)
    ) {
      surface = "left";
    } else if (
      ballX === 490 ||
      (ballX === player1LeftEdge &&
        ballY > player1PaddleSurface &&
        ballY < player1PaddleBottom) ||
      (ballX + 10 === player2LeftEdge &&
        ballY < player2PaddleSurface &&
        ballY > player2PaddleBottom)
    ) {
      surface = "right";
    }

    const [x, y] = this.determineCollisionAngle(surface);

    this.setState({ ballDirection: [x, y] });
  };

  // calculateReflectionAngle

  // updateReflectionAngle

  determineCollisionAngle = (surface) => {
    const [xDirection, yDirection] = this.state.ballDirection;

    // let contactAngle;
    // contactAngle = Math.atan(xDirection / yDirection);

    // let reflectionAngle = contactAngle - Math.PI;
    // let newDirection = Math.tan(reflectionAngle);

    switch (surface) {
      default:
        return [xDirection, yDirection];
      case "top":
        console.log("top");
        console.log(
          this.state.pongBall,
          this.state.player1.paddle,
          this.state.player2.paddle
        );
        return [xDirection, yDirection * -1];
      case "bottom":
        console.log("bottom");
        console.log(
          this.state.pongBall,
          this.state.player1.paddle,
          this.state.player2.paddle
        );
        return [xDirection, yDirection * -1];
      case "left":
        console.log("left");
        console.log(
          this.state.pongBall,
          this.state.player1.paddle,
          this.state.player2.paddle
        );
        return [xDirection * -1, yDirection];
      case "right":
        console.log(
          this.state.pongBall,
          this.state.player1.paddle,
          this.state.player2.paddle
        );
        console.log("right");
        return [xDirection * -1, yDirection];
    }
  };

  render() {
    return (
      <body>
        <div tabIndex='0' onKeyDown={(event) => this.handleKeydown(event)}>
          <button id='draw-button' onClick={() => this.startGame()}>
            Click me twice to start game!
          </button>
          <Canvas
            // gameState={this.state}
            {...this.state}
            // gameBoard={this.gameBoard}
            detectCollision={this.detectCollision}
          />
        </div>
      </body>
    );
  }
}

export default Game;
