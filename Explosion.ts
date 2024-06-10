import { Game } from "./Game";

export class Explosion {
  game: Game;
  x!: number;
  y!: number;
  height: number;
  frameY: number;
  fps: number;
  timer: number;
  interval: number;
  markForDeletion: boolean;
  frameX!: number;
  maxFrame: number;
  width!: number;
  image!: any;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.height = 200;
    this.width = 200;
    this.frameY = 0;
    this.fps = 15;

    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markForDeletion = false;
    this.maxFrame = 8;
    this.frameX = 0;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }
  update(deltaTime: number) {
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else this.timer += deltaTime;

    if (this.frameX > this.maxFrame) this.markForDeletion = true;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.debug)
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * 0.7,
      this.height * 0.7
    );
  }
}
