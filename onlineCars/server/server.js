const express = require('express')
const http = require('http')
const fs = require('fs');
const dosya = 'liste.txt';
const socketIo = require('socket.io');
const cors = { cors: {/*origin: "http://example.com"*/} }
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, cors);
const port = 1331
const w = 30 // Araba Genişliği => width
const h = 60 // Araba Uzunluğu  => height
const hw = 400 // Harita Genişliği => width
const hh = 600 // Harita Uzunluğu  => height
const final = -hh // Harita Uzunluğu  => height
var arabalar=[]
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
    for (const key in model) {
      if (typeof data[key] !== model[key]) {
        socket.emit('log',data)
        socket.emit('log',model)
        return false;
      }
    }
  }else {
    return false
  }
  return true;
}
const arabaEkle=(cw,ch,link,id)=>{
  var araba = {
    x: cw/2,
    y: (-h/2)-5,
    w: w,
    h: h,
    resim: 'resimler/'+link,
    hasar: false,
    aci:0,//3.15,
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
        hizlanma:-0.3,
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
        hizlanma:0.5,
        maximumHiz:2.5,
        vitesHizSiniri:0.5,
        motorFreniGucu:0.5,
        istopSiniri:6,
        baslangic:-0.5
      },
      "2":{
        isim:"2",
        hizlanma:0.45,
        maximumHiz:5,
        vitesHizSiniri:4,
        motorFreniGucu:0.4,
        istopSiniri:10,
        baslangic:-0.1
      },
      "3":{
        isim:"3",
        hizlanma:0.4,
        maximumHiz:9,
        vitesHizSiniri:7,
        motorFreniGucu:0.4,
        istopSiniri:14,
        baslangic:0.5
      },
      "4":{
        isim:"Dört",
        hizlanma:0.35,
        maximumHiz:14,
        vitesHizSiniri:12,
        motorFreniGucu:0.3,
        istopSiniri:26,
        baslangic:5
      },
      "5":{
        isim:"5",
        hizlanma:0.3,
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
  arabalar.push( { id:id, araba:araba } )
  io.to(id).emit('seninAraban',{id:id, araba:araba})
  io.emit('arabalar',arabalar)
  io.emit('harita',harita)
}
const harita = {
  haritaBuyuklugu: { w:hw, h:hh },
  baslangicCizgisi:[ { x:0, y:0 }, { x:hw, y:0 } ],
  bitisCizgisi:[ { x:0, y:final }, { x:hw, y:final } ]
}
app.get('/',(req, res)=>res.status(200).send('Bu biçimde Kullanılmıyor >:D'))

io.on('connection',socket=>{
  const sid = socket.id
  const karaListeyeEkle=(ip)=>{ /*fs.appendFile('./'+dosya, ip)*/ }
  socket.on('islem',obj=>{
    const { islem, veri } = obj
    const arabaIndex = arabalar.findIndex(el=>el.id==sid)
    if(islem=='banaArabaVer'){
      const { canvasWidth, canvasHeight, resim } = veri
      arabaIndex<0?arabaEkle(canvasWidth,canvasHeight,resim,sid):io.to(sid).emit('log','Senin Zaten Bir Araban Var')
    }else if (islem=='arabaGuncelle') {
      const { araba } = veri
      const gecerliMi = modelKontrol(araba,arabaModel)
      gecerliMi?arabalar[arabaIndex].araba=araba:karaListeyeEkle(socket.handshake.address)
      io.emit('arabalar',arabalar)
      io.emit('harita',harita)
    }else if(islem=='logGonder'){
      const { loglar } = veri
      if(loglar.includes('arabalar.length')) io.to(socket.id).emit('log',arabalar.length)
      if(loglar.includes('arabalar.i')) io.to(socket.id).emit('log',arabalar[veri.i])
    }
  })

  socket.on('kazandim',araba=>{
    const arabaIndex = arabalar.findIndex(el=>el.id==sid)
    if(arabaIndex>=0){
      io.emit('kazanan',arabalar[arabaIndex].araba.resim)
    }
  })

  socket.on('disconnect',()=>{
    const arabaIndex = arabalar.findIndex(el=>el.id==socket.id)
    if(arabaIndex>=0) arabalar.splice(arabaIndex,1)
    io.emit('arabalar',arabalar)
    io.emit('harita',harita)
  })
})

server.listen(port,()=>{
  console.log('dineniyor...')
})