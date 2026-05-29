import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // ✅ Fix: Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // ✅ Fix: Use esbuild for faster, smaller output
    minify: "esbuild",
    // ✅ Fix: Split CSS per page (reduces unused CSS)
    cssCodeSplit: true,
    // ✅ Fix: Target modern browsers for smaller bundles
    target: "esnext",
    rollupOptions: {
      output: {
        // ✅ Fix: Code splitting — separates vendor libs from app code
        // Browser caches vendor chunks separately → faster repeat visits
        // Reduces initial JS load → fixes LCP 4.5s → targets 2.5s
        manualChunks: (id) => {
          // React core — rarely changes, cached long-term
          if (id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          // PDF processing libraries — large, separate chunk
          if (id.includes("node_modules/pdf-lib") ||
              id.includes("node_modules/pdf-lib-with-encrypt")) {
            return "pdf-vendor";
          }
          // UI component libraries
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix-vendor";
          }
          // Router
          if (id.includes("node_modules/wouter")) {
            return "router";
          }
          // Utility libraries
          if (id.includes("node_modules/zod") ||
              id.includes("node_modules/clsx") ||
              id.includes("node_modules/class-variance-authority") ||
              id.includes("node_modules/tailwind-merge")) {
            return "utils";
          }
          // Icons
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
        // ✅ Fix: Better chunk file naming for caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  // ✅ Fix: Pre-bundle frequently used deps for faster dev
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "wouter",
      "lucide-react",
    ],
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
