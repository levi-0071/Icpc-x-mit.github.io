# ICPC Amritapuri Regionals 2026 — MIT-WPU Information Website

A static, responsive information site built for **CoDeC** (MIT World Peace University's competitive programming club) to help students understand, prepare for, and register for **ICPC Amritapuri Regionals 2026**. Built in partnership with the **Career Development Centre (CDC)**.

## Description

The site is a single-page reference covering:

- What CoDeC, CDC, MIT-WPU, and ICPC Amritapuri Regionals 2026 are
- Why participating is worth it (skills, recognition, networking, certificates)
- A five-step roadmap for how to register, rendered dynamically from JSON
- A quick-facts table for team size, fees, deadlines, and contacts
- Video and link resources, a "need a team?" help section, and social links

It's built with plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no dependencies. Open `index.html` and it works.

## File Structure

```
Website/
├── index.html                 # Single-page site, all sections
├── README.md
├── assets/
│   ├── icpc-trophy.jpg        # Hero foreground trophy image
│   ├── hero-bg.jpg            # Hero background — night theme
│   ├── hero-bg-day.jpg        # Hero background — day theme
│   ├── logo-night.png         # Navbar logo — night theme (transparent bg)
│   ├── logo-day.png           # Navbar logo — day theme (transparent bg)
│   ├── team-harshvardhan.jpg  # Team section photo
│   ├── team-rugved.jpg        # Team section photo
│   └── journey-preview.jpg    # "Every expert started as a beginner" roadmap graphic
├── css/
│   ├── variables.css          # Colors, fonts, spacing tokens (incl. hero bg/overlay tokens)
│   ├── reset.css              # Browser reset
│   ├── style.css              # Global styles, typography, hero (+ background layer), about, resources
│   ├── navbar.css             # Navbar & flyout dropdown logic
│   ├── footer.css             # Footer & watermark
│   ├── components.css         # Benefit cards, roadmap timeline, facts table, help cards
│   ├── notifications.css      # Side toast, bell icon, and slide-out announcement dashboard
│   ├── theme.css              # Day/night theme toggle: light-palette overrides + toggle button
│   └── final-updates.css      # Team section, WhatsApp community card, journey card, floating help button
├── js/
│   ├── config.js               # Global variables (links, team roster, contact info, facts)
│   ├── app.js                  # Boots all modules, wires config into the DOM
│   ├── modules/
│   │   ├── navbar.js            # Mobile menu, dropdowns, scroll-based active link
│   │   ├── roadmap.js           # Loads roadmap.json, renders the timeline
│   │   ├── notifications.js     # Toast on load + bell dashboard, unread tracking (localStorage)
│   │   └── theme.js             # Day/night toggle button wiring (localStorage-persisted)
│   ├── animations/
│   │   ├── floating.js         # Floating/parallax decorative motion
│   │   └── scroll.js           # Scroll-triggered fade/slide-in reveals
│   └── utils/
│       └── dom.js              # Shared DOM helper functions
└── data/
    ├── roadmap.json            # Registration steps (title, description, step number)
    ├── notifications.json      # Announcement history (title, message, date, type, read state)
    └── team.json                # Campus Ambassador / contact info
```

## Setup Instructions

No build tools or package installation required.

**Option 1 — Open directly**
Double-click `index.html`, or open it via your browser's File > Open menu.

**Option 2 — Local server (recommended, avoids any browser fetch/CORS quirks with `data/*.json`)**

```bash
cd Website
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or with VS Code's **Live Server** extension: right-click `index.html` → "Open with Live Server".

## Before Going Live — Placeholders to Fill In

A few values are intentionally left as placeholders in `js/config.js` (`SITE_CONFIG.links` and `SITE_CONFIG.facts`) — search for `TODO` and `To be confirmed`:

- Official ICPC registration link
- Registration fee and deadline
- "Need a Team" Google Form/Doc link
- "How to Register" detailed guide link
- "What is ICPC" and "Amritapuri 2024 Highlights" YouTube video IDs
- GitHub / Twitter / Discord links in the footer and Stay Updated section

Once real values are available, updating `js/config.js` alone updates every place these appear across the site — no need to touch `index.html`.

## Development Log

| Date | Change |
|------|--------|
| 2026-07-26 | Initial project scaffold: file structure, design tokens, and CSS reset created. |
| 2026-07-26 | Built navbar with sticky behavior, flyout dropdowns, and mobile menu (`navbar.css`, `js/modules/navbar.js`). |
| 2026-07-26 | Built hero section with trophy visual and step-preview rail, referencing supplied design mockup. |
| 2026-07-26 | Added About section (CoDeC, CDC, MIT-WPU, ICPC Amritapuri Regionals 2026) with card grid layout. |
| 2026-07-26 | Added Benefits section as a four-card grid covering skill-building, recognition, networking, and beyond-the-contest. |
| 2026-07-26 | Implemented dynamic roadmap: `data/roadmap.json` + `js/modules/roadmap.js` render the five-step registration timeline. |
| 2026-07-26 | Added Quick Facts table and Resources section (video embeds + links), wired to `js/config.js`. |
| 2026-07-26 | Added Help/Support cards, Stay Updated social section, and footer with watermark. |
| 2026-07-26 | Added scroll-reveal animation (`animations/scroll.js`) and floating/parallax effects (`animations/floating.js`), respecting `prefers-reduced-motion`. |
| 2026-07-26 | Compressed hero trophy image (PNG → JPG, ~2.1 MB → ~220 KB) for load performance. |
| 2026-07-26 | Verified JSON data files parse correctly and did a local static-server smoke test of `index.html`. |
| 2026-07-26 | Added announcement popup feature: `css/popup.css` (glassmorphism card, gradient text/progress bar), `js/modules/popup.js` (auto-open on load, 5s auto-close with visual countdown, manual close via ×/backdrop/Escape, pauses on hover/touch). Wired into `index.html` and `js/app.js`. |
| 2026-07-26 | Link integration completed: registration, "Need a Team" form, "How to Register" video, "ICPC 2024 Highlights" video, and LinkedIn all centralized in `js/config.js` and placed per the site's link-placement plan (Hero, Roadmap, About ICPC, Help, Footer, Stay Updated, and the new popup). |
| 2026-07-26 | Remaining placeholders flagged with `[BRACKETED]` markers and `TODO` comments in `js/config.js`: `needATeamForm` Google Doc URL, `howToRegister` guide URL, `howToRegisterVideo` and `whatIsIcpcVideo`/`amritapuri2024Highlights` YouTube video IDs. Registration URL currently set to `icpc-registration.com` per provided spec — confirm this is the official domain before launch. |
| 2026-07-26 | Notification system implemented — replaced the center announcement popup with a side toast (`css/notifications.css`, `js/modules/notifications.js`) that slides in from the right on load and auto-hides after 6s, plus a bell icon in the navbar opening a slide-out announcement dashboard with unread tracking (`localStorage`-backed) and a red badge count. Old `css/popup.css` / `js/modules/popup.js` removed; `js/app.js` now boots `NotificationsModule` instead of `PopupModule`. |
| 2026-07-26 | Added `data/notifications.json` (loaded the same way as `data/roadmap.json`) holding the announcement history — title, message, date, type (alert/info/warning), and read state — with an inline fallback in `notifications.js` if the fetch fails. |
| 2026-07-26 | Hero background image added — `assets/hero-bg.jpg` set as a full-bleed cover background on `.hero` (`css/style.css`) with a dark gradient overlay (~65–75% opacity) for text readability; falls back to `--color-bg` if the image fails to load. |
| 2026-07-26 | Day mode added — `css/theme.css` (light-palette token overrides + toggle button styles) and `js/modules/theme.js` (persists choice in `localStorage`, applied via `data-theme="day"` on `<html>`). Toggle button (🌙/☀️) added to the navbar next to the notification bell. A tiny inline script in `<head>` applies the saved theme before first paint to avoid a flash of the wrong theme. Hero background swaps to `assets/hero-bg-day.jpg` (light trophy photo) with a light overlay gradient in day mode, driven by the new `--hero-bg-image`/`--hero-overlay` tokens in `variables.css`. |
| 2026-07-26 | Final features added — Team section with faculty and student ambassadors (`css/final-updates.css`, new `#team` section in `index.html`, roster data in `js/config.js`): Faculty & Coordinators (Kishanprasad Gunale Sir – Director, CDC; Mihir Mohite – CoDeC President; Saket Tembekar – Member at CDC) and Student Team cards for Harshvardhan Rathod and Rugved Dusane with photo, phone, and email. |
| 2026-07-26 | WhatsApp community integration — the old "Stay Updated" section is now "Join our community": a prominent WhatsApp card (`.whatsapp-card`) linking to the CoDeC WhatsApp group, plus the LinkedIn pill. Discord and GitHub links/icons removed site-wide (navbar, footer, resources, config). |
| 2026-07-26 | Floating help button added — fixed bottom-right `.help-fab` with a pulse animation, linking to `links.helpForm` in `js/config.js` (placeholder — swap in the real Google Form URL). |
| 2026-07-26 | Registration link updated everywhere via `js/config.js` → `links.registration` (`https://amritaicpc.in/...`), since every registration button/link on the site reads from this single config value. |
| 2026-07-26 | Important dates added to Quick Facts (`index.html` `#facts`, `js/config.js` `facts`): registration closes Sept 25, 2026; online prelims Oct 3, 2026 (2.5 hrs); onsite regionals Jan 2–3, 2026 (Kollam, Bengaluru, Coimbatore, Mysuru). |
| 2026-07-26 | Logo integration — navbar brand text replaced with the MIT-WPU × ICPC Foundation logo (`assets/logo-night.png` / `assets/logo-day.png`, background removed), theme-swapped the same way as the day/night toggle icon. |
| 2026-07-26 | Notification auto-hide simplified — removed the hover/touch pause-timer behavior so the toast reliably disappears exactly 6 seconds after it appears (still dismissible early via ×), per updated requirements. |
| 2026-07-26 | Added `journey-card` to the Roadmap section — the "every expert started as a beginner" milestone graphic, framed to sit cleanly in both themes. |

## Notes

- All colors, fonts, and spacing live in `css/variables.css` — change the palette or type scale in one place.
- Team size, fees, and links are centralized in `js/config.js` and injected into the DOM via `data-link`, `data-video-src`, and `data-fact` attributes in `index.html`.
- Reduced-motion users automatically skip floating/parallax effects and scroll reveals resolve instantly.
