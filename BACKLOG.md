# Backlog

## Inkorg

Lägg nya forumtrådar, fondnamn, ETF:er och korta kommentarer här. Fynd bearbetas via AI i projektet innan de tas med i den publika jämförelsen.

## P1 · Före publicering

- [ ] **[P1] Faktakontrollera Antigravitys researchunderlag.** Gå igenom dokumenten i [researchöversikten](docs/research/README.md) före användning i tabeller, kalkyler eller rekommendationer. Kontrollera produktnamn, ISIN, andelsklass, index, exponering, köpbarhet, avgifter, plattformsvillkor och belåningsregler mot aktuella förstahandskällor. Granska även skattepåståenden, beräkningar och påstådd forumkonsensus. Ersätt obelagda formuleringar om exempelvis ”billigast”, ”överlägsen” och säker belåning med styrkta, avgränsade slutsatser. Godkänt när uppgifterna har precisa källor och kontrolldatum och kvarvarande osäkerheter är markerade; ofullständigt underlag får inte utse billigaste alternativet. Delvis klart 2026-11-24: `lagsta-avgifter-och-kostnadsoptimering.md` har en faktakontrolltabell överst (14 påståenden mot faktablad, Amundis och Avanzas API:er och lagtext; bland felen Avanza Zeros index, Amundi Prime Globals gamla ISIN, Avanza Global 0,09 i stället för 0,10 %, fel lagreferens för 871(m) och Invescos meravkastning som är 0,31–0,67 procentenheter, inte 0,15–0,25). Kvar: de fyra andra Gemini-dokumenten (RikaTillsammans, Bogleheads, belåning, jämförelsetjänster).
- [x] **[P1] Slutför verifieringen av kandidaterna.** Klart 2026-10-06: total årlig avgift och replikering för Avanza Global, Swedbank Robur Access Global och Storebrand Global All Countries är lästa i fondbolagens egna faktablad, och siffrorna på sajten (0,10 %, 0,24 %, 0,32 %) stämmer. Se punkt 4 och 11 sist i [kandidater-verifierade.md](docs/research/kandidater-verifierade.md). Det enda som återstod, fondavgiften hos SAVR och Montrose per fond, är en egen punkt nedan.
- [x] **[P1] Kontrollera köpbarhet per fond och leverantör.** Klart för Avanza och Nordnet 2026-09-09 genom sökning på ISIN i deras egna fondlistor: alla fem finns hos Avanza, fyra hos Nordnet, och Avanza Global saknas där, vilket är ett belagt nej. Montrose har ingen publik fondlista och SAVR:s fulla utbud kräver inloggning, så de står kvar som okända och kan därför inte vinna en jämförelse. Se [kopvagar.md](docs/research/kopvagar.md).
- [ ] **[P1] Ta reda på vad fonderna kostar hos SAVR och Montrose.** Utloggat går det inte (kontrollerat 2026-09-24, se [avgifter-plattformar-robotar.md](docs/research/avgifter-plattformar-robotar.md)). Sajten visar "högst X %" tills någon läser dem inloggad. Patriks att göra.
- [x] **[P1] Kontrollera Fondos prismodell mot deras egen prislista.** Klart 2026-09-09, och svaret var ett annat än frågan väntade sig: Fondo säljer inte längre till privatpersoner. Bolaget levererar fondsparande till andra företag via API och tar 0,15 % årlig avgift ur slutkundens depå, alltså ovanpå fondavgiften. Båda researchdokumentens påståenden faller. Fondo står kvar som rad i tabellen med förklaring, eftersom svenska guider fortfarande listar den. Se [kopvagar.md](docs/research/kopvagar.md). Tabellen har separata fält för fondavgift och plattformsavgift, vilket var den andra halvan av punkten.
- [x] **[P1] AVWS ISIN.** Klart 2026-09-24: rätt är `IE0003R87OG3` enligt Avantis faktablad, rättat i bogleheads-dokumentet. Se [etf-kandidater.md](docs/research/etf-kandidater.md).
- [ ] **[P1] Verifiera datakällor och gratis drift.** Delvis klart 2026-09-09: FI:s fondinnehavsregister är kontrollerat och fungerar som gratis primärkälla för de svenska fonderna, hämtas med `verktyg/fi-fondinnehav.py`, se [fi-fondinnehav.md](docs/research/fi-fondinnehav.md). Det finns inget API, men en zip per kvartal räcker eftersom det bara publiceras fyra gånger om året. Kvar: motsvarande källa för ETF:erna och för leverantörernas priser, som i dag bara går att läsa manuellt, samt användningsvillkor. Ingen betaldata eller extra AI-kostnad utan separat beslut. Delvis klart 2026-11-24: fullständiga innehavsfiler utan inloggning finns för 8 av 17 ETF:er (Amundi JSON-API, State Street och DWS xlsx), testade med curl; iShares, Vanguard, Invesco och Avantis gav ingen fil. Se avsnittet Data sources i [etf-kandidater.md](docs/research/etf-kandidater.md). Kvar: användningsvillkoren och plattformarnas priser, som saknar maskinläsbar källa.
- [ ] **[P1] Granska forskningskällornas fulltext inför publicering.** Knyt varje faktiskt forskningspåstående till relevant originalartikel och begränsningar. Delvis klart 2026-11-24: alla 13 källor på forskningssidan har fynd och begränsning i [forskningslankar.md](docs/research/forskningslankar.md), avsnittet Fulltextgranskning; 8 i fulltext, 5 bara som abstract (7, 9, 11, 15, 16, förlagen spärrar). Ett fel rättat i underlaget (SPIVA-siffran om nedlagda fonder kom från Nya Zeeland). Rubrik 10 (tajming) och 12 (vinnarfonder) är starkare än källorna, Patriks beslut.
- [x] **[P1] Ta fram designförslag och välj riktning.** Klart 2026-09-08: sex riktningar från Claude Design och fem Stitch-förslag. Vald grund är Stitch Förslag E som ytskikt på riktning 07:s produktlogik, byggd som körbar prototyp i `design/prototyp/`.
- [ ] **[P1] Slutför materiella öppna beslut och få samlad kravbekräftelse.**
- [ ] **[P1] Implementera och verifiera tjänsten efter samlad bekräftelse.** Tabell, scenarier, kostnadsberäkning, belåningsjämförelse, informationsrutor, delning, lokala val och tillgänglighet enligt CONTEXT.md. Meningsfulla beräkningstester och verklig mobil-/desktopkontroll krävs.
- [ ] **[P1] Utred affiliateprogram samt reklam- och informationskrav.** Verifiera LYSA/Opti och övriga relevanta partners, redaktionella kopplingar, friskrivning och integritetstext mot aktuella förstahandskällor.
- [ ] **[P1] Konfigurera och verifiera kontaktadressen.** Mål och mottagare finns i CONTEXT.md. Granska befintlig mejlhantering innan DNS ändras; vidarebefordran är ännu inte verifierad för buildapp.se. `[needs-info]` 2026-11-18: DNS stämmer (MX route1-3.mx.cloudflare.net, SPF `include:_spf.mx.cloudflare.net`, läst med nslookup mot 1.1.1.1). Kvar: ett provmejl till kontakt@buildapp.se som Patrik ser landa i sin inkorg; regelns status gick inte att läsa, zonen syns inte för Cloudflare-kopplingen i sessionen.
- [ ] **[P1] Sätt upp godkännandeflödet i GitHub.** Samlade pull requests med källor, kontroller och granskningsmejl, publicering efter Patriks Merge. Verifiera flödet i den faktiska repo-/hostingmiljön.
- [ ] **[P1] Publiceringsförberedelser och mätning.** Hosting är vald och verifierad 2026-09-09: GitHub Pages från `buildapp-se/investeringar`, live på buildapp.se/investeringar, deploy vid push till `master` efter att testerna gått igenom. Sidan ligger bakom en klientsidesgrind, är märkt som prototyp och har `noindex` på alla tre sidorna. Kvar: ta bort grinden och `noindex` när uppgifterna är klara, och först därefter Search Console, Cloudflare Web Analytics och teknisk SEO. Att indexera en prototyp skadar den riktiga lanseringen.

