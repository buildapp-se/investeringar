---
schemaVersion: 1
status: active
currentGoal: Kontrollera köpbarhet per fond och leverantör, så att den gröna markeringen kan börja utses, och avgör de kvarvarande faktafrågorna om DNB, WEBN och ETF-raderna.
nextAction: Kontrollera vilka av fonderna som faktiskt finns i utbudet hos Avanza, Nordnet, Montrose och SAVR, och sätt tillganglig i site/data.js. Priserna är redan lästa. Kör site/ med node server.mjs.
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

1. **Köpbarhet per fond och leverantör.** Detta blockerar allt annat i tabellen. Priserna är kända, men `tillganglig` står null nästan överallt, och tjänsten utser medvetet ingen billigaste köpväg förrän det är belagt att fonden går att köpa där. Ett pris hos någon som inte säljer fonden är inget erbjudande. Avanzas och Nordnets fondsidor renderas med JavaScript och kräver styrd webbläsare.
2. **Fondens avgift hos SAVR och Montrose per fond.** Båda betalar tillbaka fondprovisionen och tar en egen avgift i stället, så listpriset är inte vad kunden betalar där. Utan detta är totalen i köpvägskorten för hög för dem.
3. **DNB Global Indeks S.** ISIN, aktuell KID och framför allt handelsvaluta. Handlas den i NOK kostar den 0,25 % i automatisk valutaväxling per riktning hos Avanza, som inte tillåter manuell växling på fonder. Det är större än hela avgiftsskillnaden mot konkurrenterna.
4. **Länsförsäkringars jämförelseindex.** Fondbolagets fondlista och fondbolagets egen rapport till FI anger olika index för samma ISIN. Avgörs mot informationsbroschyren.
5. **ETF-raderna mot emittentens faktablad**, inklusive frågan om WEBN innehåller småbolag.

Övriga öppna punkter står i `BACKLOG.md`. Ingen ny tjänst, kostnad, hemlighet eller extern publicering är godkänd genom denna överlämning. Ingen hosting är vald och ingenting är publicerat.

## Val tagna åt Patrik i chunk-läge

- **Ingen vinnare utses utan kontrollerat utbud.** Alternativet hade varit att markera billigaste pris med en brasklapp. Kolumnen heter billigaste *verifierade* köpväg, och CONTEXT.md säger att för tunt underlag ger "utses inte".
- **En ensam säljare märks "Enda köpvägen", inte "Billigast".** Avanza Global säljs bara hos Avanza, och att kalla det billigast vore att lova en jämförelse som inte gjorts.
- **Fondo behålls som rad** med en förklaring i stället för att tas bort tyst, eftersom svenska guider fortfarande pekar dit.
- **Länken till RikaTillsammans ligger både högt och lågt.** En rad i ingressen, och hela källförteckningen i avsnittet "Vill du läsa mer" efter tabellen. Patrik bad om länken högst upp; invändningen var att en utgående länk som första element skickar bort just den besökare som inte orkar läsa. Detta är kompromissen. Säg till om den ska flyttas.
- **Metodavsnittet säger nu rakt ut att deklarerad avgift inte är hela kostnaden.** Källskatt beroende på replikering och skillnaden mellan avgift och faktisk indexavvikelse ingår inte i beräkningen, och kan vara större än avståndet mellan två fonder i tabellen. Alternativet var att tiga om det.

## Arbetsyta

Arbeta i `C:\dev\investeringar`. Följ global boot i `C:\dev\CLAUDE.md`. `C:\dev` får aldrig bli git-repo. Playwright-MCP fungerar för de JavaScript-renderade fondsidorna; Nordnets cookieruta måste avvisas innan något går att klicka. Ett par heredoc-anrop mot Bash blockerades av klassificeraren, Edit-verktyget fungerade i stället.
