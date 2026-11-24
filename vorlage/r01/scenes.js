// ================= Reel 01: Wer zahlt den Gutachter =================
const SC=__SC__;
const CAPS=__CAPS__;
const vis=(t,i)=>t>=SC[i].s&&t<SC[i].e;
function cam(inner,l,N,zoom=.06){const d=SC[N].e-SC[N].s,p=io(clamp(l/d)),z=1+zoom*p,px=(N%2?-1:1)*18*p;
  return g(`translate(540,1150) scale(${z}) translate(${-540+px},-1150)`,inner)}
function fgBushes(c='#2C4A38'){return bush(-60,1880,1,c)+bush(1130,1900,1.1,shade(c,.85))}

function render(t){
  let o=defs(), capt='';
  // ---------- S1: Unfall ----------
  if(vis(t,0)){const l=t;let sc='';
    const hit=1.3, sl=io(clamp(l/hit)), sh=l>hit?Math.sin(l*70)*12*Math.max(0,1-(l-hit)*3):0;
    sc+=streetBG(t,0);
    sc+=g(`translate(${-320+(540-262+320)*sl+sh},1440) scale(.95)`,car(BLUE,l>hit?1:0,l>hit?(l-hit)*.8:0));
    sc+=g(`translate(${1400-(1400-(540+262))*sl+sh},1440) scale(-.95,.95)`,car(RED,l>hit?1:0));
    if(l>hit){const k=pop(l,hit,.3);sc+=g(`translate(540,1300) scale(${k}) rotate(${l*30})`,burst(170));
      sc+=g(`translate(540,1318) scale(${k}) rotate(-6)`,`<text text-anchor="middle" class="t" font-size="70" fill="${RED}">RUMMS!</text>`);}
    sc+=fgBushes();
    o+=g(`translate(${sh*.5},0)`,cam(sc,l,0));
    o+=title([{text:'Unfall gehabt?'},{text:'Nicht deine Schuld?',hi:1,size:76}],l,.15);
  }
  // ---------- S2: Frage ----------
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    sc+=streetBG(t,0);
    sc+=g('translate(300,1440) scale(.95)',car(BLUE,1,l*.7));
    const wk=out(lin(l,0,.9));
    sc+=g(`translate(${1250-(1250-760)*wk},1560)`,body({...KUNDIN,mood:'worry',walk:wk<1?1:0,armA:[-8,-130],propA:'phone',armB:[-10,8],look:6,tilt:4},t));
    sc+=g(`translate(840,${830+Math.sin(t*3)*6})`,knot(t),clamp((l-1.6)*3));
    sc+=fgBushes();
    o+=cam(sc,l,1);
    o+=searchCard('Wer zahlt den Gutachter?',l,.3,540,420);
  }
  // ---------- S3: Versicherung zahlt ----------
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    sc+=streetBG(t,0);
    const kb=out(lin(l,.2,.6));
    sc+=g(`translate(0,${130+(1-kb)*500})`,`<rect x="70" y="560" width="380" height="600" fill="url(#glass)"/><rect x="70" y="540" width="380" height="30" fill="#4C6F92"/>
       ${windows(90,600,340,540,'#B8D3EA',4,7)}<rect x="210" y="1060" width="100" height="100" fill="#3F5F80"/>
       <rect x="40" y="480" width="440" height="70" rx="12" fill="#fff"/><text x="260" y="527" text-anchor="middle" class="t" font-size="34" fill="${DARK}">Versicherung des Gegners</text>`);
    sc+=g(`translate(800,1560)`,body({...KUNDIN,mood:l>2.4?'smile':'wow',armA:l>2.4?[-20,-120]:[6,-6],propA:l>2.4?'letter':null,armB:[-10,8],look:-8},t));
    for(let i=0;i<6;i++){const st=1.0+i*.25,p=clamp((l-st)/1.0);
      if(p>0&&p<1){const x=330+(760-330)*p,y=1000-300*Math.sin(Math.PI*p)+(1120-1000)*p;sc+=g(`translate(${x},${y}) rotate(${p*360}) scale(${1-.3*p})`,coin())}}
    sc+=fgBushes();
    o+=cam(sc,l,2);
    o+=title([{text:'Nicht du zahlst!'},{text:'Die Versicherung',size:72},{text:'des Unfallgegners',hi:1,size:68}],l,.1,170);
    o+=pill('0 € für dich','#1E9E5A',420,l,2.5,800,780,52);
  }
  // ---------- S4: Freie Gutachterwahl ----------
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=officeBG();
    const wk=out(lin(l,.1,.9));
    sc+=g(`translate(${-300+(330+300)*wk},1600)`,body({...SLADEK,talk:VENV(t),walk:wk<1?1:0,armA:[-10,-110],propA:'tablet',armB:l>1?[-150+Math.sin(t*9)*14,-30]:[-8,8]},t));
    sc+=g(`translate(820,1600) scale(.92)`,body({...KUNDIN,mood:'smile',armA:[8,-4],armB:[-8,6],look:-10},t));
    sc+=leaf(-40,1500,-30,1.2,'#2C4A38')+leaf(1120,1700,200,1.1,'#24402F');
    o+=cam(sc,l,3);
    o+=title([{text:'Du wählst'},{text:'deinen Gutachter',hi:1,size:84}],l,.1);
    const kl=pop(l,1.6,.4);
    if(kl>.01){o+=g(`translate(810,640) scale(${kl}) rotate(-5)`,`<rect x="-190" y="-80" width="380" height="160" rx="20" fill="#fff"/><path d="M-190,-70 L0,30 L190,-70" stroke="#D5D9DF" stroke-width="6" fill="none"/>
       <rect x="-170" y="90" width="340" height="56" rx="28" fill="${DARK}"/><text y="128" text-anchor="middle" class="n" font-size="30" fill="#fff">„Nimm unseren Gutachter…“</text>`);
      if(l>2.5){const a=out(lin(l,2.5,.25)),b=out(lin(l,2.75,.25));
        o+=`<line x1="640" y1="540" x2="${640+340*a}" y2="${540+250*a}" stroke="${RED}" stroke-width="28" stroke-linecap="round"/>`;
        if(b>0)o+=`<line x1="980" y1="540" x2="${980-340*b}" y2="${540+250*b}" stroke="${RED}" stroke-width="28" stroke-linecap="round"/>`;}}
  }
  // ---------- S5: Freie Wahl ----------
  if(vis(t,4)){const l=t-SC[4].s;let sc='';
    sc+=workshopBG(t);
    sc+=g('translate(720,1480) scale(.9)',car(BLUE,1));
    sc+=g('translate(210,1640) scale(.92)',body({...SLADEK,talk:VENV(t),armA:[-6,-100],propA:'tablet',armB:[-55,-45],look:10},t));
    o+=cam(sc,l,4,.04);
    o+=title([{text:'Du hast die'},{text:'freie Wahl',hi:1,size:92}],l,.1);
    const icons={
      gut:`<circle cx="-4" cy="-4" r="17" fill="none" stroke="#fff" stroke-width="7"/><line x1="9" y1="9" x2="22" y2="22" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`,
      werk:`<g transform="rotate(-45)"><rect x="-7" y="-6" width="14" height="38" rx="6" fill="#fff"/><circle cy="-16" r="17" fill="#fff"/><rect x="-6" y="-36" width="12" height="18" fill="${RED}"/></g>`,
      law:`<text y="17" text-anchor="middle" class="t" font-size="50" fill="#fff">§</text>`};
    [['Gutachter','gut'],['Werkstatt','werk'],['Rechtsanwalt','law']].forEach(([txt,ic],i)=>{
      const k=pop(l,.6+i*.55,.45); if(k<.01) return;
      const kc=pop(l,.85+i*.55,.35);
      o+=g(`translate(540,${615+i*140}) scale(${k})`,`<rect x="-380" y="-54" width="760" height="116" rx="30" fill="#000" opacity=".12"/><rect x="-380" y="-60" width="760" height="116" rx="30" fill="#fff"/>
        <circle cx="-310" cy="-2" r="42" fill="${RED}"/>${g('translate(-310,-2)',icons[ic])}
        <text x="-245" y="18" class="t" font-size="56" fill="${DARK}">${txt}</text>
        ${g(`translate(310,-2) scale(${kc})`,`<circle r="36" fill="#1E9E5A"/><path d="M-15,0 L-4,12 L17,-12" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)}`);
    });
  }
  // ---------- S6: CTA ----------
  if(vis(t,5)){const l=t-SC[5].s;let sc='';
    sc+=nightBG(t);
    const k=out(lin(l,.1,.7));
    sc+=g(`translate(540,${1640+(1-k)*500})`,body({...SLADEK,talk:VENV(t),armA:[-6,-6],armB:[-150+Math.sin(t*9)*16,-30]},t));
    sc+=fgBushes('#1D2A26');
    o+=cam(sc,l,5,.04);
    const kl=pop(l,.1,.5);
    o+=g(`translate(540,330) scale(${kl})`,`<rect x="-360" y="-185" width="720" height="370" rx="30" fill="#000" stroke="#3a3a3a" stroke-width="3"/><image href="logo_hq.jpg" x="-340" y="-169" width="680" height="337" preserveAspectRatio="xMidYMid meet"/>`);
    o+=g(`translate(540,600) scale(${pop(l,.4,.4)})`,`<text text-anchor="middle" class="t" font-size="52" fill="#fff">Kronach &amp; Umgebung</text>`);
    const p=1+.04*Math.sin(l*7);
    o+=g(`translate(540,720) scale(${pop(l,.7,.4)*p})`,`<rect x="-400" y="-66" width="800" height="132" rx="66" fill="${RED}"/><text y="24" text-anchor="middle" class="t" font-size="66" fill="#fff">Folgen für mehr Tipps</text>`);
  }
  o+=topOverlay();
  o+=wordCaption(t,SC);
  o+=wipes(t,SC);
  document.getElementById('s').innerHTML=o;
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
