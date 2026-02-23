import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, FileOutput, FileInput, Upload, Download, Shield, Zap, CheckCircle,
  HelpCircle, ChevronDown, ChevronUp, Globe, Smartphone, Clock, Lock
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

export default function FreePdfConverterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free PDF Converter Online - Convert PDF Files Free | PDF HUB 24",
    description: "Best free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. Convert images and documents to PDF. No signup required.",
    keywords: "free pdf converter, pdf converter online, convert pdf free, pdf to word converter, pdf to jpg converter, word to pdf, image to pdf, convert pdf online free, best pdf converter",
    canonicalPath: "/free-pdf-converter",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF HUB 24 Free PDF Converter",
      "url": `${BASE_URL}/free-pdf-converter`,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "description": "Best free PDF converter online. Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more.",
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
        { "@type": "ListItem", "position": 2, "name": "Free PDF Converter", "item": `${BASE_URL}/free-pdf-converter` }
      ]
    });
    document.head.appendChild(script);
    return () => {
      document.querySelectorAll('script[data-page-schema="true"]').forEach(s => s.remove());
    };
  }, []);

  const fromPdfTools = PDF_TOOLS.filter(t => t.category === "from-pdf");
  const toPdfTools = PDF_TOOLS.filter(t => t.category === "to-pdf");
  const allConversionTools = [...fromPdfTools, ...toPdfTools];

  const faqs = [
    { question: "Is PDF HUB 24's PDF converter really free?", answer: "Yes, our PDF converter is 100% free with no hidden costs, no premium plans, and no limitations. You can convert unlimited files without creating an account or providing any payment information." },
    { question: "What formats can I convert PDF to?", answer: "You can convert PDF to Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, and extract text or images from PDFs. We also offer OCR for scanned documents." },
    { question: "What formats can I convert to PDF?", answer: "We support converting Word (DOCX), Excel (XLSX), PowerPoint (PPTX), JPG, PNG, TIFF, GIF, WebP, and HTML files to PDF format." },
    { question: "Does the converter maintain formatting?", answer: "Yes, our PDF converter uses advanced algorithms to preserve the original document's formatting, fonts, images, and layout as closely as possible. The output quality is comparable to premium PDF tools." },
    { question: "Is there a file size limit for conversion?", answer: "Most files can be converted without issues. We handle standard-size documents efficiently. Very large files may take slightly longer but will still be processed successfully." },
    { question: "Are my files secure during conversion?", answer: "Absolutely. All file transfers use SSL/TLS encryption. Your files are processed in isolated environments and automatically deleted after conversion. We never store or share your documents." },
    { question: "Can I convert multiple files at once?", answer: "You can convert files one at a time for optimal quality. Simply upload your file, wait for conversion, download the result, and then upload the next file. The process is fast and efficient." },
    { question: "How does this compare to Adobe Acrobat converter?", answer: "Adobe Acrobat is excellent desktop software but requires a paid subscription. PDF HUB 24 provides similar conversion quality completely free and online. No downloads, no installation, no subscription fees." }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-free-pdf-converter">
      <Header />
      <main>
        <section className="py-12 sm:py-16 bg-gradient-to-b from-primary/5 to-background border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6">
              <FileOutput className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">Free Online PDF Converter</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Free PDF Converter Online
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Convert PDF files to and from Word, Excel, JPG, PNG, PowerPoint, and more. 
              The best free PDF converter with {allConversionTools.length} conversion tools. No signup, no watermarks, no limits.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pdf-to-word">
                <Button className="gap-2" data-testid="button-hero-pdf-to-word">
                  PDF to Word
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/jpg-to-pdf">
                <Button variant="outline" className="gap-2" data-testid="button-hero-jpg-to-pdf">
                  JPG to PDF
                </Button>
              </Link>
              <Link href="/pdf-to-jpg">
                <Button variant="outline" className="gap-2" data-testid="button-hero-pdf-to-jpg">
                  PDF to JPG
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <FileOutput className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Convert from PDF</h2>
              <span className="text-sm text-muted-foreground">({fromPdfTools.length} tools)</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Convert your PDF files to editable formats like Word, Excel, and PowerPoint, or to image formats like JPG and PNG.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fromPdfTools.map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-converter-${tool.id}`}>
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
              <FileInput className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Convert to PDF</h2>
              <span className="text-sm text-muted-foreground">({toPdfTools.length} tools)</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Convert documents and images to universally compatible PDF format. Supports Word, Excel, PowerPoint, and multiple image formats.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {toPdfTools.map((tool) => (
                <Link key={tool.id} href={tool.path} data-testid={`link-converter-${tool.id}`}>
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
            <h2 className="text-2xl font-bold mb-8 text-center">How Our Free PDF Converter Works</h2>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Upload Your File</h3>
                <p className="text-sm text-muted-foreground">Select a PDF or document from your device. Drag and drop or click to browse.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">2. Instant Conversion</h3>
                <p className="text-sm text-muted-foreground">Our cloud-powered engine converts your file instantly with professional-grade quality.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Download Result</h3>
                <p className="text-sm text-muted-foreground">Download your converted file immediately. It's ready to use, share, or print.</p>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our Free PDF Converter?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-5">
                  <Shield className="w-6 h-6 text-green-500 mb-3" />
                  <h3 className="font-semibold mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">All conversions use SSL encryption. Files are automatically deleted after processing. Your privacy is guaranteed.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Zap className="w-6 h-6 text-orange-500 mb-3" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">Cloud-powered conversion engine processes your files in seconds, not minutes. Get results instantly.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <CheckCircle className="w-6 h-6 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">High Quality Output</h3>
                  <p className="text-sm text-muted-foreground">Professional-grade conversion preserves formatting, fonts, images, and layout from the original document.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Globe className="w-6 h-6 text-purple-500 mb-3" />
                  <h3 className="font-semibold mb-2">Works Everywhere</h3>
                  <p className="text-sm text-muted-foreground">Use our converter on any device - desktop, laptop, tablet, or smartphone. No software installation needed.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Lock className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">No Registration</h3>
                  <p className="text-sm text-muted-foreground">Start converting immediately without creating an account. No email, no password, no hassle.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Smartphone className="w-6 h-6 text-cyan-500 mb-3" />
                  <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                  <p className="text-sm text-muted-foreground">Fully optimized for mobile devices. Convert PDFs on the go from your iPhone, Android, or tablet.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">The Best Free PDF Converter Online</h2>
              <p>
                PDF HUB 24 offers the most comprehensive free PDF converter available online. With {allConversionTools.length} specialized conversion tools, 
                you can handle any document format transformation without spending a penny. Our converter supports all major formats including 
                <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> PDF</a>, 
                Microsoft Word (DOCX), Excel (XLSX), PowerPoint (PPTX), and popular image formats like JPG, PNG, TIFF, GIF, and WebP.
              </p>
              <p>
                The <a href="https://en.wikipedia.org/wiki/PDF" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Portable Document Format</a> was 
                created by Adobe Systems in 1993 and has since become the international standard for document exchange, formalized as 
                <a href="https://www.iso.org/standard/75839.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> ISO 32000</a>. 
                Our free PDF converter fully supports the latest PDF specifications, ensuring accurate and reliable conversions every time.
              </p>
              <p>
                Unlike premium tools like <a href="https://www.adobe.com/acrobat/about-adobe-pdf.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Adobe Acrobat</a>, 
                PDF HUB 24 requires no subscription, no downloads, and no installation. Simply visit the tool page, upload your file, and download the converted 
                result in seconds. Whether you're a student converting lecture notes, a professional preparing business documents, or anyone who needs quick 
                PDF conversion, our free converter has you covered.
              </p>
              <p>
                Looking for more than just conversion? Check out our <Link href="/free-pdf-editor" className="text-primary hover:underline">free PDF editor</Link> for 
                tools to merge, split, compress, sign, and annotate your PDFs. Or browse our 
                <Link href="/all-tools" className="text-primary hover:underline"> complete list of 43+ PDF tools</Link> for every PDF need imaginable.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-14">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions About PDF Conversion</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  id={`converter-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </section>

          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Convert Your PDFs?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Choose a conversion tool above and start converting for free. No signup required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/all-tools">
                <Button variant="outline" className="gap-2" data-testid="link-all-tools-from-converter">
                  View All 43+ Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/free-pdf-editor">
                <Button variant="outline" className="gap-2" data-testid="link-editor-from-converter">
                  PDF Editor Tools
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
