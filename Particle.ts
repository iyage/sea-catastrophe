import { Game } from "./Game";

export class Particle {
  game: Game;
  x: number;
  y: number;
  image: any;
  frameX: number;
  frameY: number;
  spriteSize: number;
  sizeModifier: number;
  size: number;
  speedX: number;
  gravity: number;
  markForDeletion: boolean;
  angle: number;
  velocityOfAngle: number;
  speedY: number;
  botomBounceBoundary: number;
  bounce: number;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("gears");
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.sizeModifier = parseFloat((Math.random() * 0.5 + 0.5).toFixed(1));
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.gravity = 0.5;
    this.markForDeletion = false;
    this.angle = 0;
    this.velocityOfAngle = Math.random() * 0.2 - 0.1;
    this.botomBounceBoundary = Math.random() * 100 + 60;
    this.bounce = 0;
  }
  update() {
    this.angle += this.velocityOfAngle;
    this.speedY += this.gravity;
    this.x -= this.speedX;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markForDeletion = true;
    if (
      this.y > this.game.height - this.botomBounceBoundary &&
      this.bounce < 2
    ) {
      this.bounce++;
      this.speedY *= -0.5;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}
