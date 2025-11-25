import { useState } from "react";
import { ChevronLeft, Download, Copy } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function ExtractTextPage() {
  useSEO({
    title: "Extract Text from PDF Online Free - PDF Text Extractor | PDF HUB 24",
    description: "Extract text from PDF files online for free. Copy text content from your PDF documents. Fast, accurate text extraction. No registration required.",
    keywords: "extract text from pdf, pdf to text, get text from pdf, pdf text extractor, copy text from pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleExtract = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const data = await runWithProgress(async () => {
        const response = await fetch("/api/extract-text", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to extract text");
        }

        return await response.json();
      });

      setExtractedText(data.text);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Text extracted successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to extract text. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const handleDownloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Extract Text from PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Extract all text content from your PDF document. The text will be displayed here and can be downloaded as a .txt file.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleExtract} 
                className="w-full"
                size="lg"
                data-testid="button-extract"
              >
                Extract Text
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Extracting text from PDF..." : undefined}
            />

            {status === "success" && extractedText && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Extracted Text</h3>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCopy} 
                      variant="outline"
                      size="sm"
                      data-testid="button-copy"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button 
                      onClick={handleDownloadText} 
                      variant="outline"
                      size="sm"
                      data-testid="button-download-text"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[300px] font-mono text-sm"
                  data-testid="textarea-extracted-text"
                />
                <p className="text-xs text-muted-foreground">
                  {extractedText.length} characters extracted
                </p>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Extract Text from PDF"
            toolDescription="Pull all text content from your PDF documents with our free online text extractor. Whether you need to copy content for editing, search through document text, or extract data for analysis, our tool quickly extracts readable text from any PDF. Copy directly to clipboard or download as a text file."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Click the Extract Text button to process your document.",
              "View the extracted text in the text area that appears.",
              "Copy the text to your clipboard or download as a .txt file."
            ]}
            benefits={[
              "Extract all readable text from any PDF",
              "Copy text directly to your clipboard with one click",
              "Download extracted text as a .txt file",
              "See character count for extracted content",
              "Works with multi-page documents",
              "Preserves paragraph structure where possible",
              "Fast extraction even for large documents",
              "No registration or signup required"
            ]}
            faqs={[
              {
                question: "Can I extract text from scanned PDFs?",
                answer: "Our tool extracts text that is stored as text in the PDF. For scanned documents (which are essentially images), text extraction may be limited. For best results, use PDFs with selectable text."
              },
              {
                question: "Will formatting be preserved?",
                answer: "The tool extracts plain text content. Formatting like bold, italics, and fonts is not preserved, as the output is plain text. However, paragraph breaks and basic structure are maintained."
              },
              {
                question: "What if my PDF has images with text?",
                answer: "Text within images cannot be extracted by this tool. Only text that is stored as actual text characters in the PDF can be extracted."
              },
              {
                question: "How do I use the extracted text?",
                answer: "Click 'Copy' to copy all text to your clipboard, then paste it anywhere (Word, email, notes). Alternatively, click 'Download' to save as a .txt file you can open in any text editor."
              },
              {
                question: "Is there a page limit for text extraction?",
                answer: "No, you can extract text from PDFs of any length. The tool processes all pages and combines the text into a single output."
              }
            ]}
            keywords={["get text from pdf", "copy pdf text", "pdf to plain text"]}
          />
          
          <RelatedTools currentToolId="extract-text" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