- [x] **[P2] Kontrollera Opti och Avanza Auto.** Klart 2026-10-06. Avanza Auto: aktieexponering per fond läst i faktabladen (normalt 20, 40, 60, 80 och 100 % för Auto 1–5, Auto 6 85–120 %) och införd på sajten. Opti: 0,50 % är inklusive moms enligt opti.se/portfolj. Optis aktieandel per nivå 1–9 står inte på någon publik sida, bara i appen, så sajten visar fortsatt "Nivå 1–9 eller 100 %". Se [avgifter-plattformar-robotar.md](docs/research/avgifter-plattformar-robotar.md).
- [x] **[P3] Länderantal för FTSE- och Solactive-ETF:erna.** Klart 2026-10-06 för åtta av tio: VGLA, VWCE, FWIA (49), SPYI (47), VFEA, IS3N (24), IUSN (23), ZPRX (15), antal länder i indexet enligt FTSE Russells och MSCI:s egna faktablad. VFEA:s 24 är härledd, se [etf-kandidater.md](docs/research/etf-kandidater.md).
- [ ] **[P3] Länderantal för WEBN och AVWS.** Solactives faktablad visar länderna bara som diagram och Avantis bara de fem största. Kräver fondens fullständiga innehavslista. Visas som "–" på sajten. WEBN klart 2026-11-24: 46 länder i fondens innehav per 2026-11-20 (Amundis API), och VFEA rättad från 24 till 23 (Grekland flyttat till FTSE Developed); båda väntar i PR #4 (grenen `sweep/2026-11-24-lander`) eftersom sajtens siffror går via Patriks Merge. Kvar: AVWS, ingen innehavsfil hittad.

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

