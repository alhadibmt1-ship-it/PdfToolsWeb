import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    google: any;
    gapi: any;
    onGooglePickerApiLoad?: () => void;
  }
}

interface GoogleDriveButtonProps {
  onFileImported: (file: File) => void;
  accept?: "pdf" | "image" | "any";
  className?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

const MIME_TYPES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  any: ["application/pdf", "image/jpeg", "image/png", "image/webp"],
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export default function GoogleDriveButton({ onFileImported, accept = "pdf", className }: GoogleDriveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [pickerReady, setPickerReady] = useState(false);
  const { toast } = useToast();

  const isConfigured = Boolean(API_KEY && CLIENT_ID);

  useEffect(() => {
    if (!isConfigured) return;
    Promise.all([
      loadScript("https://apis.google.com/js/api.js"),
      loadScript("https://accounts.google.com/gsi/client"),
    ]).then(() => {
      window.gapi.load("picker", () => setPickerReady(true));
    }).catch(() => setPickerReady(false));
  }, [isConfigured]);

  const openPicker = useCallback(async () => {
    if (!isConfigured) {
      toast({
        title: "Google Drive not configured",
        description: "VITE_GOOGLE_API_KEY and VITE_GOOGLE_CLIENT_ID environment variables must be set.",
        variant: "destructive",
      });
      return;
    }
    if (!pickerReady) {
      toast({ title: "Loading…", description: "Google Picker is still loading, please try again." });
      return;
    }

    setLoading(true);

    try {
      // Use Google Identity Services to get an access token
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.readonly",
        callback: async (tokenResponse: any) => {
          if (tokenResponse.error) {
            toast({ title: "Google auth failed", description: tokenResponse.error, variant: "destructive" });
            setLoading(false);
            return;
          }

          const accessToken = tokenResponse.access_token;
          const mimeTypes = MIME_TYPES[accept] || MIME_TYPES.pdf;

          const view = new window.google.picker.DocsView()
            .setIncludeFolders(false)
            .setMimeTypes(mimeTypes.join(","));

          const picker = new window.google.picker.PickerBuilder()
            .addView(view)
            .setOAuthToken(accessToken)
            .setDeveloperKey(API_KEY)
            .setCallback(async (data: any) => {
              if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
                const doc = data[window.google.picker.Response.DOCUMENTS][0];
                const fileId = doc[window.google.picker.Document.ID];
                const fileName = doc[window.google.picker.Document.NAME];

                try {
                  const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                  );
                  if (!response.ok) throw new Error("Failed to download file from Drive");

                  const blob = await response.blob();
                  const file = new File([blob], fileName, { type: blob.type || "application/pdf" });
                  onFileImported(file);
                  toast({ title: "Imported from Google Drive", description: `"${fileName}" loaded successfully.` });
                } catch {
                  toast({ title: "Download failed", description: "Could not download the file from Google Drive.", variant: "destructive" });
                } finally {
                  setLoading(false);
                }
              } else if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.CANCEL) {
                setLoading(false);
              }
            })
            .build();

          picker.setVisible(true);
        },
      });

      tokenClient.requestAccessToken({ prompt: "" });
    } catch {
      toast({ title: "Error", description: "Failed to open Google Drive picker.", variant: "destructive" });
      setLoading(false);
    }
  }, [isConfigured, pickerReady, accept, onFileImported, toast]);

  return (
    <button
      onClick={openPicker}
      disabled={loading}
      className={className}
      data-testid="button-google-drive"
      title={!isConfigured ? "Google Drive not configured (see setup)" : "Import from Google Drive"}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg viewBox="0 0 87.3 78" className="w-4 h-4" aria-hidden="true">
          <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5C.4 49.9 0 51.45 0 53h27.5z" fill="#00ac47"/>
          <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.8L73.55 76.8z" fill="#ea4335"/>
          <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
          <path d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5L61.7 4.5C60.9 3.1 59.75 2 58.4 1.2L44.65 25z" fill="#2684fc"/>
          <path d="M43.65 53L27.5 53 13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#ffba00"/>
        </svg>
      )}
      <span>Google Drive</span>
    </button>
  );
}
