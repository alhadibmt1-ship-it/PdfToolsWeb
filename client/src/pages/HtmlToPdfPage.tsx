import { useState } from "react";
import { ChevronLeft, Download, FileCode } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function HtmlToPdfPage() {
  useSEO({
    title: "HTML to PDF Free Online - Convert HTML to PDF | PDF HUB 24",
    description: "Convert HTML to PDF free online. Transform HTML code to PDF documents. Best free HTML to PDF converter - webpage to PDF. No signup.",
    keywords: "html to pdf free, convert html to pdf, html to pdf converter free, webpage to pdf, html to pdf online",
    canonicalPath: "/html-to-pdf"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("html-to-pdf")?.longTailH1 || "HTML to PDF"}</h1>
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

          <EnhancedToolSEOContent toolId="html-to-pdf" />
          
          <RelatedTools currentToolId="html-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
