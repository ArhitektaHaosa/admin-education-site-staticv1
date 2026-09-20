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

const kindLabel = { exam: "Exam", orientation: "Orientation", membership: "Membership" };

const cards = data.items
  .map((item) => {
    const kind = kindLabel[item.kind] || "Record";
    return `      <article class="exam" id="${item.slug}">
        <img class="exam-mark" src="img/certs/${item.slug}.svg" alt="" width="64" height="64">
        <div>
          <h2>${item.label}</h2>
          <p class="exam-meta">${kind}. ${starsLine(item.stars)}</p>
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
  <link rel="stylesheet" href="css/site.css">
</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="img/wordmark.svg" alt="admin.education"></a>
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

writeFileSync(join(root, "exams.html"), html);
console.log("wrote exams.html", data.items.length, "items");
