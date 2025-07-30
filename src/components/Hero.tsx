import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 md:py-24 bg-gradient-subtle">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          We focus on your{" "}
          <span className="text-primary">financial management</span> so you can
          think about the business
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Viable helps business owners sleep better at night by taking away the
          stress of managing finances. We help you get a clear understanding of
          your numbers, create effective budgets, and set your business up for
          sustainable financial growth.
        </p>

        {/* CTA Button */}
        <Button 
          size="lg" 
          className="h-14 px-8 text-base font-semibold shadow-large hover:shadow-xl transition-all duration-300 group"
        >
          Book a free consultation today
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;