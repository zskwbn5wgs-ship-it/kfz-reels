# Kfz-Gutachten Sladek – Instagram-Reels

Erklär-Reels im Vektor-Stil für @kfz_gutachten_sladek.

- `reels/` – fertige Videos (9:16, mit Sprecherstimme), werden von hier aus über Metricool auf Instagram eingeplant.
- `vorlage/` – Vorlage zum Erzeugen neuer Reels:
  - `reel.html` – Szenen, Figuren und Animationen (SVG, Bild für Bild gerendert)
  - `record.js` – rendert `reel.html` mit Playwright und ffmpeg zu MP4
  - `sfx.py` – Musikbett, Soundeffekte und Abmischung mit der Stimme
  - `voice/` – Sprechtext und Zeitmarken der ElevenLabs-Stimme (Christian Plasa)
