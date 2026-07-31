# ICPC Amritapuri 2026 × MIT-WPU — site README

Static, vanilla HTML/CSS/JS site (no build step, no framework, no
dependencies). Open `index.html` on a local server and it works.
This file is written for whoever — human or AI agent — picks this
project up next.

## Quick start

```bash
# any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

Don't open `index.html` via `file://` directly — `fetch()` calls for
`data/team.json`, `data/roadmap.json`, and `data/notifications.json`
are blocked by CORS under `file://` in most browsers. (Text content
from `data/content.js` and `js/config.js` still works under
`file://` since those load as `<script>` tags, not `fetch`, but the
JSON-backed sections will silently fall back to their hardcoded
`FALLBACK_*` data — see "The two flavors of data" below.)

## What changed in this pass (read this first)

Starting point: a site where team/roadmap/notifications were already
JSON-driven, but **everything else was hardcoded directly in
`index.html`** — hero copy, About cards, Benefit cards, Quick Facts
labels, Resources, Help cards, the community section, and the
footer. The brief was four things:

1. **Bigger top-left logo, placeholder logo on the top-right.**
   `.navbar__logo` (the existing MIT-WPU × ICPC lockup) is now
   46px/54px/64px tall depending on viewport instead of a flat
   34px/40px. A new `.navbar__partner-logo` slot was added on the
   right, pointing at `assets/banner.png`. **That file doesn't exist
   yet** — until it's added, an `onerror` handler swaps in a dashed
   placeholder box that reads "Add assets/banner.png" (styled in
   `css/navbar.css`, search `--empty`) so nothing looks broken in
   the meantime. Drop a same-aspect logo in as `assets/banner.png`
   and the placeholder disappears automatically — no code changes
   needed. It's hidden below 1080px width by design (there's already
   a primary "Register Now" CTA competing for space there).

2. **All remaining hardcoded copy moved to data.** New file
   `data/content.js` (`window.SITE_CONTENT`) holds it, and new
   module `js/modules/content.js` (`ContentModule`) renders it into
   the empty containers left in `index.html`. See "The two flavors
   of data" below for how this relates to the JSON files and
   `js/config.js`.

3. **Mobile + TV responsiveness.** The site already handled phone
   breakpoints down to 480px reasonably well. Added: a sub-380px
   breakpoint (`css/style.css`) for the smallest/oldest phones, and
   a large-screen tier at 1600px/2200px (`css/variables.css`) that
   widens `--container-width` and the large spacing tokens so the
   page doesn't look small and margin-heavy on a TV-sized display.
   Type sizes were left alone — they already cap via `clamp()` in
   `--fs-hero` / `--fs-h1` / `--fs-h2`, so they don't need a separate
   large-screen rule.

4. **Smoother / more defined theme.** `--color-border` /
   `--color-border-strong` are slightly more opaque in both night
   and day mode (cards and dividers read more distinctly). Added a
   `background-color`/`border-color`/`box-shadow`/`color` transition
   to the main surfaces (navbar, cards, footer, notification
   panels — see the list in `css/style.css` right under `body {}`)
   so toggling day/night eases instead of snapping, with a
   `prefers-reduced-motion` opt-out.

Everything else — the roadmap/team/notifications JSON pipeline, the
markdown-lite renderer, the scroll-reveal/floating animations, the
theme toggle logic — is unchanged and still works the way it always
did.

## The two flavors of data

Two different files hold "data" for two different reasons — know
which one to edit:

- **`js/config.js` (`SITE_CONFIG`)** — *facts that change every
  cycle*: dates, fees, links (registration URL, WhatsApp invite,
  YouTube video IDs), contact names/emails. Small, uses `key: value`
  pairs, gets pulled onto the page via `data-link` / `data-video-src`
  / `data-fact` attributes (see `applyConfigLinks()` in `js/app.js`).
  This was already the pattern before this pass — untouched.

