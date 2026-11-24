// ================= Reel 06: Parkrempler / Unfallflucht =================
const SC=__SC__;
const CAPS=__CAPS__;
const MK=__MARKS__;
__COMMON__
function parkingBG(t){let s=streetBG(t,0);
  s+=`<rect y="1290" width="1080" height="290" fill="#7A8089"/>`+[0,1,2,3,4].map(i=>`<rect x="${i*270-20}" y="1300" width="10" height="270" fill="#F4F4F4" opacity=".85"/>`).join('');
  s+=`<rect x="60" y="1080" width="70" height="70" rx="12" fill="${BLUE}"/><text x="95" y="1135" text-anchor="middle" class="t" font-size="56" fill="#fff">P</text><rect x="90" y="1150" width="10" height="130" fill="#8A939C"/>`;
  return s}
function camIcon(x,y,k){return g(`translate(${x},${y}) scale(${k})`,`<rect x="-46" y="-30" width="92" height="64" rx="12" fill="${DARK}"/><rect x="-18" y="-40" width="36" height="14" rx="4" fill="${DARK}"/><circle r="20" fill="#8FC7F0" stroke="#fff" stroke-width="6"/>`)}

function render(t){
  let o=defs();
  if(vis(t,0)){const l=t;let sc='';
    sc+=parkingBG(t);
    sc+=g('translate(560,1450) scale(.95)',car(RED,1));
    sc+=g('translate(900,1610) scale(.9)',body({...KUNDIN,mood:l>1.2?'wow':'smile',armA:[6,-6],armB:[-8,8],look:-12},t));
    sc+=fgBushes();
    o+=cam(sc,l,0);
    o+=title([{text:'Delle am Auto –'},{text:'und kein Zettel?',hi:1,size:88}],l,.15,230);
    if(l>1.2){const pr=1+.12*Math.sin(t*8);o+=g(`translate(780,1390) scale(${pr*pop(l,1.2,.4)})`,`<circle r="85" fill="none" stroke="${RED}" stroke-width="10" stroke-dasharray="20 14"/>`)}
    o+=qBig(l,1.6,840,840)+qBig(l,1.9,700,780,40);
    o+=seriesPill(l,'GUTACHTER-WISSEN #5');
  }
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    const f1=MK['1:Fotos']||2.5,f2=MK['1:Umgebung']||4.7;
    sc+=parkingBG(t);
    sc+=g('translate(500,1450) scale(.95)',car(RED,1));
    sc+=g('translate(900,1610) scale(.9)',body({...KUNDIN,mood:'smile',armA:[-40,-120],propA:'phone',armB:[-8,8],look:-10},t));
    sc+=fgBushes();
    o+=cam(sc,l,1);
    o+=title([{text:'Ruhe bewahren'},{text:'& Fotos machen',hi:1,size:88}],l,.1);
    o+=flash(l,[f1+.1,f1+.7,f2+.1]);
    [[260,760,f1+.1],[460,740,f1+.7],[660,760,f2+.1]].forEach(([x,y,s])=>{if(l>s)o+=camIcon(x,y,pop(l,s,.3))});
    o+=answer('Schaden + Umgebung fotografieren',l,f1,900,GREEN,900,42);
  }
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    const mp=MK['2:Polizei']||1.9;
    sc+=parkingBG(t);
    sc+=g('translate(480,1450) scale(.95)',car(RED,1));
    sc+=g('translate(900,1610) scale(.9)',body({...KUNDIN,mood:'smile',armA:[-30,-150],propA:'phone',armB:[-8,8],look:-10},t));
    sc+=fgBushes();
    o+=cam(sc,l,2);
    o+=title([{text:'Unfallflucht'},{text:'melden',hi:1,size:96}],l,.1);
    if(l>mp-.3){const blink=Math.sin(t*14)>0;o+=g(`translate(540,760) scale(${pop(l,mp-.3,.4)*1.6})`,policeLight()+(blink?`<circle cy="-20" r="70" fill="#3D7BF0" opacity=".25"/>`:''))}
    o+=answer('Bei der Polizei anzeigen',l,mp,920);
    o+=note('Oft wichtig für die Versicherung',l,mp+1.2,1030,620);
  }
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=workshopBG(t);
    sc+=g('translate(640,1480) scale(1.05)',car(RED,1));
    const pr=1+.12*Math.sin(t*8);
    sc+=g(`translate(890,1405) scale(${pr*pop(l,.6,.4)})`,`<circle r="80" fill="none" stroke="${RED}" stroke-width="10" stroke-dasharray="20 14"/>`);
    sc+=g('translate(170,1660) scale(.88)',body({...SLADEK,talk:VENV(t),armA:[-10,-110],propA:'tablet',armB:[-55,-45],look:12},t));
    o+=cam(sc,l,3,.04);
    o+=title([{text:'Schaden'},{text:'dokumentieren',hi:1,size:92}],l,.1);
    o+=answer('Unabhängiges Gutachten',l,MK['3:unabhängigen']||1.9,720);
  }
  if(vis(t,4)){const l=t-SC[4].s;o+=ctaScene(t,l,['Schon mal','passiert?']);}
  finish(o,t);
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
