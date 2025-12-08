import { useState, useEffect } from "react";
import { ChevronLeft, Download, EyeOff, Trash2, Undo } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import ToolSEOContent from "@/components/ToolSEOContent";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import SuccessCelebration from "@/components/SuccessCelebration";
import { Card } from "@/components/ui/card";

interface RedactionArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function RedactPdfPage() {
  useSEO({
    title: "Redact PDF Online - Free PDF Redaction Tool | PDF HUB 24",
    description: "Redact PDF files online for free. Permanently black out sensitive information in your PDF documents. Secure PDF redaction without software.",
    keywords: "redact pdf, black out pdf, censor pdf, remove sensitive info, pdf privacy, secure pdf"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [redactions, setRedactions] = useState<RedactionArea[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentRedaction, setCurrentRedaction] = useState<RedactionArea | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
      addRecentTool("redact-pdf");
      return () => URL.revokeObjectURL(url);
    }
  }, [files, addRecentTool]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentRedaction({
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos || !currentRedaction) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentRedaction({
      ...currentRedaction,
      x: Math.min(startPos.x, x),
      y: Math.min(startPos.y, y),
      width: Math.abs(x - startPos.x),
      height: Math.abs(y - startPos.y)
    });
  };

  const handleMouseUp = () => {
    if (currentRedaction && currentRedaction.width > 10 && currentRedaction.height > 10) {
      setRedactions([...redactions, currentRedaction]);
    }
    setIsDrawing(false);
    setStartPos(null);
    setCurrentRedaction(null);
  };

  const handleSave = async () => {
    if (!files.length || redactions.length === 0) {
      toast({
        title: "No redactions",
        description: "Please draw at least one redaction area on the PDF",
        variant: "destructive",
      });
      return;
    }
    
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("redactions", JSON.stringify(redactions));

    try {
      const response = await fetch("/api/redact-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to redact PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "PDF redacted successfully",
      });
    } catch (error) {
      setStatus("idle");
      toast({
        title: "Error",
        description: "Failed to redact PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "redacted.pdf";
      a.click();
    }
  };

  const undoRedaction = () => {
    setRedactions(redactions.slice(0, -1));
  };

  const clearRedactions = () => {
    setRedactions([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Back to Tools
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Redact PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permanently black out sensitive information in your PDF documents. Protect privacy by redacting personal data.
            </p>
            <TrustBadges />
          </div>

          {!pdfUrl ? (
            <div className="space-y-6">
              <FileUploadZone
                onFilesSelected={setFiles}
                acceptedFormats=".pdf"
                multiple={false}
                disabled={false}
              />

              <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <div className="flex gap-3">
                  <EyeOff className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                      Important: Redaction is Permanent
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Redacted content is permanently removed from the PDF and cannot be recovered. 
                      The original text and images under redaction areas are completely deleted, 
                      not just covered. Keep a backup of your original file.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border items-center">
                <EyeOff className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click and drag to draw redaction areas on the PDF
                </span>
                
                <div className="flex-1" />

                <span className="text-sm font-medium">
                  {redactions.length} area{redactions.length !== 1 ? "s" : ""} selected
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undoRedaction}
                  disabled={redactions.length === 0}
                  data-testid="button-undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearRedactions}
                  disabled={redactions.length === 0}
                  data-testid="button-clear"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div 
                className="relative border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-[500px] cursor-crosshair select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                data-testid="pdf-canvas"
              >
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px] pointer-events-none"
                  title="PDF Preview"
                />
                
                {redactions.map((redaction) => (
                  <div
                    key={redaction.id}
                    className="absolute bg-black"
                    style={{
                      left: redaction.x,
                      top: redaction.y,
                      width: redaction.width,
                      height: redaction.height,
                    }}
                  />
                ))}

                {currentRedaction && (
                  <div
                    className="absolute bg-black/70 border-2 border-red-500"
                    style={{
                      left: currentRedaction.x,
                      top: currentRedaction.y,
                      width: currentRedaction.width,
                      height: currentRedaction.height,
                    }}
                  />
                )}
              </div>

              <ProcessingState
                status={status}
                progress={status === "processing" ? 50 : 0}
                message={status === "processing" ? "Applying redactions to PDF..." : undefined}
              />

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  size="lg"
                  disabled={status === "processing" || redactions.length === 0}
                  data-testid="button-save"
                >
                  {status === "processing" ? "Redacting..." : `Apply ${redactions.length} Redaction${redactions.length !== 1 ? "s" : ""}`}
                </Button>
                
                {status === "success" && resultUrl && (
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    data-testid="button-download"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          )}

          <ToolSEOContent
            toolName="PDF Redaction Tool"
            toolId="redact-pdf"
            toolDescription="Our online PDF redaction tool allows you to permanently black out sensitive information in your documents. Unlike simply drawing black boxes, true redaction removes the underlying content completely, ensuring it cannot be recovered or accessed."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or drag and drop.",
              "Click and drag on the PDF to draw redaction areas over sensitive content.",
              "Add multiple redaction areas as needed.",
              "Click Apply Redactions to permanently remove the content.",
              "Download your redacted PDF."
            ]}
            benefits={[
              "Permanently removes sensitive content",
              "Content cannot be recovered or un-redacted",
              "Protects personal information and privacy",
              "Compliant with privacy regulations",
              "No software installation required",
              "Secure processing with automatic file deletion",
              "Completely free with no registration"
            ]}
            faqs={[
              {
                question: "Is the redaction permanent?",
                answer: "Yes, redaction permanently removes the content from the PDF. The text and images under redaction areas are completely deleted, not just covered with a black box. This cannot be undone."
              },
              {
                question: "Can someone recover the redacted content?",
                answer: "No. True redaction removes the underlying data from the PDF file. Unlike simply adding a black rectangle overlay, our redaction tool ensures the original content is permanently erased."
              },
              {
                question: "Is my document secure?",
                answer: "Yes. Your documents are processed securely and automatically deleted from our servers after processing. We do not store or access the content of your files."
              }
            ]}
          />

          <RelatedTools currentToolId="redact-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="Redact PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
