export interface Language {
  code: string;
  hreflang: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", hreflang: "en", label: "English", nativeLabel: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "es", hreflang: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "ar", hreflang: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "hi", hreflang: "hi", label: "Hindi", nativeLabel: "हिंदी", dir: "ltr", flag: "🇮🇳" },
  { code: "fr", hreflang: "fr", label: "French", nativeLabel: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "pt", hreflang: "pt", label: "Portuguese", nativeLabel: "Português", dir: "ltr", flag: "🇧🇷" },
];

export const LANG_CODES = SUPPORTED_LANGUAGES.map(l => l.code);
export const NON_DEFAULT_LANG_CODES = LANG_CODES.filter(c => c !== "en");

export function getLang(code: string): Language {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export function detectBrowserLang(): string {
  const nav = typeof navigator !== "undefined" ? navigator : null;
  if (!nav) return "en";
  const preferred = (nav.language || "en").split("-")[0].toLowerCase();
  return NON_DEFAULT_LANG_CODES.includes(preferred) ? preferred : "en";
}

export function getLangFromPath(pathname: string): { lang: string; basePath: string } {
  const match = pathname.match(/^\/(es|ar|hi|fr|pt)(\/.*)?$/);
  if (match) {
    return { lang: match[1], basePath: match[2] || "/" };
  }
  return { lang: "en", basePath: pathname };
}

export function buildLangPath(lang: string, basePath: string): string {
  if (lang === "en") return basePath;
  const normalizedBase = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return `/${lang}${normalizedBase === "/" ? "" : normalizedBase}`;
}

export const UI_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    allTools: "All Tools",
    blog: "Blog",
    pdfToWord: "PDF to Word",
    merge: "Merge PDF",
    compress: "Compress",
    languageSwitcher: "Language",
    bannerText: "This page is available in",
    bannerSwitch: "Switch to",
    bannerDismiss: "Dismiss",
  },
  es: {
    home: "Inicio",
    allTools: "Todas las herramientas",
    blog: "Blog",
    pdfToWord: "PDF a Word",
    merge: "Unir PDF",
    compress: "Comprimir",
    languageSwitcher: "Idioma",
    bannerText: "Esta página está disponible en",
    bannerSwitch: "Cambiar a",
    bannerDismiss: "Cerrar",
  },
  ar: {
    home: "الرئيسية",
    allTools: "جميع الأدوات",
    blog: "المدونة",
    pdfToWord: "PDF إلى Word",
    merge: "دمج PDF",
    compress: "ضغط",
    languageSwitcher: "اللغة",
    bannerText: "هذه الصفحة متاحة باللغة",
    bannerSwitch: "التبديل إلى",
    bannerDismiss: "إغلاق",
  },
  hi: {
    home: "होम",
    allTools: "सभी टूल्स",
    blog: "ब्लॉग",
    pdfToWord: "PDF से Word",
    merge: "PDF जोड़ें",
    compress: "कम्प्रेस",
    languageSwitcher: "भाषा",
    bannerText: "यह पृष्ठ उपलब्ध है",
    bannerSwitch: "स्विच करें",
    bannerDismiss: "बंद करें",
  },
  fr: {
    home: "Accueil",
    allTools: "Tous les outils",
    blog: "Blog",
    pdfToWord: "PDF en Word",
    merge: "Fusionner PDF",
    compress: "Compresser",
    languageSwitcher: "Langue",
    bannerText: "Cette page est disponible en",
    bannerSwitch: "Passer à",
    bannerDismiss: "Fermer",
  },
  pt: {
    home: "Início",
    allTools: "Todas as ferramentas",
    blog: "Blog",
    pdfToWord: "PDF para Word",
    merge: "Unir PDF",
    compress: "Comprimir",
    languageSwitcher: "Idioma",
    bannerText: "Esta página está disponível em",
    bannerSwitch: "Mudar para",
    bannerDismiss: "Fechar",
  },
};

export function t(lang: string, key: string): string {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS["en"][key] || key;
}
