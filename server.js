const express = require('express')
const http = require('http')
const soketAyarlari = {
  cors: {
    origin: "http://172.16.16.203:1313",
    methods: ["GET", "POST"]
  }
}
const app = express()
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server, soketAyarlari)
const port = 1331
const w = 30*1.5 // Araba Genişliği => width
const h = 60*1.5 // Araba Uzunluğu  => height
const hw = 1200 // Harita Genişliği => width
const hh = 800 // Harita Uzunluğu  => height
const final = -hh*19 // Harita Uzunluğu  => height
const seritSayisi = 15
var oyunBasladiMi=false
var arabalar=[]
var doluSeritler=[]
const arabaModel = {
  x: 'number',
  y: 'number',
  w: 'number',
  h: 'number',
  resim: 'string',
  hasar: 'boolean',
  aci:'number',
  hiz:'number',
  vites:'number',
  hizlanma:'number',
  vitesHizSiniri:'number',
  direksiyonHassasiyeti:'number',
  maximumHiz:'number',
  motorFreniGucu:'number',
  frenGucu:'number',
  poligon: 'object',
  istopSiniri:'number',
  baslangic:'number',
  vitesSeviyeleri: 'object'
}
const modelKontrol=(data, model)=>{
  if(Object.keys(data).length == Object.keys(model).length){
    for (const key in model) if (typeof data[key] !== model[key]) {
      return false
    }
  }else {
    return false
  }
  return true;
}
const harita = {
  haritaBuyuklugu: { w:hw, h:hh },
  baslangicCizgisi:[ { x:0, y:0 }, { x:hw, y:0 } ],
  bitisCizgisi:[ { x:0, y:final }, { x:hw, y:final } ],
  seritSayisi:seritSayisi
}
const arabaEkle=(cw,ch,link,ad,id)=>{
  var araba = {
    x: hw/2,
    y: (-h/2)-5,
    w: w,
    h: h,
    resim: 'resimler/'+link,
    hasar: oyunBasladiMi?false:true,
    aci:0,
    hiz:0,
    vites:0,
    hizlanma:0,
    vitesHizSiniri:-999,
    direksiyonHassasiyeti:0.003,
    maximumHiz:999,
    motorFreniGucu:0,
    frenGucu:0.2,
    poligon: [],
    istopSiniri:999,
    baslangic:-999,
    vitesSeviyeleri: {
      "-1":{
        isim:"R",
        hizlanma:-0.23,
        maximumHiz:-2.5,
        vitesHizSiniri:-0.5,
        motorFreniGucu:1,
        istopSiniri:0.5,
        baslangic:-999
      },
      "0":{
        isim:"N",
        hizlanma:0,
        maximumHiz:999,
        vitesHizSiniri:0,
        motorFreniGucu:0,
        istopSiniri:999,
        baslangic:-999
      },
      "1":{
        isim:"1",
        hizlanma:0.50,
        maximumHiz:2.5,
        vitesHizSiniri:0.5,
        motorFreniGucu:0.5,
        istopSiniri:6,
        baslangic:-0.5
      },
      "2":{
        isim:"2",
        hizlanma:0.30,
        maximumHiz:5,
        vitesHizSiniri:4,
        motorFreniGucu:0.4,
        istopSiniri:10,
        baslangic:-0.1
      },
      "3":{
        isim:"3",
        hizlanma:0.30,
        maximumHiz:9,
        vitesHizSiniri:5.5,
        motorFreniGucu:0.4,
        istopSiniri:14,
        baslangic:0.5
      },
      "4":{
        isim:"Dört",
        hizlanma:0.26,
        maximumHiz:14,
        vitesHizSiniri:10,
        motorFreniGucu:0.3,
        istopSiniri:26,
        baslangic:5
      },
      "5":{
        isim:"5",
        hizlanma:0.22,
        maximumHiz:25,
        vitesHizSiniri:23,
        motorFreniGucu:0.25,
        istopSiniri:35,
        baslangic:8
      },
      "99":{
        isim:"Bitiş",
        hizlanma:0,
        maximumHiz:5,
        vitesHizSiniri:0,
        motorFreniGucu:0.8,
        istopSiniri:0,
        baslangic:-999
      }
    }
  }
  io.emit('harita',harita)
  arabalar.push( { ad:ad, id:id, araba:araba } )
  io.emit('arabalar',arabalar)
  var a = seritSayisi%2==0?seritSayisi/2:(seritSayisi+1)/2
  var b = doluSeritler.length
  while(doluSeritler.includes(a)){
    if(b!=0&&b%2==0)a+=b/2
    else if(b!=0&&b%2==1)a-=(b+1)/2
    b++
  }
  io.to(id).emit('seninAraban',{ id:id, araba:araba, seritin:a})
  doluSeritler.push(a)
  const yarim = seritSayisi%2==0?seritSayisi/2:(seritSayisi-1)/2
  if(arabalar.length>=yarim){
    if(!baslatAktif){
      baslatAktif=true
      baslat(3)
    }
  }
}
var baslatAktif=false

