# Investeringar

## Syfte och omfattning

Publik svensk sajt på `buildapp.se/investeringar/` för den som inte vet vad ränta på ränta kan ge. Poängen är att visa det, först och tydligt, och sedan peka mot billiga globala indexfonder och forskningen bakom. Svenska privatpersoner, SEK och ISK. Budget: 0 kr i extra löpande kostnader.

**Omläggning 2026-09-24 (Patrik):** för mycket text, det man vill se kom efter brus. Avgiftseffekt, "utebliven tillväxt", brytpunkt ETF mot fond, courtage per köp, belåningskalkylator, statusmärkning ("Ej verifierat", "Utses inte") och brasklappstext är borttagna. Tidigare beslut om "ingen prognossiffra för slutkapital" och "kostnadsjämförelsen är motorn" är upphävda: räknaren visar slutvärdet.

Stil: kort, rakt, inga "å ena sidan"-formuleringar. Saknad uppgift visas som "–", utan förklarande text. Rubriker på forskningen i formen "Därför kan du inte tajma marknaden".

## Sidorna

- **Ränta på ränta (index.html):** inforuta om att det inte är finansiell rådgivning, sedan räknaren (kr/mån, engångsbelopp, år, % per år) och fyra rutor: Du sätter in, Ränta på ränta ger, Du har efter X år, samt länk till "Därför ska du inte handla enskilda aktier" på forskningssidan. Under det en avancerad vy (native `details`, stängd som standard) med fondtabellen och fondrobotarna. Därefter länkar (RikaTillsammans, Bogleheads, Småspararguiden, justETF, FI) och kort slutsats och metod.
- **Fondtabellen:** fond, antal innehav i antal länder (FI:s register), fondavgift, och årlig kostnad per plattform (Avanza, Nordnet, Montrose, SAVR) = fondavgift plus plattformens avgift. Montrose och SAVR betalar tillbaka fondprovisionen och publicerar inte nettot per fond, så där visas "högst X %". Fondo är struken.
- **ETF och belåning (etf-belaning.html):** en tabell med 17 breda ETF:er grupperade (hela världen, utvecklade, tillväxt, småbolag och faktorer): ticker, avgift, innehav, länder, index, replikering, hemvist, storlek, start. Belåning: fyll i eget kapital och se per plattform lägsta ränta, största lån till den räntan, räntekostnad och hur portföljen ska byggas. Under det räntetrappa och villkor per plattform samt belåningsvärde per värdepapper.
- **Forskning (forskning.html):** bara rubrik plus länk och en rad källa. Underlaget med kontrollerat fynd per källa ligger i docs/research/forskningslankar.md.

Inga fristående räntefonder. Pengar som behövs inom några år: sparkonto med insättningsgaranti.

## Leverantörer och produkturval

Avanza, Nordnet, Montrose och SAVR för fonder. Fondrobotar: Nordnet One, Lysa, Avanza Auto, Opti. Belåning: Avanza, Nordnet, Montrose (SAVR och Lysa har ingen). Listan är handplockad, inte hela marknaden. Kandidater hittas via RikaTillsammans, Småspararguiden och Bogleheads; forumtrådar används för att hitta produkter, länkas inte från sajten.

Alla siffror läses på bolagens egna publika sidor, utan inloggning. Montrose visar sitt fondutbud och belåningsvärden bara i appen.

## Redaktionellt flöde

Patrik och AI arbetar via projektfiler, ingen adminsida. Inkorgen högst upp i BACKLOG.md tar emot fondnamn, ETF:er, forumlänkar och korta kommentarer. Ofärdiga fynd förblir interna tills uppgifter och källor kontrollerats. Inga konton, bankkopplingar eller egna innehav.

Varje uppgift har källa och datum i docs/research/. På sajten visas bara ett samlat kontrolldatum.

Veckovisa kontroller och manuell körning via AI är målbilden. Automatisk hämtning används där tillförlitliga källor tillåter och gratis drift räcker. Det är inte tekniskt verifierat ännu. Alla innehållsändringar, även avgifter, ska inledningsvis godkännas av Patrik före publicering. Samla ändringar i en pull request med vad, varför, källor, påverkan och gärna förhandsvisning. GitHub-mejl med granskningslänk; Patrik gör Merge efter godkända kontroller. Endast ändringar och kontrollfel ska kräva uppmärksamhet.

AI och automation ska inte beskrivas publikt. Utåt visas källor, urvalsmetod, kontrolldatum och redaktionellt ansvar.

## Avsändare, finansiering och kontakt

Patrik står som namngiven avsändare och ansvarig för urvalet. Affiliate får finansiera tjänsten men inte styra rankning. LYSA ska kunna vara förstahandsval även om partnerprogram saknas; tillgängliga program är inte verifierade. Märk annonslänkar tydligt och redovisa ersättning/kopplingar.

Q56 godkänd: redovisa om Patrik själv äger lyfta produkter eller använder leverantörer, utan belopp, tillsammans med affiliatesamarbeten på ”Om jämförelsen”. Faktiska innehav har inte uppgetts och får inte hittas på.

Kontaktadress: `kontakt@buildapp.se`, tänkt vidarebefordran till `patz.lofgren@gmail.com` via ImprovMX, samma lösning som för kontakt@orgutveckling.se. Inställningen är inte gjord eller verifierad. Kontroll visade MX till Strato för buildapp.se och ImprovMX för orgutveckling.se.

En begriplig friskrivning och information om risk, ansvar, reklam och integritet behövs. Juridiskt underlag och slutlig text är inte granskade; en friskrivning får inte antas undanröja tillämpliga krav.

## Design och mätning

Stitch Förslag E som ytskikt: serif i rubriker, pappersvit bakgrund, mörkgrön accent. Systemtema som standard, manuell växlare. Scenariot styrs av en läsbar mening med redigerbara fält, inte reglage.

Google Search Console och Cloudflare Web Analytics är valda för mätning, inom nollbudgeten. Ingen analytics är konfigurerad.

## Audits
Read by the cockpit Audits tab. One `- Label: YYYY-MM-DD, result` per check; conventions in elwyn-dash `docs/security.md`.
- Headers: 2026-09-16, pass, 6 of 6 on buildapp.se via a host-scoped Transform Rule on the zone, measured after the change
- TLS: 2026-09-16, pass, SSL Labs A+ on buildapp.se, TLS 1.2 minimum and HSTS since today
- Lighthouse: 2026-09-16, pass, a11y 100 after the contrast fix, best practices 100, SEO 60 (noindex by design, meta description added) (mobile, no perf)
- Markup: 2026-09-16, pass, W3C 0 errors after the fix; 0 broken links
- UX: 2026-09-16, warn, 2 targets under 44 px left after the fix (two 13 px checkboxes, the label is the target), number fields not interact-tested
