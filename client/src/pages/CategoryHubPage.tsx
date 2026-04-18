import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ChevronDown, ChevronUp, Shield, Zap, CheckCircle,
  HelpCircle, FileText, Layers, BookOpen
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { getCategoryHub } from "@/data/categoryHubData";

const BASE_URL = "https://pdfhub24.com";

function FAQItem({ question, answer, isOpen, onClick, id }: { question: string; answer: string; isOpen: boolean; onClick: () => void; id: string }) {
  return (
    <Card className="overflow-visible">
      <button
        className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
        data-testid={`toggle-faq-${id}`}
      >
        <h3 className="font-semibold text-sm sm:text-base">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-faq-answer-${id}`}>{answer}</p>
        </div>
      )}
    </Card>
  );
}

export default function CategoryHubPage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";
  const hub = getCategoryHub(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: hub?.title || "PDF Tools Category | PDF HUB 24",
    description: hub?.description || "",
    keywords: hub ? hub.tools.map(t => t.name.toLowerCase()).join(", ") : "",
    canonicalPath: `/${slug}`,
    structuredData: hub ? {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": hub.h1,
      "description": hub.description,
      "url": `${BASE_URL}/${slug}`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    } : undefined
  });

  useEffect(() => {
    if (!hub) return;
    const existingScripts = document.querySelectorAll('script[data-page-schema="true"]');
    existingScripts.forEach(s => s.remove());

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": hub.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": hub.h1, "item": `${BASE_URL}/${slug}` }
      ]
    };
    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.setAttribute("data-page-schema", "true");
    script2.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script2);

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": hub.h1,
      "description": hub.description,
      "url": `${BASE_URL}/${slug}`,
      "numberOfItems": hub.tools.length,
      "itemListElement": hub.tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": tool.name,
        "description": tool.description,
        "url": `${BASE_URL}${tool.path}`
      }))
    };
    const script3 = document.createElement("script");
    script3.type = "application/ld+json";
    script3.setAttribute("data-page-schema", "true");
    script3.textContent = JSON.stringify(itemListSchema);
    document.head.appendChild(script3);

    return () => {
      document.querySelectorAll('script[data-page-schema="true"]').forEach(s => s.remove());
    };
  }, [hub, slug]);

  if (!hub) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Category not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb" data-testid="breadcrumb-nav">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{hub.h1}</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-category-h1">{hub.h1}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{hub.description}</p>
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>No Signup Required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              <span>No Watermarks</span>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {hub.intro.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph.trim()}</p>
            ))}
          </div>

          <div data-ad-slot="top-banner" className="w-full min-h-[90px] flex items-center justify-center my-8 bg-muted/30 rounded-md" data-testid="ad-slot-top">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
              <Layers className="w-7 h-7 text-primary" />
              All {hub.tools.length} Tools in This Category
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {hub.tools.map((tool, index) => (
                <Link key={tool.path} href={tool.path}>
                  <Card className="hover-elevate cursor-pointer h-full overflow-visible" data-testid={`card-tool-${index}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base mb-1">{tool.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <div data-ad-slot="in-content" className="w-full min-h-[90px] flex items-center justify-center my-8 bg-muted/30 rounded-md" data-testid="ad-slot-mid">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {hub.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  id={`hub-${index}`}
                />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              Related Guides & Tutorials
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {hub.relatedBlogs.map((blog, index) => (
                <Link key={blog.path} href={blog.path}>
                  <Card className="hover-elevate cursor-pointer overflow-visible" data-testid={`card-blog-${index}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{blog.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Explore Other Categories</h2>
            <div className="flex flex-wrap gap-3">
              {hub.relatedCategories.map((cat) => (
                <Link key={cat.path} href={cat.path}>
                  <Button variant="outline" data-testid={`link-category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {cat.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ))}
              <Link href="/all-tools">
                <Button variant="outline" data-testid="link-all-tools">
                  All 49+ Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          <div className="text-center py-8 border-t border-border/50">
            <h2 className="text-xl font-bold mb-3">Start Using Our Free Tools Now</h2>
            <p className="text-muted-foreground mb-4">No registration, no watermarks, no limits. Choose a tool above and get started in seconds.</p>
            <Link href="/all-tools">
              <Button data-testid="button-cta-all-tools">
                View All 49+ Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div data-ad-slot="bottom" className="w-full min-h-[90px] flex items-center justify-center my-8 bg-muted/30 rounded-md" data-testid="ad-slot-bottom">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
