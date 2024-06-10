import { Game } from "./Game.js";
import { Layer } from "./Layer.js";

export class BackGround {
  game: Game;
  layer1: Layer;
  layers: Layer[];
  layer2: Layer;
  layer3: Layer;
  image1: HTMLElement | null;
  image2: HTMLElement | null;
  image3: HTMLElement | null;
  image4: HTMLElement | null;
  layer4: Layer;
  constructor(game: Game) {
    this.game = game;
    this.image1 = document.getElementById("layer1");
    this.image2 = document.getElementById("layer2");
    this.image3 = document.getElementById("layer3");
    this.image4 = document.getElementById("layer4");
    this.layer4 = new Layer(this.game, this.image4, 0.4);
    this.layer1 = new Layer(this.game, this.image1, 0.4);
    this.layer2 = new Layer(this.game, this.image2, 0.7);
    this.layer3 = new Layer(this.game, this.image3, 1.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }
  update() {
    this.layers.forEach((layer) => {
      layer.update();
    });
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
}
