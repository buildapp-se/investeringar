# Kandidater med källa och kontrolldatum

Kontrollerat 2026-09-08 av Brain, på uppdrag av Patrik.

Det här dokumentet är **inte** samma sorts material som de fem breda sammanställningarna i mappen. De är obekräftat AI-underlag. Här har varje uppgift en namngiven källa och ett kontrolldatum, och det som inte gick att belägga står som obelagt i stället för att fyllas i.

Ingenting här är ännu godkänt för publicering. Faktabladen (KID) för respektive andelsklass återstår att läsa för flera rader.

## Källhierarki som använts

1. **Fondbolagets eget dokument** (informationsbroschyr, fondbestämmelser, KID). Starkast.
2. **Fondbolagets egen fondlista** med datumstämpel.
3. **justETF**, för UCITS-ETF:er. Sekundär men datumstämplad och konsekvent.
4. **Placera** och **Börskollen** som referat av Avanzas och Nordnets egen statistik. Sekundära, används bara för popularitet, aldrig för avgifter.

Avanzas och Nordnets egna fondsidor renderas med JavaScript. En enkel hämtare som bara läser råmarkupen ser en tom sida. **Med en styrd webbläsare som kör sidans JavaScript går de däremot att läsa**, och uppgifterna nedan märkta med Avanzas eller Nordnets egen sida är hämtade den vägen 2026-09-08.

Nordnets fondsidor har läsbara adresser och gick att läsa direkt. Avanzas lista gick att filtrera och läsa, medan deras detaljsida ligger bakom en klickväg i ett Angular-gränssnitt som inte gav vika i den här omgången. ISIN för Avanza Global står därför fortfarande som obelagt.

## Vad svenska sparare faktiskt äger och köper

### Mest ägda fonder hos Avanza

Källa: [Placera, 2026-07-31](https://www.placera.se/nyheter/indexfonderna-krossar-de-aktiva-bland-avanzas-sparare-2026-07-31), som refererar Avanzas egen statistik.

| Fond | Antal ägare | Typ |
| --- | ---: | --- |
| Avanza Zero | 1 075 951 | Index, Sverige |
| Avanza Global | 718 795 | Index, global |
| Spiltan Aktiefond Investmentbolag | 670 694 | Aktiv, Sverige |
| Länsförsäkringar Global Index | 468 738 | Index, global |
| Swedbank Robur Technology A | 222 070 | Aktiv, tema |
| Avanza Auto 6 | 189 956 | Fondandelsfond |

### Mest köpta fonder hos Nordnet

Källa: [Placera, 2026-06-29](https://www.placera.se/nyheter/indexfonder-toppar-nordnets-koplista-2026-06-29), som refererar Nordnets köplista för juni 2026.

1. Nordnet Sverige Index
2. **Länsförsäkringar Global Index**
3. Nordnet One Offensiv
4. Nordnet One Balanserad
5. Spiltan Aktiefond Investmentbolag
6. Nordnet Teknologi Index
7. Nordnet Global Index
8. Länsförsäkringar Tillväxtmarknad Index
9. Swedbank Robur Access Asien
10. **DNB Global Indeks**

Både Länsförsäkringar Global Index och DNB Global Indeks finns alltså på listan, vilket stödjer att de ska ingå i urvalet.

### Mest handlade ETF:er hos Avanza

Källa: [Börskollen, 2026-08-19](https://www.borskollen.se/nyheter/27/har-ar-sommarens-mest-handlade-etf-er-pa-avanza), som refererar Avanzas statistik för 1 juni till 17 augusti 2026.

1. XACT Nordic High Dividend Low Volatility
2. Montrose Global Monthly Dividend MSCI World
3. VanEck Semiconductor UCITS ETF
4. XACT OMXS30
5. VanEck Space Innovators UCITS ETF

**Det här är ett viktigt fynd och det motsäger antagandet i det tidigare underlaget.** De mest handlade ETF:erna hos svenska sparare är utdelningsteman, halvledare och rymd, inte breda globala indexETF:er. WEBN, VWCE och SPYI förekommer inte på listan. Volym är alltså inte ett argument för att lyfta fram en produkt, och tjänsten bör inte blanda ihop *mest handlad* med *bred och billig*.

## Fem indexfonder

Länsförsäkringar Global Index och DNB Global Indeks ingår på Patriks instruktion. Övriga tre är valda för att de täcker olika saker: billigast (Avanza Global), bredast inklusive tillväxtmarknader (Storebrand Global All Countries) och bredast tillgänglig hos flest banker (Swedbank Robur Access Global).

### 1. Länsförsäkringar Global Index

Källa: [Länsförsäkringars egen fondlista](https://lansforsakringar.dev.fundlist.com/sv/1/details/SE0005188836), uppgifter daterade 2026-09-04.

| Uppgift | Värde | Status |
| --- | --- | --- |
| ISIN | SE0005188836 | Verifierad |
| Förvaltningsavgift | 0,20 % | Verifierad |
| Årlig avgift | 0,21 % | Verifierad |
| Index | MSCI World ex Select Securities Climate Action 75% Custom Index | Verifierad |
| Replikering | Fysisk, full | Verifierad |
| Basvaluta | SEK | Verifierad |
| Utdelning | Ackumulerande | Verifierad |
| Startdatum | 2013-06-11 | Verifierad |

**Korrigering:** `rikatillsammans-indexfonder-och-etfer.md` anger indexet som ”Morningstar DM Target Market Exposure Paris Aligned”. Det stämmer inte. Fonden följer ett MSCI-index med klimaturval, inte ett Morningstar-index. Uppgiften ska bort ur det dokumentet.

Avläst från [Nordnets egen fondsida](https://www.nordnet.se/fonder/lista/lansforsakringar-global-index-sek-7ef0089f) 2026-09-08: årlig avgift **0,20 %**, kategori Global mix bolag, basvaluta SEK, **belåningsgrad 85 %**, och samma jämförelseindex som fondbolaget anger.

**Här finns en märkningsskillnad värd att notera.** Länsförsäkringars egen fondlista skiljer på förvaltningsavgift 0,20 % och årlig avgift 0,21 %. Nordnet visar 0,20 % under rubriken *årlig avgift*. Samma fond, samma dag, två olika tal under samma etikett. Vilket som är rätt avgörs av vad som räknas in, och tabellen måste därför ange vilken definition varje siffra följer, inte bara siffran.

Belåningsgraden 85 % är dessutom en riktig uppgift till belåningsverktyget, som hittills räknat med 85 % som ett påhittat exempelvärde. Den bör hämtas per värdepapper och leverantör, eftersom den varierar och revideras.

Att förvaltningsavgift och årlig avgift skiljer sig med en hundradel är inte en avrundning. Det är exakt den uppdelning jämförelsetabellen ska visa i separata fält.

### 2. DNB Global Indeks S

| Uppgift | Värde | Status |
| --- | --- | --- |
| ISIN, andelsklass S | Obelagt | **Ej verifierat** |
| Årlig avgift | 0,20 % enligt [Fondmarknaden](https://fondmarknaden.se/Fonder/Fondoversikt/26168.aspx) | Sekundär källa, ej bekräftad mot KID |
| Index | MSCI World Index | Verifierad, se nedan |
| Handelsvaluta, andelsklass S | SEK | Sekundär källa |
| Utdelning | Ackumulerande | Verifierad, se nedan |
| Startdatum, andelsklass S | 2022-12-09 | Sekundär källa |

Index, utdelningspolicy och basvaluta är verifierade ur fondens svenska KID för **andelsklass A**, ISIN NO0010582984: passiv strategi mot MSCI World Index, ingen utdelning till andelsägarna, basvaluta och teckningsvaluta NOK.

**Men det faktabladet är inaktuellt.** Det redovisar årlig avgift för 2018 (0,21 %) och resultat till och med 2018, samt att förvaltningsavgiften sänktes från 0,30 % till 0,20 % den 4 februari 2019. Ett dokument från 2019 kan inte ligga till grund för en publicerad avgift 2026.

Det här är precis det läge gränssnittet kallar **Inaktuell**, och raden får därför inte utse någon billigaste köpväg förrän aktuell KID för andelsklass S är läst.

**Att göra:** hämta aktuell KID för andelsklass S från DNB Asset Management, och notera att A-klassen handlas i NOK medan S uppges handlas i SEK. Skillnaden avgör om raden ska märkas som handlad i kronor.

### 3. Avanza Global

Källa: [Avanzas egen informationsbroschyr, 2026-03-09](https://investors.avanza.se/files/Avanza_fonder/Informationsbroschyr/informationsbroschyr_avanza-global_2026-03-09.pdf).

| Uppgift | Värde | Status |
| --- | --- | --- |
| Gällande förvaltningsavgift | 0,08 % | Verifierad |
| Högsta förvaltningsavgift enligt fondbestämmelserna | 0,08 % | Verifierad |
| Index | Morningstar Developed Markets TME Paris Aligned Benchmark Sustainability Select Index | Verifierad |
| Utdelning | Lämnar ingen utdelning | Verifierad |
| Total avgift | 0,10 % | Verifierad, [Avanzas egen fondlista](https://www.avanza.se/fonder/handla-fonder.html/list), avläst 2026-09-08 |
| Antal ägare | 750 389 | Verifierad, samma källa och datum |
| ISIN | Obelagt | **Ej verifierat** |

**Tre korrigeringar mot befintligt underlag:**

- `lagsta-avgifter-och-kostnadsoptimering.md` och `rikatillsammans-indexfonder-och-etfer.md` anger 0,09 %. Avanzas eget dokument säger 0,08 % i förvaltningsavgift.
- Samma dokument anger indexet som ”Morningstar DM World Index”. Det korrekta namnet innehåller Paris Aligned och ett hållbarhetsurval, vilket betyder att fonden medvetet avviker från bred marknadsvikt. Det ska synas i marknadstäckningskolumnen.
- [Småspararguiden](https://www.smaspararguiden.se/blogg/sa-hittar-du-den-basta-globala-indexfonden/), uppdaterad 2026-04-21, anger 0,20 % för Avanza Global. Den uppgiften är inaktuell. Det illustrerar varför även en ansedd sekundärkälla behöver kontrolldatum.

Uppdelningen bekräftas därmed på båda hållen: 0,08 % i förvaltningsavgift enligt fondbolagets eget dokument, 0,10 % i total avgift enligt Avanzas fondlista. Mellanskillnaden är övriga kostnader, och det är precis de två fält jämförelsetabellen ska hålla isär.

Ägarantalet 750 389 avlästes 2026-09-08 och är högre än de 718 795 som Placera rapporterade 2026-07-31. Siffran rör sig, så den behöver eget kontrolldatum om den publiceras.

**Att utreda:** broschyren beskriver användning av OTC-derivat i förvaltningen. Fonden har tidigare varit matarfond. Vad det innebär för replikering och motpartsrisk måste läsas noggrant innan raden publiceras, eftersom det inte är samma sak som fysisk replikering.

### 4. Storebrand Global All Countries

Källa: [Storebrands informationsbroschyr, 2026-08-12](https://storebrandbe.fondlista.se/documents/FSGBR053TS/FSGBR053TS-Informationbroschyr.pdf).

| Uppgift | Värde | Status |
| --- | --- | --- |
| Index | MSCI All Countries World Index, net return | Verifierad |
| Andelsklass A SEK | Ackumulerande, handlas i SEK | Verifierad |
| Högsta förvaltningsavgift, klass A och B | 0,30 % | Verifierad ur fondbestämmelserna |
| Gällande förvaltningsavgift | Obelagt | **Ej verifierat** |
| ISIN | Obelagt | **Ej verifierat** |

Detta är den enda av de fem som följer ett All Countries-index och alltså inkluderar tillväxtmarknader. Den är därför inte utbytbar mot de övriga, och en kostnadsrankning som ställer den mot en World-fond jämför olika saker. Det stödjer designbeslutet att grön markering bara jämför köpvägar inom samma produkt.

Observera att `rikatillsammans-indexfonder-och-etfer.md` anger cirka 0,31 % i avgift, vilket ligger över det tak på 0,30 % som fondbestämmelserna sätter för förvaltningsavgiften. Antingen avser siffran total årlig avgift inklusive övriga kostnader, eller så är den fel. Det måste redas ut.

### 5. Swedbank Robur Access Global

| Uppgift | Värde | Status |
| --- | --- | --- |
| Allt | Obelagt | **Ej verifierat** |

Med i urvalet därför att [Småspararguiden](https://www.smaspararguiden.se/blogg/sa-hittar-du-den-basta-globala-indexfonden/) listar den som ett likvärdigt alternativ, och därför att den är standardvalet för den som har Swedbank eller en sparbank. Inga uppgifter är kontrollerade i den här omgången.

### Kandidater som övervägdes men inte togs med

- **Avanza Zero.** Sveriges mest ägda fond, 0,00 % i avgift enligt Avanzas egen broschyr. Följer OMXS30, alltså trettio svenska bolag. Den hör inte hemma bland globalfonderna. Flera artiklar på nätet beskriver den felaktigt som en global fond, vilket är ett bra exempel på varför sekundärkällor inte duger.
- **Nordea Global Passiv.** Rekommenderas av Småspararguiden till 0,19 %. Kandidat till en sjätte rad.
- **Nordnet Global Index** och **Nordnet Indexfond Global ESG.** Finns på Nordnets köplista, men bara köpbara hos en leverantör, vilket gör köpvägsjämförelsen meningslös för dem.

## ETF:er

Alla uppgifter nedan från [justETF](https://www.justetf.com), med det datum tjänsten själv anger. justETF är sekundärkälla; faktablad från emittenten krävs innan publicering.

| ETF | ISIN | Ticker | Avgift | Index | Replikering | Valuta | Datum |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| Amundi Prime All Country World Acc | IE0003XJA0J9 | WEBN | 0,07 % | Solactive GBS Global Markets Large & Mid Cap | Fysisk, full | USD | 2026-07-23 |
| Vanguard FTSE All-World Acc | IE00BK5BQT80 | VWCE | 0,14 % | FTSE All-World | Fysisk, sampling | USD | 2026-07-31 |
| SPDR MSCI ACWI IMI Acc | IE00B3YLTY66 | SPYI | 0,17 % | MSCI ACWI IMI | Fysisk, sampling | USD | 2026-07-31 |
| iShares Core MSCI World Acc | IE00B4L5Y983 | EUNL, IWDA, SWDA | 0,20 % | MSCI World | Fysisk, sampling | USD | 2026-07-30 |

Samtliga fyra har hemvist i Irland och är ackumulerande.

**Två korrigeringar mot befintligt underlag:**

- `bogleheads-och-internationell-indexforskning.md` och `rikatillsammans-indexfonder-och-etfer.md` anger VWCE till 0,22 %. Rätt siffra per 2026-07-31 är **0,14 %**. Vanguard har sänkt avgiften, och slutsatsen att WEBN är dramatiskt billigare än VWCE håller inte längre i samma utsträckning.
- Samma dokument anger WEBN:s index som ”Solactive GBS Global Markets **All Cap**” och skriver att fonden inkluderar småbolag. justETF anger ”Solactive GBS Global Markets **Large & Mid Cap**”. Om det stämmer innehåller WEBN inte småbolag, och skillnaden mot SPYI, som följer ett IMI-index med småbolag, är då större än underlaget påstår. Detta måste avgöras mot Amundis eget faktablad innan någon jämförelse publiceras.

### Vad som skiljer dem åt, utöver avgiften

Bredden går inte att läsa ur avgiften, och de fyra är inte utbytbara:

- **EUNL** följer MSCI World: enbart utvecklade marknader, inga tillväxtmarknader, inga småbolag.
- **VWCE** följer FTSE All-World: utvecklade marknader plus tillväxtmarknader, stora och medelstora bolag.
- **WEBN** följer ett Solactive-index med utvecklade marknader plus tillväxtmarknader, enligt justETF utan småbolag.
- **SPYI** följer MSCI ACWI IMI: utvecklade plus tillväxtmarknader **plus** småbolag. Bredast av de fyra, och dyrast.

Att SPYI kostar 0,17 % mot WEBN:s 0,07 % är alltså delvis betalning för mer marknad, inte enbart en dyrare förpackning.

### Tematiska ETF:er som faktiskt handlas

XACT Nordic High Dividend Low Volatility, Montrose Global Monthly Dividend MSCI World, VanEck Semiconductor, XACT OMXS30 och VanEck Space Innovators toppar handelsstatistiken hos Avanza. Ingen av dem är ett brett globalt basinnehav.

De hör inte hemma i jämförelsetabellen, eftersom tjänsten jämför kostnad för jämförbar bred exponering. Men de är värda en mening någonstans: det som handlas mest är inte det som forskningsunderlaget stödjer, och den skillnaden är i sig en upplysning till läsaren.

## Kvar att verifiera innan publicering

1. ISIN för Avanza Global, DNB Global Indeks S, Storebrand Global All Countries och Swedbank Robur Access Global.
2. Aktuell KID för DNB Global Indeks S, inklusive handelsvaluta för just den andelsklassen.
3. Gällande, inte högsta, förvaltningsavgift för Storebrand Global All Countries.
4. Total årlig avgift, inte bara förvaltningsavgift, för samtliga fem fonder.
5. Amundis eget faktablad för WEBN, för att avgöra frågan om småbolag ingår.
6. Avanza Globals användning av OTC-derivat och vad den innebär för replikering och motpartsrisk.
7. Samtliga ETF-rader mot emittentens faktablad, inte bara justETF.
8. Köpbarhet och prislista per leverantör: Avanza, Nordnet, Montrose, SAVR och Fondo. Ingen av dessa är kontrollerad i den här omgången, och köpvägskolumnerna kan därför inte fyllas i.

## Anmärkning om det tidigare underlaget

Den här genomgången hittade fyra sakfel i de befintliga researchdokumenten på de få uppgifter som gick att kontrollera mot primärkälla: fel index för Länsförsäkringar Global Index, fel index och fel avgift för Avanza Global, och en avgift för VWCE som är omkring 60 procent för hög.

Det säger ingenting om skribentens ambition, men det säger något om felfrekvensen. Dokumenten ska behandlas som uppslag att kontrollera, aldrig som uppgifter att publicera. Punkten om detta i `BACKLOG.md` står kvar.
