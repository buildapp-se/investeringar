# Investeringar

## Syfte och omfattning

Publik svensk jämförelsetjänst på `buildapp.se/investeringar/`, med Patriks handplockade samling av fonder, ETF:er, forumfynd och forskningskällor som innehåll. Hjälper besökaren förstå fondval och jämföra kostnader, utbud och villkor. Svenska privatpersoner, SEK och ISK är första versionens förutsättningar. Budget: 0 kr i extra löpande kostnader.

Fokus är kostnader och investeringsegenskaper i relation till forskning. Ingen utlovad avkastning, historisk avkastningsrankning eller prognos för slutkapital. Framtida utbyggnader finns endast i BACKLOG.md.

## Tre behov, ingen progression

- Slippa välja och sköta: LYSA är tänkt förstahandsval för enkelhet, även utan affiliate. Opti ingår som jämförbar fondrobot. Underlaget får ändra slutsatsen. Jämför vid motsvarande aktieandel och redovisa övriga tillgångsskillnader, service och totalavgift.
- Välja egna indexfonder: förstå kandidater och hitta billigaste verifierade köpvägen för valt scenario.
- Utforska ETF:er och belåning: undersöka marginalkostnader, handelsvillkor och risk. Mer komplexitet är inte bättre eller ett steg upp. Beteenderisk ska synas.

Länsförsäkringar Global Index och DNB Global Indeks är uttryckligen välkomna kandidater. Ett tidigt missförstånd om att de skulle uteslutas är korrigerat. Inga fristående räntefonder ska ingå eller rekommenderas. För kortsiktiga pengar används sparkonto med insättningsgaranti. Fondrobotarnas inbyggda ränteandel redovisas fortsatt.

## Leverantörer och produkturval

Leverantörsundersökningen omfattar Avanza, Nordnet, Montrose, SAVR och Fondo. LYSA och Opti jämförs separat som fondrobotar. Fler banker kan ingå om tillförlitliga data går att få; API är inte ett krav. Listan är handplockad, inte hela marknaden.

Kandidater hittas via bland annat RikaTillsammans, Småspararguiden och Bogleheads. Globala Vanguard-ETF:er och WEBN är uttryckliga intressen. Exakt produkt/andelsklass och svenska köpvägar ska verifieras.

Samma produkt och andelsklass jämförs mellan leverantörer, med ISIN som identitet samt handelsplats/handelsvaluta för handelsavgifter. Liknande produkter visas separat med skillnader i exponering och riskspridning. Ingen kostnadsrankning får dölja skillnader i innehåll eller risk.

## Redaktionellt flöde

Patrik och AI arbetar via projektfiler, ingen adminsida. Inkorgen högst upp i BACKLOG.md tar emot fondnamn, ETF:er, forumlänkar och korta kommentarer. Ofärdiga fynd förblir interna tills uppgifter och källor kontrollerats. Besökare kan filtrera och jämföra utan konto; inga bankkopplingar eller registrering av deras egna innehav.

Varje kostnadsuppgift har källa och kontrolldatum. Saknade eller för gamla uppgifter markeras och kan inte ligga till grund för ”billigast”. Exakt gräns för för gammal återstår att bestämma. Manuell faktakontroll är tillåten.

Veckovisa kontroller och manuell körning via AI är målbilden. Automatisk hämtning används där tillförlitliga källor tillåter och gratis drift räcker. Det är inte tekniskt verifierat ännu. Alla innehållsändringar, även avgifter, ska inledningsvis godkännas av Patrik före publicering. Samla ändringar i en pull request med vad, varför, källor, påverkan och gärna förhandsvisning. GitHub-mejl med granskningslänk; Patrik gör Merge efter godkända kontroller. Endast ändringar och kontrollfel ska kräva uppmärksamhet.

AI och automation ska inte beskrivas publikt. Utåt visas källor, urvalsmetod, kontrolldatum och redaktionellt ansvar.

## Jämförelsetabell och interaktion

Startsidan har korta ingångar för de tre behoven och tabellen direkt under. Inget obligatoriskt frågeformulär.

Valbara lägen Översikt och Fördjupning, med valbara kolumner och färdiga standarduppsättningar:

- Översikt: fond/ETF, marknadstäckning, årlig fondkostnad, billigaste verifierade leverantör och totalkostnad för scenariot.
- Fördjupning: ISIN, andelsklass, index, handelsvaluta, utdelande/ackumulerande, replikering, hållbarhetsurval och kostnadsdelar. Sharpekvot är ett möjligt historiskt fördjupningsmått, ännu inte ett krav; metod och period måste i så fall vara tydliga och måttet får inte styra kostnadsrankningen.

Klickbara informationsknappar fungerar med mus, tryck och tangentbord. Kort förklaring nära siffran, ”Läs mer” till metod, exempel och källor. Antaganden som ändrar resultatet syns direkt. Hover ensamt är aldrig tillräckligt, eftersom det varken finns på touch eller nås med tangentbord. Samma tryckbara komponent används på mobil och dator och skiljer sig bara i placering.

