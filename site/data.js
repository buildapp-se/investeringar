// Produktdata for jamforelsen.
//
// Varje uppgift ar antingen kontrollerad mot en namngiven kalla med datum,
// eller null. Null betyder "ej verifierat" och far aldrig ersattas med en
// gissning; grannsnittet visar frannvaron i stallet. Underlaget finns i
// docs/research/kandidater-verifierade.md, kopvagarna i kopvagar.md och
// FI-uppgifterna i fi-fondinnehav.md.
//
// Fondens egen avgift och leverantorens plattformsavgift halls medvetet isar.
// Ett enda totaltal skulle dolja om en plattform lagger pa eller drar ifran,
// vilket ar hela poangen med tjansten.

/** @typedef {{ id: string, namn: string, url: string, datum: string, typ: 'primar'|'sekundar' }} Kalla */

/** @type {Record<string, Kalla>} */
export const KALLOR = {
  lf: { id: 'lf', namn: 'Länsförsäkringars fondlista', url: 'https://lansforsakringar.dev.fundlist.com/sv/1/details/SE0005188836', datum: '2026-09-04', typ: 'primar' },
  avanzaBroschyr: { id: 'avanzaBroschyr', namn: 'Avanzas informationsbroschyr', url: 'https://investors.avanza.se/files/Avanza_fonder/Informationsbroschyr/informationsbroschyr_avanza-global_2026-03-09.pdf', datum: '2026-03-09', typ: 'primar' },
  avanzaLista: { id: 'avanzaLista', namn: 'Avanzas fondlista', url: 'https://www.avanza.se/fonder/handla-fonder.html/list', datum: '2026-09-08', typ: 'primar' },
  nordnetLf: { id: 'nordnetLf', namn: 'Nordnets fondsida', url: 'https://www.nordnet.se/fonder/lista/lansforsakringar-global-index-sek-7ef0089f', datum: '2026-09-08', typ: 'primar' },
  storebrand: { id: 'storebrand', namn: 'Storebrands informationsbroschyr', url: 'https://storebrandbe.fondlista.se/documents/FSGBR053TS/FSGBR053TS-Informationbroschyr.pdf', datum: '2026-08-12', typ: 'primar' },
  dnbKid2019: { id: 'dnbKid2019', namn: 'DNB Global Indeks, faktablad andelsklass A', url: 'https://doc.morningstar.com/document/550a072c945f27c229f82c59d44c1960.msdoc/?clientid=sfb&key=d2c0f726941ba00a', datum: '2019', typ: 'primar' },
  justetf: { id: 'justetf', namn: 'justETF', url: 'https://www.justetf.com', datum: '2026-07', typ: 'sekundar' },
  fi: { id: 'fi', namn: 'FI:s fondinnehavsregister, kvartalsslut 2026-06-30', url: 'https://www.fi.se/sv/vara-register/fondinnehav-per-kvartal/', datum: '2026-08-20', typ: 'primar' },
  avanzaPris: { id: 'avanzaPris', namn: 'Avanzas prislista för utlandshandel', url: 'https://www.avanza.se/konton-lan-prislista/prislista/handel-utland.html', datum: '2026-09-09', typ: 'primar' },
  nordnetPris: { id: 'nordnetPris', namn: 'Nordnets prislista', url: 'https://www.nordnet.se/kundservice/prislista', datum: '2026-09-09', typ: 'primar' },
  montrosePris: { id: 'montrosePris', namn: 'Montrose prislista', url: 'https://www.montrose.io/priser', datum: '2026-09-09', typ: 'primar' },
  savrPris: { id: 'savrPris', namn: 'SAVR, priser fonder', url: 'https://www.savr.com/sv/priser-fonder', datum: '2026-09-09', typ: 'primar' },
  avanzaUtbud: { id: 'avanzaUtbud', namn: 'Avanzas fondlista, sökning på ISIN', url: 'https://www.avanza.se/fonder/lista.html', datum: '2026-09-09', typ: 'primar' },
  nordnetUtbud: { id: 'nordnetUtbud', namn: 'Nordnets fondlista, sökning på ISIN', url: 'https://www.nordnet.se/fonder/lista', datum: '2026-09-09', typ: 'primar' },
};

