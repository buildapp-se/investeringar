// Innehall for sidorna. Alla siffror ar lasta pa bolagens egna, publika sidor.
// Kallor, datum och det som inte gick att fa fram ligger i docs/research/:
// avgifter-plattformar-robotar.md, etf-kandidater.md, belaning-plattformar.md
// och fi-fondinnehav.md. null betyder att uppgiften saknas, och visas som "–".

/** Senaste kontrolldatum i hela underlaget. */
export const SENAST_KONTROLLERAD = '2026-09-24';

export const PLATTFORMAR = [
  { id: 'avanza', namn: 'Avanza' },
  { id: 'nordnet', namn: 'Nordnet' },
  { id: 'montrose', namn: 'Montrose' },
  { id: 'savr', namn: 'SAVR' },
];

/**
 * En kopvag. `plattform` ar det plattformen tar utover fondens avgift.
 * `tak` ar sant nar plattformen betalar tillbaka fondprovisionen (Montrose, SAVR):
 * provisionen per fond publiceras inte, sa fondavgift plus plattformsavgift ar
 * da ett tak och den verkliga kostnaden ar lagre.
 * `finns` ar false nar fonden bevisligen inte saljs dar, annars true eller null (okant).
 */
const KOP = (plattform, finns = true, tak = false) => ({ plattform, finns, tak });
const SALJS_EJ = KOP(null, false);

/** Montrose plattformsavgift: 0,05 % for fonder med forvaltningsavgift upp till 0,20 %, annars 0,10 %. */
const montrose = forvaltning => KOP(forvaltning <= 0.0020 ? 0.0005 : 0.0010, null, true);
const savr = (finns = null) => KOP(0.0006, finns, true);

export const FONDER = [
  {
    namn: 'Avanza Global', isin: 'SE0011527613', url: 'https://www.avanza.se/fonder/om-fonden.html/878733',
    arligAvgift: 0.0010, bredd: { innehav: 979, lander: 29 },
    kop: { avanza: KOP(0), nordnet: SALJS_EJ, montrose: null, savr: null },
  },
  {
    namn: 'Montrose Global', isin: null, url: 'https://www.montrose.io/montrose-global',
    arligAvgift: 0.0009, bredd: null, // matarfond: allt ligger i DNB Global Indeks
    kop: { avanza: SALJS_EJ, nordnet: SALJS_EJ, montrose: KOP(0), savr: SALJS_EJ },
  },
  {
    namn: 'Länsförsäkringar Global Index', isin: 'SE0005188836', url: 'https://www.avanza.se/fonder/om-fonden.html/417655',
    arligAvgift: 0.0021, bredd: { innehav: 1168, lander: 31 },
    kop: { avanza: KOP(0), nordnet: KOP(0), montrose: montrose(0.0020), savr: savr(true) },
  },
  {
    namn: 'DNB Global Indeks S', isin: 'NO0010827280', url: 'https://www.avanza.se/fonder/om-fonden.html/1509082',
    arligAvgift: 0.0021, bredd: null, // norsk fond, finns inte i FI:s register
    kop: { avanza: KOP(0), nordnet: KOP(0), montrose: montrose(0.0020), savr: savr() },
  },
  {
    namn: 'Swedbank Robur Access Global', isin: 'SE0007074059', url: 'https://www.avanza.se/fonder/om-fonden.html/600075',
    arligAvgift: 0.0024, bredd: { innehav: 826, lander: 29 },
    kop: { avanza: KOP(0), nordnet: KOP(0), montrose: montrose(0.0020), savr: savr() },
  },
  {
    namn: 'Storebrand Global All Countries', isin: 'SE0000671919', url: 'https://www.avanza.se/fonder/om-fonden.html/2332',
    arligAvgift: 0.0032, bredd: { innehav: 1748, lander: 49 },
    kop: { avanza: KOP(0), nordnet: KOP(0), montrose: montrose(0.0030), savr: savr() },
  },
];

/** Fondrobotar och fardiga portfoljer. Avgift ar total arlig kostnad enligt bolaget. */
export const ROBOTAR = [
  { namn: 'Nordnet One', url: 'https://www.nordnet.se/faq/handel-vardepapper/fonder-etfer/nordnet-one/vad-ar-nordnet-one-och-hur-fungerar-det', avgift: '0,35 %', aktieandel: '30, 60 eller 100 %', minsta: null },
  { namn: 'Lysa', url: 'https://www.lysa.se/avgifter', avgift: '0,36 %', aktieandel: '0–100 %', minsta: '100 kr' },
  { namn: 'Avanza Auto', url: null, avgift: '0,39–0,40 %', aktieandel: null, minsta: null },
  { namn: 'Opti', url: 'https://www.opti.se/faq', avgift: 'ca 0,70 %', aktieandel: 'Nivå 1–9 eller 100 %', minsta: '200 kr' },
];

