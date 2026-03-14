import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getLangFromPath, getLang, Language } from "@/lib/languages";

interface LanguageContextValue {
  lang: string;
  language: Language;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  language: { code: "en", hreflang: "en", label: "English", nativeLabel: "English", dir: "ltr", flag: "🇺🇸" },
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Use window.location.pathname (the real absolute path) — not Wouter's
  // useLocation() which returns a base-relative path inside a base router.
  const { lang: detectedLang } = getLangFromPath(window.location.pathname);
  const [lang, setLang] = useState(detectedLang);

  useEffect(() => {
    function onPopState() {
      const { lang: newLang } = getLangFromPath(window.location.pathname);
      setLang(newLang);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const language = getLang(lang);
    document.documentElement.lang = language.hreflang;
    document.documentElement.dir = language.dir;
  }, [lang]);

  const language = getLang(lang);

  return (
    <LanguageContext.Provider value={{ lang, language, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
