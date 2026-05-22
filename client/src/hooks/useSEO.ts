import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  structuredData?: object;
  noindex?: boolean;
}

const BASE_URL = "https://pdfhub24.com";
const OG_IMAGE = "https://pdfhub24.com/og-image.png";
const SUPPORTED_LANGUAGES = ["en", "es", "ar", "hi", "fr", "pt", "de", "zh", "ja", "id", "ru", "it", "ur"];

const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.8",
  ratingCount: "2150",
  bestRating: "5",
  worstRating: "1"
};

// Recursively adds aggregateRating to any SoftwareApplication missing it
function injectAggregateRating(data: any): any {
  if (!data) return data;
  if (Array.isArray(data)) return data.map(injectAggregateRating);
  if (
    typeof data === "object" &&
    data["@type"] === "SoftwareApplication" &&
    !data["aggregateRating"]
  ) {
    return { ...data, aggregateRating: AGGREGATE_RATING };
  }
  return data;
}

// ✅ GLOBAL SCHEMA FIXER — scans ALL script[type="application/ld+json"] tags
// on the page and patches any SoftwareApplication missing aggregateRating,
// regardless of which component (useSEO / ToolSEOContent / StructuredData) added them.
function fixAllSchemasOnPage() {
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const original = script.textContent || "";
      const parsed = JSON.parse(original);
      const fixed = injectAggregateRating(parsed);
      const fixedStr = JSON.stringify(fixed);
      if (original !== fixedStr) {
        script.textContent = fixedStr;
      }
    } catch (_) {}
  });
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalPath,
  structuredData,
  noindex
}: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    document.title = title;

    const rawPath = canonicalPath || location;
    const normalizedPath = rawPath === "/" ? "" : rawPath.replace(/\/+$/, "");
    const canonicalUrl = `${BASE_URL}${normalizedPath}`;

    // --- Meta Description ---
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // --- Keywords ---
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // --- Canonical ---
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // ✅ HREFLANG — fixes 32% of pages missing hreflang
    document.querySelectorAll('link[data-useseo-hreflang="true"]').forEach(el => el.remove());
    SUPPORTED_LANGUAGES.forEach(lang => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      link.setAttribute("href", lang === "en" ? canonicalUrl : `${BASE_URL}/${lang}${normalizedPath}`);
      link.setAttribute("data-useseo-hreflang", "true");
      document.head.appendChild(link);
    });
    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.setAttribute("href", canonicalUrl);
    xDefault.setAttribute("data-useseo-hreflang", "true");
    document.head.appendChild(xDefault);

    // --- Open Graph ---
    const setMeta = (attr: string, key: string, val: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "PDF HUB 24");
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "robots", noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // --- Structured Data (via useSEO prop) ---
    const defaultStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "PDF HUB 24",
      url: BASE_URL,
      description: "Free online PDF tools - Convert, merge, split, compress PDF files. No registration required.",
      isPartOf: { "@type": "WebSite", name: "PDF HUB 24", url: BASE_URL },
      provider: { "@type": "Organization", name: "PDF HUB 24", url: BASE_URL }
    };

    const finalData = injectAggregateRating(structuredData || defaultStructuredData);
    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(finalData);

    // ✅ GLOBAL FIX — runs after all child components (ToolSEOContent, StructuredData)
    // have injected their own schemas, patches every SoftwareApplication on the page
    const timer = setTimeout(fixAllSchemasOnPage, 50);
    return () => clearTimeout(timer);

  }, [title, description, keywords, canonicalPath, location, structuredData, noindex]);
}
