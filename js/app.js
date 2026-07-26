/* ============================================
   App
   Boots all modules once the DOM is ready.
   Load order (see index.html): config -> utils
   -> modules -> animations -> app.
   ============================================ */

(function App() {
  function setNavHeightVar() {
    const navbar = DOM.qs(".navbar");
    if (!navbar) return;
    document.documentElement.style.setProperty("--nav-height", `${navbar.offsetHeight}px`);
  }

  function setCurrentYear() {
    const yearEl = DOM.qs("[data-current-year]");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function applyConfigLinks() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    DOM.qsa("[data-link]").forEach((el) => {
      const key = el.dataset.link;
      const value = key.split(".").reduce((obj, k) => obj?.[k], cfg.links);
      if (value) el.setAttribute("href", value);
    });

    DOM.qsa("[data-video-src]").forEach((el) => {
      const key = el.dataset.videoSrc;
      const value = cfg.links[key];
      if (value) el.setAttribute("src", value);
    });

    DOM.qsa("[data-fact]").forEach((el) => {
      const key = el.dataset.fact;
      if (cfg.facts[key]) MD.applyTo(el, cfg.facts[key]);
    });
  }

  async function safeInit(name, fn) {
    try {
      await fn();
    } catch (err) {
      console.error(`[App] ${name} failed to init:`, err);
    }
  }

  async function init() {
    applyConfigLinks();
    setCurrentYear();

    await safeInit("NavbarModule", () => NavbarModule.init());
    await safeInit("ThemeModule", () => ThemeModule.init());
    setNavHeightVar();
    window.addEventListener("resize", DOM.debounce(setNavHeightVar, 150));

    await safeInit("RoadmapModule", () => RoadmapModule.init());
    await safeInit("NotificationsModule", () => NotificationsModule.init());
    await safeInit("TeamModule", () => TeamModule.init());

    await safeInit("FloatingAnimation", () => FloatingAnimation.init());
    await safeInit("ScrollAnimation", () => ScrollAnimation.init());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
