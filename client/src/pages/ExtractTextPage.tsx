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
            toolDescription="Pull all text content from your PDF documents with our free online text extractor. Whether you need to copy content for editing, search through document text, or extract data for analysis, our tool quickly extracts readable text from any PDF. Copy directly to clipboard with one click or download as a plain text file — perfect for repurposing content, research, and data processing."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Click the 'Extract Text' button to process your document.",
              "View the extracted text in the text area — see the character count displayed.",
              "Copy the text to your clipboard or download as a .txt file for further use."
            ]}
            benefits={[
              "Extract all readable text from any PDF instantly",
              "Copy text directly to your clipboard with one click",
              "Download extracted text as a .txt file",
              "See character count for extracted content",
              "Works with multi-page documents of any length",
              "Preserves paragraph structure where possible",
              "Fast extraction even for large documents",
              "No registration or signup required",
              "Completely free with no hidden costs"
            ]}
            faqs={[
              {
                question: "Can I extract text from scanned PDFs?",
                answer: "Our Extract Text tool works with PDFs that have selectable text (native text). For scanned documents (which are essentially images), text extraction will be limited or not possible. For scanned PDFs, use our OCR PDF tool instead, which uses optical character recognition to read text from images."
              },
              {
                question: "Will formatting be preserved?",
                answer: "The tool extracts plain text content only. Formatting like bold, italics, fonts, and colors is not preserved, as the output is plain text. However, paragraph breaks, line spacing, and basic structure are maintained to keep the content readable."
              },
              {
                question: "What if my PDF has images with text?",
                answer: "Text within images (such as logos, diagrams, or scanned content) cannot be extracted by this tool. Only text that is stored as actual text characters in the PDF can be extracted. For text in images, use our OCR PDF tool."
              },
              {
                question: "How do I use the extracted text?",
                answer: "Click 'Copy' to copy all text to your clipboard instantly, then paste it anywhere — Word documents, emails, notes, or any text editor. Alternatively, click 'Download' to save as a .txt file you can open in any text editor or word processor."
              },
              {
                question: "Is there a page limit for text extraction?",
                answer: "No, you can extract text from PDFs of any length — whether it's 1 page or 1000 pages. The tool processes all pages and combines the text into a single output, making it easy to work with the complete content."
              }
            ]}
            keywords={["extract text from pdf", "pdf to text", "copy pdf text", "pdf text extractor", "get text from pdf"]}
            relatedLinks={[
              { text: "Use OCR PDF for scanned documents", href: "/ocr-pdf" },
              { text: "Convert to Word format using PDF to Word", href: "/pdf-to-word" },
              { text: "Extract tabular data using PDF to Excel", href: "/pdf-to-excel" },
              { text: "Extract embedded images using Extract Images", href: "/extract-images" }
            ]}
            extraSections={[
              {
                title: "Why Extract Text from PDF?",
                content: "Extracting text makes PDF content accessible and reusable for various purposes.",
                items: [
                  "Copy content for research and citations",
                  "Reuse text in new documents or presentations",
                  "Search and analyze document content",
                  "Translate PDF content to other languages",
                  "Create summaries and notes from documents"
                ]
              },
              {
                title: "Common Use Cases",
                content: "Our text extraction tool is used by professionals, students, and researchers:",
                items: [
                  "Researchers extracting quotes and citations",
                  "Students copying content for study notes",
                  "Writers repurposing content from published materials",
                  "Data analysts extracting information for processing",
                  "Translators preparing content for translation",
                  "Anyone needing quick access to PDF text content"
                ]
              }
            ]}
            exampleTable={{
              title: "Text Extraction Examples",
              rows: [
                { label: "Research Paper (30 pages)", before: "PDF document", after: "30,000+ characters extracted" },
                { label: "Contract/Agreement", before: "Legal PDF", after: "Full text for review" },
                { label: "E-book Chapter", before: "Published PDF", after: "Plain text content" },
                { label: "Business Report", before: "Corporate PDF", after: "Copyable text output" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="extract-text" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
