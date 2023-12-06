import { Oyuncu } from './class/oyuncu.js';
import { Functions } from './class/utils.js';
import { Kontroller } from './class/kontroller.js';
import { Arkaplan } from './class/arkaplan.js';
import { UcanDusman, ZemindeDusman, TirmananDusman } from './class/dusmanlar.js';
import { buharPuff } from './class/parcaciklar.js';
import { Istatislikler } from './class/istatislikler.js';

const f = new Functions();

class Oyun {
  constructor(width,height) {
    this.oyunDevam = true;
    this.maximumParcacik = 40;
    this.parcaciklar = [];
    this.fps = 25;
    this.debugMode = false;
    this.width = width;
    this.height = height;
    this.zeminYuksekligi = 83;
    this.hizCarpani = 0;
    this.hiz = 4;
    this.dusmanlar = []
    this.arkaplan = new Arkaplan(this);
    this.oyuncu = new Oyuncu(this);
    this.istatislikler = new Istatislikler(this);
    this.kontroller = new Kontroller(this)
    this.dusmanSayaci = 0;
    this.dusmanAraligi = 1500;
  }

  guncelle(deltaTime) {
    this.arkaplan.guncelle()
    for (let i = 0; i < this.dusmanlar.length; i++) this.dusmanlar[i].guncelle(deltaTime);
    if(this.dusmanSayaci >= this.dusmanAraligi){
      this.dusmanEkle();
      this.dusmanSayaci = 0;
    }else this.dusmanSayaci += deltaTime;
    if(this.parcaciklar.length > this.maximumParcacik) this.parcaciklar = this.parcaciklar.splice(0, this.maximumParcacik)
    this.parcaciklar.forEach(parcacik => parcacik.guncelle(deltaTime));
    this.oyuncu.guncelle(this.kontroller.tuslar, deltaTime);
  }

  ciz(context) {
    this.arkaplan.ciz(context);
    if(this.debugMode) {
      context.save();
      context.beginPath();
      context.strokeStyle='black';
      context.lineWidth=1;
      context.strokeRect(this.oyuncu.x, this.oyuncu.y, this.oyuncu.width, this.oyuncu.height);
    };
    for (let i = 0; i < this.dusmanlar.length; i++) {
      const dusman = this.dusmanlar[i];
      dusman.ciz(context);
      var oyuncuXBaslangic = this.oyuncu.x;
      var oyuncuXBitis = this.oyuncu.x + this.oyuncu.width;
      var oyuncuYBaslangic = this.oyuncu.y;
      var oyuncuYBitis = this.oyuncu.y + this.oyuncu.height;

      var dusmanXBaslangic = dusman.x;
      var dusmanXBitis = dusman.x + dusman.width;
      var dusmanYBaslangic = dusman.y;
      var dusmanYBitis = dusman.y + dusman.height;
      if(
        ((dusmanXBaslangic > oyuncuXBaslangic && dusmanXBaslangic < oyuncuXBitis) || 
        (dusmanXBitis > oyuncuXBaslangic && dusmanXBitis < oyuncuXBitis) ) &&
        ((dusmanYBaslangic > oyuncuYBaslangic && dusmanYBaslangic < oyuncuYBitis ||
          dusmanYBitis > oyuncuYBaslangic && dusmanYBitis < oyuncuYBitis ))
      ){
        if(this.oyuncu.mevcutDurumAdi == 'yuvarlaniyor'){
          const index = this.dusmanlar.indexOf(dusman);
          this.dusmanlar.splice(index, 1);
          this.parcaciklar.unshift(new buharPuff(this, dusman.x + dusman.width/2, dusman.y + dusman.height/2))
          this.istatislikler.skor++;
          if(this.istatislikler.skor == 255) alert('Helal olsun kanka bu oyunu bu kadar oynayacak kadar sevmen hoşuma gitti');
          else if(this.istatislikler.skor == 999) {
            this.hizCarpani = 0;
            alert('işsiz...');
            setTimeout(()=>{
              alert('Dur tahmin Edeyim')
              alert('Muhtemelen bir süredir yapacak hiçbir şeyi olmayan, basit oyunlara girip sadece falza puanalmayı hedefleyen güç fantezisi yapan birisin.')
              this.istatislikler.can = 5;
              this.istatislikler.enerji = 25;
              this.kontroller.tuslar = {  };
              this.oyuncu.durumAyarla('oturuyor')
              setTimeout(()=>{
                alert('Helal olsun büyüksün');
              }, 1500)
            }, 500)
          }
          if(this.istatislikler.skor % 2 == 0) this.istatislikler.enerji++;
        } else {
          if(this.oyuncu.mevcutDurumAdi != 'sersemledi') {
            this.oyuncu.durumAyarla('sersemledi', dusman.ad == 'ZemindeDusman' || dusman.ad == 'TirmananDusman');
            clearInterval(this.oyuncu.durumlar.oturuyor.enerjiArttir);
            clearInterval(this.oyuncu.durumlar.yuvarlaniyor.enerjiAzal);
            clearInterval(this.oyuncu.durumlar.kosuyor.enerjiArttir);
            this.istatislikler.can--;
          }
          this.oyuncu.karakter.agirlik = 1;
        }
      }
      if(this.debugMode) {
        context.strokeStyle='black';
        context.strokeRect(dusman.x, dusman.y, dusman.width, dusman.height);
        context.stroke();
        context.restore();
      };
    }
    this.parcaciklar.forEach(parcacik => parcacik.ciz(context));
    this.oyuncu.ciz(context);
    this.istatislikler.yaz(context)
  }

