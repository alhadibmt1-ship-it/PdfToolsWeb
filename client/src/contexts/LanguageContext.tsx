import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getLangFromPath, getLang, Language } from "@/lib/languages";
import { useLocation } from "wouter";

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
  const [location] = useLocation();
  const { lang: detectedLang } = getLangFromPath(location);
  const [lang, setLang] = useState(detectedLang);

  useEffect(() => {
    const { lang: newLang } = getLangFromPath(location);
    setLang(newLang);
  }, [location]);

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
