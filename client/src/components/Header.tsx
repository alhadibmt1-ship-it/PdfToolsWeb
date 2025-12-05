import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import SettingsDialog from "./SettingsDialog";
import siteLogo from "@assets/generated_images/logo-64.webp";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2.5 hover-elevate active-elevate-2 rounded-lg px-3 py-2 -ml-3 cursor-pointer transition-all">
            <img 
              src={siteLogo} 
              alt="PDF HUB 24" 
              className="w-8 h-8 rounded-lg shadow-sm"
              width="32"
              height="32"
              loading="eager"
            />
            <span className="text-xl font-bold tracking-tight">PDF HUB 24</span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-0.5 mr-2">
            <Link href="/" data-testid="link-nav-home">
              <span className="px-4 py-2 text-sm font-medium rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all">
                Home
              </span>
            </Link>
            <Link href="/#tools" data-testid="link-nav-tools">
              <span className="px-4 py-2 text-sm font-medium rounded-lg hover-elevate active-elevate-2 cursor-pointer transition-all">
                All Tools
              </span>
            </Link>
          </nav>
          <div className="flex items-center gap-1 pl-2 border-l border-border/50">
            <SettingsDialog />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
