import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, X, ArrowRight, BarChart3, Shield,
  HelpCircle, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const BASE_URL = "https://pdfhub24.com";

const tools = [
  { name: "PDF HUB 24", free: true, tools: "49+", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: true, watermark: true, batch: false, api: false, noSignup: true, noWatermark: true, fileLimit: "50MB", mobile: true },
  { name: "Adobe Acrobat", free: false, tools: "20+", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: true, watermark: true, batch: true, api: true, noSignup: false, noWatermark: true, fileLimit: "Unlimited", mobile: true },
  { name: "Smallpdf", free: false, tools: "21", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: false, watermark: false, batch: false, api: false, noSignup: false, noWatermark: false, fileLimit: "5MB Free", mobile: true },
  { name: "ILovePDF", free: false, tools: "25", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: false, watermark: true, batch: false, api: false, noSignup: false, noWatermark: false, fileLimit: "15MB Free", mobile: true },
  { name: "PDF24", free: true, tools: "30+", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: false, watermark: true, batch: false, api: false, noSignup: true, noWatermark: true, fileLimit: "Varies", mobile: true },
  { name: "Sejda", free: false, tools: "30+", merge: true, split: true, compress: true, convert: true, ocr: true, sign: true, redact: true, watermark: true, batch: false, api: true, noSignup: false, noWatermark: false, fileLimit: "50MB Free", mobile: false }
];

const faqs = [
  { question: "Why is PDF HUB 24 completely free?", answer: "PDF HUB 24 is supported by advertising revenue and our upcoming Pro plan. This allows us to offer all 49+ tools completely free without watermarks, signup requirements, or daily limits." },
  { question: "How does PDF HUB 24 compare to Adobe Acrobat?", answer: "Adobe Acrobat is the industry standard with unlimited file sizes and advanced features, but costs $19.99/month. PDF HUB 24 offers 49+ tools for free, covering all common PDF tasks. For most users, PDF HUB 24 provides everything needed without the cost." },
  { question: "Which free PDF tool has the most features?", answer: "PDF HUB 24 offers the most comprehensive free toolset with 49+ tools including merge, split, compress, convert, OCR, sign, redact, annotate, and image tools — all without signup or watermarks." },
  { question: "Do any free PDF tools add watermarks?", answer: "PDF HUB 24 and PDF24 do not add watermarks to free output. Many competitors like Smallpdf, ILovePDF, and Sejda add watermarks to free-tier conversions or limit free daily usage." },
  { question: "Which PDF tool is best for business use?", answer: "For occasional use, PDF HUB 24's free tools handle most business needs. For high-volume processing with API access, Adobe Acrobat or paid plans from competitors offer batch processing and integration features." }
];

function BoolCell({ value }: { value: boolean }) {
  return value ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <X className="w-4 h-4 text-red-400 mx-auto" />;
}

