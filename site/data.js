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
  fi: { id: 'fi', namn: 'FI:s fondinnehavsregister, kvartalsslut 2026-06-30', url: 'https://www.fi.se/sv/vara-register/fondinnehav-per-kvartal/', datum: '2026-08-20', typ: 'primar' },
  avanzaPris: { id: 'avanzaPris', namn: 'Avanzas prislista för utlandshandel', url: 'https://www.avanza.se/konton-lan-prislista/prislista/handel-utland.html', datum: '2026-09-09', typ: 'primar' },
  nordnetPris: { id: 'nordnetPris', namn: 'Nordnets prislista', url: 'https://www.nordnet.se/kundservice/prislista', datum: '2026-09-09', typ: 'primar' },
  montrosePris: { id: 'montrosePris', namn: 'Montrose prislista', url: 'https://www.montrose.io/priser', datum: '2026-09-09', typ: 'primar' },
  savrPris: { id: 'savrPris', namn: 'SAVR, priser fonder', url: 'https://www.savr.com/sv/priser-fonder', datum: '2026-09-09', typ: 'primar' },
  avanzaUtbud: { id: 'avanzaUtbud', namn: 'Avanzas fondlista, sökning på ISIN', url: 'https://www.avanza.se/fonder/lista.html', datum: '2026-09-09', typ: 'primar' },
  nordnetUtbud: { id: 'nordnetUtbud', namn: 'Nordnets fondlista, sökning på ISIN', url: 'https://www.nordnet.se/fonder/lista', datum: '2026-09-09', typ: 'primar' },
  lfBroschyr: { id: 'lfBroschyr', namn: 'Informationsbroschyr för Länsförsäkringar Global Index', url: 'https://doc.morningstar.com/LatestDoc.aspx?clientid=lansforsakringar&key=103b4edad3299b1b&investmentid=F00000PYZ6&documenttype=1&language=472,451&frame=0', datum: '2026-07-01', typ: 'primar' },
  dnbKid: { id: 'dnbKid', namn: 'DNB Asset Management, faktablad (PRIIP KID) för DNB Global Indeks S', url: 'https://dnbam.com/se/vara-fonder/fonder', datum: '2026-04-14', typ: 'primar' },
  amundiFaktablad: { id: 'amundiFaktablad', namn: 'Amundi, månadsrapport för Amundi Prime All Country World UCITS ETF Acc', url: 'https://www.amundietf.fi/pdfDocuments/monthly-factsheet/IE0003XJA0J9/ENG/FIN/INSTITUTIONNEL/ETF/20260731', datum: '2026-07-31', typ: 'primar' },
  vanguardFaktablad: { id: 'vanguardFaktablad', namn: 'Vanguard, faktablad för FTSE All-World UCITS ETF (USD) Accumulating', url: 'https://fund-docs.vanguard.com/FTSE_All-World_UCITS_ETF_USD_Accumulating_9679_INT_OFF_ETF_EN.pdf', datum: '2026-07-31', typ: 'primar' },
  ssgaProdukt: { id: 'ssgaProdukt', namn: 'State Street Global Advisors, produktsida för SPDR MSCI ACWI IMI UCITS ETF', url: 'https://www.ssga.com/uk/en_gb/intermediary/etfs/state-street-spdr-msci-all-country-world-investable-market-ucits-etf-acc-spyi-gy', datum: '2026-09-09', typ: 'primar' },
  isharesFaktablad: { id: 'isharesFaktablad', namn: 'iShares, faktablad för Core MSCI World UCITS ETF USD (Acc)', url: 'https://www.ishares.com/uk/individual/en/literature/fact-sheet/swda-ishares-core-msci-world-ucits-etf-fund-fact-sheet-en-gb.pdf', datum: '2026-08-31', typ: 'primar' },
  avanzaEtfUtbud: { id: 'avanzaEtfUtbud', namn: 'Avanzas värdepapperssökning på ISIN', url: 'https://www.avanza.se/borshandlade-produkter/etf-torg/lista.html', datum: '2026-09-09', typ: 'primar' },
  nordnetEtfUtbud: { id: 'nordnetEtfUtbud', namn: 'Nordnets ETF-lista, sökning på ISIN', url: 'https://www.nordnet.se/etf/lista', datum: '2026-09-09', typ: 'primar' },
  savrPrisAktier: { id: 'savrPrisAktier', namn: 'SAVR, priser för aktier och börshandlat', url: 'https://www.savr.com/sv/priser-aktier', datum: '2026-09-09', typ: 'primar' },
  riksbanken: { id: 'riksbanken', namn: 'Riksbanken, dagskurs EUR/SEK', url: 'https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/', datum: '2026-09-08', typ: 'primar' },
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

