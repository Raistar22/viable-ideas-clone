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

            <Button size="lg" className="group">
              Learn More About Our Approach
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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