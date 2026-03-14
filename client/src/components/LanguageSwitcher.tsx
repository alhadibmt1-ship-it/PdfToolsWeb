import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLangFromPath, buildLangPath } from "@/lib/languages";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleSelect(code: string) {
    setOpen(false);
    // Use window.location.pathname to get the real absolute path,
    // since Wouter's useLocation() returns a base-relative path
    // inside a WouterRouter with base, causing double-prefix 404s.
    const { basePath } = getLangFromPath(window.location.pathname);
    const newPath = buildLangPath(code, basePath);
    window.location.href = newPath;
  }

  const current = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Switch language"
        aria-expanded={open}
        data-testid="button-language-switcher"
        className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-lg hover-elevate active-elevate-2 transition-all cursor-pointer text-muted-foreground hover:text-foreground"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-[200] w-48 rounded-lg border border-border bg-background shadow-lg overflow-hidden"
          role="listbox"
          aria-label="Select language"
        >
          {SUPPORTED_LANGUAGES.map(language => (
            <button
              key={language.code}
              onClick={() => handleSelect(language.code)}
              role="option"
              aria-selected={language.code === lang}
              data-testid={`button-lang-${language.code}`}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover-elevate active-elevate-2 transition-all cursor-pointer text-left"
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{language.flag}</span>
                <span className="font-medium">{language.nativeLabel}</span>
                <span className="text-muted-foreground text-xs">{language.label}</span>
              </span>
              {language.code === lang && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
