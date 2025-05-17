document.addEventListener("DOMContentLoaded", function () {
  const toggleCV = document.getElementById("toggleCV");
  const styleLink = document.getElementById("main-style");

  // Lưu trạng thái hiện tại: web hoặc cv
  let isCV = false;

  toggleCV.addEventListener("click", () => {
    if (!isCV) {
      styleLink.href = "style_CV.css";  // chuyển sang CV
      toggleCV.textContent = "Website"; // đổi tên nút
      isCV = true;
    } else {
      styleLink.href = "style.css";     // chuyển về web
      toggleCV.textContent = "CV";      // đổi tên nút
      isCV = false;
    }
  });
});
