import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import SettingsDialog from "./SettingsDialog";
import logoWebp64 from "@assets/generated_images/logo-64.webp";
import logoWebp128 from "@assets/generated_images/logo-128.webp";
import logoPng64 from "@assets/generated_images/logo-64.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 cursor-pointer transition-transform">
            <picture>
              <source 
                type="image/webp" 
                srcSet={`${logoWebp64} 1x, ${logoWebp128} 2x`}
              />
              <img 
                src={logoPng64} 
                alt="PDF HUB 24" 
                className="w-8 h-8 rounded-md"
                width="32"
                height="32"
                loading="eager"
              />
            </picture>
            <span className="text-xl font-bold">PDF HUB 24</span>
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
