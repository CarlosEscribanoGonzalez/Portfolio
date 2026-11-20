const fs = require("fs");
const vm = require("vm");

const IMAGE_RE = /\.(png|jpe?g|gif|webp)$/i;
const projects = vm.runInNewContext(fs.readFileSync("projects.js", "utf8") + "\n;projects");

const manifest = {};
for (const p of projects) {
  const folder = "assets/" + (p.folder || p.id);
  if (!fs.existsSync(folder)) {
    console.warn(`Folder "${folder}" (${p.id}) doesn't exist`);
    continue;
  }
  const isCover = (f) => /^cover\./i.test(f);
  const files = fs.readdirSync(folder).filter((f) => IMAGE_RE.test(f));
  files.sort((a, b) =>
    isCover(a) ? -1 : isCover(b) ? 1 : a.localeCompare(b, undefined, { numeric: true })
  );
  manifest[p.id] = files.map((f) => encodeURI(`${folder}/${f}`));
  console.log(`${p.id}: ${files.length} images`);
}

fs.writeFileSync(
  "gallery.js",
  "const galleryManifest = " + JSON.stringify(manifest, null, 2) + ";\n"
);