import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ChevronDown, ChevronUp, Shield, Zap, CheckCircle,
  HelpCircle, Target, Upload
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { getProgrammaticPage, getAllProgrammaticPages } from "@/data/programmaticSeoData";

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

export default function ProgrammaticSeoPage() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug || "";
  const page = getProgrammaticPage(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: page?.title || "PDF Tool | PDF HUB 24",
    description: page?.description || "",
    canonicalPath: `/tools/${slug}`,
    structuredData: page ? {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.h1,
      "description": page.description,
      "url": `${BASE_URL}/tools/${slug}`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    } : undefined
  });

  // FAQPage + SoftwareApplication + BreadcrumbList are already injected server-side for programmatic pages.

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Page not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPages = getAllProgrammaticPages()
    .filter(p => p.slug !== slug && p.toolPath === page.toolPath)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <Link href={page.toolPath} className="hover:text-foreground" data-testid="link-breadcrumb-tool">{page.toolName}</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{page.h1}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-page-h1">{page.h1}</h1>
          <p className="text-lg text-muted-foreground mb-6">{page.description}</p>

          <div className="flex items-center gap-4 flex-wrap mb-8">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span>No Signup</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
              <span>Free Forever</span>
            </div>
          </div>

          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <Upload className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="text-lg font-bold mb-2">Ready to {page.toolName}?</h2>
              <p className="text-sm text-muted-foreground mb-4">Use our free {page.toolName} tool now — no signup required.</p>
              <Link href={page.toolPath}>
                <Button data-testid="button-cta-tool">
                  Open {page.toolName} Tool
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div data-ad-slot="top-banner" className="w-full min-h-[90px] flex items-center justify-center my-6 bg-muted/30 rounded-md" data-testid="ad-slot-top">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            {page.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph.trim()}</p>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              Common Use Cases
            </h2>
            <ul className="space-y-2">
              {page.useCases.map((useCase, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{useCase}</span>
                </li>
              ))}
            </ul>
          </section>

          <div data-ad-slot="in-content" className="w-full min-h-[90px] flex items-center justify-center my-6 bg-muted/30 rounded-md" data-testid="ad-slot-mid">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <Card className="mb-10 border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-bold mb-2">Start Now — It's Free</h2>
              <p className="text-sm text-muted-foreground mb-4">No registration, no watermarks, no daily limits.</p>
              <Link href={page.toolPath}>
                <Button data-testid="button-cta-bottom">
                  Use {page.toolName} Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {page.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  id={`pseo-${index}`}
                />
              ))}
            </div>
          </section>

          {relatedPages.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-4">Related Pages</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedPages.map((related) => (
                  <Link key={related.slug} href={`/tools/${related.slug}`}>
                    <Card className="hover-elevate cursor-pointer overflow-visible" data-testid={`card-related-${related.slug}`}>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-sm">{related.h1}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div data-ad-slot="bottom" className="w-full min-h-[90px] flex items-center justify-center my-6 bg-muted/30 rounded-md" data-testid="ad-slot-bottom">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
