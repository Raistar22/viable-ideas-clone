
import { useState } from "react";
import { Grid3X3, List, Filter, Download, Share, MoreVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/pages/FileIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentGridProps {
  category?: string;
  searchQuery: string;
}

export const DocumentGrid = ({ category, searchQuery }: DocumentGridProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Q4 Financial Report 2024.pdf",
      category: "financial",
      type: "PDF",
      size: "2.4 MB",
      modified: "2 hours ago",
      starred: true,
      author: "Finance Team"
    },
    {
      id: 2,
      name: "Tax Documentation.xlsx",
      category: "compliance",
      type: "Excel",
      size: "1.8 MB",
      modified: "5 hours ago",
      starred: false,
      author: "Compliance"
    },
    {
      id: 3,
      name: "Board Meeting Minutes.docx",
      category: "governance",
      type: "Word",
      size: "245 KB",
      modified: "1 day ago",
      starred: true,
      author: "Executive Team"
    },
    {
      id: 4,
      name: "Audit Report 2024.pdf",
      category: "compliance",
      type: "PDF",
      size: "3.2 MB",
      modified: "2 days ago",
      starred: false,
      author: "Audit Team"
    }
  ]);

  // Toggle star status for a document
  const toggleStar = (docId: number) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || doc.category === category;
    return matchesSearch && matchesCategory;
  });

  const getCategoryTitle = () => {
    if (category === "financial") return "Financial Documents";
    if (category === "compliance") return "Compliance Documents";
    if (category === "governance") return "Governance Documents";
    return "All Documents";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-foreground">{getCategoryTitle()}</h2>
          <p className="text-muted-foreground mt-1">
            {filteredDocs.length} documents
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="group bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <FileIcon type={doc.type} size="lg" />
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleStar(doc.id)}>
                  <Star className={`w-4 h-4 ${doc.starred ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {doc.name}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <span>{doc.size}</span>
                <p>by {doc.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
