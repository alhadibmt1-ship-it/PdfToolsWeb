import { Loader2, CheckCircle2, XCircle, Sparkles, Download, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, tFormat } from "@/lib/languages";

interface ProcessingStateProps {
  status: "idle" | "processing" | "success" | "error";
  message?: string;
  progress?: number;
  className?: string;
  onDownload?: () => void;
  downloadLabel?: string;
  resultInfo?: string;
  fileCount?: number;
  // Post-download funnel: 1-2 relevant next tools, shown right after the
  // download button — the highest-attention moment on the page. Pass
  // seoData.internalLinks.slice(0, 2) from the tool page's own SEO data so
  // suggestions stay genuinely relevant rather than generic.
  relatedLinks?: { text: string; href: string }[];
}

export default function ProcessingState({ 
  status, 
  message, 
  progress = 0,
  className,
  onDownload,
  downloadLabel,
  resultInfo,
  fileCount,
  relatedLinks
}: ProcessingStateProps) {
  const { lang } = useLanguage();

  if (status === "idle") return null;

  const processingTitle = fileCount && fileCount > 1
    ? tFormat(lang, "processingFiles", { n: fileCount })
    : t(lang, "processingYourFile");

  return (
    <div 
      className={cn(
        "rounded-2xl border bg-card overflow-hidden transition-all", 
        status === "success" && "border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent",
        status === "error" && "border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent",
        status === "processing" && "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent",
        className
      )} 
      data-testid="processing-state"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center space-y-5">
          {status === "processing" && (
            <>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
              </div>
              
              <div className="w-full max-w-sm space-y-3 text-center">
                <h3 className="text-lg font-semibold">
                  {processingTitle}
                </h3>
                <Progress value={progress} className="h-2.5" data-testid="progress-bar" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{message || t(lang, "processingFile")}</span>
                  {progress > 0 && <span className="font-medium">{progress}%</span>}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                {t(lang, "processedSecurely")}
              </p>
            </>
          )}
          
          {status === "success" && (
            <>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-500" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
                  {t(lang, "successTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {message || t(lang, "fileReadyDownload")}
                </p>
                {resultInfo && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {resultInfo}
                  </p>
                )}
              </div>
              
              {onDownload && (
                <Button 
                  size="lg" 
                  onClick={onDownload}
                  className="gap-2 shadow-md mt-2"
                  data-testid="button-download"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  {downloadLabel || t(lang, "downloadBtn")}
                </Button>
              )}

              {relatedLinks && relatedLinks.length > 0 && (
                <div className="w-full max-w-sm mt-4 pt-4 border-t border-border/50 space-y-2" lang="en" dir="ltr">
                  <p className="text-xs text-muted-foreground text-center">What's next?</p>
                  {relatedLinks.slice(0, 2).map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      data-testid={`link-post-download-${i}`}
                    >
                      {link.text}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
          
          {status === "error" && (
            <>
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-destructive" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-destructive/20" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-destructive">
                  {t(lang, "errorTitle")}
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {message || t(lang, "errorMessage")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
