# admin-education-site-staticv1

Static spine for https://admin.education

Snapshot date: 2026-09-20  
Version: staticv1.2  
No tracker. System UI stack. SVG wordmark. Optional local render for exams only.

Read `OVERNIGHT.md` then `HANDOFF.md` before editing.

## Pages

- `index.html` Home
- `method.html` Method (school record)
- `writing.html` Writing
- `exams.html` Platform exams
- `links.html` Links
- `contact.html` Contact

## Exams (easy to update)

Source of truth: `data/certs.json`  
Marks: `img/certs/{slug}.svg` (original geometry, not marketplace art)

```
node scripts/render-exams.mjs
```

writes `exams.html`. Deploy is still copy files.

## Local

```
python3 -m http.server 8080 --directory .
```

## Deploy

WordPress on the domain is still the default Hello world post from 18 September 2026 until you replace the document root with this folder.

1. Snapshot current WP files.
2. Put this folder at the web root.
3. Point the vhost at it.

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
