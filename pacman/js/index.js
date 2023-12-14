import { Oyun } from './class/AllClass.js'
import { HARITA } from './tools.js';

let lastTime = 0,
sayac = null,
sure = 0,
oyun = null;

export function OYUN_AL() { return oyun; }
export function SAYAC_BITIR() { clearInterval(sayac); }
export function SAYAC_BASLAT() { sayac = setInterval(()=>{
  sure++;
  sureEl.innerHTML = sure;
}, 1000) }

function buyuklukAyarla() {
  canvas.width = w * birimBuyuklugu;
  canvas.height = h * birimBuyuklugu;
  solDiv.style.width = (mainContainer.offsetWidth - canvas.width) / 2 + 'px';
  sagDiv.style.width = (mainContainer.offsetWidth - canvas.width) / 2 + 'px';
  solDiv.style.height = canvas.height + 'px';
  sagDiv.style.height = canvas.height + 'px';
}

function baslat() {
  f.timer(0, ()=>{
    baslatButon.disabled = true;
    oyun.oyunDevam = true;
    oyun.cizimIcin = true;
    SAYAC_BASLAT();
  })
}

function animasyon(timeStamp) {
  birimBuyuklugu = (mainContainer.offsetWidth / 100) * 2;
  buyuklukAyarla();
  haritayiCiz();
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if(oyun != null) {
    oyun.guncelle(deltaTime);
    oyun.ciz();
  }
  requestAnimationFrame(animasyon);
}


let noktaSayisi = 0;
function haritayiCiz() {
  let harita = HARITA()
  noktaSayisi = 0;
  for (let satirNo = 0; satirNo < harita.length; satirNo++) {
    let satir = harita[satirNo];
    for (let sutunNo = 0; sutunNo < satir.length; sutunNo++) {
      context.save();
      context.beginPath();
      let s = satir[sutunNo];
      if(s[0] == 'O') {
        context.strokeStyle = s[1] ? s[1] == 'K' ? 'white' : 'transparent' : 'blue';
        context.strokeRect(sutunNo * birimBuyuklugu, satirNo * birimBuyuklugu, birimBuyuklugu, birimBuyuklugu);
      } else if(s[0] == 'a' && s.split('|')[1]) {
        if(
          harita[satirNo][sutunNo + 1] && harita[satirNo][sutunNo + 1][0] != 'O' &&
          harita[satirNo + 1][sutunNo + 1] && harita[satirNo + 1][sutunNo + 1][0] != 'O' &&
          harita[satirNo + 1][sutunNo] && harita[satirNo + 1][sutunNo][0] != 'O'
        ) {
          let birim = s.split('|')[1] == 'y' ? birimBuyuklugu / 10 : birimBuyuklugu / 4;
          context.fillStyle = s.split('|')[1] == 'y' ? 'white' : 'red';
          context.arc(sutunNo * birimBuyuklugu + birimBuyuklugu, satirNo * birimBuyuklugu + birimBuyuklugu, birim, 0, Math.PI * 2, false);
          context.fill();
          noktaSayisi++;
        }
      } else if(s[0] == ' ' || (satirNo == 14 && (sutunNo == 31 || sutunNo == 0 || sutunNo == 1))) {
        context.fillStyle='black';
        context.fillRect(
          sutunNo * birimBuyuklugu,
          satirNo * birimBuyuklugu,
          birimBuyuklugu,
          birimBuyuklugu
        );
      }
      context.closePath();
      context.restore();
    }
  }
  if(noktaSayisi == 0 && oyun.oyunDevam) {
    oyun.oyunDevam = false;
    setTimeout(()=>{
      alert('KAZANDIN!');
      oyun.pacman.kareBas = 9;
      oyun.pacman.kareson = 9;
      oyun.pacman.kareX = 0;
      oyun.pacman.kareY = 9;
    }, 100);
  }
}

onload = () => {
  oyun = new Oyun();
  animasyon(0);
  baslatButon.disabled = false;
  // baslat();
}
baslatButon.onclick = baslat;