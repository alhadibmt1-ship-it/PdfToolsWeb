import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Shield, Zap, Clock, HelpCircle, Home, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import SocialShare from "./SocialShare";

const BASE_URL = "https://pdfhub24.com";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  text: string;
  href: string;
}

interface ExtraSection {
  title: string;
  content: string;
  items?: string[];
}

interface ExampleRow {
  label: string;
  before: string;
  after: string;
}

interface ToolSEOContentProps {
  toolName: string;
  toolId?: string;
  toolDescription: string;
  howToSteps: string[];
  benefits: string[];
  faqs: FAQ[];
  keywords?: string[];
  relatedLinks?: RelatedLink[];
  extraSections?: ExtraSection[];
  exampleTable?: {
    title: string;
    rows: ExampleRow[];
  };
}

const categoryLabels: Record<string, string> = {
  "from-pdf": "Convert from PDF",
  "to-pdf": "Convert to PDF",
  "edit-pdf": "Edit PDF",
  "utility": "Utility Tools"
};

export default function ToolSEOContent({
  toolName,
  toolId,
  toolDescription,
  howToSteps,
  benefits,
  faqs,
  keywords = [],
  relatedLinks = [],
  extraSections = [],
  exampleTable
}: ToolSEOContentProps) {
  const tool = toolId ? PDF_TOOLS.find(t => t.id === toolId) : null;
  const category = tool?.category || "edit-pdf";
  const toolPath = tool?.path || "/";

  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-tool-structured-data="true"]');
    existingScripts.forEach(script => script.remove());

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
          "name": categoryLabels[category],
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
      "description": toolDescription,
      "totalTime": "PT2M",
      "step": howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": step,
        "name": `Step ${index + 1}`
      }))
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
      "description": toolDescription
    };

    const schemas = [breadcrumbList, softwareSchema, faqSchema, howToSchema].filter(Boolean);
    
    schemas.forEach(schema => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-tool-structured-data", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-tool-structured-data="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [toolName, toolPath, toolDescription, howToSteps, faqs, category]);

  const keywordText = keywords.length >= 3 
    ? keywords.slice(0, 3).join(", ") 
    : keywords.length > 0 
      ? keywords.join(" or ") 
      : "";

  return (
    <div className="mt-16 space-y-12">
      {/* Social Share Section */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b">
        <p className="text-sm text-muted-foreground">
          Found this tool helpful? Share it with others!
        </p>
        <SocialShare 
          title={`${toolName} - Free Online PDF Tool | PDF HUB 24`}
          description={toolDescription}
        />
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">About Our {toolName} Tool</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {toolDescription}
        </p>
        {keywordText && (
          <p className="text-muted-foreground leading-relaxed mt-4">
            Professionals, students, and business users trust our {toolName.toLowerCase()} tool for all their PDF needs. 
            Whether you need to {keywordText}, our free online tool makes it simple, fast, and secure.
          </p>
        )}
        {relatedLinks.length > 0 && (
          <div className="mt-4">
            <p className="text-muted-foreground mb-2">Before using this tool, you can also:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {relatedLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-primary hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-2">All tools are part of the PDF HUB 24 ecosystem.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">How to Use This Tool</h2>
        <div className="grid gap-4">
          {howToSteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Why Choose PDF HUB 24?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Process your PDFs in seconds with our optimized servers. No waiting, no delays.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">Your files are automatically deleted after processing. We never store or share your documents.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">No Registration Required</h3>
                <p className="text-sm text-muted-foreground">Use all our tools instantly without creating an account. Completely free, no hidden fees.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">Available 24/7</h3>
                <p className="text-sm text-muted-foreground">Access PDF HUB 24 anytime, from any device. Works on desktop, tablet, and mobile.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {extraSections.map((section, index) => (
        <section key={index}>
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
          {section.items && section.items.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {exampleTable && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{exampleTable.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">File Type</th>
                  <th className="text-left p-3 font-semibold">Before</th>
                  <th className="text-left p-3 font-semibold">After</th>
                </tr>
              </thead>
              <tbody>
                {exampleTable.rows.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 text-muted-foreground">{row.label}</td>
                    <td className="p-3 text-muted-foreground">{row.before}</td>
                    <td className="p-3 text-green-600 font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" aria-hidden="true" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Learn More About PDF</h2>
        <p className="text-muted-foreground mb-4">
          PDF (Portable Document Format) is an open standard maintained by the International Organization for Standardization (ISO). 
          Learn more about PDF technology from these authoritative sources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <a 
              href="https://en.wikipedia.org/wiki/PDF" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              PDF on Wikipedia
            </a>
            {" "}- Comprehensive overview of the PDF format and its history
          </li>
          <li>
            <a 
              href="https://www.iso.org/standard/75839.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              ISO 32000-2:2020
            </a>
            {" "}- Official PDF 2.0 specification from ISO
          </li>
          <li>
            <a 
              href="https://www.adobe.com/acrobat/about-adobe-pdf.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              Adobe PDF Overview
            </a>
            {" "}- Learn about PDF from its original creators
          </li>
        </ul>
      </section>

      <section className="bg-card border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-2 max-w-2xl mx-auto">
          Upload your file above and experience the fastest, most reliable {toolName.toLowerCase()} tool online. 
          No registration, no downloads, no limits.
        </p>
        <p className="text-sm text-muted-foreground">
          Trusted by thousands of users worldwide for all their PDF needs.
        </p>
      </section>
    </div>
  );
}
