# HANDOFF — Static Site MASTER

This repository is the only work surface for https://admin.education right now.

No rush. Owner sends more copy when ready. Fold it in. Do not invent pages to look busy. Do not open other GitHub tokens or other repos unless the owner says so.

Overnight prompt: `PROMPT-STATIC-SITE-MASTER.md`
Short index: `OVERNIGHT.md`

## Locked (2026-10-02, Europe/Belgrade)

- Stack: pure static HTML and CSS. **No Node, no npm, no build tools.** All 300 HTML files committed.
- To edit: Update HTML files directly in locale directories. No generation step exists.
- Brand: paper `#F7F4EE`, ink `#111111`, accent `#FF6719`.
- Marks: `img/wordmark.svg`, `img/logo.svg`. Exam marks: original SVG in `img/certs/`.
- Do not print the personal legal name on any public page. Display name is admin.education. Public handle is @ArhitektaHaosa.
- X is not listed. LinkedIn is inventory only and is not a draft surface here.
- Phone number is never published. WhatsApp / Viber / Telegram exist on the real-number desk; Cloaked is for aliases to strangers and forms.
- Email on the page stays written as `mapkomah at proton.me` (also reaches mapkomah at gmail.com). Write first.
- Knowledge is free. Online only. No visits required.
- If a sentence cannot be measured or sourced, it does not belong on this domain.
- School record and platform exams stay on two lines. They are not the same object.

## Live URLs to use (do not revert)

- Bluesky (primary): https://bsky.app/profile/admin.education
- Instagram: https://www.instagram.com/ArhitektaHaosa/
- Facebook: https://www.facebook.com/ArhitektaHaosa
- Threads: https://www.threads.com/@arhitektahaosa
- Substack: https://arhitektahaosa.substack.com/
- GitHub operator: https://github.com/ArhitektaHaosa
- This spine: https://github.com/ArhitektaHaosa/admin-education-site-staticv1

Old Bluesky `arhitektahaosa.bsky.social` is retired on this domain. Use `admin.education`.

## Pages now

All pages exist in 50 locale directories (`en/`, `sr/`, `fr/`, ..., `ka/`):
- `index.html` Home
- `method.html` Method
- `writing.html` Writing
- `exams.html` Platform exams
- `links.html` Link-in-bio
- `contact.html` Contact

Root `index.html` redirects to `/en/`.

Navigation on every page: Home, Method, Writing, Exams, Links, Contact.

Language switcher: Interactive dropdown in header (50 locales).

## Deploy

Push to `main` publishes GitHub Pages automatically. Workflow: `.github/workflows/pages.yml`. Notes: `DEPLOY.md`.

Preview: https://arhitektahaosa.github.io/admin-education-site-staticv1/

WordPress Hello world is still on https://www.admin.education until the owner points DNS. Do not add a CNAME or claim the apex until that cutover is explicit.
