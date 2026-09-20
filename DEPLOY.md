# Deploy

Push to `main` rebuilds the public HTML and force-updates the `gh-pages` branch. No tracker. The workflow also confirms `exams.html` and `data/certs.xml` still match `data/certs.json`.

Published files: `index.html`, `method.html`, `writing.html`, `exams.html`, `links.html`, `contact.html`, `css/`, `img/`, `VERSION`. Overnight notes and render scripts stay in git, not on the published root.

Live URL after Pages is serving the `gh-pages` branch:

https://arhitektahaosa.github.io/admin-education-site-staticv1/

`https://admin.education` is still WordPress until DNS is an explicit owner cutover. Do not add a CNAME in this repo until then.

## One-time switch (only if the first run could not enable Pages)

GitHub App tokens often cannot create a Pages site. If the preview URL 404s after a green workflow:

1. Open https://github.com/ArhitektaHaosa/admin-education-site-staticv1/settings/pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `/ (root)`
4. Save

After that, every push to `main` updates the site with no further clicks. Manual rerun: Actions → Deploy Pages → Run workflow.

## Later apex cutover (owner, not automatic)

When WordPress should leave the domain:

1. Pages custom domain: `admin.education`
2. DNS at the registrar: GitHub Pages records for an apex, or `www` CNAME to `arhitektahaosa.github.io`
3. Add a `CNAME` file in the staged `_site` (one line: `admin.education`)
4. HTTPS is provisioned by GitHub after DNS answers
