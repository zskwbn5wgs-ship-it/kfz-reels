# Kfz-Gutachten Sladek – Instagram-Reels

Erklär-Reels im Vektor-Stil für @kfz_gutachten_sladek.

- `reels/` – fertige Videos (9:16, mit Sprecherstimme), werden von hier aus über Metricool auf Instagram eingeplant.
- `vorlage/` – Vorlage zum Erzeugen neuer Reels:
  - `reel.html` – Szenen, Figuren und Animationen (SVG, Bild für Bild gerendert)
  - `record.js` – rendert `reel.html` mit Playwright und ffmpeg zu MP4
  - `sfx.py` – Musikbett, Soundeffekte und Abmischung mit der Stimme
  - `voice/` – Sprechtext und Zeitmarken der ElevenLabs-Stimme (Christian Plasa)

## Neues Reel erstellen
1. Ordner `vorlage/rNN/` anlegen mit `sentences.json` (ein Satz pro Szene) und `scenes.js` (Szenen; Vorlage: `r02/scenes.js`).
2. `python3 tts.py rNN` – Stimme (ElevenLabs, Christian Plasa) einsprechen, Szenen-Timing berechnen.
3. `events.json` für Soundeffekte anlegen, dann `python3 sfx_gen.py rNN/audio.wav rNN/voice_placed.wav rNN`.
4. `python3 build.py rNN` und `REEL=reel_rNN.html node record.js rNN/raw.mp4 rNN/audio.wav`.
5. Lautheit normalisieren (ffmpeg loudnorm I=-14) und nach `reels/` kopieren.
