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
  constructor(oyun) { this.oyun = oyun; }
  giris() {
    this.oyun.pacman.kareBas = 0;
    this.oyun.pacman.kareSon = 2;
    this.oyun.pacman.kareX = 17;
    this.oyun.pacman.kareY = 0;
    this.oyun.pacman.hizY = 0;
    this.oyun.pacman.hizX = 0.1;
  }
}

export class SOLA {
  constructor(oyun) { this.oyun = oyun; }
  giris() {
    this.oyun.pacman.kareBas = 6;
    this.oyun.pacman.kareSon = 8;
    this.oyun.pacman.kareX = 17;
    this.oyun.pacman.kareY = 6;
    this.oyun.pacman.hizY = 0;
    this.oyun.pacman.hizX = -0.1;
  }
}

export class YUKARI {
  constructor(oyun) { this.oyun = oyun; }
  giris() {
    this.oyun.pacman.kareBas = 9;
    this.oyun.pacman.kareSon = 11;
    this.oyun.pacman.kareX = 17;
    this.oyun.pacman.kareY = 9;
    this.oyun.pacman.hizY = -0.1;
    this.oyun.pacman.hizX = 0;
  }
}

export class ASAGI {
  constructor(oyun) { this.oyun = oyun; }
  giris() {
    this.oyun.pacman.kareBas = 3;
    this.oyun.pacman.kareSon = 5;
    this.oyun.pacman.kareX = 17;
    this.oyun.pacman.kareY = 3;
    this.oyun.pacman.hizY = 0.1;
    this.oyun.pacman.hizX = 0;
  }
}