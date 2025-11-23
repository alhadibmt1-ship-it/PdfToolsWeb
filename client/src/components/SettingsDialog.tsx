import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSettings } from "@/contexts/SettingsContext";
import type { CompressionLevel } from "@shared/schema";

export default function SettingsDialog() {
  const { settings, updateSettings } = useSettings();

  const handleCompressionChange = (level: CompressionLevel) => {
    updateSettings({ defaultCompressionLevel: level });
  };

  return (
    <Dialog>
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
      <DialogContent className="sm:max-w-md" data-testid="dialog-settings">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your PDF Master Tools preferences
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Default Compression Level
            </Label>
            <p className="text-sm text-muted-foreground">
              Choose your preferred default compression level for PDF files
            </p>
            <RadioGroup
              value={settings.defaultCompressionLevel}
              onValueChange={handleCompressionChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                <RadioGroupItem value="low" id="settings-low" data-testid="radio-settings-low" />
                <Label htmlFor="settings-low" className="cursor-pointer flex-1">
                  <div className="font-medium">Low Compression</div>
                  <div className="text-sm text-muted-foreground">Best quality, larger file size</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                <RadioGroupItem value="medium" id="settings-medium" data-testid="radio-settings-medium" />
                <Label htmlFor="settings-medium" className="cursor-pointer flex-1">
                  <div className="font-medium">Medium Compression</div>
                  <div className="text-sm text-muted-foreground">Balanced quality and size</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-md hover-elevate cursor-pointer">
                <RadioGroupItem value="high" id="settings-high" data-testid="radio-settings-high" />
                <Label htmlFor="settings-high" className="cursor-pointer flex-1">
                  <div className="font-medium">High Compression</div>
                  <div className="text-sm text-muted-foreground">Smallest file size, reduced quality</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
