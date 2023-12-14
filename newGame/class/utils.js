export class Functions {
  constructor() {}
  mf = t => Math.floor(t);
  log = t => console.log(t);
  table = t => console.table(t);
  t = t => console.table(t);
  clear = () => console.clear();
  c = () => console.clear();
  qs = t => document.querySelector(t);
  qsa = t => document.querySelectorAll(t);
  dq = t => document.querySelector(t);
  dqa = t => document.querySelectorAll(t);
  dqss = t => document.querySelector(t);
  dqsa = t => document.querySelectorAll(t);
  bekle = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  w = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  gid = t => document.getElementById(t);
  hidden = t => document.getElementById(t).hidden=!document.getElementById(t).hidden;
  display = (t,d) => document.getElementById(t).style.display=document.getElementById(t).style.display==d?'none':d;
  rs = (min, max) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  lerp = (a, b, c) => a + (b - a) * c;
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