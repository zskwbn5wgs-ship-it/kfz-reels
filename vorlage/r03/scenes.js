// ================= Reel 03: Mythos oder Wahrheit #1 =================
const SC=__SC__;
const CAPS=__CAPS__;
const MK=__MARKS__;
const ORANGE='#E88A00', GREEN='#1E9E5A';
const vis=(t,i)=>t>=SC[i].s&&t<SC[i].e;
function cam(inner,l,N,zoom=.06){const d=SC[N].e-SC[N].s,p=io(clamp(l/d)),z=1+zoom*p,px=(N%2?-1:1)*18*p;
  return g(`translate(540,1150) scale(${z}) translate(${-540+px},-1150)`,inner)}
function fgBushes(c='#2C4A38'){return bush(-60,1880,1,c)+bush(1130,1900,1.1,shade(c,.85))}
function seriesPill(t,txt){const k=pop(t,.05,.4);return g(`translate(540,140) scale(${k})`,`<rect x="-260" y="-30" width="520" height="60" rx="30" fill="${DARK}"/><text y="12" text-anchor="middle" class="t" font-size="32" fill="#fff" letter-spacing="2">${txt}</text>`)}
function stampC(txt,col,t,s,x,y,w=520){if(t<s)return '';const p=clamp((t-s)/.25),sc=2.2-1.2*out(p);
  return g(`translate(${x},${y}) rotate(-12) scale(${sc})`,`<rect x="${-w/2}" y="-62" width="${w}" height="124" rx="16" fill="#fff" opacity=".85"/><rect x="${-w/2}" y="-62" width="${w}" height="124" rx="16" fill="none" stroke="${col}" stroke-width="13"/>
   <text y="30" text-anchor="middle" class="t" font-size="88" fill="${col}" letter-spacing="4">${txt}</text>`,clamp(p*1.5))}
function mythCard(n,lines,t,s){const k=pop(t,s,.45);if(k<.01)return '';
  const h=110+lines.length*80;
  return g(`translate(540,${150+h/2}) scale(${k})`,`<rect x="-470" y="${-h/2+8}" width="940" height="${h}" rx="30" fill="#000" opacity=".14"/><rect x="-470" y="${-h/2}" width="940" height="${h}" rx="30" fill="#fff"/>
    <rect x="-470" y="${-h/2}" width="940" height="74" rx="30" fill="${DARK}"/><rect x="-470" y="${-h/2+44}" width="940" height="30" fill="${DARK}"/>
    <text y="${-h/2+52}" text-anchor="middle" class="t" font-size="38" fill="#fff" letter-spacing="3">BEHAUPTUNG #${n}</text>
    ${lines.map((ln,i)=>`<text y="${-h/2+150+i*80}" text-anchor="middle" class="t" font-size="70" fill="${DARK}">${ln}</text>`).join('')}`)}
function answer(txt,t,s,y,col=GREEN,w=860,fs=48){const k=pop(t,s,.4);if(k<.01)return '';
  return g(`translate(540,${y}) scale(${k})`,`<rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="#000" opacity=".15" transform="translate(0,6)"/><rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="${col}"/>
   <circle cx="${-w/2+50}" r="30" fill="#fff"/><path d="M${-w/2+36},0 L${-w/2+46},11 L${-w/2+66},-11" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="30" y="${fs*.36}" text-anchor="middle" class="t" font-size="${fs}" fill="#fff">${txt}</text>`)}
function note(txt,t,s,y){const k=out(lin(t,s,.3));if(k<=0)return '';
  return g(`translate(540,${y+(1-k)*20})`,`<rect x="-400" y="-32" width="800" height="64" rx="32" fill="#fff"/><text y="11" text-anchor="middle" class="c" font-size="32" fill="${DARK}">${txt}</text>`,k)}
function bubble(lines,t,s,x,y,w=600){const k=pop(t,s,.4);if(k<.01)return '';const h=40+lines.length*60;
  return g(`translate(${x},${y}) scale(${k})`,`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="40" fill="#fff"/><path d="M${-w/2+70},${h/2-10} L${-w/2+40},${h/2+60} L${-w/2+130},${h/2-5}Z" fill="#fff"/>
   ${lines.map((ln,i)=>`<text y="${-h/2+62+i*60}" text-anchor="middle" class="t" font-size="48" fill="${DARK}">${ln}</text>`).join('')}`)}
function qBig(t,s,x,y,r=60){const k=pop(t,s,.4);if(k<.01)return '';return g(`translate(${x},${y+Math.sin(t*3+x)*10}) scale(${k}) rotate(${Math.sin(t*2+y)*10})`,
  `<circle r="${r}" fill="${RED}"/><text y="${r*.45}" text-anchor="middle" class="t" font-size="${r*1.4}" fill="#fff">?</text>`)}
