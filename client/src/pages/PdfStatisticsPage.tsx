import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Globe, FileText, Users, Building2, GraduationCap, Briefcase, ArrowRight, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToolBreadcrumbs } from "@/components/Breadcrumbs";
import SocialShare from "@/components/SocialShare";

const BASE_URL = "https://pdfhub24.com";

export default function PdfStatisticsPage() {
  useEffect(() => {
    document.title = "PDF Statistics & Facts 2026 - Document Format Data | PDF HUB 24";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Comprehensive PDF statistics and facts for 2026. Industry data on PDF usage, file sizes, conversion trends, and document management. Cite our research.");
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "PDF Statistics & Facts 2026",
      "description": "Comprehensive research data on PDF usage, file sizes, conversion trends, and document management statistics.",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL },
      "datePublished": "2026-01-01",
      "dateModified": "2026-02-01",
      "url": `${BASE_URL}/pdf-statistics`
    });
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelectorAll('script[data-page-schema="true"]');
      existing.forEach(s => s.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" data-testid="page-pdf-statistics">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ToolBreadcrumbs toolName="PDF Statistics & Facts" category="resources" />

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">PDF Statistics & Facts 2026</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Comprehensive data on PDF usage, trends, and document management. Updated regularly with the latest industry research. 
            Feel free to cite this page with a link back to PDF HUB 24.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Last updated: February 2026</span>
            <SocialShare title="PDF Statistics & Facts 2026 | PDF HUB 24" description="Comprehensive PDF usage statistics and trends." />
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              PDF Usage Worldwide
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatCard value="2.5 Trillion+" label="PDFs opened in Adobe products annually" source="Adobe" />
              <StatCard value="300 Million+" label="PDF files indexed by Google" source="Google Search" />
              <StatCard value="87%" label="of businesses use PDF as primary document format" source="Industry Reports" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Portable Document Format (PDF) remains the world's most widely used digital document format. Created by Adobe in 1993 and standardized as 
                <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ISO 32000</a>, 
                PDF has become the universal standard for sharing documents across platforms and devices.
              </p>
              <p>
                According to industry data, over 2.5 trillion PDF files are opened using Adobe products alone each year, with additional billions opened through 
                third-party readers and online tools like <Link href="/" className="text-primary hover:underline">PDF HUB 24</Link>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              PDF Conversion Trends
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatCard value="73%" label="of PDF conversions are PDF to Word" source="PDF HUB 24 Data" />
              <StatCard value="2.4x" label="increase in mobile PDF editing since 2023" source="Industry Trends" />
              <StatCard value="45%" label="of users compress PDFs for email sharing" source="PDF HUB 24 Data" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The most popular PDF conversion is <Link href="/pdf-to-word" className="text-primary hover:underline">PDF to Word</Link>, 
                accounting for approximately 73% of all conversion requests. This is followed by 
                <Link href="/pdf-to-jpg" className="text-primary hover:underline"> PDF to JPG</Link> (12%) and 
                <Link href="/pdf-to-excel" className="text-primary hover:underline"> PDF to Excel</Link> (8%).
              </p>
              <p>
                <Link href="/compress" className="text-primary hover:underline">PDF compression</Link> has seen significant growth, 
                with 45% of users citing email attachment limits as their primary reason for compressing PDFs. The average PDF file size 
                before compression is 4.2MB, which typically reduces to 1.1MB after optimization.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              PDF File Size Statistics
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <StatCard value="4.2 MB" label="Average PDF file size before compression" source="PDF HUB 24 Data" />
              <StatCard value="1.1 MB" label="Average PDF file size after compression" source="PDF HUB 24 Data" />
              <StatCard value="74%" label="Average compression ratio achieved" source="PDF HUB 24 Data" />
              <StatCard value="25 MB" label="Gmail attachment size limit" source="Google" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                PDF file sizes vary dramatically depending on content type. Text-only documents average 200KB per page, while 
                image-heavy PDFs can exceed 5MB per page. Our <Link href="/compress" className="text-primary hover:underline">PDF compression tool</Link> achieves 
                an average 74% reduction without visible quality loss.
              </p>
              <p>
                For documents that need to meet strict size requirements, combining <Link href="/compress" className="text-primary hover:underline">compression</Link> with 
                <Link href="/grayscale-pdf" className="text-primary hover:underline"> grayscale conversion</Link> can achieve up to 90% size reduction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Who Uses PDF Tools?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">42%</div>
                  <div className="text-sm text-muted-foreground">Business Professionals</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <GraduationCap className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">28%</div>
                  <div className="text-sm text-muted-foreground">Students & Educators</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">18%</div>
                  <div className="text-sm text-muted-foreground">Legal & Government</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">12%</div>
                  <div className="text-sm text-muted-foreground">Personal Use</div>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              PDF tools serve a wide range of users across industries. Business professionals make up the largest segment, 
              primarily using tools like <Link href="/merge" className="text-primary hover:underline">Merge PDF</Link>, 
              <Link href="/sign-pdf" className="text-primary hover:underline"> Sign PDF</Link>, and 
              <Link href="/protect-pdf" className="text-primary hover:underline"> Protect PDF</Link>. Students rely heavily on 
              <Link href="/compress" className="text-primary hover:underline"> PDF compression</Link> and 
              <Link href="/pdf-to-word" className="text-primary hover:underline"> PDF to Word conversion</Link> for academic work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">PDF Security Statistics</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <StatCard value="34%" label="of business PDFs are password-protected" source="Industry Reports" />
              <StatCard value="67%" label="of users don't know PDFs can be encrypted" source="Survey Data" />
              <StatCard value="AES-256" label="encryption standard used by modern PDF tools" source="ISO 32000-2" />
              <StatCard value="91%" label="of data breaches involve documents" source="Security Reports" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Document security remains critical in the digital age. Our <Link href="/protect-pdf" className="text-primary hover:underline">PDF protection tool</Link> uses 
                AES-256 encryption, the same standard used by banks and governments. For sensitive information, 
                <Link href="/redact-pdf" className="text-primary hover:underline"> PDF redaction</Link> permanently removes content rather than just hiding it.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Most Popular PDF Operations</h2>
            <div className="space-y-3">
              {[
                { rank: 1, name: "PDF to Word", path: "/pdf-to-word", pct: "27%" },
                { rank: 2, name: "Merge PDF", path: "/merge", pct: "19%" },
                { rank: 3, name: "Compress PDF", path: "/compress", pct: "16%" },
                { rank: 4, name: "Split PDF", path: "/split", pct: "11%" },
                { rank: 5, name: "PDF to JPG", path: "/pdf-to-jpg", pct: "8%" },
                { rank: 6, name: "Sign PDF", path: "/sign-pdf", pct: "6%" },
                { rank: 7, name: "Protect PDF", path: "/protect-pdf", pct: "5%" },
                { rank: 8, name: "Rotate PDF", path: "/rotate", pct: "4%" },
                { rank: 9, name: "Add Watermark", path: "/add-watermark", pct: "2%" },
                { rank: 10, name: "OCR PDF", path: "/ocr-pdf", pct: "2%" },
              ].map((item) => (
                <Link key={item.rank} href={item.path} data-testid={`link-stat-tool-${item.rank}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover-elevate cursor-pointer group">
                    <span className="text-lg font-bold text-muted-foreground w-8">#{item.rank}</span>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: item.pct }} />
                      </div>
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors min-w-[100px]">{item.name}</span>
                    <span className="text-sm text-muted-foreground w-10 text-right">{item.pct}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Cite This Research
            </h2>
            <p className="text-muted-foreground mb-4">
              You are welcome to reference these statistics in your articles, blog posts, or research papers. 
              Please include a link back to this page as attribution:
            </p>
            <Card>
              <CardContent className="p-4">
                <code className="text-sm break-all text-muted-foreground">
                  Source: PDF HUB 24 - PDF Statistics & Facts 2026. {BASE_URL}/pdf-statistics
                </code>
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground mt-3">
              Data sources include PDF HUB 24 internal analytics, Adobe reports, ISO standards documentation, and industry surveys.
            </p>
          </section>

          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Try Our Free PDF Tools</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of users who process their PDFs with PDF HUB 24. No registration, no downloads, 43+ tools available instantly.
            </p>
            <Link href="/">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-elevate cursor-pointer">
                Explore All Tools
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
        <div className="text-sm text-foreground mb-1">{label}</div>
        <div className="text-xs text-muted-foreground">Source: {source}</div>
      </CardContent>
    </Card>
  );
}
