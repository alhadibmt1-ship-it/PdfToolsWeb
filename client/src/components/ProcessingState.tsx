import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProcessingStateProps {
  status: "idle" | "processing" | "success" | "error";
  message?: string;
  progress?: number;
  className?: string;
}

export default function ProcessingState({ 
  status, 
  message, 
  progress = 0,
  className 
}: ProcessingStateProps) {
  if (status === "idle") return null;

  return (
    <div className={cn("rounded-lg border bg-card p-6", className)} data-testid="processing-state">
      <div className="flex flex-col items-center justify-center space-y-4">
        {status === "processing" && (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="w-full max-w-xs space-y-2">
              <Progress value={progress} className="h-2" data-testid="progress-bar" />
              <p className="text-sm text-center text-muted-foreground">
                {message || "Processing your PDF..."}
              </p>
              {progress > 0 && (
                <p className="text-xs text-center text-muted-foreground">
                  {progress}%
                </p>
              )}
            </div>
          </>
        )}
        
        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm font-medium text-center">
              {message || "Processing complete!"}
            </p>
          </>
        )}
        
        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-sm font-medium text-center text-destructive">
              {message || "An error occurred"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
