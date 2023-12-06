import { AtesTopu } from "./parcaciklar.js";

const durumlar = {
  duruyor: [0,6],
  zipliyor: [1,6],
  dusuyor: [2,6],
  kosuyor: [3,8],
  sersemledi: [4,10],
  oturuyor: [5,4],
  yuvarlaniyor: [6,6]
};

export class Duruyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.oyun.oyuncu.cerceveDurumu = durumlar.duruyor[0]
    this.maximumKare = durumlar.duruyor[1]
  }
  guncelle(tuslar) {
    const { 'ArrowRight': sag, 'ArrowLeft': sol, 'ArrowUp': ust, 'Shift': yuvarlan } = tuslar;
    if(sag || sol) {
      this.oyun.oyuncu.durumAyarla('kosuyor');
      return;
    }else if(yuvarlan) {
      this.oyun.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }
    if(ust && this.oyun.oyuncu.yerdemi()) {
      this.oyun.oyuncu.karakter.dikeyHiz = -25;
      this.oyun.oyuncu.durumAyarla('zipliyor')
    }
  }
}

export class Kosuyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.enerjiArttir = setInterval(()=>{
      if(this.oyun.istatislikler.enerji < this.oyun.oyuncu.maximumEnerji) {
        this.oyun.istatislikler.enerji++;
      }
    }, 900)
    this.oyun.oyuncu.cerceveDurumu = durumlar.kosuyor[0];
    this.maximumKare = durumlar.kosuyor[1];
}
  guncelle(tuslar) {
    const { 'ArrowDown': alt, 'ArrowUp': ust, 'Shift': yuvarlan } = tuslar;
    if(yuvarlan) {
      clearInterval(this.enerjiArttir);
      this.oyun.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }else if(alt) {
      clearInterval(this.enerjiArttir);
      this.oyun.oyuncu.durumAyarla('oturuyor');
      return;
    }
    if(ust && this.oyun.oyuncu.yerdemi()) {
      clearInterval(this.enerjiArttir);
      this.oyun.oyuncu.karakter.dikeyHiz = -25;
      this.oyun.oyuncu.durumAyarla('zipliyor')
    }
  }
}

export class Zipliyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.oyun.oyuncu.cerceveDurumu = durumlar.zipliyor[0];
    this.maximumKare = durumlar.zipliyor[1];
    this.agirliklar = {
      normal: 1,
      agir: 3
    };
  }
  guncelle(tuslar) {
    const { 'Shift': yuvarlan, 'ArrowDown': alt } = tuslar;
    this.oyun.oyuncu.karakter.agirlik = alt ? this.agirliklar.agir : this.agirliklar.normal;
    if(yuvarlan) {
      this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
      this.oyun.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }
    if(this.oyun.oyuncu.karakter.dikeyHiz >= this.oyun.oyuncu.karakter.agirlik) {
      this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
      this.oyun.oyuncu.durumAyarla('dusuyor');
      return;
    }
  }
}

export class Dusuyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.oyun.oyuncu.cerceveDurumu = durumlar.dusuyor[0];
    this.maximumKare = durumlar.dusuyor[1];
    this.agirliklar = {
      normal: 1,
      agir: 3
    };
}
  guncelle(tuslar) {
    const { 'ArrowDown': alt } = tuslar;
    if(this.oyun.oyuncu.yerdemi()){
      const sart = this.oyun.oyuncu.oyun.hizCarpani == 1;
      this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
      this.oyun.oyuncu.durumAyarla(sart?'kosuyor':'oturuyor');
      return;
    }else if(alt) this.oyun.oyuncu.karakter.agirlik = this.agirliklar.agir;
    else this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
  }
}

export class Oturuyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.oyun.oyuncu.cerceveDurumu = durumlar.oturuyor[0];
    this.maximumKare = durumlar.oturuyor[1];
    this.oyun.oyuncu.oyun.hizCarpani = 0;
    this.enerjiArttir = setInterval(()=>{
      if(this.oyun.istatislikler.enerji < this.oyun.oyuncu.maximumEnerji) {
        this.oyun.istatislikler.enerji++;
      }
    }, 500)
  }
  guncelle(tuslar) {
    const { 'ArrowRight': sag, 'ArrowLeft': sol, 'ArrowUp': ust, 'Shift': yuvarlan } = tuslar;
    if(sag || sol) {
      clearInterval(this.enerjiArttir);
      this.enerjiArttir = '';
      this.oyun.oyuncu.durumAyarla('kosuyor');
      return;
    }else if(yuvarlan) {
      clearInterval(this.enerjiArttir);
      this.enerjiArttir = '';
      this.oyun.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }
    if(ust && this.oyun.oyuncu.yerdemi()) {
      clearInterval(this.enerjiArttir);
      this.enerjiArttir = '';
      this.oyun.oyuncu.karakter.dikeyHiz = -25;
      this.oyun.oyuncu.durumAyarla('zipliyor')
    }
  }
}

