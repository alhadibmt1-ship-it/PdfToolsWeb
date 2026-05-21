import { useEffect } from "react";

const BASE_URL = "https://pdfhub24.com";

interface FAQ {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ToolStructuredDataProps {
  toolName: string;
  toolPath: string;
  description: string;
  howToSteps: string[];
  faqs: FAQ[];
  category: string;
}

export function ToolStructuredData({
  toolName,
  toolPath,
  description,
  howToSteps,
  faqs,
  category
}: ToolStructuredDataProps) {
  useEffect(() => {
    const categoryLabels: Record<string, string> = {
      "from-pdf": "Convert from PDF",
      "to-pdf": "Convert to PDF",
      "edit-pdf": "Edit PDF",
      "utility": "Utility Tools"
    };

    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": toolName,
          "item": `${BASE_URL}${toolPath}`
        }
      ]
    };

    const faqSchema = faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : null;

    const pageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": toolName,
      "url": `${BASE_URL}${toolPath}`,
      "description": description,
      "isPartOf": {
        "@type": "WebSite",
        "name": "PDF HUB 24",
        "url": BASE_URL
      },
      "provider": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL
      }
    };

    const toolId = toolPath.replace(/\//g, '-');
    const existingScripts = document.querySelectorAll(`script[data-tool-schema="${toolId}"]`);
    existingScripts.forEach(script => script.remove());

    const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": toolName,
  "description": description,
  "url": `${BASE_URL}${toolPath}`,
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "2150",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const schemas = [breadcrumbList, pageSchema, softwareAppSchema, faqSchema].filter(Boolean);
    
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-tool-schema", toolId);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll(`script[data-tool-schema="${toolId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [toolName, toolPath, description, howToSteps, faqs, category]);

  return null;
}

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}

export function ArticleStructuredData({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  category
}: ArticleStructuredDataProps) {
  useEffect(() => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "url": `${BASE_URL}/blog/${slug}`,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/og-image.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${BASE_URL}/blog/${slug}`
      }
    };

    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${BASE_URL}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": `${BASE_URL}/blog/${slug}`
        }
      ]
    };

    const articleId = slug;
    const existingScripts = document.querySelectorAll(`script[data-article-schema="${articleId}"]`);
    existingScripts.forEach(script => script.remove());

    [articleSchema, breadcrumbList].forEach(schema => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-article-schema", articleId);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll(`script[data-article-schema="${articleId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [title, description, slug, datePublished, dateModified, category]);

  return null;
}
