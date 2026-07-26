/* ============================================
   Floating / Parallax Animation
   Subtle ambient motion for decorative elements
   and a light parallax on the hero trophy image.
   ============================================ */

const FloatingAnimation = (() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function floatLoop(el, { amplitude = 10, duration = 4000, delay = 0 } = {}) {
    if (prefersReducedMotion) return;
    el.animate(
      [
        { transform: "translateY(0px)" },
        { transform: `translateY(-${amplitude}px)` },
        { transform: "translateY(0px)" }
      ],
      {
        duration,
        delay,
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  }

  function initFloatingElements() {
    DOM.qsa("[data-float]").forEach((el, i) => {
      const amplitude = Number(el.dataset.floatAmplitude) || 8 + (i % 3) * 4;
      const duration = Number(el.dataset.floatDuration) || 3400 + (i % 4) * 500;
      floatLoop(el, { amplitude, duration, delay: i * 200 });
    });
  }

  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const wrap = DOM.qs("[data-parallax]");
    if (!wrap) return;

    window.addEventListener(
      "pointermove",
      DOM.debounce((e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 10;
        const y = (e.clientY / innerHeight - 0.5) * 10;
        wrap.style.transform = `translate(${x}px, ${y}px)`;
      }, 10),
      { passive: true }
    );
  }

  function init() {
    initFloatingElements();
    initHeroParallax();
  }

  return { init };
})();

window.FloatingAnimation = FloatingAnimation;
