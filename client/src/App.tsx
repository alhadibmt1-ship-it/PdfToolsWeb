import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import HomePage from "@/pages/HomePage";

const MergePdfPage = lazy(() => import("@/pages/MergePdfPage"));
const SplitPdfPage = lazy(() => import("@/pages/SplitPdfPage"));
const CompressPdfPage = lazy(() => import("@/pages/CompressPdfPage"));
const PdfToJpgPage = lazy(() => import("@/pages/PdfToJpgPage"));
const JpgToPdfPage = lazy(() => import("@/pages/JpgToPdfPage"));
const PdfToWordPage = lazy(() => import("@/pages/PdfToWordPage"));
const WordToPdfPage = lazy(() => import("@/pages/WordToPdfPage"));
const RotatePdfPage = lazy(() => import("@/pages/RotatePdfPage"));
const DeletePagesPage = lazy(() => import("@/pages/DeletePagesPage"));
const ExtractTextPage = lazy(() => import("@/pages/ExtractTextPage"));
const ProtectPdfPage = lazy(() => import("@/pages/ProtectPdfPage"));
const UnlockPdfPage = lazy(() => import("@/pages/UnlockPdfPage"));
const AddPageNumbersPage = lazy(() => import("@/pages/AddPageNumbersPage"));
const AddWatermarkPage = lazy(() => import("@/pages/AddWatermarkPage"));
const ReorderPagesPage = lazy(() => import("@/pages/ReorderPagesPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="status-route-loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/merge" component={MergePdfPage} />
        <Route path="/split" component={SplitPdfPage} />
        <Route path="/compress" component={CompressPdfPage} />
        <Route path="/pdf-to-jpg" component={PdfToJpgPage} />
        <Route path="/jpg-to-pdf" component={JpgToPdfPage} />
        <Route path="/pdf-to-word" component={PdfToWordPage} />
        <Route path="/word-to-pdf" component={WordToPdfPage} />
        <Route path="/rotate" component={RotatePdfPage} />
        <Route path="/delete-pages" component={DeletePagesPage} />
        <Route path="/extract-text" component={ExtractTextPage} />
        <Route path="/protect-pdf" component={ProtectPdfPage} />
        <Route path="/unlock-pdf" component={UnlockPdfPage} />
        <Route path="/add-page-numbers" component={AddPageNumbersPage} />
        <Route path="/add-watermark" component={AddWatermarkPage} />
        <Route path="/reorder-pages" component={ReorderPagesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
