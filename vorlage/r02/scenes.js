// ================= Reel 02: Wertminderung =================
const SC=__SC__;
const CAPS=__CAPS__;
const vis=(t,i)=>t>=SC[i].s&&t<SC[i].e;
function cam(inner,l,N,zoom=.06){const d=SC[N].e-SC[N].s,p=io(clamp(l/d)),z=1+zoom*p,px=(N%2?-1:1)*18*p;
  return g(`translate(540,1150) scale(${z}) translate(${-540+px},-1150)`,inner)}
function fgBushes(c='#2C4A38'){return bush(-60,1880,1,c)+bush(1130,1900,1.1,shade(c,.85))}
const KAEUFER={skin:'#E8B98F',hair:'#3B2A20',hairD:'#2A1D16',shirt:'#7A8796',pants:'#2F3A4A',shoes:'#5A3B2A'};
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
function sparkle(x,y,s,t,ph){const k=Math.max(0,Math.sin(t*5+ph));return g(`translate(${x},${y}) scale(${s*k}) rotate(${t*60})`,
  `<path d="M0,-40 L8,-8 L40,0 L8,8 L0,40 L-8,8 L-40,0 L-8,-8Z" fill="#fff"/>`,k)}
function priceTag(val,red,t,s,x,y){const k=pop(t,s,.45);if(k<.01)return '';
  return g(`translate(${x},${y}) rotate(-6) scale(${k})`,`<path d="M-190,-90 L170,-90 Q190,-90 190,-70 L190,70 Q190,90 170,90 L-190,90 L-250,0Z" fill="#000" opacity=".15" transform="translate(0,8)"/>
   <path d="M-190,-90 L170,-90 Q190,-90 190,-70 L190,70 Q190,90 170,90 L-190,90 L-250,0Z" fill="#fff"/><circle cx="-200" cy="0" r="14" fill="#D7DEE5"/>
   <text x="-30" y="-36" text-anchor="middle" class="c" font-size="30" fill="${DARK}" opacity=".65">Fahrzeugwert (Beispiel)</text>
   <text x="-40" y="50" text-anchor="middle" class="t" font-size="80" fill="${red?RED:DARK}">${fmt(val)} €</text>
   ${red?`<path d="M232,-30 L232,40 M208,16 L232,42 L256,16" stroke="${RED}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`:''}`)}
function stamp(txt,t,s,x,y){if(t<s)return '';const p=clamp((t-s)/.25),sc=2.2-1.2*out(p);
  return g(`translate(${x},${y}) rotate(-12) scale(${sc})`,`<rect x="-330" y="-70" width="660" height="140" rx="16" fill="none" stroke="${RED}" stroke-width="14"/>
   <text y="34" text-anchor="middle" class="t" font-size="96" fill="${RED}" letter-spacing="4">${txt}</text>`,clamp(p*1.5))}
function docCard(title,rows,t,s,x,y,good){const k=pop(t,s,.45);if(k<.01)return '';
  let r='';rows.forEach(([txt,ok,ts],i)=>{const yy=-40+i*64;const kk=pop(t,ts,.35);
    r+=`<text x="-170" y="${yy+12}" class="n" font-size="36" fill="${DARK}">${txt}</text>`;
    if(kk>.01) r+=g(`translate(160,${yy}) scale(${kk})`, ok?`<circle r="24" fill="#1E9E5A"/><path d="M-11,0 L-3,9 L12,-9" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
                                                         :`<circle r="24" fill="${RED}"/><path d="M-9,-9 L9,9 M9,-9 L-9,9" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`);});
  return g(`translate(${x},${y}) scale(${k})`,`<rect x="-215" y="-150" width="430" height="${110+rows.length*64}" rx="24" fill="#000" opacity=".12" transform="translate(0,8)"/>
    <rect x="-215" y="-150" width="430" height="${110+rows.length*64}" rx="24" fill="#fff" ${good?`stroke="#1E9E5A" stroke-width="8"`:''}/>
    <rect x="-215" y="-150" width="430" height="70" rx="24" fill="${good?'#1E9E5A':'#8A939C'}"/><rect x="-215" y="-100" width="430" height="20" fill="${good?'#1E9E5A':'#8A939C'}"/>
    <text y="-103" text-anchor="middle" class="t" font-size="38" fill="#fff">${title}</text>${r}`)}
function bubble(txt,t,s,x,y,w=420){const k=pop(t,s,.4);if(k<.01)return '';
  return g(`translate(${x},${y}) scale(${k})`,`<rect x="${-w/2}" y="-60" width="${w}" height="110" rx="55" fill="#fff"/><path d="M${-w/2+70},40 L${-w/2+40},100 L${-w/2+120},45Z" fill="#fff"/>
   <text y="12" text-anchor="middle" class="t" font-size="50" fill="${DARK}">${txt}</text>`)}
function seriesPill(t){const k=pop(t,.05,.4);return g(`translate(540,140) scale(${k})`,`<rect x="-200" y="-30" width="400" height="60" rx="30" fill="${DARK}"/><text y="12" text-anchor="middle" class="t" font-size="32" fill="#fff" letter-spacing="2">GUTACHTER-WISSEN #2</text>`)}

function render(t){
  let o=defs(), capt='';
  // ---------- S0: Hook ----------
  if(vis(t,0)){const l=t;let sc='';
    sc+=workshopBG(t);
    sc+=g('translate(600,1480) scale(1.0)',car(BLUE,0));
    if(l<2.2){[[380,1330,.9,0],[720,1360,.7,1.7],[900,1420,.6,3.1]].forEach(([x,y,s,ph])=>sc+=sparkle(x,y,s,t,ph));}
    sc+=g('translate(170,1640) scale(.92)',body({...KUNDIN,mood:l>2.2?'worry':'smile',armA:[6,-6],armB:[-6,6],look:8},t));
    o+=cam(sc,l,0);
    o+=title([{text:'Repariert –'},{text:'aber weniger wert?',hi:1,size:84}],l,.15,230);
    const val=l<1.7?18000:18000-1500*io(clamp((l-1.7)/.9));
    o+=priceTag(val,l>1.7,l,.6,600,760);
    o+=seriesPill(l);
  }
  // ---------- S1: Unfallwagen ----------
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    sc+=streetBG(t,0);
    sc+=g('translate(560,1440) scale(.95)',car('#8A9AA8',0)+`<g transform="translate(70,-128) rotate(-3)"><rect x="-46" y="-26" width="92" height="52" rx="4" fill="#FFE14D"/><text y="-2" text-anchor="middle" class="t" font-size="17" fill="${DARK}">ZU</text><text y="18" text-anchor="middle" class="t" font-size="17" fill="${DARK}">VERKAUFEN</text></g>`);
    const wk=out(lin(l,0,.9));
    sc+=g(`translate(${-200+(170+200)*wk},1600) scale(.95)`,body({...KAEUFER,mood:l>1.6?'worry':'smile',walk:wk<1?1:0,armA:[6,-6],armB:[-6,6],look:10,tilt:l>1.6?-5:0},t));
    sc+=g('translate(900,1600) scale(.92)',body({...KUNDIN,mood:l>1.6?'worry':'smile',armA:[6,-6],armB:[-30,-50],look:-10},t));
    sc+=fgBushes();
    o+=cam(sc,l,1);
    o+=title([{text:'Unfallwagen'},{text:'bleibt Unfallwagen',hi:1,size:84}],l,.1);
    o+=stamp('UNFALLWAGEN',l,1.5,540,800);
    o+=g('translate(0,0)',pop(l,3.0,.4)>.01?g(`translate(540,960) scale(${pop(l,3.0,.4)})`,`<rect x="-260" y="-50" width="520" height="100" rx="50" fill="${DARK}"/><text y="18" text-anchor="middle" class="t" font-size="50" fill="#fff">Preis sinkt ↓</text>`):'');
  }
  // ---------- S2: Wertminderung zahlt die Gegenseite ----------
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    sc+=streetBG(t,0);
    const kb=out(lin(l,.2,.6));
    sc+=g(`translate(0,${130+(1-kb)*500})`,`<rect x="70" y="560" width="380" height="600" fill="url(#glass)"/><rect x="70" y="540" width="380" height="30" fill="#4C6F92"/>
       ${windows(90,600,340,540,'#B8D3EA',4,7)}<rect x="210" y="1060" width="100" height="100" fill="#3F5F80"/>
       <rect x="40" y="480" width="440" height="70" rx="12" fill="#fff"/><text x="260" y="527" text-anchor="middle" class="t" font-size="34" fill="${DARK}">Versicherung des Gegners</text>`);
    sc+=g('translate(800,1560)',body({...KUNDIN,mood:l>2.6?'smile':'wow',armA:l>2.6?[-20,-120]:[6,-6],propA:l>2.6?'letter':null,armB:[-10,8],look:-8},t));
    for(let i=0;i<5;i++){const st=1.2+i*.25,p=clamp((l-st)/1.0);
      if(p>0&&p<1){const x=330+(760-330)*p,y=1000-300*Math.sin(Math.PI*p)+(1120-1000)*p;sc+=g(`translate(${x},${y}) rotate(${p*360}) scale(${1-.3*p})`,coin())}}
    sc+=fgBushes();
    o+=cam(sc,l,2);
    o+=title([{text:'Das ist die'},{text:'Wertminderung',hi:1,size:80}],l,.1);
    o+=pill('Zahlt die Gegenseite','#1E9E5A',560,l,2.6,760,740,50);
    if(l>2.8) o+=g(`translate(760,830)`,`<rect x="-200" y="-28" width="400" height="50" rx="25" fill="#fff"/><text y="8" text-anchor="middle" class="c" font-size="28" fill="${DARK}">bei unverschuldetem Unfall</text>`,clamp((l-2.8)*3));
  }
  // ---------- S3: KVA vs. Gutachten ----------
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=officeBG();
    sc+=g('translate(540,1640) scale(.95)',body({...SLADEK,talk:l>.3,armA:[-10,-110],propA:'tablet',armB:l>2.4?[-60,-40]:[-8,8]},t));
    sc+=leaf(-40,1500,-30,1.2,'#2C4A38')+leaf(1120,1700,200,1.1,'#24402F');
    o+=cam(sc,l,3,.04);
    o+=title([{text:'Steht nur im'},{text:'Gutachten',hi:1,size:96}],l,.1);
    o+=docCard('Kostenvoranschlag',[['Reparatur',1,.8],['Wertminderung',0,1.3]],l,.5,290,740,0);
    o+=docCard('Gutachten',[['Reparatur',1,2.6],['Wertminderung',1,2.9],['Fahrzeugwert',1,3.2]],l,2.3,790,740,1);
  }
  // ---------- S4: CTA ----------
  if(vis(t,4)){const l=t-SC[4].s;let sc='';
    sc+=nightBG(t);
    const k=out(lin(l,.1,.7));
    sc+=g(`translate(400,${1640+(1-k)*500})`,body({...SLADEK,talk:l>.4,armA:[-6,-6],armB:[-150+Math.sin(t*9)*16,-30]},t));
    sc+=fgBushes('#1D2A26');
    o+=cam(sc,l,4,.04);
    const kl=pop(l,.1,.5);
    o+=g(`translate(540,300) scale(${kl*.85})`,`<rect x="-360" y="-185" width="720" height="370" rx="30" fill="#000" stroke="#3a3a3a" stroke-width="3"/><image href="logo_hq.jpg" x="-340" y="-169" width="680" height="337"/>`);
    const p=1+.04*Math.sin(l*7);
    o+=g(`translate(540,600) scale(${pop(l,.5,.4)*p})`,`<rect x="-400" y="-66" width="800" height="132" rx="66" fill="${RED}"/><text y="24" text-anchor="middle" class="t" font-size="66" fill="#fff">Folgen für mehr Tipps</text>`);
    o+=bubble('Wusstest du das?',l,.2,760,1000,470);
  }
  o+=`<rect width="1080" height="1920" fill="url(#vig)"/>`;
  o+=`<rect width="1080" height="14" fill="${RED}"/>`+g('translate(40,40)',`<rect width="372" height="60" rx="30" fill="#fff" opacity=".95"/><circle cx="30" cy="30" r="16" fill="${RED}"/><text x="58" y="41" class="t" font-size="29" font-weight="500" fill="${DARK}">KFZ-GUTACHTEN SLADEK</text>`);
  SC.forEach((sc,i)=>{capt+=caption(CAPS[i],t,sc.s+.2,i===SC.length-1?sc.e+1:sc.e)});
  o+=capt;
  SC.forEach(({s},i)=>{if(!i)return;const d=t-s+.18;if(d>0&&d<.36){const x=-1300+2500*(d/.36);
    o+=`<rect x="${x}" y="0" width="1100" height="1920" fill="${RED}" transform="skewX(-10)"/><rect x="${x+160}" y="0" width="780" height="1920" fill="${DARK}" transform="skewX(-10)"/>`}});
  document.getElementById('s').innerHTML=o;
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
