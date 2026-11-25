// Delat mellan sidorna: temavaljaren.

/** Kopplar temaknapparna och aterstaller sparat val. Systemtema ar standard. */
export function startaTema() {
  const knappar = document.querySelectorAll('[data-tema-val]');
  const satt = val => {
    if (val === 'system') delete document.documentElement.dataset.tema;
    else document.documentElement.dataset.tema = val;
    try { localStorage.setItem('tema', val); } catch {}
    knappar.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.temaVal === val)));
  };
  knappar.forEach(b => b.addEventListener('click', () => satt(b.dataset.temaVal)));
  let sparat = 'system';
  try { sparat = localStorage.getItem('tema') || 'system'; } catch {}
  satt(sparat);
}


/**
 * Startvarden for en raknare: standard, sedan sparat, sedan lanken (?manad=5000).
 * Bara nycklar som finns i standard och bara andliga tal tas med, sa en trasig
 * lank eller ett gammalt sparat varde ger standardvardet i stallet for ett tomt falt.
 * @param {Record<string, number>} standard
 * @param {string} sok location.search
 * @param {Record<string, unknown> | null} sparat
 */
export function startvarden(standard, sok, sparat) {
  const lank = new URLSearchParams(sok);
  const tal = v => (typeof v === 'number' || (typeof v === 'string' && v.trim() !== '')) && Number.isFinite(Number(v)) ? Number(v) : undefined;
  return Object.fromEntries(Object.entries(standard).map(([k, s]) => [k, tal(lank.get(k)) ?? tal(sparat?.[k]) ?? s]));
}

let adressVantar;
/**
 * Skriver scenariot i adressen nar inmatningen stannat. Safari kastar efter 100
 * replaceState pa 10 s, sa en hallen piltangent avbrot rakningen och visade fel siffror.
 * @param {Record<string, string | number>} varden
 */
export function skrivAdress(varden) {
  clearTimeout(adressVantar);
  adressVantar = setTimeout(() => {
    try { history.replaceState(null, '', '?' + new URLSearchParams(varden) + location.hash); } catch {}
  }, 250);
}