/**
 * ETF:er, kontrollerade mot emittentens faktablad 2026-09-24 (i nagra fall
 * justETF, se docs/research/etf-kandidater.md). Alla finns hos bade Avanza och
 * Nordnet, handlas pa Xetra i euro. Tickern ar Xetra-tickern.
 */
export const ETFER = [
  { grupp: 'Hela världen', ticker: 'VGLA', namn: 'Vanguard FTSE Global All Cap', isin: 'IE000VAHT5T0', avgift: 0.0007, innehav: 6429, lander: null, index: 'FTSE Global All Cap, inkl. småbolag', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '1,8 mdr EUR', start: 2026, url: 'https://fund-docs.vanguard.com/ie000vaht5t0_priipskid_en.pdf', not: 'Utdelande: VGLD' },
  { grupp: 'Hela världen', ticker: 'WEBN', namn: 'Amundi Prime All Country World', isin: 'IE0003XJA0J9', avgift: 0.0007, innehav: 3651, lander: null, index: 'Solactive GBS Global Markets Large & Mid Cap', replikering: 'Fysisk, full', hemvist: 'Irland', storlek: '3,1 mdr EUR', start: 2024, url: 'https://www.amundietf.fi/pdfDocuments/monthly-factsheet/IE0003XJA0J9/ENG/FIN/INSTITUTIONNEL/ETF/20260731' },
  { grupp: 'Hela världen', ticker: 'VWCE', namn: 'Vanguard FTSE All-World', isin: 'IE00BK5BQT80', avgift: 0.0014, innehav: 3782, lander: null, index: 'FTSE All-World', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '52,8 mdr EUR', start: 2019, url: 'https://fund-docs.vanguard.com/FTSE_All-World_UCITS_ETF_USD_Accumulating_9679_INT_OFF_ETF_EN.pdf' },
  { grupp: 'Hela världen', ticker: 'FWIA', namn: 'Invesco FTSE All-World', isin: 'IE000716YHJ7', avgift: 0.0015, innehav: 2353, lander: null, index: 'FTSE All-World', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '5,1 mdr USD', start: 2023, url: 'https://www.invesco.com/content/dam/invesco/emea/en/product-documents/etf/share-class/factsheet/IE000716YHJ7_factsheet_en.pdf' },
  { grupp: 'Hela världen', ticker: 'SCWX', namn: 'Scalable MSCI AC World Xtrackers', isin: 'LU2903252349', avgift: 0.0015, innehav: 2331, lander: 47, index: 'MSCI ACWI', replikering: 'Hybrid, swap på USA-delen', hemvist: 'Luxemburg', storlek: '0,9 mdr USD', start: 2024, url: 'https://etf.dws.com/download/asset/fd7b8b84-4314-4c4c-8cf1-1ddb770d323c' },
  { grupp: 'Hela världen', ticker: 'SPYI', namn: 'SPDR MSCI ACWI IMI', isin: 'IE00B3YLTY66', avgift: 0.0017, innehav: 5998, lander: null, index: 'MSCI ACWI IMI, inkl. småbolag', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '8,5 mdr USD', start: 2011, url: 'https://www.ssga.com/library-content/products/factsheets/etfs/emea/factsheet-emea-en_gb-spyi-gy.pdf' },
  { grupp: 'Hela världen', ticker: 'IUSQ', namn: 'iShares MSCI ACWI', isin: 'IE00B6R52259', avgift: 0.0020, innehav: 1695, lander: 47, index: 'MSCI ACWI', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '34,5 mdr USD', start: 2011, url: 'https://www.ishares.com/uk/individual/en/literature/fact-sheet/ssac-ishares-msci-acwi-ucits-etf-fund-fact-sheet-en-gb.pdf' },

  { grupp: 'Utvecklade marknader', ticker: 'SPPW', namn: 'SPDR MSCI World', isin: 'IE00BFY0GT14', avgift: 0.0012, innehav: 1241, lander: 23, index: 'MSCI World', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '20,7 mdr USD', start: 2019, url: 'https://www.ssga.com/library-content/products/factsheets/etfs/emea/factsheet-emea-en_gb-sppw-gy.pdf' },
  { grupp: 'Utvecklade marknader', ticker: 'EXUS', namn: 'Xtrackers MSCI World ex USA', isin: 'IE0006WW1TQ4', avgift: 0.0015, innehav: 755, lander: 22, index: 'MSCI World ex USA', replikering: 'Fysisk, full', hemvist: 'Irland', storlek: '7,8 mdr USD', start: 2024, url: 'https://etf.dws.com/download/asset/5f54ef99-b467-4ee2-8c6a-fdf6668f4a06', not: 'Finns även i SEK på Stockholmsbörsen' },
  { grupp: 'Utvecklade marknader', ticker: 'EUNL', namn: 'iShares Core MSCI World', isin: 'IE00B4L5Y983', avgift: 0.0020, innehav: 1279, lander: 23, index: 'MSCI World', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '148,9 mdr USD', start: 2009, url: 'https://www.ishares.com/uk/individual/en/literature/fact-sheet/swda-ishares-core-msci-world-ucits-etf-fund-fact-sheet-en-gb.pdf' },

  { grupp: 'Tillväxtmarknader', ticker: 'VFEA', namn: 'Vanguard FTSE Emerging Markets', isin: 'IE00BK5BR733', avgift: 0.0017, innehav: 2288, lander: null, index: 'FTSE Emerging', replikering: 'Fysisk', hemvist: 'Irland', storlek: '2,1 mdr EUR', start: 2019, url: 'https://fund-docs.vanguard.com/ie00bk5br733_priipskid_en.pdf', not: 'Utdelande: VFEM' },
  { grupp: 'Tillväxtmarknader', ticker: 'IS3N', namn: 'iShares Core MSCI EM IMI', isin: 'IE00BKM4GZ66', avgift: 0.0018, innehav: 3061, lander: null, index: 'MSCI EM IMI, inkl. småbolag', replikering: 'Fysisk, full', hemvist: 'Irland', storlek: '44,7 mdr USD', start: 2014, url: 'https://www.ishares.com/uk/individual/en/literature/fact-sheet/eimi-ishares-core-msci-em-imi-ucits-etf-fund-fact-sheet-en-gb.pdf' },

  { grupp: 'Småbolag och faktorer', ticker: 'XDEM', namn: 'Xtrackers MSCI World Momentum', isin: 'IE00BL25JP72', avgift: 0.0025, innehav: 351, lander: 23, index: 'MSCI World Momentum', replikering: 'Fysisk, full', hemvist: 'Irland', storlek: '2,1 mdr EUR', start: 2014, url: 'https://www.justetf.com/en/etf-profile.html?isin=IE00BL25JP72' },
  { grupp: 'Småbolag och faktorer', ticker: 'ZPRV', namn: 'SPDR MSCI USA Small Cap Value Weighted', isin: 'IE00BSPLC413', avgift: 0.0030, innehav: 1639, lander: 1, index: 'MSCI USA Small Cap Value Weighted', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '1,1 mdr USD', start: 2015, url: 'https://www.ssga.com/library-content/products/factsheets/etfs/emea/factsheet-emea-en_gb-zprv-gy.pdf' },
  { grupp: 'Småbolag och faktorer', ticker: 'ZPRX', namn: 'SPDR MSCI Europe Small Cap Value Weighted', isin: 'IE00BSPLC298', avgift: 0.0030, innehav: 819, lander: null, index: 'MSCI Europe Small Cap Value Weighted', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '0,8 mdr EUR', start: 2015, url: 'https://www.ssga.com/library-content/products/factsheets/etfs/emea/factsheet-emea-en_gb-zprx-gy.pdf' },
  { grupp: 'Småbolag och faktorer', ticker: 'IUSN', namn: 'iShares MSCI World Small Cap', isin: 'IE00BF4RFH31', avgift: 0.0035, innehav: 3548, lander: null, index: 'MSCI World Small Cap', replikering: 'Fysisk, urval', hemvist: 'Irland', storlek: '9,0 mdr USD', start: 2018, url: 'https://www.ishares.com/uk/individual/en/literature/fact-sheet/wsml-ishares-msci-world-small-cap-ucits-etf-fund-fact-sheet-en-gb.pdf' },
  { grupp: 'Småbolag och faktorer', ticker: 'AVWS', namn: 'Avantis Global Small Cap Value', isin: 'IE0003R87OG3', avgift: 0.0039, innehav: 1812, lander: null, index: 'Aktivt förvaltad, utvecklade marknader', replikering: 'Fysisk, aktiv', hemvist: 'Irland', storlek: '1,6 mdr USD', start: 2024, url: 'https://res.americancentury.com/docs/avantis-global-small-cap-value-ucits-etf-fact-sheet.pdf' },
];

