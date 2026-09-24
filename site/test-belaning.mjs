// Kontroll av belaningstaket. Kors med: node test-belaning.mjs

import { strict as assert } from 'node:assert';
import { maxLan } from './belaning.js';
import { BELANING } from './data.js';

let fel = 0;
function provar(namn, fn) {
  try { fn(); console.log(`  ok   ${namn}`); }
  catch (e) { fel++; console.log(`  FEL  ${namn}\n       ${e.message.split('\n')[0]}`); }
}

provar('grans mot totalen: 450 000 eget och 10 % ger 50 000 i lan', () => {
  assert.equal(Math.round(maxLan(450000, { grans: 0.10, motTotal: true })), 50000);
});

provar('grans mot totalen haller: lan / (eget + lan) blir exakt gransen', () => {
  const lan = maxLan(300000, { grans: 0.34, motTotal: true });
  assert.ok(Math.abs(lan / (300000 + lan) - 0.34) < 1e-12);
});

provar('grans mot eget kapital: 100 000 och 5 % ger 5 000', () => {
  assert.equal(maxLan(100000, { grans: 0.05, motTotal: false }), 5000);
});

provar('taket i kronor begransar lanet', () => {
  assert.equal(maxLan(90000000, { grans: 0.10, motTotal: true, tak: 3000000 }), 3000000);
});

provar('varje plattform i data.js har en giltig basta niva', () => {
  for (const p of BELANING) {
    assert.ok(p.basta.ranta > 0 && p.basta.ranta < 0.2, `${p.namn}: ranta ${p.basta.ranta}`);
    assert.doesNotThrow(() => maxLan(100000, p.basta), `${p.namn}`);
  }
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => maxLan(-1, { grans: 0.1, motTotal: true }), RangeError);
  assert.throws(() => maxLan(1000, { grans: 1, motTotal: true }), RangeError);
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
