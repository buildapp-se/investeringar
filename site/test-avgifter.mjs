// Kontroll av ranta-pa-ranta-rakningen. Kors med: node test-avgifter.mjs

import { strict as assert } from 'node:assert';
import { rantaPaRanta, kronor, procent } from './avgifter.js';
import { startvarden } from './gemensamt.js';

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

provar('negativt manadssparande och raknesats pa -100 % eller lagre kastar', () => {
  assert.throws(() => rantaPaRanta({ engangsinsattning: 0, manadssparande: -1, ar: 5, raknesats: 0.07 }), RangeError);
  assert.throws(() => rantaPaRanta({ engangsinsattning: 1000, manadssparande: 0, ar: 5, raknesats: -1 }), RangeError);
  assert.throws(() => rantaPaRanta({ engangsinsattning: 1000, manadssparande: 0, ar: 5, raknesats: NaN }), RangeError);
});

provar('negativ raknesats over -100 % raknas: 1 000 x 0,5^2', () => {
  const r = rantaPaRanta({ engangsinsattning: 1000, manadssparande: 0, ar: 2, raknesats: -0.5, perioderPerAr: 1 });
  assert.ok(Math.abs(r.slutvarde - 250) < 1e-9, `fick ${r.slutvarde}`);
});

provar('formatering foljer svenska konventioner', () => {
  assert.equal(kronor(18400), '18 400 kr');
  assert.equal(kronor(531664), '531 664 kr');
  assert.equal(procent(0.002), '0,20 %');
  assert.equal(kronor(1234567), '1 234 567 kr');
  assert.equal(kronor(999.6), '1 000 kr');
  assert.equal(procent(0.07, 0), '7 %');
});

provar('orimligt manga ar raknas direkt, utan att lasa sidan', () => {
  // En loop per manad tog 3 s vid 100 miljoner ar och lasta fliken for varje tangent.
  const t = performance.now();
  const r = rantaPaRanta({ engangsinsattning: 0, manadssparande: 2000, ar: 1e8, raknesats: 0.07 });
  assert.ok(performance.now() - t < 50, `tog ${Math.round(performance.now() - t)} ms`);
  assert.equal(r.insatt, 2000 * 12 * 1e8);
});

provar('belopp som inte ar andliga kastar i stallet for "Infinity kr"', () => {
  assert.throws(() => kronor(Infinity), RangeError);
  assert.throws(() => kronor(NaN), RangeError);
  assert.equal(kronor(-1500), '-1 500 kr');
});

provar('delad lank vinner over sparat, som vinner over standard', () => {
  const standard = { manad: 2000, engang: 0, ar: 30, sats: 7 };
  const v = startvarden(standard, '?manad=5000&sats=6.5&okand=9', { manad: 1000, ar: 20 });
  assert.deepEqual(v, { manad: 5000, engang: 0, ar: 20, sats: 6.5 });
});

provar('trasiga varden i lank eller sparat hoppas over', () => {
  const standard = { manad: 2000, ar: 30 };
  assert.deepEqual(startvarden(standard, '?manad=abc&ar=', { manad: 'x', ar: null }), standard);
  assert.deepEqual(startvarden(standard, '?ar=1e400', {}), standard);
  assert.deepEqual(startvarden(standard, '', null), standard);
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
