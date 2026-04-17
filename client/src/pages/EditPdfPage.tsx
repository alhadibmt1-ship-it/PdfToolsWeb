import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Download, Type, ImageIcon, Square, Circle, Minus, Plus, Undo, Redo, Trash2 } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import SuccessCelebration from "@/components/SuccessCelebration";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, getToolTitle, getToolDesc } from "@/lib/languages";

interface TextAnnotation {
  id: string;
  type: "text";
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color: string;
}

interface ShapeAnnotation {
  id: string;
  type: "rectangle" | "circle" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
}

type Annotation = TextAnnotation | ShapeAnnotation;

export default function EditPdfPage() {
  useSEO({
    title: "Edit PDF Free Online - Free PDF Editor | PDF HUB 24",
    description: "Edit PDF free online. Add text, images, shapes to PDF documents. Best free PDF editor - modify PDFs instantly, no software needed. No signup required.",
    keywords: "edit pdf free, pdf editor free, add text to pdf, modify pdf online, free pdf editor online, edit pdf online free",
    canonicalPath: "/edit-pdf"
  });

  const { lang } = useLanguage();

  const toolTitle = getToolTitle("edit-pdf", lang, getToolSEOData("edit-pdf")?.longTailH1 || "Edit PDF");
  const toolDesc = getToolDesc("edit-pdf", lang, "Add text, shapes, and annotations to your PDF documents. Simple and powerful PDF editing online.");

  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<"text" | "rectangle" | "circle" | "line" | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
      addRecentTool("edit-pdf");
      return () => URL.revokeObjectURL(url);
    }
  }, [files, addRecentTool]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "text" && currentText.trim()) {
      const newAnnotation: TextAnnotation = {
        id: Date.now().toString(),
        type: "text",
        x,
        y,
        text: currentText,
        fontSize,
        color
      };
      setAnnotations([...annotations, newAnnotation]);
      setCurrentText("");
    } else if (selectedTool !== "text") {
      const newAnnotation: ShapeAnnotation = {
        id: Date.now().toString(),
        type: selectedTool,
        x,
        y,
        width: 100,
        height: selectedTool === "line" ? 2 : 60,
        color,
        strokeWidth: 2
      };
      setAnnotations([...annotations, newAnnotation]);
    }
  };

  const handleSave = async () => {
    if (!files.length) return;
    
    setStatus("processing");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("annotations", JSON.stringify(annotations));

    try {
      const response = await fetch("/api/edit-pdf", {
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
        description: "PDF saved with your edits",
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
      a.download = "edited.pdf";
      a.click();
    }
  };

  const clearAnnotations = () => {
    setAnnotations([]);
  };

  const undoAnnotation = () => {
    setAnnotations(annotations.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" data-testid="link-back">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all">
              <ChevronLeft className="w-4 h-4" />
              {t(lang, "backToTools")}
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{toolTitle}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {toolDesc}
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
                  variant={selectedTool === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("text")}
                  data-testid="button-text-tool"
                >
                  <Type className="w-4 h-4 mr-2" />
                  Text
                </Button>
                <Button
                  variant={selectedTool === "rectangle" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("rectangle")}
                  data-testid="button-rectangle-tool"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Rectangle
                </Button>
                <Button
                  variant={selectedTool === "circle" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("circle")}
                  data-testid="button-circle-tool"
                >
                  <Circle className="w-4 h-4 mr-2" />
                  Circle
                </Button>
                <Button
                  variant={selectedTool === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool("line")}
                  data-testid="button-line-tool"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Line
                </Button>
                
                <div className="flex-1" />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undoAnnotation}
                  disabled={annotations.length === 0}
                  data-testid="button-undo"
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAnnotations}
                  disabled={annotations.length === 0}
                  data-testid="button-clear"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {selectedTool === "text" && (
                <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-1 min-w-[200px]">
                    <Label>Text to add</Label>
                    <Input
                      value={currentText}
                      onChange={(e) => setCurrentText(e.target.value)}
                      placeholder="Enter text..."
                      data-testid="input-text"
                    />
                  </div>
                  <div className="w-24">
                    <Label>Font Size</Label>
                    <Input
                      type="number"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      min={8}
                      max={72}
                      data-testid="input-font-size"
                    />
                  </div>
                  <div className="w-24">
                    <Label>Color</Label>
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-10"
                      data-testid="input-color"
                    />
                  </div>
                </div>
              )}

              {selectedTool && selectedTool !== "text" && (
                <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
                  <div className="w-24">
                    <Label>Color</Label>
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-10"
                      data-testid="input-shape-color"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground self-end">
                    Click on the PDF to add a {selectedTool}
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
                    {annotation.type === "text" && (
                      <span
                        style={{
                          fontSize: annotation.fontSize,
                          color: annotation.color,
                        }}
                      >
                        {annotation.text}
                      </span>
                    )}
                    {annotation.type === "rectangle" && (
                      <div
                        style={{
                          width: annotation.width,
                          height: annotation.height,
                          border: `${annotation.strokeWidth}px solid ${annotation.color}`,
                        }}
                      />
                    )}
                    {annotation.type === "circle" && (
                      <div
                        style={{
                          width: annotation.width,
                          height: annotation.height,
                          border: `${annotation.strokeWidth}px solid ${annotation.color}`,
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    {annotation.type === "line" && (
                      <div
                        style={{
                          width: annotation.width,
                          height: annotation.strokeWidth,
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
                message={status === "processing" ? "Applying edits to PDF..." : undefined}
              />

              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                  size="lg"
                  disabled={status === "processing"}
                  data-testid="button-save"
                >
                  {status === "processing" ? "Saving..." : "Save PDF"}
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

          <EnhancedToolSEOContent toolId="edit-pdf" />

          <RelatedTools currentToolId="edit-pdf" />
        </div>
      </main>

      <Footer />

      <SuccessCelebration
        isVisible={showCelebration}
        toolName="Edit PDF"
        fileName={files[0]?.name}
        onDownload={handleDownload}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}
