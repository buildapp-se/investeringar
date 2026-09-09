// Belaning och brytpunkt. Bada raknar pa hypotetiska exempelportfoljer, aldrig
// pa besokarens egna innehav, och visar risk lika tydligt som kostnad.
// Se CONTEXT.md, avsnittet Belaning.

/**
 * Belaningsgrad, rantekostnad och hur langt marknaden kan falla innan
 * en given grans nas.
 *
 * Nar portfoljvardet faller star skulden kvar i kronor, sa belaningsgraden
 * stiger. Fall f som nar gransen T: L / (V*(1-f)) = T, alltsa f = 1 - L/(V*T).
 *
 * @param {{ portfolj: number, lan: number, ranta: number, gransTvangsforsaljning?: number }} indata
 *   ranta som andel per ar, 0.035 for 3,5 procent.
 * @returns {{ grad: number, rantekostnadPerAr: number, falltalighet: number, exponering: number }}
 * @throws {RangeError} vid portfolj <= 0, negativt lan, lan >= portfolj eller ogiltig grans.
 */
export function belaningslage({ portfolj, lan, ranta, gransTvangsforsaljning = 0.85 }) {
  if (!(portfolj > 0)) throw new RangeError(`Portfoljvardet maste vara storre an noll, fick ${portfolj}`);
  if (!(lan >= 0)) throw new RangeError(`Lanet kan inte vara negativt, fick ${lan}`);
  if (lan >= portfolj) throw new RangeError('Lanet kan inte vara lika stort som eller storre an portfoljen');
  if (!(gransTvangsforsaljning > 0 && gransTvangsforsaljning <= 1)) {
    throw new RangeError(`Gransen maste ligga i intervallet (0,1], fick ${gransTvangsforsaljning}`);
  }
  if (!(ranta >= 0)) throw new RangeError(`Rantan kan inte vara negativ, fick ${ranta}`);

  const grad = lan / portfolj;
  return {
    grad,
    rantekostnadPerAr: lan * ranta,
    // Andel fall som kravs innan belaningsgraden nar gransen.
    falltalighet: lan === 0 ? 1 : Math.max(0, 1 - grad / gransTvangsforsaljning),
    // Marknadsexponering per satsad egen krona.
    exponering: portfolj / (portfolj - lan),
  };
}

/**
 * Brytpunkt i ar mellan en ETF och en jamforbar fond.
 *
 * ETF:en betalar vaxling och courtage vid varje kop, fonden ingetdera. Den
 * lagre lopande avgiften tjanar in engangsfriktionen forst efter ett antal ar.
 * Vid manadssparande betalas friktionen om och om igen, och da kan brytpunkten
 * saknas helt.
 *
 * @param {{ etfArlig: number, fondArlig: number, friktionPerKop: number, kopPerAr: number }} indata
 * @returns {{ arTillBrytpunkt: number|null, arligBesparing: number, arligFriktion: number }}
 *   arTillBrytpunkt ar null nar ETF:en aldrig hinner ikapp.
 * @throws {RangeError} vid negativa avgifter eller kopPerAr < 1.
 */
export function brytpunkt({ etfArlig, fondArlig, friktionPerKop, kopPerAr }) {
  if (etfArlig < 0 || fondArlig < 0 || friktionPerKop < 0) throw new RangeError('Avgifter kan inte vara negativa');
  if (!(kopPerAr >= 1)) throw new RangeError(`Antal kop per ar maste vara minst 1, fick ${kopPerAr}`);

  const arligBesparing = fondArlig - etfArlig;
  const arligFriktion = friktionPerKop * (kopPerAr - 1); // det forsta kopet ar en engangskostnad
  const engangsfriktion = friktionPerKop;

  // Springer friktionen ifran besparingen varje ar hinner ETF:en aldrig ikapp.
  if (arligBesparing <= 0 || arligBesparing <= arligFriktion) {
    return { arTillBrytpunkt: null, arligBesparing, arligFriktion };
  }
  return { arTillBrytpunkt: engangsfriktion / (arligBesparing - arligFriktion), arligBesparing, arligFriktion };
}

