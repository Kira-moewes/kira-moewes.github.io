#!/usr/bin/env python3
"""
Legt eine neue Bewertungskarte an.

    python3 tools/neue-bewertungskarte.py "Salon Nord" \
        --google "https://g.page/r/XXXX/review"

Ergebnis: Ordner b/<name>/ mit index.html und bewertung-daten.js.
Den Google-Link findest du im Unternehmensprofil unter
"Rezension schreiben" -> Link kopieren.
"""
import argparse
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VORLAGE = ROOT / "b" / "_vorlage"


def slugify(text: str) -> str:
    text = (text.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue")
                .replace("Ä", "ae").replace("Ö", "oe").replace("Ü", "ue").replace("ß", "ss"))
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower() or "betrieb"


def main() -> int:
    ap = argparse.ArgumentParser(description="Neue Bewertungskarte anlegen")
    ap.add_argument("name", help='Name des Betriebs, z. B. "Salon Nord"')
    ap.add_argument("--slug", help="Adresse der Karte, sonst aus dem Namen abgeleitet")
    ap.add_argument("--google", default="", help="Link zum Bewertungsformular")
    ap.add_argument("--frage", default="Wie war es bei uns?")
    ap.add_argument("--ueberschreiben", action="store_true")
    a = ap.parse_args()

    if not VORLAGE.is_dir():
        print("Vorlage fehlt: %s" % VORLAGE, file=sys.stderr)
        return 1

    slug = slugify(a.slug or a.name)
    ziel = ROOT / "b" / slug
    if ziel.exists():
        if not a.ueberschreiben:
            print("Ordner existiert bereits: b/%s  (mit --ueberschreiben erzwingen)" % slug, file=sys.stderr)
            return 1
        shutil.rmtree(ziel)
    shutil.copytree(VORLAGE, ziel)

    daten = ziel / "bewertung-daten.js"
    inhalt = daten.read_text(encoding="utf-8")
    inhalt = inhalt.replace('name:  "BETRIEBSNAME"', 'name:  "%s"' % a.name.replace('"', '\\"'))
    inhalt = inhalt.replace('frage: "Wie war es bei uns?"', 'frage: "%s"' % a.frage.replace('"', '\\"'))
    inhalt = inhalt.replace('{ icon: "google", label: "Bei Google bewerten", url: "" }',
                            '{ icon: "google", label: "Bei Google bewerten", url: "%s" }' % a.google)
    daten.write_text(inhalt, encoding="utf-8")

    print("Bewertungskarte angelegt: b/%s/" % slug)
    print("  1. Link pruefen:      b/%s/bewertung-daten.js" % slug)
    print("  2. Stempel setzen:    python3 tools/stempel.py")
    print("  3. Adresse fuer Chip: https://kira-moewes.github.io/b/%s/" % slug)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
