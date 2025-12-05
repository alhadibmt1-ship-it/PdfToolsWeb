import { useState } from "react";
import { ChevronLeft, Download, FileCode } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function HtmlToPdfPage() {
  useSEO({
    title: "HTML to PDF Converter - Convert HTML to PDF Online Free | PDF HUB 24",
    description: "Convert HTML code to PDF documents online for free. Transform web pages and HTML content into professional PDF files. Fast, secure, no registration required.",
    keywords: "html to pdf, convert html to pdf, html to pdf converter, web page to pdf, html pdf generator"
  });

  const [htmlContent, setHtmlContent] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleConvert = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some HTML content to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/html-to-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: htmlContent }),
        });

        if (!response.ok) {
          throw new Error("Failed to convert HTML to PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "HTML converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert HTML to PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "converted.pdf";
      a.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">HTML to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your HTML code into a professional PDF document. Paste your HTML below and download the result.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            {status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Enter HTML Content</h3>
                </div>
                <Textarea
                  placeholder="<html>\n  <body>\n    <h1>Hello World</h1>\n    <p>This is my PDF content.</p>\n  </body>\n</html>"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="input-html"
                />
                <Button 
                  onClick={handleConvert} 
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  Convert to PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting HTML to PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setStatus("idle");
                    setResultUrl(null);
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Convert Another
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="HTML to PDF Converter"
            toolDescription="Transform your HTML code into professional PDF documents with our free online converter. Our tool renders your HTML structure, CSS styles, and formatting exactly as intended, creating high-quality PDF output. Perfect for developers, designers, and content creators who need to generate PDFs from web content, reports, invoices, or documentation."
            howToSteps={[
              "Paste your HTML content (including any inline CSS) into the text area.",
              "Review your code and ensure all styles are included inline or in a style tag.",
              "Click 'Convert to PDF' to render and generate your document.",
              "Download your professionally formatted PDF file."
            ]}
            benefits={[
              "Convert any HTML code to PDF instantly online",
              "Preserves CSS styling, fonts, and formatting",
              "Perfect for generating reports and documentation",
              "Supports inline styles, style tags, and HTML5 elements",
              "Ideal for invoices, certificates, and templates",
              "No software installation or registration required",
              "Works on all devices including mobile and tablet",
              "Fast processing with instant download",
              "Completely free with unlimited conversions"
            ]}
            faqs={[
              {
                question: "What HTML features and elements are supported?",
                answer: "Our converter supports all standard HTML5 elements including tables, lists, headings, paragraphs, divs, and spans. Inline CSS styles and style tags are fully rendered. Complex JavaScript interactions are not supported."
              },
              {
                question: "Can I include CSS styling in my HTML?",
                answer: "Yes! Include inline styles on elements or add a style tag in your HTML head section. External stylesheets (linked CSS files) are not supported, but you can copy the CSS rules into a style tag within your HTML."
              },
              {
                question: "Is there a size limit for HTML content?",
                answer: "There's no strict character limit, but very large HTML documents may take longer to process. For best results and faster conversion, keep your content focused and remove unnecessary code."
              },
              {
                question: "Can I include images in my HTML?",
                answer: "External image URLs are not supported. For images, use base64-encoded data URLs (data:image/png;base64,...) embedded directly in your HTML img tags. This ensures images appear in your PDF."
              },
              {
                question: "What's the best way to format my HTML for PDF output?",
                answer: "Use clear HTML structure with proper semantic elements. Include all styles inline or in a style tag. Set explicit widths, fonts, and colors. Test with simple content first, then add complexity."
              }
            ]}
            keywords={["html to pdf", "convert html to pdf", "web page to pdf", "html to pdf converter", "html pdf generator"]}
            relatedLinks={[
              { text: "Convert Word documents using Word to PDF", href: "/word-to-pdf" },
              { text: "Create PDFs from images using JPG to PDF", href: "/jpg-to-pdf" },
              { text: "Combine PDFs using Merge PDF", href: "/merge" },
              { text: "Reduce file size using Compress PDF", href: "/compress" }
            ]}
            extraSections={[
              {
                title: "Why Convert HTML to PDF?",
                content: "HTML to PDF conversion is essential for many professional and development workflows:",
                items: [
                  "Generate printable reports from web applications",
                  "Create invoices and receipts from HTML templates",
                  "Archive web content in a portable format",
                  "Produce documentation from HTML sources",
                  "Share styled content without requiring a browser",
                  "Create certificates and official documents"
                ]
              },
              {
                title: "Common Use Cases for HTML to PDF",
                content: "Developers and businesses use our HTML to PDF converter for various purposes:",
                items: [
                  "Generating dynamic invoices from e-commerce systems",
                  "Creating PDF reports from dashboard data",
                  "Producing styled email templates as PDFs",
                  "Building resume and CV generators",
                  "Archiving web articles and blog posts",
                  "Creating printable certificates and awards"
                ]
              }
            ]}
            exampleTable={{
              title: "HTML to PDF Conversion Examples",
              rows: [
                { label: "Simple Invoice Template", before: "5 KB HTML", after: "45 KB PDF" },
                { label: "Styled Report (10 pages)", before: "25 KB HTML", after: "180 KB PDF" },
                { label: "Certificate with Styling", before: "8 KB HTML", after: "65 KB PDF" },
                { label: "Product Catalog Page", before: "15 KB HTML", after: "120 KB PDF" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="html-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