- **`data/content.js` (`SITE_CONTENT`)** — *page copy and section
  structure*: headings, lead paragraphs, card titles/bodies, list
  items, nav flyout descriptions, footer columns. Bigger, nested
  objects, rendered by `js/modules/content.js` (`ContentModule`).
  **New in this pass.**

They cross-reference each other on purpose instead of duplicating
data: e.g. the Quick Facts note and footer "Contact" link pull
ambassador names/email straight from `SITE_CONFIG.contact`, and
video cards reference a `videoKey` that resolves through
`SITE_CONFIG.links` — so a YouTube ID only ever needs updating in
one place.

`data/team.json`, `data/roadmap.json`, `data/notifications.json`
remain separate, unchanged, and are still owned by
`js/modules/team.js` / `roadmap.js` / `notifications.js`
respectively — `ContentModule` only renders the section *headers*
around them (eyebrow/title/lead), never the JSON-driven content
itself.

### If you need to change on-page text

Edit `data/content.js`. No HTML edits needed for copy changes,
adding/removing a benefit card, reordering About cards, adding a
footer link, etc. — that file is a plain JS object literal with a
comment above every section. It supports the same tiny markdown as
`SITE_CONFIG.facts` (see `js/utils/markdown.js`):
`[label](https://url)` for links, `=(#hex or keyword)<text>==` for a
colored span.

### If you need to change dates/fees/links

Edit `js/config.js` → `SITE_CONFIG.facts` / `.links` / `.contact`.

### If you need to add/remove a team member, roadmap step, or announcement

Edit the matching JSON file in `data/` — no JS/HTML changes needed,
same as before this pass.

## Load order matters

`index.html`'s closing `<script>` block is order-dependent:

```
config.js → data/content.js → utils/dom.js → utils/markdown.js
  → modules/content.js → modules/navbar.js → modules/theme.js
  → modules/roadmap.js → modules/notifications.js → modules/team.js
  → animations/* → app.js
```

`js/app.js` boots everything in `init()`. **`ContentModule.init()`
runs first**, before `applyConfigLinks()` and before
`NavbarModule.init()` — it has to, since it builds the DOM nodes
(hero actions, nav flyout items, help-card CTAs, footer links, etc.)
that carry the `data-link` / `data-video-src` / `data-fact`
attributes `applyConfigLinks()` fills in, and the flyout `<a>`
elements `NavbarModule` attaches hover/click handlers to. If you add
a new module that depends on rendered content existing, initialize
it after `ContentModule` in that same `init()` function.

## Architecture at a glance

```
index.html          Structure only. Every section that has
                     copy now holds an empty container with a
                     data-content-* attribute instead of literal
                     text — see js/modules/content.js for what
                     fills each one.

data/
  content.js         SITE_CONTENT — page copy (see above)
  team.json          Faculty + Campus Ambassador cards
  roadmap.json        "How to register" steps
  notifications.json  Toast + announcement dashboard items

js/
  config.js          SITE_CONFIG — facts/links/contact (see above)
  utils/
    dom.js           DOM.qs/qsa/create/fetchJSON/debounce/onIntersect
    markdown.js      MD.render — the only "markdown" the site has:
                      links + colored spans, nothing else
  modules/
    content.js       NEW. Renders SITE_CONTENT into index.html
    navbar.js        Sticky bg, mobile menu, flyouts, active-link
    theme.js         Day/night toggle (localStorage-persisted)
    roadmap.js       Renders data/roadmap.json
    notifications.js Renders data/notifications.json
    team.js          Renders data/team.json (any number of groups)
  animations/
    floating.js      Decorative floating elements
    scroll.js         [data-reveal] fade/slide-in on scroll
  app.js             Boots every module in the right order

css/
  variables.css      Design tokens, incl. the new TV breakpoint
  reset.css
  style.css          Global type/layout + the new small-phone
                      breakpoint + the new theme-transition rules
  navbar.css         Incl. the new bigger logo + partner-logo slot
  components.css     Benefits/roadmap/facts/help section styles
  footer.css         Incl. the new nested footer__grid-columns
                      wrapper (content.js renders into it)
  notifications.css
  theme.css          Day-mode token overrides
  final-updates.css  Team cards, WhatsApp card, hero logo frames,
                      floating help button
```

