import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Download, Upload, FileText, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDF_TOOLS } from "@shared/schema";

const categories = [
  { id: "from-pdf", label: "Convert from PDF", icon: Download, color: "text-red-500" },
  { id: "to-pdf", label: "Convert to PDF", icon: Upload, color: "text-green-500" },
  { id: "edit-pdf", label: "Edit PDF", icon: FileText, color: "text-primary" },
  { id: "utility", label: "Utility Tools", icon: Settings, color: "text-purple-500" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedCategory(null);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        data-testid="button-mobile-menu"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={closeMenu}
          data-testid="mobile-menu-backdrop"
        />
      )}

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white dark:bg-gray-900 z-[60] transform transition-transform duration-300 ease-out shadow-2xl border-l ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="mobile-menu-panel"
      >
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              data-testid="button-close-mobile-menu"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-2">
              {/* Home link */}
              <Link href="/" onClick={closeMenu}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" data-testid="mobile-link-home">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Home</span>
                </div>
              </Link>

              {/* Blog link */}
              <Link href="/blog" onClick={closeMenu}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" data-testid="mobile-link-blog">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Blog</span>
                </div>
              </Link>

              {/* Categories with expandable tools */}
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                const tools = PDF_TOOLS.filter((t) => t.category === category.id);
                const isExpanded = expandedCategory === category.id;

                return (
                  <div key={category.id} className="mt-1">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      data-testid={`mobile-category-${category.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <CategoryIcon className={`w-5 h-5 ${category.color}`} />
                        <span className="font-medium text-gray-900 dark:text-gray-100">{category.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Expandable tool list */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 py-1">
                        {tools.map((tool) => (
                          <Link key={tool.id} href={tool.path} onClick={closeMenu}>
                            <div
                              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                              data-testid={`mobile-link-${tool.id}`}
                            >
                              {tool.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              43+ Free PDF Tools
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
