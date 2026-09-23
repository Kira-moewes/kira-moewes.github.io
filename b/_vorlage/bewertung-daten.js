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
     Google-Link: Unternehmensprofil -> "Rezension schreiben" -> Link kopieren.
     icon: google  instagram  facebook  globe  link                        */
  ziele: [
    { icon: "google", label: "Bei Google bewerten", url: "" }
  ]
};
