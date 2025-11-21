const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:"images/aba_nigeria_temple.webp"
    
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:"images/manti-utah-temple.webp"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:"images/payson-utah-temple.webp"
    
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:"images/yigo-guam-temple.webp"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc-temple.webp"

  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:"images/lima-peru-los-olivos-temple.webp"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:"images/mexico-city-mexico-temple.webp"
  },
  {
    templeName: "Ghana Accra",
    location: "Accra Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:"images/accra_ghana_temple.webp"
  },
  {
    templeName: "Apia Samoa",
    location: "Pesega, Apia Samoa",
    dedicated: "1983, August, 5-7",
    area: 18691,
    imageUrl:"images/apia_samoa_temple.webp"
  },
  {
    templeName: "Campinas Brazil",
    location: "Campinas-SP Brazil",
    dedicated: "2002, May, 17",
    area: 48100,
    imageUrl:"images/campinas_brazil_temple.webp"
  },
  {
    templeName: "Boise Idaho",
    location: "Boise, Idaho USA",
    dedicated: "1984, May, 25-30",
    area: 35868,
    imageUrl:"images/boise-idaho-temple.jpg"
  },
  {
    templeName: "Bern Switzerland",
    location: "Zollikofen Switzerland",
    dedicated: "1955, September, 11-17",
    area: 35546,
    imageUrl:"images/bern-switzerland-temple.jpg"
  },
  {
    templeName: "Columbus Ohio",
    location: "Columbus Ohio USA",
    dedicated: "1999, September, 4-5",
    area: 11745,
    imageUrl:"images/columbus-ohio-temple.jpg"
  },
  {
    templeName: "Jordan River Utah",
    location: "South Jordan, Utah",
    dedicated: "1981, November, 16-20",
    area: 148236,
    imageUrl:"images/jordan-river-temple.jpg"
  },
  {
    templeName: "Winter Quarters Nebraska",
    location: "Omaha, Nebraska",
    dedicated: "2001, April, 22",
    area: 16000,
    imageUrl:"images/nebraska-temple.jpg"
  },
  {
    templeName: "Adelaide Australia",
    location: "Marden, South Australia",
    dedicated: "2000, June, 15",
    area: 16000,
    imageUrl:"images/adelaide-australia-temple.jpg"
  },
];


// =============================
// FILTERED TEMPLES JS
// =============================

// LOCAL TEMPLE DATA


// DOM ELEMENTS
const templeContainer = document.getElementById("temple-container");
const filterButtons = document.querySelectorAll("nav button");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu").querySelector("ul");

// =============================
// DISPLAY TEMPLES
// =============================
function displayTemples(list) {
  templeContainer.innerHTML = "";

  list.forEach((t) => {
    const card = document.createElement("div");
    card.className = "temple-card";

    card.innerHTML = `
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
      <div class="info">
        <h3>${t.templeName}</h3>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
      </div>
    `;

    templeContainer.appendChild(card);
  });
}

// =============================
// FILTER FUNCTIONS
// =============================
function filterTemples(filter) {
  let filtered = temples;

  if (filter === "old") {
    filtered = temples.filter((t) => parseInt(t.dedicated.split("-")[0]) < 1900);
  }
  
  if (filter === "new") {
    filtered = temples.filter((t) => parseInt(t.dedicated.split("-")[0]) > 2000);
  }

  if (filter === "large") {
    filtered = temples.filter((t) => t.area > 90000);
  }

  if (filter === "small") {
    filtered = temples.filter((t) => t.area < 10000);
  }

  displayTemples(filtered);
}

// FILTER BUTTON EVENTS
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterTemples(filter);
  });
});

// =============================
// HAMBURGER MENU TOGGLE
// =============================
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// =============================
// FOOTER DATE HANDLING
// =============================
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


// INITIAL LOAD
displayTemples(temples);








// DOM ELEMENTS
// DOM ELEMENTS


// scripts/getdates.js
// (function () {
//   function init() {
//     // find element (try both id and data attribute just in case)
//     const yearSpan = document.getElementById("currentyear") || document.querySelector("[data-currentyear]");
//     if (yearSpan) {
//       try {
//         yearSpan.textContent = new Date().getFullYear();
//       } catch (err) {
//         console.error("Error writing current year:", err);
//       }
//     } else {
//       console.warn("getdates.js: #currentyear element not found. Check your HTML id or path to script.");
//     }

//     const modifiedParagraph = document.getElementById("lastModified");
//     if (modifiedParagraph) {
//       const raw = document.lastModified;
//       if (!raw || raw.trim() === "") {
//         modifiedParagraph.textContent = "Last Modified: (not available)";
//       } else {
//         const d = new Date(raw);
//         modifiedParagraph.textContent = isNaN(d.getTime())
//           ? `Last Modified: ${raw}`
//           : `Last Modified: ${d.toLocaleString()}`;
//       }
//     } else {
//       console.warn("getdates.js: #lastModified element not found.");
//     }
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", init);
//   } else {
//     init();
//   }
// })();

// const menuButton = document.querySelector("#menu");
// const navMenu = document.querySelector("#nav-menu");

// menuButton.addEventListener("click", () => {
//   navMenu.classList.toggle("open");
//   menuButton.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
// });
// The responsive Navigation (Hamburger)
// const menuButton = document.querySelector("#menu");
// const navMenu = document.querySelector("#nav-menu");

// menuButton.addEventListener("click", () => {
//   const visible = navMenu.style.display === "flex";
//   navMenu.style.display = visible ? "none" : "flex";
//   menuButton.textContent = visible ? "☰" : "✖";
// });