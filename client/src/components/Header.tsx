import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import SettingsDialog from "./SettingsDialog";
import MobileMenu from "./MobileMenu";
import ToolSearch from "./ToolSearch";
import LanguageSwitcher from "./LanguageSwitcher";
import siteLogo from "@assets/generated_images/logo-64.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";
import { PDF_TOOLS } from "@shared/schema";
import { ToolBreadcrumbs } from "./Breadcrumbs";

export default function Header() {
  const { lang } = useLanguage();
  const [location] = useLocation();

  const cleanPath = location.replace(/^\/(es|fr|ar|hi|pt)/, "") || "/";
  const currentTool = PDF_TOOLS.find(t => t.path === cleanPath);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex h-14 sm:h-16 items-center justify-between">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 sm:gap-2.5 hover-elevate active-elevate-2 rounded-lg px-2 sm:px-3 py-2 -ml-2 sm:-ml-3 cursor-pointer transition-all">
            <img 
              src={siteLogo} 
              alt="PDF HUB 24 - Free Online PDF Tools" 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg shadow-md"
              width="36"
              height="36"
              loading="eager"
            />
            <span className="text-lg sm:text-xl font-bold tracking-tight">PDF HUB 24</span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-0.5 mr-2">
            <Link href="/" data-testid="link-nav-home">
              <span className="px-4 py-2 text-sm font-medium rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all">
                {t(lang, "home")}
              </span>
            </Link>
            <Link href="/#tools" data-testid="link-nav-tools">
              <span className="px-4 py-2 text-sm font-medium rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all">
                {t(lang, "allTools")}
              </span>
            </Link>
            <Link href="/blog" data-testid="link-nav-blog">
              <span className="px-4 py-2 text-sm font-medium rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all">
                {t(lang, "blog")}
              </span>
            </Link>
            <div className="w-px h-5 bg-border/60 mx-1" aria-hidden="true" />
            <Link href="/pdf-to-word" data-testid="link-nav-pdf-to-word">
              <span className="px-3 py-2 text-sm font-semibold rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all text-primary">
                {t(lang, "pdfToWord")}
              </span>
            </Link>
            <Link href="/merge" data-testid="link-nav-merge">
              <span className="px-3 py-2 text-sm font-semibold rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all text-primary">
                {t(lang, "merge")}
              </span>
            </Link>
            <Link href="/compress" data-testid="link-nav-compress">
              <span className="px-3 py-2 text-sm font-semibold rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all text-primary">
                {t(lang, "compress")}
              </span>
            </Link>
          </nav>
          
          {/* Desktop search, language, settings and theme */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-border/50">
            <ToolSearch />
            <LanguageSwitcher />
            <SettingsDialog />
            <ThemeToggle />
          </div>
          
          {/* Mobile: language switcher, theme toggle and hamburger menu */}
          <div className="flex items-center gap-1">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
    {currentTool && (
      <div className="border-b border-border/30 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ToolBreadcrumbs toolName={currentTool.title} category={currentTool.category} />
        </div>
      </div>
    )}
    </>
  );
}
