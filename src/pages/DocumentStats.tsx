
export const DocumentStats = () => {
  const stats = [
    {
      label: "TOTAL DOCUMENTS",
      value: "1,247",
      subtext: "FILES"
    },
    {
      label: "FINANCIAL REPORTS",
      value: "456",
      subtext: "FILES"
    },
    {
      label: "COMPLIANCE DOCS",
      value: "342",
      subtext: "FILES"
    },
    {
      label: "STORAGE USED",
      value: "2.4",
      subtext: "GB"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-sm transition-shadow"
        >
          <div className="text-sm font-medium text-muted-foreground mb-4 tracking-wide">
            {stat.label}
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-medium text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
