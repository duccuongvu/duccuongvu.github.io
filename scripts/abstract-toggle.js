document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pub-info").forEach(pub => {
    const abstract = pub.querySelector(".abstract-content");
    if (abstract) {
      // Find the last <p> (your [paper | pdf] line)
      const lastP = pub.querySelector("p:last-of-type");

      // Create <p> wrapper
      const p = document.createElement("p");

      // Create the button
      const button = document.createElement("button");
      button.className = "abstract-toggle";
      button.textContent = "Show Abstract";

      // Put button inside <p>
      p.appendChild(button);

      // Insert <p> after the last <p>
      lastP.insertAdjacentElement("afterend", p);

      // Toggle logic
      button.addEventListener("click", () => {
        if (abstract.style.display === "block") {
          abstract.style.display = "none";
          button.textContent = "Show Abstract";
        } else {
          abstract.style.display = "block";
          button.textContent = "Hide Abstract";
        }
      });
    }
  });
});