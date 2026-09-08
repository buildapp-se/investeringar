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
