class Car {
  constructor(x, y, w, h, t, c='black') {
    this.fx = x
    this.fy = y
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.t = t
    this.c = c
    this.object = 'none'

    this.doItForOnce = { "log":true, "gameOver":true }
    
    this.f = new Functions()
    t=='KEYS'?this.controls = new Controls():this.controls = { keys:{ ArrowUp:true } }
    this.sensor = new Sensor(this)

    this.car = {
      "gear": t=='KEYS'?1:2,
      "angle": 0,
      "speed": 0,
      "con": true,
      "MaxSpeed": t=='KEYS'?2:5,
      "gearTime": 1,
      "damaged": false,
      "acceleration": 0.3,
      "brakeResistance": 0.5,
      "engineBrakeResistance": 0.5,
      "steeringWheelSoftness": 0.007,
      "gearLevels": { "1":2, "2":6, "3":10, "4":15, "5":25, "6":1000 }
    }
    this.gearTime=0.02
    this.game = { "friction": 0.2 }
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

    let p=false,pway='none'
    for (let i = 0; i < this.sensor.ray.readings.length; i++) {
      const reading = this.sensor.ray.readings[i]
      if(reading) {
        p=true
        const lowerCondition = i<this.sensor.ray.readings.length/2
        const equalCondition = i==this.sensor.ray.readings.length/2
        const greaterCondition = i>this.sensor.ray.readings.length/2
        if(lowerCondition) pway='low'
        else if(equalCondition) pway='equla'
        else if(greaterCondition) pway='great'
      }
    }
    if(!this.car.damaged){
      if(forward && !backward) this.car.speed-=this.car.acceleration
      else if(!forward && backward) if(this.car.speed+this.car.acceleration>=-this.car.MaxSpeed/2) this.car.speed+=this.car.acceleration
    }


    if(this.car.speed>1||this.car.speed<-1){
      if(right && !left && this.object!='right') this.car.angle+=this.car.steeringWheelSoftness * (this.car.speed/4)
      else if(left && !right && this.object!='left') this.car.angle-=this.car.steeringWheelSoftness * (this.car.speed/4)
    }else{
      if(right && !left && this.object!='right') this.car.angle+=this.car.steeringWheelSoftness * (this.car.speed/4)
      else if(left && !right && this.object!='left') this.car.angle-=this.car.steeringWheelSoftness * (this.car.speed/4)
    }

    if(this.car.speed > this.car.MaxSpeed/2) this.car.speed-this.car.engineBrakeResistance>=this.car.MaxSpeed/2 ? this.car.speed -= this.car.engineBrakeResistance : this.car.speed=this.car.MaxSpeed/2
    else if(this.car.speed < -this.car.MaxSpeed) this.car.speed+this.car.engineBrakeResistance<=-this.car.MaxSpeed?this.car.speed+=this.car.engineBrakeResistance:this.car.speed=-this.car.MaxSpeed

    this.#useBrake()
    this.#useFriction()
    
    this.y += Math.cos(this.car.angle) * this.car.speed
    this.x+=Math.sin(this.car.angle)*this.car.speed

    const speed = this.f.gid('speed')
    const angle = this.f.gid('angle')
    speed ? speed.innerHTML=this.car.speed.toFixed(2) : false
    if(speed) this.car.speed==0 ? speed.innerHTML='0' : speed.innerHTML=this.car.speed.toFixed(2)
    angle ? angle.innerHTML=this.car.angle.toFixed(2) : false
    if(angle) this.car.angle==0 ? angle.innerHTML='0' : angle.innerHTML=this.car.angle.toFixed(2)
  }
  #createPolygon(){
    const points=[]
    const rad=Math.hypot(this.w,this.h)/2
    const alpha=Math.atan2(this.w,this.h)
    points.push({ x:this.x-Math.sin(this.car.angle-alpha)*rad, y:this.y-Math.cos(this.car.angle-alpha)*rad })
    points.push({ x:this.x-Math.sin(this.car.angle+alpha)*rad, y:this.y-Math.cos(this.car.angle+alpha)*rad })
    points.push({ x:this.x-Math.sin(Math.PI+this.car.angle-alpha)*rad, y:this.y-Math.cos(Math.PI+this.car.angle-alpha)*rad })
    points.push({ x:this.x-Math.sin(Math.PI+this.car.angle+alpha)*rad, y:this.y-Math.cos(Math.PI+this.car.angle+alpha)*rad })
    this.polygon=points
  }
  #isDamaged(roadBorders){
    const poly1=this.polygon
    for (let k = 0; k < roadBorders.length; k++) {
      const poly2=roadBorders[k]
      for (let i = 0; i < poly1.length; i++) for (let j = 0; j < poly2.length; j++) if(this.f.getIntersection( poly1[i], i+1==poly1.length?poly1[0]:poly1[i+1], poly2[j], j+1==poly2.length?poly2[0]:poly2[j+1] )) {this.car.con=false;return true}
    }

    const cars = this.tr
    cars.forEach(car=>{
      const poly2 = car.polygon
      for (let i = 0; i < poly1.length; i++){
        for (let j = 0; j < poly2.length; j++){
          const touch = this.f.getIntersection( poly1[i], i+1==poly1.length?poly1[0]:poly1[i+1], poly2[j], j+1==poly2.length?poly2[0]:poly2[j+1] )
          if(touch) {
            this.car.damaged=true
            this.car.con=false
            return true
          }
        }
      }
    })
    
    const { "ArrowUp":forward, "ArrowDown":backward } = this.controls.keys
    const { gear, speed } = this.car
    const c1 = speed<1
    const c2 = speed>-1
    const c3 = gear<=2
    if(((c1&&c2&&c3) || (speed>1 || speed<-1))&&!this.car.damaged){
      if(forward && !backward) this.car.speed-=this.car.acceleration
      else if(!forward && backward) if(this.car.speed+this.car.acceleration>=-this.car.MaxSpeed/2) this.car.speed+=this.car.acceleration
      
      if(gear<4 && speed<0 && speed<-10) return true
      else if(gear<4 && speed>0 && speed>10) return true
      else if(gear<5 && speed<0 && speed<-35) return true
      else if(gear<5 && speed>0 && speed>35) return true
    }else{
      if(forward || backward) return true
    }
    return false
  }
  #gameOver(){
    const el = this.f.gid('gameOver')
    if(el) el.style.display='flex'
  }
  update(roadBorders,tr){
    this.tr = tr
    this.car.damaged=this.car.con==false?true:this.car.damaged
    if(this.car.con){
      this.#move()
      this.#createPolygon()
      !this.car.damaged&&this.t=='KEYS'?this.car.damaged = this.#isDamaged(roadBorders):false
    }
    // this.t=='KEYS'?this.sensor.update(roadBorders):false
  }
  draw(context) {
    if(this.polygon){
      context.fillStyle=this.car.damaged?'rgb(225,225,225)':this.c;
      context.beginPath()
      context.moveTo(this.polygon[0].x,this.polygon[0].y)
      for (let i=1;i<this.polygon.length;i++) {
        const point = this.polygon[i]
        context.lineTo(this.polygon[i].x,this.polygon[i].y)
      }
      context.fill();
    }
    this.sensor.draw(context)
  }
}