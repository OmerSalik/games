export class Kontroller {
  constructor() {
    this.tuslar = {};
    this.kabulEdilenTuslar = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Shift']
    document.onkeydown = e => { if(this.kabulEdilenTuslar.includes(e.key)) this.tuslar[e.key] = true; }
    document.onkeyup = e => { if(this.kabulEdilenTuslar.includes(e.key)) this.tuslar[e.key] = false; }
  }
}