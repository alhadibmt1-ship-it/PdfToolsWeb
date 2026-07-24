import { useCallback, useState, useId, useEffect } from "react";
import { Upload, X, FileText, Image, File, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadContext } from "@/contexts/UploadContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, tFormat } from "@/lib/languages";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormats: string;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  toolName?: string;
}

function getFileIcon(format: string) {
  if (format.includes("pdf")) return FileText;
  if (format.includes("image") || format.includes("jpg") || format.includes("png") || format.includes("webp")) return Image;
  return File;
}

function getFormatDisplay(acceptedFormats: string): string {
  if (acceptedFormats === "image/*") return "JPG, PNG, WebP";
  if (acceptedFormats.includes(".pdf")) return "PDF";
  if (acceptedFormats.includes(".doc")) return "DOCX, DOC";
  if (acceptedFormats.includes(".xls")) return "XLSX, XLS";
  return acceptedFormats.toUpperCase().replace(/\./g, "").replace(/,/g, ", ");
}

export default function FileUploadZone({
  onFilesSelected,
  acceptedFormats,
  multiple = false,
  maxFiles = 10,
  disabled = false,
  className,
  toolName
}: FileUploadZoneProps) {
  const { lang } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputId = useId();
  const uniqueInputId = `file-upload-${inputId}`;
  const { uploadedFile, clearUploadedFile } = useUploadContext();
  const [hasConsumedContext, setHasConsumedContext] = useState(false);

  useEffect(() => {
    if (uploadedFile && selectedFiles.length === 0 && !hasConsumedContext) {
      setSelectedFiles([uploadedFile]);
      onFilesSelected([uploadedFile]);
      setHasConsumedContext(true);
      setTimeout(() => { clearUploadedFile(); }, 100);
    }
  }, [uploadedFile, selectedFiles.length, onFilesSelected, clearUploadedFile, hasConsumedContext]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (multiple) {
      const combinedFiles = [...selectedFiles, ...files].slice(0, maxFiles);
      setSelectedFiles(combinedFiles);
      onFilesSelected(combinedFiles);
    } else {
      const validFiles = files.slice(0, 1);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        onFilesSelected(validFiles);
      }
    }
  }, [disabled, multiple, maxFiles, selectedFiles, onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (multiple) {
      const combinedFiles = [...selectedFiles, ...files].slice(0, maxFiles);
      setSelectedFiles(combinedFiles);
      onFilesSelected(combinedFiles);
    } else {
      const validFiles = files.slice(0, 1);
      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
        onFilesSelected(validFiles);
      }
    }
    e.target.value = '';
  }, [multiple, maxFiles, selectedFiles, onFilesSelected]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  const handleButtonClick = useCallback(() => {
    const input = document.getElementById(uniqueInputId) as HTMLInputElement;
    if (input) input.click();
  }, [uniqueInputId]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    }
  }, [handleButtonClick]);

  const FileIcon = getFileIcon(acceptedFormats);
  const formatDisplay = getFormatDisplay(acceptedFormats);
  const uploadLabel = toolName
    ? `Upload file for ${toolName}`
    : multiple
      ? `Select up to ${maxFiles} files`
      : "Select a file";

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={uploadLabel}
        aria-disabled={disabled}
        data-testid="upload-zone"
        className={cn(
          "relative rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isDragging && !disabled && [
            "border-primary scale-[1.01]",
            "shadow-[0_0_40px_-8px_hsl(var(--primary)/0.4)]",
          ],
          !isDragging && !disabled && "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {/* Animated gradient background */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDragging
            ? "opacity-100 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-primary/10"
            : "opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/3"
        )} />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <input
          type="file"
          accept={acceptedFormats}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="sr-only"
          data-testid="input-file"
          id={uniqueInputId}
          aria-label={uploadLabel}
        />

        <div className="relative flex flex-col items-center justify-center p-8 sm:p-14 text-center pointer-events-none z-10">
          {/* Icon */}
          <div className={cn(
            "relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-all duration-300",
            isDragging
              ? "bg-gradient-to-br from-primary to-cyan-500 shadow-2xl shadow-primary/40 scale-110"
              : "bg-gradient-to-br from-primary/15 to-cyan-500/10 border border-primary/20"
          )}>
            {/* Glow ring when dragging */}
            {isDragging && (
              <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
            )}
            {isDragging ? (
              <Upload className="w-10 h-10 sm:w-14 sm:h-14 text-white animate-bounce" aria-hidden="true" />
            ) : (
              <FileIcon className="w-10 h-10 sm:w-14 sm:h-14 text-primary" aria-hidden="true" />
            )}
          </div>

          {/* Text */}
          <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
            {isDragging ? t(lang, "dropFilesHere") : t(lang, "uploadYourFiles")}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-sm">
            {isDragging
              ? t(lang, "releaseToUpload")
              : multiple
                ? tFormat(lang, "tapToSelectFiles", { n: maxFiles })
                : t(lang, "tapToSelectFile")
            }
          </p>

          {/* CTA Button */}
          <div className="pointer-events-auto mb-6">
            <Button
              type="button"
              size="lg"
              className={cn(
                "gap-2.5 min-h-[52px] px-8 sm:px-10 text-base font-semibold shadow-lg touch-manipulation transition-all",
                "shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              )}
              disabled={disabled}
              data-testid="button-select-files"
              onClick={(e) => { e.stopPropagation(); handleButtonClick(); }}
              aria-controls={uniqueInputId}
            >
              <Upload className="w-5 h-5" aria-hidden="true" />
              {multiple ? t(lang, "selectFiles") : t(lang, "selectFile")}
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/50 text-xs text-muted-foreground">
              <FileIcon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="font-medium">{formatDisplay}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/50 text-xs text-muted-foreground">
              <span className="font-medium">Up to 50MB</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-600 dark:text-green-400">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-medium">{t(lang, "secure")}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs text-orange-600 dark:text-orange-400">
              <Zap className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-medium">{t(lang, "fast")}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
              <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="font-medium">Free</span>
            </span>
          </div>
        </div>
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-semibold">
              {multiple
                ? tFormat(lang, "selectedFiles", { n: selectedFiles.length, max: maxFiles })
                : t(lang, "selectedFile")
              }
            </h4>
            <div className="flex items-center gap-2">
              {multiple && selectedFiles.length < maxFiles && (
                <Button variant="outline" size="sm" onClick={handleButtonClick} disabled={disabled}
                  className="text-xs h-8 gap-1.5" data-testid="button-add-more-files">
                  <Upload className="w-3 h-3" aria-hidden="true" />
                  {t(lang, "addMore")}
                </Button>
              )}
              {selectedFiles.length > 1 && (
                <Button variant="ghost" size="sm"
                  onClick={() => { setSelectedFiles([]); onFilesSelected([]); }}
                  className="text-xs h-8" data-testid="button-clear-all">
                  {t(lang, "clearAll")}
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/15 hover:border-primary/30 transition-all"
                data-testid={`file-item-${index}`}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:inline text-xs text-green-600 dark:text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full">
                    Ready
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    data-testid={`button-remove-file-${index}`}
                    aria-label={`Remove ${file.name}`}>
                    <X className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
