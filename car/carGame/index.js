const f = new Functions()
const canvas = f.gid('myCanvas')
const body = f.dq('body')

var context, canvasWidth, canvasHeight, car, road
context = canvas.getContext("2d")
// canvasWidth = document.body.offsetWidth*0.8
canvasWidth = 450
canvas.width = canvasWidth
canvasHeight = document.body.offsetHeight*0.99

road = new Road(canvasWidth/2,canvasWidth*0.95)
car = new Car(road.getLaneCenter(2),canvasHeight/2,30,60)

const imLost=()=>car.lost()
function animate() {
  car.update(road.borders)
  // canvas.width = document.body.offsetWidth*0.8
  canvas.height = document.body.offsetHeight*0.99
  context.save()
  context.translate(0, -car.y+canvas.height*0.7);
  road.draw(context)
  car.draw(context)
  context.restore()
  requestAnimationFrame(animate)
}

animate()

document.onkeypress=(e)=>e.key.toLocaleLowerCase()=="q"?car.lost():false