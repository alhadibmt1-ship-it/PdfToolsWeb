import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function WordToPdfPage() {
  useSEO({
    title: "Word to PDF Converter - Convert DOCX to PDF Online Free | PDF HUB 24",
    description: "Convert Word documents (DOCX) to PDF online for free. Fast Word to PDF conversion with preserved formatting. Secure and easy to use. No registration required.",
    keywords: "word to pdf, docx to pdf, convert word to pdf, doc to pdf, word document to pdf converter"
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
        description: "Please select a Word file to convert",
        variant: "destructive",
      });
      return;
    }

    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/word-to-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert Word document");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "Word document converted to PDF successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to convert Word document. Please try again.",
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Word to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your Word documents (DOCX) to PDF format. Perfect for sharing and preserving formatting.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".docx"
              multiple={false}
              disabled={status === "processing"}
            />

            {files.length > 0 && status === "idle" && (
              <Button 
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to PDF
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting Word to PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your PDF is ready!</h3>
                <p className="text-sm text-muted-foreground">
                  Your Word document has been successfully converted to PDF format.
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Word to PDF Converter"
            toolId="word-to-pdf"
            toolDescription="Convert your Microsoft Word documents (DOCX) to universally compatible PDF format with our free online converter. Our tool preserves all formatting including fonts, images, tables, headers, footers, and page layouts exactly as they appear in your original Word document. Perfect for sharing professional documents, creating print-ready files, or ensuring your documents look identical on any device or operating system."
            howToSteps={[
              "Upload your Word document (.docx file) by clicking the upload area or dragging and dropping.",
              "Click 'Convert to PDF' to start the instant conversion process.",
              "Wait a few seconds while our server transforms your document to PDF format.",
              "Download your PDF file and share or print it anywhere."
            ]}
            benefits={[
              "Preserve fonts, images, tables, and all formatting from Word",
              "Create universally readable PDF documents on any device",
              "Perfect for professional document sharing and archiving",
              "Ideal for creating print-ready files with exact layout",
              "Works with DOCX files from any version of Microsoft Word",
              "Fast conversion - usually completes under 10 seconds",
              "No quality loss during the conversion process",
              "Secure processing with automatic file deletion after download",
              "No software installation or registration required"
            ]}
            faqs={[
              {
                question: "What Word formats are supported?",
                answer: "Our converter supports DOCX format (Microsoft Word 2007 and later). This is the standard format for modern Word documents. If you have an older DOC file, simply open it in Word and save it as DOCX before uploading."
              },
              {
                question: "Will my formatting be preserved during conversion?",
                answer: "Yes, our converter preserves your document's complete formatting including fonts, images, tables, headers, footers, margins, and page layouts. The resulting PDF will look exactly like your original Word document."
              },
              {
                question: "Is there a page or file size limit?",
                answer: "You can convert Word documents of any length with no page limits. Multi-page documents with complex formatting, embedded images, and tables are fully supported. Very large files may take slightly longer to process."
              },
              {
                question: "Can I convert multiple Word files to PDF at once?",
                answer: "Currently, you can convert one file at a time to ensure the highest quality output. For multiple documents, simply repeat the process for each file. You can also merge the resulting PDFs using our Merge PDF tool."
              },
              {
                question: "Are my documents kept private and secure?",
                answer: "Absolutely. Your documents are processed securely using encrypted connections and deleted immediately after conversion. We never store, view, share, or analyze your files. Your privacy is our priority."
              }
            ]}
            keywords={["convert word to pdf", "docx to pdf online", "word document to pdf", "doc to pdf converter", "word to pdf free"]}
            relatedLinks={[
              { text: "Convert PDF back to Word using PDF to Word", href: "/pdf-to-word" },
              { text: "Combine multiple PDFs using Merge PDF", href: "/merge" },
              { text: "Reduce file size using Compress PDF", href: "/compress" },
              { text: "Add protection using Protect PDF", href: "/protect" }
            ]}
            extraSections={[
              {
                title: "Why Convert Word Documents to PDF?",
                content: "PDF format offers significant advantages over Word documents for sharing and archiving. Here's why professionals choose PDF:",
                items: [
                  "Universal compatibility - PDFs open on any device without Word installed",
                  "Formatting preservation - Layout stays exactly as intended",
                  "Professional appearance - PDFs look polished and print-ready",
                  "File integrity - Content cannot be accidentally modified",
                  "Smaller file sizes - PDFs are often more compact than Word files"
                ]
              },
              {
                title: "Common Use Cases for Word to PDF Conversion",
                content: "Our Word to PDF converter is used daily by professionals worldwide for various purposes:",
                items: [
                  "Submitting resumes and cover letters to employers",
                  "Sharing contracts and legal documents",
                  "Distributing reports and proposals to clients",
                  "Archiving business documents for long-term storage",
                  "Sending invoices and formal business correspondence",
                  "Publishing ebooks and digital publications"
                ]
              }
            ]}
            exampleTable={{
              title: "Word to PDF Conversion Examples",
              rows: [
                { label: "Resume (2 pages)", before: "45 KB DOCX", after: "120 KB PDF" },
                { label: "Business Report (20 pages)", before: "2.5 MB DOCX", after: "1.8 MB PDF" },
                { label: "Contract with Images", before: "1.2 MB DOCX", after: "950 KB PDF" },
                { label: "Newsletter Template", before: "800 KB DOCX", after: "650 KB PDF" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="word-to-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
