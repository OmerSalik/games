export class BaslangicEkrani {
  constructor(oyun) {
    this.oyun = oyun;
    this.baslatButon = {
      pozisyon: {
        x: this.oyun.w / 2,
        y: this.oyun.h * .9
      },
      boyut: {
        w: this.oyun.w * .8,
        h: this.oyun.h * .05
      },
      style: {
        borderRadius: 5,
        backgrounColor: 'rgb(15,125,68)'
      },
      yazi: {
        yazi: 'Oyunu Başlat',
        style: {
          color: 'rgb(35,35,35)',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      }
    };
  }
  ciz(context) {
    context.save();
    context.beginPath();
    context.fillStyle='rgba(62,62,62,.5)';
    context.rect(0, 0, this.oyun.w, this.oyun.h);
    context.fill();
    context.closePath();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = this.baslatButon.style.backgrounColor;
    context.roundRect( this.baslatButon.pozisyon.x - this.baslatButon.boyut.w / 2, this.baslatButon.pozisyon.y - this.baslatButon.boyut.h / 2, this.baslatButon.boyut.w, this.baslatButon.boyut.h, this.baslatButon.style.borderRadius);
    context.fill();
    context.closePath();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = this.baslatButon.yazi.style.color;
    context.fillStyle = "#ffffff";
    context.font = "18px Trebuchet MS";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText( this.baslatButon.yazi.yazi, this.baslatButon.pozisyon.x, this.baslatButon.pozisyon.y );
    context.closePath();
    context.restore();
  }
}