function arc(cx,cy,r,a0,a1){const p=a=>[cx+r*Math.cos(a-Math.PI/2),cy+r*Math.sin(a-Math.PI/2)];const [x0,y0]=p(a0),[x1,y1]=p(a1);
  return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a1-a0>Math.PI?1:0} 1 ${x1},${y1}Z`}
function policeLight(){return `<rect x="-60" y="10" width="120" height="26" rx="8" fill="#3B4250"/><path d="M-46,12 C-46,-50 46,-50 46,12Z" fill="#3D7BF0"/><path d="M-30,-10 C-26,-34 0,-40 10,-38" stroke="#fff" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>`}

function render(t){
  let o=defs(), capt='';
  // ---------- S0: Intro ----------
  if(vis(t,0)){const l=t;let sc='';
    sc+=officeBG();
    sc+=g('translate(540,1640)',body({...SLADEK,talk:VENV(t),armA:[6,-6],armB:[-125,-25]},t));
    sc+=leaf(-40,1500,-30,1.2,'#2C4A38')+leaf(1120,1700,200,1.1,'#24402F');
    o+=cam(sc,l,0);
    o+=title([{text:'3 Unfall-Mythen'},{text:'Was stimmt wirklich?',hi:1,size:80}],l,.15,230);
    o+=qBig(l,.5,250,760)+qBig(l,.75,830,700)+qBig(l,1.0,880,960,48);
    o+=seriesPill(l,'MYTHOS ODER WAHRHEIT #1');
  }
  // ---------- S1: Polizei ----------
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    sc+=streetBG(t,0);
    sc+=g('translate(290,1440) scale(.85)',car(BLUE,1));
    sc+=g('translate(740,1440) scale(-.85,.85)',car(RED,1));
    const f1=MK['1:Bei reinem']||4;
    sc+=g('translate(930,1600) scale(.85)',body({...KUNDIN,mood:'smile',armA:[-40,-120],propA:'phone',armB:[-8,8],look:-10},t));
    [f1+.2,f1+.9].forEach(ft=>{if(l>ft&&l<ft+.25){const a=1-(l-ft)/.25;sc+=`<rect width="1080" height="1920" fill="#fff" opacity="${.55*a}"/>`}});
    sc+=fgBushes();
    o+=cam(sc,l,1);
    o+=mythCard(1,['„Ohne Polizei zahlt','die Versicherung nicht“'],l,.1);
    if(l>f1-.3) o+=g(`translate(160,1080) scale(${pop(l,f1-.3,.4)})`,policeLight()+`<line x1="-80" y1="-60" x2="80" y2="50" stroke="${RED}" stroke-width="16" stroke-linecap="round"/>`);
    o+=stampC('MYTHOS',RED,l,MK['1:Falsch']||2.7,600,535);
    o+=answer('Bei Blechschaden keine Pflicht',l,f1,720);
    o+=note('Bei Verletzten oder Streit: immer 110 rufen!',l,f1+1.2,820);
  }
  // ---------- S2: Auffahren ----------
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    sc+=streetBG(t,0);
    const fb=MK['2:bremst']||4.5;
    sc+=g('translate(720,1440) scale(.85)',car(RED,0)+(l>fb?`<rect x="-262" y="-82" width="30" height="30" rx="8" fill="#FF2A2A" opacity="${.6+.4*Math.sin(t*20)}"/><circle cx="-250" cy="-66" r="40" fill="#FF2A2A" opacity=".25"/>`:''));
    const ap=io(clamp(l/1.2));
    sc+=g(`translate(${-320+(720-440+320)*ap},1440) scale(.85)`,car(BLUE,l>1.2?1:0));
    if(l>1.2&&l<2){const k=pop(l,1.2,.3);sc+=g(`translate(490,1330) scale(${k*.6})`,burst(120))}
    sc+=fgBushes();
    o+=cam(sc,l,2);
    o+=mythCard(2,['„Wer auffährt,','ist immer schuld“'],l,.1);
    o+=stampC('NICHT IMMER',ORANGE,l,MK['2:Nicht immer']||3.4,560,535,640);
    o+=answer('Ausnahme: grundloses Bremsen',l,fb,720,ORANGE);
    if(l>fb) o+=g(`translate(500,1180) scale(${pop(l,fb,.4)})`,`<path d="M0,-70 L62,40 L-62,40Z" fill="#FFD23F" stroke="${DARK}" stroke-width="8" stroke-linejoin="round"/><text y="28" text-anchor="middle" class="t" font-size="70" fill="${DARK}">!</text>`);
  }
  // ---------- S3: Teilschuld ----------
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=officeBG();
    sc+=g('translate(190,1660) scale(.85)',body({...SLADEK,talk:VENV(t),armA:[-10,-110],propA:'tablet',armB:[-60,-40],look:12},t));
    sc+=leaf(1120,1700,200,1.1,'#24402F');
    o+=cam(sc,l,3,.04);
    o+=mythCard(3,['„Bei Teilschuld','bekomme ich nichts“'],l,.1);
    o+=stampC('MYTHOS',RED,l,MK['3:Falsch']||2.6,600,535);
    const fq=MK['3:Der Schaden']||3.6, kp=pop(l,fq-.6,.45);
    if(kp>.01){const sp=io(clamp((l-fq)/.8)), a=2*Math.PI*.7*sp;
      o+=g(`translate(640,1080) scale(${kp})`,`<circle r="215" fill="#000" opacity=".12" transform="translate(0,10)"/><circle r="210" fill="#fff"/>
        <path d="${arc(0,0,200,0,Math.max(.001,a))}" fill="${GREEN}"/><path d="${arc(0,0,200,a,2*Math.PI)}" fill="#C9CED6"/>
        ${sp>.9?`<text x="70" y="10" text-anchor="middle" class="t" font-size="64" fill="#fff">70 %</text><text x="-110" y="-60" text-anchor="middle" class="t" font-size="44" fill="${DARK}">30 %</text>`:''}`);
      if(sp>.9) o+=g('translate(640,1350)',`<rect x="-300" y="-40" width="600" height="80" rx="40" fill="#fff"/><text y="12" text-anchor="middle" class="c" font-size="32" fill="${DARK}">Beispiel: 70 % trägt der Gegner</text>`,clamp((sp-.9)*10));}
    o+=answer('Aufteilung nach Haftungsquote',l,fq,720);
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
    o+=bubble(['Welcher Mythos','als Nächstes?'],l,.2,720,980,560);
  }
  o+=topOverlay();
  o+=wordCaption(t,SC);
  o+=wipes(t,SC);
  document.getElementById('s').innerHTML=o;
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
