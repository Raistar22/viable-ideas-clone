
import { Star, MoreVertical, Download, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileIcon } from "@/components/FileIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface File {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  category: string;
  starred: boolean;
}

interface FileGridProps {
  files: File[];
  onToggleStar?: (fileId: number) => void;
}

export const FileGrid = ({ files, onToggleStar }: FileGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105"
        >
          {/* File Icon */}
          <div className="flex items-center justify-between mb-4">
            <FileIcon type={file.type} />
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-700"
                onClick={() => onToggleStar?.(file.id)}
              >
                <Star className={`h-4 w-4 ${file.starred ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-700"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* File Info */}
          <div>
            <h3 className="text-sm font-medium text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
              {file.name}
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{file.size}</span>
              <span>{file.modified}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
