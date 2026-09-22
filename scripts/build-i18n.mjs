#!/usr/bin/env node
/**
 * build-i18n.mjs
 * 
 * Generates localized HTML pages for all 31 language locales.
 * 
 * Usage:
 *   node scripts/build-i18n.mjs
 * 
 * Output:
 *   - Root: en/ (English as default)
 *   - 30 additional locales: sr/, fr/, de/, hi/, vi/, pt-BR/, es/, ja/, ko/, zh-CN/, ru/, pl/, it/, nl/, tr/, 
 *     hr/, uk/, cs/, sk/, ro/, hu/, sv/, fi/, da/, id/, th/, ar/, zh-TW/, el/, bn/
 * 
 * Each locale folder contains: index.html, method.html, writing.html, exams.html, links.html, contact.html
 * 
 * SEO Features:
 *   - Full hreflang tags for all 31 locales + x-default
 *   - Canonical tags on every page
 *   - JSON-LD structured data on home pages
 *   - RTL support for Arabic (ar) via dir="rtl"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const localesDir = path.join(rootDir, 'locales');
const dataDir = path.join(rootDir, 'data');

// Load certs data for exams page
const certsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'certs.json'), 'utf8'));

// Define all locales (50 total)
const LOCALES = ['en', 'sr', 'fr', 'de', 'hi', 'vi', 'pt-BR', 'es', 'ja', 'ko', 'zh-CN', 'ru', 'pl', 'it', 'nl', 'tr', 'hr', 'uk', 'cs', 'sk', 'ro', 'hu', 'sv', 'fi', 'da', 'id', 'th', 'ar', 'zh-TW', 'el', 'bn', 'pt', 'nb', 'he', 'bg', 'sl', 'lt', 'lv', 'et', 'ca', 'ms', 'fil', 'fa', 'ur', 'sw', 'ta', 'af', 'sq', 'mk', 'ka'];

// Page names
const PAGES = ['index', 'method', 'writing', 'exams', 'links', 'contact'];

/**
 * Generate language switcher HTML for a given locale and page
 */
function generateLanguageSwitcher(currentLocale, currentPage) {
  const localeNames = {
    'en': 'English',
    'sr': 'Srpski',
    'fr': 'Français',
    'de': 'Deutsch',
    'hi': 'हिन्दी',
    'vi': 'Tiếng Việt',
    'pt-BR': 'Português (Brasil)',
    'es': 'Español',
    'ja': '日本語',
    'ko': '한국어',
    'zh-CN': '简体中文',
    'ru': 'Русский',
    'pl': 'Polski',
    'it': 'Italiano',
    'nl': 'Nederlands',
    'tr': 'Türkçe',
    'hr': 'Hrvatski',
    'uk': 'Українська',
    'cs': 'Čeština',
    'sk': 'Slovenčina',
    'ro': 'Română',
    'hu': 'Magyar',
    'sv': 'Svenska',
    'fi': 'Suomi',
    'da': 'Dansk',
    'id': 'Indonesia',
    'th': 'ไทย',
    'ar': 'العربية',
    'zh-TW': '繁體中文',
    'el': 'Ελληνικά',
    'bn': 'বাংলা',
    'pt': 'Português',
    'nb': 'Norsk Bokmål',
    'he': 'עברית',
    'bg': 'Български',
    'sl': 'Slovenščina',
    'lt': 'Lietuvių',
    'lv': 'Latviešu',
    'et': 'Eesti',
    'ca': 'Català',
    'ms': 'Bahasa Melayu',
    'fil': 'Filipino',
    'fa': 'فارسی',
    'ur': 'اردو',
    'sw': 'Kiswahili',
    'ta': 'தமிழ்',
    'af': 'Afrikaans',
    'sq': 'Shqip',
    'mk': 'Македонски',
    'ka': 'ქართული'
  };

  const pageFileName = currentPage === 'index' ? 'index.html' : `${currentPage}.html`;
  
  let html = '<nav class="lang-switcher" aria-label="Language switcher">\n';
  html += '  <button class="lang-switcher-toggle" aria-haspopup="true" aria-expanded="false">\n';
  html += `    <span class="lang-current">${localeNames[currentLocale]}</span>\n`;
  html += '    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">\n';
  html += '      <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n';
  html += '    </svg>\n';
  html += '  </button>\n';
  html += '  <ul class="lang-switcher-menu">\n';
  
  for (const locale of LOCALES) {
    const active = locale === currentLocale ? ' class="active"' : '';
    const localeDir = `/${locale}`;
    html += `    <li><a href="${localeDir}/${pageFileName}" hreflang="${locale}"${active}>${localeNames[locale]}</a></li>\n`;
  }
  
  html += '  </ul>\n';
  html += '</nav>\n';
  
  return html;
}

