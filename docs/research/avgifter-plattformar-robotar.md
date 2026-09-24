# Avgifter per köpväg och robotrådgivare

Läst 2026-09-24 om inget annat anges. Endast publika sidor, ingen inloggning.
UNVERIFIED = ingen primärkälla hittad, eller källan är för gammal för att gälla som aktuell.

## 1. Fondkostnad per plattform

### Modellen

- **Avanza, Nordnet:** ingen plattformsavgift, ingen återbetalning. Effektiv avgift = fondens årliga avgift. (Bekräftat i `kopvagar.md` 2026-09-09.)
- **Montrose:** fondprovisionen betalas tillbaka; egen fondplattformsavgift 0,05 % om förvaltningsavgiften är ≤ 0,20 %, annars 0,10 %. Effektiv = årlig avgift − provision + plattformsavgift. Provisionen per fond publiceras inte.
  Källa: https://www.montrose.io/handla-fonder (2026-09-24). OBS: bloggen https://www.montrose.io/blogg/de-mest-populara-fonderna-hos-montrose (2025-04-15) säger "lägre än 0,21 %", prissidan "0,20 % eller lägre". Ingen skillnad för fonderna nedan (0,20 % eller 0,30 %).
- **SAVR:** fondprovisionen betalas tillbaka; SAVR:s ersättning 0,06 % för indexfonder, "alltid inbakad i priset du ser". "Din avgift" på SAVR:s sidor är alltså netto inkl. SAVR:s avgift.
  Källa: https://savr.com/sv/priser-fonder (2026-09-24).
  **Viktigt:** återbetalningen är inte en lägre fondavgift utan **kontant utbetalning per kvartal** till kontot; SAVR:s egen avgift dras samtidigt. Fondens kurs och historik ser därför likadan ut som hos andra. Källa: https://help.savr.com/sv/articles/567565-vad-kostar-det-att-spara-genom-savr (2026-09-24).

### Utbud och effektiv årlig avgift

| Fond | ISIN | Avanza | Nordnet | Montrose | SAVR |
| --- | --- | --- | --- | --- | --- |
| Länsförsäkringar Global Index | SE0005188836 | Finns. 0,21 % (förv. 0,20 %) [A] | Finns. 0,2 % [N] | Finns enligt Montrose blogg 2025-07-16 [M2]. Plattformsavgift 0,05 %. Effektiv: UNVERIFIED | Finns [S1]. "Din avgift" 0,18 % [S1], men datumstämplad 2025-04-08 och SAVR visar tre olika siffror för samma fond (se nedan). Aktuell: UNVERIFIED |
| DNB Global Indeks S | NO0010827280 | Finns ("DNB Global Index S"), handlas i SEK. 0,21 % (förv. 0,20 %) [A] | Finns. 0,2 % [N] | Finns ("DNB Global Indeks", plats 3 bland mest ägda) [M2]; andelsklass ej angiven. Plattformsavgift 0,05 %. Effektiv: UNVERIFIED | Finns ("DNB Global Indeks S") [S2]. "Din avgift" 0,17 %, ordinarie 0,21 %, rabatt 19 %, daterad 2025-04-08. Aktuell: UNVERIFIED |
| Avanza Global | SE0011527613 | Finns. 0,10 % (förv. 0,08 %) [A] | **Finns ej**: "Filtreringen gav inga resultat" [N] | UNVERIFIED (ej i publika listor) | UNVERIFIED (ej i publika listor) |
| Storebrand Global All Countries A SEK | SE0000671919 | Finns. 0,32 % (förv. 0,30 %) [A] | Finns. 0,31 % [N] | UNVERIFIED (Montrose topplista nämner bara Storebrand Europa A). Plattformsavgift vore 0,10 % | UNVERIFIED |
| Swedbank Robur Access Global A | SE0007074059 | Finns. 0,24 % (förv. 0,20 %) [A] | Finns. 0,2 % [N] | UNVERIFIED. Plattformsavgift vore 0,05 % | UNVERIFIED |

