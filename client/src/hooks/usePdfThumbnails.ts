import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export interface PdfPage {
  fileIndex: number;
  pageNumber: number;
  thumbnail: string;
  fileName: string;
}

export function usePdfThumbnails(files: File[]) {
  const [pages, setPages] = useState<PdfPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (files.length === 0) {
      setPages([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setPages([]);

    async function generateThumbnails() {
      setLoading(true);
      setError(null);
      const allPages: PdfPage[] = [];

      try {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
          if (cancelled) break;

          const file = files[fileIndex];
          const arrayBuffer = await file.arrayBuffer();
          
          try {
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
              if (cancelled) break;

              try {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 0.5 });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                
                if (!context) {
                  allPages.push({
                    fileIndex,
                    pageNumber: pageNum,
                    thumbnail: "",
                    fileName: file.name,
                  });
                  continue;
                }

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                  canvasContext: context,
                  viewport: viewport,
                }).promise;

                allPages.push({
                  fileIndex,
                  pageNumber: pageNum,
                  thumbnail: canvas.toDataURL(),
                  fileName: file.name,
                });
              } catch (pageError) {
                allPages.push({
                  fileIndex,
                  pageNumber: pageNum,
                  thumbnail: "",
                  fileName: file.name,
                });
              }
            }
          } catch (pdfError) {
            console.warn(`Failed to process PDF ${file.name}:`, pdfError);
          }
        }

        if (!cancelled) {
          if (allPages.length === 0) {
            setError("Could not load any pages from the PDF files");
          } else {
            setPages(allPages);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to process PDF files");
          console.error("PDF processing error:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    generateThumbnails();

    return () => {
      cancelled = true;
    };
  }, [files]);

  return { pages, loading, error };
}
