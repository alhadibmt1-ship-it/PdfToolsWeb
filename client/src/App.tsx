import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { RecentToolsProvider } from "@/contexts/RecentToolsContext";
import { UploadProvider } from "@/contexts/UploadContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import MobileQuickActions from "@/components/MobileQuickActions";
import LanguageBanner from "@/components/LanguageBanner";
import HomePageFallback from "@/components/HomePageFallback";

const HomePage = lazy(() => import("@/pages/HomePage"));

const MergePdfPage = lazy(() => import("@/pages/MergePdfPage"));
const SplitPdfPage = lazy(() => import("@/pages/SplitPdfPage"));
const CompressPdfPage = lazy(() => import("@/pages/CompressPdfPage"));
const PdfToJpgPage = lazy(() => import("@/pages/PdfToJpgPage"));
const JpgToPdfPage = lazy(() => import("@/pages/JpgToPdfPage"));
const PdfToWordPage = lazy(() => import("@/pages/PdfToWordPage"));
const WordToPdfPage = lazy(() => import("@/pages/WordToPdfPage"));
const PdfToPngPage = lazy(() => import("@/pages/PdfToPngPage"));
const PngToPdfPage = lazy(() => import("@/pages/PngToPdfPage"));
const PdfToExcelPage = lazy(() => import("@/pages/PdfToExcelPage"));
const ExcelToPdfPage = lazy(() => import("@/pages/ExcelToPdfPage"));
const RotatePdfPage = lazy(() => import("@/pages/RotatePdfPage"));
const DeletePagesPage = lazy(() => import("@/pages/DeletePagesPage"));
const ExtractTextPage = lazy(() => import("@/pages/ExtractTextPage"));
const ProtectPdfPage = lazy(() => import("@/pages/ProtectPdfPage"));
const UnlockPdfPage = lazy(() => import("@/pages/UnlockPdfPage"));
const AddPageNumbersPage = lazy(() => import("@/pages/AddPageNumbersPage"));
const AddWatermarkPage = lazy(() => import("@/pages/AddWatermarkPage"));
const ReorderPagesPage = lazy(() => import("@/pages/ReorderPagesPage"));

const HtmlToPdfPage = lazy(() => import("@/pages/HtmlToPdfPage"));
const ImageCompressorPage = lazy(() => import("@/pages/ImageCompressorPage"));
const WebpToPdfPage = lazy(() => import("@/pages/WebpToPdfPage"));
const CropPdfPage = lazy(() => import("@/pages/CropPdfPage"));
const PdfViewerPage = lazy(() => import("@/pages/PdfViewerPage"));
const ExtractImagesPage = lazy(() => import("@/pages/ExtractImagesPage"));
const ResizePdfPage = lazy(() => import("@/pages/ResizePdfPage"));
const GrayscalePdfPage = lazy(() => import("@/pages/GrayscalePdfPage"));
const FlattenPdfPage = lazy(() => import("@/pages/FlattenPdfPage"));
const RepairPdfPage = lazy(() => import("@/pages/RepairPdfPage"));
const SignPdfPage = lazy(() => import("@/pages/SignPdfPage"));
const OcrPdfPage = lazy(() => import("@/pages/OcrPdfPage"));
const ComparePdfPage = lazy(() => import("@/pages/ComparePdfPage"));

const PdfToPptPage = lazy(() => import("@/pages/PdfToPptPage"));
const PptToPdfPage = lazy(() => import("@/pages/PptToPdfPage"));
const TiffToPdfPage = lazy(() => import("@/pages/TiffToPdfPage"));
const GifToPdfPage = lazy(() => import("@/pages/GifToPdfPage"));
const EditPdfPage = lazy(() => import("@/pages/EditPdfPage"));
const AnnotatePdfPage = lazy(() => import("@/pages/AnnotatePdfPage"));
const RedactPdfPage = lazy(() => import("@/pages/RedactPdfPage"));

const ScanToPdfPage = lazy(() => import("@/pages/ScanToPdfPage"));
const PdfToAPage = lazy(() => import("@/pages/PdfToAPage"));
const BatchCompressPage = lazy(() => import("@/pages/BatchCompressPage"));

