import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Shield, Clock, Users, BarChart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: "Financial Planning",
      description: "Comprehensive budgeting and forecasting tools to help you plan for sustainable growth.",
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Real-time insights into your business performance with actionable recommendations.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Identify and mitigate financial risks before they impact your business operations.",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Automate routine financial tasks so you can focus on growing your business.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to financial experts who understand your industry and business model.",
    },
    {
      icon: BarChart,
      title: "Custom Reports",
      description: "Detailed financial reports tailored to your specific business needs and goals.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to manage your finances
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of financial tools and expert guidance helps you 
            make informed decisions and achieve sustainable growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="group hover:shadow-medium transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;