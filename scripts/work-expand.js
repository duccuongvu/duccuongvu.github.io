document.addEventListener("DOMContentLoaded", () => {
  const workItems = Array.from(document.querySelectorAll(".work-item"));

  workItems.forEach(item => {
    const expandable = item.querySelector(".work-expandable");
    const btn = item.querySelector(".work-expand-btn");
    if (!expandable || !btn) return;

    btn.addEventListener("click", () => {
      const wasExpanded = item.classList.contains("expanded");
      item.classList.toggle("expanded", !wasExpanded);
      btn.textContent = wasExpanded ? "Show details" : "Hide details";
    });
  });

  document.querySelectorAll(".work-expandable").forEach(parent => {
    const subs = Array.from(parent.querySelectorAll(".work-subproject"));

    subs.forEach(sub => {
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
});
