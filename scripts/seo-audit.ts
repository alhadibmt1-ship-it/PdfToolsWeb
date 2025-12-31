import fs from 'fs';
import path from 'path';

const BASE_URL = "https://pdfhub24.com";

interface AuditResult {
  category: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  details?: string[];
}

const results: AuditResult[] = [];

function addResult(category: string, status: 'pass' | 'warn' | 'fail', message: string, details?: string[]) {
  results.push({ category, status, message, details });
}

async function auditSitemap() {
  console.log('\n📍 Checking Sitemap...');
  
  const sitemapPath = path.join(process.cwd(), 'client/public/sitemap.xml');
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  
  const urlMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
  const urls = urlMatches.map(m => m.replace(/<\/?loc>/g, ''));
  
  const toolUrls = urls.filter(u => !u.includes('/blog') && !u.includes('/about') && !u.includes('/privacy') && !u.includes('/terms') && !u.includes('/dmca') && !u.includes('/contact') && u !== BASE_URL + '/');
  const blogUrls = urls.filter(u => u.includes('/blog'));
  const trustUrls = urls.filter(u => u.includes('/about') || u.includes('/privacy') || u.includes('/terms') || u.includes('/dmca') || u.includes('/contact'));
  
  addResult('Sitemap', 'pass', `Found ${urls.length} total URLs in sitemap`);
  addResult('Sitemap', toolUrls.length >= 43 ? 'pass' : 'warn', `Tool pages: ${toolUrls.length}/43`);
  addResult('Sitemap', blogUrls.length >= 10 ? 'pass' : 'warn', `Blog articles: ${blogUrls.length}`);
  addResult('Sitemap', trustUrls.length >= 5 ? 'pass' : 'warn', `Trust pages: ${trustUrls.length}`);
  
  const hasHomepage = urls.includes(BASE_URL + '/');
  addResult('Sitemap', hasHomepage ? 'pass' : 'fail', hasHomepage ? 'Homepage included' : 'Homepage MISSING');
  
  return urls;
}

