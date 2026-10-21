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
    return '<a class="kachel rise" href="' + esc(p.ziel || "#") + '"' +
             (fremd ? ' target="_blank" rel="noopener"' : '') + '>' +
             '<span class="zeile">' +
               '<span class="jahr">' + esc(p.jahr || "") + '</span>' + label +
             '</span>' +
             '<h4>' + esc(p.titel) + '</h4>' +
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

  function zwei(n) { return (n < 10 ? "0" : "") + n; }

  /* Jeder Bereich ist ein eigenes Band wie die Abschnitte der Amana-Seite,
     mit laufender Nummer in der Augenbraue: "01 / Arbeiten". Der Name des
     Bereichs steht gross darunter und nicht noch einmal in der Augenbraue. */
  ziel.innerHTML = bereiche.length
    ? bereiche.map(function (b, i) {
        var inhalt = nach[b].reihenfolge.map(function (g) {
          if (!g) return raster(nach[b].gruppen[g]);
          return '<section class="gruppe">' +
                   '<h3 class="gruppe-titel">' + esc(g) + '</h3>' +
                   raster(nach[b].gruppen[g]) +
                 '</section>';
        }).join("");
        return '<section class="band bereich">' +
                 '<div class="wrap">' +
                   '<div class="sec-head"><span class="eyebrow">' + zwei(i + 1) + ' / Arbeiten</span></div>' +
                   '<h2 class="lead">' + esc(b) + '</h2>' +
                   inhalt +
                 '</div>' +
               '</section>';
      }).join("")
    : '<section class="band"><div class="wrap"><p class="leer">Hier steht noch keine Arbeit.</p></div></section>';

  /* Kleintext unten im Hero, aus denselben Daten: links die Bereiche und
     die Zahl der Arbeiten, rechts der Index wie auf der Amana-Seite. */
  var links = document.getElementById("hud-bl");
  var rechts = document.getElementById("hud-br");
  if (links) links.innerHTML = bereiche.map(esc).join(" · ") + "<br>" + projekte.length + " Arbeiten";
  if (rechts) rechts.innerHTML = "Index 00 / " + zwei(bereiche.length) + "<br>© 2026";
})();
