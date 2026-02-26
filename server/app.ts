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
    const proto = req.headers['x-forwarded-proto'];
    if (proto === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

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
