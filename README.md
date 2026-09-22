# admin-education-site-staticv1

Static spine for https://admin.education

Snapshot date: 2026-09-22  
Version: staticv2.0  
No tracker. System UI stack. SVG wordmark. Static-only architecture.

**Multilingual:** 50 locales with URL-prefix routing (`/en/`, `/sr/`, `/fr/`, `/ar/`, etc.)  
**SEO:** Full hreflang, canonical tags, sitemap.xml, robots.txt, JSON-LD structured data  
**Static-only:** Zero Node/npm on server. Pure HTML/CSS/JS. Deploy = git clone + copy.

Read `OVERNIGHT.md` then `HANDOFF.md` before editing. Deploy: `DEPLOY.md`.

## Pages

- `index.html` Home
- `method.html` Method (school record)
- `writing.html` Writing
- `exams.html` Platform exams
- `links.html` Links
- `contact.html` Contact

## Multilingual (50 locales)

Languages: English (en), Serbian Latin (sr), French (fr), German (de), Hindi (hi), Vietnamese (vi), Portuguese Brazil (pt-BR), Spanish (es), Japanese (ja), Korean (ko), Simplified Chinese (zh-CN), Russian (ru), Polish (pl), Italian (it), Dutch (nl), Turkish (tr), Croatian (hr), Ukrainian (uk), Czech (cs), Slovak (sk), Romanian (ro), Hungarian (hu), Swedish (sv), Finnish (fi), Danish (da), Indonesian (id), Thai (th), Arabic RTL (ar), Traditional Chinese (zh-TW), Greek (el), Bengali (bn), Portuguese (pt), Norwegian Bokmål (nb), Hebrew RTL (he), Bulgarian (bg), Slovenian (sl), Lithuanian (lt), Latvian (lv), Estonian (et), Catalan (ca), Malay (ms), Filipino (fil), Persian RTL (fa), Urdu RTL (ur), Swahili (sw), Tamil (ta), Afrikaans (af), Albanian (sq), Macedonian (mk), Georgian (ka).

**Build all locales (maintainers only):**

```
node scripts/build-i18n.mjs
```

Generates 300 HTML files (6 pages × 50 locales) in locale directories: `/en/`, `/sr/`, `/fr/`, `/ar/`, etc.

**IMPORTANT:** Build script is for maintainers only. For deployment, committed HTML files are the source of truth. No Node/npm required on the server.

**Generate sitemap:**

```
node scripts/generate-sitemap.mjs
```

Creates sitemap.xml with all 186 URLs for Google indexing.

**URL scheme:** Prefix-based routing. English: `/en/index.html`, Serbian: `/sr/index.html`, etc.

**Language switcher:** Interactive dropdown in header. Preserves user preference in localStorage. Script: `js/lang-switcher.js`

**Strings:** `locales/{code}.json` files contain all UI text. Edit JSON, then rebuild.

**To add a 51st language:**
1. Create `locales/XX.json` (copy `en.json` as template)
2. Translate all strings, set `lang_native` in native script, set `lang_dir` to `"rtl"` for right-to-left languages (Arabic, Hebrew, Persian, Urdu)
3. Add `'XX'` to `LOCALES` array in `scripts/build-i18n.mjs` and `scripts/generate-sitemap.mjs`
4. Add locale name to `localeNames` object in `build-i18n.mjs`
5. Run `node scripts/build-i18n.mjs` and `node scripts/generate-sitemap.mjs`
6. Update `robots.txt` to include the new locale directory
7. Commit all generated HTML files

## Exams (easy to update)

Source of truth: `data/certs.json`  
Twin: `data/certs.xml` (schema `data/certs.xsd`)  
Marks: `img/certs/{slug}.svg` (original geometry, not marketplace art)

```
node scripts/render-exams.mjs
```

writes `exams.html` and `data/certs.xml`.

**Note:** To update exams in all locales, first update `data/certs.json`, then run both:
```
node scripts/render-exams.mjs  # updates root exams.html
node scripts/build-i18n.mjs    # regenerates all locale pages
```

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
