import { useState, useEffect } from "react";
import { ChevronLeft, ZoomIn, ZoomOut, ChevronRight, ChevronLeftIcon } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import EnhancedToolSEOContent from "@/components/EnhancedToolSEOContent";
import { getToolSEOData } from "@/data/toolSEOData";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function PdfViewerPage() {
  useSEO({
    title: "PDF Viewer Free Online - View PDF in Browser | PDF HUB 24",
    description: "View PDF free. Open and read PDF documents in your browser. Best free PDF viewer - zoom, navigate. No signup.",
    keywords: "pdf viewer free, view pdf online, open pdf free, read pdf online, pdf reader free, view pdf in browser",
    canonicalPath: "/pdf-viewer"
  });

  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPdfUrl(null);
    }
  }, [files]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{getToolSEOData("pdf-viewer")?.longTailH1 || "PDF Viewer"}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              View PDF documents directly in your browser. No software installation needed.
            </p>
            <TrustBadges />
          </div>

          <div className="space-y-6">
            {!pdfUrl && (
              <FileUploadZone
                onFilesSelected={setFiles}
                acceptedFormats=".pdf"
                multiple={false}
              />
            )}

            {pdfUrl && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{files[0]?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                      data-testid="button-zoom-out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm w-16 text-center">{zoom}%</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                      data-testid="button-zoom-in"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiles([]);
                        setPdfUrl(null);
                      }}
                      className="ml-4"
                      data-testid="button-close"
                    >
                      Close PDF
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted overflow-auto" style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%`, height: `${10000 / zoom}%` }}
                    title="PDF Viewer"
                    data-testid="iframe-pdf"
                  />
                </div>
              </div>
            )}
          </div>

          <EnhancedToolSEOContent toolId="pdf-viewer" />
          
          <RelatedTools currentToolId="pdf-viewer" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
