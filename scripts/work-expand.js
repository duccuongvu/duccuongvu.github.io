document.addEventListener("DOMContentLoaded", () => {
  const workItems = Array.from(document.querySelectorAll(".work-item"));

  workItems.forEach(item => {
    const expandable = item.querySelector(".work-expandable");
    const btn = item.querySelector(".work-expand-btn");
    if (!expandable || !btn) return;

    btn.addEventListener("click", () => {
      const wasExpanded = item.classList.contains("expanded");

      workItems.forEach(other => {
        other.classList.remove("expanded");
        const otherBtn = other.querySelector(".work-expand-btn");
        if (otherBtn) otherBtn.textContent = "Show details";
      });

      if (!wasExpanded) {
        item.classList.add("expanded");
        btn.textContent = "Hide details";
      }
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

        subs.forEach(other => {
          other.classList.remove("expanded");
          const otherBtn = other.querySelector(".subproject-expand-btn");
          if (otherBtn) otherBtn.textContent = "Show details";
        });

        if (!wasExpanded) {
          sub.classList.add("expanded");
          btn.textContent = "Hide details";
        }
      });
    });
  });
});
