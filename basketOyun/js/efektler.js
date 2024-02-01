export class SkorArtti {
  constructor(oyun, skor, x, y) {
    this.fontSize = 24;
    this.boyut = birimx(this.fontSize * 4);
    this.oyun = oyun;
    this.skor = skor;
    this.fps = 80;
    this.sure = .75;
    this.kareAraligi = 1000 / this.fps;
    this.kareSayaci = this.kareAraligi + 1;
    this.x = x;
    this.yukselmeHizi = 1;
    this.opaklik = 1;
    this.y = y;
  };
  guncelle(deltaZaman, indexim) {
    this.kareSayaci >= this.kareAraligi ? (
      this.y -= this.yukselmeHizi,
      this.opaklik -= 1 / (this.fps * this.sure),
      this.opaklik <= 0 ? this.oyun.efektSil(indexim) : false,
      this.kareSayaci = 0
    ) : this.kareSayaci += deltaZaman;
  }
  ciz(context) {
    context.save();
    context.beginPath();
    context.fillStyle = this.skor <= 9 ? `rgba(0,0,0,${this.opaklik})` : `rgba(255,200,50,${this.opaklik})`;
    context.font = this.fontSize + "px Trebuchet MS";
    context.fontWeight = "bold";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(` + ${this.skor}`, this.x, this.y );
    context.closePath();
    context.restore();
  }
}