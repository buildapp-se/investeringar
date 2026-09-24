// Kontroll av ranta-pa-ranta-rakningen. Kors med: node test-avgifter.mjs

import { strict as assert } from 'node:assert';
import { rantaPaRanta, kronor, procent } from './avgifter.js';

let fel = 0;
function provar(namn, fn) {
  try { fn(); console.log(`  ok   ${namn}`); }
  catch (e) { fel++; console.log(`  FEL  ${namn}\n       ${e.message.split('\n')[0]}`); }
}

provar('arsvis engangsinsattning foljer 100 000 x 1,05^20', () => {
  const r = rantaPaRanta({ engangsinsattning: 100000, manadssparande: 0, ar: 20, raknesats: 0.05, perioderPerAr: 1 });
  assert.equal(Math.round(r.slutvarde), Math.round(100000 * 1.05 ** 20), `fick ${Math.round(r.slutvarde)}`);
  assert.equal(r.insatt, 100000);
});

provar('manadssparande foljer annuitetsformeln (insattning i borjan av manaden)', () => {
  const m = 1.07 ** (1 / 12) - 1, n = 120;
  const facit = 2000 * ((1 + m) ** n - 1) / m * (1 + m);
  const r = rantaPaRanta({ engangsinsattning: 0, manadssparande: 2000, ar: 10, raknesats: 0.07 });
  assert.ok(Math.abs(r.slutvarde - facit) < 0.01, `fick ${r.slutvarde}, facit ${facit}`);
  assert.equal(r.insatt, 240000);
});

provar('avkastning ar slutvarde minus insatt', () => {
  const r = rantaPaRanta({ engangsinsattning: 50000, manadssparande: 1000, ar: 30, raknesats: 0.07 });
  assert.ok(Math.abs(r.avkastning - (r.slutvarde - r.insatt)) < 1e-6);
  assert.ok(r.avkastning > r.insatt, 'efter 30 ar vid 7 % ska rantan overstiga insatsen');
});

provar('noll procent ger noll avkastning', () => {
  const r = rantaPaRanta({ engangsinsattning: 10000, manadssparande: 500, ar: 5, raknesats: 0 });
  assert.equal(Math.round(r.avkastning), 0);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => rantaPaRanta({ engangsinsattning: 0, manadssparande: 0, ar: 0, raknesats: 0.07 }), RangeError);
  assert.throws(() => rantaPaRanta({ engangsinsattning: -1, manadssparande: 0, ar: 5, raknesats: 0.07 }), RangeError);
});

provar('formatering foljer svenska konventioner', () => {
  assert.equal(kronor(18400), '18 400 kr');
  assert.equal(kronor(531664), '531 664 kr');
  assert.equal(procent(0.002), '0,20 %');
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
