# Deploy

**STATIC-ONLY ARCHITECTURE (staticv2.0)**

This site is pure HTML + CSS + JS. **No Node.js or npm required on the server.**

After `git clone`, simply copy files to `/home/admin/htdocs/www.admin.education` and `chown admin:admin`. The site works immediately with zero build step.

Build scripts (`build-i18n.mjs`, `generate-sitemap.mjs`) are optional maintainer tools. Committed HTML files are the source of truth for deployment.

## GitHub Pages (automated)

Push to `main` rebuilds the public HTML and force-updates the `gh-pages` branch. No tracker. The workflow also confirms `exams.html` and `data/certs.xml` still match `data/certs.json`.

**Multilingual structure:** The site now publishes 50 locale directories (`en/`, `sr/`, `fr/`, `de/`, `hi/`, `vi/`, `pt-BR/`, `es/`, `ja/`, `ko/`, `zh-CN/`, `ru/`, `pl/`, `it/`, `nl/`, `tr/`, `hr/`, `uk/`, `cs/`, `sk/`, `ro/`, `hu/`, `sv/`, `fi/`, `da/`, `id/`, `th/`, `ar/`, `zh-TW/`, `el/`, `bn/`, `pt/`, `nb/`, `he/`, `bg/`, `sl/`, `lt/`, `lv/`, `et/`, `ca/`, `ms/`, `fil/`, `fa/`, `ur/`, `sw/`, `ta/`, `af/`, `sq/`, `mk/`, `ka/`), each containing 6 pages.

**SEO structure:** Full hreflang tags, canonical tags, sitemap.xml (300 URLs), robots.txt, JSON-LD structured data.

Published files: locale directories (50 total), `css/`, `img/`, `js/`, `data/`, `locales/`, `sitemap.xml`, `robots.txt`, `VERSION`, `index.html` (redirects to `/en/`). Build scripts stay in git, not on the published root.

Live URL after Pages is serving the `gh-pages` branch:

https://arhitektahaosa.github.io/admin-education-site-staticv1/

`https://admin.education` is still WordPress until DNS is an explicit owner cutover. Do not add a CNAME in this repo until then.

## Linode + Cloud Panel (intended production)

The site is optimized for **Linode + Cloud Panel** with nginx as the primary production environment. This is the recommended deployment path for the `admin.education` apex domain at `/home/admin/htdocs/www.admin.education`.

**DEPLOYMENT PATH:** `/home/admin/htdocs/www.admin.education`  
**OWNER:** `admin:admin`

**Full setup instructions:** See `deploy/cloudpanel/README.md`

**Quick summary:**
- Create site in Cloud Panel (Static HTML)
- Enable SSL/TLS with Let's Encrypt
- Apply nginx performance directives from `deploy/cloudpanel/nginx-performance.conf`
- Deploy via `git clone` or rsync to `/home/admin/htdocs/www.admin.education`
- Set ownership: `chown -R admin:admin /home/admin/htdocs/www.admin.education`
- **No Node.js installation required on server**
- Expected performance: 95-100 Lighthouse score with gzip, long cache headers, and security headers

**Multilingual nginx config:**
Add to nginx vhost for locale routing (recommended but optional):

```nginx
# Redirect root to English locale (or detect from Accept-Language header)
location = / {
    return 302 /en/index.html;
}

# Optional: Auto-detect preferred language from browser
# (requires nginx_accept_language module or lua)
```

The Cloud Panel configuration enables gzip compression, optimized caching, HTTP/2, and security headers for maximum speed on a self-hosted VPS.

---

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
