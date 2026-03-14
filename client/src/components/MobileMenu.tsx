import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Download, Upload, FileText, Settings, ChevronDown, Home, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PDF_TOOLS } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

const categories = [
  { id: "from-pdf", labelKey: "convertFromPdf", icon: Download, color: "text-red-500" },
  { id: "to-pdf", labelKey: "convertToPdf", icon: Upload, color: "text-green-500" },
  { id: "edit-pdf", labelKey: "editPdf", icon: FileText, color: "text-primary" },
  { id: "utility", labelKey: "utilityTools", icon: Settings, color: "text-purple-500" },
];

export default function MobileMenu() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const closeMenu = () => {
    setOpen(false);
    setExpandedCategory(null);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-mobile-menu"
          aria-label={t(lang, "openMenu")}
          className="md:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-[320px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>{t(lang, "menu")}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100%-60px)]">
          <div className="flex-1 overflow-y-auto p-2">
            {/* Home link */}
            <Link href="/" onClick={closeMenu}>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent cursor-pointer"
                data-testid="mobile-link-home"
              >
                <Home className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{t(lang, "home")}</span>
              </div>
            </Link>

            {/* Blog link */}
            <Link href="/blog" onClick={closeMenu}>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent cursor-pointer"
                data-testid="mobile-link-blog"
              >
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span className="font-medium">{t(lang, "blog")}</span>
              </div>
            </Link>

            {/* Quick access — top 3 tools */}
            <div className="mx-2 my-1 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{t(lang, "popularTools")}</span>
              </div>
              <div className="flex flex-col gap-1">
                {[
                  { href: "/pdf-to-word", labelKey: "pdfToWord", testId: "mobile-link-pdf-to-word" },
                  { href: "/merge", labelKey: "merge", testId: "mobile-link-merge" },
                  { href: "/compress", labelKey: "compressPdf", testId: "mobile-link-compress" },
                ].map(({ href, labelKey, testId }) => (
                  <Link key={href} href={href} onClick={closeMenu}>
                    <div
                      className="px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                      data-testid={testId}
                    >
                      {t(lang, labelKey)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories with expandable tools */}
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              const tools = PDF_TOOLS.filter((t) => t.category === category.id);
              const isExpanded = expandedCategory === category.id;

              return (
                <Collapsible
                  key={category.id}
                  open={isExpanded}
                  onOpenChange={() => setExpandedCategory(isExpanded ? null : category.id)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-accent cursor-pointer"
                      data-testid={`mobile-category-${category.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon className={`w-5 h-5 ${category.color}`} />
                        <span className="font-medium">{t(lang, category.labelKey)}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-4 py-1">
                      {tools.map((tool) => (
                        <Link key={tool.id} href={tool.path} onClick={closeMenu}>
                          <div
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer transition-colors"
                            data-testid={`mobile-link-${tool.id}`}
                          >
                            {tool.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              {t(lang, "freeToolsCount")}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
