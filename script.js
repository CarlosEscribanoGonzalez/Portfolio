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
        <img class="project-thumb" src="${p.image}" alt="${p.title}">
        <div class="project-caption">
          <div class="project-title">${p.title}</div>
          <div class="project-subtitle">${p.subtitle}</div>
        </div>
      </div>
    `
    )
    .join("");
}

function openProjectModal(projectId) {
  const p = projects.find((proj) => proj.id === projectId);
  if (!p) return;

  const modal = document.getElementById("project-modal");

  document.getElementById("modal-title").textContent = p.title;
  document.getElementById("modal-subtitle").textContent = p.subtitle;
  document.getElementById("modal-image").src = p.image;
  document.getElementById("modal-image").alt = p.title;
  document.getElementById("modal-description").innerHTML = p.description;

  const detailsList = document.getElementById("modal-details");
  detailsList.innerHTML = Object.entries(p.details || {})
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join("");

  const linkBtn = document.getElementById("modal-link");
  if (p.link) {
    linkBtn.style.display = "";
    linkBtn.textContent = p.linkLabel || "View";
    linkBtn.onclick = () => window.open(p.link, "_blank");
  } else {
    linkBtn.style.display = "none";
  }

  const linkBtn2 = document.getElementById("modal-secondary-link");
  if (p.secondaryLink) {
    linkBtn2.style.display = "";
    linkBtn2.textContent = p.secondaryLinkLabel || "View";
    linkBtn2.onclick = () => window.open(p.secondaryLink, "_blank");
  } else {
    linkBtn2.style.display = "none";
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  document.getElementById("project-modal").hidden = true;
  document.body.classList.remove("modal-open");
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
  if (e.key === "Escape") closeProjectModal();
});

//Sections:
renderSection("featured-grid", "featured");
renderSection("master-grid", "master");
renderSection("jams-grid", "jams");
renderSection("degree-grid", "degree");