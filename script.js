const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif"];
const folderOf = (p) => `assets/${p.id}`;
const coverPromises = [];

//Gallery and images:
const galleryCache = {};
let gallery = { urls: [], index: 0 };
let openToken = 0;
const imgCache = {};

function probeImage(basePath) {
  return new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= IMAGE_EXTENSIONS.length) return resolve(null);
      const url = `${basePath}.${IMAGE_EXTENSIONS[i++]}`;
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = tryNext;
      img.src = url;
    };
    tryNext();
  });
}

async function loadGallery(project) {
  if (typeof galleryManifest !== "undefined" && galleryManifest[project.id]) {
    return galleryManifest[project.id];
  }
  if (galleryCache[project.id]) return galleryCache[project.id];
  const folder = folderOf(project);
  const urls = [];
  const cover = await probeImage(`${folder}/cover`);
  if (cover) urls.push(cover);
  for (let n = 1; ; n++) {
    const url = await probeImage(`${folder}/${n}`);
    if (!url) break;
    urls.push(url);
  }
  return (galleryCache[project.id] = urls);
}

function showGalleryImage(i) {
  if (gallery.urls.length === 0) return;
  const n = gallery.urls.length;
  gallery.index = (i + n) % n;
  setModalImage(gallery.urls[gallery.index]);
  document.getElementById("gallery-counter").textContent = `${gallery.index + 1} / ${n}`;
}

function getImage(url) {
  if (!imgCache[url]) {
    const img = new Image();
    img.src = url;
    imgCache[url] = img;
  }
  return imgCache[url];
}

function whenLoaded(url) {
  const img = getImage(url);
  if (img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
}

async function preloadAll(urls, token) {
  for (const url of urls) {
    if (token !== openToken) return;
    await whenLoaded(url);
  }
}

//Hover:
let activeHover = null;
const HOVER_INTERVAL = 3000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const canHover = () =>
  matchMedia("(hover: hover)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

function coverUrl(p) {
  return (typeof galleryManifest !== "undefined" && galleryManifest[p.id] && galleryManifest[p.id][0]) || null;
}

async function preloadSequential(urls, keepGoing) {
  for (const url of urls) {
    if (!keepGoing()) return;
    await whenLoaded(url);
  }
}

async function startHoverPreview(card) {
  if (!canHover()) return;
  const p = projects.find((x) => x.id === card.dataset.projectId);
  const thumb = card.querySelector(".project-thumb");
  const badge = card.querySelector(".project-badge");
  if (!p || !thumb) return;

  const me = { card };
  activeHover = me;
  const alive = () => activeHover === me;

  const urls = await loadGallery(p);
  if (!alive() || urls.length < 2) return;

  preloadSequential(urls.slice(1), alive);

  let i = 0;
  let first = true;
  while (true) {
    if (!first) await sleep(HOVER_INTERVAL);
    first = false;
    if (!alive()) return;
    const next = (i + 1) % urls.length;
    await whenLoaded(urls[next]);
    if (!alive()) return;
    i = next;
    thumb.src = urls[i];
    if(badge) badge.classList.toggle("hidden", i !== 0);
  }
}

function stopHoverPreview(card) {
  if (!activeHover || activeHover.card !== card) return;
  activeHover = null;
  const thumb = card.querySelector(".project-thumb");
  if (thumb && thumb.dataset.cover) thumb.src = thumb.dataset.cover;
  const badge = card.querySelector(".project-badge");
  if (badge) badge.classList.remove("hidden");
}

async function warmUpSecondImages() {
  for (const p of projects) {
    const urls = await loadGallery(p);
    if (urls[1]) await whenLoaded(urls[1]);
  }
}

//Modal:
let imgToken = 0;
function setModalImage(url) {
  const img = document.getElementById("modal-image");
  const gal = document.querySelector(".gallery");
  const token = ++imgToken;

  if (!url) {
    img.removeAttribute("src");
    gal.classList.add("loading");
    return;
  }
  if (getImage(url).complete) {
    img.src = url;
    gal.classList.remove("loading");
    return;
  }
  gal.classList.add("loading");
  whenLoaded(url).then(() => {
    if (token !== imgToken) return;
    img.src = url;
    gal.classList.remove("loading");
  });
}

function createCard(p) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="project-card" data-project-id="${p.id}">
      <div class="project-cover">
        <img class="project-thumb" alt="${p.title}">
        ${p.badge ? `<img class="project-badge${p.badgePosition ? ` ${p.badgePosition}` : ""}" src="assets/logos/${p.badge}" alt="">` : ""}
      </div>
      <div class="project-caption">
        <div class="project-title">${p.title}</div>
        <div class="project-subtitle">${p.subtitle}</div>
      </div>
    </div>`;
  const card = wrapper.firstElementChild;
  const img = card.querySelector(".project-thumb");

  coverPromises.push((async () => {
    const url = coverUrl(p) || (await probeImage(`${p.folder}/portrait`));
    if (!url) return;
    img.dataset.cover = url;
    img.src = url;
    await whenLoaded(url);
  })());

  card.addEventListener("mouseenter", () => startHoverPreview(card));
  card.addEventListener("mouseleave", () => stopHoverPreview(card));

  return card;
}

function renderSection(container, list) {
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class="empty-note">There are no projects yet.</p>`;
    return;
  }

  list.forEach((p) => container.appendChild(createCard(p)));
}

