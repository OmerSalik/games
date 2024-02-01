// f benim utils.js dosyasında oluşturduğum bir class'tır. Bazı fonksiyonların kısaltılmış halleri vardır. Bazısı ise benim oluşturduğum şeylerdir.
import { Top } from "./top.js";
import { BaslangicEkrani } from "./baslangicEkrani.js";
import { SkorArtti } from "./efektler.js";

let canvas, context, anaContainer, ekranOrantisi = { w: 2.5, h: 4 }, sonZaman = 0, oyun,
yuksekliktenGenislik = yukseklik => ekranOrantisi.w * ( yukseklik / ekranOrantisi.h ),
genisliktenYukseklik = genislik => ekranOrantisi.h * ( genislik / ekranOrantisi.w ), ekranBirimSayilari = { w: yuksekliktenGenislik(800), h: 800 };;

class Oyun {
  constructor() {
    // this.w, this.h zaten birim haline çevrilmiş değerler bu yüzden birim işlemlerine dahil etmeyin;
    this.w = canvas.width;
    this.istatisliklerHeight = 32;
    this.h = canvas.height;
    this.cerceve = { x: birimx(0), y: birimy(0) };
    this.sinirlar = { // Tıklama Uzaklığı
      x: { baslangic: birimx(0), bitis: this.w - this.cerceve.x },
      y: { baslangic: birimy(0), bitis: this.h - this.cerceve.y }
    };
    this.istatislikler = { "skor": 0, "gecenSure": 0, "tiklama": 0 };
    let ra = renk => f.image('../assets/resim/basketTopu' + renk + '.png'); this.turuncuTop = ra('Turuncu'); this.KirmiziTop = ra('Kirmizi'); this.YesilTop = ra('Yesil'); this.SariTop = ra('Sari');
    this.toplar = [];
    this.topTurleri = [
      {
        // Normal Top
        resim: ra('Turuncu'),
        boyut: birimx(90),
        hizCarpani: 1,
        puan: 1
      },
      {
        // Özel Top 1 (Yeşil Top)
        resim: ra('Yesil'),
        boyut: birimx(70),
        hizCarpani: 1.2,
        puan: 2
      },
      {
        // Özel Top 2 (Kırmızı Top)
        resim: ra('Kirmizi'),
        boyut: birimx(50),
        hizCarpani: 1.3,
        puan: 3
      },
      {
        // Özel Top 3 (Fener Topu)
        resim: ra('Sari'),
        boyut: birimx(45),
        hizCarpani: 1.5,
        puan: 10
      }
    ];
    this.saniyeBasinaTop = 3;
    this.topSuresi = 1000 / this.saniyeBasinaTop + 1;
    this.topSureAraligi = 1000 / this.saniyeBasinaTop;
    this.efektler = [];
    this.baslangicEkrani = new BaslangicEkrani(this);
    this.oyunBasladimi = false;
  };
  istatislikCiz(context) {
    let { skor, tiklama } = this.istatislikler;
    f.gid('skor').innerHTML = skor;
  }
  guncelle(deltaZaman) {
    if(this.oyunBasladimi) {
      this.topSuresi >= this.topSureAraligi ? ( this.topEkle(), this.topSuresi = 0 ) : this.topSuresi += deltaZaman;
      this.toplar.forEach((top, topIndex) => top.guncelle(deltaZaman, topIndex));
    }
    this.efektler.forEach((efekt, efektIndex) => efekt.guncelle(deltaZaman, efektIndex))
  };
  randomTopTuruAl() {
    let Indexler = { normal: 0, yesil: 1, kirmizi: 2, sari: 3 }, rs = f.rs(0, 100), index;
    if(rs <= 50) index = Indexler.normal;
    else if(rs <= 75) index = Indexler.yesil;
    else if(rs <= 90) index = Indexler.kirmizi;
    else index = Indexler.sari
    return this.topTurleri[index];
  }
  topEkle() {
    let topTuru = this.randomTopTuruAl();
    let yeniTop = new Top(this, topTuru.boyut, topTuru.hizCarpani, topTuru.puan, topTuru.resim, this.toplar.length);
    this.toplar.push(yeniTop);
  };
  ciz(ctx) {
    this.oyunBasladimi ? (
      this.istatislikCiz(),
      this.toplar.forEach(top => top.ciz(ctx)),
      this.efektler.forEach(efekt => efekt.ciz(ctx))
    ) : this.baslangicEkrani.ciz(ctx);
  };
  efektSil(efektIndex) { this.efektler.splice(efektIndex, 1); }
  topSil(topIndex) { this.toplar.splice(topIndex, 1); };
};

function buyuklukAyarla() {
  f.variables('oranx', window.innerWidth / ekranBirimSayilari.w);
  f.variables('orany', window.innerHeight / ekranBirimSayilari.h)
  canvas.width = birimx(ekranBirimSayilari.w);
  canvas.height = birimy(ekranBirimSayilari.h);
};

function animasyon(duraklama) {
  buyuklukAyarla();
  let deltaZaman = duraklama - sonZaman;
  sonZaman = duraklama;
  oyun.guncelle(deltaZaman);
  oyun.ciz(context);
  requestAnimationFrame(animasyon);
};

function tiklandi(e) {
  let { offsetX: cx, offsetY: cy } = e;
  if(oyun.oyunBasladimi) {
    oyun.istatislikler.tiklama++;
    let otoplar = f.variables('toplar', oyun.toplar);
    otoplar.forEach((top, index) => {
      let { boyut, x, y, hiz } = top, { x: hx, y: hy } = hiz;
      let s1 = (
        ((cx >= x - boyut / 2) && cx <= (x + boyut / 2)) &&
        ((cy >= y - boyut) - hiz.y && cy <= y - hiz.y)
        );
      if(s1) {
          oyun.istatislikler.skor += top.puan;
          oyun.topSil(index);
          oyun.efektler.push(new SkorArtti(oyun, top.puan, cx, cy - birimy(10)));
          return;
        }
    });
  } else {
    let [ { x: x, y: y }, { w, h } ] = [oyun.baslangicEkrani.baslatButon.pozisyon, oyun.baslangicEkrani.baslatButon.boyut];
    if( cx >= x - w / 2 && cx <= x + w / 2 && cy >= y - h / 2&& cy <= y + h ) oyun.oyunBasladimi = true;
  }
}

function init() {
  [ canvas, context ] = f.cac();
  anaContainer = f.gid('anaContainer');
  anaContainer.style.display = 'flex';
  canvas.addEventListener('click', tiklandi)
  buyuklukAyarla();
  oyun = new Oyun(context);
  animasyon(0);
};

// onload'un aksine herhangi bir event'i veya fonksiyonu resetlemez. Eğer ekran yüklendiyse direkt çalıştırır. Yüklenmediyse 50 salisede bir tekrar dener.
f.whenLoad(init);