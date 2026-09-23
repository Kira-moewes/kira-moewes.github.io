/* =============================================================
   Bewertungskarte: liegt an der Theke, Gast haelt das Handy dran,
   landet mit einem Tipp im Bewertungsformular.
   Daten kommen aus window.BEWERTUNG (siehe bewertung-daten.js).
   ============================================================= */
(function () {
  "use strict";

  var ICONS = {
    google:    "M21 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.2 2.7-7.2z M12 21c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9 1-2.9 1a5 5 0 0 1-4.7-3.5H4.1v2.4A9 9 0 0 0 12 21z M7.3 13.9a5.4 5.4 0 0 1 0-3.4V8.1H4.1a9 9 0 0 0 0 8.2z M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 4.1 8.1l3.2 2.4A5 5 0 0 1 12 6.6z",
    star:      "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
    globe:     "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18",
    instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM16.5 7.5v.01",
    facebook:  "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1z",
    link:      "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"
  };

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function svgIcon(name, cls) {
    return '<svg class="' + (cls || "i") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' +
           (ICONS[name] || ICONS.link) + '"/></svg>';
  }

  var b = window.BEWERTUNG;
  if (!b) return;

  document.title = b.name ? b.name + " bewerten" : "Bewertung";
  var m = document.querySelector('meta[name="description"]');
  if (m) m.content = "Bewerten Sie " + (b.name || "uns") + " in einer Minute.";

  if (b.logo) { $("logo").src = b.logo; } else { $("logo").parentNode.hidden = true; }
  $("name").textContent = b.name || "";
  $("frage").textContent = b.frage || "Wie war es bei uns?";
  $("dank").textContent = b.dank || "Ihre Bewertung hilft anderen bei der Entscheidung — und uns beim Besserwerden.";

  /* Sterne als stille Grafik, kein Eingabefeld */
  var sterne = "";
  for (var i = 0; i < 5; i++) { sterne += svgIcon("star", "stern"); }
  $("sterne").innerHTML = sterne;

  /* Hauptknopf + weitere Plattformen */
  var ziele = (b.ziele || []).filter(function (z) { return z.url; });
  if (!ziele.length) { $("aktionen").innerHTML = ""; return; }

  var erste = ziele[0];
  $("aktionen").innerHTML =
    '<a class="btn btn-primary" href="' + esc(erste.url) + '" target="_blank" rel="noopener">' +
      svgIcon(erste.icon || "google") + esc(erste.label || "Jetzt bewerten") +
    '</a>' +
    (ziele.length > 1
      ? '<ul class="weitere">' + ziele.slice(1).map(function (z) {
          return '<li><a class="link" href="' + esc(z.url) + '" target="_blank" rel="noopener">' +
                 svgIcon(z.icon) +
                 '<span class="link-text"><span class="link-label">' + esc(z.label) + '</span>' +
                 (z.sub ? '<span class="link-sub">' + esc(z.sub) + '</span>' : "") + '</span>' +
                 '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a></li>';
        }).join("") + '</ul>'
      : "");

  /* Signatur in der Fusszeile (assets/js/brand.js) */
  var brand = window.BRAND || {};
  var sig = $("sig");
  if (sig && brand.label) {
    sig.textContent = "";
    if (brand.url) {
      var a = document.createElement("a");
      a.href = brand.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = brand.label;
      sig.appendChild(a);
    } else { sig.textContent = brand.label; }
  }

  $("karte").hidden = false;
})();