Billigaste verifierade köpväg markeras grönt med tillhörande text, exempelvis ”Billigast, valt scenario”, aldrig med enbart färg. Markeringen jämför horisontellt i raden, alltså leverantörer för samma produkt och andelsklass. Den utser aldrig billigaste produkt mellan olika rader, eftersom kostnadsrankning inte får dölja skillnader i innehåll eller risk. Vid lika lägsta kostnad markeras samtliga. Är underlaget för tunt visas ”utses inte” i stället för en markering.

Affiliatemärket visas vid varje partner oavsett placering, även på den dyraste leverantören i raden och i rader utan grön markering. Ett märke som bara förekommer vid markerade alternativ ser köpt ut även när rankningen är korrekt uträknad.

Brytpunkten mellan ETF och jämförbar fond ska vara åtkomlig direkt från ETF-raderna, inte bara i metodtexten. Underlag i docs/research/lagsta-avgifter-och-kostnadsoptimering.md: valutaväxling betalas vid varje köp, vilket gör att en ETF med lägre löpande avgift kan sakna brytpunkt helt vid månadssparande. Exakta tal är inte verifierade.

Tema, kolumner och scenario sparas lokalt utan konto, med Återställ. ”Kopiera jämförelselänk” delar samma produkturval och scenario. ”Rapportera fel” vid varje rad öppnar ett mejl med produkt och leverantör förifyllda.

Inga egna permanenta produktsidor. Länka till externa produktsidor för fördjupning, produktägarens faktablad, leverantörernas produkter/prislistor och relevanta forumtrådar. justETF är en möjlig ETF-länkkälla. Egna beräkningar kräver ändå kontrollerade underlagsdata.

## Kostnadsscenarier och metod

Gemensamt ändringsbart scenario räknar om tabellen. Tre förvalda exempel: 2 000 kr/mån, engångsinsättning 100 000 kr och större kapital 1 000 000 kr. Standardperiod 10 år och ingen belåning. Fördjupade antaganden kan hantera leverantörens kapitalnivå och köp/sälj; inga personliga kontokopplingar.

Efter research godkändes 7 % nominell årlig bruttoavkastning som ändringsbart standardantagande för jämförbara aktiealternativ. Visa ”Gemensamt räkneantagande före avgifter och inflation, ingen prognos”. Detta isolerar kostnadseffekter och påstår inte att produkterna får samma verkliga avkastning. Hantering av fondrobotar med annan aktieandel återstår att precisera. Avkastningsantagandet får inte hämtas individuellt från historiska fondvinnare.

Visa kostnader i kronor och procent, med köp, löpande kostnader och sälj åtskilda. Skilj summan avgifter från avgifternas totala effekt inklusive utebliven tillväxt. Skillnaden mellan de två talen är ränta-på-ränta-effekten och ska förklaras i klartext intill siffrorna, eftersom det är den effekten som motiverar långsiktigt fondsparande. Förklaringen är redaktionell text om mekanismen och om vad räkneantagandet 7 % är och inte är, inte en prognos för besökarens kapital. Visa inte förväntat slutkapital. Beräkna procentavgifter på utvecklat kapital. Undvik att dra fondavgift igen från historisk nettoavkastning. Research och räkneexempel finns i docs/research/kostnadsmetod.md.

Försäljning ingår INTE som standard. Separat kolumn för beräknad säljkostnad inklusive valutaväxling. Avmarkerad ruta ”Sälj hela placeringen vid periodens slut” inkluderar sälj i totalen när den väljs. Standardtotal märks ”exklusive försäljning”.

Ordinarie avgifter är standard. Tillfälliga erbjudanden visas separat och räknas in först när scenariots villkor uppfylls. Visa giltighet och kostnad efter erbjudandet. Beräkna om möjligt brytpunkt mellan ETF och jämförbar fond, när lägre löpande avgift väger upp extra transaktionskostnad; redovisa exponeringsskillnader och antaganden.

Engångskapital kan sättas in direkt eller successivt över 6 eller 12 månader. Alternativet 3 månader är bortvalt. Väntande kapital får ändringsbar sparkontoränta som redovisas separat. Vanguards 68-procentsresultat för tre insättningar får inte etiketteras som evidens för 6 eller 12 månader.

## Belåning

Jämför hypotetiska exempelportföljer och fond/ETF-val, inte besökarens privata innehav. Håll det enkelt: val av exempel/innehav, exempelbelopp och önskat lån, med detaljer utfällbara. Visa låneutrymme, räntekostnad, koncentrationsvillkor och vad som påverkar rabattnivåer.

Stresstest för börsfall, högre ränta och sänkta belåningsvärden ingår. Visa när villkor inte längre uppfylls och risk för tvångsförsäljning. Ett tidigt ja till avkastningsscenarier är senare avgränsat av fokus på jämförelse utan vinstprognoser. Exakta regelformler och exempelportföljer är inte fastställda.

