/* ============================================
   Team Module
   Loads data/team.json and renders ANY number of
   groups (Faculty, Ambassadors, Volunteers, ...)
   into [data-team-groups] as: title + a grid of cards.
   Adding a new group is a JSON-only change.
   Markup/classes match css/final-updates.css
   (.team__grid, .team-card, .team-card__contact ...).
   ============================================ */

const TeamModule = (() => {
  // Used if data/team.json can't be fetched (e.g. opened via file://
  // without a local server) so the section never renders empty.
  const FALLBACK_DATA = {
    groups: [
      {
        id: "faculty",
        title: "Faculty & Coordinators",
        members: [
          { name: "Kishanprasad Gunale Sir", role: "Director – Career Development Centre (CDC), MIT-WPU" },
          { name: "Mihir Mohite", role: "CoDeC President" },
          { name: "Saket Tembekar", role: "Member at CDC" }
        ]
      },
      {
        id: "ambassadors",
        title: "Student Team — Campus Ambassadors",
        members: [
          { name: "Harshvardhan Rathod", role: "Campus Ambassador", photo: "assets/team-harshvardhan.png", phone: "7709285391", email: "hmr280606@gmail.com", link: "https://happiocrz007.github.io" },
          { name: "Rugved Dusane", role: "Campus Ambassador", photo: "assets/team-rugved.jpg", phone: "9673480827", email: "ultimaterd8@gmail.com", link: "#" }
        ]
      }
    ]
  };

  const PHONE_ICON =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z"/></svg>';
  const EMAIL_ICON =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>';

  function phoneHref(phone) {
    return `tel:+91${phone}`;
  }

  function initials(name) {
    return String(name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function renderCard(member) {
    // Photo, or a colored initials avatar if no photo is provided.
    const photoEl = member.photo
      ? DOM.create("div", { class: "team-card__photo" }, [
          DOM.create("img", { src: member.photo, alt: member.name, loading: "lazy" })
        ])
      : DOM.create("div", { class: "team-card__photo team-card__photo--initials" }, [
          DOM.create("span", {}, [initials(member.name)])
        ]);

    const contact = DOM.create("div", { class: "team-card__contact" });

    if (member.phone) {
      const phoneLink = DOM.create("a", {
        href: phoneHref(member.phone),
        html: `${PHONE_ICON} ${MD.escapeHtml(member.phone)}`
      });
      phoneLink.addEventListener("click", (e) => e.stopPropagation());
      contact.appendChild(phoneLink);
    }

    if (member.email) {
      const emailLink = DOM.create("a", {
        href: `mailto:${member.email}`,
        html: `${EMAIL_ICON} ${MD.escapeHtml(member.email)}`
      });
      emailLink.addEventListener("click", (e) => e.stopPropagation());
      contact.appendChild(emailLink);
    }

    const cardChildren = [
      photoEl,
      DOM.create("h4", { html: MD.render(member.name) }),
      DOM.create("p", { class: "team-card__role", html: MD.render(member.role) })
    ];
    if (contact.childNodes.length) cardChildren.push(contact);

    const card = DOM.create("div", { class: "team-card", "data-reveal": "" }, cardChildren);

    // Whole card becomes clickable/focusable if "link" is set (and isn't just "#").
    const hasLink = member.link && member.link !== "#";
    if (hasLink) {
      card.classList.add("team-card--clickable");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "link");
      card.setAttribute("aria-label", `${member.name} — view profile`);

      const open = () => window.open(member.link, "_blank", "noopener");
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    }

    return card;
  }

  function renderGroup(group) {
    const grid = DOM.create("div", { class: "team__grid" });
    (group.members || []).forEach((member) => grid.appendChild(renderCard(member)));

    return DOM.create("div", { class: "team__group", "data-reveal": "" }, [
      DOM.create("h3", { class: "team__group-title", html: MD.render(group.title) }),
      grid
    ]);
  }

  async function init() {
    const container = DOM.qs("[data-team-groups]");
    if (!container) return;

    const data = await DOM.fetchJSON("data/team.json");
    const groups = data && Array.isArray(data.groups) && data.groups.length
      ? data.groups
      : FALLBACK_DATA.groups;

    const frag = document.createDocumentFragment();
    groups.forEach((group) => frag.appendChild(renderGroup(group)));
    container.appendChild(frag);

    document.dispatchEvent(new CustomEvent("team:rendered"));
  }

  return { init };
})();

window.TeamModule = TeamModule;