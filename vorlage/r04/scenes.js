// ================= Reel 04: Gebrauchtwagen & Lackschichtdickenmessung =================
const SC=__SC__;
const CAPS=__CAPS__;
const MK=__MARKS__;
const GREEN='#1E9E5A';
const vis=(t,i)=>t>=SC[i].s&&t<SC[i].e;
function cam(inner,l,N,zoom=.06){const d=SC[N].e-SC[N].s,p=io(clamp(l/d)),z=1+zoom*p,px=(N%2?-1:1)*18*p;
  return g(`translate(540,1150) scale(${z}) translate(${-540+px},-1150)`,inner)}
function fgBushes(c='#2C4A38'){return bush(-60,1880,1,c)+bush(1130,1900,1.1,shade(c,.85))}
const VERKAEUFER={skin:'#E8B98F',hair:'#3B2A20',hairD:'#2A1D16',shirt:'#8E3B46',pants:'#2F3A4A',shoes:'#5A3B2A'};
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
function seriesPill(t,txt){const k=pop(t,.05,.4);return g(`translate(540,140) scale(${k})`,`<rect x="-240" y="-30" width="480" height="60" rx="30" fill="${DARK}"/><text y="12" text-anchor="middle" class="t" font-size="32" fill="#fff" letter-spacing="2">${txt}</text>`)}
function answer(txt,t,s,y,col=GREEN,w=860,fs=48){const k=pop(t,s,.4);if(k<.01)return '';
  return g(`translate(540,${y}) scale(${k})`,`<rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="#000" opacity=".15" transform="translate(0,6)"/><rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="${col}"/>
   <circle cx="${-w/2+50}" r="30" fill="#fff"/><path d="M${-w/2+36},0 L${-w/2+46},11 L${-w/2+66},-11" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="30" y="${fs*.36}" text-anchor="middle" class="t" font-size="${fs}" fill="#fff">${txt}</text>`)}
function bubble(lines,t,s,x,y,w=600,flip=false){const k=pop(t,s,.4);if(k<.01)return '';const h=40+lines.length*60;const f=flip?-1:1;
  return g(`translate(${x},${y}) scale(${k})`,`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="40" fill="#fff"/><path d="M${f*(-w/2+70)},${h/2-10} L${f*(-w/2+40)},${h/2+60} L${f*(-w/2+130)},${h/2-5}Z" fill="#fff"/>
   ${lines.map((ln,i)=>`<text y="${-h/2+62+i*60}" text-anchor="middle" class="t" font-size="48" fill="${DARK}">${ln}</text>`).join('')}`)}
function qBig(t,s,x,y,r=56){const k=pop(t,s,.4);if(k<.01)return '';return g(`translate(${x},${y+Math.sin(t*3+x)*10}) scale(${k}) rotate(${Math.sin(t*2+y)*10})`,
  `<circle r="${r}" fill="${RED}"/><text y="${r*.45}" text-anchor="middle" class="t" font-size="${r*1.4}" fill="#fff">?</text>`)}
