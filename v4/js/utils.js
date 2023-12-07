class Functions {
  constructor() {
    this.timerAktifMi = false
    this.timerName = null
  }
  mf = text => Math.floor(text);
  log = (...argList) => console.log(...argList);
  table = (...content) => console.table(...content);
  clear = () => console.clear();
  qs = value => document.querySelector(value);
  qsa = value => document.querySelectorAll(value);
  dq = value => document.querySelector(value);
  dqa = value => document.querySelectorAll(value);
  dqs = value => document.querySelector(value);
  dqsa = value => document.querySelectorAll(value);
  bekle = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  w = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  gid = id => document.getElementById(id);
  hidden = element => element.hidden=!element.hidden;
  display = (element,d='block') => element.style.display=element.style.display==d?'none':d;
  rs = (min, max) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  lerp = (a, b, c) => a + (b - a) * c;
  createToken() {
    if (window.crypto && window.crypto.getRandomValues) {
      const buffer = new Uint8Array(32);
      window.crypto.getRandomValues(buffer);
      const randomToken = Array.from(buffer, byte => byte.toString(16).padStart(2, '0')).join('');
      return randomToken;
    } else {
      console.error('Tarayıcı rastgele isim oluşturma işlemini desteklemiyor. Bu sebeple a4Goo!3ub8fY atanıyor');
      return 'a4Goo3ub8fY';
    }
  }
  timer = (time = 3, proccess, extraFeatures, isItFirstTime = true) => {
    if(typeof(time) != 'number') time = 3;
    time = Math.floor(time);
    let id = this.timerName, color = 'green', backgroundColor = 'rgba(0,0,0,0.2)';

    if(typeof(extraFeatures) == 'object') {
      id = extraFeatures.id;
      color = extraFeatures.color;
      backgroundColor = extraFeatures.backgroundColor;
    }
    
    if(this.timerAktifMi === false) {
      time += 1;
      id = this.createToken();
      this.timerAktifMi = true;
      this.timerName = id;
    }

    let el = this.gid(this.timerName);

    if(el) {
      if(time == 1) {
        this.timerAktifMi = false;
        el.innerHTML = '';
        el.remove();
        if(proccess && typeof(proccess) == 'function') proccess();
      }
      else {
        time--;
        el.innerHTML = `
        <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background-color:${backgroundColor};
        z-index:999;
        font-size:4em;
        font-weight: bold;
        color: ${color};
        ">${time}</div>
        `
        setTimeout(()=>{this.timer(time, proccess, { id, color, backgroundColor }, false)},1000)
        }
    }else {
      let newElement = document.createElement('div');
      newElement.setAttribute('id', this.timerName);
      document.body.appendChild(newElement);
      this.timer(time, proccess, extraFeatures, false);
      return;
    }
  }
  image = (source) => {
    var image = new Image();
    image.src = source;
    return image;
  }
  getIntersection = (A, B, C, D) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
      const t = tTop / bottom;
      const u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
        x: this.lerp(A.x, B.x, t),
        y: this.lerp(A.y, B.y, t),
        offsetT: t,
        offsetU: u
      }
    }
    return null;
  }
}

const f = new Functions(),
canvas = f.gid('canvas'),
context = canvas.getContext('2d'),
solDiv = f.gid('sol-div'),
sagDiv = f.gid('sag-div'),
skorEl = f.gid('skor'),
mainContainer = f.gid('main-container'),
sayac = f.gid('sayac'),
w = 33,
h = 32,
birimBuyuklugu = 40,
oranti = 100,
baslatButon = f.gid('baslat');

mainContainer.style.display = 'flex';