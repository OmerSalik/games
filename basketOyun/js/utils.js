class Functions {
  constructor() {
    this.isTimerActive = false;
    this.timerName = null;
    this.Variables = {};
  }
  c = () => console.clear();
  clear = () => console.clear();
  mf = number => Math.floor(number);
  lerp = (a, b, c) => a + (b - a) * c;
  gid = id => document.getElementById(id);
  log = (...argList) => console.log(...argList);
  redirect = href => window.location.href = href;
  get = itemName =>localStorage.getItem(itemName);
  table = (...content) => console.table(...content);
  qs = selector => document.querySelector(selector);
  ga = (el, attribute) => el.getAttribute(attribute);
  hidden = element => element.hidden=!element.hidden;
  del = itemName => localStorage.removeItem(itemName);
  qsa = selector => document.querySelectorAll(selector);
  set = (itemName, value) =>localStorage.setItem(itemName, value);
  error = (...errorList) => console.error('\n', ...errorList, '\n');
  rs = (min, max) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  cac = (id = 'canvas') => [this.gid(id),this.gid(id).getContext('2d')];
  sa = (el, attribute, newValue) => el.setAttribute(attribute, newValue);
  bigFirstLetter = text => text[0].toUpperCase() + text.slice(1, text.length);
  w = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  bekle = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  la = (array, fun) => array.forEach(element => this.log(fun ? fun(element) : element));
  display = (element,d='block') => element.style.display=element.style.display==d?'none':d;
  variables = (key, value) => {if(value)this.Variables[key]=value;return this.Variables[key];};
  adv = (selector, event, fun) => this.qsa(selector).forEach(el => el.addEventListener(event, fun));
  mailOrPhone = text => {
    text = text.replace(/\s/g, '');
    let isThisMail = /[^0-9+()]/g.test(text), data;
    if(isThisMail) {
      text = text.toLowerCase();
      if(!text.includes('@')) return { Error: "Mail must contain '@'"}
      else if(text.length < 7 || text.split('@')[0].length < 1 || text.split('@')[1].length < 5) return { Error: "Please enter a valid E-Mail address."}
      else data = text;
    } else {
      text = text.replace('(','').replace(')','');
      if(text[0] == '5' && text.length == 10) data = '+90 (' + text.slice(0, 3) + ') ' + text.slice(3, 6) + ' ' + text.slice(6, 10);
      else if(text[0] == '0' && text.length == 11) data = '+90 (' + text.slice(1, 4) + ') ' + text.slice(4, 7) + ' ' + text.slice(7, 11);
      else if(text[0] == '9' && text.length == 12) data = '+90 (' + text.slice(2, 5) + ') ' + text.slice(5, 8) + ' ' + text.slice(8, 12);
      else if(text[0] == '+' && text.length == 13) data = '+90 (' + text.slice(3, 6) + ') ' + text.slice(6,9) + ' ' + text.slice(9, 13);
    }
    return {mailMi: isThisMail, DATA: data};
  };
  // createToken = len => return 'a4Goo3ub8fY'; // Buffer.from()
  timer = (time = 3, process, extraFeatures, isItFirstTime = true) => {
    if(typeof(time) != 'number') time = 3;
    time = Math.floor(time);
    let id = this.timerName, color = 'green', backgroundColor = 'rgba(0,0,0,.2)';

    if(typeof(extraFeatures) == 'object') {
      id = extraFeatures.id ? extraFeatures.id : id;
      color = extraFeatures.color ? extraFeatures.color : color;
      backgroundColor = extraFeatures.backgroundColor ? extraFeatures.backgroundColor : backgroundColor;
    }
    
    if(this.isTimerActive === false) {
      time += 1;
      id = 'a4Goo3ub8fY'; // this.createToken(8);
      this.isTimerActive = true;
      this.timerName = id;
    }

    let el = this.gid(this.timerName);

    if(el) {
      if(time == 1) {
        this.isTimerActive = false;
        el.innerHTML = '';
        el.remove();
        if(process && typeof(process) == 'function') process();
      }
      else {
        time--;
        el.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;position:fixed;top:0;bottom:0;left:0;right:0;background-color:${backgroundColor};z-index:999;font-size:4em;font-weight: bold;color: ${color};">${time}</div>`;
        setTimeout(()=>{this.timer(time, process, { id, color, backgroundColor }, false)},1000)
      }
    } else {
      let newElement = document.createElement('div');
      newElement.setAttribute('id', this.timerName);
      document.body.appendChild(newElement);
      this.timer(time, process, extraFeatures, false);
      return;
    }
  };
  image = (source) => {
    let image = new Image();
    image.src = source;
    return image;
  };
  getIntersection = (A, B, C, D) => {
    let tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    let uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    let bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
      let t = tTop / bottom;
      let u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
        x: this.lerp(A.x, B.x, t),
        y: this.lerp(A.y, B.y, t),
        offsetT: t,
        offsetU: u
      }
    }
    return null;
  };
  whenLoad = async (nextProcess = function() {}, log = false, ...argList) => {
    return new Promise(async (resolve) => {
      let i = 0;
      while(true) {
        if(document.readyState === 'complete') {
          resolve(true);
          if(log) console.log('load completed');
          nextProcess(...argList);
          break;
        } else {
          await new Promise(res => setTimeout(res, 50))
          if(log) console.log('waiting load... ( for ' + (i * 50) / 1000 + ' seconds)');
          i++;
        }
      }
    })
  };
};

const f = new Functions(), birimx = miktar => miktar * f.variables('oranx'), birimy = miktar => miktar * f.variables('orany');