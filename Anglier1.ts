import { Enemy } from "./Enemy.js";
import { Game } from "./Game.js";

export class Anglier1 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height - (this.height + 10));
    this.color = "red";
    this.imgage = document.getElementById("anglier1");
    this.frameY = Math.floor(Math.random() * 3);
    this.point = 1;
    this.lives = 1;
  }
}
