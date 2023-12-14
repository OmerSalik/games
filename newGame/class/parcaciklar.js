class Parcacik {
  constructor(oyun) {
    this.oyun = oyun;
    this.aci = 0;
    this.aciArtisi = Math.random() * 0.1 + 0.1;
    this.fps = 60;
    this.kareSayaci = 0;
    this.kareAraligi = 100 / this.fps;
  }
  guncelle(deltaTime) {
    if(this.kareSayaci > this.kareAraligi){
      this.kareSayaci = 0;
      this.aci += Math.sin(this.aciArtisi);
      this.boyut *= 0.85
      this.x -= this.xHizi;
      this.y -= this.yHizi;
    }else this.kareSayaci += deltaTime;
  }
  ciz(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.aci);
    context.drawImage(this.resim, -this.boyut/4, -this.boyut/8, this.boyut, this.boyut);
    context.restore();
  }
}

export class AtesTopu extends Parcacik {
  constructor(oyun, x, y) {
    super(oyun);
    this.x = x;
    this.y = y;
    this.xHizi = Math.random();
    this.yHizi = Math.random();
    this.oyun = oyun;
    // this.boyut = Math.random() * 50 + 50;
    this.boyut = Math.random() * 100 + 100;
    this.resim = new Image();
    this.resim.src = '../assets/parcaciklar//fireBall2.png';
  }
  guncelle(deltaTime) { super.guncelle(deltaTime); }
  ciz(context) { super.ciz(context); }
}

export class buharPuff {
  constructor(oyun, x, y) {
    this.x = x;
    this.y = y;
    this.fps = 40;
    this.kareX = 0;
    this.kareY = 0;
    this.maximumKare = 2;
    this.kareSayaci = 0;
    this.kareAraligi = 1000 / this.fps;
    this.xHizi = 0;
    this.yHizi = 0;
    this.oyun = oyun;
    // oran => 1 - 1.5
    this.width = 640;
    this.height = 380;
    this.boyut = 100;
    this.resim = new Image();
    this.resim.src = '../assets/spritelar/buharPuff.png';
  }
  guncelle(deltaTime) {
    if(this.kareSayaci >= this.kareAraligi){
      this.kareSayaci = 0;
      this.kareX++;
      if(this.kareX>2){
        this.kareX = 0;
        this.kareY++;
      }
    }else this.kareSayaci += deltaTime;
  }
  ciz(context) {
    context.drawImage(this.resim,
      this.width * this.kareX,
      this.height * this.kareY,
      this.width,
      this.height + this.kareY * this.kareY,
      this.x - this.boyut*1.5/2,
      this.y - this.boyut/2,
      this.boyut * 1.5,
      this.boyut
    )
  }
}