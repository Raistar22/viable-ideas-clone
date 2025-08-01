import { useState } from "react";
import { ArrowLeft, Download, ExternalLink, Star, Grid3X3, List, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/pages/FileIcon";
import { MinimalFileIcon } from "@/pages/MinimalFileIcon";

interface SmartDocumentGridProps {
  entity: string;
  category: string;
  searchQuery: string;
  onBack: () => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  link: string;
  starred: boolean;
  tags: string[];
}

// Entity-specific documents
const entityDocuments: Record<string, Record<string, Document[]>> = {
  "riffle-studio": {
    "incorporation": [
      {
        id: "1",
        name: "RSPLTD_AOA_INC-34_1-16419202799.pdf",
        type: "pdf",
        size: "2.4 MB",
        modified: "2 days ago",
        link: "https://drive.google.com/file/d/example1",
        starred: true,
        tags: ["incorporation", "AOA", "legal"]
      },
      {
        id: "2", 
        name: "RSPLTD_Certificate of Incorporation_Riffle Studio.pdf",
        type: "pdf",
        size: "1.8 MB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/example2",
        starred: false,
        tags: ["certificate", "incorporation", "legal"]
      },
      {
        id: "3",
        name: "RSPLTD_Form INC 9_1-16419202830.pdf",
        type: "pdf",
        size: "890 KB",
        modified: "3 days ago", 
        link: "https://drive.google.com/file/d/example3",
        starred: false,
        tags: ["form", "INC9", "filing"]
      },
      {
        id: "4",
        name: "RSPLTD_Form INC 35_1-16419158640.pdf",
        type: "pdf",
        size: "1.2 MB",
        modified: "1 day ago",
        link: "https://drive.google.com/file/d/example4", 
        starred: true,
        tags: ["form", "INC35", "filing"]
      },
      {
        id: "5",
        name: "RSPLTD_MCA Master Data.pdf",
        type: "pdf",
        size: "3.1 MB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/example5",
        starred: false,
        tags: ["MCA", "master", "data"]
      },
      {
        id: "6",
        name: "RSPLTD_MOA_INC-33_1-16419202819.pdf",
        type: "pdf",
        size: "2.7 MB", 
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/example6",
        starred: true,
        tags: ["MOA", "incorporation", "legal"]
      },
      {
        id: "7",
        name: "RSPLTD_Name approval letter.pdf",
        type: "pdf",
        size: "640 KB",
        modified: "5 days ago",
        link: "https://drive.google.com/file/d/example7",
        starred: false,
        tags: ["name", "approval", "letter"]
      },
      {
        id: "8",
        name: "RSPLTD_SPICE + Part B_1-16351069572.pdf",
        type: "pdf",
        size: "1.9 MB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/example8",
        starred: false,
        tags: ["SPICE", "form", "filing"]
      },
      {
        id: "9",
        name: "RSPTLD_DIN Approval Letter_ANURAG CHOUDHARY.pdf",
        type: "pdf",
        size: "580 KB",
        modified: "3 weeks ago",
        link: "https://drive.google.com/file/d/example9",
        starred: true,
        tags: ["DIN", "approval", "director"]
      },
      {
        id: "10",
        name: "RSPTLD_MCA Director Signatory Details.pdf",
        type: "pdf",
        size: "1.1 MB",
        modified: "2 days ago",
        link: "https://drive.google.com/file/d/example10",
        starred: false,
        tags: ["director", "signatory", "MCA"]
      }
    ],
    "compliance": [
      {
        id: "1",
        name: "RSPLTD_LUT FY 2025-2026.pdf",
        type: "pdf",
        size: "1.2 MB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/compliance1",
        starred: false,
        tags: ["LUT", "2025", "2026"]
      },
      {
        id: "2",
        name: "RSPTLD_Certificate of IEC.pdf",
        type: "pdf",
        size: "890 KB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/compliance2",
        starred: true,
        tags: ["IEC", "certificate", "export"]
      },
      {
        id: "3",
        name: "RSPTLD_GST Certificate.pdf",
        type: "pdf",
        size: "1.5 MB",
        modified: "3 days ago",
        link: "https://drive.google.com/file/d/compliance3",
        starred: false,
        tags: ["GST", "certificate", "tax"]
      },
      {
        id: "4",
        name: "RSPTLD_PAN_Riffle Studio.pdf",
        type: "pdf",
        size: "680 KB",
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/compliance4",
        starred: true,
        tags: ["PAN", "tax", "identity"]
      }
    ],
    "financial": [
      {
        id: "1",
        name: "Invoice - Q1 2024.pdf",
        type: "pdf",
        size: "2.1 MB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/financial1",
        starred: false,
        tags: ["invoice", "Q1", "2024"]
      },
      {
        id: "2",
        name: "Financial Report - March 2024.pdf",
        type: "pdf",
        size: "3.4 MB",
        modified: "2 days ago",
        link: "https://drive.google.com/file/d/financial2",
        starred: true,
        tags: ["report", "march", "2024"]
      }
    ]
  },
  "deo-studios": {
    "incorporation": [
      {
        id: "1",
        name: "Deo Studios_LLP Agreement.pdf",
        type: "pdf",
        size: "1.8 MB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/deo1",
        starred: true,
        tags: ["LLP", "agreement", "incorporation"]
      },
      {
        id: "2",
        name: "Deo Studios_Certificate of Incorporation.pdf",
        type: "pdf",
        size: "1.2 MB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/deo2",
        starred: false,
        tags: ["certificate", "incorporation", "legal"]
      }
    ],
    "compliance": [
      {
        id: "1",
        name: "Deo Studios_Annual Filing Form 11.pdf",
        type: "pdf",
        size: "950 KB",
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/deo3",
        starred: false,
        tags: ["annual", "filing", "compliance"]
      },
      {
        id: "2",
        name: "Deo Studios_Statement of Account.pdf",
        type: "pdf",
        size: "780 KB",
        modified: "3 weeks ago",
        link: "https://drive.google.com/file/d/deo4",
        starred: true,
        tags: ["account", "statement", "compliance"]
      }
    ]
  },
  "ember-labs": {
    "incorporation": [
      {
        id: "1",
        name: "Ember Labs_LLP Agreement.pdf",
        type: "pdf",
        size: "1.6 MB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/ember1",
        starred: true,
        tags: ["LLP", "agreement", "incorporation"]
      },
      {
        id: "2",
        name: "Ember Labs_Certificate of Incorporation.pdf",
        type: "pdf",
        size: "1.1 MB",
        modified: "3 weeks ago",
        link: "https://drive.google.com/file/d/ember2",
        starred: false,
        tags: ["certificate", "incorporation", "legal"]
      }
    ],
    "compliance": [
      {
        id: "1",
        name: "Ember Labs_Annual Filing Form 11.pdf",
        type: "pdf",
        size: "890 KB",
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/ember3",
        starred: false,
        tags: ["annual", "filing", "compliance"]
      },
      {
        id: "2",
        name: "Ember Labs_Statement of Account.pdf",
        type: "pdf",
        size: "720 KB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/ember4",
        starred: true,
        tags: ["account", "statement", "compliance"]
      }
    ]
  }
};

// Founder-specific documents with 2-level structure
const founderDocuments: Record<string, { name: string; documents: Document[] }> = {
  "akshay-deokuliar": {
    name: "Akshay Deokuliar",
    documents: [
      {
        id: "1",
        name: "Akshay Deokuliar_Aadhar Card.pdf",
        type: "pdf",
        size: "450 KB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/founder1",
        starred: false,
        tags: ["aadhar", "founder", "identity"]
      },
      {
        id: "2",
        name: "Akshay Deokuliar_Current Passport.pdf",
        type: "pdf",
        size: "380 KB",
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/founder2",
        starred: true,
        tags: ["passport", "founder", "identity"]
      },
      {
        id: "3",
        name: "Akshay Deokuliar_PAN Card.pdf",
        type: "pdf",
        size: "320 KB",
        modified: "3 weeks ago",
        link: "https://drive.google.com/file/d/founder3",
        starred: false,
        tags: ["PAN", "founder", "identity"]
      }
    ]
  },
  "anurag-choudhary": {
    name: "Anurag Choudhary",
    documents: [
      {
        id: "4",
        name: "Anurag Choudhary_Aadhar Card.pdf",
        type: "pdf",
        size: "420 KB",
        modified: "1 week ago",
        link: "https://drive.google.com/file/d/founder4",
        starred: true,
        tags: ["aadhar", "founder", "identity"]
      },
      {
        id: "5",
        name: "Anurag Choudhary_Current Passport.pdf",
        type: "pdf",
        size: "390 KB",
        modified: "2 weeks ago",
        link: "https://drive.google.com/file/d/founder5",
        starred: false,
        tags: ["passport", "founder", "identity"]
      },
      {
        id: "6",
        name: "Anurag Choudhary_PAN Card.pdf",
        type: "pdf",
        size: "350 KB",
        modified: "1 month ago",
        link: "https://drive.google.com/file/d/founder6",
        starred: false,
        tags: ["PAN", "founder", "identity"]
      }
    ]
  }
};

const categoryNames: Record<string, string> = {
  "incorporation": "Incorporation & ROC Documents",
  "financial": "Financial Documents",
  "compliance": "Compliance Documents",
  "founder": "Founder Documents",
  "partnership": "Partnership Documents",
  "statutory": "Statutory Records"
};

// Financial year structure with 4-5 level hierarchy
const financialYears: Record<string, { name: string; documentTypes: Record<string, any> }> = {
  "fy-2025-2026": {
    name: "FY 2025-2026",
    documentTypes: {
      "banking": {
        type: "months",
        months: [
          "April 2025", "May 2025", "June 2025", "July 2025", "August 2025", "September 2025",
          "October 2025", "November 2025", "December 2025", "January 2026", "February 2026", "March 2026"
        ],
        documents: [
          {
            id: "bank1",
            name: "Bank Statement - April 2025.pdf",
            type: "pdf",
            size: "2.1 MB",
            modified: "1 week ago",
            link: "https://drive.google.com/file/d/bank1",
            starred: false,
            tags: ["bank", "statement", "april"],
            month: "April 2025"
          }
        ]
      },
      "employee": {
        type: "employees",
        employees: [
          "Employee 1", "Employee 2", "Employee 3", "Employee 4", "Employee 5",
          "Employee 6", "Employee 7", "Employee 8", "Employee 9", "Employee 10"
        ],
        documents: [
          {
            id: "emp1",
            name: "Employee 1 - Offer Letter.pdf",
            type: "pdf",
            size: "890 KB",
            modified: "3 days ago",
            link: "https://drive.google.com/file/d/emp1",
            starred: true,
            tags: ["employee", "offer", "letter"],
            employee: "Employee 1"
          }
        ]
      },
      "invoices": {
        type: "months",
        months: [
          "April 2025", "May 2025", "June 2025", "July 2025", "August 2025", "September 2025",
          "October 2025", "November 2025", "December 2025", "January 2026", "February 2026", "March 2026"
        ],
        flowTypes: ["Inflow", "Outflow"],
        documents: [
          {
            id: "inv1",
            name: "Invoice #2025001.pdf",
            type: "pdf",
            size: "890 KB",
            modified: "2 days ago",
            link: "https://drive.google.com/file/d/inv1",
            starred: false,
            tags: ["invoice", "2025", "billing"],
            month: "April 2025",
            flowType: "Inflow"
          },
          {
            id: "inv2",
            name: "Bill #2025001.pdf",
            type: "pdf",
            size: "720 KB",
            modified: "3 days ago",
            link: "https://drive.google.com/file/d/inv2",
            starred: false,
            tags: ["bill", "2025", "payment"],
            month: "April 2025",
            flowType: "Outflow"
          }
        ]
      },
      "reports": {
        type: "categories",
        categories: ["Financial Reports", "Management Reports"],
        documents: [
          {
            id: "rep1",
            name: "Financial Report Q1 2025.pdf",
            type: "pdf",
            size: "3.2 MB",
            modified: "1 week ago",
            link: "https://drive.google.com/file/d/rep1",
            starred: true,
            tags: ["report", "financial", "Q1"],
            category: "Financial Reports"
          }
        ]
      },
      "tax": {
        type: "categories",
        categories: ["Annual Tax Filings", "Monthly Tax Filings"],
        monthlyStructure: {
          months: [
            "April 2025", "May 2025", "June 2025", "July 2025", "August 2025", "September 2025",
            "October 2025", "November 2025", "December 2025", "January 2026", "February 2026", "March 2026"
          ],
          taxTypes: ["GST", "TDS", "PF", "PT"]
        },
        documents: [
          {
            id: "tax1",
            name: "Annual Tax Filing 2025.pdf",
            type: "pdf",
            size: "1.5 MB",
            modified: "5 days ago",
            link: "https://drive.google.com/file/d/tax1",
            starred: false,
            tags: ["tax", "annual", "2025"],
            category: "Annual Tax Filings"
          },
          {
            id: "tax2",
            name: "GST Return April 2025.pdf",
            type: "pdf",
            size: "980 KB",
            modified: "3 days ago",
            link: "https://drive.google.com/file/d/tax2",
            starred: true,
            tags: ["GST", "april", "2025"],
            category: "Monthly Tax Filings",
            month: "April 2025",
            taxType: "GST"
          }
        ]
      },
      "workings": {
        type: "documents",
        documents: [
          {
            id: "work1",
            name: "Working Papers Q1 2025.xlsx",
            type: "excel",
            size: "2.4 MB",
            modified: "4 days ago",
            link: "https://drive.google.com/file/d/work1",
            starred: false,
            tags: ["working", "papers", "Q1"]
          }
        ]
      }
    }
  }
};

const financialDocumentTypeNames: Record<string, string> = {
  "banking": "Banking & Card Statements",
  "employee": "Employee Database", 
  "invoices": "Invoices & Bills",
  "reports": "Reports",
  "tax": "Tax Filings",
  "workings": "Workings"
};

export const SmartDocumentGrid = ({ 
  entity, 
  category, 
  searchQuery, 
  onBack 
}: SmartDocumentGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [starredOnly, setStarredOnly] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<string | null>(null);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<string | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Record<string, Document[]>>(entityDocuments[entity] || {});

  // Toggle star status for a document
  const toggleStar = (docId: string) => {
    setDocuments(prev => {
      const newDocs = { ...prev };
      for (const category in newDocs) {
        newDocs[category] = newDocs[category].map(doc => 
          doc.id === docId ? { ...doc, starred: !doc.starred } : doc
        );
      }
      return newDocs;
    });
  };
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedTaxType, setSelectedTaxType] = useState<string | null>(null);
  const [selectedFlowType, setSelectedFlowType] = useState<string | null>(null);

  const categoryName = categoryNames[category] || category;

  // Handle founder documents with 2-level structure
  if (category === "founder") {
    if (selectedFounder) {
      const founderData = founderDocuments[selectedFounder];
      if (!founderData) return null;

      const filteredDocuments = (documents[category] || []).filter(doc => {
        const matchesSearch = searchQuery === "" || 
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStarred = !starredOnly || doc.starred;
        
        return matchesSearch && matchesStarred;
      });

      const handleOpenDocument = (link: string) => {
        window.open(link, '_blank');
      };

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedFounder(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Founders
              </Button>
              <h2 className="text-2xl font-medium text-foreground">
                {founderData.name}
              </h2>
              <span className="text-muted-foreground">
                ({filteredDocuments.length} documents)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={starredOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setStarredOnly(!starredOnly)}
              >
                <Star className="w-4 h-4 mr-2" />
                Starred Only
              </Button>
              
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Documents */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileIcon type={doc.type} className="w-10 h-10" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                      onClick={() => toggleStar(doc.id)}
                    >
                      <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                    {doc.name}
                  </h3>
                  
                  <div className="text-xs text-muted-foreground space-y-1 mb-3">
                    <div>{doc.size}</div>
                    <div>Modified {doc.modified}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleOpenDocument(doc.link)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <FileIcon type={doc.type} className="w-8 h-8" />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {doc.name}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        {doc.size} • Modified {doc.modified}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                        onClick={() => toggleStar(doc.id)}
                      >
                        <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDocument(doc.link)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No documents found matching "${searchQuery}"` 
                  : "No documents found for this founder"
                }
              </p>
            </div>
          )}
        </div>
      );
    }

    // Show founder folders
    const filteredFounders = Object.entries(founderDocuments).filter(([founderId, founderData]) =>
      searchQuery === "" || founderData.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <h2 className="text-2xl font-medium text-foreground">
              {categoryName}
            </h2>
            <span className="text-muted-foreground">
              ({filteredFounders.length} founders)
            </span>
          </div>
        </div>

        {/* Founder Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFounders.map(([founderId, founderData]) => (
            <button
              key={founderId}
              onClick={() => setSelectedFounder(founderId)}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <Folder className="w-12 h-12 text-blue-500" />
                <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                  {founderData.documents.length}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {founderData.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Personal documents and identification
              </p>
            </button>
          ))}
        </div>

        {filteredFounders.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No founders found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    );
  }

  // Handle financial documents with 4-5 level structure
  if (category === "financial") {
    // Level 5: Show documents within tax type (for Monthly Tax Filings only)
    if (selectedFinancialYear && selectedDocumentType === "tax" && selectedCategory === "Monthly Tax Filings" && selectedMonth && selectedTaxType) {
      const yearData = financialYears[selectedFinancialYear];
      if (!yearData) return null;

      const documents = yearData.documentTypes.tax.documents.filter(doc => 
        doc.category === "Monthly Tax Filings" && doc.month === selectedMonth && doc.taxType === selectedTaxType
      );

      const filteredDocuments = documents.filter(doc => {
        const matchesSearch = searchQuery === "" || 
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesStarred = !starredOnly || doc.starred;
        
        return matchesSearch && matchesStarred;
      });

      const handleOpenDocument = (link: string) => {
        window.open(link, '_blank');
      };

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedTaxType(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tax Types
              </Button>
              <h2 className="text-2xl font-medium text-foreground">
                {selectedTaxType} - {selectedMonth}
              </h2>
              <span className="text-muted-foreground">
                ({filteredDocuments.length} documents)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={starredOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setStarredOnly(!starredOnly)}
              >
                <Star className="w-4 h-4 mr-2" />
                Starred Only
              </Button>
              
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Documents */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileIcon type={doc.type} className="w-10 h-10" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                      onClick={() => toggleStar(doc.id)}
                    >
                      <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                    {doc.name}
                  </h3>
                  
                  <div className="text-xs text-muted-foreground space-y-1 mb-3">
                    <div>{doc.size}</div>
                    <div>Modified {doc.modified}</div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleOpenDocument(doc.link)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <FileIcon type={doc.type} className="w-8 h-8" />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {doc.name}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        {doc.size} • Modified {doc.modified}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                        onClick={() => toggleStar(doc.id)}
                      >
                        <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDocument(doc.link)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                      
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No documents found matching "${searchQuery}"` 
                  : "No documents found in this tax type"
                }
              </p>
            </div>
          )}
        </div>
      );
    }

    // Level 4: Show tax types within a month (for Monthly Tax Filings only)
    if (selectedFinancialYear && selectedDocumentType === "tax" && selectedCategory === "Monthly Tax Filings" && selectedMonth) {
      const yearData = financialYears[selectedFinancialYear];
      if (!yearData) return null;

      const taxTypes = yearData.documentTypes.tax.monthlyStructure.taxTypes;

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Months
              </Button>
              <h2 className="text-2xl font-medium text-foreground">
                {selectedMonth} - Tax Types
              </h2>
              <span className="text-muted-foreground">
                ({taxTypes.length} tax types)
              </span>
            </div>
          </div>

          {/* Tax Type Folders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {taxTypes.map((taxType) => (
              <button
                key={taxType}
                onClick={() => setSelectedTaxType(taxType)}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-12 h-12 text-red-500" />
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                    {yearData.documentTypes.tax.documents.filter(doc => 
                      doc.category === "Monthly Tax Filings" && doc.month === selectedMonth && doc.taxType === taxType
                    ).length}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {taxType}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {taxType} documents for {selectedMonth}
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Level 3 & 4: Show months/employees/categories based on document type
    if (selectedFinancialYear && selectedDocumentType) {
      const yearData = financialYears[selectedFinancialYear];
      if (!yearData) return null;

      const docTypeData = yearData.documentTypes[selectedDocumentType];
      if (!docTypeData) return null;

      // Handle months structure (Banking, Invoices)
      if (docTypeData.type === "months") {
        // Special handling for Invoices & Bills - show flow types after month selection
        if (selectedDocumentType === "invoices" && selectedMonth && !selectedFlowType) {
          const flowTypes = docTypeData.flowTypes;

          return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Months
                  </Button>
                  <h2 className="text-2xl font-medium text-foreground">
                    {selectedMonth} - Flow Types
                  </h2>
                  <span className="text-muted-foreground">
                    ({flowTypes.length} flow types)
                  </span>
                </div>
              </div>

              {/* Flow Type Folders */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {flowTypes.map((flowType) => (
                  <button
                    key={flowType}
                    onClick={() => setSelectedFlowType(flowType)}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Folder className={`w-12 h-12 ${flowType === 'Inflow' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                        {docTypeData.documents.filter(doc => doc.month === selectedMonth && doc.flowType === flowType).length}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {flowType}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {flowType === 'Inflow' ? 'Money coming in' : 'Money going out'} for {selectedMonth}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // If a month is selected, show documents (with flow type filter for invoices)
        if (selectedMonth) {
          let documents = docTypeData.documents.filter(doc => doc.month === selectedMonth);
          
          // For invoices, also filter by flow type if selected
          if (selectedDocumentType === "invoices" && selectedFlowType) {
            documents = documents.filter(doc => doc.flowType === selectedFlowType);
          }
          
          const filteredDocuments = documents.filter(doc => {
            const matchesSearch = searchQuery === "" || 
              doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesStarred = !starredOnly || doc.starred;
            
            return matchesSearch && matchesStarred;
          });

          const handleOpenDocument = (link: string) => {
            window.open(link, '_blank');
          };

          return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => {
                    if (selectedDocumentType === "invoices" && selectedFlowType) {
                      setSelectedFlowType(null);
                    } else {
                      setSelectedMonth(null);
                    }
                  }}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {selectedDocumentType === "invoices" && selectedFlowType ? "Back to Flow Types" : "Back to Months"}
                  </Button>
                  <h2 className="text-2xl font-medium text-foreground">
                    {selectedDocumentType === "invoices" && selectedFlowType 
                      ? `${selectedMonth} - ${selectedFlowType}`
                      : `${financialDocumentTypeNames[selectedDocumentType]} - ${selectedMonth}`
                    }
                  </h2>
                  <span className="text-muted-foreground">
                    ({filteredDocuments.length} documents)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={starredOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStarredOnly(!starredOnly)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Starred Only
                  </Button>
                  
                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileIcon type={doc.type} className="w-10 h-10" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                          onClick={() => toggleStar(doc.id)}
                        >
                          <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                        </Button>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                        {doc.name}
                      </h3>
                      
                      <div className="text-xs text-muted-foreground space-y-1 mb-3">
                        <div>{doc.size}</div>
                        <div>Modified {doc.modified}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleOpenDocument(doc.link)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <FileIcon type={doc.type} className="w-8 h-8" />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-foreground truncate">
                            {doc.name}
                          </h3>
                          <div className="text-xs text-muted-foreground">
                            {doc.size} • Modified {doc.modified}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                            onClick={() => toggleStar(doc.id)}
                          >
                            <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDocument(doc.link)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No documents found matching "${searchQuery}"` 
                      : "No documents found for this month"
                    }
                  </p>
                </div>
              )}
            </div>
          );
        }

        // Show month folders
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedDocumentType(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Document Types
                </Button>
                <h2 className="text-2xl font-medium text-foreground">
                  {financialDocumentTypeNames[selectedDocumentType]}
                </h2>
                <span className="text-muted-foreground">
                  ({docTypeData.months.length} months)
                </span>
              </div>
            </div>

            {/* Month Folders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {docTypeData.months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-12 h-12 text-orange-500" />
                    <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                      {docTypeData.documents.filter(doc => doc.month === month).length}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {month}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {financialDocumentTypeNames[selectedDocumentType]} for {month}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Handle employees structure (Employee Database)
      if (docTypeData.type === "employees") {
        // If an employee is selected, show documents
        if (selectedEmployee) {
          const documents = docTypeData.documents.filter(doc => doc.employee === selectedEmployee);
          const filteredDocuments = documents.filter(doc => {
            const matchesSearch = searchQuery === "" || 
              doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesStarred = !starredOnly || doc.starred;
            
            return matchesSearch && matchesStarred;
          });

          const handleOpenDocument = (link: string) => {
            window.open(link, '_blank');
          };

          return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Employees
                  </Button>
                  <h2 className="text-2xl font-medium text-foreground">
                    {selectedEmployee}
                  </h2>
                  <span className="text-muted-foreground">
                    ({filteredDocuments.length} documents)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={starredOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStarredOnly(!starredOnly)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Starred Only
                  </Button>
                  
                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileIcon type={doc.type} className="w-10 h-10" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                          onClick={() => toggleStar(doc.id)}
                        >
                          <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                        </Button>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                        {doc.name}
                      </h3>
                      
                      <div className="text-xs text-muted-foreground space-y-1 mb-3">
                        <div>{doc.size}</div>
                        <div>Modified {doc.modified}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleOpenDocument(doc.link)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <FileIcon type={doc.type} className="w-8 h-8" />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-foreground truncate">
                            {doc.name}
                          </h3>
                          <div className="text-xs text-muted-foreground">
                            {doc.size} • Modified {doc.modified}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                            onClick={() => toggleStar(doc.id)}
                          >
                            <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDocument(doc.link)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No documents found matching "${searchQuery}"` 
                      : "No documents found for this employee"
                    }
                  </p>
                </div>
              )}
            </div>
          );
        }

        // Show employee folders
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedDocumentType(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Document Types
                </Button>
                <h2 className="text-2xl font-medium text-foreground">
                  {financialDocumentTypeNames[selectedDocumentType]}
                </h2>
                <span className="text-muted-foreground">
                  ({docTypeData.employees.length} employees)
                </span>
              </div>
            </div>

            {/* Employee Folders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {docTypeData.employees.map((employee) => (
                <button
                  key={employee}
                  onClick={() => setSelectedEmployee(employee)}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-12 h-12 text-cyan-500" />
                    <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                      {docTypeData.documents.filter(doc => doc.employee === employee).length}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {employee}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Employee documents and records
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Handle categories structure (Reports, Tax Filings)
      if (docTypeData.type === "categories") {
        // Special handling for Tax Filings Monthly structure
        if (selectedDocumentType === "tax" && selectedCategory === "Monthly Tax Filings") {
          // If a month is selected, show tax types
          if (selectedMonth) {
            const taxTypes = docTypeData.monthlyStructure.taxTypes;

            return (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedMonth(null)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Months
                    </Button>
                    <h2 className="text-2xl font-medium text-foreground">
                      {selectedMonth} - Tax Types
                    </h2>
                    <span className="text-muted-foreground">
                      ({taxTypes.length} tax types)
                    </span>
                  </div>
                </div>

                {/* Tax Type Folders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {taxTypes.map((taxType) => (
                    <button
                      key={taxType}
                      onClick={() => setSelectedTaxType(taxType)}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <Folder className="w-12 h-12 text-red-500" />
                        <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                          {docTypeData.documents.filter(doc => 
                            doc.category === "Monthly Tax Filings" && doc.month === selectedMonth && doc.taxType === taxType
                          ).length}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {taxType}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {taxType} documents for {selectedMonth}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // Show months for Monthly Tax Filings
          const months = docTypeData.monthlyStructure.months;

          return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Categories
                  </Button>
                  <h2 className="text-2xl font-medium text-foreground">
                    {selectedCategory}
                  </h2>
                  <span className="text-muted-foreground">
                    ({months.length} months)
                  </span>
                </div>
              </div>

              {/* Month Folders */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Folder className="w-12 h-12 text-orange-500" />
                      <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                        {docTypeData.monthlyStructure.taxTypes.length}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {month}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tax filings for {month}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          );
        }

        // If a category is selected, show documents (for Reports and Annual Tax Filings)
        if (selectedCategory) {
          const documents = docTypeData.documents.filter(doc => doc.category === selectedCategory);
          const filteredDocuments = documents.filter(doc => {
            const matchesSearch = searchQuery === "" || 
              doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesStarred = !starredOnly || doc.starred;
            
            return matchesSearch && matchesStarred;
          });

          const handleOpenDocument = (link: string) => {
            window.open(link, '_blank');
          };

          return (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Categories
                  </Button>
                  <h2 className="text-2xl font-medium text-foreground">
                    {selectedCategory}
                  </h2>
                  <span className="text-muted-foreground">
                    ({filteredDocuments.length} documents)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={starredOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStarredOnly(!starredOnly)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Starred Only
                  </Button>
                  
                  <div className="flex border border-border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileIcon type={doc.type} className="w-10 h-10" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                          onClick={() => toggleStar(doc.id)}
                        >
                          <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                        </Button>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                        {doc.name}
                      </h3>
                      
                      <div className="text-xs text-muted-foreground space-y-1 mb-3">
                        <div>{doc.size}</div>
                        <div>Modified {doc.modified}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleOpenDocument(doc.link)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <FileIcon type={doc.type} className="w-8 h-8" />
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-foreground truncate">
                            {doc.name}
                          </h3>
                          <div className="text-xs text-muted-foreground">
                            {doc.size} • Modified {doc.modified}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                            onClick={() => toggleStar(doc.id)}
                          >
                            <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDocument(doc.link)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No documents found matching "${searchQuery}"` 
                      : "No documents found in this category"
                    }
                  </p>
                </div>
              )}
            </div>
          );
        }

        // Show category folders
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedDocumentType(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Document Types
                </Button>
                <h2 className="text-2xl font-medium text-foreground">
                  {financialDocumentTypeNames[selectedDocumentType]}
                </h2>
                <span className="text-muted-foreground">
                  ({docTypeData.categories.length} categories)
                </span>
              </div>
            </div>

            {/* Category Folders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {docTypeData.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Folder className="w-12 h-12 text-indigo-500" />
                    <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                      {category === "Monthly Tax Filings" && selectedDocumentType === "tax" 
                        ? docTypeData.monthlyStructure.months.length 
                        : docTypeData.documents.filter(doc => doc.category === category).length
                      }
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {category}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category} documents and records
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      }

      // Handle direct documents structure (Workings)
      if (docTypeData.type === "documents") {
        const documents = docTypeData.documents;
        const filteredDocuments = documents.filter(doc => {
          const matchesSearch = searchQuery === "" || 
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const matchesStarred = !starredOnly || doc.starred;
          
          return matchesSearch && matchesStarred;
        });

        const handleOpenDocument = (link: string) => {
          window.open(link, '_blank');
        };

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => setSelectedDocumentType(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Document Types
                </Button>
                <h2 className="text-2xl font-medium text-foreground">
                  {financialDocumentTypeNames[selectedDocumentType]}
                </h2>
                <span className="text-muted-foreground">
                  ({filteredDocuments.length} documents)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={starredOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStarredOnly(!starredOnly)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Starred Only
                </Button>
                
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Documents */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <FileIcon type={doc.type} className="w-10 h-10" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                        onClick={() => toggleStar(doc.id)}
                      >
                        <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                      </Button>
                    </div>
                    
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                      {doc.name}
                    </h3>
                    
                    <div className="text-xs text-muted-foreground space-y-1 mb-3">
                      <div>{doc.size}</div>
                      <div>Modified {doc.modified}</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleOpenDocument(doc.link)}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <FileIcon type={doc.type} className="w-8 h-8" />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {doc.name}
                        </h3>
                        <div className="text-xs text-muted-foreground">
                          {doc.size} • Modified {doc.modified}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                          onClick={() => toggleStar(doc.id)}
                        >
                          <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDocument(doc.link)}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `No documents found matching "${searchQuery}"` 
                    : "No documents found in this category"
                  }
                </p>
              </div>
            )}
          </div>
        );
      }
    }

    // Level 2: Show document types within a financial year
    if (selectedFinancialYear) {
      const yearData = financialYears[selectedFinancialYear];
      if (!yearData) return null;

      const filteredDocTypes = Object.entries(yearData.documentTypes).filter(([typeId, docs]) =>
        searchQuery === "" || financialDocumentTypeNames[typeId].toLowerCase().includes(searchQuery.toLowerCase())
      );

      const resetStates = () => {
        setSelectedCategory(null);
        setSelectedMonth(null);
        setSelectedEmployee(null);
        setSelectedTaxType(null);
      };

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedFinancialYear(null);
                resetStates();
              }}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Financial Years
              </Button>
              <h2 className="text-2xl font-medium text-foreground">
                {yearData.name}
              </h2>
              <span className="text-muted-foreground">
                ({filteredDocTypes.length} document types)
              </span>
            </div>
          </div>

          {/* Document Type Folders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocTypes.map(([typeId, docs]) => (
              <button
                key={typeId}
                onClick={() => {
                  setSelectedDocumentType(typeId);
                  resetStates();
                }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <Folder className="w-12 h-12 text-green-500" />
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                    {docs.type === "documents" ? docs.documents.length : 
                     docs.type === "months" ? docs.months.length :
                     docs.type === "employees" ? docs.employees.length :
                     docs.type === "categories" ? docs.categories.length : 0
                    }
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {financialDocumentTypeNames[typeId]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Financial documents and records
                </p>
              </button>
            ))}
          </div>

          {filteredDocTypes.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No document types found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      );
    }

    // Level 1: Show financial year folders
    const filteredYears = Object.entries(financialYears).filter(([yearId, yearData]) =>
      searchQuery === "" || yearData.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <h2 className="text-2xl font-medium text-foreground">
              {categoryName}
            </h2>
            <span className="text-muted-foreground">
              ({filteredYears.length} financial years)
            </span>
          </div>
        </div>

        {/* Financial Year Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredYears.map(([yearId, yearData]) => (
            <button
              key={yearId}
              onClick={() => setSelectedFinancialYear(yearId)}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all transform hover:scale-105 text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <Folder className="w-12 h-12 text-purple-500" />
                <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                  {Object.keys(yearData.documentTypes).length}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {yearData.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Financial documents and records
              </p>
            </button>
          ))}
        </div>

        {filteredYears.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No financial years found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    );
  }

  // Handle regular categories (non-founder, non-financial)
  const categoryDocs = documents[category] || [];
  
  const filteredDocuments = categoryDocs.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStarred = !starredOnly || doc.starred;
    
    return matchesSearch && matchesStarred;
  });

  const handleOpenDocument = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <h2 className="text-2xl font-medium text-foreground">
            {categoryName}
          </h2>
          <span className="text-muted-foreground">
            ({filteredDocuments.length} documents)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={starredOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setStarredOnly(!starredOnly)}
          >
            <Star className="w-4 h-4 mr-2" />
            Starred Only
          </Button>
          
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Documents */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <FileIcon type={doc.type} className="w-10 h-10" />
                <Button
                  variant="ghost"
                  size="sm"
                  className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                  onClick={() => toggleStar(doc.id)}
                >
                  <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                </Button>
              </div>
              
              <h3 className="font-medium text-sm mb-2 line-clamp-2 text-foreground">
                {doc.name}
              </h3>
              
              <div className="text-xs text-muted-foreground space-y-1 mb-3">
                <div>{doc.size}</div>
                <div>Modified {doc.modified}</div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleOpenDocument(doc.link)}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center space-x-4 flex-1">
                <FileIcon type={doc.type} className="w-8 h-8" />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-muted-foreground">
                    {doc.size} • Modified {doc.modified}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={doc.starred ? "text-yellow-500" : "text-muted-foreground"}
                    onClick={() => toggleStar(doc.id)}
                  >
                    <Star className="w-4 h-4" fill={doc.starred ? "currentColor" : "none"} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenDocument(doc.link)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery 
              ? `No documents found matching "${searchQuery}"` 
              : "No documents in this category yet"
            }
          </p>
        </div>
      )}
    </div>
  );
};