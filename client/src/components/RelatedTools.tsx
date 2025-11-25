import { Link } from "wouter";
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
  ArrowRight
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import { Card } from "@/components/ui/card";

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
};

interface RelatedToolsProps {
  currentToolId: string;
  maxTools?: number;
}

export default function RelatedTools({ currentToolId, maxTools = 4 }: RelatedToolsProps) {
  const relatedTools = PDF_TOOLS.filter(tool => tool.id !== currentToolId).slice(0, maxTools);

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-semibold mb-6">More PDF Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedTools.map((tool) => {
          const Icon = iconMap[tool.icon];
          return (
            <Link key={tool.id} href={tool.path} data-testid={`link-related-${tool.id}`}>
              <Card className="p-4 h-full hover-elevate active-elevate-2 cursor-pointer transition-all group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/" data-testid="link-all-tools">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer">
            View All Tools
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
