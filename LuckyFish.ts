import { Enemy } from "./Enemy.js";
import { Game } from "./Game.js";

export class LuckyFish extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height - (this.height + 10));
    this.color = "red";
    this.imgage = document.getElementById("luckyFish");
    this.frameY = Math.floor(Math.random() * 2);
    this.type = "lucky";
    this.point = 5;
    this.lives = 3;
  }
}
