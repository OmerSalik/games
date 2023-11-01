const f = new Functions()
const canvas = f.gid('myCanvas')
const body = f.dq('body')

var context, canvasWidth, canvasHeight, car, road
context = canvas.getContext("2d")
// canvasWidth = document.body.offsetWidth*0.8
canvasWidth = 450
canvas.width = canvasWidth
canvasHeight = document.body.offsetHeight*0.99

road = new Road(canvasWidth/2,canvasWidth*0.90)
car = new Car(road.getLaneCenter(2),canvasHeight/2,30,60,'KEYS','blue')

var traffic = [
  // new Car(road.getLaneCenter(2),canvasHeight/2,30,60,'PUPPET','red')
]

function addCar(){
  var cars = []
  const carCount = road.laneCenters.length
  // while (cars.length<carCount) {
  while (true){
    const rs = f.rs(0,carCount+1)
    const roadCenter = road.getLaneCenter(rs)
    if(!cars.includes(roadCenter))cars.push(roadCenter)
    if(cars.length>=carCount){
      return cars
    }
  }
}

const carRow = 10

async function setTraffic(){
  road.draw(context)
  for (let i = 0; i < carRow; i++) {
    const cars = addCar()
    cars.forEach(row=>{
      const newCar = new Car(row,canvasHeight/3-60*(6.5*i),50,90,'PUPPET','red')
      traffic.push(newCar)
    })
  }
}

const imLost=()=>car.lost()
function animate() {
  for (let i = 0; i < traffic.length; i++) traffic[i].update(road.borders)
  car.update(road.borders,traffic)
  // canvas.width = document.body.offsetWidth*0.8
  canvas.height = document.body.offsetHeight*0.99
  context.save()
  context.translate(0, -car.y+canvas.height*0.7);
  road.draw(context)
  for (let i = 0; i < traffic.length; i++) traffic[i].draw(context)
  car.draw(context)
  context.restore()
  requestAnimationFrame(animate)
}

setTraffic()
animate()

document.onkeypress=(e)=>{
  if(e.key.toLocaleLowerCase()=="q")car.lost()
  if(e.key.toLocaleLowerCase()=="e")car.car.angle=0
}