import { Loader2, CheckCircle2, XCircle, Sparkles, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProcessingStateProps {
  status: "idle" | "processing" | "success" | "error";
  message?: string;
  progress?: number;
  className?: string;
  onDownload?: () => void;
  downloadLabel?: string;
  resultInfo?: string;
  fileCount?: number;
}

export default function ProcessingState({ 
  status, 
  message, 
  progress = 0,
  className,
  onDownload,
  downloadLabel = "Download",
  resultInfo,
  fileCount
}: ProcessingStateProps) {
  if (status === "idle") return null;

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
                  {fileCount && fileCount > 1 ? `Processing ${fileCount} Files` : "Processing Your File"}
                </h3>
                <Progress value={progress} className="h-2.5" data-testid="progress-bar" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{message || "Please wait..."}</span>
                  {progress > 0 && <span className="font-medium">{progress}%</span>}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Your file is being processed securely
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
                  Success!
                </h3>
                <p className="text-muted-foreground">
                  {message || "Your file is ready for download"}
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
                  {downloadLabel}
                </Button>
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
                  Oops! Something went wrong
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {message || "An error occurred while processing your file. Please try again."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
