import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { detectBrowserLang, getLang, getLangFromPath, buildLangPath, SUPPORTED_LANGUAGES } from "@/lib/languages";
import { useLanguage } from "@/contexts/LanguageContext";

const BANNER_DISMISSED_KEY = "pdfhub24_lang_banner_dismissed";

export default function LanguageBanner() {
  const [show, setShow] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);
  const { lang: currentLang } = useLanguage();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_DISMISSED_KEY);
    if (dismissed) return;

    const browserLang = detectBrowserLang();
    if (browserLang !== "en" && browserLang !== currentLang) {
      setSuggestedLang(browserLang);
      setShow(true);
    }
  }, [currentLang]);

  function handleSwitch() {
    if (!suggestedLang) return;
    dismiss();
    // Use window.location.pathname for the real absolute path,
    // not Wouter's relative location (which strips the lang base prefix).
    const { basePath } = getLangFromPath(window.location.pathname);
    window.location.href = buildLangPath(suggestedLang, basePath);
  }

  function dismiss() {
    sessionStorage.setItem(BANNER_DISMISSED_KEY, "1");
    setShow(false);
  }

  if (!show || !suggestedLang) return null;

  const suggested = getLang(suggestedLang);

  return (
    <div
      className="w-full bg-primary/10 border-b border-primary/20 px-4 py-2"
      role="banner"
      aria-label="Language suggestion"
      data-testid="banner-language-suggestion"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-foreground">
          <span className="text-base leading-none mr-1">{suggested.flag}</span>
          This page is available in{" "}
          <strong>{suggested.label} ({suggested.nativeLabel})</strong>.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwitch}
            data-testid="button-banner-switch-lang"
            className="text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            Switch to {suggested.nativeLabel}
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss language suggestion"
            data-testid="button-banner-dismiss"
            className="p-1 rounded hover-elevate active-elevate-2 cursor-pointer text-muted-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
