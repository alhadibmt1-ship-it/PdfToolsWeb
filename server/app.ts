import { type Server } from "node:http";

import compression from "compression";
import express, {
  type Express,
  type Request,
  Response,
  NextFunction,
} from "express";
import rateLimit from "express-rate-limit";

import { registerRoutes } from "./routes";
import { TOOL_SLUG_TRANSLATIONS } from "../client/src/lib/translatedSlugs";
import { DUPLICATE_TOOL_PAGE_REDIRECTS } from "../client/src/lib/duplicateToolPageRedirects";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export const app = express();

// Trust Railway's proxy so x-forwarded-proto is read correctly for HTTP→HTTPS redirects
app.set('trust proxy', 1);

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// HTTP to HTTPS redirect in production (for SEO - prevents redirect errors in Google Search Console)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    const proto = req.headers['x-forwarded-proto'];
    if (proto === 'http') {
      return res.redirect(301, `https://${host.replace(/^www\./, '')}${req.url}`);
    }
    if (host.startsWith('www.')) {
      return res.redirect(301, `https://${host.replace(/^www\./, '')}${req.url}`);
    }
    next();
  });
}

// 301 redirects for legacy/duplicate URLs — keeps link equity flowing to canonical targets
app.use((req, res, next) => {
  const redirects: Record<string, string> = {
    // Legacy page aliases
    "/free-pdf-editor": "/edit-pdf",
    "/free-pdf-converter": "/convert-pdf",
    // Short tool aliases → canonical full-URL paths
    "/compress": "/compress-pdf",
    "/merge": "/merge-pdf",
    "/split": "/split-pdf",
    "/rotate": "/rotate-pdf",
    // Additional short aliases from audit
    "/convert": "/pdf-to-word",
    "/sign": "/sign-pdf",
    "/protect": "/protect-pdf",
    "/unlock": "/unlock-pdf",
    "/ocr": "/ocr-pdf",
    "/redact": "/redact-pdf",
    "/pagenumbers": "/add-page-numbers",
    "/flatten": "/flatten-pdf",
    "/extract": "/extract-pages",
    "/reorder": "/reorder-pages",
    "/delete": "/delete-pages",
    "/watermark": "/add-watermark",
    "/word": "/pdf-to-word",
    "/excel": "/pdf-to-excel",
    "/jpg": "/pdf-to-jpg",
    "/png": "/pdf-to-png",
    "/ppt": "/pdf-to-ppt",
    "/wordtopdf": "/word-to-pdf",
    "/exceltopdf": "/excel-to-pdf",
    "/jpgtopdf": "/jpg-to-pdf",
    "/pngtopdf": "/png-to-pdf",
    "/ppttopdf": "/ppt-to-pdf",
    // Alternate hyphenated forms
    "/pdf-merge": "/merge-pdf",
    "/pdf-split": "/split-pdf",
    "/pdf-compress": "/compress-pdf",
    "/pdf-rotate": "/rotate-pdf",
    "/pdf-editor": "/edit-pdf",
    "/protect-pdf-with-password": "/protect-pdf",
    "/password-protect-pdf": "/protect-pdf",
    "/unlock-pdf-free": "/unlock-pdf",
    "/remove-pdf-password": "/unlock-pdf",
    "/pdf-to-word-converter": "/pdf-to-word",
    "/pdf-to-jpg-converter": "/pdf-to-jpg",
    "/pdf-to-png-converter": "/pdf-to-png",
    "/pdf-to-excel-converter": "/pdf-to-excel",
    "/word-to-pdf-converter": "/word-to-pdf",
    "/jpg-to-pdf-converter": "/jpg-to-pdf",
    "/compress-pdf-free": "/compress-pdf",
    "/merge-pdf-free": "/merge-pdf",
    "/split-pdf-free": "/split-pdf",
    "/merge-pdfs": "/merge-pdf",
    "/combine-pdf": "/merge-pdf",
    "/combine-pdfs": "/merge-pdf",
    "/sign-pdf-free": "/sign-pdf",
    "/pdf-signer": "/sign-pdf",
    "/pdf-ocr": "/ocr-pdf",
    "/ocr-pdf-free": "/ocr-pdf",
    "/pdf-annotator": "/annotate-pdf",
    "/pdf-watermark": "/add-watermark",
    "/pdf-page-numbers": "/add-page-numbers",
    "/pdf-delete-pages": "/delete-pages",
    "/pdf-extract-pages": "/extract-pages",
    "/pdf-reorder": "/reorder-pages",
    "/pdf-crop": "/crop-pdf",
    "/pdf-resize": "/resize-pdf",
    "/pdf-flatten": "/flatten-pdf",
    "/pdf-grayscale": "/grayscale-pdf",
    "/pdf-repair": "/repair-pdf",
    "/pdf-redact": "/redact-pdf",
    "/batch-pdf-compress": "/batch-compress",
    "/image-compress": "/image-compressor",
    "/compress-img": "/image-compressor",
    "/image-resize": "/resize-image",
    "/image-crop": "/crop-image",
    "/image-rotate": "/rotate-image",
    "/image-convert": "/convert-image",
  };
  const target = redirects[req.path];
  if (target) return res.redirect(301, target);
  next();
});

