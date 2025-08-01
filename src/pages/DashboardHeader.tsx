
import { Search, Bell, User, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  
}

export const DashboardHeader = ({ searchQuery, onSearchChange }: DashboardHeaderProps) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-8 py-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search documents, insights, or ask a question..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-base"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-8">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Globe className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 relative"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
