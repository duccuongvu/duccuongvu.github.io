document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-item").forEach(item => {
    const expandable = item.querySelector(".work-expandable");
    const btn = item.querySelector(".work-expand-btn");
    if (!expandable || !btn) return;

    btn.addEventListener("click", () => {
      const isExpanded = item.classList.toggle("expanded");
      btn.textContent = isExpanded ? "Hide details" : "Show details";
    });
  });
});
