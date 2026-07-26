/* ============================================
   DOM Utilities
   Small, dependency-free helpers reused across modules.
   ============================================ */

const DOM = {
  /** querySelector shorthand */
  qs(selector, scope = document) {
    return scope.querySelector(selector);
  },

  /** querySelectorAll -> real array */
  qsa(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  },

  /** Create an element with attributes + children in one call */
  create(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "class") {
        el.className = value;
      } else if (key === "html") {
        el.innerHTML = value;
      } else if (key.startsWith("data-")) {
        el.setAttribute(key, value);
      } else {
        el[key] = value;
      }
    });
    children.forEach((child) => {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else if (child) {
        el.appendChild(child);
      }
    });
    return el;
  },

  /** Fetch + parse JSON with a friendly error */
  async fetchJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("[DOM.fetchJSON]", err);
      return null;
    }
  },

  /** Debounce helper for scroll/resize handlers */
  debounce(fn, wait = 100) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  },

  /** Basic IntersectionObserver wrapper */
  onIntersect(elements, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callback(entry, observer));
    }, options);
    elements.forEach((el) => observer.observe(el));
    return observer;
  }
};

window.DOM = DOM;
