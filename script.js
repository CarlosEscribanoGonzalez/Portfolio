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
  }
}

function stopHoverPreview(card) {
  if (!activeHover || activeHover.card !== card) return;
  activeHover = null;
  const thumb = card.querySelector(".project-thumb");
  if (thumb && thumb.dataset.cover) thumb.src = thumb.dataset.cover;
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

function renderSection(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`No element found for id="${containerId}"`);
    return;
  }

  const filtered = projects.filter((p) => p.categories.includes(category));

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty-note">There are no projects yet in "${category}".</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (p) => `
      <div class="project-card" data-project-id="${p.id}">
        <img class="project-thumb" data-folder="${folderOf(p)}" alt="${p.title}">
        <div class="project-caption">
          <div class="project-title">${p.title}</div>
          <div class="project-subtitle">${p.subtitle}</div>
        </div>
      </div>
      `
    )
    .join("");

    container.querySelectorAll(".project-thumb").forEach((img) => {
      coverPromises.push((async () => {
        const p = projects.find((x) => x.id === img.closest("[data-project-id]").dataset.projectId);
        const url = coverUrl(p) || (await probeImage(`${img.dataset.folder}/portrait`));
        if (!url) return;
        img.dataset.cover = url;
        img.src = url;
        await whenLoaded(url);
      })());
    });

    container.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", () => startHoverPreview(card));
      card.addEventListener("mouseleave", () => stopHoverPreview(card));
    });
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

  const detailsList = document.getElementById("modal-details");
  detailsList.innerHTML = Object.entries(p.details || {})
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
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

//Sections:
renderSection("featured-grid", "featured");
renderSection("master-grid", "master");
renderSection("jams-grid", "jams");
renderSection("degree-grid", "degree");
Promise.all(coverPromises).then(warmUpSecondImages);