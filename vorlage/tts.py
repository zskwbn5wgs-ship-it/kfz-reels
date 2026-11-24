"""Sprechtext mit ElevenLabs einsprechen, Szenen-Timing, Wort-Zeiten und Mundbewegung berechnen.

Aufruf: python3 tts.py <ordner> [--neu]
  <ordner>/sentences.json   – Liste der Sätze, ein Satz pro Szene
  <ordner>/marks_words.json – optional: [[szene, "Wort"], ...] für Animations-Marker
Erzeugt in <ordner>:
  alignment.json  – Rohdaten von ElevenLabs (Cache; nur mit --neu wird neu eingesprochen)
  voice_placed.wav, timing.json, words.json, env.json, marks.json
Der API-Schlüssel wird vom Netzwerk-Proxy eingefügt (Header xi-api-key).
"""
import json, os, sys, base64, subprocess, wave, urllib.request, re
import numpy as np

VOICE_ID = 'z1EhmmPwF0ENGYE8dBE6'   # Christian Plasa
MODEL = 'eleven_multilingual_v2'
LEAD = 0.5        # Pause zwischen Szenenstart und Sprechbeginn (Übergang läuft davor)
PAD_AFTER = 1.0   # Luft nach dem Satz bis zur nächsten Szene
MIN_SCENE = 3.8
FPS = 30

d = sys.argv[1]
S = json.load(open(f'{d}/sentences.json'))
cache = f'{d}/alignment.json'
if '--neu' in sys.argv or not os.path.exists(cache) or json.load(open(cache)).get('text') != ' '.join(S):
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps?output_format=mp3_44100_128',
        data=json.dumps({'text': ' '.join(S), 'model_id': MODEL,
                         'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75}}).encode(),
        headers={'Content-Type': 'application/json', 'xi-api-key': 'proxy-injected'})
    res = json.load(urllib.request.urlopen(req, timeout=120))
    open(f'{d}/voice_full.mp3', 'wb').write(base64.b64decode(res['audio_base64']))
    json.dump({'text': ' '.join(S), 'alignment': res['alignment']}, open(cache, 'w'))
    print('neu eingesprochen')
al = json.load(open(cache))['alignment']
txt = ''.join(al['characters']); cs, ce = al['character_start_times_seconds'], al['character_end_times_seconds']

# Satzgrenzen
times, spans, pos = [], [], 0
for s in S:
    i = txt.index(s, pos); j = i + len(s); pos = j
    times.append((cs[i], ce[j - 1])); spans.append((i, j))

durs = [max(MIN_SCENE, LEAD + (b - a) + PAD_AFTER) for a, b in times]; durs[-1] += 0.8
starts = [0.0]
for x in durs[:-1]: starts.append(round(starts[-1] + x, 2))
DUR = round(starts[-1] + durs[-1], 2)
shift = [starts[k] + LEAD - times[k][0] for k in range(len(S))]   # Original-Zeit -> Video-Zeit
json.dump({'starts': starts, 'dur': DUR, 'lead': LEAD}, open(f'{d}/timing.json', 'w'), indent=1)

# Wörter mit Video-Zeiten (für mitlaufende Untertitel)
words = []
for k, (i, j) in enumerate(spans):
    for m in re.finditer(r'\S+', txt[i:j]):
        a, b = i + m.start(), i + m.end() - 1
        words.append([k, m.group(), round(cs[a] + shift[k], 3), round(ce[b] + shift[k], 3)])
json.dump(words, open(f'{d}/words.json', 'w'), ensure_ascii=False)

# Marker für Animationen (relativ zum Szenenstart)
marks = {}
mw = f'{d}/marks_words.json'
for k, w in (json.load(open(mw)) if os.path.exists(mw) else []):
    i = txt.index(w, spans[k][0]); marks[f'{k}:{w}'] = round(cs[i] + shift[k] - starts[k], 2)
json.dump(marks, open(f'{d}/marks.json', 'w'), ensure_ascii=False, indent=1)

# Stimme platzieren
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{d}/voice_full.mp3', '-ac', '1', '-ar', '44100', f'{d}/voice_full.wav'], check=True)
w = wave.open(f'{d}/voice_full.wav'); SR = w.getframerate()
v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
out = np.zeros(int(DUR * SR) + SR)
for k, (a, b) in enumerate(times):
    a0 = max(0, a - 0.08); b0 = b + 0.30
    if k + 1 < len(times): b0 = min(b0, times[k + 1][0] - 0.03)
    seg = v[int(a0 * SR):int(b0 * SR)].copy(); f = int(.015 * SR)
    seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    p = int((a0 + shift[k]) * SR); out[p:p + len(seg)] += seg
out = out[:int(DUR * SR)]
with wave.open(f'{d}/voice_placed.wav', 'w') as o:
    o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes(np.clip(out, -32768, 32767).astype(np.int16).tobytes())

# Mundbewegung: Lautstärke-Hüllkurve pro Videobild
hop = SR // FPS
rms = np.array([np.sqrt(np.mean(out[i:i + hop] ** 2)) for i in range(0, len(out) - hop, hop)])
ref = np.percentile(rms[rms > 0], 95) if (rms > 0).any() else 1
env = np.clip(rms / ref, 0, 1)
env = np.convolve(env, [0.25, 0.5, 0.25], 'same')
json.dump([round(float(x), 2) for x in env], open(f'{d}/env.json', 'w'))

for s, (a, b), st in zip(S, times, starts): print(f'Szene ab {st:5.2f}s | Satz {b-a:4.2f}s | {s}')
print('Gesamtdauer', DUR)
