
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import InstitutionSelectionPage from "./pages/InstitutionSelectionPage";
import AuthPage from "./pages/AuthPage";
import LoadingScreen from "./components/LoadingScreen";
import AttributeSelectionPage from "./pages/AttributeSelectionPage";
import OctagonViewPage from "./pages/OctagonViewPage";
import SegmentProfilePage from "./pages/SegmentProfilePage";
import CampaignPage from "./pages/CampaignPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loading" element={<LoadingScreen />} />
            <Route path="/attributes" element={<AttributeSelectionPage />} />
            <Route path="/octagon" element={<OctagonViewPage />} />
            <Route path="/profiles/:segmentId" element={<SegmentProfilePage />} />
            <Route path="/campaigns/:segmentId" element={<CampaignPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
