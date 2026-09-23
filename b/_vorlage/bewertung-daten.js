/* ---------------------------------------------------------------------------
   Bewertungskarte – alle Daten dieser einen Karte.
   Der Chip zeigt auf diese Seite, nicht direkt auf Google: So kannst du das
   Ziel spaeter aendern, ohne die Karten beim Kunden einzusammeln.
--------------------------------------------------------------------------- */
window.BEWERTUNG = {
  name:  "BETRIEBSNAME",
  frage: "Wie war es bei uns?",
  dank:  "Ihre Bewertung hilft anderen bei der Entscheidung — und uns beim Besserwerden.",
  logo:  "../../assets/img/logo.png",

  /* Der erste Eintrag wird der grosse Knopf, weitere erscheinen darunter.
     icon: google  instagram  facebook  globe  link

     DEN RICHTIGEN GOOGLE-LINK FINDEN – zwei Wege:

     A) Der Betrieb loggt sich in sein Google-Unternehmensprofil ein und
        waehlt "Rezensionen" -> "Mehr Rezensionen erhalten". Der angezeigte
        Link sieht so aus:  https://g.page/r/XXXXXXXXXXXX/review

     B) Ohne Zugang: In Google Maps den Betrieb suchen, auf "Rezension
        schreiben" tippen und die Adresse aus der Adresszeile kopieren.

     Wichtig: Es muss der Link zum FORMULAR sein, nicht zum Eintrag.
     Ein Link, der nur die Firmenseite oder google.com oeffnet, ist falsch
     – dann steht der Gast vor der Suche statt vor dem Bewertungsfenster.  */
  ziele: [
    { icon: "google", label: "Bei Google bewerten", url: "" }
  ]
};
