#!/usr/bin/env python3
"""
Setzt einen frischen Zeitstempel hinter jede eingebundene Datei
(?v=JJJJMMTT-HHMM). Dadurch laedt jedes Handy nach einer Aenderung die
neue Fassung, statt die alte aus dem Zwischenspeicher zu zeigen.

    python3 tools/stempel.py      # vor jedem Commit ausfuehren
"""
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STEMPEL = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M")
MUSTER = re.compile(r'(\b(?:src|href)="[^"]+?\.(?:js|css))(?:\?v=[^"]*)?"')

geaendert = []
for datei in list(ROOT.glob("k/*/index.html")) + list(ROOT.glob("b/*/index.html")) + [ROOT / "editor/index.html", ROOT / "404.html"]:
    if not datei.exists():
        continue
    alt = datei.read_text(encoding="utf-8")
    neu = MUSTER.sub(lambda m: '%s?v=%s"' % (m.group(1), STEMPEL), alt)
    if neu != alt:
        datei.write_text(neu, encoding="utf-8")
        geaendert.append(str(datei.relative_to(ROOT)))

print("Stempel %s gesetzt in %d Dateien" % (STEMPEL, len(geaendert)))
for g in geaendert:
    print("  ", g)
