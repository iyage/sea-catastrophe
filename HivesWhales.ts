import { Enemy } from "./Enemy.js";
import { Game } from "./Game.js";

export class HivesWhale extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height - (this.height + 10));
    this.imgage = document.getElementById("hiveWhale");
    this.frameY = 0;
    this.type = "hives";
    this.point = 15;
    this.lives = 15;
    // this.speedX = Math.random() * 2 + 2;
  }
}
