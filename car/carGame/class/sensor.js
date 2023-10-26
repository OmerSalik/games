class Sensor{
  constructor(car){
    this.f = new Functions()
    this.car = car
    this.ray={
      "count":4,
      "spread":Math.PI/4,
      "length":this.car.h*2,
      "readings":[],
      "rays":[],
    }
    this.a = true
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
    // let touches = []

    // for (let i = 0; i < roadBorders.length; i++) {
    //   const roadBorder = roadBorders[i]
    //   const touch = this.f.between(ray["start"],ray["end"],roadBorder[0],roadBorder[1])
    //   if(touch) touches.push(touch)
    // }

    // if(touches.length==0) return null
    // // Do it for once
    // if(this.a) this.a=false
  }

  update(roadBorders){
    this.#setRays()
    this.ray.rays.forEach(ray=>{
      this.#getReadings(ray,roadBorders)
    })
  }

  draw(context){
    context.lineWidth=2
    context.strokeStyle='red'
    this.ray.rays.forEach(ray=>{
      context.beginPath()
      context.moveTo(ray.start.x, ray.start.y)
      context.lineTo(ray.end.x, ray.end.y)
      context.stroke()
    })
  }

}