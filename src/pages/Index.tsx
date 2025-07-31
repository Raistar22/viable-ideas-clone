import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Features from "@/components/Features";
import WhyViable from "@/components/WhyViable";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustSection />
      <Features />
      <WhyViable />
      <CTA />
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Index;
