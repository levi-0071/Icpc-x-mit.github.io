/* ============================================
   Navbar Module
   Handles: sticky background swap, mobile toggle,
   flyout dropdowns, scroll-based active link state.
   ============================================ */

const NavbarModule = (() => {
  let navbar, toggle, links, linkItems, sectionMap;

  function bindScrollState() {
    const onScroll = DOM.debounce(() => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    }, 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function bindMobileToggle() {
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("is-menu-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  function bindFlyouts() {
    linkItems.forEach((item) => {
      const trigger = DOM.qs(".navbar__link", item);
      const flyout = DOM.qs(".navbar__flyout", item);
      if (!flyout || !trigger) return;

      // Desktop: hover; Mobile: click/tap
      trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const willOpen = !item.classList.contains("is-open");
          linkItems.forEach((other) => other.classList.remove("is-open"));
          item.classList.toggle("is-open", willOpen);
        }
      });

      item.addEventListener("mouseenter", () => {
        if (window.innerWidth > 900) item.classList.add("is-open");
      });
      item.addEventListener("mouseleave", () => {
        if (window.innerWidth > 900) item.classList.remove("is-open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target)) {
        linkItems.forEach((item) => item.classList.remove("is-open"));
      }
    });
  }

  function closeMobileMenuOnNavigate() {
    DOM.qsa("a", navbar).forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 900 && !DOM.qs(".navbar__flyout", a.closest(".navbar__link-item") || document)?.contains(a)) {
          navbar.classList.remove("is-menu-open");
          document.body.style.overflow = "";
        }
      });
    });
  }

  function bindActiveLinkOnScroll() {
    const navLinks = DOM.qsa(".navbar__link[href^='#']", navbar);
    sectionMap = navLinks
      .map((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        return section ? { link, section } : null;
      })
      .filter(Boolean);

    if (!sectionMap.length) return;

    const onScroll = DOM.debounce(() => {
      const scrollPos = window.scrollY + (SITE_CONFIG?.animation?.scrollNavOffset || 40) + 80;
      let current = sectionMap[0];
      sectionMap.forEach((entry) => {
        if (entry.section.offsetTop <= scrollPos) current = entry;
      });
      sectionMap.forEach(({ link }) => link.classList.remove("is-active"));
      current.link.classList.add("is-active");
    }, 50);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    navbar = DOM.qs(".navbar");
    if (!navbar) return;
    toggle = DOM.qs(".navbar__toggle", navbar);
    links = DOM.qs(".navbar__links", navbar);
    linkItems = DOM.qsa(".navbar__link-item", navbar);

    bindScrollState();
    bindMobileToggle();
    bindFlyouts();
    closeMobileMenuOnNavigate();
    bindActiveLinkOnScroll();
  }

  return { init };
})();

window.NavbarModule = NavbarModule;
