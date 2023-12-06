import { Pacman } from "./pacman.js";

export class Oyun {
  constructor() {
    this.pacman = new Pacman(this);
    this.oyunDevam = false;
    this.skor = 0;
  }
  guncelle(deltaTime) {
    this.pacman.guncelle(deltaTime);
  }
  ciz() {
    this.pacman.ciz();
  }
}