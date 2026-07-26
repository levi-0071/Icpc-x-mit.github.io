/* ============================================
   Markdown-lite
   A tiny, intentionally-limited "markdown" renderer
   for content that comes from data files (JSON) or
   config.js — NOT full Markdown, just the two pieces
   of formatting the site actually needs:

     1. Links:   [label](https://example.com)
                 -> <a href="https://example.com">label</a>

     2. Colored text: =(#3e8ef7)<some text>==
                 -> <span style="color:#3e8ef7">some text</span>
                 (accepts hex like #fff / #3e8ef7, or a CSS
                 color keyword like =(gold)<text>==)

   Every input string is HTML-escaped FIRST, then only
   these two patterns are re-expanded into real markup.
   This keeps it safe to pipe arbitrary JSON content
   straight into innerHTML.
   ============================================ */

const MD = (() => {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeColor(token) {
    if (/^#[0-9a-fA-F]{3,8}$/.test(token)) return token; // already #hex
    if (/^[0-9a-fA-F]{3,8}$/.test(token)) return `#${token}`; // bare hex
    if (/^[a-zA-Z]+$/.test(token)) return token; // CSS color keyword
    return null; // reject anything else (no CSS injection via unknown tokens)
  }

  function renderColorSpans(html) {
    return html.replace(
      /=\(([^)]+)\)&lt;(.+?)&gt;==/g,
      (match, colorToken, text) => {
        const color = normalizeColor(colorToken.trim());
        if (!color) return match; // leave unrecognized syntax untouched
        return `<span style="color:${color}">${text}</span>`;
      }
    );
  }

  function renderLinks(html) {
    return html.replace(
      /\[([^\[\]]+)\]\(([^()\s]+)\)/g,
      (match, label, url) => {
        const isSafe = /^(https?:|mailto:|tel:|#)/i.test(url);
        if (!isSafe) return match; // don't linkify anything sketchy (e.g. javascript:)
        const isExternal = /^https?:/i.test(url);
        return `<a href="${url}"${isExternal ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
      }
    );
  }

  /** Render a raw data string into safe HTML with links + colored spans applied. */
  function render(raw) {
    if (raw === null || raw === undefined) return "";
    let html = escapeHtml(raw);
    html = renderColorSpans(html);
    html = renderLinks(html);
    return html;
  }

  /** Convenience: render `raw` and set it as an element's innerHTML. */
  function applyTo(el, raw) {
    if (!el) return;
    el.innerHTML = render(raw);
  }

  return { render, applyTo, escapeHtml };
})();

window.MD = MD;
