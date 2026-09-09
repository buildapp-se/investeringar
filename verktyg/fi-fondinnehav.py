"""Laser FI:s fondinnehavsregister och skriver ut avgift, index och bredd per ISIN.

FI publicerar en zip per kvartal med en XML per svensk vardepappersfond. Det finns
inget API; nedladdningen ar hela granssnittet. Se docs/research/fi-fondinnehav.md.

Kor:  uv run verktyg/fi-fondinnehav.py
      uv run verktyg/fi-fondinnehav.py --test

Bara standardbiblioteket. Ingen nyckel, ingen kostnad.

# ponytail: xml.etree utan defusedxml. Indata ar en zip vi hamtar sjalva fran
# fi.se over https och kor lokalt, alltsa ingen fientlig uppladdare. Byt till
# defusedxml den dag samma parser far lasa filer nagon annan valjer.
"""

import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from collections import Counter
from pathlib import Path

LISTSIDA = "https://www.fi.se/sv/vara-register/fondinnehav-per-kvartal/"
NS = "{http://schemas.fi.se/publika/vardepappersfonder/20200331}"

# Fonderna i urvalet som ar svenska vardepappersfonder. DNB Global Indeks S ar
# norsk och ETF:erna ar irlandska, sa de finns inte i registret.
URVAL = {
    "SE0005188836": "Länsförsäkringar Global Index",
    "SE0011527613": "Avanza Global",
    "SE0000671919": "Storebrand Global All Countries",
    "SE0007074059": "Swedbank Robur Access Global",
}


class FatalError(Exception):
    """Gar inte att atgarda genom att forsoka igen."""


def senaste_zip_url():
    """Hamtar URL:en till det senast publicerade kvartalet.

    :raises FatalError: om listsidan inte innehaller nagon nedladdningslank.
    """
    with urllib.request.urlopen(LISTSIDA) as svar:
        html = svar.read().decode("utf-8", "replace")
    traffar = re.findall(r'href="(/FondInnehavLista/download\?filnamn=[^"]+)"', html)
    if not traffar:
        raise FatalError("Hittade ingen nedladdningslank pa FI:s listsida")
    # Sidan listar nyast forst. Filnamnen innehaller mellanslag i klartext,
    # som urllib vagrar skicka, sa fragan maste kodas om.
    sokvag, _, fraga = traffar[0].replace("&amp;", "&").partition("?")
    return "https://www.fi.se" + sokvag + "?" + urllib.parse.quote(fraga, safe="=&")


def hamta(url, mal):
    """Laddar ner url till mal om filen inte redan finns. Returnerar sokvagen."""
    mal = Path(mal)
    if not mal.exists():
        mal.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(url, mal)
    return mal


def las_fond(xml_bytes):
    """Plockar ut de falt vi jamfor pa ur en fondrapport.

    Returnerar avgift per andelsklass, index, antal innehav och antal
    emittentlander. Bredden raknas ur innehaven, inte ur marknadsforingstext.
    """
    rot = ET.fromstring(xml_bytes)
    fond = rot.find(NS + "Fondinformation")
    if fond is None:
        raise FatalError("Rapporten saknar Fondinformation")

    avgifter = {}
    utan = fond.findtext(f"{NS}Förvaltningsavgift/{NS}UtanAndelsklasser/{NS}Förvaltningsavgift_fast")
    if utan:
        avgifter[""] = float(utan)
    for post in fond.iter(NS + "Förvaltningsavgift"):
        namn = post.findtext(NS + "Andelsklass_namn")
        fast = post.findtext(f"{NS}Förvaltningsavgift_Typ/{NS}Förvaltningsavgift_fast")
        if namn and fast:
            avgifter[namn.strip()] = float(fast)

    innehav = list(fond.iter(NS + "FinansielltInstrument"))
    lander = Counter((e.findtext(NS + "Landkod_Emittent") or "?") for e in innehav)

    return {
        "namn": (fond.findtext(NS + "Fond_namn") or "").strip(),
        "isin": (fond.findtext(NS + "Fond_ISIN-kod") or "").strip(),
        "kvartal": rot.findtext(f"{NS}Rapportinformation/{NS}Kvartalsslut"),
        "avgifter": avgifter,
        "index": [t.strip() for t in (e.text or "" for e in fond.iter(NS + "Jämförelseindex")) if t.strip()],
        "formogenhet": float(fond.findtext(NS + "Fondförmögenhet") or 0),
        "std24": fond.findtext(NS + "Standardavvikelse_24_månader"),
        "innehav": len(innehav),
        "lander": len(lander),
        "topplander": lander.most_common(5),
    }


