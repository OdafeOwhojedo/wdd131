// --------------------
// DATA SOURCES
// --------------------
const artStyles = [
    {
        name: "Benin Bronze",
        region: "west",
        description: "Detailed metalwork from the ancient Benin Kingdom.",
        img: "images/bronze.jpg"
    },
    {
        name: "Maasai Beadwork",
        region: "east",
        description: "Colorful hand-beaded jewelry from Maasai artisans.",
        img: "images/maasai.jpg"
    },
    {
        name: "Ndebele House Art",
        region: "south",
        description: "Vibrant geometric wall paintings.",
        img: "images/ndebele.jpg"
    }
];

const artists = [
    { name: "El Anatsui", country: "Ghana", specialty: "Recycled metal sculpture" },
    { name: "Wangechi Mutu", country: "Kenya", specialty: "Mixed media and collage" },
    { name: "Yinka Shonibare", country: "Nigeria/UK", specialty: "Textile art" }
];

// --------------------
// ART STYLE FILTERING
// --------------------
const styleContainer = document.getElementById("styleContainer");

if (styleContainer) {
    function displayStyles(region) {
        styleContainer.innerHTML = "";

        const filtered = region === "all"
            ? artStyles
            : artStyles.filter(style => style.region === region);

        filtered.forEach(style => {
            styleContainer.innerHTML += `
                <div class="card">
                    <img src="${style.img}" loading="lazy">
                    <h3>${style.name}</h3>
                    <p>${style.description}</p>
                </div>
            `;
        });
    }

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.addEventListener("click", () => displayStyles(btn.dataset.region));
    });

    displayStyles("all");
}

// --------------------
// ARTISTS PAGE
// --------------------
const artistList = document.getElementById("artistList");

if (artistList) {
    artists.forEach(artist => {
        artistList.innerHTML += `
            <div class="card">
                <h3>${artist.name}</h3>
                <p>${artist.country}</p>
                <p><strong>${artist.specialty}</strong></p>
            </div>
        `;
    });
}

// --------------------
// CONTACT FORM + LOCAL STORAGE
// --------------------
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const info = Object.fromEntries(formData.entries());

        // Save user name to localStorage
        localStorage.setItem("visitorName", info.name);

        formStatus.textContent = `Thank you, ${info.name}! Your message has been received.`;

        form.reset();
    });
}