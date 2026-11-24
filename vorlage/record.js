// Rendert reel.html Bild für Bild und schreibt ein MP4.
// Aufruf: node record.js out.mp4 [voice.m4a] [nur_standbilder: "1,5,9"]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const [out, voice, stills] = process.argv.slice(2);
const FPS = 30;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, process.env.REEL || 'reel.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  if (stills) {
    for (const s of stills.split(',')) {
      await p.evaluate(t => window.render(t), +s);
      await p.screenshot({ path: `still_${s}.png` });
    }
    await b.close(); return;
  }
  const dur = await p.evaluate(() => window.DUR);
  const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-'];
  if (voice) args.push('-i', voice); else args.push('-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo');
  args.push('-t', String(dur), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
            '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out);
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < dur * FPS; i++) {
    await p.evaluate(t => window.render(t), i / FPS);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})();
