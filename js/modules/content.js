/* ============================================
   Content Module
   Renders every section driven by data/content.js
   (SITE_CONTENT) into the empty containers left in
   index.html. Structural/decorative SVG icons are kept
   here (not in the data file) since they're markup, not
   copy — same split js/modules/team.js uses for its
   PHONE_ICON / EMAIL_ICON constants.

   Sections handled: notification toast, navbar flyouts,
   hero, about, benefits, roadmap header + video + journey
   card, quick facts (header + table + note), resources,
   help, community, team header, footer.

   data/roadmap.json, data/team.json, and data/notifications.json
   remain the responsibility of their own modules — this
   module only fills in the copy around them.
   ============================================ */

const ContentModule = (() => {
  const ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 5v14l11-7z"/></svg>',
    layers: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>',
    star: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.9 6.3L21 9.3l-4.5 4.4L17.5 21 12 17.8 6.5 21l1-7.3L3 9.3l6.1-1z"/></svg>',
    users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M17 11a4 4 0 100-8M1 21v-2a4 4 0 014-4h8a4 4 0 014 4v2M23 21v-2a4 4 0 00-3-3.87"/></svg>',
    sparkle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    "arrow-sm": '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.71.45 3.38 1.3 4.85L2.05 22l5.36-1.4a9.9 9.9 0 004.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a15.7 15.7 0 01-1.62-.6c-2.85-1.23-4.7-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09 1-2.38c.24-.27.53-.34.71-.34s.36 0 .52.01c.17.01.39-.06.6.46.24.58.8 2 .87 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.88.27.14.45.2.51.32.07.11.07.66-.17 1.35z"/></svg>',
    "whatsapp-lg": '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.71.45 3.38 1.3 4.85L2.05 22l5.36-1.4a9.9 9.9 0 004.63 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a15.7 15.7 0 01-1.62-.6c-2.85-1.23-4.7-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09 1-2.38c.24-.27.53-.34.71-.34s.36 0 .52.01c.17.01.39-.06.6.46.24.58.8 2 .87 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.88.27.14.45.2.51.32.07.11.07.66-.17 1.35z"/></svg>',
    linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'
  };

  // ---------------------------------------------
  // Notification toast
  // ---------------------------------------------
  function renderNotifToast(content) {
    const t = content.notifToast;
    if (!t) return;
    const icon = DOM.qs("[data-content-toast-icon]");
    const title = DOM.qs("[data-content-toast-title]");
    const primary = DOM.qs("[data-content-toast-primary]");
    const secondary = DOM.qs("[data-content-toast-secondary]");
    if (icon) icon.textContent = t.icon;
    if (title) title.textContent = t.title;
    if (primary) primary.childNodes[0].nodeValue = `${t.primaryLabel} `;
    if (secondary) secondary.textContent = t.secondaryLabel;
  }

  // ---------------------------------------------
  // Navbar flyouts
  // ---------------------------------------------
  function renderNavFlyouts(content) {
    Object.entries(content.nav || {}).forEach(([key, items]) => {
      const flyout = DOM.qs(`[data-content-flyout="${key}"]`);
      if (!flyout) return;
      const frag = document.createDocumentFragment();
      items.forEach((item) => {
        frag.appendChild(
          DOM.create("a", { href: item.href }, [
            DOM.create("span", { class: "navbar__flyout-title", html: MD.render(item.title) }),
            DOM.create("span", { class: "navbar__flyout-desc", html: MD.render(item.desc) })
          ])
        );
      });
      flyout.appendChild(frag);
    });
  }

  // ---------------------------------------------
  // Hero
  // ---------------------------------------------
  function renderHero(content) {
    const h = content.hero;
    if (!h) return;

    const eyebrow = DOM.qs("[data-content-hero-eyebrow]");
    if (eyebrow) MD.applyTo(eyebrow, h.eyebrow);

    const title = DOM.qs("[data-content-hero-title]");
    if (title) {
      title.innerHTML = "";
      (h.titleLines || []).forEach((line) => {
        title.appendChild(
          DOM.create("span", { class: line.gradient ? "text-gradient" : "", html: MD.render(line.text) })
        );
      });
    }

    const subtitle = DOM.qs("[data-content-hero-subtitle]");
    if (subtitle) MD.applyTo(subtitle, h.subtitle);

    const actions = DOM.qs("[data-content-hero-actions]");
    if (actions) {
      actions.innerHTML = "";
      (h.actions || []).forEach((action) => {
        actions.appendChild(
          DOM.create("a", { href: action.href, class: "btn btn-secondary", html: `${MD.escapeHtml(action.label)} ${ICONS[action.icon] || ""}` })
        );
      });
    }

    const meta = DOM.qs("[data-content-hero-meta]");
    if (meta) {
      meta.innerHTML = "";
      const items = h.meta || [];
      items.forEach((item, i) => {
        const span = item.strong
          ? DOM.create("span", { html: `<strong>${MD.escapeHtml(item.strong)}</strong> ${MD.render(item.text)}` })
          : DOM.create("span", { html: MD.render(item.text) });
        meta.appendChild(span);
        if (i < items.length - 1) meta.appendChild(DOM.create("span", {}, ["\u00b7"]));
      });
    }

    const rail = DOM.qs("[data-content-hero-rail]");
    if (rail) {
      rail.innerHTML = "";
      (h.rail || []).forEach((step, i) => {
        rail.appendChild(
          DOM.create("div", { class: `hero__rail-item${i === 0 ? " is-active" : ""}` }, [
            DOM.create("span", { class: "hero__rail-icon" }, [String(i + 1).padStart(2, "0")]),
            DOM.create("span", {}, [
              DOM.create("span", { class: "hero__rail-num" }, [`Step ${String(i + 1).padStart(2, "0")}`]),
              DOM.create("span", { class: "hero__rail-label", html: MD.render(step.label) })
            ])
          ])
        );
      });
    }
  }

  // ---------------------------------------------
  // Section header helper (eyebrow / title / lead)
  // ---------------------------------------------
  function renderSectionHeader(sectionKey, data) {
    const eyebrow = DOM.qs(`[data-content-eyebrow="${sectionKey}"]`);
    const title = DOM.qs(`[data-content-title="${sectionKey}"]`);
    const lead = DOM.qs(`[data-content-lead="${sectionKey}"]`);
    if (eyebrow && data.eyebrow) MD.applyTo(eyebrow, data.eyebrow);
    if (title && data.title) MD.applyTo(title, data.title);
    if (lead && data.lead) MD.applyTo(lead, data.lead);
  }

  // ---------------------------------------------
  // About
  // ---------------------------------------------
  function renderAbout(content) {
    const a = content.about;
    if (!a) return;
    renderSectionHeader("about", a);

    const grid = DOM.qs("[data-content-about-grid]");
    if (!grid) return;
    grid.innerHTML = "";

    (a.cards || []).forEach((card) => {
      const children = [
        DOM.create("h3", { html: MD.render(card.title) }),
        DOM.create("p", { html: MD.render(card.body) })
      ];

      if (card.list && card.list.length) {
        children.push(
          DOM.create(
            "ul",
            { class: "why-list" },
            card.list.map((item) => DOM.create("li", { html: MD.render(item) }))
          )
        );
      }

      if (card.videoKey) {
        children.push(
          DOM.create("div", { class: "video-card__frame", style: "margin-top:var(--space-lg);border-radius:var(--radius-md);overflow:hidden;" }, [
            DOM.create("iframe", {
              "data-video-src": card.videoKey,
              src: "",
              title: card.videoTitle || "",
              loading: "lazy",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              allowfullscreen: true
            })
          ])
        );
      }

      const classes = ["about-card"];
      if (card.feature) classes.push("about-card--feature");

      const attrs = { class: classes.join(" "), "data-reveal": "" };
      if (card.id) attrs.id = card.id;

      grid.appendChild(DOM.create("div", attrs, children));
    });
  }

  // ---------------------------------------------
  // Benefits
  // ---------------------------------------------
  function renderBenefits(content) {
    const b = content.benefits;
    if (!b) return;
    renderSectionHeader("benefits", b);

    const grid = DOM.qs("[data-content-benefits-grid]");
    if (!grid) return;
    grid.innerHTML = "";

    (b.cards || []).forEach((card) => {
      grid.appendChild(
        DOM.create("div", { class: "benefit-card", "data-reveal": "" }, [
          DOM.create("div", { class: "benefit-card__icon", html: ICONS[card.icon] || "" }),
          DOM.create("h3", { html: MD.render(card.title) }),
          DOM.create(
            "ul",
            {},
            (card.items || []).map((item) => DOM.create("li", { html: MD.render(item) }))
          )
        ])
      );
    });
  }

  // ---------------------------------------------
  // Roadmap header + video card + journey card
  // ---------------------------------------------
  function renderRoadmap(content) {
    const r = content.roadmap;
    if (!r) return;
    renderSectionHeader("roadmap", r);

    const videoSlot = DOM.qs("[data-content-roadmap-video]");
    if (videoSlot && r.video) {
      videoSlot.innerHTML = "";
      videoSlot.appendChild(
        DOM.create("div", { class: "video-card__frame" }, [
          DOM.create("iframe", {
            "data-video-src": r.video.videoKey,
            src: "",
            title: r.video.title || "",
            loading: "lazy",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: true
          })
        ])
      );
      videoSlot.appendChild(
        DOM.create("div", { class: "video-card__body" }, [
          DOM.create("h4", { html: MD.render(r.video.title) }),
          DOM.create("p", { html: MD.render(r.video.desc) })
        ])
      );
    }

    const journeySlot = DOM.qs("[data-content-journey]");
    if (journeySlot && r.journey) {
      journeySlot.innerHTML = "";
      journeySlot.appendChild(DOM.create("img", { src: r.journey.img, alt: r.journey.alt, loading: "lazy" }));
      journeySlot.appendChild(DOM.create("p", { class: "journey-card__caption", html: MD.render(r.journey.caption) }));
    }
  }

  // ---------------------------------------------
  // Quick facts
  // ---------------------------------------------
  function renderFacts(content) {
    const f = content.facts;
    if (!f) return;
    renderSectionHeader("facts", f);

    const tbody = DOM.qs("[data-content-facts-table]");
    if (tbody) {
      tbody.innerHTML = "";
      (f.rows || []).forEach((row) => {
        tbody.appendChild(
          DOM.create("tr", {}, [
            DOM.create("td", { html: MD.render(row.label) }),
            DOM.create("td", { "data-fact": row.factKey })
          ])
        );
      });
    }

    const note = DOM.qs("[data-content-facts-note]");
    if (note && f.note) {
      note.innerHTML = "";
      note.appendChild(DOM.create("span", { class: "badge", html: MD.render(f.note.badge) }));

      const ambassadors = window.SITE_CONFIG?.contact?.ambassadors || [];
      ambassadors.forEach((person) => {
        note.appendChild(DOM.create("h4", { html: MD.render(person.name) }));
        note.appendChild(DOM.create("p", { html: MD.render(person.role) }));
      });

      note.appendChild(DOM.create("a", { href: f.note.ctaHref, class: "btn btn-secondary" }, [f.note.ctaLabel]));
    }
  }

  // ---------------------------------------------
  // Resources
  // ---------------------------------------------
  function renderResources(content) {
    const r = content.resources;
    if (!r) return;
    renderSectionHeader("resources", r);

    const grid = DOM.qs("[data-content-resources-grid]");
    if (grid) {
      grid.innerHTML = "";
      (r.videos || []).forEach((video) => {
        grid.appendChild(
          DOM.create("div", { class: "video-card", "data-reveal": "" }, [
            DOM.create("div", { class: "video-card__frame" }, [
              DOM.create("iframe", {
                "data-video-src": video.videoKey,
                src: "",
                title: video.title || "",
                loading: "lazy",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowfullscreen: true
              })
            ]),
            DOM.create("div", { class: "video-card__body" }, [
              DOM.create("h4", { html: MD.render(video.title) }),
              DOM.create("p", { html: MD.render(video.desc) })
            ])
          ])
        );
      });
    }

    const links = DOM.qs("[data-content-resource-links]");
    if (links) {
      links.innerHTML = "";
      (r.links || []).forEach((link) => {
        const attrs = { "data-link": link.linkKey, html: `${MD.escapeHtml(link.label)} ${ICONS["arrow-sm"]}` };
        if (link.external) {
          attrs.target = "_blank";
          attrs.rel = "noopener";
        }
        links.appendChild(DOM.create("a", attrs));
      });
    }
  }

  // ---------------------------------------------
  // Help
  // ---------------------------------------------
  function renderHelp(content) {
    const h = content.help;
    if (!h) return;
    renderSectionHeader("help", h);

    const grid = DOM.qs("[data-content-help-grid]");
    if (!grid) return;
    grid.innerHTML = "";

    const email = window.SITE_CONFIG?.contact?.email;

    (h.cards || []).forEach((card) => {
      const ctaAttrs = card.linkKey
        ? { "data-link": card.linkKey, class: "btn btn-secondary" }
        : { href: email ? `mailto:${email}` : "#", class: "btn btn-secondary" };

      grid.appendChild(
        DOM.create("div", { class: "help-card", "data-reveal": "" }, [
          DOM.create("div", { class: "help-card__icon", html: ICONS[card.icon] || "" }),
          DOM.create("h3", { html: MD.render(card.title) }),
          DOM.create("p", { html: MD.render(card.body) }),
          DOM.create("a", ctaAttrs, [card.ctaLabel])
        ])
      );
    });
  }

  // ---------------------------------------------
  // Community
  // ---------------------------------------------
  function renderCommunity(content) {
    const c = content.community;
    if (!c) return;
    renderSectionHeader("community", c);

    const whatsappSlot = DOM.qs("[data-content-whatsapp]");
    if (whatsappSlot && c.whatsapp) {
      whatsappSlot.setAttribute("data-link", c.whatsapp.linkKey);
      whatsappSlot.innerHTML = `
        <span class="whatsapp-card__icon" aria-hidden="true">${ICONS["whatsapp-lg"]}</span>
        <span class="whatsapp-card__body">
          <span class="whatsapp-card__title"></span>
          <span class="whatsapp-card__desc"></span>
        </span>
        <svg class="whatsapp-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      `;
      MD.applyTo(DOM.qs(".whatsapp-card__title", whatsappSlot), c.whatsapp.title);
      MD.applyTo(DOM.qs(".whatsapp-card__desc", whatsappSlot), c.whatsapp.desc);
    }

    const socialsSlot = DOM.qs("[data-content-socials]");
    if (socialsSlot) {
      socialsSlot.innerHTML = "";
      (c.socials || []).forEach((social) => {
        socialsSlot.appendChild(
          DOM.create("a", { "data-link": social.linkKey, target: "_blank", rel: "noopener", class: "social-pill", html: `${ICONS[social.icon] || ""} ${MD.escapeHtml(social.label)}` })
        );
      });
    }
  }

  // ---------------------------------------------
  // Team header
  // ---------------------------------------------
  function renderTeamHeader(content) {
    if (!content.team) return;
    renderSectionHeader("team", content.team);
  }

  // ---------------------------------------------
  // Footer
  // ---------------------------------------------
  function renderFooter(content) {
    const f = content.footer;
    if (!f) return;

    const brand = DOM.qs("[data-content-footer-brand]");
    if (brand) MD.applyTo(brand, f.brandText);

    const about = DOM.qs("[data-content-footer-about]");
    if (about) MD.applyTo(about, f.about);

    const columnsWrap = DOM.qs("[data-content-footer-columns]");
    if (columnsWrap) {
      columnsWrap.innerHTML = "";
      const email = window.SITE_CONFIG?.contact?.email;

      (f.columns || []).forEach((col) => {
        const list = DOM.create("ul", {});
        (col.links || []).forEach((link) => {
          const attrs = link.linkKey ? { "data-link": link.linkKey } : { href: link.href };
          list.appendChild(DOM.create("li", {}, [DOM.create("a", attrs, [link.label])]));
        });
        // Contact column: append the email link automatically from config.
        if (col.title === "Contact" && email) {
          list.appendChild(DOM.create("li", {}, [DOM.create("a", { href: `mailto:${email}` }, [email])]));
        }
        columnsWrap.appendChild(
          DOM.create("div", { class: "footer__col" }, [DOM.create("h5", {}, [col.title]), list])
        );
      });
    }

    const copyTail = DOM.qs("[data-content-footer-copy]");
    if (copyTail) copyTail.textContent = ` ${f.copyTail}`;

    const watermark = DOM.qs("[data-content-footer-watermark]");
    if (watermark) watermark.textContent = f.watermark;

    const socialWrap = DOM.qs("[data-content-footer-social]");
    if (socialWrap) {
      socialWrap.innerHTML = "";
      (f.social || []).forEach((social) => {
        socialWrap.appendChild(
          DOM.create("a", { "data-link": social.linkKey, target: "_blank", rel: "noopener", "aria-label": social.label, html: ICONS[social.icon] || "" })
        );
      });
    }
  }

  function init() {
    const content = window.SITE_CONTENT;
    if (!content) {
      console.error("[ContentModule] data/content.js did not load — SITE_CONTENT is missing.");
      return;
    }

    renderNotifToast(content);
    renderNavFlyouts(content);
    renderHero(content);
    renderAbout(content);
    renderBenefits(content);
    renderRoadmap(content);
    renderFacts(content);
    renderResources(content);
    renderHelp(content);
    renderCommunity(content);
    renderTeamHeader(content);
    renderFooter(content);

    document.dispatchEvent(new CustomEvent("content:rendered"));
  }

  return { init };
})();

window.ContentModule = ContentModule;
