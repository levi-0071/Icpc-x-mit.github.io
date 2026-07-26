/* ============================================
   Notifications Module
   Replaces the old center popup with:
     1. A toast that slides in from the right on load
        and auto-dismisses after AUTO_HIDE_MS.
     2. A bell icon in the navbar that opens a
        slide-out dashboard listing every announcement
        (past + current), with unread tracking.
   Data source: data/notifications.json (falls back to
   FALLBACK_DATA if the fetch fails, e.g. opened via
   file:// without a local server).
   ============================================ */

const NotificationsModule = (() => {
  const AUTO_HIDE_MS = 6000;
  const OPEN_DELAY_MS = 600; // small delay so the toast doesn't feel jarring on load
  const READ_STORAGE_KEY = "icpc-notifications-read";

  const FALLBACK_DATA = [
    { id: "n1", type: "alert", title: "Registrations Open!", message: "Lock in your spot before the deadline — form your team of three and register today.", date: "2026-07-26", dateLabel: "Today", link: "registration", read: false },
    { id: "n2", type: "info", title: "Preliminary Round Dates Announced", message: "The online preliminary round schedule is now live — check the Roadmap section for details.", date: "2026-07-24", dateLabel: "2 days ago", link: "roadmap", read: false },
    { id: "n3", type: "info", title: "Practice Session Tomorrow", message: "Join CoDeC's weekly practice contest to warm up before the preliminary round.", date: "2026-07-19", dateLabel: "1 week ago", link: "resources", read: true },
    { id: "n4", type: "warning", title: "Team Formation Guidelines", message: "New teams must be finalized before the registration deadline — review the guidelines if you still need teammates.", date: "2026-07-12", dateLabel: "2 weeks ago", link: "needATeamForm", read: true }
  ];

  const TYPE_ICON = { alert: "🚀", info: "ℹ️", warning: "⚠️" };

  let toast, toastTimer, bell, badge, dashboard, dashboardList, overlay;
  let notifications = [];
  let readIds = new Set();

  /* ---- Local read-state persistence (per-browser, not per-user) ---- */
  function loadReadIds() {
    try {
      const raw = localStorage.getItem(READ_STORAGE_KEY);
      if (raw) readIds = new Set(JSON.parse(raw));
    } catch (err) {
      readIds = new Set();
    }
  }

  function persistReadIds() {
    try {
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
    } catch (err) {
      /* ignore quota/private-mode errors — non-critical */
    }
  }

  function isRead(item) {
    return readIds.has(item.id) || item.read === true;
  }

  function resolveLink(key) {
    const cfg = window.SITE_CONFIG;
    if (!key || !cfg) return "#";
    if (key.startsWith("#")) return key; // already an anchor, e.g. "#roadmap"
    const value = key.split(".").reduce((obj, k) => obj?.[k], cfg.links);
    return value || `#${key}`;
  }

  /* ---- Toast (side notification) ---- */
  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("is-open"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, AUTO_HIDE_MS);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove("is-open");
    clearTimeout(toastTimer);
    // Wait for the slide-out transition before removing from layout.
    setTimeout(() => { toast.hidden = true; }, 350);
  }

  function pauseToastTimer() {
    clearTimeout(toastTimer);
  }

  // Kept for potential future use, but not wired to any event — the toast
  // must reliably auto-hide at AUTO_HIDE_MS regardless of hover/touch.
  function resumeToastTimer() {
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, AUTO_HIDE_MS);
  }

  /* ---- Bell badge ---- */
  function updateBadge() {
    const unreadCount = notifications.filter((n) => !isRead(n)).length;
    if (!badge) return;
    if (unreadCount > 0) {
      badge.hidden = false;
      badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
    } else {
      badge.hidden = true;
    }
  }

  /* ---- Dashboard (bell dropdown/sidebar) ---- */
  function renderDashboard() {
    if (!dashboardList) return;
    dashboardList.innerHTML = "";

    if (!notifications.length) {
      dashboardList.appendChild(
        DOM.create("li", { class: "notif-dash__empty" }, ["No announcements yet."])
      );
      return;
    }

    notifications.forEach((item) => {
      const read = isRead(item);
      const li = DOM.create("li", {
        class: `notif-dash__item notif-dash__item--${item.type}${read ? "" : " is-unread"}`,
        "data-notif-id": item.id
      });

      const icon = DOM.create("span", { class: "notif-dash__icon" }, [TYPE_ICON[item.type] || "🔔"]);

      const body = DOM.create("div", { class: "notif-dash__body" }, [
        DOM.create("div", { class: "notif-dash__top" }, [
          DOM.create("span", { class: "notif-dash__title" }, [item.title]),
          DOM.create("span", { class: `notif-dash__badge notif-dash__badge--${item.type}` }, [item.type])
        ]),
        DOM.create("p", { class: "notif-dash__message" }, [item.message]),
        DOM.create("span", { class: "notif-dash__date" }, [item.dateLabel || item.date])
      ]);

      li.appendChild(icon);
      li.appendChild(body);

      li.addEventListener("click", () => {
        readIds.add(item.id);
        persistReadIds();
        li.classList.remove("is-unread");
        updateBadge();
        const href = resolveLink(item.link);
        if (!href || href === "#") return;
        const opensNewTab = item.link === "registration" || item.link === "needATeamForm";
        if (opensNewTab) {
          window.open(href, "_blank", "noopener");
        } else {
          window.location.href = href;
        }
      });

      dashboardList.appendChild(li);
    });
  }

  function openDashboard() {
    if (!dashboard) return;
    dashboard.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(() => {
      dashboard.classList.add("is-open");
      overlay.classList.add("is-open");
    });
    document.body.style.overflow = "hidden";
  }

  function closeDashboard() {
    if (!dashboard) return;
    dashboard.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      dashboard.hidden = true;
      overlay.hidden = true;
    }, 350);
  }

  function toggleDashboard() {
    if (dashboard.hidden) openDashboard();
    else closeDashboard();
  }

  function markAllRead() {
    notifications.forEach((n) => readIds.add(n.id));
    persistReadIds();
    updateBadge();
    DOM.qsa(".notif-dash__item", dashboardList).forEach((el) => el.classList.remove("is-unread"));
  }

  /* ---- Wiring ---- */
  function bindEvents() {
    DOM.qsa("[data-notif-close]", toast).forEach((el) => el.addEventListener("click", hideToast));

    bell.addEventListener("click", toggleDashboard);
    DOM.qsa("[data-notif-dash-close]", dashboard).forEach((el) => el.addEventListener("click", closeDashboard));
    overlay.addEventListener("click", closeDashboard);

    const viewAll = DOM.qs("[data-notif-view-all]", dashboard);
    if (viewAll) viewAll.addEventListener("click", (e) => { e.preventDefault(); markAllRead(); });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!dashboard.hidden) closeDashboard();
      if (!toast.hidden) hideToast();
    });
  }

  async function init() {
    toast = DOM.qs("[data-toast]");
    bell = DOM.qs("[data-notif-bell]");
    badge = DOM.qs("[data-notif-badge]");
    dashboard = DOM.qs("[data-notif-dashboard]");
    overlay = DOM.qs("[data-notif-overlay]");
    dashboardList = DOM.qs("[data-notif-list]", dashboard);

    if (!toast || !bell || !dashboard) return;

    loadReadIds();
    const fetched = await DOM.fetchJSON("data/notifications.json");
    notifications = Array.isArray(fetched) && fetched.length ? fetched : FALLBACK_DATA;

    renderDashboard();
    updateBadge();
    bindEvents();

    setTimeout(showToast, OPEN_DELAY_MS);
  }

  return { init, showToast, hideToast, openDashboard, closeDashboard };
})();

window.NotificationsModule = NotificationsModule;