Källor:
- [A] Avanzas publika API bakom fondsidorna: sökning `https://www.avanza.se/_api/search/filtered-search` på ISIN, avgifter från `https://www.avanza.se/_api/fund-guide/guide/{id}` (id 417655, 1509082, 878733, 2332, 600075), fält `productFee` (= "Årlig avgift") och `managementFee`. 2026-09-24. Oförändrat mot `kopvagar.md` 2026-09-09.
- [N] Nordnets fondlista, `https://www.nordnet.se/fonder/lista?freeTextSearch={ISIN}`, 2026-09-24. Nordnet visar "Årlig avgift" avrundat (0,2 % = 0,20 %; Storebrand 0,31 % mot Avanzas 0,32 %). Nordnets siffra för Access Global (0,2 %) avviker från Avanzas 0,24 %: troligen förvaltningsavgift, inte total. UNVERIFIED vilken definition Nordnet använder.
- [M2] https://www.montrose.io/blogg/mest-agda-fonderna-hos-montrose, publicerad 2025-07-16. Även https://www.montrose.io/blogg/de-mest-populara-fonderna-hos-montrose (2025-04-15) listar DNB Global Indeks och Länsförsäkringar Global Index. Utbudet är alltså belagt per 2025, inte per i dag.
- [S1] https://savr.com/sv/fondutbud, flik "Globalfonder"/"Populära fonder", läst 2026-09-24, text: "Priserna på sidan uppdaterades 8/4, 2025".
- [S2] Samma sida, flik "Globalfonder", 2026-09-24.

**Montrose har ingen publik fondsida per fond.** `montrose.io/fonder` och `montrose.io/fonder/{ISIN}` ger 404, ingen sitemap. Fondlistan finns bara i appen (app.montrose.io, inloggning).
**SAVR:s gamla publika fondsidor** (`savr.com/sv/fondbutik/{bolag}/{ISIN}/{slug}`, fortfarande i sökindex) omdirigerar i dag till startsidan. Fullt utbud kräver inloggning ("Logga in för att se alla våra fonder").

**SAVR motsäger sig själv för Länsförsäkringar Global Index, samma datum 2025-04-08:**

| Sida | Ordinarie | Din avgift |
| --- | ---: | ---: |
| https://savr.com/sv/priser-fonder | 0,22 % | 0,19 % |
| https://savr.com/sv/fondutbud | 0,21 % | 0,18 % (rabatt 18 %) |
| https://savr.com/sv/savr-vs-avanza | 0,23 % | 0,20 % (rabatt 13) |

Ingen av dem kan användas som aktuell siffra.

### Härledd uppskattning (INTE verifierad, endast som räkneexempel)

Om SAVR:s "din avgift" = ordinarie − provision + 0,06 %, ger fondutbudssidan en provision på cirka 0,09 procentenheter för LF Global Index (0,21 − 0,18 + 0,06) och cirka 0,10 för DNB Global Indeks S (0,21 − 0,17 + 0,06). Med samma provision hos Montrose (antagande: provisioner förhandlas per plattform och kan skilja) blir Montrose cirka 0,17 % för LF och 0,16 % för DNB. Siffran är ett antagande ovanpå en 17 månader gammal siffra och ska **inte** in i `data.js`.

### Jämförelsenoteringar (inte i urvalet)

| Fond | Var | Avgift | Källa |
| --- | --- | ---: | --- |
| Montrose Global (matarfond till DNB Global Indeks, MSCI World) | Endast Montrose | 0,09 % total (0,08 % förv. + 0,01 % transaktion); plattformsavgift 0,00 % enligt Montrose prislista (`kopvagar.md`) | https://www.montrose.io/montrose-global (Montrose jämförelse "kontrollerades senast den 19 maj 2026") |
| Nordnet Global Index (SEK) | Nordnet | 0,20 % | https://www.nordnet.se/fonder/lista/nordnet-global-index-sek-0c65c468 |
| Nordnet Global Index 125 (hävstång 1,25) | Nordnet | 0,4 % | Nordnets fondlista, sökning "Nordnet Global Index" |
| Nordnet Sverige/Norge/Finland Index | Nordnet | 0 % förvaltningsavgift | https://www.nordnet.se/faq/handel-vardepapper/fonder-etfer/vad-kostar-nordnets-egna-fonder |
| Avanza Zero (SE0001718388) | Avanza | 0,00 % (Sverigefond, inte global) | Avanza API guide/41567 |