// Security headers for SEO and protection
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy for privacy and link attribution
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions policy
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Production-only security headers
  if (process.env.NODE_ENV === 'production') {
    // HTTP Strict Transport Security (HSTS)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    // Stricter CSP for production (no unsafe-eval, inline styles via hashes would be ideal)
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: blob: https:; " +
      "connect-src 'self' https://www.google-analytics.com https://api.cloudconvert.com; " +
      "frame-ancestors 'self'; " +
      "base-uri 'self'; " +
      "form-action 'self'"
    );
  } else {
    // Relaxed CSP for development (Vite HMR needs unsafe-inline/eval)
    res.setHeader('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: blob: https:; " +
      "connect-src 'self' ws: wss: https://www.google-analytics.com https://api.cloudconvert.com; " +
      "frame-ancestors 'self'"
    );
  }
  next();
});

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute per IP
  message: { error: 'Too many requests. Please wait a moment and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => !req.path.startsWith('/api'), // Only limit API routes
});

// Stricter rate limiting for file upload endpoints
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 uploads per minute per IP
  message: { error: 'Too many file uploads. Please wait a moment and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiLimiter);
app.use('/api/*/upload', uploadLimiter);
app.use('/api/*/convert', uploadLimiter);
app.use('/api/*/compress', uploadLimiter);
app.use('/api/*/merge', uploadLimiter);

// Cache-Control headers for crawl efficiency and performance
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    // API responses: no caching
    res.setHeader('Cache-Control', 'no-store');
  } else if (/sitemap.*\.xml$/.test(req.path) || req.path === '/robots.txt') {
    // Sitemaps and robots: 12-hour public cache
    res.setHeader('Cache-Control', 'public, max-age=43200');
  } else if (/\.(js|css|woff2?|ttf|otf|eot)$/.test(req.path)) {
    // JS/CSS/fonts: 1-year immutable cache (Vite fingerprints them)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(png|jpg|jpeg|webp|svg|ico|gif)$/.test(req.path)) {
    // Images: 7-day cache
    res.setHeader('Cache-Control', 'public, max-age=604800');
  } else {
    // HTML pages: 1-hour cache, stale-while-revalidate for fast repeat visits
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  }
  next();
});

// Normalize trailing slashes - redirect /path/ to /path (301 for SEO)
app.use((req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safePath + query);
  } else {
    next();
  }
});

// 301 redirect English slugs under Latin-script language prefixes to translated slugs
// e.g. /es/compress → /es/comprimir-pdf, /de/merge → /de/pdf-zusammenfuehren
const LATIN_LANGS = new Set(['es', 'fr', 'pt', 'de', 'it', 'id']);
app.use((req, res, next) => {
  const parts = req.path.split('/').filter(Boolean);
  if (parts.length === 2 && LATIN_LANGS.has(parts[0])) {
    const [lang, slug] = parts;
    const translatedSlug = TOOL_SLUG_TRANSLATIONS[slug]?.[lang];
    if (translatedSlug && translatedSlug !== slug) {
      return res.redirect(301, `/${lang}/${translatedSlug}`);
    }
  }
  next();
});

