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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/auth/AuthContext";

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
import DriveDashboard from "./pages/DriveDashboard";
import DriveFolder from "./pages/DriveFolder";

const queryClient = new QueryClient();

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

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

function App() {
  const appTree = (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Drive Dashboard Routes */}
              <Route path="/drive-dashboard" element={<DriveDashboard />} />
              <Route path="/drive-folder" element={<DriveFolder />} />

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

  // Only include OAuth provider when a valid client ID is provided
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>{appTree}</AuthProvider>
      </GoogleOAuthProvider>
    );
  }

  // Fallback without OAuth
  return appTree;
}

export default App;
