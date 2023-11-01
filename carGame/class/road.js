class Road{
  constructor(x,width,laneCount=5){
    this.infinity = 1024*1024
    this.f = new Functions()

    this.laneCount = laneCount
    this.width = width
    this.x = x

    this.left = x-this.width/2
    this.right = x+this.width/2

    this.top = -this.infinity
    this.bottom = this.infinity
    
    this.laneCenters = []

    const topLeft = { x:this.left, y:this.top }
    const topRight = { x:this.right, y:this.top }
    const bottomLeft = { x:this.left, y:this.bottom }
    const bottomRight = { x:this.right, y:this.bottom }

    this.borders = [ [topLeft,bottomLeft], [topRight,bottomRight] ]
  }


  getLaneCenter=laneIndex=>this.left+(this.width/this.laneCount)/2 + (Math.min(laneIndex,this.laneCount-1)*(this.width/this.laneCount))

  draw(context){
    var centerOfTheLanes = []
    context.lineWidth=5
    context.strokeStyle="yellow"
    for (let i = 1; i < this.laneCount; i++) {
      const x = this.f.lerp(this.left,this.right,i/this.laneCount)
      context.setLineDash([40,20])
      centerOfTheLanes.push(this.getLaneCenter(i))
      context.beginPath()
      context.moveTo(x,this.top)
      context.lineTo(x,this.bottom)
      context.stroke()
    }

    context.setLineDash([])
    this.borders.forEach(border=>{
      context.beginPath()
      context.moveTo(border[0].x,border[0].y)
      context.lineTo(border[1].x,border[1].y)
      context.stroke()
    })
    this.laneCenters = centerOfTheLanes
  }
}