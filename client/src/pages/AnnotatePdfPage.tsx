import { useState, useEffect } from "react";
import { ChevronLeft, Download, Highlighter, Underline, MessageSquare, Pencil } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import SuccessCelebration from "@/components/SuccessCelebration";

interface Annotation {
  id: string;
  type: "highlight" | "underline" | "note" | "freehand";
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text?: string;
}

export default function AnnotatePdfPage() {
  useSEO({
    title: "Annotate PDF Online - Free PDF Annotation Tool | PDF HUB 24",
    description: "Annotate PDF files online for free. Highlight, underline, and add notes to your PDF documents. Professional PDF annotation without software.",
    keywords: "annotate pdf, highlight pdf, underline pdf, pdf notes, pdf markup, pdf comments"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<"highlight" | "underline" | "note" | "freehand">("highlight");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");
  const [noteText, setNoteText] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
      addRecentTool("annotate-pdf");
      return () => URL.revokeObjectURL(url);
    }
  }, [files, addRecentTool]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: selectedTool,
      x,
      y,
      width: selectedTool === "note" ? 24 : 150,
      height: selectedTool === "underline" ? 3 : selectedTool === "note" ? 24 : 20,
      color: highlightColor,
      text: selectedTool === "note" ? noteText : undefined
    };

    setAnnotations([...annotations, newAnnotation]);
    if (selectedTool === "note") {
      setNoteText("");
    }
  };

  const handleSave = async () => {
    if (!files.length) return;
    
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("annotations", JSON.stringify(annotations));

    try {
      const response = await fetch("/api/annotate-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
      setShowCelebration(true);

      toast({
        title: "Success!",
        description: "PDF saved with your annotations",
      });
    } catch (error) {
      setStatus("idle");
      toast({
        title: "Error",
        description: "Failed to save PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement("a");
      a.href = resultUrl;
      a.download = "annotated.pdf";
      a.click();
    }
  };

  const colorPresets = [
    { color: "#FFFF00", name: "Yellow" },
    { color: "#00FF00", name: "Green" },
    { color: "#FF69B4", name: "Pink" },
    { color: "#87CEEB", name: "Blue" },
    { color: "#FFA500", name: "Orange" },
  ];

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Annotate PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Highlight, underline, and add notes to your PDF documents. Perfect for reviewing and marking up documents.
            </p>
            <TrustBadges />
          </div>

          {!pdfUrl ? (
            <FileUploadZone
              onFilesSelected={setFiles}
              acceptedFormats=".pdf"
              multiple={false}
              disabled={false}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg border">
                <Button
                  variant={selectedTool === "highlight" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("highlight")}
                  data-testid="button-highlight"
                >
                  <Highlighter className="w-4 h-4 mr-2" />
                  Highlight
                </Button>
                <Button
                  variant={selectedTool === "underline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("underline")}
                  data-testid="button-underline"
                >
                  <Underline className="w-4 h-4 mr-2" />
                  Underline
                </Button>
                <Button
                  variant={selectedTool === "note" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("note")}
                  data-testid="button-note"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Note
                </Button>
                <Button
                  variant={selectedTool === "freehand" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("freehand")}
                  data-testid="button-freehand"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Freehand
                </Button>

                <div className="flex-1" />

                <div className="flex gap-1">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.color}
                      onClick={() => setHighlightColor(preset.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        highlightColor === preset.color ? "border-foreground scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                      data-testid={`button-color-${preset.name.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {selectedTool === "note" && (
                <div className="p-4 bg-card rounded-lg border">
                  <Label>Note text</Label>
                  <Textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Enter your note..."
                    className="mt-2"
                    data-testid="input-note"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter your note text, then click on the PDF where you want to place it.
                  </p>
                </div>
              )}

              <div 
                className="relative border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 min-h-[500px] cursor-crosshair"
                onClick={handleCanvasClick}
                data-testid="pdf-canvas"
              >
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px] pointer-events-none"
                  title="PDF Preview"
                />
                
                {annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: annotation.x,
                      top: annotation.y,
                    }}
                  >
                    {annotation.type === "highlight" && (
                      <div
                        style={{
                          width: annotation.width,
                          height: annotation.height,
                          backgroundColor: annotation.color,
                          opacity: 0.4,
                        }}
                      />
                    )}
                    {annotation.type === "underline" && (
                      <div
                        style={{
                          width: annotation.width,
                          height: annotation.height,
                          backgroundColor: annotation.color,
                        }}
                      />
                    )}
                    {annotation.type === "note" && (
                      <div
                        className="bg-yellow-200 dark:bg-yellow-600 rounded shadow-md p-1"
                        style={{
                          minWidth: 24,
                          minHeight: 24,
                        }}
                        title={annotation.text}
                      >
                        <MessageSquare className="w-4 h-4 text-yellow-700 dark:text-yellow-200" />
                      </div>
                    )}
                    {annotation.type === "freehand" && (
                      <div
                        className="rounded-full"
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: annotation.color,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <ProcessingState
                status={status}
                progress={status === "processing" ? 50 : 0}
                message={status === "processing" ? "Applying annotations to PDF..." : undefined}
              />

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  size="lg"
                  disabled={status === "processing"}
                  data-testid="button-save"
                >
                  {status === "processing" ? "Saving..." : "Save Annotated PDF"}
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
            toolName="PDF Annotation Tool"
            toolId="annotate-pdf"
            toolDescription="Our online PDF annotation tool allows you to highlight, underline, and add notes to your PDF documents. Perfect for document review, feedback, and markup without any software installation."
            howToSteps={[
              "Upload your PDF file by clicking the upload area or drag and drop.",
              "Select an annotation tool (highlight, underline, note, or freehand).",
              "Choose a color from the color palette.",
              "Click on the PDF where you want to add the annotation.",
              "Click Save to download your annotated PDF."
            ]}
            benefits={[
              "Highlight important text in multiple colors",
              "Underline key passages",
              "Add sticky notes with comments",
              "Freehand drawing for marks",
              "No software installation required",
              "Works on any device with a browser",
              "Completely free with no registration"
            ]}
            faqs={[
              {
                question: "Can others see my annotations?",
                answer: "Yes, when you save the PDF, your annotations are permanently added to the document. Anyone who opens the PDF will see your highlights and notes."
              },
              {
                question: "What colors are available?",
                answer: "We offer preset colors including yellow, green, pink, blue, and orange. You can also use custom colors through the color picker."
              },
              {
                question: "Can I remove annotations later?",
                answer: "Once saved, annotations are permanent in the output PDF. We recommend keeping your original file if you may need an un-annotated version."
              }
            ]}
          />

          <RelatedTools currentToolId="annotate-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="Annotate PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
