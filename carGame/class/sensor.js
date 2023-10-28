class Sensor{
  constructor(car){
    this.f = new Functions()
    this.car = car
    this.ray={
      "count":5,
      "spread":Math.PI/4,
      "length":this.car.h*3,
      "readings":[],
      "rays":[],
    }
    this.doItForOnce = true
  }

  #setRays(){
    var newRaysArray = []
    for (let i = 0; i < this.ray.count; i++) {
      const rayAngle = this.f.lerp(this.ray.spread/2,-this.ray.spread/2,this.ray.count==1?0.5:i/(this.ray.count-1))+this.car.car.angle
      const start = { x:this.car.x, y:this.car.y }
      const end = {
        x:this.car.x-Math.sin(rayAngle)*this.ray.length,
        y:this.car.y-Math.cos(rayAngle)*this.ray.length}
      newRaysArray.push({"start":start,"end":end})
    }
    this.ray.rays = newRaysArray
  }

  #getReadings(ray,roadBorders){
    const rayIndex = this.ray.rays.indexOf(ray)
    var touches = []
    var touch=false
    for (let i = 0; i < roadBorders.length; i++) {
      const roadBorder = roadBorders[i]
      const touch = this.f.getIntersection(ray.start,ray.end,roadBorder[0],roadBorder[1])
      touch?touches.push(touch):false
    }
    if(touches.length>0){
      const offsets = touches.map(e=>e.offsetT)
      const min = Math.min(...offsets)
      const el = touches[touches.findIndex(e=>e.offsetT==min)]
      return el
    }
    return null
  }

  update(roadBorders){
    this.#setRays()
    this.ray.readings=[]
    this.ray.rays.forEach(ray=>this.ray.readings.push(this.#getReadings(ray,roadBorders)))
  }

  draw(context){
    const normalColor = 'red'
    const errorColor = 'white'
    this.context = context
    const { readings } = this.ray
    for (let i = 0; i < this.ray.rays.length; i++) {
      const ray = this.ray.rays[i]
      const reading = readings[i]
      if(reading){
        context.beginPath()
        context.lineWidth=2
        context.strokeStyle=normalColor
        context.moveTo(ray.start.x, ray.start.y)
        context.lineTo(reading.x, reading.y)
        context.stroke()
        context.beginPath()
        context.lineWidth=1
        context.strokeStyle=errorColor
        context.moveTo(reading.x, reading.y)
        context.lineTo(ray.end.x, ray.end.y)
        context.stroke()
      }else{
        context.beginPath()
        context.strokeStyle=normalColor
        context.lineWidth=2
        context.moveTo(ray.start.x, ray.start.y)
        context.lineTo(ray.end.x, ray.end.y)
        context.stroke()
      }
    }
    this.ray.rays.forEach(ray=>{
      
    })
  }

}