import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";

// Landing Page Components
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import TrustSection from "@/components/TrustSection";
import WhyViable from "@/components/WhyViable";
import ThemeToggle from "@/components/ThemeToggle";

// App Views
import NotFound from "./pages/NotFound";
import EntitySelector from "./pages/EntitySelector";
import DocumentCategories from "./pages/DocumentCategories";
import EntityDashboard from "./pages/EntityDashboard";

const queryClient = new QueryClient();

// Wrapper to extract `:entity` param
const DocumentCategoriesWrapper = () => {
  const { entity } = useParams<{ entity: string }>();
  return (
    <>
      <EntityDashboard entityId={entity} />
      <DocumentCategories
        entity={entity}
        onSelectCategory={() => {}}
        searchQuery=""
      />
    </>
  );
};

// Landing Page Layout
const LandingPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <TrustSection />
      <WhyViable />
      <CTA />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Direct Access to Pages After Login */}
              <Route path="/entities" element={<EntitySelector />} />
              <Route path="/entities/:entity" element={<DocumentCategoriesWrapper />} />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Toasts */}
            <Toaster />
            <Sonner />

            {/* Floating Theme Toggle */}
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
