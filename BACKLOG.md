# Backlog

## Inkorg

Lägg nya forumtrådar, fondnamn, ETF:er och korta kommentarer här. Fynd bearbetas via AI i projektet innan de tas med i den publika jämförelsen.

## P1 · Före publicering

- [ ] **[P1] Faktakontrollera Antigravitys researchunderlag.** Gå igenom dokumenten i [researchöversikten](docs/research/README.md) före användning i tabeller, kalkyler eller rekommendationer. Kontrollera produktnamn, ISIN, andelsklass, index, exponering, köpbarhet, avgifter, plattformsvillkor och belåningsregler mot aktuella förstahandskällor. Granska även skattepåståenden, beräkningar och påstådd forumkonsensus. Ersätt obelagda formuleringar om exempelvis ”billigast”, ”överlägsen” och säker belåning med styrkta, avgränsade slutsatser. Godkänt när uppgifterna har precisa källor och kontrolldatum och kvarvarande osäkerheter är markerade; ofullständigt underlag får inte utse billigaste alternativet.
- [x] **[P1] Slutför verifieringen av kandidaterna.** Klart 2026-10-06: total årlig avgift och replikering för Avanza Global, Swedbank Robur Access Global och Storebrand Global All Countries är lästa i fondbolagens egna faktablad, och siffrorna på sajten (0,10 %, 0,24 %, 0,32 %) stämmer. Se punkt 4 och 11 sist i [kandidater-verifierade.md](docs/research/kandidater-verifierade.md). Det enda som återstod, fondavgiften hos SAVR och Montrose per fond, är en egen punkt nedan.
- [x] **[P1] Kontrollera köpbarhet per fond och leverantör.** Klart för Avanza och Nordnet 2026-09-09 genom sökning på ISIN i deras egna fondlistor: alla fem finns hos Avanza, fyra hos Nordnet, och Avanza Global saknas där, vilket är ett belagt nej. Montrose har ingen publik fondlista och SAVR:s fulla utbud kräver inloggning, så de står kvar som okända och kan därför inte vinna en jämförelse. Se [kopvagar.md](docs/research/kopvagar.md).
- [ ] **[P1] Ta reda på vad fonderna kostar hos SAVR och Montrose.** Utloggat går det inte (kontrollerat 2026-09-24, se [avgifter-plattformar-robotar.md](docs/research/avgifter-plattformar-robotar.md)). Sajten visar "högst X %" tills någon läser dem inloggad. Patriks att göra.
- [x] **[P1] Kontrollera Fondos prismodell mot deras egen prislista.** Klart 2026-09-09, och svaret var ett annat än frågan väntade sig: Fondo säljer inte längre till privatpersoner. Bolaget levererar fondsparande till andra företag via API och tar 0,15 % årlig avgift ur slutkundens depå, alltså ovanpå fondavgiften. Båda researchdokumentens påståenden faller. Fondo står kvar som rad i tabellen med förklaring, eftersom svenska guider fortfarande listar den. Se [kopvagar.md](docs/research/kopvagar.md). Tabellen har separata fält för fondavgift och plattformsavgift, vilket var den andra halvan av punkten.
- [x] **[P1] AVWS ISIN.** Klart 2026-09-24: rätt är `IE0003R87OG3` enligt Avantis faktablad, rättat i bogleheads-dokumentet. Se [etf-kandidater.md](docs/research/etf-kandidater.md).
- [ ] **[P1] Verifiera datakällor och gratis drift.** Delvis klart 2026-09-09: FI:s fondinnehavsregister är kontrollerat och fungerar som gratis primärkälla för de svenska fonderna, hämtas med `verktyg/fi-fondinnehav.py`, se [fi-fondinnehav.md](docs/research/fi-fondinnehav.md). Det finns inget API, men en zip per kvartal räcker eftersom det bara publiceras fyra gånger om året. Kvar: motsvarande källa för ETF:erna och för leverantörernas priser, som i dag bara går att läsa manuellt, samt användningsvillkor. Ingen betaldata eller extra AI-kostnad utan separat beslut.
- [ ] **[P1] Granska forskningskällornas fulltext inför publicering.** Knyt varje faktiskt forskningspåstående till relevant originalartikel och begränsningar.
- [x] **[P1] Ta fram designförslag och välj riktning.** Klart 2026-09-08: sex riktningar från Claude Design och fem Stitch-förslag. Vald grund är Stitch Förslag E som ytskikt på riktning 07:s produktlogik, byggd som körbar prototyp i `design/prototyp/`.
- [ ] **[P1] Slutför materiella öppna beslut och få samlad kravbekräftelse.**
- [ ] **[P1] Implementera och verifiera tjänsten efter samlad bekräftelse.** Tabell, scenarier, kostnadsberäkning, belåningsjämförelse, informationsrutor, delning, lokala val och tillgänglighet enligt CONTEXT.md. Meningsfulla beräkningstester och verklig mobil-/desktopkontroll krävs.
- [ ] **[P1] Utred affiliateprogram samt reklam- och informationskrav.** Verifiera LYSA/Opti och övriga relevanta partners, redaktionella kopplingar, friskrivning och integritetstext mot aktuella förstahandskällor.
- [ ] **[P1] Konfigurera och verifiera kontaktadressen.** Mål och mottagare finns i CONTEXT.md. Granska befintlig mejlhantering innan DNS ändras; vidarebefordran är ännu inte verifierad för buildapp.se.
- [ ] **[P1] Sätt upp godkännandeflödet i GitHub.** Samlade pull requests med källor, kontroller och granskningsmejl, publicering efter Patriks Merge. Verifiera flödet i den faktiska repo-/hostingmiljön.
- [ ] **[P1] Publiceringsförberedelser och mätning.** Hosting är vald och verifierad 2026-09-09: GitHub Pages från `buildapp-se/investeringar`, live på buildapp.se/investeringar, deploy vid push till `master` efter att testerna gått igenom. Sidan ligger bakom en klientsidesgrind, är märkt som prototyp och har `noindex` på alla tre sidorna. Kvar: ta bort grinden och `noindex` när uppgifterna är klara, och först därefter Search Console, Cloudflare Web Analytics och teknisk SEO. Att indexera en prototyp skadar den riktiga lanseringen.

