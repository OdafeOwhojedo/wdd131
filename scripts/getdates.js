// scripts/getdates.js
(function () {
  // Safe guard: run when DOM is ready
  function init() {
    const yearSpan = document.getElementById("currentyear");
    const modifiedParagraph = document.getElementById("lastModified");

    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    } else {
      console.warn("getdates.js: #currentyear element not found.");
    }

    if (modifiedParagraph) {
      // document.lastModified sometimes returns "" in some setups (file://), so guard that
      const raw = document.lastModified;
      if (!raw || raw.trim() === "") {
        modifiedParagraph.textContent = "Last Modified: (not available)";
      } else {
        // format into a human-friendly date
        const d = new Date(raw);
        // if Date(raw) is invalid, fall back to raw string
        if (isNaN(d.getTime())) {
          modifiedParagraph.textContent = `Last Modified: ${raw}`;
        } else {
          modifiedParagraph.textContent = `Last Modified: ${d.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}`;
        }
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

// const currentYear = new Date().getFullYear();
// document.getElementById("currentYear").textContent = currentYear;
// const lastModified = document.lastModified;
// document.getElementById("lastModified").textContent = 'Last Modified: $ {lastModified}';
// document.querySelector("#year").textContent = new Date().getFullYear();