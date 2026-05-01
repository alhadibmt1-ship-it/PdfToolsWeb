import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Globe, Mail, Calendar, Users, Shield, Zap, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";

const BASE_URL = "https://pdfhub24.com";

export default function PressKitPage() {
  useEffect(() => {
    document.title = "Press & Media Kit - PDF HUB 24 | Free Online PDF Tools";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "PDF HUB 24 press kit for journalists, bloggers, and reviewers. Company information, product facts, and media resources for coverage.");
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Press & Media Kit - PDF HUB 24",
      "description": "Press kit and media resources for PDF HUB 24.",
      "url": `${BASE_URL}/press`
    });
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelectorAll('script[data-page-schema="true"]');
      existing.forEach(s => s.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-press-kit">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ToolBreadcrumbs toolName="Press & Media Kit" category="company" />

        <div className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Press & Media Kit</h1>
          <p className="text-lg text-muted-foreground">
            Everything journalists, bloggers, and reviewers need to write about PDF HUB 24. 
            For press inquiries, contact us at <a href="mailto:press@pdfhub24.com" className="text-primary hover:underline">press@pdfhub24.com</a>.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4">About PDF HUB 24</h2>
            <Card>
              <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">PDF HUB 24</strong> is a comprehensive, free online platform offering 49+ professional PDF and image manipulation tools. 
                  Launched to make document processing accessible to everyone, PDF HUB 24 requires no registration, no software downloads, 
                  and no hidden fees.
                </p>
                <p>
                  The platform serves business professionals, students, educators, legal professionals, and individuals 
                  who need reliable PDF processing without the cost of enterprise software subscriptions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Quick Facts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <FactCard icon={<FileText className="w-5 h-5 text-primary" />} label="Tools Available" value="49+ PDF & Image Tools" />
              <FactCard icon={<Globe className="w-5 h-5 text-primary" />} label="Website" value="pdfhub24.com" />
              <FactCard icon={<Users className="w-5 h-5 text-primary" />} label="Target Users" value="Professionals, Students, Everyone" />
              <FactCard icon={<Shield className="w-5 h-5 text-primary" />} label="Security" value="AES-256 Encryption, Auto-Delete" />
              <FactCard icon={<Zap className="w-5 h-5 text-primary" />} label="Pricing" value="100% Free, No Registration" />
              <FactCard icon={<Calendar className="w-5 h-5 text-primary" />} label="Availability" value="24/7, All Devices" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Tool Categories</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">Convert from PDF (8 tools)</h3>
                  <p className="text-sm text-muted-foreground">
                    PDF to Word, JPG, PNG, Excel, PowerPoint, plus text extraction, image extraction, and OCR.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">Convert to PDF (9 tools)</h3>
                  <p className="text-sm text-muted-foreground">
                    Word, JPG, PNG, Excel, PowerPoint, TIFF, GIF, HTML, and WebP to PDF conversion.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">Edit PDF (19 tools)</h3>
                  <p className="text-sm text-muted-foreground">
                    Merge, split, compress, rotate, sign, annotate, redact, watermark, crop, resize, and more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2">Utility & Image (7 tools)</h3>
                  <p className="text-sm text-muted-foreground">
                    PDF viewer, compare, image compression, resize, crop, rotate, and format conversion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Differentiators</h2>
            <div className="space-y-3">
              {[
                "49+ tools in one platform - no need to visit multiple sites",
                "Completely free with no usage limits or watermarks",
                "No account creation or email signup required",
                "Files are automatically deleted after processing for privacy",
                "Works on all devices - desktop, tablet, and mobile",
                "Professional-grade output quality using industry-standard libraries",
                "AES-256 encryption for document protection",
                "Dark mode support for comfortable extended use"
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Most Popular Tools</h2>
            <p className="text-muted-foreground mb-4">These are our most frequently used tools - great starting points for reviews:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: "PDF to Word", path: "/pdf-to-word", desc: "Convert PDF to editable Word documents" },
                { name: "Merge PDF", path: "/merge-pdf", desc: "Combine multiple PDFs into one" },
                { name: "Compress PDF", path: "/compress-pdf", desc: "Reduce PDF file size for email" },
                { name: "Split PDF", path: "/split-pdf", desc: "Extract specific pages from PDFs" },
                { name: "Sign PDF", path: "/sign-pdf", desc: "Add signatures to PDF documents" },
                { name: "Protect PDF", path: "/protect-pdf", desc: "Add password protection to PDFs" },
              ].map((tool) => (
                <Link key={tool.path} href={tool.path} data-testid={`link-press-tool-${tool.name}`}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Useful Links</h2>
            <div className="space-y-3">
              {[
                { label: "Homepage", url: "/", internal: true },
                { label: "All Tools", url: "/#tools", internal: true },
                { label: "Blog", url: "/blog", internal: true },
                { label: "PDF Statistics & Facts 2026", url: "/pdf-statistics", internal: true },
                { label: "About Us", url: "/about", internal: true },
                { label: "Privacy Policy", url: "/privacy", internal: true },
                { label: "Contact Us", url: "/contact", internal: true },
              ].map((link) => (
                <div key={link.url} className="flex items-center gap-2">
                  {link.internal ? (
                    <Link href={link.url} className="text-primary hover:underline flex items-center gap-1" data-testid={`link-press-${link.label}`}>
                      {link.label} <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                      {link.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Media Contact
            </h2>
            <p className="text-muted-foreground mb-4">
              For press inquiries, review copies, interview requests, or partnership opportunities:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: <a href="mailto:press@pdfhub24.com" className="text-primary hover:underline">press@pdfhub24.com</a></p>
              <p>Website: <a href={BASE_URL} className="text-primary hover:underline">{BASE_URL}</a></p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        {icon}
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-sm font-medium">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
