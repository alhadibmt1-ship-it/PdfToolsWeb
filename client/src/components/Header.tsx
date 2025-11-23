import { Link } from "wouter";
import { FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SettingsDialog from "./SettingsDialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 cursor-pointer transition-transform">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">PDF Master Tools</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-nav-home">
              <span className="px-4 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 cursor-pointer transition-all">
                Home
              </span>
            </Link>
            <Link href="/#tools" data-testid="link-nav-tools">
              <span className="px-4 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 cursor-pointer transition-all">
                All Tools
              </span>
            </Link>
          </nav>
          <SettingsDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
