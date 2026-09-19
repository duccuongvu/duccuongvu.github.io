document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".work-subproject").forEach(sub => {
    const expandable = sub.querySelector(".subproject-expandable");
    const btn = sub.querySelector(".subproject-expand-btn");
    if (!expandable || !btn) return;

    btn.addEventListener("click", () => {
      const wasExpanded = sub.classList.contains("expanded");
      sub.classList.toggle("expanded", !wasExpanded);
      btn.textContent = wasExpanded ? "Show details" : "Hide details";
    });
  });
});
