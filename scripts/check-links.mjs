// scripts/check-links.mjs
//
// Validates every internal link across the codebase against the actual
// registered routes, blog post slugs, and programmatic /tools/ page slugs.
//
// This codifies the manual checks repeatedly run by hand during the SEO
// audit project (found: 46 duplicate pages, several dead legacy routes,
// self-referential links, and one plain typo — all via this exact method).
// Run this before every deploy, or wire into CI, to catch regressions
// automatically instead of discovering them live on the site later.
//
// Usage: node scripts/check-links.mjs
// Exits with code 1 if any broken link is found (fails a CI step cleanly).

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

// 1. Valid primary routes, from App.tsx's <Route path="..."> declarations
const appTsx = read("client/src/App.tsx");
const validRoutes = new Set(
  [...appTsx.matchAll(/<Route path="(\/[a-z0-9-]+)"/g)].map((m) => m[1])
);

// 2. Valid blog post paths, from blogData.ts's slug fields
const blogData = read("client/src/data/blogData.ts");
const validBlogPaths = new Set(
  [...blogData.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => `/blog/${m[1]}`)
);

// 3. Valid /tools/ long-tail slugs, from the hand-written + auto-generated
// programmatic page sources. Uses the same tsx-loadable modules the app
// itself uses, so this always reflects the true current set.
const { getAllProgrammaticPages } = await import(
  path.join(ROOT, "client/src/data/programmaticSeoData.ts")
);
const validToolsSlugs = new Set(getAllProgrammaticPages().map((p) => p.slug));

// Files known to contain real internal links worth checking. Add to this
// list if a new file introduces internal links (this project found broken
// links hiding in unexpected places — index.html, seo-config.ts's several
// separate "all tools" arrays — so err on the side of checking more files).
const FILES_TO_CHECK = [
  "client/index.html",
  "server/seo-config.ts",
  "server/app.ts",
  "client/src/data/blogData.ts",
  "client/src/data/toolSEOData.ts",
  "client/src/data/categoryHubData.ts",
  "client/src/data/programmaticSeoData.ts",
  "client/src/components/Footer.tsx",
  "client/src/components/RelatedTools.tsx",
  "client/src/components/EnhancedToolSEOContent.tsx",
  "client/src/pages/HomePage.tsx",
];

function extractLinks(content) {
  const links = new Set();
  for (const m of content.matchAll(/href="(\/[a-z0-9/-]+)"/g)) links.add(m[1]);
  for (const m of content.matchAll(/href:\s*"(\/[a-z0-9/-]+)"/g)) links.add(m[1]);
  for (const m of content.matchAll(/path:\s*"(\/[a-z0-9/-]+)"/g)) links.add(m[1]);
  for (const m of content.matchAll(/\]\((\/[a-z0-9/-]+)\)/g)) links.add(m[1]); // markdown-style links
  return links;
}

function isValid(link) {
  if (link === "/") return true;
  if (validRoutes.has(link)) return true;
  if (validBlogPaths.has(link)) return true;
  if (link.startsWith("/tools/")) {
    const slug = link.slice("/tools/".length);
    return validToolsSlugs.has(slug);
  }
  return false;
}

let totalChecked = 0;
const broken = [];

for (const relPath of FILES_TO_CHECK) {
  let content;
  try {
    content = read(relPath);
  } catch {
    console.warn(`⚠️  Could not read ${relPath} (file moved/renamed?), skipping.`);
    continue;
  }
  const links = extractLinks(content);
  totalChecked += links.size;
  for (const link of links) {
    if (!isValid(link)) broken.push({ file: relPath, link });
  }
}

console.log(`Checked ${totalChecked} unique internal link references across ${FILES_TO_CHECK.length} files.`);

if (broken.length === 0) {
  console.log("✅ No broken internal links found.");
  process.exit(0);
} else {
  console.log(`\n❌ Found ${broken.length} broken internal link(s):\n`);
  for (const { file, link } of broken) {
    console.log(`  ${file}: ${link}`);
  }
  console.log("\nFix these before deploying — a broken internal link is both a");
  console.log("user-facing dead end and a wasted-crawl-budget signal to Google.");
  process.exit(1);
}
