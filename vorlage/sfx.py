"""Sounddesign + Musikbett für das Reel. Aufruf: python3 sfx.py out.wav [voice.wav]"""
import numpy as np, sys, wave
import json as _j
TM=_j.load(open("voice/timing.json"))
SR=44100; DUR=TM["dur"]; N=int(SR*DUR)
rng=np.random.default_rng(1)
mix=np.zeros(N); music=np.zeros(N)
def add(buf,sig,t,gain=1.0):
    i=int(t*SR)
    if i>=N: return
    j=min(N,i+len(sig)); buf[i:j]+=sig[:j-i]*gain
def env(n,a=0.005,r=0.2):
    t=np.arange(n)/SR; e=np.minimum(1,t/a)*np.exp(-t/r); return e
def lp(x,k=0.08):  # einfacher Tiefpass
    y=np.zeros_like(x); acc=0
    for i in range(len(x)): acc+=k*(x[i]-acc); y[i]=acc
    return y
def pop(f=900):
    n=int(.12*SR); t=np.arange(n)/SR; fr=f*np.exp(-t*18)+f*0.5
    return np.sin(2*np.pi*np.cumsum(fr)/SR)*env(n,.002,.04)
def whoosh(d=.45,up=True):
    n=int(d*SR); x=rng.standard_normal(n); t=np.linspace(0,1,n)
    k=0.02+0.25*(t if up else 1-t); y=np.zeros(n); acc=0
    for i in range(n): acc+=k[i]*(x[i]-acc); y[i]=acc
    return y*np.sin(np.pi*t)**2*1.6
def crash():
    n=int(.9*SR); t=np.arange(n)/SR
    thump=np.sin(2*np.pi*np.cumsum(120*np.exp(-t*8)+40)/SR)*env(n,.001,.18)
    noise=lp(rng.standard_normal(n),.35)*env(n,.001,.12)
    clank=sum(np.sin(2*np.pi*f*t)*env(n,.001,.25)*0.15 for f in (1230,1870,2650))
    return thump*1.2+noise*0.9+clank
def coin():
    n=int(.35*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*2093*t)+0.6*np.sin(2*np.pi*3136*t))*env(n,.001,.09)*0.5
def ding():
    n=int(.9*SR); t=np.arange(n)/SR
    return sum(np.sin(2*np.pi*f*t)*w for f,w in ((1046.5,1),(1568,.5),(2093,.3)))*env(n,.002,.35)*0.45
def tick():
    n=int(.03*SR); return rng.standard_normal(n)*env(n,.0005,.006)*0.5
def scribble():
    n=int(.25*SR); x=lp(rng.standard_normal(n),.5); t=np.arange(n)/SR
    return x*(0.6+0.4*np.sin(2*np.pi*22*t))*np.sin(np.pi*t/t[-1])*0.8

# --- Musikbett: 100 BPM, C - G - Am - F, weiche Pads + Pluck + leichter Beat ---
bpm=100; beat=60/bpm
chords=[(261.6,329.6,392.0),(196.0,246.9,293.7),(220.0,261.6,329.6),(174.6,220.0,261.6)]
bar=4*beat; t_all=np.arange(N)/SR
for b in range(int(DUR/bar)+1):
    ch=chords[b%4]; st=b*bar; n=int(bar*SR); t=np.arange(n)/SR
    pad=sum(np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t) for f in ch)
    pad*=np.minimum(1,t/0.25)*np.minimum(1,(bar-t)/0.25)
    add(music,pad,st,0.05)
    add(music,np.sin(2*np.pi*ch[0]/2*t)*env(n,.01,.6),st,0.12)  # Bass
    for k in range(8):  # Pluck-Arpeggio
        f=ch[k%3]*(2 if k%4==3 else 1); m=int(.4*SR); tt=np.arange(m)/SR
        add(music,np.sin(2*np.pi*f*2*tt)*env(m,.002,.12),st+k*beat/2,0.05)
    for k in range(4):  # Kick + Hat
        m=int(.25*SR); tt=np.arange(m)/SR
        add(music,np.sin(2*np.pi*np.cumsum(55+90*np.exp(-tt*30))/SR)*env(m,.001,.12),st+k*beat,0.35 if k%2==0 else 0.2)
        add(music,rng.standard_normal(int(.05*SR))*env(int(.05*SR),.0005,.012),st+k*beat+beat/2,0.06)
music*=np.minimum(1,t_all/1.0)*np.minimum(1,(DUR-t_all)/1.5)

# --- Effekte, synchron zu reel.html ---
SC=TM["starts"]
add(mix,whoosh(1.2),0.1,0.35); add(mix,crash(),1.3,0.9)
for s in SC: add(mix,pop(700),s+0.15,0.35); add(mix,pop(950),s+0.3,0.25)
for s in SC[1:]: add(mix,whoosh(.45),s-0.25,0.7)
tt=0.6
while tt<2.0: add(mix,tick(),SC[1]+tt,0.7); tt+=0.09
for i in range(6): add(mix,coin(),SC[2]+1.0+i*.25+1.0,0.8)
add(mix,ding(),SC[2]+2.5,0.8)
add(mix,whoosh(.5),SC[3]+0.2,0.4); add(mix,pop(800),SC[3]+1.6,0.4)
add(mix,scribble(),SC[3]+2.5,0.8); add(mix,scribble(),SC[3]+2.75,0.8)
for i in range(3): add(mix,pop(850),SC[4]+.6+i*.55,0.45); add(mix,ding(),SC[4]+.85+i*.55,0.45)
for d in (.1,.4,.7): add(mix,pop(900),SC[5]+d,0.35)

voice=None
if len(sys.argv)>2:
    w=wave.open(sys.argv[2]); v=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
    if w.getnchannels()==2: v=v.reshape(-1,2).mean(1)
    voice=np.zeros(N); voice[:min(N,len(v))]=v[:N]
    duck=np.convolve(np.abs(voice)>0.02, np.ones(SR//4)/(SR//4), 'same')
    music*=1-0.65*np.clip(duck*3,0,1)
out=music*0.9+mix*(0.55 if voice is not None else 0.8)+(voice*1.6 if voice is not None else 0)
out/=max(1e-9,np.abs(out).max())/0.89
st=np.stack([out,out],1)
with wave.open(sys.argv[1],'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
