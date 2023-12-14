import { HARITA, HARITA_AYARLA, SON_ISLEM, TEMIZLE } from "../tools.js";
import { OYUN_AL, SAYAC_BITIR, SAYAC_BASLAT } from '../index.js'

export class Dusman {
  constructor(oyun, dusmanNo) {
    this.oyun = oyun;
    this.dusmanNo = dusmanNo
    this.w = 49.2;
    this.h = 49.4;
    this.x = (14 + dusmanNo < 18 ? 14 + dusmanNo : 14 + dusmanNo - 3) * oranti;
    this.y = 14 * oranti;
    this.fps = 10;
    this.zamanAraligi = 1000 / this.fps;
    this.sayac = 0;
    this.kareBas = 0;
    this.kareSon = 1;
    this.kareY = 0;
    this.kareX = dusmanNo; 
    this.hizY = 0;
    this.hizX = -0.1;
    this.sonBlok = 'a';
    this.disariCikabilirMi = false;
    this.bicim = 0;
    this.yonler = {
      'SAGA': new SAGA(this),
      'SOLA': new SOLA(this),
      'YUKARI': new YUKARI(this),
      'ASAGI': new ASAGI(this)
    };
    this.yon = "SAGA";
    this.hizX = 0.1;
    this.hizY = 0;
    this.boyut = 2;
    this.hareketMiktari = 0;
    this.resim = f.image('assets/pacman.png');
    setTimeout(()=>{ this.disariCikabilirMi = true; }, (2 + dusmanNo * 2) * 1000);
  }
  guncelle(deltaTime) {
    if(this.sayac >= this.zamanAraligi) {
      this.sayac = 0;
      this.bicim = this.bicim == 1 ? 0 : 1;
      this.kareY = this.kareY + 1 <= this.kareSon ? this.kareY + 1 : this.kareBas;
    } else this.sayac += deltaTime;

    if((this.x / oranti)  % 1 == 0 && (this.y / oranti)  % 1 == 0) {
      let yeniYon = this.yonKararVer();
      let sayi = Math.random();
      if(yeniYon != null && sayi > 0.1) {
        this.yonDegistir(yeniYon);
      }
    }
    this.yerDegistir(
      this.x + this.hizX * 10 * oranti,
      this.y + this.hizY * 10 * oranti
    );
    if(this.x / oranti == 31) this.x = 0;
    else if(this.x / oranti == 0) this.x = 31 * oranti;
  }
  ciz() {
    this.fps = this.oyun.pacman.guclendirme ? 4 : 20;
    this.zamanAraligi = 1000 / this.fps;
    context.save();
    context.beginPath();
    context.drawImage(
      this.resim,
      this.oyun.pacman.guclendirme ? this.bicim * this.w : this.kareX * this.w,
      this.oyun.pacman.guclendirme ? (12 + this.kareY % 2) * this.h : this.kareY * this.h,
      this.w,
      this.h,
      ((this.x / oranti) * birimBuyuklugu) + (this.boyut * birimBuyuklugu) * 0.1,
      ((this.y / oranti) * birimBuyuklugu) + (this.boyut * birimBuyuklugu) * 0.1,
      this.boyut * birimBuyuklugu,
      this.boyut * birimBuyuklugu
    );
    context.closePath();
    context.restore();
  }
  yonDegistir(index) {
    this.yon = index;
    this.yonler[this.yon].giris();
  }
  yonKararVer() {
    let sorguAdlari = [
      "YUKARI",
      "ASAGI",
      "SAGA",
      "SOLA"
    ];
    let sorgular = {
      "YUKARI" : this.disariCikabilirMi && this.kontrol("YUKARI") && ( (this.yon == "ASAGI" && this.durdumu()) || this.yon != "ASAGI"),
      "ASAGI" : this.kontrol("ASAGI") && ((this.yon == "YUKARI" && this.durdumu()) || this.yon != "YUKARI"),
      "SAGA" : this.kontrol("SAGA") && ((this.yon == "SOLA" && this.durdumu()) || this.yon != "SOLA"),
      "SOLA" : this.kontrol("SOLA") &&((this.yon == "SAGA" && this.durdumu()) ||this.yon != "SAGA")
    }
    let yeniSorguAdlari = [];
    yeniSorguAdlari.push(sorguAdlari.splice(f.rs(0,sorguAdlari.length - 1), 1)[0]);
    yeniSorguAdlari.push(sorguAdlari.splice(f.rs(0,sorguAdlari.length - 1), 1)[0]);
    yeniSorguAdlari.push(sorguAdlari.splice(f.rs(0,sorguAdlari.length - 1), 1)[0]);
    yeniSorguAdlari.push(sorguAdlari.splice(f.rs(0,sorguAdlari.length - 1), 1)[0]);
    for (let i = 0; i < yeniSorguAdlari.length; i++) {
      let sorguAdi = yeniSorguAdlari[i];
      if(sorgular[sorguAdi] === true) return sorguAdi;
    }
    return null;
  }
  yerDegistir(x, y) {
    let harita = HARITA();
    if(this.yon == "SAGA") {
      x = Math.floor(x / oranti);
      y = Math.floor(y / oranti);
    } else if(this.yon == "SOLA") {
      x = Math.ceil(x / oranti);
      y = Math.ceil(y / oranti);
    } else if(this.yon == "ASAGI") {
      x = Math.floor(x / oranti);
      y = Math.floor(y / oranti);
    } else if(this.yon == "YUKARI") {
      x = Math.floor(x / oranti);
      y = Math.ceil(y / oranti);
    }
    let sart = (
      harita[y][x] && (harita[y][x][0] != 'O' || harita[y][x] == 'OK') &&
      harita[y + 1][x] && (harita[y + 1][x][0] != 'O' || harita[y + 1][x] == 'OK') &&
      harita[y][x + 1] && (harita[y][x + 1][0] != 'O' || harita[y][x + 1] == 'OK') &&
      harita[y + 1][x + 1] && (harita[y + 1][x + 1][0] != 'O' || harita[y + 1][x + 1] == 'OK')   
    );
    if(sart) {
      if(this.hareketMiktari < 1 * oranti) {
        this.hareketMiktari += Math.abs(this.hizX) * oranti + Math.abs(this.hizY) * oranti;
        this.x += this.hizX * oranti;
        this.y += this.hizY * oranti;
      } else this.hareketMiktari = 0;
    }
  }
  durdumu() {
    this.patlarMi();
    let harita = HARITA(),
    x = this.x / oranti,
    y = this.y / oranti;
    if(harita) {
      switch (this.yon) {
        case "SAGA":
          return (harita[y] && harita[y][x + 2] && harita[y][x + 2][0] == 'O') || (harita[y + 1] && harita[y + 1][x + 2] && harita[y + 1][x + 2][0] == 'O');
        case "SOLA":
          return (harita[y] && harita[y][x - 1] && harita[y][x - 1][0] == 'O') || (harita[y + 1] && harita[y + 1][x - 1] && harita[y + 1][x - 1][0] == 'O');
        case "ASAGI":
          let sart = 
          (
            harita[y + 2] && harita[y + 2][x] && harita[y + 2][x][0] == 'O'
          ) ||
          (
            harita[y + 2] &&
            harita[y + 2][x + 1] &&
            harita[y + 2][x + 1][0] == 'O'
          );
          return sart;
        case "YUKARI":
          return (harita[y - 1] && harita[y - 1][x] && harita[y - 1][x][0] == 'O' && harita[y - 1][x] != 'OK') || (harita[y - 1] && harita[y - 1][x + 1] && harita[y - 1][x + 1][0] == 'O' && harita[y - 1][x + 1] != 'OK');
        default:
          return true;
      }
    }
  }
  kontrol(yon) {
    this.patlarMi();
    let harita = HARITA(),
    x = this.x / oranti,
    y = this.y / oranti;
    switch (yon) {
      case "SAGA":
        return harita[y][x + 2] && harita[y][x + 2][0] != 'O' && harita[y + 1][x + 2] && harita[y + 1][x + 2][0] != 'O';
      case "SOLA":
        return harita[y][x - 1] &&harita[y][x - 1][0] != 'O' && harita[y + 1][x - 1] &&harita[y + 1][x - 1][0] != 'O';
      case "ASAGI":
        return harita[y + 2][x] && harita[y + 2][x][0] != 'O' && harita[y + 2][x + 1] && harita[y + 2][x + 1][0] != 'O';
      case "YUKARI":
        return harita[y - 1][x] && (harita[y - 1][x][0] != 'O' || (this.disariCikabilirMi && harita[y - 1][x] == 'OK')) && harita[y - 1][x + 1] && (harita[y - 1][x + 1][0] != 'O' || (this.disariCikabilirMi && harita[y - 1][x + 1] == 'OK'));
      default:
        return false;
    }
  }
  patlarMi() {
    let harita = HARITA(),
    dxbas = this.x,
    dybas = this.y,
    dxson = this.x + (1 * oranti),
    dyson = this.y + (1 * oranti),
    pxbas = this.oyun.pacman.x,
    pybas = this.oyun.pacman.y,
    pxson = this.oyun.pacman.x + (1 * oranti),
    pyson = this.oyun.pacman.y + (1 * oranti);
    if(
      (
        (
          (pxbas >= dxbas && pxbas <= dxson) ||
          (pxson >= dxbas && pxson <= dxson)
        )
      ) &&
      (
        (pybas >= dybas && pybas <= dyson) ||
        (pyson >= dybas && pyson <= dyson)
      )
    ) {
      if(this.oyun.pacman.guclendirme) {
        this.x = 14 * oranti;
        this.y = 14 * oranti;
        this.yonDegistir("SAGA");
        this.disariCikabilirMi = false;
        this.oyun.pacman.skor += 150;
        skorEl.innerHTML = this.oyun.pacman.skor;
        setTimeout(() => {
          this.disariCikabilirMi = true;
        }, 2000)
      } else setTimeout(() => { this.oyun.oyunBitti() }, 50);
    }
  }
}