/**
 * Courtage vid ETF-handel pa Tyskland/Xetra, som ar den handelsplats alla fyra
 * ETF:erna i urvalet faktiskt handlas pa hos svenska leverantorer.
 *
 * Handelsplatsen ar inte en formalitet. Minimicourtaget varierar fran 1 SEK
 * till 39 SEK beroende pa bors, och pa ett manadskop pa nagra tusen kronor ar
 * det golvet hela kostnaden: den rorliga procentsatsen slar aldrig igenom.
 * Darfor anges lagsta courtage per bors, inte som ett snitt.
 *
 * `lagsta` ar i `lagstaValuta`. Avanza tar sitt golv i euro, ovriga i kronor,
 * sa jamforelsen kraver en vaxelkurs. Se VAXELKURS nedan.
 */
export const COURTAGE = {
  avanza: { klass: 'Start och Mini', rorligt: K(0.0025, 'avanzaPris'), lagsta: K(1, 'avanzaPris'), lagstaValuta: 'EUR', anmarkning: null },
  nordnet: { klass: 'Mini', rorligt: K(0.0025, 'nordnetPris'), lagsta: K(9, 'nordnetPris'), lagstaValuta: 'SEK', anmarkning: 'Nordnets golv utanför Norden är 9 SEK. I Norden är det 1 SEK, men ingen av ETF:erna handlas där.' },
  montrose: { klass: 'Access', rorligt: K(0.0015, 'montrosePris'), lagsta: K(19, 'montrosePris'), lagstaValuta: 'SEK', anmarkning: 'Golvet gäller Tyskland, Frankrike, Schweiz och Storbritannien. På Irland, i Italien och Nederländerna är det 39 SEK, och i Norden 1 SEK.' },
  savr: { klass: null, rorligt: K(0.0020, 'savrPrisAktier'), lagsta: K(1, 'savrPrisAktier'), lagstaValuta: 'SEK', anmarkning: 'SAVR tar samma courtage oavsett marknad, i en trappa: 1 kr upp till 500 kr, 0,20 % till 20 000 kr, därefter 0,15 %, 0,10 % och 0,05 %, som mest 99 kr. Siffran här är trappans andra steg och gäller köp mellan 501 och 20 000 kr.' },
  fondo: null,
};

/**
 * Vaxelkurs for att gora Avanzas courtagegolv i euro jamforbart med de svenska.
 * Kursen ror sig dagligen; den ar ett rakneantagande med kalla och datum, inte
 * en kontrollerad egenskap hos nagon produkt. En rorelse pa nagra procent
 * flyttar inte vilken leverantor som ar billigast i det har spannet.
 */
