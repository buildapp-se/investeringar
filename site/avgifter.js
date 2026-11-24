// Ranta pa ranta for raknaren pa startsidan, och formatering.
//
// Modellen simulerar manad for manad: insattning laggs till, darefter vaxer
// kapitalet med raknesatsen. Raknesatsen ar ett antagande fore skatt, avgifter
// och inflation, aldrig en prognos.

/** @typedef {{ engangsinsattning: number, manadssparande: number, ar: number, raknesats: number, perioderPerAr?: number }} Scenario */
/** @typedef {{ insatt: number, avkastning: number, slutvarde: number }} Utfall */

/**
 * Vad ett sparande vaxer till med ranta pa ranta.
 * @param {Scenario} scenario raknesats som andel per ar, 0.07 for 7 procent.
 * @returns {Utfall} avkastning ar slutvarde minus insatt, alltsa det rantan gav.
 * @throws {RangeError} vid negativa belopp eller tid <= 0.
 */
export function rantaPaRanta(scenario) {
  if (!(scenario.ar > 0)) throw new RangeError(`Antal ar maste vara storre an noll, fick ${scenario.ar}`);
  if (scenario.engangsinsattning < 0 || scenario.manadssparande < 0) throw new RangeError('Insattningar kan inte vara negativa');
  if (!(scenario.raknesats > -1)) throw new RangeError(`Raknesatsen maste vara over -100 %, fick ${scenario.raknesats}`);

  const perioderPerAr = scenario.perioderPerAr ?? 12;
  const perioder = Math.round(scenario.ar * perioderPerAr);
  const lnTillvaxt = Math.log1p(scenario.raknesats) / perioderPerAr;
  const tillvaxt = Math.expm1(lnTillvaxt);
  const insattningPerPeriod = scenario.manadssparande * 12 / perioderPerAr;

  // Sluten form av "insattning, sedan tillvaxt" varje period. En loop per manad
  // lasade fliken i sekunder nar nagon skrev ett orimligt antal ar.
  const okning = Math.expm1(perioder * lnTillvaxt); // (1 + tillvaxt)^perioder - 1
  const sparat = tillvaxt === 0
    ? insattningPerPeriod * perioder
    : insattningPerPeriod * okning / tillvaxt * (1 + tillvaxt);
  const kapital = scenario.engangsinsattning * (1 + okning) + sparat;
  const insatt = scenario.engangsinsattning + insattningPerPeriod * perioder;
  return { insatt, avkastning: kapital - insatt, slutvarde: kapital };
}

/**
 * Formaterar kronor med mellanslag som tusentalsavgransare.
 * @throws {RangeError} om beloppet inte ar ett andligt tal, sa sidan visar ett streck.
 */
export function kronor(varde) {
  if (!Number.isFinite(varde)) throw new RangeError(`Inget belopp: ${varde}`);
  return Math.round(varde).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';
}

/** Formaterar procent med decimalkomma. */
export function procent(andel, decimaler = 2) {
  return (andel * 100).toFixed(decimaler).replace('.', ',') + ' %';
}