/**
 * Generate hreflang tags for SEO
 */
function generateHreflangTags(currentPage, domain = 'https://admin.education') {
  const pageFileName = currentPage === 'index' ? '' : `${currentPage}.html`;
  let tags = '';
  
  // x-default points to English
  tags += `  <link rel="alternate" hreflang="x-default" href="${domain}/en/${pageFileName}">\n`;
  
  for (const locale of LOCALES) {
    const localeDir = `/${locale}`;
    tags += `  <link rel="alternate" hreflang="${locale}" href="${domain}${localeDir}/${pageFileName}">\n`;
  }
  
  return tags;
}

/**
 * Generate canonical tag
 */
function generateCanonicalTag(currentPage, locale, domain = 'https://admin.education') {
  const pageFileName = currentPage === 'index' ? '' : `${currentPage}.html`;
  return `  <link rel="canonical" href="${domain}/${locale}/${pageFileName}">\n`;
}

/**
 * Generate JSON-LD structured data for home page
 */
function generateJsonLd(strings, locale, domain = 'https://admin.education') {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": strings.site.name,
    "alternateName": strings.home.h1,
    "url": `${domain}/${locale}/`,
    "description": strings.home.description,
    "inLanguage": locale,
    "publisher": {
      "@type": "Organization",
      "name": strings.site.name,
      "url": domain
    }
  };
  
  return `  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n`;
}

/**
 * Generate navigation HTML
 */
function generateNav(strings, currentPage, locale) {
  const pages = [
    { key: 'home', file: 'index.html' },
    { key: 'method', file: 'method.html' },
    { key: 'writing', file: 'writing.html' },
    { key: 'exams', file: 'exams.html' },
    { key: 'links', file: 'links.html' },
    { key: 'contact', file: 'contact.html' }
  ];
  
  let html = '';
  for (const page of pages) {
    html += `        <a href="${page.file}">${strings.nav[page.key]}</a>\n`;
  }
  
  return html;
}

/**
 * Generate HTML for index page
 */
function generateIndexPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'index');
  const hreflangTags = generateHreflangTags('index');
  const canonicalTag = generateCanonicalTag('index', locale);
  const jsonLd = generateJsonLd(strings, locale);
  const nav = generateNav(strings, 'index', locale);
  const dir = strings.lang_dir || 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.home.title}</title>
  <meta name="description" content="${strings.home.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}${jsonLd}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${strings.home.h1}</h1>
      <p class="lead">${strings.home.lead}</p>
      <p>${strings.home.intro}</p>
      <h2>${strings.home.what_heading}</h2>
      <ul class="plain">
${strings.home.what_items.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>
      <h2>${strings.home.what_not_heading}</h2>
      <ul class="plain">
${strings.home.what_not_items.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>
      <p class="note">${strings.home.note}</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Generate HTML for method page
 */
function generateMethodPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'method');
  const hreflangTags = generateHreflangTags('method');
  const canonicalTag = generateCanonicalTag('method', locale);
  const nav = generateNav(strings, 'method', locale);
  const dir = strings.lang_dir || 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.method.page_title}</title>
  <meta name="description" content="${strings.method.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${strings.method.h1}</h1>
      <p class="lead">${strings.method.lead}</p>
      <h2>${strings.method.rules_heading}</h2>
      <ul class="plain">