// 301 redirect duplicate-intent size-variant programmatic pages to primary
// "compress-pdf-under-Xkb" and "reduce-pdf-size-to-Xkb" → "compress-pdf-to-Xkb"
// "compress-pdf-online-{country}" → "compress-pdf-{country}"
// Orphan compress-to-size sizes → nearest canonical size in sitemap
app.use((req, res, next) => {
  // Legacy route names from before these tools were renamed. No client route
  // matches them anymore, but they were still referenced in old internal
  // links and sitemap entries — redirect in case of old bookmarks/backlinks.
  if (req.path === '/page-numbers') return res.redirect(301, '/add-page-numbers');
  if (req.path === '/watermark-pdf') return res.redirect(301, '/add-watermark');

  // Generic /tools/* pages that duplicate an existing primary tool page
  // (same tool, same steps, same FAQ, no real differentiation beyond SEO
  // keyword stuffing). See duplicateToolPageRedirects.ts for the full list
  // and the reasoning for what's included vs deliberately kept separate.
  const duplicateTarget = DUPLICATE_TOOL_PAGE_REDIRECTS[req.path.replace(/^\/tools\//, "")];
  if (req.path.startsWith("/tools/") && duplicateTarget) {
    return res.redirect(301, duplicateTarget);
  }

  const m1 = req.path.match(/^\/tools\/compress-pdf-under-(.+)$/);
  if (m1) return res.redirect(301, `/tools/compress-pdf-to-${m1[1]}`);

  const m2 = req.path.match(/^\/tools\/reduce-pdf-size-to-(.+)$/);
  if (m2) return res.redirect(301, `/tools/compress-pdf-to-${m2[1]}`);

  const m3 = req.path.match(/^\/tools\/compress-pdf-online-(.+)$/);
  if (m3) return res.redirect(301, `/tools/compress-pdf-${m3[1]}`);

  // Redirect orphan (non-sitemap) compress-to-size variants → nearest canonical size
  const orphanSizes: Record<string, string> = {
    "100kb": "75kb",
    "200kb": "250kb",
    "350kb": "300kb",
    "400kb": "500kb",
    "450kb": "500kb",
    "600kb": "750kb",
    "700kb": "750kb",
    "800kb": "750kb",
    "900kb": "1mb",
    "1.5mb": "1mb",
    "3mb": "2mb",
    "4mb": "5mb",
    "6mb": "5mb",
    "7mb": "5mb",
    "8mb": "10mb",
    "9mb": "10mb",
  };
  const m4 = req.path.match(/^\/tools\/compress-pdf-to-(.+)$/);
  if (m4 && orphanSizes[m4[1]]) return res.redirect(301, `/tools/compress-pdf-to-${orphanSizes[m4[1]]}`);

  next();
});

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      // Log without sensitive response data (passwords, tokens, etc.)
      const logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      log(logLine);
    }
  });

  next();
});

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  const server = await registerRoutes(app);

  // Improved error handler with user-friendly messages
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    
    // User-friendly error messages based on error type
    let userMessage = "Something went wrong. Please try again.";
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      userMessage = "File is too large. Maximum size is 50MB.";
    } else if (err.message?.includes('Only PDF')) {
      userMessage = "Please upload a valid PDF file.";
    } else if (err.message?.includes('Only image')) {
      userMessage = "Please upload a valid image file (JPG, PNG, GIF, or WebP).";
    } else if (err.message?.includes('Only DOCX')) {
      userMessage = "Please upload a valid Word document (.docx).";
    } else if (err.message?.includes('Only Excel')) {
      userMessage = "Please upload a valid Excel file (.xls or .xlsx).";
    } else if (err.message?.includes('corrupted')) {
      userMessage = "The file appears to be corrupted. Please try a different file.";
    } else if (err.message?.includes('timeout') || err.code === 'ETIMEDOUT') {
      userMessage = "The request took too long. Please try a smaller file.";
    } else if (status === 429) {
      userMessage = err.message || "Too many requests. Please wait a moment.";
    } else if (status === 413) {
      userMessage = "File is too large. Maximum size is 50MB.";
    } else if (status >= 500) {
      userMessage = "Server error. Please try again in a moment.";
    } else if (err.message && !err.message.includes('password')) {
      // Only show error message if it doesn't contain sensitive info
      userMessage = err.message;
    }

    // Log error without sensitive data
    const logMessage = `Error ${status}: ${err.code || 'UNKNOWN'}`;
    log(logMessage, 'error');

    res.status(status).json({ error: userMessage });
  });

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
}