Montrose Global är den relevanta nyheten: 0,09 % mot Avanza Globals 0,10 %, och i praktiken samma underliggande portfölj som DNB Global Indeks. Den säljs bara hos Montrose.

## 2. Robotrådgivare

### Lysa

Avgiftsdata från Lysas publika avgiftskalkylator på https://www.lysa.se/avgifter, som hämtar från `https://api.lysa.se/fees/estimate/v2/new-account/anonymous?countryCode=SE&accountType=ISK_SWE&totalAmount={belopp}&risk={aktieandel}&investmentType=BROAD&...`. 2026-09-24.

Lysas avgift = portföljförvaltning (`discretionary`, trappas efter kapital) + förvaltningsavgift i Lysas egna fonder (`fundManagement`, beror på aktieandel). Underliggande fonder och transaktionskostnader tillkommer.

**Trappa, portföljförvaltningsdelen (samma för alla aktieandelar):**

| Totalt sparande | Portföljförvaltning | Lysas avgift vid 100 % aktier, brett |
| --- | ---: | ---: |
| 1 – 199 999 kr | 0,12 % | 0,281 % |
| 200 000 – 499 999 kr | 0,11 % | 0,271 % |
| 500 000 – 999 999 kr | 0,10 % | 0,261 % |
| 1 – 4,9 MSEK | 0,09 % | 0,251 % |
| 5 – 29,9 MSEK | 0,08 % | 0,241 % |
| 30+ MSEK | 0,03 % | 0,181 % |

Högerkolumnen stämmer exakt mot Lysas egen tabell på https://www.lysa.se/kunskap/sa-fungerar-lysas-prismodell (2026-09-24).

**Total kostnad, brett fokus, under 200 000 kr:**

| Aktieandel | Lysa portfölj | Lysa fond | Underliggande fonder | Transaktion | **Totalt** |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 100 % | 0,120 % | 0,161 % | 0,027 % | 0,048 % | **0,356 %** |
| 75 % | 0,120 % | 0,151 % | 0,043 % | 0,052 % | **0,365 %** |
| 50 % | 0,120 % | 0,140 % | 0,059 % | 0,055 % | **0,374 %** |
| 0 % | 0,120 % | 0,120 % | 0,091 % | 0,062 % | **0,393 %** |

