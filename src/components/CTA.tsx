import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Phone, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to take control of your business finances?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Book a free consultation today and discover how we can help you achieve 
            financial clarity and sustainable growth.
          </p>

          <Button 
            size="lg" 
            variant="secondary"
            className="h-14 px-8 text-base font-semibold mb-16 group shadow-large hover:shadow-xl"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Your Free Consultation
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-primary-foreground mb-2">Call Us</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Speak directly with our experts
                </p>
                <Button variant="ghost" size="sm" className="mt-3 text-primary-foreground hover:bg-primary-foreground/20">
                  (555) 123-4567
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-primary-foreground mb-2">Email Us</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Get detailed answers to your questions
                </p>
                <Button variant="ghost" size="sm" className="mt-3 text-primary-foreground hover:bg-primary-foreground/20">
                  hello@viable.co
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-primary-foreground mb-2">Schedule Online</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Choose a time that works for you
                </p>
                <Button variant="ghost" size="sm" className="mt-3 text-primary-foreground hover:bg-primary-foreground/20">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default CTA;