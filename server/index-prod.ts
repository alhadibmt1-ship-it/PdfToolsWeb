import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";
import { injectSEO } from "./seo-config";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (filePath.match(/\.(js|css|woff2?|ttf|eot)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (filePath.match(/\.(png|jpg|jpeg|webp|svg|ico|gif)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  // Inject SEO meta tags based on the URL path for search engines
  const indexHtml = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
  
  app.use("*", (req, res) => {
    const urlPath = req.originalUrl.split('?')[0];
    const html = injectSEO(indexHtml, urlPath);
    res.status(200).set({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Vary": "Accept-Encoding",
      "X-Content-Type-Options": "nosniff",
    }).send(html);
  });
}

(async () => {
  await runApp(serveStatic);
})();
