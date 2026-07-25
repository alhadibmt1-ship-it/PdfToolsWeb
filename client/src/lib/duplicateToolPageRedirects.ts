// Duplicate /tools/* pages that are near-copies of an existing primary tool
// page (same tool, same steps, same FAQ, differing only in SEO keyword
// stuffing — "-free", "-online-free", "-no-signup", etc. with no real
// differentiation). Consolidated onto the primary page via 301 redirect.
//
// NOT included here (deliberately kept as separate pages): genuinely
// differentiated long-tail content — specific sizes (compress-pdf-to-1mb),
// specific countries/compliance (compress-pdf-for-uscis-immigration),
// specific use-cases (compress-pdf-for-email, merge-pdf-for-immigration),
// or specific technical claims (protect-pdf-with-password-256bit,
// convert-pdf-to-excel-with-tables). Those represent real distinct search
// intent and stay as their own pages, same as the existing compress-pdf
// size-variant pages already do.
export const DUPLICATE_TOOL_PAGE_REDIRECTS: Record<string, string> = {
  // sign-pdf duplicates
  "add-signature-to-pdf-free": "/sign-pdf",
  "sign-pdf-online-free-no-signup": "/sign-pdf",

  // pdf-to-word duplicates
  "pdf-to-word-editable-free": "/pdf-to-word",
  "convert-pdf-to-word-free-online": "/pdf-to-word",
  "convert-pdf-to-word-without-losing-formatting": "/pdf-to-word",

  // excel-to-pdf / word-to-pdf duplicates
  "convert-excel-to-pdf-free": "/excel-to-pdf",
  "convert-word-to-pdf-free-online": "/word-to-pdf",
  "word-to-pdf-free-online": "/word-to-pdf",
  "convert-docx-to-pdf-keep-formatting": "/word-to-pdf",

  // edit-pdf duplicates
  "edit-pdf-text-online-free": "/edit-pdf",
  "edit-pdf-without-adobe-acrobat": "/edit-pdf",
  "pdf-editor-free-without-watermark": "/edit-pdf",

  // jpg-to-pdf duplicates
  "convert-jpg-to-pdf-free-online": "/jpg-to-pdf",
  "convert-jpg-to-pdf-multiple": "/jpg-to-pdf",

  // add-page-numbers duplicates
  "add-page-numbers-to-pdf-free": "/add-page-numbers",
  "add-page-numbers-to-pdf-automatically": "/add-page-numbers",

  // image-compressor duplicate
  "compress-jpg-png-image-online": "/image-compressor",

  // reorder-pages duplicate
  "rearrange-pdf-pages-free": "/reorder-pages",

  // pdf-to-ppt duplicates
  "convert-pdf-to-powerpoint-free": "/pdf-to-ppt",
  "pdf-to-powerpoint-online-free": "/pdf-to-ppt",

  // unlock-pdf duplicates
  "unlock-pdf-remove-password-online": "/unlock-pdf",
  "remove-password-from-pdf": "/unlock-pdf",
  "unlock-pdf-for-editing": "/unlock-pdf",

  // pdf-to-excel duplicate
  "pdf-to-excel-free-online": "/pdf-to-excel",

  // rotate-pdf duplicates
  "rotate-pdf-free-online": "/rotate-pdf",
  "rotate-pdf-and-save": "/rotate-pdf",

  // grayscale-pdf duplicate
  "grayscale-pdf-free-online": "/grayscale-pdf",

  // ocr-pdf duplicate
  "ocr-pdf-online-free": "/ocr-pdf",

  // pdf-viewer duplicate
  "pdf-viewer-online-free": "/pdf-viewer",

  // add-watermark duplicates
  "add-watermark-to-pdf-free": "/add-watermark",
  "watermark-pdf-free-online": "/add-watermark",

  // pdf-to-jpg duplicates
  "pdf-to-jpg-high-quality": "/pdf-to-jpg",
  "pdf-to-jpg-online-free-high-quality": "/pdf-to-jpg",
  "convert-pdf-to-jpg-all-pages": "/pdf-to-jpg",

  // pdf-to-png duplicates
  "convert-pdf-to-png-high-resolution": "/pdf-to-png",
  "pdf-to-png-all-pages-free": "/pdf-to-png",

  // protect-pdf duplicate (protect-pdf-with-password-256bit kept separately —
  // real technical differentiation, AES-256 detail)
  "protect-pdf-with-password-free": "/protect-pdf",

  // delete-pages duplicates
  "delete-pages-from-pdf": "/delete-pages",
  "remove-pages-from-pdf": "/delete-pages",

  // extract-pages duplicate
  "extract-pages-from-pdf": "/extract-pages",

  // annotate-pdf duplicate
  "annotate-pdf-highlight-text-free": "/annotate-pdf",

  // redact-pdf duplicate
  "redact-pdf-black-out-text": "/redact-pdf",

  // crop-pdf duplicate
  "crop-pdf-margins-free-online": "/crop-pdf",

  // html-to-pdf duplicate
  "convert-html-webpage-to-pdf": "/html-to-pdf",

  // flatten-pdf duplicate
  "flatten-pdf-for-printing": "/flatten-pdf",

  // compress-pdf-for-email duplicate (redirects to the more specific existing
  // long-tail page rather than the generic primary, since that page already
  // covers this exact intent)
  "make-pdf-smaller-for-email": "/tools/compress-pdf-for-email",
};
