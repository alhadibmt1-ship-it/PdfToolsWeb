import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, FileEdit, Wrench, Upload, Download, Shield, Zap, CheckCircle,
  HelpCircle, ChevronDown, ChevronUp, Globe, Smartphone, Lock, Layers
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { PDF_TOOLS } from "@shared/schema";

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

export default function FreePdfEditorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free PDF Editor Online - Edit PDF Files Free | PDF HUB 24",
    description: "Best free online PDF editor. Edit, merge, split, compress, rotate, sign, annotate, and redact PDF files. No software download or registration needed.",
    keywords: "free pdf editor, pdf editor online, edit pdf free, merge pdf, split pdf, compress pdf, sign pdf, annotate pdf, redact pdf, online pdf editor free, best free pdf editor",
    canonicalPath: "/edit-pdf",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF HUB 24 Free PDF Editor",
      "url": `${BASE_URL}/edit-pdf`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "description": "Best free online PDF editor. Edit, merge, split, compress, rotate, sign, annotate, and redact PDF files.",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Free PDF Editor", "item": `${BASE_URL}/edit-pdf` }
      ]
    });
    document.head.appendChild(script);
    return () => {
      document.querySelectorAll('script[data-page-schema="true"]').forEach(s => s.remove());
    };
  }, []);

  const editPdfTools = PDF_TOOLS.filter(t => t.category === "edit-pdf");
  const utilityTools = PDF_TOOLS.filter(t => t.category === "utility");
  const allEditorTools = [...editPdfTools, ...utilityTools];

  const faqs = [
    { question: "Is PDF HUB 24's PDF editor really free?", answer: "Yes, our PDF editor is 100% free with no hidden costs. All 26+ editing and utility tools are available without any subscription, trial period, or premium tier. Use them as many times as you need." },
    { question: "What can I do with the free PDF editor?", answer: "You can merge, split, compress, rotate, crop, resize, sign, annotate, redact, add watermarks, add page numbers, delete pages, reorder pages, protect with passwords, unlock, flatten, convert to grayscale, repair damaged files, and much more." },
    { question: "Do I need to download software to edit PDFs?", answer: "No. PDF HUB 24 works entirely in your web browser. There's nothing to download, install, or update. Just visit the tool page, upload your PDF, make your edits, and download the result." },
    { question: "Can I edit PDFs on my mobile phone?", answer: "Absolutely! All our PDF editing tools are fully responsive and optimized for mobile devices. Whether you're using an iPhone, Android phone, iPad, or any tablet, you can edit PDFs on the go." },
    { question: "Is my PDF data safe when editing online?", answer: "Yes. We use SSL/TLS encryption for all file transfers. Your PDFs are processed in isolated secure environments and automatically deleted after processing. We never store, view, or share your documents." },
    { question: "Can I merge multiple PDF files into one?", answer: "Yes! Our Merge PDF tool lets you combine multiple PDF files into a single document. Simply upload your files, arrange them in the desired order, and download the merged PDF. It's fast and maintains the original quality." },
    { question: "How does the PDF compression work?", answer: "Our Compress PDF tool reduces file size by optimizing images, fonts, and internal PDF structures. You can choose between low, medium, and high compression levels. Most users achieve 50-90% size reduction without visible quality loss." },
    { question: "How does this compare to Adobe Acrobat editor?", answer: "Adobe Acrobat Pro DC is powerful desktop software that costs $19.99/month. PDF HUB 24 offers similar core editing functionality completely free and online. For everyday PDF editing tasks, our tools deliver professional results without any cost." }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-free-pdf-editor">
      <Header />
      <main>
        <section className="py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6">
              <FileEdit className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">Free Online PDF Editor</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Free PDF Editor Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Edit, merge, split, compress, sign, annotate, and modify PDF files for free. 
              {allEditorTools.length} powerful editing and utility tools with no signup and no downloads required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/merge-pdf">
                <Button className="gap-2" data-testid="button-hero-merge">
                  Merge PDF
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/compress-pdf">
                <Button variant="outline" className="gap-2" data-testid="button-hero-compress">
                  Compress PDF
                </Button>
              </Link>
              <Link href="/sign-pdf">
                <Button variant="outline" className="gap-2" data-testid="button-hero-sign">
                  Sign PDF
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <FileEdit className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">PDF Editing Tools</h2>
              <span className="text-sm text-muted-foreground">({editPdfTools.length} tools)</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Comprehensive tools to modify, organize, secure, and enhance your PDF documents. From merging and splitting to signing and redacting.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {editPdfTools.map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-editor-${tool.id}`}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-5 flex items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{tool.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Utility & Image Tools</h2>
              <span className="text-sm text-muted-foreground">({utilityTools.length} tools)</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Additional tools for viewing PDFs, comparing documents, and processing images. Compress, resize, crop, rotate, and convert images.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {utilityTools.map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-editor-${tool.id}`}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-5 flex items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1">{tool.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-8 text-center">How to Edit PDF Files for Free</h2>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Choose a Tool</h3>
                <p className="text-sm text-muted-foreground">Select the editing tool you need from our collection above, then upload your PDF file.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Make Your Edits</h3>
                <p className="text-sm text-muted-foreground">Configure options, adjust settings, and let our tools process your PDF with professional precision.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Download Result</h3>
                <p className="text-sm text-muted-foreground">Download your edited PDF immediately. The file is ready to use, share, print, or archive.</p>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Free PDF Editor?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-5">
                  <Shield className="w-6 h-6 text-green-500 mb-3" />
                  <h3 className="font-semibold mb-2">Bank-Level Security</h3>
                  <p className="text-sm text-muted-foreground">SSL/TLS encryption protects every file transfer. Documents are processed in isolation and automatically deleted. Your data never touches third-party servers.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Zap className="w-6 h-6 text-orange-500 mb-3" />
                  <h3 className="font-semibold mb-2">Instant Processing</h3>
                  <p className="text-sm text-muted-foreground">Our cloud infrastructure processes your edits in seconds. No waiting, no queues. Upload, edit, and download in one seamless workflow.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <CheckCircle className="w-6 h-6 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">Professional Quality</h3>
                  <p className="text-sm text-muted-foreground">Every edit preserves your document's integrity. Fonts, images, formatting, and metadata remain intact through every operation.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Globe className="w-6 h-6 text-purple-500 mb-3" />
                  <h3 className="font-semibold mb-2">No Installation Required</h3>
                  <p className="text-sm text-muted-foreground">Works entirely in your browser. No software to download, no plugins to install, no system requirements to worry about.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Lock className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Completely Free</h3>
                  <p className="text-sm text-muted-foreground">All {allEditorTools.length} editing and utility tools are free. No trial periods, no feature locks, no watermarks on your documents.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Smartphone className="w-6 h-6 text-cyan-500 mb-3" />
                  <h3 className="font-semibold mb-2">Mobile Optimized</h3>
                  <p className="text-sm text-muted-foreground">Edit PDFs from any device. Our tools are fully responsive and work beautifully on phones, tablets, and desktop computers.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">The Best Free Online PDF Editor</h2>
              <p>
                PDF HUB 24 provides the most comprehensive free PDF editor available online. With {editPdfTools.length} dedicated editing tools and 
                {utilityTools.length} utility tools, you have everything you need to modify, organize, and enhance your PDF documents without any cost.
              </p>
              <p>
                Our editor supports the full range of PDF operations defined by the 
                <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ISO 32000 PDF standard</a>. 
                Whether you need to <Link href="/merge-pdf" className="text-primary hover:underline">merge multiple PDFs</Link> into one document, 
                <Link href="/split-pdf" className="text-primary hover:underline"> split a PDF</Link> into separate files, or 
                <Link href="/compress-pdf" className="text-primary hover:underline"> compress a PDF</Link> for email, 
                our tools deliver professional results every time.
              </p>
              <p>
                Security is paramount when editing sensitive documents. PDF HUB 24 uses AES-256 encryption for 
                <Link href="/protect-pdf" className="text-primary hover:underline"> PDF protection</Link> and offers 
                <Link href="/redact-pdf" className="text-primary hover:underline"> PDF redaction</Link> to permanently remove 
                confidential information. All file transfers are encrypted with SSL/TLS, and documents are automatically deleted after processing.
              </p>
              <p>
                The <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portable Document Format (PDF)</a> was 
                originally developed by <a href="https://www.adobe.com/acrobat/about-adobe-pdf.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Adobe</a> and 
                has become the universal standard for sharing documents. While Adobe Acrobat Pro DC costs $19.99/month, PDF HUB 24 provides similar core editing 
                functionality at absolutely no cost. Our tools handle merging, splitting, compressing, rotating, signing, annotating, redacting, and many more 
                operations that professionals and students use daily.
              </p>
              <p>
                Need to convert files instead? Check out our <Link href="/free-pdf-converter" className="text-primary hover:underline">free PDF converter</Link> for 
                converting between PDF, Word, Excel, JPG, and more. Or browse our 
                <Link href="/all-tools" className="text-primary hover:underline"> complete list of 49+ PDF tools</Link> to find exactly what you need.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions About PDF Editing</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  id={`editor-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </section>

          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Start Editing Your PDFs for Free</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Choose an editing tool above and get started instantly. No downloads, no signups, no fees.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/all-tools">
                <Button variant="outline" className="gap-2" data-testid="link-all-tools-from-editor">
                  View All 49+ Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/free-pdf-converter">
                <Button variant="outline" className="gap-2" data-testid="link-converter-from-editor">
                  PDF Converter Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
