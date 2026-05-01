import { Link } from "wouter";
import { FileDown, Combine, FileText, Image, SplitSquareHorizontal, LayoutGrid } from "lucide-react";

const quickActions = [
  { id: "compress",    label: "Compress", icon: FileDown,               path: "/compress-pdf",     color: "text-orange-500" },
  { id: "merge",       label: "Merge",    icon: Combine,                path: "/merge-pdf",         color: "text-blue-500" },
  { id: "pdf-to-word", label: "To Word",  icon: FileText,               path: "/pdf-to-word",  color: "text-indigo-500" },
  { id: "pdf-to-jpg",  label: "To JPG",   icon: Image,                  path: "/pdf-to-jpg",   color: "text-orange-400" },
  { id: "split",       label: "Split",    icon: SplitSquareHorizontal,  path: "/split-pdf",         color: "text-purple-500" },
  { id: "all-tools",   label: "More",     icon: LayoutGrid,             path: "/all-tools",     color: "text-teal-500" },
];

export default function MobileQuickActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t safe-area-bottom">
      <div className="grid grid-cols-6 gap-0">
        {quickActions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <Link key={action.id} href={action.path} data-testid={`link-quick-${action.id}`}>
              <div 
                className="flex flex-col items-center justify-center py-2.5 px-1 active:bg-muted/50 transition-colors touch-manipulation"
              >
                <ActionIcon className={`w-5 h-5 ${action.color} mb-1`} />
                <span className="text-[9px] font-medium text-muted-foreground truncate w-full text-center">
                  {action.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
