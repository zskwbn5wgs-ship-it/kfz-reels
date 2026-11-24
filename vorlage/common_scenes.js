// ================= Gemeinsame Szenen-Bausteine (ab Reel 05) =================
const GREEN='#1E9E5A', ORANGE='#E88A00';
const vis=(t,i)=>t>=SC[i].s&&t<SC[i].e;
function cam(inner,l,N,zoom=.06){const d=SC[N].e-SC[N].s,p=io(clamp(l/d)),z=1+zoom*p,px=(N%2?-1:1)*18*p;
  return g(`translate(540,1150) scale(${z}) translate(${-540+px},-1150)`,inner)}
function fgBushes(c='#2C4A38'){return bush(-60,1880,1,c)+bush(1130,1900,1.1,shade(c,.85))}
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
function seriesPill(t,txt){const k=pop(t,.05,.4);return g(`translate(540,140) scale(${k})`,`<rect x="-240" y="-30" width="480" height="60" rx="30" fill="${DARK}"/><text y="12" text-anchor="middle" class="t" font-size="32" fill="#fff" letter-spacing="2">${txt}</text>`)}
function answer(txt,t,s,y,col=GREEN,w=860,fs=46){const k=pop(t,s,.4);if(k<.01)return '';
  return g(`translate(540,${y}) scale(${k})`,`<rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="#000" opacity=".15" transform="translate(0,6)"/><rect x="${-w/2}" y="-50" width="${w}" height="100" rx="50" fill="${col}"/>
   <circle cx="${-w/2+50}" r="30" fill="#fff"/><path d="M${-w/2+36},0 L${-w/2+46},11 L${-w/2+66},-11" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <text x="30" y="${fs*.36}" text-anchor="middle" class="t" font-size="${fs}" fill="#fff">${txt}</text>`)}
function note(txt,t,s,y,w=820){const k=out(lin(t,s,.3));if(k<=0)return '';
  return g(`translate(540,${y+(1-k)*20})`,`<rect x="${-w/2}" y="-32" width="${w}" height="64" rx="32" fill="#fff"/><text y="11" text-anchor="middle" class="c" font-size="31" fill="${DARK}">${txt}</text>`,k)}
function bubble(lines,t,s,x,y,w=600){const k=pop(t,s,.4);if(k<.01)return '';const h=40+lines.length*60;
  return g(`translate(${x},${y}) scale(${k})`,`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="40" fill="#fff"/><path d="M${-w/2+70},${h/2-10} L${-w/2+40},${h/2+60} L${-w/2+130},${h/2-5}Z" fill="#fff"/>
   ${lines.map((ln,i)=>`<text y="${-h/2+62+i*60}" text-anchor="middle" class="t" font-size="48" fill="${DARK}">${ln}</text>`).join('')}`)}
function qBig(t,s,x,y,r=56){const k=pop(t,s,.4);if(k<.01)return '';return g(`translate(${x},${y+Math.sin(t*3+x)*10}) scale(${k}) rotate(${Math.sin(t*2+y)*10})`,
  `<circle r="${r}" fill="${RED}"/><text y="${r*.45}" text-anchor="middle" class="t" font-size="${r*1.4}" fill="#fff">?</text>`)}
function stampC(txt,col,t,s,x,y,w=520){if(t<s)return '';const p=clamp((t-s)/.25),sc=2.2-1.2*out(p);
  return g(`translate(${x},${y}) rotate(-12) scale(${sc})`,`<rect x="${-w/2}" y="-62" width="${w}" height="124" rx="16" fill="#fff" opacity=".85"/><rect x="${-w/2}" y="-62" width="${w}" height="124" rx="16" fill="none" stroke="${col}" stroke-width="13"/>
   <text y="30" text-anchor="middle" class="t" font-size="88" fill="${col}" letter-spacing="4">${txt}</text>`,clamp(p*1.5))}
function policeLight(){return `<rect x="-60" y="10" width="120" height="26" rx="8" fill="#3B4250"/><path d="M-46,12 C-46,-50 46,-50 46,12Z" fill="#3D7BF0"/><path d="M-30,-10 C-26,-34 0,-40 10,-38" stroke="#fff" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>`}
function flash(l,times){let o='';times.forEach(ft=>{if(l>ft&&l<ft+.25){o+=`<rect width="1080" height="1920" fill="#fff" opacity="${.55*(1-(l-ft)/.25)}"/>`}});return o}
function ctaScene(t,l,lines){let sc='';
  sc+=nightBG(t);
  const k=out(lin(l,.1,.7));
  sc+=g(`translate(400,${1640+(1-k)*500})`,body({...SLADEK,talk:VENV(t),armA:[-6,-6],armB:[-150+Math.sin(t*9)*16,-30]},t));
  sc+=fgBushes('#1D2A26');
  let o=cam(sc,l,SC.length-1,.04);
  o+=g(`translate(540,300) scale(${pop(l,.1,.5)*.85})`,`<rect x="-360" y="-185" width="720" height="370" rx="30" fill="#000" stroke="#3a3a3a" stroke-width="3"/><image href="logo_hq.jpg" x="-340" y="-169" width="680" height="337"/>`);
  const p=1+.04*Math.sin(l*7);
  o+=g(`translate(540,600) scale(${pop(l,.5,.4)*p})`,`<rect x="-400" y="-66" width="800" height="132" rx="66" fill="${RED}"/><text y="24" text-anchor="middle" class="t" font-size="66" fill="#fff">Folgen für mehr Tipps</text>`);
  o+=bubble(lines,l,.3,720,980,540);
  return o}
function finish(o,t){o+=topOverlay();o+=wordCaption(t,SC);o+=wipes(t,SC);document.getElementById('s').innerHTML=o}
