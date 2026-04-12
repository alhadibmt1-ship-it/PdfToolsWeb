import { useState } from "react";
import { ChevronLeft, Download, FileText, ArrowRight, Shield, Lock, Trash2, Eye, Scale, Zap, CheckCircle2, RefreshCw, FileDown } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import CloudImportBar from "@/components/CloudImportBar";
import ProcessingState from "@/components/ProcessingState";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { getToolSEOData } from "@/data/toolSEOData";

export default function PdfToWordPage() {
  useSEO({
    title: "PDF to Word Free Online (No Email, No Watermark) | PDF HUB 24",
    description: "Convert PDF to editable Word (DOCX) instantly. Free PDF to Word converter online with no email, no watermark, secure and fast. Works on all devices.",
    keywords: "pdf to word converter free, convert pdf to word online, pdf to docx free, editable word from pdf, free pdf converter no email, secure pdf to word tool",
    canonicalPath: "/pdf-to-word"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-word", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to Word successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "converted.docx";
      a.click();
    }
  };

  const seoData = getToolSEOData("pdf-to-word");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </div>
          </Link>

          {/* AdSense Top Banner */}
          <div className="mb-6" data-ad-slot="top-banner" />

          <section className="mb-8" aria-label="Tool introduction">
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-page-title">
              Convert PDF to Word Free Online – Editable DOCX in Seconds
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
              Transform any PDF into a fully editable Word document (DOCX) instantly. No email required, no watermarks, no signup — just fast, secure, and accurate <Link href="/pdf-to-word" className="text-primary hover:underline">PDF to Word conversion</Link> that works on all devices.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <Button size="lg" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-cta-hero">
                <FileText className="w-4 h-4 mr-2" />
                Convert PDF to Word Now
              </Button>
              <Link href="/word-to-pdf">
                <Button variant="outline" size="lg" data-testid="link-cta-hero-reverse">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Word to PDF
                </Button>
              </Link>
            </div>
            <TrustBadges />
          </section>

          <section id="upload-section" className="space-y-6 mb-10" aria-label="PDF to Word converter tool">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />
            <CloudImportBar accept="pdf" onFileImported={(file) => setFiles([file])} />

            {files.length > 0 && status === "idle" && (
              <Button
                onClick={handleConvert}
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                <FileText className="w-4 h-4 mr-2" />
                Convert PDF to Word Now
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting PDF to Word..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your Word document is ready!</h3>
                <Button
                  onClick={handleDownload}
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download DOCX File
                </Button>
              </div>
            )}
          </section>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/word-to-pdf" className="flex-1">
              <Button variant="outline" className="w-full" size="lg" data-testid="link-cta-word-to-pdf">
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert Word Back to PDF
              </Button>
            </Link>
            <Link href="/compress" className="flex-1">
              <Button variant="outline" className="w-full" size="lg" data-testid="link-cta-compress">
                <FileDown className="w-4 h-4 mr-2" />
                Compress PDF After Editing
              </Button>
            </Link>
          </div>

          <section className="mb-10" aria-label="Why convert PDF to Word">
            <h2 className="text-2xl font-bold mb-4">Why Convert PDF to Word?</h2>
            <p className="text-muted-foreground mb-4">
              PDFs are designed for sharing and printing, but editing them directly is often difficult. Converting PDF to Word unlocks the content so you can modify text, update tables, adjust formatting, and repurpose the document for new projects. Whether you need to edit a contract, update a resume, or extract content from a report, our free <Link href="/pdf-to-word" className="text-primary hover:underline">PDF to Word converter</Link> makes it simple.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Edit contracts and legal documents",
                "Update resumes and CVs saved as PDF",
                "Repurpose content from PDF reports",
                "Correct errors in finalized documents",
                "Extract text and tables for analysis",
                "Translate documents while keeping layout"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10" aria-label="How to convert PDF to Word">
            <h2 className="text-2xl font-bold mb-4">How to Convert PDF to Word (Step-by-Step)</h2>
            <div className="space-y-4">
              {[
                { step: "1. Upload Your PDF", detail: "Drag and drop your PDF file into the upload area above, or click to browse. We support files up to 50MB." },
                { step: "2. Click Convert", detail: "Press the \"Convert PDF to Word Now\" button. Our system analyzes the document structure, preserving formatting, tables, and images." },
                { step: "3. Download Your DOCX", detail: "Once conversion completes, click download. Open your .docx file in Microsoft Word, Google Docs, LibreOffice, or any word processor." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.step}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Having trouble with scanned PDFs? Try our <Link href="/ocr-pdf" className="text-primary hover:underline">OCR PDF tool</Link> first to extract text from scanned documents. For more tips, read our guide on <Link href="/blog/convert-pdf-to-word-without-losing-formatting" className="text-primary hover:underline">converting PDF to Word without losing formatting</Link>.
            </p>
          </section>

          <section className="mb-10" aria-label="Why choose PDF HUB 24">
            <h2 className="text-2xl font-bold mb-4">Why Choose PDF HUB 24?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "Fast Conversion", desc: "Convert PDFs to Word in seconds, not minutes. Our optimized engine handles even large documents quickly." },
                { icon: CheckCircle2, title: "No Email Required", desc: "Start converting immediately — no email, no account signup, no personal information needed." },
                { icon: FileText, title: "No Watermarks", desc: "Your converted Word documents are completely clean with no watermarks or branding added." },
                { icon: Shield, title: "SSL Encrypted", desc: "All file transfers use 256-bit SSL encryption to keep your documents safe and private." },
                { icon: RefreshCw, title: "Preserves Formatting", desc: "Tables, images, headers, fonts, and layouts are accurately preserved during conversion." },
                { icon: Scale, title: "100% Free", desc: "No hidden fees, no premium tiers, no page limits. Unlimited free PDF to Word conversion." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10" aria-label="Common PDF to Word issues and fixes">
            <h2 className="text-2xl font-bold mb-4">Common PDF to Word Issues & Fixes</h2>
            <div className="space-y-3">
              {[
                { problem: "Formatting looks different in Word", fix: "Complex PDF layouts with multiple columns or heavy design elements may need minor adjustments. For best results, use PDFs with standard text-based layouts." },
                { problem: "Scanned PDF produces unreadable text", fix: "Scanned PDFs contain images, not real text. Use our OCR PDF tool first to extract text, then convert to Word." },
                { problem: "Tables are misaligned after conversion", fix: "Complex nested tables may need manual adjustment. Simple and standard table structures convert accurately." },
                { problem: "Images are missing from the Word file", fix: "Ensure the original PDF has properly embedded images. Very large or vector-based images may need to be re-inserted." }
              ].map((item, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{item.problem}</h3>
                    <p className="text-xs text-muted-foreground">{item.fix}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Need to extract text without formatting? Try <Link href="/extract-text" className="text-primary hover:underline">Extract Text from PDF</Link>. For scanned documents, check out our <Link href="/blog/ocr-scanned-pdf-to-text" className="text-primary hover:underline">guide to OCR scanned PDFs</Link>.
            </p>
          </section>

          <section className="mb-10" aria-label="Complete PDF workflows">
            <h2 className="text-2xl font-bold mb-4">Complete PDF Workflows</h2>
            <p className="text-muted-foreground mb-4">
              PDF to Word conversion is often just one step in a larger document workflow. Here are common workflows our users follow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">Edit & Re-export Workflow</h3>
                  <p className="text-xs text-muted-foreground mb-2">Convert PDF to Word, make your edits, then convert back to PDF.</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/pdf-to-word" className="text-xs text-primary hover:underline">PDF to Word</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/word-to-pdf" className="text-xs text-primary hover:underline">Word to PDF</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/compress" className="text-xs text-primary hover:underline">Compress PDF</Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">Scanned Document Editing</h3>
                  <p className="text-xs text-muted-foreground mb-2">OCR your scanned PDF, then convert to editable Word format.</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/ocr-pdf" className="text-xs text-primary hover:underline">OCR PDF</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/pdf-to-word" className="text-xs text-primary hover:underline">PDF to Word</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/word-to-pdf" className="text-xs text-primary hover:underline">Word to PDF</Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">Multi-Format Extraction</h3>
                  <p className="text-xs text-muted-foreground mb-2">Extract different content types from your PDF documents.</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/pdf-to-word" className="text-xs text-primary hover:underline">PDF to Word</Link>
                    <Link href="/pdf-to-excel" className="text-xs text-primary hover:underline">PDF to Excel</Link>
                    <Link href="/extract-images" className="text-xs text-primary hover:underline">Extract Images</Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2">Document Comparison</h3>
                  <p className="text-xs text-muted-foreground mb-2">Convert, edit, and compare different PDF versions side by side.</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/pdf-to-word" className="text-xs text-primary hover:underline">PDF to Word</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/word-to-pdf" className="text-xs text-primary hover:underline">Word to PDF</Link>
                    <ArrowRight className="w-3 h-3 text-muted-foreground mt-0.5" />
                    <Link href="/compare-pdf" className="text-xs text-primary hover:underline">Compare PDF</Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Want to reduce file size before emailing? Read our guide on <Link href="/blog/how-to-compress-pdf-for-email" className="text-primary hover:underline">compressing PDF for email</Link>.
            </p>
          </section>

          <section className="mb-10" aria-label="Security and privacy">
            <h2 className="text-2xl font-bold mb-4">Security & Privacy</h2>
            <Card>
              <CardContent className="p-5">
                <p className="text-muted-foreground text-sm mb-4">
                  Your documents are safe with PDF HUB 24. We take privacy seriously and follow strict security practices to protect every file you upload.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Lock, label: "SSL encryption on all file transfers" },
                    { icon: Trash2, label: "Automatic file deletion after conversion" },
                    { icon: Shield, label: "No permanent file storage on our servers" },
                    { icon: Eye, label: "No human access to uploaded documents" },
                    { icon: Scale, label: "GDPR compliant data processing" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Read our full <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for complete details on how we handle your data.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* AdSense In Content */}
          <div className="mb-10" data-ad-slot="in-content" />

          <section className="mb-10" aria-label="Frequently asked questions">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {(seoData?.faqs || []).map((faq, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-10" aria-label="Related PDF tools">
            <h2 className="text-2xl font-bold mb-4">Related PDF Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {[
                { name: "Word to PDF", href: "/word-to-pdf", desc: "Convert Word back to PDF" },
                { name: "OCR PDF", href: "/ocr-pdf", desc: "Extract text from scans" },
                { name: "PDF to Excel", href: "/pdf-to-excel", desc: "Convert tables to Excel" },
                { name: "PDF to JPG", href: "/pdf-to-jpg", desc: "Convert pages to images" },
                { name: "PDF to PNG", href: "/pdf-to-png", desc: "Pages to PNG images" },
                { name: "PDF to PowerPoint", href: "/pdf-to-ppt", desc: "Convert to PPT slides" },
                { name: "Merge PDF", href: "/merge", desc: "Combine multiple PDFs" },
                { name: "Split PDF", href: "/split", desc: "Extract specific pages" },
                { name: "Compress PDF", href: "/compress", desc: "Reduce PDF file size" },
                { name: "Extract Text", href: "/extract-text", desc: "Get plain text from PDF" },
                { name: "PDF Viewer", href: "/pdf-viewer", desc: "View PDF in browser" },
                { name: "Compare PDF", href: "/compare-pdf", desc: "Find differences" }
              ].map((tool, i) => (
                <Link key={i} href={tool.href}>
                  <Card className="hover-elevate cursor-pointer h-full">
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground">{tool.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10" aria-label="Final call to action">
            <Card>
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Ready to Convert Your PDF?</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Upload your PDF above and get an editable Word document in seconds — completely free, no email needed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-testid="button-cta-bottom">
                    <FileText className="w-4 h-4 mr-2" />
                    Convert PDF to Word Now
                  </Button>
                  <Link href="/word-to-pdf">
                    <Button variant="outline" size="lg" data-testid="link-cta-bottom-word-to-pdf">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Convert Word Back to PDF
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AdSense Bottom */}
          <div className="mb-10" data-ad-slot="bottom" />

          <EnhancedToolSEOContent toolId="pdf-to-word" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
