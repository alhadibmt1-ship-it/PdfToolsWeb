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
  BookOpen,
  Workflow
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
    { title: "How to Merge PDF Files: Complete Guide", slug: "merge-pdf-files-guide" }
  ],
  "protect-pdf": [
    { title: "Password Protect PDF: Complete Security Guide", slug: "protect-pdf-with-password" }
  ],
  "split": [
    { title: "How to Split PDF Pages", slug: "how-to-split-pdf-pages" },
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "unlock-pdf": [
    { title: "Password Protect PDF: Complete Security Guide", slug: "protect-pdf-with-password" }
  ],
  "add-watermark": [
    { title: "How to Add Watermark to PDF", slug: "watermark-pdf-documents" },
    { title: "Password Protect PDF: Complete Security Guide", slug: "protect-pdf-with-password" }
  ],
  "annotate-pdf": [
    { title: "How to Edit a PDF: Add Text, Images, and Shapes", slug: "edit-pdf-text-images" },
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "edit-pdf": [
    { title: "How to Edit a PDF: Add Text, Images, and Shapes", slug: "edit-pdf-text-images" },
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "grayscale-pdf": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "delete-pages": [
    { title: "How to Split PDF Pages", slug: "how-to-split-pdf-pages" },
    { title: "How to Merge PDF Files: Complete Guide", slug: "merge-pdf-files-guide" }
  ],
  "reorder-pages": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "merge-pdf-files-guide" }
  ],
  "word-to-pdf": [
    { title: "Convert PDF to Word Without Losing Formatting", slug: "convert-pdf-to-word-without-losing-formatting" }
  ],
  "excel-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "jpg-to-pdf": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" },
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "png-to-pdf": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" },
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "pdf-to-jpg": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "pdf-to-png": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "pdf-to-excel": [
    { title: "How to Convert PDF Tables to Excel", slug: "pdf-to-excel-convert-tables" },
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "pdf-to-ppt": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "ppt-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "rotate": [
    { title: "How to Rotate PDF Pages", slug: "rotate-pdf-pages" }
  ],
  "add-page-numbers": [
    { title: "How to Add Page Numbers to PDF", slug: "add-page-numbers-to-pdf" }
  ],
  "extract-text": [
    { title: "OCR PDF: Scanned Documents to Text", slug: "ocr-scanned-pdf-to-text" }
  ],
  "ocr-pdf": [
    { title: "OCR PDF: Scanned Documents to Text", slug: "ocr-scanned-pdf-to-text" }
  ],
  "extract-images": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "tiff-to-pdf": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "gif-to-pdf": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "webp-to-pdf": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "html-to-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "crop-pdf": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "resize-pdf": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "sign-pdf": [
    { title: "How to Sign a PDF Electronically", slug: "sign-pdf-electronically" },
    { title: "Password Protect PDF: Complete Security Guide", slug: "protect-pdf-with-password" }
  ],
  "flatten-pdf": [
    { title: "How to Sign a PDF Electronically", slug: "sign-pdf-electronically" },
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "repair-pdf": [
    { title: "How to Merge PDF Files: Complete Guide", slug: "merge-pdf-files-guide" }
  ],
  "redact-pdf": [
    { title: "How to Redact Sensitive Information in PDFs", slug: "redact-sensitive-pdf-information" },
    { title: "Password Protect PDF: Complete Security Guide", slug: "protect-pdf-with-password" }
  ],
  "pdf-viewer": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "compare-pdf": [
    { title: "Essential PDF Tools for Students", slug: "pdf-tools-for-students" }
  ],
  "image-compressor": [
    { title: "How to Compress PDF for Email", slug: "how-to-compress-pdf-for-email" }
  ],
  "resize-image": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "crop-image": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ],
  "rotate-image": [
    { title: "How to Rotate PDF Pages", slug: "rotate-pdf-pages" }
  ],
  "convert-image": [
    { title: "How to Convert Images to PDF", slug: "convert-images-to-pdf" }
  ]
};

