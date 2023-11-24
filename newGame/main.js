import { Oyuncu } from './class/oyuncu.js';
import { Functions } from './class/utils.js';
import { Kontroller } from './class/kontroller.js';
import { Arkaplan } from './class/arkaplan.js';

class Oyun {
  constructor(width,height) {
    this.fps = 25;
    this.width = width;
    this.height = height;
    this.zeminYuksekligi = 50;
    this.hizCarpani = 0;
    this.hiz = 6;
    this.arkaplan = new Arkaplan(this);
    this.oyuncu = new Oyuncu(this);
    this.kontroller = new Kontroller();
  }

  guncelle(deltaTime) {
    this.arkaplan.guncelle()
    this.oyuncu.guncelle(this.kontroller.tuslar, deltaTime);
  }

  ciz(context) {
    this.arkaplan.ciz(context);
    this.oyuncu.ciz(context);
  }

}

const f = new Functions(),
  canvas = f.gid('myCanvas1'),
  context = canvas.getContext('2d'),
  seviyeler = [ 6, 6, 6, 8, 10, 4, 6, 6, 11, 3 ];

var canvasHeight = 500,
  canvasWidth = canvasHeight * 3,
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