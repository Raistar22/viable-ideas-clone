import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const footerLinks = {
    "Services": [
      "Financial Planning",
      "Budget Management", 
      "Growth Strategy",
      "Risk Assessment",
      "Tax Planning",
      "Consulting"
    ],
    "Company": [
      "About Us",
      "Our Team", 
      "Careers",
      "Press",
      "Partners",
      "Contact"
    ],
    "Resources": [
      "Blog",
      "Case Studies",
      "Whitepapers",
      "Webinars",
      "FAQ",
      "Support"
    ]
  };

  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-sm">
                V
              </div>
              <span className="text-xl font-bold text-foreground">Viable</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              We help business owners sleep better at night by taking away the stress 
              of managing finances and setting up sustainable growth systems.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <span className="text-sm font-bold">Li</span>
              </div>
              <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <span className="text-sm font-bold">Tw</span>
              </div>
              <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <span className="text-sm font-bold">Fb</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2024 Viable. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;