# Cloud Panel Deployment Guide

This site is optimized for **Linode + Cloud Panel** with nginx as the production environment.

## Prerequisites

- Cloud Panel installed on Linode VPS
- Domain added in Cloud Panel
- SSH/SFTP access to your site's document root

## Initial Setup in Cloud Panel

### 1. Create Site

1. Log into Cloud Panel
2. Navigate to **Sites** → **Add Site**
3. Choose **Static HTML**
4. Enter your domain: `admin.education` (or subdomain)
5. Set document root: typically `/home/cloudpanel/htdocs/[domain]/`

### 2. SSL Certificate (Let's Encrypt)

1. Go to **Sites** → Select your domain → **SSL/TLS**
2. Click **Actions** → **New Let's Encrypt Certificate**
3. Select your domain and www variant (if applicable)
4. Click **Create and Install**
5. Enable **Force HTTPS** toggle

### 3. Enable HTTP/2

Cloud Panel enables HTTP/2 by default when SSL is active. Verify in:
- **Sites** → [domain] → **Vhost** → Check that `listen 443 ssl http2` is present

HTTP/3 (QUIC): only available if your Cloud Panel nginx build includes `--with-http_v3_module`. Check with:
```bash
nginx -V 2>&1 | grep http_v3
```
If present, HTTP/3 is typically auto-enabled with SSL. No manual config needed.

### 4. Apply Performance Directives

1. Go to **Sites** → [domain] → **Vhost**
2. Scroll to **Custom Nginx Directives** textarea
3. Copy the contents of `deploy/cloudpanel/nginx-performance.conf` from this repo
4. Paste into the textarea
5. Click **Save**
6. Nginx automatically reloads

The directives enable:
- Gzip compression (reduces CSS/HTML by ~70%)
- Long cache headers for static assets (CSS, SVG: 1 year immutable)
- Short cache for HTML (5 minutes, must revalidate after deploys)
- Security headers (X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy)
- Open file cache for faster static file serving

### 5. Deploy Files

Upload the public HTML files and assets to your document root via SFTP, rsync, or git:

**Files to deploy:**
- `index.html`, `method.html`, `writing.html`, `exams.html`, `links.html`, `contact.html`
- `css/` directory (site.css, site.min.css)
- `img/` directory (all SVG assets)
- `VERSION`

**Do NOT deploy:**
- `OVERNIGHT.md`, `PROMPT-*.md`, `HANDOFF.md`
- `scripts/`, `data/`, `.github/`, `.git/`
- Development/prompt files

**Example rsync:**
```bash
rsync -avz --exclude='.git' --exclude='scripts' --exclude='data' --exclude='*.md' \
  --include='*.html' --include='css/**' --include='img/**' --include='VERSION' \
  ./ user@your-linode-ip:/home/cloudpanel/htdocs/admin.education/
```

Or use Cloud Panel's built-in **File Manager** for manual upload.

### 6. Verify

- Visit `https://admin.education` (or your domain)
- Check that:
  - HTTPS is forced (HTTP redirects to HTTPS)
  - Gzip is active: DevTools → Network → check `Content-Encoding: gzip` on `.css` and `.html`
  - Static assets return `Cache-Control: public, immutable`
  - HTML returns `Cache-Control: public, max-age=300, must-revalidate`
  - Security headers present: `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`

## Performance Wins

With these nginx directives on Cloud Panel:

- **TTFB**: Fast static file serving with `open_file_cache` and no dynamic processing
- **Transfer size**: Gzip reduces CSS from ~3KB to <1KB, HTML similarly compressed
- **Caching**: Long-lived immutable assets (CSS/SVG) cached in browser for 1 year
- **CLS**: Explicit width/height on images prevents layout shift
- **Security**: CSP and nosniff headers protect against common attacks

Expected Lighthouse scores: 95-100 Performance, 100 Best Practices (with these optimizations + pure static content).

## Optional: Varnish Cache

Cloud Panel supports Varnish as an optional HTTP accelerator. For a fully static site like this, Varnish adds complexity with minimal benefit—nginx alone with the above directives is sufficient. Skip Varnish unless you have specific requirements.

## Notes

- **No Cloudflare required**: Direct Linode + Cloud Panel + nginx provides excellent performance for static sites.
- **GitHub Pages**: The site also deploys to `gh-pages` branch via GitHub Actions (see main `DEPLOY.md`). Cloud Panel is the intended production path for `admin.education` apex domain.
- **DNS cutover**: Update your domain's DNS A record to point to your Linode IP. Then configure custom domain in Cloud Panel as above.
