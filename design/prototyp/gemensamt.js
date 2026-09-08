// Delat mellan sidorna: temavaljaren och datumstampeln.

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

/** Skriver dagens datum i elementet med angivet id, om det finns. */
export function visaDatum(id) {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().toLocaleDateString('sv-SE');
}
