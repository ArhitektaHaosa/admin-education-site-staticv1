# admin-education-site-staticv1

Static spine for https://admin.education

Snapshot date: 2026-09-21  
Version: staticv1.3  
No tracker. System UI stack. SVG wordmark. Optional local render for exams only.

Read `OVERNIGHT.md` then `HANDOFF.md` before editing. Deploy: `DEPLOY.md`.

## Pages

- `index.html` Home
- `method.html` Method (school record)
- `writing.html` Writing
- `exams.html` Platform exams
- `links.html` Links
- `contact.html` Contact

## Exams (easy to update)

Source of truth: `data/certs.json`  
Twin: `data/certs.xml` (schema `data/certs.xsd`)  
Marks: `img/certs/{slug}.svg` (original geometry, not marketplace art)

```
node scripts/render-exams.mjs
```

writes `exams.html` and `data/certs.xml`.

## Deploy

Every push to `main` publishes to GitHub Pages:

https://arhitektahaosa.github.io/admin-education-site-staticv1/

`https://admin.education` is still WordPress until DNS is an explicit owner cutover. Do not add a CNAME here until then. Details in `DEPLOY.md`.

## Brand

- Accent `#FF6719`
- Paper `#F7F4EE`
- Wordmark `img/wordmark.svg`
- Logo `img/logo.svg`

## Live surfaces (locked)

- Bluesky https://bsky.app/profile/admin.education
- Instagram https://www.instagram.com/ArhitektaHaosa/
- Facebook https://www.facebook.com/ArhitektaHaosa
- Threads https://www.threads.com/@arhitektahaosa
- Substack https://arhitektahaosa.substack.com/

## Social cards

Static marks only. Paper `#F7F4EE`, ink `#111111`, accent `#FF6719`. No extra art.

- `img/social/wide.svg` source
- `img/social/wide.png` and `wide-1920x1080.png` — 16:9 (Bluesky, Threads, Instagram landscape)
- `img/social/og-1200x630.png` — Open Graph / Facebook
- `img/social/wide-1600x900.png` — 16:9 smaller
- `img/social/bluesky-wide.jpg` — earlier painted 16:9; prefer the PNG/SVG above