- [x] **[P2] Kontrollera Opti och Avanza Auto.** Klart 2026-10-06. Avanza Auto: aktieexponering per fond läst i faktabladen (normalt 20, 40, 60, 80 och 100 % för Auto 1–5, Auto 6 85–120 %) och införd på sajten. Opti: 0,50 % är inklusive moms enligt opti.se/portfolj. Optis aktieandel per nivå 1–9 står inte på någon publik sida, bara i appen, så sajten visar fortsatt "Nivå 1–9 eller 100 %". Se [avgifter-plattformar-robotar.md](docs/research/avgifter-plattformar-robotar.md).
- [x] **[P3] Länderantal för FTSE- och Solactive-ETF:erna.** Klart 2026-10-06 för åtta av tio: VGLA, VWCE, FWIA (49), SPYI (47), VFEA, IS3N (24), IUSN (23), ZPRX (15), antal länder i indexet enligt FTSE Russells och MSCI:s egna faktablad. VFEA:s 24 är härledd, se [etf-kandidater.md](docs/research/etf-kandidater.md).
- [ ] **[P3] Länderantal för WEBN och AVWS.** Solactives faktablad visar länderna bara som diagram och Avantis bara de fem största. Kräver fondens fullständiga innehavslista. Visas som "–" på sajten.

## P2 · Senare utbyggnad

- [ ] **[P2] Tabellerna scrollar i sidled på mobil.** ETF-tabellen (9 kolumner) och fondtabellen scrollar i sin egen behållare på 390 px; sidan själv står still. Avgör om kolumner ska döljas på liten skärm.
- [ ] **[P2] Engelsk version** på `/en/investments/`. Separat beslut krävs för andra länders sparförutsättningar.
- [ ] **[P2] Besökarkonton och egna sparade samlingar.** Första versionen använder redaktionellt urval och lokalt sparade inställningar utan konto.
- [ ] **[P2] Golden Butterfly och liknande portföljmodeller.** Fokus på innehåll, kostnader och forskningsunderlag.

## P3 · Senare innehåll

- [ ] **[P3] Löpande blogg.** Första versionen prioriterar jämförelsetjänsten och forskningsguiderna.

## Granskning 2026-09-16

Fynd från cockpitens granskningskolumner (Lighthouse mobil, W3C, UX-skript, headers, TLS, OWASP). Mätvärdena står under `## Audits` i CONTEXT.md.

- [x] `[P2]` (rättad 2026-09-16, `thead` fylls av skriptet med hela raden, h3 i popovers; W3C 0 fel live) W3C: `<thead>` med en tom rad (`rubrikrad`) och `<h4>Räkneantaganden` direkt efter h2. Byt till h3 och ge thead riktiga celler eller ta bort raden.
- [x] `[P2]` (rättad 2026-09-16, `--ink-3` #8f8f88 till #6f6f68 i ljust läge; a11y 100 live) Lighthouse: färgkontrast under 4,5:1 (a11y 97).
- [x] `[P3]` (rättad 2026-09-16: 44 px på nav, tema, knappar, flikar, infoknappar, fält och sidfot; kvar två kryssrutor på 13 px där etiketten är ytan. Postel ej körd) UX, Fitts: temaknapparna System, Ljust, Mörkt är 27 px, plus 13 tryckytor under 44 px. Postel: fyra sifferfält ej testade med `--interact`.
- [x] `[P3]` (rättad 2026-09-16, alla tre sidor; SEO 60 kvar av noindex) Meta description saknas (SEO 50 ihop med noindex, som är avsiktlig).

## Granskning 2026-10-06

Fynd från den automatiska sviten (aifabriken `tools/audit-suite.ts`: headers, npm audit, secrets, Actions, markup, axe). Mätvärdena står som `(automated)`-rader under `## Audits` i CONTEXT.md.

- [x] `[P3]` (rättad 2026-10-06: `site/package-lock.json` incheckad, `npm audit` kör och ger 0 sårbarheter, projektet har inga beroenden) npm audit kan inte köras: `site/` saknar `package-lock.json`. Checka in en låsfil.
- [ ] `[P3]` WCAG: bara inloggningsskärmen mäts (axe 0 fel, 6 element med oavgjord kontrast). Sidorna bakom lösenordet kräver ett inloggat tillstånd i svitens inventarie.