async function openProjectModal(projectId) {
  if (activeHover) stopHoverPreview(activeHover.card);

  const p = projects.find((proj) => proj.id === projectId);
  if (!p) return;

  const myToken = ++openToken;
  const modal = document.getElementById("project-modal");

  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-subtitle").textContent = p.subtitle;
  document.getElementById("modal-description").innerHTML = p.description;
  document.getElementById("modal-image").alt = p.title;

  const fields = TEMPLATES[p.template] || Object.keys(p.details || {});
  document.getElementById("modal-details").innerHTML = fields
    .filter((f) => p.details && p.details[f])
    .map((f) => `<li><strong>${f}:</strong> ${p.details[f]}</li>`)
    .join("");

  const linksBox = document.getElementById("modal-links");
  linksBox.innerHTML = "";
  p.links.filter((l) => l.url).forEach((l) => {
    const a = document.createElement("a");
    a.className = "modal-link-btn";
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = l.label || "View";
    linksBox.appendChild(a);
  });

  const thumb = document.querySelector(`[data-project-id="${projectId}"] .project-thumb`);
  gallery = { urls: [], index: 0 };
  document.getElementById("gallery-counter").textContent = "";
  document.querySelector(".gallery").classList.add("single");
  setModalImage(thumb && thumb.dataset.cover ? thumb.dataset.cover : null);

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-box").scrollTop = 0;
  document.body.classList.add("modal-open");

  const urls = await loadGallery(p);
  if (myToken !== openToken) return;
  gallery = { urls, index: 0 };
  document.querySelector(".gallery").classList.toggle("single", urls.length <= 1);
  showGalleryImage(0);
  preloadAll(urls, myToken);
}

function closeProjectModal() {
  document.getElementById("project-modal").hidden = true;
  document.body.classList.remove("modal-open");
  openToken++;
}

