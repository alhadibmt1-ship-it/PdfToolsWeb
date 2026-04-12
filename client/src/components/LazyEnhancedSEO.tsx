import { lazy, Suspense } from "react";

const EnhancedToolSEOContent = lazy(() => import("./EnhancedToolSEOContent"));

interface Props {
  toolId: string;
  fallbackToolName?: string;
  fallbackDescription?: string;
  fallbackHowToSteps?: string[];
  fallbackBenefits?: string[];
  fallbackFaqs?: { question: string; answer: string }[];
}

export default function LazyEnhancedSEO(props: Props) {
  return (
    <Suspense fallback={null}>
      <EnhancedToolSEOContent {...props} />
    </Suspense>
  );
}