async function auditRobotsTxt() {
  console.log('\n🤖 Checking robots.txt...');
  
  const robotsPath = path.join(process.cwd(), 'client/public/robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
  
  const hasSitemap = robotsContent.includes('Sitemap:');
  const hasAllowAll = robotsContent.includes('Allow: /');
  
  addResult('Robots.txt', hasSitemap ? 'pass' : 'fail', hasSitemap ? 'Sitemap reference present' : 'Sitemap reference MISSING');
  addResult('Robots.txt', hasAllowAll ? 'pass' : 'warn', hasAllowAll ? 'Allow all crawlers' : 'No allow directive');
}

async function auditSEOData() {
  console.log('\n📊 Checking SEO Data...');
  
  const seoDataPath = path.join(process.cwd(), 'client/src/data/toolSEOData.ts');
  const seoDataContent = fs.readFileSync(seoDataPath, 'utf-8');
  
  const idMatches = seoDataContent.match(/id:\s*["']([^"']+)["']/g) || [];
  const toolIds = idMatches.map(m => m.match(/["']([^"']+)["']/)?.[1] || '');
  
  addResult('SEO Data', 'pass', `Found ${toolIds.length} tool SEO entries`);
  
  const metaDescMatches = seoDataContent.match(/metaDescription:\s*["']([^"']+)["']/g) || [];
  let longDescriptions = 0;
  
  metaDescMatches.forEach(match => {
    const desc = match.replace(/metaDescription:\s*["']/, '').replace(/["']$/, '');
    if (desc.length > 160) {
      longDescriptions++;
    }
  });
  
  addResult('SEO Data', longDescriptions === 0 ? 'pass' : 'warn', 
    longDescriptions === 0 ? 'All meta descriptions under 160 chars' : `${longDescriptions} meta descriptions over 160 chars`);
  
  const longTailH1Matches = seoDataContent.match(/longTailH1:\s*["']([^"']+)["']/g) || [];
  addResult('SEO Data', longTailH1Matches.length >= 40 ? 'pass' : 'warn', 
    `Found ${longTailH1Matches.length} long-tail H1 headlines`);
  
  const faqMatches = seoDataContent.match(/faqs:\s*\[/g) || [];
  addResult('SEO Data', faqMatches.length >= 40 ? 'pass' : 'warn', 
    `Found ${faqMatches.length} FAQ sections`);
  
  return toolIds;
}

async function auditToolPages() {
  console.log('\n📄 Checking Tool Pages...');
  
  const pagesDir = path.join(process.cwd(), 'client/src/pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('Page.tsx') && !f.includes('Home') && !f.includes('About') && !f.includes('Privacy') && !f.includes('Terms') && !f.includes('Contact') && !f.includes('Dmca') && !f.includes('Blog') && !f.includes('not-found'));
  
  let pagesWithH1 = 0;
  let pagesWithEnhancedSEO = 0;
  let pagesWithGetToolSEOData = 0;
  
  files.forEach(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    
    if (content.includes('<h1')) pagesWithH1++;
    if (content.includes('EnhancedToolSEOContent')) pagesWithEnhancedSEO++;
    if (content.includes('getToolSEOData')) pagesWithGetToolSEOData++;
  });
  
  addResult('Tool Pages', 'pass', `Found ${files.length} tool page files`);
  addResult('Tool Pages', pagesWithH1 === files.length ? 'pass' : 'warn', 
    `Pages with H1: ${pagesWithH1}/${files.length}`);
  addResult('Tool Pages', pagesWithEnhancedSEO === files.length ? 'pass' : 'warn', 
    `Pages with EnhancedToolSEOContent: ${pagesWithEnhancedSEO}/${files.length}`);
  addResult('Tool Pages', pagesWithGetToolSEOData === files.length ? 'pass' : 'warn', 
    `Pages with dynamic H1 (getToolSEOData): ${pagesWithGetToolSEOData}/${files.length}`);
}

async function auditExternalLinks() {
  console.log('\n🔗 Checking External Authority Links...');
  
  const seoContentPath = path.join(process.cwd(), 'client/src/components/EnhancedToolSEOContent.tsx');
  const content = fs.readFileSync(seoContentPath, 'utf-8');
  
  const hasWikipedia = content.includes('wikipedia.org');
  const hasISO = content.includes('iso.org');
  const hasAdobe = content.includes('adobe.com');
  const hasNoopener = content.includes('rel="noopener noreferrer"');
  
  addResult('External Links', hasWikipedia ? 'pass' : 'warn', hasWikipedia ? 'Wikipedia link present' : 'Wikipedia link missing');
  addResult('External Links', hasISO ? 'pass' : 'warn', hasISO ? 'ISO standards link present' : 'ISO link missing');
  addResult('External Links', hasAdobe ? 'pass' : 'warn', hasAdobe ? 'Adobe PDF link present' : 'Adobe link missing');
  addResult('External Links', hasNoopener ? 'pass' : 'warn', hasNoopener ? 'Proper rel attributes' : 'Missing noopener/noreferrer');
}

async function auditSchemaMarkup() {
  console.log('\n🏷️ Checking Schema Markup...');
  
  const seoContentPath = path.join(process.cwd(), 'client/src/components/EnhancedToolSEOContent.tsx');
  const content = fs.readFileSync(seoContentPath, 'utf-8');
  
  const hasBreadcrumb = content.includes('BreadcrumbList');
  const hasFAQ = content.includes('FAQPage');
  const hasSoftwareApp = content.includes('WebApplication') || content.includes('SoftwareApplication');
  
  addResult('Schema', hasBreadcrumb ? 'pass' : 'warn', hasBreadcrumb ? 'BreadcrumbList schema present' : 'BreadcrumbList missing');
  addResult('Schema', hasFAQ ? 'pass' : 'warn', hasFAQ ? 'FAQPage schema present' : 'FAQPage missing');
  addResult('Schema', hasSoftwareApp ? 'pass' : 'warn', hasSoftwareApp ? 'SoftwareApplication schema present' : 'SoftwareApplication missing');
}

async function runAudit() {
  console.log('🔍 PDF HUB 24 SEO AUDIT');
  console.log('='.repeat(50));
  
  await auditSitemap();
  await auditRobotsTxt();
  await auditSEOData();
  await auditToolPages();
  await auditExternalLinks();
  await auditSchemaMarkup();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 AUDIT SUMMARY');
  console.log('='.repeat(50));
  
  const passes = results.filter(r => r.status === 'pass').length;
  const warns = results.filter(r => r.status === 'warn').length;
  const fails = results.filter(r => r.status === 'fail').length;
  
  console.log(`\n✅ PASSED: ${passes}`);
  console.log(`⚠️ WARNINGS: ${warns}`);
  console.log(`❌ FAILED: ${fails}`);
  
  console.log('\n📝 DETAILED RESULTS:\n');
  
  const categories = [...new Set(results.map(r => r.category))];
  
  categories.forEach(cat => {
    console.log(`\n【${cat}】`);
    results.filter(r => r.category === cat).forEach(r => {
      const icon = r.status === 'pass' ? '✅' : r.status === 'warn' ? '⚠️' : '❌';
      console.log(`  ${icon} ${r.message}`);
      if (r.details) {
        r.details.forEach(d => console.log(`     - ${d}`));
      }
    });
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (fails > 0) {
    console.log('❌ AUDIT FAILED - Please fix critical issues above');
    process.exit(1);
  } else if (warns > 0) {
    console.log('⚠️ AUDIT PASSED WITH WARNINGS');
  } else {
    console.log('✅ AUDIT PASSED - All checks successful!');
  }
}

runAudit().catch(console.error);
