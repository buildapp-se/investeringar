---
schemaVersion: 1
status: active
currentGoal: Kontrollera fondavgiften hos SAVR och Montrose per fond, och läs villkoren för courtagefritt månadssparande i ETF hos Avanza och Nordnet.
nextAction: Ta reda på vad fonderna faktiskt kostar hos SAVR och Montrose, som båda betalar tillbaka fondprovisionen. Tills dess räknas deras totaler på listpris och är för höga. Båda kräver inloggning och är Patriks att göra. Kör site/ med node server.mjs, port 4173.
blockers: []
reviewedAt: 2026-09-09
---

# Överlämning

## Läget

Kravbilden i CONTEXT.md står fast och är bekräftad på nytt 2026-09-09: **kostnadsjämförelsen är motorn**, den kurerade listan är ytan. Patrik formulerade det som att sidan ska vara en enkel sammanställning för den som inte orkar plöja fyrtio forumtrådar, med länkar vidare för den som vill läsa hela resonemanget. Frågan ställdes uttryckligen om detta innebar att räkningen skulle bort. Det gjorde det inte. Bygg inte om tjänsten till en ren lista.

Tjänsten ligger i `site/`, tre sidor, och körs med `node server.mjs` på port 4173. Alla tre testfilerna går igenom: `node test-avgifter.mjs` och `node test-belaning.mjs` i `site/`, och `python verktyg/fi-fondinnehav.py --test`.

## Vad som blev gjort 2026-09-09

**Leverantörernas prislistor är lästa** hos Avanza, Nordnet, Montrose och SAVR, var och en mot deras egen prissida. Allt ligger i `docs/research/kopvagar.md` med källa och datum. Fondo är avfört som köpväg: bolaget säljer inte längre till privatpersoner utan levererar fondsparande till andra företag via API, och tar 0,15 % ur slutkundens depå. Det avgör motsägelsen som stod i backloggen, och båda researchdokumentens påståenden om Fondo faller.

**FI:s fondinnehavsregister är den bästa datakällan vi hittat** för den svenska fondsidan. Gratis, ingen nyckel, och uppgifterna är vad fondbolagen själva rapporterar till tillsynsmyndigheten. Den gav ISIN för tre fonder som saknade det, Storebrands gällande avgift per andelsklass, och något ingen svensk jämförelsesajt visar: **bredden uppmätt ur innehaven** i stället för citerad ur fondbolagets egen beskrivning. Storebrand har 1 748 innehav i 49 länder mot Swedbank Robur Access Globals 826 i 29. Se `docs/research/fi-fondinnehav.md`, hämtas med `verktyg/fi-fondinnehav.py`.

**Två fel i tjänsten hittades genom att faktiskt rendera sidan**, inte i testerna. `billigaste()` jämförde inte avgifterna alls, den listade alla köpvägar som inte var null, och utsåg därför fyra vinnare samtidigt varav två var dyrast. Detaljrutans köpvägskort var en attrapp som alltid skrev "Ej verifierat" oavsett data. Båda är rättade. Sidhuvudet tvingade dessutom hela sidan att scrolla i sidled på 390 px skärm; också rättat.

## Nästa steg

1. ~~Köpbarhet per fond och leverantör.~~ Klart för Avanza och Nordnet senare samma dag, se sessionsavsnittet nedan. Kvar: Montrose och SAVR, som inte går att kontrollera utifrån.
2. **Fondens avgift hos SAVR och Montrose per fond.** Båda betalar tillbaka fondprovisionen och tar en egen avgift i stället, så listpriset är inte vad kunden betalar där. Utan detta är totalen i köpvägskorten för hög för dem.
3. **DNB Global Indeks S.** ISIN och handelsvaluta är klara: NO0010827280, handlas i SEK. Kvar är fondbolagets egen aktuella KID, eftersom avgifterna i dag kommer från Avanzas fondlista och inte från faktabladet.
4. **Länsförsäkringars jämförelseindex.** Fondbolagets fondlista och fondbolagets egen rapport till FI anger olika index för samma ISIN. Avgörs mot informationsbroschyren.
5. **ETF-raderna mot emittentens faktablad**, inklusive frågan om WEBN innehåller småbolag.

Övriga öppna punkter står i `BACKLOG.md`. Ingen ny tjänst, kostnad eller hemlighet är godkänd genom denna överlämning. Sidan **är** publicerad, bakom grind och märkt som prototyp, se sessionsavsnittet nedan.

## Val tagna åt Patrik i chunk-läge

