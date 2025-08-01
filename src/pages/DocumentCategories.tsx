import { 
  Building, 
  DollarSign, 
  FileText, 
  Shield, 
  Users, 
  Calendar,
  Award,
  Briefcase,
  BookOpen,
  TrendingUp
} from "lucide-react";

interface DocumentCategoriesProps {
  entity: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
}

// Entity-specific document categories
const entityCategories: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  count: number;
}>> = {
  "riffle-inc": [
    {
      id: "incorporation",
      name: "Incorporation Docs",
      description: "Articles, bylaws, certificates",
      icon: Building,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      count: 12
    },
    {
      id: "financial",
      name: "Financial Reports",
      description: "Tax returns, audits, statements",
      icon: DollarSign,
      color: "bg-green-100 hover:bg-green-200 text-green-800", 
      count: 28
    },
    {
      id: "compliance",
      name: "Compliance & Legal",
      description: "SEC filings, contracts, permits",
      icon: Shield,
      color: "bg-red-100 hover:bg-red-200 text-red-800",
      count: 15
    },
    {
      id: "board",
      name: "Board Documents",
      description: "Meeting minutes, resolutions",
      icon: Users,
      color: "bg-purple-100 hover:bg-purple-200 text-purple-800",
      count: 8
    }
  ],
  "riffle-studio": [
    {
      id: "incorporation",
      name: "Incorporation & ROC Docs",
      description: "MOA, AOA, certificates, MCA filings, annual returns",
      icon: Building,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      count: 18
    },
    {
      id: "compliance",
      name: "Compliance Docs",
      description: "GST, PAN, LUT",
      icon: Shield,
      color: "bg-red-100 hover:bg-red-200 text-red-800",
      count: 22
    },
    {
      id: "founder",
      name: "Founder Docs",
      description: "Founder PAN, Aadhar etc",
      icon: Users,
      color: "bg-purple-100 hover:bg-purple-200 text-purple-800",
      count: 8
    },
    {
      id: "financial",
      name: "Financials",
      description: "Invoices, Bills, Reports",
      icon: TrendingUp,
      color: "bg-green-100 hover:bg-green-200 text-green-800",
      count: 24
    }
  ],
  "deo-studios": [
    {
      id: "incorporation",
      name: "Incorporation Documents",
      description: "LLP incorporation papers, certificates",
      icon: Building,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      count: 8
    },
    {
      id: "compliance",
      name: "LLP Compliances",
      description: "Annual filings, compliance forms",
      icon: FileText,
      color: "bg-green-100 hover:bg-green-200 text-green-800",
      count: 12
    }
  ],
  "ember-labs": [
    {
      id: "incorporation",
      name: "Incorporation Documents",
      description: "LLP incorporation papers, certificates",
      icon: Building,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      count: 7
    },
    {
      id: "compliance",
      name: "LLP Compliances",
      description: "Annual filings, compliance forms",
      icon: FileText,
      color: "bg-green-100 hover:bg-green-200 text-green-800",
      count: 11
    }
  ]
};

export const DocumentCategories = ({ 
  entity, 
  onSelectCategory, 
  searchQuery 
}: DocumentCategoriesProps) => {
  const categories = entityCategories[entity] || [];
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDocuments = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="text-center">
        <h2 className="text-3xl font-light text-foreground mb-4">
          Document Categories
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
          All documents organized by category for quick access. No more hunting through folders.
        </p>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{totalDocuments}</span> documents across{" "}
          <span className="font-medium">{categories.length}</span> categories
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`${category.color} p-6 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-left`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="w-8 h-8" />
                <span className="text-sm font-medium bg-white/80 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {category.name}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {filteredCategories.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No categories found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentCategories;