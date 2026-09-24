# Värdepappersbelåning: Avanza, Nordnet, Montrose (SAVR, Lysa)

Läst 2026-09-24 (Europe/Stockholm), utloggad, från bolagens egna sidor. Allt nedan är verifierat mot primärkälla om inget annat står. Det som inte gick att verifiera är märkt **UNVERIFIED**.

---

## 1. Avanza: värdepapperskredit med ränterabatt

Källor:
- A1 https://www.avanza.se/vardepapperskredit.html (produktsida inkl. FAQ)
- A2 https://www.avanza.se/konton-lan-prislista/prislista/rantor.html#vp-kredit (prislista, räntor)
- A3 https://www.avanza.se/kundservice.html/3521/vad-menas-med-att-inget-vardepapper-far-utgora-mer-an-49-av-vardet-i-superrantan (49 %-regeln)
- A4 Publika instrumentsidor + deras publika JSON (samma data som sidan renderar), se tabell i avsnitt 4.

### Räntenivåer (prislistan A2, läst 2026-09-24)

| Nivå | Villkor | Nominell | Effektiv |
|---|---|---|---|
| Rabattnivå 1 | Max 10 % belåning av innehav godkänt för rabatt, lånebelopp upp till 3 miljoner kr (totalt, alla konton) | 1,28 % | 1,29 % |
| Rabattnivå 2 | Max 25 % belåning, oavsett lånebelopp | 2,32 % | 2,34 % |
| Rabattnivå 3 | Max 50 % belåning, oavsett lånebelopp | 3,53 % | 3,59 % |
| Ordinarie | Upp till 90 % av innehavet (alla belåningsbara värdepapper) | Bas 6,68 %, Pro 4,59 %, Private Banking 5,17 % | Bas 6,89 %, Pro 4,69 %, PB 5,29 % |

Rabattnivåerna är lika för Bas, Pro och Private Banking (A2). Produktsidan A1 visar samma effektiva räntor (1,29 / 2,34 / 3,59 / 6,89 %).

### Villkor för rabatt (A1, ordagrant)
- "Du behöver ha minst tre aktier som är godkända för rabatt, eller minst en av de godkända fonderna eller ETF:erna."
- "Av de värdepapper som är godkända för rabatt får ingen enskild aktie stå för mer än 49% av värdet."
- "Du får inte ha några optioner, terminer eller blankningsaffärer på kontot där du har krediten."
- "Om du inte uppfyller villkoren för att få rabatt kan du låna till ordinarie ränta."
- Belåningsgraden räknas mot det rabattgodkända: "Din belåningsgrad beräknas däremot på de värdepapper eller fonder som är godkända för rabatt." Det du köper för krediten behöver inte vara rabattgodkänt.
- Ingen blandning: "Om du lånar mer än vad du kan för att få rabatt så kommer hela ditt lånade belopp att ha ordinarie ränta, inte bara den överskjutande delen." 3 mkr-taket gäller totalt för alla konton.
- Definition (A1): "Belåningsgrad är hur mycket lån du har i förhållande till hela marknadsvärdet på ditt konto (inklusive det som är köpt med kredit)."

### 49 %-regeln (A3, ordagrant)
- "Om du äger en aktie eller ETC som står för mer än 49 % av värdet på de rabattberättigade värdepappren kommer det innehavet automatiskt att skrivas ner till 49 %."
- "Det blir inte ordinarie ränta på hela kontot utan det är bara på den överskjutande delen över 49% som inte räknas med för rabatterad belåning p.g.a. koncentrationsrisk."
- Regeln nämner aktie/ETC. En enda godkänd fond eller ETF räcker enligt A1. Slutsats för läsaren: 100 % i en godkänd global indexfond ger rabattnivå 1 om lånet är högst 10 %.

### Tvångsförsäljning (A1, FAQ "Vad innebär det att vara överbelånad")
- "När du är överbelånad har du lånat mer än du får. Om det händer behöver du själv reglera det."
- Avanza "försöker" meddela via meddelande i inloggat läge + mejlavisering, men "har vi inte någon informationsskyldighet när det handlar om överbelåning."
- "Vid överbelåning har vi rätt att sälja av innehav för att reglera din skuld. Det kan vi göra utan att meddela i förväg och du kan du själv inte påverka vad som säljs."
- Överbelånad = lån över belåningsvärdet (belåningsvärde = marknadsvärde x instrumentets belåningsvärde-%, A1) eller över kreditlimit.

### Avvikelse att notera
FAQ på A1 säger fortfarande "villkoret att du kan låna upp till 3 miljoner kr till 1,99% ränta", medan tabellen på samma sida och prislistan säger 1,29 % effektiv. FAQ-texten är inaktuell; prislistan A2 är den som gäller.

---

## 2. Nordnet: Portföljbelåning och Portföljbelåning Plus

Källor:
- N1 https://www.nordnet.se/tjanster/lan/portfoljbelaning
- N2 https://www.nordnet.se/faq/ranta-belaning/portfoljbelaning/hur-far-jag-basta-rantan-enligt-portfoljbelaning-plus
- N3 https://cdn.prod.nntech.io/pdf/sv-SE/vardepappersbelaning.pdf (Produkt- och riskinformation, märkt "Knockoutrabatt 2018_1")
- N4 Publika instrumentsidor + publikt instrument-API (fältet `pawn_percentage`, visas som "Belåningsgrad" på sidan), se avsnitt 4.

### Räntenivåer (N1, läst 2026-09-24)

| Nivå | Villkor | Nominell | Effektiv |
|---|---|---|---|
| Plus, Nivå 1 | Se diversifieringskrav nedan, max 40 % av belåningsvärdet utnyttjat | 2,22 % | 2,24 % |
| Plus, Nivå 2 | Se nedan, max 60 % av belåningsvärdet utnyttjat | 4,54 % | 4,64 % |
| Bas (ordinarie) | Övriga, t.ex. derivat, korta positioner eller högre hävstång | 6,91 % | 7,13 % |
| Private Banking Bas / Gold | | 5,11 % | 5,23 % |
| Private Banking Platinum | | 4,82 % | 4,93 % |
| Private Banking Black | | 4,54 % | 4,64 % |
| Active Trading Pro | | 4,54 % | 4,64 % |

OBS: sidan anger själv datumet "(2025-10-06)" för spannet 2,22–6,91 %. Siffrorna är vad sidan visar 2026-09-24, men Nordnet har inte uppdaterat datumstämpeln på snart ett år. Aktuella räntor för inloggad kund: **UNVERIFIED**. Den publika prislistan (https://www.nordnet.se/kundservice/prislista) visar inga belåningsräntor.

### Villkor Portföljbelåning Plus (N1, ordagrant)
Allmänt: "Din rabatt bestäms av två faktorer: Din riskspridning i portföljen och hur stor del av ditt totala belåningsvärde du utnyttjar. Vid beräkning av din diversifiering räknas enbart värdepapper som är godkända, det vill säga har en belåningsgrad. För att nyttja rabatten behöver du äga värdepapper med minst 70 procent belåningsgrad."

Ränterabatt 1 (bästa):
- "En godkänd aktie eller ETF får max utgöra 20 % av det totala marknadsvärdet för belåningsbara värdepapper i portföljen."
- "En godkänd fond får max utgöra 60 % av det totala marknadsvärdet för belåningsbara värdepapper i portföljen."
- "Du får max använda 40 % av det totala belåningsvärdet för dina värdepapper med en belåningsgrad på minst 70 %."

Ränterabatt 2:
- Aktie/ETF max 25 %, fond max 75 %, max 60 % av belåningsvärdet.

Plus kräver separat ansökan när man redan har portföljbelåning. "Systemet känner dagligen av hur din portfölj ser ut och vilken ränterabatt du får. Eventuella ändringar av rabatten sker redan samma dag." (N1)

Härledd konsekvens (min räkning, inte Nordnets text): 100 % i en enda fond når inte ens Nivå 2 (75 %-tak). Minsta upplägg för Nivå 1 är minst två fonder (ingen över 60 %), eller fem ETF:er (ingen över 20 %). Med 85 % belåningsgrad blir 40 % av belåningsvärdet = lån högst ca 34 % av marknadsvärdet; med 80 % blir det 32 %.

### Utökad belåningsgrad vid diversifiering (N1)
- "Den utökade belåningsgraden tilldelas när inget värdepapper i din portfölj står för mer än 50 procent av värdet."
- "Äger du bara värdepapper med en belåningsgrad på 70 procent kan du öka belåningsgraden till 85 procent, men då får inget värdepappers värde överstiga 10 procent av portföljens totala värde."
- 10x hävstång kräver "värdepapper med minst 85 procents belåningsgrad, och att inget av innehaven står för mer än 20 procent av portföljens värde. Då ökar genomsnittlig belåningsgrad till 90 procent."
- Tabell (grundbelåningsgrad -> effektiv belåningsgrad vid största position 50 / 40 / 30 / 20 / 10 %): 70 % -> 70/75/80/80/85; 80 % -> 80/80/85/85/85; 85 % -> 85/85/85/90/90.

### Tvångsförsäljning
- N1: "Om din utnyttjade kredit överstiger det lägsta värdet mellan det sammanlagda belåningsvärdet av tillgångarna i din depå, och din beviljade kreditlimit, blir du överbelånad. Detta är inte tillåtet. Om du ändå blir överbelånad måste du omedelbart täcka underskottet. I annat fall riskerar du bland annat tvångsförsäljning av dina värdepapper. Det kan medföra en förlust, som kan överskrida storleken av det ursprungliga lånebeloppet."
- N3: Nordnet har "rätt, men inte skyldighet" att sälja. "Vanligtvis föregås s k tvångsförsäljning av ett meddelande [...] men Nordnet har rätt att tvångssälja dina värdepapper utan sådant meddelande." Överbelåningsränta och eventuell stängningsavgift debiteras. Belåningsgrader: aktier upp till 85 %, fonder upp till 90 %; Nordnet ändrar dem löpande.
- Överbelåningsräntans nivå: **UNVERIFIED** (inte i publik prislista).

---

## 3. Montrose: värdepapperskredit med glidande ränta

Källor:
- M1 https://www.montrose.io/vardepapperskredit
- M2 Räntetabell (bild på M1): https://cdn.prod.website-files.com/665d843245a09dc69c336e03/68c138f232c88c7f4e96fcc1_web-rantenivaer-sep10-min.png
- M3 Produkt- och riskinformation, "Gäller från 2026-07-03": https://cdn.prod.website-files.com/665d843245a09dc69c336e03/6a3e7861941c0982ae05ea39_Vardepappersbelaning-produktochriskinformation_FINAL.pdf
- M4 https://www.montrose.io/priser (förmånsnivåer)

### Hur räntan sätts (M1)
- "Räntan baseras på hur stor andel lån du har, i relation till ditt kapital hos Montrose samt vilken förmånsnivå du är i."
- "Är det enbart vissa värdepapper som krävs för att man ska få räntorna? Nej, alla dina värdepapper påverkar din totala belåningsgrad, vilket avgör din ränta."
- En kreditlimit för hela kapitalet på alla konton, "inklusive likvider".
- Inget diversifieringskrav och ingen max-andel per innehav nämns på M1 eller M3.

### Förmånsnivåer (M4)
Access: inget kapitalkrav. Premium: 1 MSEK samlat kapital. Platinum: 5 MSEK. Titan: enligt överenskommelse.

### Räntetabell, effektiv ränta (M2, bilden på M1, läst 2026-09-24; filnamnet antyder "sep10")

| Belåningsgrad | Access | Premium | Platinum |
|---|---|---|---|
| ≤ 5 % | 0,79 % | 0,54 % | 0,29 % |
| 5–10 % | 1,24 % | 0,98 % | 0,74 % |
| 10–15 % | 1,68 % | 1,44 % | 1,19 % |
| 15–20 % | 2,14 % | 1,89 % | 1,63 % |
| 20–25 % | 2,58 % | 2,33 % | 2,09 % |
| 25–30 % | 3,03 % | 2,78 % | 2,54 % |
| 30–35 % | 3,48 % | 3,24 % | 2,98 % |
| 35–40 % | 3,93 % | 3,68 % | 3,43 % |
| 40–50 % | 4,39 % | 4,14 % | 3,89 % |
| 50–60 % | 4,83 % | 4,58 % | 4,33 % |
| > 60 % | 5,28 % | 5,03 % | 4,78 % |

"Vid kreditlimit över 2 miljoner SEK gäller separat lista. Kontakta support om du vill veta mer." (M2). Räkneexemplet på M1 stämmer med tabellen: Premium, 7 % belåning = 0,98 %.

Oklart: om bandgränserna är inklusiva uppåt (t.ex. exakt 10 %) och om hela lånet får bandets ränta eller om räntan "justeras gradvis" inom bandet (M1 säger "justeras gradvis, istället för i yxiga trappsteg"). **UNVERIFIED.**

### Tvångsförsäljning (M3)
- Överbelåning uppstår när portföljens sammanlagda belåningsvärde sjunker under utnyttjat kreditbelopp; ska regleras "omedelbart och utan uppmaning".
- Montrose har "rätt, men inte skyldighet" att sälja; "Vanligtvis föregås sådan tvångsförsäljning av ett meddelande [...] men Montrose har rätt att tvångssälja dina värdepapper även utan sådant meddelande."
- "belåningsgraderna för respektive värdepapper närsomhelst kan ändras eller helt tas bort av Montrose och att något meddelande om ändrad belåningsgrad inte skickas till kunden."
- Överbelåningsränta och försäljningsavgift debiteras (nivåer: **UNVERIFIED**, hänvisas till kreditavtal/prislista).

### Belåningsgrad per instrument
Montrose publicerar inga belåningsgrader per fond/ETF utloggat; de visas i appen. **UNVERIFIED** för alla nio instrument.

---

## 4. Belåningsvärde per instrument

Läst 2026-09-24. Avanza: fälten `collateralValue` / `superInterestApproved` (ETF) och `collateralValue` / `superloan` (fond) i de JSON-anrop som Avanzas publika instrumentsidor själva gör; för VWCE syns "Belåningsvärde 80%, Ränterabatt Ja" direkt i sidtexten. Nordnet: fältet `pawn_percentage` i publikt instrument-API, som Nordnets sidor visar under rubriken "Belåningsgrad" (verifierat i sidans egen etikett-mapp `PAGE_INSTRUMENT.PAWN_PERCENTAGE: "Belåningsgrad"` och i SSR-data för EUNL = 80).

| Instrument | ISIN | Avanza belåningsvärde | Avanza godkänd för ränterabatt | Nordnet belåningsgrad | Nordnet ≥ 70 % (Plus-godkänd) |
|---|---|---|---|---|---|
| Länsförsäkringar Global Index | SE0005188836 | 80 % | Ja | 85 % | Ja |
| DNB Global Indeks S | NO0010827280 | 80 % | Ja | 85 % | Ja |
| Avanza Global | SE0011527613 | 80 % | Ja | Finns ej på Nordnet (sökning utan träff) | – |
| Storebrand Global All Countries A SEK | SE0000671919 | 80 % | Ja | 85 % | Ja |
| Swedbank Robur Access Global A | SE0007074059 | 80 % | Ja | 85 % | Ja |
| Amundi Prime All Country World (WEBN) | IE0003XJA0J9 | 80 % | Ja | 85 % | Ja |
| Vanguard FTSE All-World Acc (VWCE) | IE00BK5BQT80 | 80 % | Ja | 80 % | Ja |
| SPDR MSCI ACWI IMI (SPYI) | IE00B3YLTY66 | 80 % | Ja | 80 % | Ja |
| iShares Core MSCI World Acc (EUNL) | IE00B4L5Y983 | 80 % | Ja | 80 % | Ja |

Sidor (Avanza orderbok-id / Nordnet instrument-id):
- Avanza fonder: https://www.avanza.se/fonder/om-fonden.html/{417655 LF, 1509082 DNB, 878733 Avanza Global, 2332 Storebrand, 600075 Robur}
- Avanza ETF: https://www.avanza.se/borshandlade-produkter/etf-torg/om-fonden.html/{1801558 WEBN, 1063827 VWCE, 1063582 SPYI, 384747 EUNL}
- Nordnet instrument-id: LF 16801508, DNB 17931205, Storebrand 16802393, Robur 16801759, WEBN 18366556, VWCE 17086750, SPYI 16128762, EUNL 16309430. Exempel: https://www.nordnet.se/etf/lista/vanguard-ftse-all-world-ucits-vwce-xeta
- Montrose: **UNVERIFIED** (app only).

Obs: Avanzas fondsidor visar inte belåningsvärdet i utloggad sidtext; siffran kommer från sidans publika data-anrop (`/_api/fund-guide/fund-trading-terms/{id}` → `collateralValue: 80.0`). Nordnet anger instrumentens belåningsgrad under "Om värdepappret" (https://www.nordnet.se/faq/ranta-belaning/portfoljbelaning/vilka-vardepapper-ar-belaningsbara).

---

## 5. SAVR och Lysa

- Inget belåningserbjudande hittat på savr.com (hjälpcentret "Handel & värdepapper", https://help.savr.com/sv/collections/11581024-handel-vardepapper, har inga artiklar om kredit/belåning) eller lysa.se (webbsökning begränsad till lysa.se gav inga träffar på belåning). Ingen av dem säger uttryckligen "vi erbjuder inte belåning" på egna sidor. Negativet är därför **UNVERIFIED mot primärkälla**; sekundärkällor (rikatillsammans.se, aktieskolan.se) säger att båda saknar belåning.

---

## 6. Vad ger lägst ränta, per plattform (sammanfattning för sajttext)

- **Avanza:** lägst 1,29 % effektiv. Krav: minst en godkänd fond/ETF (alla nio ovan är godkända) eller minst tre godkända aktier, ingen aktie/ETC över 49 % av det rabattgodkända, inga derivat/blankning på kontot, lån max 10 % av rabattgodkänt innehav och max 3 mkr totalt. En enda global indexfond räcker.
- **Nordnet:** lägst 2,22 % nominell / 2,24 % effektiv (datumstämpel 2025-10-06 på sidan). Krav: ansök om Plus, värdepapper med minst 70 % belåningsgrad, ingen fond över 60 %, ingen aktie/ETF över 20 %, max 40 % av belåningsvärdet utnyttjat. Minst två fonder, eller fem ETF:er.
- **Montrose:** 0,29–5,28 % effektiv beroende på förmånsnivå (samlat kapital 0 / 1 / 5 MSEK) och belåningsgrad mot hela kapitalet. Inget diversifieringskrav publicerat. Lägst för Access-kund: 0,79 % vid ≤ 5 % belåning, 1,24 % vid 5–10 %.

## 7. Rättelser mot docs/research/belaning-havstang-fonder-och-etfer.md
- "Avanza ... lägsta ränterabatten (ofta styrräntan minus rabatt, t.ex. runt 2,5–3,5 %)": fel. Rabattnivå 1 är 1,29 % effektiv, nivå 2 (10–25 %) 2,34 %.
- "Nordnet Knockout-lånet ... låg ränta vid låg belåningsgrad (upp till 15–20 %)": fel/inaktuellt. Heter Portföljbelåning Plus, trösklarna är andel av belåningsvärdet (40 % / 60 %) plus koncentrationstak (20/60 % resp. 25/75 %).
- "Superlånet" heter sedan december 2021 värdepapperskredit och ränterabatt (A1).
- Montrose saknas helt i dokumentet trots att den har lägst publicerad ränta för små lån.
