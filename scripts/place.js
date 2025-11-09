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

// Display current year and last modified date
// document.querySelector("#currentyear").textContent = new Date().getFullYear();
// document.querySelector("#lastModified").textContent = document.lastModified;

// Static values (Celsius)
const temp = 10;
const windSpeed = 15;

// Calculate wind chill (Celsius)
function calculateWindChill(temp, windSpeed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(windSpeed, 0.16) +
    0.3965 * temp * Math.pow(windSpeed, 0.16)
  ).toFixed(1);
}

// Apply conditions
let windChillValue = "N/A";
if (temp <= 10 && windSpeed > 4.8) {
  windChillValue = `${calculateWindChill(temp, windSpeed)} °C`;
}

document.querySelector("#windChill").textContent = windChillValue;