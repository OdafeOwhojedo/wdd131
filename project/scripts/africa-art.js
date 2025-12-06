/* main.js
 - Place in project root or js/main.js (update <script> path accordingly)
 - Images referenced in data should exist under project/images/
 - Placeholder images names are provided; you can replace them with actual images later.
*/

// ---------------------------
// DATA: ART STYLES (expanded)
// ---------------------------
const artStyles = [
  { slug: "benin-bronze", name: "Benin Bronze", region: "west", description: "Detailed metalwork from the Benin Kingdom.", img: "images/benin-bronze.webp" },
  { slug: "maasai-beadwork", name: "Maasai Beadwork", region: "east", description: "Colorful bead jewelry by Maasai artisans.", img: "images/maasia-beadwork.webp" },
  { slug: "ndebele", name: "Ndebele Murals", region: "south", description: "Geometric house painting tradition of the Ndebele.", img: "images/ndebele.webp" },
  { slug: "shona-sculpture", name: "Shona Sculpture", region: "south", description: "Stone sculptures carved from serpentine and other stones.", img: "images/shona-sculpture.webp" },
  { slug: "kuba-textiles", name: "Kuba Textiles", region: "central", description: "Embroidered raffia cloth from the Kuba peoples.", img: "images/kuba-textiles.webp" },
  { slug: "tinga-tinga", name: "Tinga Tinga Painting", region: "east", description: "Bold illustrated paintings from Tanzania.", img: "images/tinga-tinga.webp" },
  { slug: "tuareg-silver", name: "Tuareg Silverwork", region: "west", description: "Intricate silver jewelry from the Tuareg.", img: "images/tuareg-silver.webp" },
  { slug: "dogon-masks", name: "Dogon Masks", region: "west", description: "Tall ceremonial wooden masks from Dogon cultures.", img: "images/dogon-mask.webp" },
  { slug: "ethiopian-icons", name: "Ethiopian Iconography", region: "east", description: "Christian icons and mural painting tradition.", img: "images/ethiopia-icon.webp" },
  { slug: "fulani-jewelry", name: "Fulani Jewelry", region: "west", description: "Distinctive gold earrings and ornaments.", img: "images/fulani-jewellery.webp" }
];

// ---------------------------
// DATA: ARTISTS (expanded)
// Each artist includes a placeholder image filename and a sample artwork
// ---------------------------
const artists = [
  { slug:"el-anatsui", name:"El Anatsui", country:"Ghana", region:"west", artwork:"Earth's Skin", img:"images/el-anatsu.webp" },
  { slug:"wangechi-mutu", name:"Wangechi Mutu", country:"Kenya", region:"east", artwork:"The Seated Series", img:"images/wangechi-mutu.webp" },
  { slug:"yinka-shonibare", name:"Yinka Shonibare", country:"Nigeria/UK", region:"west", artwork:"The Swing (After Fragonard)", img:"images/yinka-shonibare.webp" },
  { slug:"abdoulaye-konate", name:"Abdoulaye Konaté", country:"Mali", region:"west", artwork:"Large Textile Installation", img:"images/abdoulaye-konate.webp" },
  { slug:"esther-mahlangu", name:"Esther Mahlangu", country:"South Africa", region:"south", artwork:"Ndebele Mural Series", img:"images/esther-mahlangu2.webp" },
  { slug:"romuald-hazoume", name:"Romuald Hazoumè", country:"Benin", region:"west", artwork:"Jerrican Masks", img:"images/romuald-hazoume3.webp"},
  { slug:"peju-alatise", name:"Peju Alatise", country:"Nigeria", region:"west", artwork:"Dazzling Myths", img:"images/peju-alatise3.webp" },
  { slug:"abena-brobbey", name:"Abena Brobbey", country:"Ghana", region:"west", artwork:"Contemporary Textile Works", img:"images/abena-brobbey.webp" },
  { slug:"nnenna-okore", name:"Nnenna Okore", country:"Nigeria", region:"west", artwork:"Organic Fiber Installations", img:"images/nenna-okore55.webp" },
  { slug:"aida-muluneh", name:"Aïda Muluneh", country:"Ethiopia", region:"east", artwork:"The World is 9", img:"images/aida-muluneh.webp" },
  { slug:"ibrahim-el-salahi", name:"Ibrahim El-Salahi", country:"Sudan", region:"east", artwork:"The Inevitable", img:"images/ibrahim-el-salahi.webp" },
  { slug:"hassan-hajjaj", name:"Hassan Hajjaj", country:"Morocco", region:"north", artwork:"Kesh Angels", img:"images/hassan-hajjaj.webp" },
  { slug:"cheri-samba", name:"Chéri Samba", country:"DR Congo", region:"central", artwork:"Popular Paintings", img:"images/cheri-samba.webp" },
  { slug:"ablade-glover", name:"Ablade Glover", country:"Ghana", region:"west", artwork:"Market Scenes", img:"images/ablade-glover.webp" },
  { slug:"lalla-essaydi", name:"Lalla Essaydi", country:"Morocco", region:"north", artwork:"Les Femmes du Maroc", img:"images/lalle-essaydi.webp" }
];