def kor(zipfil):
    """Skriver ut en rad per fond i urvalet som hittas i zipfilen."""
    z = zipfile.ZipFile(zipfil)
    hittade = set()
    for namn in z.namelist():
        if not namn.endswith(".xml"):
            continue
        radata = z.read(namn)
        if not any(isin.encode() in radata[:4000] for isin in URVAL):
            continue
        f = las_fond(radata)
        if f["isin"] not in URVAL:
            continue
        hittade.add(f["isin"])
        print(f"\n== {f['namn']}  ({f['isin']}, kvartalsslut {f['kvartal']})")
        for klass, avgift in f["avgifter"].items():
            print(f"   avgift {avgift:.2f} %  {klass or '(utan andelsklasser)'}")
        print(f"   index: {', '.join(f['index']) or 'saknas'}")
        print(f"   formogenhet {f['formogenhet'] / 1e9:.1f} mdkr, std.avv 24 man {f['std24']}")
        print(f"   bredd: {f['innehav']} innehav i {f['lander']} lander, topp {f['topplander']}")

    for isin, namn in URVAL.items():
        if isin not in hittade:
            print(f"\n!! {namn} ({isin}) saknas i detta kvartal")


def sjalvtest():
    """Kontrollerar parsningen mot en rapport med kanda varden."""
    prov = f"""<?xml version="1.0" encoding="utf-8"?>
<Värdepappersfondinnehav xmlns="{NS[1:-1]}">
  <Rapportinformation><Kvartalsslut>2026-06-30</Kvartalsslut></Rapportinformation>
  <Fondinformation>
    <Fond_ISIN-kod>SE0000671919</Fond_ISIN-kod>
    <Fond_namn>Testfond</Fond_namn>
    <Förvaltningsavgift>
      <MedAndelsklasser>
        <Förvaltningsavgift>
          <Andelsklass_namn>A SEK</Andelsklass_namn>
          <Förvaltningsavgift_Typ><Förvaltningsavgift_fast>0.30</Förvaltningsavgift_fast></Förvaltningsavgift_Typ>
        </Förvaltningsavgift>
        <Förvaltningsavgift>
          <Andelsklass_namn>C SEK</Andelsklass_namn>
          <Förvaltningsavgift_Typ><Förvaltningsavgift_fast>0.15</Förvaltningsavgift_fast></Förvaltningsavgift_Typ>
        </Förvaltningsavgift>
      </MedAndelsklasser>
    </Förvaltningsavgift>
    <Fondförmögenhet>1000</Fondförmögenhet>
    <Jämförelseindex><Jämförelseindex>MSCI All Countries Net Return USD</Jämförelseindex></Jämförelseindex>
    <FinansiellaInstrument>
      <FinansielltInstrument><Landkod_Emittent>US</Landkod_Emittent></FinansielltInstrument>
      <FinansielltInstrument><Landkod_Emittent>US</Landkod_Emittent></FinansielltInstrument>
      <FinansielltInstrument><Landkod_Emittent>JP</Landkod_Emittent></FinansielltInstrument>
    </FinansiellaInstrument>
  </Fondinformation>
</Värdepappersfondinnehav>"""
    f = las_fond(prov.encode("utf-8"))
    assert f["isin"] == "SE0000671919", f["isin"]
    assert f["avgifter"] == {"A SEK": 0.30, "C SEK": 0.15}, f["avgifter"]
    assert f["index"] == ["MSCI All Countries Net Return USD"], f["index"]
    assert f["innehav"] == 3 and f["lander"] == 2, (f["innehav"], f["lander"])
    assert f["topplander"][0] == ("US", 2), f["topplander"]

    tom = '<?xml version="1.0"?><Tom xmlns="%s"/>' % NS[1:-1]
    try:
        las_fond(tom.encode("utf-8"))
    except FatalError:
        pass
    else:
        raise AssertionError("Rapport utan Fondinformation skulle ha kastat FatalError")

    print("sjalvtest ok")


if __name__ == "__main__":
    if "--test" in sys.argv:
        sjalvtest()
    else:
        url = senaste_zip_url()
        print(f"Hamtar {url}")
        kor(hamta(url, Path(__file__).parent / ".cache" / url.rsplit("=", 1)[-1].replace("%20", " ")))
