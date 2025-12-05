import { Play, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TutorialVideoProps {
  toolName: string;
  toolId: string;
  steps?: string[];
}

const toolVideoData: Record<string, { duration: string; thumbnail?: string }> = {
  "merge": { duration: "0:45" },
  "split": { duration: "0:38" },
  "compress": { duration: "0:42" },
  "pdf-to-word": { duration: "0:55" },
  "pdf-to-jpg": { duration: "0:40" },
  "pdf-to-png": { duration: "0:40" },
  "pdf-to-excel": { duration: "0:50" },
  "word-to-pdf": { duration: "0:35" },
  "jpg-to-pdf": { duration: "0:48" },
  "png-to-pdf": { duration: "0:45" },
  "excel-to-pdf": { duration: "0:42" },
  "html-to-pdf": { duration: "0:55" },
  "webp-to-pdf": { duration: "0:38" },
  "rotate": { duration: "0:32" },
  "delete-pages": { duration: "0:45" },
  "protect-pdf": { duration: "0:50" },
  "unlock-pdf": { duration: "0:35" },
  "add-page-numbers": { duration: "0:48" },
  "add-watermark": { duration: "0:52" },
  "reorder-pages": { duration: "0:58" },
  "crop-pdf": { duration: "0:45" },
  "resize-pdf": { duration: "0:40" },
  "sign-pdf": { duration: "1:05" },
  "flatten-pdf": { duration: "0:35" },
  "grayscale-pdf": { duration: "0:30" },
  "repair-pdf": { duration: "0:42" },
  "extract-text": { duration: "0:38" },
  "extract-images": { duration: "0:45" },
  "ocr-pdf": { duration: "1:15" },
  "pdf-viewer": { duration: "0:28" },
  "compare-pdf": { duration: "0:55" },
  "image-compressor": { duration: "0:40" },
};

const defaultSteps = [
  "Click the upload area or drag your file",
  "Adjust settings if needed",
  "Click the action button to process",
  "Download your result"
];

export default function TutorialVideo({ toolName, toolId, steps = defaultSteps }: TutorialVideoProps) {
  const videoInfo = toolVideoData[toolId] || { duration: "0:45" };

  return (
    <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Video Preview */}
        <div className="relative w-full sm:w-64 md:w-72 lg:w-80 flex-shrink-0">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            {/* Decorative PDF icon pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-10 border-2 border-white rounded" />
              <div className="absolute bottom-4 right-4 w-6 h-8 border-2 border-white rounded" />
              <div className="absolute top-1/2 left-1/3 w-5 h-6 border-2 border-white rounded transform -translate-y-1/2" />
            </div>
            
            {/* Play button */}
            <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all shadow-lg shadow-primary/30">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground ml-1" fill="currentColor" />
            </div>
            
            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {videoInfo.duration}
            </div>
            
            {/* Coming soon overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium px-3 py-1.5 rounded-full bg-primary/80">
                Video Coming Soon
              </span>
            </div>
          </div>
        </div>
        
        {/* Quick steps */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            Quick Tutorial: {toolName}
          </h3>
          <div className="space-y-2">
            {steps.slice(0, 4).map((step, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            No account required - start using immediately
          </p>
        </div>
      </div>
    </Card>
  );
}
