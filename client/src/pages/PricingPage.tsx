import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, X, ArrowRight, Shield, Zap, HelpCircle,
  ChevronDown, ChevronUp, Star
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const freeFeatures = [
  { feature: "All 43+ PDF & Image Tools", included: true },
  { feature: "No Registration Required", included: true },
  { feature: "No Watermarks on Output", included: true },
  { feature: "SSL Encrypted File Transfer", included: true },
  { feature: "Automatic File Deletion", included: true },
  { feature: "PDF Merge, Split, Compress", included: true },
  { feature: "PDF to Word, Excel, PPT", included: true },
  { feature: "Image Compress, Resize, Crop", included: true },
  { feature: "Sign, Annotate, Redact PDF", included: true },
  { feature: "Password Protect & Unlock", included: true },
  { feature: "OCR Text Recognition", included: true },
  { feature: "File Size up to 50MB", included: true },
  { feature: "Unlimited Daily Usage", included: true },
  { feature: "Works on All Devices", included: true }
];

const proFeatures = [
  { feature: "Everything in Free Plan", included: true },
  { feature: "File Size up to 500MB", included: true },
  { feature: "Priority Processing Speed", included: true },
  { feature: "Batch Processing (50+ files)", included: true },
  { feature: "API Access for Developers", included: true },
  { feature: "Custom Watermark Templates", included: true },
  { feature: "Extended File Retention (24h)", included: true },
  { feature: "Priority Email Support", included: true },
  { feature: "No Advertisements", included: true },
  { feature: "Advanced OCR (50+ Languages)", included: true },
  { feature: "Team Collaboration Features", included: true },
  { feature: "Custom Branding Options", included: true }
];

const faqs = [
  { question: "Are the free tools really unlimited?", answer: "Yes. All 43+ tools are completely free with no daily limits, no file count restrictions, and no feature limitations. You can use any tool as many times as you need, every day." },
  { question: "Do free tools add watermarks?", answer: "No. Our free tools never add watermarks, branding, or any marks to your processed files. The output is clean and professional." },
  { question: "Do I need to create an account?", answer: "No. All free tools work without any registration, email verification, or account creation. Just upload your file and get your result." },
  { question: "What is the file size limit?", answer: "The free plan supports files up to 50MB, which covers the vast majority of PDF documents. The Pro plan (coming soon) will support files up to 500MB." },
  { question: "When will the Pro plan be available?", answer: "The Pro plan is currently in development. Sign up for our newsletter to be notified when it launches. All current free features will remain free forever." },
  { question: "Will free features be removed when Pro launches?", answer: "Never. All features currently available for free will remain free permanently. The Pro plan adds premium capabilities on top of the existing free tools." }
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Pricing — 43+ Free PDF Tools (No Hidden Costs) | PDF HUB 24",
    description: "All 43+ PDF tools are 100% free. No signup, no watermarks, no limits. See our free plan features and upcoming Pro plan details.",
    keywords: "free pdf tools, pdf tool pricing, free pdf converter, free pdf editor, pdf hub pricing",
    canonicalPath: "/pricing",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Pricing - Free PDF Tools",
      "description": "All PDF HUB 24 tools are free with no hidden costs",
      "url": `${BASE_URL}/pricing`,
      "isPartOf": { "@type": "WebSite", "name": "PDF HUB 24", "url": BASE_URL }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Pricing</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All 43+ PDF and image tools are completely free. No hidden costs, no signup walls, no watermarks. Use every tool, every day, without limits.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12 max-w-4xl mx-auto">
            <Card className="relative overflow-visible border-primary/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-1">Free</h2>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/forever</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">No credit card required</p>
                </div>
                <Link href="/all-tools">
                  <Button className="w-full mb-6" data-testid="button-get-started-free">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {freeFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-visible opacity-80">
              <CardContent className="p-6 pt-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold">Pro</h2>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">For power users and teams</p>
                </div>
                <Button className="w-full mb-6" variant="outline" disabled data-testid="button-notify-pro">
                  <Star className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
                <ul className="space-y-3">
                  {proFeatures.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Feature Comparison</h2>
            <Card className="overflow-visible">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-comparison">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold">Free</th>
                        <th className="text-center p-4 font-semibold">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Number of Tools", "43+", "43+"],
                        ["Daily Usage Limit", "Unlimited", "Unlimited"],
                        ["Max File Size", "50MB", "500MB"],
                        ["Watermarks", "None", "None"],
                        ["Registration Required", "No", "Yes"],
                        ["Processing Speed", "Standard", "Priority"],
                        ["Batch Processing", "1 file", "50+ files"],
                        ["API Access", "No", "Yes"],
                        ["File Retention", "1 hour", "24 hours"],
                        ["Support", "Community", "Priority Email"],
                        ["Advertisements", "Yes", "No"],
                        ["OCR Languages", "10+", "50+"]
                      ].map(([feature, free, pro], i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-4 text-muted-foreground">{feature}</td>
                          <td className="p-4 text-center">{free}</td>
                          <td className="p-4 text-center">{pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-visible">
                  <button
                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    data-testid={`toggle-faq-${index}`}
                  >
                    <h3 className="font-semibold text-sm sm:text-base">{faq.question}</h3>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-4">All tools are free, forever. No signup needed.</p>
            <Link href="/all-tools">
              <Button data-testid="button-cta-bottom">
                Start Using Free Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
