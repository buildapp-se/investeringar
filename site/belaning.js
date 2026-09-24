// Hur mycket som gar att lana till en plattforms basta ranta.
// Reglerna och rantorna ligger i data.js (BELANING), las fran bolagens egna sidor.

/**
 * Storsta lan som haller sig inom en belaningsgrans.
 *
 * Grans mot totalen: lan / (eget + lan) <= grans, alltsa det som kops for lanet
 * raknas med i portfoljen. Sa definierar Avanza belaningsgraden, och Nordnets
 * belaningsvarde satts pa hela depan.
 * Grans mot eget kapital: lan / eget <= grans. Anvands dar definitionen inte ar
 * utskriven (Montrose), eftersom den ger det lagre, sakrare taket.
 *
 * @param {number} eget Eget kapital i kronor.
 * @param {{ grans: number, motTotal: boolean, tak?: number }} regel grans som andel, 0.10 for 10 %,
 *   tak som storsta lan i kronor.
 * @returns {number} Storsta lan i kronor.
 * @throws {RangeError} vid negativt kapital eller grans utanfor [0,1).
 */
export function maxLan(eget, { grans, motTotal, tak = Infinity }) {
  if (!(eget >= 0)) throw new RangeError(`Kapitalet kan inte vara negativt, fick ${eget}`);
  if (!(grans >= 0 && grans < 1)) throw new RangeError(`Gransen maste ligga i [0,1), fick ${grans}`);
  return Math.min(tak, motTotal ? eget * grans / (1 - grans) : eget * grans);
}
