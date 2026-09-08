// Avgiftsberakning for jamforelsetabellen.
//
// Modellen simulerar period for period. Varje period: insattning laggs till,
// kapitalet vaxer med raknesatsen, darefter dras avgiften. Samma funktion
// anvands for arsvis och manadsvis simulering, vilket gor att den gar att
// kontrollera mot det arsvisa raknexemplet i docs/research/kostnadsmetod.md.
//
// Raknesatsen ar ett antagande fore avgifter och inflation, aldrig en prognos.
// Funktionen returnerar darfor aldrig forvantat slutkapital, bara insatt belopp
// och avgifternas effekt. Se CONTEXT.md, avsnittet Kostnadsscenarier och metod.

/** @typedef {{ engangsinsattning: number, manadssparande: number, ar: number, raknesats: number, perioderPerAr?: number }} Scenario */
/** @typedef {{ insatt: number, dragnaAvgifter: number, totalEffekt: number, uteblivenTillvaxt: number }} Avgiftseffekt */

/**
 * Simulerar kapitalet period for period och summerar de avgifter som dras.
 * Returnerar slutkapitalet internt; exporteras inte, se filhuvudet.
 * @param {Scenario} scenario
 * @param {number} arligAvgift Andel per ar, 0.002 for 0,20 procent.
 * @returns {{ kapital: number, dragnaAvgifter: number, insatt: number }}
 */
function simulera(scenario, arligAvgift) {
  const perioderPerAr = scenario.perioderPerAr ?? 12;
  const perioder = Math.round(scenario.ar * perioderPerAr);
  const tillvaxtPerPeriod = Math.pow(1 + scenario.raknesats, 1 / perioderPerAr) - 1;
  const avgiftPerPeriod = 1 - Math.pow(1 - arligAvgift, 1 / perioderPerAr);
  const insattningPerPeriod = perioderPerAr === 12 ? scenario.manadssparande : scenario.manadssparande * 12;

  let kapital = scenario.engangsinsattning;
  let insatt = scenario.engangsinsattning;
  let dragnaAvgifter = 0;

  for (let i = 0; i < perioder; i++) {
    kapital += insattningPerPeriod;
    insatt += insattningPerPeriod;
    kapital *= 1 + tillvaxtPerPeriod;
    const avgift = kapital * avgiftPerPeriod;
    kapital -= avgift;
    dragnaAvgifter += avgift;
  }

  return { kapital, dragnaAvgifter, insatt };
}

/**
 * Avgifternas effekt for ett scenario och en arlig avgift.
 *
 * dragnaAvgifter ar summan av det som faktiskt dras ur kapitalet.
 * totalEffekt ar skillnaden mot samma scenario helt utan avgifter, alltsa
 * dragna avgifter plus den tillvaxt de aldrig hann ge. Skillnaden mellan de
 * tva talen ar ranta-pa-ranta-effekten och maste redovisas separat.
 *
 * @param {Scenario} scenario
 * @param {number} arligAvgift Andel per ar, 0.002 for 0,20 procent.
 * @returns {Avgiftseffekt}
 * @throws {RangeError} vid negativa belopp, negativ tid eller avgift utanfor [0,1).
 */
export function avgiftseffekt(scenario, arligAvgift) {
  if (!(arligAvgift >= 0 && arligAvgift < 1)) {
    throw new RangeError(`Arlig avgift maste ligga i intervallet [0,1), fick ${arligAvgift}`);
  }
  if (!(scenario.ar > 0)) {
    throw new RangeError(`Antal ar maste vara storre an noll, fick ${scenario.ar}`);
  }
  if (scenario.engangsinsattning < 0 || scenario.manadssparande < 0) {
    throw new RangeError('Insattningar kan inte vara negativa');
  }

  const utan = simulera(scenario, 0);
  const med = simulera(scenario, arligAvgift);
  const totalEffekt = utan.kapital - med.kapital;

  return {
    insatt: med.insatt,
    dragnaAvgifter: med.dragnaAvgifter,
    totalEffekt,
    uteblivenTillvaxt: totalEffekt - med.dragnaAvgifter,
  };
}

/**
 * Total avgift for en kopvag: fondens arliga avgift plus leverantorens
 * plattformsavgift. Halls isar i datamodellen eftersom en enda totalsiffra
 * doljer om leverantoren lagger pa eller drar ifran. Se BACKLOG.md om Fondo.
 * @param {{ fondavgift: number, plattformsavgift: number }} kopvag
 * @returns {number}
 */
export function totalArligAvgift(kopvag) {
  return kopvag.fondavgift + kopvag.plattformsavgift;
}

/** Formaterar kronor med mellanslag som tusentalsavgransare. */
export function kronor(varde) {
  return Math.round(varde).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';
}

/** Formaterar procent med decimalkomma. */
export function procent(andel, decimaler = 2) {
  return (andel * 100).toFixed(decimaler).replace('.', ',') + ' %';
}
