# admin-education-site-staticv1

Static spine for https://www.admin.education

Snapshot date: 2026-10-02  
Version: staticv3.0  
No tracker. System UI stack. SVG wordmark. Pure static architecture.

**Multilingual:** 50 locales with URL-prefix routing (`/en/`, `/sr/`, `/fr/`, `/ar/`, etc.)  
**SEO:** Full hreflang (15,300 alternates in sitemap), canonical tags, sitemap.xml (300 URLs), robots.txt, JSON-LD structured data  
**Pure static:** Zero Node/npm anywhere. No build tools. Deploy = git clone + copy.

Read `HANDOFF.md` before editing. Deploy: `DEPLOY.md`.

## Pages

- `index.html` Home
- `method.html` Method (school record)
- `writing.html` Writing
- `exams.html` Platform exams
- `links.html` Links
- `contact.html` Contact

## Multilingual (50 locales)

Languages: English (en), Serbian Latin (sr), French (fr), German (de), Hindi (hi), Vietnamese (vi), Portuguese Brazil (pt-BR), Spanish (es), Japanese (ja), Korean (ko), Simplified Chinese (zh-CN), Russian (ru), Polish (pl), Italian (it), Dutch (nl), Turkish (tr), Croatian (hr), Ukrainian (uk), Czech (cs), Slovak (sk), Romanian (ro), Hungarian (hu), Swedish (sv), Finnish (fi), Danish (da), Indonesian (id), Thai (th), Arabic RTL (ar), Traditional Chinese (zh-TW), Greek (el), Bengali (bn), Portuguese (pt), Norwegian Bokmål (nb), Hebrew RTL (he), Bulgarian (bg), Slovenian (sl), Lithuanian (lt), Latvian (lv), Estonian (et), Catalan (ca), Malay (ms), Filipino (fil), Persian RTL (fa), Urdu RTL (ur), Swahili (sw), Tamil (ta), Afrikaans (af), Albanian (sq), Macedonian (mk), Georgian (ka).

**All 300 HTML files are committed.** No build step exists.

**To edit translations:**
1. Edit HTML files directly in locale directories (e.g., `en/index.html`, `sr/method.html`)
2. Commit and push
3. GitHub Actions publishes automatically

**URL scheme:** Prefix-based routing. English: `/en/`, Serbian: `/sr/`, etc.

**Language switcher:** Interactive dropdown in header. Preserves user preference in localStorage. Script: `js/lang-switcher.js`

## Deploy

Every push to `main` publishes to GitHub Pages:

https://arhitektahaosa.github.io/admin-education-site-staticv1/

`https://www.admin.education` is the intended production domain. Details in `DEPLOY.md`.

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
