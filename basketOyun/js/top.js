/*
{
  // Sol Üst
  yer: { x: 0, y: 0 },
  hiz: { x: 3.5, y: 0 },
  hizlanma: { x: 0, y: .3 },
  surtunme: { x: .05, y: .1 },
  hizSiniri:  {
    x: { min: 1, max: 1 },
    y: { min: 0, max: 9999 }
  }
}
*/

export class Top {
  constructor(oyun, boyut, hizCarpani, puan, resim, topid) {
    function topPozisyonlari() {
      let mr = f.rs(0, 3);
      const tp = [
        {
          // Sol Üst
          aciHizi: .06,
          yer: { x: 0, y: 0 },
          hiz: { x: [ 3, 5, 7 ][f.rs(0,2)], y: 1 },
          hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
          surtunme: { x: [ .06, .08, .11 ][f.rs(0, 1)], y: .1 },
          hizSiniri:  {
           x: { min: 1, max: 1 },
           y: { min: 0, max: 999 }
         }
        },
        {
          // Sağ Üst
          aciHizi: -.06,
          yer: { x: oyun.w, y: 0 },
          hiz: { x: [ -3, -5, -7 ][f.rs(0, 2)], y: 1 },
          hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
          surtunme: { x: [ -.06, -.08, -.11 ][f.rs(0, 1)], y: .1 },
          hizSiniri:  {
           x: { min: -7, max: -1 },
           y: { min: 0, max: 999 }
          }
        },
        [
          {
            // Orta (Düz aşağı)
            aciHizi: -.06,
            yer: { x: oyun.w / 2, y: -boyut-5 },
            hiz: { x: 0, y: 5 },
            hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
            surtunme: { x: 0, y: .1 },
            hizSiniri:  {
              x: { min: 0, max: 0 },
              y: { min: 0, max: 999 }
            }
          },
          {
            // Orta (Sağa veya Sola Doğru)
            aciHizi: -.06,
            yer: { x: oyun.w / 2, y: -boyut-5 },
            hiz: { x: [ -6, -4, 4, -6 ][mr], y: 5 },
            hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
            surtunme: { x: [ -.08, -.06, .06, .08 ][mr], y: .1 },
            hizSiniri:  {
              x: { min: -1, max: 1 },
              y: { min: 0, max: 999 }
            }
          }
        ][f.rs(0,1)],
        {
          // Sol
          aciHizi: .06,
          yer: { x: -boyut/2, y: oyun.h*.2 },
          hiz: { x: [ 5, 7, 9 ][f.rs(0,2)], y: 1 },
          hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
          surtunme: { x: [ .06, .08, .11 ][f.rs(0, 1)], y: .1 },
          hizSiniri:  {
           x: { min: 1, max: 1 },
           y: { min: 0, max: 999 }
         }
        },
        {
          // Sağ Üst
          aciHizi: -.06,
          yer: { x: oyun.w + boyut/2, y: oyun.h*.2 },
          hiz: { x: [ -5, -7, -9 ][f.rs(0, 2)], y: 1 },
          hizlanma: { x: 0, y: [ .2, .3, .4, .5 ][f.rs(0, 3)] },
          surtunme: { x: [ -.06, -.08, -.11 ][f.rs(0, 1)], y: .1 },
          hizSiniri:  {
           x: { min: -7, max: -1 },
           y: { min: 0, max: 999 }
          }
        }
      ];
      let index = f.rs(0, tp.length - 1);
      return tp[index];
    }
    this.oyun = oyun;
    this.puan = puan;
    this.boyut = boyut;
    this.hizCarpani = hizCarpani;
    this.resim = resim;
    this.kareSayaci = 0;
    this.fps = 120;
    const p = topPozisyonlari();
    this.x = p.yer.x;
    this.y = p.yer.y;
    this.hiz = p.hiz;
    this.hizlanma = p.hizlanma;
    this.surtunme = p.surtunme;
    this.hizSiniri = p.hizSiniri;
    this.aciHizi = p.aciHizi;
    this.kareAraligi = 1000 / this.fps;
    this.aci = 0;
    this.a = false;
    this.topid = topid;
  }
  #ilerle() {
    if(this.hiz.x - this.surtunme.x < this.hizSiniri.x.min) this.hiz.x = this.hizSiniri.x.min;
    else this.hiz.x -= this.surtunme.x;

    if(this.hiz.y < this.hizSiniri.y.max && this.hiz.y + this.hizlanma.y > this.hizSiniri.y.max) this.hiz.y = this.hizSiniri.y.max;
    else if(this.hiz.y < this.hizSiniri.y.max) this.hiz.y += this.hizlanma.y;
    else if(this.hiz.y > this.hizSiniri.y.max) this.hiz.y -= this.surtunme.y;
    else if(this.hiz.y < this.hizSiniri.y.min) this.hiz.y = this.hizSiniri.y.min;

    this.x += birimx(this.hiz.x) * this.hizCarpani;
    this.y += birimy(this.hiz.y) * this.hizCarpani;
    this.aci += this.aciHizi * this.hizCarpani;
  }
  guncelle(deltaZaman, indexim) {
    this.kareSayaci >= this.kareAraligi ? ( this.#ilerle(), this.kareSayaci = 0, this.x >= this.oyun.w || this.y >= this.oyun.h ? this.oyun.topSil(indexim) : false ) : this.kareSayaci += deltaZaman;
  }
  ciz(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.aci);
    context.drawImage(this.resim, 0, 0, 512, 512, -this.boyut / 2, -this.boyut / 2, this.boyut, this.boyut);
    context.restore();
  }
}