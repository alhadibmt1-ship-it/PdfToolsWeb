import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, Shield, Globe, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";
import SocialShare from "@/components/SocialShare";

const BASE_URL = "https://pdfhub24.com";

interface ToolEntry {
  name: string;
  path: string;
  description: string;
  badge?: string;
  tags: string[];
  features: string[];
  rating: number;
}

const topTools: ToolEntry[] = [
  {
    name: "Merge PDF",
    path: "/merge",
    description: "Combine multiple PDF files into one document instantly. Drag, drop, and reorder files before merging.",
    badge: "Most Popular",
    tags: ["Free", "No signup", "Unlimited"],
    features: ["Unlimited files", "Drag-and-drop order", "Fast processing", "Works in browser"],
    rating: 5,
  },
  {
    name: "Compress PDF",
    path: "/compress",
    description: "Reduce PDF file size by up to 90% without visible quality loss. Great for email attachments.",
    badge: "Editor's Pick",
    tags: ["Free", "Adjustable quality", "Instant"],
    features: ["3 compression levels", "No watermarks", "Batch compress", "Under 1 second"],
    rating: 5,
  },
  {
    name: "PDF to Word",
    path: "/pdf-to-word",
    description: "Convert PDF to fully editable Word (.docx) files with CloudConvert-powered formatting retention.",
    tags: ["Free", "High quality", "Formatting kept"],
    features: ["Preserves layout", "Tables supported", "Images intact", "CloudConvert engine"],
    rating: 5,
  },
  {
    name: "JPG to PDF",
    path: "/jpg-to-pdf",
    description: "Convert one or multiple JPG images into a professional PDF document in seconds.",
    tags: ["Free", "Multi-image", "Instant"],
    features: ["Multiple images", "Custom page size", "No quality loss", "Instant download"],
    rating: 5,
  },
  {
    name: "Split PDF",
    path: "/split",
    description: "Split a PDF into individual pages or custom ranges. Extract exactly the pages you need.",
    tags: ["Free", "Custom ranges", "Page picker"],
    features: ["Page ranges", "Individual pages", "ZIP download", "No limit"],
    rating: 4,
  },
  {
    name: "Protect PDF",
    path: "/protect-pdf",
    description: "Add password protection and encryption to your PDF files to keep sensitive content secure.",
    tags: ["Free", "AES-256", "Instant"],
    features: ["Password lock", "AES-256 encryption", "Permission control", "Instant"],
    rating: 5,
  },
  {
    name: "OCR PDF",
    path: "/ocr-pdf",
    description: "Extract text from scanned PDFs using optical character recognition. Make PDFs searchable.",
    tags: ["Free", "Multi-language", "Searchable"],
    features: ["40+ languages", "Scanned docs", "Searchable output", "High accuracy"],
    rating: 4,
  },
  {
    name: "Sign PDF",
    path: "/sign-pdf",
    description: "Add your digital signature to PDF documents directly in the browser — no software needed.",
    tags: ["Free", "Draw/type", "Instant"],
    features: ["Draw signature", "Type name", "Upload image", "Instant save"],
    rating: 5,
  },
  {
    name: "PDF to JPG",
    path: "/pdf-to-jpg",
    description: "Convert each page of a PDF to high-resolution JPG images. Perfect for presentations and web use.",
    tags: ["Free", "High-res", "Per-page"],
    features: ["High resolution", "All pages", "ZIP download", "No quality loss"],
    rating: 4,
  },
  {
    name: "Add Watermark",
    path: "/add-watermark",
    description: "Add text or image watermarks to your PDF files to brand documents and protect IP.",
    tags: ["Free", "Custom text", "Opacity control"],
    features: ["Custom text", "Position control", "Opacity slider", "Font options"],
    rating: 4,
  },
  {
    name: "Compress Image",
    path: "/image-compressor",
    description: "Reduce image file sizes for web, email, and social media without losing visible quality.",
    tags: ["Free", "All formats", "Batch"],
    features: ["JPEG/PNG/WebP", "Quality slider", "Batch mode", "Instant preview"],
    rating: 5,
  },
  {
    name: "Translate PDF",
    path: "/translate-pdf",
    description: "Translate your PDF documents into 50+ languages while preserving the original layout.",
    tags: ["Free", "50+ languages", "Layout kept"],
    features: ["50+ languages", "Layout preserved", "Instant output", "All PDF types"],
    rating: 4,
  },
];

const platformComparison = [
  { feature: "Free PDF merge", pdfhub: true, ilovepdf: true, pdf24: true, smallpdf: false },
  { feature: "No file size limit", pdfhub: true, ilovepdf: false, pdf24: true, smallpdf: false },
  { feature: "No watermarks", pdfhub: true, ilovepdf: true, pdf24: true, smallpdf: false },
  { feature: "No account required", pdfhub: true, ilovepdf: true, pdf24: true, smallpdf: false },
  { feature: "OCR (free)", pdfhub: true, ilovepdf: false, pdf24: true, smallpdf: false },
  { feature: "Translate PDF (free)", pdfhub: true, ilovepdf: false, pdf24: false, smallpdf: false },
  { feature: "13 languages UI", pdfhub: true, ilovepdf: false, pdf24: false, smallpdf: false },
  { feature: "Auto file deletion", pdfhub: true, ilovepdf: true, pdf24: true, smallpdf: true },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} />
      ))}
    </div>
  );
}

