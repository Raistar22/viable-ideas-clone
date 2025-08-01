
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

interface FileListProps {
  files: File[];
  onToggleStar?: (fileId: number) => void;
}

export const FileList = ({ files, onToggleStar }: FileListProps) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-sm font-medium text-slate-400">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-3">Modified</div>
        <div className="col-span-1"></div>
      </div>

      {/* Files */}
      <div className="divide-y divide-slate-700/50">
        {files.map((file) => (
          <div
            key={file.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-800/60 transition-colors group"
          >
            <div className="col-span-6 flex items-center">
              <FileIcon type={file.type} size="sm" />
              <span className="text-sm font-medium text-white ml-3 truncate group-hover:text-blue-400 transition-colors">
                {file.name}
              </span>
            </div>
            <div className="col-span-2 flex items-center text-sm text-slate-400">
              {file.size}
            </div>
            <div className="col-span-3 flex items-center text-sm text-slate-400">
              {file.modified}
            </div>
            <div className="col-span-1 flex items-center justify-end gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Star className={`h-4 w-4 ${file.starred ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
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
        ))}
      </div>
    </div>
  );
};
