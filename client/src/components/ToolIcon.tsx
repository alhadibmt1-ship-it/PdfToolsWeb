import { 
  Combine, 
  SplitSquareHorizontal, 
  FileDown, 
  Image, 
  FileImage, 
  FileText, 
  RotateCw, 
  Trash2, 
  Type,
  Lock,
  Unlock,
  Hash,
  Droplet,
  Move,
  ArrowRight,
  Crop,
  Maximize2,
  PenTool,
  Layers,
  Contrast,
  Wrench,
  FileCode,
  Images,
  ScanText,
  Eye,
  GitCompare,
  ImageDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  merge: Combine,
  split: SplitSquareHorizontal,
  compress: FileDown,
  image: Image,
  "file-image": FileImage,
  "file-text": FileText,
  "rotate-cw": RotateCw,
  trash: Trash2,
  "file-type": Type,
  lock: Lock,
  unlock: Unlock,
  hash: Hash,
  droplet: Droplet,
  move: Move,
  crop: Crop,
  resize: Maximize2,
  signature: PenTool,
  layers: Layers,
  grayscale: Contrast,
  repair: Wrench,
  "html-to-pdf": FileCode,
  images: Images,
  ocr: ScanText,
  viewer: Eye,
  compare: GitCompare,
  "image-compress": ImageDown,
};

const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
  pdf: { bgColor: "bg-red-600", textColor: "text-white", label: "PDF" },
  word: { bgColor: "bg-blue-600", textColor: "text-white", label: "DOC" },
  jpg: { bgColor: "bg-orange-600", textColor: "text-white", label: "JPG" },
  png: { bgColor: "bg-purple-600", textColor: "text-white", label: "PNG" },
  excel: { bgColor: "bg-green-700", textColor: "text-white", label: "XLS" },
  html: { bgColor: "bg-orange-700", textColor: "text-white", label: "HTML" },
  webp: { bgColor: "bg-cyan-700", textColor: "text-white", label: "WEBP" },
};

interface ToolIconProps {
  iconType: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ToolIcon({ iconType, size = "md", className }: ToolIconProps) {
  const sizeClasses = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4", text: "text-[7px]", arrow: "w-2.5 h-2.5" },
    md: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-[8px]", arrow: "w-3 h-3" },
    lg: { container: "w-12 h-12", icon: "w-6 h-6", text: "text-[10px]", arrow: "w-4 h-4" },
  };

  const sizes = sizeClasses[size];

  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromStyle = formatStyles[from];
    const toStyle = formatStyles[to];

    if (fromStyle && toStyle) {
      return (
        <div className={cn("flex items-center gap-1", className)}>
          <div className={cn(sizes.container, "rounded", fromStyle.bgColor, fromStyle.textColor, "flex items-center justify-center font-bold", sizes.text)}>
            {fromStyle.label}
          </div>
          <ArrowRight className={cn(sizes.arrow, "text-muted-foreground")} aria-hidden="true" />
          <div className={cn(sizes.container, "rounded", toStyle.bgColor, toStyle.textColor, "flex items-center justify-center font-bold", sizes.text)}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const Icon = iconMap[iconType];
  if (Icon) {
    return (
      <div className={cn(sizes.container, "rounded-lg bg-primary/10 flex items-center justify-center", className)}>
        <Icon className={cn(sizes.icon, "text-primary")} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={cn(sizes.container, "rounded-lg bg-primary/10 flex items-center justify-center", className)}>
      <FileText className={cn(sizes.icon, "text-primary")} aria-hidden="true" />
    </div>
  );
}
