import { lazy, Suspense } from "react";
import AdSlot from "./AdSlot";

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
    <>
      {/* Ad Slot 1 — between tool area and SEO content */}
      {/* To activate: add adClient="ca-pub-XXXXXXXXXXXXXXXX" adSlot="XXXXXXXXXX" */}
      <AdSlot format="horizontal" label="Advertisement" />

      <Suspense fallback={null}>
        <EnhancedToolSEOContent {...props} />
      </Suspense>
    </>
  );
}
