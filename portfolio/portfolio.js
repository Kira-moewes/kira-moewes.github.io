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

  /* Abschnitte in der Reihenfolge ihres ersten Auftretens in projekte.js.
     Projekte ohne Angabe landen unter "Weitere". */
  var reihenfolge = [], nach = {};
  projekte.forEach(function (p) {
    var g = p.gruppe || "Weitere";
    if (!nach[g]) { nach[g] = []; reihenfolge.push(g); }
    nach[g].push(p);
  });


  ziel.innerHTML = reihenfolge.length
    ? reihenfolge.map(function (g) {
        return '<section class="gruppe">' +
                 '<h2 class="gruppe-titel">' + esc(g) + '</h2>' +
                 '<div class="raster">' + nach[g].map(kachel).join("") + '</div>' +
               '</section>';
      }).join("")
    : '<p class="leer">Hier steht noch keine Arbeit.</p>';
})();