/** Kontrollerad uppgift. @param {number|string} varde @param {string} kallaId */
const K = (varde, kallaId) => ({ varde, kalla: kallaId });

/** Uppgift som funnits men blivit for gammal for att ligga till grund for en ranking. */
const INAKTUELL = (varde, kallaId, datum) => ({ varde, kalla: kallaId, inaktuell: datum });

/**
 * Montrose fondplattformsavgift foljer fondens egen avgift enligt deras
 * prislista: 0,05 procent for fonder pa 0,20 procent eller lagre, annars 0,10.
 * Regeln kodas har i stallet for att skrivas av som en siffra per fond, sa att
 * den inte glider isar nar en fondavgift andras.
 * @param {number|null} forvaltningsavgift Andel per ar, eller null om okand.
 */
const montroseAvgift = forvaltningsavgift =>
  forvaltningsavgift === null ? null : K(forvaltningsavgift <= 0.0020 ? 0.0005 : 0.0010, 'montrosePris');

/**
 * En kopvag. `plattformsavgift` ar vad leverantoren tar utover fondavgiften.
 * `tillganglig` ar null tills det ar kontrollerat att fonden faktiskt finns i
 * leverantorens utbud; en verifierad avgift hos en leverantor som inte saljer
 * fonden far aldrig utse en vinnare.
 */
const KOPVAG = (plattformsavgift, tillganglig = null, utbudKalla = null) => ({
  plattformsavgift: plattformsavgift.varde,
  kalla: plattformsavgift.kalla,
  tillganglig,
  utbudKalla,
});

/** Fonden ar sokt fram i leverantorens egen fondlista pa ISIN och finns dar. */
const FINNS = (plattformsavgift, utbudKalla) => KOPVAG(plattformsavgift, true, utbudKalla);

/** Sokning pa ISIN i leverantorens egen fondlista gav noll traffar. */
const SAKNAS = (plattformsavgift, utbudKalla) => KOPVAG(plattformsavgift, false, utbudKalla);

export const LEVERANTORER = [
  { id: 'avanza', namn: 'Avanza', partner: false, status: null },
  { id: 'nordnet', namn: 'Nordnet', partner: false, status: null },
  { id: 'montrose', namn: 'Montrose', partner: false, status: null, aterbetalar: true },
  { id: 'savr', namn: 'SAVR', partner: false, status: null, aterbetalar: true },
  { id: 'fondo', namn: 'Fondo', partner: false, status: 'Säljs inte till privatpersoner. Fondo levererar i dag fondsparande till andra företag via API och tar 0,15 % årlig avgift ur slutkundens depå. Raden står kvar därför att flera svenska guider fortfarande listar Fondo som en köpväg.' },
];

/**
 * Leverantorens valutaväxling, som traffar ETF:er i utlandsk valuta vid varje
 * kop. For manadssparande betalas den tolv ganger om aret, vilket kan vaga
 * tyngre an en tiondels procentenhet i fondavgift. Andel per vaxling.
 */
export const VAXLING = {
  avanza: { automatisk: K(0.0025, 'avanzaPris'), manuell: K(0.00125, 'avanzaPris'), utdelning: K(0.0025, 'avanzaPris'), anmarkning: 'Manuell växling gäller inte fonder. En fond i utländsk valuta växlas alltid automatiskt.' },
  nordnet: { automatisk: K(0.0025, 'nordnetPris'), manuell: K(0.00075, 'nordnetPris'), utdelning: K(0, 'nordnetPris'), anmarkning: null },
  montrose: { automatisk: K(0.0012, 'montrosePris'), manuell: null, utdelning: K(0, 'montrosePris'), anmarkning: 'Nivå Access. På utländska fonder tar Montrose 0,3 % tills vidare, med tekniska begränsningar som skäl.' },
  savr: { automatisk: K(0.0019, 'savrPris'), manuell: null, utdelning: null, anmarkning: null },
  fondo: null,
};

