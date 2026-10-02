/* ---------------------------------------------------------------------------
   Kundenkarte: Yannik Dettmer
   Quellen: andrys-advisory.de und deren Impressum, Kontaktdaten von Kira.
   Offen: seine Funktionsbezeichnung (steht nirgends oeffentlich) – bei ihm
   erfragen, dann in "role" eintragen.
--------------------------------------------------------------------------- */
window.CARD = {
  firstName: "Yannik",
  lastName:  "Dettmer",
  role:      "",                     // TODO: Position bei ihm erfragen
  company:   "Andrys Advisory GmbH",
  bio:       "Beratung für digitale Transformation: Projektsteuerung, Prozesse, IT-Strategie.",
  logo:      "../../assets/img/logo.png",
  photo:     "",

  contact: {
    phone:    "",
    mobile:   "+49 162 3242260",
    email:    "y.dettmer@andrys-advisory.de",
    website:  "https://andrys-advisory.de",
    whatsapp: "",                    // nur mit seiner ausdruecklichen Zustimmung
    address:  { street: "Am Keuschenend 59", zip: "50170", city: "Kerpen", country: "Deutschland" }
  },

  /* Telefon, E-Mail und Website stehen automatisch oben unter "Kontakt".
     Hier kommen nur zusaetzliche Links hinein, etwa Profile oder Termine. */
  groups: [],

  footer: [
    { label: "Impressum",   url: "https://andrys-advisory.de/impressum/" },
    { label: "Datenschutz", url: "https://andrys-advisory.de/datenschutz/" }
  ]
};
