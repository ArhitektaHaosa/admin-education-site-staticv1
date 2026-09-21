#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "data/certs.json"), "utf8"));

const nav = `      <nav>
        <a href="index.html">Home</a>
        <a href="method.html">Method</a>
        <a href="writing.html">Writing</a>
        <a href="exams.html">Exams</a>
        <a href="links.html">Links</a>
        <a href="contact.html">Contact</a>
      </nav>`;

function starsLine(stars) {
  if (stars === null || stars === undefined) return "Membership badge. No star on the tile.";
  if (stars === 1) return "Hire-platform record: 1 star.";
  return `Hire-platform record: ${stars} stars.`;
}

const qualityMax = 3;

function qualityBadge(contentQuality) {
  if (!contentQuality) return "";
  return ` <span class="quality-tag">Content quality: ${contentQuality.score}/${qualityMax} (confidence ${contentQuality.confidence})</span>`;
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "&" + "amp;";
    if (ch === "<") return "&" + "lt;";
    if (ch === ">") return "&" + "gt;";
    if (ch === '"') return "&" + "quot;";
    return "&" + "apos;";
  });
}

function attr(value) {
  return `"${escapeXml(value)}"`;
}

const kindLabel = { exam: "Exam", orientation: "Orientation", membership: "Membership" };

const cards = data.items
  .map((item) => {
    const kind = kindLabel[item.kind] || "Record";
    return `      <article class="exam" id="${item.slug}">
        <img class="exam-mark" src="img/certs/${item.slug}.svg" alt="" width="64" height="64">
        <div>
          <h2>${item.label}</h2>
          <p class="exam-meta">${kind}. ${starsLine(item.stars)}${qualityBadge(item.contentQuality)}</p>
          <p>${item.what}</p>
          <p class="muted">${item.note}</p>
        </div>
      </article>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Platform exams — admin.education</title>
  <meta name="description" content="Hire-platform exams from a freelancer/vWorker record. Not a ministry diploma. School record stays on Method.">
  <link rel="icon" href="img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="css/site.css" as="style">
  <link rel="stylesheet" href="css/site.css">
</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="img/wordmark.svg" alt="admin.education" width="336" height="64"></a>
${nav}
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${data.title}</h1>
      <p class="lead">${data.rule}</p>
      <p>${data.source} Original small SVG marks on this page. Not the marketplace artwork.</p>
      <p class="muted">School record (Vukova diploma, 11 June 1998) is a different object and stays on Method. Do not merge the two lists.</p>
${cards}
      <p class="note">Anyone can ask for a source on a stated fact. If a later official Skillshop, Adobe, or Microsoft ID is produced, it gets its own line. These tiles are not that.</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">admin.education · knowledge is free · 2026</div>
  </footer>
</body>
</html>
`;

const xmlItems = data.items
  .map((item) => {
    const stars = item.stars == null ? "" : ` stars="${Number(item.stars)}"`;
    const quality = item.contentQuality
      ? ` content-quality-score="${item.contentQuality.score}" content-quality-confidence="${item.contentQuality.confidence}"`
      : "";
    return `  <item slug=${attr(item.slug)} kind=${attr(item.kind)}${stars}${quality}>
    <label>${escapeXml(item.label)}</label>
    <what>${escapeXml(item.what)}</what>
    <note>${escapeXml(item.note)}</note>
  </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-model href="certs.xsd"?>
<certs title=${attr(data.title)} source=${attr(data.source)} rule=${attr(data.rule)}>
${xmlItems}
</certs>
`;

writeFileSync(join(root, "exams.html"), html);
writeFileSync(join(root, "data/certs.xml"), xml);
console.log("wrote exams.html and data/certs.xml", data.items.length, "items");
