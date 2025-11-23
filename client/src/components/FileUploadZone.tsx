import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFormats: string;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
}

export default function FileUploadZone({
  onFilesSelected,
  acceptedFormats,
  multiple = false,
  maxFiles = 10,
  disabled = false,
  className
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    const validFiles = multiple ? files.slice(0, maxFiles) : files.slice(0, 1);
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      onFilesSelected(validFiles);
    }
  }, [disabled, multiple, maxFiles, onFilesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = multiple ? files.slice(0, maxFiles) : files.slice(0, 1);
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      onFilesSelected(validFiles);
    }
  }, [multiple, maxFiles, onFilesSelected]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative min-h-64 rounded-2xl border-2 border-dashed transition-all duration-200",
          isDragging && !disabled && "border-primary bg-accent/50 scale-[1.02]",
          !isDragging && !disabled && "border-border hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          accept={acceptedFormats}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          data-testid="input-file"
          id="file-upload"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
            isDragging ? "bg-primary/20" : "bg-muted"
          )}>
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-2">
            {multiple 
              ? `Upload up to ${maxFiles} files`
              : "Upload a single file"
            }
          </p>
          
          <p className="text-xs text-muted-foreground">
            Supported formats: {acceptedFormats === "image/*" ? "JPG, PNG, etc." : acceptedFormats.toUpperCase().replace(".", "")}
          </p>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-muted hover-elevate"
                data-testid={`file-item-${index}`}
              >
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
                  className="ml-2"
                  data-testid={`button-remove-file-${index}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
