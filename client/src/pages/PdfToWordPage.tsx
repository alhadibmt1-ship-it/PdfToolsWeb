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

export default function PdfToWordPage() {
  useSEO({
    title: "PDF to Word Free Online - Convert PDF to DOCX | PDF HUB 24",
    description: "Convert PDF to Word free. Transform PDF to editable DOCX without losing formatting. Keeps tables and images. No signup.",
    keywords: "pdf to word free, convert pdf to word, pdf to docx, pdf to word converter free, pdf to editable word, change pdf to word"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to Word</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert your PDF document to an editable Word (DOCX) file. Perfect for making edits to PDF content.
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
                onClick={handleConvert} 
                className="w-full"
                size="lg"
                data-testid="button-convert"
              >
                Convert to Word
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
          </div>

          <ToolSEOContent
            toolName="PDF to Word Converter"
            toolId="pdf-to-word"
            toolDescription="Our PDF to Word converter transforms your PDF documents into fully editable Microsoft Word (DOCX) files with exceptional accuracy. Whether you need to edit text, update formatting, or repurpose content from a PDF, our tool preserves the original layout, fonts, tables, and images as much as possible. This free online converter works directly in your browser — no software installation, registration, or hidden fees required."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Wait a few seconds while our server processes and converts your document to Word format.",
              "Click the download button to save your new Word (DOCX) file to your device.",
              "Open the file in Microsoft Word, Google Docs, or any compatible word processor to edit."
            ]}
            benefits={[
              "Edit PDF text directly in Word without retyping",
              "Preserve original formatting, tables, and images",
              "Convert scanned PDFs with text recognition support",
              "Works with complex multi-page documents",
              "No file size limits for standard documents",
              "Completely free with no registration required",
              "Process files securely with automatic deletion",
              "Compatible with Microsoft Word, Google Docs, and LibreOffice",
              "Fast cloud-based conversion in seconds"
            ]}
            faqs={[
              {
                question: "Is the PDF to Word conversion free?",
                answer: "Yes, PDF HUB 24's PDF to Word converter is completely free to use. There are no hidden fees, subscriptions, or registration required. Simply upload your file and download the converted Word document instantly."
              },
              {
                question: "Will the formatting be preserved?",
                answer: "Our converter does its best to preserve the original formatting including fonts, colors, tables, and images. Complex layouts may require minor adjustments in Word, but most documents convert with excellent accuracy. Headers, footers, and page numbers are also maintained."
              },
              {
                question: "Can I convert scanned PDFs to Word?",
                answer: "Yes, our tool can process scanned PDFs. Text content is extracted and converted to editable Word format. For best results with scanned documents, ensure the original scan is clear and high-resolution. For heavily scanned documents, try our OCR PDF tool first."
              },
              {
                question: "Is my PDF file secure?",
                answer: "Absolutely. Your files are processed on secure servers and automatically deleted after conversion. We never store, share, or access the content of your documents. Your privacy and data security are our top priority."
              },
              {
                question: "What file formats are supported?",
                answer: "This tool converts PDF files to Microsoft Word format (.docx). The output file is compatible with Microsoft Word 2007 and later, Google Docs, LibreOffice Writer, Apple Pages, and other word processors that support the DOCX format."
              }
            ]}
            keywords={["convert pdf to word", "pdf to docx", "edit pdf text", "pdf to word free", "pdf converter online"]}
            relatedLinks={[
              { text: "Extract text only using Extract Text from PDF", href: "/extract-text" },
              { text: "Convert Word back to PDF using Word to PDF", href: "/word-to-pdf" },
              { text: "Extract data tables using PDF to Excel", href: "/pdf-to-excel" },
              { text: "Use OCR PDF for scanned documents", href: "/ocr-pdf" }
            ]}
            extraSections={[
              {
                title: "Why Convert PDF to Word?",
                content: "PDFs are great for sharing but difficult to edit. Converting to Word format unlocks your content for easy modification.",
                items: [
                  "Edit contracts, reports, and proposals",
                  "Update resumes and cover letters",
                  "Modify academic papers and assignments",
                  "Repurpose marketing materials",
                  "Collaborate with team members using track changes"
                ]
              },
              {
                title: "Common Use Cases",
                content: "Our PDF to Word converter is trusted by professionals, students, and businesses for various document needs:",
                items: [
                  "Legal professionals editing contract templates",
                  "Students modifying research papers and essays",
                  "Business users updating reports and presentations",
                  "HR teams editing job descriptions and policies",
                  "Marketing teams repurposing brochures and flyers",
                  "Anyone needing to edit received PDF documents"
                ]
              }
            ]}
            exampleTable={{
              title: "PDF to Word Conversion Examples",
              rows: [
                { label: "Business Report (PDF)", before: "Read-only PDF", after: "Editable DOCX" },
                { label: "Resume/CV", before: "Static PDF format", after: "Fully editable Word" },
                { label: "Contract Template", before: "Locked PDF document", after: "Modifiable contract" },
                { label: "Academic Paper", before: "Published PDF", after: "Editable manuscript" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="pdf-to-word" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