- **Ingen vinnare utses utan kontrollerat utbud.** Alternativet hade varit att markera billigaste pris med en brasklapp. Kolumnen heter billigaste *verifierade* köpväg, och CONTEXT.md säger att för tunt underlag ger "utses inte".
- **En ensam säljare märks "Enda köpvägen", inte "Billigast".** Avanza Global säljs bara hos Avanza, och att kalla det billigast vore att lova en jämförelse som inte gjorts.
- **Fondo behålls som rad** med en förklaring i stället för att tas bort tyst, eftersom svenska guider fortfarande pekar dit.
- **Länken till RikaTillsammans ligger både högt och lågt.** En rad i ingressen, och hela källförteckningen i avsnittet "Vill du läsa mer" efter tabellen. Patrik bad om länken högst upp; invändningen var att en utgående länk som första element skickar bort just den besökare som inte orkar läsa. Detta är kompromissen. Säg till om den ska flyttas.
- **Metodavsnittet säger nu rakt ut att deklarerad avgift inte är hela kostnaden.** Källskatt beroende på replikering och skillnaden mellan avgift och faktisk indexavvikelse ingår inte i beräkningen, och kan vara större än avståndet mellan två fonder i tabellen. Alternativet var att tiga om det.

## Session 2 samma dag: publicerat bakom grind, och utbudet kontrollerat

Repot ligger nu på `buildapp-se/investeringar`, publikt, och sidan är live på
**buildapp.se/investeringar** via GitHub Pages. Deploy sker automatiskt vid push
till `master` och kör testerna först.

Sidan ligger bakom en klientsidesgrind och är märkt som prototyp. **Grinden är
ingen säkerhet**: sidan är statisk i ett publikt repo, så innehållet går att läsa
förbi den. Den finns för att en halvfärdig jämförelse av finansiella produkter
inte ska möta någon som tror att uppgifterna är klara. Ordet ligger som SHA-256 i
`site/grind.js`, inte i klartext, och står inte i något dokument. Alla tre sidorna
har `noindex`, eftersom en prototyp inte ska ligga i sökindex när den riktiga
sidan sedan ska ranka.

Utbudet är kontrollerat genom sökning på ISIN i Avanzas och Nordnets egna
fondlistor. Alla fem finns hos Avanza. Hos Nordnet finns fyra, och Avanza Global
saknas, vilket är ett belagt nej. Montrose har ingen publik fondlista och SAVR:s
fulla utbud kräver inloggning, så där står utbudet fortsatt okänt. Tabellen utser
därför vinnare på fyra rader, alla oavgjorda mellan Avanza och Nordnet på noll i
plattformsavgift.

Tre kontrollpunkter föll på köpet: DNB Global Indeks S har ISIN NO0010827280 och
handlas i SEK trots norsk hemvist, total årlig avgift finns nu för alla fem, och
Storebrands gällande avgift var redan klar sedan FI-passet.

**Kvar att göra som är känt fel just nu:** Montrose och SAVR betalar tillbaka
fondprovisionen, så våra totaler för dem är räknade på listpris och är för höga.
Det står utskrivet i köpvägskorten och under tabellen, men en grön markering kan
flytta när de siffrorna kommer in.

Repot ligger på branchen `master`, medan övriga repon i orgen använder `main`.
Bytet blockerades av klassificeraren och är inte gjort.

## Arbetsyta

Arbeta i `C:\dev\investeringar`. Följ global boot i `C:\dev\CLAUDE.md`. `C:\dev` får aldrig bli git-repo. Playwright-MCP fungerar för de JavaScript-renderade fondsidorna; Nordnets cookieruta måste avvisas innan något går att klicka. Ett par heredoc-anrop mot Bash blockerades av klassificeraren, Edit-verktyget fungerade i stället.

## Session 3 samma dag: ETF-sidan belagd och köpvägarna räknade

**ETF-uppgifterna kommer inte längre från justETF.** Alla fyra är kontrollerade
mot emittentens egen dokumentation: Amundis månadsrapport, Vanguards faktablad,
SSGA:s produktsida och iShares faktablad. Den öppna frågan om WEBN är avgjord,
och svaret är nej: indexet heter Solactive GBS Global Markets **Large & Mid Cap**
och rapporten skriver ut att det täcker de största 85 procent av börsvärdet.
Researchunderlagets All Cap-påstående faller, justETF hade rätt. Faktabladen gav
också något justETF inte visar: ingen av de fyra äger hela sitt index. Vanguard
äger 3 782 av 4 264, SPYI 5 999 av omkring 9 000, iShares kallar metoden
optimerad. Bara WEBN replikerar direkt.

