class Functions{
  constructor(){}
  mf=t=>Math.floor(t)
  log=t=>console.log(t)
  table=t=>console.table(t)
  clear=()=>console.clear()
  qs=t=>document.querySelector(t)
  gid=t=>document.getElementById(t)
  qsa=t=>document.querySelectorAll(t)
  hidden=t=>document.getElementById(t).hidden=!document.getElementById(t).hidden
  rs=(min,max)=>this.mf(Math.random()*(max-min))+min
  lerp=(a,b,c)=>a+(b-a)*c
  getIntersection=(A,B,C,D)=>{
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x)
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y)
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y)
    if(bottom!=0){
      const t=tTop/bottom
      const u=uTop/bottom
      if(t>=0&&t<=1&&u>=0&&u<=1) return{ x:this.lerp(A.x,B.x,t), y:this.lerp(A.y,B.y,t), offsetT:t, offsetU:u }
    }
    return null;
  }
}

const f=new Functions()
const socket=io('http://172.16.16.203:1331/')

// Elementler
const canvas=f.qs('#myCanvas')
const arabaSecim = f.qs('#arabaSecim')
const vitesEl = f.qs('#vites')
const hizEl = f.qs('#hiz')

const context = canvas.getContext('2d')
var istek = { islem:'', veri:{} }
var araba='yok'
var arabalar=[]
var tuslar=[]

const baslat=(resim)=>{
  istek.islem='banaArabaVer'
  istek.veri={ canvasWidth:canvas.width, canvasHeight:canvas.height, resim:resim, cizgilerimGozuksun:f.qs('#cizgilerimGozuksun').checked }
  socket.emit('islem', istek)
  displaDegis(arabaSecim,'flex')
}
function animasyon() {
  canvas.width=400
  canvas.height=document.body.offsetHeight*0.7
  if(araba!='yok'){
    guncelle(araba)
    istek.islem='arabaGuncelle'
    istek.veri={ araba:araba }
    socket.emit('islem',istek)
  }
  if(arabalar.length>0) {
    arabalar.forEach(ar=>ciz(ar))
  }
  requestAnimationFrame(animasyon)
}
const ciz=(el,tip='araba')=>{
  el.poligon=poligonOlustur(el)
  if(tip=='araba'){
    const resim = new Image();
    resim.src = el.resim
    context.beginPath()
    context.translate(el.x, el.y)
    context.rotate(el.aci)
    context.drawImage(resim, -el.w/2, -el.h/2, el.w, el.h);
    context.moveTo(el.poligon[0].x-el.x, el.poligon[0].y-el.y)
    for (let i = 0; i < el.poligon.length; i++)
      context.lineTo(
      el.poligon[i==el.poligon.length-1?0:i+1].x-el.x,
      el.poligon[i==el.poligon.length-1?0:i+1].y-el.y
    )
    el.cizgilerGozuksun?context.stroke():false
  }
}
const guncelle=el=>{
  hareket(el)
  vitesKontrol(el)
  vitesEl.innerHTML = el.vitesSeviyeleri[el.vites].isim
  hizEl.innerHTML = el.hiz
}
var sayac=0
const say=()=>{
  sayac-=0.1
  if(sayac>0) setTimeout(()=>{say()},100)
}
const vitesKontrol=async(el)=>{
  const { 'Shift':arttir, 'Control':azalt } = tuslar
  if(arttir||azalt){
    if(el.hiz>=el.vitesHizSiniri&&sayac<=0){
      sayac=0.3
      say()
      const a = arttir?1:-1
      const yeniVites = Number(el.vites)+a
      if(el.vitesSeviyeleri[yeniVites]) el.vites=yeniVites
    }
  }
  const vitesOzellikleri = el.vitesSeviyeleri[el.vites]
  el.hizlanma = vitesOzellikleri.hizlanma
  el.maximumHiz = vitesOzellikleri.maximumHiz
  el.vitesHizSiniri = vitesOzellikleri.vitesHizSiniri
  el.motorFreniGucu = vitesOzellikleri.motorFreniGucu
  el.istopSiniri = vitesOzellikleri.istopSiniri
}
const hareket=el=>{
  const { ' ':fren, 'ArrowUp':ileri, 'ArrowDown':geri, 'ArrowRight':sag, 'ArrowLeft':sol } = tuslar
}
const poligonOlustur=(el)=>{
  const points=[]
  const rad=Math.hypot(el.w,el.h)/2
  const alfa=Math.atan2(el.w,el.h)
  points.push({ x:el.x-Math.sin(el.aci-alfa)*rad,y:el.y-Math.cos(el.aci-alfa)*rad })
  points.push({ x:el.x-Math.sin(el.aci+alfa)*rad,y:el.y-Math.cos(el.aci+alfa)*rad })
  points.push({ x:el.x-Math.sin(Math.PI+el.aci-alfa)*rad,y:el.y-Math.cos(Math.PI+el.aci-alfa)*rad })
  points.push({ x:el.x-Math.sin(Math.PI+el.aci+alfa)*rad,y:el.y-Math.cos(Math.PI+el.aci+alfa)*rad })
  return points
}
const displaDegis=(el,dtype)=>el.style.display=el.style.display=='none'?dtype:'none'
// socket.on işlemleri
socket.on('log',t=>f.log(t))
socket.on('seninAraban',seninAraban=>araba=seninAraban)
socket.on('arabalar',tumArabalar=>{
  arabalar=tumArabalar.map(el=>el.araba)
})

const bekle=sure=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve(true)},sure)
  })
}

document.onkeydown=e=>tuslar[e.key]=true
document.onkeyup=e=>tuslar[e.key]=false
animasyon()