import { Enemy } from "./Enemy.js";
import { Game } from "./Game.js";

export class Anglier2 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height - (this.height + 10));
    this.color = "red";
    this.imgage = document.getElementById("anglier2");
    this.frameY = Math.floor(Math.random() * 2);
    this.point = 3;
    this.lives = 3;
  }
}
