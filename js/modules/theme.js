/* ============================================
   Theme Module
   Toggles between the site's default "night" theme
   and a "day" (light) theme by setting
   data-theme="day" on <html>. Preference is persisted
   in localStorage. The initial theme is applied by a
   tiny inline script in <head> (before CSS paints) so
   there's no flash of the wrong theme — this module
   just wires up the toggle button and keeps its icon
   in sync.
   ============================================ */

const ThemeModule = (() => {
  const STORAGE_KEY = "icpc-theme";

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") === "day" ? "day" : "night";
  }

  function applyTheme(theme) {
    if (theme === "day") {
      document.documentElement.setAttribute("data-theme", "day");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* ignore quota/private-mode errors — non-critical */
    }
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    const toggle = DOM.qs("[data-theme-toggle]");
    if (!toggle) return;
    toggle.setAttribute(
      "aria-label",
      theme === "day" ? "Switch to night mode" : "Switch to day mode"
    );
  }

  function toggle() {
    applyTheme(getTheme() === "day" ? "night" : "day");
  }

  function init() {
    const toggleBtn = DOM.qs("[data-theme-toggle]");
    updateToggleLabel(getTheme());
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", toggle);
  }

  return { init, toggle, applyTheme, getTheme };
})();

window.ThemeModule = ThemeModule;
