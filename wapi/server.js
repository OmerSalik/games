const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const cors = { cors: {} }

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, cors);

const port = 1234;

var cars = []

app.get('/',(req, res)=>{
  res.status(200).send('asdf')
})

io.on('connection', (socket) => {
  function log(t) { socket.emit('log',t) }
  socket.emit('ben',socket.id)
  socket.on('disconnect', ()=>{})
})

server.listen(port,()=>{})

function ipAl(item){
  return item.request.connection.remoteAddress
}


function bul(id,socket) {
  for (let i = 0; i < cars.length; i++) if(cars[i].id==id) return {S:true,index:i}
  return {S:false,index:-1}
}