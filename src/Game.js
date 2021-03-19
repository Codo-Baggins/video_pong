import React, { Component } from "react";
import Canvas from "./Canvas";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: { name: null, id: null, paddle: [235, 480] },
      player2: { name: null, id: null, paddle: [235, 10] },
      pongBall: [250, 250],
      ballDirection: [-1, -1],
      round: 0,
      gameCode: null,
    };
  }

  updateAnimationState = () => {
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
      this.setState({
        player2: player,
      });
    } else {
      this.setState({
        player1: player,
      });
    }
  };

  createGameSettings = (x, y) => {
    const pongBall = [x, y];
    this.setState({ pongBall: pongBall });
    // setGameCode(gameCode);
  };

  createGame = () => {
    this.createGameSettings(250, 100);
    this.createPlayer("Jon", 1, 235, 480);
    this.createPlayer("Joe", 2, 235, 10);
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

  detectCollision = () => {
    let [player1PaddleX, player1PaddleY] = this.state.player1.paddle;
    let [player2PaddleX, player2PaddleY] = this.state.player2.paddle;
    let [ballX, ballY] = this.state.pongBall;

    let player1RightEdge = player1PaddleX + 30;
    let player1LeftEdge = player1PaddleX;
    let player1PaddleTop = player1PaddleY;
    let player1PaddleBottom = player1PaddleY + 10;

    let player2RightEdge = player2PaddleX + 30;
    let player2LeftEdge = player2PaddleX;
    let player2PaddleTop = player2PaddleY + 10;
    let player2PaddleBottom = player2PaddleY;

    let surface;

    if (
      (ballX - 10 <= player1RightEdge &&
        ballX + 10 >= player1LeftEdge &&
        player1PaddleTop === ballY + 10) ||
      ballY === 490
    ) {
      surface = "bottom";
    } else if (
      (ballX - 10 <= player2RightEdge &&
        ballX + 10 >= player2LeftEdge &&
        player2PaddleTop === ballY - 10) ||
      ballY === 10
    ) {
      surface = "top";
    } else if (
      ballX === 10 ||
      (ballX - 10 <= player1RightEdge &&
        ballX >= player1RightEdge &&
        ballY + 10 >= player1PaddleTop &&
        ballY - 10 <= player1PaddleBottom) ||
      (ballX - 10 <= player2RightEdge &&
        ballX >= player2RightEdge &&
        ballY + 10 >= player2PaddleTop &&
        ballY - 10 <= player2PaddleBottom)
    ) {
      surface = "left";
    } else if (
      ballX === 490 ||
      (ballX + 10 >= player1LeftEdge &&
        ballX <= player1LeftEdge &&
        ballY + 10 >= player1PaddleTop &&
        ballY - 10 <= player1PaddleBottom) ||
      (ballX + 10 >= player2LeftEdge &&
        ballX <= player2LeftEdge &&
        ballY + 10 >= player2PaddleTop &&
        ballY - 10 <= player2PaddleBottom)
    ) {
      surface = "right";
    }

    this.updateBallDirection(surface);
  };

  updateBallDirection = (surface) => {
    const [x, y] = this.calculateBallDirection(surface);
    this.setState({ ballDirection: [x, y] });
  };

  calculateBallDirection = (surface) => {
    const [xDirection, yDirection] = this.state.ballDirection;

    switch (surface) {
      default:
        return [xDirection, yDirection];
      case "top":
        return [xDirection, yDirection * -1];
      case "bottom":
        return [xDirection, yDirection * -1];
      case "left":
        return [xDirection * -1, yDirection];
      case "right":
        return [xDirection * -1, yDirection];
    }
  };

  render() {
    return (
      <body>
        <div tabIndex='0' onKeyDown={(event) => this.handleKeydown(event)}>
          <button id='draw-button' onClick={() => this.startGame()}>
            Click once to start game, multiple times to speed up ball.
          </button>
          <Canvas {...this.state} />
        </div>
      </body>
    );
  }
}

export default Game;
