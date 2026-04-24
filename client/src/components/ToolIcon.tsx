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
  ImageDown,
  EyeOff,
  FileEdit,
  Highlighter,
  Camera,
  Archive,
  Languages,
  RotateCcw,
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
  "rotate-ccw": RotateCcw,
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
  "edit-pdf": FileEdit,
  annotate: Highlighter,
  redact: EyeOff,
  camera: Camera,
  archive: Archive,
  languages: Languages,
};

const iconColors: Record<string, { bg: string; text: string }> = {
  compress:       { bg: "bg-orange-500/10",   text: "text-orange-500" },
  merge:          { bg: "bg-blue-500/10",      text: "text-blue-600" },
  split:          { bg: "bg-purple-500/10",    text: "text-purple-500" },
  "rotate-cw":    { bg: "bg-teal-500/10",      text: "text-teal-500" },
  "rotate-ccw":   { bg: "bg-teal-500/10",      text: "text-teal-500" },
  trash:          { bg: "bg-red-500/10",       text: "text-red-500" },
  move:           { bg: "bg-blue-400/10",      text: "text-blue-400" },
  scissors:       { bg: "bg-green-500/10",     text: "text-green-500" },
  droplet:        { bg: "bg-slate-400/10",     text: "text-slate-500" },
  lock:           { bg: "bg-red-600/10",       text: "text-red-600" },
  unlock:         { bg: "bg-green-600/10",     text: "text-green-600" },
  hash:           { bg: "bg-blue-500/10",      text: "text-blue-500" },
  layers:         { bg: "bg-slate-500/10",     text: "text-slate-500" },
  grayscale:      { bg: "bg-gray-500/10",      text: "text-gray-500" },
  repair:         { bg: "bg-amber-500/10",     text: "text-amber-500" },
  "html-to-pdf":  { bg: "bg-orange-700/10",   text: "text-orange-700" },
  images:         { bg: "bg-cyan-500/10",      text: "text-cyan-500" },
  ocr:            { bg: "bg-teal-600/10",      text: "text-teal-600" },
  viewer:         { bg: "bg-indigo-500/10",    text: "text-indigo-500" },
  compare:        { bg: "bg-violet-500/10",    text: "text-violet-500" },
  "image-compress": { bg: "bg-orange-400/10", text: "text-orange-400" },
  signature:      { bg: "bg-blue-600/10",      text: "text-blue-600" },
  "edit-pdf":     { bg: "bg-blue-500/10",      text: "text-blue-500" },
  annotate:       { bg: "bg-amber-500/10",     text: "text-amber-500" },
  redact:         { bg: "bg-zinc-700/10",      text: "text-zinc-700 dark:text-zinc-300" },
  crop:           { bg: "bg-green-500/10",     text: "text-green-500" },
  resize:         { bg: "bg-sky-400/10",       text: "text-sky-400" },
  "file-type":    { bg: "bg-indigo-500/10",    text: "text-indigo-500" },
  "file-image":   { bg: "bg-pink-500/10",      text: "text-pink-500" },
  image:          { bg: "bg-pink-500/10",      text: "text-pink-500" },
  "file-text":    { bg: "bg-blue-500/10",      text: "text-blue-500" },
  camera:         { bg: "bg-rose-500/10",      text: "text-rose-500" },
  archive:        { bg: "bg-yellow-600/10",    text: "text-yellow-600" },
  languages:      { bg: "bg-emerald-500/10",   text: "text-emerald-500" },
};

const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
  pdf:  { bgColor: "bg-red-600",    textColor: "text-white", label: "PDF" },
  word: { bgColor: "bg-blue-600",   textColor: "text-white", label: "DOC" },
  jpg:  { bgColor: "bg-orange-600", textColor: "text-white", label: "JPG" },
  png:  { bgColor: "bg-purple-600", textColor: "text-white", label: "PNG" },
  excel:{ bgColor: "bg-green-700",  textColor: "text-white", label: "XLS" },
  html: { bgColor: "bg-orange-700", textColor: "text-white", label: "HTML" },
  webp: { bgColor: "bg-cyan-700",   textColor: "text-white", label: "WEBP" },
  ppt:  { bgColor: "bg-orange-500", textColor: "text-white", label: "PPT" },
  tiff: { bgColor: "bg-indigo-600", textColor: "text-white", label: "TIFF" },
  gif:  { bgColor: "bg-pink-600",   textColor: "text-white", label: "GIF" },
};

interface ToolIconProps {
  iconType: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ToolIcon({ iconType, size = "md", className }: ToolIconProps) {
  const sizeClasses = {
    sm: { container: "w-8 h-8",   icon: "w-4 h-4", text: "text-[7px]",  arrow: "w-2.5 h-2.5" },
    md: { container: "w-10 h-10", icon: "w-5 h-5", text: "text-[8px]",  arrow: "w-3 h-3" },
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
  const colors = iconColors[iconType] || { bg: "bg-primary/10", text: "text-primary" };

  if (Icon) {
    return (
      <div className={cn(sizes.container, "rounded-lg flex items-center justify-center", colors.bg, className)}>
        <Icon className={cn(sizes.icon, colors.text)} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={cn(sizes.container, "rounded-lg bg-primary/10 flex items-center justify-center", className)}>
      <FileText className={cn(sizes.icon, "text-primary")} aria-hidden="true" />
    </div>
  );
}
