import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import MergePdfPage from "@/pages/MergePdfPage";
import SplitPdfPage from "@/pages/SplitPdfPage";
import CompressPdfPage from "@/pages/CompressPdfPage";
import PdfToJpgPage from "@/pages/PdfToJpgPage";
import JpgToPdfPage from "@/pages/JpgToPdfPage";
import PdfToWordPage from "@/pages/PdfToWordPage";
import ProtectPdfPage from "@/pages/ProtectPdfPage";
import UnlockPdfPage from "@/pages/UnlockPdfPage";
import RotatePdfPage from "@/pages/RotatePdfPage";
import DeletePagesPage from "@/pages/DeletePagesPage";
import ExtractTextPage from "@/pages/ExtractTextPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/merge" component={MergePdfPage} />
      <Route path="/split" component={SplitPdfPage} />
      <Route path="/compress" component={CompressPdfPage} />
      <Route path="/pdf-to-jpg" component={PdfToJpgPage} />
      <Route path="/jpg-to-pdf" component={JpgToPdfPage} />
      <Route path="/pdf-to-word" component={PdfToWordPage} />
      <Route path="/protect" component={ProtectPdfPage} />
      <Route path="/unlock" component={UnlockPdfPage} />
      <Route path="/rotate" component={RotatePdfPage} />
      <Route path="/delete-pages" component={DeletePagesPage} />
      <Route path="/extract-text" component={ExtractTextPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
