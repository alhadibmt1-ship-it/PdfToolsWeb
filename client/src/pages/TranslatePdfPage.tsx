import { useState, useRef } from "react";
import { Languages, Upload, Download, FileText, CheckCircle, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRecentTools } from "@/contexts/RecentToolsContext";
import TrustBadges from "@/components/TrustBadges";
import RelatedTools from "@/components/RelatedTools";
import EnhancedToolSEOContent from "@/components/LazyEnhancedSEO";
import CloudImportBar from "@/components/CloudImportBar";
import { useSEO } from "@/hooks/useSEO";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ru", label: "Russian" },
  { code: "nl", label: "Dutch" },
  { code: "tr", label: "Turkish" },
  { code: "pl", label: "Polish" },
  { code: "sv", label: "Swedish" },
  { code: "da", label: "Danish" },
  { code: "fi", label: "Finnish" },
  { code: "no", label: "Norwegian" },
  { code: "cs", label: "Czech" },
  { code: "hu", label: "Hungarian" },
  { code: "ro", label: "Romanian" },
  { code: "uk", label: "Ukrainian" },
  { code: "el", label: "Greek" },
  { code: "he", label: "Hebrew" },
  { code: "th", label: "Thai" },
  { code: "vi", label: "Vietnamese" },
  { code: "id", label: "Indonesian" },
  { code: "ms", label: "Malay" },
  { code: "bn", label: "Bengali" },
  { code: "ur", label: "Urdu" },
  { code: "fa", label: "Persian (Farsi)" },
  { code: "sw", label: "Swahili" },
  { code: "tl", label: "Filipino (Tagalog)" },
  { code: "bg", label: "Bulgarian" },
  { code: "hr", label: "Croatian" },
  { code: "sr", label: "Serbian" },
  { code: "sk", label: "Slovak" },
  { code: "lt", label: "Lithuanian" },
  { code: "lv", label: "Latvian" },
  { code: "et", label: "Estonian" },
  { code: "af", label: "Afrikaans" },
  { code: "sq", label: "Albanian" },
  { code: "hy", label: "Armenian" },
  { code: "ka", label: "Georgian" },
  { code: "mk", label: "Macedonian" },
  { code: "mt", label: "Maltese" },
  { code: "sl", label: "Slovenian" },
  { code: "az", label: "Azerbaijani" },
  { code: "kk", label: "Kazakh" },
];