## Granskning 2026-11-24

Djuppass: mutationstest, UX-granskning (`ux-audit`, lokalt förbi grinden) och deployflödet.

- [x] `[P2]` (rättad 2026-11-24, `f65f42c`: sluten form i `rantaPaRanta`, `kronor()` kastar på Infinity och NaN, test först) Räknaren låste fliken: en loop per månad tog 330 ms vid 10 000 000 år och 3 s vid 100 000 000, för varje tangent, och visade "Infinity kr". Nu 1–3 ms och "–". Belåningsfältet på `etf-belaning.html` räknar med 0 kr vid "1e400" i stället för att kasta.
- [x] `[P2]` (rättad 2026-11-24, `85358bc`: deploy i eget jobb som i GitHubs mall, `upload-pages-artifact@v4`) Deploy föll i 3 av 4 körningar 2026-11-24 med "No artifacts named github-pages".
- [ ] `[P3]` UX, `index.html`, `etf-belaning.html`, `forskning.html` på 390 px: headerns navigering är en scrollrad med dold scrollbar, så "Forskning" och temaknapparna ligger utanför skärmen utan tecken på att det finns mer. Forskningssidan nås också via rutan "Forskningen" på startsidan. Smak: radbrytning, fade i kanten eller kortare etiketter. Patriks beslut.

## OWASP review, 2026-11-24

Gemini 4 Neon High, kodgranskning; varje fynd prövat av Claude mot `origin/master`. Sju fynd: ett rättat (`server.mjs` lyssnade på alla gränssnitt, nu 127.0.0.1), ett kvar nedan, fem avvisade (räknarloopen redan rättad i `f65f42c`; grinden är medvetet klientsidig; Google Fonts utan SRI och Actions på majortaggar litar bara på Google och GitHub, som redan serverar sidan; FI-skriptet hämtar bara från fi.se över https och körs lokalt).

- [ ] `[P3]` CSP saknas i repot och zonens CSP på buildapp.se saknar `script-src` (var medium 2026-10-30, nu låg: ingen osäker data når `innerHTML`, allt kommer från `data.js`). En strikt `script-src 'self'` kräver att de tre inline-modulerna flyttas till egna filer och att `style`-attributen blir klasser. Regeln på zonen delas av alla appar på buildapp.se, så valet mellan meta-CSP i sidorna och en sökvägsregel på zonen är Patriks.

## Funktionspass 2026-11-24

- [x] `[P1]` (klart 2026-11-24, `35bdb55`; del av "delning, lokala val" i implementationspunkten) Delbar länk: startsidans scenario står i adressen och `etf-belaning.html` minns kapitalet (`?kapital=`, localStorage). Länk går före sparat, som går före standard; trasiga värden (`?ar=abc`, `1e400`) faller tillbaka. Test i `test-avgifter.mjs`, kontrollerat i Chrome lokalt: länken `?manad=5000&ar=20&sats=6.5` gav 2 410 748 kr, samma som `rantaPaRanta` i node.
- [x] `[P2]` (rättad 2026-11-24, `9c7eef2`) Tomt procentfält räknade med 0 % och visade "Ränta på ränta ger 0 kr"; tomt år gav "Du har efter 0 år". Nu "–" i alla rutor, och ett ofullständigt scenario sparas inte. Kontrollerat i Chrome lokalt.

