// Shared behavior for the Experience and Projects pages:
//  - fade-in-on-scroll for elements with .pf-reveal
//  - category filter buttons (.pf-filter[data-filter]) for cards with data-categories
(function () {
  var root = document.querySelector(".pf");
  if (!root) return;

  // Scroll reveal (skipped if the browser lacks IntersectionObserver or the user prefers reduced motion).
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    root.classList.add("pf-js");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("pf-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    root.querySelectorAll(".pf-reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  // Category filters.
  var buttons = root.querySelectorAll(".pf-filter");
  var cards = root.querySelectorAll("[data-categories]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-categories") || "").split(" ");
        var show = f === "all" || cats.indexOf(f) !== -1;
        card.hidden = !show;
        if (show) card.classList.add("pf-in");
      });
    });
  });
})();
