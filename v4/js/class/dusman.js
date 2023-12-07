import { SAGA, SOLA, YUKARI, ASAGI } from "./yonler.js";
import { HARITA, HARITA_AYARLA } from '../harita.js';

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

    // console.log('');
    // console.log(`dxbas : ${dxbas}, dybas : ${dybas}, dxson : ${dxson}, dyson : ${dyson}, pxbas : ${pxbas}, pybas : ${pybas}, pxson : ${pxson}, pyson : ${pyson}, `);
    // console.log(`pxbas : ${pxbas >= dxbas && pxbas <= dxson}, pxson : ${pxson >= dxbas && pxson <= dxson}`);
    // console.log(`pybas : ${pybas >= dybas && pybas <= dyson}, pyson : ${pyson >= dybas && pyson <= dyson}`);
    // console.log('');

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
        setTimeout(() => {
          this.disariCikabilirMi = true;
        }, 2000)
      } else setTimeout(() => { this.oyun.oyunBitti() }, 50);
    }
  }
}

/*

      (
        this.oyun.pacman.y / oranti == y ||
        this.oyun.pacman.y / oranti == y + 1 ||
        this.oyun.pacman.y / oranti == y - 1 ||
        this.oyun.pacman.y / oranti == y + 2
      ) &&
      (
        this.oyun.pacman.x / oranti == x ||
        this.oyun.pacman.x / oranti == x + 1 ||
        this.oyun.pacman.x / oranti == x - 1 ||
        this.oyun.pacman.x / oranti == x + 2
      )
    
*/