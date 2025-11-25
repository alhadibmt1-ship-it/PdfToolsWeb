import { FileText, Image, Table, ArrowRight } from "lucide-react";

interface ConversionIconProps {
  iconType: string;
  className?: string;
}

const formatIcons: Record<string, { icon: typeof FileText; label: string; color: string }> = {
  pdf: { icon: FileText, label: "PDF", color: "text-red-500" },
  word: { icon: FileText, label: "DOC", color: "text-blue-500" },
  jpg: { icon: Image, label: "JPG", color: "text-orange-500" },
  png: { icon: Image, label: "PNG", color: "text-purple-500" },
  excel: { icon: Table, label: "XLS", color: "text-green-500" },
};

export default function ConversionIcon({ iconType, className = "" }: ConversionIconProps) {
  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromFormat = formatIcons[from];
    const toFormat = formatIcons[to];

    if (fromFormat && toFormat) {
      const FromIcon = fromFormat.icon;
      const ToIcon = toFormat.icon;

      return (
        <div className={`flex items-center gap-1 ${className}`}>
          <div className="relative">
            <FromIcon className={`w-5 h-5 ${fromFormat.color}`} />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-background px-0.5 rounded">
              {fromFormat.label}
            </span>
          </div>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <div className="relative">
            <ToIcon className={`w-5 h-5 ${toFormat.color}`} />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-background px-0.5 rounded">
              {toFormat.label}
            </span>
          </div>
        </div>
      );
    }
  }

  return null;
}
