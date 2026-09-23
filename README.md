# Digitale Visitenkarten (Dune-Stil)

Eine Seite pro Kunde. Jede Karte zeigt nur die Daten dieses einen Kunden,
liegt unter einer eigenen Adresse und lässt sich auf eine NFC-Karte oder einen
QR-Code schreiben. Kein Server, keine Datenbank, keine laufenden Kosten –
nur Dateien, die GitHub Pages kostenlos ausliefert.

Funktionsumfang wie unit.link: Profil, Schnellkontakt, gruppierte Links,
„Kontakt speichern" als `.vcf`, Teilen, QR-Code.

## Zwei Kartentypen

| Typ | Ordner | Wofür |
|---|---|---|
| Visitenkarte | `k/<name>/` | Kontaktdaten einer Person, „Kontakt speichern" |
| Bewertungskarte | `b/<betrieb>/` | liegt an der Theke, ein Tipp führt ins Bewertungsformular |

Beide sehen gleich aus, beide laufen über dieselbe Technik. Neue
Bewertungskarte anlegen:

```bash
python3 tools/neue-bewertungskarte.py "Salon Nord" --google "https://g.page/r/XXXX/review"
```

**Den richtigen Google-Link finden** — es muss der Link zum *Formular* sein,
nicht zum Eintrag:

- **Mit Zugang:** Der Betrieb öffnet sein Google-Unternehmensprofil →
  *Rezensionen* → *Mehr Rezensionen erhalten*. Der Link sieht so aus:
  `https://g.page/r/XXXXXXXXXXXX/review`
- **Ohne Zugang:** In Google Maps den Betrieb suchen, auf *Rezension
  schreiben* tippen, die Adresse aus der Adresszeile kopieren.

Ein Link, der nur `google.com` oder die Firmenseite öffnet, ist falsch —
dann landet der Gast in der Suche statt im Bewertungsfenster. Fehlt der
Link ganz, zeigt die Karte einen Hinweis statt eines Knopfes ins Leere. Der Chip zeigt auf deine Seite, nicht
direkt auf Google — so lässt sich das Ziel später ändern, ohne die Karten
beim Kunden einzusammeln.

## Ordner

```
index.html                 leitet auf die eigene Karte weiter
k/kira/                    eigene Karte
k/demo-kunde/              Beispielkunde (zeigt eigene Markenfarben)
k/_vorlage/                Vorlage – bleibt unangetastet
editor/                    Karten-Editor im Browser (Formular + Vorschau)
tools/neue-karte.py        legt neue Kundenkarten an
assets/css/style.css       Design
assets/js/app.js           Technik (vCard, Teilen, QR, Farben)
assets/js/brand.js         Signatur in der Fußzeile ALLER Karten
assets/js/vendor/          QR-Bibliothek, lokal
assets/img/                Logo, Favicon
```

Jede Karte ist ein Ordner mit genau zwei Dateien: `index.html` (unverändert)
und `profil.js` (die Daten). Ein Kunde kann die Daten anderer Kunden nicht
sehen – seine Seite lädt nur seine eigene Datei.

## Kontaktdaten ändern

Es gibt für jeden Kunden eine eigene Seite, und jede Seite hat genau eine
Datendatei: `k/<kunde>/profil.js`. Wer eine Nummer ändern will, ändert diese
eine Datei. Drei Wege, je nachdem wie technisch es sein darf:

**A · Editor im Browser (kein Code).** `https://DEINE-DOMAIN/editor/` öffnen →
*Bestehende Karte einlesen* → Inhalt der bisherigen `profil.js` einfügen →
Felder ändern, rechts live sehen → *profil.js herunterladen* oder *Text
kopieren*. Danach auf GitHub in den Kartenordner gehen, `profil.js` öffnen,
Stift-Symbol, Inhalt ersetzen, *Commit changes*. Nach ein bis zwei Minuten ist
die Karte aktuell.

**B · Direkt auf GitHub.** Datei `k/<kunde>/profil.js` öffnen, Stift-Symbol,
Wert zwischen den Anführungszeichen austauschen, *Commit changes*. Schnellster
Weg für eine einzelne Telefonnummer.

**C · Lokal.** Datei im Editor ändern, dann `python3 tools/stempel.py`, `git commit`, `git push`.

**Wichtig bei jeder Änderung:** Handys speichern Seiten zwischen und zeigen
sonst tagelang die alte Fassung. `tools/stempel.py` hängt einen frischen
Zeitstempel an jede eingebundene Datei und erzwingt damit das Neuladen.
Wer über die GitHub-Oberfläche arbeitet, bearbeitet zusätzlich die
`index.html` der betroffenen Karte und ändert dort die Zahl hinter `?v=`.

Die Adresse der Karte bleibt bei jeder Änderung gleich – der NFC-Chip muss nie
neu beschrieben werden.

## Neue Kundenkarte anlegen

```bash
python3 tools/neue-karte.py "Lena Harkonnen" \
  --firma "Atelier Nord" --rolle "Inhaberin" \
  --mail hallo@atelier-nord.de --mobil "+49 170 1234567"
```

Ergebnis: `k/lena-harkonnen/`. Danach `profil.js` fertig ausfüllen (Links,
Kurztext, Farben), committen, pushen. Zwei Minuten später ist die Karte live
unter `https://DEINE-DOMAIN/k/lena-harkonnen/`.

### Was in `profil.js` steht

