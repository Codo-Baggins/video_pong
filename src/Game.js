import Player from "./Player";

class Game {
  constructor(player1, player2, pongBall, gameCode) {
    this.player1 = player1;
    this.player2 = player2;
    this.pongBall = pongBall;
    this.round = 1;
    this.gameCode = gameCode;
  }
}

export default Game;
