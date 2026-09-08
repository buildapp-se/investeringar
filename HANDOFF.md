---
schemaVersion: 1
status: active
currentGoal: Faktakontrollera underlaget så att prototypens demodata kan bytas mot verifierade uppgifter.
nextAction: Kör design/prototyp (node server.mjs), stäm av den mot CONTEXT.md och börja på P1-faktakontrollen, med Fondos prislista först.
blockers: []
reviewedAt: 2026-09-08
---

# Överlämning

## Läget

Produktintervjun har nått Q56, godkänd: Patriks egna produkt- och leverantörskopplingar redovisas utan belopp. Den samlade, korrigerade kravbilden finns i CONTEXT.md. Fortsätt inte att fråga om redan godkända val. Användaren har blivit frustrerad över att agenten tappat fortsättningen och upprepat enkla bekräftelsefrågor.

Projektmappen är nu ett git-repo med tre commits. En designprototyp finns i `design/prototyp/`: Stitch Förslag E som ytskikt på designriktning 07:s produktlogik, med enbart demodata. Avgiftsberäkningen i `avgifter.js` är kontrollerad mot räkneexemplet i `docs/research/kostnadsmetod.md` och testet körs med `node test-avgifter.mjs`. Ingen deployment, hosting eller mejlkonfiguration har utförts, och inget samlat bygggodkännande för själva tjänsten har getts. Fyndens externa fakta är inte generellt verifierade. Antigravity har arbetat parallellt i researchmappen; läs aktuell fil före ändring.

## Nästa steg

1. Kontrollera återstående fakta om kostnadsfri datainsamling, Claude Design-tillgång, affiliateprogram och publicerings-/reklamregler. Detta är agentens researcharbete, inte frågor användaren ska behöva lösa.
2. Reducera återstående grillning till verkliga öppna val: gräns för inaktuella data, metod för riskmässigt olika fondrobotar, omfattning av första belåningsexemplen och exakt kostnadsdefinition/skattehantering. Ställ en materiell fråga i taget och ge motiverat förslag. Hitta inte på fler frågor för att hålla intervjun igång.
3. Presentera samlad kravbild för uttrycklig bekräftelse att gemensam förståelse nåtts innan implementation, enligt grilling-skillen. Användaren har inte gett ett samlat bygggodkännande.
4. Gör designbrief med verkligt exempel på jämförelsetabell till två Claude Design-förslag. Om mänsklig överföring behövs ska hela prompten visas i svaret, inte bara en filhänvisning.

Arbetet som återstår finns i BACKLOG.md. Ingen ny tjänst, kostnad, hemlighet eller extern publicering är godkänd genom denna överlämning.

## Researchstatus

docs/research/README.md listar material från flera agenter. Antigravitys fem breda sammanställningar är lästa men innehåller obelagda eller kategoriska påståenden; faktakontroll är uttryckligen lagd i backloggen. Papers i forskningsunderlag.md är till stor del abstractscreening, inte fulltextgranskning.

kostnadsmetod.md innehåller metodkällor från FI, FINRA, SEC och Pensionsmyndigheten samt ett exekverat förenklat räkneexempel. Beslut om gränssnitt och antaganden är auktoritativt i CONTEXT.md. beteende-och-sparhorisont.md innehåller källor om beteende, insättning och horisont.

## Arbetsyta

Arbeta i C:\dev\investeringar. Följ global boot i C:\dev\CLAUDE.md. C:\dev får aldrig bli git-repo. rg saknades i denna PowerShell-session; Get-ChildItem/Get-Content fungerade. Ett komplicerat läskontrolluttryck felklassificerades av dcg, enkel Get-Content fungerade utan utökade rättigheter.
