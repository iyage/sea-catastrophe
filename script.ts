import { Game } from "./Game.js";

const CANVAS = <HTMLCanvasElement>document.getElementById("canvas")!;
const CTX: CanvasRenderingContext2D = CANVAS.getContext("2d")!;
// const SCREEN_SIZE = window.innerWidth;
let CANVAS_WIDTH = (CANVAS.width = 1300);
let CANVAS_HEIGHT = (CANVAS.height = 500);

const game: Game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
let lastTime: number = 0;
function animation(timeStamp: number): void {
  const deltaTime: number = timeStamp - lastTime;
  lastTime = timeStamp;
  CTX?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  game.draw(CTX);
  game.update(deltaTime);
  requestAnimationFrame(animation);
}
animation(16);
