// timdehaan.me — menu, contact form, footer year. No dependencies.
(function () {
  var EMAIL = "tim@timdehaan.me";

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var links = document.getElementById("site-menu");
  if (toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 620) setMenu(false);
    });
  }

  // Show the name in the phone menu bar once it sticks (home page)
  var nav = document.querySelector(".home .site-nav");
  if (nav && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    nav.parentNode.insertBefore(sentinel, nav);
    new IntersectionObserver(function (entries) {
      nav.classList.toggle("stuck", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  // Contact form — posts to Web3Forms and shows the result on the page.
  // (Without JavaScript the form still posts normally and Web3Forms shows its own thank-you page.)
  var form = document.getElementById("contact-form");
  if (form) {
    var note = document.getElementById("form-note");
    var button = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      d.set("subject", "Intro call: " + (d.get("company") || d.get("name")));
      d.set("replyto", d.get("email"));
      button.disabled = true;
      button.textContent = "Sending…";
      fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: d })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res.success) throw new Error(res.message || "Send failed");
          form.querySelectorAll("label, .form-row, button").forEach(function (el) { el.style.display = "none"; });
          note.innerHTML = "Thanks, it’s on its way. I’ll reply personally, usually within a business day. " +
            'Want to skip ahead? <a href="https://calendar.app.google/o5hBPfkuwhMshJ2h6" target="_blank" rel="noopener">Book a 20-minute call</a>.';
          note.style.color = "var(--ink)";
          note.style.fontSize = "17px";
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = "Send to Tim";
          note.innerHTML = 'Sorry, that didn’t send. Please email <a href="mailto:' + EMAIL + '">' + EMAIL + "</a> instead.";
        });
    });
  }
})();
