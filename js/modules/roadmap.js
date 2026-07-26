/* ============================================
   Roadmap Module
   Loads data/roadmap.json and renders the
   step-by-step registration timeline.
   ============================================ */

const RoadmapModule = (() => {
  function renderItem(step, index, total) {
    const item = DOM.create("div", { class: "roadmap__item", "data-reveal": "" });

    const marker = DOM.create("div", { class: "roadmap__marker" }, [
      DOM.create("div", { class: "roadmap__marker-dot" }, [String(step.step).padStart(2, "0")]),
      DOM.create("div", { class: "roadmap__marker-line" })
    ]);

    const content = DOM.create("div", { class: "roadmap__content" }, [
      DOM.create("h3", {}, [step.title]),
      DOM.create("p", {}, [step.description])
    ]);

    item.appendChild(marker);
    item.appendChild(content);
    return item;
  }

  async function init() {
    const container = DOM.qs("[data-roadmap-list]");
    if (!container) return;

    const data = await DOM.fetchJSON("data/roadmap.json");
    if (!data || !Array.isArray(data.steps)) {
      console.warn("[RoadmapModule] No roadmap data found.");
      return;
    }

    const frag = document.createDocumentFragment();
    data.steps
      .sort((a, b) => a.step - b.step)
      .forEach((step, i) => frag.appendChild(renderItem(step, i, data.steps.length)));

    container.appendChild(frag);

    // Let the scroll animation module pick up newly added [data-reveal] nodes.
    document.dispatchEvent(new CustomEvent("roadmap:rendered"));
  }

  return { init };
})();

window.RoadmapModule = RoadmapModule;