export const VAXELKURS = { EUR: K(11.1520, 'riksbanken') };

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
    forvaltningsavgift: K(0.0020, 'lfBroschyr'),
    arligAvgift: K(0.0021, 'lf'),
    index: K('MSCI World ex Select Securities Climate Action 75% Custom Index', 'lfBroschyr'),
    tackning: K('Globala utvecklade marknader, stora och medelstora bolag', 'lf'),
    bredd: K({ innehav: 1168, lander: 31 }, 'fi'),
    replikering: K('Fysisk, full', 'lf'),
    valuta: K('SEK', 'lf'),
    utdelning: K('Ackumulerande', 'lf'),
    belaningsgrad: K(0.85, 'nordnetLf'),
    anmarkning: 'Fondbolaget anger 0,20 % förvaltningsavgift och 0,21 % årlig avgift. Nordnet visar 0,20 % under etiketten årlig avgift. Samma fond, olika definition. Indexfrågan är avgjord: informationsbroschyren, daterad 2026-07-01, säger att fonden följer MSCI World ex Select Securities Climate Action 75% Custom Index och att indexet replikeras med full fysisk replikering. Uppgiften Morningstar Developed Markets Top value i fondbolagets rapport till FI stämmer alltså inte med fondens eget prospekt och används inte. Broschyren anger samtidigt gällande förvaltningsavgift 0,20 % mot ett tak på 0,50 %.',
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
    isin: K('NO0010827280', 'dnbKid'),
    forvaltningsavgift: K(0.0020, 'dnbKid'),
    arligAvgift: K(0.0021, 'dnbKid'),
    index: K('MSCI World Index Net', 'dnbKid'),
    tackning: K('Globala utvecklade marknader', 'dnbKid'),
    bredd: null,
    replikering: K('Fysisk, full', 'dnbKid'),
    valuta: K('SEK', 'dnbKid'),
    utdelning: K('Lämnar ingen utdelning', 'dnbKid'),
    belaningsgrad: null,
    anmarkning: 'Norsk fond, och saknas därför i FI:s register. Växlingsfrågan är avgjord: trots norsk ISIN handlas andelsklass S i SEK, så den automatiska växlingen på 0,25 % per riktning slår inte till. Avgifterna kommer nu från fondbolagets eget faktablad, upprättat 2026-04-14: 0,20 % förvaltning och administration plus 0,01 % transaktionskostnader, alltså 0,21 % totalt. Det bekräftar Avanzas siffra. Fonden använder normalt derivat för att effektivisera förvaltningen, och valutaexponeringen säkras inte tillbaka till andelsklassens basvaluta.',
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
    forvaltningsavgift: K(0.0008, 'avanzaBroschyr'),
    arligAvgift: K(0.0010, 'avanzaLista'),
    index: K('Morningstar Developed Markets TME Paris Aligned Benchmark Sustainability Select Index', 'avanzaBroschyr'),
    tackning: K('Globala utvecklade marknader med hållbarhetsurval', 'avanzaBroschyr'),
    bredd: K({ innehav: 979, lander: 29 }, 'fi'),
    replikering: K('Fysisk, med derivat i begränsad omfattning', 'avanzaBroschyr'),
    valuta: K('SEK', 'avanzaBroschyr'),
    utdelning: K('Lämnar ingen utdelning', 'avanzaBroschyr'),
    belaningsgrad: null,
    anmarkning: 'Indexet har ett hållbarhetsurval och avviker därför medvetet från bred marknadsvikt. Derivatfrågan är utredd mot informationsbroschyren: fonden placerar direkt i överlåtbara värdepapper för att följa indexet, men får också använda derivat som ett led i placeringsinriktningen, inklusive OTC-derivat enligt 5 kap. 12 § andra stycket lagen om värdepappersfonder. Broschyren skriver ut att det ger en begränsad motpartsrisk, att derivaten bara används i begränsad omfattning och att de därför inte väntas påverka riskprofilen. Det är alltså inte en syntetisk fond som byter bort hela indexavkastningen mot en motparts löfte. Fonden var före september 2024 en matarfond, vilket gör äldre avkastningshistorik svårjämförbar. Den säljs bara hos Avanza, så köpvägsjämförelsen har inget att jämföra.',
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
 * ETF-kopvag. Till skillnad fran fonderna finns ingen arlig plattformsavgift
 * att jamfora: kostnaden ar courtage och vaxling vid varje kop, och den ar
 * gemensam per leverantor och handelsplats. Se COURTAGE och VAXLING. Har star
 * darfor bara om ETF:en bevisligen gar att kopa hos leverantoren.
 */
const ETFKOP = (tillganglig, utbudKalla = null) => ({ tillganglig, utbudKalla });

