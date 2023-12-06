let son_islem = null,
kabulEdilenTuslar = [
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'ArrowLeft'
];

export function SON_ISLEM() {
  return son_islem;
}
export function TEMIZLE() {
  son_islem = null;
}

window.onkeydown = e => {
  if(kabulEdilenTuslar.includes(e.key)) son_islem = e.key;
}