let harita = [
  [' ',' ','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O',' ',' '],
  [' ',' ','O','P','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|B','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','O','O','O','a|y','a|y','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','a|y','a|y','O','O','O','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','O','O','O','a|y','a|y','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','a|y','a|y','O','O','O','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|B','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','O','O','O','O','O','a|y','a|y','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','a|y','a|y','O','O','O','O','O','O',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ','O','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ','O','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','O',' ',' ',' ',' ',' ',' ',' '],
  ['OG','OG','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','OK','OK','OK','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','OG','OG'],
  [' ',' ','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','D','a','a','a','a','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y',' ',' '],
  [' ',' ','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a','a','a','a','a','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y',' ',' '],
  ['OG','OG','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','OG','OG'],
  [' ',' ',' ',' ',' ',' ',' ','O','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ','O','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','O','O','O','a|y','a|y','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','a|y','a|y','O','O','O','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','O','O','a|y','a|y','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','a|y','a|y','O','O','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','O','O','O','O','O','O','O','O','O','a|y','a|y','O','a|y','a|y','O','O','O','O','O','O','O','O','O','a|y','a|y','O',' ',' '],
  [' ',' ','O','a|B','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|B','a|y','O',' ',' '],
  [' ',' ','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O',' ',' '],
  [' ',' ','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O','O',' ',' ']
];
let son_islem = null,
kabulEdilenTuslar = [
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft',
  'a',
  's'
];

export function HARITA() { return harita; }
export function HARITA_AYARLA(yeni_harita) { harita = yeni_harita; }
export function SON_ISLEM() { return son_islem; }
export function TEMIZLE() { son_islem = null; }
window.onkeydown = e => { if(kabulEdilenTuslar.includes(e.key)) son_islem = e.key; }