export class Istatislikler {
  constructor(oyun) {
    this.oyun = oyun;
    this.yaziBuyuklugu = 25;
    this.skor = 0;
    this.can = 5;
    this.enerji = this.oyun.oyuncu.maximumEnerji;
  }

  yaz(context) {
    context.save();
    context.beginPath();
    context.fillStyle='transparent';
    context.font = this.yaziBuyuklugu+"px Arial";
    context.strokeText("Skor : " + this.skor, 10, this.yaziBuyuklugu * 1);
    context.strokeText("Can  : " + this.#x(), 10, this.yaziBuyuklugu * 2);
    context.strokeText("Enerji  : " + this.enerji, 10, this.yaziBuyuklugu * 3);
    context.restore();
  }

  #x() {
    var metin = '';
    if(this.can==0) {
      this.oyun.oyunBitti();
      return 'OYUN BİTTİ';
    }
    for (let i = 0; i < this.can; i++) metin += "♡";
    return metin;
  }
}