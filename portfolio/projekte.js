/* ===========================================================================
   Alle Arbeiten im Portfolio.

   EIN PROJEKT ERGÄNZEN: Block kopieren, ausfüllen, Datei speichern.
   Die Seite baut Abschnitte und Kacheln daraus von allein.

     titel   Überschrift der Kachel
     bereich Grosse Ueberschrift. Bisher nur "Websites"; Automatisierungen
             bekommen einen eigenen Bereich, sobald dort etwas steht.
     gruppe  Unterteilung innerhalb des Bereichs. Bisher "Schwerpunkt
             Gestaltung" (Bewegung, 3D, Technik die auf den Besucher
             reagiert) und "Schwerpunkt Vertrieb" (ruhig gebaut, verkauft
             eine Leistung). Leer lassen, wenn ein Bereich keine
             Unterteilung braucht - dann stehen die Kacheln direkt darunter.
             Bereiche und Gruppen erscheinen in der Reihenfolge, in der sie
             hier zuerst vorkommen.
     jahr    erscheint klein über dem Titel
     satz    zwei bis drei Wörter, was es ist. Kein Satz, keine Erklärung.
     label   "Entwurf", "Demo-Unternehmen" oder ""
             "Demo-Unternehmen" steht dort, wo der Betrieb
             erfunden ist und niemand denken soll, es wäre
             ein echter Auftrag gewesen.
     ziel    Adresse der Arbeit, relativ zu diesem Ordner. Fremde Adressen
             (mit https) öffnen von allein in einem neuen Tab.
     art     nur zur eigenen Ordnung, steht nicht auf der Seite

   Alle Projekte liegen unter eigener Adresse und öffnen in einem neuen
   Tab. Die anonymisierten Kopien, die hier einmal unter ./p/ lagen, sind
   gelöscht — niemand verlinkte sie mehr. Hier stehen nur Arbeiten, die man
   anklicken und benutzen kann; eine Beschreibung ist kein Projekt.

   Reihenfolge innerhalb eines Abschnitts: das Auffälligste zuerst.
   Die Einteilung ist gemessen, nicht geschätzt — Keyframes, Transforms,
   Scroll-Einblendungen und Animationsbibliotheken je Seite.
=========================================================================== */
window.PROJEKTE = [

  /* ------------------------------------------------- Schwerpunkt Gestaltung */
  {
    titel:   "Startklar",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Gestaltung",
    art:     "Website",
    jahr:    "2026",
    satz:    "Erwachsenwerden, aber machbar",
    label:   "Demo-Unternehmen",
    ziel:    "https://startklar-six.vercel.app/"
  },

  {
    titel:   "Planvoller GmbH",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Gestaltung",
    art:     "Website",
    jahr:    "2026",
    satz:    "Hausbau im Rheinland",
    label:   "Entwurf",
    ziel:    "https://planvoller.vercel.app/"
  },

  {
    titel:   "Klarfeld Unternehmensberatung",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Gestaltung",
    art:     "Website",
    jahr:    "2026",
    satz:    "Digitale Transformation",
    label:   "Entwurf",
    ziel:    "https://kira-moewes.github.io/klarfeld-beratung/"
  },

  {
    titel:   "Thai Imbiss Nam Fon",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Gestaltung",
    art:     "Website",
    jahr:    "2026",
    satz:    "Thailändische Küche",
    label:   "Entwurf",
    ziel:    "https://kira-moewes.github.io/thai-imbiss-nam-fon/"
  },

  /* --------------------------------------------------- Schwerpunkt Vertrieb */
  {
    titel:   "Neuenfeld Elektroinstallationen",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Vertrieb",
    art:     "Website",
    jahr:    "2026",
    satz:    "Elektrotechnik, Notdienst",
    label:   "Entwurf",
    ziel:    "https://kira-moewes.github.io/elektro-neuenfeld/"
  },

  {
    titel:   "Webgewerk · Automatisierung",
    bereich: "Websites",
    gruppe:  "Schwerpunkt Vertrieb",
    art:     "Marke",
    jahr:    "2026",
    satz:    "Erfundene Marke",
    label:   "Demo-Unternehmen",
    ziel:    "https://kira-moewes.github.io/webgewerk-agenten/"
  }

];
