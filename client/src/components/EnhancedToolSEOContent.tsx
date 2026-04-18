import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Zap, Clock, HelpCircle, AlertTriangle, ArrowRight, Lock, FileText, Lightbulb, BookOpen, Newspaper, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import { PDF_TOOLS } from "@shared/schema";
import SocialShare from "./SocialShare";
import { getToolSEOData, ToolSEOData } from "@/data/toolSEOData";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getLang } from "@/lib/languages";
import { TOOL_CONTENT_TRANSLATIONS } from "@/lib/toolContentTranslations";

const FEATURED_BLOG_POSTS = [
  { slug: "best-free-pdf-tools-2026", title: "Best Free PDF Tools in 2026: The Complete Roundup", desc: "A comprehensive guide to the most useful PDF tools available for free online." },
  { slug: "how-to-compress-pdf-for-email", title: "How to Compress PDF for Email (Under 25MB)", desc: "Step-by-step guide to reducing PDF file sizes without losing quality." },
  { slug: "convert-pdf-to-word-without-losing-formatting", title: "PDF to Word Without Losing Formatting", desc: "Keep fonts, tables, and layouts intact when converting PDFs to editable Word docs." },
  { slug: "pdf-tools-for-students", title: "Essential PDF Tools Every Student Needs", desc: "The must-have PDF tools for assignments, research, and university submissions." },
  { slug: "sign-pdf-electronically", title: "How to Sign a PDF Electronically — Free Guide", desc: "Add legally valid electronic signatures to contracts and forms without printing." },
  { slug: "protect-pdf-with-password", title: "How to Password Protect a PDF", desc: "Keep sensitive documents secure with encryption and password protection." },
];

const BASE_URL = "https://pdfhub24.com";

interface EnhancedToolSEOContentProps {
  toolId: string;
  fallbackToolName?: string;
  fallbackDescription?: string;
  fallbackHowToSteps?: string[];
  fallbackBenefits?: string[];
  fallbackFaqs?: { question: string; answer: string }[];
}

