import { useState, useCallback } from "react";
import { ChevronLeft, Download, FileText } from "lucide-react";
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

export default function PdfStamperPage() {
  useSEO({
    title: "Add Stamp to PDF Free Online | PDF HUB 24",
    description: "Add custom text stamps to PDF pages free online. Approved, confidential, draft stamps and more. No signup. PDF HUB 24.",
    keywords: "pdf-stamper free, pdf-stamper online, pdf-stamper no signup, pdf hub 24",
    canonicalPath: "/pdf-stamper"
  });
  const { lang } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { progress, runWithProgress } = useConversionProgress();

  const handleFilesSelected = useCallback((newFiles: File[]) => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null); setStatus("idle"); setFiles(newFiles);
  }, [resultUrl]);

  const handleProcess = async () => {
    if (!files[0]) return;
    setStatus("processing");
    try {
      await runWithProgress(async () => {
        const formData = new FormData();
        formData.append("file", files[0]);
        const res = await fetch("/api/pdf-stamper", { method: "POST", body: formData });
        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || "Processing failed"); }
        const blob = await res.blob();
        setResultUrl(URL.createObjectURL(blob));
        setStatus("success");
      });
    } catch (e: any) {
      setStatus("error");
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Add Stamp to PDF</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">Add custom text stamps to PDF pages free online. Approved, confidential, draft stamps and more. No signup. PDF HUB 24.</p>
            <TrustBadges />
          </div>
          <div className="space-y-6">
            <FileUploadZone onFilesSelected={handleFilesSelected} acceptedFormats=".pdf" multiple={false} disabled={status === "processing"} />
            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /><h3 className="font-semibold">Ready to Process</h3></div>
                <Button onClick={handleProcess} className="w-full" size="lg">Add Stamp to PDF</Button>
              </div>
            )}
            <ProcessingState status={status === "processing" || status === "error" ? status : "idle"} progress={progress} message="Adding stamp..." />
            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Done! Your file is ready.</h3>
                <Button onClick={() => { const a = document.createElement("a"); a.href = resultUrl!; a.download = (files[0]?.name?.replace(/\.pdf$/i, "") || "file") + ".pdf"; a.click(); }} className="w-full" size="lg"><Download className="w-4 h-4 mr-2" />Download File</Button>
                <Button variant="outline" onClick={() => { setFiles([]); setStatus("idle"); setResultUrl(null); }} className="w-full">Process Another File</Button>
              </div>
            )}
          </div>
          <RelatedTools currentToolId="pdf-stamper" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
