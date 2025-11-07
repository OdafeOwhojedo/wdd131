// scripts/getdates.js
(function () {
  function init() {
    // find element (try both id and data attribute just in case)
    const yearSpan = document.getElementById("currentyear") || document.querySelector("[data-currentyear]");
    if (yearSpan) {
      try {
        yearSpan.textContent = new Date().getFullYear();
      } catch (err) {
        console.error("Error writing current year:", err);
      }
    } else {
      console.warn("getdates.js: #currentyear element not found. Check your HTML id or path to script.");
    }

    const modifiedParagraph = document.getElementById("lastModified");
    if (modifiedParagraph) {
      const raw = document.lastModified;
      if (!raw || raw.trim() === "") {
        modifiedParagraph.textContent = "Last Modified: (not available)";
      } else {
        const d = new Date(raw);
        modifiedParagraph.textContent = isNaN(d.getTime())
          ? `Last Modified: ${raw}`
          : `Last Modified: ${d.toLocaleString()}`;
      }
    } else {
      console.warn("getdates.js: #lastModified element not found.");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

// The responsive Navigation (Hamburger)
const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
  const visible = navMenu.style.display === "flex";
  navMenu.style.display = visible ? "none" : "flex";
  menuButton.textContent = visible ? "☰" : "✖";
});