export default function PdfComparisonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free PDF Tools Comparison Chart 2026 — 6 Platforms Reviewed | PDF HUB 24",
    description: "Compare 6 free PDF tool platforms side by side. Features, pricing, file limits, and capabilities of PDF HUB 24, Adobe, Smallpdf, ILovePDF, PDF24, and Sejda.",
    keywords: "pdf tools comparison, free pdf tools, best pdf tool, pdf converter comparison, adobe vs smallpdf, pdf editor comparison",
    canonicalPath: "/pdf-comparison-chart",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Free PDF Tools Comparison Chart 2026",
      "description": "Comprehensive comparison of 6 popular PDF tool platforms",
      "url": `${BASE_URL}/pdf-comparison-chart`,
      "datePublished": "2026-01-15",
      "dateModified": "2026-03-01",
      "author": { "@type": "Organization", "name": "PDF HUB 24" },
      "publisher": { "@type": "Organization", "name": "PDF HUB 24", "url": BASE_URL }
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground" data-testid="link-breadcrumb-home">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">PDF Tools Comparison</span>
          </nav>

          <div className="text-center mb-10">
            <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-h1">Free PDF Tools Comparison Chart 2026</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              An independent comparison of 6 popular PDF tool platforms. We analyze features, pricing, file limits, and user experience to help you choose the right tool for your needs.
            </p>
            <p className="text-sm text-muted-foreground mt-2">Last updated: March 2026 | 6 platforms compared across 14 features</p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Side-by-Side Feature Comparison</h2>
            <Card className="overflow-visible">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[800px]" data-testid="table-main-comparison">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left p-3 font-semibold sticky left-0 bg-muted/30">Feature</th>
                        {tools.map(t => (
                          <th key={t.name} className="text-center p-3 font-semibold whitespace-nowrap">{t.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Completely Free</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.free} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Number of Tools</td>{tools.map(t => <td key={t.name} className="p-3 text-center">{t.tools}</td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">No Signup Required</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.noSignup} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">No Watermarks</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.noWatermark} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Free File Limit</td>{tools.map(t => <td key={t.name} className="p-3 text-center text-xs">{t.fileLimit}</td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Merge PDF</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.merge} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Split PDF</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.split} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Compress PDF</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.compress} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Convert Formats</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.convert} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">OCR</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.ocr} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">E-Sign</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.sign} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Redact</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.redact} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Watermark</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.watermark} /></td>)}</tr>
                      <tr className="border-b"><td className="p-3 font-medium sticky left-0 bg-background">Mobile Friendly</td>{tools.map(t => <td key={t.name} className="p-3"><BoolCell value={t.mobile} /></td>)}</tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Detailed Platform Reviews</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">PDF HUB 24</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">PDF HUB 24 stands out as the most comprehensive free PDF tool platform available, offering 49+ tools with no registration requirement and no watermarks on output files. The platform covers conversion (PDF to Word, Excel, JPG, PNG, PowerPoint), editing (merge, split, rotate, crop, resize), security (encrypt, redact, sign, flatten), and image manipulation (compress, resize, crop, convert).</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">All tools are accessible without creating an account, and files are automatically deleted within one hour for privacy. The platform supports files up to 50MB and works on all devices. While it lacks batch processing and API access (available in the upcoming Pro plan), it offers the broadest free feature set of any platform compared here.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Users who want maximum free functionality without registration or watermarks. Ideal for students, freelancers, and small businesses.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Adobe Acrobat Online</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">Adobe Acrobat is the original PDF standard-setter, and their online tools reflect decades of PDF expertise. The free tier offers basic operations like merge and convert, but most advanced features require an Acrobat Pro subscription at $19.99/month. The paid version provides unlimited file sizes, batch processing, API access, and the most polished editing experience available.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Professional users with high-volume needs who justify the monthly subscription cost. Enterprises requiring API integration and unlimited processing.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smallpdf</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">Smallpdf offers 21 tools with a clean, user-friendly interface. The free tier is significantly limited: 2 tasks per day, 5MB file limit, and watermarks on some output files. The Pro plan ($12/month) removes these limitations. Smallpdf's strength is its simplicity — each tool does one thing well with minimal configuration options.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Occasional users who value simplicity and don't mind the daily task limit. Users willing to pay for a polished premium experience.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">ILovePDF</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">ILovePDF provides 25 tools with a generous free tier that allows more daily tasks than Smallpdf. Free users can process files up to 15MB without watermarks on most operations. The Premium plan ($7/month) adds batch processing, increased file sizes, and priority support. The platform is well-designed with good mobile support.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Budget-conscious users who need moderate daily PDF processing. The mid-range option between free-only and premium platforms.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">PDF24</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">PDF24 is a fully free platform with 30+ tools and no watermarks. Like PDF HUB 24, it requires no registration. It also offers a desktop application for Windows. PDF24's tools cover conversion, editing, and security, though the interface is more functional than polished. The platform is supported by advertising.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Windows users who want a combined online and desktop solution. Users seeking a free alternative with no compromises on core features.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sejda</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">Sejda offers 30+ tools with a free tier limited to 3 tasks per hour, 50MB files, and 200 pages. It adds watermarks on some free conversions. The paid plan ($7.50/month) removes all limits and adds API access. Sejda stands out for its redaction and batch editing capabilities, though the free tier is quite restrictive.</p>
                <p className="text-muted-foreground text-sm leading-relaxed"><strong>Best for:</strong> Users who need specific advanced features like redaction. Developers who want API access at an affordable price.</p>
              </div>
            </div>
          </section>

          <div data-ad-slot="in-content" className="w-full min-h-[90px] flex items-center justify-center my-8 bg-muted/30 rounded-md" data-testid="ad-slot-mid">
            <span className="text-xs text-muted-foreground">Advertisement</span>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Pricing Comparison</h2>
            <Card className="overflow-visible">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-pricing">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left p-3 font-semibold">Platform</th>
                        <th className="text-center p-3 font-semibold">Free Plan</th>
                        <th className="text-center p-3 font-semibold">Paid Plan</th>
                        <th className="text-center p-3 font-semibold">Free Limitations</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-3 font-medium">PDF HUB 24</td><td className="p-3 text-center text-green-600 font-medium">Full Access</td><td className="p-3 text-center">$9/mo (coming)</td><td className="p-3 text-center text-xs">50MB limit</td></tr>
                      <tr className="border-b"><td className="p-3 font-medium">Adobe Acrobat</td><td className="p-3 text-center">Limited</td><td className="p-3 text-center">$19.99/mo</td><td className="p-3 text-center text-xs">Basic tools only</td></tr>
                      <tr className="border-b"><td className="p-3 font-medium">Smallpdf</td><td className="p-3 text-center">2 tasks/day</td><td className="p-3 text-center">$12/mo</td><td className="p-3 text-center text-xs">5MB, watermarks</td></tr>
                      <tr className="border-b"><td className="p-3 font-medium">ILovePDF</td><td className="p-3 text-center">Limited daily</td><td className="p-3 text-center">$7/mo</td><td className="p-3 text-center text-xs">15MB limit</td></tr>
                      <tr className="border-b"><td className="p-3 font-medium">PDF24</td><td className="p-3 text-center text-green-600 font-medium">Full Access</td><td className="p-3 text-center">N/A</td><td className="p-3 text-center text-xs">Ads supported</td></tr>
                      <tr className="border-b"><td className="p-3 font-medium">Sejda</td><td className="p-3 text-center">3/hour</td><td className="p-3 text-center">$7.50/mo</td><td className="p-3 text-center text-xs">Watermarks, 200 pages</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {[
                "PDF HUB 24 offers the most tools (49+) for free without requiring registration or adding watermarks to output files.",
                "Adobe Acrobat provides the most comprehensive paid solution but at the highest price point ($19.99/month).",
                "For purely free usage without compromises, PDF HUB 24 and PDF24 are the best options as both offer full access without daily limits.",
                "Smallpdf and Sejda offer polished experiences but severely limit free-tier usage with daily task caps and watermarks.",
                "ILovePDF represents the best mid-range option for users willing to pay a moderate monthly fee.",
                "All platforms compared provide SSL encryption and some form of file deletion, though policies vary."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Card className="mb-12 overflow-visible bg-muted/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-2">Cite This Comparison</h2>
              <p className="text-sm text-muted-foreground mb-3">If you reference this comparison in your content, please use the following citation:</p>
              <code className="text-xs bg-background p-3 rounded-md block overflow-x-auto">
                PDF HUB 24. "Free PDF Tools Comparison Chart 2026." pdfhub24.com/pdf-comparison-chart. Accessed {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
              </code>
            </CardContent>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-primary" />
              FAQ
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
            <Link href="/all-tools">
              <Button data-testid="button-cta-try-tools">
                Try PDF HUB 24 Free
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
