import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.cwd();

export interface AuditUrl {
  loc: string;
  urlPath: string;
  category: "tool" | "blog" | "programmatic" | "page" | "category";
  status: "ok" | "issue";
  issue?: string;
}

export interface ContentQualityItem {
  toolId: string;
  urlPath: string;
  hasH1: boolean;
  hasMetaDesc: boolean;
  hasFaqs: boolean;
  hasInternalLinks: boolean;
  hasUseCases: boolean;
  hasTutorial: boolean;
  score: number;
  issues: string[];
}

export interface AuditReport {
  sitemapStats: { total: number; english: number; langVariants: number };
  routeIssues: AuditUrl[];
  validRoutes: AuditUrl[];
  contentQuality: ContentQualityItem[];
  overallScore: number;
  generatedAt: string;
}

function readFile(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function extractEnglishPaths(): { total: number; paths: string[]; langCount: number } {
  const content = readFile("client/public/sitemap.xml");
  const allPaths: string[] = Array.from(
    content.matchAll(/<loc>https:\/\/pdfhub24\.com([^<]*)<\/loc>/g),
    (m) => m[1] || "/"
  );
  const langCodes = ["es", "ar", "hi", "fr", "pt", "de", "zh", "ja", "id", "ru", "it", "ur"];
  const english = allPaths.filter(
    (p) => !langCodes.some((l) => p.startsWith(`/${l}/`) || p === `/${l}`)
  );
  return { total: allPaths.length, paths: english, langCount: allPaths.length - english.length };
}

function getBlogSlugs(): Set<string> {
  const content = readFile("client/src/data/blogData.ts");
  return new Set(Array.from(content.matchAll(/slug:\s*["']([^"']+)["']/g), (m) => m[1]));
}

function getProgrammaticSlugs(): Set<string> {
  const content = readFile("client/src/data/programmaticSeoData.ts");
  return new Set(Array.from(content.matchAll(/slug:\s*["']([^"']+)["']/g), (m) => m[1]));
}

function categorize(p: string): AuditUrl["category"] {
  if (p.startsWith("/blog/")) return "blog";
  if (p.startsWith("/tools/")) return "programmatic";
  const catPages = ["/convert-pdf", "/compress-pdf-tools", "/edit-pdf-tools", "/secure-pdf", "/image-tools"];
  if (catPages.includes(p)) return "category";
  const infoPages = ["/about", "/privacy", "/terms", "/contact", "/dmca", "/pdf-statistics", "/press",
    "/pricing", "/data-security", "/auto-delete", "/write-for-us", "/embed", "/pdf-comparison-chart",
    "/pdf-file-formats-guide", "/backlink-outreach", "/all-tools", "/free-pdf-converter",
    "/free-pdf-editor", "/html-sitemap", "/best-free-tools", "/pdf-glossary", "/translate-pdf", "/blog"];
  if (infoPages.includes(p)) return "page";
  return "tool";
}

export function runContentQualityAudit(): ContentQualityItem[] {
  const content = readFile("client/src/data/toolSEOData.ts");
  const items: ContentQualityItem[] = [];

  const toolBlockRegex = /"([a-z0-9-]+)":\s*\{/g;
  let match;
  while ((match = toolBlockRegex.exec(content)) !== null) {
    const toolId = match[1];
    if (toolId === "id" || toolId === "title" || toolId === "description") continue;

    const blockStart = match.index;
    let depth = 0;
    let blockEnd = blockStart;
    for (let i = blockStart; i < content.length; i++) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") {
        depth--;
        if (depth === 0) { blockEnd = i; break; }
      }
    }
    const block = content.slice(blockStart, blockEnd + 1);

    const hasH1 = /longTailH1:\s*["']/.test(block);
    const metaMatch = block.match(/metaDescription:\s*"([^"]+)"/) || block.match(/metaDescription:\s*'([^']+)'/);
    const hasMetaDesc = !!(metaMatch && metaMatch[1].length >= 100);
    const faqMatch = block.match(/faqs:\s*\[/);
    const faqCount = faqMatch ? (block.match(/question:/g) || []).length : 0;
    const hasFaqs = faqCount >= 3;
    const linkMatch = block.match(/internalLinks:\s*\[/);
    const linkCount = linkMatch ? (block.match(/href:/g) || []).length : 0;
    const hasInternalLinks = linkCount >= 5;
    const hasUseCases = /useCases:\s*\{/.test(block);
    const tutorialMatch = block.match(/tutorial:\s*[\[{]/);
    const tutorialSteps = tutorialMatch ? (block.match(/\bstep:/g) || []).length : 0;
    const hasTutorial = tutorialSteps >= 3;

    const issues: string[] = [];
    if (!hasH1) issues.push("Missing H1 (longTailH1)");
    if (!hasMetaDesc) issues.push("Meta description too short (<100 chars)");
    if (!hasFaqs) issues.push(`Only ${faqCount} FAQs (need 3+)`);
    if (!hasInternalLinks) issues.push(`Only ${linkCount} internal links (need 5+)`);
    if (!hasUseCases) issues.push("Missing use cases section");
    if (!hasTutorial) issues.push("Missing tutorial steps");

    const score = Math.round(
      (Number(hasH1) * 20) +
      (Number(hasMetaDesc) * 15) +
      (Number(hasFaqs) * 15) +
      (Number(hasInternalLinks) * 20) +
      (Number(hasUseCases) * 15) +
      (Number(hasTutorial) * 15)
    );

    items.push({ toolId, urlPath: `/${toolId}`, hasH1, hasMetaDesc, hasFaqs, hasInternalLinks, hasUseCases, hasTutorial, score, issues });
  }

  return items.sort((a, b) => a.score - b.score);
}

export function runSitemapAudit(seoConfigKeys: string[]): AuditReport {
  const { total, paths, langCount } = extractEnglishPaths();
  const blogSlugs = getBlogSlugs();
  const progSlugs = getProgrammaticSlugs();
  const seoKeySet = new Set(seoConfigKeys);

  const routeIssues: AuditUrl[] = [];
  const validRoutes: AuditUrl[] = [];

  for (const p of paths) {
    const category = categorize(p);
    let status: AuditUrl["status"] = "ok";
    let issue: string | undefined;

    if (p === "/") {
      status = "ok";
    } else if (seoKeySet.has(p)) {
      status = "ok";
    } else if (p.startsWith("/blog/")) {
      const slug = p.slice(6);
      if (!blogSlugs.has(slug)) {
        status = "issue";
        issue = `Blog slug "${slug}" not found in blogData.ts — will render as Not Found`;
      }
    } else if (p.startsWith("/tools/")) {
      const slug = p.slice(7);
      if (!progSlugs.has(slug)) {
        status = "issue";
        issue = `Programmatic slug "${slug}" not found in programmaticSeoData.ts`;
      }
    }

    const entry: AuditUrl = { loc: `https://pdfhub24.com${p}`, urlPath: p, category, status, issue };
    if (status === "ok") validRoutes.push(entry);
    else routeIssues.push(entry);
  }

  const contentQuality = runContentQualityAudit();
  const overallScore = paths.length > 0 ? Math.round((validRoutes.length / paths.length) * 100) : 100;

  return {
    sitemapStats: { total, english: paths.length, langVariants: langCount },
    routeIssues,
    validRoutes,
    contentQuality,
    overallScore,
    generatedAt: new Date().toISOString(),
  };
}

export function removePathFromSitemap(urlPath: string): { success: boolean; removed: number; newCount: number } {
  const sitemapPath = path.join(ROOT, "client/public/sitemap.xml");
  let content = fs.readFileSync(sitemapPath, "utf8");

  const escapedPath = urlPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `\\s*<url>\\s*<loc>https://pdfhub24\\.com${escapedPath}<\\/loc>[\\s\\S]*?<\\/url>`,
    "g"
  );

  const before = (content.match(/<url>/g) || []).length;
  content = content.replace(pattern, "");
  const after = (content.match(/<url>/g) || []).length;

  fs.writeFileSync(sitemapPath, content, "utf8");
  return { success: before !== after, removed: before - after, newCount: after };
}
