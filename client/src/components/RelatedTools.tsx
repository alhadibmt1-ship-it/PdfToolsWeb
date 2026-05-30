import { Link } from "wouter";
import {
  Combine, SplitSquareHorizontal, FileDown, Image, FileImage, FileText,
  RotateCw, Trash2, Type, Lock, Unlock, Hash, Droplet, Move,
  ArrowRight, BookOpen, Workflow, Sparkles
} from "lucide-react";
import { PDF_TOOLS } from "@shared/schema";
import AdSlot from "./AdSlot";

const relatedArticles: Record<string, { title: string; slug: string }[]> = {
  "compress": [
    { title: "How to Compress PDF for Email (Under 25MB)", slug: "how-to-compress-pdf-for-email" },
    { title: "Essential PDF Tools Every Student Needs", slug: "pdf-tools-for-students" },
    { title: "Best Free PDF Tools in 2026", slug: "best-free-pdf-tools-2026" }
  ],
  "pdf-to-word": [
    { title: "Convert PDF to Word Without Losing Formatting", slug: "convert-pdf-to-word-without-losing-formatting" },
    { title: "How to Edit a PDF: Add Text, Images, and Shapes", slug: "edit-pdf-text-images" },
    { title: "Essential PDF Tools Every Student Needs", slug: "pdf-tools-for-students" }
  ],
  "merge": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "merge-pdf-files-guide" },
    { title: "Essential PDF Tools Every Student Needs", slug: "pdf-tools-for-students" },
    { title: "Best Free PDF Tools in 2026", slug: "best-free-pdf-tools-2026" }
  ],
  "sign-pdf": [
    { title: "How to Sign a PDF Electronically: Free Online Guide", slug: "sign-pdf-electronically" },
    { title: "How to Password Protect a PDF", slug: "protect-pdf-with-password" },
    { title: "How to Flatten a PDF", slug: "how-to-flatten-pdf" }
  ],
};

const workflowSuggestions: Record<string, { text: string; toolId: string }[]> = {
  "merge": [
    { text: "Compress your PDF to reduce file size", toolId: "compress" },
    { text: "Add page numbers to your merged document", toolId: "add-page-numbers" },
    { text: "Protect your merged PDF with a password", toolId: "protect-pdf" }
  ],
  "split": [
    { text: "Compress split pages for easier sharing", toolId: "compress" },
    { text: "Convert split pages to images", toolId: "pdf-to-jpg" }
  ],
  "compress": [
    { text: "Convert to grayscale for even smaller files", toolId: "grayscale-pdf" },
    { text: "Flatten your PDF before compressing", toolId: "flatten-pdf" }
  ],
  "pdf-to-word": [
    { text: "Convert back to PDF after editing", toolId: "word-to-pdf" },
    { text: "Extract just the text if needed", toolId: "extract-text" }
  ],
  "protect-pdf": [
    { text: "Add a watermark for extra security", toolId: "add-watermark" },
    { text: "Redact sensitive info before protecting", toolId: "redact-pdf" }
  ],
  "sign-pdf": [
    { text: "Flatten the signed PDF to lock the signature", toolId: "flatten-pdf" },
    { text: "Protect the signed document", toolId: "protect-pdf" }
  ],
  "ocr-pdf": [
    { text: "Extract the recognized text", toolId: "extract-text" },
    { text: "Convert the searchable PDF to Word", toolId: "pdf-to-word" }
  ],
};

const iconMap: Record<string, any> = {
  merge: Combine, split: SplitSquareHorizontal, compress: FileDown,
  image: Image, "file-image": FileImage, "file-text": FileText,
  "rotate-cw": RotateCw, trash: Trash2, "file-type": Type,
  lock: Lock, unlock: Unlock, hash: Hash, droplet: Droplet, move: Move,
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
        <div className="flex items-center gap-1.5">
          <div className={`w-8 h-8 rounded-lg ${fromStyle.bgColor} ${fromStyle.textColor} flex items-center justify-center text-[9px] font-bold shadow-sm`}>
            {fromStyle.label}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
          <div className={`w-8 h-8 rounded-lg ${toStyle.bgColor} ${toStyle.textColor} flex items-center justify-center text-[9px] font-bold shadow-sm`}>
            {toStyle.label}
          </div>
        </div>
      );
    }
  }

  const iconColors: Record<string, { bg: string; text: string }> = {
    compress:      { bg: "bg-orange-500/10", text: "text-orange-500" },
    merge:         { bg: "bg-blue-500/10",   text: "text-blue-600" },
    split:         { bg: "bg-purple-500/10", text: "text-purple-500" },
    "rotate-cw":   { bg: "bg-teal-500/10",   text: "text-teal-500" },
    trash:         { bg: "bg-red-500/10",    text: "text-red-500" },
    move:          { bg: "bg-blue-400/10",   text: "text-blue-400" },
    droplet:       { bg: "bg-slate-400/10",  text: "text-slate-500" },
    lock:          { bg: "bg-red-600/10",    text: "text-red-600" },
    unlock:        { bg: "bg-green-600/10",  text: "text-green-600" },
    hash:          { bg: "bg-blue-500/10",   text: "text-blue-500" },
    image:         { bg: "bg-pink-500/10",   text: "text-pink-500" },
    "file-image":  { bg: "bg-pink-500/10",   text: "text-pink-500" },
    "file-type":   { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  };

  const colors = iconColors[iconType] || { bg: "bg-primary/10", text: "text-primary" };
  const Icon = iconMap[iconType];

  return (
    <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center`}>
      {Icon
        ? <Icon className={`w-5 h-5 ${colors.text}`} />
        : <FileText className={`w-5 h-5 ${colors.text}`} />
      }
    </div>
  );
}

interface RelatedToolsProps {
  currentToolId: string;
  maxTools?: number;
}

export default function RelatedTools({ currentToolId, maxTools = 6 }: RelatedToolsProps) {
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
  const workflows = workflowSuggestions[currentToolId] || [];

  return (
    <section className="mt-12 pt-10 border-t border-border/50">

      {/* What to Do Next */}
      {workflows.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Workflow className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-bold">What to Do Next</h2>
          </div>
          <div className="space-y-2.5">
            {workflows.map((wf) => {
              const targetTool = PDF_TOOLS.find(t => t.id === wf.toolId);
              if (!targetTool) return null;
              return (
                <Link key={wf.toolId} href={targetTool.path} data-testid={`link-workflow-${wf.toolId}`}>
                  <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/3 transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {wf.text}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary flex-shrink-0 bg-primary/10 px-2.5 py-1 rounded-full">
                      {targetTool.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {articles.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-lg font-bold">Related Articles</h2>
          </div>
          <div className="space-y-2.5">
            {articles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} data-testid={`link-article-${article.slug}`}>
                <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-amber-500/30 hover:bg-amber-500/3 transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer">
                  <span className="text-sm font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {article.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ad Slot */}
      <AdSlot format="rectangle" label="Advertisement" />

      {/* More PDF Tools */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-500" />
            </div>
            <h2 className="text-lg font-bold">More PDF Tools</h2>
          </div>
          <Link href="/" data-testid="link-all-tools">
            <span className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
              View All 49+
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relatedTools.map((tool) => (
            <Link key={tool.id} href={tool.path} data-testid={`link-related-${tool.id}`}>
              <div className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:bg-primary/3 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer h-full">
                <ToolIcon iconType={tool.icon} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate hidden sm:block">
                    {tool.description?.slice(0, 40)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
