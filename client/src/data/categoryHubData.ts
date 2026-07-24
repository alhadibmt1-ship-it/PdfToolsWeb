export interface CategoryTool {
  name: string;
  path: string;
  description: string;
}

export interface CategoryHub {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  tools: CategoryTool[];
  faqs: { question: string; answer: string }[];
  relatedBlogs: { title: string; path: string }[];
  relatedCategories: { name: string; path: string }[];
}

export const categoryHubs: CategoryHub[] = [
  {
    slug: "convert-pdf",
    title: "Convert PDF Online Free — All Formats Supported | PDF HUB 24",
    h1: "Convert PDF to Any Format Free Online",
    description: "Convert PDF to Word, Excel, JPG, PNG, PowerPoint and more. Convert images and documents to PDF. Free online converter with no signup, no watermark.",
    intro: `PDF conversion is one of the most common document tasks in both professional and personal settings. Whether you need to extract text from a PDF into an editable Word document, convert a presentation into a portable PDF format, or turn scanned images into searchable documents, having reliable conversion tools at your fingertips saves hours of manual work every week.

At PDF HUB 24, we offer a complete suite of PDF conversion tools that handle every format you might need. Our converters preserve formatting, maintain image quality, and process files in seconds — all completely free with no registration required. Every conversion happens securely in your browser or on our encrypted servers, and files are automatically deleted after processing.

The key to successful PDF conversion is choosing the right tool for your specific format. Converting a PDF with complex tables to Excel requires different processing than converting a simple text PDF to Word. Our specialized tools are optimized for each conversion type, ensuring you get the best possible output quality regardless of your source file's complexity.

Whether you are a student converting research papers, a business professional preparing presentations, or a developer integrating document conversion into your workflow, our tools provide the accuracy and speed you need. Each tool supports batch processing, handles large files, and works on any device with a modern web browser.

PDF HUB 24 supports conversion between all major document and image formats. From converting legacy documents into modern PDFs for archiving, to extracting high-resolution images from PDF reports for presentations, our conversion tools cover every use case. The platform processes millions of conversions monthly, with an average processing time under 10 seconds per file.

Our conversion technology uses advanced parsing algorithms that intelligently detect document structure, preserving headers, footers, tables, lists, and formatting elements during conversion. This means your converted documents look virtually identical to the originals, saving you the tedious work of manual formatting corrections.`,
    tools: [
      { name: "PDF to Word", path: "/pdf-to-word", description: "Convert PDF documents to editable Word (DOCX) format while preserving formatting, tables, and images" },
      { name: "PDF to JPG", path: "/pdf-to-jpg", description: "Extract PDF pages as high-quality JPG images for presentations, social media, or web use" },
      { name: "PDF to PNG", path: "/pdf-to-png", description: "Convert PDF pages to PNG images with transparent background support" },
      { name: "PDF to Excel", path: "/pdf-to-excel", description: "Extract PDF tables into editable Excel spreadsheets (XLS/XLSX) with accurate cell mapping" },
      { name: "PDF to PowerPoint", path: "/pdf-to-ppt", description: "Convert PDF presentations back to editable PowerPoint (PPT/PPTX) slides" },
      { name: "Word to PDF", path: "/word-to-pdf", description: "Convert Word documents (DOCX) to universally readable PDF format" },
      { name: "JPG to PDF", path: "/jpg-to-pdf", description: "Convert JPG images to PDF documents, combine multiple photos into one PDF" },
      { name: "PNG to PDF", path: "/png-to-pdf", description: "Convert PNG images to PDF while maintaining transparency and quality" },
      { name: "Excel to PDF", path: "/excel-to-pdf", description: "Convert Excel spreadsheets to PDF with perfect table formatting" },
      { name: "PowerPoint to PDF", path: "/ppt-to-pdf", description: "Convert PowerPoint presentations to PDF preserving slides and animations" },
      { name: "TIFF to PDF", path: "/tiff-to-pdf", description: "Convert TIFF images to PDF documents with full quality retention" },
      { name: "GIF to PDF", path: "/gif-to-pdf", description: "Convert GIF images to PDF preserving all frames" },
      { name: "WebP to PDF", path: "/webp-to-pdf", description: "Convert modern WebP images to universally compatible PDF format" },
      { name: "HTML to PDF", path: "/html-to-pdf", description: "Convert web pages and HTML code to PDF documents with CSS styling" },
      { name: "OCR PDF", path: "/ocr-pdf", description: "Convert scanned PDFs and images into searchable, selectable text using optical character recognition" },
      { name: "Extract Text", path: "/extract-text", description: "Extract all text content from PDF files for editing or analysis" },
      { name: "Extract Images", path: "/extract-images", description: "Download all embedded images from PDF documents in original quality" }
    ],
    faqs: [
      { question: "What PDF conversion formats do you support?", answer: "We support conversion between PDF and Word (DOCX), Excel (XLS/XLSX), PowerPoint (PPT/PPTX), JPG, PNG, TIFF, GIF, WebP, HTML, and plain text. Both converting from PDF and converting to PDF are supported for all major formats." },
      { question: "Does conversion preserve my document formatting?", answer: "Yes. Our conversion engine intelligently detects and preserves document structure including headers, footers, tables, lists, images, and text formatting. The output closely matches the original document layout." },
      { question: "Is there a file size limit for PDF conversion?", answer: "Our free tools support files up to 50MB. For most documents, this is more than sufficient. If you have larger files, consider compressing them first using our Compress PDF tool." },
      { question: "Are my files secure during conversion?", answer: "Absolutely. All file transfers use SSL encryption, processing happens on secure servers, and files are automatically deleted within one hour of conversion. We never access or store your document content." },
      { question: "Can I convert scanned PDFs to editable text?", answer: "Yes. Use our OCR PDF tool to convert scanned documents into searchable, editable text. The OCR engine supports multiple languages and handles various scan qualities." },
      { question: "Do I need to create an account to convert PDFs?", answer: "No. All our conversion tools are completely free with no registration, no email required, and no watermarks added to your converted files." }
    ],
    relatedBlogs: [
      { title: "How to Convert PDF to Word Without Losing Formatting", path: "/blog/convert-pdf-to-word-without-losing-formatting" },
      { title: "Convert PDF Tables to Excel Accurately", path: "/blog/pdf-to-excel-convert-tables" },
      { title: "Convert Images to PDF Free", path: "/blog/convert-images-to-pdf" },
      { title: "HTML to PDF Conversion Guide", path: "/blog/html-to-pdf-conversion" },
      { title: "Convert PDF to Editable Word Free", path: "/pdf-to-word" },
      { title: "Convert Scanned PDF to Editable Word", path: "/tools/convert-scanned-pdf-to-word-editable" },
      { title: "Convert PDF to JPG High Quality", path: "/pdf-to-jpg" },
      { title: "Convert All PDF Pages to JPG", path: "/pdf-to-jpg" },
      { title: "Convert Excel to PDF Free", path: "/excel-to-pdf" }
    ],
    relatedCategories: [
      { name: "Edit PDF Tools", path: "/edit-pdf-tools" },
      { name: "Compress PDF", path: "/compress-pdf-tools" },
      { name: "Image Tools", path: "/image-tools" }
    ]
  },
  {
    slug: "compress-pdf-tools",
    title: "Compress PDF Online Free — Reduce Size Up to 90% | PDF HUB 24",
    h1: "Compress & Optimize PDF Files Free Online",
    description: "Reduce PDF file size by up to 90% without losing quality. Free PDF compressor with 3 compression levels. Perfect for email, upload, and storage.",
    intro: `Large PDF files create real problems in everyday work. Email providers reject attachments over 25MB, cloud storage fills up quickly, and slow uploads waste valuable time. PDF compression solves these problems by reducing file size while maintaining the visual quality your documents need.

PDF HUB 24 offers a powerful compression suite that goes beyond simple file squeezing. Our compression tools analyze your document structure and apply intelligent optimization strategies tailored to your content type. Text-heavy documents get different treatment than image-rich portfolios, ensuring optimal results regardless of what your PDF contains.

Understanding compression is key to getting the best results. PDF files become large primarily due to high-resolution embedded images, multiple font files, complex vector graphics, and redundant metadata. Our tools target each of these areas independently, removing unnecessary data while preserving the elements that matter for your document's purpose.

For email attachments, medium compression typically reduces files by 40-70%, bringing most documents well under the 25MB Gmail limit. For web uploads and archiving, high compression can achieve 70-90% reduction, dramatically saving storage space. And for documents where every detail matters, low compression provides 20-40% reduction with virtually zero quality impact.

The compression workflow can be enhanced by combining multiple optimization steps. Removing unnecessary pages, converting color documents to grayscale when color is not needed, and flattening interactive layers before compression can multiply your size savings. A 50MB document can often be reduced to under 5MB using this multi-step approach.

Our compression engine processes files entirely on secure servers with automatic deletion after one hour. No registration is required, no watermarks are added, and there are no daily usage limits. Whether you need to compress one file or dozens, our tools are ready whenever you need them.`,
    tools: [
      { name: "Compress PDF", path: "/compress-pdf", description: "Reduce PDF file size with three compression levels: low, medium, and high" },
      { name: "Grayscale PDF", path: "/grayscale-pdf", description: "Convert color PDFs to black and white to reduce file size and save ink" },
      { name: "Flatten PDF", path: "/flatten-pdf", description: "Merge all PDF layers into a single flat layer, reducing complexity and file size" },
      { name: "Resize PDF", path: "/resize-pdf", description: "Change PDF page dimensions to standard sizes like A4 or Letter" },
      { name: "Delete Pages", path: "/delete-pages", description: "Remove unnecessary pages from PDFs to reduce overall file size" },
      { name: "Crop PDF", path: "/crop-pdf", description: "Trim PDF margins and remove whitespace to optimize page dimensions" },
      { name: "Image Compressor", path: "/image-compressor", description: "Compress images before embedding in PDFs for smaller final file sizes" }
    ],
    faqs: [
      { question: "How much can I compress my PDF?", answer: "Compression results vary by content type. Image-heavy PDFs can be reduced by 70-90%, while text-only documents typically see 20-40% reduction. Our tool offers three compression levels to balance quality and size." },
      { question: "Will compression make my PDF look blurry?", answer: "Low and medium compression maintain excellent visual quality. High compression may slightly soften images but keeps text perfectly crisp. For critical documents, we recommend medium compression." },
      { question: "Can I compress a PDF for email under 25MB?", answer: "Yes. Our medium compression level typically brings PDFs well under the 25MB email limit. For very large files, combine compression with page deletion or grayscale conversion for maximum reduction." },
      { question: "Does compression remove any content?", answer: "No. Compression optimizes how data is stored within the PDF without removing any visible content. All text, images, and formatting remain intact." },
      { question: "Is the compression tool free?", answer: "Yes. Our Compress PDF tool is completely free with no registration required, no watermarks, and no daily usage limits." }
    ],
    relatedBlogs: [
      { title: "How to Compress PDF for Email Under 25MB", path: "/blog/how-to-compress-pdf-for-email" },
      { title: "Best Free PDF Tools in 2026", path: "/blog/best-free-pdf-tools-2026" },
      { title: "How to Flatten PDF Forms and Layers", path: "/blog/how-to-flatten-pdf" },
      { title: "Compress PDF Under 100KB", path: "/tools/compress-pdf-under-100kb" },
      { title: "Reduce PDF Size to 200KB", path: "/tools/reduce-pdf-size-to-200kb" },
      { title: "Compress PDF to 1MB", path: "/tools/compress-pdf-to-1mb" },
      { title: "Make PDF Smaller for Email", path: "/tools/compress-pdf-for-email" },
      { title: "Compress PDF Without Losing Quality", path: "/tools/compress-pdf-without-losing-quality" }
    ],
    relatedCategories: [
      { name: "Convert PDF Tools", path: "/convert-pdf" },
      { name: "Edit PDF Tools", path: "/edit-pdf-tools" },
      { name: "Secure PDF Tools", path: "/secure-pdf" }
    ]
  },
  {
    slug: "edit-pdf-tools",
    title: "Edit PDF Online Free — 15+ Editing Tools (No Install) | PDF HUB 24",
    h1: "Edit PDF Files Free Online with 15+ Tools",
    description: "Edit, merge, split, rotate, sign, annotate, and redact PDF documents free online. 15+ PDF editing tools with no software install and no watermarks.",
    intro: `Editing PDF documents used to require expensive desktop software like Adobe Acrobat. Today, PDF HUB 24 provides a comprehensive suite of free online PDF editing tools that handle everything from simple text additions to complex document restructuring — all from your web browser with no software installation needed.

Our editing tools cover the full spectrum of PDF manipulation. Need to combine multiple documents into one? Use Merge PDF. Want to extract specific pages? Split PDF handles that. Need to fix page orientation, add page numbers, insert watermarks, or digitally sign a document? We have dedicated tools for each task, all optimized for speed and quality.

The PDF editing process varies based on what you need to accomplish. For document assembly tasks like merging, splitting, reordering, and deleting pages, our tools process changes at the structural level without any quality loss. For visual editing tasks like adding text, images, shapes, annotations, and signatures, our canvas-based editor provides real-time preview and precise placement controls.

Security-focused editing is equally important. Our redaction tool permanently removes sensitive information from documents, while the protect and unlock tools manage password encryption. The flatten tool locks all interactive elements into a static format, preventing future modifications.

Every editing tool works on any device with a modern web browser. Upload your PDF, make your changes, and download the result — all in seconds. Files are processed securely and automatically deleted within one hour. No account creation, no watermarks, and no feature limitations.

Professional document preparation often requires multiple editing steps. Our tools are designed to work together seamlessly. You might merge documents, reorder pages, add page numbers, insert a watermark, and then compress the final result — all using our free tools in sequence. This workflow gives you the same results as premium desktop software at zero cost.`,
    tools: [
      { name: "Edit PDF", path: "/edit-pdf", description: "Add text, images, shapes, and annotations to PDF documents with canvas-based editor" },
      { name: "Merge PDF", path: "/merge-pdf", description: "Combine multiple PDF files into a single document with drag-and-drop reordering" },
      { name: "Split PDF", path: "/split-pdf", description: "Extract specific pages or divide PDFs into separate files by page range" },
      { name: "Rotate PDF", path: "/rotate-pdf", description: "Rotate PDF pages 90, 180, or 270 degrees to fix orientation issues" },
      { name: "Delete Pages", path: "/delete-pages", description: "Remove unwanted pages from PDF documents" },
      { name: "Reorder Pages", path: "/reorder-pages", description: "Rearrange PDF page order with intuitive drag-and-drop interface" },
      { name: "Extract Pages", path: "/extract-pages", description: "Pull out and save specific pages from a PDF as a new, separate document" },
      { name: "Add Page Numbers", path: "/add-page-numbers", description: "Insert page numbers with customizable position, format, and style" },
      { name: "Add Watermark", path: "/add-watermark", description: "Add text watermarks with custom font, position, opacity, and color" },
      { name: "Sign PDF", path: "/sign-pdf", description: "Add electronic signatures by drawing, typing, or uploading signature images" },
      { name: "Annotate PDF", path: "/annotate-pdf", description: "Add highlights, underlines, notes, and markup to PDF documents" },
      { name: "Crop PDF", path: "/crop-pdf", description: "Trim PDF margins and remove whitespace from pages" },
      { name: "Resize PDF", path: "/resize-pdf", description: "Change PDF page dimensions to A4, Letter, Legal, or custom sizes" },
      { name: "Flatten PDF", path: "/flatten-pdf", description: "Merge all form fields, annotations, and layers into a static document" },
      { name: "Repair PDF", path: "/repair-pdf", description: "Fix corrupted or damaged PDF files and recover readable content" },
      { name: "Compare PDF", path: "/compare-pdf", description: "Find differences between two PDF documents side by side" },
      { name: "Redact PDF", path: "/redact-pdf", description: "Permanently remove sensitive information by blacking out text and images" },
      { name: "Translate PDF", path: "/translate-pdf", description: "Translate PDF documents into 50+ languages including Spanish, French, Arabic, Hindi, and Chinese" },
      { name: "Batch Compress", path: "/batch-compress", description: "Compress multiple PDF files at once and download all as a single ZIP archive" },
      { name: "Scan to PDF", path: "/scan-to-pdf", description: "Capture photos with your camera and convert them directly into a PDF document" },
      { name: "PDF to PDF/A", path: "/pdf-to-pdfa", description: "Convert PDF documents to PDF/A format for long-term archiving and legal compliance" }
    ],
    faqs: [
      { question: "Can I edit text directly in a PDF?", answer: "Yes. Our Edit PDF tool lets you add new text anywhere on the page. For editing existing text, convert the PDF to Word first, make your changes, then convert back to PDF." },
      { question: "How do I merge multiple PDF files?", answer: "Upload all your PDF files to the Merge PDF tool, arrange them in your desired order using drag and drop, then click merge. The combined document downloads immediately." },
      { question: "Can I add my signature to a PDF?", answer: "Yes. Our Sign PDF tool offers three methods: draw your signature with mouse or touch, type your name in a signature font, or upload a signature image." },
      { question: "Do editing tools add watermarks?", answer: "No. All our editing tools are completely free with no watermarks, no registration required, and no feature limitations." },
      { question: "Can I undo changes after editing?", answer: "Our canvas-based editors support undo functionality during the editing session. However, once you download the edited file, changes are permanent. Always keep a copy of your original document." }
    ],
    relatedBlogs: [
      { title: "How to Edit PDF Text and Images Free", path: "/blog/edit-pdf-text-images" },
      { title: "How to Merge PDF Files Step by Step", path: "/blog/merge-pdf-files-guide" },
      { title: "Sign PDF Electronically Free", path: "/blog/sign-pdf-electronically" },
      { title: "Add Watermark to PDF Documents", path: "/blog/watermark-pdf-documents" },
      { title: "Merge PDF Free with No File Limit", path: "/tools/merge-pdf-free-no-limit" },
      { title: "Merge PDF for Visa Application", path: "/tools/merge-pdf-for-visa-application" },
      { title: "Split PDF by Pages Free", path: "/tools/split-pdf-by-pages" },
      { title: "Add Signature to PDF Free", path: "/sign-pdf" },
      { title: "Rotate PDF and Save Permanently", path: "/rotate-pdf" },
      { title: "Remove Pages from PDF Free", path: "/delete-pages" },
      { title: "Flatten PDF for Printing", path: "/flatten-pdf" },
      { title: "Add Watermark to PDF Free", path: "/add-watermark" }
    ],
    relatedCategories: [
      { name: "Convert PDF Tools", path: "/convert-pdf" },
      { name: "Compress PDF", path: "/compress-pdf-tools" },
      { name: "Secure PDF Tools", path: "/secure-pdf" }
    ]
  },
  {
    slug: "secure-pdf",
    title: "Secure PDF Online Free — Encrypt, Redact & Protect | PDF HUB 24",
    h1: "Secure & Protect PDF Documents Free Online",
    description: "Password protect, encrypt, redact, and secure PDF documents free online. AES-256 encryption, permanent redaction, and file privacy tools. No signup required.",
    intro: `PDF security is essential in today's digital landscape where sensitive documents are shared electronically every day. From financial reports and legal contracts to medical records and personal identification documents, ensuring your PDFs are properly secured prevents unauthorized access, data breaches, and compliance violations.

PDF HUB 24 provides a comprehensive set of security tools designed to protect your documents at every level. Password protection with AES-256 encryption prevents unauthorized opening and editing. Redaction permanently removes sensitive content that should never be visible. And our flatten tool locks document layers to prevent hidden data extraction.

Understanding when to use each security tool is crucial. Password protection is ideal for controlling who can open or edit a document — perfect for financial statements, contracts, and internal reports. Redaction is necessary when you need to share a document publicly but must remove certain information — common in legal discovery, FOIA responses, and HIPAA compliance. Flattening prevents layer manipulation and ensures form data cannot be altered.

A complete security workflow often combines multiple tools. For maximum protection, redact sensitive content first, then flatten the document to lock all layers, add a watermark marking the security level, and finally encrypt with a strong password. This multi-layer approach provides defense in depth that satisfies even the strictest compliance requirements.

Our security tools process files entirely on encrypted servers with automatic deletion within one hour. We never store, access, or share your document content. The encryption happens server-side using industry-standard algorithms, and the protected files are transmitted back to you over secure SSL connections.

Every security tool is free to use with no registration required. Whether you are a legal professional preparing court documents, a healthcare provider sharing patient records, or an individual protecting personal documents, our tools provide enterprise-grade security at zero cost.`,
    tools: [
      { name: "Protect PDF", path: "/protect-pdf", description: "Add password protection with AES-256 encryption and set editing/printing permissions" },
      { name: "Unlock PDF", path: "/unlock-pdf", description: "Remove password protection from PDFs when you know the password" },
      { name: "Redact PDF", path: "/redact-pdf", description: "Permanently remove sensitive text, images, and data from PDF documents" },
      { name: "Flatten PDF", path: "/flatten-pdf", description: "Lock all form fields, annotations, and layers into static content" },
      { name: "Add Watermark", path: "/add-watermark", description: "Add visible watermarks to mark documents as confidential or draft" },
      { name: "Sign PDF", path: "/sign-pdf", description: "Add electronic signatures for document authentication" }
    ],
    faqs: [
      { question: "What encryption does your PDF protection use?", answer: "We use AES-256 encryption, the same standard used by governments and financial institutions worldwide. This is the strongest commercially available encryption for PDF documents." },
      { question: "Can redacted content be recovered?", answer: "No. Our redaction tool permanently removes content from the PDF file structure. Unlike simply placing a black box over text, true redaction deletes the underlying data so it cannot be recovered by any means." },
      { question: "Should I flatten a PDF after redacting?", answer: "Yes. Flattening after redaction provides an additional security layer by merging all remaining layers into a single static layer, eliminating any possibility of hidden data in document layers." },
      { question: "Can I set different permissions for a protected PDF?", answer: "Yes. Our Protect PDF tool lets you set separate passwords for opening and editing, and control permissions for printing, copying, and modifying the document." },
      { question: "Are my files secure during processing?", answer: "Absolutely. All file transfers use SSL encryption, processing happens on secure servers, and files are automatically deleted within one hour. We never access or store your document content." }
    ],
    relatedBlogs: [
      { title: "How to Password Protect PDF Files", path: "/blog/protect-pdf-with-password" },
      { title: "Redact Sensitive Information in PDFs", path: "/blog/redact-sensitive-pdf-information" },
      { title: "How to Unlock PDF and Remove Password", path: "/blog/unlock-pdf-remove-password" },
      { title: "How to Flatten PDF Forms", path: "/blog/how-to-flatten-pdf" },
      { title: "Password Protect PDF Free (AES-256)", path: "/protect-pdf" },
      { title: "Unlock PDF for Editing Free", path: "/unlock-pdf" },
      { title: "Flatten PDF for Printing Free", path: "/flatten-pdf" },
      { title: "Add Watermark to PDF Free", path: "/add-watermark" }
    ],
    relatedCategories: [
      { name: "Edit PDF Tools", path: "/edit-pdf-tools" },
      { name: "Convert PDF Tools", path: "/convert-pdf" },
      { name: "Compress PDF", path: "/compress-pdf-tools" }
    ]
  },
  {
    slug: "image-tools",
    title: "Free Image Tools Online — Compress, Resize, Crop & Convert | PDF HUB 24",
    h1: "Free Online Image Tools — Compress, Resize, Crop & Convert",
    description: "Free online image tools for compression, resizing, cropping, rotating, and format conversion. Supports JPG, PNG, WebP, GIF, TIFF. No signup, no watermark.",
    intro: `Working with images is a daily task for designers, marketers, content creators, bloggers, and anyone who publishes content online. Whether you need to reduce image file sizes for faster website loading, resize photos for social media platforms, crop product images for your online store, or convert between image formats for compatibility, having reliable image tools saves significant time and effort.

PDF HUB 24 offers a complete set of free image manipulation tools alongside our PDF suite. Our image tools support all major formats including JPG, PNG, WebP, GIF, TIFF, and BMP, and provide professional-grade processing capabilities that rival paid software.

Image optimization is critical for web performance. Google's Core Web Vitals metrics directly impact search rankings, and image file size is one of the biggest factors affecting page load speed. Our Image Compressor tool reduces file sizes by up to 80% while maintaining visual quality, helping your web pages load faster and rank higher in search results.

Social media platforms each have their own image dimension requirements. Instagram prefers 1080x1080 for feed posts, Facebook recommends 1200x630 for shared links, and Twitter uses 1600x900 for card images. Our Resize Image tool makes it easy to prepare images for any platform with precise pixel or percentage-based resizing.

Image format conversion is equally important. WebP offers superior compression for web use, PNG provides transparency support for graphics and logos, JPG is universal for photographs, and TIFF is preferred for high-quality print work. Our Convert Image tool handles all these formats and more, letting you switch between formats instantly.

Every image tool processes files in your browser or on our secure servers with automatic deletion. No registration is needed, no watermarks are added, and there are no limits on the number of images you can process. Our tools work on any device with a web browser, making professional image editing accessible to everyone.`,
    tools: [
      { name: "Image Compressor", path: "/image-compressor", description: "Reduce image file sizes by up to 80% while maintaining visual quality. Supports JPG, PNG, and WebP" },
      { name: "PDF Viewer", path: "/pdf-viewer", description: "View and read PDF files directly in your browser with no download or software required" },
      { name: "Resize Image", path: "/resize-image", description: "Scale images to exact pixel dimensions or by percentage. Perfect for social media and web optimization" },
      { name: "Crop Image", path: "/crop-image", description: "Trim images to remove unwanted areas with precise selection tools" },
      { name: "Rotate Image", path: "/rotate-image", description: "Rotate images 90, 180, or 270 degrees, or flip horizontally and vertically" },
      { name: "Convert Image", path: "/convert-image", description: "Convert between JPG, PNG, WebP, GIF, TIFF, and BMP formats instantly" },
      { name: "JPG to PDF", path: "/jpg-to-pdf", description: "Convert JPG photos to PDF documents, combine multiple images into one PDF" },
      { name: "PNG to PDF", path: "/png-to-pdf", description: "Convert PNG images to PDF while preserving transparency" },
      { name: "WebP to PDF", path: "/webp-to-pdf", description: "Convert WebP images to universally compatible PDF format" },
      { name: "TIFF to PDF", path: "/tiff-to-pdf", description: "Convert TIFF images to PDF documents" },
      { name: "GIF to PDF", path: "/gif-to-pdf", description: "Convert GIF images to PDF format" }
    ],
    faqs: [
      { question: "What image formats do you support?", answer: "Our tools support JPG, JPEG, PNG, WebP, GIF, TIFF, TIF, and BMP formats. You can convert between any of these formats using our Convert Image tool." },
      { question: "Does image compression reduce quality?", answer: "Our compression algorithm is optimized to minimize visual quality loss. Most users cannot distinguish between the original and compressed versions. You can adjust the compression level to balance quality and file size." },
      { question: "Can I resize images without losing quality?", answer: "Reducing image dimensions maintains quality, as you are removing pixels. Enlarging images beyond their original dimensions may result in some quality loss, though our tool uses interpolation algorithms to minimize this." },
      { question: "Are these image tools really free?", answer: "Yes. All our image tools are completely free with no registration, no watermarks, no daily limits, and no feature restrictions." },
      { question: "Can I process multiple images at once?", answer: "Our tools process one image at a time for optimal quality. For batch workflows, process each image individually or convert them to PDF first and then work with the PDF." }
    ],
    relatedBlogs: [
      { title: "Convert Images to PDF Free", path: "/blog/convert-images-to-pdf" },
      { title: "Batch Convert Images to PDF", path: "/blog/batch-convert-images-to-pdf" },
      { title: "How to Compress PDF for Email", path: "/blog/how-to-compress-pdf-for-email" },
      { title: "Convert PDF to JPG High Quality", path: "/pdf-to-jpg" },
      { title: "Convert All PDF Pages to JPG", path: "/pdf-to-jpg" }
    ],
    relatedCategories: [
      { name: "Convert PDF Tools", path: "/convert-pdf" },
      { name: "Compress PDF", path: "/compress-pdf-tools" },
      { name: "Edit PDF Tools", path: "/edit-pdf-tools" }
    ]
  }
];

export function getCategoryHub(slug: string): CategoryHub | undefined {
  return categoryHubs.find(hub => hub.slug === slug);
}
