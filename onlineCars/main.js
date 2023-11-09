class Functions {
  constructor() {}
  mf = t => Math.floor(t)
  log = t => console.log(t)
  table = t => console.table(t)
  clear = () => console.clear()
  qs = t => document.querySelector(t)
  gid = t => document.getElementById(t)
  qsa = t => document.querySelectorAll(t)
  hidden = t => document.getElementById(t).hidden = !document.getElementById(t).hidden
  rs = (min, max) => this.mf(Math.random() * (max - min)) + min
  lerp = (a, b, c) => a + (b - a) * c
  getIntersection = (A, B, C, D) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
    if (bottom != 0) {
      const t = tTop / bottom
      const u = uTop / bottom
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
        x: this.lerp(A.x, B.x, t),
        y: this.lerp(A.y, B.y, t),
        offsetT: t,
        offsetU: u
      }
    }
    return null;
  }
}
var mid = ''
var harita = 'yok'
var oyun=true
const f = new Functions()
const socket = io('http://172.16.16.203:1331/')

// Elementler
const canvas = f.qs('#myCanvas')
const arabaSecim = f.qs('#arabaSecim')
const cgContainer = f.qs('#cgContainer')
const vitesEl = f.qs('#vites')
const hizEl = f.qs('#hiz')

const context = canvas.getContext('2d')
const surtunme = 0.2
var istek = {
  islem: '',
  veri: {}
}
var araba = 'yok'
var arabalar = []
var tuslar = []
var cizgilerGozuksun = false

