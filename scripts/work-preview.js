document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("workPreviewPanel");
  if (!panel) return;

  const inner = panel.querySelector(".work-preview-inner");
  const placeholderHTML = inner.innerHTML;
  const workItems = Array.from(document.querySelectorAll(".work-item"));
  const desktopQuery = window.matchMedia("(min-width: 1500px)");

  let hideTimer = null;
  let activeItem = null;

  function clearActive() {
    if (activeItem) activeItem.classList.remove("is-previewed");
    activeItem = null;
  }

  function showPreview(item) {
    if (!desktopQuery.matches) return;
    clearTimeout(hideTimer);

    clearActive();
    item.classList.add("is-previewed");
    activeItem = item;

    const role = item.querySelector(".work-role")?.textContent || "";
    const institute = item.querySelector(".work-institute")?.textContent || "";
    const date = item.querySelector(".work-date")?.textContent || "";
    const expandableInner = item.querySelector(".work-expandable-inner");

    const detailHTML = expandableInner ? expandableInner.innerHTML : "";

    inner.innerHTML =
      '<div class="work-preview-role">' + role + '</div>' +
      '<div class="work-preview-institute">' + institute + '</div>' +
      '<div class="work-preview-date">' + date + '</div>' +
      detailHTML;

    // Show every sub-project fully expanded, and drop the now-redundant toggle buttons.
    inner.querySelectorAll(".work-subproject").forEach(sub => sub.classList.add("expanded"));
    inner.querySelectorAll(".subproject-expand-btn, .work-expand-btn").forEach(btn => btn.remove());

    panel.classList.add("visible");
    panel.setAttribute("aria-hidden", "false");
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      panel.classList.remove("visible");
      panel.setAttribute("aria-hidden", "true");
      clearActive();
    }, 180);
  }

  workItems.forEach(item => {
    item.addEventListener("mouseenter", () => showPreview(item));
    item.addEventListener("mouseleave", scheduleHide);
    item.addEventListener("focusin", () => showPreview(item));
    item.addEventListener("focusout", scheduleHide);
  });

  panel.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  panel.addEventListener("mouseleave", scheduleHide);

  desktopQuery.addEventListener("change", (e) => {
    if (!e.matches) {
      panel.classList.remove("visible");
      panel.setAttribute("aria-hidden", "true");
      clearActive();
      inner.innerHTML = placeholderHTML;
    }
  });
});
