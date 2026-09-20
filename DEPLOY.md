# Deploy

Push to `main` publishes the public HTML. No tracker. No build step beyond confirming `exams.html` and `data/certs.xml` still match `data/certs.json`.

Live preview after each successful run:

https://arhitektahaosa.github.io/admin-education-site-staticv1/

That URL is the automated surface. `https://admin.education` is still WordPress until DNS is pointed here. Do not add a CNAME in this repo until that cutover is an explicit owner step.

What ships: `index.html`, `method.html`, `writing.html`, `exams.html`, `links.html`, `contact.html`, `css/`, `img/`, `VERSION`. Overnight notes and render scripts stay in git, not on the published root.

Manual rerun: Actions → Deploy Pages → Run workflow.

## Later cutover (owner, not automatic)

When WordPress should leave the domain:

1. GitHub Pages custom domain: `admin.education`
2. DNS at the registrar: GitHub Pages records for an apex, or `www` CNAME to `arhitektahaosa.github.io`
3. Then add a `CNAME` file in the staged `_site` (one line: `admin.education`)
4. HTTPS is provisioned by GitHub after DNS answers

Until those four are done, the WordPress Hello world stays on the apex and this workflow must not claim it.