const baslat = (resim) => {
  istek.islem = 'banaArabaVer'
  istek.veri = {
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    resim: resim
  }
  socket.emit('islem', istek)
  displaDegis(arabaSecim, 'flex')
}
var a = true
const arabaGonder = () => {
  if (araba != 'yok') {
    guncelle(araba)
    istek.islem = 'arabaGuncelle'
    istek.veri = {
      araba: araba
    }
    socket.emit('islem', istek)
  }
}
async function animasyon() {
  if(harita.haritaBuyuklugu){
    canvas.width = harita.haritaBuyuklugu.w
    canvas.height = harita.haritaBuyuklugu.h
  }else {
    canvas.width = 400
    canvas.height = 600
  }
  context.translate(0, -araba.y+canvas.height*.6)
  yolCiz()
  for (let i = 0; i < arabalar.length; i++) ciz(arabalar[i], 'araba', i)
  if(harita!='yok'){
    ciz(harita.baslangicCizgisi,'harita')
    ciz(harita.bitisCizgisi,'harita')
  }
  arabaGonder() // + guncelle(araba)
  requestAnimationFrame(animasyon)
}
const hasarSayaci=el=>{
  if(hasarSuresi>0){
    hasarSuresi-=0.00045
    setTimeout(()=>{hasarSayaci(el)},0.01)
  }else{
    hasarSuresi=1
    el.hasar=false
  }
}
const ciz = (element, tip = 'araba', i = -1) => {
  if (tip == 'araba') {
    context.save()
    const el = element.araba
    const resim = new Image()
    resim.src = el.resim
    context.save()
    context.beginPath()
    context.translate(el.x, el.y)
    context.rotate(el.aci)
    context.rect(-el.w/2, -el.h/2, el.w, el.h);
    context.drawImage(resim, -el.w/2, -el.h/2, el.w, el.h);
    cizgilerGozuksun ? context.stroke() : false
    el.hasar ? context.fill() : false
    context.closePath()
    context.restore()
  }else if(tip == 'cizgi'){
    context.beginPath()
    context.save()
    context.strokeStyle='white'
    context.lineWidth=2
    element.forEach(el => {
      context.moveTo(el[0].x, el[0].y)
      context.lineTo(el[1].x, el[1].y)
    })
    context.stroke()
    context.restore()
    context.closePath()
  }
}
const poligonlaCiz=el=>{
  poligonOlustur(el)
  context.moveTo(el.poligon[0].x, el.poligon[0].y)
  for (let i = 1; i < el.poligon.length; i++) context.lineTo(el.poligon[i].x, el.poligon[i].y)
  context.lineTo(el.poligon[0].x, el.poligon[0].y)
}
const guncelle = el => {
  hareket(el)
  vitesKontrol(el)
  vitesEl.innerHTML = el.vitesSeviyeleri[el.vites].isim
  hizEl.innerHTML = el.hiz.toFixed(2)
}
var sayac = 0
const say = () => {
  sayac -= 0.1
  if (sayac > 0) setTimeout(() => {
    say()
  }, 100)
}
const vitesKontrol = async (el) => {
  const {
    'Shift': arttir,
    'Control': azalt
  } = tuslar
  if (arttir && el.hiz >= el.vitesHizSiniri && sayac <= 0) {
    sayac = 0.21
    say()
    const yeniVites = Number(el.vites) + 1
    if (el.vitesSeviyeleri[yeniVites]) el.vites = yeniVites
  } else if (azalt && sayac <= 0) {
    sayac = 0.21
    say()
    const yeniVites = Number(el.vites) - 1
    if (el.vitesSeviyeleri[yeniVites]) el.vites = yeniVites
  }
  const vitesOzellikleri = el.vitesSeviyeleri[el.vites]
  el.hizlanma = vitesOzellikleri.hizlanma
  el.maximumHiz = vitesOzellikleri.maximumHiz
  el.vitesHizSiniri = vitesOzellikleri.vitesHizSiniri
  el.motorFreniGucu = vitesOzellikleri.motorFreniGucu
  el.istopSiniri = vitesOzellikleri.istopSiniri
  el.baslangic = vitesOzellikleri.baslangic
}
var hasarSuresi=1
const yolCiz=()=>{
  if(harita!='yok'){
    const f0 = harita.bitisCizgisi[0] // => y: bitis çizgisi, x = bas
    const f1 = harita.bitisCizgisi[1] // => y: bitis çizgisi, x = son
    const solCizgi = [ { x:2, y:0 }, { x:2, y:f0.y } ]
    const sagCizgi = [ { x:f1.x-2, y:0 }, { x:f1.x-2, y:f0.y } ]
    const altCizgi = [ { x:2, y:0 }, { x:f1.x-2, y:0 } ]
    const ustCizgi = [ { x:f0.x+2, y:f0.y }, { x:f1.x-2, y:f0.y } ]
    ciz([solCizgi,sagCizgi,altCizgi,ustCizgi],'cizgi')
  }
}
const hareket = el => {
  const {
    ' ': fren,
    'ArrowUp': ileri,
    'ArrowDown': geri,
    'ArrowRight': sag,
    'ArrowLeft': sol
  } = tuslar
  if (el.hiz > 0) el.hiz - surtunme >= 0 ? el.hiz -= surtunme : el.hiz = 0
  else if (el.hiz < 0) el.hiz + surtunme <= 0 ? el.hiz += surtunme : el.hiz = 0
  if ((Number(el.vites) != 0 && el.hiz > el.istopSiniri) || (ileri && el.hiz < el.baslangic)) {
    el.hasar = true
    hasarSayaci(el)
    if(Number(el.vites) != 0 && el.hiz > el.istopSiniri) {
      el.hiz-el.motorFreniGucu>=0?el.hiz-=el.motorFreniGucu:el.hiz=0
    }
  }
  if ((ileri || geri) && !el.hasar) {
    if (Number(el.vites) > 0 && ileri) el.hiz + el.hizlanma <= el.maximumHiz ? el.hiz += el.hizlanma : el.hiz = el.maximumHiz
    else if (Number(el.vites) < 0) el.hiz + el.hizlanma >= el.maximumHiz ? el.hiz += el.hizlanma : el.hiz = el.maximumHiz
  }
  if (sag && !el.hasar) el.aci += el.direksiyonHassasiyeti * el.hiz
  if (sol && !el.hasar) el.aci -= el.direksiyonHassasiyeti * el.hiz
  
  if(el.x<=35||el.x>=canvas.width-35) {
    el.x=harita.haritaBuyuklugu.w/2
    el.aci=0
    el.hiz=0
    tuslar["ArrowUp"]=false
  }
  if(harita.bitisCizgisi&&el.y<harita.bitisCizgisi[0].y) socket.emit('kazandim',araba)
  el.y -= Math.cos(el.aci) * el.hiz
  el.x += Math.sin(el.aci) * el.hiz
}
const poligonOlustur = (el) => {
  const noktalar = []
  const rad = Math.hypot(el.w, el.h) / 2
  const alfa = Math.atan2(el.w, el.h)
  noktalar.push({
    x: el.x - Math.sin(el.aci - alfa) * rad,
    y: el.y - Math.cos(el.aci - alfa) * rad
  })
  noktalar.push({
    x: el.x - Math.sin(el.aci + alfa) * rad,
    y: el.y - Math.cos(el.aci + alfa) * rad
  })
  noktalar.push({
    x: el.x - Math.sin(Math.PI + el.aci - alfa) * rad,
    y: el.y - Math.cos(Math.PI + el.aci - alfa) * rad
  })
  noktalar.push({
    x: el.x - Math.sin(Math.PI + el.aci + alfa) * rad,
    y: el.y - Math.cos(Math.PI + el.aci + alfa) * rad
  })
  el.poligon = noktalar
}
const displaDegis = (el, dtype) => el.style.display = el.style.display == 'none' ? dtype : 'none'
// socket.on işlemleri
socket.on('log', t => f.log(t))
socket.on('seninAraban', seninAraban => {
  mid = seninAraban.id;
  araba = seninAraban.araba
})
socket.on('arabalar', tumArabalar => arabalar = tumArabalar)
socket.on('harita', h => harita = h)
socket.on('kazanan', resim => {
  if(oyun){
    oyun=!oyun
    araba.hasar = true
    araba.hiz=15
    araba.vites=99
    const renk = renkCevir(resim.split('araba')[1].split('.')[0])
    mesajGoster('Oyun Bitti', `Kazanan Renk <span class="px-1 rounded text-bg-${renkCevirBootstrap(renk)}">${renk}</span>`,renk)
    animasyon()
  }
})
const mesajGoster=(baslik,mesaj,renk)=>{
  Swal.fire({
    title: baslik,
    html: mesaj,
    imageUrl: "resimler/kralTaci.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Kral Tacı",
    confirmButtonText:"Yeniden Oyna",
    allowOutsideClick:"Yeniden Oyna"
  }).then((confirm)=>{
    if(confirm.isConfirmed){
      window.location.reload()
    }
  })
}
const renkCevir=renkAdi=>{
  switch (renkAdi.toLowerCase()) {
    case 'pembe':
      return 'Pembe'
      break;
    case 'sari':
      return 'Sarı'
      break;
    case 'turuncu':
      return 'Turuncu'
      break;
    case 'kirmizi':
      return 'Kırmızı'
      break;
    case 'siyah':
      return 'Siyah'
      break;
  }
}

const renkCevirBootstrap=renkAdi=>{
  switch (renkAdi) {
    case 'Pembe':
      return 'primary'
      break;
    case 'Sarı':
      return 'warning'
      break;
    case 'Turuncu':
      return '" style="background-color:#ff7f00;color:white;'
      break;
    case 'Kırmızı':
      return 'danger'
      break;
    case 'Siyah':
      return 'dark'
      break;
  }
}

const bekle = sure => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, sure)
  })
}

document.onkeydown = e => tuslar[e.key] = true
document.onkeyup = e => tuslar[e.key] = false
animasyon()