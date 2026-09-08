// Produktdata for jamforelsen.
//
// Varje uppgift ar antingen kontrollerad mot en namngiven kalla med datum,
// eller null. Null betyder "ej verifierat" och far aldrig ersattas med en
// gissning; grannsnittet visar frannvaron i stallet. Underlaget och de atta
// kvarvarande kontrollpunkterna finns i docs/research/kandidater-verifierade.md.
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
};

/** Kontrollerad uppgift. @param {number|string} varde @param {string} kallaId */
const K = (varde, kallaId) => ({ varde, kalla: kallaId });

/** Uppgift som funnits men blivit for gammal for att ligga till grund for en ranking. */
const INAKTUELL = (varde, kallaId, datum) => ({ varde, kalla: kallaId, inaktuell: datum });

export const LEVERANTORER = [
  { id: 'avanza', namn: 'Avanza', partner: false },
  { id: 'nordnet', namn: 'Nordnet', partner: false },
  { id: 'montrose', namn: 'Montrose', partner: false },
  { id: 'savr', namn: 'SAVR', partner: false },
  { id: 'fondo', namn: 'Fondo', partner: false },
];

// Inga affiliateavtal ar tecknade eller verifierade. Sa lange partner ar false
// overallt visas inga asterisker. Se BACKLOG.md om affiliateutredningen.

/**
 * Fonder. `forvaltningsavgift` och `arligAvgift` ar fondens egna avgifter.
 * `kopvagar` ar leverantorens pafyllnad, som ar oberoende av fondavgiften.
 * Ingen leverantors prislista ar kontrollerad an, darfor ar samtliga null.
 */
export const FONDER = [
  {
    namn: 'Länsförsäkringar Global Index',
    typ: 'Indexfond · andelsklass ej verifierad',
    isin: K('SE0005188836', 'lf'),
    forvaltningsavgift: K(0.0020, 'lf'),
    arligAvgift: K(0.0021, 'lf'),
    index: K('MSCI World ex Select Securities Climate Action 75% Custom Index', 'lf'),
    tackning: K('Globala utvecklade marknader, stora och medelstora bolag', 'lf'),
    replikering: K('Fysisk, full', 'lf'),
    valuta: K('SEK', 'lf'),
    utdelning: K('Ackumulerande', 'lf'),
    belaningsgrad: K(0.85, 'nordnetLf'),
    anmarkning: 'Fondbolaget anger 0,20 % förvaltningsavgift och 0,21 % årlig avgift. Nordnet visar 0,20 % under etiketten årlig avgift. Samma fond, olika definition.',
    kopvagar: { avanza: null, nordnet: null, montrose: null, savr: null, fondo: null },
  },
  {
    namn: 'DNB Global Indeks S',
    typ: 'Indexfond · andelsklass S',
    isin: null,
    forvaltningsavgift: INAKTUELL(0.0020, 'dnbKid2019', '2019'),
    arligAvgift: INAKTUELL(0.0021, 'dnbKid2019', '2019'),
    index: K('MSCI World Index', 'dnbKid2019'),
    tackning: K('Globala utvecklade marknader', 'dnbKid2019'),
    replikering: null,
    valuta: null,
    utdelning: K('Ackumulerande', 'dnbKid2019'),
    belaningsgrad: null,
    anmarkning: 'Enda faktablad vi hittat avser andelsklass A och redovisar avgift för 2018. För gammalt för att ligga till grund för en kostnadsjämförelse. A-klassen handlas i NOK; om S handlas i SEK är obekräftat.',
    kopvagar: { avanza: null, nordnet: null, montrose: null, savr: null, fondo: null },
  },
  {
    namn: 'Avanza Global',
    typ: 'Indexfond · säljs bara hos Avanza',
    isin: null,
    forvaltningsavgift: K(0.0008, 'avanzaBroschyr'),
    arligAvgift: K(0.0010, 'avanzaLista'),
    index: K('Morningstar Developed Markets TME Paris Aligned Benchmark Sustainability Select Index', 'avanzaBroschyr'),
    tackning: K('Globala utvecklade marknader med hållbarhetsurval', 'avanzaBroschyr'),
    replikering: null,
    valuta: null,
    utdelning: K('Lämnar ingen utdelning', 'avanzaBroschyr'),
    belaningsgrad: null,
    anmarkning: 'Indexet har ett hållbarhetsurval och avviker därför medvetet från bred marknadsvikt. Broschyren beskriver användning av OTC-derivat, vilket inte är samma sak som fysisk replikering och återstår att utreda.',
    kopvagar: { avanza: null, nordnet: null, montrose: null, savr: null, fondo: null },
  },
  {
    namn: 'Storebrand Global All Countries',
    typ: 'Indexfond · andelsklass A SEK',
    isin: null,
    forvaltningsavgift: null,
    arligAvgift: null,
    index: K('MSCI All Countries World Index, net return', 'storebrand'),
    tackning: K('Globalt inklusive tillväxtmarknader', 'storebrand'),
    replikering: null,
    valuta: K('SEK', 'storebrand'),
    utdelning: K('Ackumulerande', 'storebrand'),
    belaningsgrad: null,
    anmarkning: 'Fondbestämmelserna sätter taket för förvaltningsavgiften till 0,30 % för klass A och B. Gällande avgift är inte kontrollerad. Enda fonden i urvalet som följer ett All Countries-index och alltså inkluderar tillväxtmarknader.',
    kopvagar: { avanza: null, nordnet: null, montrose: null, savr: null, fondo: null },
  },
  {
    namn: 'Swedbank Robur Access Global',
    typ: 'Indexfond · kandidat',
    isin: null,
    forvaltningsavgift: null,
    arligAvgift: null,
    index: null,
    tackning: null,
    replikering: null,
    valuta: null,
    utdelning: null,
    belaningsgrad: null,
    anmarkning: 'Med i urvalet som standardval för den som har Swedbank eller en sparbank. Inga uppgifter kontrollerade.',
    kopvagar: { avanza: null, nordnet: null, montrose: null, savr: null, fondo: null },
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
export const SENAST_KONTROLLERAD = '2026-09-08';
