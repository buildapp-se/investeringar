// Kontroll av belanings- och brytpunktsberakningen. Kors med: node test-belaning.mjs

import { strict as assert } from 'node:assert';
import { belaningslage, brytpunkt } from './belaning.js';

let fel = 0;
function provar(namn, fn) {
  try { fn(); console.log(`  ok   ${namn}`); }
  catch (e) { fel++; console.log(`  FEL  ${namn}\n       ${e.message.split('\n')[0]}`); }
}

console.log('Belaningslage');

provar('10 procent belaning ger grad 0,10', () => {
  const r = belaningslage({ portfolj: 1000000, lan: 100000, ranta: 0.035 });
  assert.equal(Math.round(r.grad * 10000) / 10000, 0.1);
});

provar('rantekostnaden raknas pa lanet, inte pa portfoljen', () => {
  const r = belaningslage({ portfolj: 1000000, lan: 100000, ranta: 0.035 });
  assert.equal(Math.round(r.rantekostnadPerAr), 3500);
});

provar('vid 10 procent kravs cirka 88 procent fall for att na gransen 0,85', () => {
  const r = belaningslage({ portfolj: 1000000, lan: 100000, ranta: 0.035, gransTvangsforsaljning: 0.85 });
  // 1 - 0,10/0,85 = 0,88235...
  assert.ok(Math.abs(r.falltalighet - 0.88235) < 0.001, `fick ${r.falltalighet}`);
});

provar('hogre belaning ger lagre falltalighet', () => {
  const lag = belaningslage({ portfolj: 1000000, lan: 100000, ranta: 0.03 }).falltalighet;
  const hog = belaningslage({ portfolj: 1000000, lan: 500000, ranta: 0.03 }).falltalighet;
  assert.ok(hog < lag, 'mer lan maste tala mindre fall');
});

provar('belaning pa gransen ger noll falltalighet', () => {
  const r = belaningslage({ portfolj: 1000000, lan: 850000, ranta: 0.03, gransTvangsforsaljning: 0.85 });
  assert.equal(Math.round(r.falltalighet * 1000) / 1000, 0);
});

provar('exponering per egen krona stammer', () => {
  // 1 000 000 kr portfolj varav 200 000 kr lanat: egen insats 800 000, exponering 1,25x
  const r = belaningslage({ portfolj: 1000000, lan: 200000, ranta: 0.03 });
  assert.equal(Math.round(r.exponering * 100) / 100, 1.25);
});

provar('utan lan ar exponeringen 1 och rantan noll', () => {
  const r = belaningslage({ portfolj: 500000, lan: 0, ranta: 0.03 });
  assert.equal(r.exponering, 1);
  assert.equal(r.rantekostnadPerAr, 0);
  assert.equal(r.falltalighet, 1);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => belaningslage({ portfolj: 0, lan: 0, ranta: 0.03 }), RangeError);
  assert.throws(() => belaningslage({ portfolj: 100, lan: 100, ranta: 0.03 }), RangeError);
  assert.throws(() => belaningslage({ portfolj: 100, lan: -1, ranta: 0.03 }), RangeError);
  assert.throws(() => belaningslage({ portfolj: 100, lan: 10, ranta: -0.01 }), RangeError);
});

console.log('\nBrytpunkt ETF mot fond');

provar('engangskop: 0,50 procent friktion mot 0,04 enheters besparing ger 12,5 ar', () => {
  const r = brytpunkt({ etfArlig: 0.0005, fondArlig: 0.0009, friktionPerKop: 0.005, kopPerAr: 1 });
  assert.equal(Math.round(r.arTillBrytpunkt * 10) / 10, 12.5, `fick ${r.arTillBrytpunkt}`);
});

provar('manadssparande: samma avgifter ger ingen brytpunkt alls', () => {
  const r = brytpunkt({ etfArlig: 0.0005, fondArlig: 0.0009, friktionPerKop: 0.005, kopPerAr: 12 });
  assert.equal(r.arTillBrytpunkt, null, 'vaxlingen betalas varje manad och springer ifran besparingen');
});

provar('dyrare ETF ger ingen brytpunkt', () => {
  const r = brytpunkt({ etfArlig: 0.0022, fondArlig: 0.0009, friktionPerKop: 0.005, kopPerAr: 1 });
  assert.equal(r.arTillBrytpunkt, null);
});

provar('storre avgiftsskillnad ger tidigare brytpunkt', () => {
  const liten = brytpunkt({ etfArlig: 0.0007, fondArlig: 0.0009, friktionPerKop: 0.005, kopPerAr: 1 }).arTillBrytpunkt;
  const stor = brytpunkt({ etfArlig: 0.0007, fondArlig: 0.0022, friktionPerKop: 0.005, kopPerAr: 1 }).arTillBrytpunkt;
  assert.ok(stor < liten);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => brytpunkt({ etfArlig: -0.001, fondArlig: 0.002, friktionPerKop: 0.005, kopPerAr: 1 }), RangeError);
  assert.throws(() => brytpunkt({ etfArlig: 0.001, fondArlig: 0.002, friktionPerKop: 0.005, kopPerAr: 0 }), RangeError);
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
