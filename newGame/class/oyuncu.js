import { Duruyor, Zipliyor, Dusuyor, Kosuyor,/*Sersemledi,*/Oturuyor, Yuvarlaniyor, Atiliyor } from './durumlar.js'

export class Oyuncu{
  constructor(oyun) {
    this.oyun = oyun;
    this.width = 100;
    this.height = 91.3;
    this.animasyon = 0;
    this.maximumKare = 4;
    this.x = 0;
    this.y = this.oyun.height - this.height -  - this.oyun.zeminYuksekligi;
    this.yon = 'sag';
    this.fps = 20;
    this.kareAraligi = 1000 / this.fps;
    this.kareSayaci = 0;
    this.durumlar = {
      duruyor: new Duruyor(this),
      zipliyor: new Zipliyor(this),
      dusuyor: new Dusuyor(this),
      kosuyor: new Kosuyor(this),
   /* sersemledi: new Sersemledi(this), */
      oturuyor: new Oturuyor(this),
      yuvarlaniyor: new Yuvarlaniyor(this),
      atiliyor: new Atiliyor(this)
    };
    this.mevcutDurum = this.durumlar['oturuyor']
    this.cerceveAnimasyonKaresi = 0;
    this.cerceveDurumu = 5;
    this.karakter = {
      maximumHiz: 10,
      dikeyHiz: 0,
      agirlik: 1,
      hiz: 0
    };
    this.tekSeferlik = {
      "bunlariYaz": {
        "yapildimi": false,
        "islem": arg => arg.forEach( argElement => console.log(argElement) )

      }
    };
  }

  birKereYap(islemAdi,arg){
    var obj = this.tekSeferlik[islemAdi];
    if(obj) obj.yapildimi === false ? ( obj.yapildimi = true, obj.islem(arg) ) : false;
  }

  guncelle(tuslar, deltaTime){
    const { 'ArrowLeft': sol, 'ArrowRight': sag, 'ArrowUp': ust, 'ArrowDown': alt } = tuslar;
    // YATAY HAREKET
    if(sag || sol) this.oyun.hizCarpani = 1;
    if(sag) this.karakter.hiz = this.karakter.maximumHiz;
    else if(sol) this.karakter.hiz = -this.karakter.maximumHiz;
    else if(this.cerceveDurumu != 7) this.karakter.hiz = 0;

    // this.oyun.hizCarpani = this.karakter.hiz > 0 ? 1 : 0

    this.x += this.karakter.hiz;
    if(this.x < 0) this.x = 0;
    else if(this.x > this.oyun.width - this.width) this.x = this.oyun.width - this.width;

    // DİKEY HAREKET
    if(ust && this.yerdemi()) {
      this.karakter.dikeyHiz = -25;
      this.durumAyarla('zipliyor')
    }
    this.y += this.karakter.dikeyHiz;
    if(this.yerdemi()) {
      this.karakter.dikeyHiz = 0;
      this.y = this.oyun.height - this.height - this.oyun.zeminYuksekligi;
    }
    else this.karakter.dikeyHiz += this.karakter.agirlik;

    this.mevcutDurum.guncelle(tuslar)

    // Animasyon
    if(this.kareSayaci > this.kareAraligi){
      this.kareSayaci = 0;
      this.cerceveAnimasyonKaresi < this.maximumKare ? this.cerceveAnimasyonKaresi++ : this.cerceveAnimasyonKaresi = 0;
    }else this.kareSayaci += deltaTime;
  }

  yerdemi(){ return this.y >= this.oyun.height - this.height - this.oyun.zeminYuksekligi; }

  ciz(context) {
    var resim = new Image();
    resim.src = './assets/oyuncu.png';
    context.save();
    context.drawImage(resim, this.width * this.cerceveAnimasyonKaresi, this.height * this.cerceveDurumu, this.width, this.height, this.x, this.y, this.width, this.height);
    context.restore();
  }

  durumAyarla(durum){
    this.cerceveAnimasyonKaresi = 0
    this.mevcutDurum = this.durumlar[durum]
    this.mevcutDurum.giris()
  }
}