// ---------------------------
// HELPERS: DOM SELECTORS
// ---------------------------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ---------------------------
// RENDERING: TILES
// ---------------------------
function createStyleTile(style){
  return `
    <article class="tile reveal" data-slug="${style.slug}">
      <img data-src="${style.img}" alt="${style.name} image" class="lazy">
      <div class="tile-body">
        <h4>${style.name}</h4>
        <p>${style.description}</p>
        <div class="meta">
          <small class="muted">${capitalize(style.region)}</small>
        </div>
      </div>
    </article>
  `;
}

function createArtistTile(artist){
  const saved = isSaved(artist.slug);
  return `
    <article class="tile reveal" data-slug="${artist.slug}">
      <img data-src="${artist.img}" alt="${artist.name} artwork" class="lazy">
      <div class="tile-body">
        <h4>${artist.name}</h4>
        <p class="muted">${artist.country} — <em>${artist.artwork}</em></p>
        <div class="meta">
          <small class="muted">${capitalize(artist.region)}</small>
          <div>
            <button class="favorite-btn ${saved ? 'saved' : ''}" data-slug="${artist.slug}" title="Save to favorites">❤</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ---------------------------
// UTILITIES
// ---------------------------
function capitalize(s){ return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

// ---------------------------
// RENDER: Home featured lists
// ---------------------------
function renderHomeFeatured(){
  const featuredStyles = artStyles.slice(0,4).map(createStyleTile).join('');
  const featuredArtists = artists.slice(0,6).map(createArtistTile).join('');

  const fs = $('#featured-styles'); if(fs) fs.innerHTML = featuredStyles;
  const fa = $('#featured-artists'); if(fa) fa.innerHTML = featuredArtists;

  observeReveal();
  observeLazy();
}

// ---------------------------
// RENDER: Art styles page
// ---------------------------
function renderStylesGrid(list){
  const zone = $('#stylesGrid');
  if(!zone) return;
  zone.innerHTML = list.map(createStyleTile).join('');
  observeReveal();
  observeLazy();
}

// ---------------------------
// RENDER: Artists grid + favorites
// ---------------------------
function renderArtistsGrid(list){
  const zone = $('#artistsGrid');
  if(!zone) return;
  zone.innerHTML = list.map(createArtistTile).join('');
  attachFavoriteHandlers();
  observeReveal();
  observeLazy();
  renderFavoritesGrid();
}

function renderFavoritesGrid(){
  const favZone = $('#favoritesGrid');
  if(!favZone) return;
  const saved = getSaved();
  if(!saved.length){ favZone.innerHTML = '<p class="muted">No favorites yet. Click ❤ on an artist to save them.</p>'; return; }
  const favCards = saved.map(slug => {
    const art = artists.find(a => a.slug === slug);
    return art ? createArtistTile(art) : '';
  }).join('');
  favZone.innerHTML = favCards;
  attachFavoriteHandlers();
  observeReveal();
  observeLazy();
}

// ---------------------------
// SEARCH & FILTERS
// ---------------------------
function filterStylesByRegion(region){
  return region === 'all' ? artStyles.slice() : artStyles.filter(s => s.region === region);
}
function searchStyles(query){
  const q = query.trim().toLowerCase();
  return artStyles.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
}

function filterArtists({region='all', q=''} = {}){
  let out = artists.slice();
  if(region !== 'all') out = out.filter(a => a.region === region);
  if(q && q.trim().length) {
    const Q = q.trim().toLowerCase();
    out = out.filter(a => a.name.toLowerCase().includes(Q) || a.country.toLowerCase().includes(Q) || a.artwork.toLowerCase().includes(Q));
  }
  return out;
}

// ---------------------------
// FAVORITES: localStorage
// ---------------------------
const LS_KEY = 'aae.favorites';
function getSaved(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch(e){ return []; } }
function isSaved(slug){ return getSaved().includes(slug); }
function saveToggle(slug){
  const cur = new Set(getSaved());
  if(cur.has(slug)) cur.delete(slug); else cur.add(slug);
  const arr = Array.from(cur);
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
  return arr;
}

// ---------------------------
// ATTACH FAVORITE BUTTONS
// ---------------------------
function attachFavoriteHandlers(){
  $$('.favorite-btn').forEach(btn => {
    btn.removeEventListener('click', favClickHandler);
    btn.addEventListener('click', favClickHandler);
  });
}
function favClickHandler(e){
  const slug = e.currentTarget.dataset.slug;
  const arr = saveToggle(slug);
  // toggle class on all buttons for this slug
  $$(`button.favorite-btn[data-slug="${slug}"]`).forEach(b => b.classList.toggle('saved', arr.includes(slug)));
  renderFavoritesGrid();
}

// ---------------------------
// NAV: mobile hamburger
// ---------------------------
function setupHamburger(){
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if(!hamburger || !navMenu) return;
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const open = navMenu.classList.contains('open');
    localStorage.setItem('aae.navOpen','' + open);
  });
  if(localStorage.getItem('aae.navOpen') === 'true') navMenu.classList.add('open');
}

// ---------------------------
// CONTACT FORM handling
// ---------------------------
function setupContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('contactStatus');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    // client-side validation example
    if(!data.name || !data.email || !data.message){
      status.textContent = 'Please complete all fields.';
      return;
    }
    // simulate send (no backend). Save name to localStorage to personalize
    localStorage.setItem('aae.lastContactName', data.name);
    status.textContent = `Thanks ${data.name}! Message noted (demo-only).`;
    form.reset();
  });
}

// ---------------------------
// LAZY LOAD IMAGES & REVEAL ON SCROLL
// uses IntersectionObserver
// ---------------------------
function observeLazy(){
  const lazyImgs = Array.from(document.querySelectorAll('img.lazy'));
  if(!lazyImgs.length) return;

  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const img = entry.target;
        const src = img.dataset.src;
        if(src){
          // set src + srcset if available (we used only data-src)
          img.src = src;
          img.classList.remove('lazy');
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  }, {rootMargin:'120px', threshold:0.01});

  lazyImgs.forEach(i => imgObserver.observe(i));
}

function observeReveal(){
  const items = Array.from(document.querySelectorAll('.reveal'));
  if(!items.length) return;
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  items.forEach(it => revealObs.observe(it));
}

// ---------------------------
// INITIALIZE: attach controls where present
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  setupContactForm();

  // HOME: featured
  renderHomeFeatured();

  // ART STYLES PAGE
  const stylesGrid = document.getElementById('stylesGrid');
  if(stylesGrid){
    // initial render
    renderStylesGrid(artStyles);

    // filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const region = btn.dataset.region;
        const filtered = filterStylesByRegion(region);
        renderStylesGrid(filtered);
      });
    });

    // search
    const searchInput = document.getElementById('style-search');
    if(searchInput){
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value;
        const out = q.trim() ? searchStyles(q) : artStyles;
        renderStylesGrid(out);
      });
    }
  }

  // ARTISTS PAGE
  const artistsGrid = document.getElementById('artistsGrid');
  if(artistsGrid){
    // initial render
    renderArtistsGrid(artists);

    // region filter
    const regionSelect = document.getElementById('regionFilter');
    if(regionSelect){
      regionSelect.addEventListener('change', () => {
        const region = regionSelect.value;
        const out = filterArtists({region, q: $('#artistSearch') ? $('#artistSearch').value : ''});
        renderArtistsGrid(out);
      });
    }

    // search
    const artistSearch = document.getElementById('artistSearch');
    if(artistSearch){
      artistSearch.addEventListener('input', () => {
        const q = artistSearch.value;
        const region = regionSelect ? regionSelect.value : 'all';
        const out = filterArtists({region, q});
        renderArtistsGrid(out);
      });
    }
  }

  // ARTIST FAVORITES: attach handlers if tiles exist on home/featured
  attachFavoriteHandlers();

  // Ensure lazy loading and reveal for any content that was inserted earlier
  observeLazy();
  observeReveal();
});
