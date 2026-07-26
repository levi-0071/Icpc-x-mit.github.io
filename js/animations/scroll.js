/* ============================================
   Scroll Animation
   Fades/slides elements in as they enter the
   viewport using IntersectionObserver.
   ============================================ */

const ScrollAnimation = (() => {
  let observer;

  function reveal(entry, obs) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }
  }

  function observeAll() {
    const targets = DOM.qsa("[data-reveal]").filter(
      (el) => !el.classList.contains("is-visible")
    );
    if (!targets.length) return;

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => reveal(entry, observer)),
        { threshold: window.SITE_CONFIG?.animation?.revealThreshold ?? 0.15, rootMargin: "0px 0px -40px 0px" }
      );
    }
    targets.forEach((el) => observer.observe(el));
  }

  function staggerChildren(container, step = 80) {
    DOM.qsa("[data-reveal]", container).forEach((el, i) => {
      el.style.transitionDelay = `${i * step}ms`;
    });
  }

  function init() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      DOM.qsa("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    DOM.qsa("[data-stagger]").forEach((container) => staggerChildren(container));
    observeAll();

    // Re-scan when dynamic content (e.g. roadmap) is injected.
    document.addEventListener("roadmap:rendered", () => {
      const list = DOM.qs("[data-roadmap-list]");
      if (list) staggerChildren(list, 100);
      observeAll();
    });
  }

  return { init, observeAll };
})();

window.ScrollAnimation = ScrollAnimation;
