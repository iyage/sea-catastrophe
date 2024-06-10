import { Game } from "./Game.js";

export class Enemy {
  y!: number;
  x!: number;
  speedX: number;
  markForDeletion: boolean;
  color!: string;
  width!: number;
  height!: number;
  game: Game;
  imgage: any;
  frameY!: number;
  maxFrame: number;
  frmameX: number;
  type!: string;
  lives!: number;
  point!: number;
  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * (3 - 1) + 1;
    this.markForDeletion = false;
    this.maxFrame = 37;
    this.frameY = 0;
    this.frmameX = 0;
  }
  draw(contex: CanvasRenderingContext2D) {
    if (this.game.debug) {
      contex.strokeRect(this.x, this.y, this.width, this.height);
    }

    contex.drawImage(
      this.imgage,
      this.frmameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    this.x -= this.speedX;
    if (this.x + this.width < 10) {
      this.markForDeletion = true;
    }
    if (this.frmameX < this.maxFrame) this.frmameX++;
    else this.frmameX = 0;
  }
}