/**
 * Utbudet ar kontrollerat per ETF genom sokning pa ISIN hos bada, 2026-09-09.
 * Alla fyra finns hos Avanza och Nordnet, samtliga pa Xetra. Montrose och SAVR
 * saljer bada ETF:er, men har inget publikt utbud att soka i, sa dar ar svaret
 * okant och de kan darfor inte utses till billigaste kopvag.
 *
 * Funktion i stallet for delad konstant: varje ETF far sin egen kopia, sa att
 * en rad kan andras nar ett utbud visar sig skilja sig, utan att flytta med de
 * andra tre.
 */
const sokthosBada = () => ({
  avanza: ETFKOP(true, 'avanzaEtfUtbud'),
  nordnet: ETFKOP(true, 'nordnetEtfUtbud'),
  montrose: ETFKOP(null),
  savr: ETFKOP(null),
  fondo: null,
});

/**
 * ETF:er, kontrollerade mot emittentens egen dokumentation 2026-09-09.
 *
 * `basvaluta` ar fondens redovisningsvaluta och `handelsvaluta` den valuta
 * ordern faktiskt betalas i. De skiljer sig for alla fyra: fonderna redovisar i
 * USD men handlas i euro pa Xetra. Det ar handelsvalutan som kostar pengar, en
 * gang per kop, sa det ar den som far styra berakningen.
 *
 * `jamforbarFond` pekar ut vilken fond i FONDER som brytpunkten raknas mot.
 * Valet ar redaktionellt och star utskrivet i granssnittet, eftersom en
 * brytpunkt mot fel fond ar en jamforelse mellan olika marknader.
 */