${strings.method.rules_items.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>
      <h2>${strings.method.operator_heading}</h2>
      <ul class="plain">
${strings.method.operator_items.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>
      <p class="muted">${strings.method.muted}</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Generate HTML for writing page
 */
function generateWritingPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'writing');
  const hreflangTags = generateHreflangTags('writing');
  const canonicalTag = generateCanonicalTag('writing', locale);
  const nav = generateNav(strings, 'writing', locale);
  const dir = strings.lang_dir || 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.writing.page_title}</title>
  <meta name="description" content="${strings.writing.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${strings.writing.h1}</h1>
      <p class="lead">${strings.writing.lead}</p>
      <p>${strings.writing.intro}</p>
      <p>${strings.writing.priority}</p>
      <h2>${strings.writing.live_heading}</h2>
      <ul class="plain">
${strings.writing.live_items.map(item => `        <li>${item}</li>`).join('\n')}
      </ul>
      <p class="note">${strings.writing.note}</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Generate HTML for exams page
 */
function generateExamsPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'exams');
  const hreflangTags = generateHreflangTags('exams');
  const canonicalTag = generateCanonicalTag('exams', locale);
  const nav = generateNav(strings, 'exams', locale);
  const dir = strings.lang_dir || 'ltr';
  
  // Generate exam articles
  let examsHtml = '';
  for (const item of certsData.items) {
    let metaText = '';
    if (item.kind === 'exam') {
      metaText = item.stars === 1 
        ? strings.exams.exam_meta.replace('{stars}', item.stars)
        : strings.exams.exam_meta_plural.replace('{stars}', item.stars);
    } else if (item.kind === 'orientation') {
      metaText = strings.exams.orientation_meta.replace('{stars}', item.stars);
    } else if (item.kind === 'membership') {
      metaText = strings.exams.membership_meta;
    }
    
    examsHtml += `      <article class="exam" id="${item.slug}">
        <img class="exam-mark" src="../img/certs/${item.slug}.svg" alt="" width="64" height="64">
        <div>
          <h2>${item.label}</h2>
          <p class="exam-meta">${metaText}</p>
          <p>${item.what}</p>
          <p class="muted">${item.note}</p>
        </div>
      </article>\n`;
  }
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.exams.page_title}</title>
  <meta name="description" content="${strings.exams.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${strings.exams.h1}</h1>
      <p class="lead">${strings.exams.lead}</p>
      <p>${strings.exams.source}</p>
      <p class="muted">${strings.exams.muted}</p>
${examsHtml}      <p class="note">${strings.exams.note}</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Generate HTML for links page
 */
function generateLinksPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'links');
  const hreflangTags = generateHreflangTags('links');
  const canonicalTag = generateCanonicalTag('links', locale);
  const nav = generateNav(strings, 'links', locale);
  const dir = strings.lang_dir || 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.links.page_title}</title>
  <meta name="description" content="${strings.links.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <div class="bio">
        <div class="mark"><img src="../img/logo.svg" alt="${strings.links.h1}" width="96" height="96"></div>
        <h1>${strings.links.h1}</h1>
        <p class="handle">${strings.links.handle}</p>
        <p class="lead">${strings.links.lead}</p>
      </div>
      <nav class="stack" aria-label="${strings.links.featured_label}">
        <a class="stack-link" href="method.html">${strings.links.link_method}<small>${strings.links.link_method_desc}</small></a>
        <a class="stack-link" href="exams.html">${strings.links.link_exams}<small>${strings.links.link_exams_desc}</small></a>
        <a class="stack-link" href="https://arhitektahaosa.substack.com/" rel="noopener noreferrer">${strings.links.link_writing}<small>${strings.links.link_writing_desc}</small></a>
        <a class="stack-link" href="https://github.com/ArhitektaHaosa/admin-education-site-staticv1" rel="noopener noreferrer">${strings.links.link_source}<small>${strings.links.link_source_desc}</small></a>
        <a class="stack-link" href="contact.html">${strings.links.link_contact}<small>${strings.links.link_contact_desc}</small></a>
        <a class="stack-link" href="https://bsky.app/profile/admin.education" rel="noopener noreferrer">${strings.links.link_bluesky}<small>${strings.links.link_bluesky_desc}</small></a>
        <a class="stack-link" href="https://www.instagram.com/ArhitektaHaosa/" rel="noopener noreferrer">${strings.links.link_instagram}<small>${strings.links.link_instagram_desc}</small></a>
        <a class="stack-link" href="https://www.facebook.com/ArhitektaHaosa" rel="noopener noreferrer">${strings.links.link_facebook}<small>${strings.links.link_facebook_desc}</small></a>
      </nav>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Generate HTML for contact page
 */
