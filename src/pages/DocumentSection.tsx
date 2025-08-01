
import { useState } from "react";
import { Grid3X3, List, Filter, Download, Share, MoreVertical, FileText, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/components/FileIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentSectionProps {
  searchQuery: string;
  category?: string;
}

export const DocumentSection = ({ searchQuery, category }: DocumentSectionProps) => {
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
      author: "CFO Team"
    },
    {
      id: 2,
      name: "Tax Documentation.xlsx",
      category: "compliance",
      type: "Excel",
      size: "1.8 MB",
      modified: "5 hours ago",
      starred: false,
      author: "Tax Department"
    },
    {
      id: 3,
      name: "Board Meeting Q4.docx",
      category: "governance",
      type: "Word",
      size: "245 KB",
      modified: "1 day ago",
      starred: true,
      author: "Executive Team"
    },
    {
      id: 4,
      name: "Compliance Audit 2024.pdf",
      category: "compliance",
      type: "PDF",
      size: "3.2 MB",
      modified: "2 days ago",
      starred: false,
      author: "Audit Team"
    },
    {
      id: 5,
      name: "Budget Forecast 2025.xlsx",
      category: "financial",
      type: "Excel",
      size: "892 KB",
      modified: "3 days ago",
      starred: true,
      author: "Finance Team"
    },
    {
      id: 6,
      name: "Risk Assessment Report.pdf",
      category: "governance",
      type: "PDF",
      size: "1.5 MB",
      modified: "1 week ago",
      starred: false,
      author: "Risk Management"
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{getCategoryTitle()}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {filteredDocs.length} documents found
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-7 px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-7 px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Documents */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <FileIcon type={doc.type} size="lg" />
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleStar(doc.id)}>
                    <Star className={`w-4 h-4 ${doc.starred ? "text-amber-500 fill-amber-500" : "text-slate-400"}`} />
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
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {doc.name}
                </h3>
                <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{doc.size}</span>
                  <p>by {doc.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <div className="grid grid-cols-10 gap-4 p-4 border-b border-slate-200/50 dark:border-slate-700/50 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Author</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1"></div>
          </div>
          
          <div>
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="grid grid-cols-10 gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                <div className="col-span-6 flex items-center space-x-3">
                  <FileIcon type={doc.type} size="sm" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {doc.name}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center text-sm text-slate-500 dark:text-slate-400">
                  {doc.author}
                </div>
                <div className="col-span-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                  {doc.size}
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleStar(doc.id)}>
                    <Star className={`w-4 h-4 ${doc.starred ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