const ResizeImagePage = lazy(() => import("@/pages/ResizeImagePage"));
const CropImagePage = lazy(() => import("@/pages/CropImagePage"));
const RotateImagePage = lazy(() => import("@/pages/RotateImagePage"));
const ConvertImagePage = lazy(() => import("@/pages/ConvertImagePage"));

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const DmcaPage = lazy(() => import("@/pages/DmcaPage"));
const BlogListPage = lazy(() => import("@/pages/BlogListPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PdfStatisticsPage = lazy(() => import("@/pages/PdfStatisticsPage"));
const PressKitPage = lazy(() => import("@/pages/PressKitPage"));
const AllToolsPage = lazy(() => import("@/pages/AllToolsPage"));
const FreePdfConverterPage = lazy(() => import("@/pages/FreePdfConverterPage"));
const FreePdfEditorPage = lazy(() => import("@/pages/FreePdfEditorPage"));
const CategoryHubPage = lazy(() => import("@/pages/CategoryHubPage"));
const ProgrammaticSeoPage = lazy(() => import("@/pages/ProgrammaticSeoPage"));
const WriteForUsPage = lazy(() => import("@/pages/WriteForUsPage"));
const DataSecurityPage = lazy(() => import("@/pages/DataSecurityPage"));
const AutoDeletePage = lazy(() => import("@/pages/AutoDeletePage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const EmbedWidgetPage = lazy(() => import("@/pages/EmbedWidgetPage"));
const PdfComparisonPage = lazy(() => import("@/pages/PdfComparisonPage"));
const PdfFileFormatsPage = lazy(() => import("@/pages/PdfFileFormatsPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="status-route-loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function HomeRoute() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePage />
    </Suspense>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <LanguageBanner />
      <Switch>
        <Route path="/" component={HomeRoute} />
        <Route path="/merge" component={MergePdfPage} />
        <Route path="/split" component={SplitPdfPage} />
        <Route path="/compress" component={CompressPdfPage} />
        <Route path="/pdf-to-jpg" component={PdfToJpgPage} />
        <Route path="/jpg-to-pdf" component={JpgToPdfPage} />
        <Route path="/pdf-to-word" component={PdfToWordPage} />
        <Route path="/word-to-pdf" component={WordToPdfPage} />
        <Route path="/pdf-to-png" component={PdfToPngPage} />
        <Route path="/png-to-pdf" component={PngToPdfPage} />
        <Route path="/pdf-to-excel" component={PdfToExcelPage} />
        <Route path="/excel-to-pdf" component={ExcelToPdfPage} />
        <Route path="/rotate" component={RotatePdfPage} />
        <Route path="/delete-pages" component={DeletePagesPage} />
        <Route path="/extract-text" component={ExtractTextPage} />
        <Route path="/protect-pdf" component={ProtectPdfPage} />
        <Route path="/unlock-pdf" component={UnlockPdfPage} />
        <Route path="/add-page-numbers" component={AddPageNumbersPage} />
        <Route path="/add-watermark" component={AddWatermarkPage} />
        <Route path="/reorder-pages" component={ReorderPagesPage} />
        <Route path="/html-to-pdf" component={HtmlToPdfPage} />
        <Route path="/image-compressor" component={ImageCompressorPage} />
        <Route path="/webp-to-pdf" component={WebpToPdfPage} />
        <Route path="/crop-pdf" component={CropPdfPage} />
        <Route path="/pdf-viewer" component={PdfViewerPage} />
        <Route path="/extract-images" component={ExtractImagesPage} />
        <Route path="/resize-pdf" component={ResizePdfPage} />
        <Route path="/grayscale-pdf" component={GrayscalePdfPage} />
        <Route path="/flatten-pdf" component={FlattenPdfPage} />
        <Route path="/repair-pdf" component={RepairPdfPage} />
        <Route path="/sign-pdf" component={SignPdfPage} />
        <Route path="/ocr-pdf" component={OcrPdfPage} />
        <Route path="/compare-pdf" component={ComparePdfPage} />
        <Route path="/pdf-to-ppt" component={PdfToPptPage} />
        <Route path="/ppt-to-pdf" component={PptToPdfPage} />
        <Route path="/tiff-to-pdf" component={TiffToPdfPage} />
        <Route path="/gif-to-pdf" component={GifToPdfPage} />
        <Route path="/edit-pdf" component={EditPdfPage} />
        <Route path="/annotate-pdf" component={AnnotatePdfPage} />
        <Route path="/redact-pdf" component={RedactPdfPage} />
        <Route path="/scan-to-pdf" component={ScanToPdfPage} />
        <Route path="/pdf-to-pdfa" component={PdfToAPage} />
        <Route path="/batch-compress" component={BatchCompressPage} />
        <Route path="/resize-image" component={ResizeImagePage} />
        <Route path="/crop-image" component={CropImagePage} />
        <Route path="/rotate-image" component={RotateImagePage} />
        <Route path="/convert-image" component={ConvertImagePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/dmca" component={DmcaPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/pdf-statistics" component={PdfStatisticsPage} />
        <Route path="/press" component={PressKitPage} />
        <Route path="/all-tools" component={AllToolsPage} />
        <Route path="/free-pdf-converter" component={FreePdfConverterPage} />
        <Route path="/free-pdf-editor" component={FreePdfEditorPage} />
        <Route path="/write-for-us" component={WriteForUsPage} />
        <Route path="/data-security" component={DataSecurityPage} />
        <Route path="/auto-delete" component={AutoDeletePage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/embed" component={EmbedWidgetPage} />
        <Route path="/pdf-comparison-chart" component={PdfComparisonPage} />
        <Route path="/pdf-file-formats-guide" component={PdfFileFormatsPage} />
        <Route path="/tools/:slug" component={ProgrammaticSeoPage} />
        <Route path="/convert-pdf" component={CategoryHubPage} />
        <Route path="/compress-pdf-tools" component={CategoryHubPage} />
        <Route path="/edit-pdf-tools" component={CategoryHubPage} />
        <Route path="/secure-pdf" component={CategoryHubPage} />
        <Route path="/image-tools" component={CategoryHubPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

const LANG_CODES = ["es", "ar", "hi", "fr", "pt"];

function Router() {
  const [location] = useLocation();
  const langMatch = location.match(/^\/(es|ar|hi|fr|pt)(\/.*)?$/);
  const activeLang = langMatch ? langMatch[1] : "en";

  if (activeLang !== "en") {
    return (
      <WouterRouter base={`/${activeLang}`}>
        <AppRoutes />
      </WouterRouter>
    );
  }

  return <AppRoutes />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsProvider>
          <RecentToolsProvider>
            <UploadProvider>
              <TooltipProvider>
                <LanguageProvider>
                  <div className="pb-16 md:pb-0">
                    <Toaster />
                    <Router />
                    <MobileQuickActions />
                  </div>
                </LanguageProvider>
              </TooltipProvider>
            </UploadProvider>
          </RecentToolsProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