// Inga affiliateavtal ar tecknade eller verifierade. Sa lange partner ar false
// overallt visas inga asterisker. Se BACKLOG.md om affiliateutredningen.

/**
 * Fonder. `forvaltningsavgift` och `arligAvgift` ar fondens egna avgifter.
 * `kopvagar` ar leverantorens pafyllnad, som ar oberoende av fondavgiften.
 * Prislistorna ar lasta 2026-09-09. Utbudet ar sokt pa ISIN i Avanzas och
 * Nordnets egna fondlistor samma dag. Montrose har ingen publik fondlista och
 * SAVR:s fulla utbud ligger bakom inloggning, sa dar star `tillganglig` null.
 */
export const FONDER = [
  {
    namn: 'Länsförsäkringar Global Index',
    typ: 'Indexfond · utan andelsklasser',
    isin: K('SE0005188836', 'fi'),
    forvaltningsavgift: K(0.0020, 'fi'),
    arligAvgift: K(0.0021, 'lf'),
    index: K('MSCI World ex Select Securities Climate Action 75% Custom Index', 'lf'),
    tackning: K('Globala utvecklade marknader, stora och medelstora bolag', 'lf'),
    bredd: K({ innehav: 1168, lander: 31 }, 'fi'),
    replikering: K('Fysisk, full', 'lf'),
    valuta: K('SEK', 'lf'),
    utdelning: K('Ackumulerande', 'lf'),
    belaningsgrad: K(0.85, 'nordnetLf'),
    anmarkning: 'Fondbolaget anger 0,20 % förvaltningsavgift och 0,21 % årlig avgift. Nordnet visar 0,20 % under etiketten årlig avgift. Samma fond, olika definition. Indexet är omtvistat mellan två förstahandskällor: fondbolagets fondlista anger MSCI World ex Select Securities Climate Action, medan fondbolagets egen rapport till FI anger Morningstar Developed Markets Top value.',
    kopvagar: {
      avanza: FINNS(K(0, 'avanzaPris'), 'avanzaUtbud'),
      nordnet: FINNS(K(0, 'nordnetPris'), 'nordnetUtbud'),
      montrose: KOPVAG(montroseAvgift(0.0020)),
      savr: FINNS(K(0.0006, 'savrPris'), 'savrPris'),
      fondo: null,
    },
  },
  {
    namn: 'DNB Global Indeks S',
    typ: 'Indexfond · andelsklass S',
    isin: K('NO0010827280', 'avanzaUtbud'),
    forvaltningsavgift: K(0.0020, 'avanzaUtbud'),
    arligAvgift: K(0.0021, 'avanzaUtbud'),
    index: K('MSCI World Index', 'dnbKid2019'),
    tackning: K('Globala utvecklade marknader', 'dnbKid2019'),
    bredd: null,
    replikering: null,
    valuta: K('SEK', 'avanzaUtbud'),
    utdelning: K('Ackumulerande', 'dnbKid2019'),
    belaningsgrad: null,
    anmarkning: 'Norsk fond, och saknas därför i FI:s register. Växlingsfrågan är avgjord: trots norsk ISIN handlas andelsklass S i SEK hos Avanza, så den automatiska växlingen på 0,25 % per riktning slår inte till. Avgifterna kommer från Avanzas fondlista, inte från fondbolagets eget faktablad; det enda faktablad vi hittat avser andelsklass A och redovisar avgift för 2018.',
    kopvagar: {
      avanza: FINNS(K(0, 'avanzaPris'), 'avanzaUtbud'),
      nordnet: FINNS(K(0, 'nordnetPris'), 'nordnetUtbud'),
      montrose: null,
      savr: KOPVAG(K(0.0006, 'savrPris')),
      fondo: null,
    },
  },
  {
    namn: 'Avanza Global',
    typ: 'Indexfond · säljs bara hos Avanza',
    isin: K('SE0011527613', 'fi'),
    forvaltningsavgift: K(0.0008, 'fi'),
    arligAvgift: K(0.0010, 'avanzaLista'),
    index: K('Morningstar Developed Markets TME Paris Aligned Benchmark Sustainability Select Index', 'avanzaBroschyr'),
    tackning: K('Globala utvecklade marknader med hållbarhetsurval', 'avanzaBroschyr'),
    bredd: K({ innehav: 979, lander: 29 }, 'fi'),
    replikering: null,
    valuta: null,
    utdelning: K('Lämnar ingen utdelning', 'avanzaBroschyr'),
    belaningsgrad: null,
    anmarkning: 'Indexet har ett hållbarhetsurval och avviker därför medvetet från bred marknadsvikt. Broschyren beskriver användning av OTC-derivat, vilket inte är samma sak som fysisk replikering och återstår att utreda. Fonden säljs bara hos Avanza, så köpvägsjämförelsen har inget att jämföra.',
    kopvagar: {
      avanza: FINNS(K(0, 'avanzaPris'), 'avanzaUtbud'),
      nordnet: SAKNAS(K(0, 'nordnetPris'), 'nordnetUtbud'),
      montrose: null,
      savr: null,
      fondo: null,
    },
  },
  {
    namn: 'Storebrand Global All Countries',
    typ: 'Indexfond · andelsklass A SEK',
    isin: K('SE0000671919', 'fi'),
    forvaltningsavgift: K(0.0030, 'fi'),
    arligAvgift: K(0.0032, 'avanzaUtbud'),
    index: K('MSCI All Countries World Index, net return', 'storebrand'),
    tackning: K('Globalt inklusive tillväxtmarknader', 'storebrand'),
    bredd: K({ innehav: 1748, lander: 49 }, 'fi'),
    replikering: null,
    valuta: K('SEK', 'storebrand'),
    utdelning: K('Ackumulerande', 'storebrand'),
    belaningsgrad: null,
    anmarkning: 'Gällande avgift för klass A SEK är 0,30 %, alltså samma som fondbestämmelsernas tak. Bredast i urvalet med 1 748 innehav i 49 länder, och den enda där Kina, Indien och Sydkorea hör till de största emittentländerna. Den högre avgiften är alltså delvis betalning för mer marknad. Registret redovisar en C-klass på 0,15 %, som bör utredas separat: C-klasser har normalt villkor en privatsparare inte uppfyller.',
    kopvagar: {
      avanza: FINNS(K(0, 'avanzaPris'), 'avanzaUtbud'),
      nordnet: FINNS(K(0, 'nordnetPris'), 'nordnetUtbud'),
      montrose: KOPVAG(montroseAvgift(0.0030)),
      savr: KOPVAG(K(0.0006, 'savrPris')),
      fondo: null,
    },
  },
  {
    namn: 'Swedbank Robur Access Global',
    typ: 'Indexfond · andelsklass A',
    isin: K('SE0007074059', 'fi'),
    forvaltningsavgift: K(0.0020, 'fi'),
    arligAvgift: K(0.0024, 'avanzaUtbud'),
    index: K('MSCI World Net', 'fi'),
    tackning: K('Globala utvecklade marknader', 'fi'),
    bredd: K({ innehav: 826, lander: 29 }, 'fi'),
    replikering: null,
    valuta: null,
    utdelning: null,
    belaningsgrad: null,
    anmarkning: 'Med i urvalet som standardval för den som har Swedbank eller en sparbank. Minst antal innehav i urvalet, 826 mot Storebrands 1 748.',
    kopvagar: {
      avanza: FINNS(K(0, 'avanzaPris'), 'avanzaUtbud'),
      nordnet: FINNS(K(0, 'nordnetPris'), 'nordnetUtbud'),
      montrose: KOPVAG(montroseAvgift(0.0020)),
      savr: KOPVAG(K(0.0006, 'savrPris')),
      fondo: null,
    },
  },
];

