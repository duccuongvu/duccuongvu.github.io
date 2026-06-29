document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-item, .project-item").forEach(item => {
    const expandable = item.querySelector(".work-expandable, .project-expandable");
    const btn = item.querySelector(".work-expand-btn, .project-expand-btn");
    if (!expandable || !btn) return;

    btn.addEventListener("click", () => {
      const isExpanded = item.classList.toggle("expanded");
      btn.textContent = isExpanded ? "Hide details" : "Show details";
    });
  });
});
