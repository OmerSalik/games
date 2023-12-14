import { Functions } from "./utils.js";

class Dusman {
  constructor() {
    this.fps = 20;
    this.kareX = 0;
    this.kareY = 0;
    this.kareAraligi = 1000 / this.fps;
    this.kareSayaci = 0;
    this.f = new Functions();
  }
  guncelle(deltaTime) {
    this.x -= this.yatayHiz;
    this.y += this.dikeyHiz;

    // Animasyon
    if(this.kareSayaci > this.kareAraligi){
      this.kareSayaci = 0;
      this.kareX < this.maximumKare ? this.kareX++ : this.kareX = 0;
    }else this.kareSayaci += deltaTime;

    if(this.x <= -this.width) {
      const myIndex = this.oyun.dusmanlar.indexOf(this);
      this.oyun.dusmanlar.splice(myIndex, 1);
    }
  }
  ciz(context) {
    context.drawImage(
      this.resim,
      this.kareX * this.width,
      this.kareY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
      );
  }
}

export class UcanDusman extends Dusman {
  constructor(oyun) {
    super();
    this.oyun = oyun;
    this.ad = 'UcanDusman';
    this.width = 60;
    this.height = 44;
    this.x = this.oyun.width;
    this.y = Math.random() * (this.oyun.height*0.5)
    this.yatayHiz = Math.random() * 3 + 1;
    this.aci = 0;
    this.dikeyHiz = 0;
    this.maximumKare = 5;
    this.resim = new Image();
    this.resim.src = '../assets/dusmanlar/ucanDusman.png';
  }
  guncelle = deltaTime => {
    this.aci += Math.random();
    this.dikeyHiz = Math.sin(this.aci);
    super.guncelle(deltaTime);
  }
  ciz = context => super.ciz(context);
}

export class ZemindeDusman extends Dusman {
  constructor(oyun) {
    super();
    this.oyun = oyun;
    this.ad = 'ZemindeDusman';
    this.width = 60;
    this.height = 87;
    this.x = this.oyun.width;
    this.y = this.oyun.height - this.oyun.zeminYuksekligi - this.height;
    this.yatayHiz = this.oyun.hiz * this.oyun.hizCarpani;
    this.aci = 0;
    this.dikeyHiz = 0;
    this.maximumKare = 1;
    this.resim = new Image();
    this.resim.src = '../assets/dusmanlar/zemindeDusman.png';
  }
  guncelle = deltaTime => {
    this.yatayHiz = this.oyun.hiz * this.oyun.hizCarpani;
    super.guncelle(deltaTime);
  };
  ciz = context => super.ciz(context);
}

export class TirmananDusman extends Dusman {
  constructor(oyun) {
    super();
    this.oyun = oyun;
    this.ad = 'TirmananDusman';
    this.width = 120;
    this.height = 144;
    this.x = this.oyun.width;
    this.y = Math.random() * (this.oyun.height * 0.5);
    this.yatayHiz = this.oyun.hiz * this.oyun.hizCarpani;
    this.aci = 0;
    this.dikeyHiz = Math.random() * 2 + 1;
    this.maximumKare = 5;
    this.resim = new Image();
    this.resim.src = '../assets/dusmanlar/tirmananDusman.png';
  }
  guncelle = deltaTime => {
    this.yatayHiz = this.oyun.hiz * this.oyun.hizCarpani;
    super.guncelle(deltaTime);
    if(this.y <= 0 || this.y >= this.oyun.height - this.height - this.oyun.zeminYuksekligi) this.dikeyHiz *= -1;
  }
  ciz = context => {
    context.save();
    context.strokeStyle='white';
    context.lineWidth=2;
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    context.stroke();
    context.restore();
    
    super.ciz(context)
  }
}