/**
 * ETF:er. Samtliga uppgifter fran justETF, som ar sekundarkalla.
 * Emittentens eget faktablad kravs innan nagon siffra publiceras som faktum.
 */
export const ETFER = [
  {
    namn: 'Amundi Prime All Country World Acc', ticker: 'WEBN',
    isin: K('IE0003XJA0J9', 'justetf'),
    arligAvgift: K(0.0007, 'justetf'),
    index: K('Solactive GBS Global Markets Large & Mid Cap', 'justetf'),
    tackning: K('Utvecklade marknader och tillväxtmarknader, stora och medelstora bolag', 'justetf'),
    replikering: K('Fysisk, full', 'justetf'),
    valuta: K('USD', 'justetf'),
    hemvist: K('Irland', 'justetf'),
    anmarkning: 'Befintligt researchunderlag anger indexet som All Cap och påstår att småbolag ingår. justETF anger Large & Mid Cap. Frågan måste avgöras mot Amundis faktablad.',
  },
  {
    namn: 'Vanguard FTSE All-World Acc', ticker: 'VWCE',
    isin: K('IE00BK5BQT80', 'justetf'),
    arligAvgift: K(0.0014, 'justetf'),
    index: K('FTSE All-World', 'justetf'),
    tackning: K('Utvecklade marknader och tillväxtmarknader, stora och medelstora bolag', 'justetf'),
    replikering: K('Fysisk, sampling', 'justetf'),
    valuta: K('USD', 'justetf'),
    hemvist: K('Irland', 'justetf'),
    anmarkning: 'Avgiften är sänkt. Äldre jämförelser som anger 0,22 % är inaktuella.',
  },
  {
    namn: 'SPDR MSCI ACWI IMI Acc', ticker: 'SPYI',
    isin: K('IE00B3YLTY66', 'justetf'),
    arligAvgift: K(0.0017, 'justetf'),
    index: K('MSCI ACWI IMI', 'justetf'),
    tackning: K('Utvecklade marknader, tillväxtmarknader och småbolag', 'justetf'),
    replikering: K('Fysisk, sampling', 'justetf'),
    valuta: K('USD', 'justetf'),
    hemvist: K('Irland', 'justetf'),
    anmarkning: 'Bredast i urvalet. Den högre avgiften är delvis betalning för mer marknad, inte enbart en dyrare förpackning.',
  },
  {
    namn: 'iShares Core MSCI World Acc', ticker: 'EUNL, IWDA, SWDA',
    isin: K('IE00B4L5Y983', 'justetf'),
    arligAvgift: K(0.0020, 'justetf'),
    index: K('MSCI World', 'justetf'),
    tackning: K('Endast utvecklade marknader, inga tillväxtmarknader, inga småbolag', 'justetf'),
    replikering: K('Fysisk, sampling', 'justetf'),
    valuta: K('USD', 'justetf'),
    hemvist: K('Irland', 'justetf'),
    anmarkning: null,
  },
];

/** Fondrobotar. Inget kontrollerat an. */
export const ROBOTAR = [
  { namn: 'LYSA', typ: 'Redaktionens utgångspunkt för enkelhet', aktieandel: null, ovrigt: null, service: null, totalavgift: null },
  { namn: 'Opti', typ: 'Jämförbar fondrobot', aktieandel: null, ovrigt: null, service: null, totalavgift: null },
];

/** Senaste kontrolldatum i hela underlaget. */
export const SENAST_KONTROLLERAD = '2026-09-09';
