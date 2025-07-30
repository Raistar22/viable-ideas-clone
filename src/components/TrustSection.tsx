const TrustSection = () => {
  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateLab", logo: "IL" },
    { name: "GrowthCo", logo: "GC" },
    { name: "ScaleUp", logo: "SU" },
    { name: "NextGen", logo: "NG" },
    { name: "FutureFlow", logo: "FF" },
    { name: "BuildRight", logo: "BR" },
    { name: "Streamline", logo: "SL" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Loved by fast-growing businesses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of companies that trust us with their financial management
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-center group cursor-pointer"
            >
              <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {company.logo}
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Logos Row (Duplicate for infinite scroll effect) */}
        <div className="mt-16 overflow-hidden">
          <div className="flex space-x-12 animate-marquee">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex items-center space-x-3 opacity-40"
              >
                <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {company.logo}
                </div>
                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;