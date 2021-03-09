import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.gameBoard = React.createRef();
  }

  componentDidUpdate() {
    const context = this.gameBoard.current.getContext("2d");
    this.drawGameState(context);
  }

  drawBall = (context) => {
    context.beginPath();
    context.arc(this.props.pongBall[0], this.props.pongBall[1], 10, 180, 360);
    context.fillStyle = "black";
    context.fill();
    context.stroke();
    context.closePath();
  };

  drawPaddle = (playerPaddle, context) => {
    context.beginPath();
    context.rect(playerPaddle[0], playerPaddle[1], 35, 10);
    context.fillStyle = "black";
    context.fill();
    context.stroke();
    context.closePath();
  };

  drawGameState = (context) => {
    // this.props.detectCollision();
    this.eraseCanvas(context);
    context.beginPath();
    context.moveTo(250, 0);
    context.lineTo(250, 500);
    context.stroke();
    context.closePath();
    this.drawBall(context);
    this.drawPaddle(this.props.player1.paddle, context);
    this.drawPaddle(this.props.player2.paddle, context);
  };

  eraseCanvas = (context) => {
    context.clearRect(0, 0, 500, 500);
  };

  render() {
    return (
      <canvas
        l
        id='canvas'
        width='500'
        height='500'
        ref={this.gameBoard}></canvas>
    );
  }
}

export default Canvas;
