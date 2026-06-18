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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

export default function EditMetadataPage() {
  useSEO({
    title: "Edit PDF Metadata Free Online | PDF HUB 24",
    description: "Edit PDF title, author, subject and keywords metadata free online. Clean up and update PDF document properties instantly. No signup. PDF HUB 24.",
    keywords: "edit pdf metadata free, change pdf title author, pdf properties editor free, update pdf metadata online, edit pdf document info free, pdf metadata editor no signup",
    canonicalPath: "/edit-metadata"
  });

  const { lang } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
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
        formData.append("title", title);
        formData.append("author", author);
        formData.append("subject", subject);
        formData.append("keywords", keywords);
        const res = await fetch("/api/edit-metadata", { method: "POST", body: formData });
        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || "Failed to edit metadata"); }
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Edit PDF Metadata</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">Update the title, author, subject and keywords of any PDF document. Fix incorrect document properties in seconds.</p>
            <TrustBadges />
          </div>
          <div className="space-y-6">
            <FileUploadZone onFilesSelected={handleFilesSelected} acceptedFormats=".pdf" multiple={false} disabled={status === "processing"} />
            {files.length > 0 && status === "idle" && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /><h3 className="font-semibold">Edit Document Properties</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" placeholder="Document title" value={title} onChange={e => setTitle(e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="author">Author</Label><Input id="author" placeholder="Author name" value={author} onChange={e => setAuthor(e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="subject">Subject</Label><Input id="subject" placeholder="Document subject" value={subject} onChange={e => setSubject(e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="keywords">Keywords</Label><Input id="keywords" placeholder="keyword1, keyword2" value={keywords} onChange={e => setKeywords(e.target.value)} /></div>
                </div>
                <Button onClick={handleProcess} className="w-full" size="lg">Save Metadata</Button>
              </div>
            )}
            <ProcessingState status={status === "processing" || status === "error" ? status : "idle"} progress={progress} message="Updating PDF metadata..." />
            {status === "success" && resultUrl && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Metadata updated successfully!</h3>
                <Button onClick={() => { const a = document.createElement("a"); a.href = resultUrl!; a.download = files[0]?.name?.replace(/\.pdf$/i, "") + "-updated.pdf"; a.click(); }} className="w-full" size="lg"><Download className="w-4 h-4 mr-2" />Download Updated PDF</Button>
                <Button variant="outline" onClick={() => { setFiles([]); setStatus("idle"); setResultUrl(null); }} className="w-full">Edit Another PDF</Button>
              </div>
            )}
          </div>
          <RelatedTools currentToolId="edit-metadata" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
