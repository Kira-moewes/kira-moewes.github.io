/* Eigene Karte – Kira Moewes */
window.CARD = {
  firstName: "Kira",
  lastName:  "Moewes",
  role:      "",                      // bewusst leer – ergaenzen, wenn du magst
  company:   "",
  bio:       "",
  logo:      "../../assets/img/logo.png",
  photo:     "",

  contact: {
    phone:    "",
    mobile:   "+49 1520 1560005",
    email:    "kira.moewes@gmail.com",
    website:  "",
    whatsapp: "",                     // Nummer waere dann oeffentlich
    address:  { street: "", zip: "", city: "", country: "Deutschland" }
  },

  /* Zusaetzliche Links – Telefon und E-Mail stehen automatisch oben.
     Das Portfolio steht hier als eigene Zeile und nicht als kleiner Knopf
     in der Fusszeile: Gruppenlinks benutzen dieselbe Darstellung wie die
     Kontaktzeilen darueber – Symbol, Beschriftung, Unterzeile, Pfeil.
     Damit ist es genauso auffaellig wie Telefon und E-Mail. */
  groups: [
    {
      title: "Arbeiten",
      links: [
        { icon: "globe", label: "Portfolio",
          sub: "Websites, Karten und Designstudien",
          url: "../../portfolio/" }
      ]
    }
  ],

  /* Rechtliches – gilt für die ganze Seite kira-moewes.github.io */
  footer: [
    { label: "Impressum",   url: "../../impressum/" },
    { label: "Datenschutz", url: "../../datenschutz/" }
  ]
};
