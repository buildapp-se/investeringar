---
schemaVersion: 1
status: active
currentGoal: Kontrollera fondavgiften hos SAVR och Montrose per fond, och avgör de kvarvarande ETF-frågorna mot emittentens faktablad.
nextAction: Ta reda på vad fonderna faktiskt kostar hos SAVR och Montrose, som båda betalar tillbaka fondprovisionen. Tills dess räknas deras totaler på listpris och är för höga. Kör site/ med node server.mjs, port 4173.
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