export const ETFER = [
  {
    namn: 'Amundi Prime All Country World Acc', ticker: 'WEBN',
    isin: K('IE0003XJA0J9', 'amundiFaktablad'),
    arligAvgift: K(0.0007, 'amundiFaktablad'),
    index: K('Solactive GBS Global Markets Large & Mid Cap Index', 'amundiFaktablad'),
    tackning: K('Utvecklade marknader och tillväxtmarknader, stora och medelstora bolag', 'amundiFaktablad'),
    innehav: K(3651, 'amundiFaktablad'),
    replikering: K('Fysisk, full', 'amundiFaktablad'),
    basvaluta: K('USD', 'amundiFaktablad'),
    handelsplats: K('Xetra', 'avanzaEtfUtbud'),
    handelsvaluta: K('EUR', 'avanzaEtfUtbud'),
    hemvist: K('Irland', 'amundiFaktablad'),
    utdelning: K('Ackumulerande', 'amundiFaktablad'),
    jamforbarFond: 'Storebrand Global All Countries',
    anmarkning: 'Småbolagsfrågan är avgjord mot Amundis egen månadsrapport, och svaret är nej. Indexet följer det stora och medelstora segmentet, ungefär de största 85 % av börsvärdet i de globala marknaderna. Researchunderlagets påstående om All Cap stämmer alltså inte, och justETF hade rätt. Rapporten anger 3 651 innehav och direkt replikering; derivat används för in- och utflöden, och fonden får låna ut värdepapper för att täcka sina kostnader.',
    kopvagar: sokthosBada(),
  },
  {
    namn: 'Vanguard FTSE All-World Acc', ticker: 'VWCE',
    isin: K('IE00BK5BQT80', 'vanguardFaktablad'),
    arligAvgift: K(0.0014, 'vanguardFaktablad'),
    index: K('FTSE All-World Index', 'vanguardFaktablad'),
    tackning: K('Utvecklade marknader och tillväxtmarknader, stora och medelstora bolag', 'vanguardFaktablad'),
    innehav: K(3782, 'vanguardFaktablad'),
    replikering: K('Fysisk, sampling', 'vanguardFaktablad'),
    basvaluta: K('USD', 'vanguardFaktablad'),
    handelsplats: K('Xetra', 'avanzaEtfUtbud'),
    handelsvaluta: K('EUR', 'avanzaEtfUtbud'),
    hemvist: K('Irland', 'vanguardFaktablad'),
    utdelning: K('Ackumulerande', 'vanguardFaktablad'),
    jamforbarFond: 'Storebrand Global All Countries',
    anmarkning: 'Avgiften 0,14 % är bekräftad mot Vanguards eget faktablad. Äldre jämförelser som anger 0,22 % är inaktuella. Faktabladet redovisar 3 782 innehav mot indexets 4 264, alltså ett urval och inte full replikering. Samma ETF handlas under tickern VWRA i USD och VWRP i pund i London; det är VWCE i euro på Xetra som svenska leverantörer erbjuder.',
    kopvagar: sokthosBada(),
  },
  {
    namn: 'SPDR MSCI ACWI IMI Acc', ticker: 'SPYI',
    isin: K('IE00B3YLTY66', 'ssgaProdukt'),
    arligAvgift: K(0.0017, 'ssgaProdukt'),
    index: K('MSCI ACWI IMI', 'ssgaProdukt'),
    tackning: K('Utvecklade marknader, tillväxtmarknader och småbolag', 'ssgaProdukt'),
    innehav: K(5999, 'ssgaProdukt'),
    replikering: K('Fysisk, optimerad sampling', 'ssgaProdukt'),
    basvaluta: K('USD', 'ssgaProdukt'),
    handelsplats: K('Xetra', 'avanzaEtfUtbud'),
    handelsvaluta: K('EUR', 'avanzaEtfUtbud'),
    hemvist: K('Irland', 'ssgaProdukt'),
    utdelning: K('Ackumulerande', 'ssgaProdukt'),
    jamforbarFond: 'Storebrand Global All Countries',
    anmarkning: 'Bredast i urvalet, och den enda som tar med småbolag. Indexet omfattar omkring 9 000 bolag, men fonden äger 5 999 av dem: en optimerad sampling, inte full replikering. Den högre avgiften är delvis betalning för mer marknad, inte enbart en dyrare förpackning. Xetra är emittentens primära handelsplats för den här ETF:en.',
    kopvagar: sokthosBada(),
  },
  {
    namn: 'iShares Core MSCI World Acc', ticker: 'EUNL',
    isin: K('IE00B4L5Y983', 'isharesFaktablad'),
    arligAvgift: K(0.0020, 'isharesFaktablad'),
    index: K('MSCI World Index (Net)', 'isharesFaktablad'),
    tackning: K('Endast utvecklade marknader, inga tillväxtmarknader, inga småbolag', 'isharesFaktablad'),
    innehav: K(1279, 'isharesFaktablad'),
    replikering: K('Fysisk, optimerad sampling', 'isharesFaktablad'),
    basvaluta: K('USD', 'isharesFaktablad'),
    handelsplats: K('Xetra', 'avanzaEtfUtbud'),
    handelsvaluta: K('EUR', 'avanzaEtfUtbud'),
    hemvist: K('Irland', 'isharesFaktablad'),
    utdelning: K('Ackumulerande', 'isharesFaktablad'),
    jamforbarFond: 'Swedbank Robur Access Global',
    anmarkning: 'Smalast i urvalet: 23 utvecklade länder, ungefär 85 % av börsvärdet i varje land, inga tillväxtmarknader och inga småbolag. Samma ETF har tickern SWDA i pund och IWDA i dollar och euro på andra börser; EUNL i euro på Xetra är den svenska leverantörer handlar. Den jämförs mot Swedbank Robur Access Global, som följer samma index och därför är det närmaste fondalternativet.',
    kopvagar: sokthosBada(),
  },
];

/** Fondrobotar. Inget kontrollerat an. */
export const ROBOTAR = [
  { namn: 'LYSA', typ: 'Redaktionens utgångspunkt för enkelhet', aktieandel: null, ovrigt: null, service: null, totalavgift: null },
  { namn: 'Opti', typ: 'Jämförbar fondrobot', aktieandel: null, ovrigt: null, service: null, totalavgift: null },
];

/** Senaste kontrolldatum i hela underlaget. */
export const SENAST_KONTROLLERAD = '2026-09-09';
