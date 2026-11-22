// timdehaan.me — menu, contact form, footer year. No dependencies.
(function () {
  // ---- Contact form mode -------------------------------------------------
  // "mailto"  : works on GitHub Pages. Opens the visitor's email app, pre-filled.
  // "netlify" : use if you host on Netlify. The form has data-netlify="true",
  //             so Netlify Forms will collect submissions in your dashboard.
  var FORM_MODE = "mailto";
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

  // Contact form
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (FORM_MODE === "netlify") return;
      e.preventDefault();
      var d = new FormData(form);
      var subject = "Intro call: " + (d.get("company") || d.get("name"));
      var body =
        "Name: " + d.get("name") +
        "\nEmail: " + d.get("email") +
        "\nCompany: " + (d.get("company") || "-") +
        "\nCompany size: " + (d.get("size") || "-") +
        "\n\nBiggest recurring issue:\n" + d.get("message");
      window.location.href =
        "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      var note = document.getElementById("form-note");
      if (note) note.textContent = "Your email app should open with the message ready to send. If it doesn’t, email " + EMAIL + " directly.";
    });
  }
})();
