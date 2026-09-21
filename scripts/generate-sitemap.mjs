#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 * 
 * Generates sitemap.xml for all 31 locales × 6 pages = 186 URLs
 * 
 * Usage:
 *   node scripts/generate-sitemap.mjs
 * 
 * Output:
 *   sitemap.xml in the root directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// All 31 locales
const LOCALES = ['en', 'sr', 'fr', 'de', 'hi', 'vi', 'pt-BR', 'es', 'ja', 'ko', 'zh-CN', 'ru', 'pl', 'it', 'nl', 'tr', 'hr', 'uk', 'cs', 'sk', 'ro', 'hu', 'sv', 'fi', 'da', 'id', 'th', 'ar', 'zh-TW', 'el', 'bn'];

// All pages
const PAGES = ['index.html', 'method.html', 'writing.html', 'exams.html', 'links.html', 'contact.html'];

// Base domain
const DOMAIN = 'https://admin.education';

// Priority and change frequency by page type
const PAGE_METADATA = {
  'index.html': { priority: '1.0', changefreq: 'weekly' },
  'method.html': { priority: '0.9', changefreq: 'monthly' },
  'writing.html': { priority: '0.8', changefreq: 'weekly' },
  'exams.html': { priority: '0.8', changefreq: 'monthly' },
  'links.html': { priority: '0.7', changefreq: 'monthly' },
  'contact.html': { priority: '0.6', changefreq: 'yearly' }
};

function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml for 31 locales...\n');
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  let urlCount = 0;
  
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const pageBase = page === 'index.html' ? '' : page;
      const url = `${DOMAIN}/${locale}/${pageBase}`;
      const metadata = PAGE_METADATA[page];
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>${metadata.changefreq}</changefreq>\n`;
      xml += `    <priority>${metadata.priority}</priority>\n`;
      xml += '  </url>\n';
      
      urlCount++;
    }
  }
  
  xml += '</urlset>\n';
  
  // Write sitemap.xml
  const sitemapPath = path.join(rootDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  
  console.log(`✅ Generated sitemap.xml with ${urlCount} URLs`);
  console.log(`   31 locales × 6 pages = ${urlCount} URLs`);
  console.log(`\n📍 Sitemap location: ${sitemapPath}`);
}

// Run the generator
generateSitemap();
