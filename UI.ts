import { Game } from "./Game.js";

export class UI {
  constructor(private game: Game) {}
  draw(contex: CanvasRenderingContext2D) {
    contex.save();
    contex.fillStyle = "white";
    contex.shadowOffsetX = 2;
    contex.shadowOffsetY = 2;
    contex.shadowColor = "black";
    contex.font = `16px Tahoma`;
    contex.fillText("Score: " + this.game.score, 20, 20);
    for (let index = 0; index < this.game.ammo; index++) {
      contex.fillRect(5 * index + 10, 30, 2, 20);
    }
    if (this.game.gameOver) {
      contex.textAlign = "center";
      contex.font = "bold 34px Tahoma";
      contex.fillText(
        "Game Over",
        this.game.width * 0.5,
        this.game.height * 0.5
      );
    }
    contex.restore();
  }
}
