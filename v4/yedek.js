
/*
  eski haritayiCiz() :

  let harita = HARITA();
  noktaSayisi = 0;
  for (let satirNo = 0; satirNo < harita.length; satirNo++) {
    let tsatir = harita[satirNo];
    for (let sutunNo = 0; sutunNo < tsatir.length; sutunNo++) {
      let sutun = tsatir[sutunNo];
      context.save();
      context.beginPath();

      context.fillStyle = 'rgba(75,75,75)';
      context.strokeStyle = sutun == 'O' ? 'blue' :'white';
      let ds = harita[1][12];

      if(sutun.startsWith('O'))
        context.strokeRect(
          sutunNo * birimBuyuklugu,
          satirNo * birimBuyuklugu,
          birimBuyuklugu,
          birimBuyuklugu
        );
      else if(sutun == 'D')
        context.fillRect(
          sutunNo * birimBuyuklugu,
          satirNo * birimBuyuklugu,
          birimBuyuklugu,
          birimBuyuklugu
        );
      else if(
        !sutun.startsWith('O') && sutun[0] == 'a' &&
        harita[satirNo + 1][sutunNo] && !harita[satirNo + 1][sutunNo].startsWith('O') &&
        harita[satirNo][sutunNo + 1] && !harita[satirNo][sutunNo + 1].startsWith('O') &&
        harita[satirNo + 1][sutunNo + 1] && !harita[satirNo + 1][sutunNo + 1].startsWith('O')
      ) {
        let doluMu = sutun.split('|')[1] && sutun.split('|')[1].toLowerCase() == 'y';
        if(doluMu) {
          noktaSayisi++;
          let yaricap = sutun.split('|')[1] == 'y' ? 2 : 6;
          context.arc(
            sutunNo * birimBuyuklugu + birimBuyuklugu - yaricap / 4,
            satirNo * birimBuyuklugu + birimBuyuklugu - yaricap / 4,
            yaricap,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'white';
          context.fill();
        }
          
      }
      // else if(sutun == 'P') {
      //   oyun.pacman.x = sutunNo;
      //   oyun.pacman.y = satirNo;
      // }

      context.closePath();
      context.restore();
    }
  }

*/