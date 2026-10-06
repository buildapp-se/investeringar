---
schemaVersion: 1
status: active
currentGoal: Omläggningen 2026-09-24 är byggd och publicerad. Nästa är Patriks genomläsning av sajten.
nextAction: Patrik granskar grenen batch/2026-10-06 (fyra commits, inte mergad, inte publicerad) och läser sedan buildapp.se/investeringar och säger vad som ska bort eller flyttas. Kör lokalt med node server.mjs i site/, port 4173.
blockers: []
reviewedAt: 2026-10-06
---

**2026-09-24, audits från aifabriken (`tools/audit-run.mjs`).** Actions: `persist-credentials: false` på checkout i deploy.yml (zizmor artipacked). Nya auditrader Secrets och Actions, båda pass.

# Överlämning

## 2026-09-24: omläggningen

Patrik: för mycket text, det man vill se kom sist, AI-brasklappar överallt, och
avgiftsfokuset sabbade poängen, som är att visa vad ränta på ränta ger. Allt är
omgjort, se CONTEXT.md avsnitt Sidorna. Borttaget: avgiftseffekt, brytpunkt,
courtage per köp, belåningskalkylatorn, statusmärkning, ingångskort, popovers,
prototypbandet och Fondo. Tillagt: räknare med slutvärde, 17 ETF:er, Montrose
Global, fondrobotar med avgift, belåningsregler per plattform med "hur mycket
kan jag låna till bästa räntan", forskningssidan som ren länklista.

Research 2026-09-24 ligger i docs/research: `etf-kandidater.md`,
`belaning-plattformar.md`, `avgifter-plattformar-robotar.md`,
`forskningslankar.md`. Varje siffra på sajten har källa och datum där.

Tester: `node test-avgifter.mjs` (ränta på ränta mot sluten formel) och
`node test-belaning.mjs` (lånetak) i `site/`, plus `python verktyg/fi-fondinnehav.py --test`.

## Val tagna åt Patrik i chunk-läge

- **Montrose och SAVR visas som "högst X %"** (fondavgift plus plattformsavgift). De betalar tillbaka provisionen men publicerar inte nettot per fond, så taket är det enda som är sant utan inloggning. SAVR betalar dessutom ut provisionen kontant per kvartal, fondens kurs är densamma.
- **Ingen "billigast"-kolumn i fondtabellen.** Med tak i stället för exakta tal hos två av fyra går billigast inte att avgöra ärligt.
- **Montrose: lånetaket räknas mot eget kapital** (5 % av det du har), inte mot totalen, eftersom Montrose inte skriver ut definitionen och det ger det lägre taket. Nordnet räknas med 85 % belåningsgrad (fonderna), alltså 34 % av depån.
- **Nordnets belåningsräntor är daterade 2025-10-06 av Nordnet själva**, och det datumet står på sajten.
- **Forskning: 13 av 16 källor.** Carhart, Fama-French och Boys Will Be Boys utelämnade för korthet. Ränta på ränta har ingen egen forskningsrubrik: ingen stark primärkälla hittades, bara fondbolagsmaterial.
- **ETF:er: utdelande varianter (VGLD, VFEM) nämns på raden** i stället för egna rader.
- **Grinden och noindex är kvar.** Omläggningen ändrar inte att sidan är opublicerad.

## Känt och öppet

- Montrose och SAVR: faktisk kostnad per fond kräver inloggning, Patriks att göra om det ska bli exakt.
- Opti: aktieandel per nivå 1–9 står inte på någon publik sida (0,50 % är inklusive moms, avgjort 2026-10-06).
- Länderantal saknas för WEBN och AVWS. VFEA:s 24 är härledd och ska läsas om när FTSE Emergings septemberfaktablad finns.
- En researchagent skickade Patriks mejladress som kontaktparameter till Unpaywall API (två anrop). Rapporterat till Patrik 2026-09-24.

## Publicering

Repot `buildapp-se/investeringar`, live på buildapp.se/investeringar via GitHub
Pages, deploy vid push till `master` efter testerna. Klientsidesgrind (ingen
säkerhet, hash i `site/grind.js`) och `noindex` på alla sidor.

## Arbetsyta

Arbeta i `C:\dev\investeringar`. Följ global boot i `C:\dev\CLAUDE.md`. `C:\dev` får aldrig bli git-repo. Grinden passeras lokalt genom att sätta `localStorage['grind-oppen']` till hashen i `site/grind.js`.

## Arbetsmetod som fungerat

Tre saker som kostade tid att hitta och som sparar den nästa gång utbud eller
faktablad ska kontrolleras:

- **Avanzas utbudssökning går via POST**, inte GET. `POST /_api/search/filtered-search`
  med `{"query":"<ISIN>","pagination":{"from":0,"size":10}}` svarar med produktnamn,
  ticker, `marketPlaceName`, valuta och `buyable`. Alltså både utbud och handelsplats
  i ett anrop. De gamla GET-vägarna under `/_api/search/global-search/` ger 404.
- **Nordnets API kräver session, men webbsidan gör inte det.** ETF-listan filtrerar
  på `?freeTextSearch=<ISIN>`, och instrumentets URL avslöjar ticker och börs:
  `/etf/lista/i-shares-core-msci-world-eunl-xeta`. Ett anrop till
  `/marknaden/etf-listor/<id>-x` följer redirekten fram till rätt slug.
