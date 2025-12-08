import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface RecentToolsContextType {
  recentTools: string[];
  addRecentTool: (toolId: string) => void;
  clearRecentTools: () => void;
}

const RecentToolsContext = createContext<RecentToolsContextType | undefined>(undefined);

const MAX_RECENT_TOOLS = 6;
const STORAGE_KEY = "pdf-hub-recent-tools";

export function RecentToolsProvider({ children }: { children: React.ReactNode }) {
  const [recentTools, setRecentTools] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentTools));
  }, [recentTools]);

  const addRecentTool = useCallback((toolId: string) => {
    setRecentTools(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, MAX_RECENT_TOOLS);
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
  }, []);

  return (
    <RecentToolsContext.Provider value={{ recentTools, addRecentTool, clearRecentTools }}>
      {children}
    </RecentToolsContext.Provider>
  );
}

export function useRecentTools() {
  const context = useContext(RecentToolsContext);
  if (!context) {
    throw new Error("useRecentTools must be used within RecentToolsProvider");
  }
  return context;
}
