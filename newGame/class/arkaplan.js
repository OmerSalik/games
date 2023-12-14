class Katman {
  constructor(oyun, width, height, kaymaHizi, resim) {
    this.oyun = oyun;
    this.width = width;
    this.height = height;
    this.kaymaHizi = kaymaHizi;
    this.resim = resim;
    this.x = 0;
    this.y = 0;
  }

  guncelle() { this.x < -this.width ? this.x = 0 : this.x -= ( this.oyun.hiz * this.oyun.hizCarpani ) * this.kaymaHizi; }

  ciz(context) {
    context.drawImage(this.resim, this.x, this.y, this.width, this.height);
    context.drawImage(this.resim, this.x + this.width, this.y, this.width, this.height);
  }
}

export class Arkaplan {
  constructor(oyun) {
    this.oyun = oyun;
    this.width = 1667;
    this.height = 500;
    this.arkaplanHizlari =  [0, 0.2, 0.4, 0.6, 1];
    this.arkaplanlar =  [];
    for (let katman = 1; katman <= 5; katman++) {
      var resim = new Image();
      resim.src = '../assets/arkaplan/katman'+katman+'.png';
      this.arkaplanlar.push(new Katman(this.oyun, this.width, this.height, this.arkaplanHizlari[katman - 1], resim))
    }
  }
  guncelle() { this.arkaplanlar.forEach(katman => katman.guncelle()) }
  ciz(context) { this.arkaplanlar.forEach(katman => katman.ciz(context)) }
} 