app.use((req, res, next) => {
  const bu='http://http://172.16.16.203'
  const sp=(u,p)=>`${u}:${p}`
  const allowedOrigins = [sp(bu,'1313'),sp(bu,'1314')];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.get('/',(req, res)=>res.status(200).send('Bu biçimde Kullanılmıyor >:D'))
const baslat=(sure)=>{
  if(sure>0){
    io.emit('sayac',sure)
    setTimeout(()=>{baslat(sure)},1000)
  }else {
    baslatAktif=false
    io.emit('baslat')
  }
  sure--
}
io.on('connection',socket=>{
  const sid = socket.id
  const karaListeyeEkle=(ip)=>{
    io.to(socket.id).emit('hatalisin')
    /*fs.appendFile('./'+dosya, ip)*/
  }
  socket.on('islem',obj=>{
    const { islem, veri } = obj
    const arabaIndex = arabalar.findIndex(el=>el.id==sid)
    if(islem=='banaArabaVer'){
      const { canvasWidth, canvasHeight, resim, adim } = veri
      arabaIndex<0?arabaEkle(canvasWidth,canvasHeight,resim,adim,sid):karaListeyeEkle()
    }else if (islem=='arabaGuncelle') {
      const { araba } = veri
      const gecerliMi = modelKontrol(araba,arabaModel)
      if(gecerliMi){
        const arabaIndex = arabalar.findIndex(el=>el.id==sid)
        if(arabaIndex>=0) {
          const sart = Math.abs(arabalar[arabaIndex].araba.y-araba.y)>25||Math.abs(arabalar[arabaIndex].araba.vites-araba.vites)>1
          if(arabalar[arabaIndex].araba.hiz>25.1||sart)karaListeyeEkle()
          arabalar[arabaIndex].araba=araba
        }
      }else karaListeyeEkle(socket.handshake.address)
      io.emit('arabalar',arabalar)
      io.emit('harita',harita)
    }else karaListeyeEkle()
  })
  socket.on('kazandim',araba=>{
    const arabaIndex = arabalar.findIndex(el=>el.id==sid)
    if(arabaIndex>=0){
      io.emit('kazanan',{ resim:arabalar[arabaIndex].araba.resim, ad:arabalar[arabaIndex].ad })
    }
  })
  socket.on('baslat',key=>{
    if(!baslatAktif && key===5061940014){
      baslatAktif=true
      baslat(3)
    }else {
      karaListeyeEkle()
    }
  })
  socket.onAny((event) => {
    if (event!='islem'&&event!='kazandim'&&event!='baslat') karaListeyeEkle()
  });

  socket.on('disconnect',()=>{
    const arabaIndex = arabalar.findIndex(el=>el.id==socket.id)
    if(arabaIndex>=0) {
      doluSeritler.splice(arabaIndex,1)
      arabalar.splice(arabaIndex,1)
    }
    io.emit('arabalar',arabalar)
    io.emit('harita',harita)
  })
})
server.listen(port,console.log('dineniyor...'))