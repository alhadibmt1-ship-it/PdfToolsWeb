import { useState } from "react";
import { Settings, Check, RotateCcw, FileArchive, Image, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/contexts/SettingsContext";
import { useToast } from "@/hooks/use-toast";
import type { CompressionLevel } from "@shared/schema";
import type { ImageQualityPreset } from "@/contexts/SettingsContext";
import { cn } from "@/lib/utils";

const PDF_LEVELS: { value: CompressionLevel; label: string; subtitle: string; badge: string; badgeColor: string }[] = [
  {
    value: "low",
    label: "Low",
    subtitle: "Best quality, mild size reduction",
    badge: "~15% smaller",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    value: "medium",
    label: "Medium",
    subtitle: "Balanced quality and file size",
    badge: "~50% smaller",
    badgeColor: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  },
  {
    value: "high",
    label: "High",
    subtitle: "Smallest size, reduced quality",
    badge: "~70% smaller",
    badgeColor: "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400",
  },
];

const IMAGE_QUALITY_PRESETS: { value: ImageQualityPreset; label: string; subtitle: string; badge: string; badgeColor: string }[] = [
  {
    value: 50,
    label: "Small File",
    subtitle: "Aggressive — best for thumbnails",
    badge: "50% quality",
    badgeColor: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
  },
  {
    value: 65,
    label: "Web Optimized",
    subtitle: "Compact — great for online use",
    badge: "65% quality",
    badgeColor: "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    value: 80,
    label: "High Quality",
    subtitle: "Sharp — minimal visible loss",
    badge: "80% quality",
    badgeColor: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  },
  {
    value: 95,
    label: "Near Lossless",
    subtitle: "Crisp — closest to original",
    badge: "95% quality",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  },
];

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-primary">{icon}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

export default function SettingsDialog() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  function save<K extends keyof typeof settings>(key: K, value: typeof settings[K]) {
    updateSettings({ [key]: value } as Partial<typeof settings>);
    toast({ description: "Setting saved." });
  }

  function handleReset() {
    resetSettings();
    toast({ description: "Settings reset to defaults." });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-settings"
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" data-testid="dialog-settings">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-7 py-2">

          {/* PDF Compression Level */}
          <section>
            <SectionTitle icon={<FileArchive className="w-4 h-4" />} label="Default PDF Compression Level" />
            <p className="text-xs text-muted-foreground mb-3">
              Pre-selects the compression level when you open the Compress PDF and Batch Compress tools.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PDF_LEVELS.map(({ value, label, subtitle, badge, badgeColor }) => {
                const active = settings.defaultCompressionLevel === value;
                return (
                  <button
                    key={value}
                    onClick={() => save("defaultCompressionLevel", value)}
                    data-testid={`card-pdf-level-${value}`}
                    className={cn(
                      "relative flex flex-col items-start gap-1.5 p-3 rounded-lg border text-left transition-colors",
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover-elevate"
                    )}
                  >
                    {active && (
                      <span className="absolute top-2 right-2 text-primary">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="font-semibold text-sm text-foreground">{label}</span>
                    <span className="text-xs text-muted-foreground leading-snug">{subtitle}</span>
                    <span className={cn("text-xs font-medium rounded px-1.5 py-0.5 mt-0.5", badgeColor)}>
                      {badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Image Quality Preset */}
          <section>
            <SectionTitle icon={<Image className="w-4 h-4" />} label="Default Image Compression Quality" />
            <p className="text-xs text-muted-foreground mb-3">
              Sets the starting quality level when you open the Image Compressor tool.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {IMAGE_QUALITY_PRESETS.map(({ value, label, subtitle, badge, badgeColor }) => {
                const active = settings.defaultImageQuality === value;
                return (
                  <button
                    key={value}
                    onClick={() => save("defaultImageQuality", value)}
                    data-testid={`card-img-quality-${value}`}
                    className={cn(
                      "relative flex flex-col items-start gap-1.5 p-3 rounded-lg border text-left transition-colors",
                      active
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover-elevate"
                    )}
                  >
                    {active && (
                      <span className="absolute top-2 right-2 text-primary">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="font-semibold text-sm text-foreground">{label}</span>
                    <span className="text-xs text-muted-foreground leading-snug">{subtitle}</span>
                    <span className={cn("text-xs font-medium rounded px-1.5 py-0.5 mt-0.5", badgeColor)}>
                      {badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Preferences */}
          <section>
            <SectionTitle icon={<Download className="w-4 h-4" />} label="Preferences" />
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 py-3 px-3 rounded-lg border border-border bg-card">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-download-toggle" className="text-sm font-medium cursor-pointer">
                    Auto-download results
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically download the file as soon as processing completes
                  </p>
                </div>
                <Switch
                  id="auto-download-toggle"
                  checked={settings.autoDownload}
                  onCheckedChange={v => save("autoDownload", v)}
                  data-testid="toggle-auto-download"
                />
              </div>
            </div>
          </section>

          {/* Current summary */}
          <section className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">Current Settings</p>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">PDF compression</span>
                <span className="font-medium capitalize">{settings.defaultCompressionLevel}</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Image quality</span>
                <span className="font-medium">{settings.defaultImageQuality}%</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Auto-download</span>
                <span className="font-medium">{settings.autoDownload ? "On" : "Off"}</span>
              </li>
            </ul>
          </section>

          {/* Reset */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-border">
            <p className="text-xs text-muted-foreground">All settings are saved automatically and persist across sessions.</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              data-testid="button-settings-reset"
              className="flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
