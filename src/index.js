// import GamePiece from "./GamePiece.js";

// CanvasRenderingContext2D.prototype.clear =
//   CanvasRenderingContext2D.prototype.clear ||
//   function (preserveTransform) {
//     if (preserveTransform) {
//       this.save();
//       this.setTransform(1, 0, 0, 1, 0, 0);
//     }

//     this.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     if (preserveTransform) {
//       this.restore();
//     }
//   };

const gameBoard = document.getElementById("canvas");
const drawButton = document.getElementById("draw-button");

const context = gameBoard.getContext("2d");

drawButton.addEventListener("click", animateBall);

context.save();

// context.moveTo(0, 0);
// context.lineTo(500, 500);
// context.stroke();

// context.moveTo(500, 0);
// context.lineTo(0, 500);
// context.stroke();

context.moveTo(250, 250);
context.arc(250, 250, 10, 180, 360);
context.stroke();

function drawNextBall(prevX, prevY, dx, dy) {
  context.arc(prevX + dx, prevY + dy, 10, 180, 360);
  context.stroke();
}

function erasePreviousBall() {
  context.beginPath();
  // context.restore();
  context.clearRect(0, 0, 500, 500);
}

// requestAnimationFrame(() => animateBall());

function animateBall() {
  // erasePreviousBall();
  for (let i = 250; i < 480; i++) {
    requestAnimationFrame(() => erasePreviousBall());
    requestAnimationFrame(() => drawNextBall(i, i, 1, 1));
  }
}

const pongBall = new GamePiece();