  oyunBitti() {
    this.oyunDevam = false;
    this.hizCarpani = 0;
    this.dusmanlar = [];
    this.oyuncu.karakter.hiz = 0;
    this.oyuncu.karakter.maximumHiz = 0;
    this.oyuncu.mevcutDurumAdi = 'oyunBitti';
    clearInterval(this.oyuncu.durumlar.oturuyor.enerjiArttir);
    clearInterval(this.oyuncu.durumlar.yuvarlaniyor.enerjiAzal);
    clearInterval(this.oyuncu.durumlar.kosuyor.enerjiArttir);
  }

  dusmanEkle(){
    this.dusmanlar.push(new UcanDusman(this));
    if(this.hizCarpani > 0 && Math.random() < 0.5) this.dusmanlar.push(new ZemindeDusman(this));
    else if(this.hizCarpani > 0 && Math.random() < 0.7) this.dusmanlar.push(new TirmananDusman(this));
  }

}

const canvas = f.gid('myCanvas1'),
      context = canvas.getContext('2d'),
      seviyeler = [ 6, 6, 6, 8, 10, 4, 6, 6, 11, 3 ];

var canvasHeight = 500,
    canvasWidth = window.innerWidth * 0.9,
    sayac = 0,
    oyun = null,
    oyuncuAnimasyonu = null;

const baslangic = async () => {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  oyun = new Oyun(canvas.width,canvas.height);
  // oyuncuAnimasyonu = setInterval(()=>oyun.oyuncu.cerceveAnimasyonKaresi = oyun.oyuncu.cerceveAnimasyonKaresi + 1 <= seviyeler[oyun.oyuncu.cerceveDurumu] ? oyun.oyuncu.cerceveAnimasyonKaresi+1 : 0,1000 / oyun.fps)
  animayson(0);
}
let lastTime = 0;

const animayson = async (timeStamp) => {
  const deltaTime = timeStamp - lastTime; // Ne olduğunu anlamadım sadece videodan gördüm
  lastTime = timeStamp;
  context.clearRect(0, 0, canvas.width, canvas.height);
  oyun.guncelle(deltaTime);
  oyun.ciz(context);
  requestAnimationFrame(animayson)
}

window.onload = baslangic();