## Assets checklist

Everything below is referenced by path but not included in this
handoff (no binary files were touched/generated this pass — only
`.html`/`.css`/`.js` files changed). Confirm these exist in
`assets/` before shipping:

| File | Used for | Status |
|---|---|---|
| `logo-night.png` / `logo-day.png` | Top-left navbar brand logo | existing |
| **`banner.png`** | **New top-right partner/sponsor logo slot** | **missing — add this** |
| `cdc_banner.png` / `codec_banner.png` | Floating gold-framed logos in the hero | existing |
| `hero-bg.jpg` / `hero-bg-day.jpg` | Hero background photo (per theme) | existing |
| `icpc-trophy.jpg` | Hero trophy image | existing |
| `journey-preview.jpg` | Roadmap section "journey" card | existing |
| `faculty-Kishanprasad-Gunale.png` | Referenced in `data/team.json` if used | existing |
| `team-harshvardhan.png` / `team-rugved.jpg` | Ambassador cards | existing |

For `banner.png`: match the height/aspect the existing
`logo-night.png` uses if possible — `.navbar__partner-logo img` is
capped at `max-width: 160px` (`220px` on TV screens) and scales to
the same height as the brand logo, so a roughly landscape/square
mark will sit best. Transparent background recommended (surface
color shows through padding in dark/light mode).

## Things to know / gotchas for whoever picks this up next

- **Don't hand-edit rendered DOM.** Any content inside a
  `[data-content-*]`, `[data-team-groups]`, `[data-roadmap-list]`,
  or `[data-notif-*]` container gets wiped and rebuilt by JS on
  every page load. Edit the source data file instead.
- **Icons live in code, not data.** `ContentModule`'s `ICONS` object
  (top of `js/modules/content.js`) holds the SVG markup for benefit/
  help-card icons, hero action icons, and social icons — same split
  `js/modules/team.js` already used for its phone/email icons.
  `data/content.js` only references icons by key (e.g. `icon:
  "layers"`); it never contains raw SVG.
- **The markdown-lite renderer is intentionally tiny.** It's link +
  colored-span only (see `js/utils/markdown.js`) — not real
  Markdown. Every string rendered through `MD.render()`/
  `MD.applyTo()` is HTML-escaped first, so it's safe to put
  arbitrary text (including a stray `<`/`>`) in `data/content.js` or
  the JSON files without breaking the page.
- **Theme is night-by-default**, persisted via
  `localStorage["icpc-theme"]`, applied pre-paint via the inline
  `<script>` in `<head>` (avoids a flash of the wrong theme).
- **`--nav-height`** is set dynamically from the navbar's actual
  rendered height (`js/app.js` → `setNavHeightVar()`) and used by
  `.hero__logo-frames` positioning and the mobile nav overlay's
  `top` offset — if you change navbar padding/height, this still
  self-corrects, no hardcoded pixel value to chase down.
- **`safeInit()` in `js/app.js`** wraps every module's `init()` in a
  try/catch that logs and continues rather than throwing — one
  broken module (e.g. a malformed `data/content.js`) won't blank the
  whole page, though sections that module owns will stay empty.
  Check the browser console first if something isn't rendering.

## Possible next steps (not done in this pass — scoping notes only)

- The `resources__grid` currently renders one video card from
  `data/content.js`; the container is already a responsive
  `auto-fit` grid, so adding more entries to
  `SITE_CONTENT.resources.videos` is enough to add cards — no CSS
  changes needed.
- If `assets/banner.png` turns out to need a light + dark variant
  (like the brand logo does), that'd mean adding a
  `--day`/`--night` pair the same way `.navbar__logo--night` /
  `.navbar__logo--day` work today, plus a matching override in
  `css/theme.css`.