export default function EnhancedToolSEOContent({
  toolId,
  fallbackToolName,
  fallbackDescription,
  fallbackHowToSteps = [],
  fallbackBenefits = [],
  fallbackFaqs = []
}: EnhancedToolSEOContentProps) {
  const { lang } = useLanguage();
  const langInfo = getLang(lang);
  const isRtl = langInfo.dir === "rtl";
  // Long-form content from toolSEOData is English-only; wrap with ltr for RTL pages
  const enContentProps = isRtl ? { lang: "en", dir: "ltr" as const } : {};

  // Translated content — when available, replaces English toolSEOData content
  const tc = lang !== "en" ? TOOL_CONTENT_TRANSLATIONS[lang] : null;
  // If we have a translation, content is already in the target language (no ltr override needed)
  const contentProps = tc ? {} : enContentProps;

  const tool = PDF_TOOLS.find(tool => tool.id === toolId);
  const seoData = getToolSEOData(toolId);
  
  const toolName = tool?.title || fallbackToolName || "PDF Tool";
  const toolPath = tool?.path || "/";
  const category = tool?.category || "edit-pdf";

  // Derived content: use translation if available, fall back to English seoData
  const aboutText = tc ? tc.about(toolName) : seoData.heroContent;
  const ucTitle = tc ? tc.useCases.title(toolName) : seoData.useCases.title;
  const ucDesc = tc ? tc.useCases.desc : seoData.useCases.description;
  const ucItems = tc ? tc.useCases.items : seoData.useCases.items;
  const tutTitle = tc ? tc.tutorial.title(toolName) : seoData.tutorial.title;
  const tutSteps = tc ? tc.tutorial.steps : seoData.tutorial.steps;
  const faqItemsTranslated = tc ? tc.faqs(toolName) : (seoData?.faqs || fallbackFaqs);
  const trTitle = tc ? tc.troubleshooting.title : seoData.troubleshooting.title;
  const trIssues = tc ? tc.troubleshooting.issues : seoData.troubleshooting.issues;
  const secTitle = tc ? tc.security.title : seoData.securitySection.title;
  const secContent = tc ? tc.security.content : seoData.securitySection.content;
  const secPoints = tc ? tc.security.points : seoData.securitySection.points;

  const categoryLabels: Record<string, string> = {
    "from-pdf": t(lang, "convertFromPdf"),
    "to-pdf": t(lang, "convertToPdf"),
    "edit-pdf": t(lang, "editPdf"),
    "utility": t(lang, "utilityTools"),
  };

  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-enhanced-seo="true"]');
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
          "name": toolName,
          "item": `${BASE_URL}${toolPath}`
        }
      ]
    };

    const faqs = seoData?.faqs || fallbackFaqs;
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

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `${toolName} - PDF HUB 24`,
      "url": `${BASE_URL}${toolPath}`,
      "applicationCategory": "UtilityApplication",
      "applicationSubCategory": "PDF Tool",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": seoData?.metaDescription || fallbackDescription || "",
      "provider": {
        "@type": "Organization",
        "name": "PDF HUB 24",
        "url": BASE_URL,
        "sameAs": ["https://pdfhub24.com"]
      },
      "featureList": seoData?.useCases?.items?.slice(0, 5) || [],
      "isAccessibleForFree": true,
      "screenshot": `${BASE_URL}/og-image.png`
    };

    const steps = seoData?.tutorial?.steps || [];
    const howToSchema = steps.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": seoData?.tutorial?.title || `How to Use ${toolName}`,
      "description": seoData?.metaDescription || "",
      "tool": {
        "@type": "HowToTool",
        "name": `${toolName} - PDF HUB 24`,
        "url": `${BASE_URL}${toolPath}`
      },
      "step": steps.map((s, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": s.step,
        "text": s.detail,
        "url": `${BASE_URL}${toolPath}#step-${i + 1}`
      }))
    } : null;

    // Server-side already injects SoftwareApplication + FAQPage + BreadcrumbList for tool pages.
    // Only inject HowTo here — it's unique and not duplicated server-side.
    const schemas = [howToSchema].filter(Boolean);

    schemas.forEach(schema => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-enhanced-seo", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-enhanced-seo="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [toolName, toolPath, category, seoData, fallbackFaqs, fallbackDescription]);

  if (!seoData) {
    return (
      <div className="mt-16 space-y-12">
        <BasicSEOContent
          toolName={toolName}
          description={fallbackDescription || ""}
          howToSteps={fallbackHowToSteps}
          benefits={fallbackBenefits}
          faqs={fallbackFaqs}
        />
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-12" data-testid="enhanced-seo-content">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors" data-testid="breadcrumb-home">
          <Home className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <Link
          href={`/${category === "from-pdf" ? "convert-pdf" : category === "to-pdf" ? "convert-pdf" : category === "edit-pdf" ? "edit-pdf-tools" : "image-tools"}`}
          className="hover:text-foreground transition-colors"
          data-testid="breadcrumb-category"
        >
          {categoryLabels[category] || "PDF Tools"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="text-foreground font-medium truncate" aria-current="page" data-testid="breadcrumb-current">{toolName}</span>
      </nav>

      <div className="flex items-center justify-between gap-4 pb-4 border-b">
        <p className="text-sm text-muted-foreground">
          {t(lang, "foundHelpful")}
        </p>
        <SocialShare 
          title={`${toolName} - Free Online PDF Tool | PDF HUB 24`}
          description={seoData.metaDescription}
        />
      </div>

      <div data-ad-slot="top-banner" data-testid="ad-slot-top" />

      <section>
        <h2 className="text-2xl font-bold mb-4">
          {t(lang, "aboutToolPrefix")} {toolName}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed" {...contentProps}>
          {aboutText}
        </p>
        {!tc && seoData.secondaryKeywords.length > 0 && (
          <p className="text-muted-foreground leading-relaxed mt-4" {...contentProps}>
            People searching for{" "}
            {seoData.secondaryKeywords.slice(0, 2).map((kw, i, arr) => (
              <span key={i}><strong>{kw}</strong>{i < arr.length - 1 ? ", " : ""}</span>
            ))}{" "}
            and related terms trust PDF HUB 24 for fast, reliable results. Our tool handles everything from simple documents to complex files with embedded images and forms.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" {...contentProps}>{ucTitle}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4" {...contentProps}>{ucDesc}</p>
        <ul className="grid md:grid-cols-2 gap-3">
          {ucItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-muted-foreground" {...contentProps}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6" {...contentProps}>{tutTitle}</h2>
        <div className="grid gap-6">
          {tutSteps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1" {...contentProps}>
                <h3 className="font-semibold text-lg mb-1">{step.step}</h3>
                <p className="text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-testid="button-cta-start-now"
          >
            <Zap className="w-4 h-4 mr-2" />
            {t(lang, "startNowFree")}
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{t(lang, "whyChoosePdfHub")}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">{t(lang, "lightningFast")}</h3>
                <p className="text-sm text-muted-foreground">{t(lang, "lightningFastDesc")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">{t(lang, "bankSecurity")}</h3>
                <p className="text-sm text-muted-foreground">{t(lang, "bankSecurityDesc")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">{t(lang, "hundredFreeForever")}</h3>
                <p className="text-sm text-muted-foreground">{t(lang, "hundredFreeForeverDesc")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">{t(lang, "available247")}</h3>
                <p className="text-sm text-muted-foreground">{t(lang, "available247Desc")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" {...contentProps}>
          <AlertTriangle className="w-6 h-6 text-amber-500" aria-hidden="true" />
          {trTitle}
        </h2>
        <div className="space-y-4">
          {trIssues.map((issue, index) => (
            <Card key={index}>
              <CardContent className="p-6" {...contentProps}>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  {issue.problem}
                </h3>
                <p className="text-muted-foreground">{issue.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div data-ad-slot="mid-content" data-testid="ad-slot-mid" />

      {seoData.comparison && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{seoData.comparison.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{seoData.comparison.content}</p>
          <ul className="space-y-2">
            {seoData.comparison.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" {...contentProps}>
          <Lock className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
          {secTitle}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4" {...contentProps}>{secContent}</p>
        <ul className="grid md:grid-cols-2 gap-3">
          {secPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-muted-foreground" {...contentProps}>{point}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4" lang="en" dir="ltr">
          Learn more about our <Link href="/privacy" className="text-primary hover:underline" data-testid="link-privacy-policy">Privacy Policy</Link> and <Link href="/dmca" className="text-primary hover:underline" data-testid="link-dmca-policy">DMCA & Copyright Policy</Link> for full transparency on how we handle your data.
        </p>
      </section>

      {seoData.internalLinks.filter(l => !l.href.startsWith("/blog")).length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{t(lang, "relatedToolsTitle")}</h2>
          <p className="text-muted-foreground mb-4">{t(lang, "relatedToolsDesc")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {seoData.internalLinks.filter(l => !l.href.startsWith("/blog")).map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-4" {...enContentProps}>
                    <FileText className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-1">
                        {link.text}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.context}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {seoData.internalLinks.filter(l => l.href.startsWith("/blog")).length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
            {t(lang, "helpfulGuidesTitle")}
          </h2>
          <p className="text-muted-foreground mb-4">{t(lang, "helpfulGuidesDesc")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {seoData.internalLinks.filter(l => l.href.startsWith("/blog")).map((link, index) => (
              <Link key={index} href={link.href}>
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="p-4 flex items-center gap-4" {...enContentProps}>
                    <BookOpen className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-1 text-sm">
                        {link.text}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </h3>
                      <p className="text-xs text-muted-foreground">{link.context}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {seoData.relatedWorkflows.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{t(lang, "commonWorkflows")}</h2>
          <div className="space-y-4">
            {seoData.relatedWorkflows.map((workflow, index) => (
              <Card key={index}>
                <CardContent className="p-6" {...enContentProps}>
                  <h3 className="font-semibold mb-2">{workflow.title}</h3>
                  <p className="text-muted-foreground mb-3">{workflow.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tools.map((toolIdRef, toolIndex) => {
                      const refTool = PDF_TOOLS.find(ref => ref.id === toolIdRef);
                      return refTool ? (
                        <Link key={toolIndex} href={refTool.path}>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-pointer">
                            {refTool.title}
                            {toolIndex < workflow.tools.length - 1 && <ArrowRight className="w-3 h-3" aria-hidden="true" />}
                          </span>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Newspaper className="w-6 h-6" aria-hidden="true" />
          {t(lang, "moreBlogTitle")}
        </h2>
        <p className="text-muted-foreground mb-4">{t(lang, "moreBlogDesc")}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_BLOG_POSTS.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <Card className="hover-elevate cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col gap-2 h-full" lang="en" dir="ltr">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <h3 className="font-semibold text-sm leading-snug">{post.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{post.desc}</p>
                  <span className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                    {t(lang, "readGuide")} <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/blog">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-blog">
              <BookOpen className="w-4 h-4" />
              {t(lang, "viewAllBlog")}
            </Button>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" aria-hidden="true" />
          {t(lang, "faqSectionTitle")}
        </h2>
        <div className="space-y-4">
          {faqItemsTranslated.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6" {...contentProps}>
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section lang="en" dir="ltr">
        <h2 className="text-2xl font-bold mb-4">Learn More About PDF Technology</h2>
        <p className="text-muted-foreground mb-4">
          PDF (Portable Document Format) is an open standard maintained by the International Organization for Standardization (ISO). 
          Learn more about PDF technology from these authoritative sources:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              PDF on Wikipedia
            </a>
            {" "}- Comprehensive overview of the PDF format and its history
          </li>
          <li>
            <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              ISO 32000-2:2020
            </a>
            {" "}- Official PDF 2.0 specification from ISO
          </li>
          <li>
            <a href="https://www.adobe.com/acrobat/about-adobe-pdf.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Adobe PDF Overview
            </a>
            {" "}- Learn about PDF from its original creators
          </li>
        </ul>
      </section>

      <div data-ad-slot="bottom-banner" data-testid="ad-slot-bottom" />

      <section className="bg-card border rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{t(lang, "readyToPrefix")} {toolName}?</h2>
        <p className="text-muted-foreground mb-4 max-w-2xl mx-auto" lang="en" dir="ltr">
          Upload your file above and experience the fastest, most reliable {toolName.toLowerCase()} tool online. 
          No registration, no downloads, no limits — just fast, secure results.
        </p>
        <Button
          size="lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-testid="button-cta-bottom"
        >
          <FileText className="w-4 h-4 mr-2" />
          {toolName} - {t(lang, "startFree")}
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          {t(lang, "trustedBy")}
        </p>
      </section>
    </div>
  );
}

function BasicSEOContent({
  toolName,
  description,
  howToSteps,
  benefits,
  faqs
}: {
  toolName: string;
  description: string;
  howToSteps: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">About {toolName}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
      </section>

      {howToSteps.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">How to Use This Tool</h2>
          <div className="grid gap-4">
            {howToSteps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-foreground pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6">Why Choose PDF HUB 24?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Zap className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Process your PDFs in seconds with our optimized servers.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">100% Secure</h3>
                <p className="text-sm text-muted-foreground">Your files are automatically deleted after processing.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">No Registration</h3>
                <p className="text-sm text-muted-foreground">Use all tools instantly without creating an account.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex gap-4">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold mb-2">Available 24/7</h3>
                <p className="text-sm text-muted-foreground">Access PDF HUB 24 anytime, from any device.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {benefits.length > 0 && (
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
      )}

      {faqs.length > 0 && (
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
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Learn More About PDF</h2>
        <p className="text-muted-foreground mb-4">
          PDF (Portable Document Format) is an open standard maintained by ISO.
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              PDF on Wikipedia
            </a>
          </li>
          <li>
            <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              ISO 32000-2:2020
            </a>
          </li>
          <li>
            <a href="https://www.adobe.com/acrobat/about-adobe-pdf.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Adobe PDF Overview
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
