// Kontroll av belanings- och brytpunktsberakningen. Kors med: node test-belaning.mjs

import { strict as assert } from 'node:assert';
import { belaningslage, brytpunkt, brytpunktScenario, kopkostnad } from './belaning.js';

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

console.log('\nKopkostnad');

provar('golvet slar igenom pa ett litet kop', () => {
  // 0,25 procent av 2 000 kr ar 5 kr, men Montrose golv i Tyskland ar 19 kr.
  const r = kopkostnad({ belopp: 2000, rorligt: 0.0025, lagsta: 19, vaxling: 0 });
  assert.equal(r.courtage, 19);
});

provar('den rorliga satsen tar over nar kopet ar stort nog', () => {
  const r = kopkostnad({ belopp: 100000, rorligt: 0.0025, lagsta: 19, vaxling: 0 });
  assert.equal(r.courtage, 250);
});

provar('vaxlingen laggs till courtaget och andelen speglar totalen', () => {
  const r = kopkostnad({ belopp: 10000, rorligt: 0.0025, lagsta: 9, vaxling: 0.0025 });
  assert.equal(r.total, 50);
  assert.equal(r.andel, 0.005);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => kopkostnad({ belopp: 0, rorligt: 0.0025, lagsta: 9, vaxling: 0.0025 }), RangeError);
  assert.throws(() => kopkostnad({ belopp: 1000, rorligt: -0.01, lagsta: 9, vaxling: 0.0025 }), RangeError);
});

console.log('\nBrytpunkt for ett helt scenario');

const engang = { engangsinsattning: 100000, manadssparande: 0, raknesats: 0.07 };
const manad = { engangsinsattning: 0, manadssparande: 2000, raknesats: 0.07 };

provar('utan friktion gar den billigare ETF:en om direkt', () => {
  const r = brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 0, scenario: engang });
  assert.ok(r.arTillBrytpunkt !== null && r.arTillBrytpunkt <= 1 / 12 + 1e-9);
});

provar('engangsinsattning: friktionen tjanas in efter ett antal ar', () => {
  const r = brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 0.008, scenario: engang });
  assert.ok(r.arTillBrytpunkt > 2 && r.arTillBrytpunkt < 5);
});

provar('dyrare ETF hinner aldrig ikapp', () => {
  const r = brytpunktScenario({ etfArlig: 0.0020, fondArlig: 0.0010, friktionAndel: 0.005, scenario: engang });
  assert.equal(r.arTillBrytpunkt, null);
});

provar('manadssparande: friktionen skjuter upp brytpunkten men tar inte bort den', () => {
  // Varje ny insattning betalar friktion, men gamla andelar gor det inte, sa
  // avgiftsskillnaden hinner ikapp till slut. Det ar skillnaden mot brytpunkt().
  const r = brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 0.008, scenario: manad });
  const engangsvar = brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 0.008, scenario: engang });
  assert.ok(r.arTillBrytpunkt !== null);
  assert.ok(r.arTillBrytpunkt > engangsvar.arTillBrytpunkt);
});

provar('hog friktion vid manadssparande ger ingen brytpunkt inom horisonten', () => {
  const r = brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0010, friktionAndel: 0.02, scenario: manad, maxAr: 20 });
  assert.equal(r.arTillBrytpunkt, null);
});

provar('ogiltiga varden kastar RangeError', () => {
  assert.throws(() => brytpunktScenario({ etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 1, scenario: engang }), RangeError);
  assert.throws(() => brytpunktScenario({ etfArlig: -0.001, fondArlig: 0.0032, friktionAndel: 0, scenario: engang }), RangeError);
  assert.throws(() => brytpunktScenario({
    etfArlig: 0.0007, fondArlig: 0.0032, friktionAndel: 0,
    scenario: { engangsinsattning: 0, manadssparande: 0, raknesats: 0.07 },
  }), RangeError);
});

console.log(fel === 0 ? '\nAlla kontroller gick igenom.' : `\n${fel} kontroll(er) misslyckades.`);
process.exit(fel === 0 ? 0 : 1);
