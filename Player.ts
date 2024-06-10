import { Game } from "./Game.js";
import { Projectile } from "./Projectiles.js";
export class Player {
  height: number;
  width: number;
  x: number;
  y: number;
  shiftY: number = 0;
  game: Game;
  projectiles: Projectile[];
  image: any;
  frmaeX: number;
  frameY: number;
  maxFrame: number;
  powerUp: boolean;
  timeLimit: number;
  interval: number;
  constructor(game: Game) {
    this.game = game;
    this.height = 190;
    this.width = 120;
    this.x = 20;
    this.y = 100;
    this.projectiles = [];
    this.image = document.getElementById("player");
    this.frmaeX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.powerUp = false;
    this.timeLimit = 2000;
    this.interval = 0;
  }

  move(deltaTime: number) {
    if (this.game.keys.indexOf("ArrowUp") > -1 && this.y > 5) this.shiftY = -1;
    else if (
      this.game.keys.indexOf("ArrowDown") > -1 &&
      this.y < this.game.height - 100
    )
      this.shiftY = 1;
    else this.shiftY = 0;
    this.y += this.shiftY;
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.markDelete == false
    );
    //sprite animation
    this.frmaeX < this.maxFrame ? this.frmaeX++ : (this.frmaeX = 0);
    if (this.powerUp) {
      if (this.interval > this.timeLimit) {
        this.powerUp = false;
        this.interval = 0;
        this.frameY = 0;
      } else this.interval += deltaTime;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
    context.drawImage(
      this.image,
      this.frmaeX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  shoot() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.x + this.width - 20, this.y + 30, this.game)
      );
      this.game.ammo--;
    }
    this.game.soundController.shotSound();
    if (this.powerUp) this.powerShoot();
  }
  powerShoot() {
    this.projectiles.push(
      new Projectile(this.x + this.width - 25, this.y + 160, this.game)
    );
    this.game.ammo += 0.1;
  }
  enterpowerUp() {
    this.game.soundController.powerUpSound();
    this.interval = 0;
    this.powerUp = true;
    this.frameY = 1;
    this.game.ammo = this.game.maxAmmor;
  }
}
