// Grind framfor prototypen.
//
// Detta ar INTE sakerhet. Sidan ar statisk och ligger i ett publikt repo, sa
// den som vill lasa innehallet kan gora det utan att passera harifran. Grinden
// finns for att en halvfardig jamforelse av finansiella produkter inte ska
// mota nagon som rakar hamna har och tro att uppgifterna ar klara.
//
// Ordet ligger som SHA-256 i stallet for klartext. Det stoppar ingen som
// oppnar filen, men det gor att ordet inte gar att grepa fram ur repot.
// Ska sidan nagon gang skydda nagot pa riktigt kravs en server som halller
// innehallet tillbaka, inte ett skript som doljer det.

const FACIT = '432c0b19f1f3254dfdfb3af9e4be8cef2d86db977a2d604e4b125fe17ec129ee';
const NYCKEL = 'grind-oppen';

/** SHA-256 som hex. crypto.subtle finns i alla webblasare over https och pa localhost. */
async function hasha(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function oppnad() {
  try { return localStorage.getItem(NYCKEL) === FACIT; } catch { return false; }
}

/**
 * Ritar grinden om den inte redan ar passerad. Returnerar inget: sidan bakom
 * ar redan laddad, overlayen ligger bara over den.
 */
export function startaGrind() {
  if (oppnad()) return;

  const overlay = document.createElement('div');
  overlay.className = 'grind';
  overlay.innerHTML = `
    <form class="grindruta" novalidate>
      <p class="ogonbryn">Prototyp · inte publicerad</p>
      <h1>Den här sidan är under uppbyggnad</h1>
      <p>Jämförelsen är en prototyp. Flera uppgifter är ännu inte kontrollerade mot förstahandskälla, och ingenting här ska användas som underlag för att placera pengar.</p>
      <label for="grind-ord">Lösenord</label>
      <input id="grind-ord" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" required>
      <p class="grindfel" role="alert" hidden>Fel lösenord.</p>
      <button type="submit" class="knapp">Fortsätt</button>
    </form>`;

  const falt = overlay.querySelector('#grind-ord');
  const fel = overlay.querySelector('.grindfel');

  overlay.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault();
    const hash = await hasha(falt.value.trim().toLowerCase());
    if (hash !== FACIT) {
      fel.hidden = false;
      falt.select();
      return;
    }
    try { localStorage.setItem(NYCKEL, FACIT); } catch { /* privat lage: slapp in anda, en gang per flik */ }
    overlay.remove();
    document.body.style.overflow = '';
  });

  document.body.append(overlay);
  document.body.style.overflow = 'hidden';
  falt.focus();
}
