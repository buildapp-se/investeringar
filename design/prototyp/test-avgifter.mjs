// Kontroll av avgiftsberakningen. Kors med: node test-avgifter.mjs
//
// Ankaret ar det kontrollerade raknexemplet i docs/research/kostnadsmetod.md:
// 100 000 kr engangsinsattning, 20 ar, 5 procent brutto, arsvis simulering med
// avgiften dragen vid varje arsslut efter arets tillvaxt.

import { strict as assert } from 'node:assert';
import { avgiftseffekt, totalArligAvgift, kronor, procent } from './avgifter.js';

let fel = 0;
function provar(namn, fn) {
  try {
    fn();
    console.log(`  ok   ${namn}`);
  } catch (e) {
    fel++;
    console.log(`  FEL  ${namn}\n       ${e.message.split('\n')[0]}`);
  }
}

const arsvis = { engangsinsattning: 100000, manadssparande: 0, ar: 20, raknesats: 0.05, perioderPerAr: 1 };

console.log('Ankare mot docs/research/kostnadsmetod.md');

provar('0,20 % ger 6 792 kr dragna avgifter', () => {
  const r = avgiftseffekt(arsvis, 0.002);
  assert.equal(Math.round(r.dragnaAvgifter), 6792, `fick ${Math.round(r.dragnaAvgifter)}`);
});

provar('0,20 % ger 10 414 kr total effekt', () => {
  const r = avgiftseffekt(arsvis, 0.002);
  assert.equal(Math.round(r.totalEffekt), 10414, `fick ${Math.round(r.totalEffekt)}`);
});

provar('0,40 % ger 13 287 kr dragna avgifter', () => {
  const r = avgiftseffekt(arsvis, 0.004);
  assert.equal(Math.round(r.dragnaAvgifter), 13287, `fick ${Math.round(r.dragnaAvgifter)}`);
});

provar('0,40 % ger 20 439 kr total effekt', () => {
  const r = avgiftseffekt(arsvis, 0.004);
  assert.equal(Math.round(r.totalEffekt), 20439, `fick ${Math.round(r.totalEffekt)}`);
});

console.log('\nEgenskaper som maste halla');

provar('total effekt overstiger alltid dragna avgifter', () => {
  const r = avgiftseffekt(arsvis, 0.002);
  assert.ok(r.totalEffekt > r.dragnaAvgifter, 'ranta-pa-ranta-gapet saknas');
  assert.ok(r.uteblivenTillvaxt > 0);
});

provar('noll avgift ger noll effekt', () => {
  const r = avgiftseffekt(arsvis, 0);
  assert.equal(Math.round(r.totalEffekt), 0);
  assert.equal(Math.round(r.dragnaAvgifter), 0);
});

provar('hogre avgift ger alltid hogre effekt', () => {
  const lag = avgiftseffekt(arsvis, 0.002).totalEffekt;
  const hog = avgiftseffekt(arsvis, 0.004).totalEffekt;
  assert.ok(hog > lag);
});

provar('insatt belopp raknas ratt vid manadssparande', () => {
  const r = avgiftseffekt({ engangsinsattning: 100000, manadssparande: 2000, ar: 10, raknesats: 0.07 }, 0.002);
  assert.equal(Math.round(r.insatt), 100000 + 2000 * 120, `fick ${Math.round(r.insatt)}`);
});

provar('manadsvis och arsvis ger nara samma resultat utan manadssparande', () => {
  const m = avgiftseffekt({ ...arsvis, perioderPerAr: 12 }, 0.002).totalEffekt;
  const a = avgiftseffekt(arsvis, 0.002).totalEffekt;
  assert.ok(Math.abs(m - a) / a < 0.02, `skillnad ${((m - a) / a * 100).toFixed(2)} %`);
});

provar('plattformsavgift laggs till fondavgift', () => {
  assert.equal(totalArligAvgift({ fondavgift: 0.0011, plattformsavgift: 0.0015 }), 0.0026);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => avgiftseffekt(arsvis, 1.5), RangeError);
  assert.throws(() => avgiftseffekt(arsvis, -0.1), RangeError);
  assert.throws(() => avgiftseffekt({ ...arsvis, ar: 0 }, 0.002), RangeError);
});

provar('formatering foljer svenska konventioner', () => {
  // Hart mellanslag (U+00A0) ar avsiktligt: talet far inte brytas over tva rader.
  assert.equal(kronor(18400), '18 400 kr');
  assert.equal(kronor(531664), '531 664 kr');
  assert.equal(kronor(900), '900 kr');
  assert.equal(procent(0.002), '0,20 %');
  assert.equal(procent(0.0007, 2), '0,07 %');
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
