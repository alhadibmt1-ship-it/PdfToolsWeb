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
          "name": categoryLabels[category] || "PDF Tools",
          "item": `${BASE_URL}/#${category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
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

    const howToSchema = howToSteps.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Use ${toolName}`,
      "description": description,
      "step": howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": step,
        "name": `Step ${index + 1}`
      })),
      "tool": {
        "@type": "HowToTool",
        "name": "PDF HUB 24"
      }
    } : null;

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `${toolName} - PDF HUB 24`,
      "url": `${BASE_URL}${toolPath}`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    const existingScripts = document.querySelectorAll('script[data-structured-data="true"]');
    existingScripts.forEach(script => script.remove());

    const schemas = [breadcrumbList, softwareSchema, faqSchema, howToSchema].filter(Boolean);
    
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-structured-data", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-structured-data="true"]');
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

    const existingScripts = document.querySelectorAll('script[data-article-structured-data="true"]');
    existingScripts.forEach(script => script.remove());

    [articleSchema, breadcrumbList].forEach(schema => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-article-structured-data", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-article-structured-data="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [title, description, slug, datePublished, dateModified, category]);

  return null;
}
