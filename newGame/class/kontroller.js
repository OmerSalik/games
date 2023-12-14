export class Kontroller {
  constructor(oyun) {
    this.oyun = oyun;
    this.tuslar = {};
    this.kabulEdilenTuslar = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift']
    document.onkeydown = e => {
      if(this.oyun.oyunDevam) {
        if(this.kabulEdilenTuslar.includes(e.key)) this.tuslar[e.key] = true;
        if(e.key == 'd') {
          this.oyun.debugMode = !this.oyun.debugMode;
        }
      }else {
        this.tuslar = {};
      }
    }
    document.onkeyup = e => {
      if(this.oyun.oyunDevam && this.kabulEdilenTuslar.includes(e.key)) this.tuslar[e.key] = false;
    }
  }
}