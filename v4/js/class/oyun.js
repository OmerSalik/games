import { Pacman } from "./pacman.js";
import { Dusman } from "./dusman.js";

export class Oyun {
  constructor() {
    this.pacman = new Pacman(this);
    this.dusmanlar = [
      new Dusman(this, 0),
      new Dusman(this, 1),
      new Dusman(this, 2),
      new Dusman(this, 3)
    ];
    this.oyunDevam = false;
    this.skor = 0;
    this.cizimIcin = false;
  }
  guncelle(deltaTime) {
    if(this.oyunDevam || this.cizimIcin) {
      if(this.oyunDevam) this.dusmanlar.forEach(dusman => dusman.guncelle(deltaTime));
      this.pacman.guncelle(deltaTime);
    }
  }
  ciz() {
    this.dusmanlar.forEach(dusman => dusman.ciz());
    this.pacman.ciz();
  }
  oyunBitti() {
    if(this.oyunDevam) {
      this.pacman.hizX = 0;
      this.pacman.hizY = 0;
      this.pacman.kareBas = 0;
      this.pacman.kareSon = 13;
      this.pacman.kareX = 7;
      this.pacman.kareY = 0;
      this.pacman.fps = 10;
      this.pacman.zamanAraligi = 1000 / this.pacman.fps;
      this.pacman.sayac = this.pacman.zamanAraligi + 19;
      this.oyunDevam = false;
      setTimeout(()=>{
        this.cizimIcin = false;
        alert('Oyun bitti kaybettin.');
      }, (1000 / this.pacman.fps) * 13);
    }
  }
}