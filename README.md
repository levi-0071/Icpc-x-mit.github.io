# ICPC Amritapuri 2026 — MIT-WPU

A static, no-build-step, vanilla HTML/CSS/JS site built by **CoDeC** (MIT-WPU's competitive programming club) in partnership with the **Career Development Centre (CDC)**, to guide MIT-WPU students through ICPC Amritapuri Regionals 2026 — registration, benefits, roadmap, and the people running it.

No framework, no bundler, no `npm install`. Open `index.html` through a local server and it just works.

---

## Quick start

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

**Do not open `index.html` directly via `file://`.** Several sections (Roadmap, Notifications, Team, Quick Facts) fetch their content from JSON files in `data/`, and browsers block `fetch()` for local files under `file://` due to CORS. Use Live Server (VS Code), `python3 -m http.server`, or any static file server instead.

Each of those sections *does* have hardcoded fallback data baked into its JS module, so the page won't go fully blank even if opened via `file://` — but you'll be looking at stale fallback content, not what's actually in `data/`.

---

## Project structure

```
├── assets/                  # images (logos, photos, banners) — see "Assets" below
├── css/
│   ├── reset.css            # minimal modern reset
│   ├── variables.css        # design tokens (colors, spacing, type scale, etc.)
│   ├── style.css            # global styles + most sections (hero, about, benefits, resources...)
│   ├── navbar.css
│   ├── components.css       # benefits grid, roadmap timeline, quick facts, help cards
│   ├── notifications.css    # toast + bell dashboard
│   ├── theme.css             # day/night theme variables + toggle button
│   └── final-updates.css    # WhatsApp card, journey card, TEAM cards, hero logo frames, help FAB
├── data/
│   ├── roadmap.json          # registration steps (Roadmap section)
│   ├── notifications.json    # announcements (toast + bell dashboard)
│   └── team.json              # Faculty / Ambassadors / any other groups (Team section)
├── js/
│   ├── config.js              # SITE_CONFIG: links, contact info, quick-facts text
│   ├── app.js                  # boots every module in order, resilient to individual failures
│   ├── utils/
│   │   ├── dom.js              # DOM helpers: qs/qsa/create/fetchJSON/debounce/onIntersect
│   │   └── markdown.js         # markdown-lite renderer (see below) — used by every data-driven module
│   ├── modules/
│   │   ├── navbar.js           # sticky nav, mobile menu, flyouts, scroll-based active link
│   │   ├── theme.js             # day/night toggle, persisted in localStorage
│   │   ├── roadmap.js           # renders data/roadmap.json into the timeline
│   │   ├── notifications.js     # renders data/notifications.json into toast + bell dashboard
│   │   └── team.js               # renders data/team.json into the Team section (generic groups)
│   └── animations/
│       ├── floating.js          # (not covered in this handoff — decorative float-el elements)
│       └── scroll.js             # (not covered in this handoff — drives [data-reveal] fade-ins)
└── index.html
```

**Script load order matters** (see the bottom of `index.html`): `config.js` → `utils/dom.js` → `utils/markdown.js` → `modules/*` → `animations/*` → `app.js`. Each module attaches itself to `window` (e.g. `window.TeamModule`), and `app.js` calls `.init()` on each in `js/app.js`'s `init()` function.

`app.js`'s `init()` wraps every module's init call in a `safeInit()` try/catch — **one module throwing (e.g. a missing script file → `ReferenceError`) no longer breaks the rest of the boot sequence**, including `ScrollAnimation.init()` (which is what removes the `opacity: 0` from every `[data-reveal]` element — if that never runs, the whole page looks "stuck").

---

## The markdown-lite renderer (`js/utils/markdown.js`)

A tiny, **intentionally limited** formatter (not real Markdown) for any text that comes from a JSON data file or `config.js`. It is NOT applied to hardcoded copy inside `index.html` (About, Benefits, Help, etc.) — only to data-driven content.

Two supported patterns:

| Syntax | Renders as |
|---|---|
| `[label](https://example.com)` | `<a href="https://example.com" target="_blank" rel="noopener">label</a>` |
| `=(#3e8ef7)<some text>==` | `<span style="color:#3e8ef7">some text</span>` (accepts `#hex`, bare `hex`, or a CSS color keyword like `gold`) |

Every string is **HTML-escaped first**, then only these two patterns are re-expanded — safe to pipe arbitrary JSON straight into `innerHTML`. Anything that doesn't match the pattern (e.g. a `javascript:` URL, or a nonsense color token) is left as literal escaped text rather than rendered.

Currently wired into:
- `roadmap.js` — step `title` / `description`
- `notifications.js` — dashboard item `title` / `message`
- `team.js` — member `name` / `role`, group `title`
- `app.js`'s `applyConfigLinks()` — any `[data-fact]` element sourced from `SITE_CONFIG.facts`

If you add a new data-driven module, use `MD.render(str)` (returns an HTML string) or `MD.applyTo(el, str)` (sets `el.innerHTML` directly) instead of `el.textContent = str`.

---

## `data/team.json` — the Team section

Fully generic: **any number of groups**, each rendered as a title + a grid of cards. Adding a new category (Volunteers, Mentors, whatever) is a JSON-only change — no HTML/JS edits needed.

```json
{
  "groups": [
    {
      "id": "faculty",
      "title": "Faculty & Coordinators",
      "members": [
        {
          "name": "Person Name",
          "role": "Their role/title",
          "photo": "assets/their-photo.png",   // optional — falls back to an initials avatar
          "phone": "9999999999",                 // optional — renders as a tap-to-call link
          "email": "person@example.com",          // optional — renders as a mailto link
          "link": "https://linkedin.com/in/..."   // optional — makes the WHOLE CARD clickable
        }
      ]
    }
  ]
}
```

Behavior notes:
- **No `photo`** → the card shows a colored circle with the person's initials instead of a broken image.
- **`phone` / `email`** → shown as small contact links inside the card; clicking them does *not* trigger the card's own `link` click (they call `stopPropagation()`).
- **`link`** → the entire card becomes clickable/keyboard-focusable (`tabindex`, `role="link"`, opens in a new tab). Omit it (or set it to `"#"`) to leave the card non-clickable. This is what makes faculty cards, ambassador cards, and any future group all behave identically.
- Card markup/classes (`.team__grid`, `.team-card`, `.team-card__photo`, etc.) live in `css/final-updates.css` — unchanged from the original hand-written markup, so no CSS edits were needed when this became data-driven.

**Known outstanding TODO:** `assets/faculty-Kishanprasad Gunale.png` has a space in the filename. It generally works in a browser but is worth renaming to something like `faculty-kishanprasad-gunale.png` to avoid edge cases with some servers/tools.

---

## `data/roadmap.json` / `data/notifications.json`

Same idea, simpler shape:
- `roadmap.json` → `{ steps: [{ step, icon, title, description }] }`, rendered in order by `roadmap.js` into the timeline under `[data-roadmap-list]`.
- `notifications.json` → a flat array of `{ id, type ("alert"|"info"|"warning"), title, message, date, dateLabel, link, read }`. `link` is looked up against `SITE_CONFIG.links` in `config.js` (or treated as an anchor if it starts with `#`). Read/unread state is tracked client-side in `localStorage` (`icpc-notifications-read`), separate from the `read` flag in the JSON (which is just the initial state for first-time visitors).

---

## `js/config.js` — `SITE_CONFIG`

Central place for links, contact info, and the text shown in the Quick Facts table (`data-fact` elements) and any `data-link` / `data-video-src` elements in `index.html`. **Several values are still placeholders** and need to be filled in before this is truly final:

- `links.howToRegister` — `[HOW_TO_REGISTER_GUIDE_URL]`
- `links.howToRegisterVideo` — `[HOW_TO_REGISTER_VIDEO_ID]`
- `links.whatIsIcpcVideo` — `[WHAT_IS_ICPC_VIDEO_ID]`
- `links.amritapuri2024Highlights` — `[ICPC_2024_HIGHLIGHTS_VIDEO_ID]`
- `links.needATeamForm` / `links.helpForm` — currently both point at the same placeholder Google Form link; confirm whether that's intentional or they should be two separate forms.
- `facts.registrationFee`, `facts.registrationLink`, `facts.registrationDeadline`, `facts.onlinePrelims`, `facts.onsiteSites` — marked "to be confirmed" pending the official CoDeC Welcome Kit.

---

## Hero — CDC / CoDeC logo frames

Two small gold-bordered, gently floating frames sit centered above the "Solve. Collaborate. Conquer." title, pulling from:
- `assets/cdc_banner.png` (shown first / higher, on the left)
- `assets/codec_banner.png` (shown second / offset lower, on the right)

Markup: `.hero__logo-frames` in `index.html` (inside `<section class="hero">`, before `.hero__grid`). Styling/animation: section "4. HERO — CDC / CoDeC GOLDEN LOGO FRAMES" in `css/final-updates.css`. Collapses to a static, centered row above the hero copy at ≤900px; respects `prefers-reduced-motion`.

**If these look broken/missing:** the files must exist at exactly `assets/cdc_banner.png` and `assets/codec_banner.png` (case-sensitive). A 404 in the console for either filename means the file isn't there or is misnamed.

---

## Assets checklist

Files referenced by the current code that must exist in `assets/` for everything to render correctly:

| File | Used by |
|---|---|
| `hero-bg.jpg` / `hero-bg-day.jpg` | Hero background (night/day theme) |
| `icpc-trophy.jpg` | Hero visual |
| `journey-preview.jpg` | Roadmap section "journey" card |
| `logo-night.png` / `logo-day.png` | Navbar brand logo (theme-swapped) |
| `cdc_banner.png` / `codec_banner.png` | Hero golden logo frames |
| `team-harshvardhan.png` | Team → Ambassadors |
| `team-rugved.jpg` | Team → Ambassadors |
| `faculty-Kishanprasad Gunale.png` | Team → Faculty (⚠️ space in filename, see above) |

---

## Things to know / gotchas for whoever picks this up next

1. **`file://` won't fetch JSON.** Always serve locally. See "Quick start."
2. **`app.js` init order is intentional and defensive.** If a new module throws during `init()`, it's caught and logged, not fatal to the rest of the page — but the module itself obviously still won't render. Check the console for `[App] <ModuleName> failed to init:`.
3. **Adding a new data-driven module?** Follow the `roadmap.js` / `team.js` pattern: fetch via `DOM.fetchJSON`, fall back to a hardcoded `FALLBACK_DATA` constant if the fetch fails, render via `DOM.create(...)`, and pipe any user-facing string through `MD.render()` / `MD.applyTo()` rather than raw `textContent`/`innerHTML`.
4. **`css/style.css` and `css/components.css` were intentionally left mostly untouched** during this round of work — new/changed styling was added to `css/final-updates.css` instead, to keep the diff contained. `css/components.css` still has unused `.faculty-card` / `.faculty__grid` rules left over from before Team became data-driven — harmless (unused CSS), but fine to remove if you want to tidy up.
5. **This README itself is a snapshot** — as of the point this was written, Team/Roadmap/Notifications are data-driven and markdown-lite-rendered, and the hero has the CDC/CoDeC logo frames. If more changes land after this, update this file too so it stays trustworthy for the next handoff.