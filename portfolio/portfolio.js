/* ===========================================================================
   Baut die Abschnitte und das Projektraster aus portfolio/projekte.js.
   Kein Framework, keine fremden Server – wie die Karten selbst.
=========================================================================== */
(function () {
  "use strict";

  var projekte = window.PROJEKTE || [];
  var ziel     = document.getElementById("arbeiten");
  if (!ziel) return;

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function kachel(p) {
    var label = p.label ? '<span class="label">' + esc(p.label) + '</span>' : '';
    /* Zeigt das Ziel auf eine fremde Adresse, oeffnet es in einem neuen Tab -
       sonst ist das Portfolio weg und der Besucher kommt nicht zurueck. */
    var fremd = /^https?:/i.test(p.ziel || "");
    return '<a class="kachel" href="' + esc(p.ziel || "#") + '"' +
             (fremd ? ' target="_blank" rel="noopener"' : '') + '>' +
             '<span class="zeile">' +
               '<span class="jahr">' + esc(p.jahr || "") + '</span>' + label +
             '</span>' +
             '<h2>' + esc(p.titel) + '</h2>' +
             '<p>' + esc(p.satz || "") + '</p>' +
             '<span class="oeffnen">Ansehen <span aria-hidden="true">&rarr;</span></span>' +
           '</a>';
  }

  /* Zwei Ebenen: Bereich ueber Schwerpunkt.

       bereich  "Websites", "Automatisierung" - die grosse Ueberschrift
       gruppe   "Schwerpunkt Gestaltung" usw. - die Unterteilung darin

     Beide erscheinen in der Reihenfolge ihres ersten Auftretens in
     projekte.js. Ein Bereich ohne gruppe zeigt seine Kacheln direkt, ohne
     Zwischenueberschrift - das ist der Normalfall, solange dort nur eine Art
     Arbeit liegt. */
  var bereiche = [], nach = {};
  projekte.forEach(function (p) {
    var b = p.bereich || "Arbeiten";
    var g = p.gruppe || "";
    if (!nach[b]) { nach[b] = { reihenfolge: [], gruppen: {} }; bereiche.push(b); }
    if (!nach[b].gruppen[g]) { nach[b].gruppen[g] = []; nach[b].reihenfolge.push(g); }
    nach[b].gruppen[g].push(p);
  });

  function raster(liste) {
    return '<div class="raster">' + liste.map(kachel).join("") + '</div>';
  }

  ziel.innerHTML = bereiche.length
    ? bereiche.map(function (b) {
        var inhalt = nach[b].reihenfolge.map(function (g) {
          if (!g) return raster(nach[b].gruppen[g]);
          return '<section class="gruppe">' +
                   '<h3 class="gruppe-titel">' + esc(g) + '</h3>' +
                   raster(nach[b].gruppen[g]) +
                 '</section>';
        }).join("");
        return '<section class="bereich">' +
                 '<h2 class="bereich-titel">' + esc(b) + '</h2>' +
                 inhalt +
               '</section>';
      }).join("")
    : '<p class="leer">Hier steht noch keine Arbeit.</p>';
})();
