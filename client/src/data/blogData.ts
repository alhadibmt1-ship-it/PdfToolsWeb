export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
  relatedTools: { name: string; path: string; description: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress a PDF for Email (Get Under Gmail and Outlook Limits)",
    metaTitle: "Compress PDF for Email: Fix File Too Large | PDF HUB 24",
    metaDescription: "Email rejecting your PDF? Learn what the attachment limits really are and how to shrink a PDF to a safe size without wrecking readability. Free, no signup.",
    excerpt: "Gmail and Yahoo cap attachments at 25 MB, Outlook and iCloud sit around 20 MB, and many company servers are stricter. Here is how to shrink a PDF to a size that actually gets delivered.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-16",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["compress","email","file size"],
    content: `
You attach the PDF, hit send, and get a bounce: "message too large." It usually happens at the worst moment, with a contract, an application or an invoice due in minutes. The fix takes about a minute once you know what is actually making the file heavy.

## What the limits really are

Gmail and Yahoo allow attachments up to 25 MB. Outlook.com and iCloud Mail sit closer to 20 MB. Plenty of company mail servers set their own cap, often 10 MB. Email also inflates attachments by roughly a third when it encodes them for sending, so a 20 MB PDF can fail even on a 25 MB limit. As a rule of thumb, aim for **under 10 MB** if you don't know the recipient's server.

## Why your PDF is so big

Almost always it is images. A scan or a photo-heavy export stores each page as a large picture, while a text-only PDF of 50 pages can be a few hundred kilobytes. Embedded fonts and leftover editing data add a bit, but images are the main cause. That tells you where to look: shrinking the images is what actually saves space.

## Step by step

1. Open [Compress PDF](/compress-pdf) and upload your file (up to 50 MB).
2. Pick a level. **Low** keeps the most quality, **Medium** is the sensible default, and **High** squeezes hardest.
3. Download the result and compare the size with the original.
4. Zoom into a page with small print or a signature to check it is still readable before you send it.

Start on Medium. Only move to High if the file is still too big, because High is where fine detail can start to soften.

## If it is still too large

- **Remove pages nobody needs.** Cover sheets and blank scan pages add up. [Delete Pages](/delete-pages) takes them out.
- **Split the document.** Send a 60-page file as two 30-page parts with [Split PDF](/split-pdf), then mention both attachments in your message.
- **Convert to grayscale.** A colour scan of a black-and-white document carries colour data you don't need. [Grayscale PDF](/grayscale-pdf) reduces it.
- **Share a link instead.** For anything truly large, upload it to your cloud storage and send the link.

## How to avoid the problem next time

When you scan, choose 150 to 200 DPI for ordinary documents instead of 300 or 600, and pick black and white for text-only pages. Exporting from Word or Google Docs directly to PDF, rather than printing to a scanner and back, also keeps files small. If you regularly send batches, [Batch Compress](/batch-compress) handles several files in one go.

## Mistakes to avoid

- **Compressing repeatedly.** Each pass can soften images a little more. Go back to your original if the result isn't right.
- **Compressing before merging.** Merge first, then compress once.
- **Not checking the result.** Zoom in on small print before you send.
- **Sending big files unannounced.** A short note to the recipient saying the file is large helps if it gets filtered.

## Frequently Asked Questions

### Will compressing my PDF make the text blurry?
Text in a normal PDF is stored as vector data and stays sharp. Compression mostly affects the images. On Medium, most documents look the same on screen.

### How small can I realistically get a PDF?
It depends on the content. A text document shrinks a little because it is already small. A scanned document full of full-page images can drop dramatically. Photo-heavy files sit in between.

### Is it safe to compress a confidential file online?
Files are uploaded over an encrypted connection and deleted automatically after processing. If a document is highly sensitive, check your organisation's policy before uploading it to any online service.

### My PDF is under 25 MB but still bounced. Why?
Encoding overhead, other attachments in the same message, or a stricter limit on the recipient's server. Try getting it under 10 MB.
`,
    relatedTools: [
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size instantly"
          },
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Divide large PDFs into smaller files"
          },
          {
                "name": "Grayscale PDF",
                "path": "/grayscale-pdf",
                "description": "Convert to black and white"
          },
          {
                "name": "Delete Pages",
                "path": "/delete-pages",
                "description": "Remove unnecessary pages first"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDFs into one document"
          }
    ],
  },
  {
    slug: "convert-pdf-to-word-without-losing-formatting",
    title: "How to Convert PDF to Word Without Losing Formatting",
    metaTitle: "Convert PDF to Word Without Losing Layout | PDF HUB 24",
    metaDescription: "Why PDF to Word conversions break tables and fonts, how to check your PDF first, and a simple workflow that gives you a clean, editable Word file. Free.",
    excerpt: "Broken tables, jumping fonts and missing images usually come from the source PDF, not the converter. Check three things first and your Word file will come out far cleaner.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-16",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Tutorials",
    tags: ["pdf to word","convert","formatting"],
    content: `
Converting a PDF to Word looks like a one-click job until you open the result and find a table spilling off the page and headings in the wrong font. Understanding why it happens tells you how to prevent it.

## Why conversions go wrong

A PDF is a picture of a page. It records where each letter sits, not that a group of letters is a paragraph or that a grid of numbers is a table. A converter has to guess that structure, and the guess is only as good as the file it is given. Three types of PDF cause most of the trouble:

- **Scanned PDFs.** The page is a photo of text, so there is no text to convert at all.
- **Complex layouts.** Multi-column pages, text wrapped around images and nested tables are hard to rebuild.
- **Unusual fonts.** If the font isn't installed on your computer, Word swaps in another one and line breaks move.

## Step 1: Find out what kind of PDF you have

Open the file and try to select a sentence with your cursor. If it highlights word by word, it contains real text and will convert well. If nothing highlights, or a whole page selects as one block, it is a scan. Run [OCR PDF](/ocr-pdf) on it first to turn the picture into text. Our [OCR guide](/blog/ocr-scanned-pdf-to-text) covers what to expect.

## Step 2: Convert

1. Open [PDF to Word](/pdf-to-word).
2. Upload the file (up to 50 MB).
3. Convert and download the .docx.

If the PDF is password protected, remove the password with [Unlock PDF](/unlock-pdf) first, which you can do when you own the file or have permission to edit it.

## Step 3: Clean up in Word

Even a good conversion needs a short tidy-up. Work in this order:

1. Turn on **Show/Hide** (the ¶ button) so you can see stray line breaks and spaces.
2. Check headings. Apply real Heading styles so the document has structure.
3. Check tables. Widen columns or use AutoFit rather than moving text by hand.
4. Replace any font Word substituted with the one you want.
5. Check page breaks last, since they move whenever anything above them changes.

## When Word is the wrong destination

If you only need the numbers from a table, go straight to [PDF to Excel](/pdf-to-excel). If you just want to copy text, [Extract Text](/extract-text) is quicker and leaves no formatting to fix. And if the layout must stay exactly as designed, editing the PDF directly with [Edit PDF](/edit-pdf) may serve you better than converting.

## Quick fixes for common problems

| Problem | What to try |
| --- | --- |
| Text is jumbled or missing | The PDF is a scan. Run OCR first |
| Table is broken | Use Table Layout, AutoFit, or convert with PDF to Excel |
| Fonts changed | Install the original font or replace it in Word |
| Extra line breaks | Show paragraph marks and remove mid-sentence breaks |
| Images moved | Set their wrapping to In Line with Text or reposition |

## Frequently Asked Questions

### Can a converter keep formatting 100% identical?
Not reliably. Simple documents come close. Designed brochures, forms and multi-column layouts usually need some manual adjustment.

### Why are there extra line breaks in my Word file?
Converters often keep the original line endings of the PDF. Turn on the paragraph marks in Word and remove breaks in the middle of sentences, or use Find and Replace for double spaces.

### Will images and logos carry over?
Yes in most cases. Images usually come across as pictures inside the Word file, though their position can shift slightly.

### What about a scanned document?
Run OCR first. Without it there is no text to convert, only a picture of it.
`,
    relatedTools: [
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert PDF to editable DOCX"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Extract text from scanned PDFs"
          },
          {
                "name": "PDF to Excel",
                "path": "/pdf-to-excel",
                "description": "Convert PDF tables to spreadsheets"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Get plain text from any PDF"
          },
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove password before converting"
          }
    ],
  },
  {
    slug: "merge-pdf-files-guide",
    title: "How to Merge PDF Files Into One Document (Free and Fast)",
    metaTitle: "Merge PDF Files Free: Combine PDFs in Order | PDF HUB 24",
    metaDescription: "Combine several PDFs into one clean document in minutes. Learn the right order, how to avoid bloated files and what to do with mixed page sizes. Free.",
    excerpt: "Merging is easy; merging well is what people get wrong. Order your files, check page sizes and compress the result so the recipient gets one tidy document.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-23",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Complete Guides",
    tags: ["merge pdf","combine pdf","pdf merger","join pdf files"],
    content: `
Job applications, tax packs, contracts with exhibits, class notes: they all end up as a pile of separate PDFs that someone wants as one file. Merging takes a minute. A few small decisions before you click decide whether the result looks professional.

## Before you merge

**Decide the order.** Write it down if there are more than a few files: cover letter, main document, appendices. Renaming files with a number prefix (01, 02, 03) also keeps them in order on your computer.

**Check orientation.** A landscape spreadsheet printout in the middle of portrait pages is fine, but a sideways scan isn't. Fix those first with [Rotate PDF](/rotate-pdf).

**Remove what you don't need.** Blank pages and duplicate cover sheets make a merged file look careless. [Delete Pages](/delete-pages) removes them before you combine.

## How to merge

1. Open [Merge PDF](/merge-pdf).
2. Add your files (each up to 50 MB).
3. Drag them into the final order.
4. Merge and download the combined PDF.

Scroll through the result once. It takes thirty seconds and catches a missing file or a misplaced section before someone else does.

## After you merge

- **Reorder** any pages that ended up in the wrong place with [Reorder Pages](/reorder-pages).
- **Add page numbers** so the whole document reads as one piece. [Add Page Numbers](/add-page-numbers) numbers every page continuously, which matters for long submissions that refer to "page 14".
- **Compress it** if the total is large. Merged files add up quickly, and email limits are unforgiving. See [how to compress a PDF for email](/blog/how-to-compress-pdf-for-email).

## Mixed page sizes

If one file is A4 and another is US Letter, the merged document keeps each page at its own size. That is acceptable on screen but can look uneven when printed. To make them uniform, run the combined file through [Resize PDF](/resize-pdf).

## When you need only part of a file

Merging whole files is not always what you want. To pull specific pages out of one document before combining, use [Extract Pages](/extract-pages), and to cut a large file into sections, see [how to split PDF pages](/blog/how-to-split-pdf-pages).

## If the merge doesn't work

- **A file is rejected:** it may be password protected or damaged. Try [Unlock PDF](/unlock-pdf) or [Repair PDF](/repair-pdf) on that file.
- **You have more than 10 files:** merge them in groups, then merge the groups.
- **A file is over 50 MB:** compress it first with [Compress PDF](/compress-pdf).
- **The order is wrong:** fix it with Reorder Pages rather than merging again.

## Frequently Asked Questions

### Is there a limit to how many PDFs I can merge?
The standard merge tool accepts up to 10 files at a time. For larger sets, merge in groups and then merge the groups.

### Will merging reduce quality?
No. Merging joins the pages without re-rendering them, so text and images stay as they were.

### Can I merge password-protected PDFs?
Remove the password first with [Unlock PDF](/unlock-pdf) if you have the right to do so, then merge.

### Does the merged file keep bookmarks and links?
Simple links inside a page usually survive. Bookmarks from the original files may not, so check them if you rely on them.
`,
    relatedTools: [
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple PDFs into one"
          },
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Extract specific pages from PDFs"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Add professional page numbering"
          },
          {
                "name": "Reorder Pages",
                "path": "/reorder-pages",
                "description": "Rearrange page order in merged PDFs"
          }
    ],
  },
  {
    slug: "protect-pdf-with-password",
    title: "How to Password Protect a PDF (and Choose a Password That Holds Up)",
    metaTitle: "Password Protect a PDF Free: Step-by-Step | PDF HUB 24",
    metaDescription: "Add a password to a PDF in a minute. Learn the difference between open and permissions passwords, how to pick a strong one and how to share it safely.",
    excerpt: "A password stops strangers opening your PDF, but only if you pick a good one and share it sensibly. Here is the quick method and the mistakes to avoid.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-16",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Security",
    tags: ["protect","password","security","encryption"],
    content: `
Sending a payslip, a medical letter or a signed agreement by email means it can sit in several inboxes for years. A password on the PDF adds a real layer of protection for very little effort.

## Two kinds of PDF password

- **Open (user) password:** required to open the file at all. This is what most people mean by "password protected".
- **Owner (permissions) password:** controls what a person can do once the file is open, such as printing or copying. It is a polite lock rather than a strong one, because some software ignores those restrictions.

If the document is private, the open password is the one that matters.

## How to add a password

1. Open [Protect PDF](/protect-pdf) and upload your file (up to 50 MB).
2. Enter the password you want people to type to open it.
3. Download the protected PDF.
4. Open the new file yourself and confirm the password works before sending it.

Keep the original unprotected copy somewhere safe. If you forget the password on the only copy, nobody, including us, can recover it.

## Choosing a password that holds up

Length beats cleverness. A phrase of four or five unrelated words is easier to remember and much harder to guess than "P@ssw0rd1". Avoid names, birthdays and anything that appears on the document itself. Use a different password for each file that matters, and store them in a password manager.

## Sharing the password safely

Never put the password in the same email as the file. Send it another way: a text message, a phone call, or a messaging app. If you can, agree it in advance, for example "the last four digits of your account plus the invoice number".

## What a password does not do

A password protects the file in transit and at rest. It doesn't hide the fact that a document exists, and it doesn't stop an authorised recipient forwarding it. If parts of the content should never be seen by some readers, remove them instead: see [how to redact a PDF safely](/blog/redact-sensitive-pdf-information). To brand a document as confidential, [Add Watermark](/add-watermark) puts text across every page.

## Removing a password later

If you own the file and know the password, [Unlock PDF](/unlock-pdf) creates an unprotected copy. Our guide to [unlocking PDFs](/blog/unlock-pdf-remove-password) explains the details.

## Checklist before you send

1. Open the protected file yourself and confirm the password works.
2. Check you are sending the protected copy, not the original.
3. Send the password through a different channel.
4. Tell the recipient which viewer to use if they have trouble.
5. Keep the original in a safe place.

## Frequently Asked Questions

### How strong is the encryption?
Protect PDF uses PDF password encryption. The real-world strength comes down mostly to your password: a long, unique passphrase is far safer than a short one.

### Can I recover a forgotten password?
No. Keep the original file and store passwords securely.

### Will the recipient need special software?
No. Any modern PDF viewer, including browsers, phone apps and Adobe Reader, will ask for the password.

### Is it safe to upload a private file to protect it?
Files travel over an encrypted connection and are deleted automatically after processing. For extremely sensitive material, follow your organisation's own security rules.
`,
    relatedTools: [
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Add password encryption"
          },
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Black out sensitive info"
          },
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove password protection"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Prevent editing by flattening layers"
          },
          {
                "name": "Add Watermark",
                "path": "/add-watermark",
                "description": "Add visual security watermarks"
          }
    ],
  },
  {
    slug: "pdf-tools-for-students",
    title: "PDF Tools Every Student Needs: Assignments, Notes and Applications",
    metaTitle: "PDF Tools for Students: Free and Practical | PDF HUB 24",
    metaDescription: "The PDF jobs students actually face, from merging assignments to shrinking scans for portals, and the free tool that handles each one.",
    excerpt: "Submitting coursework, organising notes, applying for programmes: students run into the same PDF problems all term. Here is the quick fix for each.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-16",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["students","assignments","notes","applications"],
    content: `
Students deal with PDFs constantly: lecture slides, readings, assignment submissions, ID scans for applications. A short list of tools and habits covers nearly everything.

## Submitting assignments

**Turn your work into one PDF.** Export your document to PDF from your word processor, or [convert Word to PDF](/word-to-pdf) if you only have the Word file. If your work has several parts, such as a report, appendix and photos, join them with [Merge PDF](/merge-pdf). Our [merge guide](/blog/merge-pdf-files-guide) covers order and page sizes.

**Meet the size limit.** Portals often cap uploads. [Compress PDF](/compress-pdf) on Medium is a good start, and our guides on [email limits](/blog/how-to-compress-pdf-for-email) and [very small limits](/blog/compress-pdf-under-100kb) go further.

**Add page numbers.** Many courses require them. [Add Page Numbers](/add-page-numbers) numbers every page in one go.

## Handwritten work and photos

Photograph pages flat, in good light, and convert them with [JPG to PDF](/jpg-to-pdf) (up to 10 photos per run). Then resize to A4 with [Resize PDF](/resize-pdf) and compress. Full details are in our [image to PDF guide](/blog/convert-images-to-pdf).

## Studying with PDFs

- **Highlight and note** key points with [Annotate PDF](/annotate-pdf). It marks the first page, so for longer readings use a viewer that annotates every page.
- **Pull out the pages you need.** [Extract Pages](/extract-pages) creates a short reading from a long textbook or article, and [Split PDF](/split-pdf) takes a page range.
- **Copy text for notes** with [Extract Text](/extract-text). If the PDF is scanned, use [OCR PDF](/ocr-pdf) first.
- **Translate a reading** for understanding with [Translate PDF](/translate-pdf), remembering it is a plain machine translation, and that the text is sent to an online translation service.

## Applications and paperwork

- **Combine documents** such as transcript, CV and cover letter into a single PDF.
- **Sign forms** using [Sign PDF](/sign-pdf) for simple acceptances. Some applications require a formal signature, so read the instructions.
- **Protect personal documents** like passports or ID scans with [Protect PDF](/protect-pdf) before emailing them, and send the password separately. See [password protection](/blog/protect-pdf-with-password).

## Study habits that save time

1. Name files clearly: course, assignment and date.
2. Keep an original copy of anything you edit.
3. Check every output before you submit; open it and scroll through.
4. Submit early. Upload errors always happen at 11:58 pm.

## Frequently Asked Questions

### Do I need to create an account?
No, the tools work without signing up.

### What is the file size limit?
50 MB per file. For portals with lower caps, compress first.

### Can I convert a PDF back to Word to edit it?
Yes, with [PDF to Word](/pdf-to-word). See our guide on [keeping formatting](/blog/convert-pdf-to-word-without-losing-formatting).

### Is it okay to upload personal documents?
Check your institution's rules and avoid uploading anything you would not want processed by an online service.
`,
    relatedTools: [
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine documents for submission"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce size for upload limits"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Edit PDF content in Word"
          },
          {
                "name": "Word to PDF",
                "path": "/word-to-pdf",
                "description": "Convert assignments to PDF format"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned documents searchable"
          }
    ],
  },
  {
    slug: "how-to-split-pdf-pages",
    title: "How to Split a PDF: Extract Pages or Page Ranges",
    metaTitle: "Split PDF Free: Extract Pages and Ranges | PDF HUB 24",
    metaDescription: "Pull a page range out of a PDF in seconds. Step-by-step instructions, tips for splitting a large file into parts and what to use for removing pages instead.",
    excerpt: "Need chapter 3 from a textbook, one invoice from a monthly bundle or just the signed page? Here is how to pull exactly the pages you need out of a PDF.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-17",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["split pdf","extract pages","separate pdf"],
    content: `
Most PDFs arrive as one big file even when you only need part of it: a single chapter, the signature page, or the first ten pages of a report. Splitting saves you from sending or storing everything else.

## How the Split PDF tool works

[Split PDF](/split-pdf) extracts one page range from your document and gives you that range as a new PDF. You choose the start and end page, so "pages 5 to 12" or "page 3 to page 3" for a single page.

1. Open [Split PDF](/split-pdf) and upload your file (up to 50 MB).
2. Enter the first and last page of the range you want.
3. Run it and download the new PDF.
4. To get another section, run the tool again with a different range.

Your original file is not changed.

## Common jobs and the quickest way to do them

**Send only the pages that matter.** Extract the range, check the page count on the result, then attach it.

**Cut a big file into parts.** Say you have a 90-page document that is too large to email. Extract pages 1 to 45 and 46 to 90 as two runs, then compress each with [Compress PDF](/compress-pdf) if needed.

**Take out scattered pages.** If you want pages 2, 7 and 9 only, [Extract Pages](/extract-pages) lets you pick them individually. If you want to keep everything except a few pages, [Delete Pages](/delete-pages) is faster than extracting.

**Rebuild in a different order.** After splitting, [Merge PDF](/merge-pdf) and [Reorder Pages](/reorder-pages) let you assemble a custom document.

## Tips that save time

- Check the page numbers printed on the paper against the viewer's page count. A document with a cover and roman-numeral front matter often has a printed page 1 that is actually PDF page 5.
- Preview the extracted file before sending it. It takes ten seconds and catches an off-by-one mistake.
- Keep the source file. If you later need another section you won't have to hunt for it.

## Example: pulling one chapter out of a long report

Say you need chapter 3, which runs from page 41 to page 68 of a 120-page report. Open [Split PDF](/split-pdf), enter 41 as the first page and 68 as the last, and download the result. Open it and check that it starts on the chapter heading and ends on the last page of the chapter. If a table or figure runs over, adjust the end page and run it again from your original file. Finally, if the extract is heavy because of images, shrink it with [Compress PDF](/compress-pdf) before you send it.

## Mistakes to avoid

- Counting printed page numbers instead of the PDF's own page count.
- Overwriting your original with the extracted file. Save the extract under a new name.
- Splitting when you only need to remove a few pages; Delete Pages is faster.
- Forgetting to check the extract before sending it.

## Frequently Asked Questions

### Can I split a PDF into one file per page?
The tool extracts one range per run. For a handful of pages, run it several times. For a whole document, you can also export pages as images with [PDF to JPG](/pdf-to-jpg).

### Does splitting change the quality?
No. Pages are copied as they are.

### Can I split a password-protected PDF?
Unlock it first with [Unlock PDF](/unlock-pdf), provided you have the right to edit it.

### What is the maximum file size?
50 MB per file.
`,
    relatedTools: [
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Extract specific pages"
          },
          {
                "name": "Delete Pages",
                "path": "/delete-pages",
                "description": "Remove unwanted pages"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDFs back together"
          },
          {
                "name": "Reorder Pages",
                "path": "/reorder-pages",
                "description": "Rearrange page sequence"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce split file sizes"
          }
    ],
  },
  {
    slug: "add-page-numbers-to-pdf",
    title: "How to Add Page Numbers to a PDF (Position, Start Number and Font Size)",
    metaTitle: "Add Page Numbers to PDF Free: Any Position | PDF HUB 24",
    metaDescription: "Number the pages of a PDF in seconds. Choose the position, the starting number and the font size, and learn how to handle cover pages and merged files.",
    excerpt: "A numbered document is easier to read, cite and print. Here is how to add page numbers, start from any number and avoid the usual cover-page problem.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-17",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["page numbers","pdf","numbering","documents"],
    content: `
Reports, legal bundles, dissertations and manuals all need page numbers, and merged PDFs almost never have them. Adding them afterwards takes less than a minute.

## What the tool does

[Add Page Numbers](/add-page-numbers) writes a plain number on every page. You choose:

- **Position:** top or bottom, and left, centre or right (six positions in all).
- **Start number:** the number the first page gets. It defaults to 1.
- **Font size:** 12 by default. Go smaller for dense pages and larger for slides.

Numbers are added to every page in order, in a simple sans-serif font. The tool writes just the number, so there is no "Page 3 of 20" style.

## Steps

1. Open [Add Page Numbers](/add-page-numbers) and upload your PDF (up to 50 MB).
2. Pick the position, start number and size.
3. Download the numbered file and scroll through it.

Check a few pages, especially any with a footer or a dark background. If a number lands on top of existing text, try another corner.

## The cover page problem

Numbering starts on page one, cover included. If you want the first content page to be "1", do this:

Number the body of the document on its own, then add the cover afterwards. Use [Split PDF](/split-pdf) to separate the body from the cover, number the body with the start number set to 1, and put the cover back at the front with [Merge PDF](/merge-pdf).

## Numbering merged documents

Merge everything first and number afterwards, so the sequence is continuous across all sections. Doing it in the other order gives you several documents that each start at 1. Our [merge guide](/blog/merge-pdf-files-guide) explains how to order files before you combine them.

## Tips

- Pick a corner that matches your reader's habits. Bottom centre suits reports; bottom right suits books and legal work.
- Check that the number doesn't collide with an existing printed footer. If it does, switch corners.
- If you rearrange pages afterwards with [Reorder Pages](/reorder-pages), the numbers are part of each page and travel with it, so finish reordering before you number.
- Compress the final file if it grew, with [Compress PDF](/compress-pdf).

## Example: a 40-page report with a cover and contents page

Merge the cover, contents and body into one file with [Merge PDF](/merge-pdf), or keep the cover separate if you want the body to start at 1. Add the numbers at bottom centre, size 11 or 12, and check the pages with tables or full-width images. If a table runs into the number, switch to bottom right. Then compress the finished file if it is going by email, and keep an unnumbered copy in case you need to reorder sections later.

## Frequently Asked Questions

### Can I number only some pages?
Not directly. Split the file, number the part you need, and merge it back.

### Can I use roman numerals or "Page X of Y"?
No. The tool adds plain numbers.

### Can I remove numbers later?
Not from the finished file. Keep your unnumbered original.

### Does it change the rest of the page?
No. Only the number is added.
`,
    relatedTools: [
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Number your PDF pages"
          },
          {
                "name": "Add Watermark",
                "path": "/add-watermark",
                "description": "Brand your documents"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Modify PDF content"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine documents before numbering"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce file size after numbering"
          }
    ],
  },
  {
    slug: "convert-images-to-pdf",
    title: "How to Convert Images to PDF (JPG and PNG, One File or Many)",
    metaTitle: "Convert JPG and PNG to PDF Free | PDF HUB 24",
    metaDescription: "Turn photos, screenshots and scans into one tidy PDF. Learn the order, size and quality settings that matter and how to keep the file small enough to send.",
    excerpt: "A folder of photos is awkward to send. One PDF is not. Here is how to combine images into a clean, correctly ordered document.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-17",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["jpg to pdf","png to pdf","image conversion"],
    content: `
Receipts photographed on your phone, screenshots of a conversation, pages of a form snapped one by one: most people end up with a set of images that needs to become a single document. A PDF is what schools, employers, banks and landlords actually want to receive.

## Choose the right tool

- **JPG photos and scans:** [JPG to PDF](/jpg-to-pdf) accepts up to 10 images per run.
- **PNG screenshots and graphics:** [PNG to PDF](/png-to-pdf) accepts up to 20 images per run.
- **More images than that:** convert in batches and combine the results with [Merge PDF](/merge-pdf). Our guide to [batch converting images to PDF](/blog/batch-convert-images-to-pdf) walks through it.

## Steps

1. Rename your images so they sort in the order you want, for example 01, 02, 03. Order matters more than anything else.
2. Open the right converter and upload the images.
3. Check the order shown on screen and change it if needed.
4. Convert and download your PDF.
5. Scroll through once to confirm nothing is upside down or missing.

## Get the quality and size right

Photos taken on modern phones are large, often 3 to 8 MB each, and every page takes the size of its image, so a 10-page document can easily reach 40 MB. Give the pages a standard size with [Resize PDF](/resize-pdf), and compress the finished PDF with [Compress PDF](/compress-pdf). If the PDF needs to fit through email, see [how to compress a PDF for email](/blog/how-to-compress-pdf-for-email).

Some practical shooting tips for document photos:

- Photograph in even light with no shadows across the page.
- Hold the phone directly above the page so lines stay straight.
- Fill the frame. Extra background only makes the file bigger.
- If you can, use your phone's document scanning mode, which straightens the page for you.

## Common problems

**A page is sideways.** Fix it with [Rotate PDF](/rotate-pdf). It turns every page by the same angle, so correct the source image before converting if only one is wrong.

**The text is not searchable.** Images contain no text. Run [OCR PDF](/ocr-pdf) if you need to search or copy from the result.

**The order is wrong after converting.** Use [Reorder Pages](/reorder-pages) rather than starting over.

## JPG or PNG: which should you start from?

Photos of paper, ID cards and receipts are normally JPG, and that is fine. Screenshots and anything with sharp text or flat colours are often PNG, and they stay crisper in that format. There's no need to convert one to the other before making the PDF. Use the tool that matches your files and merge the results if you have both kinds.

## A quick workflow for phone photos

Take the photos flat and in good light, rename them 01, 02, 03 in page order, convert them, and scroll through the PDF to confirm the order and orientation. Compress it if the total is large, and run OCR only if you need to search or copy text from it.

## Frequently Asked Questions

### Will converting reduce image quality?
Image quality is preserved. What changes is size: each page takes the dimensions of its image, and the PDF can end up larger than the photos. Use [Resize PDF](/resize-pdf) for a standard page size and compress afterwards.

### Can I mix JPG and PNG in one PDF?
Convert each group with its own tool, then merge the two PDFs.

### What is the file size limit?
50 MB per file.

### Can I add page numbers to the finished PDF?
Yes, use [Add Page Numbers](/add-page-numbers) afterwards.
`,
    relatedTools: [
          {
                "name": "JPG to PDF",
                "path": "/jpg-to-pdf",
                "description": "Convert JPG images to PDF"
          },
          {
                "name": "PNG to PDF",
                "path": "/png-to-pdf",
                "description": "Convert PNG images to PDF"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple PDFs into one"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce image PDF file sizes"
          },
          {
                "name": "Add Watermark",
                "path": "/add-watermark",
                "description": "Brand your photo PDFs"
          }
    ],
  },
  {
    slug: "ocr-scanned-pdf-to-text",
    title: "OCR: How to Turn a Scanned PDF Into Searchable, Copyable Text",
    metaTitle: "OCR a Scanned PDF to Text (Free) | PDF HUB 24",
    metaDescription: "Scanned PDFs are just pictures of text. Learn how OCR works, how to prepare a scan for good results and how to copy or search the text afterwards.",
    excerpt: "If you can't select or search the text in a PDF, it is an image. OCR reads it and gives you real text. Here is how to get accurate results.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-18",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Guides",
    tags: ["ocr","scanned pdf","text extraction"],
    content: `
You scanned a contract or received a photographed document, and now you can't search it, copy a sentence or paste a figure into an email. That's because the file contains a picture of text, not the text itself. OCR, short for optical character recognition, reads the picture and recovers the words.

## How to tell if you need OCR

Open the PDF and press Ctrl+F (Cmd+F on Mac) to search for a word you can see on the page. If nothing is found, or you can't highlight individual words, the page is an image.

## How to run OCR

1. Open [OCR PDF](/ocr-pdf).
2. Upload your scanned file (up to 50 MB).
3. Start the process and wait for it to finish.
4. Download the result and check it.

The OCR tool is tuned for **English** text at the moment, so expect the best results with English documents.

## What affects accuracy

OCR quality depends mostly on the scan, not the software.

- **Resolution.** 300 DPI is a good target for text. Far below 150 DPI and small letters blur into each other.
- **Contrast.** Dark text on a light background reads best. Faded photocopies and shadows cause errors.
- **Straightness.** A skewed page confuses line detection. Fix sideways or upside-down pages with [Rotate PDF](/rotate-pdf) before running OCR.
- **Layout.** Simple single-column pages work best. Tables, columns and handwriting are harder, and handwriting is generally not reliable.

## Always proofread

Even good OCR makes mistakes, and they cluster in the places you care about most: numbers, names and dates. Confusing "0" and "O", or "1" and "l", is classic. Read through anything you'll rely on, and check figures against the original image.

## What to do with the text

- **Copy it** straight into an email or document, or use [Extract Text](/extract-text) to pull it out in bulk.
- **Edit it** by converting to Word with [PDF to Word](/pdf-to-word). See [how to convert without losing formatting](/blog/convert-pdf-to-word-without-losing-formatting).
- **Move tables into a spreadsheet** with [PDF to Excel](/pdf-to-excel), then check the numbers carefully.
- **Keep a searchable archive.** A searchable PDF is far easier to find things in months later.

## A five-minute proofreading routine

Search the result for the words you care about most, such as names and reference numbers. Check every number and date against the original page image, because that is where mistakes matter most. Look for common mix-ups: the letter O and the digit 0, lowercase l and the digit 1, and rn read as m. Read one full paragraph aloud against the page. If errors keep appearing, rescan at a higher resolution or with better lighting and run OCR again instead of fixing everything by hand.

## Frequently Asked Questions

### Does OCR change how the document looks?
The page looks the same. OCR adds a text layer that you can search and select.

### Can it read handwriting?
Not reliably. It is built for printed text.

### Why are some words wrong?
Usually low resolution, poor contrast or an unusual font. A cleaner, straighter scan almost always improves the result.

### Will OCR make my file bigger?
Sometimes slightly. If it grows too large, compress it afterwards with [Compress PDF](/compress-pdf).
`,
    relatedTools: [
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Convert scanned PDFs to searchable text"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Get text from digital PDFs"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Edit OCR-processed text in Word"
          },
          {
                "name": "PDF to Excel",
                "path": "/pdf-to-excel",
                "description": "Extract tables from scanned PDFs"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce OCR-processed file sizes"
          }
    ],
  },
  {
    slug: "rotate-pdf-pages",
    title: "How to Rotate PDF Pages (and Save the Change for Good)",
    metaTitle: "Rotate PDF Pages Free: 90, 180, 270 | PDF HUB 24",
    metaDescription: "Fix sideways or upside-down PDF pages and save the rotation for good. Learn why viewer rotation doesn't stick and how to fix a single bad page.",
    excerpt: "Rotating in your PDF viewer only changes what you see. To fix the file itself, rotate it and save a new copy. Here is how, including the one-bad-page case.",
    author: "PDF HUB 24 Team",
    publishDate: "2025-12-18",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["rotate pdf","fix orientation","page rotation"],
    content: `
Scanners feed pages in sideways, phones capture landscape when you meant portrait, and suddenly a PDF has to be read with your head tilted. The fix is quick, but there is one trap that catches people out.

## Viewer rotation versus real rotation

Most PDF viewers have a rotate button. It turns the page on your screen only. Close the file and it comes back sideways, and everyone you send it to sees it sideways too. To fix the file itself, you need to rotate it and save a new copy.

## How to rotate a PDF

1. Open [Rotate PDF](/rotate-pdf) and upload the file (up to 50 MB).
2. Choose 90°, 180° or 270° clockwise. Use 90° if the top of the page points left, 180° if it is upside down, and 270° if the top points right.
3. Download the rotated file and open it to confirm.

The tool rotates **all pages** by the same amount, so it is ideal when a whole scan came in the same way.

## When only one page is wrong

If most pages are fine and one is sideways, here is the workaround:

1. Use [Extract Pages](/extract-pages) or [Split PDF](/split-pdf) to pull out the bad page.
2. Rotate that single page file with Rotate PDF.
3. Put it back with [Merge PDF](/merge-pdf), and fix the order with [Reorder Pages](/reorder-pages) if necessary.

## After rotating

- **Scans with tilted content.** A page that is slightly crooked rather than sideways needs to be rescanned or straightened in a scanning app. Rotate PDF only turns in right angles.
- **Text search on scans.** If the document is scanned, run [OCR PDF](/ocr-pdf) after fixing orientation. OCR reads upright pages far more accurately, as explained in our [OCR guide](/blog/ocr-scanned-pdf-to-text).
- **Trim edges.** Use [Crop PDF](/crop-pdf) to remove scanner borders left over after rotation.

## Why pages come in sideways

Document feeders pull sheets in whichever way they were loaded, phones save a landscape photo when the sensor reads the tilt wrongly, and wide tables are sometimes printed in landscape on purpose. Before you rotate a whole file, scroll through it to make sure the pages are all wrong in the same way. If they aren't, use the single-page approach above. After rotating, look at the first and last page again to confirm the fix worked throughout.

## Frequently Asked Questions

### Why does my PDF revert to the old orientation?
You probably rotated it in a viewer without saving. Use the Rotate PDF tool to create a corrected file.

### Can I rotate by a custom angle, such as 15 degrees?
No. The tool turns pages in 90-degree steps.

### Does rotating reduce quality?
No. The page content is unchanged; only its orientation is.

### Can I rotate only selected pages?
Not directly. Use the extract, rotate and merge approach above.
`,
    relatedTools: [
          {
                "name": "Rotate PDF",
                "path": "/rotate-pdf",
                "description": "Fix page orientation"
          },
          {
                "name": "Crop PDF",
                "path": "/crop-pdf",
                "description": "Remove unwanted margins"
          },
          {
                "name": "Resize PDF",
                "path": "/resize-pdf",
                "description": "Change page dimensions"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned pages searchable"
          },
          {
                "name": "Reorder Pages",
                "path": "/reorder-pages",
                "description": "Rearrange page sequence"
          }
    ],
  },
  {
    slug: "sign-pdf-electronically",
    title: "How to Sign a PDF Electronically (and When a Simple Signature Is Enough)",
    metaTitle: "Sign a PDF Online Free: Type or Draw | PDF HUB 24",
    metaDescription: "Add a typed or drawn signature to a PDF without printing. Learn what a simple electronic signature is, when it is enough and when you need a certified one.",
    excerpt: "Printing, signing and scanning is unnecessary for most everyday paperwork. Here is how to sign a PDF in a minute, and how to tell when you need something stronger.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-01-15",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["sign pdf","electronic signature","e-sign","digital signature"],
    content: `
For most day-to-day paperwork, you don't need a printer. Adding your signature to a PDF on screen is quick, and in many situations it is perfectly acceptable. It is worth knowing what you are actually creating, though.

## What Sign PDF does

[Sign PDF](/sign-pdf) places a signature on your document. You can **type your name** in a signature style or **draw it** with your mouse or finger. The signature is added to the page as part of the file, and you download the signed copy.

Note that the tool places the signature on the **first page** of the document. If your signature line is on a later page, use [Extract Pages](/extract-pages) to work with that page on its own, sign it, and merge it back with [Merge PDF](/merge-pdf).

## Step by step

1. Open [Sign PDF](/sign-pdf) and upload your document.
2. Choose typed or drawn signature.
3. Set the X and Y position fields (measured from the bottom-left corner of the page) to place it on the signature line.
4. Download the signed PDF and open it to check placement. If it is off, adjust the numbers and run it again on your original.

## Simple e-signature versus certified digital signature

These two get mixed up constantly.

- **A simple electronic signature** is an image or typed name showing intent to sign. That is what this tool creates. It is widely accepted for internal approvals, permission slips, quotes, rental applications and many routine agreements.
- **A digital (certificate-based) signature** uses a cryptographic certificate to identify the signer and to reveal any change made after signing. Some contracts, government filings and regulated processes require it.

Whether a simple signature is legally sufficient depends on the document type and where you are. If you are unsure, ask the other party or a legal professional, and if the paperwork is high-value, use a service built for certified signing.

## Good habits when signing

- **Sign a copy.** Keep an unsigned original.
- **Flatten afterwards.** Run the signed file through [Flatten PDF](/flatten-pdf) so the signature and form entries become part of the page and can't be moved by accident.
- **Protect the final version.** If it will be circulated, add an open password with [Protect PDF](/protect-pdf), or read our guide to [password protecting a PDF](/blog/protect-pdf-with-password).
- **Fill in the details first.** If you need to add dates or text near the signature, use [Edit PDF](/edit-pdf) before signing, not after.

## Checklist before you sign

1. Read the document to the end.
2. Confirm that a simple electronic signature is acceptable for this document.
3. Fill in any dates and names first.
4. Sign a copy and keep the original unsigned.
5. Open the signed file to check the signature is clear and in the right place.

## Frequently Asked Questions

### Is a typed signature legally valid?
In many places, yes, for many document types, because the law often recognises intent to sign rather than a specific format. Some documents have special rules, so check for anything important.

### Can I sign on my phone?
Yes. The tool works in a mobile browser, and drawing with your finger is the easiest way to create a handwritten-style signature.

### Will the signature be visible in every PDF viewer?
Yes, it becomes part of the page content.

### Can others tell if the document was altered after I signed?
Not with a simple signature. Certificate-based signing is designed for that.
`,
    relatedTools: [
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add your signature to PDFs"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Make signatures permanent"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Password protect signed docs"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Add text and fill form fields"
          },
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove restrictions before signing"
          }
    ],
  },
  {
    slug: "edit-pdf-text-images",
    title: "How to Edit a PDF: Add Text, Shapes and Highlights",
    metaTitle: "Edit PDF Online Free: Add Text and Shapes | PDF HUB 24",
    metaDescription: "Add text, shapes, lines and highlights to a PDF online. See exactly what the editor can and can't do, and which tool to use when you need real text changes.",
    excerpt: "The editor adds text, shapes, highlights and notes to a PDF. It doesn't rewrite existing text, so here is how to choose the right approach for the job.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-01-20",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["edit pdf","add text","annotations","shapes"],
    content: `
People say "edit a PDF" and mean three different things: fill in blanks, mark up a page, or change the words that are already there. The right tool depends on which one you want.

## What Edit PDF can do

[Edit PDF](/edit-pdf) lets you add these on top of a page:

- **Text**, with your choice of colour and size
- **Rectangles, circles and lines**
- **Highlights and underlines**
- **Notes**

Everything you add sits on top of the original content. The tool does not reflow or rewrite text that is already in the document, and edits are placed on the **first page** of the file.

## How to use it

1. Open [Edit PDF](/edit-pdf) and upload your file (up to 50 MB).
2. Choose a tool (text, shape, highlight) and place it on the page.
3. Adjust the size and colour, then apply.
4. Download the edited PDF and open it to check every addition.

## Which route for which job

| You want to... | Best option |
| --- | --- |
| Fill in a blank, add a date or a short note on page 1 | [Edit PDF](/edit-pdf) |
| Highlight, underline or comment | [Annotate PDF](/annotate-pdf) |
| Add your signature | [Sign PDF](/sign-pdf) |
| Change existing paragraphs | Convert with [PDF to Word](/pdf-to-word), edit, then convert back with [Word to PDF](/word-to-pdf) |
| Hide sensitive text | [Redact PDF](/redact-pdf), then follow the [safe redaction steps](/blog/redact-sensitive-pdf-information) |
| Stamp text across every page | [Add Watermark](/add-watermark) |

## If the text needs changing

For real rewriting, go through Word. Convert the PDF, edit it there and export a fresh PDF. The result depends on how complex the original is, so see [how to convert without losing formatting](/blog/convert-pdf-to-word-without-losing-formatting). If the PDF is a scan, run [OCR PDF](/ocr-pdf) first.

## Editing pages that are not first

Because additions go on page one, for later pages you can extract the page with [Extract Pages](/extract-pages), edit it, then rebuild the document with [Merge PDF](/merge-pdf) and [Reorder Pages](/reorder-pages).

## Good habits

- Work on a copy of the original.
- Keep text short and inside the margins.
- After editing, [Flatten PDF](/flatten-pdf) if you want the additions fixed into the page, and check the result.
- For a final version that must not be changed, add a password with [Protect PDF](/protect-pdf).

## Frequently Asked Questions

### Can I change the words that are already in the PDF?
Not with this tool. Convert to Word, edit, and convert back.

### Can I edit a scanned PDF?
Add text on top of it, or run OCR first if you need to work with the text.

### Are my edits permanent?
They are saved into the new file you download. Your original is unchanged.

### Can I add images?
The editor's tools cover text, shapes, highlights and notes. For photos and logos, place them in Word first and convert.
`,
    relatedTools: [
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Add text and images to PDFs"
          },
          {
                "name": "Annotate PDF",
                "path": "/annotate-pdf",
                "description": "Highlight and mark up PDFs"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert for full text editing"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Lock edits permanently"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add electronic signatures"
          }
    ],
  },
  {
    slug: "watermark-pdf-documents",
    title: "How to Add a Watermark to a PDF (Text, Opacity and Rotation)",
    metaTitle: "Add a Watermark to a PDF Free | PDF HUB 24",
    metaDescription: "Stamp DRAFT, CONFIDENTIAL or your name across every PDF page. Choose the text, opacity, size and angle, and learn what a watermark can and can't protect.",
    excerpt: "A watermark marks a document as draft, confidential or yours. Here is how to add a text watermark to every page and get the look right.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-01-22",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["watermark","pdf","confidential","draft"],
    content: `
Watermarks say something about a document at a glance: this is a draft, this is confidential, this belongs to a particular person. They are quick to add and worth knowing the limits of.

## What the tool adds

[Add Watermark](/add-watermark) places a **text** watermark in the centre of **every page**. You control:

- **The text** itself, such as DRAFT, CONFIDENTIAL or a name
- **Opacity**, from faint to strong (the default is light, at 30%)
- **Font size**, with a default of 48
- **Rotation**, with a default of a 45 degree diagonal

The text is grey and uses a standard font, so plain Latin letters and numbers work best. Non-Latin scripts may not display.

## Steps

1. Open [Add Watermark](/add-watermark) and upload the PDF (up to 50 MB).
2. Type your watermark text.
3. Adjust opacity, size and rotation.
4. Download the result and check a page with dense text and a page with an image.

## Getting the look right

- **Keep it readable.** If your page text is hard to read through the mark, lower the opacity.
- **Keep it short.** Long phrases run off the page at large sizes. One or two words at 48 is a good starting point.
- **Match size to the page.** Landscape and A3 pages can take a bigger mark; small pages need a smaller one.
- **Use a diagonal for drafts** and a horizontal (0 degrees) mark for a calmer, more formal look.

## What a watermark does not do

A watermark discourages casual reuse and labels a document's status. It doesn't stop someone copying the text or cropping the page. If you need to control who can open the file, add a password with [Protect PDF](/protect-pdf); our [password guide](/blog/protect-pdf-with-password) explains it. To hide information rather than label it, see [safe redaction](/blog/redact-sensitive-pdf-information).

## Common uses

- Marking contracts and proposals as DRAFT until signed
- Adding CONFIDENTIAL to internal reports
- Putting a name or reference on documents you distribute
- Labelling exam papers or sample pages

If you also need numbered pages, add them with [Add Page Numbers](/add-page-numbers) as a second step.

## Text that works well

Short, clear words read best at a diagonal: DRAFT, CONFIDENTIAL, SAMPLE, COPY, INTERNAL USE or a recipient's name for a tracked copy. Avoid long sentences, because the text is one centred line and can run off narrow pages. If you need a different label per recipient, make one copy for each and name the files clearly.

## The right order of steps

Do your edits first, watermark next, and protect last. Watermarking after a password is added isn't possible, and compressing at the end keeps the file small. In short: [Edit PDF](/edit-pdf), then [Add Watermark](/add-watermark), then [Protect PDF](/protect-pdf), then [Compress PDF](/compress-pdf) if the size matters.

## Frequently Asked Questions

### Can I use an image or logo?
The tool adds text. For a logo, place it in your source document before making the PDF.

### Can I watermark only some pages?
Not directly. Split the file, watermark the section, and merge it back.

### Can a watermark be removed?
A determined person may be able to remove it, so don't rely on it for security.

### Does it work on scanned PDFs?
Yes. The mark is placed over the page image.
`,
    relatedTools: [
          {
                "name": "Add Watermark",
                "path": "/add-watermark",
                "description": "Add text watermarks to PDFs"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Make watermarks permanent"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Add password protection"
          },
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Remove sensitive content first"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Optimize file size after watermarking"
          }
    ],
  },
  {
    slug: "pdf-to-excel-convert-tables",
    title: "How to Convert PDF Tables to Excel (and Check the Numbers)",
    metaTitle: "PDF to Excel: Convert Tables Accurately | PDF HUB 24",
    metaDescription: "Get tables out of a PDF and into a spreadsheet you can sort and calculate with. What converts well, what doesn't and how to verify totals afterwards.",
    excerpt: "Retyping a table from a PDF wastes time and invites errors. Conversion is faster, but only if you know what to check afterwards.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-01-25",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["pdf to excel","extract tables","spreadsheet","data extraction"],
    content: `
Bank statements, supplier price lists, reports from other departments: tables trapped in PDFs are a daily annoyance. You want them in a spreadsheet so you can sort, filter and add them up.

## Will your PDF convert cleanly?

Conversion works best when the PDF has real text and a simple grid.

- **Good candidates:** exported reports, system-generated statements, tables with clear rows and columns.
- **Harder cases:** tables with merged cells, several tables on one page, multi-line rows or decorative layouts.
- **Scanned PDFs:** no text exists yet. Run [OCR PDF](/ocr-pdf) first, then convert. Expect more clean-up.

To check, try selecting a number in the PDF. If you can highlight it, you have real text.

## How to convert

1. Open [PDF to Excel](/pdf-to-excel).
2. Upload your file (up to 50 MB).
3. Convert and download the spreadsheet.

If only some pages contain the table, use [Extract Pages](/extract-pages) to pull those pages out first. Smaller, focused files convert more predictably.

## Check the result before you trust it

This step matters more than the conversion. Spreadsheets feel authoritative, so a wrong number gets used.

1. **Compare totals.** Add up a column and compare with the total printed in the PDF.
2. **Look at the formats.** Numbers sometimes arrive as text, which stops formulas working. Look for left-aligned numbers, or a small green warning in Excel, and convert them to numbers.
3. **Check dates.** Day/month order can flip depending on your settings.
4. **Scan for split cells.** A single value broken over two cells, or two columns squashed into one, is the usual clean-up job.
5. **Spot-check rows** at the start, middle and end.

## Fix the common issues

- Use **Text to Columns** in Excel to split a merged column.
- Use **Find and Replace** to remove stray currency symbols or spaces so numbers convert.
- If the layout is too messy, try [Extract Text](/extract-text) and rebuild only the part you need.

If you need the whole document editable rather than only the tables, [PDF to Word](/pdf-to-word) may suit better. Our guide to [keeping formatting when converting to Word](/blog/convert-pdf-to-word-without-losing-formatting) covers that route.

## Frequently Asked Questions

### Can it handle several tables on one page?
Often, but the results vary. Splitting the PDF so each table has its own page usually helps.

### Why are my numbers left-aligned?
Excel is treating them as text. Convert them to numbers, or use Find and Replace to remove hidden spaces.

### Is it accurate enough for financial work?
Treat it as a fast first draft. Verify totals against the source before using the data for anything that matters.

### Can I convert a scanned bank statement?
Run OCR first and expect to proofread the figures.
`,
    relatedTools: [
          {
                "name": "PDF to Excel",
                "path": "/pdf-to-excel",
                "description": "Convert PDF tables to spreadsheets"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned PDFs searchable first"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Extract raw text from PDFs"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Alternative conversion for mixed content"
          },
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Extract specific pages before converting"
          }
    ],
  },
  {
    slug: "redact-sensitive-pdf-information",
    title: "How to Redact a PDF Safely (Black Boxes Are Not Enough)",
    metaTitle: "Redact a PDF Safely: Avoid Hidden Text Leaks | PDF HUB 24",
    metaDescription: "Covering text with a black box often leaves it readable underneath. Learn how to redact a PDF properly, and how to check that nothing can be copied out.",
    excerpt: "Many redaction failures happen because a black box only hides text visually. Here is a safe workflow that leaves nothing to copy, search or uncover.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-01",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Security",
    tags: ["redact pdf","remove sensitive info","privacy","data protection"],
    content: `
Redaction goes wrong in a predictable way: someone draws a black rectangle over a name, sends the PDF, and the recipient selects the text under the box and copies it. It has happened in court filings and government releases. The box looked final, but the text was still in the file.

## What proper redaction means

Real redaction removes the sensitive content itself, not just its appearance. If you can still select, search or copy the words after redacting, the job isn't done.

## How the Redact PDF tool works

[Redact PDF](/redact-pdf) lets you draw solid black boxes over the areas you want to hide. Those boxes are **drawn on top of the page**. On their own they do not delete the text underneath, so treat the tool as step one of a safe workflow, not the whole workflow.

## A safe workflow

1. **Work on a copy.** Keep your original untouched.
2. **Draw the boxes.** Open [Redact PDF](/redact-pdf), upload the file and cover every sensitive item: names, account numbers, addresses, signatures, ID numbers. Be generous with the size of each box.
3. **Download the redacted file.**
4. **Flatten it into images.** Convert the redacted PDF to images with [PDF to PNG](/pdf-to-png), then rebuild a PDF from those images with [PNG to PDF](/png-to-pdf). Now each page is only a picture with the black boxes baked in.
5. **Test the result.** Open the final PDF, press Ctrl+A or try to select text, and search for a word you redacted (Ctrl+F). Nothing sensitive should be found or copied.
6. **Optional: make it searchable again.** If people need to search the rest of the document, run [OCR PDF](/ocr-pdf) on the flattened file. The black-boxed areas are just black pixels, so the hidden words can't come back.

Redacting a multi-page document is slower this way, so plan for it and check every page. If you're working on one page of many, use [Extract Pages](/extract-pages) to isolate it, redact and flatten it, then [Merge PDF](/merge-pdf) it back into place.

## What to look for beyond the visible text

- **Metadata.** Author names and document titles can sit in the file properties. Check them and remove sensitive details.
- **Comments and annotations.** Remove them, or use [Flatten PDF](/flatten-pdf) so they can't be pulled apart from the page.
- **Repeats.** A name in the header, footer and body needs covering everywhere.
- **File names.** "Smith_settlement_final.pdf" gives away what redaction was meant to hide.

## When to be extra careful

Legal disclosures, medical records, HR files, data-protection requests and anything covered by regulation deserve a second reviewer and your organisation's approved process. Our tool can help you produce a flattened, image-based copy. It cannot promise legal compliance, so check the rules that apply to you.

## Frequently Asked Questions

### Is a black box the same as redaction?
No. A box hides text visually. Unless the text is removed or flattened into an image, it can often still be copied.

### How can I test a redacted PDF?
Try to select the covered area, copy and paste it into a text editor, and search for the hidden words. If anything appears, it isn't safe to share.

### Does converting to images reduce quality?
Slightly, depending on resolution, but it is a reasonable price for safety. Compress the result afterwards if it becomes large.

### Can redacted text be recovered after flattening to images?
The hidden words are gone from the file's text layer, and the covered pixels are black. Use solid, opaque black and never a semi-transparent shape.
`,
    relatedTools: [
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Black out sensitive info"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Add password protection"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Lock all document layers"
          },
          {
                "name": "Add Watermark",
                "path": "/add-watermark",
                "description": "Mark documents as redacted"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Verify redaction completeness"
          }
    ],
  },
  {
    slug: "how-to-flatten-pdf",
    title: "How to Flatten a PDF: Fix Form Fields and Annotations in Place",
    metaTitle: "Flatten a PDF Free: Lock Forms and Edits | PDF HUB 24",
    metaDescription: "Flattening turns editable form fields and markup into fixed page content. Learn when to flatten, how to do it and how to check nothing went missing.",
    excerpt: "Flattening makes a PDF look the same everywhere and stops accidental changes. It is useful, but you should always check the result before you send it.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-15",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Guides",
    tags: ["flatten pdf","forms","annotations","layers"],
    content: `
You filled in a form, added a few notes and now you want to send the PDF without anyone changing a field by accident, or seeing a different result in another viewer. That is what flattening is for.

## What flattening means

A PDF can hold two layers of information: the page itself, and interactive extras on top of it, such as fill-in fields, comments and stamps. Flattening merges the extras into the page so they become part of the static content. The document still looks the same, but it can no longer be edited as a form.

## What Flatten PDF does

[Flatten PDF](/flatten-pdf) rebuilds each page of your document into a new PDF at its original size. The result is a clean, non-interactive file.

Because it works this way, always check the output. Compare it with the original and confirm that:

- filled-in form values still appear
- comments and highlights you wanted to keep are visible
- signatures and stamps are where they were

Keep your original. If something you needed is missing, use the original as your working file and consider a different route, such as printing to PDF from your viewer.

## When to flatten

- **After filling in a form**, before sending it back.
- **After adding text, shapes or a signature**, so they can't be moved. See [signing a PDF](/blog/sign-pdf-electronically).
- **Before printing**, when a printer struggles with interactive fields.
- **For consistent display**, when the file looks different in another viewer.
- **Before archiving**, to freeze a final version.

## When not to flatten

- The recipient still needs to fill in the form.
- You want collaborators to add comments.
- You might need to correct a field later. Flatten a copy, not your only version.

## Flattening is not redaction

Flattening does not remove information. Hidden text underneath a black box is still there, and if you need to conceal it, follow the steps in our [redaction guide](/blog/redact-sensitive-pdf-information). Likewise, a flattened file can still be copied from, so use [Protect PDF](/protect-pdf) if access matters.

## After flattening

Compress the file if it is bulky with [Compress PDF](/compress-pdf), and add page numbers with [Add Page Numbers](/add-page-numbers) if the document will be printed.

## Frequently Asked Questions

### Can I reverse flattening?
Not in the finished file. Keep the unflattened original.

### Will the file size change?
It can go up or down depending on the content. Compress afterwards if needed.

### Does flattening remove passwords?
Flatten a file you can open. For protected files, unlock them first with [Unlock PDF](/unlock-pdf) if you are entitled to.

### Why is some markup missing after flattening?
Interactive elements are handled differently by different software. Check the result and use the original if anything is missing.
`,
    relatedTools: [
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Merge all layers into one"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce file size after flattening"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add signatures before flattening"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Edit content before flattening"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Password protect flattened documents"
          }
    ],
  },
  {
    slug: "crop-pdf-pages-guide",
    title: "How to Crop PDF Pages and Trim Margins",
    metaTitle: "Crop PDF Pages Free: Trim Margins Fast | PDF HUB 24",
    metaDescription: "Trim white space or scanner borders from every page of a PDF. Set each margin, learn what cropping really does to hidden content and fix common problems.",
    excerpt: "Cropping trims the visible area of every page. It's ideal for scanner borders and wide margins, with one important caveat about hidden content.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-18",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["crop pdf","margins","trim","scanned documents"],
    content: `
Scans often have dark borders, and exported documents sometimes have huge margins. Cropping tightens the page around the content, so it reads better on a small screen and prints with less waste.

## How the Crop PDF tool works

[Crop PDF](/crop-pdf) trims a set amount from the **top, right, bottom and left** edges. The same amounts are applied to **every page**, and the values are in points (72 points is one inch, or about 25 mm).

1. Open [Crop PDF](/crop-pdf) and upload your file (up to 50 MB).
2. Enter how much to remove from each edge.
3. Download the cropped file and check several pages.

Start with small numbers, around 20 to 40 points, and repeat if you need more. It is easier to trim a bit more than to work out a big number in one go.

## Get the numbers right

Because every page gets the same crop, choose values that suit the **widest** margin you need to keep. If page 1 has a header and page 10 has a wide table, look at both before you decide.

Pages with different sizes or offsets are trickier. If your file mixes sizes, first unify them with [Resize PDF](/resize-pdf), then crop.

## Cropping is not deleting

Cropping changes what part of the page is shown. The content outside the crop area is usually still stored in the file, so it can sometimes be recovered by someone with the right software. If anything outside the crop is sensitive, do not rely on cropping. Follow the steps in our [redaction guide](/blog/redact-sensitive-pdf-information) to produce a flattened copy.

## Good uses

- Removing black scanner edges and shadows
- Cutting a large blank margin so text fills the page on a phone
- Trimming a header or footer from every page
- Preparing pages for printing with less white space

## What to do afterwards

- **Straighten** sideways pages first with [Rotate PDF](/rotate-pdf); crop after.
- **Shrink** the file with [Compress PDF](/compress-pdf) if it's still large. Our guide to [compressing for email](/blog/how-to-compress-pdf-for-email) has practical targets.
- **Make scans searchable** with [OCR PDF](/ocr-pdf), which works better on tidy, cropped pages.
- **Set a standard page size** with [Resize PDF](/resize-pdf).

## Example: cleaning up a scanned contract

A scan often has a dark strip down one side and wide white space at the bottom. Try 30 points on the left and 40 points at the bottom, download the result and scroll through every page, not just the first. If the signature page has content close to the edge, reduce the numbers. Once it looks right, run [OCR PDF](/ocr-pdf) so the text can be searched, and compress the file if it will be emailed.

## Frequently Asked Questions

### Can I crop different amounts on different pages?
No. The same crop applies to every page. Split the file if you need different crops.

### What units do the margins use?
Points. 72 points equal one inch.

### Can I undo a crop?
Not in the downloaded file. Keep your original.

### Will cropping shrink the file size?
Not much. Cropping affects what is visible, not the amount of image data.
`,
    relatedTools: [
          {
                "name": "Crop PDF",
                "path": "/crop-pdf",
                "description": "Trim PDF page margins"
          },
          {
                "name": "Resize PDF",
                "path": "/resize-pdf",
                "description": "Change page dimensions"
          },
          {
                "name": "Delete Pages",
                "path": "/delete-pages",
                "description": "Remove unwanted pages"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned pages searchable"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce file size after cropping"
          }
    ],
  },
  {
    slug: "resize-pdf-to-a4",
    title: "How to Resize a PDF to A4, Letter, Legal or A3",
    metaTitle: "Resize PDF to A4 or Letter Free | PDF HUB 24",
    metaDescription: "Change a PDF's page size to A4, Letter, Legal or A3. Understand how pages are scaled and centred, and avoid stretched content or extra white space.",
    excerpt: "Sending a US Letter file to an A4 printer causes cut-off text and odd margins. Resizing fixes the page size properly, and here is how it treats your content.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-20",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["resize pdf","a4","letter","page size"],
    content: `
A document made for US Letter paper prints badly on A4, and the other way round. A quick resize gives every page a consistent size and stops text being clipped at the edge.

## What Resize PDF does

[Resize PDF](/resize-pdf) puts each page onto a new page of your chosen size. It offers the standard sizes:

| Size | Dimensions |
| --- | --- |
| A4 | 210 × 297 mm |
| Letter | 8.5 × 11 in |
| Legal | 8.5 × 14 in |
| A3 | 297 × 420 mm |

Your original page is **scaled to fit** the new one, keeping its proportions, and centred. Nothing is stretched or squashed.

## Steps

1. Open [Resize PDF](/resize-pdf) and upload the file (up to 50 MB).
2. Choose the target size.
3. Download the result and look at a few pages.

## What to expect

Paper sizes have different proportions, so a page can end up with extra white space at the top and bottom or at the sides. Moving from Letter to A4 usually adds a thin band of white space because A4 is a little taller and narrower. That is normal and doesn't hurt the content.

If you go from a small size to a large one, content is enlarged. From large to small, it is reduced, so check that small print is still readable.

## Different sizes in one file

Merged documents often mix sizes. Resize the finished file to one standard size so every page prints the same. Our [merge guide](/blog/merge-pdf-files-guide) explains the merge step.

## Tidy up afterwards

- **Trim extra white space** with [Crop PDF](/crop-pdf) if a page ended up with wide bands.
- **Add page numbers** with [Add Page Numbers](/add-page-numbers) once the size is settled, since the numbers are placed relative to the page edges.
- **Check the file size** and compress if needed with [Compress PDF](/compress-pdf).
- **Fix orientation** first if any page is sideways, using [Rotate PDF](/rotate-pdf).

## Printing tips

If you only want the printer to fit the page, the "fit to page" option in your print dialog does the same job for that print, without changing the file. Resizing the PDF itself makes sense when you are sending the file to someone else, submitting to a portal with a required size, or archiving.

## Frequently Asked Questions

### Will resizing distort my pages?
No. Pages are scaled evenly and centred, so proportions stay the same.

### Why is there white space at the edges?
The new page has different proportions from the old one. That is normal.

### Can I use a custom size?
The tool offers the standard sizes above.

### Does resizing affect quality?
Text and vector graphics stay sharp. Images are scaled with the page.
`,
    relatedTools: [
          {
                "name": "Resize PDF",
                "path": "/resize-pdf",
                "description": "Change PDF page dimensions"
          },
          {
                "name": "Crop PDF",
                "path": "/crop-pdf",
                "description": "Trim margins instead of resizing"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce file size after resizing"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine pages before resizing"
          },
          {
                "name": "Rotate PDF",
                "path": "/rotate-pdf",
                "description": "Fix page orientation before resizing"
          }
    ],
  },
  {
    slug: "compare-two-pdf-files",
    title: "How to Compare Two PDF Files and Find the Differences",
    metaTitle: "Compare Two PDFs Free: Find Text Changes | PDF HUB 24",
    metaDescription: "Find what changed between two PDF versions. See what the text comparison catches, what it misses, and how to handle scans, layouts and images.",
    excerpt: "Comparing contract versions by eye is slow and error-prone. A text comparison finds added and removed lines quickly, with a few limits you should know about.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-22",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Guides",
    tags: ["compare pdf","version control","contracts","differences"],
    content: `
Two versions of a report or contract arrive and you need to know what changed. Reading both side by side is slow, and the changes that matter are often small: a number, a date, a clause.

## What the tool compares

[Compare PDF](/compare-pdf) reads the text of both files and compares them **line by line**. It produces a report showing:

- how many lines are in each document
- how many lines the two share
- lines that appear **only in the first** document
- lines that appear **only in the second** document

The report lists up to 50 lines from each side, with a note when there are more.

## How to use it

1. Open [Compare PDF](/compare-pdf).
2. Upload the older file as Document 1 and the newer file as Document 2.
3. Run the comparison and read the report.
4. Open the two PDFs and check each flagged line in context.

## What it is good at

- Finding changed, added or removed wording
- Spotting a changed figure, date or name
- Getting a quick sense of how much a document changed

## What it cannot see

Knowing the limits is what makes the tool safe to use.

- **Layout and formatting changes.** Moved sections, new fonts or changed colours are not reported unless the words change.
- **Images.** A replaced logo or chart is invisible to a text comparison.
- **Line order.** Lines are matched by their content, so a paragraph moved elsewhere may look unchanged.
- **Repeated lines.** Identical lines are treated as one, so an extra copy of a line may not show.
- **Scanned PDFs.** Without text there is nothing to compare. Run [OCR PDF](/ocr-pdf) on each file first, and expect some noise from recognition errors.

## For contracts and other important documents

Use the report as a checklist, not as a final answer. Read the flagged lines, check numbers by eye, and have a person review anything legally or financially binding. If a comparison shows no differences, that means the extracted text matches, not that the documents are identical.

## Get cleaner results

- Compare files created the same way. A Word export against a scanned copy will produce a lot of noise.
- Remove cover pages or page numbers first if they differ, using [Delete Pages](/delete-pages).
- If you only need a section, use [Extract Pages](/extract-pages) to compare just those pages.
- Pull the raw text out with [Extract Text](/extract-text) if you prefer to use your own comparison software.

## Frequently Asked Questions

### Does it show differences visually on the page?
No. It creates a text report of the differences.

### Can it compare more than two files?
It compares two at a time.

### Will it catch a changed number?
Yes, if the line containing it changed. Confirm each number against the documents.

### Is it accurate for scanned files?
Only after OCR, and OCR errors will show up as differences.
`,
    relatedTools: [
          {
                "name": "Compare PDF",
                "path": "/compare-pdf",
                "description": "Find differences between PDFs"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Extract text for manual comparison"
          },
          {
                "name": "Annotate PDF",
                "path": "/annotate-pdf",
                "description": "Mark up review findings"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Sign after verifying changes"
          },
          {
                "name": "Flatten PDF",
                "path": "/flatten-pdf",
                "description": "Flatten before comparing for cleaner results"
          }
    ],
  },
  {
    slug: "html-to-pdf-conversion",
    title: "HTML to PDF: What the Tool Does and the Better Way to Save a Web Page",
    metaTitle: "HTML to PDF: Convert Text or Save a Page | PDF HUB 24",
    metaDescription: "Turn pasted HTML into a simple text PDF, and learn the better way to save a full web page with layout and images using your browser's Print to PDF.",
    excerpt: "There are two very different jobs hiding under \"HTML to PDF\". Here is which one our tool handles, and how to save a real web page with its layout intact.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-25",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["html to pdf","web page to pdf","save as pdf"],
    content: `
"Convert a web page to PDF" can mean two things. You might want a **faithful copy** of a page with its layout, images and fonts. Or you might just want the **text** of some HTML as a document. They need different tools, and it's worth picking the right one.

## What the HTML to PDF tool does

[HTML to PDF](/html-to-pdf) takes HTML code you paste in and turns it into a simple text PDF. To be clear about what that means:

- Tags, styles and scripts are removed and the **text content** is kept.
- The result is a **single A4 page** in a plain font.
- Long lines are cut short, and text that doesn't fit on the page is dropped.
- **Images, colours, tables, links and CSS layout are not reproduced.**

That makes it useful for quickly turning a short snippet, an email template or some copied HTML into a readable text document. It is not a page-perfect web page converter.

## To save a full web page, use your browser

For a faithful copy of a page with layout and images, your browser does a better job than any simple converter.

1. Open the page.
2. Press Ctrl+P (Cmd+P on Mac) to open the print dialog.
3. Choose **Save as PDF** as the destination.
4. Turn on "Background graphics" if you want colours and images.
5. Pick paper size, margins and orientation, then save.

Tips for a cleaner result:

- Use the browser's reader mode first to strip menus and adverts.
- Set the scale to fit width if content is cut off.
- Long pages may break awkwardly, so preview before saving.

## After you have the PDF

- Shrink a heavy page capture with [Compress PDF](/compress-pdf).
- Take out the pages you don't need with [Delete Pages](/delete-pages).
- Trim margins with [Crop PDF](/crop-pdf).
- Add page numbers with [Add Page Numbers](/add-page-numbers).
- Combine several saved pages into one file with [Merge PDF](/merge-pdf); see our [merge guide](/blog/merge-pdf-files-guide).

## Which approach should you use?

| Need | Best route |
| --- | --- |
| Faithful copy of a page for records or research | Browser Print, Save as PDF |
| Text of a short HTML snippet | [HTML to PDF](/html-to-pdf) |
| A styled invoice or report | Build it in a word processor, then export to PDF |

## Frequently Asked Questions

### Does HTML to PDF keep images and styling?
No. It keeps the text only, on a single page.

### Can I enter a web address instead of HTML?
The tool takes pasted HTML. To capture a live page, use your browser's Save as PDF.

### Why is my page cut off?
Long lines are truncated and there is only one page. For long content use the browser method.

### Are links clickable in the PDF?
Not in the tool's output. Browser-saved PDFs usually keep working links.
`,
    relatedTools: [
          {
                "name": "HTML to PDF",
                "path": "/html-to-pdf",
                "description": "Convert web pages to PDF"
          },
          {
                "name": "Word to PDF",
                "path": "/word-to-pdf",
                "description": "Convert Word documents"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce converted file size"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple converted pages"
          },
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Number pages after conversion"
          }
    ],
  },
  {
    slug: "extract-text-from-pdf",
    title: "How to Extract and Copy Text From a PDF",
    metaTitle: "Extract Text From a PDF Free: Copy or Save | PDF HUB 24",
    metaDescription: "Pull the text out of a PDF to copy, paste or save as a file. What works on normal PDFs, what to do with scans, and how to clean up messy line breaks.",
    excerpt: "Copying from a PDF often gives you broken lines and odd spacing. Extracting the text in one go is cleaner, and scanned files need one extra step.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-02-28",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["extract text","copy text","pdf to text"],
    content: `
Selecting text in a PDF and pasting it elsewhere is hit and miss. Lines break in the wrong places, columns get mixed and sometimes you can't select anything at all. Extracting the text of the whole document first makes it easier to clean up.

## How to extract text

1. Open [Extract Text](/extract-text).
2. Upload your PDF (up to 50 MB).
3. The text appears on screen. Use **Copy** to paste it somewhere else, or **Download** to save it as a text file.

## Does your PDF contain text?

Some PDFs have a real text layer, and some are just pictures of pages.

- **Test:** open the file and try to select a word, or press Ctrl+F and search for a word you can see.
- If you can select and search, extraction will work.
- If you can't, it is a scan. Run [OCR PDF](/ocr-pdf) first, then extract. Our [OCR guide](/blog/ocr-scanned-pdf-to-text) explains how to get accurate results.

If the tool returns nothing, this is almost always the reason.

## What to expect from the output

Extraction pulls the words, not the design. You will get the text in reading order as the PDF stores it, without fonts, colours or images.

- **Columns** may be read in an unexpected order, so check newspaper-style layouts.
- **Tables** turn into rows of text. For tables you'd rather keep as cells, use [PDF to Excel](/pdf-to-excel).
- **Headers, footers and page numbers** appear in the text on every page.
- **Hyphenated words** at line ends may stay broken.

## Clean it up quickly

1. Paste into a plain text editor or a document.
2. Use Find and Replace to remove repeated headers and page numbers.
3. Fix line breaks in the middle of sentences. In Word, replace paragraph marks with a space, then restore the ones you want.
4. Proofread numbers and names against the PDF.

## Other ways to get text out

- Need editable formatting? Convert to Word with [PDF to Word](/pdf-to-word), and read [how to keep formatting](/blog/convert-pdf-to-word-without-losing-formatting).
- Want a translation? [Translate PDF](/translate-pdf) works from the extracted text.
- Only need a few pages? Use [Extract Pages](/extract-pages) first so the output is smaller.

## Example: turning a report into notes

Extract the text, paste it into a document and delete the repeated header and page numbers with Find and Replace. Break it into sections by adding your own headings, then read it against the PDF once to catch anything that came out in the wrong order. For a long report, extract only the chapters you need so the text stays manageable.

## Frequently Asked Questions

### Why is the extracted text empty?
The PDF is probably a scan or contains only images. Run OCR first.

### Will it extract text from images inside a PDF?
No. Text in pictures needs OCR.

### Is the text formatted like the original?
No. It is plain text.

### Can I extract text from a password-protected PDF?
Remove the password first with [Unlock PDF](/unlock-pdf), if you have the right to.
`,
    relatedTools: [
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Pull text from any PDF"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Convert scanned pages to text"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Get formatted editable output"
          },
          {
                "name": "Extract Images",
                "path": "/extract-images",
                "description": "Pull images from PDFs"
          },
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove copy restrictions first"
          }
    ],
  },
  {
    slug: "best-free-pdf-tools-2026",
    title: "Best Free PDF Tools in 2026: What You Can Do Online Without Paying",
    metaTitle: "Best Free PDF Tools in 2026: Honest Guide | PDF HUB 24",
    metaDescription: "A practical guide to the PDF jobs you can do free online in 2026, which tool fits each, and the limits to check before uploading an important file.",
    excerpt: "Most people need a handful of PDF jobs done well. Here is which free tools cover them, what each one can't do, and how to choose without wasting time.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-01",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["free pdf tools","online pdf","comparison","2026"],
    content: `
There are hundreds of free PDF tools, and most people only need a few things: make a file smaller, join or split documents, convert to or from Word, sign, and password protect. This guide groups the common jobs, says which free tool suits each, and is upfront about limits. It is written by PDF HUB 24, so the tools we describe are our own. We say where they stop.

## How to choose a free PDF tool

Ask four questions before uploading anything.

1. **Does it do the exact job?** A tool that "edits" PDFs may only add text on top, not change existing words.
2. **What are the limits?** File size, number of files and pages processed are where free tools differ.
3. **What happens to my file?** Look for HTTPS, automatic deletion and a clear privacy policy. Don't upload highly sensitive documents unless your organisation allows it.
4. **Will the result be usable?** Always open the output and check it.

## Everyday jobs and the tool for each

**Make a PDF smaller.** [Compress PDF](/compress-pdf) has Low, Medium and High levels. Medium is the sensible default. See [how to compress a PDF for email](/blog/how-to-compress-pdf-for-email).

**Combine files.** [Merge PDF](/merge-pdf) joins several PDFs in the order you choose. Our [merge guide](/blog/merge-pdf-files-guide) covers ordering and page sizes.

**Take pages out.** [Split PDF](/split-pdf) extracts a page range, [Extract Pages](/extract-pages) picks individual pages and [Delete Pages](/delete-pages) removes the ones you don't want.

**Convert to Word or Excel.** [PDF to Word](/pdf-to-word) and [PDF to Excel](/pdf-to-excel) work best on PDFs with real text. Scans need [OCR PDF](/ocr-pdf) first.

**Turn images into a PDF.** [JPG to PDF](/jpg-to-pdf) and [PNG to PDF](/png-to-pdf) build a document from photos and screenshots.

**Sign a document.** [Sign PDF](/sign-pdf) adds a typed or drawn signature. That's a simple electronic signature, not a certificate-based one. See [signing a PDF electronically](/blog/sign-pdf-electronically).

**Protect or unlock.** [Protect PDF](/protect-pdf) adds an open password. [Unlock PDF](/unlock-pdf) removes one you already know.

**Mark up a document.** [Annotate PDF](/annotate-pdf), [Edit PDF](/edit-pdf) and [Add Watermark](/add-watermark) cover comments, added text and stamps.

## Where free online tools stop

Being honest about limits saves you a wasted afternoon.

- **Rewriting existing text** in a PDF needs a full desktop editor, or a trip through Word.
- **Certificate-based digital signatures** and formal audit trails need a specialised signing service.
- **Very large files or big batches** may exceed free limits. Ours is 50 MB per file.
- **Handwriting recognition** is generally not reliable in any OCR.
- **Sensitive redaction** needs care. Black boxes alone don't remove the text underneath. Follow our [safe redaction steps](/blog/redact-sensitive-pdf-information).

If your work regularly hits these limits, a desktop application may be the better investment. If you do a few jobs a month, a free online tool is usually enough.

## A short checklist before you upload

- Work on a copy of the file.
- Remove pages you don't need first.
- Check the result before sending it on.
- Delete downloaded copies you no longer need.

## Frequently Asked Questions

### Are free PDF tools safe?
Check for an encrypted connection, automatic deletion and a clear privacy policy. For highly confidential documents, follow your organisation's rules.

### Do I need to create an account?
Not for our tools.

### Why do some tools add watermarks to the output?
Some services add them to push you to a paid plan. Check the result before you rely on it.

### Which single tool should I learn first?
Compress and merge cover most everyday needs.
`,
    relatedTools: [
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple PDFs"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert to editable Word"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Add text and images"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned PDFs searchable"
          }
    ],
  },
  {
    slug: "pdf-accessibility-guide",
    title: "Making PDFs Accessible: What OCR and Text Tools Can and Can't Do",
    metaTitle: "PDF Accessibility Basics: OCR and Its Limits | PDF HUB 24",
    metaDescription: "What makes a PDF accessible to screen readers, where OCR and text extraction help, and what needs a dedicated accessibility checker or the original document.",
    excerpt: "A searchable PDF is not automatically an accessible one. Here is what accessibility really involves and how far simple tools take you.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-05",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["accessibility","ocr","screen readers","pdf"],
    content: `
Accessibility means people using assistive technology, such as screen readers, can read and navigate your document. It is a legal requirement for many organisations and simply good practice for everyone else. It is also easy to get half right.

## What an accessible PDF needs

- **Real text** rather than page images, so a screen reader has words to read
- **Tags** that mark headings, paragraphs, lists and tables, so the structure is clear
- **Correct reading order**, especially for columns and sidebars
- **Alternative text** for meaningful images and charts
- **A document language** and a meaningful title
- **Sufficient colour contrast**, and no information conveyed by colour alone
- **Usable forms and links**, with clear labels and descriptive link text

These come from the design of the document, not from a final conversion step.

## Where our tools help

**Turn a scan into text.** A scanned PDF is a picture, so a screen reader finds nothing to read. [OCR PDF](/ocr-pdf) adds a text layer so the words can be read and searched. The OCR tool currently works best with English. Read our [OCR guide](/blog/ocr-scanned-pdf-to-text) for accuracy tips, and proofread the result, since recognition errors get read aloud.

**Check what text exists.** [Extract Text](/extract-text) shows the text a PDF holds. If the output is empty or jumbled, a screen reader will struggle too. See [extracting text](/blog/extract-text-from-pdf).

**Tidy pages.** [Rotate PDF](/rotate-pdf) fixes orientation, [Crop PDF](/crop-pdf) removes clutter and [Delete Pages](/delete-pages) drops blank pages that confuse navigation.

## Where they don't reach

OCR gives you searchable text. It does **not** add tags, set the reading order, describe images or mark headings. Those need either the original document or a dedicated accessibility tool. So a scanned form put through OCR is searchable, but it isn't fully accessible.

## The best route: fix it at the source

The most reliable way to produce an accessible PDF is to build accessibility into the original document.

1. In Word or a similar editor, use real **heading styles**, lists and tables with header rows.
2. Add **alt text** to images and charts that carry meaning.
3. Set the document title and language.
4. Choose good colour contrast.
5. **Export to PDF** using the option that keeps tags and structure.
6. Test with a screen reader and an accessibility checker.

If you only have a PDF, use an accessibility checker to find problems, then fix them in the source file where possible.

## Quick self-test

- Can you select and search the text?
- Does tabbing or a screen reader read the page in a sensible order?
- Do images that matter have descriptions?
- Is there a title and language set?
- Could someone use the document with colour vision removed?

If you answer no to any of these, the document needs more than OCR.

## Frequently Asked Questions

### Does OCR make a PDF accessible?
It helps by creating text, but it doesn't add tags, reading order or image descriptions.

### Do I need special software?
For full compliance, yes: an accessibility checker and an editor that can set tags. The best fix is to start from an accessible source document.

### Are scanned documents accessible?
Not until they have real text, and even then they need structure.

### Which standards apply?
Common references are WCAG and the PDF/UA standard. Check the rules that apply to your organisation.
`,
    relatedTools: [
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Add searchable text to scans"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Get plain text from PDFs"
          },
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Number pages for navigation"
          },
          {
                "name": "Reorder Pages",
                "path": "/reorder-pages",
                "description": "Fix page sequence"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Optimize file size for access"
          }
    ],
  },
  {
    slug: "batch-convert-images-to-pdf",
    title: "How to Convert Many Images to PDF (JPG and PNG in Batches)",
    metaTitle: "Convert Multiple Images to PDF at Once | PDF HUB 24",
    metaDescription: "Turn a large set of photos or screenshots into one PDF. Learn the per-run limits, how to keep the order right and how to combine batches into a single file.",
    excerpt: "Ten photos are easy. A hundred take a plan. Here is how to work in batches without losing the page order or ending up with a giant file.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-08",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["batch convert","jpg to pdf","png to pdf","multiple images"],
    content: `
A stack of scanned forms, a photographed notebook or a folder of screenshots: when you have dozens of images, the job is really about organisation. The conversion itself is quick.

## The limits per run

- [JPG to PDF](/jpg-to-pdf) takes up to **10 images** at a time.
- [PNG to PDF](/png-to-pdf) takes up to **20 images** at a time.

For bigger sets, convert in groups and combine the resulting PDFs with [Merge PDF](/merge-pdf). The merge tool accepts up to 10 files per run, so very large projects can be merged in stages.

## A workflow that scales

1. **Name your images** with leading zeros so they sort correctly: 001, 002, 003 and so on. Without zeros, 10 sorts before 2.
2. **Sort by type.** Put JPGs together and PNGs together, since each converter handles its own format.
3. **Split into groups** of 10 (JPG) or 20 (PNG), keeping the order.
4. **Convert each group** and download the PDFs. Name them part-1, part-2 and so on.
5. **Merge the parts** in order.
6. **Check the result** by scrolling through the whole document once.

## Page size and file size

Each image becomes a page the size of the picture. A large phone photo therefore creates a large page, and the PDF can be much heavier than the original images. Two follow-ups solve this:

- Give every page a standard size with [Resize PDF](/resize-pdf), such as A4 or Letter.
- Shrink the finished file with [Compress PDF](/compress-pdf). See [how to compress for email](/blog/how-to-compress-pdf-for-email) for size targets.

## Fixing problems after conversion

- **A page is in the wrong place:** use [Reorder Pages](/reorder-pages).
- **A page is sideways:** rotate with [Rotate PDF](/rotate-pdf); note this turns every page, so use the single-page method in our [rotation guide](/blog/rotate-pdf-pages) if only one is wrong.
- **You want searchable text:** run [OCR PDF](/ocr-pdf).
- **You want numbered pages:** use [Add Page Numbers](/add-page-numbers).

## Good habits for big scanning jobs

Scan at 150 to 200 DPI for ordinary documents, keep the lighting even and file names consistent, and finish one batch completely before starting the next. Keep the original images until you have checked the final PDF.

## Example: 45 scanned pages

Name the files 001 to 045. Convert pages 001 to 010 with JPG to PDF, then 011 to 020, and so on, ending with a fifth PDF of five pages. Merge the five parts in order, resize to A4, compress, and add page numbers. Scroll through the final document before you delete the original images.

## Frequently Asked Questions

### Can I convert 100 images at once?
Not in one run. Convert in groups and merge the PDFs.

### Will the images stay in order?
They follow the order shown when you upload. Name files numerically to be safe.

### Can I mix JPG and PNG?
Convert each format with its own tool and merge the results.

### Why is my PDF so large?
Each page matches the image size. Resize and compress the finished file.
`,
    relatedTools: [
          {
                "name": "JPG to PDF",
                "path": "/jpg-to-pdf",
                "description": "Convert JPG photos to PDF"
          },
          {
                "name": "PNG to PDF",
                "path": "/png-to-pdf",
                "description": "Convert PNG images to PDF"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine converted PDFs"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned images searchable"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size after conversion"
          }
    ],
  },
  {
    slug: "unlock-pdf-remove-password",
    title: "How to Unlock a PDF and Remove Its Password",
    metaTitle: "Unlock a PDF: Remove a Password You Know | PDF HUB 24",
    metaDescription: "Remove the password from a PDF you own so you can open, print or edit it freely. What you need, the steps and what to do if you forgot the password.",
    excerpt: "If you know the password and are tired of typing it, unlocking creates a clean copy. Here is how, plus the honest answer on forgotten passwords.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-10",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["unlock pdf","remove password","pdf security","decrypt pdf"],
    content: `
A password on a PDF is useful until the file becomes one you open ten times a day. Removing it leaves you with a normal copy that opens straight away and works with every editing tool.

## Before you start

Only unlock files that are yours or that you have permission to change. This guide assumes you **know the password**. If you don't, unlocking isn't possible with this tool, and no reputable service can promise to guess it for you.

## How to remove the password

1. Open [Unlock PDF](/unlock-pdf).
2. Upload the protected PDF (up to 50 MB).
3. Enter the current password.
4. Download the unlocked copy and open it to confirm it no longer asks for a password.

Your original file stays protected, which is worth keeping as a backup.

## When unlocking helps

- **Editing.** Most editors and converters can't open a file they can't read. Unlock first, then use [Edit PDF](/edit-pdf), [PDF to Word](/pdf-to-word) or [Extract Text](/extract-text).
- **Merging and splitting.** Combine or cut a document with [Merge PDF](/merge-pdf) and [Split PDF](/split-pdf) after unlocking.
- **Long-term storage.** A password you lose in five years makes an archived file useless.

## If you forgot the password

Try the places it might be: an email from whoever sent the file, a password manager, or a note from when the document was created. Passwords are often based on something predictable that the sender mentioned, such as an account number, so re-read the message that came with the file. If none of that works, ask the person or organisation that created the PDF for a fresh copy. It is the only reliable route.

## After you unlock

If the document still needs protection when it is shared, add a new password with [Protect PDF](/protect-pdf). Our guide to [choosing a strong password](/blog/protect-pdf-with-password) explains how.

## Handling passwords sensibly

Unlocking creates a copy with no protection, so treat that copy with care. Don't email it to people who shouldn't see the contents, store it somewhere shared, or leave it in your downloads folder. Delete it when you have finished, or protect it again with a fresh password using [Protect PDF](/protect-pdf). When you send the original protected file to someone, share the password by a different route from the file itself.

## Frequently Asked Questions

### Can you remove a password I don't know?
No. You need to provide the current password.

### Is there a difference between an open password and a permissions password?
Yes. An open password stops the file opening. A permissions password restricts actions such as printing or copying. Unlock PDF is designed for files you can open with a password you have.

### Does unlocking change the content?
No. Only the protection is removed.

### Is it legal to unlock a PDF?
Removing the password from your own file is fine. Bypassing protection on someone else's document without permission can break the law or licence terms.
`,
    relatedTools: [
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove PDF password protection"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Add new password protection"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Edit unlocked documents"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert unlocked PDF to Word"
          },
          {
                "name": "Extract Text",
                "path": "/extract-text",
                "description": "Copy text from unlocked PDFs"
          }
    ],
  },
  {
    slug: "annotate-pdf-comments",
    title: "How to Annotate a PDF: Highlight, Underline and Add Notes",
    metaTitle: "Annotate PDF Free: Comments & Highlights | PDF HUB 24",
    metaDescription: "Mark up a PDF with highlights, underlines and sticky notes online. See what the annotate tool does, its limits, and how to share and lock your marked-up copy.",
    excerpt: "Highlights and notes turn a PDF into something you can study or review. Here is how to mark up a document and how to share it properly afterwards.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-05",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["annotate pdf","highlight","notes","review"],
    content: `
Students annotate readings, managers mark up reports and editors leave feedback. Marking up a PDF is a lot faster than printing it and writing on the paper.

## What Annotate PDF offers

[Annotate PDF](/annotate-pdf) lets you add:

- **Highlights** in a colour you choose (yellow by default)
- **Underlines**
- **Notes**, shown as small sticky-note markers with your comment

In the current version, the marks are applied to the **first page** of the document.

## Steps

1. Open [Annotate PDF](/annotate-pdf) and upload your file (up to 50 MB).
2. Pick a tool: highlight, underline or note.
3. Place it on the page and add text for notes.
4. Download the annotated copy and open it to check.

Your original file isn't changed, so you can always go back.

## Annotating pages other than the first

Because marks land on page one, mark up other pages by pulling them out, annotating, and rebuilding:

1. Use [Extract Pages](/extract-pages) to take the page you need.
2. Annotate it.
3. Put it back in order with [Merge PDF](/merge-pdf) and [Reorder Pages](/reorder-pages).

For a long document, it's often quicker to annotate in a viewer that supports every page and use this tool for quick marks.

## Habits that make annotations useful

- **Use colours consistently.** For instance, yellow for key points and a second colour for questions.
- **Keep notes short.** One clear sentence beats a paragraph.
- **Highlight less.** If half the page is yellow, nothing stands out.
- **Date your review** in a note so versions are easy to tell apart.

## Sharing and locking your marked-up copy

- Use [Flatten PDF](/flatten-pdf) to fix the marks into the page. Check afterwards that your highlights and notes are still visible, and keep the unflattened version.
- Add a password with [Protect PDF](/protect-pdf) if the document is confidential. See [our password guide](/blog/protect-pdf-with-password).
- Shrink the file with [Compress PDF](/compress-pdf) if you'll email it.
- To add text, shapes or your signature instead, see [Edit PDF](/edit-pdf) and [Sign PDF](/sign-pdf).

## Example: reviewing a one-page proposal

Highlight the price in one colour and the delivery date in another, add a note beside the terms that says what you want changed, download the copy and send it with a short message listing your three main points. The recipient can then see exactly what you mean without a long email.

## Frequently Asked Questions

### Can I annotate every page?
The tool marks the first page. Use the extract-and-merge approach for other pages.

### Can the other person edit or remove my highlights?
Marks become part of the file you send. Flatten it to reduce the chance of changes, and keep your original.

### Do notes show in every viewer?
Sticky-note markers appear in most viewers, but display can differ.

### Can I draw freehand?
Stick to the highlight, underline and note tools, which are the ones this guide covers.
`,
    relatedTools: [
          {
                "name": "Annotate PDF",
                "path": "/annotate-pdf",
                "description": "Add highlights, comments, and drawings"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Edit text and images in PDF"
          },
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Remove sensitive information"
          },
          {
                "name": "Compare PDFs",
                "path": "/compare-pdf",
                "description": "Find differences between versions"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned PDFs text-selectable"
          }
    ],
  },
  {
    slug: "translate-pdf-documents",
    title: "How to Translate a PDF: Quick Text Translation and Its Limits",
    metaTitle: "Translate a PDF Free: Any Language | PDF HUB 24",
    metaDescription: "Translate the text of a PDF into another language. What the tool produces, what it loses, how to handle scans and privacy, and when to use a human translator.",
    excerpt: "Machine translation is good for understanding a document, not for publishing it. Here is how the tool works, what is lost and how to get better results.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-08",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["translate pdf","machine translation","languages"],
    content: `
A letter in another language, a supplier's manual, a form from abroad: most of the time you just need to understand what it says. A quick machine translation of the text does that well enough.

## What Translate PDF does

[Translate PDF](/translate-pdf) works in three steps: it reads the text from your PDF, translates it with an online machine-translation service, and builds a **new, plain-text PDF** containing the translation.

That means:

- You choose the source and target language (about 50 are offered).
- The output is a simple text document on A4 pages.
- **The original layout, images, tables and formatting are not kept.**
- Scanned PDFs have no text to read, so run [OCR PDF](/ocr-pdf) first. Our [OCR guide](/blog/ocr-scanned-pdf-to-text) helps with accuracy. The OCR tool currently reads English best.

## Steps

1. Open [Translate PDF](/translate-pdf) and upload your file (up to 50 MB).
2. Select the language of the document and the language you want.
3. Translate and download the new PDF.
4. Read it, and keep the original beside it for reference.

## Privacy: read this first

The text of your document is sent to a third-party translation service to be translated. Don't use it for confidential or personal documents unless you are comfortable with that, and follow your organisation's policy. Where privacy matters, translate a redacted version or use a service your organisation has approved.

## Getting better results

- **Choose the source language yourself** rather than guessing.
- **Use clean text.** A PDF with real text translates better than an OCR scan full of errors.
- **Translate short sections** if a long document fails, using [Extract Pages](/extract-pages) or [Split PDF](/split-pdf) to cut it into parts. Free translation services can limit how much text they handle.
- **Expect awkward phrasing** with idioms, legal wording and technical terms.
- **Be careful with scripts.** The output uses a basic Latin-alphabet font, so it suits target languages written with Latin letters best. Check that non-Latin languages display correctly before relying on the result.

## When machine translation isn't enough

Contracts, medical records, immigration papers, and anything published or legally binding need a qualified human translator. Use the tool to understand the gist and to decide whether a professional translation is needed.

## If you want the words, not a PDF

To copy the source text and paste it into another translator, use [Extract Text](/extract-text). See [how to extract text](/blog/extract-text-from-pdf).

## Frequently Asked Questions

### Will the translated PDF look like the original?
No. It is plain text without the original layout or images.

### How accurate is it?
It is a machine translation. Good for understanding, not for legal or published use.

### Why did my scanned PDF fail?
There was no readable text. Run OCR first.

### Is my document private?
Its text is sent to an external translation service, so avoid confidential material.
`,
    relatedTools: [
          {
                "name": "Translate PDF",
                "path": "/translate-pdf",
                "description": "Translate PDF to 100+ languages"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Extract text from scanned PDFs first"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF size before translating"
          },
          {
                "name": "Unlock PDF",
                "path": "/unlock-pdf",
                "description": "Remove password before translating"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert to Word for manual editing"
          }
    ],
  },
  {
    slug: "repair-corrupted-pdf",
    title: "How to Repair a Corrupted PDF: What Works and What Doesn't",
    metaTitle: "Repair a Corrupted PDF: Fix Damaged Files | PDF HUB 24",
    metaDescription: "PDF won't open or shows an error? Try these steps in order, from a quick re-download to the Repair PDF tool, and learn when the data can't be recovered.",
    excerpt: "A PDF that won't open is often fixable, but not always. Try these checks in order, and know when it's time to ask for a fresh copy.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-10",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Guides",
    tags: ["repair pdf","corrupted pdf","fix pdf","pdf error"],
    content: `
"The file is damaged and could not be repaired." It always appears just when you need the document. Some PDFs are only slightly broken and open again after a rebuild. Others are missing data that can't be brought back.

## Start with the simple checks

Most "corrupted" files turn out to be incomplete or blocked by the viewer, so rule those out first.

1. **Re-download the file.** Interrupted downloads and email problems are the top cause.
2. **Check the file size.** A PDF that is 0 KB, or far smaller than expected, is incomplete.
3. **Try another viewer.** Open it in a browser, then in a different PDF app. Some viewers are stricter than others.
4. **Try another device.** This rules out a fault with your software.
5. **Ask for a fresh copy** if it came by email or a shared drive.

## Use the Repair PDF tool

If the file still won't open, [Repair PDF](/repair-pdf) loads it and saves a fresh copy with its structure rebuilt. That can fix minor problems such as a damaged internal index.

1. Open [Repair PDF](/repair-pdf) and upload the file (up to 50 MB).
2. Download the repaired copy.
3. Open it and go through every page.

If the tool reports an error, the damage is beyond what this kind of repair can fix.

## What repair can and can't do

**It can help when:**
- the file opens with errors but the pages exist
- the internal table that lists page locations is damaged
- a viewer is unusually strict about the structure

**It can't help when:**
- the file was cut off, so the content isn't there
- the pages are damaged or the data is overwritten
- the file is encrypted and you lack the password

Repair rebuilds structure; it cannot invent missing content.

## After a successful repair

- Check for missing pages, fonts or images.
- Save the repaired file under a new name.
- If it's large, run [Compress PDF](/compress-pdf).
- If it's password protected and you have the right to open it, use [Unlock PDF](/unlock-pdf) first.

## If repair fails

- Look for **older copies**: email attachments, cloud backups, download folders or another device.
- Ask the sender to **export it again** from the source document.
- Recreate what you can by exporting from the original Word or design file.
- As a last resort, if pages display in one viewer but not another, print those pages to a new PDF from the viewer that works.

## Prevent it next time

Wait for downloads to finish, don't rename files while they are being written, keep backups, and export from the source document again rather than repeatedly editing and saving the same PDF.

## Frequently Asked Questions

### Can every corrupted PDF be fixed?
No. If the data is missing, it can't be recovered by rebuilding.

### Will repair change the content?
It saves the document with a rebuilt structure. Check the result to confirm nothing is missing.

### Why does a PDF open in one app and not another?
Viewers differ in how strict they are with damaged files.

### My PDF asks for a password I don't have. Can repair help?
No. You need the password from the owner.
`,
    relatedTools: [
          {
                "name": "Repair PDF",
                "path": "/repair-pdf",
                "description": "Fix corrupted and damaged PDF files"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Extract content from damaged PDFs"
          },
          {
                "name": "PDF to JPG",
                "path": "/pdf-to-jpg",
                "description": "Render pages as images"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Optimize repaired PDFs"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Secure your repaired document"
          }
    ],
  },
  {
    slug: "pdf-to-powerpoint-guide",
    title: "How to Convert PDF to PowerPoint (and Get Slides You Can Edit)",
    metaTitle: "Convert PDF to PowerPoint Free (2026) | PDF HUB 24",
    metaDescription: "Turn a PDF into an editable PPTX. What converts well, why some slides come out messy, and a checklist for cleaning the result up in PowerPoint.",
    excerpt: "Converting a PDF back into slides saves retyping, but layout rarely survives perfectly. Here is what to expect and how to tidy the deck quickly.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-12",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["pdf to powerpoint","pptx","slides","convert"],
    content: `
You have a PDF of a presentation, a report you want to present or a handout you need to reuse, and no original file. Converting it to PowerPoint gets you most of the way there.

## How to convert

1. Open [PDF to PowerPoint](/pdf-to-ppt).
2. Upload your PDF (up to 50 MB).
3. Convert and download the .pptx file.
4. Open it in PowerPoint, Keynote or Google Slides and review every slide.

Conversion is handled by an online conversion service, so avoid uploading confidential material unless your organisation allows it.

## What converts well

- PDFs that were **exported from slides** to begin with
- Pages with plain text, simple headings and images
- Clean, uncluttered layouts

## What usually needs fixing

- **Fonts.** If a font isn't installed on your computer, PowerPoint replaces it and text can shift or wrap.
- **Text boxes.** Paragraphs may split into several boxes, or one line may be a box of its own.
- **Tables and charts.** These often arrive as pictures or loose shapes rather than editable objects.
- **Backgrounds and effects.** Gradients and shadows may flatten into images.
- **Scanned PDFs.** A scan is a picture, so slides may contain only page images. Run [OCR PDF](/ocr-pdf) first if you need text; our [OCR guide](/blog/ocr-scanned-pdf-to-text) explains how.

## A cleanup checklist

1. Set the slide size first (16:9 or 4:3) to match how you will present.
2. Apply one font family across the deck with the Replace Fonts option.
3. Delete stray empty text boxes using the Selection Pane.
4. Rebuild any table that came in as an image; editable tables beat pictures.
5. Check that images are sharp at full screen.
6. Run through the deck in presentation mode.

## Sometimes there is a better route

- If you only need the pictures, export each page with [PDF to JPG](/pdf-to-jpg) or [PDF to PNG](/pdf-to-png) and place them on slides.
- If you need the words, use [Extract Text](/extract-text) and paste them into a fresh deck.
- If the PDF is long, cut it down first with [Extract Pages](/extract-pages) so you convert only what you need.

## Example: reusing a report as a talk

Convert the report, then delete the slides you don't need and split dense pages into two slides. Pull the three most important figures onto their own slides and enlarge them. Add a short title slide and check that the slide size and fonts match your template before you present.

## Frequently Asked Questions

### Will the slides look exactly like the PDF?
Simple ones come close. Complex designs need some manual adjustment.

### Are the results editable?
Text usually is. Charts and complex graphics may come across as images.

### Can I convert a scanned PDF?
You'll get page images unless you run OCR first, and even then expect cleanup.

### Is my file private?
It is processed by an online conversion service. Avoid confidential documents unless your policy permits it.
`,
    relatedTools: [
          {
                "name": "PDF to PowerPoint",
                "path": "/pdf-to-ppt",
                "description": "Convert PDF to editable PPTX"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert PDF to editable DOCX"
          },
          {
                "name": "PDF to Excel",
                "path": "/pdf-to-excel",
                "description": "Extract tables from PDF"
          },
          {
                "name": "OCR PDF",
                "path": "/ocr-pdf",
                "description": "Make scanned PDFs text-selectable"
          },
          {
                "name": "Extract Pages",
                "path": "/extract-pages",
                "description": "Extract specific slides before converting"
          }
    ],
  },
  {
    slug: "jpg-to-pdf-guide",
    title: "How to Convert JPG to PDF (Page Size, Quality and File Size)",
    metaTitle: "Convert JPG to PDF Free: Quality & Size Tips | PDF HUB 24",
    metaDescription: "Convert one or several JPG photos to PDF. What page size you get, why the file may grow, and how to fix both so the PDF prints and emails properly.",
    excerpt: "Converting is one click. The surprises come after: page size, file size and order. Here is what the JPG to PDF tool does and how to tidy the result.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-15",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["jpg to pdf","photo to pdf","image conversion"],
    content: `
Applications, insurance claims and school forms often ask for a PDF, and what you have is a photo. Converting takes seconds. Knowing how the tool builds the PDF lets you avoid the common annoyances.

## How the JPG to PDF tool works

[JPG to PDF](/jpg-to-pdf) accepts up to **10 images** and puts each one on its own page, in the order you upload them. Every page is sized to match its image, with no margins added.

## Steps

1. Open [JPG to PDF](/jpg-to-pdf).
2. Upload your photos and check the order.
3. Convert and download the PDF.
4. Scroll through it to confirm the order and orientation.

## Two things to check afterwards

**Page size.** Because each page matches its image, a 12-megapixel phone photo becomes a very large page. It shows fine on screen but prints scaled down, and sizes may differ page to page. To give every page a standard size, run the PDF through [Resize PDF](/resize-pdf) and choose A4 or Letter.

**File size.** The converted file can be larger than the original photos, because images are re-encoded when they go into the PDF. If the result is too big for email or an upload portal, compress it with [Compress PDF](/compress-pdf). Our [email compression guide](/blog/how-to-compress-pdf-for-email) explains the limits, and if the limit is tiny see [compressing under 100KB](/blog/compress-pdf-under-100kb).

## Get a better source photo

Most quality problems start with the picture.

- Shoot in even, bright light with no shadow across the page.
- Hold the phone parallel to the paper.
- Fill the frame, and crop away the table.
- Use your phone's document scanning mode if it has one.

## More than 10 photos?

Convert in groups of ten and combine them with [Merge PDF](/merge-pdf). The [batch conversion guide](/blog/batch-convert-images-to-pdf) has a full workflow.

## Need text you can search?

A photo has no text, so the PDF won't either. Run [OCR PDF](/ocr-pdf) if you need to search or copy from it.

## Example: a single-page application form

Photograph the form flat and in daylight, convert it with JPG to PDF, resize the result to A4, and compress it if the portal has a size limit. Open the final PDF on your phone and zoom in on the signature and numbers to check they are readable before you upload.

## Frequently Asked Questions

### Does the PDF reduce photo quality?
Image quality is preserved. File size, not sharpness, is the usual issue.

### Can I choose A4 when converting?
Pages take the image's size. Use Resize PDF afterwards to set A4 or Letter.

### Can I reorder the photos?
Check the order before converting, or fix it afterwards with [Reorder Pages](/reorder-pages).

### Does it work with PNG files?
Use [PNG to PDF](/png-to-pdf) for those.
`,
    relatedTools: [
          {
                "name": "JPG to PDF",
                "path": "/jpg-to-pdf",
                "description": "Convert JPG images to PDF"
          },
          {
                "name": "PNG to PDF",
                "path": "/png-to-pdf",
                "description": "Convert PNG images to PDF"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple PDFs into one"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Number pages in your PDF"
          }
    ],
  },
  {
    slug: "compress-images-online",
    title: "How to Compress Images Without Visible Quality Loss",
    metaTitle: "Compress Images Online: Smaller, Same Look | PDF HUB 24",
    metaDescription: "Shrink JPG, PNG and WebP images for email and websites. Pick the right quality setting, know when to resize first and check the result before you use it.",
    excerpt: "Most images are far larger than they need to be. Here is how to cut the size dramatically while keeping them looking the same on screen.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-18",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["compress images","jpg","png","webp","file size"],
    content: `
A phone photo can weigh 5 MB or more, which is far too heavy for an email signature, a web page or an upload form. The good news is that you can usually cut a lot without anyone noticing.

## How the image compressor works

[Compress Image](/image-compressor) processes one image at a time and keeps its format: JPG stays JPG, PNG stays PNG and WebP stays WebP. You set a **quality level** from 10 to 100, with a default of 80.

1. Upload your image (up to 50 MB).
2. Choose a quality. Start at 80.
3. Download the result and compare it with the original at full size.

If the result still looks good, try a lower number and repeat from your original. If you see blockiness or blur, go back up.

## Resize first, then compress

Dimensions matter more than quality. A 4000-pixel-wide photo shown in a 800-pixel space carries five times more pixels than anyone can see. Use [Resize Image](/resize-image) to bring it down to the size you need, then compress. This combination usually saves far more than compression alone.

## Choose the right format

| Use | Format |
| --- | --- |
| Photographs | JPG or WebP |
| Screenshots, logos, text | PNG |
| Web images where supported | WebP |

Change format with [Convert Image](/convert-image) if the current one is a poor fit, such as a photo saved as PNG.

## Sensible settings

- **Web and email:** quality 70 to 80 and a width of 1200 to 1600 pixels or less
- **Thumbnails:** quality 60 to 70 at a small size
- **Documents and sharing:** quality 80 to 90
- **Screenshots:** keep PNG and expect smaller savings

## Check before you use it

Zoom in on faces, text and fine lines, where compression shows first. Keep the original safely, since re-compressing an already compressed image lowers quality further.

## When the images are going into a PDF

If you are putting photos into a document, [JPG to PDF](/jpg-to-pdf) builds the PDF and [Compress PDF](/compress-pdf) reduces it afterwards. See [how to compress a PDF for email](/blog/how-to-compress-pdf-for-email) for size targets.

## Example: preparing photos for a website

Take a 4000 by 3000 pixel photo, resize it to 1600 pixels wide, then compress the JPG at quality 75. Compare the two at full size, and if faces and text still look clean, use it. Repeat the same settings for the rest of the set so the page looks consistent, and keep the originals in a separate folder.

## Frequently Asked Questions

### Will compression make the image blurry?
Not at moderate settings. Quality below about 60 starts to show artefacts.

### Can I compress several images at once?
The tool handles one image per run.

### Does it change the image dimensions?
No. Use Resize Image to change the size.

### Which quality is best?
80 is a good default. Adjust after checking the result.
`,
    relatedTools: [
          {
                "name": "Compress Image",
                "path": "/image-compressor",
                "description": "Reduce image file size"
          },
          {
                "name": "Resize Image",
                "path": "/resize-image",
                "description": "Change image dimensions"
          },
          {
                "name": "Convert Image",
                "path": "/convert-image",
                "description": "Convert between image formats"
          },
          {
                "name": "JPG to PDF",
                "path": "/jpg-to-pdf",
                "description": "Convert compressed images to PDF"
          }
    ],
  },
  {
    slug: "reorder-pdf-pages",
    title: "How to Reorder PDF Pages: Rearrange, Move and Organise",
    metaTitle: "Reorder PDF Pages Free: Rearrange Fast | PDF HUB 24",
    metaDescription: "Put PDF pages in the right order without recreating the file. How the tool works, tips for long documents and what to use for removing or extracting pages.",
    excerpt: "Pages in the wrong order after a merge or a scan are easy to fix. Here is how to rearrange them and check nothing got lost.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-20",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["reorder pdf","rearrange pages","organise pdf"],
    content: `
Scanning in the wrong order, merging files out of sequence or adding a cover page at the end are all common. Rearranging the pages afterwards is much quicker than starting again.

## How Reorder Pages works

[Reorder Pages](/reorder-pages) lets you set a new order for the pages of your document. The tool builds the new PDF from a complete list, so **every page must be included** in the new order. You are rearranging, not removing.

1. Open [Reorder Pages](/reorder-pages) and upload your file (up to 50 MB).
2. Set the new page order.
3. Apply it and download the new PDF.
4. Scroll through the result to confirm every page is in the right place.

## Plan before you move anything

For anything longer than a few pages, write down the target order first. For example, if a 12-page file needs the cover from page 12 at the front, the new order is 12, 1, 2, 3 and so on to 11. It is easy to lose track when you move several pages, and a written list avoids mistakes.

## Related jobs and the right tool

| You want to... | Use |
| --- | --- |
| Remove pages | [Delete Pages](/delete-pages) |
| Keep only some pages | [Extract Pages](/extract-pages) |
| Cut into sections | [Split PDF](/split-pdf) |
| Join documents in order | [Merge PDF](/merge-pdf) |
| Fix a sideways page | [Rotate PDF](/rotate-pdf) |

If you have several documents that need to be in a set order, arrange them before merging; the [merge guide](/blog/merge-pdf-files-guide) shows how.

## Do the numbering last

Page numbers are drawn onto each page, so add them after you finish reordering. If you number first and then rearrange, the numbers travel with the pages and end up out of sequence. When the order is final, use [Add Page Numbers](/add-page-numbers).

## Checking your work

- Compare the first and last pages with what you expected.
- Look at page counts before and after; they should match.
- Check that any cross-references such as "see page 5" still make sense.
- Keep the original until you have checked the new file.

## Example: moving a cover page to the front

A scanned file arrives with the cover as page 8 of 8. Set the new order to 8, 1, 2, 3, 4, 5, 6, 7, apply it, and check that the cover now opens the document and nothing else moved. If you also need to remove a blank page, delete it first and then set the order for the remaining pages.

## Frequently Asked Questions

### Do I have to list every page?
Yes. The new order must include all pages exactly once.

### Can I reorder and delete in one step?
Do them separately: delete first with Delete Pages, then reorder.

### Will reordering change quality?
No. The pages are moved, not altered.

### Do bookmarks and links still work?
Page-to-page links may point to the wrong place after a big reorder, so check them.
`,
    relatedTools: [
          {
                "name": "Reorder Pages",
                "path": "/reorder-pages",
                "description": "Rearrange PDF pages by drag and drop"
          },
          {
                "name": "Delete Pages",
                "path": "/delete-pages",
                "description": "Remove unwanted pages"
          },
          {
                "name": "Extract Pages",
                "path": "/extract-pages",
                "description": "Pull out specific pages"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine multiple PDF files"
          },
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Split PDF into separate files"
          }
    ],
  },
  {
    slug: "convert-pdf-to-png",
    title: "How to Convert PDF to PNG (One Image Per Page)",
    metaTitle: "Convert PDF to PNG Free: High Quality | PDF HUB 24",
    metaDescription: "Turn each page of a PDF into a PNG image. What resolution you get, how multiple pages arrive, and when JPG or a different route is the better choice.",
    excerpt: "PNG keeps text and line art sharp, which makes it the right choice for slides, diagrams and screenshots. Here is what you get and how to use it.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-25",
    modifiedDate: "2026-09-19",
    readTime: "4 min read",
    category: "Tutorials",
    tags: ["pdf to png","pdf to image","convert pdf"],
    content: `
Sometimes you need a page as a picture: to drop into a slide, post online, insert in a document or make a text-free copy. PNG is lossless, so text and diagrams stay crisp.

## How PDF to PNG works

[PDF to PNG](/pdf-to-png) converts every page of your PDF into a PNG image at **150 DPI**.

- A **single-page** PDF gives you one PNG.
- A **multi-page** PDF gives you a ZIP file with one image per page, named page-1, page-2 and so on.

Steps:

1. Open [PDF to PNG](/pdf-to-png) and upload your file (up to 50 MB).
2. Convert and download the PNG or ZIP.
3. Open a few images to check sharpness and page order.

If you only need one or two pages, cut them out first with [Extract Pages](/extract-pages) or [Split PDF](/split-pdf), so you don't get a ZIP full of images you won't use.

## PNG or JPG?

| Choose PNG for | Choose JPG for |
| --- | --- |
| Text, tables and diagrams | Photographs |
| Slides and screenshots | Smaller file sizes |
| Sharp edges and flat colours | Email and web where size matters |

If file size matters more than crispness, use [PDF to JPG](/pdf-to-jpg).

## Resolution: what 150 DPI means

At 150 DPI an A4 page is roughly 1240 by 1754 pixels. That is comfortable on screen and fine for slides, but modest for large prints. If you need a very high resolution image for print work, a dedicated design tool will give you more control.

## Useful follow-ups

- **Redaction:** converting pages to images is the last step of our [safe redaction workflow](/blog/redact-sensitive-pdf-information). Rebuild a PDF from the images with [PNG to PDF](/png-to-pdf).
- **Reduce size:** PNG files of full pages can be large. See our [image compression guide](/blog/compress-images-online), or convert to JPG instead.
- **Editing text:** images aren't editable. If you need the words, use [Extract Text](/extract-text) or [OCR PDF](/ocr-pdf).

## Example: putting a page into a presentation

Extract the page you want, convert it to PNG, and insert the image into your slide. Crop it in the slide software if you only need part of the page. If the text is too small to read on screen, convert at a page that has larger type, or copy the text with Extract Text and rebuild that part in the slide.

## Frequently Asked Questions

### Can I choose the resolution?
The tool uses 150 DPI.

### Why did I get a ZIP file?
The PDF has more than one page, so each page is delivered as its own PNG inside the ZIP.

### Will the images have transparent backgrounds?
Pages normally have a white background. Don't expect transparency.

### Is the text still searchable?
No. The output is an image.
`,
    relatedTools: [
          {
                "name": "PDF to PNG",
                "path": "/pdf-to-png",
                "description": "Convert PDF pages to PNG images"
          },
          {
                "name": "PDF to JPG",
                "path": "/pdf-to-jpg",
                "description": "Convert PDF to JPEG images"
          },
          {
                "name": "Compress Image",
                "path": "/image-compressor",
                "description": "Reduce PNG file size"
          },
          {
                "name": "Resize Image",
                "path": "/resize-image",
                "description": "Scale images to specific dimensions"
          },
          {
                "name": "Extract Pages",
                "path": "/extract-pages",
                "description": "Extract specific pages before converting"
          }
    ],
  },
  {
    slug: "excel-to-pdf",
    title: "How to Convert Excel to PDF (What the Tool Keeps and What to Use Instead)",
    metaTitle: "Convert Excel to PDF Free: Keep Layout | PDF HUB 24",
    metaDescription: "Convert the first sheet of a spreadsheet into a simple PDF table. What it keeps, what it drops, and how to export a polished PDF from Excel itself.",
    excerpt: "For a fast, plain PDF of a sheet, our tool works. For a polished report with formatting, use Excel's own export. Here is how to tell which you need.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-03-28",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Tutorials",
    tags: ["excel to pdf","spreadsheet","xlsx","export pdf"],
    content: `
Spreadsheets and PDFs solve different problems. A PDF is for sharing a fixed view. Before converting, decide whether you need a quick plain version or a formatted report.

## What the Excel to PDF tool does

[Excel to PDF](/excel-to-pdf) reads your workbook and prints the **first worksheet** as a table on landscape A4 pages.

What you get:

- The **values** in each cell, in a grid, with the header row in bold
- Extra pages as needed when rows run on
- Fast, no-frills output

What you don't get:

- Cell colours, fonts, borders and number formatting
- Other sheets in the workbook
- Charts and images
- Text wrapping, since long cell values are shortened with two dots
- Formulas (only the calculated values appear)

It is best for simple tables such as lists, rosters and price sheets that fit across a page.

## Steps

1. Open [Excel to PDF](/excel-to-pdf) and upload your workbook (up to 50 MB).
2. Convert and download the PDF.
3. Check that no important cell text is cut off.

If you have several sheets, make the one you want the first sheet, or save each as a separate workbook.

## When to export from Excel instead

For anything client-facing, use Excel's own export, which respects your layout:

1. In Excel, set the print area and check **Page Layout** for orientation and scaling.
2. Choose "Fit all columns on one page" to stop columns splitting.
3. Use **File, Save As or Export, PDF** and pick what to include.

This keeps formatting, charts and wrapped text intact.

## Prepare your sheet first

- Put the header row at the top.
- Keep the table to one sheet with no blank rows.
- Keep column contents short. Shorten labels that would be cut.
- Remember that columns get equal widths, so a very wide table may look cramped.

## After converting

- Add page numbers with [Add Page Numbers](/add-page-numbers).
- Merge with other reports using [Merge PDF](/merge-pdf).
- Protect confidential figures with [Protect PDF](/protect-pdf).
- Going the other way? Read [how to convert PDF tables to Excel](/blog/pdf-to-excel-convert-tables).

## Example: a class roster

A roster with a name, class and contact number per row suits the tool well. Put the header row first, keep names and numbers short, convert, and check the last column to make sure nothing was shortened. Add page numbers and it is ready to print.

## Frequently Asked Questions

### Does it convert all my sheets?
Only the first worksheet.

### Will my colours and fonts appear?
No. The output is a plain black-on-white table.

### Why are some cells shortened?
Columns have equal width, so long values are cut with two dots. Shorten the text or export from Excel.

### Are formulas included?
The PDF shows the calculated values, not the formulas.
`,
    relatedTools: [
          {
                "name": "Excel to PDF",
                "path": "/excel-to-pdf",
                "description": "Convert Excel spreadsheets to PDF"
          },
          {
                "name": "PDF to Excel",
                "path": "/pdf-to-excel",
                "description": "Extract PDF tables to spreadsheet"
          },
          {
                "name": "Word to PDF",
                "path": "/word-to-pdf",
                "description": "Convert Word documents to PDF"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce converted PDF file size"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Secure the converted PDF"
          }
    ],
  },
  {
    slug: "compress-pdf-under-100kb",
    title: "How to Compress a PDF Under 100KB for Strict Upload Limits",
    metaTitle: "Compress PDF Under 100KB: What Actually Works | PDF HUB 24",
    metaDescription: "Portal rejecting your PDF at 100KB? Learn what makes files big, which tricks shrink them most and when to split or rescan instead. Free tools, no signup.",
    excerpt: "Some application portals still cap uploads at 100KB. Whether you can get there depends on the content, so here is a realistic plan.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-06-01",
    modifiedDate: "2026-09-19",
    readTime: "5 min read",
    category: "Guides",
    tags: ["compress pdf","file size","upload limit","100kb"],
    content: `
Job portals, exam registrations and government forms sometimes limit uploads to 100KB or 200KB. A typical scanned page is several megabytes, so the gap is big. It can be closed, but not always with a single click, and it helps to be realistic about what is possible.

## First, how much room do you have?

Check the current size and the page count. Roughly speaking, you have a budget of 100KB divided by the number of pages.

- **A one-page text document** from Word or Google Docs is usually already tiny and compresses easily.
- **A one-page scan** can often reach 100KB with strong compression and a lower-quality scan.
- **A 10-page scan** is a different problem: that leaves about 10KB per page, which is very hard without making the text hard to read.

## Step 1: compress at the highest level

Open [Compress PDF](/compress-pdf), upload the file and choose **High**. Download it and check the size. For many single-page documents this is enough. Always open the result and confirm the text is still readable at normal zoom.

## Step 2: shrink what you feed in

If it is still too big, the image data is the problem, so fix it at the source:

- Rescan at **150 DPI** or lower instead of 300 or 600.
- Choose **black and white** for text documents; colour and greyscale cost far more space.
- Crop out borders and desk with [Crop PDF](/crop-pdf).
- Try [Grayscale PDF](/grayscale-pdf) if you can't rescan.

## Step 3: reduce the page count

If the portal only needs certain pages, [Extract Pages](/extract-pages) or [Delete Pages](/delete-pages) removes the rest. Fewer pages means more space for each.

## Step 4: split if the portal allows several files

Some portals accept multiple uploads. If so, cut the document into parts with [Split PDF](/split-pdf) and compress each part. Check the portal instructions first so you don't break its rules.

## If nothing gets you there

Sometimes a file simply cannot be made that small without hurting readability. Options in that case: ask the portal's help desk whether they accept a larger file or an alternative format, or recreate the document as a text PDF (type it up, then export from your word processor), which is dramatically smaller than a scan.

For less demanding limits, our guide to [compressing a PDF for email](/blog/how-to-compress-pdf-for-email) covers the usual 10 to 25 MB range.

## Frequently Asked Questions

### Will a 100KB PDF be readable?
For text documents at a sensible scan resolution, yes. Fine print, photos and stamps may look softer, so check before uploading.

### Why won't my 20-page scan get under 100KB?
There isn't enough space per page. Reduce the page count, split the file or ask whether a larger limit is acceptable.

### Is it better to compress or rescan?
Rescanning at lower resolution in black and white often gives the biggest saving.

### Should I compress before or after merging?
After. Merge first, then compress the final file once.
`,
    relatedTools: [
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDF files"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert PDF to editable Word"
          }
    ],
  },
  {
    slug: "free-adobe-acrobat-alternative",
    title: "Free Adobe Acrobat Alternative: What You Can Do Without Paying",
    metaTitle: "Free Adobe Acrobat Alternative Online | PDF HUB 24",
    metaDescription: "Compare what Acrobat does with what free online PDF tools cover: compress, merge, convert, sign and more, plus where Acrobat still wins.",
    excerpt: "Most people use a handful of PDF features. See which ones you can do for free online, and the few jobs where Acrobat is still the better choice.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-06-01",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["adobe acrobat","free pdf tools","pdf editor","alternative"],
    content: `
Acrobat is a powerful desktop application, and most people only use a small slice of it. If your PDF needs are occasional, a free online toolkit may be all you need. This is written by PDF HUB 24, so we'll be direct about where free tools stop.

## Jobs a free online tool handles well

| Job | Tool |
| --- | --- |
| Make a PDF smaller | [Compress PDF](/compress-pdf) |
| Combine PDFs | [Merge PDF](/merge-pdf) |
| Take pages out or split | [Split PDF](/split-pdf), [Delete Pages](/delete-pages) |
| Convert to Word or Excel | [PDF to Word](/pdf-to-word), [PDF to Excel](/pdf-to-excel) |
| Images to PDF | [JPG to PDF](/jpg-to-pdf) |
| Add a simple signature | [Sign PDF](/sign-pdf) |
| Password protect or unlock | [Protect PDF](/protect-pdf), [Unlock PDF](/unlock-pdf) |
| Rotate, crop, resize pages | [Rotate PDF](/rotate-pdf), [Crop PDF](/crop-pdf), [Resize PDF](/resize-pdf) |
| Page numbers and watermarks | [Add Page Numbers](/add-page-numbers), [Add Watermark](/add-watermark) |
| Make scans searchable | [OCR PDF](/ocr-pdf) |

## Where Acrobat and other desktop editors still win

- **Editing existing text.** Our editor adds text, shapes and highlights on top of the page. Rewriting paragraphs in place needs a desktop editor, or a round trip through Word.
- **Certificate-based digital signatures.** Sign PDF places a simple electronic signature. Formal signing with certificates and audit trails needs a specialist service.
- **True redaction.** Our redaction tool draws boxes and needs a follow-up step to be safe; see [redacting safely](/blog/redact-sensitive-pdf-information). Desktop editors offer built-in redaction that removes content.
- **Accessibility tagging.** Making a PDF fully accessible needs tag editing tools. Our [accessibility guide](/blog/pdf-accessibility-guide) explains the difference.
- **Forms authoring, preflight and large batch jobs.** These are professional features better served by desktop software.
- **Offline work.** Online tools need a connection.

## When a free tool is enough

If you edit a PDF a few times a month, mostly to combine, compress, convert or sign, a free online set is efficient. There's nothing to install and no subscription to manage.

## When to pay for desktop software

- You regularly rewrite text inside PDFs.
- You handle regulated or legally sensitive documents at volume.
- You need formal digital signatures or redaction with compliance features.
- You work with very large files or need to work offline.

## How to try before you decide

Do your next three PDF jobs with a free tool. If you get what you need, you've saved money. If you keep hitting the same limit, you have a clear reason to buy software for that one feature.

## Frequently Asked Questions

### Is a free tool as good as Acrobat?
For common jobs, yes. For advanced editing, redaction, formal signing and accessibility work, desktop software goes further.

### Are free online PDF tools safe?
Look for encrypted connections, automatic deletion and a clear privacy policy. Avoid uploading highly confidential documents unless your policy allows it.

### Do I need to install anything?
No. The tools run in your browser.

### Will the output have a watermark?
Not from our tools. Always check the result of any free service.
`,
    relatedTools: [
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDF files"
          },
          {
                "name": "PDF to Word",
                "path": "/pdf-to-word",
                "description": "Convert PDF to editable Word"
          },
          {
                "name": "Edit PDF",
                "path": "/edit-pdf",
                "description": "Add text and shapes"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add a typed or drawn signature"
          }
    ],
  },
  {
    slug: "pdf-tools-for-hr",
    title: "Best PDF Tools for HR Teams: Contracts, Onboarding and Records",
    metaTitle: "PDF Tools for HR Teams: Contracts & Records | PDF HUB 24",
    metaDescription: "The PDF jobs HR does every week: merging onboarding packs, protecting contracts, signing, redacting and compressing records, and which free tool fits each.",
    excerpt: "From onboarding packs to confidential records, here are the PDF tasks HR teams repeat daily and the free tools that make each one faster.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-06-01",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["hr","contracts","onboarding","confidential documents"],
    content: `
HR handles some of the most sensitive documents in any organisation, and a lot of them are PDFs: contracts, offer letters, ID copies and performance records. Speed matters, but so does care.

## A note on confidentiality first

These tools run online. Some conversions and translation are processed by third-party services. Before uploading personnel files, check your organisation's data-protection policy and any requirements that apply in your region. For highly sensitive records, an approved internal system is the safer choice.

## Onboarding packs

Assemble a new-starter pack from the offer letter, contract, policies and forms with [Merge PDF](/merge-pdf); it accepts up to 10 files per run and each file can be up to 50 MB. Put the documents in reading order, then add page numbers with [Add Page Numbers](/add-page-numbers). Our [merge guide](/blog/merge-pdf-files-guide) covers ordering and mixed page sizes.

## Protecting contracts and records

Add an open password with [Protect PDF](/protect-pdf) before emailing anything private, and share the password by a different channel, such as a phone call. Our [password guide](/blog/protect-pdf-with-password) covers strong passwords and sharing. If you need to work with a protected file you own, [Unlock PDF](/unlock-pdf) removes a password you know.

## Signatures

[Sign PDF](/sign-pdf) adds a typed or drawn signature to the first page. That is a simple electronic signature, which is fine for many internal approvals. Employment contracts and regulated documents may require a certified signing process, so check with legal. See [signing electronically](/blog/sign-pdf-electronically).

## Redacting personal information

When sharing a document with others, you may need to hide names, salaries or ID numbers. Black boxes alone don't remove the text underneath. Use [Redact PDF](/redact-pdf) to draw the boxes, then convert the pages to images with [PDF to PNG](/pdf-to-png) and rebuild the PDF with [PNG to PDF](/png-to-pdf). Follow our full [redaction guide](/blog/redact-sensitive-pdf-information) and test the final file.

## Everyday clean-up

- Shrink large scans with [Compress PDF](/compress-pdf).
- Make scanned records searchable with [OCR PDF](/ocr-pdf); it currently works best on English.
- Fix crooked scans with [Rotate PDF](/rotate-pdf) and [Crop PDF](/crop-pdf).
- Stamp CONFIDENTIAL across every page with [Add Watermark](/add-watermark).
- Remove blank or duplicate pages with [Delete Pages](/delete-pages).

## A simple routine

1. Work on copies, never the master record.
2. Name files consistently, for example Surname_Contract_2026.
3. Protect anything that leaves your systems.
4. Delete downloaded copies when you're done.

## Frequently Asked Questions

### Can we rely on these tools for legal compliance?
No. Treat them as productivity tools and follow your organisation's data-protection and records policies.

### Is a typed signature valid for contracts?
It depends on the document and the jurisdiction. Ask legal before using it for anything binding.

### Is a black box enough to hide a salary?
No. Flatten the redacted pages to images as described above and test the result.

### Are there file size limits?
Yes, 50 MB per file.
`,
    relatedTools: [
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDF files"
          },
          {
                "name": "Protect PDF",
                "path": "/protect-pdf",
                "description": "Add a password"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add a typed or drawn signature"
          },
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Black out sensitive info"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          }
    ],
  },
  {
    slug: "pdf-tools-for-lawyers",
    title: "Free PDF Tools for Lawyers and Legal Teams",
    metaTitle: "Free PDF Tools for Lawyers and Legal Teams | PDF HUB 24",
    metaDescription: "Bundling exhibits, redacting, signing, numbering pages and shrinking court filings: the PDF tasks legal teams handle and how to do each safely for free.",
    excerpt: "Legal work runs on PDFs. Here are the everyday tasks, from bundling exhibits to redaction, and the free tools and cautions that go with them.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-06-01",
    modifiedDate: "2026-09-19",
    readTime: "7 min read",
    category: "Guides",
    tags: ["legal","court filings","redaction","exhibits"],
    content: `
Filings, exhibits, disclosure bundles, client copies: legal work produces mountains of PDFs. Free tools can take care of many routine jobs, provided you understand exactly what each one does. This guide does not give legal advice, and it isn't a substitute for your firm's document policies.

## Confidentiality comes first

The tools run online, and some conversions and translation are handled by third-party services. Client documents carry professional duties, so check your firm's policy, your regulator's guidance and any client requirements before uploading privileged material. For the most sensitive files, use your firm's approved systems.

## Bundling exhibits and bundles

[Merge PDF](/merge-pdf) combines up to 10 files per run, each up to 50 MB. For a larger bundle, merge in stages. Put the documents in order first, then use [Reorder Pages](/reorder-pages) for any fixes. Add page numbers with [Add Page Numbers](/add-page-numbers), which writes a plain running number in any of six positions; it does not create Bates-style prefixes, so check what your court requires. Our [merge guide](/blog/merge-pdf-files-guide) covers the workflow.

## Meeting e-filing size limits

Courts and registries set upload limits. Compress with [Compress PDF](/compress-pdf), starting on Medium, or split a large document into parts with [Split PDF](/split-pdf). Check the result remains legible, especially small print and stamps. See our [compression guide](/blog/how-to-compress-pdf-for-email).

## Redaction: do it carefully

Redaction failures are among the most embarrassing mistakes in legal practice. A black box drawn over text does not always remove it. [Redact PDF](/redact-pdf) draws boxes on the page. To make the result safe, convert the pages to images with [PDF to PNG](/pdf-to-png) and rebuild the document with [PNG to PDF](/png-to-pdf), then test that nothing can be selected, searched or copied. Follow our [redaction guide](/blog/redact-sensitive-pdf-information), have a second person review, and follow any court rules on redaction.

## Signatures

[Sign PDF](/sign-pdf) adds a typed or drawn signature to the first page. It is a simple electronic signature, and it doesn't provide certificate-based verification or an audit trail. Whether that's acceptable depends on the document and the jurisdiction. Read our [signing guide](/blog/sign-pdf-electronically).

## Making scans searchable

[OCR PDF](/ocr-pdf) adds a text layer to scanned documents so you can search them. It currently works best on English text, and errors occur, so verify quotes and figures against the original page before relying on them.

## Comparing versions

[Compare PDF](/compare-pdf) compares the text of two documents line by line and reports lines that appear in only one. It doesn't detect formatting or image changes, and it should never replace a careful review of a contract. Read [how comparison works](/blog/compare-two-pdf-files).

## Protecting what you send

Add a password with [Protect PDF](/protect-pdf) and send it separately. Mark drafts with [Add Watermark](/add-watermark), for example CONFIDENTIAL or DRAFT. A watermark labels a document; it doesn't secure it.

## Frequently Asked Questions

### Can we use these tools for privileged documents?
That is a decision for your firm and your regulator. Many firms restrict uploads to approved systems.

### Does Add Page Numbers support Bates numbering?
No. It adds plain page numbers.

### Is a simple e-signature enough?
It depends on the document type and jurisdiction, so check the requirements.

### Is a black box enough for redaction?
No. Flatten to images and test the file.
`,
    relatedTools: [
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDF files"
          },
          {
                "name": "Redact PDF",
                "path": "/redact-pdf",
                "description": "Black out sensitive info"
          },
          {
                "name": "Add Page Numbers",
                "path": "/add-page-numbers",
                "description": "Number every page"
          },
          {
                "name": "Sign PDF",
                "path": "/sign-pdf",
                "description": "Add a typed or drawn signature"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          }
    ],
  },
  {
    slug: "pdf-tools-for-teachers",
    title: "Best PDF Tools for Teachers: Save Time on Worksheets and Marking",
    metaTitle: "PDF Tools for Teachers: Save Time Weekly | PDF HUB 24",
    metaDescription: "Merge resources, split worksheets, annotate student work and shrink files for the class portal. The PDF tasks teachers repeat, with free tools for each.",
    excerpt: "Worksheets, reading packs, feedback on student work: these are the PDF jobs teachers do most and the quickest free way to handle each.",
    author: "PDF HUB 24 Team",
    publishDate: "2026-06-01",
    modifiedDate: "2026-09-19",
    readTime: "6 min read",
    category: "Guides",
    tags: ["teachers","worksheets","annotate","education"],
    content: `
Teachers lose a surprising amount of time to file wrangling: joining worksheets, cutting pages out of a textbook, squeezing a scan under the school portal's limit. A few tools remove most of that.

## Build resource packs

Combine handouts, worksheets and reading into one file with [Merge PDF](/merge-pdf), which takes up to 10 files per run. Rearrange the order with [Reorder Pages](/reorder-pages) and add page numbers with [Add Page Numbers](/add-page-numbers) so students can find "page 6". See our [merge guide](/blog/merge-pdf-files-guide).

## Cut down long documents

Only need chapter 3? [Split PDF](/split-pdf) extracts a page range, and [Extract Pages](/extract-pages) picks individual pages. Use [Delete Pages](/delete-pages) to remove answer keys from a student copy. Read [splitting a PDF](/blog/how-to-split-pdf-pages) for a worked example.

## Turn your documents into PDFs

- Handouts written in Word: [Word to PDF](/word-to-pdf)
- Photos of whiteboards or paper worksheets: [JPG to PDF](/jpg-to-pdf), then [Resize PDF](/resize-pdf) to A4 (see [converting images](/blog/convert-images-to-pdf))
- Slides you want as a handout: export from your presentation software, or use [PDF to PNG](/pdf-to-png) to reuse a page as an image

## Feedback and marking

[Annotate PDF](/annotate-pdf) adds highlights, underlines and notes. It marks the first page, so for multi-page assignments, use a viewer that annotates all pages, or extract, annotate and merge back. [Sign PDF](/sign-pdf) adds your signature to a report or a permission form. See [annotating a PDF](/blog/annotate-pdf-comments).

## Share safely

- Add a password to answer keys or grade sheets with [Protect PDF](/protect-pdf), and share the password separately.
- Check your school's policy on student data before uploading anything with names or grades.
- Stamp DRAFT or SAMPLE with [Add Watermark](/add-watermark).

## Make files portal-friendly

Learning platforms often limit upload size. [Compress PDF](/compress-pdf) on Medium usually works, and our [compression guide](/blog/how-to-compress-pdf-for-email) explains how to hit a target. If you scan documents, use 150 to 200 DPI in black and white for text.

## Scanned materials

If you scan old worksheets, [OCR PDF](/ocr-pdf) makes them searchable (it works best for English), and [Extract Text](/extract-text) lets you copy the words into a new document. For students who need a translated reading for understanding, [Translate PDF](/translate-pdf) produces a plain-text machine translation; the text is sent to an external service, so don't use it for material containing student information.

## A weekly routine

1. Keep a folder per class with clearly named PDFs.
2. Work from copies, and keep master versions.
3. Compress before uploading to the portal.
4. Check every file on a phone, since many students read on one.

## Frequently Asked Questions

### Are the tools free for classroom use?
Yes, and you don't need an account.

### What is the size limit?
50 MB per file.

### Can students use these tools too?
Yes. See our guide for [students](/blog/pdf-tools-for-students).

### Can I annotate every page of a long PDF?
The annotate tool marks the first page. Use the extract-and-merge method for others.
`,
    relatedTools: [
          {
                "name": "Merge PDF",
                "path": "/merge-pdf",
                "description": "Combine PDF files"
          },
          {
                "name": "Split PDF",
                "path": "/split-pdf",
                "description": "Extract a page range"
          },
          {
                "name": "Annotate PDF",
                "path": "/annotate-pdf",
                "description": "Add comments and highlights"
          },
          {
                "name": "Compress PDF",
                "path": "/compress-pdf",
                "description": "Reduce PDF file size"
          },
          {
                "name": "Word to PDF",
                "path": "/word-to-pdf",
                "description": "Convert Word to PDF"
          }
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}
