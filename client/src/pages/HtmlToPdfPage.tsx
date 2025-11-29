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
            toolDescription="Transform your HTML code into professional PDF documents with our free online HTML to PDF converter. Whether you're creating reports, invoices, or documentation, our tool preserves your HTML structure, styles, and formatting. Simply paste your HTML code and download a high-quality PDF instantly."
            howToSteps={[
              "Paste your HTML content into the text area above.",
              "Include any inline CSS styles for formatting.",
              "Click the Convert to PDF button to process.",
              "Download your generated PDF document."
            ]}
            benefits={[
              "Convert any HTML code to PDF instantly",
              "Preserves CSS styling and formatting",
              "Perfect for reports and documentation",
              "Supports inline styles and basic CSS",
              "No software installation required",
              "Works on all devices and browsers",
              "Completely free with no limits",
              "Secure processing in your browser"
            ]}
            faqs={[
              {
                question: "What HTML features are supported?",
                answer: "Our converter supports standard HTML5 elements, inline CSS styles, and basic formatting. Complex JavaScript or external resources may not render correctly."
              },
              {
                question: "Can I include CSS styling?",
                answer: "Yes! You can include inline styles or a style tag within your HTML. External stylesheets are not supported, but you can copy the CSS into a style tag."
              },
              {
                question: "Is there a size limit for HTML content?",
                answer: "There's no strict limit, but very large HTML documents may take longer to process. For best results, keep your content focused and well-structured."
              },
              {
                question: "Can I convert entire web pages?",
                answer: "You can paste the HTML source of a web page, but external resources like images from URLs won't be included. For best results, use self-contained HTML with base64-encoded images."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["html to pdf", "convert html", "web to pdf", "html converter"]}
          />
          
          <RelatedTools currentToolId="html-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
