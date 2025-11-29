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
            toolDescription="Flatten your PDF documents to remove interactive form fields, annotations, and layers. Our free online tool converts fillable PDFs into static documents, preserving all visible content while making the document non-editable. Perfect for archiving completed forms or securing documents before sharing."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or dragging and dropping.",
              "Click the Flatten PDF button to start processing.",
              "Wait while we flatten all forms and layers.",
              "Download your static, flattened PDF document."
            ]}
            benefits={[
              "Remove fillable form fields",
              "Flatten annotations and comments",
              "Merge layers into static content",
              "Prevent further editing of forms",
              "Preserve all visible content",
              "Perfect for archiving completed forms",
              "Secure documents before sharing",
              "Free with no registration required"
            ]}
            faqs={[
              {
                question: "What does flattening a PDF do?",
                answer: "Flattening merges all interactive elements (form fields, annotations, layers) into the page content, creating a static document that cannot be edited."
              },
              {
                question: "Can I unflatten a PDF later?",
                answer: "No, flattening is permanent. Always keep a copy of your original PDF if you need to preserve the interactive elements."
              },
              {
                question: "Will the content look different?",
                answer: "No, all visible content remains exactly the same. Only the interactivity is removed - form field contents, annotations, and graphics are preserved visually."
              },
              {
                question: "Why would I need to flatten a PDF?",
                answer: "Common reasons include archiving completed forms, preventing further changes, preparing documents for printing, or ensuring compatibility across different PDF viewers."
              },
              {
                question: "Is it free to use?",
                answer: "Yes, fully free. No registration, no limits, no hidden costs."
              }
            ]}
            keywords={["flatten pdf", "flatten pdf form", "remove form fields", "static pdf"]}
          />
          
          <RelatedTools currentToolId="flatten-pdf" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