## Forskning och innehåll

Första versionens guider: global indexinvestering, fondrobot kontra egna fonder, ETF-kostnader och belåningsrisk. Kort slutsats, begränsningar, betydelse för jämförelsen och fördjupning. Direktlänka publicerade papers via DOI/förlag och fri fulltext där det finns. Leverantörsrapporter, myndighetsvägledning och forum ska särskiljas från vetenskapliga artiklar.

Ta med forskning som nyanserar eller motsäger utgångspunkterna, viktad efter kvalitet och relevans. Inget universellt ”index slår stockpicking i 9 av 10 fall” utan specifikt belägg. Forskningsstöd för principer bevisar inte att LYSA eller en enskild fond är bäst.

Beskriv forskningskopplade egenskaper, ingen binär märkning ”vetenskapligt bäst”: riskspridning, index, förvaltningsmetod, kostnad och avvikelser från bred marknadsportfölj.

Beteenderisk får synlig plats: sälja efter nedgång och köpa tillbaka efter återhämtning. Kalla inte detta ”vanligaste risken” utan belägg. Förklara psykologin vid successiv insättning och skilj den från månadssparande ur ny lön. Börssparande kräver lång horisont, med FI:s 5–10 år som vägledning, ingen garanti mot förlust efter fem år. Historiska avkastningsdata hör enbart hemma i forskningsfördjupning när nödvändigt, med period, valuta och real/nominell skillnad.

## Avsändare, finansiering och kontakt

Patrik står som namngiven avsändare och ansvarig för urvalet. Affiliate får finansiera tjänsten men inte styra rankning. LYSA ska kunna vara förstahandsval även om partnerprogram saknas; tillgängliga program är inte verifierade. Märk annonslänkar tydligt och redovisa ersättning/kopplingar.

Q56 godkänd: redovisa om Patrik själv äger lyfta produkter eller använder leverantörer, utan belopp, tillsammans med affiliatesamarbeten på ”Om jämförelsen”. Faktiska innehav har inte uppgetts och får inte hittas på.

Kontaktadress: `kontakt@buildapp.se`, tänkt vidarebefordran till `patz.lofgren@gmail.com` via ImprovMX, samma lösning som för kontakt@orgutveckling.se. Inställningen är inte gjord eller verifierad. Kontroll visade MX till Strato för buildapp.se och ImprovMX för orgutveckling.se.

En begriplig friskrivning och information om risk, ansvar, reklam och integritet behövs. Juridiskt underlag och slutlig text är inte granskade; en friskrivning får inte antas undanröja tillämpliga krav.

## Design och mätning

Claude Design ska ta fram två tydligt olika förslag med samma verkliga tabellinnehåll, mobil och dator samt ljust och mörkt tema. Egen visuell identitet inom buildapp.se, inte en kopia av Patriks andra sidor. Ljust, avskalat och redaktionellt, tydlig typografi och luftiga tabeller. Systemtema som standard, manuell växlare.

Designunderlag framtaget 2026-09-08: sex riktningar i `design/Investeringar Designriktningar.html` och Stitch-förslag A–E i `design/stitch/`. Vald grund: Stitch Förslag E som ytskikt (serif i rubriker och produktnamn, pappersvit bakgrund med mörkgrön accent, eyebrow-etiketter, luftig sektionsrytm, leverantörer som kolumner i matrisen, avslutande redaktionell text, affiliatemärkning inline med asterisk och fotnot) ovanpå riktning 07 som produktlogik (statusmärkning, kolumnväljare, tomt filterresultat med förklaring, Rapportera fel per rad).

Beslutat samtidigt: scenariot styrs av en läsbar mening med redigerbara värden, inte av reglage. Ingen prognossiffra för slutkapital i resultatrutorna. Språket är privatsparar-svenska, inte branschsvenska.

Statusmärkningen behålls även om allt underlag verifieras före lansering, eftersom uppgifter blir inaktuella efter publicering.

Densitet varierar med skärm, inte med antagen kunskapsnivå: dator får full matris med alla leverantörskolumner, mobil får enkel vy som standard med avancerad vy som eget val. Detta är inte progression mellan de tre behoven.

Tre publiker på samma sida: den som saknar förkunskap möts av redaktionell text, ingångarna och förklaringen av ränta-på-ränta. Den som vill ha snabb optimering möts av billigaste verifierade leverantör och en kort slutsats per rad. Den som vill fördjupa sig möts av avancerad vy med ISIN, andelsklass, replikering och uppdelade kostnader.

Tillgången till Claude Design är ännu inte verifierad och ingen design har implementerats.

Google Search Console och Cloudflare Web Analytics är valda för mätning. Google Business Profile är bortvalt efter kontroll av Googles villkor för rena webbtjänster. Ingen analytics är konfigurerad. Mätningen ska hållas inom nollbudgeten.
