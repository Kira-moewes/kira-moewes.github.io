/* =============================================================
   App – rendert die Karte aus window.CARDS und baut die .vcf
   ============================================================= */
(function () {
  "use strict";

  var ICONS = {
    phone:    "M6 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z",
    mail:     "M3 6h18v12H3zM3 7l9 6 9-6",
    whatsapp: "M20 12a8 8 0 0 1-12 6.9L4 20l1.2-3.8A8 8 0 1 1 20 12zM9 9c0 4 2 6 6 6",
    globe:    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18",
    calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
    linkedin: "M5 9v10M5 5.5v.5M10 19v-6a3 3 0 0 1 6 0v6",
    instagram:"M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM16.5 7.5v.01",
    github:   "M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.8 2.8 5.8 3.1 5.8 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
    file:     "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5",
    map:      "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
    facebook: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1z",
    xing:     "M5 6h4l3 5-4 7H4l4-7zM19 3l-7 12 4 7h4l-4-7 7-12z",
    tiktok:   "M15 4c.6 2.4 2.2 3.8 4.5 4v3.2c-1.7 0-3.3-.5-4.5-1.4V16a5.5 5.5 0 1 1-5.5-5.5c.4 0 .7 0 1 .1v3.3a2.3 2.3 0 1 0 1.5 2.1V4z",
    youtube:  "M3 12c0-2.3.2-3.6.4-4.3A2.6 2.6 0 0 1 5.3 5.9C6.6 5.6 12 5.6 12 5.6s5.4 0 6.7.3a2.6 2.6 0 0 1 1.9 1.8c.2.7.4 2 .4 4.3s-.2 3.6-.4 4.3a2.6 2.6 0 0 1-1.9 1.8c-1.3.3-6.7.3-6.7.3s-5.4 0-6.7-.3a2.6 2.6 0 0 1-1.9-1.8C3.2 15.6 3 14.3 3 12zM10.2 9.4v5.2l4.4-2.6z",
    shop:     "M4 8h16l-1.2 11a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8zM9 8V6a3 3 0 0 1 6 0v2",
    link:     "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"
  };

  var $ = function (id) { return document.getElementById(id); };

  function svgIcon(name, cls) {
    var d = ICONS[name] || ICONS.link;
    return '<svg class="' + (cls || "i") + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>';
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tel(n) { return String(n || "").replace(/[^\d+]/g, ""); }

  /* ---------- Profil wählen ----------------------------------------
     1. window.CARD  – eine Karte je Ordner (Normalfall)
     2. window.CARDS – Sammeldatei mit ?k=schluessel (Sonderfall)     */
  function pickProfile() {
    /* Vorschau aus dem Editor: Daten liegen im Zwischenspeicher des Browsers */
    if (/[?&]preview=1/.test(location.search)) {
      try {
        var raw = sessionStorage.getItem("CARD_PREVIEW");
        if (raw) return JSON.parse(raw);
      } catch (e) { /* Zwischenspeicher gesperrt – dann normale Daten */ }
    }
    if (window.CARD) return window.CARD;
    var cfg = window.CARDS;
    if (!cfg || !cfg.profiles) return null;
    var key = new URLSearchParams(location.search).get("k") ||
              location.hash.replace("#", "") ||
              cfg.default;
    return cfg.profiles[key] || cfg.profiles[cfg.default] ||
           cfg.profiles[Object.keys(cfg.profiles)[0]];
  }

  /* Editor schickt neue Daten -> speichern und Vorschau neu zeichnen */
  window.addEventListener("message", function (ev) {
    if (!ev.data || ev.data.type !== "card-preview") return;
    try {
      var next = JSON.stringify(ev.data.card);
      if (sessionStorage.getItem("CARD_PREVIEW") === next) return;  /* nichts Neues */
      sessionStorage.setItem("CARD_PREVIEW", next);
      location.reload();
    } catch (e) { /* ignorieren */ }
  });

  var p = pickProfile();
  if (!p) return;

  var fullName = [p.firstName, p.lastName].filter(Boolean).join(" ");
  var c = p.contact || {};

  /* ---------- Kopf ---------- */
  document.title = fullName + (p.role ? " · " + p.role : "");
  setMeta("description", p.bio || "Kontaktdaten von " + fullName);
  setMetaProp("og:title", fullName);
  setMetaProp("og:description", [p.role, p.company].filter(Boolean).join(" · ") || "Kontakt");

  function setMeta(n, v) { var m = document.querySelector('meta[name="' + n + '"]'); if (m) m.content = v; }
  function setMetaProp(n, v) { var m = document.querySelector('meta[property="' + n + '"]'); if (m) m.content = v; }

  /* Markenfarben der Karte (optional) */
  if (p.theme) {
    var map = { black: "--black", deep: "--deep", sand: "--sand", sandDim: "--sand-dim",
                ember: "--ember", emberHi: "--ember-hi" };
    Object.keys(map).forEach(function (k) {
      if (p.theme[k]) document.documentElement.style.setProperty(map[k], p.theme[k]);
    });
    if (p.theme.black) {
      var tc = document.querySelector('meta[name="theme-color"]');
      if (tc) tc.content = p.theme.black;
    }
  }

  if (p.logo) { $("logo").src = p.logo; } else { $("logo").parentNode.hidden = true; }  /* ohne Logo faellt das schwarze Band weg */
  if (p.photo) { $("photo").src = p.photo; $("photo").alt = fullName; $("photo").hidden = false; }
  $("name").textContent = fullName;
  $("role").textContent = [p.role, p.company].filter(Boolean).join(" · ");
  if (!$("role").textContent) $("role").hidden = true;
  $("bio").textContent = p.bio || "";
  if (!p.bio) $("bio").hidden = true;

  /* ---------- Kontaktzeilen aus den Stammdaten ----------
     Telefon, E-Mail und Website stehen als eigene Gruppe ganz oben — mit dem
     tatsaechlichen Wert darunter. Doppelte Eintraege in "groups" entfallen. */
  function host(u) {
    return String(u || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }

  var kontakt = [];
  if (c.mobile)   kontakt.push({ icon: "phone",    label: "Mobil",     sub: c.mobile, url: "tel:" + tel(c.mobile) });
  if (c.phone)    kontakt.push({ icon: "phone",    label: "Telefon",   sub: c.phone,  url: "tel:" + tel(c.phone) });
  if (c.whatsapp) kontakt.push({ icon: "whatsapp", label: "WhatsApp",  sub: "Nachricht senden", url: "https://wa.me/" + tel(c.whatsapp) });
  if (c.email)    kontakt.push({ icon: "mail",     label: "E-Mail",    sub: c.email,  url: "mailto:" + c.email });
  if (c.website)  kontakt.push({ icon: "globe",    label: "Website",   sub: host(c.website), url: c.website });

  /* ---------- Alle Gruppen zeichnen ---------- */
  var alleGruppen = (kontakt.length ? [{ title: "Kontakt", links: kontakt }] : [])
                      .concat(p.groups || []);

  var n = 0;
  $("groups").innerHTML = alleGruppen.map(function (g) {
    var items = (g.links || []).filter(function (l) { return l.label && l.url; }).map(function (l) {
      n++;
      var ext = /^https?:/.test(l.url || "");
      return '<li><a class="link" style="animation-delay:' + (n * 40) + 'ms" href="' + esc(l.url) + '"' +
             (ext ? ' target="_blank" rel="noopener"' : "") + '>' +
             svgIcon(l.icon) +
             '<span class="link-text"><span class="link-label">' + esc(l.label) + '</span>' +
             (l.sub ? '<span class="link-sub">' + esc(l.sub) + '</span>' : "") + '</span>' +
             '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></a></li>';
    }).join("");
    return items ? '<div class="group">' + (g.title ? '<h2>' + esc(g.title) + '</h2>' : "") +
                   '<ul>' + items + '</ul></div>' : "";
  }).join("");

  /* ---------- Fusszeile ---------- */
  $("footLinks").innerHTML = (p.footer || []).map(function (f) {
    return '<a href="' + esc(f.url || "#") + '">' + esc(f.label) + '</a>';
  }).join("");

  /* Fußzeilen-Signatur (gilt für alle Karten, siehe assets/js/brand.js) */
  var brand = p.signature || window.BRAND || {};
  var sig = $("sig");
  if (sig && brand.label) {
    sig.textContent = "";
    if (brand.url) {
      var sa = document.createElement("a");
      sa.href = brand.url; sa.target = "_blank"; sa.rel = "noopener";
      sa.textContent = brand.label;
      sig.appendChild(sa);
    } else {
      sig.textContent = brand.label;
    }
  }

  $("card").hidden = false;

  /* ---------- vCard (.vcf) ---------- */
  function vcard() {
    var a = c.address || {};
    var L = [
      "BEGIN:VCARD", "VERSION:3.0",
      "N:" + (p.lastName || "") + ";" + (p.firstName || "") + ";;;",
      "FN:" + fullName
    ];
    if (p.company) L.push("ORG:" + p.company);
    if (p.role) L.push("TITLE:" + p.role);
    if (c.mobile) L.push("TEL;TYPE=CELL:" + tel(c.mobile));
    if (c.phone) L.push("TEL;TYPE=WORK,VOICE:" + tel(c.phone));
    if (c.email) L.push("EMAIL;TYPE=INTERNET:" + c.email);
    if (c.website) L.push("URL:" + c.website);
    if (a.street || a.city) {
      L.push("ADR;TYPE=WORK:;;" + (a.street || "") + ";" + (a.city || "") + ";;" + (a.zip || "") + ";" + (a.country || ""));
    }
    L.push("SOURCE:" + location.href, "REV:" + new Date().toISOString(), "END:VCARD");
    return L.join("\r\n");
  }

  $("saveContact").addEventListener("click", function () {
    var blob = new Blob([vcard()], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = fullName.replace(/\s+/g, "-").toLowerCase() + ".vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    toast("Visitenkarte wird gespeichert");
  });

  /* ---------- Teilen ----------
     Reihenfolge: Teilen-Menue des Handys -> Zwischenablage -> Link zum Abschreiben.
     Jeder Schritt meldet sich, damit der Knopf nie stumm bleibt.                */
  function linkDialog() {
    var d = document.createElement("dialog");
    d.className = "qr";
    d.setAttribute("aria-label", "Link dieser Karte");
    var inp = document.createElement("input");
    inp.readOnly = true;
    inp.value = location.href;
    inp.style.cssText = "width:100%;padding:11px 12px;border:1px solid var(--line-strong);" +
      "border-radius:var(--r);background:#000;color:var(--sand);font:inherit;font-size:.82rem;text-align:center";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-ghost";
    btn.style.marginTop = "14px";
    btn.textContent = "Schließen";
    btn.addEventListener("click", function () { d.close ? d.close() : d.remove(); });
    d.appendChild(inp);
    d.appendChild(btn);
    document.body.appendChild(d);
    if (d.showModal) { d.showModal(); } else { d.setAttribute("open", ""); }
    inp.focus();
    inp.setSelectionRange(0, inp.value.length);
    d.addEventListener("close", function () { d.remove(); });
    toast("Link markiert – kopieren");
  }

  function copyLink() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).then(
        function () { toast("Link kopiert"); },
        linkDialog
      );
    } else {
      linkDialog();
    }
  }

  $("shareBtn").addEventListener("click", function () {
    var data = {
      title: fullName,
      text: [p.role, p.company].filter(Boolean).join(" · ") || "Kontakt",
      url: location.href
    };
    if (!navigator.share || (navigator.canShare && !navigator.canShare(data))) { copyLink(); return; }
    try {
      var res = navigator.share(data);
      if (res && res.then) {
        res.then(null, function (err) {
          if (err && err.name === "AbortError") return;   /* Nutzer hat abgebrochen */
          copyLink();                                     /* z. B. im eingebetteten Fenster gesperrt */
        });
      }
    } catch (e) {
      copyLink();
    }
  });

  /* ---------- QR-Code ---------- */
  var modal = $("qrModal");
  $("qrBtn").addEventListener("click", function () {
    $("qrUrl").textContent = location.href;
    var box = $("qrCanvas");
    if (!box.dataset.done) {
      if (typeof qrcode === "function") {
        var q = qrcode(0, "M");
        q.addData(location.href);
        q.make();
        box.innerHTML = q.createSvgTag({ cellSize: 6, margin: 0, scalable: true });
        box.querySelector("svg").setAttribute("style", "width:100%;height:auto");
        box.dataset.done = "1";
      } else {
        box.innerHTML = '<p style="color:#120B07;font-size:.8rem;margin:0">QR-Code nicht verfügbar – Link unten kopieren.</p>';
      }
    }
    if (modal.showModal) { modal.showModal(); } else { modal.setAttribute("open", ""); }
  });
  $("qrClose").addEventListener("click", function () {
    if (modal.close) { modal.close(); } else { modal.removeAttribute("open"); }
  });
  modal.addEventListener("click", function (e) { if (e.target === modal && modal.close) modal.close(); });

  /* ---------- Toast ---------- */
  var t;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(t);
    t = setTimeout(function () { el.classList.remove("on"); }, 2600);
  }
})();
