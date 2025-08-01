
import { Building2, TrendingUp, Shield, Users, Settings, HelpCircle, BarChart3, FileText, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExecutiveSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "financial", name: "Financial", icon: TrendingUp },
  { id: "compliance", name: "Compliance", icon: Shield },
  { id: "governance", name: "Governance", icon: Users },
];

export const ExecutiveSidebar = ({ activeView, onViewChange }: ExecutiveSidebarProps) => {
  return (
    <div className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col">
      {/* Logo & Company */}
      <div className="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Executive Hub</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Document Intelligence</p>
          </div>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200/50 dark:border-blue-800/50" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 mr-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 space-y-2">
        <button className="w-full flex items-center px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
          <Settings className="w-5 h-5 mr-4" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-all duration-200">
          <HelpCircle className="w-5 h-5 mr-4" />
          <span className="font-medium">Support</span>
        </button>
      </div>
    </div>
  );
};
