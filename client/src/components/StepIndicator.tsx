import { Upload, Settings, Download, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
  icon: "upload" | "settings" | "download";
}

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const steps: Step[] = [
  { id: 1, label: "Upload", icon: "upload" },
  { id: 2, label: "Configure", icon: "settings" },
  { id: 3, label: "Download", icon: "download" },
];

const iconMap = {
  upload: Upload,
  settings: Settings,
  download: Download,
};

export default function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => {
          const Icon = iconMap[step.icon];
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    isCompleted && "bg-green-500 text-white shadow-md shadow-green-500/25",
                    isCurrent && "bg-gradient-to-br from-primary to-cyan-500 text-white shadow-lg shadow-primary/25 scale-110",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                  data-testid={`step-${step.id}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  ) : (
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs sm:text-sm font-medium transition-colors",
                    isCompleted && "text-green-500",
                    isCurrent && "text-primary",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div
                    className={cn(
                      "h-0.5 rounded-full transition-all duration-500",
                      currentStep > step.id ? "bg-green-500" : "bg-border"
                    )}
                  />
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
                <div
                  className={cn(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all",
                    isCompleted && "bg-green-500 text-white",
                    isCurrent && "bg-primary text-primary-foreground",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium hidden sm:inline",
                    isCompleted && "text-green-500",
                    isCurrent && "text-foreground",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
              
              {index < stepLabels.length - 1 && (
                <div
                  className={cn(
                    "w-6 sm:w-10 h-0.5 rounded-full",
                    currentStep > stepNumber ? "bg-green-500" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
