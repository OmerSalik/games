import { HARITA, HARITA_AYARLA } from "../harita.js";
import { SAGA, SOLA, YUKARI, ASAGI } from "./yonler.js";
import { SON_ISLEM, TEMIZLE } from "../kontroller.js";
import { Dusman } from "./dusman.js";

export class Pacman {
  constructor(oyun) {
    this.oyun = oyun;
    this.w = 49.2;
    this.h = 49.4;
    this.x = 3 * oranti;
    this.y = 1 * oranti;
    this.boyut = 2;
    this.guclendirme = false;
    this.guclendirmeSuresi = 10;
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
    if(son_islem == 'a') {
      this.oyun.oyunDevam = false;
      TEMIZLE();
    }
    if(son_islem == 's') {
      this.oyun.oyunDevam = true;
      TEMIZLE();
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
    if(!this.oyun.oyunDevam) {
      context.strokeStyle='white';
      
      context.strokeRect(
        (this.x / oranti) * birimBuyuklugu,
        (this.y / oranti) * birimBuyuklugu,
        this.boyut * birimBuyuklugu,
        this.boyut * birimBuyuklugu
      );
      
    }
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
            this.guclendirme = true;
            setTimeout(() => {
              this.guclendirme = false;
            }, this.guclendirmeSuresi * 1000)
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