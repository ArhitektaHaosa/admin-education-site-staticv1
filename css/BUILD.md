# CSS Build

The source of truth is `site.css` (readable, formatted).

To regenerate the minified version `site.min.css`:

```bash
cd css
cat site.css | tr -d '\n' | sed 's/  */ /g' | sed 's/ *{ */{/g' | sed 's/ *} */}/g' | sed 's/ *; */;/g' | sed 's/ *, */,/g' | sed 's/ *: */:/g' > site.min.css
```

Or use any standard CSS minifier (cssnano, clean-css, etc).

## Current setup

All HTML pages reference `css/site.css` (the readable version). For production on Linode + Cloud Panel with gzip enabled, the difference is minimal (~500 bytes). Switch to `site.min.css` in HTML if you prefer, but `site.css` + gzip is acceptable for a 3KB stylesheet.

The minified version is provided as an option but not required.
