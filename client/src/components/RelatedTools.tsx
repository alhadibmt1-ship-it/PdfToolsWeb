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
  Lock,
  Unlock,
  Hash,
  Droplet,
  Move,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import { Card } from "@/components/ui/card";

const relatedArticles: Record<string, { title: string; slug: string }[]> = {
  "compress": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "pdf-to-word": [
    { title: "Convert PDF to Word Without Losing Formatting", slug: "convert-pdf-to-word-without-losing-formatting" }
  ],
  "merge": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "how-to-merge-pdf-files" }
  ],
  "protect-pdf": [
    { title: "Password Protect PDF: Complete Security Guide", slug: "password-protect-pdf-complete-guide" }
  ],
  "split": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "unlock-pdf": [
    { title: "Password Protect PDF: Complete Security Guide", slug: "password-protect-pdf-complete-guide" }
  ],
  "add-watermark": [
    { title: "Password Protect PDF: Complete Security Guide", slug: "password-protect-pdf-complete-guide" }
  ],
  "annotate-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "edit-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "grayscale-pdf": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "delete-pages": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "how-to-merge-pdf-files" }
  ],
  "reorder-pages": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "how-to-merge-pdf-files" }
  ],
  "word-to-pdf": [
    { title: "Convert PDF to Word Without Losing Formatting", slug: "convert-pdf-to-word-without-losing-formatting" }
  ],
  "excel-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "jpg-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "png-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ]
};

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
};

const formatStyles: Record<string, { bgColor: string; textColor: string; label: string }> = {
  pdf: { bgColor: "bg-red-500", textColor: "text-white", label: "PDF" },
  word: { bgColor: "bg-blue-500", textColor: "text-white", label: "DOC" },
  jpg: { bgColor: "bg-orange-500", textColor: "text-white", label: "JPG" },
  png: { bgColor: "bg-purple-500", textColor: "text-white", label: "PNG" },
  excel: { bgColor: "bg-green-600", textColor: "text-white", label: "XLS" },
};

function ToolIcon({ iconType }: { iconType: string }) {
  if (iconType.includes("-to-")) {
    const [from, to] = iconType.split("-to-");
    const fromStyle = formatStyles[from];
    const toStyle = formatStyles[to];

    if (fromStyle && toStyle) {
      return (
        <div className="flex items-center gap-1">
          <div className={`w-7 h-7 rounded ${fromStyle.bgColor} ${fromStyle.textColor} flex items-center justify-center text-[8px] font-bold`}>
            {fromStyle.label}
          </div>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <div className={`w-7 h-7 rounded ${toStyle.bgColor} ${toStyle.textColor} flex items-center justify-center text-[8px] font-bold`}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const Icon = iconMap[iconType];
  if (Icon) {
    return (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <FileText className="w-5 h-5 text-primary" />
    </div>
  );
}

interface RelatedToolsProps {
  currentToolId: string;
  maxTools?: number;
}

export default function RelatedTools({ currentToolId, maxTools = 4 }: RelatedToolsProps) {
  const currentTool = PDF_TOOLS.find(tool => tool.id === currentToolId);
  const currentCategory = currentTool?.category;
  
  const relatedTools = PDF_TOOLS
    .filter(tool => tool.id !== currentToolId)
    .sort((a, b) => {
      if (a.category === currentCategory && b.category !== currentCategory) return -1;
      if (a.category !== currentCategory && b.category === currentCategory) return 1;
      return 0;
    })
    .slice(0, maxTools);

  const articles = relatedArticles[currentToolId] || [];

  return (
    <section className="mt-12 pt-8 border-t">
      {articles.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Related Articles
          </h2>
          <div className="space-y-3">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} data-testid={`link-article-${article.slug}`}>
                <Card className="p-4 hover-elevate cursor-pointer transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {article.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-6">More PDF Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedTools.map((tool) => (
          <Link key={tool.id} href={tool.path} data-testid={`link-related-${tool.id}`}>
            <Card className="p-4 h-full hover-elevate active-elevate-2 cursor-pointer transition-all group">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <ToolIcon iconType={tool.icon} />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
              </div>
            </Card>
          </Link>
        ))}
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
