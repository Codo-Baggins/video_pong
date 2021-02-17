import React, { Component } from "react";
import Canvas from "./Canvas";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: { name: null, id: null, paddle: [250, 480] },
      player2: { name: null, id: null, paddle: [250, 20] },
      pongBall: [250, 250],
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
    this.createGameSettings(250, 250);
    this.createPlayer("Jon", 1, 233, 480);
    this.createPlayer("Joe", 2, 250, 20);
  };

  startGame = () => {
    this.createGame();
    requestAnimationFrame(this.updateAnimationState);
    if (this.pongBall) {
      debugger;
      // this.animateScene();
    }
  };

  animateScene = () => {
    this.incrementBallPosition();
  };

  incrementBallPosition = () => {
    let maxX = this.state.player1.paddle[0] + 17;
    let minX = this.state.player1.paddle[0] - 17;

    let minY = this.state.player1.paddle[1] + 10;
    // let ballX = this.state.pongBall[0];
    // let ballY = this.state.pongBall[1];
    if (
      this.state.pongBall[0] < maxX &&
      this.state.pongBall[0] > minX &&
      minY === this.state.pongBall[1]
    ) {
      debugger;
      this.setState((prevState) => ({
        pongBall: [prevState.pongBall[1] - 1, prevState.pongBall[0]],
      }));
    } else {
      this.setState((prevState) => ({
        pongBall: [prevState.pongBall[0] + 1, prevState.pongBall[1] + 1],
      }));
    }
    // this.detectCollision();
    if (this.state.pongBall[1] >= 500) {
      this.setState((prevState) => ({
        pongBall: [0, 500 - prevState.pongBall[0]],
      }));
    }
  };

  handleKeydown = (event) => {
    console.log(event.key);
    console.dir({
      paddle1: this.state.player1.paddle,
      paddle2: this.state.player2.paddle,
    });
    const key = event.key;
    if (key === "ArrowLeft") {
      this.setState((prevState) => ({
        player1: {
          ...prevState.player1,
          paddle: [
            prevState.player1.paddle[0] - 10,
            prevState.player1.paddle[1],
          ],
        },
      }));
    } else if (key === "ArrowRight") {
      this.setState((prevState) => ({
        player1: {
          ...prevState.player1,
          paddle: [
            prevState.player1.paddle[0] + 10,
            prevState.player1.paddle[1],
          ],
        },
      }));
    } else if (key === "z") {
      this.setState((prevState) => ({
        player2: {
          ...prevState.player2,
          paddle: [
            prevState.player2.paddle[0] - 10,
            prevState.player2.paddle[1],
          ],
        },
      }));
    } else if (key === "x") {
      this.setState((prevState) => ({
        player2: {
          ...prevState.player2,
          paddle: [
            prevState.player2.paddle[0] + 10,
            prevState.player2.paddle[1],
          ],
        },
      }));
    }
  };

  detectCollision = (i) => {
    i = i;
    if (this.state.pongBall[0] + 11 === this.state.player1.paddle[0]) {
      i++;
    } else {
      i--;
    }
  };

  render() {
    return (
      <div tabIndex='0' onKeyDown={(event) => this.handleKeydown(event)}>
        <button id='draw-button' onClick={() => this.startGame()}>
          Click me twice to start animation?
        </button>
        <Canvas
          gameState={this.state}
          {...this.state}
          gameBoard={this.gameBoard}
        />
      </div>
    );
  }
}

export default Game;