Vid 1 MSEK, 100 % aktier: 0,326 %. Hållbart fokus, 100 % aktier, 100 000 kr: 0,365 % (Lysa fond 0,21 %, underliggande 0 %, transaktion 0,035 %).
Lysa: "genomsnittskund betalar ca 0,40 %" (https://www.lysa.se/help-center/170-vad-kostar-lysa). Ingen avgift för insättning, uttag eller plattform (samma källa).

- **Aktieandel:** kalkylatorn tar 0–100 % (API:t svarar på 0, 50, 75, 100); förval "75 % aktier, 25 % räntor". Stegstorlek: UNVERIFIED.
- **Resten:** räntor, "mer än 5 000 ränteinstrument" i breda portföljen (https://lysafonder.se/sv). Räntefondens exakta inriktning (stat/företag, duration): UNVERIFIED.
- **Minsta insättning:** 100 kr ("Minsta belopp är 100 kr", https://www.lysa.se/help-center/247-hur-goer-jag-en-insaettning).

### Opti

| Uppgift | Värde | Källa |
| --- | --- | --- |
| Förvaltningsavgift, < 1 MSEK | 0,50 % | https://www.opti.se/premium |
| 1–20 MSEK | 0,45 % | samma |
| 20–30 MSEK | 0,40 % | samma |
| 30–40 MSEK | 0,35 % | samma |
| 40–50 MSEK | 0,30 % | samma |
| > 50 MSEK | 0,25 % | samma |
| Underliggande fonder | "genomsnittlig avgift på 0,11–0,16 %" (premiumsidan); "fondavgifterna endast mellan 0,06–0,37 %" efter återbetald provision (portföljsidan) | https://www.opti.se/premium, https://www.opti.se/portfolj |
| Total kostnad | "cirka 0,7 %", "inkluderar förvaltningen, kostnaderna för samtliga fonder och allt annat väsentligt"; Opti 9 "cirka 0,70 %" | https://www.opti.se/faq |
| Moms, depåavgift | Nämns som tillkommande i uppskattningen ("t.ex. moms ... avgifterna för depån/kontot"); belopp UNVERIFIED | https://www.opti.se/avgifter |
| Fondprovisioner | Betalas tillbaka till kunden | https://www.opti.se/faq |
| Aktieandel | Nivåer Opti 1–9 plus "Opti 100 % aktier"; "högsta risknivå ... enbart aktiefonder". Aktieandel per nivå: UNVERIFIED | https://www.opti.se/faq |
| Resten | Räntefonder (global valutasäkrad: nominella, real, high yield, tillväxtmarknad; gröna obligationer i hållbar variant) och en råvarufond (råvaruterminer) | https://www.opti.se/faq |
| Minsta insättning | 200 kr per tillfälle | https://www.opti.se/faq |
| Övrigt | Pengarna-tillbaka-garanti på förvaltningsarvodet 3–12 mån; KF via Futur +0,2 %/år (företag) | https://www.opti.se/faq |

Siffran 0,50 % är inte uttalat inkl. eller exkl. moms på Opti:s egna sidor. isk-guiden.se påstår "inkl. moms", men det är sekundärkälla: UNVERIFIED.

### Övriga svenska alternativ

| Tjänst | Konstruktion | Avgift | Aktieandel | Källa |
| --- | --- | ---: | --- | --- |
| Nordnet One | Tre allokeringsfonder | 0,35 % årlig avgift, "samtliga underliggande fondkostnader" ingår | Försiktig 30 %, Balanserad 60 %, Offensiv 100 % (resten räntefonder) | https://www.nordnet.se/faq/handel-vardepapper/fonder-etfer/nordnet-one/vad-ar-nordnet-one-och-hur-fungerar-det |
| Avanza Auto 1–6 | Sex specialfonder (fond-i-fond) | Förvaltning 0,35 %, årlig avgift 0,39 % (Auto 1–5) och 0,40 % (Auto 6) | Stigande risk 1→6; aktieandel per nivå UNVERIFIED | Avanza API guide/788395, 788394 m.fl., 2026-09-24 |
| SAVR Global by Vanguard | En global ETF, inte robot | 0,15 % per år, "helt utan courtage och växlingsavgift" | 100 % aktier, över 2 000 bolag | https://savr.com/sv/savr-global |
| "SAVR Autopilot" | Ingen träff på savr.com | UNVERIFIED, finns troligen inte | | sökning på savr.com 2026-09-24 |

"Nordnet Smart Spar" heter i dag Nordnet One. Sekundärkällor som anger 0,25–0,40 % eller 0,5 % för Avanza Auto är inaktuella mot primärkällorna ovan.

## Slutsatser för `data.js`

1. Avanza och Nordnet: inga ändringar, siffrorna står sig 2026-09-24.
2. Montrose: utbud för LF Global Index och DNB Global Indeks belagt per 2025 (bloggar), men ej per i dag. Effektiv avgift går inte att få publikt. Montrose Global (0,09 %) bör övervägas som egen rad.
3. SAVR: DNB Global Indeks S finns (2025-04-08). Alla SAVR-siffror är 17 månader gamla och internt motsägelsefulla; använd inte som aktuell avgift.
4. Kvar: aktuell per-fond-avgift hos Montrose och SAVR kräver inloggning, eller en direkt fråga till dem.