export class Pacman {
  constructor(oyun) {
    this.oyun = oyun;
    this.w = 49.2;
    this.h = 49.4;
    this.x = 3 * oranti;
    this.y = 1 * oranti;
    this.boyut = 2;
    this.guclendirme = false;
    this.guclendirmeSuresi = 10 * 1000;
    this.guclendirmeSayaci = 0;
    this.kareBas = 0;
    this.kareSon = 2;
    this.kareX = 17;
    this.kareY = 0;
    this.fps = 20;
    this.zamanAraligi = 1000 / this.fps;
    this.sayac = 0;
    this.yonler = {
      'SAGA': new SAGA(this),
      'SOLA': new SOLA(this),
      'YUKARI': new YUKARI(this),
      'ASAGI': new ASAGI(this)
    };
    this.hizX = 0.1;
    this.yon = "SAGA";
    this.hizY = 0;
    this.hareketMiktari = 2;
    this.resim = f.image('assets/pacman.png');
  }
  tusVeYonCevirici(tus) {
    let deger = null;
    if(tus == 'ArrowUp') deger = 'YUKARI';
    else if(tus == 'ArrowDown') deger = 'ASAGI';
    else if(tus == 'ArrowRight') deger = 'SAGA';
    else if(tus == 'ArrowLeft') deger = 'SOLA';
    return deger;
  }
  guncelle(deltaTime) {
    let son_islem = SON_ISLEM();
    if(this.guclendirmeSayaci > 0) {
      if(this.oyun.oyunDevam) this.guclendirmeSayaci -= deltaTime;
      this.guclendirme = true;
    }
    else {
      this.guclendirmeSayaci = 0;
      this.guclendirme = false;
    }
    guclendirmeSuresiEl.innerHTML = this.guclendirmeSayaci == 0 ? 0 : (this.guclendirmeSayaci / 1000).toFixed(1);
    if(son_islem == 'a' && this.oyun.oyunDevam) {
      this.oyun.oyunDevam = false;
      TEMIZLE();
      SAYAC_BITIR();
    }
    if(son_islem == 's' && !this.oyun.oyunDevam) {
      this.oyun.oyunDevam = true;
      TEMIZLE();
      SAYAC_BASLAT()
    }
    if(this.sayac >= this.zamanAraligi) {
      this.sayac = 0;
      this.kareY = this.kareY + 1 <= this.kareSon ? this.kareY + 1 : this.kareBas;
    }else this.sayac += deltaTime;
    if(this.oyun.oyunDevam) {
      this.yerDegistir(
        this.x + this.hizX * 10 * oranti,
        this.y + this.hizY * 10 * oranti
      );
    }
    if((this.x / oranti) % 1 == 0 && (this.y / oranti) % 1 == 0 && son_islem != null) {
      if(this.yon != this.tusVeYonCevirici(son_islem) && this.kontrol(this.tusVeYonCevirici(son_islem))) this.yonDegistir(this.tusVeYonCevirici(son_islem));
    }
    if(this.x / oranti == 31) this.x = 0;
    else if(this.x / oranti == 0) this.x = 31 * oranti;
  }
  kontrol(yon) {
    let harita = HARITA(),
    x = this.x / oranti,
    y = this.y / oranti;
    if(yon == "ASAGI") return harita[y + 2][x] && harita[y + 2][x][0] != 'O' && harita[y + 2][x + 1] && harita[y + 2][x + 1][0] != 'O';
    else if(yon == "SAGA") return harita[y][x + 2] && harita[y][x + 2][0] != 'O' && harita[y + 1][x + 2] && harita[y + 1][x + 2][0] != 'O';
    else if(yon == "YUKARI") return harita[y - 1][x] && harita[y - 1][x][0] != 'O' && harita[y - 1][x + 1] && harita[y - 1][x + 1][0] != 'O';
    else if(yon == "SOLA") return harita[y][x - 1] && harita[y][x - 1][0] != 'O' && harita[y + 1][x - 1] && harita[y + 1][x - 1][0] != 'O';
    TEMIZLE();
  }
  ciz() {
    context.save();
    context.beginPath();
    context.drawImage(
      this.resim,
      this.kareX * this.w,
      this.kareY * this.h,
      this.w,
      this.h,
      ((this.x / oranti) * birimBuyuklugu) + (this.boyut * birimBuyuklugu) * -0.05,
      ((this.y / oranti) * birimBuyuklugu) + (this.boyut * birimBuyuklugu) * 0.1,
      (this.boyut * birimBuyuklugu) * 0.8,
      (this.boyut * birimBuyuklugu) * 0.8
    );
    context.closePath();
    context.restore();
  }
  yerDegistir(x, y){
    let harita = HARITA(),
    ilkX = Math.floor(this.x / oranti),
    ilkY = Math.floor(this.y / oranti);
    if(this.yon == "SAGA") {
      x = Math.floor(x / oranti);
      y = Math.floor(y / oranti);
    } else if(this.yon == "SOLA") {
      x = Math.ceil(x / oranti);
      y = Math.ceil(y / oranti);
    } else if(this.yon == "ASAGI") {
      x = Math.floor(x / oranti);
      y = Math.floor(y / oranti);
    } else if(this.yon == "YUKARI") {
      x = Math.floor(x / oranti);
      y = Math.ceil(y / oranti);
    }
    let sart = (
      harita[y][x] && harita[y][x][0] != 'O' &&
      harita[y + 1][x] && harita[y + 1][x][0] != 'O' &&
      harita[y][x + 1] && harita[y][x + 1][0] != 'O' &&
      harita[y + 1][x + 1] && harita[y + 1][x + 1][0] != 'O'
    );
    if(sart) {
      if(this.hareketMiktari < 1 * oranti) {
        this.hareketMiktari += Math.abs(this.hizX) * oranti + Math.abs(this.hizY) * oranti;
        this.x += this.hizX * oranti;
        this.y += this.hizY * oranti;
      } else {
        harita[ilkY][ilkX] = harita[y][x][0] == 'a' ? 'a' : harita[y][x];
        if(harita[y][x].split('|')[1]) {
          this.oyun.skor += harita[y][x].split('|')[1] == 'y' ? 5 : 75;
          skorEl.innerHTML = this.sayiCevir(this.oyun.skor);
          if(harita[y][x].split('|')[1] != 'y') {
            this.oyun.dusmanlar.forEach(dusman => {
              let yeniYon = dusman.yon;
              switch (dusman.yon) {
                case "SAGA":
                  yeniYon = "SOLA";
                  break;
                case "SOLA":
                  yeniYon = "SAGA";
                  break;
                  case "ASAGI":
                  yeniYon = "YUKARI";
                  break;
                  case "YUKARI":
                  yeniYon = "ASAGI";
                  break;
              }
              dusman.yonDegistir(yeniYon);
            });
            this.guclendirmeSayaci += this.guclendirmeSuresi;
          }
        }
        harita[y][x] = 'P';
        HARITA_AYARLA(harita);
        this.hareketMiktari = 0;
      }
    } else this.hareketMiktari = 0;
  
  }
  yonDegistir(index) {
    this.yon = index;
    this.yonler[this.yon].giris();
  }
  sayiCevir(sayi) {
    sayi = String(sayi)
    let yeniSayi = '', dongu = 0;
    for (let i = sayi.length - 1; i >= 0; i--) {
      dongu++;
      yeniSayi = `${dongu % 3 == 0 && i != 0 ? '.' : ''}${sayi[i]}${yeniSayi}`
    }
    return yeniSayi;
  }
}

