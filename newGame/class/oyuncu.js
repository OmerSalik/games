import { Duruyor, Zipliyor, Dusuyor, Kosuyor, Sersemledi, Oturuyor, Yuvarlaniyor } from './durumlar.js'

export class Oyuncu{
  constructor(oyun) {
    this.oyun = oyun;
    this.width = 100;
    this.height = 91.3;
    this.animasyon = 0;
    this.maximumKare = 4;
    this.maximumEnerji = 25;
    this.x = 0;
    this.y = this.oyun.height - this.height -  - this.oyun.zeminYuksekligi;
    this.yon = 'sag';
    this.fps = 20;
    this.kareAraligi = 1000 / this.fps;
    this.kareSayaci = 0;
    this.durumlar = {
      duruyor: new Duruyor(this.oyun),
      zipliyor: new Zipliyor(this.oyun),
      dusuyor: new Dusuyor(this.oyun),
      kosuyor: new Kosuyor(this.oyun),
      sersemledi: new Sersemledi(this.oyun),
      oturuyor: new Oturuyor(this.oyun),
      yuvarlaniyor: new Yuvarlaniyor(this.oyun)
    };
    this.mevcutDurum = this.durumlar['oturuyor']
    this.mevcutDurumAdi = 'oturuyor'
    this.cerceveAnimasyonKaresi = 0;
    this.cerceveDurumu = 5;
    this.karakter = {
      maximumHiz: 5,
      dikeyHiz: 0,
      agirlik: 1,
      hiz: 0
    };
  }

  guncelle(tuslar, deltaTime){
    const { 'ArrowLeft': sol, 'ArrowRight': sag, 'ArrowUp': ust, 'ArrowDown': alt } = tuslar;
    // YATAY HAREKET
    if(this.mevcutDurumAdi != 'sersemledi'){
      if(sag || sol) this.oyun.hizCarpani = 1;
      if(sag) this.karakter.hiz = this.karakter.maximumHiz;
      else if(sol) this.karakter.hiz = -this.karakter.maximumHiz;
      else if(this.mevcutDurumAdi != 'yuvarlaniyor') this.karakter.hiz = 0;
      this.x += this.karakter.hiz;
      if(this.x < 0) this.x = 0;
      else if(this.x > this.oyun.width - this.width) this.x = this.oyun.width - this.width;
    }
    this.y += this.karakter.dikeyHiz;
    if(this.yerdemi()) {
      this.karakter.dikeyHiz = 0;
      this.y = this.oyun.height - this.height - this.oyun.zeminYuksekligi;
    }
    else this.karakter.dikeyHiz += this.karakter.agirlik;
    if(this.oyun.oyunDevam) this.mevcutDurum.guncelle(tuslar)
    else (this.cerceveDurumu=4,this.maximumKare=0);
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
    context.drawImage(resim, this.width * this.cerceveAnimasyonKaresi, this.height * this.cerceveDurumu, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  durumAyarla(durum, ekstraVeri = false){
    this.cerceveAnimasyonKaresi = 0;
    this.mevcutDurum = this.durumlar[durum];
    this.mevcutDurumAdi = durum;
    this.mevcutDurum.giris(ekstraVeri);
  }
}