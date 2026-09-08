# Backlog

## Inkorg

Lägg nya forumtrådar, fondnamn, ETF:er och korta kommentarer här. Fynd bearbetas via AI i projektet innan de tas med i den publika jämförelsen.

## P1 · Före publicering

- [ ] **[P1] Faktakontrollera Antigravitys researchunderlag.** Gå igenom dokumenten i [researchöversikten](docs/research/README.md) före användning i tabeller, kalkyler eller rekommendationer. Kontrollera produktnamn, ISIN, andelsklass, index, exponering, köpbarhet, avgifter, plattformsvillkor och belåningsregler mot aktuella förstahandskällor. Granska även skattepåståenden, beräkningar och påstådd forumkonsensus. Ersätt obelagda formuleringar om exempelvis ”billigast”, ”överlägsen” och säker belåning med styrkta, avgränsade slutsatser. Godkänt när uppgifterna har precisa källor och kontrolldatum och kvarvarande osäkerheter är markerade; ofullständigt underlag får inte utse billigaste alternativet.
- [ ] **[P1] Kontrollera Fondos prismodell mot deras egen prislista.** Researchunderlaget motsäger sig självt om samma köpväg: `rikatillsammans-indexfonder-och-etfer.md` anger DNB Global Indeks S till 0,11 % via Fondo, medan `lagsta-avgifter-och-kostnadsoptimering.md` anger 0,11 % fondavgift plus 0,15 % plattformsavgift, alltså cirka 0,26 % totalt och dyrare än 0,22 % hos vanlig mäklare. Avgör mot Fondos egen prislista om plattformsavgiften ligger ovanpå eller ersätter. Kontrollera samtidigt att tabellen har separata fält för fondavgift och plattformsavgift, eftersom ett enda totaltal döljer just den här skillnaden. Kontrollera även den ogiltiga ISIN-uppgiften `IE00034YBzg4` för AVWS mot Avantis prospekt.
- [ ] **[P1] Slutför materiella öppna beslut och få samlad kravbekräftelse.** Återuppta enligt HANDOFF.md, utan att fråga om beslut som redan finns i CONTEXT.md.
- [ ] **[P1] Verifiera datakällor och gratis drift.** Kontrollera utbud, prislistor, användningsvillkor/API och möjlighet till veckovis ändringskontroll för valda leverantörer. Ingen betaldata eller extra AI-kostnad utan separat beslut.
- [ ] **[P1] Granska forskningskällornas fulltext inför publicering.** Knyt varje faktiskt forskningspåstående till relevant originalartikel och begränsningar.
- [ ] **[P1] Ta fram två Claude Design-förslag.** Verifiera tillgång, skriv konkret brief enligt CONTEXT.md och låt Patrik välja innan implementation.
- [ ] **[P1] Implementera och verifiera tjänsten efter samlad bekräftelse.** Tabell, scenarier, kostnadsberäkning, belåningsjämförelse, informationsrutor, delning, lokala val och tillgänglighet enligt CONTEXT.md. Meningsfulla beräkningstester och verklig mobil-/desktopkontroll krävs.
- [ ] **[P1] Utred affiliateprogram samt reklam- och informationskrav.** Verifiera LYSA/Opti och övriga relevanta partners, redaktionella kopplingar, friskrivning och integritetstext mot aktuella förstahandskällor.
- [ ] **[P1] Konfigurera och verifiera kontaktadressen.** Mål och mottagare finns i CONTEXT.md. Granska befintlig mejlhantering innan DNS ändras; vidarebefordran är ännu inte verifierad för buildapp.se.
- [ ] **[P1] Sätt upp godkännandeflödet i GitHub.** Samlade pull requests med källor, kontroller och granskningsmejl, publicering efter Patriks Merge. Verifiera flödet i den faktiska repo-/hostingmiljön.
- [ ] **[P1] Publiceringsförberedelser och mätning.** Välj verifierat kostnadsfri hosting som stöder beslutad URL, ordna Search Console och Cloudflare Web Analytics samt teknisk SEO för jämförelser och guider. Publicering är inte utförd.

## P2 · Senare utbyggnad

- [ ] **[P2] Engelsk version** på `/en/investments/`. Separat beslut krävs för andra länders sparförutsättningar.
- [ ] **[P2] Besökarkonton och egna sparade samlingar.** Första versionen använder redaktionellt urval och lokalt sparade inställningar utan konto.
- [ ] **[P2] Golden Butterfly och liknande portföljmodeller.** Fokus på innehåll, kostnader och forskningsunderlag.

## P3 · Senare innehåll

- [ ] **[P3] Löpande blogg.** Första versionen prioriterar jämförelsetjänsten och forskningsguiderna.
