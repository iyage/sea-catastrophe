import { Anglier1 } from "./Anglier1.js";
import { Anglier2 } from "./Anglier2.js";
import { BackGround } from "./BackGround.js";
import { Enemy } from "./Enemy.js";
import { Explosion } from "./Explosion.js";
import { FireExplosion } from "./FireExplosion.js";
import { HivesWhale } from "./HivesWhales.js";
import { InputHandler } from "./InputHnadler.js";
import { LuckyFish } from "./LuckyFish.js";
import { Particle } from "./Particle.js";
import { Player } from "./Player.js";
import { SmokeExplosion } from "./SmokeExplosion.js";
import { SoundController } from "./SoundController.js";
import { UI } from "./UI.js";
export class Game {
  width: number;
  height: number;
  keys: string[];
  enemies: Enemy[];
  ammo: number;
  player: Player;
  inputHandler: InputHandler;
  ammoTimer: number;
  ammoInterval: number;
  maxAmmor: number;
  ui: UI;
  enemyTimer: number;
  enemyInterval: number;
  gameOver: boolean;
  score: number;
  maxScore: number;
  timeCount: number;
  timeLimit: number;
  gameTime: number;
  speed: number;
  background: BackGround;
  debug: boolean;
  particles: Particle[];
  explosions: Explosion[];
  soundController: SoundController;
  levels: {
    maxPoint: number;
    levelTime: number;
    level: number;
    gameSpeed: number;
  }[];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.keys = [];
    this.enemies = [];
    this.ammo = 20;
    this.player = new Player(this);
    this.inputHandler = new InputHandler(this);
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.maxAmmor = 50;
    this.ui = new UI(this);
    this.enemyTimer = 0;
    this.enemyInterval = 5000;
    this.gameOver = false;
    this.score = 0;
    this.maxScore = 50;
    this.timeLimit = 50000;
    this.gameTime = 0;
    this.timeCount = 0;
    this.speed = 1;
    this.background = new BackGround(this);
    this.debug = false;
    this.particles = [];
    this.explosions = [];
    this.soundController = new SoundController(this);
    this.levels = [
      {
        maxPoint: 50,
        levelTime: 6000,
        level: 1,
        gameSpeed: 1,
      },
      {
        maxPoint: 100,
        levelTime: 6000,
        level: 2,
        gameSpeed: 1,
      },
      {
        maxPoint: 300,
        levelTime: 6000,
        level: 3,
        gameSpeed: 1,
      },
    ];
  }
  update(deltaTime: number): void {
    this.background.update();
    this.player.move(deltaTime);
    this.handleGameTime(deltaTime);
    this.handleAmmo(deltaTime);
    this.background.layer4.update();
    this.handleEnemy(deltaTime);
    this.handleParticle();
    this.handleGameOver();
    this.handleExplosion(deltaTime);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.particles.forEach((particle) => particle.draw(ctx));
    this.explosions.forEach((explosion) => explosion.draw(ctx));
    this.ui.draw(ctx);
    this.background.layer4.draw(ctx);
  }

  private addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.3) this.enemies.push(new Anglier1(this));
    if (randomize < 0.8) this.enemies.push(new Anglier2(this));
    if (randomize < 0.6) this.enemies.push(new HivesWhale(this));
    else this.enemies.push(new LuckyFish(this));
  }
  private isCollide(rect1: any, rect2: any) {
    return (
      rect2.x < rect1.x + rect1.width &&
      rect2.x + rect2.width > rect1.x &&
      rect2.y < rect1.y + rect1.height &&
      rect2.y + rect2.height > rect1.y
    );
  }
  private handleGameTime(deltaTime: number) {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
  }
  private handleAmmo(deltaTime: number) {
    if (this.ammoTimer > this.ammoInterval && !this.gameOver) {
      if (this.ammo < this.maxAmmor) this.ammo += 2;
      this.ammoTimer = 0;
    } else this.ammoTimer += deltaTime;
  }
  private handleEnemy(deltaTime: number) {
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;
    this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);
    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.isCollide(this.player, enemy)) {
        this.soundController.hitSound();
        enemy.markForDeletion = true;
        this.addExplosion(enemy);
        this.addparticle(enemy, enemy.point);
        if (enemy.type == "lucky") {
          this.player.enterpowerUp();
        } else {
          this.score--;
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.isCollide(projectile, enemy)) {
          this.soundController.punchSound();
          this.addparticle(enemy, 1);
          projectile.markDelete = true;
          enemy.lives--;
          if (enemy.lives < 0) {
            this.soundController.explosionSound();
            projectile.markDelete = true;
            enemy.markForDeletion = true;
            this.score += enemy.point;
            this.addExplosion(enemy);
            this.addparticle(enemy, enemy.point);
          }
        }
      });
    });
  }
  handleParticle() {
    this.particles.forEach((particle) => {
      particle.update();
    });
    this.particles = this.particles.filter(
      (particle) => !particle.markForDeletion
    );
  }
  handleGameOver() {
    if (this.gameOver) {
      this.enemies = [];
      this.player.projectiles = [];
    }
  }
  handleExplosion(deltaTime: number) {
    this.explosions.forEach((explosion) => {
      explosion.update(deltaTime);
    });
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markForDeletion
    );
  }

  addExplosion(enemy: Enemy) {
    const randomize = Math.random();
    if (randomize < 0.5)
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    else
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
  }

  addparticle(enemy: Enemy, numOfParticles: number) {
    for (let index = 0; index < numOfParticles; index++) {
      this.particles.push(
        new Particle(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }
}