export default function TranslatePdfPage() {
  useSEO({
    title: "Translate PDF Online Free — Convert PDF to Any Language | PDF HUB 24",
    description: "Translate PDF online free. Convert your PDF document to Spanish, French, German, Chinese, Arabic and 50+ languages instantly.",
    keywords: "translate pdf online free, pdf translator online free, translate pdf document to spanish, pdf to french translation free, online pdf language converter",
    canonicalPath: "/translate-pdf"
  });

  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
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
    setProgress(0);
    addRecentTool("translate-pdf");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const translate = async () => {
    if (!file) return;
    if (sourceLang === targetLang) {
      toast({ title: "Same language", description: "Source and target languages must be different.", variant: "destructive" });
      return;
    }
    setIsTranslating(true);
    setProgress(10);
    setProgressMsg("Extracting text from PDF…");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sourceLang", sourceLang);
      formData.append("targetLang", targetLang);

      // Simulate progress steps
      const progressInterval = setInterval(() => {
        setProgress(p => {
          if (p < 85) {
            setProgressMsg(p < 30 ? "Extracting text from PDF…" : p < 60 ? "Translating content…" : "Building translated PDF…");
            return p + 3;
          }
          return p;
        });
      }, 800);

      const response = await fetch("/api/translate-pdf", { method: "POST", body: formData });

      clearInterval(progressInterval);

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Translation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
      setProgressMsg("Done!");

      const srcLabel = LANGUAGES.find(l => l.code === sourceLang)?.label || sourceLang;
      const tgtLabel = LANGUAGES.find(l => l.code === targetLang)?.label || targetLang;
      toast({ title: "Translation complete!", description: `Your PDF has been translated from ${srcLabel} to ${tgtLabel}.` });
    } catch (err: any) {
      toast({ title: "Translation failed", description: err.message || "Please try again.", variant: "destructive" });
      setProgress(0);
    } finally {
      setIsTranslating(false);
    }
  };

  const download = () => {
    if (!downloadUrl || !file) return;
    const tgtLabel = LANGUAGES.find(l => l.code === targetLang)?.label?.replace(/\s+/g, "_") || targetLang;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name.replace(/\.pdf$/i, `_${tgtLabel}.pdf`);
    a.click();
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setDownloadUrl(null);
    setProgress(0);
    setProgressMsg("");
  };

  const srcLabel = LANGUAGES.find(l => l.code === sourceLang)?.label;
  const tgtLabel = LANGUAGES.find(l => l.code === targetLang)?.label;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Languages className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Translate PDF</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Translate any PDF document into 50+ languages while preserving the content. Fast, free, and no signup required.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <Badge variant="secondary">50+ Languages</Badge>
            <Badge variant="secondary">Free &amp; No Signup</Badge>
            <Badge variant="secondary">Instant Download</Badge>
          </div>
        </div>

        <TrustBadges variant="expanded" className="mb-8" />

        {/* Upload Zone */}
        {!file ? (
          <>
            <div
              className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover-elevate transition-colors bg-muted/20 mb-4"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              data-testid="dropzone"
            >
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <div className="font-semibold mb-1">Drop your PDF here or click to browse</div>
              <div className="text-sm text-muted-foreground">Any PDF document, any size</div>
              <Button className="mt-4" data-testid="button-select">Select PDF File</Button>
            </div>
            <CloudImportBar accept="pdf" onFileImported={handleFile} />
          </>
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
              <Button variant="ghost" size="sm" onClick={reset} data-testid="button-remove">
                <X className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0] ?? null)}
        />

        {/* Language Selectors */}
        {file && (
          <Card className="mb-6">
            <CardContent className="p-5">
              <h2 className="font-semibold mb-4">Translation Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">From (Source Language)</label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger data-testid="select-source-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {LANGUAGES.map(l => (
                        <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">To (Target Language)</label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger data-testid="select-target-lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {LANGUAGES.map(l => (
                        <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {sourceLang === targetLang && (
                <p className="text-sm text-destructive mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Source and target languages must be different.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Progress Bar */}
        {isTranslating && (
          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{progressMsg}</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Translating from <strong>{srcLabel}</strong> to <strong>{tgtLabel}</strong>. Large documents may take a moment.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {file && !isTranslating && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {!downloadUrl ? (
              <Button
                className="flex-1 gap-2"
                onClick={translate}
                disabled={sourceLang === targetLang}
                data-testid="button-translate"
              >
                <Languages className="w-4 h-4" />
                Translate to {tgtLabel}
              </Button>
            ) : (
              <>
                <Button className="flex-1 gap-2" onClick={download} data-testid="button-download">
                  <Download className="w-4 h-4" /> Download Translated PDF
                </Button>
                <Button variant="outline" onClick={reset} data-testid="button-translate-another">
                  Translate Another
                </Button>
              </>
            )}
          </div>
        )}

        {downloadUrl && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-700 dark:text-green-400 mb-8">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Translation complete. Your {tgtLabel} PDF is ready to download.
          </div>
        )}

        {/* Supported Languages Grid */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">50+ Supported Languages</h2>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => setTargetLang(l.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    targetLang === l.code
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 border-border hover:bg-muted text-foreground"
                  }`}
                  data-testid={`lang-btn-${l.code}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">How PDF Translation Works</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { step: "1", title: "Upload Your PDF", desc: "Select any PDF file — contracts, reports, articles, books, or any document." },
                { step: "2", title: "Choose Languages", desc: "Pick your source language and the language you want to translate into." },
                { step: "3", title: "Download Translated PDF", desc: "Your document is translated and returned as a clean, downloadable PDF." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{step}</div>
                  <div>
                    <div className="font-semibold mb-1">{title}</div>
                    <div className="text-sm text-muted-foreground">{desc}</div>
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
                { q: "Is PDF translation free?", a: "Yes, completely free. No signup, no payment, no watermarks." },
                { q: "How many languages are supported?", a: "Over 50 languages including English, Spanish, French, German, Arabic, Hindi, Chinese, Japanese, and many more." },
                { q: "Will the PDF formatting be preserved?", a: "The text content is fully translated. Complex visual layouts (tables, multi-column layouts) are linearized into a clean readable format." },
                { q: "How large a PDF can I translate?", a: "Most documents up to several hundred pages translate well. Very large documents may take slightly longer." },
                { q: "Is my document private?", a: "Yes. Your file is processed in memory on our secure server and immediately deleted. We never store or share your documents." },
                { q: "Can I translate scanned PDFs?", a: "Scanned image-based PDFs need OCR first. Use our OCR PDF tool to make the text selectable, then translate." },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="font-semibold text-foreground mb-1">{q}</div>
                  <div className="text-muted-foreground">{a}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <EnhancedToolSEOContent toolId="translate-pdf" />
      </div>
    </div>
  );
}
