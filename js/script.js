// ============================================================
// Kalahari Roots — site script (Part 3)
// Modules: nav, scroll reveal, dynamic products (search/filter/sort),
// quick-view modal, gallery lightbox, tabs, accordion, Leaflet map,
// enquiry form (validate + AJAX + response), contact form (validate + email).
// ============================================================
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return "R" + Number(n).toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 2 }); };
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
  var catLabel = { baskets: "Baskets", ceramics: "Ceramics", textiles: "Textiles", furnishings: "Furnishings" };

  /* ---------- 1. Mobile navigation ---------- */
  function initNav() {
    var t = $(".nav-toggle"), l = $(".nav-links");
    if (!t || !l) return;
    t.addEventListener("click", function () {
      var open = l.classList.toggle("open");
      t.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- 2. Scroll-reveal animation (IntersectionObserver) ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (typeof window.IntersectionObserver !== "function") { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- 3. Stock badge helper ---------- */
  function stockBadge(p) {
    if (p.stock === 0) return '<span class="badge out">Made to order</span>';
    if (p.stock <= 4) return '<span class="badge low">Only ' + p.stock + ' left</span>';
    return '<span class="badge">In stock</span>';
  }

  /* ---------- 4. Dynamic product rendering ---------- */
  function cardHTML(p) {
    return '<article class="product-card reveal" data-id="' + p.id + '">' +
      '<button type="button" class="product-image" data-lightbox data-src="' + p.image + '" data-caption="' + esc(p.name) + '" aria-label="Enlarge image of ' + esc(p.name) + '">' +
      '<img src="' + p.image + '" alt="' + esc(p.name) + ' — handmade ' + catLabel[p.category].toLowerCase() + ' by a South African artisan" loading="lazy" width="400" height="300"></button>' +
      '<div class="product-info">' + stockBadge(p) + '<h3>' + esc(p.name) + '</h3>' +
      '<p class="product-price">' + money(p.price) + '</p><p>' + esc(p.desc) + '</p>' +
      '<div class="product-actions"><button type="button" class="btn btn-outline btn-small quick-view" data-id="' + p.id + '">Quick view</button>' +
      '<a href="enquiry.html?product=' + p.id + '" class="btn btn-primary btn-small">Enquire</a></div></div></article>';
  }

  function initFeatured() {
    var grid = $("#featured-grid");
    if (!grid || typeof PRODUCTS === "undefined") return;
    grid.innerHTML = PRODUCTS.filter(function (p) { return p.featured; }).map(cardHTML).join("");
  }

  function initProducts() {
    var grid = $("#product-grid");
    if (!grid || typeof PRODUCTS === "undefined") return;
    var search = $("#product-search"), sort = $("#product-sort"), count = $("#result-count"), none = $("#no-results");
    var btns = $$(".filter-btn"), state = { category: "all" };

    var hash = (location.hash || "").replace("#", ""), qs = new URLSearchParams(location.search).get("category");
    var initial = qs || hash;
    if (catLabel[initial]) state.category = initial;
    btns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-category") === state.category); b.setAttribute("aria-pressed", b.classList.contains("active")); });

    function render() {
      var term = search.value.trim().toLowerCase();
      var list = PRODUCTS.filter(function (p) {
        var inCat = state.category === "all" || p.category === state.category;
        var hay = (p.name + " " + p.desc + " " + p.category).toLowerCase();
        return inCat && (!term || hay.indexOf(term) !== -1);
      });
      var s = sort.value;
      list.sort(function (a, b) {
        if (s === "price-asc") return a.price - b.price;
        if (s === "price-desc") return b.price - a.price;
        if (s === "name-desc") return b.name.localeCompare(a.name);
        return a.name.localeCompare(b.name);
      });
      grid.innerHTML = list.map(cardHTML).join("");
      $$(".reveal", grid).forEach(function (e) { requestAnimationFrame(function () { e.classList.add("in"); }); });
      count.textContent = list.length + (list.length === 1 ? " product" : " products") + " shown";
      none.hidden = list.length !== 0;
      initLightbox();
    }
    search.addEventListener("input", render);
    sort.addEventListener("change", render);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        state.category = b.getAttribute("data-category");
        btns.forEach(function (x) { var on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
        render();
      });
    });
    $("#clear-search") && $("#clear-search").addEventListener("click", function () { search.value = ""; sort.value = "name-asc"; btns[0].click(); });
    render();
  }

  /* ---------- 5. Quick-view modal (DOM built on demand) ---------- */
  var lastFocus = null;
  function openModal(p) {
    closeModal();
    lastFocus = document.activeElement;
    var ov = document.createElement("div");
    ov.className = "overlay"; ov.id = "qv-modal"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-labelledby", "qv-title");
    ov.innerHTML = '<div class="modal-box"><button type="button" class="modal-close" aria-label="Close quick view">&times;</button>' +
      '<img src="' + p.image + '" alt="' + esc(p.name) + '" width="400" height="300">' +
      '<div>' + stockBadge(p) + '<h2 id="qv-title">' + esc(p.name) + '</h2><p class="product-price">' + money(p.price) + '</p><p>' + esc(p.desc) + '</p>' +
      '<p><strong>Category:</strong> ' + catLabel[p.category] + '<br><strong>Lead time if made to order:</strong> ' + p.lead + '</p>' +
      '<a class="btn btn-primary" href="enquiry.html?product=' + p.id + '">Enquire about this piece</a></div></div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add("open"); });
    $(".modal-close", ov).focus();
    ov.addEventListener("click", function (e) { if (e.target === ov) closeModal(); });
    $(".modal-close", ov).addEventListener("click", closeModal);
  }
  function closeModal() {
    var m = $("#qv-modal");
    if (m) { m.remove(); if (lastFocus) lastFocus.focus(); }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".quick-view");
    if (b && typeof PRODUCTS !== "undefined") {
      var p = PRODUCTS.filter(function (x) { return x.id === b.getAttribute("data-id"); })[0];
      if (p) openModal(p);
    }
  });

  /* ---------- 6. Gallery lightbox ---------- */
  var lb = { items: [], i: 0, el: null };
  function initLightbox() {
    lb.items = $$("[data-lightbox]");
    lb.items.forEach(function (el, idx) {
      if (el._lb) return; el._lb = true;
      el.addEventListener("click", function () { lb.items = $$("[data-lightbox]"); openLB(lb.items.indexOf(el)); });
    });
  }
  function openLB(i) {
    if (!lb.el) {
      lb.el = document.createElement("div");
      lb.el.className = "overlay lightbox"; lb.el.setAttribute("role", "dialog"); lb.el.setAttribute("aria-modal", "true"); lb.el.setAttribute("aria-label", "Image viewer");
      lb.el.innerHTML = '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">&times;</button>' +
        '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
        '<figure><img alt="" width="800" height="600"><figcaption></figcaption></figure>' +
        '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
      document.body.appendChild(lb.el);
      $(".lb-close", lb.el).addEventListener("click", closeLB);
      $(".lb-prev", lb.el).addEventListener("click", function () { showLB(lb.i - 1); });
      $(".lb-next", lb.el).addEventListener("click", function () { showLB(lb.i + 1); });
      lb.el.addEventListener("click", function (e) { if (e.target === lb.el) closeLB(); });
    }
    lastFocus = document.activeElement;
    showLB(i);
    lb.el.classList.add("open");
    $(".lb-close", lb.el).focus();
  }
  function showLB(i) {
    var n = lb.items.length; lb.i = (i + n) % n;
    var el = lb.items[lb.i], img = $("img", lb.el);
    img.src = el.getAttribute("data-src");
    img.alt = el.getAttribute("data-caption") || "";
    $("figcaption", lb.el).textContent = (el.getAttribute("data-caption") || "") + "  (" + (lb.i + 1) + " / " + n + ")";
  }
  function closeLB() { if (lb.el) { lb.el.classList.remove("open"); if (lastFocus) lastFocus.focus(); } }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeLB(); }
    if (lb.el && lb.el.classList.contains("open")) {
      if (e.key === "ArrowRight") showLB(lb.i + 1);
      if (e.key === "ArrowLeft") showLB(lb.i - 1);
    }
  });

  /* ---------- 7. Tabs (ARIA, keyboard accessible) ---------- */
  function initTabs() {
    $$(".tabs").forEach(function (box) {
      var tabs = $$('[role="tab"]', box), panels = $$('[role="tabpanel"]', box);
      function select(t) {
        tabs.forEach(function (x, i) { var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; panels[i].hidden = !on; });
        t.focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { select(t); });
        t.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length]);
          if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length]);
        });
      });
    });
  }

  /* ---------- 8. Accordion ---------- */
  function initAccordion() {
    $$(".accordion-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !open);
        panel.style.maxHeight = open ? "0" : panel.scrollHeight + "px";
      });
    });
  }

  /* ---------- 9. Interactive map (Leaflet + OpenStreetMap) ---------- */
  function initMap() {
    var el = $("#map");
    if (!el) return;
    if (typeof L === "undefined" || typeof STORES === "undefined") {
      el.innerHTML = '<p style="padding:1rem">The interactive map could not load. View us on <a href="https://www.openstreetmap.org/#map=13/-33.92/18.44" rel="noopener noreferrer" target="_blank">OpenStreetMap</a>.</p>';
      return;
    }
    var map = L.map("map", { scrollWheelZoom: false }).setView([-33.914, 18.43], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" }).addTo(map);
    var markers = STORES.map(function (s) {
      var m = L.marker([s.lat, s.lng], { title: s.name }).addTo(map);
      m.bindPopup("<strong>" + esc(s.name) + "</strong><br>" + esc(s.info) + '<br><a href="https://www.openstreetmap.org/directions?to=' + s.lat + "%2C" + s.lng + '" target="_blank" rel="noopener noreferrer">Get directions</a>');
      return m;
    });
    map.fitBounds(L.featureGroup(markers).getBounds().pad(0.25));
    $$(".map-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-index");
        map.flyTo([STORES[i].lat, STORES[i].lng], 15, { duration: 1.2 });
        markers[i].openPopup();
      });
    });
    el.addEventListener("click", function () { map.scrollWheelZoom.enable(); });
  }

  /* ---------- 10. Form validation engine ---------- */
  var RULES = {
    name: { test: function (v) { return /^[\p{L}][\p{L}\s'.-]{1,59}$/u.test(v); }, msg: "Enter your full name (letters only, 2–60 characters)." },
    email: { test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, msg: "Enter a valid email address, e.g. name@example.com." },
    phone: { test: function (v) { return /^(\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s-]/g, "")); }, msg: "Enter a valid South African number, e.g. 082 555 0148 or +27 82 555 0148." },
    quantity: { test: function (v) { return /^\d+$/.test(v) && +v >= 1 && +v <= 100; }, msg: "Quantity must be a whole number from 1 to 100." },
    message: { test: function (v) { return v.length >= 10 && v.length <= 500; }, msg: "Message must be between 10 and 500 characters." }
  };
  function validateField(f) {
    var row = f.closest(".form-row"), err = $(".form-error", row), v = f.type === "checkbox" ? "" : f.value.trim(), ok = true, msg = "";
    var kind = f.getAttribute("data-rule");
    if (f.type === "checkbox") { ok = !f.required || f.checked; msg = "Please tick this box to continue."; }
    else if (f.required && v === "") { ok = false; msg = f.tagName === "SELECT" ? "Please choose an option." : "This field is required."; }
    else if (v !== "" && kind && RULES[kind] && !RULES[kind].test(v)) { ok = false; msg = RULES[kind].msg; }
    else if (!f.required && v === "") { ok = true; }
    if (row) { row.classList.toggle("invalid", !ok); row.classList.toggle("valid", ok && v !== ""); }
    if (err && !ok) err.textContent = msg;
    f.setAttribute("aria-invalid", !ok);
    return ok;
  }
  function validateForm(form) {
    var first = null, all = true;
    $$("input,select,textarea", form).forEach(function (f) { if (!validateField(f)) { all = false; if (!first) first = f; } });
    if (first) first.focus();
    return all;
  }
  function wireValidation(form) {
    $$("input,select,textarea", form).forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () { if (f.closest(".form-row").classList.contains("invalid")) validateField(f); });
    });
    var ta = $("textarea[maxlength]", form), cc = $(".char-count", form);
    if (ta && cc) ta.addEventListener("input", function () { cc.textContent = ta.value.length + " / " + ta.maxLength; });
  }

  /* ---------- 11. Enquiry form: validate -> AJAX -> response ---------- */
  function buildResponse(d) {
    var p = PRODUCTS.filter(function (x) { return x.id === d.product; })[0];
    var qty = +d.quantity, unit = p.price, sub = unit * qty, lines = [], total = sub, avail, lead;
    if (p.stock >= qty) { avail = "In stock — " + p.stock + " available"; lead = "Ready within 1–2 business days"; }
    else if (p.stock > 0) { avail = p.stock + " in stock; " + (qty - p.stock) + " made to order"; lead = "Remaining items: " + p.lead; }
    else { avail = "Currently made to order"; lead = p.lead; }
    if (d["enquiry-type"] === "wholesale") {
      if (qty >= 5) { var disc = sub * 0.1; total = sub - disc; lines.push("Wholesale discount (10%): −" + money(disc)); }
      else lines.push("Wholesale pricing starts at 5 units — add more units to qualify for 10% off.");
    }
    if (d["enquiry-type"] === "custom") { var sur = sub * 0.15; total = sub + sur; lines.push("Custom-order surcharge (15%, estimate): +" + money(sur)); lead = "Custom orders: " + p.lead + " plus 1 week"; }
    return { p: p, qty: qty, unit: unit, sub: sub, total: total, avail: avail, lead: lead, notes: lines };
  }
  function initEnquiry() {
    var form = $("#enquiry-form");
    if (!form || typeof PRODUCTS === "undefined") return;
    var sel = $("#product-interest");
    sel.innerHTML = '<option value="">Select a product</option>' + PRODUCTS.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + " — " + money(p.price) + "</option>"; }).join("");
    var pre = new URLSearchParams(location.search).get("product");
    if (pre) {
      var match = PRODUCTS.filter(function (p) { return p.id === pre || p.name.toLowerCase() === pre.toLowerCase(); })[0];
      if (match) sel.value = match.id;
    }
    wireValidation(form);
    var card = $("#response-card"), status = $("#form-status"), btn = $("#enq-submit");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); card.classList.remove("show"); status.textContent = ""; status.className = "form-status";
      if (!validateForm(form)) { status.textContent = "Please fix the highlighted fields and try again."; status.className = "form-status error"; return; }
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      var r = buildResponse(data);
      btn.disabled = true; btn.textContent = "Sending…"; status.textContent = "Sending your enquiry…";
      fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (res) { if (!res.ok) throw new Error("Server responded " + res.status); return res.json(); })
        .then(function () {
          var ref = "KR-" + Date.now().toString().slice(-6);
          card.innerHTML = "<h2>Thank you, " + esc(data.name.split(" ")[0]) + " — enquiry received</h2><p>Reference <strong>" + ref + "</strong>. Here is our automatic response; a team member will confirm by " + esc(data["preferred-contact"]) + " within two business days.</p>" +
            "<dl><dt>Product</dt><dd>" + esc(r.p.name) + " × " + r.qty + "</dd><dt>Unit price</dt><dd>" + money(r.unit) + "</dd><dt>Availability</dt><dd>" + esc(r.avail) + "</dd><dt>Lead time</dt><dd>" + esc(r.lead) + "</dd><dt>Estimated total</dt><dd><strong>" + money(r.total) + "</strong></dd></dl>" +
            (r.notes.length ? "<p>" + r.notes.map(esc).join("<br>") + "</p>" : "") + "<p><small>Estimate only — final pricing is confirmed by our team.</small></p>";
          card.classList.add("show"); card.setAttribute("tabindex", "-1"); card.focus();
          form.reset(); $$(".form-row", form).forEach(function (x) { x.classList.remove("valid", "invalid"); });
          status.textContent = "";
        })
        .catch(function () { status.textContent = "We couldn't send your enquiry just now. Check your connection and try again."; status.className = "form-status error"; })
        .then(function () { btn.disabled = false; btn.textContent = "Send enquiry"; });
    });
  }

  /* ---------- 12. Contact form: validate -> compile email ---------- */
  function initContact() {
    var form = $("#contact-form");
    if (!form) return;
    var TO = form.getAttribute("data-recipient");
    wireValidation(form);
    var box = $("#email-box"), prev = $("#email-preview"), link = $("#email-link");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;
      var f = form.elements, type = f["message-type"].options[f["message-type"].selectedIndex].text;
      var subject = "[" + type + "] Message from " + f.name.value.trim();
      var body = "Name: " + f.name.value.trim() + "\nEmail: " + f.email.value.trim() + "\nPhone: " + (f.phone.value.trim() || "Not provided") + "\nMessage type: " + type + "\n\nMessage:\n" + f.message.value.trim() + "\n\n— Sent via the Kalahari Roots website contact form";
      prev.textContent = "To: " + TO + "\nSubject: " + subject + "\n\n" + body;
      link.href = "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      box.classList.add("show"); box.setAttribute("tabindex", "-1"); box.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav(); initFeatured(); initProducts(); initTabs(); initAccordion(); initMap(); initEnquiry(); initContact(); initLightbox(); initReveal();
  });
})();
