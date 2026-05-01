// Translated URL slugs per language — matching iLovePDF / PDF24 standard
// Only Latin-script languages translate slugs: es, fr, pt, de, it, id
// Non-Latin languages (ar, hi, zh, ja, ru, ur) keep English slugs (industry standard)

export const TOOL_SLUG_TRANSLATIONS: Record<string, Partial<Record<string, string>>> = {
  "merge-pdf": {
    es: "unir-pdf", fr: "fusionner-pdf", pt: "unir-pdf",
    de: "pdf-zusammenfuehren", it: "unire-pdf", id: "gabungkan-pdf",
  },
  "split-pdf": {
    es: "dividir-pdf", fr: "diviser-pdf", pt: "dividir-pdf",
    de: "pdf-teilen", it: "dividere-pdf", id: "pisahkan-pdf",
  },
  "compress-pdf": {
    es: "comprimir-pdf", fr: "compresser-pdf", pt: "comprimir-pdf",
    de: "pdf-komprimieren", it: "comprimi-pdf", id: "kompres-pdf",
  },
  "pdf-to-jpg": {
    es: "pdf-a-jpg", fr: "pdf-en-jpg", pt: "pdf-para-jpg",
    de: "pdf-in-jpg", it: "pdf-in-jpg", id: "pdf-ke-jpg",
  },
  "jpg-to-pdf": {
    es: "jpg-a-pdf", fr: "jpg-en-pdf", pt: "jpg-para-pdf",
    de: "jpg-in-pdf", it: "jpg-in-pdf", id: "jpg-ke-pdf",
  },
  "pdf-to-word": {
    es: "pdf-a-word", fr: "pdf-en-word", pt: "pdf-para-word",
    de: "pdf-in-word", it: "pdf-in-word", id: "pdf-ke-word",
  },
  "word-to-pdf": {
    es: "word-a-pdf", fr: "word-en-pdf", pt: "word-para-pdf",
    de: "word-in-pdf", it: "word-in-pdf", id: "word-ke-pdf",
  },
  "pdf-to-png": {
    es: "pdf-a-png", fr: "pdf-en-png", pt: "pdf-para-png",
    de: "pdf-in-png", it: "pdf-in-png", id: "pdf-ke-png",
  },
  "png-to-pdf": {
    es: "png-a-pdf", fr: "png-en-pdf", pt: "png-para-pdf",
    de: "png-in-pdf", it: "png-in-pdf", id: "png-ke-pdf",
  },
  "pdf-to-excel": {
    es: "pdf-a-excel", fr: "pdf-en-excel", pt: "pdf-para-excel",
    de: "pdf-in-excel", it: "pdf-in-excel", id: "pdf-ke-excel",
  },
  "excel-to-pdf": {
    es: "excel-a-pdf", fr: "excel-en-pdf", pt: "excel-para-pdf",
    de: "excel-in-pdf", it: "excel-in-pdf", id: "excel-ke-pdf",
  },
  "rotate-pdf": {
    es: "rotar-pdf", fr: "pivoter-pdf", pt: "rodar-pdf",
    de: "pdf-drehen", it: "ruota-pdf", id: "putar-pdf",
  },
  "delete-pages": {
    es: "eliminar-paginas-pdf", fr: "supprimer-pages-pdf", pt: "eliminar-paginas-pdf",
    de: "pdf-seiten-loeschen", it: "elimina-pagine-pdf", id: "hapus-halaman-pdf",
  },
  "extract-pages": {
    es: "extraer-paginas-pdf", fr: "extraire-pages-pdf", pt: "extrair-paginas-pdf",
    de: "pdf-seiten-extrahieren", it: "estrai-pagine-pdf", id: "ekstrak-halaman-pdf",
  },
  "extract-text": {
    es: "extraer-texto-pdf", fr: "extraire-texte-pdf", pt: "extrair-texto-pdf",
    de: "text-aus-pdf-extrahieren", it: "estrai-testo-pdf", id: "ekstrak-teks-pdf",
  },
  "protect-pdf": {
    es: "proteger-pdf", fr: "proteger-pdf", pt: "proteger-pdf",
    de: "pdf-schuetzen", it: "proteggi-pdf", id: "lindungi-pdf",
  },
  "unlock-pdf": {
    es: "desbloquear-pdf", fr: "deverrouiller-pdf", pt: "desbloquear-pdf",
    de: "pdf-entsperren", it: "sblocca-pdf", id: "buka-kunci-pdf",
  },
  "add-page-numbers": {
    es: "numerar-paginas-pdf", fr: "numeroter-pages-pdf", pt: "numerar-paginas-pdf",
    de: "seitenzahlen-pdf", it: "numera-pagine-pdf", id: "nomor-halaman-pdf",
  },
  "add-watermark": {
    es: "marca-de-agua-pdf", fr: "filigrane-pdf", pt: "marca-dagua-pdf",
    de: "wasserzeichen-pdf", it: "filigrana-pdf", id: "tanda-air-pdf",
  },
  "reorder-pages": {
    es: "reorganizar-paginas-pdf", fr: "reordonner-pages-pdf", pt: "reordenar-paginas-pdf",
    de: "pdf-seiten-neu-anordnen", it: "riordina-pagine-pdf", id: "atur-ulang-halaman-pdf",
  },
  "html-to-pdf": {
    es: "html-a-pdf", fr: "html-en-pdf", pt: "html-para-pdf",
    de: "html-in-pdf", it: "html-in-pdf", id: "html-ke-pdf",
  },
  "image-compressor": {
    es: "comprimir-imagen", fr: "compresser-image", pt: "comprimir-imagem",
    de: "bild-komprimieren", it: "comprimi-immagine", id: "kompres-gambar",
  },
  "webp-to-pdf": {
    es: "webp-a-pdf", fr: "webp-en-pdf", pt: "webp-para-pdf",
    de: "webp-in-pdf", it: "webp-in-pdf", id: "webp-ke-pdf",
  },
  "crop-pdf": {
    es: "recortar-pdf", fr: "rogner-pdf", pt: "cortar-pdf",
    de: "pdf-zuschneiden", it: "ritaglia-pdf", id: "potong-pdf",
  },
  "pdf-viewer": {
    es: "visor-pdf", fr: "visionneur-pdf", pt: "visualizador-pdf",
    de: "pdf-betrachter", it: "visualizzatore-pdf", id: "penampil-pdf",
  },
  "extract-images": {
    es: "extraer-imagenes-pdf", fr: "extraire-images-pdf", pt: "extrair-imagens-pdf",
    de: "bilder-aus-pdf-extrahieren", it: "estrai-immagini-pdf", id: "ekstrak-gambar-pdf",
  },
  "resize-pdf": {
    es: "redimensionar-pdf", fr: "redimensionner-pdf", pt: "redimensionar-pdf",
    de: "pdf-groesse-aendern", it: "ridimensiona-pdf", id: "ubah-ukuran-pdf",
  },
  "grayscale-pdf": {
    es: "pdf-escala-grises", fr: "pdf-niveaux-gris", pt: "pdf-escala-cinza",
    de: "pdf-graustufen", it: "pdf-scala-grigi", id: "pdf-skala-abu",
  },
  "flatten-pdf": {
    es: "aplanar-pdf", fr: "aplatir-pdf", pt: "achatar-pdf",
    de: "pdf-reduzieren", it: "appiattisci-pdf", id: "ratakan-pdf",
  },
  "repair-pdf": {
    es: "reparar-pdf", fr: "reparer-pdf", pt: "reparar-pdf",
    de: "pdf-reparieren", it: "ripara-pdf", id: "perbaiki-pdf",
  },
  "sign-pdf": {
    es: "firmar-pdf", fr: "signer-pdf", pt: "assinar-pdf",
    de: "pdf-unterschreiben", it: "firma-pdf", id: "tanda-tangan-pdf",
  },
  "ocr-pdf": {
    es: "ocr-pdf", fr: "ocr-pdf", pt: "ocr-pdf",
    de: "ocr-pdf", it: "ocr-pdf", id: "ocr-pdf",
  },
  "compare-pdf": {
    es: "comparar-pdf", fr: "comparer-pdf", pt: "comparar-pdf",
    de: "pdf-vergleichen", it: "confronta-pdf", id: "bandingkan-pdf",
  },
  "pdf-to-ppt": {
    es: "pdf-a-powerpoint", fr: "pdf-en-powerpoint", pt: "pdf-para-powerpoint",
    de: "pdf-in-powerpoint", it: "pdf-in-powerpoint", id: "pdf-ke-powerpoint",
  },
  "ppt-to-pdf": {
    es: "powerpoint-a-pdf", fr: "powerpoint-en-pdf", pt: "powerpoint-para-pdf",
    de: "powerpoint-in-pdf", it: "powerpoint-in-pdf", id: "powerpoint-ke-pdf",
  },
  "tiff-to-pdf": {
    es: "tiff-a-pdf", fr: "tiff-en-pdf", pt: "tiff-para-pdf",
    de: "tiff-in-pdf", it: "tiff-in-pdf", id: "tiff-ke-pdf",
  },
  "gif-to-pdf": {
    es: "gif-a-pdf", fr: "gif-en-pdf", pt: "gif-para-pdf",
    de: "gif-in-pdf", it: "gif-in-pdf", id: "gif-ke-pdf",
  },
  "edit-pdf": {
    es: "editar-pdf", fr: "modifier-pdf", pt: "editar-pdf",
    de: "pdf-bearbeiten", it: "modifica-pdf", id: "edit-pdf",
  },
  "annotate-pdf": {
    es: "anotar-pdf", fr: "annoter-pdf", pt: "anotar-pdf",
    de: "pdf-kommentieren", it: "annota-pdf", id: "anotasi-pdf",
  },
  "redact-pdf": {
    es: "redactar-pdf", fr: "caviarder-pdf", pt: "redigir-pdf",
    de: "pdf-schwaerzen", it: "oscura-pdf", id: "redaksi-pdf",
  },
  "scan-to-pdf": {
    es: "escanear-a-pdf", fr: "scanner-en-pdf", pt: "digitalizar-para-pdf",
    de: "scannen-zu-pdf", it: "scansiona-in-pdf", id: "pindai-ke-pdf",
  },
  "pdf-to-pdfa": {
    es: "pdf-a-pdfa", fr: "pdf-en-pdfa", pt: "pdf-para-pdfa",
    de: "pdf-in-pdfa", it: "pdf-in-pdfa", id: "pdf-ke-pdfa",
  },
  "batch-compress": {
    es: "comprimir-lote-pdf", fr: "compression-lot-pdf", pt: "comprimir-lote-pdf",
    de: "stapelkomprimierung-pdf", it: "comprimi-batch-pdf", id: "kompres-batch-pdf",
  },
  "translate-pdf": {
    es: "traducir-pdf", fr: "traduire-pdf", pt: "traduzir-pdf",
    de: "pdf-uebersetzen", it: "traduci-pdf", id: "terjemahkan-pdf",
  },
  "resize-image": {
    es: "redimensionar-imagen", fr: "redimensionner-image", pt: "redimensionar-imagem",
    de: "bild-groesse-aendern", it: "ridimensiona-immagine", id: "ubah-ukuran-gambar",
  },
  "crop-image": {
    es: "recortar-imagen", fr: "rogner-image", pt: "cortar-imagem",
    de: "bild-zuschneiden", it: "ritaglia-immagine", id: "potong-gambar",
  },
  "rotate-image": {
    es: "rotar-imagen", fr: "pivoter-image", pt: "rodar-imagem",
    de: "bild-drehen", it: "ruota-immagine", id: "rutar-gambar",
  },
  "convert-image": {
    es: "convertir-imagen", fr: "convertir-image", pt: "converter-imagem",
    de: "bild-konvertieren", it: "converti-immagine", id: "konversi-gambar",
  },
};

