# FI:s fondinnehavsregister som primärkälla

Kontrollerat 2026-09-09.
Källa: [Fondinnehav](https://www.fi.se/sv/vara-register/fondinnehav/) och
[Fondinnehav per kvartal](https://www.fi.se/sv/vara-register/fondinnehav-per-kvartal/),
Finansinspektionen.

Detta är den bästa datakällan vi hittat för den svenska fondsidan: gratis, utan
konto eller nyckel, och innehållet är vad fondbolagen själva rapporterar till
tillsynsmyndigheten. Den är förstahandskälla i en starkare mening än ett
faktablad på en fondsida, eftersom uppgiften är inlämnad under rapporteringsplikt.

## Vad registret är

- Publiceras kvartalsvis med ungefär två månaders fördröjning, från och med
  fjärde kvartalet 2018.
- Omfattar **endast svenska värdepappersfonder**. Specialfonder ingår inte.
  Utländska fonder ingår inte, vilket utesluter DNB Global Indeks S (norsk) och
  samtliga fyra ETF:er i urvalet (irländska).
- Format: en zipfil per kvartal, med en XML-fil per fond, i mappar per fondbolag.
  Filnamnet innehåller inrapporteringens datum och klockslag, vilket gör det
  möjligt att se om en rapport har reviderats.
- Senaste kvartalet vid kontrollen: 2026Q2, publicerat 2026-08-20. Zipfilen är
  6,7 MB och innehåller 726 fonder, 118 MB uppackat.
- Det finns inget API. Nedladdning av zipfilen är hela gränssnittet, och det är
  tillräckligt: en fil per kvartal, fyra gånger om året.

Namnrymden i XML:en är `http://schemas.fi.se/publika/vardepappersfonder/20200331`.

## Vad det ger utöver innehaven

Per fond finns ISIN, fondbolagets LEI-kod, förvaltningsavgift per andelsklass,
fondförmögenhet, likvida medel, aktiv risk, standardavvikelse 24 månader,
jämförelseindex och varje enskilt innehav med ISIN, emittentland, valuta,
antal, kurs, marknadsvärde och andel av fondförmögenheten.

Det innebär att **bredd går att mäta i stället för att citeras**. Antal innehav
och antal emittentländer räknas direkt ur rapporten, i stället för att hämtas ur
fondbolagets egen marknadsföringstext.

## Utfall för urvalet, kvartalsslut 2026-06-30

| Fond | ISIN | Förvaltningsavgift | Innehav | Länder | Std.avv. 24 mån |
| --- | --- | ---: | ---: | ---: | ---: |
| Länsförsäkringar Global Index | SE0005188836 | 0,20 % | 1 168 | 31 | 14,45 |
| Avanza Global | SE0011527613 | 0,08 % | 979 | 29 | 14,12 |
| Storebrand Global All Countries A SEK | SE0000671919 | 0,30 % | 1 748 | 49 | 13,72 |
| Swedbank Robur Access Global A | SE0007074059 | 0,20 % | 826 | 29 | 13,75 |

Fondförmögenhet: Länsförsäkringar 150,3 mdkr, Swedbank Robur 69,9 mdkr,
Avanza Global 55,2 mdkr, Storebrand 55,1 mdkr.

### Vad detta stänger

- **Punkt 1, ISIN.** Klar för alla fyra svenska fonder. DNB Global Indeks S är
  norsk och finns inte i registret; den punkten står kvar.
- **Punkt 3, Storebrands gällande avgift.** Registret redovisar samtliga
  andelsklasser: A EUR, A USD, A SEK, B SEK samtliga 0,30 %, och C USD, C SEK,
  C EUR samtliga 0,15 %. För klass A SEK är alltså gällande avgift densamma som
  fondbestämmelsernas tak, 0,30 %. Att C-klassen kostar hälften är värt att
  utreda separat, eftersom C-klasser normalt har villkor som en privatsparare
  inte uppfyller.
- **Punkt 4, total årlig avgift, delvis.** Registret redovisar förvaltningsavgift,
  inte årlig avgift inklusive transaktionskostnader. Skillnaden mellan de två
  måste fortfarande hämtas ur faktablad.

### Två motsägelser som registret avslöjar

**Länsförsäkringars jämförelseindex.** Registret anger "Morningstar Developed
Markets Top value". Fondbolagets egen fondlista anger "MSCI World ex Select
Securities Climate Action 75% Custom Index". Två förstahandskällor, två olika
index, och det är samma fond och samma ISIN. Detta måste avgöras mot fondens
informationsbroschyr innan indexet publiceras. Tills dess ska raden markeras.

**Bredden matchar inte prisbilden.** Storebrand Global All Countries har 1 748
innehav i 49 länder, med Kina, Indien och Sydkorea bland de fem största
emittentländerna, alltså verkliga tillväxtmarknader. De tre övriga ligger på 29
till 31 länder utan dem. Storebrand är dyrast av de fyra på 0,30 %, och registret
visar att det delvis är betalning för mer marknad. Samma resonemang som för SPYI
mot WEBN bland ETF:erna, nu belagt med innehavsdata i stället för indexnamn.

## Vad det inte kan användas till

- **Aktualitet.** Två månaders fördröjning och kvartalsvis publicering gör att en
  avgiftsändring syns här sent. Registret duger som kontroll och som källa för
  bredd, aldrig som ensam källa för "aktuell avgift" i en tabell som gör anspråk
  på att vara dagsfärsk.
- **ETF:er och utländska fonder.** Ingår inte alls.
- **Köpvägar.** Registret vet ingenting om vad en leverantör tar betalt. Det
  ligger i `kopvagar.md`.

## Hur det körs

`verktyg/fi-fondinnehav.py` hämtar senaste kvartalets zip och skriver ut avgift,
index, innehav och länder per ISIN. Bara standardbiblioteket, ingen nyckel, ingen
kostnad. Det är också den veckovisa kontrollen i praktiken: fyra gånger om året
finns det något nytt att kontrollera.
