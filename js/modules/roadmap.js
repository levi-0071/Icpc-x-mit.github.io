/* ============================================
   Roadmap Module
   Loads data/roadmap.json and renders the
   step-by-step registration timeline.
   ============================================ */

const RoadmapModule = (() => {
  // Used if data/roadmap.json can't be fetched (e.g. opened via file://
  // without a local server) so the section never renders empty.
  const FALLBACK_STEPS = [
    { step: 1, title: "Form your team", description: "Put together a team of three students. Teams can be interdisciplinary but every member must be a currently enrolled student at MIT-WPU." },
    { step: 2, title: "Register on the official ICPC portal", description: "Complete your team registration on the official ICPC portal. The link will be shared in the CoDeC Welcome Kit — check the Quick Facts section below." },
    { step: 3, title: "Pay the registration fee", description: "Submit the registration fee per the instructions on the portal. The exact amount will be confirmed and shared in the Welcome Kit." },
    { step: 4, title: "Confirm before the deadline", description: "Make sure your team's registration and payment are complete before the deadline. Dates will be announced by CoDeC and CDC." },
    { step: 5, title: "Prepare for the Preliminary Round", description: "Look out for prep sessions and practice resources shared by CoDeC and AlgoZenith to get your team ready for the online Preliminary Round." }
  ];

  function renderItem(step, index, total) {
    const item = DOM.create("div", { class: "roadmap__item", "data-reveal": "" });

    const marker = DOM.create("div", { class: "roadmap__marker" }, [
      DOM.create("div", { class: "roadmap__marker-dot" }, [String(step.step).padStart(2, "0")]),
      DOM.create("div", { class: "roadmap__marker-line" })
    ]);

    const content = DOM.create("div", { class: "roadmap__content" }, [
      DOM.create("h3", { html: MD.render(step.title) }),
      DOM.create("p", { html: MD.render(step.description) })
    ]);

    item.appendChild(marker);
    item.appendChild(content);
    return item;
  }

  async function init() {
    const container = DOM.qs("[data-roadmap-list]");
    if (!container) return;

    const data = await DOM.fetchJSON("data/roadmap.json");
    const steps = data && Array.isArray(data.steps) && data.steps.length ? data.steps : FALLBACK_STEPS;

    const frag = document.createDocumentFragment();
    steps
      .sort((a, b) => a.step - b.step)
      .forEach((step, i) => frag.appendChild(renderItem(step, i, steps.length)));

    container.appendChild(frag);

    // Let the scroll animation module pick up newly added [data-reveal] nodes.
    document.dispatchEvent(new CustomEvent("roadmap:rendered"));
  }

  return { init };
})();

window.RoadmapModule = RoadmapModule;