const workflowSuggestions: Record<string, { text: string; toolId: string }[]> = {
  "merge": [
    { text: "After merging, compress your PDF to reduce file size", toolId: "compress" },
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
    { text: "Convert back to PDF after editing in Word", toolId: "word-to-pdf" },
    { text: "Extract just the text if you don't need formatting", toolId: "extract-text" }
  ],
  "pdf-to-jpg": [
    { text: "Compress the images after converting", toolId: "image-compressor" },
    { text: "Resize images for web use", toolId: "resize-image" }
  ],
  "pdf-to-png": [
    { text: "Compress PNG images to save space", toolId: "image-compressor" },
    { text: "Convert back to PDF when done editing", toolId: "png-to-pdf" }
  ],
  "jpg-to-pdf": [
    { text: "Merge multiple converted PDFs together", toolId: "merge" },
    { text: "Compress the final PDF for email", toolId: "compress" }
  ],
  "png-to-pdf": [
    { text: "Add page numbers to your image PDF", toolId: "add-page-numbers" },
    { text: "Compress the final PDF", toolId: "compress" }
  ],
  "word-to-pdf": [
    { text: "Compress the PDF for email", toolId: "compress" },
    { text: "Protect the PDF with a password", toolId: "protect-pdf" }
  ],
  "pdf-to-excel": [
    { text: "Convert back to PDF when done editing", toolId: "excel-to-pdf" }
  ],
  "excel-to-pdf": [
    { text: "Compress the PDF for sharing", toolId: "compress" },
    { text: "Add a watermark for branding", toolId: "add-watermark" }
  ],
  "protect-pdf": [
    { text: "Add a watermark for extra security", toolId: "add-watermark" },
    { text: "Redact sensitive info before protecting", toolId: "redact-pdf" }
  ],
  "unlock-pdf": [
    { text: "Edit the unlocked PDF", toolId: "edit-pdf" },
    { text: "Re-protect with a new password", toolId: "protect-pdf" }
  ],
  "rotate": [
    { text: "Crop pages after rotating", toolId: "crop-pdf" },
    { text: "Compress the rotated PDF", toolId: "compress" }
  ],
  "add-page-numbers": [
    { text: "Add a watermark along with page numbers", toolId: "add-watermark" },
    { text: "Compress the final document", toolId: "compress" }
  ],
  "add-watermark": [
    { text: "Protect the watermarked PDF with a password", toolId: "protect-pdf" },
    { text: "Flatten the PDF to make watermark permanent", toolId: "flatten-pdf" }
  ],
  "sign-pdf": [
    { text: "Flatten the signed PDF to lock the signature", toolId: "flatten-pdf" },
    { text: "Protect the signed document", toolId: "protect-pdf" }
  ],
  "edit-pdf": [
    { text: "Flatten the PDF to lock your edits", toolId: "flatten-pdf" },
    { text: "Compress after editing to reduce size", toolId: "compress" }
  ],
  "annotate-pdf": [
    { text: "Flatten annotations into the document", toolId: "flatten-pdf" },
    { text: "Share via image format", toolId: "pdf-to-jpg" }
  ],
  "redact-pdf": [
    { text: "Flatten the redacted PDF for security", toolId: "flatten-pdf" },
    { text: "Protect with a password after redacting", toolId: "protect-pdf" }
  ],
  "ocr-pdf": [
    { text: "Extract the recognized text", toolId: "extract-text" },
    { text: "Convert the searchable PDF to Word", toolId: "pdf-to-word" }
  ],
  "extract-text": [
    { text: "Try OCR if regular extraction fails", toolId: "ocr-pdf" }
  ],
  "flatten-pdf": [
    { text: "Compress the flattened PDF", toolId: "compress" },
    { text: "Protect the final document", toolId: "protect-pdf" }
  ],
  "grayscale-pdf": [
    { text: "Compress after grayscale for smallest file", toolId: "compress" }
  ],
  "crop-pdf": [
    { text: "Resize pages after cropping", toolId: "resize-pdf" },
    { text: "Compress the cropped document", toolId: "compress" }
  ],
  "resize-pdf": [
    { text: "Compress after resizing", toolId: "compress" }
  ],
  "repair-pdf": [
    { text: "Flatten the repaired PDF", toolId: "flatten-pdf" },
    { text: "Compress the repaired file", toolId: "compress" }
  ],
  "delete-pages": [
    { text: "Reorder remaining pages", toolId: "reorder-pages" },
    { text: "Add page numbers after deleting", toolId: "add-page-numbers" }
  ],
  "reorder-pages": [
    { text: "Add page numbers after reordering", toolId: "add-page-numbers" },
    { text: "Merge with another PDF", toolId: "merge" }
  ],
  "compare-pdf": [
    { text: "Merge the compared documents", toolId: "merge" },
    { text: "Annotate differences found", toolId: "annotate-pdf" }
  ],
  "image-compressor": [
    { text: "Convert compressed images to PDF", toolId: "jpg-to-pdf" }
  ],
  "resize-image": [
    { text: "Convert resized images to PDF", toolId: "jpg-to-pdf" },
    { text: "Compress images further", toolId: "image-compressor" }
  ],
  "crop-image": [
    { text: "Convert cropped images to PDF", toolId: "jpg-to-pdf" }
  ],
  "rotate-image": [
    { text: "Convert to PDF after rotating", toolId: "jpg-to-pdf" }
  ],
  "convert-image": [
    { text: "Convert the result to PDF", toolId: "jpg-to-pdf" },
    { text: "Compress the converted images", toolId: "image-compressor" }
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
    <section className="mt-12 pt-8 border-t">
      {workflows.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-primary" />
            What to Do Next
          </h2>
          <div className="space-y-3">
            {workflows.map((wf) => {
              const targetTool = PDF_TOOLS.find(t => t.id === wf.toolId);
              if (!targetTool) return null;
              return (
                <Link key={wf.toolId} href={targetTool.path} data-testid={`link-workflow-${wf.toolId}`}>
                  <Card className="p-4 hover-elevate cursor-pointer transition-all group">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {wf.text}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-primary flex-shrink-0">
                        {targetTool.title}
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            View All 43+ Tools
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
