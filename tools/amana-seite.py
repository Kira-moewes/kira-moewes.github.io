#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut aus der Artefakt-Fassung der Amana-Seite die oeffentliche Seite unter amana/.

Aufruf:  python3 tools/amana-seite.py <pfad/zur/karten.html>
Die Artefakt-Datei traegt eine technische Huelle am Anfang; die wird hier
durch einen richtigen <head> ersetzt und die Fusszeile um Impressum und
Datenschutz ergaenzt. Alles andere bleibt Wort fuer Wort gleich.
"""
import io, sys, os

QUELLE = sys.argv[1] if len(sys.argv) > 1 else None
ZIEL   = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "amana", "index.html")

if not QUELLE or not os.path.exists(QUELLE):
    sys.exit("Bitte die Artefakt-Datei angeben: python3 tools/amana-seite.py <karten.html>")

s = io.open(QUELLE, encoding="utf-8").read()

i = s.index('<link rel="preconnect"')
rumpf = s[i:].rstrip()
assert rumpf.endswith("</body></html>")
rumpf = rumpf[: -len("</body></html>")].rstrip()
rumpf = rumpf.replace("<title>Amana Karten</title>\n", "", 1)

KOPF = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Amana — Digitale Visitenkarten und Bewertungskarten</title>
<meta name="description" content="NFC-Karten mit eigener Seite: Kontaktdaten speichern oder bewerten, ohne App und ohne Abtippen.">
<meta name="robots" content="noindex,nofollow">
"""

marke = '<div id="progress"></div>'
assert marke in rumpf
rumpf = rumpf.replace(marke, "</head>\n<body>\n\n" + marke, 1)

alt = '<p><a href="#top">Nach oben</a></p>'
neu = '<p><a href="./impressum.html">Impressum</a> · <a href="./datenschutz.html">Datenschutz</a> · <a href="#top">Nach oben</a></p>'
if alt in rumpf:
    rumpf = rumpf.replace(alt, neu)

io.open(ZIEL, "w", encoding="utf-8").write(KOPF + rumpf + "\n\n</body>\n</html>\n")
print("geschrieben:", ZIEL)
