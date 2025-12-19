import { createContext, useContext, useState, useCallback } from "react";

interface UploadContextType {
  uploadedFile: File | null;
  targetTool: string | null;
  setUploadedFile: (file: File | null, toolPath?: string) => void;
  clearUploadedFile: () => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [uploadedFile, setFile] = useState<File | null>(null);
  const [targetTool, setTargetTool] = useState<string | null>(null);

  const setUploadedFile = useCallback((file: File | null, toolPath?: string) => {
    setFile(file);
    if (toolPath) {
      setTargetTool(toolPath);
    }
  }, []);

  const clearUploadedFile = useCallback(() => {
    setFile(null);
    setTargetTool(null);
  }, []);

  return (
    <UploadContext.Provider value={{ uploadedFile, targetTool, setUploadedFile, clearUploadedFile }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUploadContext() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within UploadProvider");
  }
  return context;
}