- **Emittenternas faktablad är PDF:er som WebFetch inte kan läsa.** Verktyget sparar
  dem ändå på disk, och `pdftotext -layout -enc UTF-8` ger läsbar text. Det var så
  WEBN-frågan avgjordes. Amundis månadsrapport ligger på en URL med månadsslut i
  slutet; fel datum ger 404, så använd senaste månadsskifte.

Chrome DevTools-MCP användes i stället för Playwright-MCP, som vägrade starta med
"Browser is already in use" mot en låst profil. Grinden passeras lokalt genom att
sätta `localStorage['grind-oppen']` till hashen i `site/grind.js`, utan att kunna
ordet.

- **Avanzas belåningsvärde per fond** ligger i `/_api/fund-guide/fund-trading-terms/{id}` (`collateralValue`), Nordnets i instrument-API:ts `pawn_percentage`. Fondavgift: `/_api/fund-guide/guide/{id}` (`productFee`).
- Montrose och SAVR går inte att läsa utloggad per fond. Försök inte igen utan konto.
- **Fondbolagets faktablad (PRIIP KID) för vilken fond som helst hos Avanza:** `https://www.avanza.se/_api/fund-reference/reference/{id}/prospectus` ger PDF:en direkt med curl, sedan `pdftotext -layout -enc UTF-8`. Fondbolagens egna dokumentsajter gav 404 på gissade adresser.
- **Länder per index:** FTSE Russells faktablad hämtas med `https://research.ftserussell.com/Analytics/FactSheets/Home/DownloadSingleIssue?issueName=<KOD>&IsManual=false` (AWORLDS All-World, GEISLMS Global All Cap, AWALLE Emerging, AWD Developed) och har en tabell med alla länder. Fel kod ger en HTML-sida med status 200, kontrollera att svaret är en PDF. MSCI:s ligger på `https://www.msci.com/documents/10199/255599/<indexnamn>-net.pdf` och skriver antalet länder i första stycket. Solactives faktablad har bara ett diagram.


## Granskning 2026-09-16

Cross-project audit run from elwyn-dash (session 5 in the daily note). Results written to `## Audits` in CONTEXT.md, findings appended to BACKLOG.md under `## Granskning 2026-09-16`. Headers on buildapp.se and the TLS grade are zone-level and are fixed once in Cloudflare, not here.

## Automated audit batch, 2026-10-06

Cross-project run from elwyn-dash with aifabriken `tools/audit-suite.ts` (headers, npm audit, secrets, Actions, markup, axe at one mobile viewport; TLS and Lighthouse not run). Results are the `(automated)` lines under `## Audits` in CONTEXT.md, findings under `## Granskning 2026-10-06` in BACKLOG.md. Only the login screen is reachable: axe 0 violations with 6 contrast nodes for manual review; markup 0 findings but 14 external links are outside the suite's scope; npm audit blocked (no lockfile in `site/`). Headers fail is the shared buildapp.se CSP without `script-src` (zone Transform Rule, owned by elwyn-dash `docs/security.md` §Open 11), not something this repository can fix. No application code or deployment changed. `reviewedAt` was left alone: the goal and next action above were not reviewed.

## Nattbatch 2026-10-06, grenen `batch/2026-10-06`

Fyra punkter ur BACKLOG.md, arbetade i en separat worktree, committade på grenen och pushade som backup. Inget är mergat till `master` och inget är publicerat.

- Fondbolagens egna faktablad lästa för Avanza Global, Swedbank Robur Access Global och Storebrand Global All Countries: total avgift 0,10 %, 0,24 % och 0,32 %, samma som sajten redan visar. Därmed är kandidatverifieringen klar så när som på SAVR och Montrose.
- Avanza Auto har fått aktieandel i robottabellen. Optis 0,50 % är inklusive moms.
- Åtta ETF:er har fått länderantal. Talet är antal länder i indexet, inte i fondens innehav, samma definition som raderna som redan hade en siffra.
- `site/package-lock.json` incheckad, `npm audit` ger 0.

Val tagna åt Patrik:

- `SENAST_KONTROLLERAD` står kvar på 2026-09-24. Bara några rader lästes om i dag, och ett nytt datum skulle påstå att allt är kontrollerat.
- Avanza Auto visas som "20, 40, 60, 80 eller 100 %. Auto 6: 85–120 %": normalexponeringen för Auto 1–5 och spannet för Auto 6, som saknar normalvärde i faktabladet.
- Punkten om länderantal bockades av och resten (WEBN, AVWS) blev en egen P3-rad.
- Låsfilen ligger i `site/` och följer därför med ut på GitHub Pages, precis som `package.json` redan gör.

Inte kontrollerat: hur den längre Avanza Auto-cellen ser ut i webbläsaren på 390 px. Testerna (`test-avgifter.mjs`, `test-belaning.mjs`) och en kontroll av värdena i `data.js` gick igenom.

Överhoppat eftersom det kräver Patrik: avgifter hos SAVR och Montrose (inloggning), öppna beslut och kravbekräftelse, implementationen som väntar på den, affiliate och informationskrav, kontaktadressen (provmejl), godkännandeflödet i GitHub (repoinställningar), publicering, kolumner på mobil (smak), engelsk version, konton, Golden Butterfly, blogg. Faktakontrollen av de fem breda researchdokumenten, fulltextgranskningen av forskningskällorna och datakällor för automatisk hämtning är granskningsarbete som inte ryms som en avgränsad leverans. WCAG bakom grinden ska lösas i aifabrikens svit, inte här.