/**
 * Belaning per plattform, last utloggad 2026-09-24. `basta` ar regeln for
 * lagsta rantan i den form maxLan() i belaning.js tar: `grans` som andel,
 * `motTotal` om lanet raknas in i portfoljvardet, `tak` som storsta lan i kronor.
 * Rantorna ar effektiva.
 */
export const BELANING = [
  {
    id: 'avanza', namn: 'Avanza', url: 'https://www.avanza.se/konton-lan-prislista/prislista/rantor.html', datum: '2026-09-24',
    basta: { ranta: 0.0129, grans: 0.10, motTotal: true, tak: 3000000 },
    recept: 'En enda global indexfond eller ETF räcker. Låna högst 10 % av kontots värde.',
    krav: [
      'Minst en godkänd fond eller ETF, eller tre godkända aktier. Alla fonder och de stora ETF:erna här är godkända.',
      'Ingen enskild aktie eller ETC över 49 % av det godkända.',
      'Inga optioner, terminer eller blankning på kontot.',
      'Högst 3 miljoner kr i lån på bästa nivån.',
    ],
    nivaer: [
      ['Lån upp till 10 %', 0.0129],
      ['Upp till 25 %', 0.0234],
      ['Upp till 50 %', 0.0359],
      ['Över 50 %, hela lånet', 0.0689],
    ],
  },
  {
    id: 'nordnet', namn: 'Nordnet', url: 'https://www.nordnet.se/tjanster/lan/portfoljbelaning', datum: '2025-10-06',
    // 40 % av belaningsvardet vid 85 % belaningsgrad (fonderna och WEBN) = 34 % av depan.
    basta: { ranta: 0.0224, grans: 0.34, motTotal: true },
    recept: 'Minst två fonder, ingen över 60 %, till exempel två globala indexfonder hälften var. Eller minst fem ETF:er, ingen över 20 %.',
    krav: [
      'Ansök om Portföljbelåning Plus.',
      'Ingen fond över 60 % och ingen aktie eller ETF över 20 % av det belåningsbara.',
      'Bara värdepapper med minst 70 % belåningsgrad räknas.',
      'Använd högst 40 % av belåningsvärdet. Med 85 % belåningsgrad blir det 34 % av depån.',
    ],
    nivaer: [
      ['Plus nivå 1, högst 40 % av belåningsvärdet', 0.0224],
      ['Plus nivå 2, högst 60 %, fond max 75 %, aktie/ETF max 25 %', 0.0464],
      ['Bas', 0.0713],
    ],
  },
  {
    id: 'montrose', namn: 'Montrose', url: 'https://www.montrose.io/vardepapperskredit', datum: '2026-09-24',
    // Montrose skriver inte ut om lanet raknas in i kapitalet. Mot eget kapital ger lagre, sakrare tak.
    basta: { ranta: 0.0079, grans: 0.05, motTotal: false },
    recept: 'Inget krav på spridning. Håll lånet under 5 % av ditt kapital hos Montrose.',
    krav: [
      'Räntan följer lånets andel av allt ditt kapital hos Montrose, kontanter inräknade.',
      'Med 1 miljon kr (Premium) är lägsta räntan 0,54 %, med 5 miljoner (Platinum) 0,29 %.',
    ],
    nivaer: [
      ['Upp till 5 %', 0.0079], ['5–10 %', 0.0124], ['10–15 %', 0.0168], ['15–20 %', 0.0214],
      ['20–25 %', 0.0258], ['25–30 %', 0.0303], ['30–35 %', 0.0348], ['35–40 %', 0.0393],
      ['40–50 %', 0.0439], ['50–60 %', 0.0483], ['Över 60 %', 0.0528],
    ],
  },
];

/** Belaningsvarde per vardepapper, fran bolagens publika instrumentsidor 2026-09-24. Montrose visar sina bara i appen. */
export const BELANINGSVARDE = [
  { namn: 'Länsförsäkringar Global Index', avanza: 0.80, nordnet: 0.85 },
  { namn: 'DNB Global Indeks S', avanza: 0.80, nordnet: 0.85 },
  { namn: 'Swedbank Robur Access Global', avanza: 0.80, nordnet: 0.85 },
  { namn: 'Storebrand Global All Countries', avanza: 0.80, nordnet: 0.85 },
  { namn: 'Avanza Global', avanza: 0.80, nordnet: null },
  { namn: 'WEBN', avanza: 0.80, nordnet: 0.85 },
  { namn: 'VWCE', avanza: 0.80, nordnet: 0.80 },
  { namn: 'SPYI', avanza: 0.80, nordnet: 0.80 },
  { namn: 'EUNL', avanza: 0.80, nordnet: 0.80 },
];