**Handelsplatsen är avgjord och den var den samma för alla fyra: Xetra, i euro.**
Ingen handlas i sin egen basvaluta, som är USD för samtliga. Belagt hos både
Avanza och Nordnet genom sökning på ISIN, och bekräftat i emittenternas egna
dokument. Det låser upp courtaget, eftersom minimicourtaget sätts per börs.

**Golvet är hela poängen i ett månadsköp.** 0,25 procent av 2 000 kronor är fem
kronor, men golvet är nio hos Nordnet, elva hos Avanza omräknat från euro och
nitton hos Montrose. Ett köp på 2 000 kr kostar 14 kr hos Nordnet, 16 hos Avanza,
21 hos Montrose och 8 hos SAVR. Vid 100 000 kr slår den rörliga satsen igenom och
Avanza och Nordnet landar båda på 500 kr, alltså oavgjort.

**Brytpunkten ligger nu på ETF-raderna**, mot en fond som pekas ut per rad i
`data.js` och skrivs ut i gränssnittet. Vid månadssparande på 2 000 kr hos
Nordnet: WEBN 5,3 år, VWCE 7,2 år, SPYI 8,5 år, EUNL 27,3 år. Vid ett engångsköp
på 100 000 kr: 2,1, 2,8, 3,4 och 12,6 år.

**Tre fondfrågor stängda på köpet.** Länsförsäkringars index är avgjort mot
informationsbroschyren från 2026-07-01, som ger MSCI World ex Select Securities
Climate Action; uppgiften i rapporten till FI stämmer inte med fondens eget
prospekt. DNB:s avgifter kommer nu från fondbolagets eget faktablad i stället för
Avanzas fondlista, och bekräftar 0,21 %. Avanza Globals OTC-derivat är utredda:
begränsad omfattning, begränsad motpartsrisk, ingen syntetisk konstruktion.

## Val tagna åt Patrik i session 3

- **brytpunkt() räcker inte för raderna, så en andra funktion tillkom.** Den
  gamla behandlar återkommande friktion som en andel av hela kapitalet. Det
  stämmer för en engångsinsättning, men inte för ett månadssparande, där
  friktionen betalas på en insättning som är en krympande andel av portföljen.
  Den hade svarat "brytpunkt saknas" för alltid, även när ETF:en faktiskt går om,
  och det hade blivit ett publicerat felaktigt påstående. `brytpunktScenario()`
  simulerar båda månad för månad i stället. Den gamla funktionen är kvar för
  handräkningsverktyget längre ner på sidan, där den är rätt. Säg till om du
  hellre vill ha bara en av dem.
- **Jämförelsefonden pekas ut per ETF, inte räknas fram.** WEBN, VWCE och SPYI
  jämförs mot Storebrand Global All Countries, den enda fonden i urvalet med
  tillväxtmarknader. EUNL jämförs mot Swedbank Robur Access Global, som följer
  samma index. Alternativet var att automatiskt välja billigaste fond, vilket
  hade jämfört olika marknader med varandra.
- **Avanzas courtagegolv i euro räknas om med Riksbankens dagskurs**, 11,1520 per
  2026-09-08. Det är ett räkneantagande med källa och datum, inte en egenskap hos
  produkten, och det står utskrivet i informationsrutan. Utan omräkning går golven
  inte att jämföra alls.
- **Beräkningen använder automatisk växling, inte manuell.** Manuell är billigare
  hos både Avanza och Nordnet men kräver att du växlar själv i förväg. Sidan
  räknar på vad som händer om du bara lägger en order, och nämner den manuella
  vägen i texten.
- **SAVR:s pris visas trots okänt utbud.** De är billigast på papperet, 8 kr mot
  Nordnets 14, men eftersom det inte går att belägga att de säljer ETF:erna kan de
  inte utses till billigaste köpväg. Samma regel som på fondsidan.

## Känt fel eller ofullständigt just nu

- Montrose och SAVR betalar tillbaka fondprovisionen, så fondtotalerna för dem är
  räknade på listpris och är för höga. Oförändrat sedan session 2.
- Courtagefritt månadssparande är inte kontrollerat hos vare sig Avanza eller
  Nordnet. Om det finns och courtaget faller bort flyttar brytpunkterna ovan
  påtagligt, eftersom courtaget är största posten i ett litet köp. Ligger i
  BACKLOG.md.
- ETF-tabellen är 823 px bred och kräver behållarscroll på mobil. Samma sak som
  fondtabellen, men värre.
- Storebrands och Swedbank Roburs totala årliga avgift kommer fortfarande från
  Avanzas fondlista, alltså distributören, inte fondbolagets faktablad.

## Arbetsmetod som fungerade, session 3

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
