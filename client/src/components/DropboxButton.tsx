import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Dropbox: any;
  }
}

interface DropboxButtonProps {
  onFileImported: (file: File) => void;
  accept?: "pdf" | "image" | "any";
  className?: string;
}

const APP_KEY = import.meta.env.VITE_DROPBOX_APP_KEY as string | undefined;

const EXTENSIONS: Record<string, string[]> = {
  pdf: [".pdf"],
  image: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
  any: [".pdf", ".jpg", ".jpeg", ".png", ".webp"],
};

export default function DropboxButton({ onFileImported, accept = "pdf", className }: DropboxButtonProps) {
  const [sdkReady, setSdkReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isConfigured = Boolean(APP_KEY);

  useEffect(() => {
    if (!isConfigured) return;
    if (window.Dropbox) { setSdkReady(true); return; }

    const existing = document.querySelector('script[src*="dropins.js"]');
    if (existing) {
      const check = setInterval(() => {
        if (window.Dropbox) { setSdkReady(true); clearInterval(check); }
      }, 100);
      return () => clearInterval(check);
    }

    const script = document.createElement("script");
    script.src = `https://www.dropbox.com/static/api/2/dropins.js`;
    script.id = "dropboxjs";
    script.setAttribute("data-app-key", APP_KEY!);
    script.onload = () => setSdkReady(true);
    script.onerror = () => toast({ title: "Dropbox SDK failed to load", variant: "destructive" });
    document.head.appendChild(script);
  }, [isConfigured]);

  const openChooser = () => {
    if (!isConfigured) {
      toast({
        title: "Dropbox not configured",
        description: "VITE_DROPBOX_APP_KEY environment variable must be set.",
        variant: "destructive",
      });
      return;
    }
    if (!sdkReady || !window.Dropbox) {
      toast({ title: "Loading…", description: "Dropbox is still loading, please try again." });
      return;
    }

    setLoading(true);
    const extensions = EXTENSIONS[accept] || EXTENSIONS.pdf;

    window.Dropbox.choose({
      success: async (files: any[]) => {
        const picked = files[0];
        const directUrl = picked.link.replace("?dl=0", "?dl=1").replace("www.dropbox.com", "dl.dropboxusercontent.com");

        try {
          const response = await fetch("/api/download-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: directUrl }),
          });

          if (!response.ok) throw new Error("Download failed");

          const blob = await response.blob();
          const file = new File([blob], picked.name, { type: blob.type || "application/octet-stream" });
          onFileImported(file);
          toast({ title: "Imported from Dropbox", description: `"${picked.name}" loaded successfully.` });
        } catch {
          toast({ title: "Import failed", description: "Could not download the file from Dropbox.", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      },
      cancel: () => setLoading(false),
      linkType: "direct",
      multiselect: false,
      extensions,
    });
  };

  return (
    <button
      onClick={openChooser}
      disabled={loading}
      className={className}
      data-testid="button-dropbox"
      title={!isConfigured ? "Dropbox not configured (see setup)" : "Import from Dropbox"}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg viewBox="0 0 528 444" className="w-4 h-4" aria-hidden="true">
          <path d="M264 0L132 88l132 88L132 264 0 176l132-88L0 0l132 88zm0 444l-132-88 132-88 132 88zm0-176l132-88-132-88 132-88 132 88-132 88z" fill="#0061FF"/>
        </svg>
      )}
      <span>Dropbox</span>
    </button>
  );
}
