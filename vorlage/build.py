"""Baut aus Bibliothek + Szenen + Timing die Reel-Seite.

Aufruf: python3 build.py r02   ->  erzeugt reel_r02.html (im Ordner vorlage/)
"""
import json, re, sys
d = sys.argv[1]
tm = json.load(open(f'{d}/timing.json'))
caps = json.load(open(f'{d}/sentences.json'))
st = tm['starts']; dur = tm['dur']
sc = [{'s': st[i], 'e': st[i + 1] if i + 1 < len(st) else dur} for i in range(len(st))]
lib = open('lib_head.html').read()
lib = re.sub(r'const DUR=[\d.]+;', f'const DUR={dur};', lib)
scenes = open(f'{d}/scenes.js').read()
import os
marks = json.load(open(f'{d}/marks.json')) if os.path.exists(f'{d}/marks.json') else {}
scenes = scenes.replace('__MARKS__', json.dumps(marks, ensure_ascii=False)).replace('__SC__', json.dumps(sc)).replace('__CAPS__', json.dumps(caps, ensure_ascii=False))
words = json.load(open(f'{d}/words.json')) if os.path.exists(f'{d}/words.json') else []
env = json.load(open(f'{d}/env.json')) if os.path.exists(f'{d}/env.json') else []
lib = lib.replace('__WORDS__', json.dumps(words, ensure_ascii=False)).replace('__ENV__', json.dumps(env))
open(f'reel_{d}.html', 'w').write(lib + scenes)
print(f'reel_{d}.html gebaut, {len(sc)} Szenen, {dur}s')