/**
 * Kostnaden for ett enskilt ETF-kop, i kronor.
 *
 * Courtaget har ett golv, och det ar golvet som avgor for ett manadskop pa
 * nagra tusen kronor: 0,25 procent av 2 000 kronor ar fem kronor, medan golvet
 * kan vara nitton. Den rorliga procentsatsen slar darfor aldrig igenom, och att
 * jamfora leverantorer pa procentsatsen ensam ger fel svar.
 *
 * @param {{ belopp: number, rorligt: number, lagsta: number, vaxling: number }} indata
 *   `lagsta` ska redan vara omraknad till kronor av anroparen.
 * @returns {{ courtage: number, vaxlingskostnad: number, total: number, andel: number }}
 * @throws {RangeError} vid belopp <= 0 eller negativa avgifter.
 */
export function kopkostnad({ belopp, rorligt, lagsta, vaxling }) {
  if (!(belopp > 0)) throw new RangeError(`Kopbeloppet maste vara storre an noll, fick ${belopp}`);
  if (!(rorligt >= 0) || !(lagsta >= 0) || !(vaxling >= 0)) throw new RangeError('Courtage och vaxling kan inte vara negativa');

  const courtage = Math.max(belopp * rorligt, lagsta);
  const vaxlingskostnad = belopp * vaxling;
  const total = courtage + vaxlingskostnad;
  return { courtage, vaxlingskostnad, total, andel: total / belopp };
}

/**
 * Brytpunkt mellan en ETF och en jamforbar fond for ett helt sparscenario.
 *
 * Skillnaden mot brytpunkt() ovan ar vad friktionen jamfors med. brytpunkt()
 * behandlar den aterkommande friktionen som en andel av kapitalet, vilket
 * stammer for en engangsinsattning men inte for ett manadssparande: dar betalas
 * friktionen pa den nya insattningen, som ar en krympande andel av en vaxande
 * portfolj. Att rakna den som en fast arlig belastning pa hela kapitalet skulle
 * ge "brytpunkt saknas" for alltid, aven nar ETF:en faktiskt gar om.
 *
 * Har simuleras bada i stallet, manad for manad, med samma raknesats. Svaret ar
 * forsta manaden da ETF-kapitalet passerar fondkapitalet. Det ar en jamforelse
 * av kostnad, inte av exponering: tva produkter med olika index ar inte
 * utbytbara aven nar rakningen talar for den ena.
 *
 * @param {{ etfArlig: number, fondArlig: number, friktionAndel: number,
 *           scenario: { engangsinsattning: number, manadssparande: number, raknesats: number },
 *           maxAr?: number }} indata
 * @returns {{ arTillBrytpunkt: number|null, arligBesparing: number, maxAr: number }}
 *   arTillBrytpunkt ar null nar ETF:en inte hinner ikapp inom maxAr.
 * @throws {RangeError} vid negativa avgifter, friktion utanfor [0,1) eller tomt sparande.
 */
export function brytpunktScenario({ etfArlig, fondArlig, friktionAndel, scenario, maxAr = 40 }) {
  if (etfArlig < 0 || fondArlig < 0) throw new RangeError('Avgifter kan inte vara negativa');
  if (!(friktionAndel >= 0 && friktionAndel < 1)) throw new RangeError(`Friktionen maste ligga i intervallet [0,1), fick ${friktionAndel}`);
  if (!(maxAr > 0)) throw new RangeError(`Horisonten maste vara storre an noll, fick ${maxAr}`);
  const { engangsinsattning, manadssparande, raknesats } = scenario;
  if (engangsinsattning < 0 || manadssparande < 0) throw new RangeError('Insattningar kan inte vara negativa');
  if (!(engangsinsattning + manadssparande > 0)) throw new RangeError('Scenariot maste innehalla nagon insattning');

  const tillvaxt = Math.pow(1 + raknesats, 1 / 12) - 1;
  const perManad = arlig => 1 - Math.pow(1 - arlig, 1 / 12);
  const etfAvgift = perManad(etfArlig);
  const fondAvgift = perManad(fondArlig);

  // Friktionen dras direkt ur varje insattning: det ar de kronor som gar till
  // courtage och vaxling i stallet for att kopa andelar.
  let etf = engangsinsattning * (1 - friktionAndel);
  let fond = engangsinsattning;

  for (let manad = 1; manad <= maxAr * 12; manad++) {
    etf = (etf + manadssparande * (1 - friktionAndel)) * (1 + tillvaxt);
    fond = (fond + manadssparande) * (1 + tillvaxt);
    etf -= etf * etfAvgift;
    fond -= fond * fondAvgift;
    if (etf > fond) return { arTillBrytpunkt: manad / 12, arligBesparing: fondArlig - etfArlig, maxAr };
  }
  return { arTillBrytpunkt: null, arligBesparing: fondArlig - etfArlig, maxAr };
}
