class Car {
  constructor(x, y, w, h) {
    this.fx = x
    this.fy = y
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.object = 'none'

    this.f = new Functions()
    this.controls = new Controls()
    this.sensor = new Sensor(this)

    this.car = {
      "speed": 0,
      "MaxSpeed": 2,
      "brakeResistance": 0.5,
      "acceleration": 0.3,
      "steeringWheelSoftness": 0.007,
      "gear": 1,
      "gearLevels": { "1":2, "2":6, "3":10, "4":15, "5":25, "6":1000 },
      "gearTime": 1,
      "engineBrakeResistance": 0.5,
      "angle": 0
    }
    this.gearTime=0.2
    this.game = { "friction": 0.2 }
    this.developerOptions = {
      "getPropertie":(objectName,propertieName)=>this[objectName][propertieName],
      "setPropertie":(objectName,propertieName,value)=>this[objectName][propertieName]=value,
      "runFunction":(f)=>f(),
      "typeFunction":(f)=>{
        const stringValue = String(f)
        const newFunction = new Function(stringValue)
        newFunction()
      }
    }
  }

  lost(){
    this.x = this.fx
    this.y = this.fy
    this.car.angle = 0
  }
  gearUp(){
    const el = this.f.gid('gear')
    if (this.gearTime <= 0){
      if(this.car.gearLevels[`${this.car.gear+1}`]) {
        this.car.gear+=1
        this.car.MaxSpeed = this.car.gearLevels[`${this.car.gear}`]
        el ? el.innerHTML=this.car.gear : false
        this.gearTime=this.car.gearTime
      }
    }
  }
  gearDown(){
    const el = this.f.gid('gear')
    if (this.gearTime <= 0){
      if(this.car.gearLevels[`${this.car.gear-1}`]) {
        this.car.gear-=1
        this.car.MaxSpeed = this.car.gearLevels[`${this.car.gear}`]
        el ? el.innerHTML=this.car.gear : false
        this.gearTime=this.car.gearTime/3
      }
    }
  }
  setNewGear(gear){
    const el = this.f.gid('gear')
    if(this.car.gearLevels[gear]) {
      this.car.gear=gear
      this.car.MaxSpeed = this.car.gearLevels[`${this.car.gear}`]
      el ? el.innerHTML=this.car.gear : false
      this.gearTime=this.car.gearTime/3
    }
  }
  #setGear(){
    const { "Shift":up, "Control":down } = this.controls.keys
    if (this.gearTime > 0) {
      const newEl = this.f.gid('gearTimer')
      var gearTimeCounter = setInterval(() => {
        if(this.gearTime<=0){
          newEl ? newEl.innerHTML='0 <span style="color:lightgreen;"> Değişebilir </span>' : false
          clearInterval(gearTimeCounter)
        }else{
          this.gearTime -= 0.0001
          newEl ? newEl.innerHTML=this.gearTime.toFixed(4) : false
        }
      }, 1);
    }else{
      this.gearTime=0
      if(up && !down) this.gearUp()
      else if(!up && down) this.gearDown()
    }
    
  }
  #useFriction() {
    if (this.car.speed > 0) this.car.speed - this.game.friction >= 0 ? this.car.speed -= this.game.friction : this.car.speed = 0
    else if (this.car.speed < 0) this.car.speed + this.game.friction <= 0 ? this.car.speed += this.game.friction : this.car.speed = 0
  }
  #useBrake() {
    if(this.controls.keys[" "]){
      if (this.car.speed > 0) this.car.speed - this.car.brakeResistance >= 0 ? this.car.speed -= this.car.brakeResistance : this.car.speed = 0
      else if (this.car.speed < 0) this.car.speed + this.car.brakeResistance <= 0 ? this.car.speed += this.car.brakeResistance : this.car.speed = 0
    }
  }
  #move(){
    this.#setGear()

    const { "ArrowUp":forward, "ArrowDown":backward, "ArrowRight":right, "ArrowLeft":left } = this.controls.keys

    if(forward && !backward) this.car.speed-=this.car.acceleration
    else if(!forward && backward) if(this.car.speed+this.car.acceleration>=-this.car.MaxSpeed/2) this.car.speed+=this.car.acceleration

    if(this.car.speed > this.car.MaxSpeed/2) this.car.speed-this.car.engineBrakeResistance>=this.car.MaxSpeed/2 ? this.car.speed -= this.car.engineBrakeResistance : this.car.speed=this.car.MaxSpeed/2
    else if(this.car.speed < -this.car.MaxSpeed) this.car.speed+this.car.engineBrakeResistance<=-this.car.MaxSpeed?this.car.speed+=this.car.engineBrakeResistance:this.car.speed=-this.car.MaxSpeed

    if(right && !left && this.object!='right') this.car.angle+=this.car.steeringWheelSoftness * (this.car.speed/2)
    else if(left && !right && this.object!='left') this.car.angle-=this.car.steeringWheelSoftness * (this.car.speed/2)

    this.#useBrake()
    this.#useFriction()
    
    this.y += Math.cos(this.car.angle) * this.car.speed
    if(this.object=='none') this.x += Math.sin(this.car.angle) * this.car.speed
    else{
      const number = this.car.steeringWheelSoftness
      if(this.object=='right') {
        this.car.angle+number<=0 ? this.car.angle+=number : this.car.angle=0
        const w = road.borders[1][0].x
        this.x-1>=w ? this.x-=1 : false
      }
      if(this.object=='left') {
        this.car.angle-number<=0 ? this.car.angle-=number : this.car.angle=0
        const w = road.borders[0][0].x
        this.x+1<=w ? this.x+=1 : false
      }
    }

    const speed = this.f.gid('speed')
    const angle = this.f.gid('angle')
    speed ? speed.innerHTML=this.car.speed.toFixed(2) : false
    if(speed) this.car.speed==0 ? speed.innerHTML='0' : speed.innerHTML=this.car.speed.toFixed(2)
    angle ? angle.innerHTML=this.car.angle.toFixed(2) : false
    if(angle) this.car.angle==0 ? angle.innerHTML='0' : angle.innerHTML=this.car.angle.toFixed(2)
  }
  update(roadBorders){
    this.#move()
    this.sensor.update(roadBorders)
  }

  draw(context) {
    this.sensor.draw(context)
    context.save()
    context.translate(this.x, this.y)
    context.rotate(-this.car.angle)
    context.beginPath()
    context.rect(-this.w/2,-this.h/2,this.w,this.h)
    context.fill()
    context.restore()
  }
}