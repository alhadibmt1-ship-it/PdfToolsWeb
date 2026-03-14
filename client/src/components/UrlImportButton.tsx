import { useState } from "react";
import { Link2, Download, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface UrlImportButtonProps {
  accept?: string;
  onFileImported: (file: File) => void;
  className?: string;
}

export default function UrlImportButton({ accept = ".pdf", onFileImported, className }: UrlImportButtonProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleImport = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/download-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to download file");
      }

      const blob = await response.blob();

      // Get filename from URL or Content-Disposition
      const disposition = response.headers.get("Content-Disposition") || "";
      const xFileName = response.headers.get("X-File-Name") || "";
      let fileName = xFileName || disposition.match(/filename="?([^"]+)"?/)?.[1] || "";
      if (!fileName) {
        try {
          const urlObj = new URL(url.trim());
          fileName = urlObj.pathname.split("/").pop() || "imported_file";
        } catch {
          fileName = "imported_file";
        }
      }

      // Ensure correct extension
      const contentType = blob.type;
      if (contentType.includes("pdf") && !fileName.toLowerCase().endsWith(".pdf")) {
        fileName += ".pdf";
      }

      const file = new File([blob], fileName, { type: blob.type });
      onFileImported(file);
      setOpen(false);
      setUrl("");
      toast({ title: "File imported", description: `"${fileName}" loaded successfully.` });
    } catch (err: any) {
      setError(err.message || "Failed to import file. Check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={className}
        onClick={() => setOpen(true)}
        data-testid="button-url-import"
      >
        <Link2 className="w-4 h-4 mr-1.5" />
        Import from URL
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              Import File from URL
            </DialogTitle>
            <DialogDescription>
              Paste a direct link to a PDF or image file. The file will be downloaded and loaded into the tool.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">File URL</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/document.pdf"
                  value={url}
                  onChange={e => { setUrl(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleImport()}
                  disabled={isLoading}
                  data-testid="input-url"
                  className="flex-1"
                />
              </div>
              {error && (
                <div className="flex items-center gap-1.5 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 gap-2"
                onClick={handleImport}
                disabled={isLoading || !url.trim()}
                data-testid="button-import-confirm"
              >
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Importing...</>
                ) : (
                  <><Download className="w-4 h-4" /> Import File</>
                )}
              </Button>
              <Button variant="ghost" onClick={() => { setOpen(false); setUrl(""); setError(""); }} data-testid="button-cancel-import">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Maximum file size: 50MB. Only direct file links work — not Google Drive sharing links or pages that require login.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