document.addEventListener("click", (e) => {
  const card = e.target.closest("[data-project-id]");
  if (card) {
    openProjectModal(card.dataset.projectId);
    return;
  }
  if (e.target.matches("[data-modal-close]")) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (e) => {
  const modalOpen = !document.getElementById("project-modal").hidden;
  if (e.key === "Escape") closeProjectModal();
  if (modalOpen && e.key === "ArrowLeft")  showGalleryImage(gallery.index - 1);
  if (modalOpen && e.key === "ArrowRight") showGalleryImage(gallery.index + 1);
});

document.getElementById("gallery-prev").addEventListener("click", () => showGalleryImage(gallery.index - 1));
document.getElementById("gallery-next").addEventListener("click", () => showGalleryImage(gallery.index + 1));

//Project validation:
function validateProjects() {
  for (const p of projects) {
    const allowed = TEMPLATES[p.template];
    if (!allowed) { console.warn(`[${p.id}] missing or unknown template: "${p.template}"`); continue; }
    for (const key of Object.keys(p.details || {})) {
      if (!allowed.includes(key)) console.warn(`[${p.id}] "${key}" is not a template key "${p.template}"`);
    }
  }
}
validateProjects();

//Sections & sorting:
const IN_PROGRESS = "in active development";
const SORTS = {
  academic: {
    order: ["featured", "master", "jams", "degree"],
    titles: { featured: "Featured", master: "Master's Degree", jams: "Game jams", degree: "Bachelor's Degree" },
  },
  type: {
    order: ["game", "app", "graphics", "simulation", "other"],
    titles: { game: "Games", app: "Apps", graphics: "Graphics",
              simulation: "Physics & Simulation", other: "Other software" },
  },
  language: { order: null, titles: {} },
  date:     { order: null, titles: {} },
};
function dateRank(value) {
  return value.trim().toLowerCase() === IN_PROGRESS ? Infinity : Number(value);
}
const newestFirst = (a, b) => dateRank(b) - dateRank(a);

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function detailDate(p) {
  if (p.categories.date.trim().toLowerCase() === IN_PROGRESS) return Infinity;
  const text = String(p.details?.["Release Date"] ?? p.details?.["Date"] ?? "");
  const year = text.match(/\b(20\d{2})\b/);
  if (!year) return 0;

  const lower = text.toLowerCase();
  let month = MONTHS.findIndex((m) => lower.includes(m)) + 1;

  if (!month) {
    const mmYyyy = text.match(/(0?[1-9]|1[0-2])[\/.-](?=20\d{2})/);
    const yyyyMm = text.match(/20\d{2}[\/.-](0?[1-9]|1[0-2])/);
    month = Number((mmYyyy || yyyyMm || [0, 0])[1]);
  }

  return Number(year[1]) * 12 + month;
}

const BADGE_HEAD = ["unity", "c++", "cuda", "phaser", "javascript"];
const BADGE_TAIL = ["assembly", "ags"];
function badgeRank(p) {
  const name = String(p.badge ?? "").replace(/\.\w+$/, "").toLowerCase();
  const find = (list) => list.findIndex((aliases) => [].concat(aliases).some((a) => name.includes(a)));
  const head = find(BADGE_HEAD);
  if (head !== -1) return head;
  const tail = find(BADGE_TAIL);
  if (tail !== -1) return 1000 + tail;
  return 100;
}
const byBadgeThenDate = (a, b) => badgeRank(a) - badgeRank(b) || detailDate(b) - detailDate(a);

function getGroupKeys(dimension) {
  const { order } = SORTS[dimension];
  const present = new Set(projects.map((p) => p.categories[dimension]));

  if (order) return order.filter((k) => present.has(k));
  if (dimension === "date") return [...present].sort(newestFirst);
  return [...present].sort((a, b) => a.localeCompare(b)); // language
}

function renderProjects(dimension) {
  const root = document.getElementById("projects-root");
  root.innerHTML = "";

  for (const key of getGroupKeys(dimension)) {
    const group = projects.filter((p) => p.categories[dimension] === key);
    if (dimension === "date") group.sort((a, b) => detailDate(b) - detailDate(a));
    else if (dimension === "language" || dimension === "type") group.sort(byBadgeThenDate);
    const wrapper = document.createElement("div");
    wrapper.className = "project-group";
    const title = document.createElement("h2");
    title.textContent = SORTS[dimension].titles[key] ?? key;
    const grid = document.createElement("div");
    grid.className = "project-grid";
    renderSection(grid, group);
    wrapper.append(title, grid);
    root.appendChild(wrapper);
  }
}

//Dropdown:
const sortSelect = document.getElementById("sort-select");
let savedSort = null;
try { savedSort = localStorage.getItem("sortBy"); } catch (e) {}
if (savedSort && SORTS[savedSort]) sortSelect.value = savedSort;
sortSelect.addEventListener("change", () => {
  try { localStorage.setItem("sortBy", sortSelect.value); } catch (e) {}
  renderProjects(sortSelect.value);
});

//Render projects:
renderProjects(sortSelect.value);
Promise.all(coverPromises).then(warmUpSecondImages);