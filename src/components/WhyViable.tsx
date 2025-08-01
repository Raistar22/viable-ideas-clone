import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

const WhyViable = () => {
  const benefits = [
    "Reduce financial stress and sleep better at night",
    "Get clear understanding of your business numbers",
    "Create effective budgets that actually work",
    "Set up systems for sustainable financial growth",
    "Access expert advice when you need it most",
    "Save time on financial administration",
  ];

  const stats = [
    { number: "500+", label: "Businesses Helped" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "2.3x", label: "Average Growth" },
    { number: "24/7", label: "Expert Support" },
  ];

  return (
    <section id="why" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why choose Viable for your financial management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that managing finances can be overwhelming for business owners. 
              That's why we've created a comprehensive solution that takes the complexity 
              out of financial management.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
  size="lg" 
  variant="secondary"
  className="relative h-14 px-10 min-w-[280px] text-base font-semibold mb-16 overflow-hidden rounded-full bg-[#35faa0] text-[#1b2337] border border-[#1b2337] group shadow-lg hover:bg-[#1b2337] hover:text-white transition-all duration-300"
>
  {/* Sliding Text Wrapper */}
  <span className="relative block h-full w-full pl-10 pr-12">
    {/* Text that slides up */}
    <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
      Learn More About Our Approach
    </span>

    {/* Text that slides in from bottom */}
    <span className="absolute top-full left-0 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:translate-y-[-100%]">
      Learn More About Our Approach
    </span>
  </span>

  {/* Sliding Arrow */}
  <ArrowRight className="h-5 w-5 absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2 text-inherit" />
</Button>

          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-medium transition-shadow">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyViable;