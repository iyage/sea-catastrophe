import { Game } from "./Game";

export class InputHandler {
  constructor(private game: Game) {
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" && this.game.keys.indexOf(e.key) < 0) ||
        (e.key === "ArrowDown" && this.game.keys.indexOf(e.key) < 0)
      ) {
        if (!this.game.gameOver) this.game.keys.push(e.key);
      }
      if (e.key === " ") {
        if (!this.game.gameOver) this.game.player.shoot();
      }
      if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener("keyup", (e) => {
      this.game.keys = this.game.keys.filter((key: any) => {
        return key !== e.key;
      });
    });
  }
}