## Buggjakt 2026-11-24

Playwright headless mot `node server.mjs` lokalt, 390 och 1440 px, sv-SE: alla fält med tomt, decimalkomma, noll, negativt, mycket stort och `1e400`, omladdning, bakåt, tangentbord, grinden med fel ord.

- [x] `[P2]` (rättad 2026-11-24, `f7cd683`) Startsidan visade "Du har efter 2.5 år" med punkt, och "efter -3 år" eller "efter 0 år" bredvid streck. Nu "2,5" och "–". Kontrollerat i Chromium lokalt.
- [x] `[P2]` (rättad 2026-11-24, `f7cd683`) Belåningssidan räknade tomt eller negativt kapital som 0 kr, sparade 0, och en omladdning visade "0" i fältet. Nu "–" i lån och ränta, och bara giltigt kapital sparas, som på startsidan. Kontrollerat i Chromium lokalt.

## Buggjakt 2, 2026-11-24

Natten mot 2026-11-25. Alla 53 externa länkar i `site/` hämtade med curl (GET, följer omdirigeringar), sidorna i headless Chromium vid 390 och 1440 px: titlar, trasiga bilder, konsolfel, döda ankarlänkar, punkt som decimaltecken, sidled-scroll, tema och värden kvar efter navigering och bakåt, Google Fonts blockerade.

- [x] `[P2]` (rättad 2026-11-25) IUSQ:s faktabladslänk på `etf-belaning.html` gick till BlackRocks felsida: fonden heter nu iShares MSCI All Country World och PDF:en har ny adress. Ny länk ger PDF med samma ISIN. Siffrorna på raden är inte omlästa.
- [x] `[P3]` (rättad 2026-11-25) En felskriven adress under `/investeringar/` gav GitHubs engelska "Page not found". Nu `site/404.html` på svenska med länk till startsidan.
- [ ] `[P3]` Inte kontrollerbara utifrån: SPIVA-länkarna (spglobal.com svarar 403 på hela sajten mot både curl och headless Chromium i natt), OUP-DOI:n och Bogleheads (Cloudflare-kontroll). Svepet 2026-11-24 läste spglobal-sidorna via headless Chrome enligt HANDOFF; i natt inte testat.

## Fartpass 2026-11-25

Live på buildapp.se/investeringar, headless Chromium (Playwright 1.64), förbi grinden: 390 px med 4x CPU och Slow 4G (150 ms, 1,6 Mbit/s ned), 1440 px utan strypning. axe-core 4.14 på alla tre sidor i båda bredderna och på grinden: 0 överträdelser före och efter. Metadata: unik titel och beskrivning, `lang="sv"`, og-bild och favicon på alla tre sidor; ingen canonical (sajten har ingen och är `noindex`) och inget manifest (ingen PWA). Inga `<img>` på sidorna.

