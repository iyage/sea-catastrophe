import { Game } from "./Game.js";

export class Layer {
  game: Game;
  image: any;
  speedModifier: number;
  width: number;
  height: number;
  y: number;
  x: number;
  constructor(game: Game, image: any, speedModifier: number) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.y = 0;
    this.x = 0;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    this.x -= this.speedModifier * this.game.speed;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
