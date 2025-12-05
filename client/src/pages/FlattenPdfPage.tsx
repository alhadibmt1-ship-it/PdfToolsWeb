import { useState } from "react";
import { ChevronLeft, Download, Layers } from "lucide-react";
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

export default function FlattenPdfPage() {
  useSEO({
    title: "Flatten PDF Online Free - Flatten PDF Forms and Layers | PDF HUB 24",
    description: "Flatten PDF files online for free. Remove interactive form fields and flatten layers into a static PDF. Secure your documents for sharing.",
    keywords: "flatten pdf, flatten pdf form, remove pdf form fields, pdf flatten, flatten pdf layers"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleFlatten = async () => {
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
      const blob = await runWithProgress(async () => {
        const response = await fetch("/api/flatten-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to flatten PDF");
        }

        return await response.blob();
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF flattened successfully",
      });
    } catch (error) {
      setStatus("error");
      toast({
        title: "Error",
        description: "Failed to flatten PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "flattened.pdf";
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Flatten PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Flatten PDF forms and layers into a static document. Remove interactive elements while preserving all visible content.
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
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Ready to Flatten</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Form fields, annotations, and layers will be merged into a static PDF. This cannot be undone.
                </p>
                <Button 
                  onClick={handleFlatten} 
                  className="w-full"
                  size="lg"
                  data-testid="button-flatten"
                >
                  Flatten PDF
                </Button>
              </div>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Flattening your PDF..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Your flattened PDF is ready!</h3>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Flattened PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFiles([]);
                    setStatus("idle");
                    setResultUrl(null);
                  }}
                  className="w-full"
                  data-testid="button-new"
                >
                  Flatten Another PDF
                </Button>
              </div>
            )}
          </div>

          <ToolSEOContent
            toolName="Flatten PDF"
            toolDescription="Flatten your PDF documents to permanently merge interactive form fields, annotations, comments, and layers into static page content. Our free online tool converts fillable PDFs into non-editable documents while preserving all visible content exactly as it appears. Essential for archiving completed forms, securing documents before sharing, ensuring consistent display across all PDF viewers, and preparing documents for professional printing."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping your document.",
              "Review the file — our tool will process all forms, annotations, and layers automatically.",
              "Click the 'Flatten PDF' button to merge all interactive elements into static content.",
              "Download your flattened PDF — now a secure, non-editable static document."
            ]}
            benefits={[
              "Convert fillable form fields to static text",
              "Merge annotations and comments into page content",
              "Flatten all layers into a single static layer",
              "Prevent further editing of completed forms",
              "Preserve exact visual appearance of all content",
              "Ensure consistent display across all PDF readers",
              "Prepare documents for professional printing",
              "Archive completed documents securely",
              "Free with no registration or limits"
            ]}
            faqs={[
              {
                question: "What exactly does flattening a PDF do?",
                answer: "Flattening permanently merges all interactive elements — including fillable form fields, annotations, comments, stamps, and separate layers — directly into the page content. The result is a static PDF that looks exactly the same but can no longer be edited or have its form fields modified. Think of it like printing a document and scanning it back, except without any quality loss."
              },
              {
                question: "Can I unflatten a PDF or restore the form fields later?",
                answer: "No, flattening is a permanent, one-way process. Once a PDF is flattened, the form fields and annotations cannot be recovered. Always keep a backup copy of your original PDF with the interactive elements if you might need to edit them later."
              },
              {
                question: "Will the visual appearance of my document change?",
                answer: "No, all visible content remains exactly the same visually. Form field values, annotations, comments, and graphics are all preserved exactly as they appear. The only change is that these elements are no longer interactive — they become static parts of the page like regular text and images."
              },
              {
                question: "Why would I need to flatten a PDF document?",
                answer: "Common use cases include: archiving completed tax forms or applications, preventing changes to signed contracts, ensuring forms display correctly on all devices and PDF readers, preparing documents for professional printing services, reducing compatibility issues when sharing with others, and securing documents before public distribution."
              },
              {
                question: "Does flattening affect document security or passwords?",
                answer: "Flattening only affects interactive elements like forms and annotations. It does not add or remove password protection. If you want to add security after flattening, use our Protect PDF tool. If you need to remove security first, use our Unlock PDF tool."
              }
            ]}
            keywords={["flatten pdf online", "flatten pdf form fields", "remove pdf annotations", "convert fillable pdf to static", "merge pdf layers"]}
            relatedLinks={[
              { text: "Add password protection using Protect PDF", href: "/protect-pdf" },
              { text: "Add signature before flattening using Sign PDF", href: "/sign-pdf" },
              { text: "Compress flattened document using Compress PDF", href: "/compress" },
              { text: "Convert to image using PDF to JPG", href: "/pdf-to-jpg" }
            ]}
            extraSections={[
              {
                title: "When Should You Flatten a PDF?",
                content: "Flattening is recommended in these common scenarios to ensure document integrity and compatibility:",
                items: [
                  "Archiving completed tax forms, applications, or contracts",
                  "Sending finalized documents to clients or partners",
                  "Preparing PDFs for professional print shops",
                  "Preventing modifications to signed agreements",
                  "Fixing display issues with form fields in some viewers",
                  "Creating a permanent record of filled-out forms"
                ]
              },
              {
                title: "What Elements Are Flattened?",
                content: "Our flatten tool processes and merges the following interactive elements into static content:",
                items: [
                  "Text fields, checkboxes, and radio buttons",
                  "Dropdown menus and list boxes",
                  "Signature fields (visual appearance preserved)",
                  "Comments, sticky notes, and text annotations",
                  "Drawing annotations and markup",
                  "Multiple layers (flattened to single layer)"
                ]
              }
            ]}
            exampleTable={{
              title: "Before and After Flattening",
              rows: [
                { label: "Form text field", before: "Editable input", after: "Static text" },
                { label: "Checkbox field", before: "Clickable box", after: "Fixed checkmark" },
                { label: "Comment annotation", before: "Pop-up note", after: "Merged graphic" },
                { label: "Multiple layers", before: "Separate layers", after: "Single layer" }
              ]
            }}
          />
          
          <RelatedTools currentToolId="flatten-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
