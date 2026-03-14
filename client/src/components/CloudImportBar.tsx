import GoogleDriveButton from "@/components/GoogleDriveButton";
import DropboxButton from "@/components/DropboxButton";
import UrlImportButton from "@/components/UrlImportButton";

interface CloudImportBarProps {
  onFileImported: (file: File) => void;
  accept?: "pdf" | "image" | "any";
}

export default function CloudImportBar({ onFileImported, accept = "pdf" }: CloudImportBarProps) {
  const btnClass = [
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
    "border border-border bg-background text-foreground",
    "hover-elevate transition-colors cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">or import from</span>
      <GoogleDriveButton
        onFileImported={onFileImported}
        accept={accept}
        className={btnClass}
      />
      <DropboxButton
        onFileImported={onFileImported}
        accept={accept}
        className={btnClass}
      />
      <UrlImportButton
        accept={accept === "pdf" ? ".pdf" : accept === "image" ? "image/*" : ".pdf,image/*"}
        onFileImported={onFileImported}
      />
    </div>
  );
}