export default function BestFreeToolsPage() {
  useEffect(() => {
    document.title = "Best Free PDF Tools 2026 — No Signup, No Watermarks | PDF HUB 24";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content",
        "Discover the best free PDF tools of 2026. Merge, compress, convert, sign, and edit PDFs online — no signup, no watermarks, no file size limits. Compared against iLovePDF, Smallpdf, and PDF24.");
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `${BASE_URL}/best-free-tools`);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Best Free PDF Tools 2026 — No Signup, No Watermarks",
      "url": `${BASE_URL}/best-free-tools`,
      "description": "Comprehensive guide to the best free PDF tools in 2026, with feature comparisons and direct links.",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 px-4 bg-gradient-to-b from-primary/5 to-background border-b">
          <div className="max-w-4xl mx-auto text-center">
            <ToolBreadcrumbs toolName="Best Free PDF Tools" category="Resources" />
            <Badge className="mb-4">Updated for 2026</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Best Free PDF Tools in 2026
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Handpicked free PDF tools you can use right now — no account, no watermarks, no hidden fees.
              We tested them ourselves so you don't have to.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {[
                { icon: Zap, text: "Instant processing" },
                { icon: Shield, text: "Files auto-deleted after 1 hour" },
                { icon: Globe, text: "Works in any browser" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon size={15} className="text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Top 12 Tools Grid */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-2">Top 12 Free PDF Tools</h2>
            <p className="text-muted-foreground mb-8">
              All tools are 100% free, require no login, and leave no watermarks on your files.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topTools.map((tool) => (
                <Card key={tool.path} className="flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-1 gap-3">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-base">{tool.name}</h3>
                      {tool.badge && (
                        <Badge variant="secondary" className="text-xs shrink-0">{tool.badge}</Badge>
                      )}
                    </div>
                    <Stars count={tool.rating} />
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-1 mt-auto">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle size={12} className="text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.path}>
                      <Button size="sm" className="w-full mt-2" data-testid={`button-tool-${tool.path.slice(1)}`}>
                        Try Free <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-2">PDF HUB 24 vs. Competitors</h2>
            <p className="text-muted-foreground mb-6">
              How PDF HUB 24 stacks up against the most popular free PDF tools online.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-muted/60 border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold text-primary">PDF HUB 24</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">iLovePDF</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">PDF24</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Smallpdf</th>
                  </tr>
                </thead>
                <tbody>
                  {platformComparison.map((row, i) => (
                    <tr key={row.feature} className={`border-b last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="p-4">{row.feature}</td>
                      {[row.pdfhub, row.ilovepdf, row.pdf24, row.smallpdf].map((val, j) => (
                        <td key={j} className="p-4 text-center">
                          {val
                            ? <CheckCircle size={16} className="inline text-green-500" />
                            : <span className="text-muted-foreground/40">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Free Section */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-2">Why Are These Tools Free?</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              PDF HUB 24 is free because we believe document processing tools should be accessible to everyone.
              Our tools are supported by non-intrusive advertising and an optional Pro plan for power users.
              The core features — merge, split, compress, convert — will always remain free.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "No hidden limits",
                  desc: "No daily limits, no file size caps on free tools. Process as many documents as you need.",
                },
                {
                  title: "Privacy first",
                  desc: "Your files are processed in-memory and automatically deleted within 1 hour. We never read your content.",
                },
                {
                  title: "No account needed",
                  desc: "Start converting, compressing, or merging PDFs instantly. No email, no password, no waiting.",
                },
              ].map(({ title, desc }) => (
                <Card key={title}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Are all PDF HUB 24 tools really free?",
                  a: "Yes. All 49+ tools listed on this page are 100% free. No credit card, no account, and no watermarks on your output files.",
                },
                {
                  q: "Is there a file size limit for free tools?",
                  a: "No. PDF HUB 24 does not impose file size limits on free tools. You can compress, merge, or convert files of any size.",
                },
                {
                  q: "How long are files stored on your servers?",
                  a: "All uploaded files are automatically deleted within 1 hour of upload. We never store files permanently or access their contents.",
                },
                {
                  q: "Which PDF tool do you recommend for beginners?",
                  a: "Start with Merge PDF or Compress PDF — both are simple, fast, and deliver excellent results without any configuration.",
                },
                {
                  q: "Can I use PDF HUB 24 on mobile?",
                  a: "Yes. All tools are fully responsive and work in any modern mobile browser on Android and iOS.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="border rounded-md p-4">
                  <h3 className="font-semibold mb-1 text-sm">{q}</h3>
                  <p className="text-sm text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-10 bg-primary/5 rounded-xl border">
            <h2 className="text-2xl font-bold mb-3">Ready to start?</h2>
            <p className="text-muted-foreground mb-6">All 49+ tools are free, instant, and require no sign-up.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/merge"><Button size="lg">Merge PDF</Button></Link>
              <Link href="/compress"><Button size="lg" variant="outline">Compress PDF</Button></Link>
              <Link href="/all-tools"><Button size="lg" variant="outline">See All 49+ Tools</Button></Link>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <SocialShare url={`${BASE_URL}/best-free-tools`} title="Best Free PDF Tools 2026 — No Signup, No Watermarks" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