// Build reverse lookup: translatedSlug → englishSlug
const _reverseMap: Record<string, string> = {};
for (const [englishSlug, langs] of Object.entries(TOOL_SLUG_TRANSLATIONS)) {
  for (const translatedSlug of Object.values(langs)) {
    if (translatedSlug && translatedSlug !== englishSlug) {
      _reverseMap[translatedSlug] = englishSlug;
    }
  }
}
export const TRANSLATED_TO_ENGLISH: Record<string, string> = _reverseMap;

/** Get translated slug for a lang+englishSlug combo. Falls back to englishSlug. */
export function getTranslatedSlug(lang: string, englishSlug: string): string {
  return TOOL_SLUG_TRANSLATIONS[englishSlug]?.[lang] || englishSlug;
}

/** Convert a path (may be translated) to its English equivalent. */
export function resolveToEnglishPath(path: string): string {
  const slug = path.replace(/^\//, "");
  if (_reverseMap[slug]) return `/${_reverseMap[slug]}`;
  return path;
}

/** Get translated path for a given lang and current path (may be translated or English). */
export function getTranslatedPath(lang: string, currentPath: string): string {
  // First resolve to english
  const englishPath = resolveToEnglishPath(currentPath);
  const englishSlug = englishPath.replace(/^\//, "");
  const translated = getTranslatedSlug(lang, englishSlug);
  return `/${translated}`;
}

/** All translated slugs as route paths (for registering in the router) */
export const ALL_TRANSLATED_ROUTES: Array<{ translatedSlug: string; englishSlug: string }> = Object.entries(
  TOOL_SLUG_TRANSLATIONS
).flatMap(([englishSlug, langs]) =>
  Object.values(langs)
    .filter((s): s is string => !!s && s !== englishSlug)
    .map(translatedSlug => ({ translatedSlug, englishSlug }))
);
