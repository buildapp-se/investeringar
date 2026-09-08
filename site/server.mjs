// Minimal statisk server. ES-moduler kan inte laddas over file://, darfor
// behovs den for att oppna prototypen. Kors med: node server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

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
  const rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  const fil = join(ROT, rel === '' ? 'index.html' : rel);
  if (!fil.startsWith(ROT)) { res.writeHead(403).end('Nej'); return; }
  try {
    const data = await readFile(fil);
    res.writeHead(200, { 'Content-Type': TYPER[extname(fil)] ?? 'application/octet-stream' }).end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Hittades inte');
  }
}).listen(PORT, () => console.log(`Prototypen kors pa http://localhost:${PORT}`));