function priceTag(val,red,t,s,x,y){const k=pop(t,s,.45);if(k<.01)return '';
  return g(`translate(${x},${y}) rotate(-6) scale(${k})`,`<path d="M-190,-90 L170,-90 Q190,-90 190,-70 L190,70 Q190,90 170,90 L-190,90 L-250,0Z" fill="#000" opacity=".15" transform="translate(0,8)"/>
   <path d="M-190,-90 L170,-90 Q190,-90 190,-70 L190,70 Q190,90 170,90 L-190,90 L-250,0Z" fill="#fff"/><circle cx="-200" cy="0" r="14" fill="#D7DEE5"/>
   <text x="-40" y="-36" text-anchor="middle" class="c" font-size="30" fill="${DARK}" opacity=".65">Kaufpreis (Beispiel)</text>
   <text x="-40" y="50" text-anchor="middle" class="t" font-size="80" fill="${red?GREEN:DARK}">${fmt(val)} €</text>
   ${red?`<path d="M232,-30 L232,40 M208,16 L232,42 L256,16" stroke="${GREEN}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`:''}`)}
function saleSign(){return `<g transform="translate(70,-128) rotate(-3)"><rect x="-46" y="-26" width="92" height="52" rx="4" fill="#FFE14D"/><text y="-2" text-anchor="middle" class="t" font-size="17" fill="${DARK}">ZU</text><text y="18" text-anchor="middle" class="t" font-size="17" fill="${DARK}">VERKAUFEN</text></g>`}
function lens(t,x,y,q){return g(`translate(${x},${y}) rotate(-20)`,`<rect x="-14" y="70" width="28" height="120" rx="12" fill="${DARK}"/><circle r="90" fill="#fff" opacity=".25"/><circle r="90" fill="none" stroke="${DARK}" stroke-width="18"/>
  <path d="M-50,-40 Q-30,-60 0,-62" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>${q?`<text y="30" text-anchor="middle" class="t" font-size="96" fill="${RED}" transform="rotate(20)">?</text>`:''}`)}
function gauge(val,col){return `<rect x="-70" y="-50" width="140" height="100" rx="16" fill="${DARK}"/><rect x="-56" y="-38" width="112" height="56" rx="6" fill="#CFE9D9"/>
  <text y="0" text-anchor="middle" class="t" font-size="32" fill="${col}">${val}</text><text y="38" text-anchor="middle" class="c" font-size="16" fill="#fff">µm</text>`}

function render(t){
  let o=defs();
  // ---------- S0: "Unfallfrei" ----------
  if(vis(t,0)){const l=t;let sc='';
    sc+=streetBG(t,0);
    sc+=g('translate(560,1440) scale(.9)',car('#8A9AA8',0)+saleSign());
    sc+=g('translate(170,1600) scale(.92)',body({...VERKAEUFER,mood:'smile',armA:[6,-6],armB:[-150+Math.sin(t*6)*6,-20],look:10},t));
    sc+=g('translate(900,1600) scale(.92)',body({...KUNDIN,mood:l>2.6?'worry':'smile',armA:[6,-6],armB:[-30,-120],look:-10,tilt:l>2.6?6:0},t));
    sc+=fgBushes();
    o+=cam(sc,l,0);
    o+=title([{text:'„Unfallfrei“?'},{text:'Stimmt das wirklich?',hi:1,size:80}],l,.15,230);
    o+=bubble(['Unfallfrei!'],l,1.0,330,820,330);
    o+=qBig(l,2.6,930,820)+qBig(l,2.9,790,760,40);
    o+=seriesPill(l,'GUTACHTER-WISSEN #3');
  }
  // ---------- S1: Mit bloßem Auge nicht sichtbar ----------
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    sc+=workshopBG(t);
    sc+=g('translate(560,1480) scale(1.15)',car('#8A9AA8',0));
    o+=cam(sc,l,1,.05);
    const lx=300+520*io(clamp((l-.4)/2.4)), ly=1380+Math.sin(l*3)*20;
    o+=lens(t,lx,ly,l>2.6);
    o+=title([{text:'Mit bloßem Auge'},{text:'kaum zu sehen',hi:1,size:88}],l,.1);
  }
  // ---------- S2: Messung ----------
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    sc+=workshopBG(t);
    sc+=g('translate(600,1480) scale(1.1)',car('#8A9AA8',0));
    const mp=MK['2:prüfen']||2.1, mv=MK['2:versteckte']||4.5;
    const spots=[[380,1420,'121',GREEN],[512,1420,'348',RED],[666,1420,'116',GREEN],[809,1410,'124',GREEN]];
    if(l>mv){const pr=1+.12*Math.sin(t*8);sc+=g(`translate(512,1410) scale(${pr})`,`<ellipse rx="95" ry="70" fill="${RED}" opacity=".25"/><ellipse rx="95" ry="70" fill="none" stroke="${RED}" stroke-width="8" stroke-dasharray="18 12"/>`)}
    sc+=g('translate(150,1660) scale(.85)',body({...SLADEK,talk:VENV(t),armA:[-10,-110],propA:'tablet',armB:[-55,-45],look:12},t));
    o+=cam(sc,l,2,.04);
    // Messfühler wandert über die Bauteile
    const step=.55, idx=Math.min(3,Math.floor((l-mp)/step));
    if(l>mp-.3){const k=clamp((l-mp)/step-idx);const a=spots[Math.max(0,idx)],b=spots[Math.min(3,idx+1)];
      const px=idx<3?a[0]+(b[0]-a[0])*io(clamp((k-.6)/.4)):a[0], py=idx<3?a[1]+(b[1]-a[1])*io(clamp((k-.6)/.4)):a[1];
      o+=g(`translate(${px},${py-40})`,`<rect x="-9" y="-70" width="18" height="70" rx="8" fill="${DARK}"/><circle cy="0" r="12" fill="#C4C9CF"/>`);}
    spots.forEach(([x,y,v,c],i)=>{const st=mp+i*step+.2;if(l>st)o+=g(`translate(${x},${y-170}) scale(${pop(l,st,.35)*.85})`,gauge(v,c))});
    o+=title([{text:'Lackschicht-'},{text:'dickenmessung',hi:1,size:84}],l,.1);
    o+=answer('Nachlackierte Tür entdeckt!',l,mv,720,RED);
    if(l>mv+.4) o+=g('translate(540,820)',`<rect x="-300" y="-30" width="600" height="60" rx="30" fill="#fff"/><text y="11" text-anchor="middle" class="c" font-size="30" fill="${DARK}">Beispielwerte in Mikrometern (µm)</text>`,clamp((l-mv-.4)*3));
  }
  // ---------- S3: Sicher kaufen, besser verhandeln ----------
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=officeBG();
    sc+=g('translate(300,1640) scale(.92)',body({...SLADEK,talk:VENV(t),armA:[-10,-110],propA:'tablet',armB:[-8,8]},t));
    sc+=g('translate(820,1640) scale(.88)',body({...KUNDIN,mood:'smile',armA:[-20,-120],propA:'letter',armB:[-8,8],look:-10},t));
    sc+=leaf(-40,1500,-30,1.2,'#2C4A38');
    o+=cam(sc,l,3,.04);
    o+=title([{text:'Sicher kaufen –'},{text:'besser verhandeln',hi:1,size:84}],l,.1);
    const ms=MK['3:starkes']||3.9;
    const val=l<ms?14900:14900-1400*io(clamp((l-ms)/.9));
    o+=priceTag(val,l>ms,l,.6,600,730);
  }
  // ---------- S4: CTA ----------
  if(vis(t,4)){const l=t-SC[4].s;let sc='';
    sc+=nightBG(t);
    const k=out(lin(l,.1,.7));
    sc+=g(`translate(400,${1640+(1-k)*500})`,body({...SLADEK,talk:VENV(t),armA:[-6,-6],armB:[-150+Math.sin(t*9)*16,-30]},t));
    sc+=fgBushes('#1D2A26');
    o+=cam(sc,l,4,.04);
    o+=g(`translate(540,300) scale(${pop(l,.1,.5)*.85})`,`<rect x="-360" y="-185" width="720" height="370" rx="30" fill="#000" stroke="#3a3a3a" stroke-width="3"/><image href="logo_hq.jpg" x="-340" y="-169" width="680" height="337"/>`);
    const p=1+.04*Math.sin(l*7);
    o+=g(`translate(540,600) scale(${pop(l,.5,.4)*p})`,`<rect x="-400" y="-66" width="800" height="132" rx="66" fill="${RED}"/><text y="24" text-anchor="middle" class="t" font-size="66" fill="#fff">Folgen für mehr Tipps</text>`);
    o+=bubble(['Auto in Sicht?','Wir checken es!'],l,.3,720,980,520);
  }
  o+=topOverlay();
  o+=wordCaption(t,SC);
  o+=wipes(t,SC);
  document.getElementById('s').innerHTML=o;
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
