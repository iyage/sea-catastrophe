import { Explosion } from "./Explosion.js";
import { Game } from "./Game.js";

export class SmokeExplosion extends Explosion {
  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.image = document.getElementById("smokeExplosion");
  }
}
