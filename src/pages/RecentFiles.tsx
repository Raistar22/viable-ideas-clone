
import { Clock } from "lucide-react";
import { FileIcon } from "@/components/FileIcon";

export const RecentFiles = () => {
  const recentFiles = [
    { name: "Q4 Budget Analysis.pdf", type: "PDF", time: "2 hours ago", size: "2.4 MB" },
    { name: "Compliance Checklist.xlsx", type: "Excel", time: "5 hours ago", size: "1.8 MB" },
    { name: "Board Meeting Notes.docx", type: "Word", time: "1 day ago", size: "245 KB" },
    { name: "Risk Assessment.pdf", type: "PDF", time: "2 days ago", size: "3.2 MB" }
  ];

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-medium text-foreground">Recent Activity</h3>
      </div>

      <div className="grid gap-4">
        {recentFiles.map((file, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-xl hover:shadow-sm transition-all cursor-pointer group">
            <FileIcon type={file.type} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {file.name}
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{file.time}</span>
                <span>•</span>
                <span>{file.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
