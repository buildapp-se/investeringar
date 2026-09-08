# Avkastningsantagande i kostnadsjämförelsen

Status: användaren har godkänt gemensamt, ändringsbart bruttoavkastningsantagande och separata mått för avgifter och total avgiftseffekt. Inte implementerat. Förvalt procenttal återstår att besluta. Nollavkastning som enda beräkningsgrund har övergetts.

## Etablerade exempel, förstahandskällor

- [FINRA, Using the Fund Analyzer](https://www.finra.org/investors/tools-and-calculators/using-finra-fund-analyzer): verktygets grundscenario använder 5 procent årlig avkastning och 10 år, ändringsbart. Det stöder även jämförelse av samma fond och andelsklass hos olika mäklare.
- [FINRA, Methodology](https://www.finra.org/investors/tools-and-calculators/fund-analyzer-methodology-data-sources): avkastning och fondkostnader beräknas dagligen; kontoavgifter, insättningar och uttag ingår. Verktyget räknar med slutlig försäljning, vilket vårt projekt uttryckligen INTE ska göra utan valt försäljningsalternativ.
- [SEC/Investor.gov, Understanding Fees](https://www.investor.gov/introduction-investing/getting-started/understanding-fees): illustrerar avgiftseffekter över 20 år med 4 procent antagen avkastning.
- [Finansinspektionen, Jämförelsetal för fondavgifter](https://www.fi.se/sv/for-konsumenter/spara/jamforelsetal-for-fondavgifter/): använder samma antagna årsavkastning på 7 procent för alternativen i ett kostnadsexempel med månadssparande. Detta är illustration, inte belägg för framtida avkastning.
- [Pensionsmyndigheten, Avgifter och rabatter](https://www.pensionsmyndigheten.se/forsta-din-pension/valj-och-byt-fonder/avgifter-och-rabatter-inom-premiepensionen): prisjämförelsen tar med både avgifter och avkastning som avgiftspengarna annars kunde ha gett. Antagandena varierar mellan exempel och tillgångsslag. PPM-rabatter och skatter ska inte föras över till svensk ISK-jämförelse. Redovisad fondutveckling är redan efter fondavgift.

## Slutsats för vår tjänst

Avkastning ändrar avgiftsunderlaget i kronor. Avgifter minskar kapitalet och därmed senare tillväxt. Att enbart multiplicera startkapital med avgiftsprocent och antal år fångar inte dessa samband. Ett antagande om noll avkastning är också ett scenario, inte en neutral framtidsbeskrivning.

Godkänd metodinriktning, detaljer preciseras inför implementation:

1. Ett gemensamt, ändringsbart avkastningsantagande FÖRE avgifter för jämförbara alternativ. Antagandet anges öppet som ett räkneantagande, aldrig förväntad eller utlovad avkastning. Ingen fond tilldelas högre antagande för att dess historik varit bättre.
2. Visa beräknade avgifter i kronor separat från total avgiftseffekt inklusive utebliven tillväxt. Den senare är skillnaden mellan samma scenario utan kostnader och med kostnader. Lägg inte ihop avgiftssumman med denna skillnad igen.
3. Visa kostnadsskillnader och villkor. Slutkapital och avkastningsrankning ska inte vara leveransen till besökaren.
4. Kontoavgifter och rabatter beräknas enligt verifierade tröskelvillkor. Brytpunkter mellan ETF och fond kan ändras med insättningar, kapitalutveckling och tarifftrösklar.
5. Olika exponeringar märks som sådana. Ett gemensamt antagande isolerar kostnaden men bevisar inte likvärdig risk eller framtida avkastning. Belåning hanteras separat.
6. Köp och löpande avgifter ingår normalt. Sälj visas separat och räknas in bara när besökaren aktivt väljer försäljning. Kostnader för valutaväxling gäller transaktionerna enligt vald handelsplats/valuta, inte automatiskt hela kapitalet årligen.
7. Historisk fondavkastning efter fondavgift får inte användas som bruttoavkastning med samma avgift avdragen igen.

## Underlag för förvalt procenttal

[Investor.gov](https://www.investor.gov/introduction-investing) nämner 7–10 procent som ett historiskt grundat långsiktigt uppskattningsintervall för diversifierade amerikanska aktieplaceringar. Detta är inte samma sak som global aktieavkastning i SEK. [UBS Global Investment Returns Yearbook 2025](https://www.ubs.com/global/en/wealthmanagement/insights/2025/global-investment-returns-yearbook.html) visar exempelvis 3,5 procent årlig real global aktieavkastning från början av 2000 till slutet av 2024. Skillnader i period, marknad, valuta, inflation och genomsnittsmetod måste därför anges.

Rekommendationen är nu 7 procent nominellt före avgifter som ändringsbart kostnadsscenario för jämförbara aktiealternativ, med FI:s kostnadsillustration som metodreferens. Detta är inte ett påstående att globalfonder förväntas ge 7 procent eller att samma nivå passar fondrobotar med annan aktieandel. Användaren har ännu inte uttryckligen valt förvalt procenttal.

## Kontrollerat pedagogiskt exempel

Egen JavaScript-beräkning, inte en fondprognos: 100 000 kr engångsinsättning, 20 år, 5 procent brutto per år, inga skatter eller andra kostnader. Förenklat dras årsavgiften vid varje årsslut efter årets tillväxt. Detta är inte den dagliga beräkningsmodell som ska användas vid produktimplementering.

| Årlig avgift | Summa dragna avgifter | Avgifter inklusive utebliven tillväxt |
| --- | ---: | ---: |
| 0,20 % | 6 792 kr | 10 414 kr |
| 0,40 % | 13 287 kr | 20 439 kr |

Kontroll: årligt kapital = föregående kapital × 1,05 × (1 − avgift). Total avgiftseffekt = 100 000 × 1,05^20 minus kvarvarande kapital. Avgiftseffekterna är avrundade till hela kronor. Tabellen visar varför dragna avgifter och total effekt måste hållas isär.
