import { Upload, Settings, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/languages";

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

export default function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  const { lang } = useLanguage();

  const steps = [
    { id: 1, labelKey: "uploadStep", icon: "upload" as const },
    { id: 2, labelKey: "configureStep", icon: "settings" as const },
    { id: 3, labelKey: "downloadStep", icon: "download" as const },
  ];

  const iconMap = { upload: Upload, settings: Settings, download: Download };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon];
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                {/* Step circle */}
                <div className={cn(
                  "relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-300",
                  isCompleted && "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30",
                  isCurrent && "bg-gradient-to-br from-primary to-cyan-500 text-white shadow-xl shadow-primary/35 scale-110",
                  isUpcoming && "bg-muted text-muted-foreground border-2 border-border"
                )} data-testid={`step-${step.id}`}>
                  {/* Pulse ring on current */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping" />
                  )}
                  {isCompleted
                    ? <Check className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" aria-hidden="true" />
                    : <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" aria-hidden="true" />
                  }
                </div>

                {/* Label */}
                <span className={cn(
                  "text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
                  isCompleted && "text-green-500",
                  isCurrent && "text-primary",
                  isUpcoming && "text-muted-foreground"
                )}>
                  {t(lang, step.labelKey)}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-3 mb-5">
                  <div className={cn(
                    "h-0.5 rounded-full transition-all duration-500",
                    currentStep > step.id
                      ? "bg-gradient-to-r from-green-500 to-emerald-400"
                      : "bg-border"
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SimpleStepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function SimpleStepIndicator({ steps: stepLabels, currentStep, className }: SimpleStepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={cn(
                  "w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all",
                  isCompleted && "bg-green-500 text-white shadow-sm shadow-green-500/30",
                  isCurrent && "bg-gradient-to-br from-primary to-cyan-500 text-white shadow-sm shadow-primary/30",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}>
                  {isCompleted
                    ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    : stepNumber
                  }
                </div>
                <span className={cn(
                  "text-xs sm:text-sm font-medium hidden sm:inline",
                  isCompleted && "text-green-500",
                  isCurrent && "text-foreground font-semibold",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}>
                  {label}
                </span>
              </div>

              {index < stepLabels.length - 1 && (
                <div className={cn(
                  "w-6 sm:w-10 h-0.5 rounded-full transition-all",
                  currentStep > stepNumber ? "bg-green-500" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
