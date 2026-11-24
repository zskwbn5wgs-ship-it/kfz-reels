// ================= Reel 05: Versicherung kürzt das Gutachten =================
const SC=__SC__;
const CAPS=__CAPS__;
const MK=__MARKS__;
__COMMON__
const ANWALT={skin:'#F0C8A0',hair:'#A7A7A7',hairD:'#7E7E7E',shirt:'#2E3440',pants:'#2E3440',shoes:'#1A1A1A',longSleeve:true};
const tie=`<path d="M-30,-536 L0,-482 L30,-536Z" fill="#fff"/><path d="M-9,-530 L9,-530 L13,-446 L0,-428 L-13,-446Z" fill="#B0242C"/>`;
function settlement(t,s,cut){const k=pop(t,s,.45);if(k<.01)return '';
  const c=clamp((t-cut)/.5);
  return g(`translate(560,760) rotate(-3) scale(${k})`,`<rect x="-300" y="-190" width="600" height="380" rx="20" fill="#000" opacity=".14" transform="translate(0,10)"/><rect x="-300" y="-190" width="600" height="380" rx="20" fill="#fff"/>
    <rect x="-300" y="-190" width="600" height="70" rx="20" fill="#8A939C"/><rect x="-300" y="-140" width="600" height="20" fill="#8A939C"/>
    <text y="-142" text-anchor="middle" class="t" font-size="36" fill="#fff">ABRECHNUNG DER VERSICHERUNG</text>
    <text x="-260" y="-50" class="n" font-size="34" fill="${DARK}">Laut Gutachten:</text><text x="260" y="-50" text-anchor="end" class="t" font-size="44" fill="${DARK}">4.850 €</text>
    ${c>0?`<line x1="120" y1="-62" x2="${120+140*c}" y2="-62" stroke="${RED}" stroke-width="8"/>`:''}
    <text x="-260" y="40" class="n" font-size="34" fill="${DARK}">Erstattet:</text>
    <text x="260" y="44" text-anchor="end" class="t" font-size="60" fill="${RED}" opacity="${c}">3.990 €</text>
    <text x="0" y="140" text-anchor="middle" class="c" font-size="26" fill="${DARK}" opacity=".6">Beispielwerte</text>`)}
function pruefbericht(t,s,marks){const k=pop(t,s,.45);if(k<.01)return '';
  const rows=[['Reparaturkosten',null],['Stundenverrechnungssätze',marks[0]],['Verbringungskosten',marks[1]],['UPE-Aufschläge',marks[1]+.4]];
  let r='';rows.forEach(([txt,m],i)=>{const y=-60+i*70;r+=`<text x="-250" y="${y}" class="n" font-size="31" fill="${DARK}">${txt}</text>`;
    if(m!=null&&t>m){const c=out(clamp((t-m)/.35));r+=`<line x1="-260" y1="${y-12}" x2="${-260+520*c}" y2="${y-12}" stroke="${RED}" stroke-width="9" stroke-linecap="round"/>`}});
  return g(`translate(560,800) rotate(2) scale(${k})`,`<rect x="-300" y="-200" width="600" height="400" rx="20" fill="#000" opacity=".14" transform="translate(0,10)"/><rect x="-300" y="-200" width="600" height="400" rx="20" fill="#fff"/>
    <rect x="-300" y="-200" width="600" height="70" rx="20" fill="${DARK}"/><rect x="-300" y="-150" width="600" height="20" fill="${DARK}"/>
    <text y="-152" text-anchor="middle" class="t" font-size="38" fill="#fff">PRÜFBERICHT</text>${r}`)}

function render(t){
  let o=defs();
  if(vis(t,0)){const l=t;let sc='';
    sc+=officeBG();
    sc+=g('translate(820,1640) scale(.92)',body({...KUNDIN,mood:l>2.2?'worry':'smile',armA:[-20,-120],propA:'letter',armB:[-8,8],look:-10},t));
    sc+=leaf(-40,1500,-30,1.2,'#2C4A38');
    o+=cam(sc,l,0);
    o+=title([{text:'Versicherung kürzt?',size:80},{text:'Was jetzt?',hi:1,size:92}],l,.15,230);
    o+=settlement(l,.6,2.0);
    o+=seriesPill(l,'GUTACHTER-WISSEN #4');
  }
  if(vis(t,1)){const l=t-SC[1].s;let sc='';
    sc+=officeBG();
    sc+=leaf(1120,1700,200,1.1,'#24402F');
    o+=cam(sc,l,1,.04);
    o+=title([{text:'Der Prüfbericht'},{text:'streicht Kosten',hi:1,size:88}],l,.1);
    o+=pruefbericht(l,.4,[MK['1:Stundensätze']||4.6,MK['1:Nebenkosten']||5.4]);
    o+=stampC('GEKÜRZT',RED,l,(MK['1:Nebenkosten']||5.4)+.5,700,1080,500);
  }
  if(vis(t,2)){const l=t-SC[2].s;let sc='';
    sc+=officeBG();
    sc+=g('translate(300,1660) scale(.95)',body({...SLADEK,talk:VENV(t),armA:[-10,-110],propA:'tablet',armB:[-60,-40]},t));
    sc+=g('translate(830,1660) scale(.88)',body({...KUNDIN,mood:'smile',armA:[6,-6],armB:[-8,8],look:-10},t));
    o+=cam(sc,l,2,.04);
    o+=title([{text:'Nicht einfach'},{text:'zustimmen!',hi:1,size:96}],l,.1);
    o+=answer('Nicht vorschnell zustimmen',l,MK['2:Nicht']||1.1,640,ORANGE);
    o+=answer('Gutachter nimmt Stellung',l,MK['2:Dein Gutachter']||3.4,770);
  }
  if(vis(t,3)){const l=t-SC[3].s;let sc='';
    sc+=officeBG();
    sc+=g('translate(300,1660) scale(.95)',body({...ANWALT,mood:'smile',talk:VENV(t),armA:[-10,-110],propA:'letter',armB:[-8,8],look:8},t)+tie);
    sc+=g('translate(830,1660) scale(.88)',body({...KUNDIN,mood:'smile',armA:[6,-6],armB:[-8,8],look:-10},t));
    o+=cam(sc,l,3,.04);
    o+=title([{text:'Hol dir'},{text:'Unterstützung',hi:1,size:92}],l,.1);
    if(l>(MK['3:Anwalt']||1)-.2) o+=g(`translate(560,780) scale(${pop(l,(MK['3:Anwalt']||1)-.2,.4)})`,`<circle r="90" fill="${DARK}"/><text y="44" text-anchor="middle" class="t" font-size="130" fill="#fff">§</text>`);
    o+=answer('Anwalt für Verkehrsrecht',l,MK['3:Anwalt']||1,640);
    o+=note('Bei unverschuldetem Unfall: meist ohne eigene Kosten',l,MK['3:bei unverschuldetem']||3.2,920,860);
  }
  if(vis(t,4)){const l=t-SC[4].s;o+=ctaScene(t,l,['Schon mal','gekürzt worden?']);}
  finish(o,t);
}
window.render=render; window.DUR=DUR; render(0);
</script></body></html>
