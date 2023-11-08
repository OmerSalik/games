const express = require('express')
const http = require('http')
const fs = require('fs');
const dosya = 'liste.txt';
const socketIo = require('socket.io')
const cors = { cors: {/*origin: "http://example.com"*/} }
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, cors);
const port = 1331
const w = 30 // Araba Genişliği => width
const h = 60 // Araba Uzunluğu  => height

var arabalar=[]

const arabaModel = {
  x: 'number',
  y: 'number',
  w: 'number',
  h: 'number',
  cizgilerGozuksun: 'boolean',
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
  vitesSeviyeleri: 'object'
}
const modelKontrol=(data, model)=>{
  if(Object.keys(data).length == Object.keys(model).length){
    for (const key in model) {
      if (typeof data[key] !== model[key]) {
        return false;
      }
    }
  }else {
    return false
  }
  return true;
}
const arabaEkle=(cw,ch,link,cg,id)=>{
  var araba = {
    x: cw/2,
    y: ch-35,
    w: 30,
    h: 60,
    cizgilerGozuksun: cg,
    resim: 'resimler/'+link,
    hasar: true,
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
    vitesSeviyeleri: {
      "-1":{
        isim:"R",
        hizlanma:-0.3,
        maximumHiz:-2.5,
        vitesHizSiniri:-0.5,
        motorFreniGucu:1,
        istopSiniri:0.5
      },
      "0":{
        isim:"N",
        hizlanma:0,
        maximumHiz:999,
        vitesHizSiniri:0,
        motorFreniGucu:0,
        istopSiniri:999
      },
      "1":{
        isim:"1",
        hizlanma:0.5,
        maximumHiz:2.5,
        vitesHizSiniri:0.5,
        motorFreniGucu:0.5,
        istopSiniri:5.1
      },
      "2":{
        isim:"2",
        hizlanma:0.45,
        maximumHiz:5,
        vitesHizSiniri:4,
        motorFreniGucu:0.4,
        istopSiniri:7
      }
    }
  }
  arabalar.push( { id:id, araba:araba } )
  io.to(id).emit('seninAraban',araba)
  io.emit('arabalar',arabalar)
}
app.get('/',(req, res)=>res.status(200).send('Bu biçimde Kullanılmıyor >:D'))

io.on('connection',socket=>{
  const sid = socket.id
  const karaListeyeEkle=(ip)=>{ fs.appendFile('./'+dosya, ip,err=>console.log(err?'hata oluştu':'Kara listeye Eklendi')); }
  socket.on('log',()=>{
    console.log(arabalar[0].araba.y)
  })
  socket.on('islem',obj=>{
    const { islem, veri } = obj
    const arabaIndex = arabalar.findIndex(el=>el.id==sid)
    if(islem=='banaArabaVer'){
      const { canvasWidth, canvasHeight, resim, cizgilerimGozuksun } = veri
      arabaIndex<0?arabaEkle(canvasWidth,canvasHeight,resim,cizgilerimGozuksun,sid):io.to(sid).emit('log','Senin Zaten Bir Araban Var')
    }else if (islem=='arabaGuncelle') {
      const { araba } = veri
      const gecerliMi = modelKontrol(araba,arabaModel)
      gecerliMi?arabalar[arabaIndex].araba=araba:karaListeyeEkle(socket.handshake.address)
      io.emit('arabalar',arabalar)
    }
  })

  socket.on('disconnect',()=>{
    arabalar.forEach(ar=>console.log('ar.id = ' + ar.id,ar))
    const arabaIndex = arabalar.findIndex(el=>el.id==socket.id)
    if(arabaIndex>=0) arabalar.splice(arabaIndex,1)
  })
})

server.listen(port,()=>{
  console.log('dineniyor...')
})