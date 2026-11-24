"""Sprechtext mit ElevenLabs einsprechen und Szenen-Timing berechnen.

Aufruf: python3 tts.py <ordner>
  <ordner>/sentences.json  – Liste der Sätze, ein Satz pro Szene
Erzeugt:
  <ordner>/voice_full.mp3, voice_placed.wav, timing.json
Der API-Schlüssel wird vom Netzwerk-Proxy eingefügt (Header xi-api-key).
"""
import json, sys, base64, subprocess, wave, urllib.request
import numpy as np

VOICE_ID = 'z1EhmmPwF0ENGYE8dBE6'   # Christian Plasa
MODEL = 'eleven_multilingual_v2'
LEAD, MIN_SCENE, PAD_AFTER = 0.3, 3.6, 0.75

d = sys.argv[1]
S = json.load(open(f'{d}/sentences.json'))
req = urllib.request.Request(
    f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps?output_format=mp3_44100_128',
    data=json.dumps({'text': ' '.join(S), 'model_id': MODEL,
                     'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75}}).encode(),
    headers={'Content-Type': 'application/json', 'xi-api-key': 'proxy-injected'})
res = json.load(urllib.request.urlopen(req, timeout=120))
open(f'{d}/voice_full.mp3', 'wb').write(base64.b64decode(res['audio_base64']))
al = res['alignment']; txt = ''.join(al['characters'])
st_, en_ = al['character_start_times_seconds'], al['character_end_times_seconds']
times, pos = [], 0
for s in S:
    i = txt.index(s, pos); j = i + len(s); pos = j
    times.append((st_[i], en_[j - 1]))

durs = [max(MIN_SCENE, (b - a) + PAD_AFTER) for a, b in times]; durs[-1] += 0.8
starts = [0.0]
for x in durs[:-1]: starts.append(round(starts[-1] + x, 2))
DUR = round(starts[-1] + durs[-1], 2)
json.dump({'starts': starts, 'dur': DUR, 'sentence_times': times}, open(f'{d}/timing.json', 'w'), indent=1)
# Marker: Zeitpunkt von Schlüsselwörtern relativ zum Szenenstart (für Animationen)
marks = {}
for k, w in (json.load(open(f'{d}/marks_words.json')) if __import__('os').path.exists(f'{d}/marks_words.json') else []):
    a0, _ = times[k]; i0 = txt.index(S[k]); i = txt.index(w, i0)
    marks[f'{k}:{w}'] = round(LEAD + (st_[i] - a0), 2)
json.dump(marks, open(f'{d}/marks.json', 'w'), ensure_ascii=False, indent=1)

subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{d}/voice_full.mp3', '-ac', '1', '-ar', '44100', f'{d}/voice_full.wav'], check=True)
w = wave.open(f'{d}/voice_full.wav'); SR = w.getframerate()
v = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float)
out = np.zeros(int(DUR * SR) + SR)
for k, (a, b) in enumerate(times):
    a0 = max(0, a - 0.06); b0 = b + 0.18
    if k + 1 < len(times): b0 = min(b0, times[k + 1][0] - 0.02)
    seg = v[int(a0 * SR):int(b0 * SR)].copy(); f = int(.01 * SR)
    seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    p = int((starts[k] + LEAD) * SR); out[p:p + len(seg)] += seg
out = out[:int(DUR * SR)]
with wave.open(f'{d}/voice_placed.wav', 'w') as o:
    o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes(np.clip(out, -32768, 32767).astype(np.int16).tobytes())
for s, (a, b), st in zip(S, times, starts): print(f'Szene ab {st:5.2f}s | Satz {b-a:4.2f}s | {s}')
print('Gesamtdauer', DUR)
