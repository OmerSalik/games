import { OYUN_AL } from '../index.js'
let durumlar = {
  SAGA: {
    index: 0,
    kareBas: 0,
    kareSon: 2,
    kareX: 17,
  },
  SOLA: {
    index: 1,
    kareBas: 6,
    kareSon: 8,
    kareX: 17,
  },
  YUKARI: {
    index: 2,
    kareBas: 9,
    kareSon: 11,
    kareX: 17,
  },
  ASAGI: {
    index: 3,
    kareBas: 3,
    kareSon: 5,
    kareX: 17,
  }
}

export class SAGA {
  constructor(karakter) { this.karakter = karakter; }
  giris() {
    if(OYUN_AL().oyunDevam === true) {
      let ad = this.karakter.constructor.name;
      if(ad == "Pacman") {
        this.karakter.kareBas = 0;
        this.karakter.kareSon = 2;
        this.karakter.kareY = 0;
      } else if(ad == "Dusman") {
        this.karakter.kareBas = 0;
        this.karakter.kareSon = 1;
        this.karakter.kareY = 0;
      }
      this.karakter.hizY = 0;
      this.karakter.hizX = 0.1;
    }
  }
}

export class SOLA {
  constructor(karakter) { this.karakter = karakter; }
  giris() {
    if(OYUN_AL().oyunDevam === true) {
      let ad = this.karakter.constructor.name;
      if(ad == "Pacman") {
        this.karakter.kareBas = 6;
        this.karakter.kareSon = 8;
        this.karakter.kareY = 6;
      } else if(ad == "Dusman") {
        this.karakter.kareBas = 4;
        this.karakter.kareSon = 5;
        this.karakter.kareY = 4;
      }
      this.karakter.hizY = 0;
      this.karakter.hizX = -0.1;
    }
  }
}

export class YUKARI {
  constructor(karakter) { this.karakter = karakter; }
  giris() {
    if(OYUN_AL().oyunDevam === true) {
      let ad = this.karakter.constructor.name;
      if(ad == "Pacman") {
        this.karakter.kareBas = 9;
        this.karakter.kareSon = 11;
        this.karakter.kareY = 9;
      } else if(ad == "Dusman") {
        this.karakter.kareBas = 6;
        this.karakter.kareSon = 7;
        this.karakter.kareY = 6;
      }
      this.karakter.hizY = -0.1;
      this.karakter.hizX = 0;
    }
  }
}

export class ASAGI {
  constructor(karakter) { this.karakter = karakter; }
  giris() {
    if(OYUN_AL().oyunDevam === true) {
      let ad = this.karakter.constructor.name;
      if(ad == "Pacman") {
        this.karakter.kareBas = 3;
        this.karakter.kareSon = 5;
        this.karakter.kareY = 3;
      } else if(ad == "Dusman") {
        this.karakter.kareBas = 2;
        this.karakter.kareSon = 3;
        this.karakter.kareY = 2;
      }
      this.karakter.hizY = 0.1;
      this.karakter.hizX = 0;
    }
  }
}