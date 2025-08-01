import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 md:py-24 bg-gradient-subtle">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          We focus on your financial management
           so you can
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
  className="relative h-14 px-10 min-w-[300px] text-base font-semibold overflow-hidden rounded-full bg-[#35faa0] text-[#1b2337] border border-[#1b2337] group transition-all duration-300 hover:bg-[#1b2337] hover:text-white"
>
  {/* Button Text Sliding Effect */}
  <span className="relative block h-full w-full">
    {/* Outgoing Text */}
    <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
      Book a free consultation today
    </span>

    {/* Incoming Text */}
    <span className="absolute left-0 top-full w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:translate-y-[-100%]">
      Book a free consultation today
    </span>
  </span>

  {/* Sliding Arrow */}
  <ArrowRight className="ml-3 h-5 w-5 absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2 text-inherit" />
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