var ben = {}
const f = new Functions()
const socket = io('http://172.16.16.203:1331/')
const canvas = f.qs('#myCanvas')
const context = canvas.getContext('2d');
socket.on('ben',id=>ben.id=id)
var tuslar = {}
var araba = {}
var oyun = { surtunme:0.2 }
document.onkeydown=e=>tuslar[e.key]=true
document.onkeyup=e=>tuslar[e.key]=false
const ozellikler = f.gid('mainContainerNavbar')
const vitesEl = f.gid('vites')
const vitesSayacisEl = f.gid('vitesSayaci')
const hizEl = f.gid('hiz')
var canvasWidth = 400
var canvasHeight = document.body.offsetHeight*0.65
var cizgiler = []
var arabalar = []

function yolCiz(x,width,seritSayisi){
  context.beginPath()
  context.strokeStyle='white';
  const sag = x+width/2
  const sol = x-width/2
  const ust = -canvasHeight*1
  const alt = canvasHeight-10
  cizgiler.push([{x:sag,y:ust},{x:sag,y:alt}],[{x:sol,y:ust},{x:sol,y:alt}],[{x:sol,y:alt},{x:sag,y:alt}],[{x:sol,y:ust,kazanc:true},{x:sag,y:ust,kazanc:true}])
  for (let i = 1; i < cizgiler.length-1; i++) {
    const cizgi = cizgiler[i]
    context.moveTo(cizgi[0].x,cizgi[0].y)
    context.lineTo(cizgi[1].x,cizgi[1].y)
  }
  context.stroke()
  context.beginPath()
  context.setLineDash([40,20])
  for (let i = 0; i < seritSayisi; i++) {
    if(i<seritSayisi-1){
      const a = ortaAl(i)
      const c = a+(ortaAl(i+1)-a)/2
      context.moveTo(c, ust);
      context.lineTo(c, alt);
    }
  }
  context.stroke()
  context.beginPath()
  context.setLineDash([])
  context.strokeStyle='black'
  context.lineWidth=5
  const sonCizgi=cizgiler[cizgiler.length-1]
  context.moveTo(sonCizgi[0].x,sonCizgi[0].y)
  context.lineTo(sonCizgi[1].x,sonCizgi[1].y)
  function ortaAl(t) {
    return sol+(width/seritSayisi)/2+t*(width/seritSayisi)
  }
  context.stroke()
}
window.onload=()=>{
  canvas.width=400
  canvas.height=canvasHeight
}
const animate=()=>{
  canvasWidth = 400
  canvasHeight = document.body.offsetHeight*0.65
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  canvas.width=400
  canvas.height=canvasHeight
  poligonOlustur(araba)
  if(!araba.hasar) guncelle(araba)
  // context.translate(-araba.x+canvas.width/2, -araba.y+canvas.height/2);
  context.translate(0, -araba.y+canvas.height/2)
  yolCiz(canvasWidth/2,canvasWidth*0.9,5)
  if(arabalar.length>0)arabalar.forEach(digerAraba=>ciz(digerAraba))
  socket.emit('arabaGuncelle',{ id:ben.id, araba:araba })
  requestAnimationFrame(animate)
}
const baslat=r=>{
  f.gid('secim').style.display='none'
  araba = {
    x:canvasWidth/2, 
    y:canvasHeight/2, 
    w:30, 
    h:60, 
    renk:r, 
    hasar:false,
    aci:0, 
    hiz:0, 
    vites:1, 
    hizlanma:0.5, 
    vitesSuresi:0.5, 
    direksiyonHassasiyeti:0.003, 
    maximumHiz:3, 
    motorFreniGucu:0.2, 
    frenGucu:0.1, 
    poligon:[], 
    vitesSeviyeleri:{ 
      "-1":{ 
        motorFreniGucu:-0.1, 
        hizlanma:-0.25, 
        maximumHiz:8, 
        vitesSayaci:0.2, 
        istopSiniri:-7, 
        isim:"R" 
      }, 
      "0":{ 
        motorFreniGucu:0, 
        hizlanma:0, 
        maximumHiz:999999, 
        istopSiniri:999999, 
        vitesSayaci:0.1, 
        isim:"N" 
      }, 
      "1":{ 
        motorFreniGucu:0.2, 
        hizlanma:0.5, 
        maximumHiz:3, 
        istopSiniri:7, 
        vitesSayaci:0.5, 
        isim:"1" 
      }, 
      "2":{ 
        motorFreniGucu:0.35, 
        hizlanma:0.4, 
        maximumHiz:6, 
        istopSiniri:11, 
        vitesSayaci:0.8, 
        isim:"2" 
      }, 
      "3":{ 
        motorFreniGucu:0.4, 
        hizlanma:0.3, 
        maximumHiz:10, 
        vitesSayaci:0.7, 
        istopSiniri:20, 
        isim:"3" 
      }, 
      "4":{ 
        motorFreniGucu:0.55, 
        hizlanma:0.25, 
        maximumHiz:15, 
        istopSiniri:35, 
        vitesSayaci:0.7, 
        isim:"4" 
      }, 
      "5":{ 
        motorFreniGucu:0.7, 
        hizlanma:0.21, 
        maximumHiz:25, 
        istopSiniri:70, 
        vitesSayaci:0.7, 
        isim:"5" 
      }
    },
  }
  socket.emit('arabaEkle',{ id:ben.id, araba:araba })
  animate()
}
const guncelle=el=>{
  el.hasar=hasarKontrol(el)
  vitesKontrol(el)
  hareket(el)
  yazdir(el)
}
const hasarKontrol=el=>{
  if(cizgiler.length>0&&el.poligon.length>0)for(let k=0;k<cizgiler.length;k++)for(let i=0;i<el.poligon.length;i++)for(let j=0;j<cizgiler[k].length;j++)if(f.getIntersection(el.poligon[i],i+1==el.poligon.length?el.poligon[0]:el.poligon[i+1],cizgiler[k][j],j+1==cizgiler[k].length?cizgiler[k][0]:cizgiler[k][j+1])){
    const el = j+1==cizgiler[k].length?cizgiler[k][0]:cizgiler[k][j+1]
    if(el.kazanc) socket.emit('kazandim',{ id:ben.id, araba:araba })
    return true
  }
  return false
}
const yazdir=el=>{
  vitesEl.innerHTML=el.vitesSeviyeleri[el.vites].isim
  hizEl.innerHTML=el.hiz==0?'0.00':el.hiz.toFixed(2)
  vitesSayacisEl.innerHTML=el.vitesSuresi.toFixed(2)
}
const hareket=el=>{
  const { ' ':fren, 'ArrowUp':ileri,'ArrowDown':geri, 'ArrowLeft':sol, 'ArrowRight':sag,'Shift':va, 'Control':vb } = tuslar
  if(ileri||(el.vites=="-1"&&geri)){
    el.hiz+=el.hizlanma
  }
  if(el.hiz>0&&el.hiz>el.maximumHiz)el.hiz=el.maximumHiz
  else if(el.hiz<0&&el.hiz<-el.maximumHiz/2)el.hiz=-el.maximumHiz/2
  if(sag&&!sol) el.aci-=el.direksiyonHassasiyeti*el.hiz
  if(!sag&&sol) el.aci+=el.direksiyonHassasiyeti*el.hiz

  if(el.hiz!=0) {
    if(fren){
      if(el.hiz>0)el.hiz-el.frenGucu>=0?el.hiz-=el.frenGucu:el.hiz=0
      if(el.hiz<0)el.hiz+el.frenGucu<=0?el.hiz+=el.frenGucu:el.hiz=0
    }
    if(el.hiz>0)el.hiz-oyun.surtunme>=0?el.hiz-=oyun.surtunme:el.hiz=0
    if(el.hiz<0)el.hiz+oyun.surtunme<=0?el.hiz+=oyun.surtunme:el.hiz=0
  }

  el.y-=Math.cos(el.aci)*el.hiz
  el.x-=Math.sin(el.aci)*el.hiz
}
const vitesKontrol=el=>{
  const { 'Shift':arttir, 'Control':azalt } = tuslar
  const sure = 0.01
  if(el.vitesSuresi!=0 && el.vitesSuresi>0)el.vitesSuresi-sure>=0?el.vitesSuresi-=sure:el.vitesSuresi=0
  else{
    if(arttir && !azalt){
      const yeniVites = el.vites+1
      if(el.vitesSeviyeleri[yeniVites]) {
        el.vites=yeniVites
        const vites = el.vitesSeviyeleri[el.vites]
        el.vitesSuresi=vites.vitesSayaci
        el.hizlanma = vites.hizlanma
        el.istopSiniri = vites.istopSiniri
        el.maximumHiz = vites.maximumHiz
        el.motorFreniGucu = vites.motorFreniGucu
      }
    }else if(!arttir && azalt){
      const yeniVites = el.vites-1
      if(el.vitesSeviyeleri[yeniVites]) {
        el.vites=yeniVites
        const vites = el.vitesSeviyeleri[el.vites]
        el.vitesSuresi=vites.vitesSayaci
        el.hizlanma = vites.hizlanma
        el.istopSiniri = vites.istopSiniri
        el.maximumHiz = vites.maximumHiz
        el.motorFreniGucu = vites.motorFreniGucu
      }
    }
  }
}
const ciz=el=>{
  context.beginPath();
  context.fillStyle = el.hasar?'gray':el.renk
  context.strokeStyle='transparent'
  context.lineWidth = 2
  for (let i = 0; i < el.poligon.length; i++)context.lineTo(el.poligon[i].x, el.poligon[i].y)
  context.closePath()
  context.stroke()
  context.fill(); 
}
const poligonOlustur=()=>{
  const el = araba
  const points=[]
  const rad=Math.hypot(el.w,el.h)/2
  const alfa=Math.atan2(el.w,el.h)
  points.push({ x:el.x-Math.sin(el.aci-alfa)*rad, y:el.y-Math.cos(el.aci-alfa)*rad })
  points.push({ x:el.x-Math.sin(el.aci+alfa)*rad, y:el.y-Math.cos(el.aci+alfa)*rad })
  points.push({ x:el.x-Math.sin(Math.PI+el.aci-alfa)*rad, y:el.y-Math.cos(Math.PI+el.aci-alfa)*rad })
  points.push({ x:el.x-Math.sin(Math.PI+el.aci+alfa)*rad, y:el.y-Math.cos(Math.PI+el.aci+alfa)*rad })
  araba.poligon=points
}
/*
const draw=(context)=>{
  var centerOfTheLanes = []
  context.lineWidth=5
  context.strokeStyle="yellow"
  for (let i = 1; i < this.laneCount; i++) {
    const x = this.f.lerp(this.left,this.right,i/this.laneCount)
    context.setLineDash([40,20])
    centerOfTheLanes.push(this.getLaneCenter(i))
    context.beginPath()
    context.moveTo(x,this.top)
    context.lineTo(x,this.bottom)
    context.stroke()
  }

  context.setLineDash([])
  this.borders.forEach(border=>{
    context.beginPath()
    context.moveTo(border[0].x,border[0].y)
    context.lineTo(border[1].x,border[1].y)
    context.stroke()
  })
  this.laneCenters = centerOfTheLanes
}
*/
socket.on('oyunBitti',kazanan=>{
  araba.hasar=true
  alert('oyun bitti kazanan arabanın Rengi : ' + kazanan)
})
socket.on('arabalar',digerArabalar=>arabalar=digerArabalar)
socket.on('log',t=>console.log(t))