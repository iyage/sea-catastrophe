import { Game } from "./Game.js";

export class SoundController {
  game: Game;
  private powerUp: any;
  private powerDown: any;
  private explosion: any;
  private hit: any;
  private shot: any;
  private shield: any;
  punch: any;
  constructor(game: Game) {
    this.game = game;
    this.powerUp = document.getElementById("power-up");
    this.powerDown = document.getElementById("power-down");
    this.explosion = document.getElementById("explosion");
    this.hit = document.getElementById("hit");
    this.shot = document.getElementById("shot");
    this.shield = document.getElementById("shield");
    this.punch = document.getElementById("punch");
  }

  async powerUpSound() {
    this.powerUp.currentTime = 0;
    await this.powerUp?.play();
  }
  async punchSound() {
    this.punch.currentTime = 0;
    await this.punch?.play();
  }
  async shotSound() {
    this.shot.currentTime = 0;
    await this.shot?.play();
  }
  async explosionSound() {
    this.explosion.currentTime = 0;
    await this.explosion?.play();
  }
  async powerDownSound() {
    this.powerDown.currentTime = 0;
    await this.powerDown?.play();
  }
  async hitSound() {
    this.hit.currentTime = 0;
    await this.hit?.play();
  }
}
