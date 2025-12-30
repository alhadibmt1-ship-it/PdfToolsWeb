import { useState } from "react";
import { ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/EnhancedToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";

export default function PdfToJpgPage() {
  useSEO({
    title: "PDF to JPG Free Online - Convert PDF to Image | PDF HUB 24",
    description: "Convert PDF to JPG free. Transform PDF pages to high-quality images instantly. Extract all pages as pictures. No signup.",
    keywords: "pdf to jpg free, convert pdf to image, pdf to jpeg, pdf to jpg converter free, save pdf as image, pdf to picture",
    canonicalPath: "/pdf-to-jpg"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isZipFile, setIsZipFile] = useState(true);
  const [filename, setFilename] = useState("images.zip");
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
      const { blob, contentType, responseFilename } = await runWithProgress(async () => {
        const response = await fetch("/api/pdf-to-jpg", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to convert PDF");
        }

        const contentType = response.headers.get("Content-Type") || "";
        const disposition = response.headers.get("Content-Disposition") || "";
        const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        const responseFilename = filenameMatch ? filenameMatch[1].replace(/['"]/g, '') : "download";
        
        const blob = await response.blob();
        
        return { blob, contentType, responseFilename };
      });

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setIsZipFile(contentType.includes("zip"));
      setFilename(responseFilename);
      setStatus("success");

      toast({
        title: "Success!",
        description: "PDF converted to JPG successfully",
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
      a.download = filename;
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF to JPG</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Convert each page of your PDF into high-quality JPG images. Single-page PDFs download directly as a JPG file, multi-page PDFs as a ZIP file containing all pages.
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
                Convert to JPG
              </Button>
            )}

            <ProcessingState
              status={status}
              progress={progress}
              message={status === "processing" ? "Converting PDF to images..." : undefined}
            />

            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">
                  {isZipFile ? "Your images are ready!" : "Your image is ready!"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isZipFile 
                    ? "All pages have been converted to JPG images and packaged in a ZIP file."
                    : "Your PDF page has been converted to a high-quality JPG image."}
                </p>
                <Button 
                  onClick={handleDownload} 
                  className="w-full"
                  size="lg"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isZipFile ? "Download ZIP File" : "Download JPG Image"}
                </Button>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="pdf-to-jpg" />
          
          <RelatedTools currentToolId="pdf-to-jpg" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
