# OVERNIGHT — Static Site MASTER

Repo: https://github.com/ArhitektaHaosa/admin-education-site-staticv1
Only this repo. No other GitHub tokens. No rush. Fast, secure, easy to update.

Read this file, then `HANDOFF.md`, then `data/certs.json`. Do not invent pages to look busy.

## Goal for this pass

Make the static spine fast to load, hard to abuse, and cheap to extend.

The owner sent hire-platform screenshots labelled Certifications. Fold **every** tile into `exams.html` with:

- a **new original** small SVG in `img/certs/{slug}.svg` (already started)
- a short explanation of **what that tile text is**
- star count as shown, or “no star” for the vWorker membership tile

Do **not** clone marketplace, Google, Adobe, WordPress, or Nginx trademark artwork. Original geometry only. Brand tokens: paper `#F7F4EE`, ink `#111111`, accent `#FF6719`.

## Fast

- Stay static HTML + CSS. No React, no WordPress plugins, no Google Fonts, no analytics, no tag manager, no ads.
- SVG marks, not PNG/JPEG badges.
- System UI stack already in `css/site.css`.
- Keep CSS in one file. No extra libraries.
- One optional local script: `node scripts/render-exams.mjs` reads `data/certs.json` and writes `exams.html`. Deploy is still copy files. Do not add webpack.

## Secure

- No third-party scripts.
- External links `rel="noopener noreferrer"`.
- Never publish a phone number.
- Email stays `mapkomah at proton.me` on the page (gmail as the second line).
- Do not add forms that post to unknown endpoints.
- Do not add cookies, trackers, or fingerprinting.
- Do not execute commands against third-party machines in any copy. White Hat. Unix verbs on this site are metaphors.

## Updateable

Single source for exams: `data/certs.json`.

To add or correct a tile:

1. Edit the JSON item (slug, label, stars, kind, what, note).
2. Add or replace `img/certs/{slug}.svg` (96×96 viewBox, original mark).
3. Run `node scripts/render-exams.mjs`.
4. Commit JSON + SVG + `exams.html`.

Do not keep a second hand-edited exam list that can drift.

## Voice on exams (locked)

The hire-platform UI says Certifications. On this domain they are **marketplace exams**.

- Not a ministry diploma.
- Not a doctorate. There is no PhD here.
- Not Google Skillshop, Adobe Certified Professional, or Microsoft Certified unless a real ID is produced later. None is on this record.
- School record stays on Method: Vukova diploma, OŠ Nikola Tesla, Vinča, 11 June 1998. Subjects on **that school diploma**: English, biology, physics, mathematics.
- Two stars on US English and UK English are what the screenshots show. One star on the other exams. Foundation vWorker Member has no star: membership, not a score.

PHP appears twice across screenshots. **One exam.**

Photoshop CS5 is a dated product line. AdWords is the old product name. vWorker is a legacy marketplace absorbed by Freelancer. Say so. Do not modernise the titles into current vendor marketing.

freelancer.com/u/kerberus is a hire record from 2006. This domain is not a bid profile.

## Public facts allowed on the spine

- Display name: admin.education. Handle: @ArhitektaHaosa.
- Systems administrator since 2002. Webmin, Virtualmin, CentOS first. Later machines include Linode, Vercel, DigitalOcean. Default self-host when speed is not the priority.
- Educator in informatics, IT, and applied AI. Independent. Never employed by Serbian state institutions.
- Knowledge is free. Online only. No visits required.
- White Hat. Consent first. Attribution and reciprocity. Small shared core, local project.
- RateZip.com is dated work, 2007–2022. Not present-tense CEO copy.
- Diploma thesis unfinished. Then remote work for a Canadian company. Do not write a US employer for that step.
- Bluesky primary: https://bsky.app/profile/admin.education
- Instagram https://www.instagram.com/ArhitektaHaosa/
- Facebook https://www.facebook.com/ArhitektaHaosa
- Threads https://www.threads.com/@arhitektahaosa
- Substack https://arhitektahaosa.substack.com/
- GitHub https://github.com/ArhitektaHaosa
- LinkedIn is inventory only (linkedin.com/in/Arhitektasrece). Not a draft surface here.
- Mastodon handle @tehpoet (instance URL unknown — do not invent one).
- Discord display Arhitekta (invite URL unknown — do not invent one).
- Reddit u/FantasticTopic (no native hashtags there).
- WhatsApp, Viber, Telegram exist on one real-number desk. Number is never printed. Cloaked is for aliases to strangers and forms.

## Do not print on any public page

- Personal legal name
- Phone number
- Date of birth, home address, or city of residence
- Family names
- Pets
- X as a live surface (do not list it)
- “moja tvrdnja” or “Structure holds”
- Grok Linux Serbia (does not exist)
- MetaMagicians or Atlas Commons as live projects
- Internal staff names from dated RateZip work
- A live status for chaos.dev or redacto.rs

Affiliate / license facts exist off to the side (eBay/Threadless under mrkmn/Kerberus; a US mortgage-license affiliate line). **Do not add them overnight** unless the owner asks. If they ever go on the site, money gets in-sentence disclosure.

ELIZA/mIRC 1995 is origin, not part of the 2002 sysadmin span. Do not merge those dates.

2D Flash/SWiSH and festival film work: off the spine unless the owner asks.

## Pages after this pass

- `index.html` Home
- `method.html` Method (school record)
- `writing.html` Writing
- `exams.html` Platform exams (hire-platform tiles)
- `links.html` Link-in-bio
- `contact.html` Contact
- `data/certs.json` exam source
- `img/certs/*.svg` original marks
- `scripts/render-exams.mjs` regenerates exams.html

Nav: Home, Method, Writing, Exams, Links, Contact.

Add one sentence on Method pointing at `exams.html`: platform exams are a different object from the school diploma.

## Quality bar

- If a sentence cannot be measured or sourced, it does not belong.
- Do not invent exam dates or scores that are not on the screenshots.
- Do not sell a visa, a diploma, or a miracle.
- Keep header, footer, `.wrap`, tokens identical.
- Bump `VERSION` when you commit a real change.

When you finish a slice, stop. Wait for the next owner packet.
