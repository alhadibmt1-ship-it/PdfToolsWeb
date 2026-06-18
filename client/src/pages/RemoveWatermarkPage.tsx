import { useState, useCallback } from "react";
import { ChevronLeft, Download, Eraser } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploadZone from "@/components/FileUploadZone";
import ProcessingState from "@/components/ProcessingState";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

export default function RemoveWatermarkPage() {
  useSEO({
    title: "Remove Watermark from PDF Free Online | PDF HUB 24",
    description: "Remove text and image watermarks from PDF documents free online. Clean up PDF files instantly. No signup, no watermark added. PDF HUB 24.",
    keywords: "remove watermark from pdf free, delete watermark pdf, pdf watermark remover free, remove text watermark pdf, clean pdf watermark online, remove pdf stamp free",
    canonicalPath: "/remove-watermark"
  });

  const { lang } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setStatus("idle");
    setErrorMessage("");
    setFiles(newFiles);
  }, [resultUrl]);

  const handleProcess = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      await runWithProgress(async () => {
        const formData = new FormData();
        formData.append("file", files[0]);
        const res = await fetch("/api/remove-watermark", { method: "POST", body: formData });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to remove watermark");
        }
        const blob = await res.blob();
        setResultUrl(URL.createObjectURL(blob));
        setStatus("success");
      });
    } catch (e: any) {
      setStatus("error");
      setErrorMessage(e.message || "Something went wrong");
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/"><div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 cursor-pointer rounded-md px-3 py-2 -ml-3 transition-all"><ChevronLeft className="w-4 h-4" />{t(lang, "backToTools")}</div></Link>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Remove Watermark from PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">Remove text and image watermarks from PDF documents. Upload your PDF and download a clean version instantly.</p>
            <TrustBadges />
          </div>
          <div className="space-y-6">
            <FileUploadZone onFilesSelected={handleFilesSelected} acceptedFormats=".pdf" multiple={false} disabled={status === "processing"} />
            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2"><Eraser className="w-5 h-5 text-primary" /><h3 className="font-semibold">Ready to Process</h3></div>
                <p className="text-sm text-muted-foreground">Watermarks will be removed from all pages.</p>
                <Button onClick={handleProcess} className="w-full" size="lg">Remove Watermark</Button>
              </div>
            )}
            <ProcessingState status={status === "processing" || status === "error" ? status : "idle"} progress={progress} message={status === "processing" ? "Removing watermark..." : undefined} />
            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Watermark removed successfully!</h3>
                <Button onClick={() => { const a = document.createElement("a"); a.href = resultUrl!; a.download = files[0]?.name?.replace(/\.pdf$/i, "") + "-clean.pdf"; a.click(); }} className="w-full" size="lg"><Download className="w-4 h-4 mr-2" />Download Clean PDF</Button>
                <Button variant="outline" onClick={() => { setFiles([]); setStatus("idle"); setResultUrl(null); }} className="w-full">Process Another PDF</Button>
              </div>
            )}
          </div>
          <RelatedTools currentToolId="remove-watermark" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