export class Yuvarlaniyor {
  constructor(oyun) { this.oyun = oyun }
  giris() {
    this.oyun.oyuncu.cerceveDurumu = durumlar.yuvarlaniyor[0];
    this.maximumKare = durumlar.yuvarlaniyor[1];
    this.oyun.oyuncu.karakter.maximumHiz = 10;
    this.oyun.hizCarpani = 1;
    if(this.oyun.istatislikler.enerji == 0) {
      clearInterval(this.enerjiAzal);
      this.enerjiAzal = '';
      this.oyun.oyuncu.durumAyarla('sersemledi',false);
      return;
    }else this.oyun.istatislikler.enerji--; 
    this.enerjiAzal = setInterval(()=>{
      if(this.oyun.istatislikler.enerji > 0) {
        this.oyun.istatislikler.enerji--;
      } else {
        clearInterval(this.enerjiAzal);
        this.enerjiAzal = '';
        this.oyun.oyuncu.durumAyarla('sersemledi',false);
        return;
      }
    }, 250)
    if(this.oyun.oyuncu.karakter.hiz == 0) this.oyun.oyuncu.karakter.hiz = this.oyun.oyuncu.karakter.maximumHiz;
    this.agirliklar = {
      normal: 1,
      agir: 4
    }
  }
  guncelle(tuslar) {
    this.oyun.parcaciklar.unshift(new AtesTopu(this.oyun, this.oyun.oyuncu.x, this.oyun.oyuncu.y))
    const { 'ArrowDown': alt,'ArrowUp': ust, 'Shift': yuvarlan } = tuslar
    if(!this.oyun.oyuncu.yerdemi() && alt) this.oyun.oyuncu.karakter.agirlik = this.agirliklar.agir;
    else this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
    if(!yuvarlan) {
      this.oyun.oyuncu.karakter.maximumHiz = 5;
      this.oyun.oyuncu.karakter.agirlik = this.agirliklar.normal;
      const sart = this.oyun.oyuncu.oyun.hizCarpani == 1;
      if(this.oyun.oyuncu.yerdemi()) {
        clearInterval(this.enerjiAzal);
        this.enerjiAzal = '';
        this.oyun.oyuncu.karakter.maximumHiz = 5;
        this.oyun.oyuncu.durumAyarla(sart?'kosuyor':'oturuyor');
        return;
      } else {
        clearInterval(this.enerjiAzal);
        this.enerjiAzal = '';
        this.oyun.oyuncu.karakter.maximumHiz = 5;
        this.oyun.oyuncu.durumAyarla('zipliyor');
        return;
      }
      return;
    }
    if(ust && this.oyun.oyuncu.yerdemi()) this.oyun.oyuncu.karakter.dikeyHiz = -25;
  }
}

export class Sersemledi {
  constructor(oyun) {
    this.oyun = oyun;
  }
  giris(geriyeGit) {
    this.geriyeGit = geriyeGit ? -1 : 0;
    this.oyun.oyuncu.cerceveDurumu = durumlar.sersemledi[0];
    this.maximumKare = durumlar.sersemledi[1];
    this.oyun.hizCarpani = this.geriyeGit;
    this.oyun.oyuncu.karakter.hiz = this.oyun.oyuncu.karakter.maximumHiz * this.geriyeGit;
    setTimeout(()=>{
      this.oyun.oyuncu.durumAyarla('oturuyor');
      return;
    },(1000 / this.oyun.oyuncu.fps) * durumlar.sersemledi[1]);
  }
  guncelle() {
    this.oyun.hizCarpani = this.geriyeGit;
    this.oyun.oyuncu.karakter.hiz = this.oyun.oyuncu.karakter.maximumHiz * this.geriyeGit;
  }
}