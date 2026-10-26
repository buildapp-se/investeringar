// Minimal statisk server. ES-moduler kan inte laddas over file://, darfor
// behovs den for att oppna prototypen. Kors med: node server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

const ROT = import.meta.dirname;
// Fel MIME-typ pa CSS gor att webblasaren tyst vagrar tillampa stilmallen,
// utan felmeddelande. Hall listan komplett.
const TYPER = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};
const PORT = Number(process.env.PORT) || 4173;

createServer(async (req, res) => {
  // Trasig kodning (/%ff) kastar: svara 400 i stallet for att servern dor.
  let rel;
  try {
    rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  } catch {
    res.writeHead(400).end('Ogiltig adress');
    return;
  }
  const fil = join(ROT, rel === '' ? 'index.html' : rel);
  // Med avgransaren, annars slapps en syskonmapp som borjar likadant (site-x) igenom.
  if (!fil.startsWith(ROT + sep)) { res.writeHead(403).end('Nej'); return; }
  try {
    const data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYPER[extname(fil)] ?? 'application/octet-stream' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Hittades inte');
  }
}).listen(PORT, () => console.log(`Prototypen kors pa http://localhost:${PORT}`));
