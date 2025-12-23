import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PDF_TOOLS } from "@shared/schema";
import ToolIcon from "./ToolIcon";

const categoryLabels: Record<string, string> = {
  "from-pdf": "Convert from PDF",
  "to-pdf": "Convert to PDF",
  "edit-pdf": "Edit PDF",
  "utility": "Utility Tools"
};

export default function ToolSearch() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toolsByCategory = useMemo(() => {
    const grouped: Record<string, typeof PDF_TOOLS> = {};
    PDF_TOOLS.forEach((tool) => {
      const category = tool.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tool);
    });
    return grouped;
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    setLocation(path);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative h-9 w-9 p-0 xl:h-9 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
        data-testid="button-search-tools"
        aria-label="Search tools"
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex text-muted-foreground">Search tools...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all 43+ PDF tools..." />
        <CommandList>
          <CommandEmpty>No tools found.</CommandEmpty>
          {Object.entries(toolsByCategory).map(([category, tools]) => (
            <CommandGroup key={category} heading={categoryLabels[category] || category}>
              {tools.map((tool) => (
                <CommandItem
                  key={tool.id}
                  value={`${tool.title} ${tool.description}`}
                  onSelect={() => handleSelect(tool.path)}
                  className="gap-3 cursor-pointer"
                  data-testid={`search-result-${tool.id}`}
                >
                  <ToolIcon iconType={tool.icon} size="sm" />
                  <div className="flex flex-col">
                    <span className="font-medium">{tool.title}</span>
                    <span className="text-xs text-muted-foreground">{tool.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
