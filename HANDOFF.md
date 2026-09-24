---
schemaVersion: 1
status: active
currentGoal: Omläggningen 2026-09-24 är byggd och publicerad. Nästa är Patriks genomläsning av sajten.
nextAction: Patrik läser buildapp.se/investeringar och säger vad som ska bort eller flyttas. Kör lokalt med node server.mjs i site/, port 4173.
blockers: []
reviewedAt: 2026-09-24
---

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
- Opti: aktieandel per nivå och om 0,50 % är inkl. moms är okänt. Avanza Auto: aktieandel per nivå okänd.
- Länderantal saknas för FTSE- och Solactive-ETF:erna (VGLA, WEBN, VWCE, FWIA, VFEA m.fl.).
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


## Granskning 2026-09-16

Cross-project audit run from elwyn-dash (session 5 in the daily note). Results written to `## Audits` in CONTEXT.md, findings appended to BACKLOG.md under `## Granskning 2026-09-16`. Headers on buildapp.se and the TLS grade are zone-level and are fixed once in Cloudflare, not here.
