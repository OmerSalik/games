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
export function HARITA() {
  return harita;
}

export function HARITA_AYARLA(yeni_harita) {
  harita = yeni_harita;
}

/*
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
  [' ',' ','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','D','D','D','D','D','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y',' ',' '],
  [' ',' ','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','O','D','D','D','D','D','O','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y','a|y',' ',' '],
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

                1         2
      01234567890123456789012345678
0 =>  OOOOOOOOOOOOOOOOOOOOOOOOOOOOO
1 =>  OaaaaaaaaaaaaaOaaaaaaaaaaaaaO
2 =>  OaaaaaaaaaaaaaOaaaaaaaaaaaaaO
3 =>  OaaBBBaaBBBBaaOaaBBBBaaBBBaaO
4 =>  OaaBBBaaBBBBaaOaaBBBBaaBBBaaO
5 =>  OaaaaaaaaaaaaaaaaaaaaaaaaaaaO
6 =>  OaaaaaaaaaaaaaaaaaaaaaaaaaaaO
7 =>  OaaBBBaaBaaBBBBBBBaaBaaBBBaaO
8 =>  OaaaaaaaBaaaaaBaaaaaBaaaaaaaO
9 =>  OaaaaaaaBaaaaaBaaaaaBaaaaaaaO
10 => OOOOOOaaBBBBaaBaaBBBBaaOOOOOO
11 =>      OaaBaaaaaaaaaaaBaaO     
12 =>      OaaBaaaaaaaaaaaBaaO     
13 => OOOOOOaaBaaBBBBBBBaaBaaOOOOOO
14 => aaaaaaaaaaaBCCCCCBaaaaaaaaaaa
15 => aaaaaaaaaaaBCCCCCBaaaaaaaaaaa
16 => OOOOOOaaBaaBBBBBBBaaBaaOOOOOO
17 =>      OaaBaaaaaaaaaaaBaaO     
18 =>      OaaBaaaaaaaaaaaBaaO     
19 => OOOOOOaaBaaBBBBBBBaaBaaOOOOOO
20 => OaaaaaaaaaaaaaBaaaaaaaaaaaaaO
21 => OaaaaaaaaaaaaaBaaaaaaaaaaaaaO
22 => OaaBBBaaBBBBaaBaaBBBBaaBBBaaO
23 => OaaaaBaaaaaaaaaaaaaaaaaBaaaaO
24 => OaaaaBaaaaaaaaaaaaaaaaaBaaaaO
25 => OOOaaBaaBaaBBBBBBBaaBaaBaaOOO
26 => OaaaaaaaBaaaaaBaaaaaBaaaaaaaO
27 => OaaaaaaaBaaaaaBaaaaaBaaaaaaaO
28 => OaaBBBBBBBBBaaBaaBBBBBBBBBaaO
29 => OaaaaaaaaaaaaaaaaaaaaaaaaaaaO
30 => OaaaaaaaaaaaaaaaaaaaaaaaaaaaO
31 => OOOOOOOOOOOOOOOOOOOOOOOOOOOOO
*/