- [x] `[P2]` (rättad 2026-11-25, `b3963cb`) `etf-belaning.html` hoppade när sidan laddades: sidan ritades innan skriptet fyllt ETF-tabellen, så allt under den knuffades ned. CLS 0,60 till 0,66 vid 1440 px och 0,56 vid 390 px utan strypning, även efter `modulepreload`; nu 0,0077 och 0,0062 (tre och två körningar). Skriptet ligger i head med `blocking="render"` på alla tre sidor, så sparat tema och grinden finns också från första ritningen. Pris: LCP på `etf-belaning.html` vid 390 px med strypning 0,74 s före (en körning), 0,92 till 0,94 s efter (tre körningar); vid 1440 px oförändrat runt 0,2 s.
- [x] `[P2]` (rättad 2026-11-25, `b69673b`) Newsreader laddades med vikterna 300 till 600 på alla sidor, en fil på 132 KB, men startsidan och forskningssidan använder bara 400. Där nu bara 400: 57 KB. Överföring live 194 → 118 KB på startsidan och 184 → 109 KB på forskningssidan; samma typsnitt och vikter renderas (kontrollerat per textnod före och efter). `etf-belaning.html` behåller 600 för de fetstilta tickerna. Manrope 500, som ingen text använder, borttagen ur adressen. `modulepreload` för modulerna i head.
- [ ] `[P3]` Newsreader utan optisk storlek (`opsz`) med vikterna 400 och 600 är 58 KB i stället för 132 KB på `etf-belaning.html` (sedan 2026-11-25 två egna filer, 400 och 600, 57 + 61 KB), men rubrikerna ritas då med brödtextens glyfer. Smak, Patriks beslut.
- [x] `[P3]` (rättad 2026-11-25, `3481626`: typsnitten i `stil.css`, `.knapp` med `font: inherit`; live laddar 404-sidan Manrope och Newsreader 400, grindknappen är Manrope) 404-sidan laddar inte Google Fonts och visas i Times New Roman, och grindens knapp `.knapp` ärver inte typsnittet och visas i Arial. Utseende, inte rättat i fartpasset.
- [ ] `[P3]` Cachehuvuden går inte att styra härifrån: GitHub Pages ger `max-age=600` på html och `max-age=14400` på moduler och stilmall, inget `immutable` trots `?v=<sha>`. Cloudflare lägger dessutom in `email-decode.min.js` (e-postskyddet på zonen) och analysbeaconen (10 KB). Zoninställningar som delas med andra appar på buildapp.se.

## Scenariojakt 2026-11-25

