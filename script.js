const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif"];
const folderOf = (p) => `assets/${p.id}`;

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

const galleryCache = {};
async function loadGallery(project) {
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

let gallery = { urls: [], index: 0 };
let openToken = 0;

function showGalleryImage(i) {
  if (gallery.urls.length === 0) return;
  const n = gallery.urls.length;
  gallery.index = (i + n) % n;
  setModalImage(gallery.urls[gallery.index]);
  document.getElementById("gallery-counter").textContent = `${gallery.index + 1} / ${n}`;
  [gallery.index + 1, gallery.index - 1].forEach((j) => {
    new Image().src = gallery.urls[(j + n) % n];
  });
}

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

  const loader = new Image();
  loader.src = url;
  if (loader.complete) { 
    img.src = url;
    gal.classList.remove("loading");
    return;
  }

  gal.classList.add("loading");
  loader.onload = loader.onerror = () => {
    if (token !== imgToken) return;
    img.src = url;
    gal.classList.remove("loading");
  };
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

  container.querySelectorAll(".project-thumb").forEach(async (img) => {
    const url = await probeImage(`${img.dataset.folder}/cover`);
    if (url) img.src = url;
  });
}

async function openProjectModal(projectId) {
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
  setModalImage(thumb && thumb.src ? thumb.src : null);

  modal.hidden = false;
  document.body.classList.add("modal-open");

  const urls = await loadGallery(p);
  if (myToken !== openToken) return;
  gallery = { urls, index: 0 };
  document.querySelector(".gallery").classList.toggle("single", urls.length <= 1);
  showGalleryImage(0);
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