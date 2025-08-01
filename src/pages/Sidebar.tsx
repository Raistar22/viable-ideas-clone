
import { LucideIcon, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Folder {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface SidebarProps {
  folders: Folder[];
  selectedFolder: string;
  onFolderSelect: (folderId: string) => void;
  
}

export const Sidebar = ({ folders, selectedFolder, onFolderSelect }: SidebarProps) => {
  return (
    <div className="w-64 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/50 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          DocVault
        </h2>
        <p className="text-xs text-slate-400 mt-1">Document Management</p>
      </div>


      {/* Navigation */}
      <nav className="flex-1">
        <div className="space-y-1">
          {folders.map((folder) => {
            const Icon = folder.icon;
            const isActive = selectedFolder === folder.id;
            
            return (
              <button
                key={folder.id}
                onClick={() => onFolderSelect(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10" 
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Icon className={`h-4 w-4 mr-3 transition-colors ${
                    isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300"
                  }`} />
                  <span className="text-sm font-medium">{folder.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  isActive 
                    ? "bg-blue-500/20 text-blue-300" 
                    : "bg-slate-700 text-slate-400 group-hover:bg-slate-600"
                }`}>
                  {folder.count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="space-y-1 pt-4 border-t border-slate-700/50">
        <button className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
          <Settings className="h-4 w-4 mr-3" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
          <HelpCircle className="h-4 w-4 mr-3" />
          <span className="text-sm">Help</span>
        </button>
      </div>
    </div>
  );
};
