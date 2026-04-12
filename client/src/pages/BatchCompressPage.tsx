import { useState, useRef, useCallback } from "react";
import { Layers, Upload, X, Download, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type CompressionLevel = "low" | "medium" | "high";

export default function BatchCompressPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [isCompressing, setIsCompressing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { addRecentTool } = useRecentTools();

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const valid: File[] = [];
    for (const f of Array.from(incoming)) {
      if (f.name.toLowerCase().endsWith(".pdf")) valid.push(f);
    }
    if (valid.length === 0) {
      toast({ title: "Invalid files", description: "Please select PDF files only.", variant: "destructive" });
      return;
    }
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      return [...prev, ...valid.filter(f => !existing.has(f.name))];
    });
    setDownloadUrl(null);
    addRecentTool("batch-compress");
  }, [addRecentTool, toast]);

  const removeFile = (name: string) => {
    setFiles(prev => prev.filter(f => f.name !== name));
    setDownloadUrl(null);
  };

  const compress = async () => {
    if (files.length === 0) return;
    setIsCompressing(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append("files", f));
      formData.append("level", level);

      const response = await fetch("/api/compress-batch", { method: "POST", body: formData });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Compression failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast({ title: "Compressed!", description: `${files.length} PDF${files.length > 1 ? "s" : ""} compressed and ready to download.` });
    } catch (err: any) {
      toast({ title: "Compression failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsCompressing(false);
    }
  };

  const download = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `compressed_${files.length}_pdfs.zip`;
    a.click();
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFiles([]);
    setDownloadUrl(null);
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Batch Compress PDF</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Compress multiple PDF files at once. Upload up to 20 PDFs, choose your compression level, and download them all as a single ZIP file.
          </p>
        </div>

        <TrustBadges variant="expanded" className="mb-8" />

        {/* Drop Zone */}
        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover-elevate transition-colors bg-muted/20 mb-6"
          onClick={() => fileInputRef.current?.click()}
          onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
          onDragOver={e => e.preventDefault()}
          data-testid="dropzone"
        >
          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <div className="font-semibold mb-1">Drop PDF files here or click to browse</div>
          <div className="text-sm text-muted-foreground">Up to 20 PDF files at once</div>
          <Button className="mt-4" data-testid="button-select-files">Select PDF Files</Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={e => addFiles(e.target.files)}
          data-testid="input-files"
        />

        {/* File List */}
        {files.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{files.length} file{files.length > 1 ? "s" : ""}</span>
                  <Badge variant="secondary">{formatBytes(totalSize)} total</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} data-testid="button-add-more">
                    Add more
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset} data-testid="button-clear">
                    Clear all
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {files.map((f, idx) => (
                  <div key={f.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group" data-testid={`file-row-${idx}`}>
                    <FileText className="w-5 h-5 text-red-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{f.name}</div>
                      <div className="text-xs text-muted-foreground">{formatBytes(f.size)}</div>
                    </div>
                    <button
                      onClick={() => removeFile(f.name)}
                      className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      data-testid={`button-remove-${idx}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compression Level */}
        {files.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <label className="text-sm font-medium mb-2 block">Compression Level</label>
              <Select value={level} onValueChange={v => setLevel(v as CompressionLevel)}>
                <SelectTrigger data-testid="select-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low — Best quality, mild compression</SelectItem>
                  <SelectItem value="medium">Medium — Balanced quality &amp; size</SelectItem>
                  <SelectItem value="high">High — Smallest size, reduced quality</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Results vary by PDF content. Files with many images compress more than text-heavy PDFs.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action */}
        {files.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {!downloadUrl ? (
              <Button
                className="flex-1 gap-2"
                onClick={compress}
                disabled={isCompressing}
                data-testid="button-compress"
              >
                {isCompressing ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Compressing {files.length} files...</>
                ) : (
                  <><Layers className="w-4 h-4" /> Compress {files.length} PDF{files.length > 1 ? "s" : ""}</>
                )}
              </Button>
            ) : (
              <>
                <Button className="flex-1 gap-2" onClick={download} data-testid="button-download">
                  <Download className="w-4 h-4" /> Download ZIP ({files.length} files)
                </Button>
                <Button variant="outline" onClick={reset} data-testid="button-compress-more">
                  Compress More
                </Button>
              </>
            )}
          </div>
        )}

        {downloadUrl && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400 mb-8">
            <CheckCircle className="w-4 h-4 shrink-0" />
            All {files.length} PDFs compressed. Download the ZIP to get all files.
          </div>
        )}

        {/* Info */}
        {files.length === 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-sm text-muted-foreground mb-8">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              Upload up to 20 PDF files at once. All files will be compressed and bundled into a single ZIP download. Each file is named <code className="bg-muted px-1 rounded text-xs">originalname_compressed.pdf</code> inside the ZIP.
            </div>
          </div>
        )}

        <EnhancedToolSEOContent toolId="batch-compress" />
      </div>
    </div>
  );
}
