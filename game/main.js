var ben = {}
const f = new Functions()
const socket = io('http://localhost:1234')
const canvas = f.qs('#myCanvas')
const context = canvas.getContext('2d');
const a=()=>document.body.offsetHeight*0.65
socket.on('ben',id=>ben.id=id)
var tuslar = {}
var araba = {}
var oyun = { surtunme:0.3 }
document.onkeydown=e=>tuslar[e.key]=true
document.onkeyup=e=>tuslar[e.key]=false

const animate=()=>{
  guncelle(araba)
  requestAnimationFrame(animate)
}

const baslat=r=>{
  araba.renk=r
  f.gid('secim').style.display='none'
  araba = {
    aci:0,
    vites:1,
    hizlanma:0.5,
    maximumHiz:3,
    frenGucu:0.1,
    motorFreniGucu:0.2,
    vitesSeviyeleri:{
      "1":{
        motorFreniGucu:0.2,
        hizlanma:0.5,
        maximumHiz:3,
        istopSiniri:7
      },
      "2":{
        motorFreniGucu:0.35,
        hizlanma:0.4,
        maximumHiz:6,
        istopSiniri:11
      },
      "3":{
        motorFreniGucu:0.4,
        hizlanma:0.3,
        maximumHiz:10,
        istopSiniri:20
      },
      "4":{
        motorFreniGucu:0.55,
        hizlanma:0.25,
        maximumHiz:15,
        istopSiniri:35
      },
      "5":{
        motorFreniGucu:0.7,
        hizlanma:0.15,
        maximumHiz:25,
        istopSiniri:70
      }
    },
    hareket:()=>{
      const { 'ArrowUp':ileri, 'ArrowDown':geri, 'ArrowLeft':left, 'ArrowRight':sag,'Shift':va, 'Control':vb } = tuslar
    },
    direncleriUygula:()=>{
      const fren = tuslar[" "]
    },
    vitesKontrol:()=>{
      const { 'Shift':arttir, 'Control':azalt } = tuslar
    },
  }
  animate()
}

const guncelle=(el)=>{
  el.hareket()
  el.direncleriUygula()
  el.vitesKontrol()
}

const ciz=(el)=>{
  // cizme Kodu
}