function generateContactPage(strings, locale) {
  const langSwitcher = generateLanguageSwitcher(locale, 'contact');
  const hreflangTags = generateHreflangTags('contact');
  const canonicalTag = generateCanonicalTag('contact', locale);
  const nav = generateNav(strings, 'contact', locale);
  const dir = strings.lang_dir || 'ltr';
  
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${strings.contact.page_title}</title>
  <meta name="description" content="${strings.contact.description}">
  <link rel="icon" href="../img/logo.svg" type="image/svg+xml">
  <link rel="preload" href="../css/site.css" as="style">
  <link rel="stylesheet" href="../css/site.css">
${canonicalTag}${hreflangTags}</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="../img/wordmark.svg" alt="${strings.site.name}" width="336" height="64"></a>
      ${langSwitcher}
      <nav>
${nav}      </nav>
    </div>
  </header>
  <main>
    <div class="wrap">
      <h1>${strings.contact.h1}</h1>
      <p class="lead">${strings.contact.lead}</p>
      <ul class="plain">
        <li><strong>${strings.contact.whatsapp_label}</strong> <a href="https://wa.me/message/J2WSUYWVVMWSN1" rel="noopener noreferrer">wa.me/message/J2WSUYWVVMWSN1</a></li>
        <li>${strings.contact.email_label} mapkomah at proton.me</li>
        <li>${strings.contact.email_also}</li>
        <li>${strings.contact.bluesky_label} <a href="https://bsky.app/profile/admin.education" rel="noopener noreferrer">admin.education</a></li>
        <li>${strings.contact.instagram_label} <a href="https://www.instagram.com/ArhitektaHaosa/" rel="noopener noreferrer">@ArhitektaHaosa</a></li>
        <li>${strings.contact.facebook_label} <a href="https://www.facebook.com/ArhitektaHaosa" rel="noopener noreferrer">@ArhitektaHaosa</a></li>
        <li>${strings.contact.substack_label} <a href="https://arhitektahaosa.substack.com/" rel="noopener noreferrer">arhitektahaosa.substack.com</a></li>
      </ul>
      <p>${strings.contact.other_channels}</p>
      <p class="note">${strings.contact.note}</p>
    </div>
  </main>
  <footer class="site">
    <div class="wrap">${strings.site.name} · ${strings.site.tagline} · ${strings.site.year}</div>
  </footer>
  <script src="../js/lang-switcher.js"></script>
</body>
</html>
`;
}

/**
 * Main build function
 */
function buildAll() {
  console.log('🌍 Building multilingual site for 50 locales...\n');
  
  for (const locale of LOCALES) {
    console.log(`📦 Building ${locale}...`);
    
    // Load locale strings
    const localeFile = path.join(localesDir, `${locale}.json`);
    const strings = JSON.parse(fs.readFileSync(localeFile, 'utf8'));
    
    // Create locale directory
    const localeDir = path.join(rootDir, locale);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }
    
    // Generate pages
    const pages = {
      'index.html': generateIndexPage(strings, locale),
      'method.html': generateMethodPage(strings, locale),
      'writing.html': generateWritingPage(strings, locale),
      'exams.html': generateExamsPage(strings, locale),
      'links.html': generateLinksPage(strings, locale),
      'contact.html': generateContactPage(strings, locale)
    };
    
    // Write pages
    for (const [filename, html] of Object.entries(pages)) {
      fs.writeFileSync(path.join(localeDir, filename), html, 'utf8');
    }
    
    console.log(`   ✓ Generated 6 pages in /${locale}/`);
  }
  
  console.log(`\n✅ Build complete! Generated ${LOCALES.length * 6} HTML files across 50 locales.`);
  console.log(`\nLocales: ${LOCALES.join(', ')}`);
  console.log('\nNext steps:');
  console.log('  1. Run build to verify: node scripts/build-i18n.mjs');
  console.log('  2. Test locally: open en/index.html in browser');
  console.log('  3. Generate sitemap.xml and robots.txt for SEO');
}

// Run the build
buildAll();