| Feld | Bedeutung |
|---|---|
| `firstName`, `lastName`, `role`, `company` | Kopf der Karte und Adressbuch-Eintrag |
| `bio` | optionale Sachzeile, darf leer bleiben |
| `logo`, `photo` | Dateien in denselben Ordner legen, Name hier eintragen |
| `contact` | Telefon, Mobil, E-Mail, Website, WhatsApp, Adresse – landen in der `.vcf` |
| `groups` | beliebig viele Blöcke mit beliebig vielen Links |
| `theme` | optionale Markenfarben des Kunden |
| `footer` | Impressum, Datenschutz |

Leere Felder verschwinden automatisch – eine Karte ohne WhatsApp zeigt keinen
WhatsApp-Knopf.

### Einheitliches Design

Alle Karten sehen gleich aus: Der obere Teil der Seite ist ein komplett
schwarzes Band, in dem das Markenlogo steht – kein Profilbild, kein Rahmen.
Darunter beginnt das Dünenbild, zurückhaltend als Silhouette am unteren Rand.
Die Karte arbeitet mit Haarlinien statt Kacheln, ohne Leuchteffekte und ohne
Farbverläufe – näher an gedruckter Typografie als an einer Web-Vorlage. Das Logo liegt einmal unter
`assets/img/logo.png` – wird es dort ausgetauscht, ändern sich alle Karten
gleichzeitig.

Auf der Karte stehen nur Kontaktdaten und Links. Slogans gibt es nicht; das
Feld `bio` ist eine optionale Sachzeile und darf leer bleiben. Die Signatur in der
Fußzeile steht in `assets/js/brand.js` und gilt ebenfalls für alle Karten.

Der Inhalt unterscheidet sich, das Design nicht. So bleibt jede verkaufte Karte
sichtbar ein Stück deiner Marke.

Falls für einen Einzelfall doch andere Farben nötig sind, versteht eine Karte
zusätzlich ein `theme`, das die Hauptfarbe austauscht:

```js
theme: { ember: "#3F8F86", emberHi: "#7FD6CF", sand: "#EAF4F3" },
```

Das ist bewusst die Ausnahme und in keiner Karte aktiv.

## Physische Karte mit der Seite verbinden

Zwei Wege, beide funktionieren gleichzeitig:

**NFC-Chip beschreiben – eine kostenlose App reicht.** „NFC Tools" von wakdev
ist auf iPhone und Android gratis; eine URL zu schreiben gehört zum
Grundumfang. Die Pro-Edition (rund 4 € einmalig, kein Abo) braucht man nur für
Zusatzsachen wie Tags kopieren, Passwortschutz oder Automatisierungen.

Ablauf: App öffnen → *Schreiben* → *Datensatz hinzufügen* → *URL/URI* →
`https://DEINE-DOMAIN/k/kundenname/` eintragen → *Schreiben* → Karte an die
Rückseite des Handys halten, bis die Bestätigung kommt. Danach Karte einmal
mit einem anderen Handy testen.

Voraussetzungen: Handy mit NFC (iPhone 7 oder neuer, die meisten Android-Geräte
ab Mittelklasse). Die Adresse ist kurz, der Speicher jedes üblichen NTAG-Chips
reicht dafür locker.

Sperren („schreibgeschützt", „read-only") erst ganz am Ende und nur, wenn die
Domain endgültig steht – das ist unumkehrbar. Ob diese Funktion in der
Gratisversion liegt, zeigt die App selbst an.

Ein Punkt bleibt zu prüfen: ob die Chips deiner Karten frei beschreibbar oder
ab Werk auf einen Anbieter gesperrt sind. Karten, die mit einer eigenen
Plattform verkauft wurden, sind manchmal fest verdrahtet – dann hilft keine
App, sondern nur ein neuer Kartenrohling.

**QR-Code aufdrucken.** Die Karte selbst zeigt ihren QR-Code über den Knopf
*QR-Code*; für den Druck erzeugst du ihn mit einem beliebigen QR-Generator aus
derselben Adresse. Der QR-Code funktioniert auf jedem Handy, auch ohne NFC.

Wichtig: Der Chip speichert nur die Adresse, nicht die Daten. Ändert ein Kunde
seine Telefonnummer, änderst du `profil.js` – die Karte in seiner Tasche bleibt
unverändert und zeigt sofort das Neue. Umgekehrt gilt: Die Adresse darf sich
nie ändern, sonst zeigen verkaufte Karten ins Leere.

## Veröffentlichen (GitHub Pages)

1. Repository → **Settings** → **Pages**
2. *Source*: „Deploy from a branch", Branch dieses Codes, Ordner `/ (root)`
3. Eigene Domain: unter *Custom domain* eintragen und beim Domain-Anbieter
   einen CNAME auf `<benutzername>.github.io` setzen.

Eine kurze eigene Domain ist beim Verkauf mehr wert als die lange
github.io-Adresse – die Adresse steht dauerhaft auf der Karte des Kunden.

## Lokal ansehen

```bash
python3 -m http.server 8080
# http://localhost:8080/k/demo-kunde/
```

## Grenzen (bewusst so gebaut)

- Kunden können ihre Daten **nicht selbst ändern**; jede Änderung läuft über
  dich – mit dem Editor dauert sie zwei Minuten. Für echte Selbstbedienung
  bräuchte es Login und Datenbank, also einen eigenen Schritt.
- Der Editor speichert nichts: Er erzeugt nur den Text der Datei. Erst dein
  Commit macht die Änderung sichtbar.
- Es gibt **keine Statistik**, wie oft eine Karte geöffnet wurde.
- Alle Kundendaten liegen in einem öffentlichen Repository. Was nicht auf der
  Karte stehen darf, gehört auch nicht in `profil.js`.
