import { Game } from "./Game.js";

export class Projectile {
  width: number = 3;
  height: number = 5;
  speed: number = 3;
  markDelete: boolean = false;
  game: Game;
  x: number;
  y: number;
  image: any;
  constructor(x: number, y: number, game: Game) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markDelete = false;
    this.image = document.getElementById("projectile");
  }
  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.9) this.markDelete = true;
  }
  draw(context: CanvasRenderingContext2D) {
    // context.fillStyle = "yellow";
    context.drawImage(this.image, this.x, this.y);
  }
}