export class Oyun {
  constructor() {
    this.pacman = new Pacman(this);
    this.dusmanlar = [
      new Dusman(this, 0),
      new Dusman(this, 1),
      new Dusman(this, 2),
      new Dusman(this, 3)
    ];
    this.oyunDevam = false;
    this.skor = 0;
    this.cizimIcin = false;
  }
  guncelle(deltaTime) {
    if(this.oyunDevam || this.cizimIcin) {
      if(this.oyunDevam) this.dusmanlar.forEach(dusman => dusman.guncelle(deltaTime));
      this.pacman.guncelle(deltaTime);
    }
  }
  ciz() {
    this.dusmanlar.forEach(dusman => dusman.ciz());
    this.pacman.ciz();
  }
  oyunBitti() {
    SAYAC_BITIR();
    if(this.oyunDevam) {
      this.pacman.hizX = 0;
      this.pacman.hizY = 0;
      this.pacman.kareBas = 0;
      this.pacman.kareSon = 12;
      this.pacman.kareX = 7;
      this.pacman.kareY = 0;
      this.pacman.fps = 10;
      this.pacman.zamanAraligi = 1000 / this.pacman.fps;
      this.pacman.sayac = this.pacman.zamanAraligi + 19;
      this.oyunDevam = false;
      setTimeout(()=>{
        this.cizimIcin = false;
        alert('Oyun bitti kaybettin.');
      }, (1000 / this.pacman.fps) * 13);
    }
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