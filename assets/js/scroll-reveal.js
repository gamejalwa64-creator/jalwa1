/**
 * Jalwa Game — Scroll Reveal
 * Lightweight IntersectionObserver-based scroll animation.
 * Tags eligible elements with .jalwa-reveal, then adds
 * .jalwa-visible once they enter the viewport.
 */
(function () {
  "use strict";

  // Elements to animate on scroll
  var SELECTORS = [
    ".entry-content > p",
    ".entry-content > h2",
    ".entry-content > h3",
    ".entry-content > ul",
    ".entry-content > ol",
    ".entry-content > table",
    ".entry-content > .wp-block-image",
    ".entry-content > .wp-block-buttons",
    '.entry-content > [class*="wp-block"]',
    ".inside-article > *",
  ].join(",");

  function init() {
    // Skip if no IntersectionObserver support (old Safari etc.)
    if (!window.IntersectionObserver) return;

    var elements = document.querySelectorAll(SELECTORS);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("jalwa-visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elements.forEach(function (el) {
      // Don't re-reveal elements already in view on load
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        // Already visible on load — just show it immediately
        el.classList.add("jalwa-visible");
      } else {
        el.classList.add("jalwa-reveal");
        observer.observe(el);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