Headless Playwright mot `node server.mjs` lokalt, skripten i `%TEMP%\aifabriken-lanes\scen-investeringar\`: samma flöde i Chromium, Firefox och WebKit med breddbyte mitt i (decimalkomma tas emot i alla tre), en vecka i en webbläsare (spara, gå mellan sidorna, ångra, tomt fält, omladdning, kompisens länk), två flikar, gårdagens sparade värden i gamla format, grinden som går ut mellan två sidor, 500 extra fonder och ETF:er (FCP under 0,31 s, CLS under 0,011, ingen sidled-scroll), länk ut och in igen på båda sidorna.

- [x] `[P3]` (rättad 2026-11-25, `80625bb`, test först i `test-avgifter.mjs`) `kronor()` skrev belopp från 1e21 som "1.0 000 000 000 000 007e+21 kr", till exempel vid 700 år. Nu alla siffror. Live: 700 år ger "131 751 646 701 092 723 708 919 808 kr".
- [x] `[P3]` (rättad 2026-11-25, `80625bb`) Belåningssidans länk satte ihop `?kapital=` för hand, så "1e+21" lästes som "1e 21" och länken öppnade med 500 000. Nu `URLSearchParams` som på startsidan. Live: `?kapital=1e%2B21` ger fältet 1e+21.
- [x] `[P3]` (klart 2026-11-25, `3481626` och `f424ead`) Typsnitten ligger i `site/fonter/` (Googles egna woff2, latin och latin-ext, OFL bredvid) i stället för hos Google Fonts. Ingen CSP-ändring behövdes: zonens CSP är bara `frame-ancestors`, `base-uri` och `object-src`. Samma bredd på alla 64 uppmätta textelement före och efter. Live, 390 px med 4x CPU och Slow 4G, LCP före (två körningar) och efter (tre): startsidan 1,00 och 1,02 → 0,89 till 1,03 s, `etf-belaning.html` 1,20 och 1,35 → 0,93 till 0,99 s, forskning 0,66 och 0,73 → 0,68 till 0,71 s; 1440 px brusigt runt 0,2 s. Två färre anrop, en render-blockerande resurs i stället för två, `etf-belaning.html` 193 → 180 KB. `preload` av typsnitten prövades först och gjorde 390 px sämre (startsidan 1,15 och 1,18 s), så den togs bort.
- [ ] `[P3]` Öppnar man någon annans delade länk skriver den över ens eget sparade scenario, så startsidan via menyn visar kompisens siffror efteråt. Två flikar skriver också hela scenariot, så den senaste fliken vinner även för fält den inte rört. Följer av "länk går före sparat" från 2026-11-24; att låta en länk visa utan att spara är ett produktval. Patriks beslut.
- [ ] `[P3]` Ett okänt sparat tema (t.ex. "dark") ger systemtema men ingen knapp markerad. Ingen annan app på buildapp.se skriver nyckeln `tema` (kontrollerat i `buildapp-se.github.io`), så det går inte att nå i dag. Inte rättat.

## P3-funktionspass 2026-11-25

Alla öppna P3-punkter och opriorterade fynd genomgångna; ingen är en användarsynlig funktion som går att bygga utan Patrik. Smak eller produktval som redan står som Patriks: headerns scrollrad på 390 px, CSP-valet, Newsreader utan `opsz`, delad länk som skriver över sparat scenario. Research eller data via Patriks Merge: AVWS-länder (WEBN och VFEA i PR #4, fortfarande öppen), blogg. Utanför repot: cachehuvuden och e-postskyddet (zonen), WCAG bakom grinden (aifabrikens svit), SPIVA/OUP/Bogleheads-länkarna (403 och Cloudflare-kontroll). Okänt sparat tema (`gemensamt.js` rad 14) går inte att nå i dag, så ingen användare märker en rättning. Ingen kod ändrad.

## Webbläsarpass 2026-11-25

Headless Playwright 1.64.1 (`playwright-core` i aifabriken; Chromium 1248, Firefox 1555, WebKit 2370), skripten i `%TEMP%\aifabriken-lanes\xb-investeringar\`. Samma flöden i Chromium 1440 px, Firefox 1440 px och WebKit (Playwright) med iPhone 13-profilen (390 px, touch, mobil UA), sv-SE: alla fyra sidor, räknaren med decimalkomma inskrivet ("6,5", "2,5"), belåningsfältet, 150 snabba inmatningar per fält, omladdning, tema, ankarlänk under sticky header, grinden med fel ord, en modul som inte laddas, och när första ritningen sker jämfört med när skriptet kört (lokalt och live, med och utan 1,5 s fördröjd `data.js`). WebKit på Windows är inte en riktig iPhone; iOS är inte provat.

- [x] `[P2]` (rättad 2026-11-25, `f20957d`, test i `test-avgifter.mjs`) WebKit kastar efter 100 `history.replaceState` på 10 s. 150 snabba inmatningar (en hållen piltangent) gav 63 SecurityError, och rutorna visade 35 410 kr för ett fält som stod på 1150 i stället för 37 462 kr. Adressen skrivs nu när inmatningen stannat (`skrivAdress` i `gemensamt.js`); 0 fel och rätt belopp i alla tre motorer, båda sidorna.
- [x] `[P2]` (rättad 2026-11-25, `c295e69`) Räknarfälten var 12,58 px och lösenordsfältet 15,5 px vid 390 px. Safari på iPhone zoomar in sidan när ett fält under 16 px får fokus (känt iOS-beteende, inte reproducerbart i Playwright). Nu minst 16 px; på datorbredd oförändrat (16,28 px). Kontrollerat: computed 16 px i WebKit (Playwright), ingen sidled-scroll vid 390 px. Inte provat på en riktig iPhone.
- [x] `[P3]` (rättad 2026-11-25, `2357c0e`) Firefox stöder inte `blocking="render"` (WebKit och Chromium gör det). Live ritade Firefox `etf-belaning.html` vid 54 ms och fyllde tabellerna vid 94 ms, och med grinden syntes sidan 40–55 ms innan grinden kom. Med `data.js` fördröjd 1,5 s lokalt syntes sidan bakom grinden i 1,5 s. Nu döljs sidan i webbläsare utan `blocking` tills `startaGrind()` kört, högst 3 s om en modul inte laddas (då syns sidan med streck efter 3 s). Lokalt i Firefox: första ritningen efter tabellerna och grinden i alla fall, grindfältet får fokus.
- Utan skillnad mellan motorerna: decimalkomma tas emot och räknas lika, "2,5 år" med komma, sparat scenario efter omladdning, sticky header, ankare 90 px under headern, mörkt tema, `crypto.subtle` i grinden, `inert`, `color-mix` och `backdrop-filter`, ingen sidled-scroll. Sidorna använder inte `:has`, containerfrågor, `dvh`, `subgrid`, `Date`-tolkning, lookbehind, `structuredClone`, urklipp, delning, service worker eller IndexedDB.
- [ ] `[P3]` Inte provbart utan riktig iPhone: vilket tangentbord `type="number"` utan `inputmode` ger, och om decimalkomma tas emot där. WebKit på Windows visar pilknappar i fälten som iPhone inte har.
