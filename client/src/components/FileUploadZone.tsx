import { useCallback, useState, useId, useEffect } from "react";
import { Upload, X, FileText, Image, File, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUploadContext } from "@/contexts/UploadContext";

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
      setTimeout(() => {
        clearUploadedFile();
      }, 100);
    }
  }, [uploadedFile, selectedFiles.length, onFilesSelected, clearUploadedFile, hasConsumedContext]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
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
      // Append new files to existing ones, up to maxFiles
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
      // Append new files to existing ones, up to maxFiles
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
    
    // Reset input value so same file can be selected again
    e.target.value = '';
  }, [multiple, maxFiles, selectedFiles, onFilesSelected]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  const handleButtonClick = useCallback(() => {
    const input = document.getElementById(uniqueInputId) as HTMLInputElement;
    if (input) {
      input.click();
    }
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
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isDragging && !disabled && "border-primary bg-primary/5 scale-[1.01]",
          !isDragging && !disabled && "border-border hover:border-primary/60 hover:bg-accent/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        data-testid="upload-zone"
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 transition-opacity",
          isDragging ? "opacity-100" : "opacity-0"
        )} />
        
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
        
        <div className="relative flex flex-col items-center justify-center p-6 sm:p-12 text-center pointer-events-none">
          <div className={cn(
            "w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300",
            isDragging 
              ? "bg-gradient-to-br from-primary to-cyan-500 shadow-lg shadow-primary/25" 
              : "bg-gradient-to-br from-primary/10 to-cyan-500/10"
          )}>
            {isDragging ? (
              <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-white animate-bounce" aria-hidden="true" />
            ) : (
              <FileIcon className="w-8 h-8 sm:w-12 sm:h-12 text-primary" aria-hidden="true" />
            )}
          </div>
          
          <h3 className="text-lg sm:text-2xl font-bold mb-1.5 sm:mb-2 tracking-tight">
            {isDragging ? "Drop your files here!" : "Upload Your Files"}
          </h3>
          
          <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md">
            {isDragging 
              ? "Release to upload" 
              : multiple 
                ? `Tap to select up to ${maxFiles} files`
                : "Tap to select your file"
            }
          </p>
          
          <div className="pointer-events-auto mb-4">
            <Button 
              type="button"
              size="lg" 
              className="gap-2 shadow-md min-h-[48px] px-6 sm:px-8 text-base touch-manipulation"
              disabled={disabled}
              data-testid="button-select-files"
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
              aria-controls={uniqueInputId}
            >
              <Upload className="w-5 h-5" aria-hidden="true" />
              Select {multiple ? "Files" : "File"}
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-muted/50">
              <FileIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              {formatDisplay}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-muted/50">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" aria-hidden="true" />
              Secure
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-muted/50">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" aria-hidden="true" />
              Fast
            </span>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-semibold">
              {multiple 
                ? `Selected Files (${selectedFiles.length}/${maxFiles})`
                : "Selected File"
              }
            </h4>
            <div className="flex items-center gap-2">
              {multiple && selectedFiles.length < maxFiles && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleButtonClick}
                  disabled={disabled}
                  className="text-xs h-7 gap-1"
                  data-testid="button-add-more-files"
                >
                  <Upload className="w-3 h-3" aria-hidden="true" />
                  Add More
                </Button>
              )}
              {selectedFiles.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFiles([]);
                    onFilesSelected([]);
                  }}
                  className="text-xs h-7"
                  data-testid="button-clear-all"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover-elevate transition-all"
                data-testid={`file-item-${index}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0"
                  data-testid={`button-remove-file-${index}`}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
