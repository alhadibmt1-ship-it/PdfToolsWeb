import { useState, useRef } from "react";
import { Archive, Upload, Download, CheckCircle, FileText, Shield, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PdfToAPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      toast({ title: "Invalid file", description: "Please select a PDF file.", variant: "destructive" });
      return;
    }
    setFile(f);
    setDownloadUrl(null);
    addRecentTool("pdf-to-pdfa");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const convert = async () => {
    if (!file) return;
    setIsConverting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/pdf-to-pdfa", { method: "POST", body: formData });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Conversion failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast({ title: "Converted!", description: "Your PDF has been converted to PDF/A-1b format." });
    } catch (err: any) {
      toast({ title: "Conversion failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsConverting(false);
    }
  };

  const download = () => {
    if (!downloadUrl || !file) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name.replace(/\.pdf$/i, "_pdfa.pdf");
    a.click();
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setDownloadUrl(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Archive className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">PDF to PDF/A Converter</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Convert your PDF to PDF/A-1b — the ISO-standardized archiving format used by governments, legal firms, and institutions for long-term document preservation.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <Badge variant="secondary" className="gap-1.5"><Shield className="w-3 h-3" /> ISO 19005-1</Badge>
            <Badge variant="secondary" className="gap-1.5"><Clock className="w-3 h-3" /> Long-term archiving</Badge>
            <Badge variant="secondary" className="gap-1.5"><CheckCircle className="w-3 h-3" /> PDF/A-1b compliant</Badge>
          </div>
        </div>

        <TrustBadges variant="expanded" className="mb-8" />

        {/* Drop Zone */}
        {!file ? (
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover-elevate transition-colors bg-muted/20 mb-6"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            data-testid="dropzone-pdf"
          >
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <div className="font-semibold mb-1">Drop your PDF here or click to browse</div>
            <div className="text-sm text-muted-foreground">Supports all PDF versions</div>
            <Button className="mt-4" data-testid="button-select-pdf">Select PDF File</Button>
          </div>
        ) : (
          <Card className="mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{file.name}</div>
                <div className="text-sm text-muted-foreground">{formatBytes(file.size)} · PDF</div>
              </div>
              <Button variant="ghost" size="sm" onClick={reset} data-testid="button-remove-file">Remove</Button>
            </CardContent>
          </Card>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0] ?? null)}
          data-testid="input-pdf"
        />

        {/* Action */}
        {file && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {!downloadUrl ? (
              <Button
                className="flex-1 gap-2"
                onClick={convert}
                disabled={isConverting}
                data-testid="button-convert"
              >
                {isConverting ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Converting to PDF/A...</>
                ) : (
                  <><Archive className="w-4 h-4" /> Convert to PDF/A-1b</>
                )}
              </Button>
            ) : (
              <>
                <Button className="flex-1 gap-2" onClick={download} data-testid="button-download">
                  <Download className="w-4 h-4" /> Download PDF/A
                </Button>
                <Button variant="outline" onClick={reset} data-testid="button-convert-another">
                  Convert Another
                </Button>
              </>
            )}
          </div>
        )}

        {downloadUrl && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400 mb-8">
            <CheckCircle className="w-4 h-4 shrink-0" />
            PDF/A-1b conversion complete. Your file is ready to download.
          </div>
        )}

        {/* What is PDF/A */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">What is PDF/A?</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">PDF/A</strong> (PDF for Archiving) is an ISO standard (ISO 19005) specifically designed for long-term digital preservation of electronic documents. Unlike regular PDFs, PDF/A files are completely self-contained — all fonts, color profiles, and metadata are embedded within the file itself.
              </p>
              <p>
                This means your PDF/A document will look exactly the same in 10, 20, or 50 years — regardless of what software is used to open it.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
              {[
                { icon: Shield, title: "Government & Legal", desc: "Required by courts, tax authorities, and government agencies for official records." },
                { icon: Archive, title: "Long-term Storage", desc: "Perfect for contracts, invoices, and records that must be preserved indefinitely." },
                { icon: CheckCircle, title: "ISO Certified", desc: "PDF/A-1b (ISO 19005-1) is the baseline standard accepted worldwide." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm">
              {[
                { q: "What is the difference between PDF and PDF/A?", a: "Regular PDF files may rely on external resources (fonts, color profiles). PDF/A is fully self-contained, ensuring the file renders correctly forever." },
                { q: "Which PDF/A version do you create?", a: "We create PDF/A-1b, the baseline conformance level of ISO 19005-1, which is accepted by most government and legal systems worldwide." },
                { q: "Is my file stored on your servers?", a: "No. Files are processed in memory and immediately discarded. We never store your documents." },
                { q: "Will my PDF look different after conversion?", a: "The content remains identical. The difference is in the internal structure — fonts and metadata are standardized for long-term compatibility." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="font-semibold text-foreground mb-1">{q}</div>
                  <div className="text-muted-foreground">{a}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <RelatedTools currentToolId="pdf-to-pdfa" />
      </div>
    </div>
  );
}
