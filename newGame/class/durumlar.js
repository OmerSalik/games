const durumlar = {
  duruyor: [0,6],
  zipliyor: [1,6],
  dusuyor: [2,6],
  kosuyor: [3,8],
  sersemledi: [4,10],
  oturuyor: [5,4],
  yuvarlaniyor: [6,6],
  atiliyor: [7,6],
};

export class Duruyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
    this.oyuncu.cerceveDurumu = durumlar.duruyor[0]
    this.maximumKare = durumlar.duruyor[1]
  }
  guncelle(tuslar) {
    const { 'ArrowRight': sag, 'ArrowLeft': sol, 'ArrowDown': alt } = tuslar;
    if(sag || sol) {
      this.oyuncu.durumAyarla('kosuyor');
      return;
    }
  }
}

export class Kosuyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
  this.oyuncu.cerceveDurumu = durumlar.kosuyor[0];
  this.maximumKare = durumlar.kosuyor[1];
}
  guncelle(tuslar) {
    const { 'ArrowDown': alt, 'Shift': atil } = tuslar;
    if(atil) {
      this.oyuncu.durumAyarla('atiliyor');
      return;
    }else if(alt) {
      this.oyuncu.durumAyarla('oturuyor');
      return;
    }
  }
}

export class Zipliyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
  this.oyuncu.cerceveDurumu = durumlar.zipliyor[0];
  this.maximumKare = durumlar.zipliyor[1];
}
  guncelle(tuslar) {
    if(tuslar.ArrowDown) {
      this.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }
    if(this.oyuncu.karakter.dikeyHiz >= this.oyuncu.karakter.agirlik) {
      this.oyuncu.durumAyarla('dusuyor');
      return;
    }
  }
}

export class Dusuyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
    this.oyuncu.cerceveDurumu = durumlar.dusuyor[0]
    this.maximumKare = durumlar.dusuyor[1]
}
  guncelle(tuslar) {
    if(tuslar.ArrowDown) {
      this.oyuncu.durumAyarla('yuvarlaniyor');
      return;
    }
    if(this.oyuncu.yerdemi()){
      const sart = this.oyuncu.oyun.hizCarpani == 1;
      this.oyuncu.durumAyarla(sart?'kosuyor':'oturuyor');
      return;
    }
  }
}

export class Oturuyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
  this.oyuncu.cerceveDurumu = durumlar.oturuyor[0];
  this.maximumKare = durumlar.oturuyor[1];
  this.oyuncu.oyun.hizCarpani = 0;
}
  guncelle(tuslar) {
    const { 'ArrowRight': sag, 'ArrowLeft': sol, 'ArrowDown': alt, 'Shift': atil } = tuslar;
    if(sag || sol) {
      this.oyuncu.durumAyarla('kosuyor');
      return;
    }else if(atil) {
      this.oyuncu.durumAyarla('atiliyor');
      return;
    }
  }
}

export class Yuvarlaniyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
    this.oyuncu.cerceveDurumu = durumlar.yuvarlaniyor[0];
    this.maximumKare = durumlar.yuvarlaniyor[1];
    this.oyuncu.karakter.dikeyHiz <= this.oyuncu.karakter.agirlik ? this.oyuncu.karakter.dikeyHiz = 10 : this.oyuncu.karakter.dikeyHiz += 5;
    this.oyuncu.karakter.agirlik *= 3;
  }
  guncelle() {
    if(this.oyuncu.yerdemi()){
      this.oyuncu.karakter.agirlik /= 3;
      const sart = this.oyuncu.oyun.hizCarpani == 1;
      this.oyuncu.durumAyarla(sart?'kosuyor':'oturuyor');
      return;
    }
  }
}

export class Atiliyor {
  constructor(oyuncu) { this.oyuncu = oyuncu }
  giris() {
    this.oyuncu.cerceveDurumu = durumlar.atiliyor[0];
    this.maximumKare = durumlar.atiliyor[1];
    this.oyuncu.karakter.maximumHiz *= 2;
    this.oyuncu.karakter.hiz = this.oyuncu.karakter.maximumHiz;
    setTimeout(()=>{
      this.oyuncu.karakter.maximumHiz /= 2;
      const sart = this.oyuncu.oyun.hizCarpani == 1;
      this.oyuncu.durumAyarla(sart?'kosuyor':'oturuyor');
      return;
    },(1000 / this.oyuncu.fps) * durumlar.atiliyor[1]);
  }
  guncelle(tuslar) {
  }
}