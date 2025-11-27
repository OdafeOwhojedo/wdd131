// form.js - Handles both form.html and review.html functionality


// -------------------------------
// PRODUCT ARRAY
// -------------------------------
const products = [
{ id: 1, name: "Hammer" },
{ id: 2, name: "Screwdriver" },
{ id: 3, name: "Electric Drill" },
{ id: 4, name: "Circular Saw" }
];


// -------------------------------
// FORM.HTML LOGIC
// Populate product <select> if form.html is loaded
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
const productSelect = document.getElementById("product");


if (productSelect) {
// Populate dropdown
products.forEach(product => {
const option = document.createElement("option");
option.value = product.id;
option.textContent = product.name;
productSelect.appendChild(option);
});
}




// -------------------------------
// REVIEW.HTML LOGIC
// Display submitted data & handle localStorage counter
// -------------------------------
const infoSection = document.getElementById("submitted-info");


if (infoSection) {
const params = new URLSearchParams(window.location.search);


let html = "<h2>Submitted Details</h2><ul>";
params.forEach((value, key) => {
html += `<li><strong>${key}:</strong> ${value}</li>`;
});
html += "</ul>";


infoSection.innerHTML = html;


// Review counter
let count = Number(localStorage.getItem("reviewCount")) || 0;
count++;
localStorage.setItem("reviewCount", count);


const counter = document.getElementById("counter");
if (counter) {
counter.textContent = `You have submitted ${count} reviews.`;
}
}
});

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