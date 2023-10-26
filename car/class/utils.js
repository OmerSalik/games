class Functions{
  constructor(){}
  mf=t=>Math.floor(t)
  log=t=>console.log(t)
  table=t=>console.table(t)
  dq=t=>document.querySelector(t)
  gid=t=>document.getElementById(t)
  dqa=t=>document.querySelectorAll(t)
  rs=(min,max)=>this.mf(Math.random()*(max-min))+min
  lerp=(a,b,c)=>a+(b-a)*c
  getIntersection=(a,b,c,d)=>this.sum([a,b,c,d])
  sum=t=>{
    var sum = 0
    if(Array.isArray(t)){
      t.forEach(el=>{
        if(typeof(el)=='object'){
          Object.values(el).forEach(value=>{
            typeof(value)=="number"?sum+=value:false
          })
        }else{
          sum+=el
        }
      })
    }
    else if(typeof(t)=='object'){
      console.log('öyle')
      t.forEach(el=>{
        Object.values(el).forEach(value=>{
          typeof(value)=='number'?true:false
        })
      })
    }else{
      console.log('değil')
    }
    return sum
  }
}